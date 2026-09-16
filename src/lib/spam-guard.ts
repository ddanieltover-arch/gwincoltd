const MIN_FILL_MS = 1_500;
const MAX_FILL_MS = 48 * 60 * 60 * 1000;

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "sharklasers.com",
  "grr.la",
  "yopmail.com",
  "yopmail.fr",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "throwaway.email",
  "getnada.com",
  "trashmail.com",
  "dispostable.com",
  "maildrop.cc",
  "fakeinbox.com",
  "mailnesia.com",
  "moakt.com",
  "emailondeck.com",
  "tempail.com",
  "discard.email",
]);

const SPAM_PHRASES = [
  "guest post",
  "backlink",
  "link building",
  "seo service",
  "search engine optimization",
  "rank your website",
  "increase your traffic",
  "increase traffic",
  "digital marketing",
  "web traffic",
  "buy followers",
  "dofollow",
  "domain authority",
  "write for us",
  "article submission",
  "casino",
  "viagra",
  "cialis",
  "payday loan",
  "forex signal",
  "cryptocurrency",
  "bitcoin",
  "ethereum",
  "website error",
  "errors on your website",
  "visited your website",
  "improve your ranking",
  "seo expert",
  "link insertion",
  "sponsored post",
];

export interface SpamCheckInput {
  companyWebsite?: string;
  formStartedAt?: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  now?: number;
}

export type SpamVerdict = { spam: false } | { spam: true; reason: string };

function linkCount(text: string): number {
  return text.match(/https?:\/\/|www\./gi)?.length ?? 0;
}

function emailDomain(email: string): string {
  return email.split("@")[1]?.trim().toLowerCase() ?? "";
}

export function inspectFormSpam(input: SpamCheckInput): SpamVerdict {
  const website = input.companyWebsite?.trim() ?? "";
  if (website) return { spam: true, reason: "honeypot" };

  const now = input.now ?? Date.now();
  const startedAt = input.formStartedAt;
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return { spam: true, reason: "missing-start" };
  }

  const elapsed = now - startedAt;
  if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
    return { spam: true, reason: "timing" };
  }

  const domain = emailDomain(input.email);
  if (!domain || DISPOSABLE_DOMAINS.has(domain)) {
    return { spam: true, reason: "disposable-email" };
  }

  if (/https?:\/\/|www\./i.test(input.name) || input.name.includes("@")) {
    return { spam: true, reason: "name" };
  }

  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 7 || /^(\d)\1+$/.test(digits) || /[a-z]/i.test(input.phone)) {
    return { spam: true, reason: "phone" };
  }

  const body = `${input.subject}\n${input.message}`;
  if (/<\/?[a-z][\s\S]*>/i.test(body)) {
    return { spam: true, reason: "html" };
  }

  if (linkCount(body) >= 3) {
    return { spam: true, reason: "links" };
  }

  const lowered = body.toLowerCase();
  if (SPAM_PHRASES.some((phrase) => lowered.includes(phrase))) {
    return { spam: true, reason: "phrase" };
  }

  return { spam: false };
}

export function readSpamTrap(data: unknown): {
  companyWebsite?: string;
  formStartedAt?: number;
} {
  if (!data || typeof data !== "object") return {};
  const record = data as Record<string, unknown>;
  return {
    companyWebsite: typeof record.companyWebsite === "string" ? record.companyWebsite : "",
    formStartedAt: typeof record.formStartedAt === "number" ? record.formStartedAt : undefined,
  };
}
