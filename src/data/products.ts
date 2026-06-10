import type { Product, ProductCategory } from "@/types";
import { upload } from "@/lib/images";
import { formatProductName } from "@/lib/utils";

function product(
  slug: string,
  category: ProductCategory,
  image: string,
  description: string,
  images?: string[],
): Product {
  return {
    slug,
    name: formatProductName(slug),
    category,
    description,
    image,
    images,
  };
}

export const products: Product[] = [
  product(
    "aluminum-ingot-a7",
    "metals",
    upload("2026/05/1678123773.83223_aluminium_ingot.jpg"),
    "High-purity aluminum ingot A7 grade for industrial and manufacturing applications.",
  ),
  product(
    "copper-cathode",
    "metals",
    upload("2026/05/copper-cathode-1000x1000-1.jpg"),
    "Premium copper cathode meeting international LME standards for global trade.",
  ),
  product(
    "copper-wire",
    "metals",
    upload("2026/05/81CrzkvMmiL._SL1500_.jpg"),
    "Industrial copper wire available in multiple gauges for electrical and manufacturing use.",
    [upload("2026/05/51xSRSnMQrL.jpg"), upload("2026/05/c921ab38-0582-406e-b0ad-6f14e13a03c7.__CR00970600_PT0_SX970_V1___.jpg")],
  ),
  product(
    "refined-soybean-oil",
    "oils",
    upload("2025/05/soybean-oil-r-768x511-1.jpg"),
    "Refined soybean oil for food processing and commercial applications.",
    [upload("2025/05/soybean-oil-v.jpg")],
  ),
  product(
    "refined-white-cane-sugar-icumsa-45",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "Refined white cane sugar ICUMSA 45 — the global benchmark for premium white sugar.",
  ),
  product(
    "refined-brown-sugar-icumsa-600-1200",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "Refined brown sugar ICUMSA 600–1200 for food and beverage industries.",
  ),
  product(
    "superphosphate",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-30.png"),
    "Single superphosphate fertilizer for improved root development and crop yields.",
    [
      upload("2024/12/Logo_GWinCoLtd-Instagram-Post-31.png"),
      upload("2024/12/Logo_GWinCoLtd-Instagram-Post-32.png"),
    ],
  ),
  product(
    "dap-diammonium-phosphate",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-38.png"),
    "DAP (Diammonium Phosphate) — a high-analysis phosphorus and nitrogen fertilizer.",
    [upload("2024/12/Logo_GWinCoLtd-Instagram-Post-37.png")],
  ),
  product(
    "automotive-urea",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-28.png"),
    "Automotive-grade urea (AdBlue/DEF) for diesel emission reduction systems.",
  ),
  product(
    "ammonium-sulfate",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-25.png"),
    "Ammonium sulfate fertilizer providing nitrogen and sulfur for crop nutrition.",
  ),
  product(
    "thai-jasmine-black-cargo-rice",
    "rice",
    upload("2024/12/Black_Rice.jpg"),
    "Thai jasmine black cargo rice — nutrient-rich whole grain for premium markets.",
  ),
  product(
    "thai-jasmine-red-cargo-rice",
    "rice",
    upload("2024/12/DUF-403204_576_576_500x.webp"),
    "Thai jasmine red cargo rice with distinctive color and nutty flavor profile.",
  ),
  product(
    "glutinous-rice",
    "rice",
    upload("2010/06/What-Is-Glutinous-Rice-1024x576-1-e1733624190426.jpg"),
    "Premium glutinous (sticky) rice for Asian cuisine and specialty food markets.",
    [upload("2024/06/Glutinous-rice-600x450-1.jpg")],
  ),
  product(
    "thai-hom-patum-rice",
    "rice",
    upload("2024/12/Uaebc017e430544eabf7685956ed3f1f8J.jpg_720x720q50.avif"),
    "Thai Hom Patum rice — a long-grain variety prized for its texture and aroma.",
  ),
  product(
    "jasmine-rice-thai-hom-mali",
    "rice",
    upload("2010/06/hom-mali-700x700-1.webp"),
    "Authentic Thai Hom Mali jasmine rice — the world's most sought-after fragrant rice.",
    [upload("2010/06/hom-mali-thai-rice-700x700-1.webp"), upload("2024/06/1.-Thai-hommali-jasmine-rice-600x450-1.jpg")],
  ),
  product(
    "broken-rice",
    "rice",
    upload("2024/12/Broken-Rice-Raw-1.jpg"),
    "Broken rice suitable for brewing, animal feed, and food processing industries.",
  ),
  product(
    "thai-parboiled-rice",
    "rice",
    upload("2024/12/that-parboiled-rice.webp"),
    "Thai parboiled rice with enhanced nutritional retention and firm texture.",
  ),
  product(
    "refined-white-sugar-icumsa-150",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "Refined white sugar ICUMSA 150 for industrial and food manufacturing.",
  ),
  product(
    "vhp-sugar",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "VHP (Very High Polarization) raw cane sugar for refining and export.",
  ),
  product(
    "beet-sugar",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "Beet sugar for food processing and confectionery applications.",
  ),
  product(
    "icumsa-150-cane-sugar",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "ICUMSA 150 cane sugar meeting international quality specifications.",
  ),
  product(
    "icumsa-600-1200-brown-sugar-2",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "ICUMSA 600–1200 brown sugar for specialty food and beverage markets.",
  ),
  product(
    "icumsa-100-cane-sugar",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "ICUMSA 100 cane sugar — near-white refined sugar for premium applications.",
  ),
  product(
    "icumsa-45-white-refined-sugar",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "ICUMSA 45 white refined sugar — the highest grade for direct consumption.",
  ),
  product(
    "thai-long-grain-rice",
    "rice",
    upload("2024/12/Capture00.webp"),
    "Thai long grain rice for export to Middle East, Africa, and Asian markets.",
  ),
  product(
    "arborio-rice",
    "rice",
    upload("2010/06/arborio-rice-2.png"),
    "Arborio rice ideal for risotto and premium culinary applications.",
  ),
  product(
    "japonica-rice",
    "rice",
    upload("2010/06/japonic-700x700-1.webp"),
    "Japonica short-grain rice for sushi, Japanese cuisine, and specialty markets.",
    [upload("2010/06/japonic-.webp")],
  ),
  product(
    "1121-sella-basmati-rice",
    "rice",
    upload("2010/06/sela-.webp"),
    "1121 Sella Basmati rice — extra-long grain parboiled basmati for premium export.",
    [upload("2010/06/basmati-700x700-1.webp")],
  ),
  product(
    "quality-brown-rice",
    "rice",
    upload("2010/06/3434443.webp"),
    "Quality brown rice with intact bran layer for health-conscious markets.",
    [upload("2010/06/232322.webp")],
  ),
  product(
    "monopotassium-phosphate",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-23.png"),
    "Monopotassium phosphate (MKP) water-soluble fertilizer for foliar application.",
  ),
  product(
    "mapmonoammonium-phosphate",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-18.png"),
    "MAP (Monoammonium Phosphate) for balanced phosphorus and nitrogen nutrition.",
    [upload("2024/12/Logo_GWinCoLtd-Instagram-Post-20.png")],
  ),
  product(
    "urea",
    "fertilizer",
    upload("2010/06/Logo_GWinCoLtd-Instagram-Post-3.png"),
    "Agricultural-grade urea fertilizer with high nitrogen content for crop growth.",
  ),
  product(
    "nitrogen-fertilizer",
    "fertilizer",
    upload("2010/06/Logo_GWinCoLtd-Instagram-Post-5.png"),
    "Nitrogen fertilizer blends for enhanced vegetative growth and yield improvement.",
  ),
  product(
    "zinc-sulfate-heptahydrate",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-8.png"),
    "Zinc sulfate heptahydrate micronutrient fertilizer for zinc-deficient soils.",
  ),
  product(
    "npk",
    "fertilizer",
    upload("2024/12/Logo_GWinCoLtd-Instagram-Post-16.png"),
    "NPK compound fertilizer with balanced nitrogen, phosphorus, and potassium ratios.",
    [upload("2024/12/Logo_GWinCoLtd-Instagram-Post-17.png")],
  ),
  product(
    "organic-white-cane-sugar-1-45",
    "sugar",
    upload("2024/06/brown-sugar.webp"),
    "Organic white cane sugar ICUMSA 1–45 for certified organic food production.",
  ),
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
