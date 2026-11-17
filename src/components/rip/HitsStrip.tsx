"use client";
import { useLocale } from "@/components/LocaleProvider";
import { shortAddr } from "@/lib/format";
import { ago } from "@/lib/i18n/format";
import type { RipHit } from "@/lib/rip/types";
import { thumbSet } from "@/lib/thumb";
import { selectView, useRipHitsQuery } from "@/store/api";
import { TELL, cardValueCents, tierOf, usd } from "./shared";
import { TierMark } from "./TierMark";
import { universeOf } from "./universes";

/** What Decard trainers just pulled. Polls with Slabz's 15-second cache. */
export function HitsStrip() {
  const { data } = useRipHitsQuery(undefined, { pollingInterval: 15_000, skipPollingIfUnfocused: true, selectFromResult: selectView });
  const copy = useLocale().t.rip.hits;
  const hits = data ?? [];
  return (
    <section aria-label={copy.label} className="rh full-bleed">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-[clamp(12px,3vw,28px)]">
        <span className="rh-live shrink-0">
          <span className="live-dot" /> {copy.live}
        </span>
        {hits.length === 0 ? (
          <p className="py-4 text-sm font-extrabold text-[var(--rw-mute)]">{copy.empty}</p>
        ) : hits.length < 5 ? (
          <div className="rp-hits min-w-0 overflow-x-auto no-scrollbar">
            {hits.map((h) => (
              <Hit key={h.id} hit={h} />
            ))}
          </div>
        ) : (
          <div className="marquee min-w-0 flex-1" style={{ ["--marquee-duration" as string]: `${Math.max(30, hits.length * 4)}s` }}>
            <div className="marquee-track">
              {[0, 1].map((k) => (
                <div key={k} className="rp-hits shrink-0 pr-2.5" aria-hidden={k === 1}>
                  {hits.map((h) => (
                    <Hit key={h.id} hit={h} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Hit({ hit }: { hit: RipHit }) {
  const { locale } = useLocale();
  const t = tierOf(hit.card.rarity);
  const u = universeOf(hit.pack.type);
  return (
    <div className="rp-hit" style={{ ["--c" as string]: t === "common" ? u.ink : TELL[t] }}>
      {hit.card.image.thumb ? (
        <img {...thumbSet(hit.card.image.thumb, 32)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      ) : (
        <TierMark u={u.id} tier={t} size={30} />
      )}
      <div className="min-w-0">
        <div className="rw-money text-[17px] leading-none" style={{ color: TELL[t] }}>
          {usd(cardValueCents(hit.card))}
        </div>
        <div className="mt-1 truncate text-xs font-extrabold">{hit.pack.name}</div>
        <div className="truncate text-[10px] font-bold text-[var(--rw-mute)]">
          {ago(locale, hit.openedAt)} · {shortAddr(hit.wallet)}
        </div>
      </div>
    </div>
  );
}
