// The subjects people search for by a local name or a nickname. Each language's names for them live
// in ./<locale>.ts, keyed by `key`; ../aliases.ts builds the search and the page lines from both.
//
// Rules for a name in a locale file:
// - A real name people use: the official local name, the standard transliteration or romanization,
//   or a well-known nickname or fan slang ("Jeki" for Shanks in Indonesia, "カイリュー" and
//   "Kairyuu" for Dragonite).
// - Never an ordinary word of that language ("ace", "judge", "fire", "king", "goat") and never an
//   ambiguous one ("MJ" is also Mary Jane, "Captain America" is also Christian Pulisic).
// - Never offensive or mocking slang (no "Penaldo").
// - One entity per name in a language: no name under two keys. Names are matched in every
//   language at once, so a dev-server warning also flags the same name under different keys in two
//   languages, a name that is a filler word, and a name that is another entity's English `search`.
// - Write it once, spelled and capitalized as the language writes it ("Hombre Araña", "Évoli").
//   Matching ignores case, full and half width, hiragana against katakana and Latin accents, so
//   unaccented or lowercase copies add nothing. A different spelling is a different name
//   ("Manusia Labalaba" next to "Manusia Laba-laba").
// - At least 2 characters. Names in Chinese, Japanese, Korean or Thai script also match inside
//   longer text ("リザードンex", "피카츄카드"); names in other scripts match whole words only.
// - Fillers are that language's words for card, cards, TCG, price, value, buy, graded, slab and the
//   like. A search that contains a name drops them; a search without a name is left as typed.
//
// `key` is a stable kebab-case id; "franchise:<hub slug>" is the franchise itself, for names of the
// franchise ("ポケカ", "海贼王"). `search` is the English text Collector Crypt's search matches: it
// matches each word as a substring, so the text has to pick out the subject ("Incredible Hulk",
// since "Hulk" also finds Hulk Hogan). `franchise` is the hub slug in lib/category-hubs.ts; `href`
// is the entity's own page, when it has one. Within a franchise, entities run from most to least
// listed (Collector Crypt listing counts, November 2026); popularNames() keeps that order.
export interface AliasEntity {
  key: string;
  search: string;
  franchise: string;
  href?: string;
}

export const ENTITIES: AliasEntity[] = [
  { key: "franchise:pokemon", search: "Pokemon", franchise: "pokemon", href: "/cards/pokemon" },
  { key: "franchise:one-piece", search: "One Piece", franchise: "one-piece", href: "/cards/one-piece" },
  { key: "franchise:dragon-ball", search: "Dragon Ball", franchise: "dragon-ball", href: "/cards/dragon-ball" },
  { key: "franchise:riftbound", search: "Riftbound", franchise: "riftbound", href: "/cards/riftbound" },
  { key: "franchise:marvel", search: "Marvel", franchise: "marvel", href: "/cards/marvel" },
  { key: "franchise:yu-gi-oh", search: "Yu-Gi-Oh!", franchise: "yu-gi-oh", href: "/cards/yu-gi-oh" },
  { key: "franchise:magic-the-gathering", search: "Magic The Gathering", franchise: "magic-the-gathering", href: "/cards/magic-the-gathering" },
  { key: "franchise:lorcana", search: "Lorcana", franchise: "lorcana", href: "/cards/lorcana" },
  { key: "franchise:dc", search: "DC", franchise: "dc", href: "/cards/dc" },
  { key: "franchise:gundam", search: "Gundam", franchise: "gundam", href: "/cards/gundam" },
  { key: "franchise:naruto", search: "Naruto", franchise: "naruto", href: "/cards/naruto" },
  { key: "franchise:union-arena", search: "Union Arena", franchise: "union-arena", href: "/cards/union-arena" },
  { key: "franchise:soccer", search: "Soccer", franchise: "soccer", href: "/cards/soccer" },
  { key: "franchise:basketball", search: "Basketball", franchise: "basketball", href: "/cards/basketball" },
  { key: "franchise:football", search: "Football", franchise: "football", href: "/cards/football" },
  { key: "franchise:baseball", search: "Baseball", franchise: "baseball", href: "/cards/baseball" },
  { key: "franchise:hockey", search: "Hockey", franchise: "hockey", href: "/cards/hockey" },
  { key: "franchise:vibes", search: "Vibes", franchise: "vibes", href: "/cards/vibes" },

  // Pokémon: the 36 with a price guide (lib/pokemon-hubs.ts) and the next most listed.
  { key: "charizard", search: "Charizard", franchise: "pokemon", href: "/pokemon/charizard" },
  { key: "pikachu", search: "Pikachu", franchise: "pokemon", href: "/pokemon/pikachu" },
  { key: "mew", search: "Mew", franchise: "pokemon" },
  { key: "gengar", search: "Gengar", franchise: "pokemon", href: "/pokemon/gengar" },
  { key: "eevee", search: "Eevee", franchise: "pokemon", href: "/pokemon/eevee" },
  { key: "mewtwo", search: "Mewtwo", franchise: "pokemon", href: "/pokemon/mewtwo" },
  { key: "umbreon", search: "Umbreon", franchise: "pokemon", href: "/pokemon/umbreon" },
  { key: "venusaur", search: "Venusaur", franchise: "pokemon", href: "/pokemon/venusaur" },
  { key: "blastoise", search: "Blastoise", franchise: "pokemon", href: "/pokemon/blastoise" },
  { key: "charmander", search: "Charmander", franchise: "pokemon", href: "/pokemon/charmander" },
  { key: "moltres", search: "Moltres", franchise: "pokemon", href: "/pokemon/moltres" },
  { key: "bulbasaur", search: "Bulbasaur", franchise: "pokemon", href: "/pokemon/bulbasaur" },
  { key: "rayquaza", search: "Rayquaza", franchise: "pokemon", href: "/pokemon/rayquaza" },
  { key: "zapdos", search: "Zapdos", franchise: "pokemon", href: "/pokemon/zapdos" },
  { key: "dragonite", search: "Dragonite", franchise: "pokemon", href: "/pokemon/dragonite" },
  { key: "zekrom", search: "Zekrom", franchise: "pokemon" },
  { key: "lucario", search: "Lucario", franchise: "pokemon", href: "/pokemon/lucario" },
  { key: "gardevoir", search: "Gardevoir", franchise: "pokemon", href: "/pokemon/gardevoir" },
  { key: "snorlax", search: "Snorlax", franchise: "pokemon", href: "/pokemon/snorlax" },
  { key: "squirtle", search: "Squirtle", franchise: "pokemon", href: "/pokemon/squirtle" },
  { key: "lugia", search: "Lugia", franchise: "pokemon", href: "/pokemon/lugia" },
  { key: "articuno", search: "Articuno", franchise: "pokemon", href: "/pokemon/articuno" },
  { key: "psyduck", search: "Psyduck", franchise: "pokemon" },
  { key: "greninja", search: "Greninja", franchise: "pokemon", href: "/pokemon/greninja" },
  { key: "gyarados", search: "Gyarados", franchise: "pokemon", href: "/pokemon/gyarados" },
  { key: "reshiram", search: "Reshiram", franchise: "pokemon" },
  { key: "espeon", search: "Espeon", franchise: "pokemon", href: "/pokemon/espeon" },
  { key: "alakazam", search: "Alakazam", franchise: "pokemon", href: "/pokemon/alakazam" },
  { key: "raichu", search: "Raichu", franchise: "pokemon", href: "/pokemon/raichu" },
  { key: "meowth", search: "Meowth", franchise: "pokemon" },
  { key: "ho-oh", search: "Ho-Oh", franchise: "pokemon", href: "/pokemon/ho-oh" },
  { key: "mimikyu", search: "Mimikyu", franchise: "pokemon", href: "/pokemon/mimikyu" },
  { key: "jolteon", search: "Jolteon", franchise: "pokemon", href: "/pokemon/jolteon" },
  { key: "sylveon", search: "Sylveon", franchise: "pokemon", href: "/pokemon/sylveon" },
  { key: "vaporeon", search: "Vaporeon", franchise: "pokemon", href: "/pokemon/vaporeon" },
  { key: "suicune", search: "Suicune", franchise: "pokemon" },
  { key: "leafeon", search: "Leafeon", franchise: "pokemon", href: "/pokemon/leafeon" },
  { key: "tyranitar", search: "Tyranitar", franchise: "pokemon", href: "/pokemon/tyranitar" },
  { key: "flareon", search: "Flareon", franchise: "pokemon", href: "/pokemon/flareon" },
  { key: "glaceon", search: "Glaceon", franchise: "pokemon", href: "/pokemon/glaceon" },
  { key: "lapras", search: "Lapras", franchise: "pokemon", href: "/pokemon/lapras" },
  { key: "ninetales", search: "Ninetales", franchise: "pokemon", href: "/pokemon/ninetales" },

  { key: "luffy", search: "Luffy", franchise: "one-piece" },
  { key: "nami", search: "Nami", franchise: "one-piece" },
  { key: "zoro", search: "Zoro", franchise: "one-piece" },
  { key: "boa-hancock", search: "Boa Hancock", franchise: "one-piece" },
  { key: "chopper", search: "Chopper", franchise: "one-piece" },
  { key: "nico-robin", search: "Nico Robin", franchise: "one-piece" },
  { key: "sabo", search: "Sabo", franchise: "one-piece" },
  { key: "portgas-d-ace", search: "Portgas D. Ace", franchise: "one-piece" },
  { key: "sanji", search: "Sanji", franchise: "one-piece" },
  { key: "shanks", search: "Shanks", franchise: "one-piece" },
  { key: "jewelry-bonney", search: "Jewelry Bonney", franchise: "one-piece" },
  { key: "trafalgar-law", search: "Trafalgar Law", franchise: "one-piece" },

  { key: "goku", search: "Goku", franchise: "dragon-ball" },
  { key: "gohan", search: "Gohan", franchise: "dragon-ball" },
  { key: "vegeta", search: "Vegeta", franchise: "dragon-ball" },
  { key: "gogeta", search: "Gogeta", franchise: "dragon-ball" },
  { key: "shenron", search: "Shenron", franchise: "dragon-ball" },
  { key: "broly", search: "Broly", franchise: "dragon-ball" },
  { key: "vegito", search: "Vegito", franchise: "dragon-ball" },
  { key: "frieza", search: "Frieza", franchise: "dragon-ball" },
  { key: "trunks", search: "Trunks", franchise: "dragon-ball" },
  { key: "goten", search: "Goten", franchise: "dragon-ball" },

  // League of Legends champions.
  { key: "ahri", search: "Ahri", franchise: "riftbound" },
  { key: "teemo", search: "Teemo", franchise: "riftbound" },
  { key: "jinx", search: "Jinx", franchise: "riftbound" },
  { key: "viktor", search: "Viktor", franchise: "riftbound" },
  { key: "irelia", search: "Irelia", franchise: "riftbound" },
  { key: "lee-sin", search: "Lee Sin", franchise: "riftbound" },
  { key: "kaisa", search: "Kai'Sa", franchise: "riftbound" },
  { key: "yasuo", search: "Yasuo", franchise: "riftbound" },
  { key: "darius", search: "Darius", franchise: "riftbound" },
  { key: "miss-fortune", search: "Miss Fortune", franchise: "riftbound" },

  { key: "spider-man", search: "Spider-Man", franchise: "marvel" },
  { key: "x-men", search: "X-Men", franchise: "marvel" },
  { key: "wolverine", search: "Wolverine", franchise: "marvel" },
  { key: "fantastic-four", search: "Fantastic Four", franchise: "marvel" },
  { key: "iron-man", search: "Iron Man", franchise: "marvel" },
  { key: "punisher", search: "Punisher", franchise: "marvel" },
  { key: "captain-america", search: "Captain America", franchise: "marvel" },
  { key: "silver-surfer", search: "Silver Surfer", franchise: "marvel" },
  { key: "daredevil", search: "Daredevil", franchise: "marvel" },
  { key: "hulk", search: "Incredible Hulk", franchise: "marvel" },
  { key: "deadpool", search: "Deadpool", franchise: "marvel" },

  { key: "dark-magician", search: "Dark Magician", franchise: "yu-gi-oh" },
  { key: "dark-magician-girl", search: "Dark Magician Girl", franchise: "yu-gi-oh" },
  { key: "blue-eyes-white-dragon", search: "Blue-Eyes White Dragon", franchise: "yu-gi-oh" },
  { key: "black-luster-soldier", search: "Black Luster Soldier", franchise: "yu-gi-oh" },
  { key: "winged-dragon-of-ra", search: "Winged Dragon of Ra", franchise: "yu-gi-oh" },
  { key: "slifer-the-sky-dragon", search: "Slifer the Sky Dragon", franchise: "yu-gi-oh" },
  { key: "exodia", search: "Exodia", franchise: "yu-gi-oh" },
  { key: "red-eyes-black-dragon", search: "Red-Eyes Black Dragon", franchise: "yu-gi-oh" },

  // Final Fantasy and The Lord of the Rings crossover cards sit in the Magic category.
  { key: "sephiroth", search: "Sephiroth", franchise: "magic-the-gathering" },
  { key: "chocobo", search: "Chocobo", franchise: "magic-the-gathering" },
  { key: "gandalf", search: "Gandalf", franchise: "magic-the-gathering" },
  { key: "tifa-lockhart", search: "Tifa Lockhart", franchise: "magic-the-gathering" },
  { key: "the-one-ring", search: "The One Ring", franchise: "magic-the-gathering" },
  { key: "black-lotus", search: "Black Lotus", franchise: "magic-the-gathering" },

  { key: "mickey-mouse", search: "Mickey Mouse", franchise: "lorcana" },
  { key: "ursula", search: "Ursula", franchise: "lorcana" },
  { key: "elsa", search: "Elsa", franchise: "lorcana" },
  { key: "tinker-bell", search: "Tinker Bell", franchise: "lorcana" },
  { key: "stitch", search: "Stitch", franchise: "lorcana" },
  { key: "maleficent", search: "Maleficent", franchise: "lorcana" },
  { key: "belle", search: "Belle", franchise: "lorcana" },
  { key: "rapunzel", search: "Rapunzel", franchise: "lorcana" },
  { key: "donald-duck", search: "Donald Duck", franchise: "lorcana" },
  { key: "snow-white", search: "Snow White", franchise: "lorcana" },

  { key: "batman", search: "Batman", franchise: "dc" },
  { key: "superman", search: "Superman", franchise: "dc" },
  { key: "joker", search: "Joker", franchise: "dc" },
  { key: "shazam", search: "Shazam", franchise: "dc" },
  { key: "wonder-woman", search: "Wonder Woman", franchise: "dc" },
  { key: "green-lantern", search: "Green Lantern", franchise: "dc" },
  { key: "justice-league", search: "Justice League", franchise: "dc" },
  { key: "harley-quinn", search: "Harley Quinn", franchise: "dc" },

  { key: "gundam-aerial", search: "Gundam Aerial", franchise: "gundam" },
  { key: "unicorn-gundam", search: "Unicorn Gundam", franchise: "gundam" },
  { key: "gundam-barbatos", search: "Gundam Barbatos", franchise: "gundam" },
  { key: "wing-gundam-zero", search: "Wing Gundam Zero", franchise: "gundam" },
  { key: "gundam-epyon", search: "Gundam Epyon", franchise: "gundam" },
  { key: "destiny-gundam", search: "Destiny Gundam", franchise: "gundam" },
  { key: "gquuuuuux", search: "GQuuuuuuX", franchise: "gundam" },
  { key: "suletta-mercury", search: "Suletta Mercury", franchise: "gundam" },

  { key: "naruto-uzumaki", search: "Naruto Uzumaki", franchise: "naruto" },
  { key: "sasuke-uchiha", search: "Sasuke Uchiha", franchise: "naruto" },
  { key: "orochimaru", search: "Orochimaru", franchise: "naruto" },
  { key: "kakashi-hatake", search: "Kakashi Hatake", franchise: "naruto" },
  { key: "sakura-haruno", search: "Sakura Haruno", franchise: "naruto" },
  { key: "jiraiya", search: "Jiraiya", franchise: "naruto" },

  // Union Arena prints many anime: Kagurabachi, Solo Leveling, Bleach, Sword Art Online, Hunter x Hunter...
  { key: "chihiro-rokuhira", search: "Chihiro Rokuhira", franchise: "union-arena" },
  { key: "sung-jinwoo", search: "Sung Jinwoo", franchise: "union-arena" },
  { key: "cha-hae-in", search: "Cha Hae-in", franchise: "union-arena" },
  { key: "ichigo-kurosaki", search: "Ichigo Kurosaki", franchise: "union-arena" },
  { key: "kaiju-no-8", search: "Kaiju No. 8", franchise: "union-arena" },
  { key: "asuna", search: "Asuna", franchise: "union-arena" },
  { key: "killua-zoldyck", search: "Killua Zoldyck", franchise: "union-arena" },
  { key: "byakuya-kuchiki", search: "Byakuya Kuchiki", franchise: "union-arena" },
  { key: "saitama", search: "Saitama", franchise: "union-arena" },
  { key: "kirito", search: "Kirito", franchise: "union-arena" },

  // Search text without accents: Collector Crypt's listings and its search don't use them.
  { key: "lionel-messi", search: "Lionel Messi", franchise: "soccer" },
  { key: "lamine-yamal", search: "Lamine Yamal", franchise: "soccer" },
  { key: "cristiano-ronaldo", search: "Cristiano Ronaldo", franchise: "soccer" },
  { key: "kylian-mbappe", search: "Kylian Mbappe", franchise: "soccer" },
  { key: "erling-haaland", search: "Erling Haaland", franchise: "soccer" },
  { key: "christian-pulisic", search: "Christian Pulisic", franchise: "soccer" },
  { key: "jude-bellingham", search: "Jude Bellingham", franchise: "soccer" },
  { key: "zinedine-zidane", search: "Zinedine Zidane", franchise: "soccer" },
  { key: "diego-maradona", search: "Diego Maradona", franchise: "soccer" },
  { key: "cole-palmer", search: "Cole Palmer", franchise: "soccer" },
  { key: "neymar", search: "Neymar", franchise: "soccer" },
  { key: "pedri", search: "Pedri", franchise: "soccer" },
  { key: "david-beckham", search: "David Beckham", franchise: "soccer" },
  { key: "heung-min-son", search: "Heung-Min Son", franchise: "soccer" },
  { key: "vinicius-junior", search: "Vini Jr", franchise: "soccer" },
  { key: "pele", search: "Pele", franchise: "soccer" },
  { key: "kevin-de-bruyne", search: "Kevin De Bruyne", franchise: "soccer" },
  { key: "robert-lewandowski", search: "Robert Lewandowski", franchise: "soccer" },

  { key: "cooper-flagg", search: "Cooper Flagg", franchise: "basketball" },
  { key: "michael-jordan", search: "Michael Jordan", franchise: "basketball" },
  { key: "victor-wembanyama", search: "Victor Wembanyama", franchise: "basketball" },
  { key: "kobe-bryant", search: "Kobe Bryant", franchise: "basketball" },
  { key: "lebron-james", search: "LeBron James", franchise: "basketball" },
  // "Steph Curry" also finds the listings that spell out Stephen.
  { key: "stephen-curry", search: "Steph Curry", franchise: "basketball" },
  { key: "shaquille-oneal", search: "Shaquille O'Neal", franchise: "basketball" },
  { key: "ja-morant", search: "Ja Morant", franchise: "basketball" },
  { key: "luka-doncic", search: "Luka Doncic", franchise: "basketball" },
  { key: "kevin-durant", search: "Kevin Durant", franchise: "basketball" },
  { key: "anthony-edwards", search: "Anthony Edwards", franchise: "basketball" },
  { key: "caitlin-clark", search: "Caitlin Clark", franchise: "basketball" },
  { key: "jayson-tatum", search: "Jayson Tatum", franchise: "basketball" },
  { key: "giannis-antetokounmpo", search: "Giannis Antetokounmpo", franchise: "basketball" },
  { key: "rui-hachimura", search: "Rui Hachimura", franchise: "basketball" },
  { key: "yao-ming", search: "Yao Ming", franchise: "basketball" },

  { key: "drake-maye", search: "Drake Maye", franchise: "football" },
  { key: "jayden-daniels", search: "Jayden Daniels", franchise: "football" },
  { key: "jaxson-dart", search: "Jaxson Dart", franchise: "football" },
  { key: "tom-brady", search: "Tom Brady", franchise: "football" },
  { key: "patrick-mahomes", search: "Patrick Mahomes", franchise: "football" },
  { key: "bo-nix", search: "Bo Nix", franchise: "football" },
  { key: "caleb-williams", search: "Caleb Williams", franchise: "football" },
  { key: "cj-stroud", search: "CJ Stroud", franchise: "football" },
  { key: "justin-herbert", search: "Justin Herbert", franchise: "football" },
  { key: "josh-allen", search: "Josh Allen", franchise: "football" },
  { key: "joe-burrow", search: "Joe Burrow", franchise: "football" },
  { key: "lamar-jackson", search: "Lamar Jackson", franchise: "football" },

  { key: "shohei-ohtani", search: "Shohei Ohtani", franchise: "baseball" },
  { key: "aaron-judge", search: "Aaron Judge", franchise: "baseball" },
  { key: "paul-skenes", search: "Paul Skenes", franchise: "baseball" },
  { key: "yoshinobu-yamamoto", search: "Yoshinobu Yamamoto", franchise: "baseball" },
  { key: "roki-sasaki", search: "Roki Sasaki", franchise: "baseball" },
  { key: "bobby-witt-jr", search: "Bobby Witt Jr", franchise: "baseball" },
  { key: "mike-trout", search: "Mike Trout", franchise: "baseball" },
  { key: "ken-griffey-jr", search: "Ken Griffey Jr", franchise: "baseball" },
  { key: "elly-de-la-cruz", search: "Elly De La Cruz", franchise: "baseball" },
  { key: "ichiro", search: "Ichiro", franchise: "baseball" },
  { key: "fernando-tatis-jr", search: "Fernando Tatis Jr", franchise: "baseball" },
  { key: "mookie-betts", search: "Mookie Betts", franchise: "baseball" },
  { key: "juan-soto", search: "Juan Soto", franchise: "baseball" },
  { key: "derek-jeter", search: "Derek Jeter", franchise: "baseball" },
  { key: "ronald-acuna-jr", search: "Ronald Acuna Jr", franchise: "baseball" },
  { key: "munetaka-murakami", search: "Munetaka Murakami", franchise: "baseball" },
  { key: "ha-seong-kim", search: "Ha-Seong Kim", franchise: "baseball" },

  { key: "macklin-celebrini", search: "Macklin Celebrini", franchise: "hockey" },
  { key: "wayne-gretzky", search: "Wayne Gretzky", franchise: "hockey" },
  { key: "connor-mcdavid", search: "Connor McDavid", franchise: "hockey" },
  { key: "alexander-ovechkin", search: "Alexander Ovechkin", franchise: "hockey" },
  { key: "sidney-crosby", search: "Sidney Crosby", franchise: "hockey" },
  { key: "connor-bedard", search: "Connor Bedard", franchise: "hockey" },
  { key: "kirill-kaprizov", search: "Kirill Kaprizov", franchise: "hockey" },
];
