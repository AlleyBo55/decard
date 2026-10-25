"use client";

import Link from "next/link";
import { useState } from "react";
import { useWalletLuck, type WalletPullRow } from "@/hooks/pages/Luck/useWalletLuck";
import { clsx } from "@/lib/clsx";
import { cardImage } from "@/lib/constants";
import { fmtNum, fmtPct, fmtUsd, shortAddr, shortCardName } from "@/lib/format";
import { TIER_ORDER } from "@/lib/luck";
import type { WalletLuckSummary } from "@/lib/types";
import { DexMessage, DialogBox, PokeLoader, Skeleton, StatBar } from "@/components/ui";
import { scoreOutOf100, shareOrCopy, TIER_STYLE, titleCase, type ShareState } from "./shared";

const TIERS_BEST_FIRST = [...TIER_ORDER].reverse();

const luckHref = (memo: string) => `/luck?memo=${encodeURIComponent(memo)}`;

function pullCount(n: number) {
  return `${fmtNum(n)} ${n === 1 ? "pull" : "pulls"}`;
}

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
function failureReason(code: string) {
  switch (code) {
    case "LEGACY_PULL":
      return "Legacy pull, no pool snapshot";
    case "UNVERIFIED_PULL":
      return "Not verified by Collector Crypt";
    case "PULL_PENDING":
      return "Not verified yet";
    case "INCOMPLETE_PULL":
      return "Incomplete historical data";
    case "UNSUPPORTED_PULL":
    case "PULL_NOT_FOUND":
    case "BAD_MEMO":
      return "Unsupported pull";
    default:
      return "Unavailable right now";
  }
}

function walletErrorCopy(error: unknown) {
  const value = error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  if (value.code === "BAD_WALLET" || value.status === 400) {
    return {
      title: "That wallet address could not be read.",
      body: "Check that it is a Solana wallet address, then paste it again.",
      retry: false,
    };
  }
  return {
    title: "This wallet's history is unavailable right now.",
    body: "Its Solana transaction history could not be loaded. The wallet is still in the URL, so you can try again safely.",
    retry: true,
  };
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
  const [shareState, setShareState] = useState<ShareState>("idle");
  const score = scoreOutOf100(summary.meanScore);
  const runLine = `Across ${pullCount(summary.scored)}, luckier than ${runPct(summary.runPercentile)} of fair ${fmtNum(
    summary.scored,
  )}-pull runs.`;
  const best = summary.best;
  const showBest = Boolean(best) || scoring;

  async function share() {
    const next = await shareOrCopy({
      title: `Collector Crypt wallet luck: ${score}/100`,
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
              <p className="font-pixel text-[9px] uppercase text-ink-mute">Wallet pull luck</p>
              <h2 id="wallet-luck-title" className="mt-2 h-display text-[clamp(1.6rem,4vw,2.8rem)]">
                Wallet {shortAddr(wallet)}
              </h2>
              <p className="mt-2 break-all font-mono text-xs text-ink-mute">{wallet}</p>
            </div>

            <div className="rounded-2xl border-2 border-ink bg-pika/25 p-5 shadow-[4px_4px_0_var(--color-ink)]">
              <p className="font-pixel text-[10px] uppercase text-ink-mute">Average luck score</p>
              <p className="mt-2 h-display text-[clamp(2rem,6vw,4rem)] leading-none tabular-nums">
                Wallet luck {summary.scored > 0 ? `${score}/100` : "…"}
              </p>
              {summary.scored > 0 && (
                <>
                  <div className="mt-5">
                    <StatBar label="Luck" value={summary.meanScore} max={1} display={`${score}/100`} color="var(--color-poke)" />
                  </div>
                  <p className="mt-5 text-lg font-extrabold">
                    Across {pullCount(summary.scored)}, luckier than{" "}
                    <span className="text-up tabular-nums">{runPct(summary.runPercentile)}</span> of fair{" "}
                    {fmtNum(summary.scored)}-pull runs.
                  </p>
                </>
              )}
              {scoring ? (
                <p className="mt-2 text-sm tabular-nums text-ink-soft">
                  Scoring {fmtNum(progress.done)} of {fmtNum(progress.total)} pulls…
                </p>
              ) : (
                summary.scored === 0 && (
                  <p className="mt-5 text-sm text-ink-soft">None of these pulls could be scored. The list below says why.</p>
                )
              )}
            </div>

            {summary.valueRatio != null && summary.expectedTotal != null && (
              <p className="text-sm text-ink-soft">
                Pulled <span className="font-extrabold tabular-nums text-ink">{fmtUsd(summary.valueInsured)}</span> of
                insured value vs <span className="font-extrabold tabular-nums text-ink">{fmtUsd(summary.expectedTotal)}</span>{" "}
                expected ({fmtPct(summary.valueRatio)}).
                {summary.valueSample < summary.scored &&
                  ` Covers the ${fmtNum(summary.valueSample)} of ${pullCount(summary.scored)} that report expected value.`}
              </p>
            )}

            <div>
              <p className="font-pixel text-[9px] uppercase text-ink-mute">Tiers pulled</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {TIERS_BEST_FIRST.map((tier) => (
                  <li
                    key={tier}
                    className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-pixel text-[9px] uppercase ${TIER_STYLE[tier]}`}
                  >
                    {titleCase(tier)} <span className="tabular-nums">{summary.tiers[tier]}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-sand pt-5">
              <button type="button" onClick={share} className="btn btn-red" disabled={scoring || summary.scored === 0}>
                {shareState === "shared" ? "Shared" : shareState === "copied" ? "Link copied" : "Share wallet luck"}
              </button>
              <Link
                href={`/wallet/${encodeURIComponent(wallet)}`}
                className="text-sm font-extrabold text-azure-deep hover:text-poke-deep"
              >
                Wallet page →
              </Link>
              <span role="status" aria-live="polite" className="text-xs text-ink-mute">
                {shareState === "failed" ? "Sharing failed. Copy the URL from the address bar." : ""}
              </span>
            </div>
          </div>

          {best ? (
            <Link
              href={luckHref(best.memo)}
              className="group flex flex-col items-center justify-center gap-3 bg-cream-lo p-6 text-center sm:p-8"
            >
              <span className="font-pixel text-[9px] uppercase text-ink-mute">Best pull</span>
              <img
                src={cardImage(best.card.mint, "front", 512)}
                alt={`Front of ${best.card.name}`}
                width={337}
                height={568}
                className="w-full max-w-[200px] rounded-[14px] object-contain shadow-[0_12px_28px_rgb(44_38_29_/_0.22)] transition-transform group-hover:-rotate-1 group-hover:scale-[1.02]"
              />
              <span className="font-extrabold text-azure-deep group-hover:text-poke-deep">
                {shortCardName(best.card.name)}
              </span>
              <span className="text-sm tabular-nums text-ink-soft">
                Luck score {scoreOutOf100(best.luckScore)}/100 · {titleCase(best.tier)} tier
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
            {failureReason(state.code)}
            {date && (
              <>
                {" · "}
                <time dateTime={date}>{date}</time>
              </>
            )}
          </p>
        </div>
        <span className="shrink-0 font-pixel text-[8px] uppercase text-ink-mute">Not scored</span>
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
            {titleCase(result.tier)}
          </span>
        </div>
        <p className="mt-1 text-[13px] tabular-nums text-ink-mute">
          {fmtUsd(result.insuredValue)} insured
          {date && (
            <>
              {" · "}
              <time dateTime={date}>{date}</time>
            </>
          )}
        </p>
      </div>
      <div className="w-20 shrink-0 text-right">
        <p className="font-display text-lg font-bold leading-none tabular-nums">
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

  if (!payload) {
    if (isError && !isFetching) {
      const copy = walletErrorCopy(error);
      return (
        <div role="alert">
          <DexMessage
            title={copy.title}
            action={
              copy.retry && (
                <button type="button" onClick={() => refetch()} className="btn btn-red">
                  Try again
                </button>
              )
            }
          >
            {copy.body}
          </DexMessage>
        </div>
      );
    }
    return <PokeLoader label="Reading this wallet's pack history" />;
  }

  const scoring = progress.done < progress.total;
  const visible = rows.filter((row) => row.state.status !== "other");
  const failed = rows.filter((row) => row.state.status === "failed").length;
  const other = rows.length - visible.length;
  const otherNote =
    other > 0
      ? `${pullCount(other)} not credited to this wallet by the official verifier ${other === 1 ? "is" : "are"} left out.`
      : null;
  const scanNote = payload.complete
    ? null
    : payload.memos.length >= 50
      ? `Showing your latest ${fmtNum(payload.memos.length)} pulls.`
      : `Scanned the latest ${fmtNum(payload.scanned)} transactions.`;

  if (visible.length === 0 && !scoring) {
    return (
      <DexMessage
        title="No Collector Crypt pack pulls found in this wallet."
        action={
          <Link
            href={`/wallet/${encodeURIComponent(wallet)}`}
            className="text-sm font-extrabold text-azure-deep hover:text-poke-deep"
          >
            Open wallet {shortAddr(wallet)} →
          </Link>
        }
      >
        Collector Crypt may open packs from an embedded wallet. If so, paste the wallet address shown in your Collector
        Crypt profile instead.
        {otherNote && ` ${otherNote}`}
        {scanNote && ` ${scanNote}`}
      </DexMessage>
    );
  }

  const notes = [scanNote, failed > 0 ? `${pullCount(failed)} could not be scored.` : null, otherNote].filter(
    (note): note is string => Boolean(note),
  );

  return (
    <div className="flex flex-col gap-6">
      <Summary wallet={wallet} summary={summary} scoring={scoring} progress={progress} />

      <section aria-labelledby="wallet-pulls-title" aria-busy={scoring}>
        <DialogBox arrow={false} className="max-w-none">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 id="wallet-pulls-title" className="font-display text-xl font-bold">
              Pulls, newest first
            </h3>
            <span className="text-xs tabular-nums text-ink-mute">{pullCount(visible.length)}</span>
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
        <h3 className="font-display text-xl font-bold">How wallet luck works</h3>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Every pull gets its own luck score and the wallet score is their average. 50 is average luck: a fair pull
          scores above 50 about half the time.
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          The run percentile compares that average with fair runs of the same number of pulls. Averaging 60 over 40
          pulls is far rarer than one pull scoring 60.
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Values are insured values from each pack&apos;s historical witness, not sale prices or profit. Each pull is
          independent, so a cold streak doesn&apos;t make the next pack luckier.
        </p>
      </DialogBox>
    </div>
  );
}
