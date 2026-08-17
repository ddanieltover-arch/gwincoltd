import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductContent } from "@/components/sections/ProductContent";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { AnswerCapsule } from "@/components/shared/AnswerCapsule";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { categoryLabels } from "@/config/site";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/data/products";
import { productSeo } from "@/data/seo";
import { siteConfig } from "@/config/site";
import { absoluteImageUrl } from "@/lib/images";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { seoToMetadata } from "@/lib/seo";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const seo = productSeo[slug];

  return seoToMetadata(
    seo,
    { title: product.name, description: product.description },
    {
      openGraph: {
        images: [{ url: absoluteImageUrl(product.image) }],
      },
    },
    { path: `/product/${slug}`, ogImage: absoluteImageUrl(product.image) },
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const gallery = [product.image, ...(product.images ?? [])];
  const relatedProducts = getRelatedProducts(slug);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Our Products", path: "/our-products" },
    { name: categoryLabels[product.category], path: `/our-products/${product.category}` },
    { name: product.name, path: `/product/${slug}` },
  ];

  const productHeader = (
    <>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
        {categoryLabels[product.category]}
      </span>
      <h1 className="mt-4 text-3xl font-bold text-emerald-950 md:text-4xl">{product.name}</h1>
    </>
  );

  const answerText =
    product.description.length > 280
      ? `${product.description.slice(0, 277).trimEnd()}...`
      : product.description;

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div className="lg:hidden">{productHeader}</div>

          <div>
            <ProductGallery images={gallery} alt={product.name} />
          </div>

          <div>
            <div className="hidden lg:block">{productHeader}</div>
            <div className="mt-6">
              <AnswerCapsule>{answerText}</AnswerCapsule>
            </div>
            <p className="mt-6 text-sm text-emerald-800/70">
              Request a wholesale quote for pricing, minimum order quantities, and shipping
              arrangements. Our team typically responds within 24 hours.
            </p>
            <div className="mt-10">
              <QuoteForm productName={product.name} />
            </div>
          </div>
        </div>

        {(product.descriptionHtml || product.description) && (
          <div className="mx-auto mt-16 max-w-7xl px-6">
            <article className="border-t border-emerald-900/10 pt-12">
              <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
                What are the specifications for {product.name}?
              </h2>
              <p className="mt-2 text-sm text-emerald-800/70">
                Detailed specifications, packaging options, and export information.
              </p>
              <div className="mt-8 rounded-2xl border border-emerald-900/10 bg-white p-6 md:p-10">
                {product.descriptionHtml ? (
                  <ProductContent html={product.descriptionHtml} />
                ) : (
                  <p className="text-lg leading-7 text-emerald-900/85">{product.description}</p>
                )}
              </div>
            </article>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl px-6">
            <section className="border-t border-emerald-900/10 pt-12">
              <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
                Related {categoryLabels[product.category]} products
              </h2>
              <p className="mt-2 text-sm text-emerald-800/70">
                More {categoryLabels[product.category].toLowerCase()} products from our catalog.
              </p>
              <div className="mt-8">
                <ProductGrid products={relatedProducts} />
              </div>
            </section>
          </div>
        )}

        <div className="mx-auto mt-8 max-w-7xl px-6">
          <Link
            href={`/our-products/${product.category}`}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-900 hover:underline"
          >
            View all {categoryLabels[product.category].toLowerCase()} products →
          </Link>
        </div>
      </section>

      <JsonLd
        data={[
          productSchema({
            name: product.name,
            description: product.description,
            slug: product.slug,
            category: product.category,
            image: absoluteImageUrl(product.image),
          }),
          breadcrumbSchema(breadcrumbs),
        ]}
      />
    </>
  );
}
