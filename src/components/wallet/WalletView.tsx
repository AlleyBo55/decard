"use client";

import Link from "@/components/LocaleLink";
import { useMemo, useState } from "react";
import { useWalletActivity } from "@/hooks/pages/Wallet/useWalletActivity";
import { useWalletHoldings } from "@/hooks/pages/Wallet/useWalletHoldings";
import { fmtNum, shortAddr } from "@/lib/format";
import { solscanAddr } from "@/lib/constants";
import { knownLabel } from "@/lib/labels";
import { fmt, plural } from "@/lib/i18n/format";
import { useLocale } from "@/components/LocaleProvider";
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
  const { locale, t } = useLocale();
  const tw = t.market.wallet;
  const [tab, setTab] = useState<Tab>("collection");
  const [sort, setSort] = useState<Sort>("value");
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const { labels, setLabel } = useLocalLabels();
  const { has, toggle } = useWatchlist();
  const sol = useSolPrice();

  const known = knownLabel(wallet);
  const custom = labels[wallet]?.label ?? "";
  const name = custom || known?.label || tw.trainer;

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
          <span className="font-pixel text-[10px] text-cream-hi">{tw.card}</span>
          <button
            type="button"
            onClick={() => toggle(wallet)}
            className={clsx("text-xl leading-none transition-transform hover:scale-125", has(wallet) ? "text-pika" : "text-cream-hi/70")}
            aria-label={has(wallet) ? tw.unwatch : tw.watch}
            aria-pressed={has(wallet)}
          >
            {has(wallet) ? "★" : "☆"}
          </button>
        </div>
        <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-[auto_1fr_auto] items-center">
          <TrainerAvatar address={wallet} size={112} />

          <div className="flex flex-col gap-3 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-pixel text-[9px] text-ink-mute">{tw.name}</span>
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
                  placeholder={tw.namePlaceholder}
                />
              ) : (
                <h1 className="h-display text-[clamp(2rem,4vw,3rem)] truncate">{name}</h1>
              )}
              {!editing && (
                <button type="button" onClick={() => setEditing(true)} className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
                  {custom ? tw.rename : tw.label}
                </button>
              )}
              {known && (
                <span className="rounded-md bg-azure/12 text-azure-deep border border-azure/30 px-2 py-1 text-xs font-extrabold">
                  {known.kind === "bot" ? tw.bot : tw.known} · {known.note ?? known.label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-pixel text-[9px] text-ink-mute">{tw.id}</span>
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
                {copied ? tw.copied : tw.copy}
              </button>
              <a href={solscanAddr(wallet)} target="_blank" rel="noreferrer" className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
                Solscan ↗
              </a>
              <Link href={`/luck?wallet=${encodeURIComponent(wallet)}`} className="text-sm font-extrabold text-azure-deep hover:text-poke-deep">
                {tw.luck}
              </Link>
            </div>
            {badges.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="font-pixel text-[9px] text-ink-mute mr-1">{tw.badges}</span>
                {badges.map(([c, n]) => (
                  <TypeChip key={c} category={c} label={t.common.categories[c] ?? c} count={n} />
                ))}
              </div>
            )}
          </div>

          <dl className="grid grid-cols-3 md:grid-cols-1 gap-x-6 gap-y-4 md:text-right md:border-l-2 md:border-dashed md:border-sand md:pl-8">
            {(
              [
                [tw.stats.cards, <CountUp key="c" value={total} />],
                [tw.stats.value, <CountUp key="v" value={insuredTotal} kind="usdCompact" />],
                [tw.stats.listed, <CountUp key="l" value={listed} />],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="font-pixel text-[9px] text-ink-mute">{label}</dt>
                <dd className="mt-1.5 font-num font-extrabold text-3xl leading-none tabular-nums">{holdings.isLoading ? "…" : value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="seg" role="tablist" aria-label={tw.sections}>
          {(["collection", "activity"] as const).map((id) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>
              {id === "collection" ? (total ? fmt(tw.collectionCount, { n: total }) : tw.collection) : tw.activity}
            </button>
          ))}
        </div>
        {tab === "collection" && cards.length > 1 && (
          <div className="seg" role="group" aria-label={tw.sortLabel}>
            {(
              [
                ["value", tw.sorts.value],
                ["price", tw.sorts.price],
                ["name", tw.sorts.name],
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
          {holdings.isError && <DexMessage title={tw.bagError} />}
          {!holdings.isLoading && !holdings.isError && cards.length === 0 && (
            <DexMessage title={tw.bagEmpty}>{tw.bagEmptyText}</DexMessage>
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
              {plural(locale, total, tw.showing, { shown: cards.length, n: fmtNum(total) })}
            </p>
          )}
        </>
      )}

      {tab === "activity" && (
        <div>
          {activity.isLoading && <FeedSkeleton rows={8} />}
          {activity.isError && <DexMessage title={tw.activityError} />}
          {!activity.isLoading && (activity.data?.activity.filter((a) => a.kind !== "Unknown").length ?? 0) === 0 && !activity.isError && (
            <DexMessage title={tw.activityEmpty} />
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
