import type { DecardLeaderboard, DecardTrainer, RipPreview } from "@/services/Gym/types";
import type { Tier } from "@/lib/rip/types";
// Development only: a made-up Decard ladder for /gym?preview=1&trainers=N, so the page can be
// checked with 0 to 100 trainers before decardbe has any. Built from the catalog snapshot's
// card pools; the wallets are random. Never reached in production (see GymLab).
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function sampleBoard(fixture: RipPreview, size: number): DecardLeaderboard {
  const rand = rng(7);
  const now = Date.now();
  const cards = fixture.packs.flatMap((p) => (fixture.pools[p.id] ?? []).map((c) => ({ c, p })));
  const trainers: DecardTrainer[] = [];
  let rips = Math.round(18 + size * 1.6);
  for (let i = 0; i < size; i++) {
    const wallet = Array.from({ length: 44 }, () => B58[Math.floor(rand() * B58.length)]).join("");
    const pick = cards.length ? cards[Math.floor(rand() * cards.length)] : null;
    const spent = rips * (pick?.p.priceCents ?? 5000);
    trainers.push({
      rank: i + 1,
      wallet,
      rips,
      spentCents: spent,
      pulledCents: Math.round(spent * (0.8 + rand() * 0.5)),
      best: pick
        ? { name: pick.c.name, rarity: pick.c.rarity as Tier, insuredValueCents: pick.c.insuredValueCents, image: pick.c.imageUrl || null, packName: pick.p.name }
        : null,
      lastRipAt: new Date(now - (3 + i * 17) * 60_000).toISOString(),
    });
    rips = Math.max(1, rips - 1 - Math.floor(rand() * 4));
  }
  return {
    updatedAt: new Date(now).toISOString(),
    totals: { rips: trainers.reduce((s, t) => s + t.rips, 0), trainers: size, pulledCents: trainers.reduce((s, t) => s + t.pulledCents, 0) },
    trainers,
    packs: [],
  };
}
