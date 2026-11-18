// German names for the subjects in ./entities.ts, keyed by entity key. Rules: the top of entities.ts.
export const names: Record<string, string[]> = {
  // Franchise names and the abbreviations German players type.
  "franchise:one-piece": ["OPCG"],
  "franchise:dragon-ball": ["DBSCG"],
  "franchise:magic-the-gathering": ["MTG"],
  "franchise:soccer": ["Fußball"],
  "franchise:football": ["American Football"],
  "franchise:hockey": ["Eishockey"],

  // Pokémon: the official German names (only those that differ from the English name).
  charizard: ["Glurak"],
  eevee: ["Evoli"],
  mewtwo: ["Mewtu"],
  umbreon: ["Nachtara"],
  venusaur: ["Bisaflor"],
  blastoise: ["Turtok"],
  charmander: ["Glumanda"],
  moltres: ["Lavados"],
  bulbasaur: ["Bisasam"],
  dragonite: ["Dragoran"],
  gardevoir: ["Guardevoir"],
  snorlax: ["Relaxo"],
  squirtle: ["Schiggy"],
  articuno: ["Arktos"],
  psyduck: ["Enton"],
  greninja: ["Quajutsu"],
  gyarados: ["Garados"],
  espeon: ["Psiana"],
  alakazam: ["Simsala"],
  meowth: ["Mauzi"],
  mimikyu: ["Mimigma"],
  jolteon: ["Blitza"],
  sylveon: ["Feelinara"],
  vaporeon: ["Aquana"],
  leafeon: ["Folipurba"],
  tyranitar: ["Despotar"],
  flareon: ["Flamara"],
  glaceon: ["Glaziola"],
  ninetales: ["Vulnona"],

  // One Piece: the German manga and dub renamed Luffy and Zoro.
  luffy: ["Ruffy", "Strohhut-Ruffy"],
  zoro: ["Lorenor Zorro"],

  // Dragon Ball: German dub forms.
  goku: ["Son Goku", "Kakarott"],
  gohan: ["Son Gohan"],
  goten: ["Son Goten"],

  // Yu-Gi-Oh!: German card names.
  "dark-magician": ["Dunkler Magier"],
  "dark-magician-girl": ["Dunkles Magier-Mädchen"],
  "blue-eyes-white-dragon": ["Blauäugiger weißer Drache"],
  "red-eyes-black-dragon": ["Rotäugiger schwarzer Drache"],
  "slifer-the-sky-dragon": ["Slifer der Himmelsdrache"],
  "winged-dragon-of-ra": ["Der geflügelte Drache von Ra"],

  // Lord of the Rings and Magic cards in German.
  "the-one-ring": ["Der Eine Ring"],
  "black-lotus": ["Schwarzer Lotus"],

  // Disney.
  "mickey-mouse": ["Micky Maus"],
  "snow-white": ["Schneewittchen"],
  "tinker-bell": ["Tinkerbell"],
};

export const fillers: string[] = [
  "karte",
  "karten",
  "sammelkarte",
  "sammelkarten",
  "kartenspiel",
  "preis",
  "preise",
  "wert",
  "kaufen",
  "verkaufen",
  "gradiert",
  "japanisch",
  "japanische",
  "englisch",
  "englische",
  "deutsch",
  "deutsche",
];
