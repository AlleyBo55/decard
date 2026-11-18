// Spanish names for the subjects in ./entities.ts, keyed by entity key. Rules: the top of entities.ts.
// Spanish releases keep the English Pokémon names (Charizard, Pikachu...), so those are skipped.
export const names: Record<string, string[]> = {
  "franchise:dragon-ball": ["Bola de Dragón"],
  "franchise:soccer": ["Fútbol"],
  "franchise:basketball": ["Baloncesto", "Básquet", "Basquetbol"],
  "franchise:football": ["Fútbol Americano"],
  "franchise:baseball": ["Béisbol"],
  "franchise:hockey": ["Hockey sobre hielo"],

  zoro: ["Roronoa"],

  // Doblaje latino/español: Freezer (Frieza), Son Goku, Kakaroto, Shenlong, Vegetto.
  goku: ["Son Goku", "Kakaroto"],
  gohan: ["Son Gohan"],
  goten: ["Son Goten"],
  shenron: ["Shenlong"],
  vegito: ["Vegetto"],
  frieza: ["Freezer"],

  "spider-man": ["Hombre Araña", "El Hombre Araña", "Spiderman"],
  "x-men": ["Patrulla-X"],
  wolverine: ["Lobezno"],
  "fantastic-four": ["Los Cuatro Fantásticos", "Cuatro Fantásticos", "4 Fantásticos"],
  punisher: ["El Castigador"],
  "captain-america": ["Capitán América"],
  "silver-surfer": ["Estela Plateada"],

  joker: ["El Guasón"],
  "wonder-woman": ["La Mujer Maravilla", "Mujer Maravilla"],
  "green-lantern": ["Linterna Verde"],
  "justice-league": ["Liga de la Justicia"],

  // Nombres oficiales del TCG en español.
  "dark-magician": ["Mago Oscuro"],
  "dark-magician-girl": ["Chica Maga Oscura", "Maga Oscura"],
  "blue-eyes-white-dragon": ["Dragón Blanco de Ojos Azules"],
  "red-eyes-black-dragon": ["Dragón Negro de Ojos Rojos"],
  "winged-dragon-of-ra": ["Dragón Alado de Ra"],
  "slifer-the-sky-dragon": ["Slifer el Dragón del Cielo"],

  "the-one-ring": ["El Anillo Único", "Anillo Único"],
  "black-lotus": ["Loto Negro"],

  "snow-white": ["Blancanieves"],
  "tinker-bell": ["Campanilla"],
  maleficent: ["Maléfica"],
  "donald-duck": ["Pato Donald"],

  "lionel-messi": ["La Pulga", "Leo Messi", "Lio Messi"],
  "cristiano-ronaldo": ["CR7", "Cristiano"],
  "diego-maradona": ["El Pelusa", "El Diego"],
  "zinedine-zidane": ["Zizou"],
  "vinicius-junior": ["Vinicius", "Vinicius Junior"],

  "kobe-bryant": ["Mamba Negra"],
  "victor-wembanyama": ["Wemby"],
};

export const fillers: string[] = [
  "carta",
  "cartas",
  "cromo",
  "cromos",
  "precio",
  "precios",
  "valor",
  "vale",
  "cuánto",
  "comprar",
  "vender",
  "venta",
  "graduada",
  "graduado",
  "sellada",
  "nueva",
  "nuevo",
  "novato",
  "edición",
  "oficial",
  "japonés",
  "japonesa",
  "inglés",
  "subasta",
];
