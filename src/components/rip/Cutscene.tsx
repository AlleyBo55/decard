"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { fmtMultiple } from "@/components/gacha/shared";
import { CountUp } from "@/components/CountUp";
import { useT } from "@/components/LocaleProvider";
import { fmt } from "@/lib/i18n/format";
import { useBuyback } from "@/hooks/pages/Rip/useBuyback";
import type { RipPhase } from "@/hooks/pages/Rip/useRipFlow";
import { useReducedMotion } from "@/lib/hooks";
import { pullPath } from "@/lib/pull";
import { haptic, isMuted, setMuted, sfx } from "@/lib/rip/sfx";
import { xpFor, type Badge } from "@/lib/rip/trainer";
import type { RipCard, RipPack, RipTx, Tier } from "@/lib/rip/types";
import type { Cluster } from "@/lib/rip/wallet";
import { Ball } from "./Ball";
import { Emblem } from "./Emblem";
import { Modal } from "./Modal";
import { rich } from "./rich";
import { TELL, cardValueCents, explorerTx, tierOf, usd } from "./shared";
import { TierMark } from "./TierMark";
import { artOf, dexNumber, shortName, universeOf, type Universe } from "./universes";
import "./cut.css";

export interface TrainerNews {
  levelUp: number | null;
  title: string;
  badges: Badge[];
}

/** The full-screen rip, from reserving the pack to the revealed card. */
export function Cutscene({
  phase,
  open,
  seq,
  cluster,
  preview,
  lite,
  signAll,
  news,
  onClose,
  onRip,
  onTurbo,
  onResume,
  onSold,
}: {
  phase: RipPhase;
  open: boolean;
  /** Changes on every new rip, replaying the intro. */
  seq: number;
  cluster: Cluster | null;
  /** Simulated rips (dev preview): no sale, no links. */
  preview: boolean;
  /** A low-end device: fewer particles. */
  lite: boolean;
  signAll: (base64Txs: string[]) => Promise<string[]>;
  news: TrainerNews | null;
  onClose: () => void;
  onRip: () => void;
  onTurbo: () => void;
  onResume: (txId: string) => void;
  onSold: () => void;
}) {
  const copy = useT().rip.cutscene;
  const world = useRef<HTMLDivElement>(null);
  const [muted, setMutedState] = useState(isMuted);
  const u = universeOf(phase.step === "idle" ? "pokemon" : phase.pack.type);
  // While money is moving the scene stays put; once paid, closing is safe.
  const dismissible = phase.step !== "buying" && phase.step !== "signing" && phase.step !== "paying";
  const shake = useCallback(() => {
    world.current?.animate(
      [{ transform: "none" }, { transform: "translate(-7px,3px)" }, { transform: "translate(6px,-4px)" }, { transform: "translate(-3px,2px)" }, { transform: "none" }],
      { duration: 480, easing: "ease-out" },
    );
  }, []);

  return (
    <Modal
      open={open && phase.step !== "idle"}
      onClose={onClose}
      labelledBy="rc-title"
      dismissible={dismissible}
      bare
      className="rc"
      style={{ ["--u-ink" as string]: u.ink, ["--u-glow" as string]: u.glow }}
    >
      {phase.step !== "idle" && (
        <div ref={world} className="rc-world" data-lite={lite || undefined}>
          <div className="rp-arena" data-u={u.id} aria-hidden />
          <Intro key={seq} kind={u.intro} />
          <div className="rc-hud">
            <Steps step={phase.step} preview={preview} />
            {preview && <span className="rc-preview">Preview</span>}
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="rc-icon"
                aria-label={muted ? copy.soundOn : copy.mute}
                aria-pressed={!muted}
                onClick={() => {
                  setMuted(!muted);
                  setMutedState(!muted);
                  if (muted) sfx.tick();
                }}
              >
                <SoundIcon off={muted} />
              </button>
              {dismissible && (
                <button type="button" className="rc-icon text-lg" aria-label={copy.close} onClick={onClose}>
                  ✕
                </button>
              )}
            </div>
          </div>
          {phase.step === "revealed" && phase.tx.card ? (
            <Reveal
              key={phase.tx.id}
              tx={phase.tx}
              card={phase.tx.card}
              pack={phase.pack}
              fresh={phase.fresh}
              u={u}
              cluster={cluster}
              preview={preview}
              lite={lite}
              signAll={signAll}
              news={news}
              onClose={onClose}
              onRip={onRip}
              onSold={onSold}
              onShake={shake}
            />
          ) : (
            <PackScene phase={phase} u={u} preview={preview} onTurbo={onTurbo} onClose={onClose} onRip={onRip} onResume={onResume} />
          )}
        </div>
      )}
    </Modal>
  );
}

// ------------------------------------------------------------- before reveal

function PackScene({
  phase,
  u,
  preview,
  onTurbo,
  onClose,
  onRip,
  onResume,
}: {
  phase: Exclude<RipPhase, { step: "idle" }>;
  u: Universe;
  preview: boolean;
  onTurbo: () => void;
  onClose: () => void;
  onRip: () => void;
  onResume: (txId: string) => void;
}) {
  const art = artOf(phase.pack.type);
  const dealing = phase.step === "opening";
  useEffect(() => {
    if (!dealing) return;
    const tick = () => {
      sfx.shake();
      haptic(25);
    };
    tick();
    const id = setInterval(tick, 1600);
    return () => clearInterval(id);
  }, [dealing]);

  const t = useT().rip;
  const copy = t.cutscene;
  const price = usd(phase.pack.priceCents);
  let title = "", sub = "";
  switch (phase.step) {
    case "buying":
      title = copy.buying;
      sub = preview ? "Preview rip: no wallet, no money." : fmt(copy.buyingSub, { pack: phase.pack.name });
      break;
    case "turbo":
      title = copy.turbo;
      sub = copy.turboSub;
      break;
    case "signing":
      title = fmt(copy.signing, { price });
      sub = copy.signingSub;
      break;
    case "paying":
      title = copy.paying;
      sub = copy.payingSub;
      break;
    case "opening":
      title = t.universes[u.id].dealing;
      sub = preview ? "Dealing a card from this pack's real pool." : copy.openingSub;
      break;
    case "stopped":
      title = phase.paid ? copy.stoppedPaid : copy.stopped;
      sub = phase.message;
      break;
  }
  return (
    <>
      <div className="rc-stage">
        <div className="rc-pack" data-state={phase.step === "stopped" ? "still" : dealing ? "shake" : "float"} style={{ ["--tell" as string]: u.glow }}>
          <div className="rc-pack-motion">
            <div className="rc-aura" />
            <div className="rc-pack-body">{art ? <img src={art.src} alt="" width={art.w} height={art.h} /> : <Ball size={120} />}</div>
          </div>
        </div>
      </div>
      <div className="rc-dialog">
        <div className="rc-panel" data-u={u.id}>
          <p id="rc-title" className="rw-say" role="status" aria-live="polite">
            <Typewriter key={title} text={title} />
          </p>
          <p className="mt-2 text-sm font-semibold opacity-80">{sub}</p>
          {(phase.step === "turbo" || phase.step === "stopped" || phase.step === "opening") && (
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              {phase.step === "turbo" && (
                <button type="button" className="rc-btn rc-btn-rip" onClick={onTurbo}>
                  {copy.ripTurbo}
                </button>
              )}
              {phase.step === "stopped" && phase.paid && phase.txId && (
                <button type="button" className="rc-btn rc-btn-rip" onClick={() => onResume(phase.txId!)}>
                  {copy.retryOpen}
                </button>
              )}
              {phase.step === "stopped" && !phase.paid && (
                <button type="button" className="rc-btn rc-btn-rip" onClick={onRip}>
                  {copy.retry}
                </button>
              )}
              <button type="button" className="rc-btn rc-btn-ghost" onClick={onClose}>
                {phase.step === "turbo" ? copy.notNow : copy.close}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Steps({ step, preview }: { step: RipPhase["step"]; preview: boolean }) {
  const copy = useT().rip.cutscene;
  const steps = preview ? (["reserve", "pay", "open"] as const) : (["reserve", "approve", "pay", "open"] as const);
  const order: Record<string, number> = preview ? { buying: 0, paying: 1, opening: 2 } : { buying: 0, turbo: 0, signing: 1, paying: 2, opening: 3 };
  const at = order[step];
  if (at === undefined) return null;
  return (
    <ol className="rc-steps" aria-label={copy.progress}>
      {steps.map((s, i) => (
        <li key={s} className="rc-step" data-state={i < at ? "done" : i === at ? "now" : "next"}>
          <span className="rc-step-dot" />
          <span className="hidden sm:inline">{copy.steps[s]}</span>
        </li>
      ))}
    </ol>
  );
}

// ------------------------------------------------------------------- reveal

type Beat = "ready" | "torn" | "card" | "flipped";

function Reveal({
  tx,
  card,
  pack,
  fresh,
  u,
  cluster,
  preview,
  lite,
  signAll,
  news,
  onClose,
  onRip,
  onSold,
  onShake,
}: {
  tx: RipTx;
  card: RipCard;
  pack: RipPack;
  fresh: boolean;
  u: Universe;
  cluster: Cluster | null;
  preview: boolean;
  lite: boolean;
  signAll: (base64Txs: string[]) => Promise<string[]>;
  news: TrainerNews | null;
  onClose: () => void;
  onRip: () => void;
  onSold: () => void;
  onShake: () => void;
}) {
  const copy = useT().rip.cutscene;
  const tier = tierOf(card.rarity);
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState<Beat>(fresh && !reduced ? "ready" : "flipped");
  const art = artOf(pack.type);
  const packRef = useRef<HTMLDivElement>(null);
  const c = useRef({ v: 0, mode: "idle" as "idle" | "hold" | "auto" | "decay", last: 0, raf: 0, downAt: 0, beep: 0 });

  // Fetch the card image while the pack is still closed.
  useEffect(() => {
    const img = new Image();
    img.src = card.image.full || card.image.thumb;
  }, [card]);

  const tear = useCallback(() => {
    setBeat("torn");
    sfx.tear();
    haptic([15, 25, 50]);
  }, []);

  const loop = useCallback(
    function frame(now: number) {
      const s = c.current;
      const dt = s.last ? now - s.last : 16;
      s.last = now;
      if (s.mode === "hold") s.v += dt / 1100;
      else if (s.mode === "auto") s.v += dt / 420;
      else if (s.mode === "decay") s.v -= dt / 500;
      s.v = Math.max(0, Math.min(1, s.v));
      packRef.current?.style.setProperty("--charge", s.v.toFixed(3));
      if ((s.mode === "hold" || s.mode === "auto") && now - s.beep > 85) {
        s.beep = now;
        sfx.charge(s.v);
        haptic(6);
      }
      if (s.v >= 1) {
        s.mode = "idle";
        tear();
        return;
      }
      if (s.mode === "decay" && s.v <= 0) s.mode = "idle";
      if (s.mode !== "idle") s.raf = requestAnimationFrame(frame);
    },
    [tear],
  );
  const begin = useCallback(
    (mode: "hold" | "auto") => {
      const s = c.current;
      const idle = s.mode === "idle";
      s.mode = mode;
      s.last = 0;
      if (idle) s.raf = requestAnimationFrame(loop);
    },
    [loop],
  );
  useEffect(() => () => cancelAnimationFrame(c.current.raf), []);

  // Nobody waits forever: the pack opens itself after a while.
  useEffect(() => {
    if (beat !== "ready") return;
    const t = setTimeout(() => begin("auto"), 9000);
    return () => clearTimeout(t);
  }, [beat, begin]);

  useEffect(() => {
    if (beat === "torn") {
      const t = setTimeout(() => setBeat("card"), 560);
      return () => clearTimeout(t);
    }
    if (beat === "card") {
      const t = setTimeout(() => setBeat("flipped"), 950);
      return () => clearTimeout(t);
    }
  }, [beat]);

  useEffect(() => {
    if (beat !== "flipped" || !fresh) return;
    sfx.reveal(tier);
    haptic(tier === "legendary" ? [60, 40, 60, 40, 140] : tier === "epic" ? [50, 30, 90] : tier === "rare" ? [40, 30, 40] : 35);
    if (tier === "epic" || tier === "legendary") onShake();
  }, [beat, fresh, tier, onShake]);

  const skip = () => {
    if (beat === "ready") begin("auto");
    else if (beat !== "flipped") setBeat("flipped");
  };

  return (
    <>
      <div className="rc-stage" onClick={beat === "torn" || beat === "card" ? skip : undefined}>
        {(beat === "ready" || beat === "torn") && (
          <div
            ref={packRef}
            className="rc-pack"
            data-state={beat}
            data-split="true"
            role="button"
            tabIndex={0}
            aria-label={copy.holdLabel}
            style={{ ["--tell" as string]: TELL[tier] }}
            onPointerDown={(e) => {
              if (beat !== "ready") return;
              e.currentTarget.setPointerCapture(e.pointerId);
              c.current.downAt = performance.now();
              begin("hold");
            }}
            onPointerUp={() => {
              const s = c.current;
              if (s.mode !== "hold") return;
              if (performance.now() - s.downAt < 220) begin("auto");
              else s.mode = "decay";
            }}
            onPointerCancel={() => {
              if (c.current.mode === "hold") c.current.mode = "decay";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                begin("auto");
              }
            }}
          >
            <div className="rc-pack-motion">
              <div className="rc-aura" data-tier={tier} />
              {art ? (
                <>
                  <div className="rc-pack-body">
                    <img src={art.src} alt="" width={art.w} height={art.h} />
                  </div>
                  <div className="rc-pack-cap">
                    <img src={art.src} alt="" width={art.w} height={art.h} />
                  </div>
                </>
              ) : (
                <div className="rc-pack-body grid aspect-[5/8] place-items-center">
                  <Ball size={120} />
                </div>
              )}
              <div className="rc-seam" />
              {beat === "torn" && <div className="rc-burst" />}
            </div>
            {beat === "ready" && (
              <span className="rc-hold">
                <svg viewBox="0 0 24 24" aria-hidden>
                  <circle cx="12" cy="12" r="10" fill="none" stroke="rgb(255 255 255 / .2)" strokeWidth="3" />
                  <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </svg>
                {copy.hold}
              </span>
            )}
          </div>
        )}

        {(beat === "card" || beat === "flipped") && (
          <div className="rc-result">
            <div className="rc-showcase" style={{ ["--tell" as string]: TELL[tier] }}>
              {beat === "flipped" && tier !== "common" && !lite && <div className="rc-rays" data-tier={tier} />}
              <Frame u={u} card={card} show={beat === "flipped"}>
                <TiltCard card={card} face={beat === "card" ? "back" : "front"} rise={beat === "card"} />
              </Frame>
            </div>
            {beat === "flipped" && (
              <ResultPanel
                tx={tx}
                card={card}
                pack={pack}
                tier={tier}
                fresh={fresh}
                u={u}
                cluster={cluster}
                preview={preview}
                signAll={signAll}
                news={news}
                onClose={onClose}
                onRip={onRip}
                onSold={onSold}
              />
            )}
          </div>
        )}
      </div>
      {beat === "flipped" && fresh && <Confetti tier={tier} u={u} lite={lite} />}
      {beat === "flipped" && fresh && tier === "legendary" && (
        <div className="rc-legend" aria-hidden>
          {copy.legendary}
        </div>
      )}
      {(beat === "torn" || beat === "card") && (
        <button type="button" onClick={skip} className="rc-skip">
          {copy.skip} ▶
        </button>
      )}
    </>
  );
}

function Frame({ u, card, show, children }: { u: Universe; card: RipCard; show: boolean; children: React.ReactNode }) {
  const frames = useT().rip.cutscene.frames;
  const name = shortName(card.name);
  const label =
    u.frame === "dex"
      ? fmt(frames.dex, { n: dexNumber(card.name) ?? "???", name })
      : u.frame === "wanted"
        ? frames.wanted
        : u.frame === "jumbotron"
          ? frames.jumbotron
          : u.frame === "scouter"
            ? frames.scouter
            : null;
  return (
    <div className="rc-frame" data-frame={u.frame} data-show={show}>
      {label && <span className="rc-frame-label">{label}</span>}
      <div className="rc-frame-inner">{children}</div>
      {u.frame === "wanted" && (
        <div className="rc-frame-foot">
          <div className="truncate px-4 text-lg">{name}</div>
          <div className="rw-money text-2xl">{usd(cardValueCents(card))}</div>
        </div>
      )}
    </div>
  );
}

/** The card: rises face down, flips, then tilts under the pointer with a holo glare. */
function TiltCard({ card, face, rise }: { card: RipCard; face: "front" | "back"; rise: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return (
    <div className="rc-card" data-face={face} data-enter={rise ? "rise" : undefined}>
      <div className="rc-halo" />
      <div
        ref={ref}
        className="rc-tilt"
        onPointerMove={(e) => {
          if (e.pointerType === "touch") return;
          const el = ref.current;
          if (!el) return;
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          cancelAnimationFrame(raf.current);
          raf.current = requestAnimationFrame(() => {
            el.dataset.live = "true";
            el.style.setProperty("--ry", `${(x - 0.5) * 22}deg`);
            el.style.setProperty("--rx", `${(0.5 - y) * 18}deg`);
            el.style.setProperty("--mx", `${x * 100}%`);
            el.style.setProperty("--my", `${y * 100}%`);
          });
        }}
        onPointerLeave={() => {
          const el = ref.current;
          if (!el) return;
          cancelAnimationFrame(raf.current);
          el.dataset.live = "false";
          el.style.setProperty("--ry", "0deg");
          el.style.setProperty("--rx", "0deg");
        }}
      >
        <div className="rc-card-flip">
          <div className="rc-card-side rc-card-front">
            <img src={card.image.full || card.image.thumb} alt={card.name} decoding="async" referrerPolicy="no-referrer" />
          </div>
          <div className="rc-card-side rc-card-back" />
        </div>
        <span className="rc-glare" />
      </div>
    </div>
  );
}

function ResultPanel({
  tx,
  card,
  pack,
  tier,
  fresh,
  u,
  cluster,
  preview,
  signAll,
  news,
  onClose,
  onRip,
  onSold,
}: {
  tx: RipTx;
  card: RipCard;
  pack: RipPack;
  tier: Tier;
  fresh: boolean;
  u: Universe;
  cluster: Cluster | null;
  preview: boolean;
  signAll: (base64Txs: string[]) => Promise<string[]>;
  news: TrainerNews | null;
  onClose: () => void;
  onRip: () => void;
  onSold: () => void;
}) {
  const { ui, rip: t } = useT();
  const copy = t.result;
  const value = cardValueCents(card) ?? 0;
  const mult = pack.priceCents > 0 && value > 0 ? value / pack.priceCents : null;
  const cry = fmt(t.universes[u.id].cry, { name: shortName(card.name) });
  const sold = useCallback(() => {
    sfx.coin();
    haptic([20, 40, 20]);
    onSold();
  }, [onSold]);
  const { phase: sale, sell } = useBuyback(card.autoSold || preview ? null : tx.id, signAll, sold);
  return (
    <div className="rc-panel" data-u={u.id} style={fresh ? { animationDelay: "0.3s" } : undefined}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rp-tier" data-tier={tier}>
          <TierMark u={u.id} tier={tier} size={14} />
          {ui.ripTiers[tier].label}
        </span>
        <span className="rc-chip">
          <Emblem id={u.id} className="h-3.5 w-3.5" /> {t.universeNames[u.id] ?? u.name}
        </span>
        {fresh && <span className="rc-chip rc-chip-xp">{fmt(copy.xp, { xp: xpFor(tier, value, pack.priceCents) })}</span>}
      </div>
      <p id="rc-title" className="rw-say mt-3">
        <Typewriter key={cry} text={cry} />
      </p>
      <h2 className="mt-1.5 text-lg font-extrabold leading-snug">{card.name}</h2>
      {(card.grade || card.gradingCompany) && (
        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm font-bold opacity-80">
          {card.grade && <span className="rc-grade">{card.grade}</span>}
          {card.gradingCompany && <span>{card.gradingCompany}</span>}
        </p>
      )}
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="rw-label !text-current opacity-70">{t.universes[u.id].valueLabel}</div>
          <div className="rc-value">{fresh ? <CountUp value={value / 100} kind="usd" /> : usd(value)}</div>
        </div>
        {mult != null && (
          <span className="rc-mult" data-level={mult >= 3 ? "gold" : mult >= 1 ? "green" : "muted"}>
            {/* Under 1×, two decimals: 0.97× must not round up to 1×. */}
            {fmt(copy.mult, { mult: mult < 1 ? `${mult.toFixed(2)}×` : fmtMultiple(mult) })}
          </span>
        )}
      </div>

      {preview ? (
        <p className="rc-note mt-4">Preview pull. On a real rip you can sell it back right here in one tap.</p>
      ) : card.autoSold ? (
        <p className="rc-toast mt-4">{fmt(copy.turboPaid, { price: usd(card.autoSoldCents) })}</p>
      ) : (
        <div className="mt-4" aria-live="polite">
          {sale.step === "quoting" && <p className="rp-dots text-sm font-bold opacity-70">{copy.quoting}</p>}
          {sale.step === "offer" && (
            <button type="button" className="rc-btn rc-btn-sell w-full" onClick={() => void sell()}>
              <span aria-hidden>⚡</span> {rich(copy.sell, { price: <span className="rw-money text-lg">{usd(sale.offerCents)}</span> })}
            </button>
          )}
          {sale.step === "signing" && <p className="font-bold">{copy.signing}</p>}
          {sale.step === "settling" && <p className="rp-dots font-bold">{copy.settling}</p>}
          {sale.step === "sold" && (
            <div className="rc-toast">
              <span className="text-xl" aria-hidden>
                🪙
              </span>
              <span>
                {rich(copy.sold, { amount: <span className="rw-money">+{usd(sale.offerCents)}</span> })}{" "}
                {sale.signature && (
                  <a href={explorerTx(sale.signature, cluster)} target="_blank" rel="noopener noreferrer" className="underline">
                    {copy.receipt}
                  </a>
                )}
              </span>
            </div>
          )}
          {sale.step === "unavailable" && <p className="text-sm font-bold opacity-70">{sale.message}</p>}
          {sale.step === "error" && (
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <span>{sale.message}</span>
              {sale.offerCents ? (
                <button type="button" className="underline" onClick={() => void sell()}>
                  {copy.retry}
                </button>
              ) : null}
            </div>
          )}
        </div>
      )}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" className="rc-btn rc-btn-rip col-span-2" onClick={onRip}>
          {u.id === "pokemon" ? <Ball size={18} /> : <Emblem id={u.id} className="h-5 w-5" />}{" "}
          {rich(copy.ripAgain, { price: <span className="rw-money text-lg">{usd(pack.priceCents)}</span> })}
        </button>
        <button type="button" className="rc-btn rc-btn-ghost" onClick={onClose}>
          {sale.step === "sold" ? copy.done : copy.keep}
        </button>
        {!preview && cluster === "mainnet" && card.mint ? (
          <a href={pullPath(card.mint, pack.priceCents / 100)} target="_blank" rel="noopener" className="rc-btn rc-btn-ghost">
            {copy.share}
          </a>
        ) : !preview && tx.openSignature ? (
          <a href={explorerTx(tx.openSignature, cluster)} target="_blank" rel="noopener noreferrer" className="rc-btn rc-btn-ghost">
            Solscan ↗
          </a>
        ) : (
          <span />
        )}
      </div>

      {news && (news.levelUp || news.badges.length > 0) && (
        <div className="mt-3 flex flex-col gap-2">
          {news.levelUp && (
            <div className="rc-toast">
              {rich(t.news.levelUp, {
                level: <b>{fmt(t.trainer.level, { n: news.levelUp })}</b>,
                title: t.trainer.titles[news.title] ?? news.title,
              })}
            </div>
          )}
          {news.badges.map((b) => (
            <div key={b.id} className="rc-toast" style={{ background: `linear-gradient(90deg, ${b.color}, #fff6)` }}>
              <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-white/70 text-sm">{b.glyph}</span>
              {fmt(t.news.badge, { name: (t.trainer.badges[b.id] ?? b).name })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------- small parts

function Intro({ kind }: { kind: Universe["intro"] }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setOn(false), 1000);
    return () => clearTimeout(t);
  }, []);
  if (!on) return null;
  return (
    <div className="rc-intro" data-intro={kind} aria-hidden>
      {kind !== "flash" && Array.from({ length: kind === "bars" ? 8 : 1 }, (_, i) => <i key={i} style={{ top: `${i * 12.5}%`, animationDelay: `${i * 0.035}s` }} />)}
    </div>
  );
}

/** Text that types itself out, like the games. Screen readers get it whole at once. */
function Typewriter({ text, cps = 55 }: { text: string; cps?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const k = Math.min(text.length, Math.floor(((performance.now() - start) / 1000) * cps));
      setN(k);
      if (k >= text.length) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [text, cps]);
  return (
    <>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span className="sr-only">{text}</span>
    </>
  );
}

const CONFETTI: Record<Tier, number> = { common: 18, rare: 36, epic: 60, legendary: 90 };

/** A burst of falling foil, more of it the rarer the pull. Removes itself. */
function Confetti({ tier, u, lite }: { tier: Tier; u: Universe; lite: boolean }) {
  const [on, setOn] = useState(true);
  const [bits] = useState(() => {
    const colors = [u.ink, u.glow, TELL[tier], "#ffffff"];
    return Array.from({ length: Math.round(CONFETTI[tier] * (lite ? 0.35 : 1)) }, (_, i) => ({
      x: `${Math.random() * 100}%`,
      dx: `${(Math.random() - 0.5) * 30}vw`,
      rot: `${(Math.random() - 0.5) * 1440}deg`,
      c: colors[i % colors.length],
      t: `${1.8 + Math.random() * 1.6}s`,
      d: `${Math.random() * 0.5}s`,
      w: `${5 + Math.random() * 6}px`,
    }));
  });
  useEffect(() => {
    const t = setTimeout(() => setOn(false), 3800);
    return () => clearTimeout(t);
  }, []);
  if (!on) return null;
  return (
    <div className="rc-confetti" aria-hidden>
      {bits.map((b, i) => (
        <i
          key={i}
          style={{
            ["--x" as string]: b.x,
            ["--dx" as string]: b.dx,
            ["--rot" as string]: b.rot,
            ["--c" as string]: b.c,
            ["--t" as string]: b.t,
            ["--d" as string]: b.d,
            ["--w" as string]: b.w,
          }}
        />
      ))}
    </div>
  );
}

function SoundIcon({ off }: { off: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h3l5-4v14l-5-4H4z" fill="currentColor" />
      {off ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />}
    </svg>
  );
}
