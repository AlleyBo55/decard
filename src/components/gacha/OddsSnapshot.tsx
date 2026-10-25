"use client";

import { useGachaMachines } from "@/hooks/pages/Gacha/useGachaFeeds";
import { useGachaOdds } from "@/hooks/pages/Gacha/useGachaOdds";
import { Skeleton } from "@/components/ui";
import { clsx } from "@/lib/clsx";
import { fmtUsd } from "@/lib/format";
import { ChanceBar } from "./PullNow";
import { SpringBar } from "./parts";
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
  const machines = machinesQ.data?.machines ?? [];
  const live = odds.data?.odds ?? null;
  const failed = !live && odds.isError;
  const m = live?.machine ?? machines.find((x) => x.code === code) ?? null;
  const packs = machines.filter((x) => x.category === DEFAULT_CATEGORY).slice(0, 3);
  const top = live?.chase[0];
  const reason = failed
    ? "Needs the live card pool, which didn't load."
    : live?.notes.filter((n) => !/chase/i.test(n)).join(" ") || "Not published for this pack.";

  return (
    <section aria-labelledby="odds-now-title" className={clsx("dialog min-w-0 p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h3 id="odds-now-title" className="dialog-text">
          ODDS NOW
        </h3>
        {live?.poolAgeMinutes != null && (
          <span className="font-pixel text-[8px] text-ink-mute">POOL READ {poolAgeText(live.poolAgeMinutes).toUpperCase()} AGO</span>
        )}
      </div>
      {m ? (
        <p className="mt-2 font-extrabold">
          {m.name} <span className="font-bold text-ink-mute">· {fmtUsd(m.price)} a pull</span>
        </p>
      ) : (
        <Skeleton className="mt-3 h-4 w-48" />
      )}

      <div className="mt-5 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-1">
        <ul className="flex flex-col gap-3.5">
          <ChanceBar
            compact
            label="Card worth ≥ what you pay"
            value={live ? live.cardBeatsPrice : (m?.cardBeatsPriceEdge ?? (failed ? null : undefined))}
            reason={reason}
          />
          <ChanceBar
            compact
            label="Sell-back returns ≥ what you pay"
            value={live ? live.sellBackBeatsPrice : failed ? null : undefined}
            reason={reason}
          />
          <ChanceBar compact label="Card worth 2× or more" value={live ? live.doubleUp : failed ? null : undefined} reason={reason} />
          {top && (
            <li className="text-sm text-ink-soft">
              Top chase <span className="font-extrabold text-ink tabular-nums">{fmtUsd(top.value)}</span> ·{" "}
              <span className="tabular-nums">{oneIn(top.chance)}</span>
            </li>
          )}
        </ul>

        <div className="min-w-0">
          <h4 className="font-pixel text-[9px] uppercase leading-relaxed text-ink-mute">Cash back per $1 if you sell back</h4>
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
          <p className="mt-3 text-xs leading-5 text-ink-mute">
            The dashed line marks $1.00. A bar that stops short of it means selling back returns less than the pull
            cost, on average.
          </p>
        </div>
      </div>
    </section>
  );
}
