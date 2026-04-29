/**
 * In-memory token-bucket rate limiter keyed by client IP.
 *  - Stateless across deploys, but fine for the single-instance Next.js use case.
 *  - For multi-instance prod, swap with Vercel KV or Upstash Redis.
 */

interface Bucket {
  remaining: number;
  resetAt: number;
}

const STORE = new Map<string, Bucket>();

export function rateLimit(opts: {
  key: string;
  /** allowed requests per window */
  limit: number;
  /** window length in seconds */
  windowSec: number;
}): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const existing = STORE.get(opts.key);
  if (!existing || existing.resetAt < now) {
    STORE.set(opts.key, { remaining: opts.limit - 1, resetAt: now + opts.windowSec * 1000 });
    return { ok: true, retryAfterSec: 0 };
  }
  if (existing.remaining <= 0) {
    return { ok: false, retryAfterSec: Math.ceil((existing.resetAt - now) / 1000) };
  }
  existing.remaining -= 1;
  return { ok: true, retryAfterSec: 0 };
}

export function getClientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for') ?? '';
  const ip = fwd.split(',')[0]?.trim();
  if (ip) return ip;
  return request.headers.get('x-real-ip') ?? 'anonymous';
}

/**
 * Periodic GC so the in-memory map doesn't grow unbounded.
 * Cheap — runs at most once per minute per process.
 */
let lastSweep = 0;
export function sweep(): void {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, v] of STORE) {
    if (v.resetAt < now) STORE.delete(k);
  }
}
