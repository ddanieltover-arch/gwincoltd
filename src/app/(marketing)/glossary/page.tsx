import type { Metadata } from "next";
import Link from "next/link";
import { AnswerCapsule } from "@/components/shared/AnswerCapsule";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { glossaryEntries } from "@/data/glossary";
import { definedTermSetSchema } from "@/lib/schema";
import { seoToMetadata } from "@/lib/seo";

export const metadata: Metadata = seoToMetadata(
  {
    title: "Commodity Glossary — Rice, Sugar & Fertilizer Terms | Global Win Co. Ltd",
    description:
      "Definitions of ICUMSA, NPK, Basmati, FOB, CIF, and other key terms used in agricultural commodity export and wholesale trading.",
    robots: { index: true, follow: true },
  },
  undefined,
  undefined,
  { path: "/glossary" },
);

export default function GlossaryPage() {
  return (
    <>
      <PageHero
        label="Knowledge Hub"
        title="Commodity Export Glossary"
        description="Key terms and definitions for rice, sugar, fertilizer, and international trade."
      />

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-10 px-6">
          <AnswerCapsule>
            This glossary defines essential terms used in agricultural commodity export — including
            ICUMSA sugar grades, rice varieties, fertilizer types, and international shipping
            Incoterms — to help importers and traders understand product specifications.
          </AnswerCapsule>

          <dl className="space-y-8">
            {glossaryEntries.map((entry) => (
              <div
                key={entry.slug}
                id={entry.slug}
                className="rounded-2xl border border-emerald-900/10 bg-white p-6"
              >
                <dt className="text-xl font-bold text-emerald-950">{entry.term}</dt>
                <dd className="mt-3 text-emerald-900/80 leading-relaxed">{entry.definition}</dd>
              </div>
            ))}
          </dl>

          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <p className="text-emerald-900/75">
              See also our{" "}
              <Link href="/faq" className="font-medium text-emerald-700 hover:underline">
                export FAQ
              </Link>{" "}
              and{" "}
              <Link href="/our-products" className="font-medium text-emerald-700 hover:underline">
                full product catalog
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      <JsonLd
        data={definedTermSetSchema(
          glossaryEntries.map(({ term, definition }) => ({ term, definition })),
        )}
      />
    </>
  );
}
