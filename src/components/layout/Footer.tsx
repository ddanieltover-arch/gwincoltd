import Link from "next/link";
import { categoryLabels, navItems, siteConfig } from "@/config/site";
import { Logo } from "@/components/shared/Logo";
import type { ProductCategory } from "@/types";

const productLinks: ProductCategory[] = ["rice", "sugar", "fertilizer", "oils", "metals"];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-900/10 bg-emerald-950 text-emerald-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size={72} showName inverted href={undefined} />
          <p className="mt-4 text-sm text-emerald-200/80">{siteConfig.description}</p>
          <p className="mt-4 text-sm text-emerald-300">
            Operating since {siteConfig.founded}
          </p>
          <p className="mt-2 text-sm text-emerald-200/80">{siteConfig.address}</p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-300">
            Navigation
          </p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-emerald-100/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy" className="text-sm text-emerald-100/80 hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-300">
            Products
          </p>
          <ul className="space-y-2">
            {productLinks.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/our-products/${cat}`}
                  className="text-sm text-emerald-100/80 hover:text-white"
                >
                  {categoryLabels[cat]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-300">
            Contact
          </p>
          <ul className="space-y-2 text-sm text-emerald-100/80">
            <li>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-emerald-800 px-6 py-6 text-center text-xs text-emerald-400">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
