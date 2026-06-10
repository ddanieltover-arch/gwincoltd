import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { OperationsGallery } from "@/components/sections/OperationsGallery";
import { CTABanner } from "@/components/sections/CTABanner";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProductsHeader, HomeFeatures } from "@/components/sections/HomeFeatures";
import { ProductGrid } from "@/components/products/ProductGrid";
import { FadeIn } from "@/components/shared/FadeIn";
import { products } from "@/data/products";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Sugar, Rice & Fertilizer — Best Prices from Thailand",
  description: siteConfig.description,
};

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <>
      <Hero />
      <HomeFeatures />
      <CategoryShowcase />
      <OperationsGallery />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FeaturedProductsHeader />
          <FadeIn delay={0.1}>
            <div className="mb-10 flex justify-end md:-mt-16">
              <Link
                href="/our-products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
              >
                View all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
          <ProductGrid products={featured} />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
