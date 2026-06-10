"use client";

import { Award, Users, Wheat } from "lucide-react";
import { siteConfig } from "@/config/site";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { motion } from "framer-motion";

const features = [
  {
    icon: Wheat,
    title: "Multi-Commodity Trading",
    text: "Rice, sugar, grains, fertilizer, oils, and metals — sourced directly from Thailand.",
  },
  {
    icon: Award,
    title: "Certified Quality",
    text: "GMP, HACCP, and Global GAP certified products with rigorous quality control.",
  },
  {
    icon: Users,
    title: "Trusted Partner",
    text: `Over ${siteConfig.experienceYears} years of experience exporting to international markets.`,
  },
];

export function HomeFeatures() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <StaggerChildren className="grid gap-10 lg:grid-cols-3" stagger={0.15}>
          {features.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="h-full rounded-2xl border border-emerald-900/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700"
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <h3 className="text-lg font-bold text-emerald-950">{title}</h3>
                <p className="mt-2 text-sm text-emerald-900/70">{text}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

export function FeaturedProductsHeader() {
  return (
    <FadeIn className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 className="text-3xl font-bold text-emerald-950">Featured Products</h2>
        <p className="mt-2 text-emerald-900/70">
          Browse our most requested commodities for export.
        </p>
      </div>
    </FadeIn>
  );
}
