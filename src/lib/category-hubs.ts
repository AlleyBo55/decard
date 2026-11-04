import { POKEMON_HUBS } from "./pokemon-hubs";

// One landing page per card franchise Collector Crypt lists, at /cards/<slug>. Moonbirds,
// Azuki and Nobody Sausage have no hub: their listings are pre-orders, sealed decks and
// blind boxes, not graded cards. Merch (hats, watches) and the mixed "Non-Sport" and
// "Collectible Card Games" buckets have none either. Never use the slug "page": the
// static /cards/page/[page] directory owns it.

export interface HubFaq {
  q: string;
  a: string;
}

export interface CategoryHub {
  slug: string;
  /** Collector Crypt's exact category name: the API filter, the scanner search and the type colour. */
  category: string;
  /** For breadcrumbs, chips and headings. */
  name: string;
  /** The name mid-sentence, when it differs ("soccer"). */
  noun?: string;
  h1: string;
  /** Without the " · Decard" suffix the layout adds, so 51 characters or fewer. */
  title: string;
  /** 70 to 160 characters. */
  description: string;
  /** General, durable facts only: live numbers come from the API. */
  intro: string[];
  faq: HubFaq[];
  /** Slugs of related hubs. */
  related: string[];
  /** Guide anchors (ids in lib/guide.ts) for terms these cards use. */
  terms: string[];
}

const tokenized = (noun: string): HubFaq => ({
  q: `What are tokenized ${noun} cards?`,
  a: `Real graded ${noun} cards, sealed in their slabs and stored in a vault, each owned through a token on Solana. Selling the token transfers the card in seconds, and the owner can redeem it to have the physical slab shipped.`,
});

const sourced = (noun: string): HubFaq => ({
  q: `Where do these ${noun} prices come from?`,
  a: "From Collector Crypt's public marketplace API: live asking prices for listings on Collector Crypt and Magic Eden, refreshed about every 15 minutes. Asking prices are not completed sales, so check recent sales and live bids before you buy.",
});

const MARVEL_OR_DC: HubFaq = {
  q: "Are Marvel and DC cards in the same category?",
  a: "No. Collector Crypt lists Marvel and DC separately, so each has its own hub here. Crossover sets such as DC vs. Marvel can appear in either one.",
};

export const CATEGORY_HUBS: CategoryHub[] = [
  {
    slug: "pokemon",
    category: "Pokemon",
    name: "Pokémon",
    h1: "Pokémon cards: graded prices and live listings",
    title: "Tokenized Pokémon cards on Solana: graded prices",
    description:
      "Live prices for tokenized graded Pokémon cards on Solana: lowest asks by grade for PSA, CGC and BGS slabs listed on Collector Crypt and Magic Eden.",
    intro: [
      "Pokémon is the biggest category on Collector Crypt by a wide margin. The cards are real graded slabs from PSA, CGC, Beckett and other graders, stored in a vault and owned through a token on Solana, so each can change hands in seconds and still be redeemed for the physical card.",
      "Collectors split the hobby into eras. The English sets Wizards of the Coast published from 1999 to 2003, starting with Base Set and its 1st Edition and shadowless prints, are the classic vintage. Modern sets are chased for illustration rares and special illustration rares (SIR), and for their Japanese counterparts, the art rares and special art rares (SAR). Japanese exclusives and promos form a market of their own.",
      "Value starts with the exact card: set, number, language and print. Then come the grade, the population report (how many copies the grader has recorded at that grade), centering and eye appeal, and demand for the Pokémon itself. Charizard, Pikachu, Umbreon and the other Eeveelutions, Gengar and Mewtwo are perennial favourites.",
    ],
    faq: [
      tokenized("Pokémon"),
      {
        q: "Can I buy Pokémon cards with crypto on Solana?",
        a: "Yes. Tokenized Pokémon slabs on Collector Crypt sell for USDC, and Magic Eden listings of the same cards are often priced in SOL. You need a Solana wallet such as Phantom or Solflare. Decard itself is read-only and links out to both marketplaces.",
      },
      {
        q: "Is a PSA 10 Pokémon card always worth more than a PSA 9?",
        a: "For the same card, almost always, sometimes by a wide margin. But a PSA 9 of a sought-after card can be worth far more than a PSA 10 of a common one, so compare the same card across grades.",
      },
      {
        q: "Where can I see prices for one Pokémon, like Charizard?",
        a: `Decard has price guides for ${POKEMON_HUBS.length} popular Pokémon, from Charizard and Pikachu to Umbreon and Gengar, each with the lowest and median ask for every grade.`,
      },
      sourced("Pokémon"),
    ],
    related: ["one-piece", "dragon-ball", "riftbound", "yu-gi-oh"],
    terms: ["sir-and-sar", "shadowless", "first-edition", "holo", "population-report"],
  },
  {
    slug: "one-piece",
    category: "One Piece",
    name: "One Piece",
    h1: "One Piece cards: graded prices and live listings",
    title: "One Piece cards: graded prices and live listings",
    description:
      "Live prices for graded One Piece Card Game slabs on Solana: lowest asks by grade for PSA, CGC and BGS cards on Collector Crypt and Magic Eden.",
    intro: [
      "Bandai launched the One Piece Card Game in 2022. Its booster sets are numbered from OP01 Romance Dawn onward, with starter decks (ST) and a steady run of Japanese and English promos alongside.",
      "The chase cards are the alternate-art parallels of leaders and characters, Special (SP) cards and the manga rares, whose art sets the character against panels from Eiichiro Oda's manga. Luffy, Shanks, Zoro, Nami, Ace and Yamato are among the most collected characters, and Japanese and English printings are priced as separate cards.",
      "Most graded One Piece cards are modern prints, so the grade that matters most is the top one: a 10 from PSA, CGC or Beckett usually carries a clear premium over a 9 of the same card. The population report shows how many 10s exist, which is often the best read on how scarce a copy really is.",
    ],
    faq: [
      {
        q: "What is a manga rare in One Piece?",
        a: "A rare alternate-art version of a card whose artwork places the character over black-and-white panels from the One Piece manga. Manga rares are some of the most sought-after cards in the game.",
      },
      {
        q: "Are Japanese One Piece cards worth more than English ones?",
        a: "Not across the board. The two languages are separate printings with their own supply and demand, so compare the same card in the same language and grade.",
      },
      tokenized("One Piece"),
      sourced("One Piece"),
    ],
    related: ["dragon-ball", "naruto", "union-arena", "pokemon"],
    terms: ["manga-rare", "alt-art", "secret-rare", "gem-mint", "population-report"],
  },
  {
    slug: "dragon-ball",
    category: "Dragon Ball",
    name: "Dragon Ball",
    h1: "Dragon Ball cards: graded prices and live listings",
    title: "Dragon Ball cards: graded prices and live listings",
    description:
      "Live prices for graded Dragon Ball cards on Solana, from vintage Carddass to Fusion World: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Dragon Ball cards have been printed for decades, and graded ones cover all of it: Bandai's Japanese Carddass cards from the late 1980s and 1990s, Morinaga wafer cards, Dragon Ball Heroes arcade cards and promos, and the Dragon Ball Super Card Game with its newer Fusion World line.",
      "Goku, Vegeta, Gohan, Frieza and Broly lead demand. On vintage Carddass the prism foil cards are the classic chase, while in the modern games collectors look for secret rares, alternate arts and special promos.",
      "Vintage Japanese cards often have off-center cuts and edge wear, so high grades are harder to find. That makes the exact grade and the population report matter even more than usual when you compare two copies of the same card.",
    ],
    faq: [
      {
        q: "What are Carddass cards?",
        a: "Bandai's Japanese collectible cards, first sold from vending machines, covering Dragon Ball and many other series. Vintage Dragon Ball Carddass, especially the prism foils, are among the most collected Dragon Ball cards.",
      },
      {
        q: "What is Dragon Ball Super Card Game Fusion World?",
        a: "Bandai's second Dragon Ball Super card game, launched in 2024 as a separate game from the original, with its own sets and a digital version.",
      },
      tokenized("Dragon Ball"),
      sourced("Dragon Ball"),
    ],
    related: ["one-piece", "naruto", "union-arena", "pokemon"],
    terms: ["holo", "centering", "secret-rare", "population-report"],
  },
  {
    slug: "riftbound",
    category: "Riftbound",
    name: "Riftbound",
    h1: "Riftbound cards: graded prices and live listings",
    title: "Riftbound cards: graded prices and live listings",
    description:
      "Live prices for graded Riftbound League of Legends cards on Solana: lowest and median asks by grade for PSA, CGC and BGS slabs from Origins onward.",
    intro: [
      "Riftbound is Riot Games' trading card game set in the League of Legends universe. Its first set, Origins, launched in 2025 and was followed by Spiritforged, with promo cards from events alongside.",
      "Cards come in five rarity tiers: common, uncommon, rare, epic and a showcase tier of alternate-art and overnumbered cards. Showcase cards are the chase, and champions with big followings in the game, like Jinx, Ahri, Yasuo or Lux, tend to draw the most interest.",
      "Because the game is new, every graded copy is a recent print. That puts the focus on the top grades: the gap between a 10 and a 9 of the same card, and how many 10s the grader has recorded, explains much of the price spread.",
    ],
    faq: [
      {
        q: "What is Riftbound?",
        a: "Riot Games' League of Legends trading card game. Players build decks around champions from League of Legends, and collectors chase the showcase versions of popular champions.",
      },
      {
        q: "What are overnumbered Riftbound cards?",
        a: "Showcase cards numbered beyond the set's main card count, with exclusive art and premium foil. They're among the rarest pulls in a set.",
      },
      tokenized("Riftbound"),
      sourced("Riftbound"),
    ],
    related: ["pokemon", "one-piece", "magic-the-gathering", "lorcana"],
    terms: ["alt-art", "chase-card", "gem-mint", "population-report"],
  },
  {
    slug: "marvel",
    category: "Marvel",
    name: "Marvel",
    h1: "Marvel cards: graded prices and live listings",
    title: "Marvel cards: graded prices and live listings",
    description:
      "Live prices for graded Marvel trading cards on Solana, from 1990s Marvel Universe to modern chrome: lowest and median asks by grade for every listed slab.",
    intro: [
      "Marvel trading cards boomed in the early 1990s with sets like Impel's Marvel Universe and SkyBox's Marvel Masterpieces, which are still the backbone of the vintage market. Modern releases add chrome finishes, refractor parallels, numbered cards and autographs.",
      "Spider-Man, Wolverine and the X-Men, Venom and Deadpool are steady favourites. Holograms and insert cards from the 1990s sets are the classic chase.",
      "Early-1990s cards were printed in large numbers, so ordinary copies are plentiful and the value sits in high grades and key inserts, where the population report shows how few copies earned a 10.",
    ],
    faq: [
      {
        q: "Which Marvel card sets are most collected?",
        a: "Vintage Marvel Universe and Marvel Masterpieces from the early 1990s are the best known, followed by mid-1990s sets like Fleer Ultra X-Men and Marvel Metal. Modern chrome sets add refractors, numbered parallels and autographs.",
      },
      MARVEL_OR_DC,
      tokenized("Marvel"),
      sourced("Marvel"),
    ],
    related: ["dc", "lorcana", "magic-the-gathering"],
    terms: ["numbered", "alt-art", "gem-mint", "population-report"],
  },
  {
    slug: "yu-gi-oh",
    category: "Yu-Gi-Oh!",
    name: "Yu-Gi-Oh!",
    h1: "Yu-Gi-Oh! cards: graded prices and live listings",
    title: "Yu-Gi-Oh! cards: graded prices and live listings",
    description:
      "Live prices for graded Yu-Gi-Oh! cards on Solana, from 1st Edition classics to Japanese promos: lowest and median asks by grade for PSA and CGC slabs.",
    intro: [
      "Konami's Yu-Gi-Oh! card game started in Japan in 1999 and reached English-speaking players in 2002 with Legend of Blue Eyes White Dragon. Early English sets, especially 1st Edition prints, and Japanese promos are the heart of the graded market.",
      "Rarity shows in the foil treatment: Ultra, Secret, Ultimate, Ghost and Starlight Rares, and more recently Quarter Century Secret Rares. Blue-Eyes White Dragon, Dark Magician, Dark Magician Girl, Red-Eyes Black Dragon and the pieces of Exodia are the classic chase cards.",
      "Early cards were played hard and are often off-center, so high-grade vintage copies are scarce. Check the edition, the rarity and the language together: the same card can exist in several versions with very different prices.",
    ],
    faq: [
      {
        q: "What is a 1st Edition Yu-Gi-Oh! card?",
        a: "A card from a set's first print run, marked '1st Edition' below the artwork. For older sets, 1st Edition copies are usually worth much more than later Unlimited prints.",
      },
      {
        q: "What is a Ghost Rare?",
        a: "A foil treatment that gives the artwork a pale, ghostly holographic look. Ghost Rares are printed in small numbers and are among the most sought-after rarities.",
      },
      tokenized("Yu-Gi-Oh!"),
      sourced("Yu-Gi-Oh!"),
    ],
    related: ["magic-the-gathering", "pokemon", "dragon-ball"],
    terms: ["first-edition", "secret-rare", "centering", "population-report"],
  },
  {
    slug: "magic-the-gathering",
    category: "Magic The Gathering",
    name: "Magic: The Gathering",
    h1: "Magic: The Gathering graded cards and live listings",
    title: "Magic: The Gathering graded cards and live prices",
    description:
      "Live prices for graded Magic: The Gathering cards on Solana, from Alpha and Beta to modern foils: lowest and median asks by grade for CGC and PSA slabs.",
    intro: [
      "Magic: The Gathering, designed by Richard Garfield and published by Wizards of the Coast since 1993, is the original trading card game. Its first printings, Limited Edition Alpha and Beta, then Unlimited and Revised, are the most prized vintage, led by the Power Nine and other early staples.",
      "Many older cards are on the Reserved List, which Wizards of the Coast has pledged not to reprint, so their supply is fixed. Modern Magic adds its own collectibles: borderless and showcase frames, foils, Secret Lair drops and serialized cards stamped with a print number.",
      "Edition, condition and grade drive value. Alpha cards have rounder corners than later printings, and vintage cards that survived decades of play in high grade are rare, so population reports matter a lot. CGC, PSA and Beckett all grade Magic cards.",
    ],
    faq: [
      {
        q: "What is the Reserved List in Magic?",
        a: "A list of older Magic cards that Wizards of the Coast has pledged not to reprint in tournament-legal form. It includes many of the game's most valuable cards, such as the original dual lands and the Power Nine.",
      },
      {
        q: "What is the difference between Alpha, Beta and Unlimited?",
        a: "They are the first three printings of Magic's original 1993 set. Alpha was the smallest run and has rounded corners, Beta fixed a few errors, and Unlimited has white borders instead of black.",
      },
      tokenized("Magic: The Gathering"),
      sourced("Magic: The Gathering"),
    ],
    related: ["yu-gi-oh", "lorcana", "pokemon", "riftbound"],
    terms: ["numbered", "population-report", "cgc-pristine-10", "bgs-black-label"],
  },
  {
    slug: "lorcana",
    category: "Lorcana",
    name: "Disney Lorcana",
    h1: "Disney Lorcana cards: graded prices and live listings",
    title: "Disney Lorcana cards: graded prices and listings",
    description:
      "Live prices for graded Disney Lorcana cards on Solana: lowest and median asks by grade for PSA, CGC and BGS slabs on Collector Crypt and Magic Eden.",
    intro: [
      "Disney Lorcana is Ravensburger's trading card game built on Disney characters, launched in 2023 with The First Chapter. Each set brings new versions of characters like Mickey Mouse, Elsa, Stitch and Maleficent, drawn as 'glimmers' in the game's own style.",
      "Enchanted cards, full-art versions with a shimmering foil, are the main chase in each set, alongside Legendary rarities and promos from events, conventions and organized play.",
      "Because the game is recent, graded copies are modern prints, so price differences come mostly from the card, its rarity and whether it earned the top grade. Population reports show how many 10s exist for each card.",
    ],
    faq: [
      {
        q: "What is an Enchanted card in Lorcana?",
        a: "A full-art, borderless version of one of a set's cards with a special foil finish. Each set has only a few, and they are among the cards collectors chase most.",
      },
      {
        q: "Who makes Disney Lorcana?",
        a: "Ravensburger publishes Disney Lorcana under license from Disney. The first set, The First Chapter, came out in 2023.",
      },
      tokenized("Disney Lorcana"),
      sourced("Disney Lorcana"),
    ],
    related: ["marvel", "pokemon", "magic-the-gathering", "riftbound"],
    terms: ["alt-art", "chase-card", "gem-mint", "population-report"],
  },
  {
    slug: "dc",
    category: "DC",
    name: "DC Comics",
    h1: "DC Comics cards: graded prices and live listings",
    title: "DC Comics cards: graded prices and live listings",
    description:
      "Live prices for graded DC Comics trading cards on Solana, from 1990s SkyBox sets to modern releases: lowest and median asks by grade for every listed slab.",
    intro: [
      "DC Comics cards cover Batman, Superman, Wonder Woman, the Joker and the rest of the DC universe, from 1990s sets like DC Cosmic Cards and SkyBox's DC Master Series to newer licensed releases with chrome finishes, parallels and autographs.",
      "DC is a smaller corner of the tokenized market, so listings come and go and a single new slab can move the lowest ask.",
      "As with Marvel, vintage DC cards were printed in large numbers, so value concentrates in high grades, holograms and inserts, and in modern numbered parallels and autographs.",
    ],
    faq: [
      {
        q: "Which DC cards are collected the most?",
        a: "Batman, Superman, Wonder Woman, the Joker and Harley Quinn lead demand. 1990s sets like DC Cosmic Cards and DC Master Series are the vintage staples, and modern releases add numbered parallels and autographs.",
      },
      MARVEL_OR_DC,
      tokenized("DC Comics"),
      sourced("DC Comics"),
    ],
    related: ["marvel", "lorcana", "pokemon"],
    terms: ["numbered", "gem-mint", "population-report"],
  },
  {
    slug: "gundam",
    category: "Gundam",
    name: "Gundam",
    h1: "Gundam cards: graded prices and live listings",
    title: "Gundam cards: graded prices and live listings",
    description:
      "Live prices for graded Gundam Card Game slabs on Solana, from Newtype Rising onward: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Bandai launched the Gundam Card Game in 2025 with the Newtype Rising booster (GD01), drawing on Mobile Suit Gundam, Gundam Wing, Gundam SEED, Gundam Unicorn and The Witch from Mercury. Later boosters keep adding mobile suits and pilots from more of the franchise.",
      "Legend Rares are the top rarity in each booster and the cards most players and collectors chase. Fan favourites like the original RX-78-2 Gundam, Char Aznable and the Gundam Wing mobile suits draw the strongest interest.",
      "Gundam had a long card history before this game, including Bandai's Gundam War and Carddass lines in Japan. Graded Gundam cards are mostly recent prints from the new game, so the top grades and population counts drive the price spread.",
    ],
    faq: [
      {
        q: "What is the Gundam Card Game?",
        a: "Bandai's trading card game based on the Gundam franchise, launched in 2025. Players field mobile suits and pilots from series like Mobile Suit Gundam, Gundam Wing and The Witch from Mercury.",
      },
      {
        q: "What is a Legend Rare?",
        a: "The highest regular rarity in Gundam Card Game boosters, marked LR. Each set has only a few, which makes them the cards most players and collectors chase.",
      },
      tokenized("Gundam"),
      sourced("Gundam"),
    ],
    related: ["one-piece", "dragon-ball", "union-arena"],
    terms: ["alt-art", "gem-mint", "population-report"],
  },
  {
    slug: "naruto",
    category: "Naruto",
    name: "Naruto",
    h1: "Naruto cards: graded prices and live listings",
    title: "Naruto cards: graded prices and live listings",
    description:
      "Live prices for graded Naruto cards on Solana, from Japanese Carddass to modern releases: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Naruto cards come from several lines: Bandai's Japanese Carddass cards for Naruto and Naruto Shippuden, the English Naruto Collectible Card Game, and newer licensed collectibles such as Kayou's Naruto cards from China.",
      "Naruto, Sasuke, Itachi, Kakashi and the Akatsuki lead demand. Holofoil and promo cards from the Japanese releases, and the high-rarity cards in modern lines, are the usual chase.",
      "Many vintage Naruto cards were made for arcade machines and play, so clean, well-centered copies are scarce and a high grade carries a premium. Collector Crypt files some Naruto items, such as Jump promos and playing cards, under other categories, which the scanner's text search also finds.",
    ],
    faq: [
      {
        q: "What kinds of Naruto cards get graded?",
        a: "Mostly Japanese Bandai Carddass cards, cards from the English Naruto CCG, promos, and newer licensed lines. Each is priced as its own card, so compare the same card, set and grade.",
      },
      {
        q: "Are Kayou Naruto cards the same as Bandai's?",
        a: "No. Kayou makes licensed Naruto collectible cards for the Chinese market, while Bandai's Carddass and the English Naruto CCG are older, separate lines. They are collected and priced separately.",
      },
      tokenized("Naruto"),
      sourced("Naruto"),
    ],
    related: ["one-piece", "dragon-ball", "union-arena"],
    terms: ["holo", "centering", "population-report"],
  },
  {
    slug: "union-arena",
    category: "Union Arena",
    name: "Union Arena",
    h1: "Union Arena cards: graded prices and live listings",
    title: "Union Arena cards: graded prices and live listings",
    description:
      "Live prices for graded Union Arena cards on Solana, Bandai's anime card game: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Union Arena is Bandai's trading card game that gives each anime series its own booster sets, so one game covers titles like Hunter x Hunter, Jujutsu Kaisen and Attack on Titan under the same rules.",
      "Parallel versions with alternate art or extra foil are the chase cards, and each series' main characters, such as Gon and Killua or Eren and Levi, lead demand.",
      "Each series has its own fan base and supply, so prices differ a lot between series even at the same rarity and grade.",
    ],
    faq: [
      {
        q: "What is Union Arena?",
        a: "Bandai's anime trading card game, with booster sets for series like Hunter x Hunter, Jujutsu Kaisen, Attack on Titan and Code Geass, all played under one rule set.",
      },
      {
        q: "Are Union Arena cards from different anime priced the same?",
        a: "No. Each series has its own demand, so a parallel from a popular series can sell for far more than the same rarity from a smaller one.",
      },
      tokenized("Union Arena"),
      sourced("Union Arena"),
    ],
    related: ["one-piece", "naruto", "dragon-ball", "gundam"],
    terms: ["alt-art", "chase-card", "gem-mint"],
  },
  {
    slug: "soccer",
    category: "Soccer",
    name: "Soccer",
    noun: "soccer",
    h1: "Soccer cards: graded prices and live listings",
    title: "Soccer cards: graded prices and live listings",
    description:
      "Live prices for graded soccer cards on Solana, from Panini Prizm to Topps Chrome: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Soccer cards span Panini's Prizm, Select, Donruss and Adrenalyn XL lines, Topps' Champions League and club sets, World Cup releases and decades of stickers and regional issues. Rookie cards and early cards of stars like Lionel Messi, Cristiano Ronaldo, Kylian Mbappé and Erling Haaland lead the market.",
      "Value comes from the player, the card (rookie, insert or base), its parallel and print run, autographs and the grade. Numbered parallels like /99 or /10 and one-of-one cards carry the biggest premiums.",
      "Many soccer cards come from sticker albums and products that were never handled carefully, so high-grade copies of older cards are scarce, and the population report helps tell a common card from a genuinely rare one.",
    ],
    faq: [
      {
        q: "What makes a soccer card valuable?",
        a: "The player first, then whether it's a rookie card, a numbered parallel or an autograph, and finally the grade. A low-numbered parallel of a star in a top grade is the classic high-end card.",
      },
      {
        q: "What is a numbered card?",
        a: "A card stamped with its print run, like 23/99, meaning 99 copies exist. Lower print runs usually sell for more, and a 1/1 is unique.",
      },
      tokenized("soccer"),
      sourced("soccer"),
    ],
    related: ["basketball", "football", "baseball", "hockey"],
    terms: ["numbered", "gem-mint", "population-report", "case-break"],
  },
  {
    slug: "basketball",
    category: "Basketball",
    name: "Basketball",
    noun: "basketball",
    h1: "Basketball cards: graded prices and live listings",
    title: "Basketball cards: graded prices and live listings",
    description:
      "Live prices for graded basketball cards on Solana, from vintage Fleer to Prizm: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Basketball cards run from 1980s and 1990s Fleer, including the 1986 Fleer set with Michael Jordan's rookie card, through the Panini era of Prizm, Select and National Treasures, plus Topps and Topps Chrome sets. Rookie cards of Jordan, LeBron James, Kobe Bryant, Stephen Curry and Victor Wembanyama are among the most traded.",
      "Value comes from the player, rookie status, the parallel and its print run, autographs and patches, and the grade. Refractors, Prizm color parallels and low serial numbers carry big premiums.",
      "Cards from the late-1980s and early-1990s boom were printed in huge numbers, so most of their value sits in high grades and key rookies, while modern cards get their scarcity from numbered parallels.",
    ],
    faq: [
      {
        q: "What is a rookie card?",
        a: "A player's first card in a licensed set from their rookie year, often marked RC. Rookie cards of stars are the backbone of the basketball market.",
      },
      {
        q: "What is a Prizm parallel?",
        a: "A color variation of a Panini Prizm card, such as Silver, or numbered colors like Gold /10. Parallels look like the base card with a different foil, and the rarer the color, the higher the price.",
      },
      tokenized("basketball"),
      sourced("basketball"),
    ],
    related: ["football", "baseball", "soccer", "hockey"],
    terms: ["numbered", "centering", "gem-mint", "case-break"],
  },
  {
    slug: "football",
    category: "Football",
    name: "Football",
    noun: "football",
    h1: "Football cards: graded prices and live listings",
    title: "Football cards: graded prices and live listings",
    description:
      "Live prices for graded NFL football cards on Solana, from vintage Topps to Prizm and Optic: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Football here means American football: NFL players across Panini's Prizm, Donruss Optic, Mosaic, Select and National Treasures, plus vintage Topps and Bowman from the hobby's early decades. Rookie cards of quarterbacks like Tom Brady, Patrick Mahomes and Josh Allen are among the most traded.",
      "Value comes from the player and position, rookie status, numbered parallels, autographs and rookie patch autographs (RPAs), and the grade. A low-numbered rookie autograph in a top grade is the classic high-end football card.",
      "Vintage cards from the 1950s and 1960s are hard to find in high grade, and modern cards get their scarcity from short prints and serial numbering, so read the population report alongside the price.",
    ],
    faq: [
      {
        q: "What is an RPA?",
        a: "A rookie patch autograph: a rookie card with a piece of game-worn or event-worn jersey and the player's signature. Numbered RPAs from premium sets are some of the most valuable modern football cards.",
      },
      {
        q: "Is this soccer or American football?",
        a: "American football. Soccer cards have their own hub, because Collector Crypt lists the two as separate categories.",
      },
      tokenized("football"),
      sourced("football"),
    ],
    related: ["basketball", "baseball", "soccer", "hockey"],
    terms: ["numbered", "gem-mint", "population-report", "case-break"],
  },
  {
    slug: "baseball",
    category: "Baseball",
    name: "Baseball",
    noun: "baseball",
    h1: "Baseball cards: graded prices and live listings",
    title: "Baseball cards: graded prices and live listings",
    description:
      "Live prices for graded baseball cards on Solana, from vintage Topps to Bowman Chrome: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Baseball is the oldest corner of the card hobby, and Topps has made a flagship set every year since 1952. Graded baseball covers vintage Topps, the late-1980s and early-1990s boom, and modern Topps Chrome, Update and Bowman releases, where prospects get their first cards.",
      "Collectors chase rookie cards, a player's first Bowman card (the '1st Bowman'), refractor parallels, autographs and low serial numbers. Mike Trout, Shohei Ohtani, Aaron Judge and the next top prospects drive much of the modern market.",
      "Vintage cards are judged hard on centering and corners, so high grades are rare. Cards from the boom years were printed in huge numbers, which leaves most of their value in gem mint copies.",
    ],
    faq: [
      {
        q: "What is a 1st Bowman card?",
        a: "A prospect's first card in a Bowman product, usually marked '1st Bowman'. Chrome versions and their refractor parallels, especially autographed ones, are the key cards for prospects.",
      },
      {
        q: "What is a refractor?",
        a: "A Topps Chrome or Bowman Chrome parallel with a reflective, rainbow finish. Colored refractors are often numbered, and lower print runs sell for more.",
      },
      tokenized("baseball"),
      sourced("baseball"),
    ],
    related: ["basketball", "football", "hockey", "soccer"],
    terms: ["numbered", "centering", "gem-mint", "comps"],
  },
  {
    slug: "hockey",
    category: "Hockey",
    name: "Hockey",
    noun: "hockey",
    h1: "Hockey cards: graded prices and live listings",
    title: "Hockey cards: graded prices and live listings",
    description:
      "Live prices for graded hockey cards on Solana, from O-Pee-Chee to Upper Deck Young Guns: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Hockey cards center on the NHL. Upper Deck has held the main license for years, and its Young Guns rookie cards are the best-known modern chase, while O-Pee-Chee and vintage Topps cover the earlier decades.",
      "Wayne Gretzky, Mario Lemieux, Sidney Crosby, Connor McDavid and Connor Bedard lead demand. Rookie cards, numbered parallels and autographs carry the premiums, and Young Guns in a top grade are a staple of the market.",
      "Cards with colored borders, like the 1979-80 O-Pee-Chee Wayne Gretzky rookie, show chipping easily, so high grades are scarce and the population report matters.",
    ],
    faq: [
      {
        q: "What are Young Guns cards?",
        a: "Upper Deck's rookie cards in its flagship Series 1 and Series 2 hockey sets. They're the standard modern hockey rookie card, and stars' Young Guns in high grade are always in demand.",
      },
      {
        q: "What makes a hockey card valuable?",
        a: "The player, rookie status, scarcity from numbered parallels or short prints, autographs, and condition. Edges and centering matter a lot on older colored-border cards.",
      },
      tokenized("hockey"),
      sourced("hockey"),
    ],
    related: ["baseball", "basketball", "football", "soccer"],
    terms: ["numbered", "centering", "gem-mint"],
  },
  {
    slug: "vibes",
    category: "Vibes",
    name: "Vibes TCG",
    h1: "Vibes TCG cards: graded prices and live listings",
    title: "Vibes TCG cards: graded prices and live listings",
    description:
      "Live prices for graded Vibes TCG cards, the Pudgy Penguins card game, on Solana: lowest and median asks by grade on Collector Crypt and Magic Eden.",
    intro: [
      "Vibes is the trading card game built around Pudgy Penguins, the penguin characters that started as an NFT collection. Its first set, Enter the Huddle, launched in late 2024 in both physical and digital form, and more sets have followed.",
      "Graded Vibes cards are all recent prints, so collectors focus on foils, promos, 1st Edition copies from the first set and the top grades.",
      "Collector Crypt also lists ungraded Vibes items such as sealed booster boxes, so the prices here count graded slabs only.",
    ],
    faq: [
      {
        q: "What is Vibes TCG?",
        a: "The trading card game built around Pudgy Penguins characters. Its first set, Enter the Huddle, came out in late 2024 as both physical cards and a digital game.",
      },
      {
        q: "Where are the Birb Vibes promo cards?",
        a: "Collector Crypt files the Moonbirds-themed Birb promos under its Moonbirds category, and those listings are ungraded, so they are not part of this hub's graded prices.",
      },
      tokenized("Vibes TCG"),
      sourced("Vibes TCG"),
    ],
    related: ["pokemon", "one-piece", "riftbound", "lorcana"],
    terms: ["first-edition", "nft", "gem-mint", "population-report"],
  },
];

export function categoryHub(slug: string): CategoryHub | null {
  return CATEGORY_HUBS.find((hub) => hub.slug === slug) ?? null;
}

/** The hub's name mid-sentence ("soccer cards", "Pokémon cards"). */
export function hubNoun(hub: CategoryHub): string {
  return hub.noun ?? hub.name;
}
