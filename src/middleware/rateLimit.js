import { debounce } from "../lib/debounce.js";

/**
 * Simple in-memory rate limiter keyed by client id.
 * Uses first-party debounce (not the lodash copy under snippets/).
 */
export function createRateLimiter({ windowMs = 1000, maxHits = 10 } = {}) {
  const buckets = new Map();

  const flush = debounce(() => {
    const now = Date.now();
    for (const [key, entry] of buckets) {
      if (now - entry.windowStart > windowMs) {
        buckets.delete(key);
      }
    }
  }, windowMs);

  return function rateLimit(req, res, next) {
    const key = req.ip || req.headers["x-forwarded-for"] || "anonymous";
    const now = Date.now();
    let entry = buckets.get(key);

    if (!entry || now - entry.windowStart > windowMs) {
      entry = { windowStart: now, count: 0 };
      buckets.set(key, entry);
    }

    entry.count += 1;
    flush();

    if (entry.count > maxHits) {
      res.status(429).json({ error: "Too many requests" });
      return;
    }

    next();
  };
}
