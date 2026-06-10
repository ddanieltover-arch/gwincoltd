import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { categoryLabels } from "@/config/site";
import { getAllProductSlugs, getProductBySlug } from "@/data/products";
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
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.slice(0, 4).map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square overflow-hidden rounded-xl bg-emerald-50"
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
              {categoryLabels[product.category]}
            </span>
            <h1 className="mt-4 text-3xl font-bold text-emerald-950 md:text-4xl">{product.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-emerald-900/80">{product.description}</p>
            <p className="mt-6 text-sm text-emerald-800/70">
              Request a wholesale quote for pricing, minimum order quantities, and shipping
              arrangements. Our team typically responds within 24 hours.
            </p>
            <div className="mt-10">
              <QuoteForm productName={product.name} />
            </div>
          </div>
        </div>
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
