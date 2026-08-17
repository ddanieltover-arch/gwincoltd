import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { AnswerCapsule } from "@/components/shared/AnswerCapsule";
import { PageHero } from "@/components/shared/PageHero";
import { products } from "@/data/products";
import { pageSeo } from "@/data/seo";
import { siteConfig } from "@/config/site";
import { seoToMetadata } from "@/lib/seo";

export const metadata: Metadata = seoToMetadata(
  pageSeo["our-products"],
  {
    title: "Our Products",
    description: `Browse ${siteConfig.name}'s full catalog of rice, sugar, fertilizer, oils, and metals for export.`,
  },
  undefined,
  { path: "/our-products" },
);

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our Products"
        description="Filter by category or search our full catalog of export-grade commodities."
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <AnswerCapsule>
            Browse {siteConfig.name}&apos;s full export catalog — rice, sugar, fertilizer, refined
            oils, and metals — with {products.length} products available for wholesale quote. Filter by category or
            search by name.
          </AnswerCapsule>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Suspense fallback={<p className="text-emerald-800">Loading products...</p>}>
            <ProductCatalog />
          </Suspense>
        </div>
      </section>
    </>
  );
}
