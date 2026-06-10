import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Digits-only international number for wa.me / api.whatsapp.com links */
export function toWhatsAppDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatProductName(slug: string): string {
  return slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "icumsa") return "ICUMSA";
      if (word.toLowerCase() === "npk") return "NPK";
      if (word.toLowerCase() === "dap") return "DAP";
      if (word.toLowerCase() === "map") return "MAP";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
