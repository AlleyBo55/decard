"use client";

import Link from "@/components/LocaleLink";
import { useLocale, useT } from "@/components/LocaleProvider";
import { useState } from "react";
import { useWalletLuck, type WalletPullRow } from "@/hooks/pages/Luck/useWalletLuck";
import { clsx } from "@/lib/clsx";
import { cardImage } from "@/lib/constants";
import { fmtNum, fmtPct, fmtUsd, shortAddr, shortCardName } from "@/lib/format";
import { fmt, plural } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import { TIER_ORDER } from "@/lib/luck";
import type { WalletLuckSummary } from "@/lib/types";
import { DexMessage, DialogBox, PokeLoader, Skeleton, StatBar } from "@/components/ui";
import { rich } from "@/components/gacha/rich";
import { scoreOutOf100, shareOrCopy, TIER_STYLE, type ShareState } from "./shared";

type WalletCopy = ClientStrings["luck"]["wallet"];

const TIERS_BEST_FIRST = [...TIER_ORDER].reverse();

const luckHref = (memo: string) => `/luck?memo=${encodeURIComponent(memo)}`;

/** Rounded to one decimal, a percentile can read 0.0% or 100.0%, which no run can be. */
function runPct(value: number) {
  return fmtPct(Math.min(0.999, Math.max(0.001, value)));
}

/** cc-77161af0…83d6 */
function shortMemo(memo: string) {
  return memo.length > 16 ? `${memo.slice(0, 11)}…${memo.slice(-4)}` : memo;
}

/** YYYY-MM-DD in UTC, so the server render and hydration agree. */
function utcDate(blockTime: number | null, pulledAt: string | null) {
  const date = new Date(blockTime != null ? blockTime * 1000 : pulledAt ? Date.parse(pulledAt) : Number.NaN);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

/** Plain reason for a pull /api/luck could not score, by its error code (see lib/gacha.ts). */
function failureReason(code: string, reasons: WalletCopy["reasons"]) {
  switch (code) {
    case "LEGACY_PULL":
      return reasons.legacy;
    case "UNVERIFIED_PULL":
      return reasons.unverified;
    case "PULL_PENDING":
      return reasons.pending;
    case "INCOMPLETE_PULL":
      return reasons.incomplete;
    case "UNSUPPORTED_PULL":
    case "PULL_NOT_FOUND":
    case "BAD_MEMO":
      return reasons.unsupported;
    default:
      return reasons.unavailable;
  }
}

function walletErrorCopy(error: unknown, errors: WalletCopy["errors"]) {
  const value = error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  if (value.code === "BAD_WALLET" || value.status === 400) {
    return { ...errors.badWallet, retry: false };
  }
  return { ...errors.unavailable, retry: true };
}

function Summary({
  wallet,
  summary,
  scoring,
  progress,
}: {
  wallet: string;
  summary: WalletLuckSummary;
  scoring: boolean;
  progress: { done: number; total: number };
}) {
  const t = useT();
  const { locale } = useLocale();
  const w = t.luck.wallet;
  const [shareState, setShareState] = useState<ShareState>("idle");
  const score = scoreOutOf100(summary.meanScore);
  const scored = fmtNum(summary.scored);
  const runLine = plural(locale, summary.scored, w.run, { n: scored, pct: runPct(summary.runPercentile) });
  const best = summary.best;
  const showBest = Boolean(best) || scoring;

  async function share() {
    const next = await shareOrCopy({
      title: fmt(w.shareTitle, { score }),
      text: runLine,
      url: `${window.location.origin}/luck?wallet=${encodeURIComponent(wallet)}`,
    });
    if (next) setShareState(next);
  }

  return (
    <section aria-labelledby="wallet-luck-title">
      <DialogBox arrow={false} className="!p-0 overflow-hidden max-w-none">
        <div className={clsx("grid", showBest && "lg:grid-cols-[minmax(0,1.55fr)_minmax(230px,0.72fr)]")}>
          <div className="flex min-w-0 flex-col gap-6 p-5 sm:p-8">
            <div>
              <p className="font-pixel text-[9px] uppercase text-ink-mute">{w.kicker}</p>
              <h2 id="wallet-luck-title" className="mt-2 h-display text-[clamp(1.6rem,4vw,2.8rem)]">
                {fmt(w.title, { wallet: shortAddr(wallet) })}
              </h2>
              <p className="mt-2 break-all font-mono text-xs text-ink-mute">{wallet}</p>
            </div>

            <div className="rounded-2xl border-2 border-ink bg-pika/25 p-5 shadow-[4px_4px_0_var(--color-ink)]">
              <p className="font-pixel text-[10px] uppercase text-ink-mute">{w.average}</p>
              <p className="mt-2 h-display text-[clamp(2rem,6vw,4rem)] leading-none tabular-nums">
                {summary.scored > 0 ? fmt(w.score, { score }) : w.scorePending}
              </p>
              {summary.scored > 0 && (
                <>
                  <div className="mt-5">
                    <StatBar label={t.luck.bar} value={summary.meanScore} max={1} display={`${score}/100`} color="var(--color-poke)" />
                  </div>
                  <p className="mt-5 text-lg font-extrabold">
                    {rich(plural(locale, summary.scored, w.run, { n: scored }), {
                      pct: <span className="text-up tabular-nums">{runPct(summary.runPercentile)}</span>,
                    })}
                  </p>
                </>
              )}
              {scoring ? (
                <p className="mt-2 text-sm tabular-nums text-ink-soft">
                  {plural(locale, progress.total, w.scoring, { done: fmtNum(progress.done), n: fmtNum(progress.total) })}
                </p>
              ) : (
                summary.scored === 0 && <p className="mt-5 text-sm text-ink-soft">{w.noneScored}</p>
              )}
            </div>

            {summary.valueRatio != null && summary.expectedTotal != null && (
              <p className="text-sm text-ink-soft">
                {rich(w.value, {
                  value: <span className="font-extrabold tabular-nums text-ink">{fmtUsd(summary.valueInsured)}</span>,
                  expected: <span className="font-extrabold tabular-nums text-ink">{fmtUsd(summary.expectedTotal)}</span>,
                  ratio: fmtPct(summary.valueRatio),
                })}
                {summary.valueSample < summary.scored &&
                  ` ${plural(locale, summary.scored, w.valueSample, { sample: fmtNum(summary.valueSample), n: scored })}`}
              </p>
            )}

            <div>
              <p className="font-pixel text-[9px] uppercase text-ink-mute">{w.tiers}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {TIERS_BEST_FIRST.map((tier) => (
                  <li
                    key={tier}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-pixel text-[9px] uppercase ${TIER_STYLE[tier]}`}
                  >
                    {t.ui.gachaTiers[tier]} <span className="tabular-nums">{summary.tiers[tier]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-sand pt-5">
              <button type="button" onClick={share} className="btn btn-red" disabled={scoring || summary.scored === 0}>
                {shareState === "shared" ? t.luck.share.shared : shareState === "copied" ? t.luck.share.copied : w.share}
              </button>
              <Link
                href={`/wallet/${encodeURIComponent(wallet)}`}
                className="text-sm font-extrabold text-azure-deep hover:text-poke-deep"
              >
                {w.walletPage}
              </Link>
              <span role="status" aria-live="polite" className="text-xs text-ink-mute">
                {shareState === "failed" ? t.luck.share.failed : ""}
              </span>
            </div>
          </div>

          {best ? (
            <Link
              href={luckHref(best.memo)}
              className="group flex flex-col items-center justify-center gap-3 bg-cream-lo p-6 text-center sm:p-8"
            >
              <span className="font-pixel text-[9px] uppercase text-ink-mute">{w.best}</span>
              <img
                src={cardImage(best.card.mint, "front", 512)}
                alt={fmt(t.luck.cardFront, { name: best.card.name })}
                width={337}
                height={568}
                className="w-full max-w-[200px] rounded-[14px] object-contain shadow-[0_12px_28px_rgb(44_38_29_/_0.22)] transition-transform group-hover:-rotate-1 group-hover:scale-[1.02]"
              />
              <span className="font-extrabold text-azure-deep group-hover:text-poke-deep">
                {shortCardName(best.card.name)}
              </span>
              <span className="text-sm tabular-nums text-ink-soft">
                {fmt(t.luck.score, { score: scoreOutOf100(best.luckScore) })} ·{" "}
                {fmt(t.luck.tier, { tier: t.ui.gachaTiers[best.tier] })}
              </span>
            </Link>
          ) : (
            showBest && (
              <div className="flex flex-col items-center justify-center gap-3 bg-cream-lo p-6 sm:p-8" aria-hidden>
                <Skeleton className="h-3 w-20" />
                <Skeleton className="aspect-[337/568] w-full max-w-[200px] rounded-[14px]" />
                <Skeleton className="h-3 w-32" />
              </div>
            )
          )}
        </div>
      </DialogBox>
    </section>
  );
}

const ROW_CLASS =
  "group menu-item flex items-center gap-3 rounded-lg py-3 pl-1 pr-1 transition-colors hover:bg-cream-hi/80";

function PullRow({ row }: { row: WalletPullRow }) {
  const t = useT();
  const w = t.luck.wallet;
  const { state } = row;

  if (state.status === "loading") {
    return (
      <div className="flex items-center gap-3 py-3 pl-1 pr-1" aria-hidden>
        <Skeleton className="h-12 w-9 rounded-md" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-4 w-16" />
      </div>
    );
  }

  if (state.status === "other") return null;

  if (state.status === "failed") {
    const date = utcDate(row.blockTime, null);
    return (
      <Link href={luckHref(row.memo)} prefetch={false} className={ROW_CLASS}>
        <span className="flex h-12 w-9 shrink-0 items-center justify-center" aria-hidden>
          <span className="pokeball opacity-60" style={{ ["--s" as string]: "26px" }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[13px] font-bold text-ink-soft">{shortMemo(row.memo)}</p>
          <p className="mt-1 text-[13px] text-ink-mute">
            {failureReason(state.code, w.reasons)}
            {date && (
              <>
                {" · "}
                <time dateTime={date}>{date}</time>
              </>
            )}
          </p>
        </div>
        <span className="shrink-0 font-pixel text-[8px] uppercase text-ink-mute">{w.notScored}</span>
      </Link>
    );
  }

  const { result } = state;
  const date = utcDate(row.blockTime, result.pulledAt);
  return (
    <Link href={luckHref(row.memo)} prefetch={false} className={ROW_CLASS}>
      <img
        src={cardImage(result.card.mint, "front", 128)}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-12 w-9 shrink-0 rounded-md bg-cream-lo object-contain transition-transform group-hover:-rotate-3 group-hover:scale-105"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="truncate font-extrabold">{shortCardName(result.card.name)}</span>
          <span
            className={`inline-flex rounded-md border px-1.5 py-1 font-pixel text-[8px] uppercase leading-none ${TIER_STYLE[result.tier]}`}
          >
            {t.ui.gachaTiers[result.tier]}
          </span>
        </div>
        <p className="mt-1 text-[13px] tabular-nums text-ink-mute">
          {fmt(w.insured, { value: fmtUsd(result.insuredValue) })}
          {date && (
            <>
              {" · "}
              <time dateTime={date}>{date}</time>
            </>
          )}
        </p>
      </div>
      <div className="w-20 shrink-0 text-right">
        <p className="font-num text-lg font-extrabold leading-none tabular-nums">
          {scoreOutOf100(result.luckScore)}
          <span className="text-xs text-ink-mute">/100</span>
        </p>
        <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-cream-lo" aria-hidden>
          <span
            className="block h-full rounded-full bg-poke"
            style={{ width: `${Math.max(2, Math.min(100, result.luckScore * 100))}%` }}
          />
        </span>
      </div>
    </Link>
  );
}

export function WalletLuck({ wallet }: { wallet: string }) {
  const { payload, isError, error, isFetching, refetch, rows, progress, summary } = useWalletLuck(wallet);
  const t = useT();
  const { locale } = useLocale();
  const w = t.luck.wallet;

  if (!payload) {
    if (isError && !isFetching) {
      const copy = walletErrorCopy(error, w.errors);
      return (
        <div role="alert">
          <DexMessage
            title={copy.title}
            action={
              copy.retry && (
                <button type="button" onClick={() => refetch()} className="btn btn-red">
                  {t.luck.retry}
                </button>
              )
            }
          >
            {copy.body}
          </DexMessage>
        </div>
      );
    }
    return <PokeLoader label={w.loading} />;
  }

  const scoring = progress.done < progress.total;
  const visible = rows.filter((row) => row.state.status !== "other");
  const failed = rows.filter((row) => row.state.status === "failed").length;
  const other = rows.length - visible.length;
  const otherNote = other > 0 ? plural(locale, other, w.notes.other, { n: fmtNum(other) }) : null;
  const scanNote = payload.complete
    ? null
    : payload.memos.length >= 50
      ? plural(locale, payload.memos.length, w.notes.latest, { n: fmtNum(payload.memos.length) })
      : plural(locale, payload.scanned, w.notes.scanned, { n: fmtNum(payload.scanned) });

  if (visible.length === 0 && !scoring) {
    return (
      <DexMessage
        title={w.empty.title}
        action={
          <Link
            href={`/wallet/${encodeURIComponent(wallet)}`}
            className="text-sm font-extrabold text-azure-deep hover:text-poke-deep"
          >
            {fmt(w.empty.open, { wallet: shortAddr(wallet) })}
          </Link>
        }
      >
        {w.empty.body}
        {otherNote && ` ${otherNote}`}
        {scanNote && ` ${scanNote}`}
      </DexMessage>
    );
  }

  const notes = [scanNote, failed > 0 ? plural(locale, failed, w.notes.failed, { n: fmtNum(failed) }) : null, otherNote].filter(
    (note): note is string => Boolean(note),
  );

  return (
    <div className="flex flex-col gap-6">
      <Summary wallet={wallet} summary={summary} scoring={scoring} progress={progress} />

      <section aria-labelledby="wallet-pulls-title" aria-busy={scoring}>
        <DialogBox arrow={false} className="max-w-none">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 id="wallet-pulls-title" className="font-display text-xl font-bold">
              {w.list}
            </h3>
            <span className="text-xs tabular-nums text-ink-mute">
              {plural(locale, visible.length, w.pulls, { n: fmtNum(visible.length) })}
            </span>
          </div>
          <ul className="dash-divide mt-3">
            {visible.map((row) => (
              <li key={row.memo}>
                <PullRow row={row} />
              </li>
            ))}
          </ul>
          {notes.length > 0 && (
            <div className="mt-4 flex flex-col gap-1 border-t border-sand pt-4 text-xs text-ink-mute">
              {notes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          )}
        </DialogBox>
      </section>

      <DialogBox arrow={false} className="max-w-none">
        <h3 className="font-display text-xl font-bold">{w.howTitle}</h3>
        {w.how.map((line, i) => (
          <p key={i} className={`${i ? "mt-2" : "mt-3"} text-sm leading-6 text-ink-soft`}>
            {line}
          </p>
        ))}
      </DialogBox>
    </div>
  );
}
