"use server";

import { headers } from "next/headers";
import { contactSchema, quoteSchema } from "@/lib/validations/contact";
import { getClientKey, rateLimit } from "@/lib/rate-limit";
import { storeContactSubmission, storeQuoteSubmission } from "@/lib/submission-store";
import { escapeHtml } from "@/lib/utils";

type FormResult =
  | { success: true }
  | { error: string; fields?: Record<string, string[]> };

async function getRequestMeta() {
  const headerList = await headers();
  return {
    ipAddress:
      headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headerList.get("x-real-ip") ??
      undefined,
    userAgent: headerList.get("user-agent") ?? undefined,
  };
}

async function assertRateLimit(action: string): Promise<FormResult | null> {
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    "unknown";
  const result = rateLimit(getClientKey(action, ip), 5, 60_000);

  if (!result.ok) {
    return {
      error: "Too many submissions. Please wait a minute and try again, or contact us via WhatsApp.",
    };
  }

  return null;
}

async function sendEmail(payload: {
  type: "contact" | "quote";
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  product?: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? "sales@gwincoltd.com";
  const from = process.env.EMAIL_FROM ?? "noreply@gwincoltd.com";

  const safe = {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone),
    subject: escapeHtml(payload.subject),
    message: escapeHtml(payload.message),
    product: payload.product ? escapeHtml(payload.product) : undefined,
  };

  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — logging submission:", payload);
    return;
  }

  const productLine = safe.product
    ? `<p><strong>Product:</strong> ${safe.product}</p>`
    : "";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `[${payload.type === "quote" ? "Quote" : "Contact"}] ${payload.subject}`,
      html: `
        <h2>New ${payload.type} enquiry from ${safe.name}</h2>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>
        ${productLine}
        <p><strong>Message:</strong></p>
        <p>${safe.message}</p>
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API error: ${response.status}`);
  }
}

export async function submitContactForm(data: unknown): Promise<FormResult> {
  const limited = await assertRateLimit("contact");
  if (limited) return limited;

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: "Invalid form data",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const meta = await getRequestMeta();
    await Promise.all([
      sendEmail({
        type: "contact",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
      }),
      storeContactSubmission(parsed.data, meta).catch((err) => {
        console.error("[contact] Failed to store submission:", err);
      }),
    ]);
    return { success: true };
  } catch {
    return { error: "Failed to send message. Please try again or contact us via WhatsApp." };
  }
}

export async function submitQuoteForm(data: unknown): Promise<FormResult> {
  const limited = await assertRateLimit("quote");
  if (limited) return limited;

  const parsed = quoteSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: "Invalid form data",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const meta = await getRequestMeta();
    await Promise.all([
      sendEmail({
        type: "quote",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.enquiry,
        product: parsed.data.product,
      }),
      storeQuoteSubmission(parsed.data, meta).catch((err) => {
        console.error("[quote] Failed to store submission:", err);
      }),
    ]);
    return { success: true };
  } catch {
    return { error: "Failed to send enquiry. Please try again or contact us via WhatsApp." };
  }
}
