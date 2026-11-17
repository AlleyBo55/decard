"use client";
import { useState } from "react";
import { useT } from "@/components/LocaleProvider";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/i18n/format";
import { TIERS, type PoolCard, type RipPack, type Tier } from "@/lib/rip/types";
import { thumbSet } from "@/lib/thumb";
import { useRipPoolInfiniteQuery } from "@/store/api";
import { TELL, tierOf, usd } from "./shared";
import { TierMark } from "./TierMark";
import { universeOf } from "./universes";

/** The chase cards in the selected pack: the top grails, expandable to the whole pool. */
export function Grails({ pack, preview }: { pack: RipPack; preview?: PoolCard[] }) {
  const { ui, rip } = useT();
  const copy = rip.grails;
  const u = universeOf(pack.type);
  const [all, setAll] = useState(false);
  const [rarity, setRarity] = useState<Tier | undefined>(undefined);
  const q = useRipPoolInfiniteQuery({ packId: pack.id, rarity: all ? rarity : undefined }, { skip: Boolean(preview) });
  const live = q.data?.pages.flatMap((p) => p.data) ?? [];
  const cards = preview
    ? [...preview].filter((c) => !all || !rarity || c.rarity === rarity).sort((a, b) => b.insuredValueCents - a.insuredValueCents)
    : live;
  const shown = all ? cards : cards.slice(0, 14);

  return (
    <section id="grails" aria-labelledby="rp-grails" className="mt-10 scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="rw-head">
          <span className="rw-kicker">{copy.kicker}</span>
          <h2 id="rp-grails">{fmt(copy.title, { pack: pack.name })}</h2>
        </div>
        <button type="button" className="ra-chip" aria-expanded={all} onClick={() => setAll((v) => !v)}>
          {all ? copy.showTop : copy.showAll}
        </button>
      </div>

      {all && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={copy.filter}>
          <button type="button" className={clsx("ra-chip", rarity === undefined && "!border-white")} aria-pressed={rarity === undefined} onClick={() => setRarity(undefined)}>
            {copy.all}
          </button>
          {TIERS.map((t) => (
            <button key={t} type="button" className={clsx("ra-chip", rarity === t && "!border-white")} aria-pressed={rarity === t} onClick={() => setRarity(t)}>
              <TierMark u={u.id} tier={t} size={16} /> {ui.ripTiers[t].label}
            </button>
          ))}
        </div>
      )}

      {!preview && q.isLoading ? (
        <div className="mt-4 flex gap-3 overflow-hidden">
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} className="h-[268px] w-[152px] shrink-0 animate-pulse rounded-2xl bg-white/[0.06]" />
          ))}
        </div>
      ) : !preview && q.isError ? (
        <p className="mt-4 text-sm font-bold text-[var(--rw-mute)]">{copy.error}</p>
      ) : (
        <ul className={clsx("mt-4", all ? "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6" : "flex snap-x gap-3 overflow-x-auto pb-2 no-scrollbar")}>
          {shown.map((c, i) => {
            const t = tierOf(c.rarity);
            return (
              <li key={c.id} className="rp-grail" style={{ ["--c" as string]: TELL[t], width: all ? "auto" : undefined }}>
                {/* Inside the tile: the scroller clips anything that sticks out. */}
                {i < 3 && !(all && rarity) && <span className="rp-rank">#{i + 1}</span>}
                {c.imageUrl ? (
                  <img {...thumbSet(c.imageUrl, all ? 256 : 128)} alt={c.name} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                ) : (
                  <div className="grid aspect-[5/8] place-items-center rounded-lg bg-black/30">
                    <TierMark u={u.id} tier={t} size={34} />
                  </div>
                )}
                <p className="mt-2 line-clamp-2 min-h-[2.4em] text-[12px] font-extrabold leading-tight" title={c.name}>
                  {c.name}
                </p>
                <div className="mt-1 flex items-center justify-between gap-1">
                  <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wide" style={{ color: TELL[t] }}>
                    <TierMark u={u.id} tier={t} size={13} />
                    {ui.ripTiers[t].label}
                  </span>
                  <span className="rw-money text-base">{usd(c.insuredValueCents, true)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!preview && all && q.hasNextPage && (
        <div className="mt-4 flex justify-center">
          <button type="button" className="ra-chip" onClick={() => void q.fetchNextPage()} disabled={q.isFetching}>
            {q.isFetching ? copy.loading : copy.more}
          </button>
        </div>
      )}
    </section>
  );
}
