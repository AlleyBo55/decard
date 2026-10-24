import { shortCardName } from "./format";

export interface PokemonHub {
  slug: string;
  name: string;
  /** Card names that contain the Pokémon without being its card, e.g. the Eevee Heroes set. */
  exclude?: RegExp;
}

// Curated on purpose: each Pokémon here had roughly 50 or more graded listings on
// Collector Crypt in October 2026, so every page has real prices to show. A page per
// catalogue name would mostly hold a single card (thin, near-duplicate pages).
export const POKEMON_HUBS: PokemonHub[] = [
  { slug: "charizard", name: "Charizard" },
  { slug: "pikachu", name: "Pikachu" },
  { slug: "gengar", name: "Gengar" },
  { slug: "eevee", name: "Eevee", exclude: /eevee heroes/i },
  { slug: "mewtwo", name: "Mewtwo" },
  { slug: "umbreon", name: "Umbreon" },
  { slug: "blastoise", name: "Blastoise" },
  { slug: "venusaur", name: "Venusaur" },
  { slug: "moltres", name: "Moltres" },
  { slug: "zapdos", name: "Zapdos" },
  { slug: "articuno", name: "Articuno" },
  { slug: "bulbasaur", name: "Bulbasaur" },
  { slug: "charmander", name: "Charmander" },
  { slug: "squirtle", name: "Squirtle" },
  { slug: "gardevoir", name: "Gardevoir" },
  { slug: "snorlax", name: "Snorlax" },
  { slug: "lugia", name: "Lugia" },
  { slug: "lucario", name: "Lucario" },
  { slug: "gyarados", name: "Gyarados" },
  { slug: "rayquaza", name: "Rayquaza" },
  { slug: "greninja", name: "Greninja" },
  { slug: "alakazam", name: "Alakazam" },
  { slug: "ho-oh", name: "Ho-Oh" },
  { slug: "dragonite", name: "Dragonite" },
  { slug: "tyranitar", name: "Tyranitar" },
  { slug: "raichu", name: "Raichu" },
  { slug: "mimikyu", name: "Mimikyu" },
  { slug: "espeon", name: "Espeon" },
  { slug: "vaporeon", name: "Vaporeon" },
  { slug: "jolteon", name: "Jolteon" },
  { slug: "flareon", name: "Flareon" },
  { slug: "leafeon", name: "Leafeon" },
  { slug: "glaceon", name: "Glaceon" },
  { slug: "sylveon", name: "Sylveon" },
  { slug: "lapras", name: "Lapras" },
  { slug: "ninetales", name: "Ninetales" },
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Whole-word match, so "Mewtwo" never counts as "Mew" and "Raichu" stays out of "Pikachu".
const PATTERNS = new Map(POKEMON_HUBS.map((hub) => [hub.slug, new RegExp(`\\b${escape(hub.name)}\\b`, "i")]));

export function hubBySlug(slug: string): PokemonHub | null {
  return POKEMON_HUBS.find((hub) => hub.slug === slug) ?? null;
}

/**
 * True when the card's own name (the part before the grade) names this Pokémon.
 * Marketplace search also matches set names, so "Eevee" alone would pull in every
 * card from the Eevee Heroes set.
 */
export function matchesHub(hub: PokemonHub, itemName: string): boolean {
  const name = shortCardName(itemName);
  return (PATTERNS.get(hub.slug)?.test(name) ?? false) && !hub.exclude?.test(name);
}

/** The first price guide whose Pokémon this card names, for linking a card page to it. */
export function hubForName(itemName: string): PokemonHub | null {
  return POKEMON_HUBS.find((hub) => matchesHub(hub, itemName)) ?? null;
}
