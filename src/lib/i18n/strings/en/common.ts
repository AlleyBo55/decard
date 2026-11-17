// English source. Translations in ../<locale>/common.ts use the same keys.
// The site chrome: header, tab bar, More sheet, language switcher, footer, 404 and error page.

type NavCopy = { title: string; desc: string };

/** Tab bar labels by href. */
const tabs: Record<string, string> = {
  "/": "Home",
  "/scanner": "Scanner",
  "/rip": "Rip",
  "/tape": "Live tape"
};

/** Header menu and More sheet items by href (components/nav/links.ts). */
const nav: Record<string, NavCopy> = {
  "/tape": {
    title: "Live tape",
    desc: "Every on-chain sale, listing and bid"
  },
  "/sales": {
    title: "Recent sales",
    desc: "Settled sales by card, grade and price"
  },
  "/cards": {
    title: "Card directory",
    desc: "Every listed slab by name, set and grade"
  },
  "/pokemon": {
    title: "Pokémon prices",
    desc: "Graded price guides for each Pokémon"
  },
  "/cards-token": {
    title: "$CARDS token",
    desc: "Price, buybacks and burns"
  },
  "/rip": {
    title: "Rip packs",
    desc: "A real graded slab in every pack"
  },
  "/gym": {
    title: "Rip Gym",
    desc: "Leaderboards and pack odds"
  },
  "/redeem": {
    title: "Redeem a slab",
    desc: "Ship the real card home"
  },
  "/luck#live": {
    title: "Live gacha",
    desc: "Every gacha pull as it lands"
  },
  "/luck": {
    title: "Pull luck analyzer",
    desc: "Score a wallet's pulls against the odds"
  },
  "/guide": {
    title: "Guide",
    desc: "Grading, rarity and collector slang"
  },
  "/topics": {
    title: "Topics",
    desc: "PSA, CGC, venues, sports and rips"
  },
  "/tokenized-trading-cards": {
    title: "Tokenized cards explained",
    desc: "How vaulted slabs trade on Solana"
  }
};

/** Footer link labels by href. */
const links: Record<string, string> = {
  "/scanner": "Listing scanner",
  "/cards": "Card directory",
  "/scanner?orderBy=deal": "Best deals",
  "/tape": "Live tape",
  "/rip": "Rip card packs",
  "/gym": "Rip Gym leaderboards",
  "/redeem": "Redeem a slab",
  "/luck#live": "Live gacha",
  "/luck": "Pull luck analyzer",
  "/cards-token": "$CARDS token",
  "/sales": "Recent sales",
  "/pokemon": "Pokémon prices",
  "/cards#all": "Every listed card",
  "/tokenized-trading-cards": "Tokenized cards explained",
  "/topics": "PSA, venues and topics",
  "/guide": "Trainer's Guide",
  "/guide#grading": "What is grading?",
  "/guide#buying-and-selling": "Deal score"
};

/** Display names by Collector Crypt category (the API's own spelling is the key). */
const categories: Record<string, string> = {
  "Pokemon": "Pokémon",
  "One Piece": "One Piece",
  "Dragon Ball": "Dragon Ball",
  "Riftbound": "Riftbound",
  "Marvel": "Marvel",
  "Yu-Gi-Oh!": "Yu-Gi-Oh!",
  "Magic The Gathering": "Magic: The Gathering",
  "Lorcana": "Disney Lorcana",
  "DC": "DC Comics",
  "Gundam": "Gundam",
  "Naruto": "Naruto",
  "Union Arena": "Union Arena",
  "Soccer": "Soccer",
  "Basketball": "Basketball",
  "Football": "Football",
  "Baseball": "Baseball",
  "Hockey": "Hockey",
  "Vibes": "Vibes TCG"
};

export const common = {
  skip: "Skip to content",
  language: "Language",
  search: "Search",
  close: "Close menu",
  more: "More",
  guide: "Guide",
  new: "New",
  ripCta: "Rip a pack →",
  /** Logo link. */
  homeLabel: "Decard home",
  /** Header and tab bar <nav> label. */
  mainNav: "Main",
  /** JSON-LD name of the GitHub repository. */
  sourceCode: "{name} source code",
  /** Screen-reader suffix on the Play menu, which has something new in it. */
  newSuffix: ", new",
  tabs,
  groups: {
    market: { label: "Market", blurb: "Prices and trades" },
    play: { label: "Play", blurb: "Packs and pulls" },
    learn: { label: "Learn" },
  },
  nav,
  categories,
  /** The language switcher (components/LanguageSwitcher.tsx). */
  switcher: {
    /** Trigger's accessible name. {name} is the current language's own name. */
    button: "Change language. Current: {name}",
    kicker: "Language",
    title: "Choose your language",
    hint: "Menus, guides and pages switch language. Card names, grades and prices stay as listed.",
    current: "You're here",
    close: "Close",
  },
  footer: {
    blurb: "Gotta scan 'em all. A free, open-source Pokédex for tokenized graded cards on Solana, with live listings from Collector Crypt, Magic Eden and Slabz.",
    explore: "Explore",
    franchises: "Franchises",
    learn: "Learn",
    openSource: "OPEN SOURCE · MIT",
    repoCta: "Star it, fork it, ship a PR ★",
    builtInPublic: "BUILT IN PUBLIC",
    /** After the disclaimer and the repo link. */
    konami: "Psst: try ↑ ↑ ↓ ↓ ← → ← → B A.",
    disclaimer: "Fan-made and not affiliated with Nintendo, Creatures, GAME FREAK, The Pokémon Company or Collector Crypt. Data: Collector Crypt public API and Solana RPC. Not financial advice.",
    links,
  },
  notFound: {
    text: "A wild 404 appeared! This page isn't in the Pokédex.",
    home: "Run home",
    scanner: "Open the scanner"
  },
  error: {
    text: "Oh no! This page fainted. A data source didn't answer in time.",
    retry: "Use a Revive",
    home: "Back home",
  },
  notice: "Card names, grades and prices stay in English. This is the translated edition of the same market.",
};
