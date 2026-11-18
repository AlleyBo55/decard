// English source. Translations in ../<locale>/learn.ts must keep these keys.
// Page chrome for the glossary (/guide), the topics index (/topics) and the topic guides (/topics/<slug>).
// Glossary terms, topic sections and FAQs are content: lib/i18n/content/<locale>/guide.ts and topics.ts.
export const learn = {
  /** Breadcrumbs on /topics and /topics/<slug>, on the page and in their JSON-LD. */
  crumbs: {
    label: "Breadcrumb",
    home: "Home",
    topics: "Topics",
  },
  /** The glossary page (app/[lang]/guide/page.tsx). */
  guide: {
    kicker: "Trainer's guide",
    /** {accent} is h1Accent, drawn in the accent colour. */
    h1: "Your graded-card {accent}",
    h1Accent: "Pokédex.",
    /** {n} is the number of glossary entries. */
    lede: {
      other:
        "{n} entries covering everything a new trainer meets on Decard, from grading and pop reports to bids and vaults, plus the collector and crypto slang you see on X. Plain words, no jargon left unexplained.",
    },
    /** The speech bubble beside the heading. */
    hello: "Hello there! Welcome to the world of graded cards.",
    /** The box that links to /tokenized-trading-cards. */
    explainer: {
      title: "New to on-chain cards?",
      text: "Start with vault custody, tokenized ownership, redemption, deal scores and risks.",
      cta: "Read the 10-minute guide",
    },
    /** The closing box that links to the scanner. */
    outro: {
      title: "Ready to put it to work?",
      text: "Open the scanner, sort by Best deal, and find a card trading under its insured value.",
      cta: "Open the scanner",
    },
    /** JSON-LD: the glossary's name. */
    glossaryName: "Decard glossary of graded card, collector and crypto terms",
    /** JSON-LD: one FAQ question per entry. {term} is the entry's name. */
    question: "What is {term}?",
  },
  /** The glossary's search box and index (components/guide/GuideBook.tsx). */
  book: {
    search: "Search the guide",
    index: "Guide index",
    /** {query} is what the reader typed. */
    empty: "No entries match “{query}”.",
  },
  /** The topics index (app/[lang]/topics/page.tsx). */
  topics: {
    kicker: "Index · graders, venues, franchises",
    /** {accent} is h1Accent, drawn in the accent colour. */
    h1: "Everything Decard {accent}",
    h1Accent: "actually prices.",
    lede: "Live asks for vaulted graded cards, plus plain-language guides for the graders and marketplaces people confuse with each other. A character, club, or celebrity with no slab in the catalogue does not get an empty page.",
    guides: "Guides",
    franchises: "Franchises",
    franchisesNote: "Each hub is live asks by grade for that game, comic, manga, or sport.",
    pokemon: "Pokémon, by character",
    pokemonNote: "Creatures with enough graded listings for their own price guide. Everyone else is on the Pokémon hub.",
    tools: "Tools",
    /** The Tools links, by page. */
    toolLinks: {
      scanner: "Listing scanner",
      cards: "Card directory",
      checker: "Pokémon value checker",
      sales: "Recent sales",
      tape: "Live trade tape",
      rip: "Rip packs",
      redeem: "Redeem a slab",
      guide: "Trainer's guide",
      explainer: "Tokenized cards explained",
      token: "$CARDS token",
    },
    /** JSON-LD list entries. {name} is a franchise's name. */
    hubItem: "{name} cards",
    /** {name} is a Pokémon's name. */
    pokemonItem: "{name} card prices",
  },
  /** A topic guide (app/[lang]/topics/[slug]/page.tsx). Its kicker, headings, text and links are content. */
  topic: {
    /** {date} is the day the guides were last reviewed. */
    updated: "Updated {date}. Independent, fan-made, not financial advice.",
    faq: "Questions",
    more: "Keep going",
  },
};
