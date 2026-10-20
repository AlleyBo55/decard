"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import type { Activity } from "@/lib/types";
import { ActivityRow } from "@/components/ActivityRow";
import { Panel, PixelLabel, FeedSkeleton, Stat } from "@/components/ui";
import { Coins, Target, Sparkle, Pulse } from "@/components/icons";
import { fmtUsd, fmtNum } from "@/lib/format";
import { clsx } from "@/lib/clsx";

type Filter = "all" | "sales" | "listings" | "offers";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sales", label: "Sales" },
  { id: "listings", label: "Listings" },
  { id: "offers", label: "Offers" },
];

function inFilter(a: Activity, f: Filter): boolean {
  if (f === "all") return true;
  if (f === "sales") return a.kind.startsWith("Buy") || a.kind === "AcceptOffer";
  if (f === "listings") return a.kind.startsWith("List") || a.kind === "UpdateListing" || a.kind.startsWith("Cancel");
  if (f === "offers") return a.kind.endsWith("Offer");
  return true;
}

export function TapeBoard() {
  const [filter, setFilter] = useState<Filter>("all");

  const { data, isLoading } = useQuery<{ activity: Activity[] }>({
    queryKey: ["tape-full"],
    queryFn: async () => {
      const res = await fetch("/api/activity?limit=60");
      if (!res.ok) throw new Error("tape failed");
      return res.json();
    },
    refetchInterval: 8_000,
  });

  const all = useMemo(
    () => (data?.activity ?? []).filter((a) => a.kind !== "Unknown"),
    [data],
  );

  const stats = useMemo(() => {
    const sales = all.filter((a) => (a.kind.startsWith("Buy") || a.kind === "AcceptOffer") && a.priceUsdc);
    const volume = sales.reduce((s, a) => s + (a.priceUsdc ?? 0), 0);
    const biggest = sales.reduce((m, a) => Math.max(m, a.priceUsdc ?? 0), 0);
    const traders = new Set<string>();
    all.forEach((a) => {
      if (a.buyer) traders.add(a.buyer);
      if (a.seller) traders.add(a.seller);
    });
    const offers = all.filter((a) => a.kind.endsWith("Offer")).length;
    return { saleCount: sales.length, volume, biggest, traders: traders.size, offers };
  }, [all]);

  const rows = all.filter((a) => inFilter(a, filter));

  return (
    <div className="flex flex-col gap-5">
      {/* stat strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Panel className="p-4 flex items-center gap-3">
          <Coins className="h-7 w-7 text-up shrink-0" />
          <Stat label="Window Volume" value={fmtUsd(stats.volume, { compact: true })} sub={`${stats.saleCount} sales`} />
        </Panel>
        <Panel className="p-4 flex items-center gap-3">
          <Sparkle className="h-7 w-7 text-dex-yellow shrink-0" />
          <Stat label="Biggest Sale" value={stats.biggest ? fmtUsd(stats.biggest) : "·"} />
        </Panel>
        <Panel className="p-4 flex items-center gap-3">
          <Target className="h-7 w-7 text-warn shrink-0" />
          <Stat label="Live Offers" value={fmtNum(stats.offers)} />
        </Panel>
        <Panel className="p-4 flex items-center gap-3">
          <Pulse className="h-7 w-7 text-dex-cyan shrink-0" />
          <Stat label="Active Trainers" value={fmtNum(stats.traders)} />
        </Panel>
      </div>

      {/* filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={clsx(
              "pixel text-[10px] px-3 py-2 rounded-md border-2 transition-colors",
              filter === f.id
                ? "bg-dex-yellow text-black border-dex-yellow"
                : "border-line text-muted hover:text-ink",
            )}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-muted inline-flex items-center gap-1.5">
          <span className="led h-2 w-2 rounded-full bg-up text-up" />
          auto-refresh 8s
        </span>
      </div>

      {/* feed */}
      <Panel className="overflow-hidden p-0">
        <div className="chassis flex items-center justify-between px-3 py-2">
          <PixelLabel className="text-white/90">LIVE TRADE TAPE</PixelLabel>
          <span className="text-xs text-white/80">{rows.length} events</span>
        </div>
        <div className="divide-y divide-line/50 max-h-[70vh] overflow-y-auto thin-scroll">
          {isLoading && <FeedSkeleton rows={10} />}
          {!isLoading && rows.length === 0 && (
            <div className="p-8 text-center text-muted text-sm">Nothing in this filter right now.</div>
          )}
          <AnimatePresence initial={false}>
            {rows.map((a) => (
              <motion.div
                key={a.signature}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <ActivityRow a={a} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Panel>
    </div>
  );
}
