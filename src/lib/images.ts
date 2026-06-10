import { siteConfig } from "@/config/site";

/** Local path to WordPress uploads mirrored under /public/uploads */
export function upload(path: string): string {
  return `/uploads/${path.replace(/^\/+/, "")}`;
}

/** Absolute URL for metadata, Open Graph, and structured data */
export function uploadUrl(path: string): string {
  return `${siteConfig.url}${upload(path)}`;
}

export function absoluteImageUrl(src: string): string {
  return src.startsWith("http") ? src : `${siteConfig.url}${src}`;
}
