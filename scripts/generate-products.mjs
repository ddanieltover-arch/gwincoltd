import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXTRACTED = path.resolve(__dirname, "../src/data/wp-extracted.json");
const OUT = path.resolve(__dirname, "../src/data/products.ts");

const existingCategories = {
  "aluminum-ingot-a7": "metals",
  "copper-cathode": "metals",
  "copper-wire": "metals",
  "refined-soybean-oil": "oils",
  "refined-white-cane-sugar-icumsa-45": "sugar",
  "refined-brown-sugar-icumsa-600-1200": "sugar",
  superphosphate: "fertilizer",
  "dap-diammonium-phosphate": "fertilizer",
  "automotive-urea": "fertilizer",
  "ammonium-sulfate": "fertilizer",
  "thai-jasmine-black-cargo-rice": "rice",
  "thai-jasmine-red-cargo-rice": "rice",
  "glutinous-rice": "rice",
  "thai-hom-patum-rice": "rice",
  "jasmine-rice-thai-hom-mali": "rice",
  "broken-rice": "rice",
  "thai-parboiled-rice": "rice",
  "refined-white-sugar-icumsa-150": "sugar",
  "vhp-sugar": "sugar",
  "beet-sugar": "sugar",
  "icumsa-150-cane-sugar": "sugar",
  "icumsa-600-1200-brown-sugar-2": "sugar",
  "icumsa-100-cane-sugar": "sugar",
  "icumsa-45-white-refined-sugar": "sugar",
  "thai-long-grain-rice": "rice",
  "arborio-rice": "rice",
  "japonica-rice": "rice",
  "1121-sella-basmati-rice": "rice",
  "quality-brown-rice": "rice",
  "monopotassium-phosphate": "fertilizer",
  "mapmonoammonium-phosphate": "fertilizer",
  urea: "fertilizer",
  "nitrogen-fertilizer": "fertilizer",
  "zinc-sulfate-heptahydrate": "fertilizer",
  npk: "fertilizer",
  "organic-white-cane-sugar-1-45": "sugar",
};

const existingImages = {
  "aluminum-ingot-a7": {
    image: "2026/05/1678123773.83223_aluminium_ingot.jpg",
    images: [],
  },
  "copper-cathode": { image: "2026/05/copper-cathode-1000x1000-1.jpg", images: [] },
  "copper-wire": {
    image: "2026/05/81CrzkvMmiL._SL1500_.jpg",
    images: ["2026/05/51xSRSnMQrL.jpg", "2026/05/c921ab38-0582-406e-b0ad-6f14e13a03c7.__CR00970600_PT0_SX970_V1___.jpg"],
  },
  "refined-soybean-oil": {
    image: "2025/05/soybean-oil-r-768x511-1.jpg",
    images: ["2025/05/soybean-oil-v.jpg"],
  },
  "refined-white-cane-sugar-icumsa-45": { image: "2024/06/brown-sugar.webp", images: [] },
  "refined-brown-sugar-icumsa-600-1200": { image: "2024/06/brown-sugar.webp", images: [] },
  superphosphate: {
    image: "2024/12/Logo_GWinCoLtd-Instagram-Post-30.png",
    images: ["2024/12/Logo_GWinCoLtd-Instagram-Post-31.png", "2024/12/Logo_GWinCoLtd-Instagram-Post-32.png"],
  },
  "dap-diammonium-phosphate": {
    image: "2024/12/Logo_GWinCoLtd-Instagram-Post-38.png",
    images: ["2024/12/Logo_GWinCoLtd-Instagram-Post-37.png"],
  },
  "automotive-urea": { image: "2024/12/Logo_GWinCoLtd-Instagram-Post-28.png", images: [] },
  "ammonium-sulfate": { image: "2024/12/Logo_GWinCoLtd-Instagram-Post-25.png", images: [] },
  "thai-jasmine-black-cargo-rice": { image: "2024/12/Black_Rice.jpg", images: [] },
  "thai-jasmine-red-cargo-rice": { image: "2024/12/DUF-403204_576_576_500x.webp", images: [] },
  "glutinous-rice": {
    image: "2010/06/What-Is-Glutinous-Rice-1024x576-1-e1733624190426.jpg",
    images: ["2024/06/Glutinous-rice-600x450-1.jpg"],
  },
  "thai-hom-patum-rice": { image: "2024/12/Uaebc017e430544eabf7685956ed3f1f8J.jpg_720x720q50.avif", images: [] },
  "jasmine-rice-thai-hom-mali": {
    image: "2010/06/hom-mali-700x700-1.webp",
    images: ["2010/06/hom-mali-thai-rice-700x700-1.webp", "2024/06/1.-Thai-hommali-jasmine-rice-600x450-1.jpg"],
  },
  "broken-rice": { image: "2024/12/Broken-Rice-Raw-1.jpg", images: [] },
  "thai-parboiled-rice": { image: "2024/12/that-parboiled-rice.webp", images: [] },
  "refined-white-sugar-icumsa-150": { image: "2024/06/brown-sugar.webp", images: [] },
  "vhp-sugar": { image: "2024/06/brown-sugar.webp", images: [] },
  "beet-sugar": { image: "2024/06/brown-sugar.webp", images: [] },
  "icumsa-150-cane-sugar": { image: "2024/06/brown-sugar.webp", images: [] },
  "icumsa-600-1200-brown-sugar-2": { image: "2024/06/brown-sugar.webp", images: [] },
  "icumsa-100-cane-sugar": { image: "2024/06/brown-sugar.webp", images: [] },
  "icumsa-45-white-refined-sugar": { image: "2024/06/brown-sugar.webp", images: [] },
  "thai-long-grain-rice": { image: "2024/12/Capture00.webp", images: [] },
  "arborio-rice": { image: "2010/06/arborio-rice-2.png", images: [] },
  "japonica-rice": {
    image: "2010/06/japonic-700x700-1.webp",
    images: ["2010/06/japonic-.webp"],
  },
  "1121-sella-basmati-rice": {
    image: "2010/06/sela-.webp",
    images: ["2010/06/basmati-700x700-1.webp"],
  },
  "quality-brown-rice": {
    image: "2010/06/3434443.webp",
    images: ["2010/06/232322.webp"],
  },
  "monopotassium-phosphate": { image: "2024/12/Logo_GWinCoLtd-Instagram-Post-23.png", images: [] },
  "mapmonoammonium-phosphate": {
    image: "2024/12/Logo_GWinCoLtd-Instagram-Post-18.png",
    images: ["2024/12/Logo_GWinCoLtd-Instagram-Post-20.png"],
  },
  urea: { image: "2010/06/Logo_GWinCoLtd-Instagram-Post-3.png", images: [] },
  "nitrogen-fertilizer": { image: "2010/06/Logo_GWinCoLtd-Instagram-Post-5.png", images: [] },
  "zinc-sulfate-heptahydrate": { image: "2024/12/Logo_GWinCoLtd-Instagram-Post-8.png", images: [] },
  npk: {
    image: "2024/12/Logo_GWinCoLtd-Instagram-Post-16.png",
    images: ["2024/12/Logo_GWinCoLtd-Instagram-Post-17.png"],
  },
  "organic-white-cane-sugar-1-45": { image: "2024/06/brown-sugar.webp", images: [] },
};

function tsString(value) {
  return JSON.stringify(value);
}

function pickImagePaths(slug, wp) {
  const existing = existingImages[slug];
  if (existing) return existing;

  const image = wp.wpThumbnail ?? wp.wpGallery?.[0] ?? "2024/06/brown-sugar.webp";
  const images = (wp.wpGallery ?? []).filter((p) => p !== image);
  return { image, images };
}

const { products } = JSON.parse(fs.readFileSync(EXTRACTED, "utf8"));

const blocks = products.map((wp) => {
  const category = existingCategories[wp.slug];
  if (!category) throw new Error(`Missing category for ${wp.slug}`);

  const { image, images } = pickImagePaths(wp.slug, wp);
  const summary = wp.description.replace(/\s+/g, " ").trim().slice(0, 320);

  const args = [
    tsString(wp.slug),
    tsString(category),
    `upload(${tsString(image)})`,
    tsString(summary),
  ];

  let extra = "";
  if (images.length > 0) {
    extra += `,\n    [${images.map((i) => `upload(${tsString(i)})`).join(", ")}]`;
  } else {
    extra += ",\n    undefined";
  }
  extra += `,\n    ${tsString(wp.name)}`;
  extra += `,\n    ${tsString(wp.descriptionHtml)}`;

  return `  product(\n    ${args.join(",\n    ")}${extra},\n  )`;
});

const file = `import type { Product, ProductCategory } from "@/types";
import { upload } from "@/lib/images";

function product(
  slug: string,
  category: ProductCategory,
  image: string,
  description: string,
  images?: string[],
  name?: string,
  descriptionHtml?: string,
): Product {
  return {
    slug,
    name: name ?? slug,
    category,
    description,
    image,
    images,
    descriptionHtml,
  };
}

export const products: Product[] = [
${blocks.join(",\n")}
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
`;

fs.writeFileSync(OUT, file, "utf8");
console.log(`Generated ${products.length} products -> ${OUT}`);

execSync("node scripts/fix-description-images.mjs", { stdio: "inherit" });
