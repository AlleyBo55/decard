// English source. Translations in ../<locale>/explainer.ts use the same keys.
// The tokenized trading cards explainer (app/[lang]/tokenized-trading-cards). Server-only.
// The page's title and description (metadata and JSON-LD) come from seo.pages["/tokenized-trading-cards"].
export const explainer = {
  /** OpenGraph article:section and article:tag. */
  meta: {
    section: "Tokenized trading cards",
    tags: ["Collector Crypt", "tokenized trading cards", "onchain TCG", "Solana", "graded cards"],
  },
  /** JSON-LD only: the Article's topics. */
  ld: {
    about: ["Tokenized trading cards", "Collector Crypt", "Solana", "Trading card games"],
  },
  breadcrumb: {
    label: "Breadcrumb",
    page: "Tokenized trading cards",
  },
  hero: {
    kicker: "Graded cards · Solana · onchain TCG",
    /** {accent} is h1Accent, drawn in red. */
    h1: "Tokenized trading cards, {accent}",
    h1Accent: "explained.",
    lede: "A graded Pokémon, One Piece or sports card can stay protected in a vault while its ownership moves on Solana. Here is how that model works, how Collector Crypt vaults and tokenizes graded cards, and how to research a card before you trade it.",
    scan: "Scan live listings",
    glossary: "Open the graded-card glossary",
    /** The article's author, also its JSON-LD author name. */
    author: "Decard contributors",
    /** {author} is `author`, linked to the source code. {date} is the publish date, e.g. October 23, 2026. */
    byline: "By {author} · Published and reviewed {date} · 10 minute read · Independent, not financial advice",
  },
  /** The three cards under the header. */
  pillars: [
    { label: "PHYSICAL", text: "A professionally graded slab remains in vault custody." },
    { label: "ONCHAIN", text: "A unique Solana asset records the transferable ownership claim." },
    { label: "REDEEMABLE", text: "The owner can follow the custodian's process to receive the card." },
  ],
  whatIs: {
    title: "What is a tokenized trading card?",
    intro: "A tokenized trading card connects a unique blockchain asset to a physical collectible held by a custodian. The physical slab does not need to cross the country every time ownership changes. Instead, the on-chain asset moves between wallets, and the underlying card stays in storage until an owner redeems it.",
    /** {product}, {deposit} and {withdraw} link to Collector Crypt's docs, worded by productLink, depositLink and withdrawLink. */
    redeemable: "This is different from a purely digital collectible. Collector Crypt says its card assets are physically redeemable: a collector can deposit an eligible graded card and receive the corresponding asset, or burn that asset during withdrawal so the physical card can be shipped. Read the current {product}, {deposit} and {withdraw} before transacting because custody, eligibility, costs and timing can change.",
    productLink: "Collector Crypt product description",
    depositLink: "deposit process",
    withdrawLink: "withdrawal process",
    noteTitle: "TOKEN ≠ THE SLAB ITSELF",
    note: "The asset is the transferable on-chain record tied to the vaulted card. Redemption depends on the custodian, the card's status and the platform's current terms.",
  },
  platform: {
    title: "How Collector Crypt works on Solana",
    intro: "Collector Crypt combines card custody with a Solana marketplace. According to its documentation, deposited cards must already be graded. After inspection and vaulting, the depositor receives an NFT representing the card. The marketplace uses USDC for purchases and SOL for network fees.",
    /** {n} is the step number: 01, 02, 03, 04. */
    step: "STEP {n}",
    steps: [
      { title: "Grade and vault", text: "An eligible slab is inspected and stored; its identity includes details such as set, serial number, grader, grade and certification." },
      { title: "Represent ownership", text: "A unique asset in a Solana wallet points to that card while the physical slab remains in custody." },
      { title: "Trade", text: "A holder can list the asset. Collector Crypt describes listings as escrowless: the asset stays in the seller's wallet until a sale." },
      { title: "Redeem", text: "The owner starts a withdrawal, burns the on-chain asset and pays applicable shipping so the custodian can send the slab." },
    ],
    /** {link} links to the Solana Foundation article, worded by solanaLink. */
    broader: "The broader model is often called tokenized collectibles or real-world assets (RWAs). The {link} describes several platforms that use on-chain ownership while physical items stay in custody. Each platform has different terms, so “tokenized” alone does not tell you who holds the item or exactly what redemption guarantees.",
    solanaLink: "Solana Foundation overview",
  },
  research: {
    title: "How to research a tokenized graded card",
    intro: "A good listing is more than a familiar character and a low price. Check these fields together:",
    fields: [
      { term: "Identity", meaning: "Match the year, set, card number, language, parallel and autograph status. Similar-looking releases can have very different values." },
      { term: "Grade and certificate", meaning: "Confirm the grading company, numeric grade and certificate number. Follow Decard's cert link to the grader when one is available." },
      { term: "Population", meaning: "The population report counts how many examples the grader recorded at this grade and above. Low population can support scarcity, but it does not create demand." },
      { term: "Price and insured value", meaning: "Treat insured value as one reference supplied with the card, not a guaranteed sale price or a complete appraisal." },
      { term: "Bids and activity", meaning: "Live offers, recent sales and listing changes reveal more about liquidity than an asking price by itself." },
      { term: "Custody and redemption", meaning: "Check the current custodian, withdrawal eligibility, shipping cost, destination restrictions and expected timing on the marketplace." },
    ],
    /** {link} links to PSA's Population Report, worded by psaLink. */
    population: "PSA describes its {link} as the record of how many items it has graded at each grade. Decard shows the reported grade population, population higher, total population and gem rate when Collector Crypt provides them.",
    psaLink: "Population Report",
  },
  dealScore: {
    title: "Decard's deal score",
    intro: "Deal score is a ranking shortcut for listings priced in USDC. It measures how far the asking price is below the card's insured value:",
    formulaLabel: "FORMULA",
    formula: "(1 − listing price ÷ insured value) × 100",
    /** Labels over the worked example: $100 insured, $80 listed, score 20. */
    insured: "INSURED",
    listed: "LISTED",
    score: "DEAL SCORE",
    limits: "The score is clamped from 0 to 100. It appears only when a card has an insured value and a USDC listing, because Decard does not guess a dollar price for SOL listings when ranking deals. A score of 20 means “listed 20% under insured value,” not “worth 20% more” and not “guaranteed profit.”",
    more: "Open the live best-deal ranking",
  },
  terms: {
    title: "TCG, NFT, RWA or crypto trading card?",
    /** {tcg}, {nft} and {rwa} are the bold terms tcg, nft and rwa. */
    labels: "These labels overlap, but they answer different questions. {tcg} means trading card game and describes categories such as Pokémon, One Piece or Magic: The Gathering. {nft} describes a unique blockchain asset. {rwa} emphasizes that the asset is connected to something physical. “Crypto trading card” is informal and can also mean a card that exists only digitally.",
    tcg: "TCG",
    nft: "NFT",
    rwa: "RWA",
    /** {tcc} is the bold term tcc. */
    tccNote: "{tcc} is sometimes used informally for “trading card crypto,” but it has no consistent meaning across the card market. “Tokenized trading cards” or “onchain TCG collectibles” describes this category more clearly.",
    tcc: "TCC",
    /** {phrase} is the bold term phrase. */
    best: "For the model Decard tracks, {phrase} is the least ambiguous phrase: a specific, professionally graded physical slab represented on-chain while held in custody.",
    phrase: "tokenized graded trading card",
  },
  risks: {
    title: "What the token does not remove",
    /** One risk, run-in style: {title} is the item's title (with its full stop), drawn bold, then {text}. */
    item: "{title} {text}",
    items: [
      { title: "Market risk.", text: "A listing, insured value or past sale does not guarantee what another buyer will pay. Thinly traded cards may have a wide spread between asking prices and executable bids." },
      { title: "Custody risk.", text: "The physical card is held by a custodian. Verify who holds it, the insurance arrangement and what happens if the platform or custodian has a problem." },
      { title: "Redemption risk.", text: "Shipping fees, supported destinations, taxes, delays and card eligibility can change. Partner-vault cards may take longer to ship." },
      { title: "Metadata risk.", text: "Wrong set, parallel, grade or certificate data can distort comparisons. Verify the slab and grader record rather than relying on one screen." },
      { title: "Wallet and contract risk.", text: "Marketplace transactions require wallet signatures. Read every transaction, protect seed phrases and use official links." },
    ],
  },
  decard: {
    title: "What Decard adds",
    intro: "Collector Crypt provides the assets and marketplace. Decard is an independent research interface over public data. It combines the marketplace catalogue with on-chain activity so a collector can move from discovery to due diligence without connecting a wallet.",
    features: [
      { title: "Listing scanner", text: "Ranks listings by deal score, price or freshness across Collector Crypt and Magic Eden." },
      { title: "Card pages", text: "Bring together card identity, grade, certificate, insured value, pop report, listing, bids and history." },
      { title: "Live tape", text: "Decodes recent Collector Crypt marketplace instructions into sales, listings, reprices and bids." },
      { title: "Wallet tracer", text: "Shows the graded cards and decoded marketplace activity associated with any Solana address." },
    ],
    /** {guide} links to the guide page, worded by guideLink. */
    data: "Decard has no database and no private market indexer. Listings, insured values, bids and population data come from Collector Crypt's public API; activity comes from the Collector Crypt marketplace program on Solana. Short caches reduce upstream load, so numbers can lag by seconds. See the {guide} for every field and limitation.",
    guideLink: "Trainer's Guide",
  },
  /** Rendered on the page and as FAQPage JSON-LD. */
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Is a tokenized trading card the same as a digital card?",
        a: "No. In the model covered here, a unique on-chain asset represents a professionally graded physical card held in a vault. The token can move between wallets while the slab stays in custody, and the owner can follow the platform's process to redeem the physical card.",
      },
      {
        q: "Is this a TCG, NFT, RWA or crypto trading card?",
        a: "It can be described with all four terms, but they mean different things. TCG identifies the card category, NFT describes the unique on-chain asset, and RWA describes its link to a physical item. Tokenized trading card is the clearest overall term.",
      },
      {
        q: "Does a high Decard deal score guarantee profit?",
        a: "No. It only measures the discount between a USDC listing and Collector Crypt's insured value. It does not prove demand, liquidity, authenticity beyond the displayed records, future sale price or redemption economics.",
      },
      {
        q: "Do I need a wallet to use Decard?",
        a: "No. Decard is a read-only research tool. You only need a compatible Solana wallet, USDC and SOL when you choose to transact on a marketplace such as Collector Crypt.",
      },
      {
        q: "Where does Decard get its card and market data?",
        a: "Listings, card details, insured values, bids and population reports come from Collector Crypt's public API. Market activity comes from the Collector Crypt marketplace program on Solana. Decard has no database or private indexer.",
      },
    ],
  },
  sources: {
    title: "Sources and methodology",
    intro: "This guide summarizes the platform model; marketplace terms are controlled by the original providers. Check these sources for current operational details:",
    links: {
      product: "Collector Crypt product information",
      market: "Collector Crypt marketplace user guide",
      deposit: "Collector Crypt depositing cards",
      withdraw: "Collector Crypt withdrawing cards",
      solana: "Solana overview of tokenized cards and collectibles",
      psa: "PSA Population Report (sign-in may be required)",
      code: "Decard source code and calculation logic",
    },
  },
  cta: {
    title: "READY TO RESEARCH A CARD?",
    text: "Scan the live market, then open a card to verify its grade, population, bids and history.",
    deals: "Find live deals",
    tape: "Watch the trade tape",
  },
  /** The sticky table of contents. */
  aside: {
    label: "On this page",
    title: "ON THIS PAGE",
    toc: {
      whatIs: "Tokenized cards",
      platform: "Collector Crypt",
      research: "Research checklist",
      dealScore: "Deal score",
      terms: "TCG, NFT and RWA",
      risks: "Risks",
      decard: "How Decard works",
      faq: "FAQ",
      sources: "Sources",
    },
  },
};
