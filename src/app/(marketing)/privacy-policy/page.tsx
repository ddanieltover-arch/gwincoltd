import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { siteConfig } from "@/config/site";
import { privacyPageContent } from "@/data/pages";
import { pageSeo } from "@/data/seo";
import { seoToMetadata } from "@/lib/seo";

export const metadata: Metadata = seoToMetadata(pageSeo["privacy-policy"], {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
});

const lastUpdated = "June 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description={`How ${siteConfig.name} handles your personal information when you visit our website or place an order.`}
      />

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <FadeIn>
            <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                  Your privacy matters
                </p>
                <p className="mt-1 text-emerald-900/80">
                  We are committed to protecting your data and using it only for legitimate business
                  purposes.
                </p>
              </div>
              <p className="shrink-0 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">
                Last updated: {lastUpdated}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <article className="mb-8 rounded-2xl border border-emerald-900/10 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-emerald-950">Privacy Policy</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-emerald-900/75">
                {privacyPageContent.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </article>
          </FadeIn>

          <StaggerChildren className="space-y-6" stagger={0.1}>
            {privacyPageContent.sections.map((section) => (
              <StaggerItem key={section.title}>
                <article
                  className={`rounded-2xl border border-emerald-900/10 p-8 shadow-sm transition-shadow hover:shadow-md ${
                    section.title === "LEGAL NOTICE"
                      ? "bg-emerald-950 text-white"
                      : "bg-white"
                  }`}
                >
                  <h2
                    className={`text-xl font-bold ${
                      section.title === "LEGAL NOTICE" ? "text-white" : "text-emerald-950"
                    }`}
                  >
                    {section.title}
                  </h2>
                  <div
                    className={`mt-4 space-y-4 leading-relaxed ${
                      section.title === "LEGAL NOTICE"
                        ? "text-emerald-100/85"
                        : "text-emerald-900/75"
                    }`}
                  >
                    {section.body.split("\n").map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.15} className="mt-10">
            <div className="rounded-2xl bg-emerald-950 px-8 py-10 text-white">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Mail className="h-6 w-6 text-emerald-300" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Questions about your data?</h2>
                    <p className="mt-2 text-emerald-100/80">
                      Contact us for any privacy-related enquiries.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-emerald-300 hover:text-white"
                  >
                    {siteConfig.email}
                  </a>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
