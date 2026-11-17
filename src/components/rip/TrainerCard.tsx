"use client";
import { useLocale } from "@/components/LocaleProvider";
import { TrainerAvatar } from "@/components/wallet/TrainerAvatar";
import { localeMeta } from "@/lib/i18n";
import { fmt, plural } from "@/lib/i18n/format";
import { BADGES, type Badge, type Stats } from "@/lib/rip/trainer";
import { rich } from "./rich";
import { usd } from "./shared";

/** Level, XP, streak, today's numbers and every badge, earned or not. */
export function TrainerCard({ wallet, stats, onConnect }: { wallet: string | null; stats: Stats | null; onConnect: () => void }) {
  const { locale, t } = useLocale();
  const copy = t.rip.trainer;
  if (!wallet || !stats) {
    return (
      <div className="rw-card flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="max-w-xl">
          <p className="rw-say">{copy.startTitle}</p>
          <p className="mt-1 text-sm font-semibold text-[var(--rw-mute)]">{copy.startText}</p>
        </div>
        <button type="button" onClick={onConnect} className="rw-btn rw-btn-gold">
          {copy.connect}
        </button>
      </div>
    );
  }
  const badge = (b: Badge) => copy.badges[b.id] ?? b;
  const next = BADGES.find((b) => !b.earned(stats));
  const nextHint = next ? badge(next).hint : "";
  const net = stats.pulledToday - stats.spentToday;
  return (
    <div className="rw-card flex flex-col gap-5 p-5">
      <div className="flex flex-wrap items-center gap-4">
        <span className="overflow-hidden rounded-2xl border-2 border-white/70">
          <TrainerAvatar address={wallet} size={64} />
        </span>
        <div className="min-w-[200px] flex-1">
          <div className="flex items-baseline gap-2">
            <span className="rounded-lg bg-[#ffcb05] px-2 py-0.5 text-sm font-black text-[#29263d]">{fmt(copy.level, { n: stats.level })}</span>
            <span className="rw-display text-2xl">{copy.titles[stats.title] ?? stats.title}</span>
          </div>
          <div className="rp-xp mt-2.5" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(stats.progress * 100)} aria-label={copy.xpLabel}>
            <span style={{ width: `${Math.max(3, stats.progress * 100)}%` }} />
          </div>
          <p className="mt-1.5 text-xs font-bold text-[var(--rw-mute)]">
            {fmt(copy.xp, { xp: stats.xp.toLocaleString("en"), next: stats.toNext.toLocaleString("en"), level: stats.level + 1 })}
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-white/[0.06] px-3 py-2">
            <dt className="rw-label !text-[10px]">{copy.streak}</dt>
            <dd className="rw-money text-xl">{stats.streak > 0 ? `🔥${stats.streak}` : "0"}</dd>
          </div>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2">
            <dt className="rw-label !text-[10px]">{copy.rips}</dt>
            <dd className="rw-money text-xl">{stats.rips}</dd>
          </div>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2">
            <dt className="rw-label !text-[10px]">{copy.best}</dt>
            <dd className="rw-money text-xl">{usd(stats.bestCents, true)}</dd>
          </div>
        </dl>
      </div>
      <ul className="flex flex-wrap gap-3" aria-label={copy.badgesLabel}>
        {BADGES.map((b) => {
          const got = b.earned(stats);
          const { name, hint } = badge(b);
          return (
            <li key={b.id} title={got ? name : fmt(copy.badgeHint, { name, hint })}>
              <span className="rp-badge" data-locked={!got} style={{ ["--b" as string]: b.color }}>
                {b.glyph}
              </span>
              <span className="sr-only">{fmt(got ? copy.earned : copy.locked, { name, hint })}</span>
            </li>
          );
        })}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[var(--rw-mute)]">
        <span>
          {rich(copy.today, {
            rips: plural(locale, stats.ripsToday, copy.ripsToday),
            spent: <span className="rw-money text-sm">{usd(stats.spentToday)}</span>,
            pulled: <span className="rw-money text-sm">{usd(stats.pulledToday)}</span>,
          })}
          {stats.ripsToday > 0 && (
            <span className={net >= 0 ? "text-[#7cf29a]" : "text-[#ff8a7a]"}>
              {" "}
              ({net >= 0 ? "+" : "−"}
              <span className="rw-money text-sm">{usd(Math.abs(net))}</span>)
            </span>
          )}
        </span>
        {stats.streak > 0 && stats.ripsToday === 0 ? (
          <span className="text-[#ffd84d]">{plural(locale, stats.streak, copy.keepStreak)}</span>
        ) : next ? (
          <span>{fmt(copy.nextBadge, { hint: nextHint.charAt(0).toLocaleLowerCase(localeMeta(locale).html) + nextHint.slice(1) })}</span>
        ) : (
          <span>{copy.allBadges}</span>
        )}
      </div>
    </div>
  );
}
