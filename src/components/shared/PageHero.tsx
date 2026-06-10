import { HeroBackground } from "@/components/shared/HeroBackground";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
}

export function PageHero({ label, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-emerald-950 py-16 text-white md:py-20">
      <HeroBackground />

      <div className="relative mx-auto max-w-7xl px-6">
        {label && (
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">{label}</p>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-emerald-100">{description}</p>}
        <div className="mt-8 h-1 w-16 rounded-full bg-emerald-400" aria-hidden="true" />
      </div>
    </section>
  );
}
