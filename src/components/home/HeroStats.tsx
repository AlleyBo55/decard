"use client";

import { useQuery } from "@tanstack/react-query";
import { CountUp } from "@/components/motion";
import { useSolPrice } from "@/lib/hooks";

export interface MarketTop {
  price: number;
  currency: string;
  mint: string;
  name: string;
}

interface Market {
  listed: number;
  floor: MarketTop | null;
  ceiling: MarketTop | null;
}

export function useMarket(category: string, source: string) {
  return useQuery<Market>({
    queryKey: ["market", category, source],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (category) p.set("category", category);
      if (source) p.set("source", source);
      const res = await fetch(`/api/market?${p}`);
      if (!res.ok) throw new Error("market failed");
      return res.json();
    },
    refetchInterval: 30_000,
  });
}

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
