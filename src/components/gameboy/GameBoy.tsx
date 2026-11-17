"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "@/components/LocaleProvider";
import { localizeHref } from "@/lib/i18n";
import { age, fmt } from "@/lib/i18n/format";
import type { ClientStrings } from "@/lib/i18n/strings/types";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Activity } from "@/lib/types";
import { cardImage } from "@/lib/constants";
import { activityDisplay, gradeShort, isBotChurn, isSale, priceText, shortAddr, shortCardName } from "@/lib/format";
import { useReducedMotion } from "@/lib/hooks";
import "./gameboy.css";

type Mode = "all" | "trainers" | "sales";
const MODES: Mode[] = ["trainers", "all", "sales"];

/** lib/format.ts battleText() read from the strings file: the same English lines, translatable. */
function battleLine(a: Activity, lines: ClientStrings["ui"]["gameBoy"]["battle"]): string {
  const name = shortCardName(a.cardName).toUpperCase();
  const grade = gradeShort(a.gradingCompany, a.grade);
  const price = priceText(a);
  const vars = { card: grade ? `${name} ${grade}` : name, price, trainer: shortAddr(a.actor ?? a.buyer ?? a.seller) };
  switch (activityDisplay(a.kind).verb) {
    case "SALE":
      return fmt(price ? lines.sale : lines.saleNoPrice, vars);
    case "BID TAKEN":
      return fmt(price ? lines.bidTaken : lines.bidTakenNoPrice, vars);
    case "LISTED":
      return fmt(lines.listed, vars);
    case "REPRICE":
      return fmt(lines.reprice, vars);
    case "DELIST":
      return fmt(lines.delist, vars);
    case "NEW BID":
      return fmt(lines.newBid, vars);
    case "BID EDIT":
      return fmt(lines.bidEdit, vars);
    case "BID PULLED":
      return fmt(lines.bidPulled, vars);
    default:
      return fmt(lines.other, vars);
  }
}

/** Draws the card into a tiny canvas so CSS can upscale it as real pixel art. */
function PixelCard({ mint }: { mint: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let alive = true;
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      if (!alive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = cardImage(mint, "front", 128);
    return () => {
      alive = false;
      img.onload = null;
    };
  }, [mint]);
  return <canvas ref={ref} width={30} height={50} aria-hidden />;
}

/** Prints one line letter by letter. Keyed by text, so each line starts fresh. */
function TypeLine({ text, instant, onDone }: { text: string; instant: boolean; onDone: () => void }) {
  const [chars, setChars] = useState(0);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  });
  useEffect(() => {
    if (instant) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setChars(n);
      if (n >= text.length) {
        window.clearInterval(id);
        onDoneRef.current();
      }
    }, 24);
    return () => window.clearInterval(id);
  }, [text, instant]);
  return <>{instant ? text : text.slice(0, chars)}</>;
}

function filterEvents(events: Activity[], mode: Mode) {
  const known = events.filter((a) => a.kind !== "Unknown" && a.cardName);
  if (mode === "sales") return known.filter(isSale);
  if (mode === "trainers") return known.filter((a) => !isBotChurn(a));
  return known;
}

/**
 * Playable Game Boy that narrates live market events as battle text.
 * A / ▶ next · B / ◀ previous · SELECT cycles the filter · START opens the tape.
 * Focused, the arrow keys and Enter work too.
 */
export function GameBoy({ events, loading }: { events: Activity[]; loading?: boolean }) {
  const router = useRouter();
  const { locale, t } = useLocale();
  const g = t.ui.gameBoy;
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("trainers");
  const [index, setIndex] = useState(0);
  const [doneText, setDoneText] = useState<string | null>(null);
  const [skipText, setSkipText] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  const list = useMemo(() => {
    const f = filterEvents(events, mode);
    return f.length ? f : filterEvents(events, "all");
  }, [events, mode]);

  const current = list.length ? list[index % list.length] : null;
  const verb = current ? activityDisplay(current.kind).verb : null;
  const text = current ? battleLine(current, g.battle) : loading ? g.booting : g.empty;
  const done = reduced || doneText === text || skipText === text;

  // Auto-advance once the line is fully printed.
  useEffect(() => {
    if (!done || paused || list.length < 2) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % list.length), 4200);
    return () => window.clearTimeout(id);
  }, [done, paused, list.length]);

  const step = (d: 1 | -1) => {
    if (!list.length) return;
    // The first press on an unfinished line completes it, like the games.
    if (!done) {
      setSkipText(text);
      return;
    }
    setIndex((i) => (i + d + list.length) % list.length);
  };
  const open = () => current?.assetMint && router.push(localizeHref(locale, `/card/${current.assetMint}`));
  const cycle = () => {
    setMode((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
    setIndex(0);
  };

  return (
    <div
      className="gb"
      tabIndex={0}
      role="group"
      aria-label={g.aria.device}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          step(1);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          step(-1);
        } else if (e.key === "Enter") {
          open();
        }
      }}
    >
      <div className="gb-grooves">{g.device.power}</div>

      <div className="gb-bezel">
        <div className="gb-stripe">
          <i />
          {g.device.stripe}
          <i />
        </div>
        <div className="gb-battery">
          <span className="gb-led" />
          {g.device.battery}
        </div>

        <div className="gb-screen" onClick={open} role="presentation">
          <div className="gb-hud">
            <span>{verb ? (t.ui.verbs[verb] ?? verb) : g.live}</span>
            <span>
              {current ? `${age(locale, current.blockTime)} · ` : ""}
              {list.length ? `${(index % list.length) + 1}/${list.length}` : "--"}
            </span>
          </div>
          <div className="gb-picture">
            {current?.assetMint ? (
              <PixelCard mint={current.assetMint} />
            ) : (
              <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "34px" }} />
            )}
          </div>
          <div className="gb-textbox" aria-live="polite">
            <TypeLine key={text} text={text} instant={reduced || skipText === text} onDone={() => setDoneText(text)} />
            {done && <span className="gb-caret">▼</span>}
          </div>
        </div>
      </div>

      <div className="gb-brand">
        Decard<span>{fmt(g.device.model, { mode: g.modes[mode] })}</span>
      </div>

      <div className="gb-controls">
        <div className="gb-dpad">
          <button type="button" className="gb-up" aria-label={g.aria.previous} onClick={() => step(-1)} />
          <button type="button" className="gb-left" aria-label={g.aria.previous} onClick={() => step(-1)} />
          <span className="gb-hub" />
          <button type="button" className="gb-right" aria-label={g.aria.next} onClick={() => step(1)} />
          <button type="button" className="gb-down" aria-label={g.aria.next} onClick={() => step(1)} />
        </div>

        <div className="gb-ab">
          <button type="button" className="gb-key gb-keyB" aria-label={g.aria.b} onClick={() => step(-1)}>
            <span className="gb-keyLabel">B</span>
          </button>
          <button type="button" className="gb-key gb-keyA" aria-label={g.aria.a} onClick={() => step(1)}>
            <span className="gb-keyLabel">A</span>
          </button>
        </div>

        <div className="gb-pills">
          <button type="button" className="gb-pill" aria-label={fmt(g.aria.select, { mode: g.modes[mode] })} onClick={cycle}>
            <span className="gb-pillLabel">{g.device.select}</span>
          </button>
          <button type="button" className="gb-pill" aria-label={g.aria.start} onClick={() => router.push(localizeHref(locale, "/tape"))}>
            <span className="gb-pillLabel">{g.device.start}</span>
          </button>
        </div>

        <span className="gb-speaker" aria-hidden />
      </div>
    </div>
  );
}
