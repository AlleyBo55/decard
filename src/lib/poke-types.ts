// Each card category is shown as a Pokémon-style "type". Colours follow the
// widely used fan palette for types; `fg` is chosen per colour for contrast.

export type PokeType =
  | "electric"
  | "water"
  | "fire"
  | "grass"
  | "psychic"
  | "fighting"
  | "dragon"
  | "fairy"
  | "ghost"
  | "dark"
  | "steel"
  | "ground"
  | "flying"
  | "normal";

export const TYPES: Record<PokeType, { label: string; color: string; fg: string }> = {
  electric: { label: "Electric", color: "#F7D02C", fg: "#29263D" },
  water: { label: "Water", color: "#6390F0", fg: "#29263D" },
  fire: { label: "Fire", color: "#EE8130", fg: "#29263D" },
  grass: { label: "Grass", color: "#7AC74C", fg: "#29263D" },
  psychic: { label: "Psychic", color: "#F95587", fg: "#29263D" },
  fighting: { label: "Fighting", color: "#C22E28", fg: "#FFFFFF" },
  dragon: { label: "Dragon", color: "#6F35FC", fg: "#FFFFFF" },
  fairy: { label: "Fairy", color: "#D685AD", fg: "#29263D" },
  ghost: { label: "Ghost", color: "#735797", fg: "#FFFFFF" },
  dark: { label: "Dark", color: "#705746", fg: "#FFFFFF" },
  steel: { label: "Steel", color: "#B7B7CE", fg: "#29263D" },
  ground: { label: "Ground", color: "#E2BF65", fg: "#29263D" },
  flying: { label: "Flying", color: "#A98FF3", fg: "#29263D" },
  normal: { label: "Normal", color: "#A8A77A", fg: "#29263D" },
};

const CATEGORY_TYPE: Record<string, PokeType> = {
  pokemon: "electric",
  "one piece": "water",
  riftbound: "dragon",
  "dragon ball": "fighting",
  lorcana: "fairy",
  "magic the gathering": "ghost",
  "yu-gi-oh!": "dark",
  "yu-gi-oh": "dark",
  gundam: "steel",
  "union arena": "psychic",
  marvel: "fire",
  dc: "fire",
  basketball: "ground",
  football: "ground",
  baseball: "ground",
  soccer: "grass",
  hockey: "steel",
  moonbirds: "flying",
};

export function typeFor(category: string | null | undefined): PokeType {
  return CATEGORY_TYPE[(category ?? "").toLowerCase()] ?? "normal";
}

/** The categories surfaced as primary filters, in display order. */
export const PRIMARY_CATEGORIES = [
  "Pokemon",
  "One Piece",
  "Riftbound",
  "Dragon Ball",
  "Lorcana",
  "Magic The Gathering",
  "Yu-Gi-Oh!",
  "Gundam",
  "Basketball",
  "Football",
  "Baseball",
  "Soccer",
];
