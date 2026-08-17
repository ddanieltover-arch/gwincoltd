import Link from "next/link";
import { ArrowUpRight, BookOpen, ExternalLink } from "lucide-react";
import type { RelatedResourceSet } from "@/data/related-links";

interface RelatedResourcesProps extends RelatedResourceSet {
  className?: string;
}

export function RelatedResources({ internal, external, className }: RelatedResourcesProps) {
  return (
    <section
      aria-labelledby="related-resources-heading"
      className={className ?? "border-t border-emerald-900/10 bg-stone-50 py-16"}
    >
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="related-resources-heading" className="text-2xl font-bold text-emerald-950 md:text-3xl">
          Related resources
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-800/75">
          Explore related commodity pages on this site, plus independent industry references.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              On this site
            </h3>
            <ul className="mt-4 space-y-2">
              {internal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-start gap-2 text-emerald-900 hover:text-emerald-700 hover:underline"
                  >
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600/70 group-hover:text-emerald-700"
                      aria-hidden="true"
                    />
                    <span>{link.anchor}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Industry sources
            </h3>
            <ul className="mt-4 space-y-2">
              {external.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-emerald-900 hover:text-emerald-700 hover:underline"
                  >
                    <ExternalLink
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600/70 group-hover:text-emerald-700"
                      aria-hidden="true"
                    />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
