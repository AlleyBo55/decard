import type { UniverseId } from "./universes";

/** One small, original mark per universe: no franchise logos. */
export function Emblem({ id, className }: { id: UniverseId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className ?? "h-5 w-5"}>
      {SHAPES[id]}
    </svg>
  );
}

const ink = "currentColor";

const SHAPES: Record<UniverseId, React.ReactNode> = {
  pokemon: (
    <g fill="none" stroke={ink} strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h6m6 0h6" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3.2 11a9 9 0 0 1 17.6 0z" fill={ink} stroke="none" opacity=".9" />
    </g>
  ),
  onepiece: (
    <g fill={ink}>
      <ellipse cx="12" cy="15.5" rx="10.5" ry="3.2" opacity=".9" />
      <path d="M6.5 15c0-4.6 2.4-8 5.5-8s5.5 3.4 5.5 8z" />
      <path d="M6.8 13.2h10.4v1.9H6.8z" fill="#e3350d" />
    </g>
  ),
  dragonball: (
    <g>
      <circle cx="12" cy="12" r="9.5" fill={ink} />
      <circle cx="9" cy="8.5" r="2.4" fill="#fff" opacity=".55" />
      <path d="m12 7.6 1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z" fill="#e3350d" />
    </g>
  ),
  riftbound: (
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M12 2.5 20 9l-8 12.5L4 9z" />
      <path d="M4 9h16M12 2.5 9 9l3 12.5L15 9z" />
    </g>
  ),
  lorcana: (
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round">
      <path d="m12 2 8.5 5v10L12 22l-8.5-5V7z" />
      <path d="M12 6.5c1.6 2.4 3.4 3.6 3.4 5.9a3.4 3.4 0 0 1-6.8 0c0-2.3 1.8-3.5 3.4-5.9z" fill={ink} />
    </g>
  ),
  basketball: (
    <g fill="none" stroke={ink} strokeWidth="1.8">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5v19M5.3 5.3c3 2.7 3 10.7 0 13.4M18.7 5.3c-3 2.7-3 10.7 0 13.4" />
    </g>
  ),
  football: (
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round">
      <path d="M4.2 19.8C2.6 13 8 4.6 19.8 4.2c1.6 6.8-3.8 15.2-15.6 15.6z" fill={ink} fillOpacity=".18" />
      <path d="m9 15 6-6m-4.6 1.6 1.4 1.4m.4-3 1.4 1.4m-4.6 1.6 1.4 1.4" />
    </g>
  ),
  baseball: (
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M6 4.6c2.6 2.2 3.6 4.9 3.6 7.4S8.6 17.2 6 19.4M18 4.6c-2.6 2.2-3.6 4.9-3.6 7.4s1 5.2 3.6 7.4" />
      <path d="m7.4 7.6 1.5-.5m-.5 3 1.6-.2m-1.6 3.1 1.6.2m-1.1 3 1.5.5m6.8-9.1-1.5-.5m.5 3-1.6-.2m1.6 3.1-1.6.2m1.1 3-1.5.5" strokeWidth="1.2" />
    </g>
  ),
  soccer: (
    <g fill="none" stroke={ink} strokeWidth="1.6" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9.5" />
      <path d="m12 7.6 3.6 2.6-1.4 4.2H9.8l-1.4-4.2z" fill={ink} />
      <path d="M12 7.6V2.6m3.6 7.6 4.8-1.6m-6.2 5.8 2.8 4.2m-7.2-4.2-2.8 4.2m1.4-8-4.8-1.6" />
    </g>
  ),
  sports: (
    <g fill="none" stroke={ink} strokeWidth="1.8" strokeLinejoin="round">
      <path d="M7 3.5h10v5a5 5 0 0 1-10 0z" fill={ink} fillOpacity=".25" />
      <path d="M7 5H3.5a3.5 3.5 0 0 0 3.8 4.4M17 5h3.5a3.5 3.5 0 0 1-3.8 4.4M12 13.5v4m-4 3h8l-1-3h-6z" />
    </g>
  ),
};
