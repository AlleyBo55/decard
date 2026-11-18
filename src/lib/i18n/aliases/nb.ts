// Norwegian Bokmål names for the subjects in ./entities.ts, keyed by entity key. Rules: the top of entities.ts.
// Norwegian keeps the English Pokémon names, so none are listed here.
export const names: Record<string, string[]> = {
  // Franchise names and the abbreviations Norwegian players type.
  "franchise:one-piece": ["OPCG"],
  "franchise:dragon-ball": ["DBSCG"],
  "franchise:magic-the-gathering": ["MTG"],
  "franchise:soccer": ["Fotball"],
  "franchise:football": ["Amerikansk fotball"],
  "franchise:hockey": ["Ishockey"],

  // Disney: the Norwegian names.
  "mickey-mouse": ["Mikke Mus"],
  "snow-white": ["Snøhvit"],
  "tinker-bell": ["Tingeling"],
};

export const fillers: string[] = [
  "kort",
  "samlekort",
  "kortspill",
  "pris",
  "verdi",
  "verdt",
  "kjøpe",
  "selge",
  "gradert",
  "japansk",
  "japanske",
  "engelsk",
  "engelske",
  "norsk",
];
