"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CardRow } from "@/lib/types";
import type { CatchPhase } from "@/components/Pokeball3D";
import { useHomeListings } from "@/hooks/pages/Home/useHighlights";
import { cardImage } from "@/lib/constants";
import { dealScore, fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { clsx } from "@/lib/clsx";

type Ball3D = typeof import("@/components/Pokeball3D").default;

/**
 * The three.js ball is a ~900KB chunk, so it is only fetched once the hero is
 * on screen and the browser is idle, or on the first tap. If the chunk fails,
 * the CSS ball simply stays.
 */
function loadBall3D(onLoad: (ball: Ball3D) => void) {
  import("@/components/Pokeball3D").then(
    (m) => onLoad(m.default),
    () => {},
  );
}

function CssBall({ phase, onThrow }: { phase: CatchPhase; onThrow?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Throw the Poké Ball"
      onClick={onThrow}
      className="absolute inset-0 grid place-items-center"
    >
      <span
        className={clsx("pokeball animate-float", phase === "shaking" && "pokeball-wobble")}
        style={{ ["--s" as string]: "clamp(142px, 18.5vw, 222px)" }}
      />
    </button>
  );
}

let webglSupport: boolean | undefined;

/** Checked once per session; low-power and data-saver devices get the CSS ball. */
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

/** Tap the ball, it shakes three times, and catches a live underpriced card. */
export function HeroCatch() {
  // False on the server and during hydration, then the real answer.
  const webgl = useSyncExternalStore(noopSubscribe, canUseWebGL, () => false);
  // The CSS ball shows until the three.js one has loaded.
  const [Pokeball3D, setPokeball3D] = useState<Ball3D | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<CatchPhase>("idle");
  const [caught, setCaught] = useState<CardRow | null>(null);
  const [burst, setBurst] = useState(0);
  const timers = useRef<number[]>([]);
  const { data } = useHomeListings();

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => clearTimeout(id));
  }, []);

  // Fetch the 3D ball once the hero is visible and the browser is idle (2s at most).
  useEffect(() => {
    const el = stage.current;
    if (!webgl || Pokeball3D || !el) return;
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
    const pool = [...(data?.bestDeals ?? []), ...(data?.newestListings ?? [])].filter(
      (c) => c.nftAddress !== caught?.nftAddress,
    );
    setCaught(null);
    setPhase("shaking");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("caught");
        setBurst((b) => b + 1);
        setCaught(pool.length ? pool[Math.floor(Math.random() * Math.min(pool.length, 12))] : null);
      }, 2250),
      window.setTimeout(() => setPhase("idle"), 3400),
    );
  }

  const score = caught?.listing?.currency === "USDC" ? dealScore(caught.listing.price, caught.insuredValue) : null;

  return (
    <div className="relative flex flex-col items-center">
      <div ref={stage} className="relative aspect-square w-[clamp(230px,30vw,360px)]">
        {/* soft spotlight disc */}
        <div
          aria-hidden
          className="absolute inset-[6%] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgb(255 203 5 / .35), rgb(255 203 5 / .08) 60%, transparent)" }}
        />
        {webgl && Pokeball3D ? (
          <Pokeball3D phase={phase} onThrow={throwBall} />
        ) : (
          <CssBall phase={phase} onThrow={throwBall} />
        )}
        {phase === "caught" &&
          Array.from({ length: 8 }).map((_, i) => (
            <span key={`${burst}-${i}`} className="catch-star" style={{ ["--a" as string]: `${i * 45}deg` }}>
              ★
            </span>
          ))}
      </div>

      <div className="min-h-[148px] w-full max-w-[380px] -mt-2">
        {caught ? (
          <div className="dialog dialog-arrow animate-pop">
            <div className="flex gap-3 items-center">
              <img
                src={cardImage(caught.nftAddress, "front", 128)}
                alt=""
                className="h-[72px] w-[52px] rounded-md object-contain bg-cream-lo shrink-0"
              />
              <div className="min-w-0">
                <p className="dialog-text leading-[1.9]">
                  Gotcha! {shortCardName(caught.itemName).toUpperCase()} {gradeShort(caught.gradingCompany, caught.grade)} was caught!
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {caught.listing
                    ? caught.listing.currency === "USDC"
                      ? fmtUsd(caught.listing.price)
                      : `${caught.listing.price} SOL`
                    : "Unlisted"}
                  {Number(caught.insuredValue) > 0 && ` · insured ${fmtUsd(Number(caught.insuredValue))}`}
                  {score != null && score > 0 && <b className="text-up"> · {score}% under</b>}
                </p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/card/${caught.nftAddress}`} className="btn btn-red !py-2 !px-4 text-sm">
                View card
              </Link>
              <button type="button" onClick={throwBall} className="btn btn-cream !py-2 !px-4 text-sm">
                Throw again
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center font-pixel text-[10px] text-ink-mute pt-6">
            {phase === "shaking" ? "Wobble... wobble..." : "Tap the ball to catch a deal"}
            <span className="block mt-2 text-poke animate-bounce">▼</span>
          </p>
        )}
      </div>
    </div>
  );
}
