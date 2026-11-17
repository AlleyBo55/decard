// English source. Translations in ../<locale>/market.ts must keep these keys.
// The market pages: listing scanner, live tape, recent sales, card directory and wallet pages.
// Page titles and descriptions of /scanner, /tape, /sales and /cards live in seo.pages.

export const market = {
  /** Breadcrumb <nav> label on these pages. */
  breadcrumb: "Breadcrumb",
  "scanner": {
    "kicker": "Listing scanner",
    "h1a": "Every listing,",
    "h1b": "ranked.",
    "lede": "Live graded cards across Collector Crypt, Magic Eden and Slabz. The deal score shows how far each USDC listing sits under its insured value, so the best buys float to the top.",
    "prices": "Check Pokémon card prices and PSA values →",
    "directory": "Browse the graded card directory by exact name, grade, set and year →",
    "crumb": "Scanner",
    /** Category scanner pages (/scanner?search=Pokemon). {name} is the category's display name. */
    categoryTitle: "{name} graded cards for sale on Solana",
    /** Replaces categoryTitle when it runs past 60 characters with " · Decard" added. */
    categoryTitleShort: "{name} graded cards on Solana",
    categoryDescription: "Live {name} graded card listings on Collector Crypt and Magic Eden, ranked by deal score: how far each slab sits under its insured value.",
    /** Loading state. The loader adds "...". */
    scanning: "Scanning the market",
  },
  /** The scanner's filters and results (components/scanner/ScannerTable.tsx). */
  scannerTable: {
    allTypes: "All types",
    filter: "Filter by name, set, mint or cert #",
    filterLabel: "Filter listings",
    sortLabel: "Sort",
    sorts: {
      deal: "Best deal",
      listedDateDesc: "Newest",
      listedPriceAsc: "Price ↑",
      listedPriceDesc: "Price ↓",
    },
    venueLabel: "Venue",
    /** The venue switch's first option, next to Collector Crypt, Magic Eden and Slabz. */
    allVenues: "All",
    min: "$ min",
    max: "$ max",
    minLabel: "min price",
    maxLabel: "max price",
    viewLabel: "View",
    list: "List",
    grid: "Grid",
    /** {n} is the number of results. */
    matching: { one: "{n} matching card", other: "{n} matching cards" },
    /** After the count when sorted by best deal. */
    deals: "graded-card deals from the freshest and cheapest, best first",
    dealsSlabz: "graded-card deals from the top of Slabz's own deal list, best first",
    updating: "UPDATING",
    errorTitle: "The scanner fainted!",
    errorText: "The market didn't answer. Try again in a moment.",
    retry: "Revive it",
    empty: "No cards here. Try another type or widen the price range.",
    columns: { card: "CARD", price: "PRICE", insured: "INSURED", deal: "DEAL SCORE", listed: "LISTED" },
    unlisted: "Unlisted",
    aboveInsured: "Above insured",
    loadingMore: "Loading...",
    loadMore: "Load more cards",
  },
  /** The live tape page (app/[lang]/tape). */
  tape: {
    kicker: "Live trade tape",
    /** {accent} is h1Accent, highlighted. */
    h1: "The market's {accent}",
    h1Accent: "heartbeat.",
    lede: "Every move on the Collector Crypt marketplace program, decoded in real time: who bought what, at what grade, for how much, and from whom.",
    sales: "Recent sales with prices and Solana transaction links →",
  },
  /** The tape's stats, filters and feed (components/tape/TapeBoard.tsx). */
  tapeBoard: {
    volume: "Sale volume",
    volumeNote: { one: "{n} sale", other: "{n} sales" },
    biggest: "Biggest sale",
    biggestNote: "in this window",
    bids: "Bid moves",
    bidsNote: { other: "{n} by bulk bots" },
    traders: "Active trainers",
    tradersNote: { one: "last {n} event", other: "last {n} events" },
    filterLabel: "Filter",
    filters: { all: "All moves", sales: "Sales", listings: "Listings", bids: "Bids" },
    hideBots: "Hide bulk bid bots",
    refresh: "REFRESH 10s",
    errorTitle: "The tape got tangled!",
    errorText: "The public Solana RPC didn't answer. It usually recovers within seconds.",
    retry: "Try again",
    emptyTitle: "Nothing in this filter right now.",
    emptyText: "Try All moves, or show bulk bots. Sales on Collector Crypt come in bursts.",
  },
  /** The recent sales page (app/[lang]/sales). */
  sales: {
    loading: "Loading recent sales",
    kicker: "Settled sales · verified on Solana",
    /** {accent} is h1Accent, highlighted. */
    h1: "Recent card sales, {accent}",
    h1Accent: "on the record.",
    lede: "The latest settled sales of tokenized graded cards on the Collector Crypt marketplace: what sold, at which grade, for how much and between which wallets. Every row links to the Solana transaction that settled it.",
    /** {from} and {to} are dates and times. */
    window: "Sales from {from} to {to} · refreshed about every 5 minutes",
    unavailable: "Sales are temporarily unavailable. The live tape still shows marketplace activity as it happens.",
    empty: "No settled sales in the latest window. The live tape shows listings and bids as they happen.",
    stats: { sales: "SALES", volume: "USDC VOLUME", median: "MEDIAN SALE", window: "WINDOW" },
    /** The window's length in hours, e.g. "6.5 h". */
    hours: "{n} h",
    /** {card} is the card (a link, or biggestUnresolved), {price} its price. */
    biggest: "Biggest sale in this window: {card} for {price}.",
    biggestUnresolved: "a card not resolved yet",
    /** A sale row whose card isn't known yet. */
    unresolved: "Card not resolved yet",
    /** Under each sale. {seller} and {buyer} are wallet links, {arrow} is a red →. */
    trade: "from {seller} {arrow} {buyer}",
    /** Structured-data list of the cards on the page. */
    soldList: "Recently sold cards",
    sourceTitle: "Where these sales come from",
    sourceTreasury: "Collector Crypt marketplace sales pay a fee to the Collector Crypt treasury wallet. Decard reads that wallet's newest transactions from Solana, decodes the marketplace instruction in each one and keeps the settled sales that carry a price. Card names, grades and images come from the Collector Crypt catalogue, matched by the card's on-chain asset address.",
    sourcePrice: "Buys use the price written in the instruction. For accepted bids on listed cards, the price is the seller's USDC credit grossed up by the 2% marketplace fee. Sales settled in SOL show their SOL amount and stay out of the dollar totals.",
    sourceScope: "Only sales on the Collector Crypt marketplace are listed. Collector Crypt cards also sell on Magic Eden, and those sales are not included here.",
    coverTitle: "What this list does not cover",
    coverWindow: "It is a recent window of a few hours, not an all-time history. Each card page shows that card's own on-chain history, and the live tape shows listings and bids as they happen.",
    coverValue: "A sale price is what one buyer paid once. Compare several sales of the same card and grade, and check live bids, before treating any single sale as the card's value. Not financial advice.",
    links: {
      tape: "Watch the live trade tape",
      pokemon: "Pokémon prices by Pokémon",
      checker: "Check a Pokémon card's value",
    },
  },
  /** The graded card directory (app/[lang]/cards, components/cards/CardDirectory.tsx). */
  cards: {
    loading: "Loading the card directory",
    /** Title of page 2 and later. {title} is page 1's title (seo.pages["/cards"]). */
    pageTitle: "{title}, page {n}",
    pageDescription: "Browse page {n} of currently listed graded cards by exact name, grade, set, year, card number and category, including Pokémon cards and PSA slabs.",
    crumb: "Graded card directory",
    crumbPage: "Page {n}",
    kicker: "Current listings · marketplace name order",
    list: "Currently listed graded cards",
    listPage: "Currently listed graded cards, page {n}",
    /** {n} cards in the directory. {time} is the catalogue's time, e.g. "2025-05-01 12:00 UTC". */
    count: {
      one: "{n} graded card listed, with asking prices as of {time}.",
      other: "{n} graded cards listed, with asking prices as of {time}.",
    },
    /** The same, when the page has cards: {from}–{to} are this page's rows. */
    countRange: {
      one: "Cards {from}–{to} of {n} graded card listed, with asking prices as of {time}.",
      other: "Cards {from}–{to} of {n} graded cards listed, with asking prices as of {time}.",
    },
    pageOf: "Page {page} of {total}",
    /** The card number in each row's details. */
    serial: "No. {serial}",
    emptyTitle: "No graded cards are listed right now.",
    emptyText: "The directory filters out ungraded items, packs and merchandise.",
    pagination: "Card directory pagination",
    previous: "Previous",
    next: "Next",
    current: "Page {n}, current page",
    goTo: "Go to page {n}",
  },
  /** Wallet pages (app/[lang]/wallet/[addr], components/wallet). */
  wallet: {
    /** Page title. {addr} is the shortened address. */
    title: "Trainer {addr}",
    /** {addr} is the full address. */
    description: "Graded card collection, insured value and on-chain marketplace activity for wallet {addr}.",
    kicker: "Trainer lookup",
    loading: "Opening the trainer card",
    /** The heading when the wallet has no name. */
    trainer: "Trainer",
    card: "TRAINER CARD",
    watch: "Add to watchlist",
    unwatch: "Remove from watchlist",
    name: "NAME",
    namePlaceholder: "Name this trainer",
    rename: "Rename",
    label: "+ Label",
    /** Badge on a known wallet, before its note. */
    bot: "Bot",
    known: "Known",
    id: "ID No.",
    copy: "Copy",
    copied: "Copied!",
    luck: "Pull luck →",
    badges: "BADGES",
    stats: { cards: "CARDS", value: "VALUE", listed: "LISTED" },
    sections: "Trainer sections",
    collection: "Collection",
    /** {n} is the number of cards. */
    collectionCount: "Collection ({n})",
    activity: "Activity",
    sortLabel: "Sort collection",
    sorts: { value: "Insured value", price: "List price", name: "Name" },
    bagError: "Couldn't open this trainer's bag right now.",
    bagEmpty: "This trainer's bag is empty.",
    bagEmptyText: "No Collector Crypt cards found in this wallet.",
    /** {shown} cards on screen out of the wallet's {n}. */
    showing: { one: "Showing the top {shown} of {n} card.", other: "Showing the top {shown} of {n} cards." },
    activityError: "The chain didn't answer. Try again in a moment.",
    activityEmpty: "No marketplace moves found for this trainer yet.",
    /** The pixel avatar's accessible name (components/wallet/TrainerAvatar.tsx, also on Rip, Gym and Redeem). */
    sprite: "Trainer sprite",
  },
};
