// English source. Translations in ../<locale>/card.ts must keep these keys.
// The card page (components/card/CardPage.tsx), a shared pull receipt (/card/<mint>/pull/<pack>)
// and the "Share pull" dialog. Card names, sets, grades and venues arrive as the API gives them.
// Prices ({insured}, {price}, {pack}) arrive formatted ("$1,250", "$50"); {multiple} reads "3.2×".
export const card = {
  /** Page titles, descriptions and share-image alt text. {name} is the short card name with its grade ("Charizard PSA 10"). */
  meta: {
    notFound: "Card not found",
    title: "{name} price · {set}",
    titleNoSet: "{name} price",
    /** {name} here is the full catalogue name. */
    description: "{name}. Insured at {insured}. Live price, population report, bids and on-chain history on Decard.",
    imageAlt: "{name}: insured value, listing, best bid and population",
    pullImageAlt: "{name} pulled from a {pack} pack, insured at {insured}",
    pullTitle: "Pulled {name} from a {pack} pack",
    pullDescription: "Insured value {insured}, {multiple} the pack price. Pack price set by the sharer. Live price, pop report and bids on Decard.",
    pullDescriptionNoValue: "Pack price set by the sharer. Live price, pop report and bids on Decard.",
  },
  /** schema.org Product: fact names and the certification identifier. */
  jsonLd: {
    gradingCompany: "Grading company",
    grade: "Grade",
    set: "Set",
    year: "Year",
    cardNumber: "Card number",
    parallel: "Parallel",
    certNumber: "Certification number",
    gradePopulation: "Grade population",
    populationHigher: "Population higher",
    totalPopulation: "Total graded population",
    identifier: "{company} certification {cert}",
    /** {company} in the identifier when the grader is unknown. */
    anyGrader: "Grading",
  },
  loading: "Loading card",
  breadcrumb: {
    label: "Breadcrumb",
    scanner: "Scanner",
  },
  /** The banner on a shared pull receipt link. */
  sharedPull: {
    label: "Shared pull",
    kicker: "SHARED PULL",
    pulled: "Pulled from a {pack} pack.",
    pulledWithValue: "Pulled from a {pack} pack. Insured value is {multiple} the pack price.",
    note: "The pack price comes from whoever shared the link.",
    cta: "Score your own pulls →",
  },
  actions: {
    viewOnCollectorCrypt: "View on Collector Crypt ↗",
    buyOnSlabz: "Buy on Slabz · {price} ↗",
  },
  authenticated: "✓ Authenticated",
  /** Rarity chip by graded population (lib/pull.ts rarityTier). */
  rarity: {
    LEGENDARY: "LEGENDARY",
    RARE: "RARE",
    UNCOMMON: "UNCOMMON",
    COMMON: "COMMON",
  },
  price: {
    listed: "Listed price",
    notListed: "Not listed",
    /** {ago} reads "5m ago". */
    listedOn: "on {venue} · updated {ago}",
    insured: "INSURED",
    bestBid: "BEST BID",
    underInsured: "{pct}% under insured value",
    overInsured: "{pct}% over insured value",
  },
  /** The card's catalogue facts. */
  facts: {
    title: "Pokédex data",
    set: "Set",
    year: "Year",
    number: "Number",
    parallel: "Parallel",
    grader: "Grader",
    grade: "Grade",
    cert: "Cert #",
    vault: "Vault",
    token: "Token",
  },
  /** Population report. {grade} is the grade's number ("10"). */
  pop: {
    title: "Base stats · {company} pop report",
    fullReport: "Full pop report ↗",
    grade: "Pop {grade}",
    /** The receipt's pop label when the slab has no grade. */
    plain: "Pop",
    higher: "Higher",
    total: "Total",
    gemRate: "Gem rate",
    summary: "{pop} graded at this grade out of {total} total, {higher} higher.",
    summaryNoneHigher: "{pop} graded at this grade out of {total} total, and none higher.",
    lastGem: "Last gem graded {date}.",
  },
  bids: {
    title: "Live bids",
    count: "Live bids ({n})",
    unavailable: "Live bids are unavailable right now. Check back in a moment.",
    none: "No live bids. Be the first trainer to make an offer.",
    /** A bid as a share of the insured value. */
    ofInsured: "{pct}% of ins",
  },
  trainer: {
    title: "Trainer",
    collectorCryptName: "Collector Crypt name: {name}",
    open: "Open trainer card →",
    unknown: "Owner unknown.",
  },
  history: {
    title: "On-chain history",
    error: "Couldn't read this card's history right now.",
    empty: "No marketplace history on-chain yet.",
  },
  /** The slab viewer (CardFlip). */
  slab: {
    showFront: "Show front of slab",
    showBack: "Show back of slab",
    /** Alt text for the back photo, here and in the receipt dialog. */
    backAlt: "{name}, back of slab",
    flip: "↻ Flip slab",
  },
  /** Rails under the card. {name} is a Pokémon or the card's first words; {set} a set name. */
  related: {
    sameKicker: "Compare grades",
    sameTitle: "Other {name} slabs listed now",
    sameSub: "Current asking prices, lowest first.",
    sameLabel: "Other {name} listings",
    hubLink: "{name} card prices by grade",
    scannerLink: "Every {name} listing in the scanner",
    setKicker: "Same set",
    setTitle: "More from {set}",
    setSub: "Newest listings first.",
    setLabel: "More listings from {set}",
  },
  /** The "Share pull" button and its dialog (components/card/pull). */
  receipt: {
    button: "Share pull",
    close: "Close",
    slabLabel: "Your slab",
    title: "Pull receipt",
    heading: "Share your pull",
    statsLabel: "Slab stats",
    insured: "Insured",
    bestBid: "Best bid",
    listedAt: "Listed at {price} on {venue}",
    notListed: "Not listed right now",
    checking: "Checking the listing…",
    packQuestion: "What did the pack cost?",
    optional: "Optional",
    otherAmount: "Other amount",
    otherAmountLabel: "Other pack price in dollars",
    noPack: "No pack",
    invalidPack: "Enter $1 to $100,000.",
    meter: "Insured ÷ pack",
    exp: "EXP",
    noteMultiple: "Insured value is {multiple} the {pack} pack price.",
    notePick: "Pick the pack price to get the multiple.",
    noteNoValue: "No insured value on file for this slab.",
    shareIt: "Share it",
    postOnX: "Post on X",
    saveImage: "Save image",
    more: "More",
    copy: "Copy",
    preview: "Link preview",
    previewNote: "What X and Discord show",
    previewAlt: "Share image for {name}",
    rendering: "Rendering…",
    fine: "You set the pack price; nothing checks it. Insured value is Collector Crypt's number, not a sale price. The share image's figures refresh once a day.",
    lidTag: "PULL RECEIPT",
    share: "Share",
    copyLink: "Copy link",
    toast: {
      discord: "Copied. Paste it in Discord and the receipt unfurls.",
      copied: "Link copied.",
      copyFailed: "Couldn't copy. Press and hold the link instead.",
      shareFailed: "Share sheet didn't open. Copy the link instead.",
    },
    /** The Game Boy text box during and after the catch. {name} is the card name in capitals. */
    say: {
      throw: "DECARD used POKé BALL!",
      click: "Click!",
      multiple: "Insured value: {multiple} the {pack} pack!",
      caught: "Gotcha! {name} was caught!",
    },
    /** The post text for X, Telegram, Reddit and the share sheet. {name} is the card name with its grade. */
    post: {
      pulled: "Pulled {name} from a {pack} pack.",
      pulledWithValue: "Pulled {name} from a {pack} pack. Insured value {insured} ({multiple} the pack).",
      /** Without a pack price the post reads "Charizard PSA 10 · insured value $1,250 · pop 312". */
      insured: "insured value {insured}",
      pop: "pop {pop}",
    },
  },
  /** The catch screen inside the dialog (pull/Stage.tsx). */
  stage: {
    showFront: "Show the front of the slab",
    showBack: "Show the back of the slab",
    flip: "↻ Flip",
    tilt: "◎ Tilt",
    skip: "Skip ▸▸",
  },
};
