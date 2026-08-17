declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | { name: "generate_lead"; params?: { form_name?: string; product?: string } }
  | { name: "contact"; params?: { form_name?: string } }
  | { name: "click"; params?: { link_url?: string; link_text?: string } }
  | { name: "whatsapp_click"; params?: Record<string, never> };

/** Fire a GA4 event when gtag is loaded (no-op otherwise). */
export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event.name, event.params ?? {});
}

export function trackLead(formName: string, product?: string) {
  trackEvent({
    name: "generate_lead",
    params: { form_name: formName, ...(product ? { product } : {}) },
  });
}

export function trackContact(formName: string) {
  trackEvent({ name: "contact", params: { form_name: formName } });
}

export function trackOutboundClick(url: string, text: string) {
  trackEvent({ name: "click", params: { link_url: url, link_text: text } });
}

export function trackWhatsAppClick() {
  trackEvent({ name: "whatsapp_click" });
}
