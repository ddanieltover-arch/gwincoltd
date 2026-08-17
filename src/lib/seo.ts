import type { Metadata } from "next";
import type { SeoEntry } from "@/types/seo";
import { siteConfig } from "@/config/site";
import { absoluteUrl, canonicalPath } from "@/lib/urls";

const META_DESC_MAX = 160;

export function truncateMetaDescription(text: string, max = META_DESC_MAX): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return `${cleaned.slice(0, max - 3).trimEnd()}...`;
}

export interface SeoMetadataOptions {
  /** Internal path for auto-generated canonical (e.g. `/about-us/`). */
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

export function seoToMetadata(
  seo: SeoEntry | undefined,
  fallback?: { title?: string; description?: string },
  extra?: Metadata,
  options?: SeoMetadataOptions,
): Metadata {
  const title = seo?.title || fallback?.title;
  const rawDescription = seo?.description || fallback?.description;
  const description = rawDescription ? truncateMetaDescription(rawDescription) : undefined;

  const metadata: Metadata = { ...extra };

  if (title) {
    metadata.title = { absolute: title };
  }

  if (description) {
    metadata.description = description;
  }

  if (seo?.focusKeyword) {
    metadata.keywords = seo.focusKeyword
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }

  if (seo?.robots) {
    metadata.robots = {
      index: seo.robots.index,
      follow: seo.robots.follow,
    };
  }

  const canonical = seo?.canonical ?? (options?.path ? canonicalPath(options.path) : undefined);
  if (canonical) {
    metadata.alternates = { canonical };
  }

  const ogTitle = title ?? siteConfig.name;
  const ogDescription = description ?? siteConfig.description;
  const ogImage = options?.ogImage ?? siteConfig.logo;

  metadata.openGraph = {
    type: options?.ogType ?? "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: ogTitle,
    description: ogDescription,
    ...(canonical ? { url: absoluteUrl(canonical) } : {}),
    images: [{ url: ogImage, alt: ogTitle }],
    ...extra?.openGraph,
  };

  metadata.twitter = {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
    images: [ogImage],
    ...extra?.twitter,
  };

  return metadata;
}
