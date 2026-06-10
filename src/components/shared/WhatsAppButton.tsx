"use client";

import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { toWhatsAppDigits } from "@/lib/utils";

export function WhatsAppButton() {
  const reduced = useReducedMotion();
  const number = toWhatsAppDigits(siteConfig.whatsapp);
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <motion.div
      initial={reduced ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {!reduced && (
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-600"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-emerald-800"
        aria-label="Chat on WhatsApp"
      >
        <motion.span
          animate={reduced ? undefined : { rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageCircle className="h-5 w-5" />
        </motion.span>
        <span className="hidden sm:inline">WhatsApp us</span>
      </motion.a>
    </motion.div>
  );
}
