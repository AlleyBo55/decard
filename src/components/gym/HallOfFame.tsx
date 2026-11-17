"use client";
import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { TierMark } from "@/components/rip/TierMark";
import { TELL, usd } from "@/components/rip/shared";
import { universeOf } from "@/components/rip/universes";
import { shortCardName } from "@/lib/format";
import { ago, fmt } from "@/lib/i18n/format";
import { thumbSet } from "@/lib/thumb";
import type { SlabzLeague } from "@/services/Gym/types";
import type { View } from "./Ladder";
import { spanLabel } from "./shared";

/** Ids that joined the list in its latest change, so only those pop in. The first list just appears. */
function useFresh(ids: string[]): ReadonlySet<string> {
  const key = ids.join(" ");
  const [seen, setSeen] = useState<{ key: string; ids: ReadonlySet<string>; fresh: ReadonlySet<string> }>(() => ({
    key: "",
    ids: new Set(),
    fresh: new Set(),
  }));
  if (key !== seen.key) {
    const before = seen.ids;
    setSeen({ key, ids: new Set(ids), fresh: new Set(before.size ? ids.filter((id) => !before.has(id)) : []) });
  }
  return seen.fresh;
}

/** The biggest pulls across Slabz in the feed's window. New ones pop in as the league refreshes. */
export function HallOfFame({ league }: { league: View<SlabzLeague> }) {
  const { locale, t } = useLocale();
  const s = t.gym.hall;
  const pulls = league.data?.bigPulls ?? [];
  const fresh = useFresh(pulls.map((p) => p.id));
  if (!league.isLoading && pulls.length === 0) return null;
  return (
    <section aria-labelledby="gy-hof" className="mt-16 flex flex-col gap-5">
      <div className="rw-head">
        <span className="rw-kicker">{s.kicker}</span>
        <h2 id="gy-hof">{s.title}</h2>
        <p className="max-w-2xl text-sm font-semibold text-[var(--rw-mute)]">
          {fmt(s.lede, { span: spanLabel(locale, t.gym.span, league.data?.from, league.data?.to) })}
        </p>
      </div>
      {pulls.length === 0 ? (
        <div className="gy-hof" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="gy-fame gy-skel" />
          ))}
        </div>
      ) : (
        <ol className="gy-hof no-scrollbar">
          {pulls.map((p, i) => {
            const u = universeOf(p.packType ?? "");
            return (
              <li
                key={p.id}
                className="gy-fame"
                data-top={i === 0 || undefined}
                data-new={fresh.has(p.id) || undefined}
                style={{ ["--c" as string]: TELL[p.tier] }}
              >
                <span className="gy-fame-rank">{fmt(s.rank, { n: i + 1 })}</span>
                {p.image ? (
                  <img {...thumbSet(p.image, 128)} alt={p.name} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                ) : (
                  <span className="gy-fame-blank">
                    <TierMark u={u.id} tier={p.tier} size={36} />
                  </span>
                )}
                <div className="mt-2 flex items-center justify-between gap-2">
                  <b className="rw-money text-xl leading-none" style={{ color: TELL[p.tier] }}>
                    {usd(p.valueCents, true)}
                  </b>
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wide" style={{ color: TELL[p.tier] }}>
                    <TierMark u={u.id} tier={p.tier} size={13} />
                    {t.ui.ripTiers[p.tier].label}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-[13px] font-extrabold leading-tight" title={p.name}>
                  {shortCardName(p.name)}
                </p>
                <p className="mt-0.5 truncate text-[11px] font-bold text-[var(--rw-mute)]">
                  {[p.grade, p.packName].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-1.5 flex items-center justify-between gap-2 border-t border-white/10 pt-1.5 text-[11px] font-extrabold">
                  <span className="truncate">{p.username}</span>
                  {p.at && <span className="shrink-0 text-[var(--rw-mute)]">{ago(locale, p.at)}</span>}
                </p>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
