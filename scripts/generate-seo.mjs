import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SQL_PATH = path.resolve(__dirname, "../../../../sql/gwincoltd.sql");
const OUT = path.resolve(__dirname, "../src/data/seo.ts");

const SITE = {
  name: "Global Win Co. Ltd",
  description:
    "Leading grower, wholesaler, and exporter of rice, sugar, fertilizer, grains, and refined oils. Serving international markets since 2016.",
};

const CATEGORY_LABELS = {
  rice: "Rice",
  sugar: "Sugar",
  fertilizer: "Fertilizer",
  oils: "Refined Oils",
  metals: "Metals",
};

const CATEGORY_DESCRIPTIONS = {
  rice: "Premium Thai rice varieties for global export markets.",
  sugar: "ICUMSA-certified refined cane and beet sugars.",
  fertilizer: "NPK compounds, phosphates, urea, and specialty blends.",
  oils: "Refined vegetable oils for food and industrial use.",
  metals: "Industrial-grade aluminum and copper commodities.",
};

const PAGE_FALLBACK_DESCRIPTIONS = {
  home: SITE.description,
  "about-us": `Learn about ${SITE.name} — a leading multi-commodity trading company based in Thailand.`,
  "contact-us": `Get in touch with ${SITE.name} for wholesale quotes on rice, sugar, and fertilizer.`,
  "our-products": `Browse ${SITE.name}'s full catalog of rice, sugar, fertilizer, oils, and metals for export.`,
  "privacy-policy": `How ${SITE.name} collects, uses, and protects your personal information.`,
};

function isShortcodeNoise(value) {
  return /\[section|\[row|\[ux_|\[col|\[button/i.test(value);
}

const SEO_KEYS = [
  "rank_math_title",
  "rank_math_description",
  "rank_math_focus_keyword",
  "rank_math_robots",
  "rank_math_canonical_url",
];

function parseMysqlValues(line) {
  let s = line.trim();
  if (s.startsWith("(")) s = s.slice(1);
  if (s.endsWith("),")) s = s.slice(0, -2);
  else if (s.endsWith(")")) s = s.slice(0, -1);

  const fields = [];
  let i = 0;

  while (i < s.length) {
    if (s[i] === "'") {
      i += 1;
      let val = "";
      while (i < s.length) {
        const ch = s[i];
        if (ch === "\\") {
          const next = s[i + 1];
          if (next === "r") {
            val += "\r";
            i += 2;
          } else if (next === "n") {
            val += "\n";
            i += 2;
          } else if (next === "t") {
            val += "\t";
            i += 2;
          } else {
            val += next ?? "";
            i += 2;
          }
        } else if (ch === "'" && s[i + 1] === "'") {
          val += "'";
          i += 2;
        } else if (ch === "'") {
          i += 1;
          break;
        } else {
          val += ch;
          i += 1;
        }
      }
      fields.push(val);
      if (s[i] === ",") i += 1;
    } else if (s.slice(i, i + 4) === "NULL") {
      fields.push(null);
      i += 4;
      if (s[i] === ",") i += 1;
    } else {
      const start = i;
      while (i < s.length && s[i] !== ",") i += 1;
      fields.push(s.slice(start, i).trim());
      if (s[i] === ",") i += 1;
    }
  }

  return fields;
}

function parsePhpSerializedString(str) {
  const out = {};
  const regex = /s:\d+:"([^"]+)";s:\d+:"([^"]*)";/g;
  let m;
  while ((m = regex.exec(str)) !== null) {
    out[m[1]] = m[2];
  }
  return out;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#0?39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseRobots(value) {
  if (!value) return { index: true, follow: true };
  const directives = [];
  const regex = /s:\d+:"([^"]+)"/g;
  let m;
  while ((m = regex.exec(value)) !== null) {
    directives.push(m[1]);
  }
  return {
    index: !directives.includes("noindex"),
    follow: !directives.includes("nofollow"),
  };
}

function cleanWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function resolveTemplate(template, vars) {
  if (!template) return "";
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.split(`%${key}%`).join(value ?? "");
  }
  return cleanWhitespace(result);
}

function resolveDescription(template, excerpt, title) {
  const resolved = resolveTemplate(template, {
    excerpt: excerpt ?? "",
    title: title ?? "",
    sitename: SITE.name,
    sitedesc: SITE.description,
    sep: "-",
    page: "",
    term: "",
    term_description: "",
  });

  return cleanWhitespace(resolved.replace(/^%excerpt%\s*/i, excerpt ?? ""));
}

const sql = fs.readFileSync(SQL_PATH, "utf8");
const lines = sql.split("\n");

const posts = [];
const seoByPost = new Map();
let titleOptions = {};

for (const line of lines) {
  if (!line.startsWith("(")) continue;

  if (line.includes(",0,'product',") || line.includes(",0,'page',")) {
    const fields = parseMysqlValues(line);
    if (fields.length < 22) continue;
    const postType = fields[20];
    if (postType !== "product" && postType !== "page") continue;
    if (fields[7] !== "publish") continue;

    const excerpt = stripHtml(fields[6] ?? "");
    const contentPlain = stripHtml(fields[4] ?? "").slice(0, 320);

    posts.push({
      id: Number(fields[0]),
      slug: fields[11] ?? "",
      title: fields[5] ?? "",
      type: postType,
      excerpt: excerpt || contentPlain,
    });
  }

  for (const key of SEO_KEYS) {
    if (line.includes(`,'${key}',`)) {
      const fields = parseMysqlValues(line);
      if (fields.length >= 4 && fields[2] === key) {
        const postId = Number(fields[1]);
        if (!seoByPost.has(postId)) seoByPost.set(postId, {});
        seoByPost.get(postId)[key] = fields[3];
      }
    }
  }

  if (line.includes("'rank-math-options-titles'")) {
    const fields = parseMysqlValues(line);
    if (fields[1] === "rank-math-options-titles") {
      titleOptions = parsePhpSerializedString(fields[2]);
    }
  }
}

const separator = titleOptions.title_separator?.trim() || "-";
const sep = ` ${separator} `;

function buildSeo(post, titleTemplate, descriptionTemplate) {
  const meta = seoByPost.get(post.id) ?? {};
  const vars = {
    title: post.title,
    excerpt: post.excerpt,
    sitename: SITE.name,
    sitedesc: SITE.description,
    sep,
    page: "",
    term: "",
    term_description: "",
  };

  const title = meta.rank_math_title
    ? cleanWhitespace(meta.rank_math_title)
    : resolveTemplate(titleTemplate, vars);

  let description = meta.rank_math_description
    ? resolveDescription(meta.rank_math_description, post.excerpt, post.title)
    : resolveDescription(descriptionTemplate, post.excerpt, post.title);

  if (!description || isShortcodeNoise(description)) {
    description = PAGE_FALLBACK_DESCRIPTIONS[post.slug] ?? description;
  }

  const entry = {
    title,
    description: cleanWhitespace(description),
  };

  if (meta.rank_math_focus_keyword) {
    entry.focusKeyword = meta.rank_math_focus_keyword;
  }

  if (meta.rank_math_robots) {
    entry.robots = parseRobots(meta.rank_math_robots);
  }

  if (meta.rank_math_canonical_url) {
    entry.canonical = meta.rank_math_canonical_url;
  }

  return entry;
}

const products = {};
const pages = {};

for (const post of posts) {
  if (post.type === "product") {
    products[post.slug] = buildSeo(
      post,
      titleOptions.pt_product_title ?? "%title% %sep% %sitename%",
      titleOptions.pt_product_description ?? "%excerpt%",
    );
  } else {
    const titleTemplate =
      post.slug === "home"
        ? titleOptions.homepage_title ?? "%sitename% %page% %sep% %sitedesc%"
        : titleOptions.pt_page_title ?? "%title% %sep% %sitename%";
    const descriptionTemplate =
      post.slug === "home"
        ? titleOptions.homepage_description ?? ""
        : titleOptions.pt_page_description ?? "%excerpt%";

    pages[post.slug] = buildSeo(post, titleTemplate, descriptionTemplate);
  }
}

const categories = {};
for (const [slug, label] of Object.entries(CATEGORY_LABELS)) {
  const vars = {
    term: label,
    sitename: SITE.name,
    sep,
    page: "",
  };
  categories[slug] = {
    title: resolveTemplate(
      titleOptions.tax_product_cat_title ?? "%term% %sep% %sitename%",
      vars,
    ),
    description: resolveTemplate(
      titleOptions.tax_product_cat_description ?? "%term_description%",
      {
        ...vars,
        term_description: CATEGORY_DESCRIPTIONS[slug] ?? "",
      },
    ),
  };
}

const customCount = posts.filter((post) => {
  const meta = seoByPost.get(post.id) ?? {};
  return meta.rank_math_title || meta.rank_math_description;
}).length;

const file = `import type { SeoEntry, SeoTemplates } from "@/types/seo";

/** Generated from gwincoltd.sql Rank Math data — run \`npm run generate:seo\` to refresh */
export const seoTemplates: SeoTemplates = ${JSON.stringify(
  {
    separator,
    homepageTitle: titleOptions.homepage_title ?? "",
    homepageDescription: titleOptions.homepage_description ?? "",
    productTitle: titleOptions.pt_product_title ?? "%title% %sep% %sitename%",
    productDescription: titleOptions.pt_product_description ?? "%excerpt%",
    pageTitle: titleOptions.pt_page_title ?? "%title% %sep% %sitename%",
    pageDescription: titleOptions.pt_page_description ?? "%excerpt%",
    categoryTitle: titleOptions.tax_product_cat_title ?? "%term% %sep% %sitename%",
    categoryDescription:
      titleOptions.tax_product_cat_description ?? "%term_description%",
  },
  null,
  2,
)};

export const productSeo: Record<string, SeoEntry> = ${JSON.stringify(products, null, 2)};

export const pageSeo: Record<string, SeoEntry> = ${JSON.stringify(pages, null, 2)};

export const categorySeo: Record<string, SeoEntry> = ${JSON.stringify(categories, null, 2)};
`;

fs.writeFileSync(OUT, file, "utf8");
console.log(`Generated ${OUT}`);
console.log(`Products: ${Object.keys(products).length}, Pages: ${Object.keys(pages).length}`);
console.log(`Custom Rank Math overrides: ${customCount}`);
