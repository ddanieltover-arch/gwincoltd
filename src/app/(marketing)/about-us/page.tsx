import type { Metadata } from "next";
import Image from "next/image";
import { CTABanner } from "@/components/sections/CTABanner";
import { OperationsGallery } from "@/components/sections/OperationsGallery";
import { OfficeShowcase } from "@/components/sections/OfficeShowcase";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { siteConfig } from "@/config/site";
import { upload } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} — a leading multi-commodity trading company based in Thailand.`,
};

const ABOUT_IMAGE = upload(
  "2024/12/rice-terraces-hills-and-blue-sky-2024-11-29-02-37-33-utc-scaled.jpg",
);

const reasons = [
  {
    title: "Competitive Pricing",
    text: "Thailand's lower production costs mean you get premium commodities at 1.5–2× better value than other exporting countries.",
  },
  {
    title: "Quality Certifications",
    text: "GMP, HACCP, and Global GAP certified products with rigorous quality control at every stage.",
  },
  {
    title: "Reliable Export Partner",
    text: `Operating since ${siteConfig.founded}, we have established ourselves as a stable and dependable trading partner.`,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About Us"
        title="Your Trusted Partner in Global Commodity Trading"
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
              <p className="text-lg leading-relaxed">
                <strong className="text-emerald-950">{siteConfig.name}</strong> is a leading
                grower, cultivator, and wholesale supplier with more than {siteConfig.experienceYears}{" "}
                years of experience in agriculture and cultivation. We professionally export sugar,
                grains, fertilizer, and a wide range of other products to international markets
                worldwide.
              </p>
              <p className="leading-relaxed">
                {siteConfig.shortName} Markets is a company with a widespread business network
                dedicated to satisfying clients. Recognized as a multi-commodity trading entity, we
                serve numerous industries from our main branch in Thailand.
              </p>
              <p className="leading-relaxed">
                As a quality-conscious firm, we maintain high international standards with GMP, HACCP,
                and Global GAP certifications. Our experienced workforce handles packing and
                repacking at dedicated stations, ensuring every shipment meets the highest quality
                standards at competitive prices.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <OfficeShowcase />

      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center">
            <h2 className="text-3xl font-bold text-emerald-950">Why Choose Us</h2>
          </FadeIn>
          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-3" stagger={0.12}>
            {reasons.map((item) => (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-2xl border border-emerald-900/10 bg-white p-8 transition-shadow hover:shadow-md">
                  <h3 className="text-lg font-bold text-emerald-950">{item.title}</h3>
                  <p className="mt-3 text-sm text-emerald-900/70">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <OperationsGallery variant="about" />

      <CTABanner />
    </>
  );
}
