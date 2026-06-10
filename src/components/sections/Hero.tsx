import Link from "next/link";
import { ArrowRight, Globe, Shield, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";

const highlights = [
  { icon: Globe, title: "Global Export", desc: "Serving markets worldwide since 2016" },
  { icon: Shield, title: "Certified Quality", desc: "GMP, HACCP & Global GAP standards" },
  { icon: Truck, title: "Competitive Pricing", desc: "Direct from Thailand growers" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800" />
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

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
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
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
