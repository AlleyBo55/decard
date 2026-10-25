/**
 * Per-host limiter for upstream calls made on the server.
 *
 * Each host gets a token bucket (sustained rate plus burst) and a cap on
 * requests in flight. A 429 puts the whole host into cooldown, so concurrent
 * callers back off together instead of hammering the provider. A caller that
 * would wait past its budget fails fast with RATE_LIMITED, which lets the
 * caches above serve stale data instead of piling requests up.
 *
 * State lives in this server instance's memory. The CDN and in-memory caches
 * in front of it keep real upstream traffic well under these ceilings; this is
 * the backstop for cold caches and traffic spikes.
 */

export interface HostPolicy {
  /** Sustained requests per second. */
  rps: number;
  /** Tokens available at once, i.e. the largest burst above the sustained rate. */
  burst: number;
  /** Requests in flight at once. */
  concurrency: number;
}

// Published keyless limits where they exist, conservative guesses otherwise.
const POLICIES: Record<string, HostPolicy> = {
  // No published limit; keyless bursts of 100+ parallel reads have never been
  // throttled. Every request counts here even when Next's data cache answers
  // it, so a low cap only slows cold pages. A CC_API_KEY raises CC's limit 10x.
  "api.collectorcrypt.com": process.env.CC_API_KEY
    ? { rps: 100, burst: 200, concurrency: 48 }
    : { rps: 30, burst: 100, concurrency: 32 },
  // Keyless public RPC. Batches are charged per call inside them (see `cost`).
  "rpc.solanatracker.io": { rps: 8, burst: 40, concurrency: 4 },
  // Solana Foundation keyless RPC, used only for wallet pack history: 40 calls per 10s per method per IP.
  "api.mainnet-beta.solana.com": { rps: 3, burst: 10, concurrency: 4 },
  // Collector Crypt's gacha site (VRF witness, live feed, pools). No published limit: stay polite.
  "gacha.collectorcrypt.com": { rps: 6, burst: 24, concurrency: 6 },
  // Helius free plan: 10 RPC requests/s, and every item of a JSON-RPC batch counts as one.
  "mainnet.helius-rpc.com": { rps: 8, burst: 10, concurrency: 4 },
  // Jupiter keyless: 0.5 req/s (30 per minute, 60s sliding window).
  "lite-api.jup.ag": { rps: 0.5, burst: 2, concurrency: 1 },
  "api.jup.ag": { rps: 0.5, burst: 2, concurrency: 1 },
  // CoinGecko keyless: about 10-30 calls per minute per IP, varies with load.
  "api.coingecko.com": { rps: 0.15, burst: 2, concurrency: 1 },
};

const DEFAULT_POLICY: HostPolicy = { rps: 10, burst: 20, concurrency: 8 };
const MAX_QUEUE = 256;

export type LimiterErrorCode = "RATE_LIMITED" | "ABORTED";

/** Raised before any request is sent. The fetcher maps it to an APIError. */
export class LimiterError extends Error {
  readonly code: LimiterErrorCode;
  constructor(code: LimiterErrorCode, message: string) {
    super(message);
    this.name = "LimiterError";
    this.code = code;
  }
}

interface Waiter {
  cost: number;
  deadline: number;
  resolve: (release: () => void) => void;
  reject: (error: LimiterError) => void;
  signal?: AbortSignal;
  onAbort?: () => void;
}

class HostLimiter {
  private readonly host: string;
  private readonly policy: HostPolicy;
  private tokens: number;
  private updatedAt = Date.now();
  private active = 0;
  private cooldownUntil = 0;
  private queue: Waiter[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(host: string, policy: HostPolicy) {
    this.host = host;
    this.policy = policy;
    this.tokens = policy.burst;
  }

  acquire(cost: number, maxWaitMs: number, signal?: AbortSignal): Promise<() => void> {
    if (signal?.aborted) return Promise.reject(new LimiterError("ABORTED", "Request was cancelled."));
    const now = Date.now();
    if (this.queue.length >= MAX_QUEUE || this.cooldownUntil - now > maxWaitMs) {
      return Promise.reject(new LimiterError("RATE_LIMITED", `${this.host} is rate limited, try again shortly.`));
    }
    return new Promise((resolve, reject) => {
      const waiter: Waiter = {
        // A cost above the burst could never be paid, so cap it.
        cost: Math.min(Math.max(1, cost), this.policy.burst),
        deadline: now + maxWaitMs,
        resolve,
        reject,
        signal,
      };
      if (signal) {
        waiter.onAbort = () => {
          this.queue = this.queue.filter((w) => w !== waiter);
          reject(new LimiterError("ABORTED", "Request was cancelled."));
        };
        signal.addEventListener("abort", waiter.onAbort, { once: true });
      }
      this.queue.push(waiter);
      this.drain();
    });
  }

  /** Pause the host after a 429, emptying the bucket so it restarts slowly. */
  cooldown(ms: number) {
    this.cooldownUntil = Math.max(this.cooldownUntil, Date.now() + ms);
    this.tokens = 0;
    this.updatedAt = Date.now();
    this.drain();
  }

  private refill(now: number) {
    const elapsed = (now - this.updatedAt) / 1000;
    this.tokens = Math.min(this.policy.burst, this.tokens + elapsed * this.policy.rps);
    this.updatedAt = now;
  }

  private drain() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const now = Date.now();
    this.refill(now);

    // Waiters whose budget ran out fail now rather than send a late request.
    this.queue = this.queue.filter((w) => {
      if (w.deadline > now) return true;
      this.settle(w);
      w.reject(new LimiterError("RATE_LIMITED", `${this.host} is busy, try again shortly.`));
      return false;
    });

    while (this.queue.length > 0) {
      if (now < this.cooldownUntil || this.active >= this.policy.concurrency) break;
      const next = this.queue[0];
      if (this.tokens < next.cost) break;
      this.queue.shift();
      this.settle(next);
      this.tokens -= next.cost;
      this.active += 1;
      let released = false;
      next.resolve(() => {
        if (released) return;
        released = true;
        this.active -= 1;
        this.drain();
      });
    }

    if (this.queue.length === 0) return;
    // Always wake by the earliest deadline so a waiter never outlives its budget,
    // even while every slot is busy (a release also calls drain()).
    let wait = Math.max(0, Math.min(...this.queue.map((w) => w.deadline)) - now);
    if (this.active < this.policy.concurrency) {
      const tokenWait = Math.max(0, ((this.queue[0].cost - this.tokens) / this.policy.rps) * 1000);
      const cooldownWait = Math.max(0, this.cooldownUntil - now);
      wait = Math.min(Math.max(tokenWait, cooldownWait), wait);
    }
    // Keep this timer referenced: a queued request is real pending work, and an
    // unref'd timer lets a serverless runtime exit before it is served.
    this.timer = setTimeout(() => this.drain(), Math.max(5, Math.ceil(wait)));
  }

  private settle(w: Waiter) {
    if (w.signal && w.onAbort) w.signal.removeEventListener("abort", w.onAbort);
  }
}

const limiters = new Map<string, HostLimiter>();

function limiterFor(host: string) {
  let limiter = limiters.get(host);
  if (!limiter) {
    limiter = new HostLimiter(host, POLICIES[host] ?? DEFAULT_POLICY);
    limiters.set(host, limiter);
  }
  return limiter;
}

/**
 * Wait for a slot on `host`. Resolves with a release function that must be
 * called once the response body has been read.
 */
export function acquireSlot(
  host: string,
  { cost = 1, maxWaitMs = 10_000, signal }: { cost?: number; maxWaitMs?: number; signal?: AbortSignal } = {},
): Promise<() => void> {
  return limiterFor(host).acquire(cost, maxWaitMs, signal);
}

/** Back off every caller of `host` for `ms`. Called by the fetcher on a 429. */
export function cooldownHost(host: string, ms: number) {
  limiterFor(host).cooldown(ms);
}
