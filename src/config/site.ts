import type { NavItem, ProductCategory } from "@/types";

export const siteConfig = {
  name: "Global Win Co. Ltd",
  shortName: "GWINCOLTD",
  thaiName: "บริษัท โกลบอล วิน จำกัด",
  logo: "/logo.png",
  officeImage: "/office.png",
  tagline: "Multi-Commodity Trading from Thailand",
  description:
    "Leading grower, wholesaler, and exporter of rice, sugar, fertilizer, grains, and refined oils. Serving international markets since 2016.",
  url: "https://gwincoltd.com",
  email: "sales@gwincoltd.com",
  phone: "+66 63 371 6324",
  whatsapp: "66633716324",
  whatsappMessage:
    "Hello Global Win Co. Ltd, I would like to enquire about your products.",
  address: "15/1 Weruwan, Sateng, เมือง, Yala 95000, Thailand",
  founded: 2016,
  experienceYears: 10,
} as const;

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Products", href: "/our-products" },
  { label: "Contact", href: "/contact-us" },
];

export const categoryLabels: Record<ProductCategory, string> = {
  rice: "Rice",
  sugar: "Sugar",
  fertilizer: "Fertilizer",
  oils: "Refined Oils",
  metals: "Metals",
};

export const categoryDescriptions: Record<ProductCategory, string> = {
  rice: "Premium Thai rice varieties for global export markets.",
  sugar: "ICUMSA-certified refined cane and beet sugars.",
  fertilizer: "NPK compounds, phosphates, urea, and specialty blends.",
  oils: "Refined vegetable oils for food and industrial use.",
  metals: "Industrial-grade aluminum and copper commodities.",
};

/** All product categories in display order */
export const productCategories: ProductCategory[] = [
  "rice",
  "sugar",
  "fertilizer",
  "oils",
  "metals",
];

/** Legacy WooCommerce /product-category/ slugs → current category keys */
export const legacyCategorySlugs: Record<string, ProductCategory> = {
  rice: "rice",
  sugar: "sugar",
  fertilizer: "fertilizer",
  oils: "oils",
  "refined-oils": "oils",
  "refined-oil": "oils",
  metals: "metals",
};

export function resolveCategorySlug(slug: string): ProductCategory | undefined {
  return legacyCategorySlugs[slug.toLowerCase()];
}
