import "server-only";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const PRODUCTION_HOSTNAMES = ["gwincoltd.com", "www.gwincoltd.com"];

type SiteverifyResult = {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export function readTurnstileToken(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  const record = data as Record<string, unknown>;
  const token = record["cf-turnstile-response"] ?? record.turnstileToken;
  return typeof token === "string" ? token : undefined;
}

function expectedHostnames(): Set<string> {
  const fromEnv = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  return new Set(fromEnv.length > 0 ? fromEnv : PRODUCTION_HOSTNAMES);
}

function turnstileSecret(): string | undefined {
  return process.env.TURNSTILE_SECRET?.trim() || process.env.TURNSTILE_SECRET_KEY?.trim() || undefined;
}

export async function verifyTurnstile(input: {
  token: string | undefined;
  remoteIp?: string;
  action: "contact" | "quote";
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = input.token;
  const hostnames = expectedHostnames();
  const secret = turnstileSecret();

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    hostnames.size === 0 ||
    !secret
  ) {
    return { ok: false, error: "Please complete the security check and try again." };
  }

  let result: SiteverifyResult;
  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret,
        response: token,
        ...(input.remoteIp ? { remoteip: input.remoteIp } : {}),
      }),
    });
    if (!response.ok) {
      return { ok: false, error: "Security check could not be verified. Please try again." };
    }
    result = (await response.json()) as SiteverifyResult;
  } catch {
    return { ok: false, error: "Security check could not be verified. Please try again." };
  }

  if (
    result.success !== true ||
    result.action !== input.action ||
    !result.hostname ||
    !hostnames.has(result.hostname)
  ) {
    console.info("[turnstile] rejected", {
      action: input.action,
      hostname: result.hostname,
      codes: result["error-codes"],
    });
    return { ok: false, error: "Security check failed. Please try again." };
  }

  return { ok: true };
}
