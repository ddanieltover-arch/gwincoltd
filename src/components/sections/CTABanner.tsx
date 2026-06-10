"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/FadeIn";

export function CTABanner() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-emerald-700 py-16">
      {!reduced && (
        <>
          <motion.div
            className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-emerald-500/30 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-emerald-900/40 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -15, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
        <FadeIn direction="right">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to source premium commodities?
          </h2>
          <p className="mt-2 text-emerald-100">
            Get competitive wholesale pricing on rice, sugar, fertilizer, and more.
          </p>
        </FadeIn>
        <FadeIn delay={0.15} direction="left">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact-us"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-50"
            >
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
