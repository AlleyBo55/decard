// Server start: fill the caches a first visitor would otherwise wait on. Production servers only:
// dev restarts and `next build` read nothing (the deploy builds on CI, which shouldn't call
// Collector Crypt).
//
// - The card catalogue behind /cards and the sitemap is one walk of ~75 Collector Crypt pages
//   (about 45s, lib/catalog.ts). Started here, it is ready before the first visitor.
// - Each Pokémon price guide renders on its first visit (one to four cursor-chained reads, 1-3s)
//   and is then served from the ISR cache. Requesting each once after start puts them all there.
export function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NODE_ENV !== "production" || process.env.NEXT_PHASE === "phase-production-build") return;
  // Neither is awaited: register must return before the server takes requests.
  void import("@/lib/catalog")
    .then(({ getCatalog }) => {
      // walk() logs its own failure, and the next call retries.
      const refresh = () => getCatalog().catch(() => {});
      void refresh();
      // Asked hourly, the list is re-read every ~6 hours (FRESH_MS) and never expires after a quiet
      // day, so the sitemap and /cards never wait on a cold walk.
      setInterval(refresh, 60 * 60_000).unref();
    })
    .catch(() => {});
  setTimeout(() => void warmGuides(), 10_000).unref();
}

/** One guide at a time, so the warm-up never competes with visitors for Collector Crypt's rate limit. */
async function warmGuides() {
  const { POKEMON_HUBS } = await import("@/lib/pokemon-hubs");
  // The Docker image sets PORT; the server answers on loopback whatever HOSTNAME it binds.
  const base = `http://127.0.0.1:${process.env.PORT || 3000}`;
  let warmed = 0;
  for (const hub of POKEMON_HUBS) {
    try {
      const res = await fetch(`${base}/pokemon/${hub.slug}`, { headers: { "user-agent": "decard-warmup" } });
      await res.arrayBuffer();
      if (res.ok) warmed += 1;
    } catch {
      // Not listening yet or a failed render: that guide renders on its first visit instead.
    }
  }
  console.info(`[warmup] ${warmed}/${POKEMON_HUBS.length} Pokémon price guides cached`);
}
