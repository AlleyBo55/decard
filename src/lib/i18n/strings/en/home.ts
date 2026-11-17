// English source. Translations in ../<locale>/home.ts use the same keys.
// The home page (app/[lang]/page.tsx). Its title and description are also the site's defaults.

/** One tab of the market rail (components/home/HomeSections.tsx). `title` may hold {em}, drawn highlighted. */
type TabCopy = { label: string; title: string; em?: string; sub: string; more: string };

/** Pokémon-style type names by lib/poke-types.ts PokeType, as the market snapshot names a category's type. */
const types: Record<string, string> = {
  electric: "Electric",
  water: "Water",
  fire: "Fire",
  grass: "Grass",
  psychic: "Psychic",
  fighting: "Fighting",
  dragon: "Dragon",
  fairy: "Fairy",
  ghost: "Ghost",
  dark: "Dark",
  steel: "Steel",
  ground: "Ground",
  flying: "Flying",
  normal: "Normal",
};

/** The market rail's three tabs. */
const tabs: Record<"deals" | "new" | "top", TabCopy> = {
  deals: {
    label: "Best deals",
    title: "Under insured value, {em}",
    em: "ranked.",
    sub: "Live USDC listings sorted by how far they sit below the vault's insured value. The fuller the HP bar, the bigger the discount.",
    more: "Open the scanner",
  },
  new: {
    label: "Just listed",
    title: "Fresh on the market.",
    sub: "The newest listings on Collector Crypt and Magic Eden, as they land.",
    more: "See all new",
  },
  top: {
    label: "Top shelf",
    title: "The most expensive cards listed.",
    sub: "Grails and gem mints, priced from the top down.",
    more: "See the top shelf",
  },
};

export const home = {
  kicker: "Solana · graded card dex",
  live: "LIVE",
  /** The h1, a play on "Gotta catch 'em all": lead + highlighted verb + a new line. Any part may be empty. */
  hero: { lead: "Gotta", scan: "scan", tail: "'em all." },
  lede: "Live listings from Collector Crypt, Magic Eden and Slabz, deal scores and every wallet's moves, for tokenized graded cards on Solana.",
  newKicker: "New on Decard",
  newTitle: "Rip packs, keep real slabs.",
  typeKicker: "Pick your type",
  typeTitle: "Browse by franchise.",
  typeSub:
    "Graded Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, sports and more: live asks by grade for every listed slab on Collector Crypt, Magic Eden and Slabz.",
  faqKicker: "Trainer FAQ",
  faqTitle: "Questions, answered.",
  tipTitle: "PROFESSOR'S TIP",
  tip: "A PSA 10 with a population of 12 is a different beast from a PSA 10 everyone owns. Before you buy, check the pop report, the gem rate and how far the price sits from insured value.",
  guideBtn: "Read the Trainer's Guide",
  dealBtn: "Find a deal",
  title: "Rip packs, scan the market and redeem graded cards on Solana",
  description:
    "Open packs of real PSA, CGC and BGS slabs, find deals across Collector Crypt, Magic Eden and Slabz, then ship the physical card home. Pokémon, One Piece, sports and more, with a live trade tape and wallet tracker.",
  faq: [
    {
      q: "What is Decard?",
      a: "A free, open-source scanner and tracker for tokenized graded cards on Solana. It ranks live listings from Collector Crypt, Magic Eden and Slabz by deal score, decodes every on-chain sale, listing and bid, and shows population reports and any wallet's cards.",
    },
    {
      q: "What is a deal score?",
      a: "How far a USDC listing sits under the card's insured value, from 0 to 100. A card insured at $100 and listed at $80 scores 20. Sorting the scanner by best deal puts the deepest discounts first.",
    },
    {
      q: "Is Decard part of Collector Crypt?",
      a: "No. Decard is independent and fan-made. It reads Collector Crypt's public marketplace API and the Solana blockchain, and links out to Collector Crypt, Magic Eden and Slabz when you want to buy.",
    },
    {
      q: "Do I need to sign up or connect a wallet?",
      a: "Not to browse. The scanner, trade tape and trackers are read-only: no account, no wallet connection and no API key. Paste any Solana address to see that wallet's graded cards and marketplace activity. Connect a wallet only if you want to rip packs.",
    },
    {
      q: "Which cards does Decard cover?",
      a: "Every tokenized graded card listed on Collector Crypt, Magic Eden or Slabz: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam and sports cards, graded by PSA, CGC, Beckett (BGS) and others.",
    },
    {
      q: "Where does the data come from?",
      a: "Listings, insured values, bids and population reports come from Collector Crypt's public API. The trade tape is decoded from the Collector Crypt marketplace program on Solana. There is no database: every number is read live.",
    },
  ],
  more: [
    { href: "/pokemon-card-value-checker", label: "Check a Pokémon card's value" },
    { href: "/pokemon", label: "Pokémon prices by Pokémon" },
    { href: "/luck", label: "Check the luck of a gacha pull" },
    { href: "/cards-token", label: "$CARDS price, buybacks and burns" },
    { href: "/sales", label: "Recent verified sales" },
    { href: "/cards", label: "Browse every listed card" },
    { href: "/tokenized-trading-cards", label: "How tokenized trading cards work" },
    { href: "/guide", label: "Every term in the Trainer's Guide" },
  ],
  /** The live numbers under the hero (components/home/HeroStats.tsx). The SOL price keeps its ticker. */
  stats: { listed: "Cards listed", floor: "Floor", top: "Top listing" },
  /** The catch-a-deal Poké Ball beside the hero (components/HeroCatch.tsx, Pokeball3D.tsx). */
  catch: {
    unlisted: "Unlisted",
    /** A best deal on the scope, for screen readers. {card} is the card's name and grade, {price} its ask. */
    blip: "{card}, {price}",
    blipUnder: "{card}, {price}, {under}% under insured value",
    throw: "Throw the Poké Ball to catch a deal",
    /** The same button once the 3D ball has loaded. */
    throw3d: "Throw the Poké Ball to catch a random deal",
    /** {card} is the card's name in capitals and its grade. */
    caught: "Gotcha! {card} was caught!",
    insured: "insured {value}",
    under: "{pct}% under",
    view: "View card",
    again: "Throw again",
    shaking: "Wobble... wobble...",
    prompt: "Tap the ball to catch a deal",
    promptAgain: "Tap the ball to throw again",
  },
  /** The strip of new listings under the hero (components/home/JustListedTicker.tsx). */
  ticker: {
    label: "Just listed",
    loading: "Reading the market…",
    empty: "No new listings in the last few minutes.",
  },
  /** The /rip card under "New on Decard" (components/home/RipHighlight.tsx, RipHighlightHits.tsx). */
  ripCard: {
    title: "Rip graded card packs.",
    /** {psa}, {bgs} and {cgc} are the grading companies' names, in bold. */
    hook: "A real {psa}, {bgs} or {cgc} slab in every pack.",
    body: "Pokémon, One Piece, Dragon Ball, Lorcana and sports, each with its own reveal. Keep the slab, or sell it back in one tap.",
    cta: "Rip a pack",
    /** The Rip Gym link. {gym} is gymName, in bold. */
    gym: "{gym} leaderboards and pack odds",
    gymName: "Rip Gym:",
    pulled: "Just pulled",
    pullsLabel: "Latest pulls on Decard",
    idle: "Every pack holds a real graded slab. Rip one and your pull lands here.",
  },
  /** The /redeem card (components/home/RedeemHighlight.tsx). */
  redeemCard: {
    eyebrow: "Redeem",
    /** {em} is titleEm, highlighted. */
    title: "Bring your slab {em}",
    titleEm: "home.",
    body: "Pulled a keeper? Trade its NFT for the real graded slab, shipped from the vault to your door.",
    cta: "Redeem a card",
    /** Map labels on the globe. */
    vault: "Vault",
    town: "Your town",
  },
  /** The live gacha card (components/home/GachaHighlight.tsx, GachaHighlightLive.tsx). */
  gachaCard: {
    live: "Live gacha",
    title: "Packs ripping right now.",
    body: "Every Collector Crypt pack opening as it lands.",
    cta: "Watch the live gacha",
    score: "Score my pulls",
    counting: "Counting pulls…",
    /** {n} is drawn in bold. */
    perMinute: { one: "{n} pull a minute", other: "{n} pulls a minute" },
    /** After the pull rate. {multiple} (bold) is the hit's value over its pack price, {card} the card, {value} "price → insured value". */
    biggest: "biggest hit lately {multiple}, {card} {value}",
  },
  /** components/home/HomeSections.tsx: the market rail, the live zone and the market snapshot. */
  market: {
    kicker: "On the market",
    /** The tab list's label. */
    tabsLabel: "Listings",
    tabs,
  },
  onChain: {
    kicker: "Live on-chain",
    title: "Every move, as it lands.",
    sub: "Decoded straight from the Collector Crypt marketplace program: every sale, listing and bid.",
    more: "Full live tape",
    /** Under the Game Boy. A, B, SELECT and START are its buttons. */
    gameBoy: "A and B flip events, SELECT hides bots, START opens the full tape.",
    moves: "Latest moves",
    quiet: "The market is quiet right now.",
    bidsTitle: "Hot bids",
    bidsSub: "Cards getting offers right now, with the best live bid.",
    bids: { one: "{n} bid", other: "{n} bids" },
    /** The top bid as a share of the insured value ("ins"). */
    ofInsured: "{pct}% of ins",
    noBids: "No live bids in the recent window.",
  },
  /** Shown when both market feeds fail. */
  offline: {
    title: "The DEX lost signal for a moment.",
    retry: "Try again",
    text: "The market feed didn't answer. It usually comes back within a few seconds.",
  },
  snapshot: {
    kicker: "Market snapshot",
    title: "Pick a type, read the market.",
    sub: "Listed supply, floor and the top listing for every category, on Collector Crypt, Magic Eden and Slabz.",
  },
  /** The Pokédex-style market snapshot (components/home/DexEntry.tsx). */
  dex: {
    allVenues: "All venues",
    /** The venue buttons' group label. */
    venue: "Venue",
    /** The category's Pokédex number. */
    no: "No.{no}",
    /** {type} is the category's type name from `types`. */
    type: "The {type} category",
    listed: "Listed",
    floor: "Floor",
    top: "Top listing",
    /** {card} links to the cheapest card, {price} is its price. */
    floorCard: "Floor card: {card} at {price}",
    types,
  },
};
