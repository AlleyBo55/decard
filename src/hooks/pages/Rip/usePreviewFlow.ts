"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PoolCard, RipPack, RipTx, Tier } from "@/lib/rip/types";
import type { RipPhase } from "./useRipFlow";

// Dev preview (/rip?preview=1): the same phases as useRipFlow on timers, with a card drawn by
// the pack's real odds from its real pool. No wallet, no API calls, nothing recorded.

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const TIER_KEYS: Tier[] = ["common", "rare", "epic", "legendary"];

function draw(pack: RipPack, pool: PoolCard[]): PoolCard | null {
  const odds = pack.odds ?? [];
  let roll = Math.random() * 100;
  let tier: Tier = "common";
  for (const o of odds) {
    roll -= o.percent;
    if (roll <= 0) {
      tier = (TIER_KEYS.find((t) => t === o.tier.toLowerCase()) ?? "common") as Tier;
      break;
    }
  }
  const inTier = pool.filter((c) => c.rarity === tier);
  const from = inTier.length ? inTier : pool;
  return from.length ? from[Math.floor(Math.random() * from.length)] : null;
}

export function usePreviewFlow(poolOf: (packId: string) => PoolCard[]) {
  const [phase, setPhase] = useState<RipPhase>({ step: "idle" });
  const run = useRef(0);
  useEffect(
    () => () => {
      run.current++;
    },
    [],
  );

  const rip = useCallback(
    async (pack: RipPack) => {
      const me = ++run.current;
      const live = () => me === run.current;
      setPhase({ step: "buying", pack });
      await sleep(650);
      if (!live()) return;
      setPhase({ step: "paying", pack, txId: "preview" });
      await sleep(800);
      if (!live()) return;
      setPhase({ step: "opening", pack, txId: "preview" });
      await sleep(1700);
      if (!live()) return;
      const c = draw(pack, poolOf(pack.id));
      if (!c) return setPhase({ step: "stopped", pack, paid: false, message: "This pack has no preview cards." });
      const now = new Date().toISOString();
      const tx: RipTx = {
        id: crypto.randomUUID(),
        status: "completed",
        packId: pack.id,
        priceCents: pack.priceCents,
        purchaseSignature: "",
        openSignature: "",
        createdAt: now,
        updatedAt: now,
        card: {
          mint: c.id,
          name: c.name,
          rarity: c.rarity,
          insuredValueCents: c.insuredValueCents,
          image: { full: c.imageUrl, thumb: c.imageUrl },
          backImage: null,
          grade: c.name.match(/\b(PSA|BGS|CGC|SGC)\s?(\d+(?:\.\d)?)/)?.slice(1).join(" ") ?? "",
          gradingCompany: "",
          year: null,
          category: "",
          serialNumber: "",
          autoSold: false,
          autoSoldCents: null,
        },
      };
      setPhase({ step: "revealed", pack, tx, fresh: true });
    },
    [poolOf],
  );
  const reset = useCallback(() => {
    run.current++;
    setPhase({ step: "idle" });
  }, []);
  return { phase, rip, reset };
}
