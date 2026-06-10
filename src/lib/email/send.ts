import { Resend } from "resend";
import { renderAdminEmail, renderUserConfirmationEmail } from "@/lib/email/templates";
import type { FormEmailPayload } from "@/lib/email/types";

function trimEnv(value: string | undefined): string | undefined {
  if (!value) return undefined;

  let trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1).trim();
  }

  return trimmed || undefined;
}

function normalizeFromAddress(value: string | undefined): string {
  const raw = trimEnv(value) ?? "noreply@gwincoltd.com";

  // Allow plain email in Vercel env — wrap with brand display name.
  if (/^[^\s<>]+@[^\s<>]+\.[^\s<>]+$/.test(raw)) {
    return `Global Win Co. Ltd <${raw}>`;
  }

  return raw;
}

function getEmailConfig() {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  const adminTo = trimEnv(process.env.CONTACT_EMAIL) ?? "sales@gwincoltd.com";
  const from = normalizeFromAddress(process.env.EMAIL_FROM);

  return { apiKey, adminTo, from };
}

function formatResendError(error: { message: string; name?: string }): string {
  return error.name ? `${error.name}: ${error.message}` : error.message;
}

async function sendWithResend(
  resend: Resend,
  payload: {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
  },
  label: string,
): Promise<void> {
  const { data, error } = await resend.emails.send({
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    text: payload.text,
    replyTo: payload.replyTo,
  });

  if (error) {
    console.error(`[email] ${label} failed:`, formatResendError(error));
    throw new Error(`Resend ${label} error: ${error.message}`);
  }

  console.info(`[email] ${label} sent`, { id: data?.id, to: payload.to });
}

export function getEmailFailureMessage(err: unknown, fallback: string): string {
  const message = err instanceof Error ? err.message.toLowerCase() : "";

  if (message.includes("resend_api_key") || message.includes("api key")) {
    return "Our email service is temporarily unavailable. Please contact us via WhatsApp.";
  }

  if (
    message.includes("not verified") ||
    message.includes("verify a domain") ||
    message.includes("invalid `from`") ||
    message.includes("invalid from")
  ) {
    return "Our email service is still being configured. Please contact us via WhatsApp and we'll respond shortly.";
  }

  return fallback;
}

export async function sendFormEmails(payload: FormEmailPayload): Promise<void> {
  const { apiKey, adminTo, from } = getEmailConfig();
  const admin = renderAdminEmail(payload);
  const user = renderUserConfirmationEmail(payload);

  if (!apiKey) {
    const message =
      "RESEND_API_KEY is not configured. Add it to Vercel Environment Variables and redeploy.";
    console.error("[email]", message, {
      vercel: process.env.VERCEL ?? "0",
      nodeEnv: process.env.NODE_ENV,
      hasContactEmail: Boolean(trimEnv(process.env.CONTACT_EMAIL)),
      hasEmailFrom: Boolean(trimEnv(process.env.EMAIL_FROM)),
    });
    console.info("[email] Would have sent:");
    console.info("[email] Admin →", adminTo, admin.subject);
    console.info("[email] User →", payload.email, user.subject);

    if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
      throw new Error(message);
    }

    return;
  }

  const resend = new Resend(apiKey);

  console.info("[email] config", {
    from,
    adminTo,
    apiKeyPrefix: apiKey.slice(0, 8),
  });

  await sendWithResend(
    resend,
    {
      from,
      to: adminTo,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
      replyTo: payload.email,
    },
    "admin notification",
  );

  try {
    await sendWithResend(
      resend,
      {
        from,
        to: payload.email,
        subject: user.subject,
        html: user.html,
        text: user.text,
        replyTo: adminTo,
      },
      "user confirmation",
    );
  } catch (err) {
    // Admin already has the lead — don't fail the public form for confirmation issues.
    console.error("[email] user confirmation failed after admin notification:", err);
  }
}
