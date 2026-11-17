"use client";
import { TIER_INFO, cardValueCents, tierOf, usd } from "@/components/rip/shared";
import { useLocale, useT } from "@/components/LocaleProvider";
import { ago } from "@/lib/i18n/format";
import type { RipHit } from "@/lib/rip/types";
import { thumbSet } from "@/lib/thumb";
import { selectView, useRipHitsQuery } from "@/store/api";
import { useHighlightInView } from "./HighlightPanel";

const SHOWN = 3;
/** "2025 #099 Yamper PSA 10 …" → "Yamper PSA 10 …": the year and set number say little in a short row. */
const cardTitle = (name: string) => name.replace(/^\s*\d{4}\s+/, "").replace(/^#\s?\d+\s+/, "").trim() || name;

/**
 * The latest pulls on Decard, three short rows in the rip card. Fetched once the card nears the
 * screen and polled only while it's there. The server HTML carries the idle line.
 */
export function RipHighlightHits() {
  const { seen, visible } = useHighlightInView();
  const { data } = useRipHitsQuery(undefined, {
    skip: !seen,
    pollingInterval: visible ? 15_000 : 0,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
  const r = useT().home.ripCard;
  const hits = (data ?? []).slice(0, SHOWN);
  return (
    <div className="hl-pulls">
      <p className="hl-pulls-label">{r.pulled}</p>
      {hits.length ? (
        <ul aria-label={r.pullsLabel}>
          {hits.map((hit) => (
            <Pull key={hit.id} hit={hit} />
          ))}
        </ul>
      ) : (
        <p className="hl-pulls-idle">{r.idle}</p>
      )}
    </div>
  );
}

function Pull({ hit }: { hit: RipHit }) {
  // Slabz serves only full-size JPEGs; the optimizer cuts them to the 24px row.
  const img = hit.card.image.thumb ? thumbSet(hit.card.image.thumb, 32) : null;
  const { locale, t } = useLocale();
  const key = tierOf(hit.card.rarity);
  const tier = TIER_INFO[key];
  return (
    <li className="hl-pull" style={{ ["--c" as string]: tier.color }}>
      {img ? (
        <img {...img} alt="" width={24} height={34} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
      ) : (
        <span className="hl-pull-ph" aria-hidden />
      )}
      <span className="hl-pull-val">{usd(cardValueCents(hit.card))}</span>
      <span className="hl-pull-text">
        <b>{cardTitle(hit.card.name)}</b>
        <small>
          <span className="hl-pull-tier">{t.ui.ripTiers[key].label}</span> · {hit.pack.name} · {ago(locale, hit.openedAt)}
        </small>
      </span>
    </li>
  );
}
