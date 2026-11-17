import art from "@/lib/rip/art.json";
import type { RipPack } from "@/lib/rip/types";

// Every Slabz pack belongs to a universe, and each universe dresses the whole rip in its own
// world: arena, intro, reveal frame and shout. Colours are tuned for the dark arenas.

export type UniverseId =
  | "pokemon"
  | "onepiece"
  | "dragonball"
  | "riftbound"
  | "lorcana"
  | "basketball"
  | "football"
  | "baseball"
  | "soccer"
  | "sports";

/** The result frame around a revealed card. */
export type Frame = "dex" | "wanted" | "scouter" | "rift" | "ink" | "jumbotron";

export interface Universe {
  id: UniverseId;
  name: string;
  /** Primary colour (buttons, chips) and the aura colour. */
  ink: string;
  glow: string;
  /** The reveal shout; {name} is the card's short name. */
  cry: string;
  frame: Frame;
  /** How the cutscene opens: Game Boy bars, a sail-like wipe, or a camera flash. */
  intro: "bars" | "wipe" | "flash";
  /** What the reveal calls the card's value. */
  valueLabel: string;
  tagline: string;
}

// cry, valueLabel and tagline are English data: the rip page shows strings/<locale>/rip.ts universes.
export const UNIVERSES: readonly Universe[] = [
  { id: "pokemon", name: "Pokémon", ink: "#e3350d", glow: "#ffcb05", cry: "Gotcha! {name} was caught!", frame: "dex", intro: "bars", valueLabel: "Insured value", tagline: "Throw a ball. Catch a slab." },
  { id: "onepiece", name: "One Piece", ink: "#1f6fd1", glow: "#ffd34d", cry: "A new bounty! {name}!", frame: "wanted", intro: "wipe", valueLabel: "Bounty", tagline: "Set sail for the One Piece." },
  { id: "dragonball", name: "Dragon Ball", ink: "#f2701f", glow: "#ffe14d", cry: "Power up! {name}!", frame: "scouter", intro: "flash", valueLabel: "Power level", tagline: "Charge it past 9,000." },
  { id: "riftbound", name: "Riftbound", ink: "#21a6b8", glow: "#d4aa4f", cry: "Summoned from the Rift: {name}!", frame: "rift", intro: "wipe", valueLabel: "Rift value", tagline: "The Rift is open." },
  { id: "lorcana", name: "Lorcana", ink: "#7247d1", glow: "#f2c14e", cry: "Inked! {name} joins your lore.", frame: "ink", intro: "wipe", valueLabel: "Lore value", tagline: "Ink something legendary." },
  { id: "basketball", name: "Basketball", ink: "#e8682a", glow: "#ffb547", cry: "Swish! {name}!", frame: "jumbotron", intro: "flash", valueLabel: "Card value", tagline: "Nothing but net." },
  { id: "football", name: "Football", ink: "#8a5a32", glow: "#ffe08a", cry: "Touchdown! {name}!", frame: "jumbotron", intro: "flash", valueLabel: "Card value", tagline: "Go long." },
  { id: "baseball", name: "Baseball", ink: "#c8213a", glow: "#fff1c2", cry: "Home run! {name}!", frame: "jumbotron", intro: "flash", valueLabel: "Card value", tagline: "Swing for the fences." },
  { id: "soccer", name: "Soccer", ink: "#1f9d55", glow: "#d9ff5c", cry: "GOOOAL! {name}!", frame: "jumbotron", intro: "flash", valueLabel: "Card value", tagline: "Top bins." },
  { id: "sports", name: "Sports", ink: "#4a5a80", glow: "#ffd34d", cry: "Big play! {name}!", frame: "jumbotron", intro: "flash", valueLabel: "Card value", tagline: "Every sport, one rip." },
];

const BY_ID = Object.fromEntries(UNIVERSES.map((u) => [u.id, u])) as Record<UniverseId, Universe>;
export const universeById = (id: UniverseId) => BY_ID[id];

/** pokemon_50 → Pokémon; sports and multi-sport packs → Sports. Unknown types fall back to Pokémon. */
export function universeOf(packType: string): Universe {
  const t = packType.toLowerCase();
  const hit = UNIVERSES.find((u) => u.id !== "sports" && t.startsWith(u.id));
  return hit ?? (t.includes("sport") ? BY_ID.sports : BY_ID.pokemon);
}

export interface PackArt {
  src: string;
  small: string;
  w: number;
  h: number;
  accent: string;
}

const ART = art as Record<string, { w: number; h: number; v: string; accent: string }>;

/** The mirrored Slabz art for a pack type (scripts/rip-art.mjs), or null when it has none. */
export function artOf(packType: string): PackArt | null {
  const a = ART[packType];
  if (!a) return null;
  return { src: `/rip/packs/${packType}.webp?v=${a.v}`, small: `/rip/packs/${packType}-s.webp?v=${a.v}`, w: a.w, h: a.h, accent: a.accent };
}

/** Packs grouped by universe in UNIVERSES order, each group cheapest first. */
export function groupPacks(packs: readonly RipPack[]) {
  const groups = new Map<UniverseId, RipPack[]>();
  for (const p of packs) {
    const id = universeOf(p.type).id;
    groups.set(id, [...(groups.get(id) ?? []), p]);
  }
  return UNIVERSES.filter((u) => groups.has(u.id)).map((u) => ({
    universe: u,
    packs: groups.get(u.id)!.sort((a, b) => a.priceCents - b.priceCents),
  }));
}

/** "Poké 50" → "Poké 50"; Slabz names already read well, this only trims. */
export const packName = (p: Pick<RipPack, "name">) => p.name.trim();

/** A card's shout name: "2023 #063 Abra PSA 10 Japanese" → "ABRA". */
export function shortName(full: string) {
  const skip = /^(PSA|BGS|CGC|SGC|TAG|Holo|Reverse|Pokemon|Pokémon|Japanese|English|Rookie|RC|Auto|Base|Set|Card|Prizm|Chrome|Optic|Topps|Panini|Bowman|Select|Mosaic|Donruss)$/i;
  const words = full.split(/\s+/).filter((w) => /^[A-Za-zÀ-ÿ'.-]{3,}$/.test(w) && !skip.test(w));
  return (words.slice(0, 2).join(" ") || full).toUpperCase();
}

/** The Pokédex number in a card title ("#063" → "063"), when it has one. */
export function dexNumber(full: string) {
  return full.match(/#\s?(\d{1,4})\b/)?.[1]?.padStart(3, "0") ?? null;
}
