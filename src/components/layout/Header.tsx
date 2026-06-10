"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";
import { navItems, siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/Logo";
import { easeOut } from "@/lib/motion";

export function Header() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <motion.header
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md"
    >
      <div className="hidden border-b border-emerald-900/5 bg-emerald-950 text-emerald-50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2 text-sm">
          <motion.a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 hover:text-emerald-300"
            whileHover={{ x: 2 }}
          >
            <Phone className="h-3.5 w-3.5" />
            {siteConfig.phone}
          </motion.a>
          <motion.a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 hover:text-emerald-300"
            whileHover={{ x: 2 }}
          >
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.email}
          </motion.a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo size={52} showName priority />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -1 }}>
              <Link
                href={item.href}
                className="relative text-sm font-medium text-emerald-900/80 transition hover:text-emerald-700"
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-emerald-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact-us"
              className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-800"
            >
              Get a Quote
            </Link>
          </motion.div>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-emerald-900 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden border-t border-emerald-900/5 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -16, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
