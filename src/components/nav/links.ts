import type { ComponentType } from "react";
import { Books, Coins, Parcel, Pokeball, Pulse, Slab, Sparkle, Target, TokenCoin, Trophy, Vault } from "@/components/icons";
import { isHiddenPage } from "@/lib/hidden-pages";
import { stripLocale } from "@/lib/i18n";

// The site map behind the header, the More sheet and the active states. Home is the logo;
// Scanner and Guide are plain links; everything else lives in a group.

export type NavItem = {
  href: string;
  title: string;
  desc: string;
  Icon: ComponentType<{ className?: string }>;
  fresh?: boolean;
};

export type NavGroup = { id: "market" | "play"; label: string; blurb: string; items: NavItem[] };

export const MARKET: NavGroup = {
  id: "market",
  label: "Market",
  blurb: "Prices and trades",
  items: [
    { href: "/tape", title: "Live tape", desc: "Every on-chain sale, listing and bid", Icon: Pulse },
    { href: "/sales", title: "Recent sales", desc: "Settled sales by card, grade and price", Icon: Coins },
    { href: "/cards", title: "Card directory", desc: "Every listed slab by name, set and grade", Icon: Slab },
    { href: "/pokemon", title: "Pokémon prices", desc: "Graded price guides for each Pokémon", Icon: Pokeball },
    { href: "/cards-token", title: "$CARDS token", desc: "Price, buybacks and burns", Icon: TokenCoin },
  ].filter((item) => !isHiddenPage(item.href)),
};

// The first item is Rip, the panel's featured card.
export const PLAY: NavGroup = {
  id: "play",
  label: "Play",
  blurb: "Packs and pulls",
  items: [
    { href: "/rip", title: "Rip packs", desc: "A real graded slab in every pack", Icon: Pokeball, fresh: true },
    { href: "/gym", title: "Rip Gym", desc: "Leaderboards and pack odds", Icon: Trophy },
    { href: "/redeem", title: "Redeem a slab", desc: "Ship the real card home", Icon: Parcel },
    { href: "/luck#live", title: "Live gacha", desc: "Every gacha pull as it lands", Icon: Sparkle },
    { href: "/luck", title: "Pull luck analyzer", desc: "Score a wallet's pulls against the odds", Icon: Target },
  ],
};

export const LEARN: { label: string; items: NavItem[] } = {
  label: "Learn",
  items: [
    { href: "/guide", title: "Guide", desc: "Grading, rarity and collector slang", Icon: Books },
    { href: "/topics", title: "Topics", desc: "PSA, CGC, venues, sports and rips", Icon: Books },
    { href: "/tokenized-trading-cards", title: "Tokenized cards explained", desc: "How vaulted slabs trade on Solana", Icon: Vault },
  ],
};

export const GROUPS = [MARKET, PLAY];

/** True when `pathname` is `href` or below it. `/cards` is not on `/cards-token`. */
export function onPath(pathname: string, href: string): boolean {
  const path = stripLocale(pathname);
  const base = href.split("#")[0].split("?")[0];
  if (base === "/") return path === "/";
  return path === base || path.startsWith(`${base}/`);
}

/** The link to mark aria-current. A #hash link never is: the path can't tell which section is in view. */
export function isCurrent(pathname: string, href: string): boolean {
  return !href.includes("#") && onPath(pathname, href);
}

export function inGroup(pathname: string, items: NavItem[]): boolean {
  return items.some((i) => onPath(pathname, i.href));
}

// The Rip world (components/rip/rip.css .rw) and the pages built on it.
const DARK_WORLDS = ["/rip", "/gym", "/redeem"];

export function isDarkPath(pathname: string): boolean {
  return DARK_WORLDS.some((p) => onPath(pathname, p));
}
