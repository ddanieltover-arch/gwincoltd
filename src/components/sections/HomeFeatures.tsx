import { Award, Users, Wheat } from "lucide-react";
import { siteConfig } from "@/config/site";

const features = [
  {
    icon: Wheat,
    title: "Multi-Commodity Trading",
    text: "Rice, sugar, grains, fertilizer, oils, and metals — sourced directly from Thailand.",
  },
  {
    icon: Award,
    title: "Certified Quality",
    text: "GMP, HACCP, and Global GAP certified products with rigorous quality control.",
  },
  {
    icon: Users,
    title: "Trusted Partner",
    text: `Over ${siteConfig.experienceYears} years of experience exporting to international markets.`,
  },
];

export function HomeFeatures() {
  return (
    <section className="py-20" aria-labelledby="home-features-heading">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="home-features-heading" className="sr-only">
          Why choose {siteConfig.shortName}
        </h2>
        <div className="grid gap-10 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="h-full rounded-2xl border border-emerald-900/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-4 inline-flex rounded-xl bg-emerald-100 p-3 text-emerald-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-emerald-950">{title}</h3>
              <p className="mt-2 text-sm text-emerald-800">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProductsHeader() {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h2 className="text-3xl font-bold text-emerald-950">Featured Products</h2>
        <p className="mt-2 text-emerald-800">
          Browse our most requested commodities for export.
        </p>
      </div>
    </div>
  );
}
