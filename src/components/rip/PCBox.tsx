"use client";
import { useState } from "react";
import { fmtMultiple } from "@/components/gacha/shared";
import { useLocale } from "@/components/LocaleProvider";
import { ago, fmt } from "@/lib/i18n/format";
import type { RipPack, RipTx } from "@/lib/rip/types";
import { thumbSet } from "@/lib/thumb";
import { TELL, cardValueCents, tierOf, usd } from "./shared";
import { TierMark } from "./TierMark";
import { artOf, universeOf } from "./universes";

const SELL_WINDOW_MS = 72 * 3600_000;

/** The trainer's collection: unopened paid packs first, then every card pulled. */
export function PCBox({
  pulls,
  packsById,
  loading,
  error,
  hasMore,
  fetchingMore,
  onMore,
  onOpen,
  onView,
}: {
  pulls: RipTx[];
  packsById: Map<string, RipPack>;
  loading: boolean;
  error: boolean;
  hasMore: boolean;
  fetchingMore: boolean;
  onMore: () => void;
  onOpen: (tx: RipTx) => void;
  onView: (tx: RipTx) => void;
}) {
  const { locale, t } = useLocale();
  const copy = t.rip.box;
  // The sell-back window is 72 hours; the time this mounted is precise enough for that.
  const [now] = useState(() => Date.now());
  if (loading) {
    return (
      <div className="rp-box">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="h-[300px] animate-pulse rounded-2xl bg-white/[0.06]" />
        ))}
      </div>
    );
  }
  if (error) return <p className="text-sm font-bold text-[#ff8a7a]">{copy.error}</p>;
  // Unpaid reservations and failed payments cost nothing and need nothing: leave them out.
  const unopened = pulls.filter((t) => t.status === "confirmed" || t.status === "opening");
  const cards = pulls.filter((t) => t.status === "completed" && t.card);
  if (unopened.length + cards.length === 0) {
    return <p className="rw-card px-5 py-6 text-center font-extrabold text-[var(--rw-mute)]">{copy.empty}</p>;
  }
  return (
    <div className="flex flex-col gap-4">
      <ul className="rp-box">
        {unopened.map((tx) => {
          const pack = packsById.get(tx.packId);
          const art = pack ? artOf(pack.type) : null;
          return (
            <li key={tx.id} className="rp-tile" style={{ ["--c" as string]: pack ? universeOf(pack.type).glow : "#ffcb05" }}>
              <div className="grid aspect-[5/8] place-items-center rounded-[10px] bg-black/30 p-3">
                {art && <img src={art.small} alt="" className="!aspect-auto !bg-transparent max-h-full w-auto" />}
              </div>
              <p className="text-sm font-extrabold">{pack?.name ?? fmt(copy.pack, { price: usd(tx.priceCents) })}</p>
              <p className="rw-label !text-[#ffd84d]">{copy.paid}</p>
              <button type="button" className="rw-btn rw-btn-primary mt-auto" onClick={() => onOpen(tx)}>
                {copy.open}
              </button>
            </li>
          );
        })}
        {cards.map((tx) => {
          const card = tx.card!;
          const tier = tierOf(card.rarity);
          const pack = packsById.get(tx.packId);
          const u = universeOf(pack?.type ?? "pokemon");
          const value = cardValueCents(card) ?? 0;
          const mult = tx.priceCents > 0 ? value / tx.priceCents : null;
          const opened = Date.parse(tx.updatedAt ?? tx.createdAt ?? "");
          const sellable = !card.autoSold && Number.isFinite(opened) && now - opened < SELL_WINDOW_MS;
          return (
            <li key={tx.id} className="rp-tile" style={{ ["--c" as string]: TELL[tier] }}>
              <button type="button" className="text-left" onClick={() => onView(tx)} aria-label={fmt(copy.view, { name: card.name })}>
                {card.image.thumb ? (
                  <img {...thumbSet(card.image.thumb, 128)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                ) : (
                  <span className="grid aspect-[5/8] place-items-center rounded-[10px] bg-black/30">
                    <TierMark u={u.id} tier={tier} size={44} />
                  </span>
                )}
              </button>
              <p className="line-clamp-2 min-h-[2.5em] text-[13px] font-extrabold leading-tight">{card.name}</p>
              <div className="flex items-center justify-between gap-1">
                <span className="rp-tier" data-tier={tier}>
                  <TierMark u={u.id} tier={tier} size={12} />
                  {t.ui.ripTiers[tier].label}
                </span>
                <span className="rw-money text-lg">{usd(value)}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--rw-mute)]">
                <span>{tx.updatedAt ? ago(locale, tx.updatedAt) : ""}</span>
                {mult != null && <span className={mult >= 1 ? "text-[#7cf29a]" : undefined}>{fmt(copy.mult, { mult: fmtMultiple(mult) })}</span>}
              </div>
              {card.autoSold ? (
                <p className="mt-auto text-[11px] font-bold text-[var(--rw-mute)]">{fmt(copy.turboPaid, { price: usd(card.autoSoldCents) })}</p>
              ) : (
                <button type="button" className={sellable ? "rw-btn rw-btn-gold mt-auto" : "rw-btn rw-btn-ghost mt-auto"} onClick={() => onView(tx)}>
                  {sellable ? copy.sell : copy.viewButton}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {hasMore && (
        <button type="button" onClick={onMore} disabled={fetchingMore} className="rw-btn rw-btn-ghost self-start">
          {fetchingMore ? copy.loading : copy.older}
        </button>
      )}
    </div>
  );
}
