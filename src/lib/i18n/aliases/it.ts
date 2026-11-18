// Italian names for the subjects in ./entities.ts, keyed by entity key. Rules: the top of entities.ts.
// Italian keeps the English Pokémon names, so none are listed here.
export const names: Record<string, string[]> = {
  // Franchise names and the abbreviations Italian players type.
  "franchise:one-piece": ["OPCG"],
  "franchise:dragon-ball": ["DBSCG"],
  "franchise:magic-the-gathering": ["MTG"],
  "franchise:soccer": ["Calcio"],
  "franchise:basketball": ["Pallacanestro", "Basket"],
  "franchise:football": ["Football americano"],
  "franchise:hockey": ["Hockey su ghiaccio"],

  // Marvel: the classic Italian comic names.
  "spider-man": ["Uomo Ragno"],
  "captain-america": ["Capitan America"],
  punisher: ["Il Punitore"],
  "fantastic-four": ["Fantastici Quattro"],

  // Yu-Gi-Oh!: Italian card names.
  "dark-magician": ["Mago Nero"],
  "dark-magician-girl": ["Ragazza Maga Nera"],
  "blue-eyes-white-dragon": ["Drago Bianco Occhi Blu"],
  "red-eyes-black-dragon": ["Drago Nero Occhi Rossi"],

  // Disney.
  "mickey-mouse": ["Topolino"],
  "donald-duck": ["Paperino"],
  "snow-white": ["Biancaneve"],
  maleficent: ["Malefica"],
  "tinker-bell": ["Trilli"],

  // Football nickname Italian media use.
  "lionel-messi": ["La Pulce"],
};

export const fillers: string[] = [
  "carta",
  "carte",
  "gioco di carte",
  "prezzo",
  "prezzi",
  "valore",
  "quotazione",
  "comprare",
  "vendere",
  "gradata",
  "valutata",
  "giapponese",
  "giapponesi",
  "inglese",
  "inglesi",
];
