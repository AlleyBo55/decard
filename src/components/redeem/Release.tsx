"use client";
import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import type { ReleasePhase } from "@/hooks/pages/Redeem/useRelease";
import type { Locale } from "@/lib/i18n";
import { fmt, plural } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import type { Country } from "@/lib/redeem/countries";
import { cents } from "@/lib/redeem/rates";
import type { Address } from "@/lib/redeem/types";
import { clsx } from "@/lib/clsx";
import type { CardRow } from "@/lib/types";
import { Badge } from "./art";
import { CardThumb } from "./Party";
import { causeText, slots, useCountryName } from "./text";
import { PassTimer } from "./TravelPass";

// Stop 6: the burn and the payment. Nothing moves until the trainer ticks the box and holds the
// seal, the wallet then shows every transaction in one prompt, and useRelease decides what is
// safe to repeat. One release at a time: the seal locks the moment it fires.

const HOLD_MS = 1300;

/**
 * Press and hold to confirm. Mouse and touch must hold; holding Space or Enter works the same.
 * Assistive tech that activates with a plain click (no pointer, no key) confirms directly: the
 * checkbox before it is the deliberate step.
 */
export function HoldButton({ disabled, onConfirm, children, describedBy }: { disabled: boolean; onConfirm: () => void; children: React.ReactNode; describedBy?: string }) {
  const s = useT().redeem.release;
  const [holding, setHolding] = useState(false);
  const [early, setEarly] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const fired = useRef(false);
  const viaKey = useRef(false);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (!disabled) fired.current = false;
  }, [disabled]);

  const start = () => {
    if (disabled || fired.current || timer.current !== undefined) return;
    setEarly(false);
    setHolding(true);
    timer.current = window.setTimeout(() => {
      timer.current = undefined;
      fired.current = true;
      setHolding(false);
      onConfirm();
    }, HOLD_MS);
  };
  const stop = () => {
    if (timer.current === undefined) return;
    window.clearTimeout(timer.current);
    timer.current = undefined;
    setHolding(false);
    if (!fired.current) setEarly(true);
  };
  const isKey = (k: string) => k === " " || k === "Enter";
  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        type="button"
        className="rd-hold"
        disabled={disabled}
        data-holding={holding || undefined}
        aria-describedby={describedBy}
        style={{ "--hold-ms": `${HOLD_MS}ms` } as React.CSSProperties}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch {
            // No capture (an unknown pointer): the hold still works while the pointer stays on it.
          }
          start();
        }}
        onPointerUp={stop}
        onPointerCancel={stop}
        onLostPointerCapture={stop}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (!isKey(e.key)) return;
          e.preventDefault();
          viaKey.current = true;
          if (!e.repeat) start();
        }}
        onKeyUp={(e) => {
          if (!isKey(e.key)) return;
          e.preventDefault();
          stop();
          window.setTimeout(() => {
            viaKey.current = false;
          }, 0);
        }}
        onClick={(e) => {
          if (e.detail !== 0 || viaKey.current || disabled || fired.current) return;
          fired.current = true;
          onConfirm();
        }}
      >
        <span className="rd-hold-fill" aria-hidden />
        <span className="rd-hold-label">{children}</span>
      </button>
      <span className="text-center text-xs font-bold text-[var(--rd-mute)]" aria-live="polite">
        {holding ? s.holding : early ? s.early : s.holdHelp}
      </span>
    </div>
  );
}

/** What the wallet prompt holds, so the trainer knows what they're approving. */
function signingText(t: ClientStrings["redeem"], locale: Locale, txs: number, nfts: number, totalCents: number) {
  const vars = { nfts: plural(locale, nfts, t.nfts), price: cents(totalCents) };
  return txs === 1 ? fmt(t.release.signingOne, vars) : plural(locale, txs, t.release.signingMany, vars);
}

function stageOf(p: ReleasePhase): number {
  switch (p.step) {
    case "idle":
    case "preparing":
    case "repriced":
      return 0;
    case "recovering":
    case "signing":
      return 1;
    case "burning":
      return 2;
    case "done":
      return 3;
    case "stopped":
      return p.next.kind === "sign" ? 1 : p.next.kind === "resume" || p.next.kind === "complete" || p.next.kind === "check" ? 2 : 0;
  }
}

export type NavKind = "review" | "address" | "journey" | "party";

export function Release({
  phase,
  cards,
  country,
  address,
  totalCents,
  finishing,
  pass,
  onRelease,
  onAccept,
  onRetry,
  onResign,
  onNav,
}: {
  phase: ReleasePhase;
  cards: CardRow[];
  country: Country | null;
  address: Address | null;
  totalCents: number | null;
  /** Finishing a saved shipment from the journey, rather than a new release. */
  finishing: string | null;
  pass: { active: boolean; expiresAt: number | null; onRenew: () => void; signing: boolean };
  onRelease: () => void;
  onAccept: () => void;
  onRetry: () => void;
  onResign: () => void;
  onNav: (k: NavKind) => void;
}) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const s = t.redeem.release;
  const [agreed, setAgreed] = useState(false);
  const [agreedPrice, setAgreedPrice] = useState(false);
  const ids = useId();
  const n = cards.length;
  const running = phase.step === "preparing" || phase.step === "signing" || phase.step === "burning" || phase.step === "recovering";
  const stage = stageOf(phase);
  const place = address && country ? fmt(t.redeem.place, { city: address.city, country: name(country) }) : s.yourAddress;
  const stop = phase.step === "stopped" ? s.stops[phase.why] : null;

  return (
    <div className="rd-release">
      {!finishing && (
        <section className="rd-seal-card" aria-labelledby={`${ids}-h`}>
          <h3 id={`${ids}-h`} className="sr-only">
            {s.whatItDoes}
          </h3>
          <ol className="rd-seal-flow">
            <li>
              <span className="rd-seal-cards" aria-hidden>
                {cards.slice(0, 3).map((c) => (
                  <CardThumb key={c.nftAddress} card={c} size={40} />
                ))}
              </span>
              <b className="rd-money text-2xl">{plural(locale, n, t.redeem.nfts)}</b>
              <span>{s.burnForGood}</span>
            </li>
            <li>
              <span className="rd-coin" aria-hidden>
                $
              </span>
              <b className="rd-money text-2xl">{totalCents === null ? "—" : cents(totalCents)}</b>
              <span>{s.usdcShipping}</span>
            </li>
            <li>
              <span className="rd-seal-home" aria-hidden>
                <Badge kind="home" size={40} />
              </span>
              <b className="text-lg font-black leading-tight">{address?.city ?? s.home}</b>
              <span>{country ? name(country) : ""}</span>
            </li>
          </ol>
        </section>
      )}

      {phase.step === "idle" && !finishing && (
        <section className="rd-confirm" aria-labelledby={`${ids}-c`}>
          <h3 id={`${ids}-c`} className="rd-display text-2xl">
            {plural(locale, n, s.title)}
          </h3>
          {!pass.active ? (
            <div className="rd-note">
              <b>{s.renewLead}</b> {s.renewText}{" "}
              <button type="button" className="rd-btn rd-btn-gold mt-2" onClick={pass.onRenew} disabled={pass.signing}>
                {pass.signing ? t.redeem.actions.checkWallet : t.redeem.actions.renewFree}
              </button>
            </div>
          ) : (
            pass.expiresAt && (
              <p className="text-xs font-bold text-[var(--rd-mute)]">{slots(s.passValid, { timer: <PassTimer until={pass.expiresAt} /> })}</p>
            )
          )}
          <label className="rd-check">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <span>
              {slots(fmt(s.agree, { them: plural(locale, n, s.agreeThem) }), {
                burn: <b>{plural(locale, n, s.agreeBurn)}</b>,
                amount: <b>{totalCents === null ? s.agreeQuoted : fmt(s.agreeAmount, { price: cents(totalCents) })}</b>,
                place: <b>{place}</b>,
              })}
            </span>
          </label>
          <HoldButton disabled={!agreed || !pass.active || totalCents === null} onConfirm={onRelease} describedBy={`${ids}-hint`}>
            <Badge kind="release" size={34} dim={!agreed} className="rd-hold-seal" />
            <span>{fmt(s.hold, { n, price: totalCents === null ? "" : cents(totalCents) })}</span>
          </HoldButton>
          <p id={`${ids}-hint`} className="text-xs font-semibold text-[var(--rd-mute)]">
            {s.holdHint}
          </p>
          <button type="button" className="rd-link self-start" onClick={() => onNav("review")}>
            {s.backToReview}
          </button>
        </section>
      )}

      {phase.step !== "idle" && (
        <section className="rd-run" aria-live="polite" aria-busy={running || undefined}>
          <ol className="rd-stages">
            {s.stages.map((label, i) => (
              <li key={i} data-state={i < stage ? "done" : i === stage ? (phase.step === "stopped" ? phase.tone : "now") : undefined}>
                <span className="rd-stage-dot" aria-hidden>
                  {i < stage ? "✓" : i + 1}
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ol>

          {running && (
            <div className="rd-run-now">
              <span className="rd-spinner" aria-hidden />
              <div>
                <p className="text-lg font-black">
                  {phase.step === "preparing" ? s.preparing : phase.step === "signing" ? s.signing : phase.step === "burning" ? s.burning : s.notes[phase.note]}
                </p>
                <p className="text-sm font-semibold text-[var(--rd-mute)]">
                  {phase.step === "signing"
                    ? `${phase.note ? `${s.notes[phase.note]} ` : ""}${signingText(t.redeem, locale, phase.prepared.transactions.length + phase.prepared.delistTransactions.length, phase.prepared.cardCount || n, phase.prepared.totalCents)}`
                    : phase.step === "burning"
                      ? s.burningText
                      : s.waitText}
                </p>
              </div>
            </div>
          )}

          {phase.step === "repriced" && (
            <div className="rd-halt" data-tone="warn" role="alert">
              <p className="rd-display text-2xl">{finishing ? s.repricedFinishTitle : s.repricedTitle}</p>
              <p className="text-sm font-semibold">
                {finishing
                  ? slots(
                      fmt(s.repricedFinish, {
                        cards: phase.prepared.cardCount ? plural(locale, phase.prepared.cardCount, s.remaining) : s.remainingAll,
                      }),
                      {
                        id: <span className="font-mono">{phase.prepared.shipmentId}</span>,
                        price: <b className="rd-money text-base">{cents(phase.prepared.totalCents)}</b>,
                      },
                    )
                  : slots(s.repriced, {
                      price: <b className="rd-money text-base">{cents(phase.prepared.totalCents)}</b>,
                      confirmed: <b className="rd-money text-base">{cents(phase.confirmedCents)}</b>,
                    })}
              </p>
              <label className="rd-check">
                <input type="checkbox" checked={agreedPrice} onChange={(e) => setAgreedPrice(e.target.checked)} />
                <span>
                  {slots(fmt(s.accept, { nfts: phase.prepared.cardCount ? plural(locale, phase.prepared.cardCount, t.redeem.nfts) : s.theNfts }), {
                    price: <b>{cents(phase.prepared.totalCents)}</b>,
                  })}
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                <HoldButton disabled={!agreedPrice} onConfirm={onAccept}>
                  <Badge kind="release" size={30} dim={!agreedPrice} className="rd-hold-seal" />
                  <span>{fmt(s.holdAccept, { price: cents(phase.prepared.totalCents) })}</span>
                </HoldButton>
                <button type="button" className="rd-btn rd-btn-ghost" onClick={() => onNav(finishing ? "journey" : "review")}>
                  {finishing ? s.notNow : t.redeem.actions.backToReview}
                </button>
              </div>
            </div>
          )}

          {phase.step === "stopped" && stop && (
            <div className="rd-halt" data-tone={phase.tone} role={phase.tone === "calm" ? "status" : "alert"}>
              <p className="rd-display text-2xl">{stop.title}</p>
              <p className="text-sm font-semibold">{fmt(stop.message, { detail: causeText(t.redeem.errors, phase.cause) ?? t.redeem.errors.generic })}</p>
              {phase.problems && Object.keys(phase.problems).length > 0 && (
                <p className="text-sm font-bold text-[#ffb3a6]">{plural(locale, Object.keys(phase.problems).length, s.flagged)}</p>
              )}
              <div className="flex flex-wrap gap-3">
                {phase.signIn ? (
                  <button type="button" className="rd-btn rd-btn-gold" onClick={onResign}>
                    {t.redeem.actions.signInAgain}
                  </button>
                ) : phase.next.kind === "review" ? (
                  <button type="button" className="rd-btn rd-btn-gold" onClick={() => onNav("review")}>
                    {s.next.review}
                  </button>
                ) : phase.next.kind === "address" ? (
                  <button type="button" className="rd-btn rd-btn-gold" onClick={() => onNav("address")}>
                    {s.next.address}
                  </button>
                ) : phase.next.kind === "journey" ? (
                  <button type="button" className="rd-btn rd-btn-gold" onClick={() => onNav("journey")}>
                    {s.next.journey}
                  </button>
                ) : phase.next.kind === "none" ? (
                  <button type="button" className="rd-btn rd-btn-gold" onClick={() => onNav("party")}>
                    {s.next.none}
                  </button>
                ) : (
                  <button type="button" className="rd-btn rd-btn-gold" onClick={onRetry}>
                    {s.next[phase.next.kind]}
                  </button>
                )}
                {(phase.next.kind === "prepare" || phase.next.kind === "sign") && !finishing && (
                  <button type="button" className="rd-btn rd-btn-ghost" onClick={() => onNav("review")}>
                    {t.redeem.actions.backToReview}
                  </button>
                )}
                {(phase.next.kind === "resume" || phase.next.kind === "complete" || phase.next.kind === "check") && (
                  <button type="button" className="rd-btn rd-btn-ghost" onClick={() => onNav("journey")}>
                    {s.seeJourneys}
                  </button>
                )}
              </div>
            </div>
          )}

          {(running || phase.step === "repriced") && (
            <p className={clsx("rd-keep", phase.step === "burning" && "is-hot")}>
              <b>{s.keepLead}</b> {finishing || phase.step === "burning" || phase.step === "recovering" ? s.keepSaved : s.keepUnsigned}
            </p>
          )}
        </section>
      )}
    </div>
  );
}
