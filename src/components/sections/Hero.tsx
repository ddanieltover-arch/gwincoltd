"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe, Shield, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { upload } from "@/lib/images";
import { defaultTransition, easeOut, staggerContainer, fadeUp } from "@/lib/motion";

const HERO_IMAGE = upload(
  "2024/12/beautiful-morning-view-indonesia-panorama-landsca-2024-06-10-23-01-11-utc-scaled.jpg",
);

const highlights = [
  { icon: Globe, title: "Global Export", desc: "Serving markets worldwide since 2016" },
  { icon: Shield, title: "Certified Quality", desc: "GMP, HACCP & Global GAP standards" },
  { icon: Truck, title: "Competitive Pricing", desc: "Direct from Thailand growers" },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={reduced ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: easeOut }}
        >
          <Image
            src={HERO_IMAGE}
            alt="Agricultural landscape in Thailand"
            fill
            className="object-cover opacity-30"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/90 to-emerald-900/60" />
        {!reduced && (
          <motion.div
            className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:py-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12, 0.1)}
        >
          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, ease: easeOut }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300"
          >
            {siteConfig.tagline}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ ...defaultTransition, ease: easeOut }}
            className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            Premium Rice, Sugar &amp; Fertilizer from Thailand
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ ...defaultTransition, ease: easeOut }}
            className="mt-6 max-w-xl text-lg text-emerald-100/90"
          >
            {siteConfig.name} is a trusted multi-commodity trading partner exporting
            certified agricultural products to international markets worldwide.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ ...defaultTransition, ease: easeOut }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/our-products"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
              >
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request a Quote
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15, 0.35)}
        >
          {highlights.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ ...defaultTransition, ease: easeOut }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <motion.div
                animate={reduced ? undefined : { rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="mb-3 inline-block"
              >
                <Icon className="h-6 w-6 text-emerald-300" />
              </motion.div>
              <p className="font-semibold">{title}</p>
              <p className="mt-1 text-sm text-emerald-100/70">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
