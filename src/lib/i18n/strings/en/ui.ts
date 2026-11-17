// English source. Translations in ../<locale>/ui.ts use the same keys.
// Shared components used on many pages: search box, card tiles, activity rows, Game Boy, skeletons.

/** Activity labels by lib/format.ts activityDisplay() verb. Read as `t.ui.verbs[verb] ?? verb`. */
const verbs: Record<string, string> = {
  SALE: "SALE",
  "BID TAKEN": "BID TAKEN",
  REPRICE: "REPRICE",
  DELIST: "DELIST",
  LISTED: "LISTED",
  "NEW BID": "NEW BID",
  "BID EDIT": "BID EDIT",
  "BID PULLED": "BID PULLED",
};

export const ui = {
  verbs,
  /** Slabz rip tiers (components/rip/shared.ts TIER_INFO), shared by Rip, Gym and the home page. */
  ripTiers: {
    common: { label: "Common", ballName: "Poké Ball", cry: "Gotcha!" },
    rare: { label: "Rare", ballName: "Great Ball", cry: "Great catch!" },
    epic: { label: "Epic", ballName: "Ultra Ball", cry: "Ultra catch!" },
    legendary: { label: "Legendary", ballName: "Master Ball", cry: "A legendary appeared!" },
  },
  /** Collector Crypt gacha tiers (components/gacha/shared.ts TIER_LABEL), shared by the gacha, luck and card pages. */
  gachaTiers: {
    common: "Common",
    uncommon: "Uncommon",
    rare: "Rare",
    epic: "Epic",
  },
  /** Words inside the components/ui.tsx primitives (printed by components/ui-client.tsx). */
  primitives: {
    /** Type chip for a card with no category. */
    otherCategory: "Other",
    /** HP bar label: how far a listing sits under its insured value. */
    deal: "DEAL",
    /** HP bar tooltip. {score} is 0 to 100. */
    dealScore: "Deal score {score}/100",
    /** The Poké Ball loader's default label; "..." follows it. */
    loading: "Loading",
  },
  /** A card with no name in the data. */
  unknownCard: "Unknown card",
  /** Card tiles in rails and grids (components/CardTile.tsx). */
  cardTile: {
    unlisted: "Unlisted",
    /** Insured value, short to fit the tile. {value} is a compact price ("$1.2K"). */
    insured: "ins {value}",
  },
  /** Activity feed rows (components/ActivityRow.tsx). The event label comes from `verbs`. */
  activity: {
    /** An event whose card could not be matched. */
    unresolvedCard: "Unresolved card",
    /** Sale rows name the seller first. {wallet} is the wallet's link. */
    fromWallet: "from {wallet}",
    /** Every other row names who listed or bid. {wallet} is the wallet's link. */
    byWallet: "by {wallet}",
    /** Tooltip on the receiving wallet when it still holds the card. */
    currentHolder: "current holder · {address}",
    /** Tag on bulk bid-bot transactions, and its tooltip. */
    bot: "BOT ×{n}",
    botOffers: { one: "{n} offer in one transaction", other: "{n} offers in one transaction" },
  },
  /** Card and wallet search box (components/WalletSearch.tsx). */
  search: {
    /** The header's small box. */
    placeholderCompact: "Search cards or wallets",
    placeholder: "Search a card, or paste a wallet address",
    /** The box's accessible name. */
    label: "Search cards or wallets",
    button: "Search",
    searching: "Searching...",
    empty: "No cards found",
    /** Last row of the suggestions; an arrow follows it. */
    seeAll: { one: "See {n} result", other: "See all {n} results" },
  },
  /** Arrow buttons on horizontal card rails (components/motion.tsx Rail). */
  rail: { left: "Scroll left", right: "Scroll right" },
  /** Toast for the ↑↑↓↓←→←→BA easter egg (components/Konami.tsx). */
  konami: { on: "DMG mode on! Welcome back to 1996.", off: "Back to full colour." },
  /** The live-market Game Boy (components/gameboy/GameBoy.tsx). */
  gameBoy: {
    /** Filters that SELECT cycles through, shown on the device. */
    modes: { all: "ALL", trainers: "NO BOTS", sales: "SALES" },
    booting: "Booting up the DEX...",
    empty: "No trainers nearby. Waiting for the next move...",
    /** Screen corner before the first event. */
    live: "LIVE",
    /** Printed on the device. Real Game Boys keep these in English in every region: translate only if readers would not recognise them. */
    device: {
      power: "◀ OFF · ON ▶",
      stripe: "LIVE ON-CHAIN · DOT MATRIX",
      battery: "BATTERY",
      /** After the Decard logo. {mode} is the current filter. */
      model: "POCKET · {mode}",
      select: "SELECT",
      start: "START",
    },
    /** Accessible names for the device and its buttons. */
    aria: {
      device: "Live market Game Boy. Use arrow keys to browse events and Enter to open a card.",
      previous: "Previous event",
      next: "Next event",
      b: "B: previous event",
      a: "A: next event",
      /** {mode} is the current filter. */
      select: "Select: filter is {mode}",
      start: "Start: open the full tape",
    },
    /**
     * One battle line per market event. {card} is the card's name and grade in capitals ("ALAKAZAM PSA 10"),
     * {price} the amount ("$120"), {trainer} a short wallet address. The NoPrice lines are for events without an amount.
     */
    battle: {
      sale: "Gotcha! {card} was caught for {price}!",
      saleNoPrice: "Gotcha! {card} was caught!",
      bidTaken: "{card} accepted a bid of {price}!",
      bidTakenNoPrice: "{card} accepted a bid!",
      listed: "A wild {card} appeared on the market!",
      reprice: "{card} changed its price!",
      delist: "{card} fled the market!",
      newBid: "Trainer {trainer} threw a bid at {card}!",
      bidEdit: "Trainer {trainer} adjusted a bid on {card}.",
      bidPulled: "Trainer {trainer} called back a bid on {card}.",
      other: "Something happened to {card}...",
    },
  },
};
