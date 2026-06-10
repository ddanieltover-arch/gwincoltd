import { Resend } from "resend";
import { renderAdminEmail, renderUserConfirmationEmail } from "@/lib/email/templates";
import type { FormEmailPayload } from "@/lib/email/types";

function trimEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

function getEmailConfig() {
  const apiKey = trimEnv(process.env.RESEND_API_KEY);
  const adminTo = trimEnv(process.env.CONTACT_EMAIL) ?? "sales@gwincoltd.com";
  const from =
    trimEnv(process.env.EMAIL_FROM) ??
    `Global Win Co. Ltd <noreply@gwincoltd.com>`;

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

export async function sendFormEmails(payload: FormEmailPayload): Promise<void> {
  const { apiKey, adminTo, from } = getEmailConfig();
  const admin = renderAdminEmail(payload);
  const user = renderUserConfirmationEmail(payload);

  if (!apiKey) {
    const message =
      "RESEND_API_KEY is not configured. Add it to Vercel Environment Variables and redeploy.";
    console.error("[email]", message);
    console.info("[email] Would have sent:");
    console.info("[email] Admin →", adminTo, admin.subject);
    console.info("[email] User →", payload.email, user.subject);

    if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
      throw new Error(message);
    }

    return;
  }

  const resend = new Resend(apiKey);

  // Admin notification first — most important for the business.
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

  // User confirmation second — if this fails, admin still received the lead.
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
}
