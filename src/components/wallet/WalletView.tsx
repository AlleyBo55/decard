"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { MarketplacePage, Activity } from "@/lib/types";
import { fmtUsd, fmtNum, shortAddr } from "@/lib/format";
import { cardImage, solscanAddr } from "@/lib/constants";
import { knownLabel } from "@/lib/labels";
import { useLocalLabels, useWatchlist } from "@/lib/hooks";
import { Panel, PixelLabel, Badge, Stat, FeedSkeleton } from "@/components/ui";
import { ActivityRow } from "@/components/ActivityRow";

export function WalletView({ wallet }: { wallet: string }) {
  const [tab, setTab] = useState<"holdings" | "activity">("holdings");
  const [copied, setCopied] = useState(false);
  const { labels, setLabel } = useLocalLabels();
  const { has, toggle } = useWatchlist();

  const known = knownLabel(wallet);
  const custom = labels[wallet]?.label ?? "";

  const holdings = useQuery<MarketplacePage>({
    queryKey: ["holdings", wallet],
    queryFn: async () => {
      const res = await fetch(`/api/scanner?ownerAddress=${wallet}&step=100`);
      if (!res.ok) throw new Error("holdings failed");
      return res.json();
    },
  });

  const activity = useQuery<{ activity: Activity[] }>({
    queryKey: ["wallet-activity", wallet],
    queryFn: async () => {
      const res = await fetch(`/api/activity?wallet=${wallet}&limit=25`);
      if (!res.ok) throw new Error("activity failed");
      return res.json();
    },
    refetchInterval: 15_000,
  });

  const cards = holdings.data?.cards ?? [];
  const insuredTotal = cards.reduce((s, c) => s + Number(c.insuredValue || 0), 0);
  const listed = cards.filter((c) => c.listing).length;

  return (
    <div className="flex flex-col gap-5">
      <Panel screen className="p-4 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => toggle(wallet)}
            className={has(wallet) ? "text-dex-yellow" : "text-muted hover:text-ink"}
            aria-label="watchlist"
          >
            {has(wallet) ? "★" : "☆"}
          </button>
          <span className="font-mono text-sm">{shortAddr(wallet, 6)}</span>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(wallet);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
            className="text-xs text-muted hover:text-dex-yellow"
          >
            {copied ? "copied" : "copy"}
          </button>
          {known ? (
            <Badge tone="cc">{known.label}</Badge>
          ) : (
            <input
              defaultValue={custom}
              onBlur={(e) => setLabel(wallet, e.target.value)}
              placeholder="+ add label"
              className="bg-bg border border-line rounded px-2 py-1 text-xs outline-none focus:border-dex-yellow w-32"
            />
          )}
          <a
            href={solscanAddr(wallet)}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-xs text-muted hover:text-dex-yellow"
          >
            Solscan ↗
          </a>
        </div>
        <div className="flex flex-wrap gap-8">
          <Stat label="Cards Held" value={holdings.isLoading ? "…" : fmtNum(cards.length)} />
          <Stat label="Insured Total" value={fmtUsd(insuredTotal, { compact: true })} />
          <Stat label="Listed" value={fmtNum(listed)} />
        </div>
      </Panel>

      <div className="flex gap-2">
        {(["holdings", "activity"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "pixel text-[10px] px-3 py-2 rounded-md border " +
              (tab === t
                ? "bg-dex-yellow text-black border-dex-yellow"
                : "border-line text-muted hover:text-ink")
            }
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "holdings" && (
        <>
          {holdings.isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[71/100] rounded-lg bg-panel-2 animate-pulse" />
              ))}
            </div>
          )}
          {!holdings.isLoading && cards.length === 0 && (
            <Panel className="p-10 text-center text-muted">No cards held by this wallet.</Panel>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.nftAddress}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.4) }}
              >
                <Link href={`/card/${c.nftAddress}`} className="group block">
                  <div className="aspect-[3/4.2] rounded-lg overflow-hidden border border-line bg-panel-2">
                    <img
                      src={cardImage(c.nftAddress, "front", 256)}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="mt-1.5 text-xs">
                    <div className="line-clamp-1 group-hover:text-dex-yellow">{c.itemName}</div>
                    <div className="text-muted flex items-center justify-between">
                      <span>
                        {c.gradingCompany} {c.grade}
                      </span>
                      {c.listing && (
                        <span className="text-dex-yellow tabular-nums">
                          {c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : `${c.listing.price}◎`}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {tab === "activity" && (
        <Panel className="p-0 overflow-hidden">
          {activity.isLoading && <FeedSkeleton rows={8} />}
          {!activity.isLoading && (activity.data?.activity.length ?? 0) === 0 && (
            <div className="p-8 text-center text-muted">No recent on-chain activity.</div>
          )}
          <div className="divide-y divide-line/50">
            {(activity.data?.activity ?? [])
              .filter((a) => a.kind !== "Unknown")
              .map((a) => (
                <ActivityRow key={a.signature} a={a} />
              ))}
          </div>
        </Panel>
      )}
    </div>
  );
}
