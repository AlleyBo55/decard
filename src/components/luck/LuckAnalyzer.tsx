"use client";

import Link from "@/components/LocaleLink";
import { useRouter } from "next/navigation";
import { useLocale, useT } from "@/components/LocaleProvider";
import { localizeHref } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import { useState, type FormEvent } from "react";
import { useLuck } from "@/hooks/pages/Luck/useLuck";
import { cardImage, solscanTx } from "@/lib/constants";
import { fmtNum, fmtPct, fmtUsd, shortAddr } from "@/lib/format";
import { parsePackMemo, parseWalletAddress } from "@/lib/luck";
import type { PullLuck } from "@/lib/types";
import { DexMessage, DialogBox, PokeLoader, SectionHead, StatBar } from "@/components/ui";
import { rich } from "@/components/gacha/rich";
import { scoreOutOf100, shareOrCopy, TIER_STYLE, type ShareState } from "./shared";
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
function stablePulledAt(value: string | null, notReported: string) {
  if (!value) return notReported;
  const timestamp = Date.parse(value);
  if (Number.isNaN(timestamp)) return notReported;
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

function requestErrorCopy(error: unknown, copy: ClientStrings["luck"]["errors"]): ErrorCopy {
  const value = error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  const message = typeof value.message === "string" ? value.message : "";
  const code = typeof value.code === "string" ? value.code : "";
  const status = typeof value.status === "number" ? value.status : null;
  const fingerprint = `${code} ${message}`.toLowerCase();

  if (/legacy|provable[ _-]?pool|no[ _-]?snapshot/.test(fingerprint)) return copy.legacy;
  if (/not[ _-]?ready|pending|ready for verification|not available yet/.test(fingerprint)) return copy.pending;
  if (/unverified|did not verify|could not verify|verification[ _-]?failed|vrf|selection[ _-]?invalid|commit[ _-]?invalid/.test(fingerprint)) {
    return copy.unverified;
  }
  if (/incomplete[ _-]?pull|historical data.*incomplete/.test(fingerprint)) return copy.incomplete;
  if (
    status === 400 ||
    status === 404 ||
    /bad[ _-]?memo|invalid[ _-]?memo|unknown[ _-]?memo|not found|unsupported[ _-]?chain|only collector crypt solana/.test(
      fingerprint,
    )
  ) {
    return copy.badMemo;
  }
  return copy.unavailable;
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
  const t = useT();
  const copy = t.luck.result;
  const m = copy.metrics;
  const [shareState, setShareState] = useState<ShareState>("idle");
  const score = scoreOutOf100(result.luckScore);
  const tierLine = fmt(t.luck.tier, { tier: t.ui.gachaTiers[result.tier] });
  const verifierUrl = safeHttpsUrl(result.officialVerifierUrl);
  const pulledAt = stablePulledAt(result.pulledAt, m.notReported);

  async function share() {
    const next = await shareOrCopy({
      title: fmt(copy.shareTitle, { score }),
      text: fmt(copy.shareText, { name: result.card.name, pct: fmtPct(result.beatRate) }),
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
                  alt={fmt(t.luck.cardFront, { name: result.card.name })}
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
                  {tierLine}
                </span>
                {result.selectionVerified && (
                  <span className="inline-flex rounded-md border border-up/30 bg-up/12 px-2 py-1 font-pixel text-[9px] uppercase text-up">
                    {copy.verified}
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
                <p className="font-pixel text-[10px] uppercase text-ink-mute">{copy.percentile}</p>
                <p className="mt-2 h-display text-[clamp(2rem,6vw,4rem)] leading-none tabular-nums">
                  {fmt(t.luck.score, { score })}
                </p>
                <div className="mt-5">
                  <StatBar label={t.luck.bar} value={result.luckScore} max={1} display={`${score}/100`} color="var(--color-poke)" />
                </div>
                <p className="mt-5 text-lg font-extrabold">
                  {rich(copy.beat, { pct: <span className="text-up tabular-nums">{fmtPct(result.beatRate)}</span> })}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {rich(copy.matchOrBeat, {
                    pct: <span className="font-extrabold tabular-nums text-ink">{fmtPct(result.equalOrBetterRate)}</span>,
                  })}
                </p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <Metric label={m.insured} value={fmtUsd(result.insuredValue)} detail={m.insuredDetail} />
                <Metric label={m.tierChance} value={fmtPct(result.tierChance)} detail={tierLine} />
                <Metric label={m.tie} value={fmtPct(result.tieRate)} detail={m.tieDetail} />
                <Metric label={m.candidates} value={fmtNum(result.tierCandidates)} detail={m.candidatesDetail} />
                <Metric label={m.available} value={fmtNum(result.tierAvailable)} detail={m.availableDetail} />
                <Metric label={m.unavailable} value={fmtNum(result.tierUnavailable)} detail={m.unavailableDetail} />
                <Metric label={m.basis} value={result.oddsBasis === "committed" ? m.committed : m.published} />
                <Metric label={m.poolVersion} value={result.poolVersion} />
                <Metric
                  label={m.pulledAt}
                  value={result.pulledAt ? <time dateTime={result.pulledAt}>{pulledAt}</time> : pulledAt}
                />
              </dl>

              <p className="text-xs text-ink-mute">
                {copy.note} {result.oddsBasis === "committed" ? copy.noteCommitted : copy.notePublished}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-sand pt-5 text-sm font-extrabold">
                <Link href={`/card/${encodeURIComponent(result.card.mint)}`} className="text-azure-deep hover:text-poke-deep">
                  {copy.cardPage}
                </Link>
                {result.wallet && (
                  <Link
                    href={`/wallet/${encodeURIComponent(result.wallet)}`}
                    className="text-azure-deep hover:text-poke-deep"
                    aria-label={fmt(copy.walletLabel, { wallet: result.wallet })}
                  >
                    {fmt(copy.wallet, { wallet: shortAddr(result.wallet) })}
                  </Link>
                )}
                {result.transactionSignature && (
                  <a
                    href={solscanTx(result.transactionSignature)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azure-deep hover:text-poke-deep"
                  >
                    {copy.solscan}
                  </a>
                )}
                {verifierUrl && (
                  <a
                    href={verifierUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azure-deep hover:text-poke-deep"
                  >
                    {copy.verifier}
                  </a>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={share}
                  className="btn btn-red"
                  aria-label={fmt(copy.shareLabel, { name: result.card.name })}
                >
                  {shareState === "shared" ? t.luck.share.shared : shareState === "copied" ? t.luck.share.copied : copy.share}
                </button>
                <span role="status" aria-live="polite" className="text-xs text-ink-mute">
                  {shareState === "failed" ? t.luck.share.failed : ""}
                </span>
              </div>
            </div>
          </div>
        </DialogBox>
      </section>

      <DialogBox arrow={false} className="max-w-none">
        <h3 className="font-display text-xl font-bold">{copy.howTitle}</h3>
        {copy.how.map((line, i) => (
          <p key={i} className={`${i ? "mt-2" : "mt-3"} text-sm leading-6 text-ink-soft`}>
            {line}
          </p>
        ))}
      </DialogBox>
    </div>
  );
}

export function LuckAnalyzer({ initialInput = "" }: { initialInput?: string }) {
  const router = useRouter();
  const { locale } = useLocale();
  const t = useT();
  const copy = t.luck.analyzer;
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
    router.push(localizeHref(locale, `/luck?${next.kind}=${encodeURIComponent(next.value)}`), { scroll: false });
  }

  const result = query.currentData?.result;
  const errorCopy = query.isError ? requestErrorCopy(query.error, t.luck.errors) : null;

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={submit} className="paper p-5 sm:p-7" noValidate>
        <SectionHead kicker={copy.kicker} title={copy.title} sub={copy.sub} />
        <label htmlFor="luck-memo" className="mt-6 block font-pixel text-[9px] uppercase text-ink-mute">
          {copy.label}
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="luck-memo"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              if (invalidInput) setInvalidInput(false);
            }}
            placeholder={copy.placeholder}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-describedby="luck-memo-help"
            aria-invalid={invalidInput}
            className="min-w-0 flex-1 rounded-xl border-2 border-ink/80 bg-cream-hi px-4 py-3 font-mono text-sm text-ink outline-none transition-shadow placeholder:text-ink-mute/70 focus:border-ink focus:shadow-[0_0_0_4px_rgb(255_203_5_/_0.55)]"
          />
          <button type="submit" className="btn btn-red shrink-0" disabled={!input.trim()}>
            {copy.submit}
          </button>
        </div>
        <p id="luck-memo-help" className="mt-3 text-xs text-ink-mute">
          {copy.help}{" "}
          <Link
            href="/luck?memo=cc-77161af0-8001-425b-9213-e5e1d24083d6"
            className="font-bold text-azure-deep hover:text-poke-deep"
          >
            {copy.example}
          </Link>
        </p>
      </form>

      {invalidInput && (
        <div role="alert">
          <DexMessage title={copy.invalidTitle}>{copy.invalidBody}</DexMessage>
        </div>
      )}

      {memo && query.isFetching && <PokeLoader label={copy.loading} />}

      {memo && errorCopy && !query.isFetching && (
        <div role="alert">
          <DexMessage
            title={errorCopy.title}
            action={
              <button type="button" onClick={() => query.refetch()} className="btn btn-red">
                {t.luck.retry}
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
