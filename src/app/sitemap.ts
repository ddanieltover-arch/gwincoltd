import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { productCategories } from "@/config/site";
import { absoluteUrl } from "@/lib/urls";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/about-us/",
    "/contact-us/",
    "/our-products/",
    "/faq/",
    "/glossary/",
    "/privacy-policy/",
    ...productCategories.map((category) => `/our-products/${category}/`),
  ];

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/our-products/") && path !== "/our-products/" ? 0.9 : 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/product/${product.slug}/`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...productPages];
}
