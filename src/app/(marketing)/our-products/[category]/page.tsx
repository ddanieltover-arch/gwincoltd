import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { PageHero } from "@/components/shared/PageHero";
import { categoryDescriptions, categoryLabels, productCategories } from "@/config/site";
import { categorySeo } from "@/data/seo";
import { seoToMetadata } from "@/lib/seo";
import type { ProductCategory } from "@/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return productCategories.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!productCategories.includes(category as ProductCategory)) {
    return { title: "Products Not Found" };
  }

  const key = category as ProductCategory;
  return seoToMetadata(categorySeo[key], {
    title: categoryLabels[key],
    description: categoryDescriptions[key],
  });
}

export default async function CategoryProductsPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!productCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const key = category as ProductCategory;

  return (
    <>
      <PageHero
        title={categoryLabels[key]}
        description={categoryDescriptions[key]}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Suspense fallback={<p className="text-emerald-800">Loading products...</p>}>
            <ProductCatalog defaultCategory={key} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
