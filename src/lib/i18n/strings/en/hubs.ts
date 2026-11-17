// English source. Translations in ../<locale>/hubs.ts must keep these keys.
// Franchise hubs (/cards/<slug>), the Pokémon index (/pokemon) and the Pokémon price guides (/pokemon/<name>).
// {name} is a franchise or Pokémon name, {noun} the franchise mid-sentence ("soccer"), {venue} a marketplace,
// {n} a count. A hub's own title, intro and FAQ are content: lib/i18n/content/<locale>/hubs.ts.

export const hubs = {
  /** Breadcrumbs, on the page and in its JSON-LD. */
  crumbs: {
    label: "Breadcrumb",
    home: "Home",
    cards: "Cards",
    pokemon: "Pokémon card prices",
  },
  /** Under a hub's or a guide's intro. {time} is the refresh time, in UTC. */
  updated: "Updated {time} · refreshed about every 15 minutes",
  /** Under the Pokémon index and every guide. {link} is the "Pokémon Database" link. */
  credit: "Pokémon renders from Pokémon HOME, via {link}.",
  /** The franchise chips' <nav> label (components/hubs/BrowseByFranchise.tsx). */
  browse: "Browse cards by franchise",
  /** Shared by a hub's and a guide's market: stats, the grade table and section kickers. */
  market: {
    grade: "GRADE",
    listed: "LISTED",
    lowestAsk: "LOWEST ASK",
    medianAsk: "MEDIAN ASK",
    lowestCard: "LOWEST-PRICED CARD",
    lowestPsa10: "LOWEST PSA 10",
    /** Under the lowest-priced card in the grade table. */
    onVenue: "on {venue}",
    byGrade: "Prices by grade",
    cheapest: "Cheapest first",
    top: "Top of the market",
  },
  /** A franchise hub's live market (components/hubs/CategoryMarket.tsx). */
  categoryMarket: {
    empty: "No graded {noun} cards are listed in USDC right now. New slabs show up here as collectors tokenize and list them.",
    emptyLink: "Search {noun} listings in the scanner.",
    listedNow: "LISTED NOW",
    graded: "GRADED, IN USDC",
    /** When the category is too big to read whole. {n} is every listing, {read} the cheapest ones read. */
    partial: {
      other:
        "This refresh read the {read} lowest-priced of {n} {noun} listings. Every lowest ask here is exact, but medians are left out rather than guessed, and a grade whose cheapest copy costs more than those does not appear.",
    },
    left: {
      one: "{n} more listing is ungraded, priced in SOL or far above insured value, so these prices leave it out.",
      other: "{n} more listings are ungraded, priced in SOL or far above insured value, so these prices leave them out.",
    },
    /** Fewer than 8 priced slabs. */
    thin: {
      one: "Only {n} graded {noun} card is listed in USDC right now, so a single new listing can move these numbers.",
      other: "Only {n} graded {noun} cards are listed in USDC right now, so a single new listing can move these numbers.",
    },
    byGradeTitle: "What graded {noun} cards are listed for",
    byGradeNote:
      "Each grade groups every {noun} card at that grade, from common cards to chase cards, so open the lowest-priced card to see exactly which one it is.",
    cheapestTitle: "Lowest-priced graded {noun} cards",
    cheapestMore: "Sort and filter {noun} listings in the scanner",
    topTitle: "Highest asking prices for {noun} cards",
  },
  /** A Pokémon guide's market and venue switch (components/pokemon/HubMarket.tsx). Each "…On" line is its twin for one venue. */
  guideMarket: {
    allVenues: "All venues",
    venue: "VENUE",
    /** The venue switch's accessible name. */
    venueGroup: "Listing venue",
    none: "No graded {name} slabs are listed in USDC right now.",
    noneOn: "No graded {name} slabs on {venue} are listed in USDC right now.",
    seeAll: { other: "See all {n} in the scanner." },
    gradedSlabs: "GRADED SLABS",
    priced: "PRICED IN USDC",
    left: {
      one: "{n} more listing is priced in SOL or far above insured value, so these prices leave it out.",
      other: "{n} more listings are priced in SOL or far above insured value, so these prices leave them out.",
    },
    everyListing: "The scanner shows every listing.",
    byGradeTitle: "What each {name} grade is listed for",
    byGradeTitleOn: "What each {name} grade is listed for on {venue}",
    byGradeNote:
      "Each grade groups every printing of {name}, so one grade can span very different cards. Open the lowest-priced card to see exactly which one it is.",
    /** Also the guide's JSON-LD list name. */
    cheapestTitle: "Lowest-priced graded {name} cards",
    cheapestTitleOn: "Lowest-priced graded {name} cards on {venue}",
    cheapestMore: "Sort and filter every {name} listing in the scanner",
    cheapestMoreOn: "Sort and filter every {name} listing on {venue} in the scanner",
    topTitle: "Highest asking prices for {name}",
    topTitleOn: "Highest asking prices for {name} on {venue}",
  },
  /** Franchise hubs (app/[lang]/cards/[category]/page.tsx). */
  category: {
    kicker: "Franchise hub · tokenized graded cards",
    /** The intro under the h1 once the hub has its own copy in this language: every listing read, or only the cheapest. */
    lede: "Graded {noun} cards listed right now on Collector Crypt and Magic Eden, each a real slab in a vault, owned through a token on Solana. See the lowest and median asking price for every grade, then open any card for its pop report, bids and history. Prices are live asks, not completed sales.",
    ledeLowest:
      "Graded {noun} cards listed right now on Collector Crypt and Magic Eden, each a real slab in a vault, owned through a token on Solana. See the lowest asking price for every grade, then open any card for its pop report, bids and history. Prices are live asks, not completed sales.",
    /** The Pokémon hub's box of per-Pokémon guides. */
    pokemonTitle: "Looking for one Pokémon?",
    pokemonText: {
      other: "Charizard, Pikachu, Umbreon and {n} more have their own price guides, with the lowest and median ask for every grade.",
    },
    pokemonAll: { other: "All {n} Pokémon price guides" },
    /** {scanner} is the link below. */
    unavailable: "Live {noun} listings are temporarily unavailable. The guide below still applies, and the {scanner} shows current listings.",
    unavailableLink: "scanner",
    aboutTitle: "About graded {noun} cards",
    terms: "TERMS YOU'LL MEET",
    scannerMore: "Search {noun} listings in the scanner",
    glossaryMore: "The graded card and slang glossary",
    explainerMore: "How tokenized trading cards work",
    salesMore: "Recent verified sales",
    faqKicker: "{name} FAQ",
    faqTitle: "Questions, answered.",
    relatedTitle: "Related franchises",
    relatedName: "{name} cards",
    relatedSub: "Graded prices and live listings →",
    everyFranchise: "Every franchise",
    /** JSON-LD: what the page is about, and its list of listed cards. */
    ldAbout: "{name} trading cards",
    ldListings: "Graded {noun} cards listed now",
  },
  /** The Pokémon index (app/[lang]/pokemon/page.tsx). Its title and description are seo.pages["/pokemon"]. */
  index: {
    kicker: "Price guides · graded Pokémon cards",
    /** {accent} is h1Accent, in the accent colour. */
    h1: "Pokémon card prices, {accent}",
    h1Accent: "one Pokémon at a time.",
    lede: "Pick a Pokémon to see every graded slab of it listed on Collector Crypt or Magic Eden, the lowest and median asking price for each grade, and the cheapest and most valuable cards on the market right now.",
    /** Under each Pokémon's name. */
    tile: "PSA 10, PSA 9 and CGC prices →",
    showsTitle: "What each guide shows",
    shows:
      "Each guide reads every graded listing of that Pokémon on Collector Crypt and Magic Eden, labels each listing's venue, lets you switch between them, and refreshes about every 15 minutes. It groups USDC asking prices by grade, links the lowest-priced card for each grade, and lists the cheapest and most valuable slabs. Prices are asking prices, not completed sales.",
    checkerMore: "Search any Pokémon card's value",
    salesMore: "See recent verified sales",
    /** JSON-LD list name. */
    ldGuides: "Pokémon card price guides",
  },
  /** Pokémon price guides (app/[lang]/pokemon/[name]). The title is seo.mon.title. */
  guide: {
    /**
     * English only: description, h1, h1Accent and lede. Other languages show seo.mon's description,
     * h1 and lede (lib/i18n/copy.ts pokemonSeo) instead.
     */
    description:
      "Live {name} Pokémon card prices by grade: lowest and median asking prices for PSA 10, PSA 9, CGC and BGS slabs on Collector Crypt and Magic Eden.",
    h1: "{name} card prices {accent}",
    h1Accent: "by grade.",
    lede: "Every graded {name} slab tokenized by Collector Crypt and listed right now, on Collector Crypt or Magic Eden, with the lowest and median asking price for each grade. Switch venues to compare them. Prices are live USDC asking prices, not completed sales.",
    kicker: "Pokémon price guide · graded slabs",
    /** Appended to the "Updated" line after " · ". */
    partial: "some listings could not be read this time",
    unavailable: "Live {name} listings are temporarily unavailable. The guide below still applies, and the scanner shows every listing.",
    empty: "No graded {name} slabs are listed right now.",
    howTitle: "How to read {name} prices",
    howPrintings:
      "{name} appears on many different cards: sets, years, card numbers, languages, holo treatments and promos. Two {name} slabs with the same grade can be priced far apart because they are different printings, so compare the exact card, not only the name and grade.",
    /** {sales} is the howAskingLink link. */
    howAsking:
      "These are asking prices: what sellers want today. {sales} and the live bids on each card page show what buyers actually pay. Insured value is a reference, not a guaranteed sale price.",
    howAskingLink: "Recent sales",
    howGrades:
      "Higher grades usually carry a premium, but scarcity comes from the population report: how many copies the grader has recorded at that grade and above. Each card page shows it.",
    checkerMore: "Check any Pokémon card's value",
    gradesMore: "PSA, CGC and BGS grades explained",
    /** Heading and label of the other guides' chips. */
    more: "More Pokémon price guides",
    /** The loading skeleton's accessible name (loading.tsx). */
    loading: "Loading the price guide",
    /** JSON-LD: the page's name and what it is about. */
    ldName: "{name} card prices by grade",
    ldAbout: "{name} Pokémon trading cards",
  },
};
