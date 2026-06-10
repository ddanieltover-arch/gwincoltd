import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductContent } from "@/components/sections/ProductContent";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { categoryLabels } from "@/config/site";
import { getAllProductSlugs, getProductBySlug, getRelatedProducts } from "@/data/products";
import { siteConfig } from "@/config/site";
import { absoluteImageUrl } from "@/lib/images";

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

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description: product.description,
      images: [{ url: absoluteImageUrl(product.image) }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const gallery = [product.image, ...(product.images ?? [])];
  const relatedProducts = getRelatedProducts(slug);

  const productHeader = (
    <>
      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
        {categoryLabels[product.category]}
      </span>
      <h1 className="mt-4 text-3xl font-bold text-emerald-950 md:text-4xl">{product.name}</h1>
    </>
  );

  return (
    <>
      <section className="border-b border-emerald-900/10 bg-stone-50 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/our-products"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
          <div className="lg:hidden">{productHeader}</div>

          <div>
            <ProductGallery images={gallery} alt={product.name} />
          </div>

          <div>
            <div className="hidden lg:block">{productHeader}</div>
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
            <div className="border-t border-emerald-900/10 pt-12">
              <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">Product Description</h2>
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
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl px-6">
            <div className="border-t border-emerald-900/10 pt-12">
              <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">Related Products</h2>
              <p className="mt-2 text-sm text-emerald-800/70">
                More {categoryLabels[product.category].toLowerCase()} products from our catalog.
              </p>
              <div className="mt-8">
                <ProductGrid products={relatedProducts} />
              </div>
            </div>
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: absoluteImageUrl(product.image),
            brand: { "@type": "Brand", name: siteConfig.name },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
              seller: { "@type": "Organization", name: siteConfig.name },
            },
          }),
        }}
      />
    </>
  );
}
