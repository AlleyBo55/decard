"use client";

import { useMemo, useState } from "react";
import { useWalletActivity } from "@/hooks/pages/Wallet/useWalletActivity";
import { useWalletHoldings } from "@/hooks/pages/Wallet/useWalletHoldings";
import { shortAddr } from "@/lib/format";
import { solscanAddr } from "@/lib/constants";
import { knownLabel } from "@/lib/labels";
import { useLocalLabels, useSolPrice, useWatchlist } from "@/lib/hooks";
import { ActivityRow } from "@/components/ActivityRow";
import { CardTile, CardTileSkeleton } from "@/components/CardTile";
import { CountUp } from "@/components/motion";
import { TrainerAvatar } from "@/components/wallet/TrainerAvatar";
import { DexMessage, FeedSkeleton, TypeChip } from "@/components/ui";
import { clsx } from "@/lib/clsx";

type Tab = "collection" | "activity";
type Sort = "value" | "price" | "name";

export function WalletView({ wallet }: { wallet: string }) {
  const [tab, setTab] = useState<Tab>("collection");
  const [sort, setSort] = useState<Sort>("value");
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const { labels, setLabel } = useLocalLabels();
  const { has, toggle } = useWatchlist();
  const sol = useSolPrice();

  const known = knownLabel(wallet);
  const custom = labels[wallet]?.label ?? "";
  const name = custom || known?.label || "Trainer";

  const holdings = useWalletHoldings(wallet);

  const activity = useWalletActivity(wallet, tab === "activity");

  const cards = useMemo(() => {
    const list = [...(holdings.data?.cards ?? [])];
    if (sort === "value") list.sort((a, b) => Number(b.insuredValue) - Number(a.insuredValue));
    if (sort === "price") list.sort((a, b) => (b.listing?.price ?? -1) - (a.listing?.price ?? -1));
    if (sort === "name") list.sort((a, b) => a.itemName.localeCompare(b.itemName));
    return list;
  }, [holdings.data, sort]);

  const insuredTotal = cards.reduce((s, c) => s + (Number(c.insuredValue) || 0), 0);
  const listed = cards.filter((c) => c.listing).length;
  const badges = Object.entries(
    cards.reduce<Record<string, number>>((acc, c) => {
      if (c.category) acc[c.category] = (acc[c.category] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const total = holdings.data?.findTotal ?? 0;

  return (
    <div className="flex flex-col gap-10">
      {/* trainer card */}
      <section className="paper overflow-hidden">
        <div className="flex items-center justify-between bg-poke px-5 py-2.5">
          <span className="font-pixel text-[10px] text-cream-hi">TRAINER CARD</span>
          <button
            type="button"
            onClick={() => toggle(wallet)}
            className={clsx("text-xl leading-none transition-transform hover:scale-125", has(wallet) ? "text-pika" : "text-cream-hi/70")}
            aria-label={has(wallet) ? "Remove from watchlist" : "Add to watchlist"}
            aria-pressed={has(wallet)}
          >
            {has(wallet) ? "★" : "☆"}
          </button>
        </div>
        <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-[auto_1fr_auto] items-center">
          <TrainerAvatar address={wallet} size={112} />

          <div className="flex flex-col gap-3 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-pixel text-[9px] text-ink-mute">NAME</span>
              {editing ? (
                <input
                  autoFocus
                  defaultValue={custom || known?.label || ""}
                  maxLength={32}
                  onBlur={(e) => {
                    setLabel(wallet, e.target.value);
                    setEditing(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                    if (e.key === "Escape") setEditing(false);
                  }}
                  className="h-10 rounded-lg border-2 border-ink bg-cream-hi px-3 font-display text-2xl outline-none"
                  placeholder="Name this trainer"
                />
              ) : (
                <h1 className="h-display text-[clamp(2rem,4vw,3rem)] truncate">{name}</h1>
              )}
              {!editing && (
                <button type="button" onClick={() => setEditing(true)} className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
                  {custom ? "Rename" : "+ Label"}
                </button>
              )}
              {known && (
                <span className="rounded-md bg-azure/12 text-azure-deep border border-azure/30 px-2 py-1 text-xs font-extrabold">
                  {known.kind === "bot" ? "Bot" : "Known"} · {known.note ?? known.label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-pixel text-[9px] text-ink-mute">ID No.</span>
              <span className="font-mono text-sm">{shortAddr(wallet, 6)}</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(wallet);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1400);
                }}
                className="text-sm font-extrabold text-azure-deep hover:text-poke-deep"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <a href={solscanAddr(wallet)} target="_blank" rel="noreferrer" className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
                Solscan ↗
              </a>
            </div>
            {badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="font-pixel text-[9px] text-ink-mute mr-1">BADGES</span>
                {badges.map(([c, n]) => (
                  <TypeChip key={c} category={c} count={n} />
                ))}
              </div>
            )}
          </div>

          <dl className="grid grid-cols-3 md:grid-cols-1 gap-x-6 gap-y-4 md:text-right md:border-l-2 md:border-dashed md:border-sand md:pl-8">
            {(
              [
                ["CARDS", <CountUp key="c" value={total} />],
                ["VALUE", <CountUp key="v" value={insuredTotal} kind="usdCompact" />],
                ["LISTED", <CountUp key="l" value={listed} />],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
                <dd className="mt-1.5 font-display font-bold text-3xl leading-none">{holdings.isLoading ? "…" : value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="seg" role="tablist" aria-label="Trainer sections">
          {(["collection", "activity"] as const).map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
              {t === "collection" ? `Collection${total ? ` (${total})` : ""}` : "Activity"}
            </button>
          ))}
        </div>
        {tab === "collection" && cards.length > 1 && (
          <div className="seg" role="group" aria-label="Sort collection">
            {(
              [
                ["value", "Insured value"],
                ["price", "List price"],
                ["name", "Name"],
              ] as const
            ).map(([id, label]) => (
              <button key={id} type="button" aria-pressed={sort === id} onClick={() => setSort(id)}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "collection" && (
        <>
          {holdings.isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <CardTileSkeleton key={i} />
              ))}
            </div>
          )}
          {holdings.isError && <DexMessage title="Couldn't open this trainer's bag right now." />}
          {!holdings.isLoading && !holdings.isError && cards.length === 0 && (
            <DexMessage title="This trainer's bag is empty.">No Collector Crypt cards found in this wallet.</DexMessage>
          )}
          {cards.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8 justify-items-center">
              {cards.map((c) => (
                <CardTile key={c.nftAddress} c={c} solUsd={sol} className="!w-full max-w-[200px]" />
              ))}
            </div>
          )}
          {total > cards.length && (
            <p className="text-center text-sm text-ink-mute">
              Showing the top {cards.length} of {total.toLocaleString()} cards.
            </p>
          )}
        </>
      )}

      {tab === "activity" && (
        <div>
          {activity.isLoading && <FeedSkeleton rows={8} />}
          {activity.isError && <DexMessage title="The chain didn't answer. Try again in a moment." />}
          {!activity.isLoading && (activity.data?.activity.filter((a) => a.kind !== "Unknown").length ?? 0) === 0 && !activity.isError && (
            <DexMessage title="No marketplace moves found for this trainer yet." />
          )}
          <div className="dash-divide">
            {(activity.data?.activity ?? [])
              .filter((a) => a.kind !== "Unknown")
              .map((a) => (
                <ActivityRow key={a.signature} a={a} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
