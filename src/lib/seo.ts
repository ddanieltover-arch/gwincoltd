import type { Metadata } from "next";
import type { SeoEntry } from "@/types/seo";

export function seoToMetadata(
  seo: SeoEntry | undefined,
  fallback?: { title?: string; description?: string },
  extra?: Metadata,
): Metadata {
  const title = seo?.title || fallback?.title;
  const description = seo?.description || fallback?.description;

  const metadata: Metadata = {
    ...extra,
  };

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

  if (seo?.canonical) {
    metadata.alternates = { canonical: seo.canonical };
  }

  return metadata;
}
