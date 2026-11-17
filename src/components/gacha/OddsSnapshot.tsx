"use client";

import { useLocale, useT } from "@/components/LocaleProvider";
import { useGachaMachines } from "@/hooks/pages/Gacha/useGachaFeeds";
import { useGachaOdds } from "@/hooks/pages/Gacha/useGachaOdds";
import { Skeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { fmtUsd } from "@/lib/format";
import { fmt } from "@/lib/i18n/format";
import { ChanceBar } from "./PullNow";
import { SpringBar } from "./parts";
import { rich } from "./rich";
import { centsPerDollar, DEFAULT_CATEGORY, DEFAULT_PACK, oneIn, poolAgeText } from "./shared";

/** Cash back per $1 on the gauge's 80¢ to $1.20 scale, with break-even marked in the middle. */
function CashBar({ value }: { value: number }) {
  return (
    <span className="relative mt-1.5 block">
      <SpringBar value={(value - 0.8) / 0.4} color="var(--color-warn-fill)" />
      <span className="absolute -inset-y-1 left-1/2 w-0 border-l-2 border-dashed border-ink" aria-hidden />
    </span>
  );
}

/** Home: "odds now" for one pack (one odds call) and cash back per $1 for the first three Pokémon packs. */
export function OddsSnapshot({ code = DEFAULT_PACK, className }: { code?: string; className?: string }) {
  const machinesQ = useGachaMachines();
  const odds = useGachaOdds(code);
  const { locale } = useLocale();
  const o = useT().luck.odds;
  const copy = o.snapshot;
  const machines = machinesQ.data?.machines ?? [];
  const live = odds.data?.odds ?? null;
  const failed = !live && odds.isError;
  const m = live?.machine ?? machines.find((x) => x.code === code) ?? null;
  const packs = machines.filter((x) => x.category === DEFAULT_CATEGORY).slice(0, 3);
  const top = live?.chase[0];
  const reason = failed ? copy.failed : live?.notes.filter((n) => !/chase/i.test(n)).join(" ") || copy.missing;

  return (
    <section aria-labelledby="odds-now-title" className={clsx("dialog min-w-0 p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h3 id="odds-now-title" className="dialog-text">
          {copy.title}
        </h3>
        {live?.poolAgeMinutes != null && (
          <span className="font-pixel text-[8px] text-ink-mute">
            {fmt(copy.poolRead, { age: poolAgeText(live.poolAgeMinutes, locale, o.poolAge).toUpperCase() })}
          </span>
        )}
      </div>
      {m ? (
        <p className="mt-2 font-extrabold">
          {m.name} <span className="font-bold text-ink-mute">· {fmt(o.perPull, { price: fmtUsd(m.price) })}</span>
        </p>
      ) : (
        <Skeleton className="mt-3 h-4 w-48" />
      )}

      <div className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-1">
        <ul className="flex flex-col gap-3.5">
          <ChanceBar
            compact
            label={o.cardBeats}
            value={live ? live.cardBeatsPrice : (m?.cardBeatsPriceEdge ?? (failed ? null : undefined))}
            reason={reason}
          />
          <ChanceBar
            compact
            label={o.sellBack}
            value={live ? live.sellBackBeatsPrice : failed ? null : undefined}
            reason={reason}
          />
          <ChanceBar compact label={o.double} value={live ? live.doubleUp : failed ? null : undefined} reason={reason} />
          {top && (
            <li className="text-sm text-ink-soft">
              {rich(copy.topChase, {
                value: <span className="font-extrabold text-ink tabular-nums">{fmtUsd(top.value)}</span>,
                odds: <span className="tabular-nums">{oneIn(top.chance, o.oneIn)}</span>,
              })}
            </li>
          )}
        </ul>

        <div className="min-w-0">
          <h4 className="font-pixel text-[9px] uppercase leading-relaxed text-ink-mute">{copy.cashBack}</h4>
          {packs.length ? (
            <ul className="mt-3 flex flex-col gap-3">
              {packs.map((p) => (
                <li key={p.code}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate font-bold">{p.name}</span>
                    <span className="gx-num shrink-0 text-lg leading-none">
                      {centsPerDollar(p.cashOutPerDollar)}
                    </span>
                  </div>
                  <CashBar value={p.cashOutPerDollar} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-3 flex flex-col gap-3" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full" />
              ))}
            </div>
          )}
          <p className="mt-3 text-xs leading-5 text-ink-mute">{copy.dashed}</p>
        </div>
      </div>
    </section>
  );
}
