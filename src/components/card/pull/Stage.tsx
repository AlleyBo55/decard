"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";
import type { RarityTier } from "@/lib/pull";

/** The catch, in order. "lid" only runs on the clamshell, while the lid swings open. */
export type Phase = "lid" | "drop" | "wobble" | "catch" | "reveal" | "idle";

export interface StageSlab {
  name: string;
  grade: string;
  tier: RarityTier | null;
  front: string;
  frontSet: string;
  back: string;
}

const TINT: Record<RarityTier, string> = {
  LEGENDARY: "rgb(111 53 252 / 0.42)",
  RARE: "rgb(227 53 13 / 0.36)",
  UNCOMMON: "rgb(42 117 187 / 0.36)",
  COMMON: "rgb(255 203 5 / 0.5)",
};

const STARS = Array.from({ length: 12 }, (_, i) => ({ a: i * 30 + (i % 2) * 11, r: 92 + (i % 3) * 34, d: (i % 4) * 0.04 }));

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const vars = (v: Record<string, string>) => v as React.CSSProperties;

/** Tilt and glare through CSS variables in a rAF, so moving never re-renders. x and y run 0 to 1. */
function paint(el: HTMLElement | null, raf: { current: number }, x: number, y: number, active: boolean) {
  if (!el) return;
  cancelAnimationFrame(raf.current);
  raf.current = requestAnimationFrame(() => {
    el.dataset.active = String(active);
    el.style.setProperty("--rx", `${active ? (0.5 - y) * 16 : 0}deg`);
    el.style.setProperty("--ry", `${active ? (x - 0.5) * 22 : 0}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  });
}

type Orientation = { requestPermission?: () => Promise<string> };

/**
 * The screen: a Poké Ball drops, wobbles three times and clicks, then the slab
 * rises with its grade stamped on. After that the slab follows the pointer
 * (or the phone's tilt, once allowed), and a tap flips it.
 */
export function Stage({
  slab,
  phase,
  reduced,
  onSkip,
}: {
  slab: StageSlab;
  phase: Phase;
  reduced: boolean;
  onSkip: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [gyro, setGyro] = useState<"off" | "on" | "denied">("off");
  const tilt = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const coarse = useMediaQuery("(pointer: coarse)");
  const canGyro = coarse && !reduced && "DeviceOrientationEvent" in window;
  const ball = phase === "drop" || phase === "wobble" || phase === "catch";
  const shown = phase === "reveal" || phase === "idle";

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Gyro tilt: the first reading is how the phone is held, so tilt is relative to it.
  useEffect(() => {
    if (gyro !== "on") return;
    const el = tilt.current;
    let base: number | null = null;
    const onTurn = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      base ??= e.beta;
      paint(el, raf, 0.5 + clamp(e.gamma / 50, -0.5, 0.5), 0.5 + clamp((e.beta - base) / 50, -0.5, 0.5), true);
    };
    window.addEventListener("deviceorientation", onTurn);
    return () => {
      window.removeEventListener("deviceorientation", onTurn);
      paint(el, raf, 0.5, 0.5, false);
    };
  }, [gyro]);

  async function toggleGyro() {
    if (gyro === "on") return setGyro("off");
    // iOS asks once, and only from a tap.
    const ask = (window.DeviceOrientationEvent as unknown as Orientation).requestPermission;
    if (typeof ask === "function") {
      const answer = await ask().catch(() => "denied");
      if (answer !== "granted") return setGyro("denied");
    }
    setGyro("on");
  }

  function onMove(e: React.PointerEvent) {
    if (e.pointerType === "touch" || gyro === "on" || reduced || !shown) return;
    const r = tilt.current?.getBoundingClientRect();
    if (!r) return;
    paint(tilt.current, raf, clamp((e.clientX - r.left) / r.width, -0.2, 1.2), clamp((e.clientY - r.top) / r.height, -0.2, 1.2), true);
  }
  function onLeave() {
    if (gyro !== "on") paint(tilt.current, raf, 0.5, 0.5, false);
  }
  function flip(e: React.MouseEvent) {
    e.stopPropagation();
    if (shown) setFlipped((f) => !f);
    else onSkip();
  }

  return (
    <div
      className="pr-stage"
      data-phase={phase}
      data-stamped={stamped}
      style={vars({ "--pr-tint": TINT[slab.tier ?? "COMMON"] })}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={shown ? undefined : onSkip}
    >
      <span className="pr-rays" aria-hidden />
      <span className="pr-floor" aria-hidden />
      <div className="pr-shake">
        {ball && (
          <motion.div
            className="pr-ball"
            aria-hidden
            initial={{ y: -340, opacity: 0, scale: 0.7 }}
            animate={phase === "catch" ? { y: 0, opacity: 0, scale: 1.3 } : { y: 0, opacity: 1, scale: 1 }}
            transition={
              phase === "catch"
                ? { duration: 0.28, ease: "easeIn", delay: 0.14 }
                : { type: "spring", stiffness: 380, damping: 14, mass: 0.9 }
            }
          >
            <motion.div
              className="relative h-full w-full"
              style={{ transformOrigin: "50% 88%" }}
              animate={phase === "wobble" ? { rotate: [0, -22, 0, 0, 17, 0, 0, -11, 0] } : { rotate: 0 }}
              transition={
                phase === "wobble"
                  ? { duration: 1.3, times: [0, 0.1, 0.2, 0.33, 0.43, 0.53, 0.66, 0.76, 0.86], ease: "easeInOut" }
                  : { duration: 0.15 }
              }
            >
              <span className="pokeball" />
              <span className="pr-ball-glint" />
            </motion.div>
          </motion.div>
        )}
        {phase === "catch" && (
          <>
            <span className="pr-flash" aria-hidden />
            <span className="pr-stars" aria-hidden>
              {STARS.map((s) => (
                <i key={s.a} className="pr-star" style={vars({ "--a": `${s.a}deg`, "--r": `${s.r}px`, "--d": `${s.d}s` })} />
              ))}
            </span>
          </>
        )}

        <motion.div
          className="pr-slab"
          initial={reduced ? false : { opacity: 0, y: 80, scale: 0.5, rotateY: -40 }}
          animate={shown ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : { opacity: 0, y: 80, scale: 0.5, rotateY: -40 }}
          transition={reduced ? { duration: 0.2 } : { type: "spring", stiffness: 170, damping: 17, mass: 0.9 }}
        >
          <div className="pr-float">
            <div ref={tilt} className="pr-tilt">
              <button
                type="button"
                className="pr-flip"
                data-flipped={flipped}
                tabIndex={shown ? 0 : -1}
                onClick={flip}
                aria-label={flipped ? "Show the front of the slab" : "Show the back of the slab"}
              >
                <span className="pr-face">
                  {/* Same srcSet and sizes as CardFlip, so the browser picks the copy it already has. */}
                  <img src={slab.front} srcSet={slab.frontSet} sizes="(max-width: 640px) 80vw, 340px" alt={slab.name} draggable={false} />
                  <span className="pr-sweep" />
                </span>
                <span className="pr-face pr-back">
                  <img src={slab.back} alt={`${slab.name}, back of slab`} loading="lazy" draggable={false} />
                </span>
              </button>
              <span className="pr-glare" aria-hidden />
            </div>
          </div>
          {slab.grade && (
            <motion.div
              className="pr-stamp"
              aria-hidden
              initial={reduced ? false : { opacity: 0, scale: 2.6, rotate: -30 }}
              animate={shown ? { opacity: 1, scale: 1, rotate: -10 } : { opacity: 0, scale: 2.6, rotate: -30 }}
              transition={{ type: "spring", stiffness: 650, damping: 22, delay: phase === "reveal" ? 0.5 : 0 }}
              onAnimationComplete={() => {
                if (shown && !reduced) setStamped(true);
              }}
            >
              {slab.grade}
              {slab.tier && <small>{slab.tier}</small>}
            </motion.div>
          )}
        </motion.div>
      </div>

      {shown ? (
        <div className="pr-tools">
          <button type="button" className="pr-tool" onClick={flip}>
            ↻ Flip
          </button>
          {canGyro && gyro !== "denied" && (
            <button
              type="button"
              className="pr-tool"
              aria-pressed={gyro === "on"}
              onClick={(e) => {
                e.stopPropagation();
                void toggleGyro();
              }}
            >
              ◎ Tilt
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          className="pr-skip"
          onClick={(e) => {
            e.stopPropagation();
            onSkip();
          }}
        >
          Skip ▸▸
        </button>
      )}
    </div>
  );
}

/** Game Boy text box. Types the line out a letter at a time; screen readers get the whole line. */
export function Say({ text, reduced }: { text: string; reduced: boolean }) {
  const typed = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = typed.current;
    if (!el) return;
    if (reduced) {
      el.textContent = text;
      return;
    }
    let i = 0;
    el.textContent = "";
    const id = window.setInterval(() => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [text, reduced]);
  return (
    <div className="dialog pr-say">
      <p aria-hidden>
        <span ref={typed} />
        <span className="pr-cursor">▼</span>
      </p>
      <p className="sr-only" aria-live="polite">
        {text}
      </p>
    </div>
  );
}
