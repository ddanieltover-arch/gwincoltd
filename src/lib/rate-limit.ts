/**
 * In-memory rate limiter for Server Actions.
 * For multi-instance production (Vercel), prefer Upstash Redis — see docs/migration/README.md.
 */
const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: true } | { ok: false; retryAfterMs: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true };
}

export function getClientKey(prefix: string, ip: string | null): string {
  return `${prefix}:${ip ?? "unknown"}`;
}
