import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnswerCapsule } from "@/components/shared/AnswerCapsule";
import { RelatedResources } from "@/components/shared/RelatedResources";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { CTABanner } from "@/components/sections/CTABanner";
import { Hero } from "@/components/sections/Hero";
import { FeaturedProductsHeader, HomeFeatures } from "@/components/sections/HomeFeatures";
import { OperationsGallery } from "@/components/sections/OperationsGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { products } from "@/data/products";
import { pageSeo } from "@/data/seo";
import { siteConfig } from "@/config/site";
import { staticRelatedResources } from "@/data/related-links";
import { seoToMetadata } from "@/lib/seo";

export const metadata = seoToMetadata(
  pageSeo.home,
  {
    title: "Sugar, Rice & Fertilizer — Best Prices from Thailand",
    description: siteConfig.description,
  },
  undefined,
  { path: "/" },
);

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <>
      <Hero />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <AnswerCapsule>
            {siteConfig.name} is a Thailand-based B2B exporter of{" "}
            <Link href="/our-products/rice" className="font-semibold underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800">
              Thai jasmine rice
            </Link>
            ,{" "}
            <Link href="/our-products/sugar" className="font-semibold underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800">
              ICUMSA 45 white sugar
            </Link>
            , and{" "}
            <Link href="/our-products/fertilizer" className="font-semibold underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800">
              NPK fertilizer
            </Link>{" "}
            — plus refined oils and metals — supplying certified agricultural commodities to
            international importers since {siteConfig.founded}.
          </AnswerCapsule>
        </div>
      </section>

      <HomeFeatures />
      <CategoryShowcase />
      <OperationsGallery />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FeaturedProductsHeader />
          <div className="mb-10 flex justify-end md:-mt-16">
            <Link
              href="/our-products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              View all products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <RelatedResources {...staticRelatedResources.home} />
      <CTABanner />
    </>
  );
}
