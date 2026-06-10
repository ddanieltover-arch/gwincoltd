"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { categoryLabels, productCategories } from "@/config/site";
import { products } from "@/data/products";
import type { ProductCategory } from "@/types";
import { filterProducts, ProductGrid } from "./ProductGrid";
import { cn } from "@/lib/utils";

const categories: Array<ProductCategory | "all"> = ["all", ...productCategories];

interface ProductCatalogProps {
  defaultCategory?: ProductCategory;
}

export function ProductCatalog({ defaultCategory }: ProductCatalogProps) {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category") as ProductCategory;
  const initialCategory =
    defaultCategory ??
    (categories.includes(queryCategory) ? queryCategory : "all");
  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => filterProducts(products, category, query),
    [category, query],
  );

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition",
                category === cat
                  ? "text-white"
                  : "bg-white text-emerald-800 ring-1 ring-emerald-900/10 hover:bg-emerald-50",
              )}
            >
              {category === cat && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full bg-emerald-700"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">
                {cat === "all" ? "All Products" : categoryLabels[cat]}
              </span>
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-600 md:max-w-xs"
        />
      </div>

      <p className="mb-6 text-sm text-emerald-800/70">
        Showing {filtered.length} of {products.length} products
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${category}-${query}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          <ProductGrid products={filtered} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
