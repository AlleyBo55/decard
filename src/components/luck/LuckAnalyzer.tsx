"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLuck } from "@/hooks/pages/Luck/useLuck";
import { cardImage, solscanTx } from "@/lib/constants";
import { fmtNum, fmtPct, fmtUsd, shortAddr } from "@/lib/format";
import { parsePackMemo, parseWalletAddress } from "@/lib/luck";
import type { PullLuck } from "@/lib/types";
import { DexMessage, DialogBox, PokeLoader, SectionHead, StatBar } from "@/components/ui";
import { scoreOutOf100, shareOrCopy, TIER_STYLE, titleCase, type ShareState } from "./shared";
import { WalletLuck } from "./WalletLuck";

type ErrorCopy = {
  title: string;
  body: string;
};

type Target = { kind: "memo" | "wallet"; value: string };

/** A pack memo or verifier URL first, else a wallet address (bare or inside a pasted URL). */
function parseTarget(input: string): Target | null {
  const memo = parsePackMemo(input);
  if (memo) return { kind: "memo", value: memo };
  const wallet = parseWalletAddress(input);
  return wallet ? { kind: "wallet", value: wallet } : null;
}

/** A fixed UTC representation renders identically on the server and during hydration. */
function stablePulledAt(value: string | null) {
  if (!value) return "Not reported";
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return "Not reported";
  return new Date(timestamp).toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

function safeHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function requestErrorCopy(error: unknown): ErrorCopy {
  const value = error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  const message = typeof value.message === "string" ? value.message : "";
  const code = typeof value.code === "string" ? value.code : "";
  const status = typeof value.status === "number" ? value.status : null;
  const fingerprint = `${code} ${message}`.toLowerCase();

  if (/legacy|provable[ _-]?pool|no[ _-]?snapshot/.test(fingerprint)) {
    return {
      title: "This legacy pull cannot be scored.",
      body: "Older pulls without a provable historical pool snapshot do not contain enough data for a fair comparison.",
    };
  }
  if (/not[ _-]?ready|pending|ready for verification|not available yet/.test(fingerprint)) {
    return {
      title: "This pull is not ready yet.",
      body: "Collector Crypt has not published all verification data for this pull. Try this memo again later.",
    };
  }
  if (/unverified|did not verify|could not verify|verification[ _-]?failed|vrf|selection[ _-]?invalid|commit[ _-]?invalid/.test(fingerprint)) {
    return {
      title: "Collector Crypt did not verify this pull.",
      body: "Decard will not show a luck score unless the official selection witness verifies successfully.",
    };
  }
  if (/incomplete[ _-]?pull|historical data.*incomplete/.test(fingerprint)) {
    return {
      title: "This pull does not have complete historical data.",
      body: "The saved pool or odds are incomplete, so Decard cannot calculate a defensible luck score.",
    };
  }
  if (
    status === 400 ||
    status === 404 ||
    /bad[ _-]?memo|invalid[ _-]?memo|unknown[ _-]?memo|not found|unsupported[ _-]?chain|only collector crypt solana/.test(
      fingerprint,
    )
  ) {
    return {
      title: "That pack memo could not be analyzed.",
      body: "Check that it belongs to a Collector Crypt Solana pull, then paste the memo or its official verify-selection URL again.",
    };
  }
  return {
    title: "The luck data source is unavailable.",
    body: "The upstream pull data could not be loaded. Your memo is still in the URL, so you can try again safely.",
  };
}

function Metric({ label, value, detail }: { label: string; value: React.ReactNode; detail?: string }) {
  return (
    <div className="rounded-xl border border-sand bg-cream-hi px-4 py-3">
      <dt className="font-pixel text-[8px] uppercase text-ink-mute">{label}</dt>
      <dd className="mt-1 font-extrabold tabular-nums text-ink">{value}</dd>
      {detail && <dd className="mt-0.5 text-xs text-ink-mute">{detail}</dd>}
    </div>
  );
}

function LuckResult({ result }: { result: PullLuck }) {
  const [shareState, setShareState] = useState<ShareState>("idle");
  const score = scoreOutOf100(result.luckScore);
  const verifierUrl = safeHttpsUrl(result.officialVerifierUrl);
  const pulledAt = stablePulledAt(result.pulledAt);

  async function share() {
    const next = await shareOrCopy({
      title: `Collector Crypt pull luck: ${score}/100`,
      text: `${result.card.name} beat ${fmtPct(result.beatRate)} of possible pulls in its historical pool.`,
      url: `${window.location.origin}/luck?memo=${encodeURIComponent(result.memo)}`,
    });
    if (next) setShareState(next);
  }

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="luck-result-title">
        <DialogBox arrow={false} className="!p-0 overflow-hidden max-w-none">
          <div className="grid lg:grid-cols-[minmax(230px,0.72fr)_minmax(0,1.55fr)]">
            <div className="flex items-center justify-center bg-cream-lo p-6 sm:p-8">
              <Link href={`/card/${encodeURIComponent(result.card.mint)}`} className="group block max-w-[260px]">
                <img
                  src={cardImage(result.card.mint, "front", 512)}
                  alt={`Front of ${result.card.name}`}
                  width={337}
                  height={568}
                  className="w-full rounded-[14px] object-contain shadow-[0_12px_28px_rgb(44_38_29_/_0.22)] transition-transform group-hover:-rotate-1 group-hover:scale-[1.02]"
                />
              </Link>
            </div>

            <div className="flex min-w-0 flex-col gap-6 p-5 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex rounded-md border px-2 py-1 font-pixel text-[9px] uppercase ${TIER_STYLE[result.tier]}`}
                >
                  {titleCase(result.tier)} tier
                </span>
                {result.selectionVerified && (
                  <span className="inline-flex rounded-md border border-up/30 bg-up/12 px-2 py-1 font-pixel text-[9px] uppercase text-up">
                    Selection verified
                  </span>
                )}
              </div>

              <div>
                <Link
                  href={`/card/${encodeURIComponent(result.card.mint)}`}
                  className="font-extrabold text-azure-deep hover:text-poke-deep"
                >
                  <h2 id="luck-result-title" className="h-display text-[clamp(1.6rem,4vw,2.8rem)]">
                    {result.card.name}
                  </h2>
                </Link>
                <p className="mt-2 break-all font-mono text-xs text-ink-mute">{result.memo}</p>
              </div>

              <div className="rounded-2xl border-2 border-ink bg-pika/25 p-5 shadow-[4px_4px_0_var(--color-ink)]">
                <p className="font-pixel text-[10px] uppercase text-ink-mute">Historical percentile</p>
                <p className="mt-2 h-display text-[clamp(2rem,6vw,4rem)] leading-none tabular-nums">
                  Luck score {score}/100
                </p>
                <div className="mt-5">
                  <StatBar label="Luck" value={result.luckScore} max={1} display={`${score}/100`} color="var(--color-poke)" />
                </div>
                <p className="mt-5 text-lg font-extrabold">
                  You beat <span className="text-up tabular-nums">{fmtPct(result.beatRate)}</span> of possible pulls.
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  <span className="font-extrabold tabular-nums text-ink">{fmtPct(result.equalOrBetterRate)}</span> could
                  match or beat it.
                </p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <Metric label="Insured value" value={fmtUsd(result.insuredValue)} detail="Historical committed leaf value" />
                <Metric label="Tier chance" value={fmtPct(result.tierChance)} detail={`${titleCase(result.tier)} tier`} />
                <Metric label="Exact tie chance" value={fmtPct(result.tieRate)} detail="Same insured value" />
                <Metric label="Tier candidates" value={fmtNum(result.tierCandidates)} detail="Frozen candidate pool" />
                <Metric label="Available at pull" value={fmtNum(result.tierAvailable)} detail="Eligible for selection" />
                <Metric label="Unavailable at pull" value={fmtNum(result.tierUnavailable)} detail="Already removed" />
                <Metric
                  label="Odds basis"
                  value={result.oddsBasis === "committed" ? "Committed thresholds" : "Published machine odds"}
                />
                <Metric label="Pool version" value={result.poolVersion} />
                <Metric
                  label="Pulled at"
                  value={result.pulledAt ? <time dateTime={result.pulledAt}>{pulledAt}</time> : pulledAt}
                />
              </dl>

              <p className="text-xs text-ink-mute">
                Insured value describes the historical pack witness. It is not a current market price or a profit
                estimate. {result.oddsBasis === "committed"
                  ? "Tier odds were committed with this pack."
                  : "This older pack exposes published machine odds, not per-pack committed thresholds."}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-sand pt-5 text-sm font-extrabold">
                <Link href={`/card/${encodeURIComponent(result.card.mint)}`} className="text-azure-deep hover:text-poke-deep">
                  Card page →
                </Link>
                {result.wallet && (
                  <Link
                    href={`/wallet/${encodeURIComponent(result.wallet)}`}
                    className="text-azure-deep hover:text-poke-deep"
                    aria-label={`Open wallet ${result.wallet}`}
                  >
                    Wallet {shortAddr(result.wallet)} →
                  </Link>
                )}
                {result.transactionSignature && (
                  <a
                    href={solscanTx(result.transactionSignature)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azure-deep hover:text-poke-deep"
                  >
                    Solscan transaction ↗
                  </a>
                )}
                {verifierUrl && (
                  <a
                    href={verifierUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azure-deep hover:text-poke-deep"
                  >
                    Official verifier ↗
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={share}
                  className="btn btn-red"
                  aria-label={`Share luck result for ${result.card.name}`}
                >
                  {shareState === "shared" ? "Shared" : shareState === "copied" ? "Link copied" : "Share pull"}
                </button>
                <span role="status" aria-live="polite" className="text-xs text-ink-mute">
                  {shareState === "failed" ? "Sharing failed. Copy the URL from the address bar." : ""}
                </span>
              </div>
            </div>
          </div>
        </DialogBox>
      </section>

      <DialogBox arrow={false} className="max-w-none">
        <h3 className="font-display text-xl font-bold">How the score works</h3>
        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Luck score = the chance of a lower insured-value pull + half the chance of an equal-value pull. Tier odds
          are applied first, then cards inside the rolled tier are compared using the pool that was available at the
          time.
        </p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Equal insured values are ties. Each tie counts as half a win in the midrank percentile, rather than being
          reported as a card this pull beat.
        </p>
      </DialogBox>
    </div>
  );
}

export function LuckAnalyzer({ initialInput = "" }: { initialInput?: string }) {
  const router = useRouter();
  const initialTarget = parseTarget(initialInput);
  const [input, setInput] = useState(initialInput);
  const [target, setTarget] = useState(initialTarget);
  const [invalidInput, setInvalidInput] = useState(Boolean(initialInput) && !initialTarget);
  const memo = target?.kind === "memo" ? target.value : "";
  const wallet = target?.kind === "wallet" ? target.value : "";
  const query = useLuck(memo);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = parseTarget(input);
    if (!next) {
      setTarget(null);
      setInvalidInput(true);
      return;
    }

    setInvalidInput(false);
    if (next.kind === "memo" && next.value === memo && query.isError) void query.refetch();
    setTarget(next);
    router.push(`/luck?${next.kind}=${encodeURIComponent(next.value)}`, { scroll: false });
  }

  const result = query.currentData?.result;
  const errorCopy = query.isError ? requestErrorCopy(query.error) : null;

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={submit} className="paper p-5 sm:p-7" noValidate>
        <SectionHead
          kicker="Pack witness"
          title="Analyze your pulls"
          sub="Paste a Solana wallet to score every pack pull it opened, or one cc-… pack memo or official Collector Crypt verify-selection URL."
        />
        <label htmlFor="luck-memo" className="mt-6 block font-pixel text-[9px] uppercase text-ink-mute">
          Wallet address, pack memo or verifier URL
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="luck-memo"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              if (invalidInput) setInvalidInput(false);
            }}
            placeholder="Paste your wallet or a cc-… pack memo"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby="luck-memo-help"
            aria-invalid={invalidInput}
            className="min-w-0 flex-1 rounded-xl border-2 border-ink/80 bg-cream-hi px-4 py-3 font-mono text-sm text-ink outline-none transition-shadow placeholder:text-ink-mute/70 focus:border-ink focus:shadow-[0_0_0_4px_rgb(255_203_5_/_0.55)]"
          />
          <button type="submit" className="btn btn-red shrink-0" disabled={!input.trim()}>
            Analyze luck
          </button>
        </div>
        <p id="luck-memo-help" className="mt-3 text-xs text-ink-mute">
          Only the normalized wallet address or pack memo is sent. The result URL can be bookmarked or shared.
          {" "}
          <Link
            href="/luck?memo=cc-77161af0-8001-425b-9213-e5e1d24083d6"
            className="font-bold text-azure-deep hover:text-poke-deep"
          >
            Try Collector Crypt&apos;s documented example →
          </Link>
        </p>
      </form>

      {invalidInput && (
        <div role="alert">
          <DexMessage title="Enter a wallet address or a Collector Crypt pack memo.">
            Paste a Solana wallet address, a cc- memo with its complete ID, or the official verify-selection URL that
            contains it.
          </DexMessage>
        </div>
      )}

      {memo && query.isFetching && <PokeLoader label="Checking the historical pull" />}

      {memo && errorCopy && !query.isFetching && (
        <div role="alert">
          <DexMessage
            title={errorCopy.title}
            action={
              <button type="button" onClick={() => query.refetch()} className="btn btn-red">
                Try again
              </button>
            }
          >
            {errorCopy.body}
          </DexMessage>
        </div>
      )}

      {result && !query.isFetching && !query.isError && <LuckResult result={result} />}

      {wallet && <WalletLuck key={wallet} wallet={wallet} />}
    </div>
  );
}
