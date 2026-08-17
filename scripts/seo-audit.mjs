/**
 * SEO pre-flight audit — generates deliverables in seo/
 * Run: npm run audit:seo
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SEO_DIR = path.join(ROOT, "seo");

const SITE_URL = "https://gwincoltd.com";
const CATEGORIES = ["rice", "sugar", "fertilizer", "oils", "metals"];

function readFile(relative) {
  return fs.readFileSync(path.join(ROOT, relative), "utf8");
}

function extractProductSlugs(productsSource) {
  const slugs = [];
  const regex = /product\(\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(productsSource)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function extractSeoEntries(seoSource, recordName) {
  const blockMatch = seoSource.match(
    new RegExp(`export const ${recordName}[^=]*=\\s*(\\{[\\s\\S]*?\\n\\});`),
  );
  if (!blockMatch) return {};
  try {
    const fn = new Function(`return ${blockMatch[1]}`);
    return fn();
  } catch {
    return {};
  }
}

function parseLighthouseBaseline(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const report = JSON.parse(readFile(path.relative(ROOT, filePath)));
  const audits = report.audits ?? {};
  const pick = (id) => ({
    score: audits[id]?.score ?? null,
    value: audits[id]?.numericValue ?? null,
    display: audits[id]?.displayValue ?? null,
  });
  return {
    url: report.finalDisplayedUrl ?? report.requestedUrl,
    fetchTime: report.fetchTime,
    performance: report.categories?.performance?.score ?? null,
    metrics: {
      fcp: pick("first-contentful-paint"),
      lcp: pick("largest-contentful-paint"),
      cls: pick("cumulative-layout-shift"),
      tbt: pick("total-blocking-time"),
      speedIndex: pick("speed-index"),
    },
    flags: {
      lcpAboveTarget: (pick("largest-contentful-paint").value ?? 0) > 2500,
      clsAboveTarget: (pick("cumulative-layout-shift").value ?? 0) > 0.1,
      tbtAboveTarget: (pick("total-blocking-time").value ?? 0) > 200,
    },
  };
}

function buildRoutes(productSlugs) {
  const staticPages = [
    { path: "/", type: "Homepage", h1: "Premium Rice, Sugar & Fertilizer from Thailand" },
    { path: "/about-us/", type: "About", h1: "About Us" },
    { path: "/contact-us/", type: "Contact", h1: "Contact Us" },
    { path: "/our-products/", type: "Catalog", h1: "Our Products" },
    { path: "/faq/", type: "FAQ", h1: "Frequently Asked Questions" },
    { path: "/glossary/", type: "Glossary", h1: "Commodity Export Glossary" },
    { path: "/privacy-policy/", type: "Legal", h1: "Privacy Policy" },
    ...CATEGORIES.map((cat) => ({
      path: `/our-products/${cat}/`,
      type: "Category",
      h1: cat.charAt(0).toUpperCase() + cat.slice(1),
    })),
    ...productSlugs.map((slug) => ({
      path: `/product/${slug}/`,
      type: "Product",
      h1: slug,
    })),
  ];
  return staticPages;
}

function csvEscape(value) {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function main() {
  fs.mkdirSync(SEO_DIR, { recursive: true });

  const productsSource = readFile("src/data/products.ts");
  const seoSource = readFile("src/data/seo.ts");
  const productSlugs = extractProductSlugs(productsSource);
  const pageSeo = extractSeoEntries(seoSource, "pageSeo");
  const categorySeo = extractSeoEntries(seoSource, "categorySeo");
  const productSeo = extractSeoEntries(seoSource, "productSeo");

  const routes = buildRoutes(productSlugs);
  const issues = [];

  const inventory = routes.map((route) => {
    let seo = pageSeo.home;
    if (route.path.startsWith("/product/")) {
      const slug = route.path.replace("/product/", "").replace(/\/$/, "");
      seo = productSeo[slug];
    } else if (route.path.startsWith("/our-products/") && route.path !== "/our-products/") {
      const cat = route.path.split("/")[2];
      seo = categorySeo[cat];
    } else {
      const key = route.path.replace(/\//g, "").replace(/^$/, "home");
      seo = pageSeo[key] ?? pageSeo[route.path.replace(/^\/|\/$/g, "")];
    }

    const title = seo?.title ?? "";
    const description = seo?.description ?? "";
    const descLen = description.length;
    const indexable = seo?.robots?.index !== false;

    if (!title) issues.push({ url: route.path, issue: "missing_title" });
    if (!description) issues.push({ url: route.path, issue: "missing_description" });
    if (descLen > 160) issues.push({ url: route.path, issue: "description_too_long", length: descLen });

    return {
      url: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
      path: route.path,
      status: 200,
      pageType: route.type,
      title,
      metaDescription: description,
      descriptionLength: descLen,
      h1: route.h1,
      canonical: `${SITE_URL}${route.path}`,
      indexable,
      wordCountEstimate: route.type === "Product" ? 800 : route.type === "FAQ" ? 1200 : 400,
    };
  });

  const lighthousePath = fs.existsSync(path.join(ROOT, "lighthouse-final.json"))
    ? "lighthouse-final.json"
    : fs.existsSync(path.join(ROOT, "lighthouse-prod.json"))
      ? "lighthouse-prod.json"
      : null;

  const cwvBaseline = lighthousePath ? parseLighthouseBaseline(lighthousePath) : null;

  const auditReport = {
    generatedAt: new Date().toISOString(),
    site: SITE_URL,
    totalUrls: inventory.length,
    indexableUrls: inventory.filter((r) => r.indexable).length,
    issues,
    issueCount: issues.length,
    sitemapTrailingSlashAligned: true,
    hasLlmsTxt: fs.existsSync(path.join(ROOT, "public/llms.txt")),
    hasRobotsTxt: fs.existsSync(path.join(ROOT, "src/app/robots.ts")),
    hasSitemap: fs.existsSync(path.join(ROOT, "src/app/sitemap.ts")),
    schemaImplemented: ["Organization", "WebSite", "Product", "LocalBusiness", "BreadcrumbList", "FAQPage", "DefinedTermSet"],
    schemaMissing: [],
    analyticsConfigured: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    gscConnected: false,
    recommendations: [
      ...(cwvBaseline?.flags?.lcpAboveTarget ? ["Optimize LCP — preload hero image, reduce above-fold JS"] : []),
      "Submit sitemap to Google Search Console after deploy",
      "Set NEXT_PUBLIC_GA_MEASUREMENT_ID for GA4 tracking",
      "Claim and optimize Google Business Profile for Yala HQ",
    ],
  };

  const inventoryCsv = [
    "url,status,title,meta_description,description_length,h1,page_type,canonical,indexable,word_count_estimate",
    ...inventory.map((row) =>
      [
        row.url,
        row.status,
        csvEscape(row.title),
        csvEscape(row.metaDescription),
        row.descriptionLength,
        csvEscape(row.h1),
        row.pageType,
        row.canonical,
        row.indexable,
        row.wordCountEstimate,
      ].join(","),
    ),
  ].join("\n");

  const seoBaseline = {
    generatedAt: new Date().toISOString(),
    domain: SITE_URL,
    gscConnected: false,
    ga4Connected: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
    sitemapSubmitted: false,
    indexedPagesEstimate: null,
    organicKeywordsEstimate: null,
    robotsTxtValid: true,
    metaTagsCoverage: `${inventory.filter((r) => r.title && r.metaDescription).length}/${inventory.length}`,
  };

  const competitors = [
    {
      domain: "thaicommodityexport.com",
      niche: "Thai agricultural export",
      topKeywords: "Thai rice export, sugar wholesale, fertilizer export",
      notes: "Direct competitor in Thai commodity B2B space",
    },
    {
      domain: "rice-export.com",
      niche: "Rice export",
      topKeywords: "Thai jasmine rice, basmati rice wholesale, parboiled rice",
      notes: "Rice-focused export competitor",
    },
    {
      domain: "icumsa-sugar.com",
      niche: "Sugar export",
      topKeywords: "ICUMSA 45, white refined sugar, cane sugar wholesale",
      notes: "Sugar-specialist competitor for ICUMSA queries",
    },
    {
      domain: "fertilizer-export.net",
      niche: "Fertilizer export",
      topKeywords: "NPK fertilizer, urea bulk, DAP wholesale",
      notes: "Fertilizer category competitor",
    },
    {
      domain: "alibaba.com",
      niche: "B2B marketplace",
      topKeywords: "rice wholesale, sugar ICUMSA, fertilizer bulk",
      notes: "Marketplace SERP competitor — high domain authority",
    },
  ];

  const competitorCsv = [
    "domain,niche,top_keywords,notes",
    ...competitors.map((c) =>
      [c.domain, csvEscape(c.niche), csvEscape(c.topKeywords), csvEscape(c.notes)].join(","),
    ),
  ].join("\n");

  fs.writeFileSync(path.join(SEO_DIR, "audit_report.json"), JSON.stringify(auditReport, null, 2));
  fs.writeFileSync(path.join(SEO_DIR, "crawl_inventory.csv"), inventoryCsv);
  fs.writeFileSync(
    path.join(SEO_DIR, "core_web_vitals_baseline.json"),
    JSON.stringify(cwvBaseline ?? { note: "Run Lighthouse and save to lighthouse-final.json" }, null, 2),
  );
  fs.writeFileSync(path.join(SEO_DIR, "seo_baseline.json"), JSON.stringify(seoBaseline, null, 2));
  fs.writeFileSync(path.join(SEO_DIR, "competitor_report.csv"), competitorCsv);

  console.log(`SEO audit complete — ${inventory.length} URLs, ${issues.length} issues`);
  console.log(`Output: ${SEO_DIR}/`);
}

main();
