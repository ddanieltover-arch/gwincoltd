"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/shared/FadeIn";

interface OfficeShowcaseProps {
  variant?: "default" | "compact";
}

export function OfficeShowcase({ variant = "default" }: OfficeShowcaseProps) {
  if (variant === "compact") {
    return (
      <FadeIn>
        <div className="overflow-hidden rounded-2xl border border-emerald-900/10 shadow-md">
          <div className="relative aspect-[16/10]">
            <Image
              src={siteConfig.officeImage}
              alt={`${siteConfig.name} office in Yala, Thailand`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </div>
          <div className="bg-emerald-50 px-4 py-3">
            <p className="flex items-start gap-2 text-sm text-emerald-800">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              {siteConfig.address}
            </p>
          </div>
        </div>
      </FadeIn>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-emerald-900/10">
              <Image
                src={siteConfig.officeImage}
                alt={`${siteConfig.name} headquarters in Yala, Thailand`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Our Office
            </p>
            <h2 className="mt-3 text-3xl font-bold text-emerald-950">
              Based in Yala, Thailand
            </h2>
            <p className="mt-4 leading-relaxed text-emerald-900/80">
              Visit our headquarters where {siteConfig.thaiName} ({siteConfig.name}) coordinates
              export operations for rice, sugar, fertilizer, and commodities shipped worldwide.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-900/10 bg-emerald-50 p-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <div>
                <p className="font-medium text-emerald-950">Office Address</p>
                <p className="mt-1 text-sm text-emerald-800">{siteConfig.address}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
