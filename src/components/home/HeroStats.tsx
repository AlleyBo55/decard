"use client";

import { CountUp } from "@/components/motion";
import { useMarket } from "@/hooks/pages/Home/useMarket";
import { useT } from "@/components/LocaleProvider";
import { useSolPrice } from "@/lib/hooks";
import type { MarketTop } from "@/services/Market/getMarket";

export type { MarketTop };

// The label comes first for screen readers; the number shows above it.
function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="text-[13px] font-bold text-ink-mute">{label}</dt>
      <dd className="order-first font-num font-extrabold text-[1.4rem] leading-none tabular-nums text-ink">{children}</dd>
    </div>
  );
}

/** Live headline numbers under the hero, counting up on first view. */
export function HeroStats() {
  const { data } = useMarket("", "");
  const sol = useSolPrice();
  const s = useT().home.stats;
  const usd = (p: MarketTop | null) => (p ? (p.currency === "SOL" && sol ? p.price * sol : p.price) : 0);

  return (
    // Fixed columns: the numbers count up from 0 without nudging their neighbours.
    <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4 sm:max-w-[34rem]">
      <Stat label={s.listed}>
        <CountUp value={data?.listed ?? 0} />
      </Stat>
      <Stat label={s.floor}>
        <CountUp value={usd(data?.floor ?? null)} kind="usd" />
      </Stat>
      <Stat label={s.top}>
        <CountUp value={usd(data?.ceiling ?? null)} kind="usdCompact" />
      </Stat>
      <Stat label="SOL">
        <CountUp value={sol ?? 0} kind="usd" />
      </Stat>
    </dl>
  );
}
