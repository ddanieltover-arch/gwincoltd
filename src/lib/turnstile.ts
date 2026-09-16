const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export function readTurnstileToken(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const token = (data as Record<string, unknown>).turnstileToken;
  return typeof token === "string" && token.trim() ? token.trim() : undefined;
}

export async function verifyTurnstile(input: {
  token: string | undefined;
  remoteIp?: string;
  action: "contact" | "quote";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();

  if (!secret || !siteKey) {
    console.error("[turnstile] Missing site key or secret key");
    return {
      ok: false,
      error: "The security check is not configured. Please contact us via WhatsApp.",
    };
  }

  if (!input.token) {
    return { ok: false, error: "Please complete the security check and try again." };
  }

  const body = new URLSearchParams({
    secret,
    response: input.token,
  });
  if (input.remoteIp) body.set("remoteip", input.remoteIp);

  let result: { success?: boolean; action?: string; "error-codes"?: string[] };
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!response.ok) {
      console.error("[turnstile] siteverify HTTP", response.status);
      return { ok: false, error: "Security check could not be verified. Please try again." };
    }
    result = (await response.json()) as typeof result;
  } catch (err) {
    console.error("[turnstile] siteverify failed", err);
    return { ok: false, error: "Security check could not be verified. Please try again." };
  }

  if (!result.success || (result.action && result.action !== input.action)) {
    console.info("[turnstile] rejected", { action: input.action, codes: result["error-codes"] });
    return { ok: false, error: "Security check failed. Please try again." };
  }

  return { ok: true };
}
