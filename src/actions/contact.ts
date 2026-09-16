"use server";

import { headers } from "next/headers";
import { getEmailFailureMessage, sendFormEmails } from "@/lib/email/send";
import { inspectFormSpam, readSpamTrap } from "@/lib/spam-guard";
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
  const result = rateLimit(getClientKey(action, ip), 3, 10 * 60_000);

  if (!result.ok) {
    return {
      error: "Too many submissions. Please wait a few minutes and try again, or contact us via WhatsApp.",
    };
  }

  return null;
}

function dropIfSpam(
  action: string,
  raw: unknown,
  fields: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  },
): FormResult | null {
  const trap = readSpamTrap(raw);
  const verdict = inspectFormSpam({ ...fields, ...trap });
  if (!verdict.spam) return null;

  const domain = fields.email.split("@")[1] ?? "unknown";
  console.info(`[${action}] Dropped spam submission`, { reason: verdict.reason, domain });
  return { success: true };
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

  const dropped = dropIfSpam("contact", data, {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
  });
  if (dropped) return dropped;

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
    return {
      error: getEmailFailureMessage(
        err,
        "Failed to send message. Please try again or contact us via WhatsApp.",
      ),
    };
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

  const dropped = dropIfSpam("quote", data, {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.enquiry,
  });
  if (dropped) return dropped;

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
    return {
      error: getEmailFailureMessage(
        err,
        "Failed to send enquiry. Please try again or contact us via WhatsApp.",
      ),
    };
  }
}
