"use client";

import Link from "@/components/LocaleLink";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CatchPhase } from "@/components/Pokeball3D";
import type { CardRow } from "@/lib/types";
import { useHomeListings } from "@/hooks/pages/Home/useHighlights";
import { cardImage } from "@/lib/constants";
import { dealScore, fmtSol, fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { clsx } from "@/lib/clsx";
import { fmt } from "@/lib/i18n/format";
import { useT } from "@/components/LocaleProvider";

type Phase = CatchPhase;
type Ball3D = typeof import("@/components/Pokeball3D").default;

/**
 * The three.js ball is a large chunk (~900 KB), so it is only fetched once the hero is on screen
 * and the browser is idle, or on the first tap. Touch and small screens wait for the tap. If the
 * chunk fails, the CSS ball simply stays.
 */
function loadBall3D(onLoad: (ball: Ball3D) => void) {
  import("@/components/Pokeball3D").then(
    (m) => onLoad(m.default),
    () => {},
  );
}

let webglSupport: boolean | undefined;

/** Checked once per session; low-power and data-saver devices keep the CSS ball. */
function canUseWebGL() {
  if (webglSupport !== undefined) return webglSupport;
  try {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData || (navigator.hardwareConcurrency ?? 8) <= 2) return (webglSupport = false);
    const c = document.createElement("canvas");
    webglSupport = Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const noopSubscribe = () => () => {};

// The three best live deals sit on the scope around the ball: [left %, top %, tilt].
const BLIPS: [number, number, number][] = [
  [14, 24, -8],
  [87, 21, 7],
  [85, 77, -5],
];

const priceOf = (c: CardRow, unlisted: string) =>
  c.listing ? (c.listing.currency === "USDC" ? fmtUsd(c.listing.price) : fmtSol(c.listing.price)) : unlisted;
const underOf = (c: CardRow) => (c.listing?.currency === "USDC" ? dealScore(c.listing.price, c.insuredValue) : null);

/**
 * Tap the ball, it shakes and catches a live underpriced card. The CSS ball shows first; on
 * desktop the three.js ball replaces it once the hero is on screen and the browser is idle (its
 * render loop pauses off screen). The best deals ride the scope as small slabs once the feed lands.
 */
export function HeroCatch() {
  // False on the server and during hydration, then the real answer.
  const webgl = useSyncExternalStore(noopSubscribe, canUseWebGL, () => false);
  const [Pokeball3D, setPokeball3D] = useState<Ball3D | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [caught, setCaught] = useState<CardRow | null>(null);
  const [burst, setBurst] = useState(0);
  const timers = useRef<number[]>([]);
  const { data } = useHomeListings();
  const s = useT().home.catch;
  const deals = data?.bestDeals ?? [];

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => clearTimeout(id));
  }, []);

  // Fetch the 3D ball once the hero is visible and the browser is idle (2s at most).
  useEffect(() => {
    const el = stage.current;
    if (!webgl || Pokeball3D || !el) return;
    // On phones, compiling three.js unasked was a long main-thread block (TBT, slow first taps).
    if (window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) return;
    let idle: number | undefined;
    let timer: number | undefined;
    const mount = () => loadBall3D((ball) => setPokeball3D(() => ball));
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(mount, { timeout: 2000 });
      else timer = window.setTimeout(mount, 1000);
    };
    if (typeof IntersectionObserver === "undefined") {
      whenIdle();
      return () => window.clearTimeout(timer);
    }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      whenIdle();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, [webgl, Pokeball3D]);

  function throwBall() {
    // A tap before the idle load brings the 3D ball in right away.
    if (webgl && !Pokeball3D) loadBall3D((ball) => setPokeball3D(() => ball));
    if (phase !== "idle") return;
    const pool = [...deals, ...(data?.newestListings ?? [])].filter((c) => c.nftAddress !== caught?.nftAddress);
    setCaught(null);
    setPhase("shaking");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("caught");
        setBurst((b) => b + 1);
        setCaught(pool.length ? pool[Math.floor(Math.random() * Math.min(pool.length, 12))] : null);
      }, 2200),
      window.setTimeout(() => setPhase("idle"), 3200),
    );
  }

  const score = caught ? underOf(caught) : null;

  return (
    <div className="hero-catch">
      <div ref={stage} className="hero-stage" data-caught={caught ? "" : undefined} data-3d={webgl && Pokeball3D ? "" : undefined}>
        <span className="hero-glow" aria-hidden />
        <span className="hero-ring" aria-hidden />
        <span className="hero-ring hero-ring-in" aria-hidden />
        {deals.slice(0, BLIPS.length).map((c, i) => {
          const [x, y, tilt] = BLIPS[i];
          const under = underOf(c);
          return (
            <Link
              key={c.nftAddress}
              href={`/card/${c.nftAddress}`}
              prefetch={false}
              className="hero-blip animate-pop"
              style={{ left: `${x}%`, top: `${y}%`, rotate: `${tilt}deg`, animationDelay: `${0.15 + i * 0.1}s` }}
              aria-label={fmt(under ? s.blipUnder : s.blip, {
                card: `${shortCardName(c.itemName)} ${gradeShort(c.gradingCompany, c.grade)}`,
                price: priceOf(c, s.unlisted),
                under,
              })}
            >
              <img
                src={cardImage(c.nftAddress, "front", 128, c)}
                alt=""
                width={128}
                height={213}
                decoding="async"
                onError={(e) => {
                  // The pre-generated file is gone: fall back to the resize route once.
                  const el = e.currentTarget;
                  if (el.dataset.fallback) return;
                  el.dataset.fallback = "1";
                  el.src = cardImage(c.nftAddress, "front", 128);
                }}
              />
              {under != null && under > 0 && <span className="hero-blip-tag">−{under}%</span>}
            </Link>
          );
        })}
        <span className="hero-shadow" aria-hidden />
        {webgl && Pokeball3D ? (
          <div className="hero-ball-3d">
            <Pokeball3D phase={phase} onThrow={throwBall} />
          </div>
        ) : (
          <button type="button" onClick={throwBall} aria-label={s.throw} className="hero-ball-btn">
            <span className={clsx("pokeball hero-ball", phase === "shaking" ? "pokeball-wobble" : "animate-float")} />
          </button>
        )}
        {phase === "caught" &&
          Array.from({ length: 8 }).map((_, i) => (
            <span key={`${burst}-${i}`} className="catch-star" style={{ ["--a" as string]: `${i * 45}deg` }} aria-hidden>
              ★
            </span>
          ))}
        <div className="hero-caught" aria-live="polite">
          {caught && (
            <div className="dialog dialog-arrow animate-pop">
              <div className="flex gap-3 items-center">
                <img
                  src={cardImage(caught.nftAddress, "front", 128, caught)}
                  alt=""
                  className="h-[72px] w-[52px] rounded-md object-contain bg-cream-lo shrink-0"
                />
                <div className="min-w-0">
                  <p className="dialog-text leading-[1.9]">
                    {fmt(s.caught, {
                      card: `${shortCardName(caught.itemName).toUpperCase()} ${gradeShort(caught.gradingCompany, caught.grade)}`,
                    })}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    {priceOf(caught, s.unlisted)}
                    {Number(caught.insuredValue) > 0 && ` · ${fmt(s.insured, { value: fmtUsd(Number(caught.insuredValue)) })}`}
                    {score != null && score > 0 && <b className="text-up"> · {fmt(s.under, { pct: score })}</b>}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Link href={`/card/${caught.nftAddress}`} className="btn btn-red !py-2 !px-4 text-sm min-h-11">
                  {s.view}
                </Link>
                <button type="button" onClick={throwBall} className="btn btn-cream !py-2 !px-4 text-sm min-h-11">
                  {s.again}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="hero-prompt">
        {phase === "shaking" ? s.shaking : caught ? s.promptAgain : s.prompt}
        <span aria-hidden className="block mt-2 text-poke">
          ▼
        </span>
      </p>
    </div>
  );
}
