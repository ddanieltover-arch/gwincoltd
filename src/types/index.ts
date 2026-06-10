export type ProductCategory =
  | "rice"
  | "sugar"
  | "fertilizer"
  | "oils"
  | "metals";

export interface Product {
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  descriptionHtml?: string;
  image: string;
  images?: string[];
  highlights?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
