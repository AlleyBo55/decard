"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import type { Activity } from "@/lib/types";
import { ActivityRow } from "@/components/ActivityRow";
import { GameBoy } from "@/components/gameboy/GameBoy";
import { CountUp } from "@/components/motion";
import { DexMessage, FeedSkeleton } from "@/components/ui";
import { Coins, Pulse, Sparkle, Target } from "@/components/icons";
import { isBotChurn, isSale } from "@/lib/format";

type Filter = "all" | "sales" | "listings" | "bids";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All moves" },
  { id: "sales", label: "Sales" },
  { id: "listings", label: "Listings" },
  { id: "bids", label: "Bids" },
];

function matches(a: Activity, f: Filter) {
  if (f === "sales") return isSale(a);
  if (f === "listings") return a.kind.startsWith("List") || a.kind === "UpdateListing" || a.kind === "CancelListing";
  if (f === "bids") return a.kind.endsWith("Offer") && a.kind !== "AcceptOffer";
  return true;
}

export function TapeBoard() {
  const [filter, setFilter] = useState<Filter>("all");
  const [hideBots, setHideBots] = useState(true);

  const { data, isLoading, isError, refetch } = useQuery<{ activity: Activity[] }>({
    queryKey: ["tape-full"],
    queryFn: async () => {
      const res = await fetch("/api/activity?limit=60");
      if (!res.ok) throw new Error("tape failed");
      return res.json();
    },
    refetchInterval: 10_000,
  });

  const all = useMemo(() => (data?.activity ?? []).filter((a) => a.kind !== "Unknown"), [data]);

  const stats = useMemo(() => {
    const sales = all.filter((a) => isSale(a) && a.priceUsdc);
    const traders = new Set<string>();
    all.forEach((a) => [a.buyer, a.seller, a.actor].forEach((w) => w && traders.add(w)));
    return {
      volume: sales.reduce((s, a) => s + (a.priceUsdc ?? 0), 0),
      biggest: sales.reduce((m, a) => Math.max(m, a.priceUsdc ?? 0), 0),
      sales: sales.length,
      bids: all.filter((a) => a.kind.endsWith("Offer")).length,
      bots: all.filter(isBotChurn).length,
      traders: traders.size,
    };
  }, [all]);

  const rows = all.filter((a) => matches(a, filter) && (!hideBots || !isBotChurn(a)));

  const STATS = [
    { Icon: Coins, label: "Sale volume", value: <CountUp value={stats.volume} kind="usdCompact" />, note: `${stats.sales} sales` },
    { Icon: Sparkle, label: "Biggest sale", value: <CountUp value={stats.biggest} kind="usd" />, note: "in this window" },
    { Icon: Target, label: "Bid moves", value: <CountUp value={stats.bids} />, note: `${stats.bots} by bulk bots` },
    { Icon: Pulse, label: "Active trainers", value: <CountUp value={stats.traders} />, note: `last ${all.length} events` },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* stat strip, no boxes */}
      <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 border-y-2 border-dashed border-sand py-6">
        {STATS.map(({ Icon, label, value, note }, i) => (
          <div key={label} className={i > 0 ? "lg:border-l-2 lg:border-dashed lg:border-sand lg:pl-8" : ""}>
            <dt className="flex items-center gap-2 font-pixel text-[9px] text-ink-mute uppercase">
              <Icon className="h-4 w-4 text-poke" />
              {label}
            </dt>
            <dd className="mt-2 font-display font-bold text-4xl leading-none">{value}</dd>
            <dd className="mt-1.5 text-xs text-ink-mute">{note}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-12 lg:grid-cols-[auto_1fr] items-start">
        <div className="flex justify-center lg:sticky lg:top-24">
          <GameBoy events={all} loading={isLoading} />
        </div>

        <div className="min-w-0 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="seg" role="group" aria-label="Filter">
              {FILTERS.map((f) => (
                <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 text-sm font-bold text-ink-soft cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideBots}
                onChange={(e) => setHideBots(e.target.checked)}
                className="h-4 w-4 accent-[var(--color-poke-deep)]"
              />
              Hide bulk bid bots
            </label>
            <span className="ml-auto inline-flex items-center gap-2 font-pixel text-[9px] text-ink-mute">
              <span className="live-dot" /> REFRESH 10s
            </span>
          </div>

          {isLoading && <FeedSkeleton rows={10} />}
          {isError && !data && (
            <DexMessage
              title="The tape got tangled!"
              action={
                <button type="button" className="btn btn-red" onClick={() => refetch()}>
                  Try again
                </button>
              }
            >
              The public Solana RPC didn&apos;t answer. It usually recovers within seconds.
            </DexMessage>
          )}
          {!isLoading && !isError && rows.length === 0 && (
            <DexMessage title="Nothing in this filter right now.">
              Try All moves, or show bulk bots. Sales on Collector Crypt come in bursts.
            </DexMessage>
          )}

          <div className="dash-divide">
            <AnimatePresence initial={false}>
              {rows.map((a) => (
                <motion.div
                  key={a.signature}
                  layout="position"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActivityRow a={a} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
