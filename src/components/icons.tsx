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

/** Chevron — disclosure caret on menu triggers. */
export function Chevron({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

/** Four tiles — the "More" menu. */
export function MenuGrid({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <rect x="4" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" />
      <circle cx="16.75" cy="16.75" r="3.4" />
    </svg>
  );
}

/** Cross — close a sheet or dialog. */
export function Close({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/** Trophy — leaderboards. */
export function Trophy({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 4h9v4.5a4.5 4.5 0 0 1-9 0V4Z" />
      <path d="M7.5 6H4.5a3 3 0 0 0 3.4 3.5M16.5 6h3a3 3 0 0 1-3.4 3.5" />
      <path d="M12 13v3.5M8.5 20h7M10 16.5h4l.4 3.5H9.6l.4-3.5Z" />
    </svg>
  );
}

/** Parcel — shipping a card home. */
export function Parcel({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4v-9Z" />
      <path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9" />
      <path d="m7.75 5.5 8.5 4v3" />
    </svg>
  );
}

/** Coin with a C — the $CARDS token. */
export function TokenCoin({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6.2" strokeOpacity="0.45" />
      <path d="M14.4 9.6a3.2 3.2 0 1 0 0 4.8" />
    </svg>
  );
}

/** Graded slab — a card in its case, label on top. */
export function Slab({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <rect x="5.5" y="2.5" width="13" height="19" rx="2" />
      <path d="M5.5 7h13" />
      <rect x="8" y="9.5" width="8" height="9.5" rx="1" />
    </svg>
  );
}

/** Vault door — cards held in custody. */
export function Vault({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4" width="17" height="14.5" rx="2" />
      <circle cx="12" cy="11.25" r="3.6" />
      <path d="M12 7.65v1.4M12 13.45v1.4M8.4 11.25h1.4M14.2 11.25h1.4M7 18.5V20M17 18.5V20" />
    </svg>
  );
}
