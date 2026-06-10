"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BackToTop = dynamic(
  () => import("@/components/shared/BackToTop").then((mod) => mod.BackToTop),
  { ssr: false },
);

const WhatsAppButton = dynamic(
  () => import("@/components/shared/WhatsAppButton").then((mod) => mod.WhatsAppButton),
  { ssr: false },
);

export function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idleCallback = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const id = idleCallback(() => setReady(true));
    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(id as number);
      } else {
        window.clearTimeout(id as number);
      }
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <BackToTop />
      <WhatsAppButton />
    </>
  );
}
