import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  className?: string;
  href?: string;
  priority?: boolean;
  showName?: boolean;
  /** Light text for dark backgrounds (e.g. footer) */
  inverted?: boolean;
}

export function Logo({
  size = 56,
  className,
  href = "/",
  priority = false,
  showName = false,
  inverted = false,
}: LogoProps) {
  const image = (
    <Image
      src={siteConfig.logo}
      alt={`${siteConfig.name} logo`}
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 object-contain", className)}
    />
  );

  const nameBlock = showName ? (
    <div className="min-w-0 leading-tight">
      <p
        className={cn(
          "truncate text-base font-bold tracking-tight sm:text-lg",
          inverted ? "text-white" : "text-emerald-950",
        )}
      >
        {siteConfig.name}
      </p>
      <p
        className={cn(
          "mt-0.5 truncate text-xs sm:text-sm",
          inverted ? "text-emerald-200/80" : "text-emerald-700/80",
        )}
      >
        {siteConfig.thaiName}
      </p>
    </div>
  ) : null;

  const content = (
    <span className={cn("inline-flex items-center gap-3", showName && "max-w-[min(100%,280px)] sm:max-w-none")}>
      {image}
      {nameBlock}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="group inline-flex shrink-0 transition hover:opacity-90">
      {content}
    </Link>
  );
}
