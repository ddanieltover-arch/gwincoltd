import { getProductBySlug, getRelatedProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/types";

export interface InternalResourceLink {
  href: string;
  anchor: string;
}

export interface ExternalResourceLink {
  href: string;
  label: string;
}

export interface RelatedResourceSet {
  internal: InternalResourceLink[];
  external: ExternalResourceLink[];
}

const FAO = {
  href: "https://www.fao.org/markets-and-trade/commodities/en/",
  label: "FAO commodity markets",
} as const;

const THAI_TRADE = {
  href: "https://www.ditp.go.th/",
  label: "Department of International Trade Promotion (Thailand)",
} as const;

const ICUMSA = {
  href: "https://www.icumsa.org/",
  label: "ICUMSA sugar analysis standards",
} as const;

const IRRI = {
  href: "https://www.irri.org/",
  label: "International Rice Research Institute",
} as const;

const IFA = {
  href: "https://www.fertilizer.org/",
  label: "International Fertilizer Association",
} as const;

const CODEX = {
  href: "https://www.fao.org/fao-who-codexalimentarius/en/",
  label: "Codex Alimentarius food standards",
} as const;

const LME = {
  href: "https://www.lme.com/en/metals/non-ferrous/lme-copper",
  label: "London Metal Exchange copper",
} as const;

const USGS_COPPER = {
  href: "https://www.usgs.gov/centers/national-minerals-information-center/copper-statistics-and-information",
  label: "USGS copper statistics",
} as const;

const FAO_RICE = {
  href: "https://www.fao.org/markets-and-trade/commodities/rice/en/",
  label: "FAO rice market overview",
} as const;

const FAO_SUGAR = {
  href: "https://www.fao.org/markets-and-trade/commodities/sugar/en/",
  label: "FAO sugar market overview",
} as const;

/** Trending / mapped keyword anchors pointing to the homepage. */
export const homepageKeywordByTopic: Record<ProductCategory | "general", string> = {
  general: "sugar, fertilizer and rice export from Thailand",
  rice: "Thai rice, sugar and fertilizer export",
  sugar: "sugar fertilizer best prices",
  fertilizer: "commodity trading Thailand",
  oils: "wholesale rice sugar fertilizer",
  metals: "Global Win Co Ltd commodities",
};

export const categoryKeywordAnchors: Record<ProductCategory, string> = {
  rice: "Thai jasmine rice exporter",
  sugar: "ICUMSA-certified sugar wholesale",
  fertilizer: "NPK fertilizer wholesale",
  oils: "refined soybean oil bulk",
  metals: "copper cathode supplier",
};

/** Keyword-rich anchors for high-value product URLs. */
export const productKeywordAnchors: Record<string, string> = {
  "jasmine-rice-thai-hom-mali": "Thai jasmine rice (Hom Mali) export",
  "1121-sella-basmati-rice": "1121 Sella Basmati rice export",
  "thai-parboiled-rice": "parboiled rice wholesale",
  "thai-long-grain-rice": "Thai long grain rice export",
  "glutinous-rice": "glutinous rice wholesale",
  "quality-brown-rice": "quality brown rice export",
  "icumsa-45-white-refined-sugar": "ICUMSA 45 white sugar wholesale",
  "refined-white-cane-sugar-icumsa-45": "refined white cane sugar ICUMSA 45",
  "icumsa-150-cane-sugar": "ICUMSA 150 cane sugar",
  "refined-white-sugar-icumsa-150": "refined white sugar ICUMSA 150",
  "icumsa-600-1200-brown-sugar-2": "brown cane sugar ICUMSA 600",
  "refined-brown-sugar-icumsa-600-1200": "ICUMSA 600-1200 brown sugar",
  "organic-white-cane-sugar-1-45": "organic white cane sugar",
  "vhp-sugar": "VHP sugar export",
  urea: "urea fertilizer 46% nitrogen",
  npk: "NPK fertilizer wholesale",
  "dap-diammonium-phosphate": "DAP fertilizer export",
  "mapmonoammonium-phosphate": "MAP fertilizer wholesale",
  "refined-soybean-oil": "refined soybean oil bulk",
  "copper-cathode": "copper cathode supplier",
  "aluminum-ingot-a7": "aluminum ingot A7 supplier",
};

const featuredProductSlugs: Record<ProductCategory, string[]> = {
  rice: ["jasmine-rice-thai-hom-mali", "1121-sella-basmati-rice"],
  sugar: ["icumsa-45-white-refined-sugar", "icumsa-150-cane-sugar"],
  fertilizer: ["urea", "npk"],
  oils: ["refined-soybean-oil"],
  metals: ["copper-cathode", "aluminum-ingot-a7"],
};

const glossaryByCategory: Record<ProductCategory, { href: string; anchor: string }> = {
  rice: { href: "/glossary/#thai-hom-mali", anchor: "what is Thai Hom Mali rice" },
  sugar: { href: "/glossary/#icumsa-45", anchor: "what is ICUMSA 45 sugar" },
  fertilizer: { href: "/glossary/#npk-fertilizer", anchor: "NPK fertilizer grades explained" },
  oils: { href: "/glossary/#coa", anchor: "Certificate of Analysis (COA)" },
  metals: { href: "/glossary/#coa", anchor: "export Certificate of Analysis" },
};

const faqByCategory: Record<ProductCategory, { href: string; anchor: string }> = {
  rice: { href: "/faq/#rice", anchor: "how to import rice from Thailand" },
  sugar: { href: "/faq/#sugar", anchor: "ICUMSA 45 vs ICUMSA 150" },
  fertilizer: { href: "/faq/#fertilizer", anchor: "NPK fertilizer grades available" },
  oils: { href: "/faq/#shipping", anchor: "FOB rice export Thailand shipping terms" },
  metals: { href: "/faq/#certifications", anchor: "export quality certifications and COA" },
};

export const outboundByCategory: Record<ProductCategory, ExternalResourceLink[]> = {
  rice: [FAO_RICE, IRRI],
  sugar: [ICUMSA, FAO_SUGAR],
  fertilizer: [IFA, FAO],
  oils: [CODEX, FAO],
  metals: [LME, USGS_COPPER],
};

const generalOutbound: ExternalResourceLink[] = [FAO, THAI_TRADE];

function productAnchor(slug: string, fallbackName?: string): string {
  return productKeywordAnchors[slug] ?? fallbackName ?? slug.replace(/-/g, " ");
}

const FALLBACK_INTERNAL: InternalResourceLink[] = [
  { href: "/", anchor: homepageKeywordByTopic.general },
  { href: "/our-products", anchor: "wholesale rice sugar fertilizer catalog" },
  { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
  { href: "/our-products/sugar", anchor: categoryKeywordAnchors.sugar },
  { href: "/our-products/fertilizer", anchor: categoryKeywordAnchors.fertilizer },
  { href: "/faq", anchor: "how to import rice from Thailand" },
  { href: "/glossary", anchor: "what is ICUMSA 45 sugar" },
  { href: "/contact-us", anchor: "wholesale quote for export" },
];

function uniqueInternal(
  links: InternalResourceLink[],
  excludeHref?: string,
  limit = 7,
): InternalResourceLink[] {
  const seen = new Set<string>();
  const result: InternalResourceLink[] = [];

  for (const link of [...links, ...FALLBACK_INTERNAL]) {
    const href = link.href.split("#")[0];
    if (excludeHref && href === excludeHref) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    result.push(link);
    if (result.length >= limit) break;
  }

  return result;
}

function featuredProductLinks(category: ProductCategory): InternalResourceLink[] {
  return featuredProductSlugs[category]
    .map((slug) => {
      const product = getProductBySlug(slug);
      if (!product) return null;
      return { href: `/product/${slug}`, anchor: productAnchor(slug, product.name) };
    })
    .filter((link): link is InternalResourceLink => Boolean(link));
}

export const staticRelatedResources: Record<string, RelatedResourceSet> = {
  home: {
    internal: uniqueInternal([
      { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
      { href: "/our-products/sugar", anchor: categoryKeywordAnchors.sugar },
      { href: "/our-products/fertilizer", anchor: categoryKeywordAnchors.fertilizer },
      {
        href: "/product/icumsa-45-white-refined-sugar",
        anchor: productKeywordAnchors["icumsa-45-white-refined-sugar"],
      },
      {
        href: "/product/jasmine-rice-thai-hom-mali",
        anchor: productKeywordAnchors["jasmine-rice-thai-hom-mali"],
      },
      { href: "/faq", anchor: "how to import rice from Thailand" },
      { href: "/glossary", anchor: "what is ICUMSA 45 sugar" },
    ]),
    external: generalOutbound,
  },
  "about-us": {
    internal: uniqueInternal([
      { href: "/", anchor: homepageKeywordByTopic.general },
      { href: "/our-products", anchor: "wholesale rice sugar fertilizer catalog" },
      { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
      { href: "/our-products/sugar", anchor: categoryKeywordAnchors.sugar },
      { href: "/our-products/fertilizer", anchor: categoryKeywordAnchors.fertilizer },
      { href: "/faq", anchor: "commodity export FAQ" },
      { href: "/contact-us", anchor: "wholesale quote for export" },
    ]),
    external: generalOutbound,
  },
  "contact-us": {
    internal: uniqueInternal([
      { href: "/", anchor: homepageKeywordByTopic.sugar },
      { href: "/our-products", anchor: "wholesale rice sugar fertilizer catalog" },
      {
        href: "/product/icumsa-45-white-refined-sugar",
        anchor: productKeywordAnchors["icumsa-45-white-refined-sugar"],
      },
      { href: "/product/urea", anchor: productKeywordAnchors.urea },
      { href: "/about-us", anchor: "commodity trading Thailand company" },
      { href: "/faq", anchor: "how to request a wholesale quote" },
      { href: "/glossary/#fob", anchor: "FOB rice export Thailand terms" },
    ]),
    external: generalOutbound,
  },
  "our-products": {
    internal: uniqueInternal([
      { href: "/", anchor: homepageKeywordByTopic.oils },
      { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
      { href: "/our-products/sugar", anchor: categoryKeywordAnchors.sugar },
      { href: "/our-products/fertilizer", anchor: categoryKeywordAnchors.fertilizer },
      { href: "/our-products/oils", anchor: categoryKeywordAnchors.oils },
      { href: "/our-products/metals", anchor: categoryKeywordAnchors.metals },
      { href: "/faq", anchor: "how to import rice from Thailand" },
    ]),
    external: generalOutbound,
  },
  faq: {
    internal: uniqueInternal([
      { href: "/", anchor: homepageKeywordByTopic.fertilizer },
      { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
      { href: "/our-products/sugar", anchor: categoryKeywordAnchors.sugar },
      {
        href: "/product/icumsa-45-white-refined-sugar",
        anchor: productKeywordAnchors["icumsa-45-white-refined-sugar"],
      },
      { href: "/glossary", anchor: "commodity export glossary" },
      { href: "/glossary/#fob", anchor: "FOB vs CIF shipping terms" },
      { href: "/contact-us", anchor: "wholesale quote for export" },
    ]),
    external: [ICUMSA, FAO],
  },
  glossary: {
    internal: uniqueInternal([
      { href: "/", anchor: homepageKeywordByTopic.general },
      { href: "/our-products/sugar", anchor: categoryKeywordAnchors.sugar },
      { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
      { href: "/our-products/fertilizer", anchor: categoryKeywordAnchors.fertilizer },
      {
        href: "/product/jasmine-rice-thai-hom-mali",
        anchor: productKeywordAnchors["jasmine-rice-thai-hom-mali"],
      },
      { href: "/faq", anchor: "ICUMSA 45 vs ICUMSA 150" },
      { href: "/contact-us", anchor: "wholesale quote for export" },
    ]),
    external: [ICUMSA, IRRI],
  },
  "privacy-policy": {
    internal: uniqueInternal([
      { href: "/", anchor: homepageKeywordByTopic.metals },
      { href: "/about-us", anchor: "about Global Win Co Ltd" },
      { href: "/our-products", anchor: "wholesale rice sugar fertilizer catalog" },
      { href: "/contact-us", anchor: "contact export team" },
      { href: "/faq", anchor: "commodity export FAQ" },
      { href: "/glossary", anchor: "commodity export glossary" },
      { href: "/our-products/rice", anchor: categoryKeywordAnchors.rice },
    ]),
    external: generalOutbound,
  },
};

export function getCategoryRelatedResources(category: ProductCategory): RelatedResourceSet {
  const siblingCategories = (["rice", "sugar", "fertilizer", "oils", "metals"] as const).filter(
    (item) => item !== category,
  );

  const internal = uniqueInternal(
    [
      { href: "/", anchor: homepageKeywordByTopic[category] },
      { href: "/our-products", anchor: "wholesale rice sugar fertilizer catalog" },
      ...featuredProductLinks(category),
      faqByCategory[category],
      glossaryByCategory[category],
      {
        href: `/our-products/${siblingCategories[0]}`,
        anchor: categoryKeywordAnchors[siblingCategories[0]],
      },
      { href: "/contact-us", anchor: "wholesale quote for export" },
    ],
    `/our-products/${category}`,
  );

  return { internal, external: outboundByCategory[category] };
}

export function getProductRelatedResources(product: Product): RelatedResourceSet {
  const related = getRelatedProducts(product.slug, 2);
  const relatedLinks = related.map((item) => ({
    href: `/product/${item.slug}`,
    anchor: productAnchor(item.slug, item.name),
  }));

  const extras: InternalResourceLink[] =
    relatedLinks.length < 2 ? featuredProductLinks(product.category) : [];

  const internal = uniqueInternal(
    [
      { href: "/", anchor: homepageKeywordByTopic[product.category] },
      {
        href: `/our-products/${product.category}`,
        anchor: categoryKeywordAnchors[product.category],
      },
      { href: "/our-products", anchor: "wholesale rice sugar fertilizer catalog" },
      ...relatedLinks,
      ...extras,
      faqByCategory[product.category],
      glossaryByCategory[product.category],
      { href: "/contact-us", anchor: "wholesale quote for export" },
    ],
    `/product/${product.slug}`,
  );

  return { internal, external: outboundByCategory[product.category] };
}
