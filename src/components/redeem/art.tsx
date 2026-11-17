import { useId } from "react";

// Original drawings for the redeem journey: the seven route badges, the slab that travels, the
// home pin, the vault and the house. Plain SVG, no external art.

export type BadgeKind = "checkin" | "party" | "region" | "home" | "review" | "release" | "journey";

const BADGE: Record<BadgeKind, { hi: string; lo: string; shape: string }> = {
  // Hexagon
  checkin: { hi: "#7ff3e3", lo: "#0f8a87", shape: "M24 3 42 13.5v21L24 45 6 34.5v-21Z" },
  // Rounded diamond
  party: { hi: "#ffe58a", lo: "#d98a00", shape: "M24 3.5c1.6 0 2.4.7 3.6 1.9L42.6 20.4c2.2 2.2 2.2 5 0 7.2L27.6 42.6c-2 2-5.2 2-7.2 0L5.4 27.6c-2.2-2.2-2.2-5 0-7.2L20.4 5.4c1.2-1.2 2-1.9 3.6-1.9Z" },
  // Twelve-notch ring
  region: {
    hi: "#9fd4ff",
    lo: "#1b5bb0",
    shape:
      "M24 2.5l3.4 3.2 4.5-1 1.6 4.3 4.4 1.4-.5 4.6 3.5 3-2.2 4 2.2 4-3.5 3 .5 4.6-4.4 1.4-1.6 4.3-4.5-1-3.4 3.2-3.4-3.2-4.5 1-1.6-4.3-4.4-1.4.5-4.6-3.5-3 2.2-4-2.2-4 3.5-3-.5-4.6 4.4-1.4 1.6-4.3 4.5 1Z",
  },
  // Shield with a gable
  home: { hi: "#a9f5b4", lo: "#23894d", shape: "M24 3 43 17v12.5C43 37 34 43 24 45 14 43 5 37 5 29.5V17Z" },
  // Four-point compass star
  review: { hi: "#ffd08a", lo: "#d9560f", shape: "M24 2 29 17.5 45 24 29 30.5 24 46 19 30.5 3 24 19 17.5Z" },
  // Scalloped wax seal
  release: {
    hi: "#ff9a9a",
    lo: "#a3112a",
    shape:
      "M24 3c2.3 0 3.4 2.2 5.5 2.6 2.2.4 4.1-1.2 6.1-.2 2 1 2 3.4 3.5 5 1.6 1.5 4 1.6 5 3.6.9 2-.6 3.9-.2 6.1.4 2.1 2.6 3.2 2.6 5.5s-2.2 3.4-2.6 5.5c-.4 2.2 1.1 4.1.2 6.1-1 2-3.4 2-5 3.5-1.5 1.6-1.6 4-3.5 5-2 .9-3.9-.6-6.1-.2-2.1.4-3.2 2.6-5.5 2.6s-3.4-2.2-5.5-2.6c-2.2-.4-4.1 1.1-6.1.2-2-1-2-3.4-3.5-5-1.6-1.5-4-1.6-5-3.5-.9-2 .6-3.9.2-6.1C4.2 30.4 2 29.3 2 27s2.2-3.4 2.6-5.5c.4-2.2-1.1-4.1-.2-6.1 1-2 3.4-2 5-3.6 1.5-1.6 1.6-4 3.5-5 2-.9 3.9.6 6.1.2C20.6 5.2 21.7 3 24 3Z",
  },
  // Swept wing
  journey: { hi: "#dcc2ff", lo: "#5a33c4", shape: "M5 9c9-4 20-5 30-1.5 4 1.4 7.4 4.6 8 8.8.9 6.4-2.4 12.7-6.6 17.4C31.7 39.1 25 43 18.5 44.5 13.8 37 9.7 28.6 7 20.3 5.9 16.6 5.2 12.8 5 9Z" },
};

function Emblem({ kind }: { kind: BadgeKind }) {
  const p = { fill: "none", stroke: "#fff", strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (kind) {
    case "checkin":
      return (
        <g {...p}>
          <circle cx="18.5" cy="21" r="5.5" />
          <path d="M23.5 23.5 33 33m-4.2-4.2 2.6-2.6m.2 6.8 2.4-2.4" />
        </g>
      );
    case "party":
      return (
        <g {...p}>
          <rect x="15.5" y="14" width="12" height="17" rx="2" transform="rotate(-10 21.5 22.5)" />
          <rect x="20.5" y="16" width="12" height="17" rx="2" fill="rgb(255 255 255 / 0.35)" transform="rotate(8 26.5 24.5)" />
        </g>
      );
    case "region":
      return (
        <g {...p}>
          <circle cx="24" cy="24" r="9" />
          <path d="M15 24h18M24 15c-3.6 4.6-3.6 13.4 0 18m0-18c3.6 4.6 3.6 13.4 0 18" strokeWidth="2.1" />
        </g>
      );
    case "home":
      return (
        <g {...p}>
          <path d="m15 24 9-7.5 9 7.5" />
          <path d="M17.5 22v10h13V22" />
          <path d="M22 32v-5h4v5" strokeWidth="2.1" />
        </g>
      );
    case "review":
      return (
        <g {...p} strokeWidth={2.3}>
          <circle cx="24" cy="24" r="7.5" />
          <path d="m27.5 20.5-2.2 4.8-4.8 2.2 2.2-4.8Z" fill="#fff" />
        </g>
      );
    case "release":
      return (
        <g {...p}>
          <path d="M24 14.5c3.4 3.6 6.5 7 6.5 11.2a6.5 6.5 0 0 1-13 0c0-2.1.9-3.7 2.2-5 .3 1.9 1.3 3 2.6 3.3-.6-3.2.3-6.4 1.7-9.5Z" fill="rgb(255 255 255 / 0.3)" />
        </g>
      );
    case "journey":
      return (
        <g {...p}>
          <path d="M14.5 20.5 34 14l-6.5 19.5-4.2-8.8Z" fill="rgb(255 255 255 / 0.3)" />
          <path d="m23.3 24.7 4.6-4.6" strokeWidth="2.1" />
        </g>
      );
  }
}

/** A route badge: a metal emblem per step, greyed out until the step is reached. */
export function Badge({ kind, size = 44, dim = false, className }: { kind: BadgeKind; size?: number; dim?: boolean; className?: string }) {
  const id = useId();
  const b = BADGE[kind];
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden data-dim={dim || undefined}>
      <defs>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={dim ? "#5d6a88" : b.hi} />
          <stop offset="1" stopColor={dim ? "#2a3350" : b.lo} />
        </linearGradient>
      </defs>
      <path d={b.shape} fill={`url(#${id}m)`} stroke="#0b1430" strokeWidth="2.4" strokeLinejoin="round" />
      <path d={b.shape} fill="none" stroke="rgb(255 255 255 / 0.55)" strokeWidth="1.2" transform="translate(24 24) scale(0.84) translate(-24 -24)" />
      <ellipse cx="17" cy="13" rx="8" ry="4" fill="rgb(255 255 255 / 0.32)" transform="rotate(-24 17 13)" />
      <g opacity={dim ? 0.55 : 1}>
        <Emblem kind={kind} />
      </g>
    </svg>
  );
}

/** The traveler: a little graded slab, label up, holo window catching the light. */
export function SlabMarker({ size = 34, className }: { size?: number; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 34 46" width={size} height={(size * 46) / 34} className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}h`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7cd4ff" />
          <stop offset="0.45" stopColor="#b48cff" />
          <stop offset="0.75" stopColor="#ff9fd2" />
          <stop offset="1" stopColor="#ffe07a" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="30" height="42" rx="4.5" fill="#f4f8ff" stroke="#0b1430" strokeWidth="2.4" />
      <rect x="5.5" y="5.5" width="23" height="7.5" rx="1.8" fill="#ff5a47" stroke="#0b1430" strokeWidth="1.6" />
      <path d="M8.5 9.2h9.5M21 9.2h4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="6.5" y="16" width="21" height="24.5" rx="2" fill={`url(#${id}h)`} stroke="#0b1430" strokeWidth="1.6" />
      <path d="m17 21.5 1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5Z" fill="#fff" opacity="0.92" />
      <path d="M9 18.5 13 18.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** The destination pin. */
export function HomePin({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 28 38" width={size} height={(size * 38) / 28} className={className} aria-hidden>
      <path d="M14 36.5C9 29.6 2.5 22.6 2.5 14a11.5 11.5 0 0 1 23 0c0 8.6-6.5 15.6-11.5 22.5Z" fill="#ff5a47" stroke="#0b1430" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M2.9 14.5h22.2" stroke="#0b1430" strokeWidth="2.2" />
      <path d="M3.4 15.6c.9 6 5 11.4 10.6 18.6 5.6-7.2 9.7-12.6 10.6-18.6Z" fill="#fff8e6" />
      <circle cx="14" cy="14.5" r="4.2" fill="#fff8e6" stroke="#0b1430" strokeWidth="2.2" />
      <ellipse cx="9.5" cy="8.6" rx="3.2" ry="1.7" fill="rgb(255 255 255 / 0.5)" transform="rotate(-30 9.5 8.6)" />
    </svg>
  );
}

/** Where every slab waits: a squat vault with a round door. Drawn into a parent <svg>. */
export function VaultArt({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden>
      <ellipse cx="0" cy="36" rx="46" ry="7" fill="rgb(0 0 0 / 0.28)" />
      <path d="M-40 -6 0 -30 40 -6Z" fill="#c9d6f2" stroke="#0b1430" strokeWidth="3" strokeLinejoin="round" />
      <rect x="-36" y="-6" width="72" height="42" rx="3" fill="#e9effc" stroke="#0b1430" strokeWidth="3" />
      <rect x="-36" y="-6" width="72" height="7" fill="#9fb2db" stroke="#0b1430" strokeWidth="3" />
      <circle cx="0" cy="17" r="14" fill="#7d8fb8" stroke="#0b1430" strokeWidth="3" />
      <circle cx="0" cy="17" r="8.5" fill="#ffd75e" stroke="#0b1430" strokeWidth="2.5" />
      <path d="M0 8.5v17M-8.5 17h17M-6 11l12 12M6 11-6 23" stroke="#0b1430" strokeWidth="1.8" />
      <circle cx="0" cy="17" r="2.6" fill="#0b1430" />
      <rect x="-30" y="5" width="8" height="10" rx="1.5" fill="#8ec5ff" stroke="#0b1430" strokeWidth="2" />
      <rect x="22" y="5" width="8" height="10" rx="1.5" fill="#8ec5ff" stroke="#0b1430" strokeWidth="2" />
    </g>
  );
}

/** The trainer's house, flag up. Drawn into a parent <svg>. */
export function HouseArt({ x, y, scale = 1, lit = false }: { x: number; y: number; scale?: number; lit?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden>
      <ellipse cx="0" cy="34" rx="40" ry="6.5" fill="rgb(0 0 0 / 0.28)" />
      <rect x="14" y="-30" width="8" height="16" fill="#b9573e" stroke="#0b1430" strokeWidth="2.6" />
      <path d="M-34 -2 0 -30 34 -2Z" fill="#ff5a47" stroke="#0b1430" strokeWidth="3" strokeLinejoin="round" />
      <rect x="-28" y="-4" width="56" height="38" rx="3" fill="#fff4dc" stroke="#0b1430" strokeWidth="3" />
      <rect x="-8" y="12" width="16" height="22" rx="2" fill="#5a7bd8" stroke="#0b1430" strokeWidth="2.6" />
      <circle cx="4" cy="23" r="1.6" fill="#ffd75e" />
      <rect x="-23" y="4" width="11" height="10" rx="1.5" fill={lit ? "#ffd75e" : "#8ec5ff"} stroke="#0b1430" strokeWidth="2.2" />
      <rect x="12" y="4" width="11" height="10" rx="1.5" fill={lit ? "#ffd75e" : "#8ec5ff"} stroke="#0b1430" strokeWidth="2.2" />
      <path d="M-30 -2v-34" stroke="#0b1430" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M-30 -36h16l-4 5 4 5h-16Z" fill="#ffd75e" stroke="#0b1430" strokeWidth="2.2" strokeLinejoin="round" />
    </g>
  );
}
