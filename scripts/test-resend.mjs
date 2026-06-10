/**
 * Quick Resend smoke test. Usage:
 *   RESEND_API_KEY=re_xxx EMAIL_FROM="Global Win Co. Ltd <noreply@gwincoltd.com>" node scripts/test-resend.mjs sales@gwincoltd.com
 */
const apiKey = process.env.RESEND_API_KEY?.trim();
const from =
  process.env.EMAIL_FROM?.trim() ?? "Global Win Co. Ltd <noreply@gwincoltd.com>";
const to = process.argv[2] ?? process.env.CONTACT_EMAIL ?? "sales@gwincoltd.com";

if (!apiKey) {
  console.error("Missing RESEND_API_KEY");
  process.exit(1);
}

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to,
    subject: "GWINCOLTD Resend test",
    html: "<p>If you received this, Resend is configured correctly.</p>",
    text: "If you received this, Resend is configured correctly.",
  }),
});

const body = await response.text();
console.log("Status:", response.status);
console.log(body);

if (!response.ok) process.exit(1);
