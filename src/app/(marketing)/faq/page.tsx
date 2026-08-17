import type { Metadata } from "next";
import Link from "next/link";
import { AnswerCapsule } from "@/components/shared/AnswerCapsule";
import { JsonLd } from "@/components/shared/JsonLd";
import { PageHero } from "@/components/shared/PageHero";
import { faqCategories, faqEntries } from "@/data/faq";
import { siteConfig } from "@/config/site";
import { faqPageSchema } from "@/lib/schema";
import { seoToMetadata } from "@/lib/seo";

export const metadata: Metadata = seoToMetadata(
  {
    title: "FAQ — Commodity Export Questions | Global Win Co. Ltd",
    description:
      "Answers to common questions about importing rice, sugar, and fertilizer from Thailand. Wholesale quotes, shipping, ICUMSA grades, and certifications.",
    robots: { index: true, follow: true },
  },
  undefined,
  undefined,
  { path: "/faq" },
);

export default function FaqPage() {
  const schemaFaqs = faqEntries.map(({ question, answer }) => ({ question, answer }));

  return (
    <>
      <PageHero
        label="Export FAQ"
        title="Frequently Asked Questions"
        description="Common questions about wholesale commodity export from Thailand."
      />

      <section className="py-16">
        <div className="mx-auto max-w-4xl space-y-12 px-6">
          <AnswerCapsule>
            {siteConfig.name} is a Thailand-based B2B exporter of rice, sugar, fertilizer, oils, and
            metals. Request quotes via product pages or contact us — we respond within 24 business
            hours with pricing, MOQ, and shipping options.
          </AnswerCapsule>

          {faqCategories.map(({ id, label }) => {
            const entries = faqEntries.filter((entry) => entry.category === id);
            if (entries.length === 0) return null;

            return (
              <section key={id} id={id} aria-labelledby={`faq-${id}`}>
                <h2 id={`faq-${id}`} className="text-2xl font-bold text-emerald-950">
                  {label}
                </h2>
                <dl className="mt-6 space-y-6">
                  {entries.map((entry) => (
                    <div
                      key={entry.question}
                      className="rounded-2xl border border-emerald-900/10 bg-white p-6"
                    >
                      <dt className="text-lg font-semibold text-emerald-950">{entry.question}</dt>
                      <dd className="mt-3 text-emerald-900/80 leading-relaxed">{entry.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}

          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <h2 className="text-xl font-bold text-emerald-950">Still have questions?</h2>
            <p className="mt-2 text-emerald-900/75">
              Browse our{" "}
              <Link href="/glossary" className="font-medium text-emerald-700 hover:underline">
                commodity glossary
              </Link>{" "}
              or{" "}
              <Link href="/contact-us" className="font-medium text-emerald-700 hover:underline">
                contact our export team
              </Link>
              .
            </p>
          </aside>
        </div>
      </section>

      <JsonLd data={faqPageSchema(schemaFaqs)} />
    </>
  );
}
