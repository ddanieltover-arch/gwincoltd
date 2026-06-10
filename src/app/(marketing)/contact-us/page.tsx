import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { OfficeShowcase } from "@/components/sections/OfficeShowcase";
import { PageHero } from "@/components/shared/PageHero";
import { FadeIn } from "@/components/shared/FadeIn";
import { StaggerChildren, StaggerItem } from "@/components/shared/StaggerChildren";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} for wholesale quotes on rice, sugar, and fertilizer.`,
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  { icon: MapPin, label: "Location", value: siteConfig.address },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Reach out for wholesale pricing, product availability, and export enquiries."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-3">
          <FadeIn direction="right">
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-emerald-950">Get in Touch</h2>
              <StaggerChildren className="space-y-6" stagger={0.12}>
                {contactItems.map(({ icon: Icon, label, value, href }) => (
                  <StaggerItem key={label}>
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-emerald-900">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-emerald-700 hover:underline">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-emerald-700">{value}</p>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
              <OfficeShowcase variant="compact" />
            </div>
          </FadeIn>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
