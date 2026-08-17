/**
 * Validates SEO metadata coverage in src/data/seo.ts
 * Run: npm run validate:seo
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

function readFile(relative) {
  return fs.readFileSync(path.join(ROOT, relative), "utf8");
}

function extractRecord(source, name) {
  const blockMatch = source.match(
    new RegExp(`export const ${name}[^=]*=\\s*(\\{[\\s\\S]*?\\n\\});`),
  );
  if (!blockMatch) return {};
  return new Function(`return ${blockMatch[1]}`)();
}

function extractSlugs(source) {
  const slugs = [];
  const regex = /product\(\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(source)) !== null) slugs.push(match[1]);
  return slugs;
}

const seoSource = readFile("src/data/seo.ts");
const productsSource = readFile("src/data/products.ts");
const productSeo = extractRecord(seoSource, "productSeo");
const pageSeo = extractRecord(seoSource, "pageSeo");
const slugs = extractSlugs(productsSource);

const errors = [];

for (const slug of slugs) {
  const seo = productSeo[slug];
  if (!seo) errors.push(`Missing productSeo entry: ${slug}`);
  else {
    if (!seo.title) errors.push(`Missing title: product/${slug}`);
    if (!seo.description) errors.push(`Missing description: product/${slug}`);
  }
}

for (const [key, seo] of Object.entries(pageSeo)) {
  if (!seo.title) errors.push(`Missing title: page/${key}`);
  if (!seo.description) errors.push(`Missing description: page/${key}`);
}

const requiredFiles = [
  "public/llms.txt",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/lib/schema.ts",
];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(ROOT, file))) errors.push(`Missing file: ${file}`);
}

if (errors.length > 0) {
  console.error("SEO validation failed:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log(`SEO validation passed — ${slugs.length} products, ${Object.keys(pageSeo).length} pages`);
