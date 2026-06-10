import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, Database, Lock, Mail, Shield } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
};

const lastUpdated = "June 2026";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    body: "When you contact us or submit a product enquiry, we collect your name, email address, phone number, and message content so we can respond to your request.",
  },
  {
    icon: Shield,
    title: "How We Use Your Information",
    body: "We use the information you provide solely to process enquiries, provide quotes, and communicate about our products and services. We do not sell your personal data to third parties.",
  },
  {
    icon: Cookie,
    title: "Cookies & Analytics",
    body: "Our website may use cookies and analytics tools to improve user experience and understand site traffic. You can control cookie preferences through your browser settings.",
  },
  {
    icon: Lock,
    title: "Data Security",
    body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or disclosure.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        title="Privacy Policy"
        description={`How ${siteConfig.name} handles your personal information when you visit our website or contact us.`}
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

          <StaggerChildren className="space-y-6" stagger={0.1}>
            {sections.map(({ icon: Icon, title, body }) => (
              <StaggerItem key={title}>
                <article className="rounded-2xl border border-emerald-900/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-emerald-950">{title}</h2>
                      <p className="mt-3 leading-relaxed text-emerald-900/75">{body}</p>
                    </div>
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
