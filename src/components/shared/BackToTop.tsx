"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8, y: visible ? 0 : 12 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 left-6 z-50"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={reduced ? undefined : { scale: 1.08 }}
        whileTap={reduced ? undefined : { scale: 0.95 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-emerald-800"
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
}
