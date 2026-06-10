"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { toWhatsAppDigits } from "@/lib/utils";

export function WhatsAppButton() {
  const number = toWhatsAppDigits(siteConfig.whatsapp);
  const url = `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:scale-105 hover:bg-emerald-800"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp us</span>
      </a>
    </div>
  );
}
