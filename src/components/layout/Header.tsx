import Link from "next/link";
import { Menu, Phone, Mail } from "lucide-react";
import { navItems, siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/Logo";

export function Header() {
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

        <details className="group relative lg:hidden">
          <summary
            className="flex cursor-pointer list-none items-center rounded-lg p-2 text-emerald-900 marker:content-none [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 group-open:hidden" aria-hidden="true" />
            <span className="sr-only">Menu</span>
          </summary>
          <nav
            className="absolute right-0 top-full z-50 mt-2 min-w-[12rem] rounded-xl border border-emerald-900/10 bg-white p-2 shadow-lg"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact-us"
              className="mt-1 block rounded-lg bg-emerald-700 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Get a Quote
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
