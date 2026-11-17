// English source. Translations in ../<locale>/checker.ts use the same keys.

// The Pokémon card value checker page (app/[lang]/pokemon-card-value-checker). Server-only.
export const checker = {
  breadcrumb: {
    label: "Breadcrumb",
    home: "Home",
    page: "Pokémon card value checker",
  },
  /** JSON-LD only. The page's name and description come from seo.pages. */
  ld: {
    about: ["Pokémon card prices", "Graded trading card values", "PSA grading"],
    currentPrices: "Current graded Pokémon card asking prices",
  },
  hero: {
    kicker: "Pokémon prices · PSA values · graded cards",
    /** {accent} is h1Accent, drawn in red. */
    h1: "Pokémon card {accent}",
    h1Accent: "value checker.",
    lede: "Search a graded Pokémon card by name, set, card number, certification number or Solana mint. Compare its current asking price with its insured reference, then inspect bids, population and market history on the individual card page.",
    /** {date} is the review date, e.g. October 23, 2026. */
    meta: "Free, read-only and no login required · Reviewed {date} · Independent data tool, not an appraisal",
  },
  search: {
    label: "What Pokémon card do you want to check?",
    hint: "Add the set, year, card number and grade when you know them. Specific searches separate similar printings.",
    placeholder: "e.g. 1999 Charizard 4/102 PSA 10",
    submit: "Check live listings",
    /** A quick search link; {name} is an English Pokémon name, the search term itself. */
    example: "Search {name}",
  },
  prices: {
    kicker: "Live marketplace snapshot",
    title: "Current Pokémon card asking prices",
    intro: "Recent credible USDC listings of graded Pokémon cards, each labelled with its marketplace. Listings and insured values come from Collector Crypt's API, which covers Collector Crypt and Magic Eden. This snapshot is cached for up to five minutes. Asking prices and insured references are comparison inputs, not guaranteed sale values.",
    unavailable: "Current examples are temporarily unavailable. Search still opens the live marketplace scanner.",
    empty: "Current examples are temporarily unavailable. The value checker and card research guides still work.",
    cardAlt: "Front of {name}",
    asking: "ASKING",
    insured: "INSURED REF.",
    underInsured: "Asking {pct}% under insured value",
    /** {venue} is a marketplace name: Collector Crypt, Magic Eden. */
    venue: "On {venue}",
    /** {date} is the listing's last update, e.g. Oct 23, 2026. */
    updated: "updated {date}",
    browseAll: "Browse every live Pokémon listing",
    guidesTitle: "Price guides by Pokémon",
    guide: "{name} prices",
    allGuides: "All Pokémon price guides",
  },
  howTo: {
    title: "How to check a Pokémon card's value",
    steps: [
      {
        title: "1. Identify the exact card",
        text: "Match the year, set, card number, language, parallel, edition and autograph status. A familiar character name is not enough.",
      },
      {
        title: "2. Confirm the slab",
        text: "Check the grading company, numeric grade and certification number. Compare the physical label with the grader's record.",
      },
      {
        title: "3. Compare executable demand",
        text: "Recent accepted sales and active bids show what buyers paid or may pay. An unsold asking price only shows what one seller wants.",
      },
      {
        title: "4. Adjust for scarcity and liquidity",
        text: "Review grade population, copies graded higher, listing depth and transaction activity. Scarcity matters only when collectors also want the card.",
      },
    ],
    cardPage: "Open an individual Decard card page to bring the identity, grade, certificate, asking price, insured value, best bid, population report and decoded on-chain history together. No single field is a complete valuation.",
  },
  priceMeaning: {
    title: "Asking price, insured value and market value are different",
    /** {listingPrice} and {insuredValue} are the bold terms below. */
    terms: "A {listingPrice} is the seller's current request. It does not prove that a buyer will accept it. An {insuredValue} is a reference supplied with the vaulted card. It is useful for comparison, but it is not a guaranteed payout, appraisal or future sale price.",
    listingPrice: "listing price",
    insuredValue: "insured value",
    dealScore: "Decard's deal score measures how far a USDC asking price sits below insured value. For example, a card insured at $100 and listed at $80 scores 20. That means “listed 20% below the insured reference,” not “guaranteed 20% profit.”",
    estimate: "A stronger estimate combines recent accepted sales, active bids, comparable listings, the exact grade and the card's population. Thinly traded slabs can have a large gap between the visible asking price and the price a buyer will actually pay.",
  },
  psa: {
    title: "What determines a PSA Pokémon card's value?",
    grade: "PSA 10 is the highest standard numeric grade, but it does not make every card expensive. Character demand, set, print year, language, edition, card number, artwork, rarity and population all affect value. A PSA 9 can be scarcer or more actively collected than an unrelated PSA 10.",
    multiplier: "There is no reliable universal multiplier from raw to PSA 9 or PSA 10. Grading cost, authentication risk, condition uncertainty and the number of high-grade copies change card by card. Compare the same printing and grade whenever possible.",
    more: "Learn PSA, CGC, BGS and population terms",
  },
  limits: {
    title: "What this checker can and cannot tell you",
    coverage: "Decard covers professionally graded physical cards tokenized on Solana and traded on Collector Crypt, Magic Eden and Slabz. It does not estimate raw-card condition, promise authenticity beyond the displayed grader and custodian records, or predict a future price.",
    verify: "Marketplace availability, bids, insured values and redemption terms can change. Verify the current card, certification, listing, custodian and withdrawal terms before making a decision. Decard is independent, fan-made and not affiliated with PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt or Magic Eden.",
  },
  faq: {
    title: "Common Pokémon card value questions",
    items: [
      {
        q: "How much is my Pokémon card worth?",
        a: "Identify the exact printing and condition first, then compare the same card and grade using accepted sales, active bids and credible listings. A card name alone cannot produce a reliable value.",
      },
      {
        q: "Does a PSA 10 grade guarantee a high value?",
        a: "No. Grade describes condition and authentication. Demand, rarity, population and liquidity determine whether collectors will pay a premium.",
      },
      {
        q: "Should I use asking prices or sold prices?",
        a: "Use both, but give more weight to recent comparable sales and executable bids. Asking prices reveal supply and seller expectations, including listings that may never sell.",
      },
      {
        q: "Is Decard free?",
        a: "Yes. Research pages are public and read-only, and checking a card does not require a wallet or account.",
      },
    ],
  },
  aside: {
    label: "Value checker guide",
    onThisPage: "ON THIS PAGE",
    toc: {
      currentPrices: "Current prices",
      howToCheck: "How to check value",
      priceMeaning: "What prices mean",
      psaValue: "PSA card value",
      limitations: "Limitations",
      questions: "Questions",
    },
    directory: "Open the graded card directory",
    tokenized: "How tokenized cards work",
  },
};
