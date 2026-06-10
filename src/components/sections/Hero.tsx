import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";

const HERO_IMAGE =
  "/uploads/2024/12/beautiful-morning-view-indonesia-panorama-landsca-2024-06-10-23-01-11-utc-2048x1365.jpg";

const highlights = [
  { icon: Globe, title: "Global Export", desc: "Serving markets worldwide since 2016" },
  { icon: Shield, title: "Certified Quality", desc: "GMP, HACCP & Global GAP standards" },
  { icon: Truck, title: "Competitive Pricing", desc: "Direct from Thailand growers" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      {/* Landscape photo — anchored to the right so it stays visible */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
          aria-hidden="true"
        />
      </div>

      {/* Left-heavy gradient keeps copy readable; right side stays open for the photo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgb(2 44 34) 0%, rgb(2 44 34 / 0.92) 42%, rgb(2 44 34 / 0.35) 68%, rgb(2 44 34 / 0.08) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-emerald-950/30 md:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-16 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {siteConfig.tagline}
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Premium Rice, Sugar &amp; Fertilizer from Thailand
          </h1>
          <p className="mt-6 max-w-xl text-lg text-emerald-100">
            {siteConfig.name} is a trusted multi-commodity trading partner exporting certified
            agricultural products to international markets worldwide.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/our-products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
            >
              Browse Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/15 bg-emerald-950/40 p-5 backdrop-blur-md"
            >
              <Icon className="mb-3 h-6 w-6 text-emerald-300" aria-hidden="true" />
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-emerald-100">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
