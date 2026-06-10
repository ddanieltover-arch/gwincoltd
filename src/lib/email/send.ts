import { renderAdminEmail, renderUserConfirmationEmail } from "@/lib/email/templates";
import type { FormEmailPayload } from "@/lib/email/types";

interface ResendEmail {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  reply_to?: string;
}

async function sendResendEmail(apiKey: string, email: ResendEmail): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API error ${response.status}: ${body}`);
  }
}

export async function sendFormEmails(payload: FormEmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminTo = process.env.CONTACT_EMAIL ?? "sales@gwincoltd.com";
  const from = process.env.EMAIL_FROM ?? "noreply@gwincoltd.com";

  const admin = renderAdminEmail(payload);
  const user = renderUserConfirmationEmail(payload);

  if (!apiKey) {
    console.info("[email] RESEND_API_KEY not set — logging submission:");
    console.info("[email] Admin →", adminTo, admin.subject);
    console.info("[email] User →", payload.email, user.subject);
    return;
  }

  await Promise.all([
    sendResendEmail(apiKey, {
      from,
      to: adminTo,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
      reply_to: payload.email,
    }),
    sendResendEmail(apiKey, {
      from,
      to: payload.email,
      subject: user.subject,
      html: user.html,
      text: user.text,
      reply_to: adminTo,
    }),
  ]);
}
