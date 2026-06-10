"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50">
        <Image
          key={activeImage}
          src={activeImage}
          alt={alt}
          fill
          className="object-cover"
          priority={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {images.slice(0, 4).map((src, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View image ${index + 1} of ${Math.min(images.length, 4)}`}
                aria-pressed={isActive}
                className={cn(
                  "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-emerald-50 transition sm:h-20 sm:w-20",
                  isActive
                    ? "ring-2 ring-emerald-700 ring-offset-1"
                    : "opacity-80 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
