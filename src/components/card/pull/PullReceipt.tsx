"use client";

import { AnimatePresence, motion, useDragControls } from "motion/react";
import { Suspense, use, useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CountUp } from "@/components/motion";
import { CountTo, Sparkles } from "@/components/gacha/parts";
import { multipleLevel } from "@/components/gacha/shared";
import { Skeleton } from "@/components/ui";
import { fmtUsd } from "@/lib/format";
import { useMediaQuery, useReducedMotion } from "@/lib/hooks";
import {
  PACK_PRESETS,
  fmtMultiple,
  fmtPack,
  packChip,
  parsePack,
  pullMultiple,
  pullPath,
  receiptImagePath,
  shareText,
  type RarityTier,
} from "@/lib/pull";
import { DiscordLogo, DownloadIcon, LinkIcon, RedditLogo, ShareIcon, TelegramLogo, XLogo } from "./icons";
import { intentLinks, receiptFileName, trackShare, type ShareMethod } from "./share";
import { Say, Stage, type Phase } from "./Stage";
import "./pull.css";

/** What the card page knows about the slab, already formatted for display. */
export interface ReceiptCard {
  mint: string;
  /** Full catalogue name, for alt text. */
  name: string;
  short: string;
  /** "PSA 10", or "" without a grade. */
  grade: string;
  insured: number;
  pop: number | null;
  tier: RarityTier | null;
  front: string;
  /** The card page's own srcSet for the slab, so the dialog reuses the image already loaded. */
  frontSet: string;
  back: string;
}

/** Live reads the page already started; the dialog shows them when they land. */
export interface ReceiptLive {
  listed: Promise<{ price: string; venue: string } | null>;
  bestBid: Promise<number | null>;
}

const WIDE = "(min-width: 768px) and (min-height: 560px)";
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
const isPreset = (n: number) => (PACK_PRESETS as readonly number[]).includes(n);
const noop = () => () => {};

// How long each step of the catch runs before the next.
const NEXT: Record<Exclude<Phase, "idle">, [Phase, number]> = {
  lid: ["drop", 900],
  drop: ["wobble", 560],
  wobble: ["catch", 1350],
  catch: ["reveal", 420],
  reveal: ["idle", 1100],
};

/** "Share pull" button and its dialog. The catch plays on the first open only. */
export function PullReceipt({ card, live, initialPack }: { card: ReceiptCard; live: ReceiptLive; initialPack: number | null }) {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  // The dialog is portalled to <body>, which only exists after hydration.
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const close = useCallback(() => {
    setOpen(false);
    setSeen(true);
    trigger.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="btn btn-yellow"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="pokeball pokeball-spin" style={{ ["--s" as string]: "18px" }} aria-hidden />
        Share pull
      </button>
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && <ReceiptDialog key="pull" card={card} live={live} initialPack={initialPack} intro={!seen} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

function BestBid({ bid }: { bid: Promise<number | null> }) {
  const v = use(bid);
  return <>{v ? fmtUsd(v) : "·"}</>;
}

function Listed({ listed }: { listed: Promise<{ price: string; venue: string } | null> }) {
  const l = use(listed);
  return <p className="pr-listed">{l ? `Listed at ${l.price} on ${l.venue}` : "Not listed right now"}</p>;
}

function ReceiptDialog({
  card,
  live,
  initialPack,
  intro,
  onClose,
}: {
  card: ReceiptCard;
  live: ReceiptLive;
  initialPack: number | null;
  intro: boolean;
  onClose: () => void;
}) {
  const reduced = useReducedMotion();
  const wide = useMediaQuery(WIDE);
  const titleId = useId();
  const dialog = useRef<HTMLDivElement>(null);
  const drag = useDragControls();
  const [phase, setPhase] = useState<Phase>(() => (!intro || reduced ? "idle" : wide ? "lid" : "drop"));
  const [lidShut] = useState(phase === "lid");
  const [pack, setPack] = useState<number | null>(initialPack);
  const [custom, setCustom] = useState(() => (initialPack != null && !isPreset(initialPack) ? String(initialPack) : ""));
  const [shot, setShot] = useState<{ path: string; url: string; blob: Blob } | null>(null);
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);
  const urls = useRef<string[]>([]);

  // The catch runs itself; any tap on the screen or Skip jumps to the end.
  useEffect(() => {
    if (phase === "idle") return;
    const [next, ms] = NEXT[phase];
    const id = window.setTimeout(() => setPhase(next), ms);
    return () => window.clearTimeout(id);
  }, [phase]);
  const skip = useCallback(() => setPhase("idle"), []);

  // Modal: lock the page scroll (keeping the scrollbar's width) and take focus.
  useEffect(() => {
    const { documentElement: html, body } = document;
    const gap = window.innerWidth - html.clientWidth;
    const prev = [html.style.overflow, body.style.paddingRight] as const;
    html.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    dialog.current?.focus({ preventScroll: true });
    return () => {
      html.style.overflow = prev[0];
      body.style.paddingRight = prev[1];
    };
  }, []);

  // Render the share image once the pack price settles: it is the preview, and
  // the file for the share sheet has to be ready before the tap (iOS drops a
  // share that waits on the network).
  const imgPath = receiptImagePath(card.mint, pack);
  useEffect(() => {
    const ctrl = new AbortController();
    const id = window.setTimeout(() => {
      fetch(imgPath, { signal: ctrl.signal })
        .then((r) => (r.ok && r.headers.get("content-type")?.startsWith("image/") ? r.blob() : null))
        .then((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          urls.current.push(url);
          setShot({ path: imgPath, url, blob });
        })
        .catch(() => {});
    }, 380);
    return () => {
      window.clearTimeout(id);
      ctrl.abort();
    };
  }, [imgPath]);
  useEffect(() => {
    const list = urls.current;
    return () => list.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);
  const say = (text: string) => setToast({ id: Date.now(), text });

  const title = [card.short, card.grade].filter(Boolean).join(" ");
  const multiple = pullMultiple(card.insured, pack);
  const level = multipleLevel(multiple);
  const url = `${window.location.origin}${pullPath(card.mint, pack)}`;
  const text = shareText({ title, insured: card.insured, pop: card.pop }, pack);
  const links = intentLinks(url, text);
  const fileName = receiptFileName(title);
  const canShare = typeof navigator.share === "function";
  const busy = shot?.path !== imgPath;
  const shown = phase === "reveal" || phase === "idle";
  const invalid = custom !== "" && parsePack(custom) == null;
  const caps = card.short.toUpperCase();
  const name = caps.length > 24 ? `${caps.slice(0, 23).trimEnd()}…` : caps;
  const line = !shown
    ? phase === "catch"
      ? "Click!"
      : "DECARD used POKé BALL!"
    : multiple != null && pack
      ? `Insured value: ${fmtMultiple(multiple)} the ${fmtPack(pack)} pack!`
      : `Gotcha! ${name} was caught!`;

  const track = (method: ShareMethod) => trackShare(method, card.mint, pack);

  function pickPreset(p: number) {
    setPack(pack === p && custom === "" ? null : p);
    setCustom("");
  }
  function typeCustom(raw: string) {
    const v = raw.replace(/[^\d.]/g, "").slice(0, 9);
    setCustom(v);
    setPack(parsePack(v));
  }
  function clearPack() {
    setPack(null);
    setCustom("");
  }

  async function copy(method: "copy" | "discord") {
    try {
      await navigator.clipboard.writeText(url);
      track(method);
      say(method === "discord" ? "Copied. Paste it in Discord and the receipt unfurls." : "Link copied.");
    } catch {
      say("Couldn't copy. Press and hold the link instead.");
    }
  }

  async function nativeShare() {
    const data: ShareData = { title, text, url };
    // The file only goes along when it is already rendered for this pack price.
    if (shot && !busy) {
      const file = new File([shot.blob], fileName, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) data.files = [file];
    }
    try {
      await navigator.share(data);
      track("native");
    } catch (e) {
      if ((e as DOMException)?.name !== "AbortError") say("Share sheet didn't open. Copy the link instead.");
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !dialog.current) return;
    const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === dialog.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  }
  const startDrag = (e: React.PointerEvent) => {
    if (!wide && !reduced) drag.start(e);
  };

  const popLabel = card.grade ? `Pop ${card.grade.split(" ").pop()}` : "Pop";
  const fill = multiple != null ? Math.max(3, Math.min(100, (multiple / 5) * 100)) : 0;
  const note =
    multiple != null && pack
      ? `Insured value is ${fmtMultiple(multiple)} the ${fmtPack(pack)} pack price.`
      : card.insured > 0
        ? "Pick the pack price to get the multiple."
        : "No insured value on file for this slab.";

  return (
    <div className="pr-root">
      <motion.div
        className="pr-scrim"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />
      <div className="pr-place">
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="pr-device"
          onKeyDown={onKeyDown}
          drag={wide || reduced ? false : "y"}
          dragControls={drag}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.7 }}
          onDragEnd={(_, info) => {
            if (info.offset.y > 110 || info.velocity.y > 650) onClose();
          }}
          initial={reduced ? { opacity: 0 } : wide ? { opacity: 0, scale: 0.92, y: 28 } : { y: "100%" }}
          animate={reduced ? { opacity: 1 } : wide ? { opacity: 1, scale: 1, y: 0 } : { y: 0 }}
          exit={reduced ? { opacity: 0 } : wide ? { opacity: 0, scale: 0.95, y: 18 } : { y: "100%" }}
          transition={wide ? { type: "spring", stiffness: 260, damping: 24 } : { type: "spring", stiffness: 320, damping: 34 }}
        >
          <div className="pr-grab" onPointerDown={startDrag} aria-hidden />
          <button type="button" className="pr-close" onClick={onClose} aria-label="Close">
            ×
          </button>

          <section className="pr-panel pr-left" aria-label="Your slab">
            <div className="pr-front">
              <div className="pr-top" onPointerDown={startDrag}>
                <span className="gx-lens" aria-hidden />
                <span className="gx-leds" aria-hidden>
                  <i className="gx-led gx-led-r" />
                  <i className="gx-led gx-led-y" />
                  <i className="gx-led gx-led-g" />
                </span>
                <span className="gx-dex-title min-w-0 truncate">Pull receipt</span>
              </div>
              <div className="gx-dex-seam" aria-hidden />
              <div className="gx-bezel">
                <div className="gx-screen">
                  <Stage
                    slab={{
                      name: card.name,
                      grade: card.grade,
                      tier: card.tier,
                      front: card.front,
                      frontSet: card.frontSet,
                      back: card.back,
                    }}
                    phase={phase}
                    reduced={reduced}
                    onSkip={skip}
                  />
                </div>
              </div>
              <Say text={line} reduced={reduced} />
            </div>
          </section>

          <div className="pr-hinge" aria-hidden />

          <motion.section
            className="pr-panel pr-right"
            aria-labelledby={titleId}
            initial={lidShut ? { rotateY: -180 } : false}
            animate={{ rotateY: 0 }}
            transition={{ type: "spring", stiffness: 42, damping: 11, delay: 0.2 }}
          >
            <div className="pr-front">
              <div className="pr-top">
                <h2 id={titleId} className="gx-dex-title">
                  Share your pull
                </h2>
              </div>

              <div>
                <div className="gx-lcd pr-lcd" role="group" aria-label="Slab stats">
                  {/* "???" until the catch lands, like an unregistered dex entry. */}
                  <div>
                    <span className="gx-lcd-label">Insured</span>
                    <span className="gx-lcd-value">
                      {!shown ? "???" : card.insured > 0 ? <CountUp value={card.insured} kind="usd" /> : "·"}
                    </span>
                  </div>
                  <div>
                    <span className="gx-lcd-label">Best bid</span>
                    <span className="gx-lcd-value">
                      <Suspense fallback="…">
                        <BestBid bid={live.bestBid} />
                      </Suspense>
                    </span>
                  </div>
                  <div>
                    <span className="gx-lcd-label">{popLabel}</span>
                    <span className="gx-lcd-value">{!shown ? "???" : card.pop != null ? <CountUp value={card.pop} /> : "·"}</span>
                  </div>
                </div>
                <Suspense fallback={<p className="pr-listed">Checking the listing…</p>}>
                  <Listed listed={live.listed} />
                </Suspense>
              </div>

              <div role="group" aria-labelledby={`${titleId}-pack`}>
                <p id={`${titleId}-pack`} className="pr-label">
                  What did the pack cost? <em>Optional</em>
                </p>
                <div className="pr-keys">
                  {PACK_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className="pr-key"
                      aria-pressed={pack === p && custom === ""}
                      onClick={() => pickPreset(p)}
                    >
                      {packChip(p)}
                    </button>
                  ))}
                </div>
                <div className="pr-custom">
                  <label className="pr-input" data-invalid={invalid}>
                    <span aria-hidden>$</span>
                    <input
                      inputMode="decimal"
                      autoComplete="off"
                      enterKeyHint="done"
                      placeholder="Other amount"
                      value={custom}
                      onChange={(e) => typeCustom(e.target.value)}
                      aria-label="Other pack price in dollars"
                      aria-invalid={invalid}
                    />
                  </label>
                  {pack != null && (
                    <button type="button" className="pr-ghost" onClick={clearPack}>
                      No pack
                    </button>
                  )}
                </div>
                {invalid && <p className="pr-hint">Enter $1 to $100,000.</p>}
              </div>

              <div className="pr-meter" data-level={level}>
                <div className="pr-meter-head">
                  <span className="pr-meter-label">Insured ÷ pack</span>
                  <span className="pr-mult">
                    {multiple != null ? <CountTo value={multiple} kind="mult" /> : "·"}
                    {multiple != null && level !== "muted" && !reduced && <Sparkles key={pack} />}
                  </span>
                </div>
                <div className="pr-exp" aria-hidden>
                  <span className="pr-exp-label">EXP</span>
                  <span className="pr-exp-track">
                    <motion.span
                      className="pr-exp-fill"
                      initial={false}
                      animate={{ width: `${fill}%` }}
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 }}
                    />
                    <span className="pr-exp-tick" />
                  </span>
                </div>
                <p className="pr-meter-note">{note}</p>
              </div>

              <div>
                <p className="pr-label">Share it</p>
                <div className="pr-share">
                  <a className="pr-skey" data-brand="x" href={links.x} target="_blank" rel="noopener noreferrer" onClick={() => track("x")}>
                    <XLogo /> Post on X
                  </a>
                  <a
                    className="pr-skey"
                    data-brand="telegram"
                    href={links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("telegram")}
                  >
                    <TelegramLogo /> Telegram
                  </a>
                  <a className="pr-skey" data-brand="reddit" href={links.reddit} target="_blank" rel="noopener noreferrer" onClick={() => track("reddit")}>
                    <RedditLogo /> Reddit
                  </a>
                  <button type="button" className="pr-skey" data-brand="discord" onClick={() => copy("discord")}>
                    <DiscordLogo /> Discord
                  </button>
                  <a className="pr-skey" href={imgPath} download={fileName} onClick={() => track("download")}>
                    <DownloadIcon /> Save PNG
                  </a>
                  {canShare && (
                    <button type="button" className="pr-skey" data-brand="native" onClick={nativeShare}>
                      <ShareIcon /> More
                    </button>
                  )}
                </div>
              </div>

              <div className="pr-link">
                <code>{url.replace(/^https?:\/\//, "")}</code>
                <button type="button" onClick={() => copy("copy")}>
                  Copy
                </button>
              </div>

              <figure>
                <figcaption className="pr-label">
                  Link preview <em>What X and Discord show</em>
                </figcaption>
                <div className="pr-shot" data-busy={busy}>
                  {shot ? <img src={shot.url} alt={`Share image for ${title}`} /> : <Skeleton className="absolute inset-0 rounded-none" />}
                  {busy && <span className="pr-shot-tag">Rendering…</span>}
                </div>
              </figure>

              <p className="pr-fine">
                You set the pack price; nothing checks it. Insured value is Collector Crypt&apos;s number, not a sale price.
                Data refreshes every 10 minutes.
              </p>
            </div>

            <div className="pr-lid" aria-hidden>
              <span className="pr-lid-emblem">
                <span className="pokeball" />
              </span>
              <span className="logo-word pr-lid-word">DECARD</span>
              <span className="pr-lid-tag">PULL RECEIPT</span>
            </div>
          </motion.section>

          <div className="pr-dock">
            {canShare ? (
              <button type="button" className="btn btn-yellow" onClick={nativeShare}>
                <ShareIcon className="h-5 w-5" /> Share
              </button>
            ) : (
              <a className="btn btn-yellow" href={links.x} target="_blank" rel="noopener noreferrer" onClick={() => track("x")}>
                <XLogo className="h-4 w-4" /> Post on X
              </a>
            )}
            <button type="button" className="btn btn-cream" onClick={() => copy("copy")}>
              <LinkIcon className="h-5 w-5" /> Copy link
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.p
            key={toast.id}
            className="pr-toast"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            {toast.text}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="sr-only" role="status" aria-live="polite">
        {toast?.text ?? ""}
      </p>
    </div>
  );
}
