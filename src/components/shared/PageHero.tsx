"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, staggerContainer } from "@/lib/motion";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section className="bg-emerald-950 py-16 text-white md:py-20">
      <motion.div
        className="mx-auto max-w-7xl px-6"
        initial="hidden"
        animate="visible"
        variants={staggerContainer(0.1, 0)}
      >
        {label && (
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="text-sm font-semibold uppercase tracking-widest text-emerald-300"
          >
            {label}
          </motion.p>
        )}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="mt-4 max-w-2xl text-emerald-100/80"
          >
            {description}
          </motion.p>
        )}
        {!reduced && (
          <motion.div
            className="mt-8 h-1 w-16 rounded-full bg-emerald-400"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: easeOut }}
          />
        )}
      </motion.div>
    </section>
  );
}
