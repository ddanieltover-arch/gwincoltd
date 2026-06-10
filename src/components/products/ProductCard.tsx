import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryLabels } from "@/config/site";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-emerald-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          quality={75}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 backdrop-blur-sm">
          {categoryLabels[product.category]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-emerald-950 transition group-hover:text-emerald-700">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-emerald-800">{product.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 group-hover:text-emerald-900">
          Request Quote
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
