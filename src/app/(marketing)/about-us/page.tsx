import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTABanner } from "@/components/sections/CTABanner";
import { OperationsGallery } from "@/components/sections/OperationsGallery";
import { OfficeShowcase } from "@/components/sections/OfficeShowcase";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { siteConfig } from "@/config/site";
import { aboutPageContent } from "@/data/pages";
import { pageSeo } from "@/data/seo";
import { upload } from "@/lib/images";
import { seoToMetadata } from "@/lib/seo";

export const metadata: Metadata = seoToMetadata(pageSeo["about-us"], {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — a leading multi-commodity trading company based in Thailand.`,
});

const ABOUT_IMAGE = upload(
  "2024/12/rice-terraces-hills-and-blue-sky-2024-11-29-02-37-33-utc-scaled.jpg",
);

const companyIntro =
  aboutPageContent.introParagraphs[0]?.includes("Global Win Co. Ltd®")
    ? aboutPageContent.introParagraphs[0]
        .split(/\n\s*/)
        .find((p) => p.includes("Global Win Co. Ltd®")) ?? aboutPageContent.introParagraphs[0]
    : aboutPageContent.introParagraphs[0];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label={aboutPageContent.heroLabel}
        title={aboutPageContent.heroTitle}
        description={aboutPageContent.intro}
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <FadeIn direction="right">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={ABOUT_IMAGE}
                alt="Rice terraces in Thailand"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.1}>
            <div className="space-y-6 text-emerald-900/80">
              <h2 className="text-2xl font-bold text-emerald-950">{siteConfig.name}</h2>
              <p className="text-lg leading-relaxed">{aboutPageContent.intro}</p>
              {companyIntro && companyIntro !== aboutPageContent.intro && (
                <p className="leading-relaxed">{companyIntro}</p>
              )}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/our-products"
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Our Products
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full border border-emerald-700 px-6 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-emerald-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
            {aboutPageContent.pillars.map((pillar) => (
              <StaggerItem key={pillar.title}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                  <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-emerald-100/85">{pillar.body}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <OfficeShowcase />

      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl font-bold text-emerald-950 md:text-3xl">
              {aboutPageContent.closing.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-emerald-900/75">
              {aboutPageContent.closing.body}
            </p>
          </FadeIn>
        </div>
      </section>

      <OperationsGallery variant="about" />

      <CTABanner />
    </>
  );
}
