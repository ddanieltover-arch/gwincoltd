import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { AnswerCapsule } from "@/components/shared/AnswerCapsule";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { RelatedResources } from "@/components/shared/RelatedResources";
import { categoryContent } from "@/data/category-content";
import { getCategoryRelatedResources, homepageKeywordByTopic } from "@/data/related-links";
import { categoryDescriptions, categoryLabels, productCategories } from "@/config/site";
import { categorySeo } from "@/data/seo";
import { breadcrumbSchema } from "@/lib/schema";
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
  return seoToMetadata(
    categorySeo[key],
    {
      title: categoryLabels[key],
      description: categoryDescriptions[key],
    },
    undefined,
    { path: `/our-products/${key}` },
  );
}

export default async function CategoryProductsPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!productCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const key = category as ProductCategory;
  const content = categoryContent[key];
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Our Products", path: "/our-products" },
    { name: categoryLabels[key], path: `/our-products/${key}` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <PageHero
        title={categoryLabels[key]}
        description={categoryDescriptions[key]}
      />

      <section className="py-12">
        <div className="mx-auto max-w-7xl space-y-8 px-6">
          <AnswerCapsule>{content.answerCapsule}</AnswerCapsule>
          <div>
            <h2 className="text-xl font-bold text-emerald-950">
              Why source {categoryLabels[key].toLowerCase()} from Thailand?
            </h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-emerald-900/80">{content.intro}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {content.highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-emerald-900/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-emerald-900/80">
              Importers comparing{" "}
              <Link href="/" className="font-medium text-emerald-700 hover:underline">
                {homepageKeywordByTopic[key]}
              </Link>{" "}
              can also review our{" "}
              <Link href="/faq" className="font-medium text-emerald-700 hover:underline">
                {key === "sugar"
                  ? "ICUMSA 45 vs ICUMSA 150"
                  : key === "fertilizer"
                    ? "NPK fertilizer grades available"
                    : "how to import rice from Thailand"}
              </Link>{" "}
              and the{" "}
              <Link href="/glossary" className="font-medium text-emerald-700 hover:underline">
                commodity export glossary
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Suspense fallback={<p className="text-emerald-800">Loading products...</p>}>
            <ProductCatalog defaultCategory={key} />
          </Suspense>
        </div>
      </section>

      <RelatedResources {...getCategoryRelatedResources(key)} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
    </>
  );
}
