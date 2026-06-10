import Image from "next/image";

export const HERO_LANDSCAPE_IMAGE =
  "/uploads/2024/12/beautiful-morning-view-indonesia-panorama-landsca-2024-06-10-23-01-11-utc-2048x1365.jpg";

export const HERO_GRADIENT_OVERLAY =
  "linear-gradient(to right, rgb(2 44 34) 0%, rgb(2 44 34 / 0.92) 42%, rgb(2 44 34 / 0.35) 68%, rgb(2 44 34 / 0.08) 100%)";

interface HeroBackgroundProps {
  priority?: boolean;
}

export function HeroBackground({ priority = false }: HeroBackgroundProps) {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src={HERO_LANDSCAPE_IMAGE}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover object-right"
          aria-hidden="true"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: HERO_GRADIENT_OVERLAY }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-emerald-950/30 md:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-16 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl"
        aria-hidden="true"
      />
    </>
  );
}
