"use client";

import { useRef, useState } from "react";
import { cardImage } from "@/lib/constants";

export function CardFlip({ mint, name }: { mint: string; name: string }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });
  const wrap = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ x: (py - 0.5) * -12, y: (px - 0.5) * 12 });
    setSheen({ x: px * 100, y: py * 100 });
  }
  function reset() {
    setTilt({ x: 0, y: 0 });
    setSheen({ x: 50, y: 50 });
  }

  return (
    <div className="flex flex-col items-center gap-3 select-none">
      <div
        ref={wrap}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ perspective: "1200px" }}
        className="w-full max-w-[360px] aspect-[71/100]"
      >
        <div
          onClick={() => setFlipped((f) => !f)}
          className="relative h-full w-full cursor-pointer transition-transform duration-500 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${tilt.x}deg) rotateY(${flipped ? 180 + tilt.y : tilt.y}deg)`,
          }}
        >
          {/* front — slab shown whole (object-contain) inside a Game Boy-style bezel */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-b from-panel-2 to-panel p-2.5"
            style={{
              backfaceVisibility: "hidden",
              boxShadow: "inset 0 0 0 2px var(--color-line), inset 0 0 0 5px rgba(0,0,0,0.3)",
            }}
          >
            <div className="relative h-full w-full rounded-lg overflow-hidden bg-black/40 grid place-items-center">
              <img
                src={cardImage(mint, "front", 768)}
                alt={name}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
              <div
                className="holo absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.3), transparent 45%)`,
                }}
              />
            </div>
          </div>
          {/* back */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-b from-panel-2 to-panel p-2.5"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              boxShadow: "inset 0 0 0 2px var(--color-line), inset 0 0 0 5px rgba(0,0,0,0.3)",
            }}
          >
            <div className="h-full w-full rounded-lg overflow-hidden bg-black/40 grid place-items-center">
              <img
                src={cardImage(mint, "back", 768)}
                alt={`${name} back`}
                className="max-h-full max-w-full object-contain"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="pixel text-[10px] text-muted hover:text-dex-yellow"
      >
        ↻ tap to flip
      </button>
    </div>
  );
}
