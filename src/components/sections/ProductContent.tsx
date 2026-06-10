"use client";

import { useEffect, useRef } from "react";

interface ProductContentProps {
  html: string;
}

function formatProductHtml(html: string): string {
  const trimmed = html.trim();
  if (/^<(div|p|h[1-6]|table|ul|ol|section|article)/i.test(trimmed)) {
    return trimmed;
  }

  return trimmed
    .split(/\n\n+/)
    .map((block) => {
      const content = block.trim();
      if (!content) return "";
      if (/^</.test(content)) return content;
      if (/^[A-Z][^.\n]{0,60}:$/.test(content)) {
        return `<h4>${content.replace(/:$/, "")}</h4>`;
      }
      return `<p>${content}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export function ProductContent({ html }: ProductContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    for (const img of root.querySelectorAll("img")) {
      img.addEventListener("error", () => {
        img.style.display = "none";
      });
    }
  }, [html]);

  return (
    <div
      ref={ref}
      className="product-content text-base leading-relaxed text-emerald-900/85 [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-emerald-950 [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-emerald-950 [&_h4]:mb-3 [&_h4]:mt-8 [&_h4]:text-lg [&_h4]:font-bold [&_h4]:text-emerald-950 [&_li]:marker:text-emerald-600 [&_li]:pl-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:mb-4 [&_p]:text-base [&_p]:leading-7 [&_p:first-child]:text-lg [&_p:first-child]:text-emerald-950/90 [&_strong]:font-semibold [&_strong]:text-emerald-950 [&>strong]:mb-3 [&>strong]:mt-8 [&>strong]:block [&>strong]:text-lg [&>strong]:font-bold [&_li_strong]:inline [&_li_strong]:font-semibold [&_table]:my-6 [&_table]:w-full [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-emerald-900/10 [&_table]:text-sm [&_td]:border [&_td]:border-emerald-900/10 [&_td]:px-4 [&_td]:py-2.5 [&_th]:border [&_th]:border-emerald-900/10 [&_th]:bg-emerald-50 [&_th]:px-4 [&_th]:py-2.5 [&_th]:font-semibold [&_th]:text-emerald-950 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-xl"
      dangerouslySetInnerHTML={{ __html: formatProductHtml(html) }}
    />
  );
}
