import { siteConfig } from "@/config/site";

/** Normalize an internal path to trailing-slash canonical form. */
export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  const cleaned = path.replace(/^\/+|\/+$/g, "");
  return `/${cleaned}/`;
}

/** Absolute production URL for a path (respects trailingSlash config). */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = canonicalPath(path);
  return normalized === "/" ? `${base}/` : `${base}${normalized}`;
}
