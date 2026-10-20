"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Panel, PixelLabel, Skeleton } from "@/components/ui";
import { fmtUsd, fmtNum } from "@/lib/format";
import { clsx } from "@/lib/clsx";

interface MarketData {
  listed: number;
  floor: { price: number; currency: string; mint: string; name: string } | null;
  ceiling: { price: number; currency: string; mint: string; name: string } | null;
  categories: Record<string, number>;
}

const CATS = ["Pokemon", "One Piece", "Riftbound", "Dragon Ball", "Lorcana"];
const SOURCES: { id: "" | "CC" | "ME"; label: string }[] = [
  { id: "", label: "All" },
  { id: "CC", label: "Collector Crypt" },
  { id: "ME", label: "Magic Eden" },
];

function price(p: { price: number; currency: string } | null) {
  if (!p) return "·";
  return p.currency === "USDC" ? fmtUsd(p.price) : `${p.price}◎`;
}

export function MarketStats() {
  const [category, setCategory] = useState("Pokemon");
  const [source, setSource] = useState<"" | "CC" | "ME">("");

  const { data, isLoading } = useQuery<MarketData>({
    queryKey: ["market", category, source],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (category) p.set("category", category);
      if (source) p.set("source", source);
      const res = await fetch(`/api/market?${p}`);
      if (!res.ok) throw new Error("market failed");
      return res.json();
    },
    refetchInterval: 20_000,
  });

  return (
    <section className="flex flex-col gap-3">
      <PixelLabel className="text-dex-cyan">MARKET SNAPSHOT</PixelLabel>

      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={clsx(
              "rounded-lg border-2 px-3 py-1.5 text-sm transition-colors",
              category === c ? "border-dex-yellow bg-dex-yellow text-black font-semibold" : "border-line text-muted hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
        <span className="mx-1 w-px bg-line self-stretch" />
        {SOURCES.map((s) => (
          <button
            key={s.id}
            onClick={() => setSource(s.id)}
            className={clsx(
              "rounded-lg border-2 px-3 py-1.5 text-sm transition-colors",
              source === s.id ? "border-dex-cyan bg-dex-cyan/15 text-dex-cyan font-semibold" : "border-line text-muted hover:text-ink",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Panel className="p-4">
          <PixelLabel>Listed</PixelLabel>
          <div className="text-2xl font-semibold tabular-nums mt-1">
            {isLoading ? <Skeleton className="h-7 w-20" /> : fmtNum(data?.listed ?? 0)}
          </div>
          <div className="text-xs text-muted mt-1">{category} on {source || "all venues"}</div>
        </Panel>

        <motion.div whileHover={{ y: -2 }}>
          <Panel className="p-4">
            <PixelLabel className="text-up">Floor</PixelLabel>
            <div className="text-2xl font-semibold tabular-nums mt-1 text-up">
              {isLoading ? <Skeleton className="h-7 w-24" /> : price(data?.floor ?? null)}
            </div>
            {data?.floor && (
              <Link href={`/card/${data.floor.mint}`} className="text-xs text-muted mt-1 line-clamp-1 hover:text-dex-yellow block">
                {data.floor.name}
              </Link>
            )}
          </Panel>
        </motion.div>

        <motion.div whileHover={{ y: -2 }}>
          <Panel className="p-4">
            <PixelLabel className="text-dex-cyan">Top Listing</PixelLabel>
            <div className="text-2xl font-semibold tabular-nums mt-1 text-dex-cyan">
              {isLoading ? <Skeleton className="h-7 w-24" /> : price(data?.ceiling ?? null)}
            </div>
            {data?.ceiling && (
              <Link href={`/card/${data.ceiling.mint}`} className="text-xs text-muted mt-1 line-clamp-1 hover:text-dex-yellow block">
                {data.ceiling.name}
              </Link>
            )}
          </Panel>
        </motion.div>
      </div>
    </section>
  );
}
