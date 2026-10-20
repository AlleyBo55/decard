"use client";

import { useRef, useState } from "react";
import { cardImage } from "@/lib/constants";

/**
 * The slab on a display stand: pointer tilt, holo glare, tap to flip.
 * Slab photos are about 3:5, so the frame uses that ratio and the image fills
 * an absolutely sized box (object-contain), which can never overflow.
 */
export function CardFlip({
  mint,
  name,
  images,
}: {
  mint: string;
  name: string;
  /** Card detail images: direct, year-cached URLs instead of the 5-minute redirect. */
  images?: Record<string, string> | null;
}) {
  const src = { images };
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "touch") return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.dataset.active = "true";
      el.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
      el.style.setProperty("--mx", `${x * 100}%`);
      el.style.setProperty("--my", `${y * 100}%`);
    });
  }
  function onLeave() {
    cancelAnimationFrame(raf.current);
    const el = tiltRef.current;
    if (!el) return;
    el.dataset.active = "false";
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  const face = "absolute inset-0 rounded-[18px] bg-cream-hi border border-sand p-3 shadow-[var(--shadow-lift)]";
  const img = "block h-full w-full object-contain";

  return (
    <div className="flex flex-col items-center gap-5 select-none">
      <div className="w-[min(100%,340px,38vh)] min-w-[220px]" style={{ perspective: "1400px" }}>
        <div ref={tiltRef} onPointerMove={onMove} onPointerLeave={onLeave} className="holo-card aspect-[3/5] w-full">
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            aria-label={flipped ? "Show front of slab" : "Show back of slab"}
            className="relative block h-full w-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${flipped ? 180 : 0}deg)`,
              transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <span className={face} style={{ backfaceVisibility: "hidden" }}>
              <img
                src={cardImage(mint, "front", 768, src)}
                srcSet={`${cardImage(mint, "front", 512, src)} 512w, ${cardImage(mint, "front", 768, src)} 768w, ${cardImage(mint, "front", 1024, src)} 1024w`}
                sizes="(max-width: 640px) 80vw, 340px"
                alt={name}
                fetchPriority="high"
                className={img}
                draggable={false}
              />
            </span>
            <span className={face} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
              <img
                src={cardImage(mint, "back", 768, src)}
                alt={`${name}, back of slab`}
                loading="lazy"
                className={img}
                draggable={false}
              />
            </span>
          </button>
          <span className="holo-glare rounded-[18px]" aria-hidden />
        </div>
        {/* stand shadow */}
        <div
          aria-hidden
          className="mx-auto mt-4 h-4 w-3/4 rounded-[50%]"
          style={{ background: "radial-gradient(closest-side, rgb(41 38 61 / .28), transparent)" }}
        />
      </div>
      <button type="button" onClick={() => setFlipped((f) => !f)} className="btn btn-cream !py-2 text-sm">
        ↻ Flip slab
      </button>
    </div>
  );
}
