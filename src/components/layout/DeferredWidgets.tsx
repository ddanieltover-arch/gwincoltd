"use client";

import dynamic from "next/dynamic";

const BackToTop = dynamic(
  () => import("@/components/shared/BackToTop").then((mod) => mod.BackToTop),
  { ssr: false },
);

const WhatsAppButton = dynamic(
  () => import("@/components/shared/WhatsAppButton").then((mod) => mod.WhatsAppButton),
  { ssr: false },
);

export function DeferredWidgets() {
  return (
    <>
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
