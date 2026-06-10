"use server";

import { headers } from "next/headers";
import { sendFormEmails } from "@/lib/email/send";
import { contactSchema, quoteSchema } from "@/lib/validations/contact";
import { getClientKey, rateLimit } from "@/lib/rate-limit";
import { storeContactSubmission, storeQuoteSubmission } from "@/lib/submission-store";

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

export async function submitContactForm(data: unknown): Promise<FormResult> {
  const limited = await assertRateLimit("contact");
  if (limited) return limited;

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: "Please check the highlighted fields and try again.",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const meta = await getRequestMeta();
    await Promise.all([
      sendFormEmails({
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
  } catch (err) {
    console.error("[contact] Submission failed:", err);
    return { error: "Failed to send message. Please try again or contact us via WhatsApp." };
  }
}

export async function submitQuoteForm(data: unknown): Promise<FormResult> {
  const limited = await assertRateLimit("quote");
  if (limited) return limited;

  const parsed = quoteSchema.safeParse(data);
  if (!parsed.success) {
    return {
      error: "Please check the highlighted fields and try again.",
      fields: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const meta = await getRequestMeta();
    await Promise.all([
      sendFormEmails({
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
  } catch (err) {
    console.error("[quote] Submission failed:", err);
    return { error: "Failed to send enquiry. Please try again or contact us via WhatsApp." };
  }
}
