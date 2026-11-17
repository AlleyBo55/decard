"use client";
import { feedStats, fmtMultiple } from "@/components/gacha/shared";
import { cardImage } from "@/lib/constants";
import { fmtNum, fmtUsd, shortCardName } from "@/lib/format";
import { plural } from "@/lib/i18n/format";
import type { BigHit } from "@/lib/types";
import { selectView, useGachaHitsQuery, useGachaLiveQuery } from "@/store/api";
import { useLocale } from "@/components/LocaleProvider";
import { useHighlightInView } from "./HighlightPanel";
import { rich } from "./rich";

function biggestHit(hits: BigHit[] | undefined): BigHit | null {
  let best: BigHit | null = null;
  for (const h of hits ?? []) if (h.multiple != null && h.multiple > (best?.multiple ?? 0)) best = h;
  return best;
}

/** Both feeds fetch once the card nears the screen and poll only while it is on it. */
function useGachaPulse() {
  const { seen, visible } = useHighlightInView();
  const live = useGachaLiveQuery(undefined, {
    skip: !seen,
    pollingInterval: visible ? 10_000 : 0,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
  const hits = useGachaHitsQuery(undefined, {
    skip: !seen,
    pollingInterval: visible ? 60_000 : 0,
    skipPollingIfUnfocused: true,
    selectFromResult: selectView,
  });
  return {
    perMinute: live.data ? feedStats(live.data.pulls).perMinute : null,
    hit: biggestHit(hits.data?.hits),
    failed: live.isError && hits.isError,
  };
}

/** The live half of GachaHighlight: the stats line, or the biggest hit's card art. */
export function GachaHighlightLive({ part }: { part: "stats" | "art" }) {
  const { perMinute, hit, failed } = useGachaPulse();
  const { locale, t } = useLocale();
  const g = t.home.gachaCard;

  if (part === "art") {
    return (
      <div className="hl-hit" aria-hidden>
        {hit ? (
          <>
            <img
              src={cardImage(hit.mint, "front", 256)}
              alt=""
              width={256}
              height={431}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                // Collector Crypt's resizer has no art for this mint: try the hit's own image once.
                const el = e.currentTarget;
                if (!hit.imageUrl || el.dataset.fallback) return;
                el.dataset.fallback = "1";
                el.src = hit.imageUrl;
              }}
            />
            <span className="hl-hit-x">{fmtMultiple(hit.multiple)}</span>
          </>
        ) : (
          <span className="hl-hit-ph" />
        )}
      </div>
    );
  }

  if (failed) return null;
  return (
    <p className="hl-gacha-stats mt-3">
      {perMinute != null
        ? // plural() picks the form and leaves {n} in place, for rich() to draw it bold.
          rich(plural(locale, Math.round(perMinute), g.perMinute, { n: "{n}" }), { n: <b>{fmtNum(Math.round(perMinute))}</b> })
        : g.counting}
      {hit && (
        <>
          {" · "}
          {rich(g.biggest, {
            multiple: <b>{fmtMultiple(hit.multiple)}</b>,
            card: shortCardName(hit.cardName),
            value: `${hit.price != null ? `${fmtUsd(hit.price)} → ` : ""}${fmtUsd(hit.insuredValue)}`,
          })}
        </>
      )}
    </p>
  );
}
