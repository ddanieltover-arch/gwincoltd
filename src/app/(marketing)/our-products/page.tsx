import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { PageHero } from "@/components/shared/PageHero";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Products",
  description: `Browse ${siteConfig.name}'s full catalog of rice, sugar, fertilizer, oils, and metals for export.`,
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our Products"
        description="Filter by category or search our full catalog of export-grade commodities."
      />

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
