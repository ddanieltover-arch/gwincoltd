import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryDescriptions, categoryLabels } from "@/config/site";
import { upload } from "@/lib/images";
import type { ProductCategory } from "@/types";

const categories: {
  key: ProductCategory;
  image: string;
}[] = [
  { key: "rice", image: upload("2024/12/thai-rice.webp") },
  { key: "sugar", image: upload("2024/06/brown-sugar.webp") },
  {
    key: "fertilizer",
    image: upload(
      "2024/12/farmer-hold-fertilizers-in-his-hands-with-corn-ste-2023-11-27-05-24-37-utc-scaled.jpg",
    ),
  },
  { key: "oils", image: upload("2025/05/soybean-oil-r-768x511-1.jpg") },
  {
    key: "metals",
    image: upload("2026/05/1678123773.83223_aluminium_ingot.jpg"),
  },
];

export function CategoryShowcase() {
  return (
    <section className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-emerald-950 md:text-4xl">Our Product Categories</h2>
          <p className="mt-4 text-emerald-800">
            From Thai jasmine rice to ICUMSA-certified sugar and industrial fertilizers — we supply
            commodities trusted by buyers across the globe.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map(({ key, image }) => (
            <Link
              key={key}
              href={`/our-products/${key}`}
              className="group relative block overflow-hidden rounded-2xl transition hover:-translate-y-1"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={image}
                  alt={categoryLabels[key]}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent transition duration-300 group-hover:from-emerald-950/95" />
                <div className="absolute bottom-0 w-full p-6 text-white">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{categoryLabels[key]}</h3>
                      <p className="mt-2 text-sm text-emerald-50">
                        {categoryDescriptions[key]}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition group-hover:scale-110 group-hover:rotate-45">
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
