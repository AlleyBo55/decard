// Original Pokémon-flavored icon set. All hand-drawn geometry — no copyrighted
// sprites or trademarks. Each takes a className for sizing/color.

type P = { className?: string };

/** Classic Poké ball. */
export function Pokeball({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M3 12h6a3 3 0 0 1 6 0h6" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
    </svg>
  );
}

/** Pokédex device — the home/catalogue icon. */
export function Pokedex({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="8.5" cy="7.5" r="1.6" />
      <circle cx="12.5" cy="7.5" r="0.7" />
      <circle cx="15" cy="7.5" r="0.7" />
      <rect x="7" y="12" width="10" height="5" rx="1" />
    </svg>
  );
}

/** Town map — the scanner/explore icon. */
export function TownMap({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

/** Pulse / tape — the live activity icon. */
export function Pulse({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}

/** Magnifier with a Poké ball lens — search. */
export function BallSearch({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M4 10.5h4.2a2.3 2.3 0 0 1 4.6 0H17" />
      <path d="m20 20-4.3-4.3" />
    </svg>
  );
}

/** Flame badge — hot/best deals. */
export function Flame({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2c1 3-1 4-2 6-1 1.8-.3 3 .8 3.6.8.4 1.2-.2 1.2-1 1.6 1 2 2.6 1.4 4-1 2.3-3.6 3-5.7 2C5 15.6 5 11 8 8c.3 2 1.6 2.4 2 1.4C10.8 7.4 9.6 4.4 12 2Z" />
    </svg>
  );
}

/** Sparkle — new / just listed. */
export function Sparkle({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}

/** Gem — top listings / rare. */
export function Gem({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M6 3h12l3 5-9 13L3 8l3-5Z" />
      <path d="M3 8h18M9 3 7 8l5 13 5-13-2-5" />
    </svg>
  );
}

/** Coin stack — sales / money. */
export function Coins({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

/** Target — offers. */
export function Target({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Books — categories. */
export function Books({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 5c2-1 5-1 7 0v14c-2-1-5-1-7 0V5Z" />
      <path d="M20 5c-2-1-5-1-7 0v14c2-1 5-1 7 0V5Z" />
    </svg>
  );
}
