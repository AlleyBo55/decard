"use client";

import { CountUp } from "@/components/motion";
import { useMarket } from "@/hooks/pages/Home/useMarket";
import { useSolPrice } from "@/lib/hooks";
import type { MarketTop } from "@/services/Market/getMarket";

export type { MarketTop };

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-pixel text-[9px] text-ink-mute uppercase">{label}</span>
      <span className="font-display font-bold text-[1.7rem] leading-none">{children}</span>
    </div>
  );
}

/** Live headline numbers under the hero, counting up on first view. */
export function HeroStats() {
  const { data } = useMarket("", "");
  const sol = useSolPrice();
  const usd = (p: MarketTop | null) => (p ? (p.currency === "SOL" && sol ? p.price * sol : p.price) : 0);

  return (
    <div className="mt-9 flex flex-wrap gap-x-9 gap-y-5 border-t-2 border-dashed border-sand pt-6">
      <Stat label="Cards listed">
        <CountUp value={data?.listed ?? 0} />
      </Stat>
      <Stat label="Floor">
        <CountUp value={usd(data?.floor ?? null)} kind="usd" />
      </Stat>
      <Stat label="Top listing">
        <CountUp value={usd(data?.ceiling ?? null)} kind="usdCompact" />
      </Stat>
      <Stat label="SOL">
        <CountUp value={sol ?? 0} kind="usd" />
      </Stat>
    </div>
  );
}
