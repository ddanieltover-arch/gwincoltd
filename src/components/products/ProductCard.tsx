"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { categoryLabels } from "@/config/site";
import { defaultTransition, easeOut } from "@/lib/motion";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ...defaultTransition, delay: (index % 4) * 0.08, ease: easeOut }}
      whileHover={reduced ? undefined : { y: -6 }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-900/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-square overflow-hidden bg-emerald-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + index * 0.05 }}
            className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-800 backdrop-blur-sm"
          >
            {categoryLabels[product.category]}
          </motion.span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-emerald-950 transition group-hover:text-emerald-700">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm text-emerald-900/70">{product.description}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 group-hover:text-emerald-900">
            Request Quote
            <motion.span
              className="inline-flex"
              animate={reduced ? undefined : { x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
