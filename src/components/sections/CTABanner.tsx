import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-emerald-700 py-16">
      <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-emerald-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-emerald-900/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to source premium commodities?
          </h2>
          <p className="mt-2 text-emerald-50">
            Get competitive wholesale pricing on rice, sugar, fertilizer, and more.
          </p>
        </div>
        <Link
          href="/contact-us"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-900/20 transition hover:scale-105 hover:bg-emerald-50"
        >
          Contact Us Today
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
