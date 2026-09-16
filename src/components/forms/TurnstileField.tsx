"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || "0x4AAAAAAE49YuOQHH4nVxBh";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileField({
  action,
  resetSignal,
  onToken,
}: {
  action: "contact" | "quote";
  resetSignal: number;
  onToken: (token: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [scriptReady, setScriptReady] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const labelId = useId();

  onTokenRef.current = onToken;

  useEffect(() => {
    if (window.turnstile) setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!scriptReady || !containerRef.current || !window.turnstile) return;

    if (widgetId.current) {
      window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    }

    widgetId.current = window.turnstile.render(containerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action,
      theme: "light",
      callback: (token) => onTokenRef.current(token),
      "expired-callback": () => onTokenRef.current(""),
      "error-callback": () => onTokenRef.current(""),
    });

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current);
        widgetId.current = null;
      }
    };
  }, [action, scriptReady]);

  useEffect(() => {
    if (resetSignal === 0 || !widgetId.current || !window.turnstile) return;
    onTokenRef.current("");
    window.turnstile.reset(widgetId.current);
  }, [resetSignal]);

  return (
    <div>
      <p id={labelId} className="mb-2 text-sm font-medium text-emerald-950">
        Security check
      </p>
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
        onError={() => setLoadError(true)}
      />
      <div ref={containerRef} className="min-h-[65px]" aria-labelledby={labelId} />
      {loadError && (
        <p className="mt-1.5 text-xs text-red-600" role="alert">
          The security check could not load. Refresh the page or contact us via WhatsApp.
        </p>
      )}
    </div>
  );
}
