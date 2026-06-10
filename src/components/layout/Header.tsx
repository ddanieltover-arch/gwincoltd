"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { navItems, siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md">
      <div className="hidden border-b border-emerald-900/5 bg-emerald-950 text-emerald-50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2 text-sm">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-2 transition hover:text-emerald-300"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-2 transition hover:text-emerald-300"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo size={52} showName priority />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-emerald-900/80 transition hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact-us"
            className="rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-900/10 transition hover:bg-emerald-800"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-emerald-900 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="overflow-hidden border-t border-emerald-900/5 bg-white lg:hidden"
        >
          <nav className="flex flex-col gap-1 px-6 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
