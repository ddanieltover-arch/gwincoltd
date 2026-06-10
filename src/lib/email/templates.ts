import { siteConfig } from "@/config/site";
import { escapeHtml } from "@/lib/utils";
import type { FormEmailPayload } from "@/lib/email/types";

const BRAND = {
  primary: "#047857",
  primaryDark: "#065f46",
  accent: "#10b981",
  bg: "#f0fdf4",
  card: "#ffffff",
  text: "#064e3b",
  muted: "#4b7c6a",
  border: "#d1fae5",
};

function layout(content: string, preheader: string): string {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(siteConfig.name)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${BRAND.card};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};box-shadow:0 4px 24px rgba(6,78,59,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.primaryDark} 0%,${BRAND.primary} 100%);padding:28px 32px;">
              <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.75);">${escapeHtml(siteConfig.shortName)}</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">${escapeHtml(siteConfig.name)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">${content}</td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid ${BRAND.border};background:${BRAND.bg};">
              <p style="margin:0 0 6px;font-size:12px;color:${BRAND.muted};">${escapeHtml(siteConfig.phone)} · ${escapeHtml(siteConfig.email)}</p>
              <p style="margin:0;font-size:11px;color:${BRAND.muted};">© ${year} ${escapeHtml(siteConfig.name)}. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;width:120px;">
      <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:${BRAND.muted};">${escapeHtml(label)}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${BRAND.border};font-size:15px;color:${BRAND.text};line-height:1.5;">
      ${value}
    </td>
  </tr>`;
}

function detailsTable(rows: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0 0;border-collapse:collapse;">${rows}</table>`;
}

function messageBlock(label: string, message: string): string {
  return `<div style="margin-top:20px;padding:16px 18px;background:${BRAND.bg};border-radius:12px;border-left:4px solid ${BRAND.accent};">
    <p style="margin:0 0 8px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:${BRAND.muted};">${escapeHtml(label)}</p>
    <p style="margin:0;font-size:15px;color:${BRAND.text};line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</p>
  </div>`;
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
    <tr>
      <td style="border-radius:999px;background:${BRAND.primary};">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}

function safePayload(payload: FormEmailPayload) {
  return {
    name: escapeHtml(payload.name),
    email: escapeHtml(payload.email),
    phone: escapeHtml(payload.phone),
    subject: escapeHtml(payload.subject),
    message: escapeHtml(payload.message),
    product: payload.product ? escapeHtml(payload.product) : undefined,
  };
}

const typeLabels: Record<FormEmailPayload["type"], { noun: string; verb: string }> = {
  contact: { noun: "contact message", verb: "message" },
  quote: { noun: "quote request", verb: "enquiry" },
};

export function renderAdminEmail(payload: FormEmailPayload): { subject: string; html: string; text: string } {
  const safe = safePayload(payload);
  const labels = typeLabels[payload.type];
  const productRow = safe.product ? detailRow("Product", `<strong>${safe.product}</strong>`) : "";

  const html = layout(
    `
    <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:${BRAND.accent};text-transform:uppercase;letter-spacing:0.06em;">New ${labels.noun}</p>
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:${BRAND.text};">Action required</h2>
    <p style="margin:0;font-size:15px;color:${BRAND.muted};line-height:1.6;">A visitor submitted a ${labels.verb} on <strong style="color:${BRAND.text};">${escapeHtml(siteConfig.url)}</strong>. Reply directly to this email to reach them.</p>
    ${detailsTable(`
      ${detailRow("Name", `<strong>${safe.name}</strong>`)}
      ${detailRow("Email", `<a href="mailto:${payload.email}" style="color:${BRAND.primary};text-decoration:none;">${safe.email}</a>`)}
      ${detailRow("Phone", `<a href="tel:${payload.phone.replace(/\s/g, "")}" style="color:${BRAND.primary};text-decoration:none;">${safe.phone}</a>`)}
      ${detailRow("Subject", safe.subject)}
      ${productRow}
    `)}
    ${messageBlock(payload.type === "quote" ? "Enquiry details" : "Message", payload.message)}
    ${ctaButton(`mailto:${payload.email}?subject=Re: ${encodeURIComponent(payload.subject)}`, "Reply to customer")}
    `,
    `New ${labels.noun} from ${payload.name}`,
  );

  const text = [
    `New ${labels.noun} — ${siteConfig.name}`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `Subject: ${payload.subject}`,
    payload.product ? `Product: ${payload.product}` : "",
    "",
    payload.type === "quote" ? "Enquiry:" : "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `[${payload.type === "quote" ? "Quote" : "Contact"}] ${payload.subject}`,
    html,
    text,
  };
}

export function renderUserConfirmationEmail(payload: FormEmailPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const safe = safePayload(payload);
  const labels = typeLabels[payload.type];
  const productLine = safe.product
    ? `<p style="margin:12px 0 0;font-size:14px;color:${BRAND.muted};">Product: <strong style="color:${BRAND.text};">${safe.product}</strong></p>`
    : "";

  const html = layout(
    `
    <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:${BRAND.accent};text-transform:uppercase;letter-spacing:0.06em;">Confirmation</p>
    <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:${BRAND.text};">Thank you, ${safe.name.split(" ")[0]}!</h2>
    <p style="margin:0;font-size:15px;color:${BRAND.muted};line-height:1.6;">We have received your ${labels.verb} and our export team will review it shortly. You can expect a response within <strong style="color:${BRAND.text};">24 business hours</strong>.</p>
    <div style="margin-top:24px;padding:20px;background:${BRAND.bg};border-radius:12px;border:1px solid ${BRAND.border};">
      <p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;color:${BRAND.muted};">Your submission</p>
      <p style="margin:0;font-size:16px;font-weight:600;color:${BRAND.text};">${safe.subject}</p>
      ${productLine}
      <p style="margin:16px 0 0;font-size:14px;color:${BRAND.text};line-height:1.6;white-space:pre-wrap;">${safe.message}</p>
    </div>
    <p style="margin:24px 0 0;font-size:14px;color:${BRAND.muted};line-height:1.6;">Need a faster response? Call us at <a href="tel:${siteConfig.phone.replace(/\s/g, "")}" style="color:${BRAND.primary};text-decoration:none;font-weight:600;">${escapeHtml(siteConfig.phone)}</a> or message us on WhatsApp.</p>
    ${ctaButton(siteConfig.url + "/our-products/", "Browse our products")}
    `,
    `We received your ${labels.verb} — ${siteConfig.name}`,
  );

  const text = [
    `Thank you, ${payload.name}!`,
    "",
    `We received your ${labels.verb} at ${siteConfig.name}.`,
    "Our team will respond within 24 business hours.",
    "",
    `Subject: ${payload.subject}`,
    payload.product ? `Product: ${payload.product}` : "",
    "",
    payload.type === "quote" ? "Your enquiry:" : "Your message:",
    payload.message,
    "",
    `Phone: ${siteConfig.phone}`,
    `Email: ${siteConfig.email}`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject:
      payload.type === "quote"
        ? `Quote request received — ${siteConfig.name}`
        : `Message received — ${siteConfig.name}`,
    html,
    text,
  };
}
