// Dev only: snapshots the production Slabz catalog for /rip?preview=1, which shows every
// universe with simulated rips (devnet has a single pack). Writes scripts/fixtures/rip-preview.json,
// read by app/api/rip/preview/route.ts in development only.
//   SLABZ_API_KEY=<production key> node scripts/rip-preview.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.env.SLABZ_BASE_URL ?? "https://api-v2.slabz.com/api/partner/v1";
const KEY = process.env.SLABZ_API_KEY;
if (!KEY) throw new Error("Set SLABZ_API_KEY (production partner key)");

const get = async (path) => {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(BASE + path, { headers: { "X-API-Key": KEY, Accept: "application/json" } });
    if (res.status === 429) {
      await new Promise((r) => setTimeout(r, 1000 * Number(res.headers.get("retry-after") ?? 2)));
      continue;
    }
    const body = await res.json();
    if (!body.success) throw new Error(`${path}: ${body.error?.code}`);
    return body.data;
  }
  throw new Error(`${path}: rate limited`);
};

// Same shape as decardbe's GET /v1/packs.
const packs = (await get("/packs")).map((p) => ({
  id: p.id.toLowerCase(),
  name: p.name,
  description: p.description ?? "",
  imageUrl: "",
  priceCents: p.priceCents,
  type: p.ccPackType,
  active: p.isActive,
  paused: Boolean(p.inMaintenance),
  evCents: p.evCents,
  odds: p.odds?.map((o) => ({ tier: o.tier, percent: o.probability, minValueCents: o.minValueCents, maxValueCents: o.maxValueCents })) ?? null,
}));

// Six cards per tier per pack: enough to draw a believable pull from any tier.
const pools = {};
const jobs = packs.flatMap((p) => ["legendary", "epic", "rare", "common"].map((tier) => ({ p, tier })));
for (let i = 0; i < jobs.length; i += 4) {
  await Promise.all(
    jobs.slice(i, i + 4).map(async ({ p, tier }) => {
      const cards = await get(`/packs/${p.id}/cards?rarity=${tier}&limit=6`);
      pools[p.id] = [
        ...(pools[p.id] ?? []),
        ...cards.map((c) => ({ id: c.nftId, name: c.fullName || c.name, rarity: c.rarity, insuredValueCents: Math.round(c.insuredValueCents), imageUrl: c.imageUrl })),
      ];
    }),
  );
}

mkdirSync("scripts/fixtures", { recursive: true });
writeFileSync("scripts/fixtures/rip-preview.json", JSON.stringify({ generatedAt: new Date().toISOString(), packs, pools }));
console.log(`${packs.length} packs, ${Object.values(pools).flat().length} cards`);
