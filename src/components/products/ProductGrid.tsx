import type { Product, ProductCategory } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No products found in this category.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-emerald-900/20 bg-emerald-50/50 px-6 py-12 text-center text-emerald-800/70">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard key={product.slug} product={product} index={index} />
      ))}
    </div>
  );
}

export function filterProducts(
  products: Product[],
  category: ProductCategory | "all",
  query: string,
): Product[] {
  return products.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
}
