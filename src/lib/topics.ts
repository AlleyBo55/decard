// Evergreen guides for searches the franchise hubs do not answer on their own:
// graders, venues, redemption, pack rips, and where a character or sport actually lives.
// Each page has to stay true. Decard does not invent a URL per player, club, movie, or person.

export interface TopicLink {
  href: string;
  label: string;
}

export interface TopicSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface TopicFaq {
  q: string;
  a: string;
}

export interface Topic {
  slug: string;
  kicker: string;
  h1: string;
  /** Second half of the h1, drawn in the accent colour. */
  h1Accent: string;
  /** Metadata title, without the " · Decard" the layout adds. */
  title: string;
  description: string;
  lede: string;
  sections: TopicSection[];
  faq: TopicFaq[];
  links: TopicLink[];
  /** schema.org about names. Real subjects of the page, not a keyword dump. */
  about: string[];
}

export const TOPICS_UPDATED = "2026-11-17";

const notAdvice =
  "None of this is financial advice, an appraisal, or a promise that a listing will sell. Asking prices are what someone hopes to get. Insured value is a reference Collector Crypt attaches to the card. A past sale is one trade, not a forecast.";

export const TOPICS: Topic[] = [
  {
    slug: "psa-card-grading",
    kicker: "Graders · PSA",
    h1: "PSA grades on",
    h1Accent: "tokenized cards.",
    title: "PSA grading for tokenized trading cards",
    description:
      "How PSA 10, PSA 9 and the PSA population report show up on Decard for vaulted Pokémon, TCG and sports slabs listed on Solana.",
    lede:
      "PSA (Professional Sports Authenticator) is the grader collectors compare first. On Decard, a PSA 10 and a PSA 9 of the same card are different listings, with their own ask, insured value and population.",
    sections: [
      {
        id: "what-psa-shows",
        title: "What a PSA grade is doing on the listing",
        paragraphs: [
          "PSA scores a card from 1 to 10. A 10 is Gem Mint. A 9 is Mint. The label also names the set, the card, the year and a certification number. That number is the thing to check: two slabs with the same name can be different printings, languages or parallels.",
          "Tokenized cards on Collector Crypt are already graded before they are vaulted. The token stands for that physical slab. Selling the token does not change the PSA grade. Redeeming it is how the owner gets the slab shipped.",
          notAdvice,
        ],
      },
      {
        id: "psa-10-vs-9",
        title: "PSA 10 versus PSA 9",
        paragraphs: [
          "For the same card, a PSA 10 almost always asks more than a PSA 9, sometimes by a lot. A PSA 9 of a scarce card can still be worth more than a PSA 10 of a common one. Compare the same set, number, language and parallel, then the grade.",
          "The population report says how many copies PSA has graded at that grade and higher. A low pop can mean the card is hard to find in that grade. It does not create a buyer.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Decard grade cards?",
        a: "No. Decard reads the grade already printed on the slab and stored with the Collector Crypt listing. PSA graded the card. Decard shows the grade, the cert link when one is available, and the live ask.",
      },
      {
        q: "Are PSA slabs the only cards listed?",
        a: "No. The same markets also list CGC and Beckett (BGS) slabs, including sports and trading-card games. Each company has its own scale.",
      },
      {
        q: "Where are live PSA prices?",
        a: "Open a franchise hub, a Pokémon price guide, or the scanner. Each card page shows the grader, the grade, the asking price, insured value, bids and the population figures Collector Crypt provides.",
      },
    ],
    links: [
      { href: "/topics/cgc-card-grading", label: "CGC grades" },
      { href: "/topics/bgs-beckett-grading", label: "BGS and Beckett" },
      { href: "/topics/population-report", label: "Population reports" },
      { href: "/scanner", label: "Live scanner" },
      { href: "/pokemon", label: "Pokémon prices by character" },
    ],
    about: ["PSA", "Professional Sports Authenticator", "PSA 10", "graded cards"],
  },
  {
    slug: "cgc-card-grading",
    kicker: "Graders · CGC",
    h1: "CGC grades on",
    h1Accent: "vaulted slabs.",
    title: "CGC grades for vaulted trading cards",
    description:
      "What CGC and a CGC Pristine 10 mean on Collector Crypt slabs, and where Decard shows that grade next to the live ask.",
    lede:
      "CGC is the other major card grader next to PSA and Beckett. Collectors meet it constantly on modern Pokémon, One Piece and other TCG slabs. Decard lists a CGC card under its own grade, not folded into PSA.",
    sections: [
      {
        id: "cgc-scale",
        title: "How CGC grades differ",
        paragraphs: [
          "CGC scores cards on a 10-point scale. Pristine 10 is its top label and is stricter than a standard 10. A CGC 10 and a CGC Pristine 10 of the same card are not the same product, and the asking prices usually show that.",
          "Do not convert a CGC 10 into a PSA 10 in your head and call it done. Crossover demand exists, but the live market prices the label that is actually on the slab. Decard keeps the grading company on the card so the comparison stays honest.",
        ],
      },
      {
        id: "where-to-look",
        title: "Where to compare CGC asks",
        paragraphs: [
          "Use the scanner or a franchise hub and read the grade on each row. The card page adds insured value, the best bid, recent on-chain sales and the population figures when Collector Crypt sends them.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Is CGC Pristine 10 the same as PSA 10?",
        a: "No. They are different companies and different labels. Compare sales and asks of the same card in the same company and grade.",
      },
      {
        q: "Does Decard only cover Pokémon CGC cards?",
        a: "No. CGC slabs show up across the franchises Collector Crypt lists, including One Piece, other TCGs and sports, whenever those cards are vaulted and listed.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "PSA grades" },
      { href: "/topics/bgs-beckett-grading", label: "BGS and Beckett" },
      { href: "/cards/pokemon", label: "Pokémon card prices" },
      { href: "/cards/one-piece", label: "One Piece card prices" },
    ],
    about: ["CGC", "CGC Pristine 10", "graded cards"],
  },
  {
    slug: "bgs-beckett-grading",
    kicker: "Graders · Beckett",
    h1: "BGS grades, subgrades",
    h1Accent: "and Black Label.",
    title: "BGS and Beckett grades, including Black Label",
    description:
      "How Beckett BGS grades, subgrades and Black Label show up on tokenized slabs listed on Collector Crypt, Magic Eden and Slabz.",
    lede:
      "Beckett Grading Services (BGS) scores the card and also prints subgrades for centering, corners, edges and surface. A Black Label is a BGS 10 with a 10 on every subgrade. It is not a normal 10.",
    sections: [
      {
        id: "subgrades",
        title: "Why subgrades change the price",
        paragraphs: [
          "Two BGS 9.5 slabs of the same card can differ if one is held back by centering and the other is not. Buyers who care about eye appeal read the subgrades, not only the overall number on the front.",
          "Black Label copies are scarce relative to ordinary 10s. Treat that scarcity as a fact about the grade, then check whether anyone is actually bidding. A rare label with no bids is still illiquid.",
        ],
      },
      {
        id: "on-decard",
        title: "How Decard shows a Beckett slab",
        paragraphs: [
          "The listing name carries the grading company and the grade. Open the card page before you compare it with a PSA or CGC copy. Insured value and deal score do not know that a Black Label is special unless that difference is already in the price and the insured value.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Is a BGS 9.5 the same as a PSA 10?",
        a: "No. Collectors argue about crossover value, but they are different grades from different companies. Use sales of the same label.",
      },
      {
        q: "What is a Black Label?",
        a: "A BGS 10 whose centering, corners, edges and surface subgrades are each a 10. It is Beckett's top label.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "PSA grades" },
      { href: "/topics/cgc-card-grading", label: "CGC grades" },
      { href: "/topics/what-is-a-card-slab", label: "What a slab is" },
      { href: "/scanner", label: "Live scanner" },
    ],
    about: ["BGS", "Beckett Grading Services", "Black Label", "graded cards"],
  },
  {
    slug: "what-is-a-card-slab",
    kicker: "Hobby · slabs",
    h1: "A slab is the",
    h1Accent: "graded card in a case.",
    title: "What a card slab is",
    description:
      "A slab is a graded card sealed in a tamper-evident case. Here is how PSA, CGC and BGS slabs trade as Solana tokens and redeem back to cardboard.",
    lede:
      "Collectors say slab for the whole object: the card, the grade label, and the hard case. The token on Solana is not the slab. It is the transferable claim on that slab while a vault holds it.",
    sections: [
      {
        id: "case",
        title: "What is inside the case",
        paragraphs: [
          "A grading company authenticates the card, scores its condition, seals it, and prints a certification number. PSA, CGC and Beckett each use their own case and label. The card should not come back out unless the case is broken or the company cracks it for a review.",
          "Raw cards, meaning cards that are not graded, are a different market. Collector Crypt's vaulted inventory is graded slabs. Decard tracks those, not a stack of ungraded pulls in a shoebox.",
        ],
      },
      {
        id: "token",
        title: "Slab, token, redemption",
        paragraphs: [
          "While the slab sits in the vault, the owner can sell the token on Collector Crypt or Magic Eden. The buyer takes the claim. The plastic does not move until someone redeems: the token is burned and the vault ships the slab.",
          "If a listing says PSA 10 Charizard, you are looking at one certified copy, not at every Charizard. Open the card page and match set, number, language and cert.",
        ],
      },
    ],
    faq: [
      {
        q: "Is the NFT the same thing as the slab?",
        a: "No. The NFT is the on-chain record tied to one vaulted slab. Redemption burns that record and ships the physical case. Terms, shipping and eligibility come from the custodian.",
      },
      {
        q: "Can I rip a slab?",
        a: "Ripping, in this market, means opening a pack that contains a graded slab, not cutting a slab open. Cracking a case is a separate, usually bad, idea unless you know why you are doing it.",
      },
    ],
    links: [
      { href: "/topics/redeem-physical-graded-card", label: "Redeem the physical card" },
      { href: "/topics/ripping-graded-packs", label: "Ripping graded packs" },
      { href: "/tokenized-trading-cards", label: "Tokenized cards explained" },
      { href: "/guide", label: "Trainer's guide" },
    ],
    about: ["slab", "graded card", "PSA", "CGC", "BGS"],
  },
  {
    slug: "population-report",
    kicker: "Research · pop",
    h1: "Population reports,",
    h1Accent: "without the myth.",
    title: "Population reports for graded cards",
    description:
      "What a pop report counts, why a low population is not automatically a buy, and where Decard shows pop, pop higher and gem rate.",
    lede:
      "A population report counts how many copies a grader has recorded at each grade. It is a supply fact. It is not a price, and it is not a reason to buy by itself.",
    sections: [
      {
        id: "counts",
        title: "What the numbers mean",
        paragraphs: [
          "Pop at grade is how many copies received that score. Pop higher is how many scored above it. Total pop is everything the company has graded of that item. Gem rate is the share that landed in the top grade. PSA publishes this for its own certs. CGC and Beckett publish their own.",
          "A pop of 20 in PSA 10 can be tiny or ordinary depending on the card. Twenty PSA 10s of a short-print rookie is a different story from twenty PSA 10s of a card that nobody wants. Demand is not in the pop report.",
        ],
      },
      {
        id: "on-the-page",
        title: "What Decard can and cannot show",
        paragraphs: [
          "When Collector Crypt includes population fields, the card page shows them. Decard does not invent a pop figure the feed left out, and it does not merge PSA, CGC and BGS populations into one number. Those are different censuses.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Does a pop of 1 mean the card is the only one?",
        a: "It means that grader has recorded one copy at that grade so far. Other companies may have graded more, and more copies can be graded later. Population reports are not closed.",
      },
      {
        q: "Where is the pop report on Decard?",
        a: "On the card page, when the listing includes it. The scanner and the franchise hubs are for comparing asks. The card page is where the population detail lives.",
      },
    ],
    links: [
      { href: "/topics/psa-card-grading", label: "PSA grades" },
      { href: "/cards", label: "Card directory" },
      { href: "/guide", label: "Trainer's guide" },
    ],
    about: ["population report", "PSA Population Report", "gem rate"],
  },
  {
    slug: "redeem-physical-graded-card",
    kicker: "Vault · redeem",
    h1: "Redeem the token.",
    h1Accent: "Ship the slab.",
    title: "Redeem a tokenized card for the physical slab",
    description:
      "Redeeming a Collector Crypt card NFT burns the token and ships the real PSA, CGC or BGS slab. Decard's redeem desk quotes shipping in USDC.",
    lede:
      "Every vaulted card on this market is a physical graded slab with an on-chain owner. Redeeming is the step that ends the token and puts the case in the mail. Decard quotes the shipping. The vault does the packing.",
    sections: [
      {
        id: "steps",
        title: "What actually happens",
        paragraphs: [
          "You connect the Solana wallet that holds the card, pick the slabs, pick a country, and review a shipping quote in USDC. Approving the transaction burns the NFTs and pays shipping. After that, the card is no longer in the wallet, because the claim was exchanged for the object.",
          "Shipping, insurance and destination rules are not a slogan. They depend on the zone and on the current desk. Read the quote before you sign. A card that cannot ship to you is not a card you should redeem from that country.",
        ],
      },
      {
        id: "not-a-sale",
        title: "Redeeming is not selling",
        paragraphs: [
          "A sale transfers the token and leaves the slab in the vault for the new owner. A redemption destroys the token and removes the slab from the vault. If you wanted the price exposure, sell. If you wanted the cardboard, redeem.",
          "Decard is not the custodian. It is the desk in front of the shipping quote. Custody stays with the vault the marketplace uses.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I get a picture, or the card?",
        a: "The card. The slab in the case is what ships. The NFT is burned so two people cannot both claim it.",
      },
      {
        q: "Which cards can be redeemed?",
        a: "Cards the vault will ship, held in the wallet you connect. The redeem page shows the ones that wallet can send and the quote for the country you pick.",
      },
    ],
    links: [
      { href: "/redeem", label: "Open the redeem desk" },
      { href: "/tokenized-trading-cards", label: "How tokenized cards work" },
      { href: "/topics/what-is-a-card-slab", label: "What a slab is" },
    ],
    about: ["card redemption", "physical graded card", "Solana NFT"],
  },
  {
    slug: "ripping-graded-packs",
    kicker: "Packs · rip",
    h1: "Ripping packs of",
    h1Accent: "real graded slabs.",
    title: "Ripping packs of graded cards",
    description:
      "Ripping a pack here means revealing a real vaulted slab, not a digital picture. Odds, the Rip Gym and the pull-luck analyzer.",
    lede:
      "Pack rips in this market are gacha for graded cards. You pay a pack price. You receive a vaulted slab already in a PSA, CGC or BGS case. The surprise is which card, not whether the card exists.",
    sections: [
      {
        id: "rip",
        title: "What you are opening",
        paragraphs: [
          "A pack is priced in a tier. The pool behind it is real inventory: Pokémon, One Piece, Dragon Ball and the other universes the rip desk sells. When the pack opens, the slab is yours as a token. You can keep it, sell it, or redeem the physical card.",
          "Odds are a property of the pool, not a personal streak. The pull-luck analyzer compares a wallet's pulls with those odds. A hot streak is not a strategy. A cold one is not a bug.",
        ],
      },
      {
        id: "research",
        title: "Look up the card you pulled",
        paragraphs: [
          "After the reveal, the card has a grade, a set and an ask somewhere on the market. Open it on Decard and read the insured value, other listings of the same card, and recent sales before you decide the pull was a win.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Is this the same as opening a booster box?",
        a: "No. A booster box yields raw cards from a printed set. These packs yield one already-graded slab from a vault inventory. The gamble is the reveal, not the print run.",
      },
      {
        q: "Where are the odds?",
        a: "On the rip flow and the Rip Gym. The luck analyzer scores a wallet's history against those odds. It does not change the next pull.",
      },
    ],
    links: [
      { href: "/rip", label: "Rip packs" },
      { href: "/gym", label: "Rip Gym" },
      { href: "/luck", label: "Pull luck analyzer" },
      { href: "/topics/redeem-physical-graded-card", label: "Redeem the slab" },
    ],
    about: ["pack ripping", "gacha", "graded cards"],
  },
  {
    slug: "collector-crypt",
    kicker: "Venues · Collector Crypt",
    h1: "Collector Crypt,",
    h1Accent: "explained.",
    title: "How Collector Crypt works, and where Decard fits",
    description:
      "Collector Crypt vaults graded cards and trades them on Solana. Decard is the independent scanner for listings, deal scores, sales and wallets.",
    lede:
      "Collector Crypt is the marketplace and the vault. Decard is not Collector Crypt. Decard reads the public listings and the on-chain sales so you can rank, compare and trace them without connecting a wallet.",
    sections: [
      {
        id: "split",
        title: "Who does what",
        paragraphs: [
          "Collector Crypt takes graded slabs into a vault and represents each one with a Solana asset. Buyers pay in USDC on that market, plus SOL for the network. Magic Eden lists some of the same assets. Slabz is another storefront on the Collector Crypt inventory, measured as the same USDC book rather than a second catalogue.",
          "Decard ranks USDC listings by deal score: how far the ask sits under insured value, from 0 to 100. It decodes sales, listings and bids from the marketplace program. It does not custody cards, match orders, or hold your keys.",
        ],
      },
      {
        id: "use-it",
        title: "How to use the scanner",
        paragraphs: [
          "Start with a franchise if you know the game or the sport. Start with the scanner if you want the widest book, sorted by deal, price or freshness. Open a card before you buy. The card page is the identity, the grade, the pop report and the history.",
          "Decard is fan-made. It is not affiliated with Collector Crypt, and a link out to buy is a handoff, not a checkout.",
        ],
      },
    ],
    faq: [
      {
        q: "Is Decard an official Collector Crypt site?",
        a: "No. It is an independent open-source reader of public marketplace data and Solana transactions.",
      },
      {
        q: "Does a high deal score mean the card is underpriced?",
        a: "It means the USDC ask is below the insured value by that percentage. Insured value is not a sale price. Check bids, recent sales and the exact card before you treat the gap as a bargain.",
      },
    ],
    links: [
      { href: "/scanner", label: "Open the scanner" },
      { href: "/topics/magic-eden-graded-cards", label: "Magic Eden listings" },
      { href: "/topics/slabz", label: "Slabz" },
      { href: "/tape", label: "Live trade tape" },
      { href: "/sales", label: "Recent sales" },
    ],
    about: ["Collector Crypt", "Solana", "graded cards"],
  },
  {
    slug: "magic-eden-graded-cards",
    kicker: "Venues · Magic Eden",
    h1: "Magic Eden listings",
    h1Accent: "for the same slabs.",
    title: "Magic Eden listings for graded cards",
    description:
      "Vaulted graded cards can be listed on Magic Eden, often in SOL. Decard shows those asks beside Collector Crypt so the two books can be compared.",
    lede:
      "Magic Eden is a Solana NFT marketplace. For this hobby it matters because the same vaulted slab can be listed there, frequently in SOL, while Collector Crypt listings of that card are often in USDC.",
    sections: [
      {
        id: "two-books",
        title: "Two asks, one card",
        paragraphs: [
          "A collector who only looks at one venue can miss a cheaper ask on the other. Decard pulls Collector Crypt and Magic Eden listings into the scanner and onto card pages, and labels the venue. SOL prices are not guessed into dollars for the deal-score rank. Deal score is a USDC-versus-insured figure.",
          "Magic Eden is not Collector Crypt. A listing there is an order on that market. Settlement, fees and what the wallet actually signs are theirs. Decard links out. It does not place the bid for you.",
        ],
      },
      {
        id: "not-every-nft",
        title: "Not every Magic Eden NFT is a card",
        paragraphs: [
          "Magic Eden lists art, games and collectibles that have nothing to do with a vault. Decard does not index that universe. It indexes graded cards from the Collector Crypt catalogue, including the ones also listed on Magic Eden.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Decard sell on Magic Eden?",
        a: "No. It shows the listing and links to the venue. Buying happens in your wallet on that marketplace.",
      },
      {
        q: "Why is there no deal score on a SOL listing?",
        a: "Deal score compares a USDC ask with insured value. Decard does not invent a dollar price for a SOL listing just to rank it.",
      },
    ],
    links: [
      { href: "/scanner", label: "Scanner" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/topics/opensea-and-tokenized-cards", label: "OpenSea, and what Decard does not index" },
    ],
    about: ["Magic Eden", "Solana NFT", "graded cards"],
  },
  {
    slug: "slabz",
    kicker: "Venues · Slabz",
    h1: "Slabz, and the book",
    h1Accent: "it shares.",
    title: "Slabz and the Collector Crypt card book",
    description:
      "Slabz is a storefront on the same Collector Crypt graded-card inventory. Decard shows it without counting every slab twice.",
    lede:
      "Slabz (slabz.com) sells and lists graded cards that are already in the Collector Crypt catalogue. Measured in November 2026, the Slabz book matched Collector Crypt's own USDC listings rather than adding a second set of slabs.",
    sections: [
      {
        id: "same-book",
        title: "Why the main list does not add Slabz on top",
        paragraphs: [
          "If Decard merged Slabz into the default scanner, the same PSA 10 would appear twice at the same USDC price. The default book is Collector Crypt and Magic Eden. Slabz has its own scanner view, and a card page can still check whether that slab is buyable on Slabz.",
          "Magic Eden did not match that pattern in the same check: sampled Magic Eden listings were not sitting on Slabz. Treat Magic Eden as a separate venue. Treat Slabz and Collector Crypt's own venue as one inventory with two doors, until the data says otherwise.",
        ],
      },
      {
        id: "redeem",
        title: "Shipping",
        paragraphs: [
          "The redeem desk uses Slabz's shipping flow. The sign-in there is Collector Crypt's. Read the quote. Decard is not Slabz and is not the vault.",
        ],
      },
    ],
    faq: [
      {
        q: "Is Slabz a different pile of cards?",
        a: "Not on the measurements Decard recorded in November 2026. Sampled Slabz listings were Collector Crypt listings at the same USDC price. If that stops being true, the scanner rule has to change.",
      },
      {
        q: "How do I see only Slabz?",
        a: "Use the scanner's Slabz source. The default view leaves Slabz out so those cards are not counted twice.",
      },
    ],
    links: [
      { href: "/scanner?source=SLABZ", label: "Slabz scanner view" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/redeem", label: "Redeem a slab" },
    ],
    about: ["Slabz", "Collector Crypt", "graded cards"],
  },
  {
    slug: "opensea-and-tokenized-cards",
    kicker: "Venues · OpenSea",
    h1: "OpenSea is not",
    h1Accent: "this card book.",
    title: "OpenSea and tokenized graded cards",
    description:
      "OpenSea is a general NFT market. The graded slabs Decard tracks are listed on Collector Crypt, Magic Eden and Slabz, and are not scraped from OpenSea.",
    lede:
      "People searching OpenSea for Pokémon or sports cards usually want a price. Decard cannot answer with OpenSea's order book. It answers with the vaulted graded cards listed on Collector Crypt, Magic Eden and Slabz.",
    sections: [
      {
        id: "different-market",
        title: "A different marketplace",
        paragraphs: [
          "OpenSea lists a huge range of NFTs across chains. Some of those collections are pictures of cards. Some are unrelated art. A vaulted PSA slab with a redemption path is a narrower thing, and the liquid asks Decard reads are on Collector Crypt and Magic Eden.",
          "If a token ever also sits on OpenSea, Decard still does not ingest OpenSea. Do not treat an OpenSea floor for a lookalike collection as the price of a certified slab. Match the mint, the cert and the vault, or you are pricing a different asset.",
        ],
      },
      {
        id: "where-the-price-is",
        title: "Where to look instead",
        paragraphs: [
          "For a live ask on a vaulted graded card, use the scanner or the card page. For a completed Collector Crypt sale, use recent sales and the tape. Those numbers cite the listing and the transaction. An OpenSea collection floor does not.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I buy these slabs on OpenSea?",
        a: "Decard does not list or monitor OpenSea inventory. The buy links it does show go to Collector Crypt, Magic Eden or Slabz, depending on where that slab is actually listed.",
      },
      {
        q: "Is a Pokémon NFT on OpenSea the same as a tokenized slab?",
        a: "Usually no. A picture collection and a vaulted graded card share a character and nothing else. Check for a grader, a cert number and a redemption path.",
      },
    ],
    links: [
      { href: "/topics/magic-eden-graded-cards", label: "Magic Eden" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/scanner", label: "Scanner" },
    ],
    about: ["OpenSea", "tokenized trading cards", "Magic Eden"],
  },
  {
    slug: "goldin-auctions-and-live-asks",
    kicker: "Venues · Goldin",
    h1: "Goldin auctions and",
    h1Accent: "live asks.",
    title: "Goldin auctions versus live card asks",
    description:
      "Goldin is a collectibles auction house. Decard shows live asks and on-chain sales for vaulted slabs, which is a different price from an auction hammer.",
    lede:
      "Goldin runs auctions for cards, comics and other collectibles. Decard does not show Goldin lots or hammer prices. It shows what vaulted graded cards are asking right now on Collector Crypt and Magic Eden, and what those cards last sold for on-chain.",
    sections: [
      {
        id: "two-prices",
        title: "An auction result is not an ask",
        paragraphs: [
          "A Goldin hammer is a completed auction at a moment, with buyer's premium on top, for one certified copy. A marketplace ask is what a holder wants today, and it can sit there unsold. Using one as the other is how people talk themselves into a number.",
          "If you are comping a slab, match the grader, the grade, the set, the parallel and the language. Then notice which price you are holding: a live ask, an insured value, an on-chain sale, or an auction result from somewhere else. Decard is the first three when the data exists. It is not the fourth.",
        ],
      },
      {
        id: "use-both",
        title: "Use both, label both",
        paragraphs: [
          "Auction houses are useful because rare cards still trade there, especially vintage sports and trophy Pokémon. On-chain venues are useful because the book is open at midnight and the sale is a transaction you can read. Neither replaces the other.",
          "Decard is not affiliated with Goldin. Naming the difference is the whole point of this page.",
        ],
      },
    ],
    faq: [
      {
        q: "Does Decard track Goldin lots?",
        a: "No. Search Goldin for Goldin. Use Decard for live Collector Crypt and Magic Eden asks, insured values and on-chain sales of vaulted slabs.",
      },
      {
        q: "Which number should I trust?",
        a: "None of them alone. A single ask, a single sale and a single auction are three facts. Liquidity is whether a second buyer shows up.",
      },
    ],
    links: [
      { href: "/sales", label: "Recent on-chain sales" },
      { href: "/tape", label: "Live tape" },
      { href: "/topics/graded-card-prices", label: "How to read a card price" },
      { href: "/scanner", label: "Live asks" },
    ],
    about: ["Goldin", "card auctions", "graded cards"],
  },
  {
    slug: "graded-card-prices",
    kicker: "Prices · how to read them",
    h1: "A card price is",
    h1Accent: "three different numbers.",
    title: "How to read a graded card price",
    description:
      "Ask, insured value and last sale are not the same number. How Decard's deal score uses only the first two, and why that is not a forecast.",
    lede:
      "Search results say price and mean whatever was handy. On a vaulted slab there are at least three figures, and mixing them up is the expensive mistake.",
    sections: [
      {
        id: "three",
        title: "Ask, insured value, sale",
        paragraphs: [
          "The ask is the listing. It can be fantasy. Insured value is the reference shipped with the Collector Crypt card. It is not a bid. A sale is someone actually paying, on-chain, at a time you can point at. Deal score only compares a USDC ask with insured value. It ignores SOL listings on purpose.",
          "Identity comes before any of those numbers. Set, card number, language, parallel, autograph, grader and grade. A Charizard is not a price. A 1999 Base Set shadowless 4/102 in PSA 10 is getting closer.",
        ],
      },
      {
        id: "investment",
        title: "Investment language, plainly",
        paragraphs: [
          "People buy slabs as a collection and as a bet that someone later pays more. Both happen. Neither is owed to you. Thin cards have wide gaps between the ask and the best bid. Redemption has shipping costs. Custody is a company, not a natural law.",
          `${notAdvice} Decard is a research screen, not a broker and not a fund.`,
        ],
      },
    ],
    faq: [
      {
        q: "Is insured value what the card is worth?",
        a: "It is a reference number from the marketplace data, useful for ranking asks. It is not an offer to buy the card at that price.",
      },
      {
        q: "Where are completed sales?",
        a: "Recent sales and the live tape decode Collector Crypt marketplace transactions. A listing page is an ask until a sale replaces it.",
      },
    ],
    links: [
      { href: "/scanner?orderBy=deal", label: "Best-deal ranking" },
      { href: "/sales", label: "Recent sales" },
      { href: "/tokenized-trading-cards", label: "Tokenized cards explained" },
      { href: "/topics/population-report", label: "Population reports" },
    ],
    about: ["graded card prices", "insured value", "deal score"],
  },
  {
    slug: "sports-cards-on-solana",
    kicker: "Sports · slabs",
    h1: "Baseball, football and",
    h1Accent: "the other sports.",
    title: "Baseball, football and sports cards on Solana",
    description:
      "Live asks for graded baseball, NFL football, basketball, soccer and hockey slabs on Collector Crypt and Magic Eden, by player, set and grade.",
    lede:
      "Sports cards on Decard are graded slabs of real players, vaulted and listed like the TCG cards. Football means American football. Soccer has its own category. Club tables and league standings are not here. The card is.",
    sections: [
      {
        id: "which-sport",
        title: "Pick the sport, then the card",
        paragraphs: [
          "Baseball covers vintage Topps through Bowman Chrome. Football covers NFL sets such as Prizm, Optic and National Treasures. Basketball, soccer and hockey each have a hub because Collector Crypt lists them separately. A rookie card, a 1st Bowman, a Prizm parallel or a Young Guns rookie is a specific object. The hub page is the live asks by grade.",
          "Player names live on the card, so a Trout, an Ohtani, a Brady, a Mahomes or a McDavid shows up as that card's name in the directory and on the hub. Decard does not keep a page per club, season, or roster. A team is not a slab.",
        ],
      },
      {
        id: "grade",
        title: "The grade still rules the comp",
        paragraphs: [
          "A raw star and a PSA 10 of that star are different markets. So are a base rookie and a numbered patch autograph. Read the grade and the parallel before you compare two asks, including when both say the same player's name.",
          notAdvice,
        ],
      },
    ],
    faq: [
      {
        q: "Do you have every player and every club?",
        a: "No. Decard lists the graded sports slabs currently in the Collector Crypt catalogue, grouped by sport. If a player has no vaulted slab listed, there is no price to show. There is no page for a club's fixtures or a league table.",
      },
      {
        q: "Is football soccer?",
        a: "Not in these categories. Football is NFL. Soccer is its own hub.",
      },
    ],
    links: [
      { href: "/cards/baseball", label: "Baseball cards" },
      { href: "/cards/football", label: "Football cards" },
      { href: "/cards/basketball", label: "Basketball cards" },
      { href: "/cards/soccer", label: "Soccer cards" },
      { href: "/cards/hockey", label: "Hockey cards" },
    ],
    about: ["baseball cards", "football cards", "sports cards", "PSA"],
  },
  {
    slug: "tcg-comics-manga-cards",
    kicker: "TCG · comics · manga",
    h1: "Pokémon, One Piece,",
    h1Accent: "comics and manga.",
    title: "Pokémon, One Piece, Riftbound, comics and manga cards",
    description:
      "Where to open live graded prices for Pokémon, One Piece, Riftbound, Marvel, DC, Yu-Gi-Oh, Dragon Ball, Naruto and the other listed TCGs.",
    lede:
      "A character search usually wants a card price. Decard has those prices where the graded slab exists: a Pokémon guide for the creature, a franchise hub for the game, the comic, or the manga the card came from.",
    sections: [
      {
        id: "map",
        title: "Which shelf the card is on",
        paragraphs: [
          "Pokémon cards, including Charizard, Pikachu, Umbreon, Gengar and the other creatures with enough listings to stand on their own, have character guides. One Piece cards, manga rares included, live on the One Piece hub: Luffy, Zoro, Nami, Shanks. Dragon Ball, from Carddass to Fusion World, is its own hub, and so are Naruto, Yu-Gi-Oh!, Magic: The Gathering, Lorcana, Gundam and Union Arena.",
          "Riftbound is Riot's League of Legends card game. Champions such as Jinx are cards in that hub, not a separate game. Marvel and DC are separate comic-card hubs. A movie or a manhwa that never had a graded slab in this vault will not grow a price page just because people search the title.",
        ],
      },
      {
        id: "not-the-story",
        title: "The card, not the plot",
        paragraphs: [
          "Decard does not summarize episodes, issues, or chapters. It prices graded cards from those worlds when they are listed. If you need the story, read the comic or watch the show. If you need the slab, open the hub and match the set and the grade.",
        ],
      },
    ],
    faq: [
      {
        q: "Is there a page for every character?",
        a: "No. Pokémon with a deep listed inventory have their own guides. Everyone else is reached through the franchise hub and the card directory. A thin page for a character with one listing would just repeat that listing.",
      },
      {
        q: "Do manga cards mean One Piece manga rares?",
        a: "Manga rare is a specific One Piece parallel. Other manga series have their own cards and their own hubs when Collector Crypt lists them. The word manga on its own is not a set.",
      },
    ],
    links: [
      { href: "/cards/pokemon", label: "Pokémon" },
      { href: "/pokemon", label: "Prices by Pokémon" },
      { href: "/cards/one-piece", label: "One Piece" },
      { href: "/cards/riftbound", label: "Riftbound" },
      { href: "/cards/marvel", label: "Marvel" },
      { href: "/cards/dc", label: "DC" },
      { href: "/cards/yu-gi-oh", label: "Yu-Gi-Oh!" },
      { href: "/cards/dragon-ball", label: "Dragon Ball" },
      { href: "/topics", label: "All topics and franchises" },
    ],
    about: ["Pokémon cards", "One Piece cards", "Riftbound", "Marvel cards", "manga"],
  },
  {
    slug: "solana-nft-trading-cards",
    kicker: "Solana · cards",
    h1: "Solana NFTs that are",
    h1Accent: "real trading cards.",
    title: "Solana NFTs that are real trading cards",
    description:
      "These Solana NFTs stand for vaulted graded cards. How USDC and SOL listings, redemption and deal scores fit together.",
    lede:
      "Most Solana NFTs are not cards. The ones Decard tracks are: a unique asset whose metadata is a graded slab in a vault, tradable in USDC or SOL, and redeemable for the physical case.",
    sections: [
      {
        id: "rwa",
        title: "NFT, TCG, RWA",
        paragraphs: [
          "NFT means the asset is unique and on-chain. TCG names the game: Pokémon, One Piece, Magic, Riftbound, and the rest. RWA is the clumsy industry word for the physical slab behind the token. You want all three before you treat a mint as a card. A JPEG of Pikachu has only the first, maybe.",
          "Wallets such as Phantom or Solflare hold the asset. Decard never asks for the seed phrase. Connecting a wallet is for the rip and redeem desks, and those actions are labeled. Reading prices does not require a wallet at all.",
        ],
      },
      {
        id: "chain",
        title: "What you can verify",
        paragraphs: [
          "Sales, listings and bids from the Collector Crypt marketplace program are transactions. The tape and the card history point at them. Insured value and population are marketplace data, not something the chain proves. Hold those two ideas apart.",
          "This is not a page about Satoshi, about SOL the asset as an investment, or about unrelated NFT collections. It is about graded cards that happen to clear on Solana.",
        ],
      },
    ],
    faq: [
      {
        q: "Do I need crypto to look up a price?",
        a: "No. The scanner, the hubs and the card pages are public. You need a wallet, USDC or SOL, and network fees only when you buy, rip, or redeem on the marketplace.",
      },
      {
        q: "Are these NFTs redeemable?",
        a: "The Collector Crypt model is a redeemable graded slab. Read the current redemption terms and the shipping quote. A random Solana NFT collection is not in that model just because it pictures a card.",
      },
    ],
    links: [
      { href: "/tokenized-trading-cards", label: "Tokenized cards, the long version" },
      { href: "/topics/redeem-physical-graded-card", label: "Redeem a slab" },
      { href: "/topics/collector-crypt", label: "Collector Crypt" },
      { href: "/cards-token", label: "$CARDS token" },
    ],
    about: ["Solana NFT", "tokenized trading cards", "RWA"],
  },
];

export function topicBySlug(slug: string): Topic | null {
  return TOPICS.find((topic) => topic.slug === slug) ?? null;
}
