// English source. Translations in ../<locale>/seo.ts use the same keys.
// Server only: page titles, descriptions and hub templates ({name}, {english}).

const names: Record<string, string> = {};

export const seo = {
  "pages": {
    "/scanner": {
      "title": "Graded card listings ranked by deal score",
      "description": "Every live graded-card listing on Collector Crypt, Magic Eden and Slabz, ranked by deal score, price or freshness. Filter by Pokémon, One Piece, Riftbound and more."
    },
    "/cards": {
      "title": "Graded card directory: Pokémon, PSA & more",
      "description": "Browse currently listed graded cards by exact name, grade, set, year, card number and category, including Pokémon cards and PSA slabs."
    },
    "/tape": {
      "title": "Live trade tape for graded cards",
      "description": "Every graded-card sale, listing and bid on the Collector Crypt marketplace program, decoded live with card, grade, price and wallets. Filter out bulk bid bots."
    },
    "/luck": {
      "title": "Gacha pull luck analyzer",
      "description": "Score every verified Collector Crypt gacha pull in a wallet, or a single pull, against the cards and tier odds available when it was awarded."
    },
    "/guide": {
      "title": "Card glossary: PSA vs CGC, hobby and crypto slang",
      "description": "Plain-language glossary for tokenized graded cards: PSA vs CGC vs BGS, pop reports, SIR and manga rares, plus the collector and Solana slang you see on X."
    },
    "/pokemon-card-value-checker": {
      "title": "Pokémon card value checker: prices & PSA values",
      "description": "Check current Pokémon card asking prices, insured values and grades. Compare PSA, CGC and BGS slabs from live marketplace listings, free with no login."
    },
    "/pokemon": {
      "title": "Pokémon card prices by Pokémon: graded price guides",
      "description": "Graded price guides for {count} Pokémon, from Charizard and Pikachu to Umbreon and Gengar: live PSA, CGC and BGS asking prices by grade."
    },
    "/sales": {
      "title": "Recent graded card sales on Solana",
      "description": "Latest settled sales of graded Pokémon and other tokenized cards on the Collector Crypt marketplace: card, grade, price, buyer, seller and the Solana transaction behind each one."
    },
    "/tokenized-trading-cards": {
      "title": "Tokenized trading cards on Solana, explained",
      "description": "How tokenized graded cards work on Solana: vault custody, card NFTs, USDC trading, insured value, deal scores, pop reports, redemption and risks."
    },
    "/cards-token": {
      "title": "$CARDS token: price, buybacks and burns",
      "description": "Live CARDS price, how much Collector Crypt gacha revenue buys back and burns CARDS, total burned, the Nov 29 unlock and the Coinbase listing status."
    },
    "/rip": {
      "title": "Rip graded card packs: Pokémon, One Piece and more",
      "description": "Rip mystery packs of real graded cards on Decard, powered by Slabz: Pokémon, One Piece, Dragon Ball, Riftbound, Lorcana and sports. See the odds and top grails, pay in USDC from your wallet, and sell back in one tap."
    },
    "/gym": {
      "title": "Rip League: top pack rippers and Slabz pack odds",
      "description": "The leaderboard for ripping Slabz packs: Decard trainers ranked like gym challengers, every Slabz player live, and every pack ranked as a gym by its Epic, Legendary and return odds."
    },
    "/redeem": {
      "title": "Redeem a graded card NFT for the real slab, shipped home",
      "description": "Trade your card NFT for the physical graded slab: pick your country on the globe, get a live shipping quote, then burn the NFT and pay shipping in USDC. Tracked from the vault to your door."
    },
    "/topics": {
      "title": "Graded card topics, venues and franchises",
      "description": "Guides to PSA, CGC, BGS, slabs, redemption and pack rips, plus live price hubs for Pokémon, One Piece, Riftbound, Marvel, sports and every other listed franchise."
    }
  },
  "hub": {
    "title": "{name} cards: graded prices and live listings",
    "description": "Live prices for graded {name} slabs on Solana: PSA, CGC and BGS asks on Collector Crypt, Magic Eden and Slabz.",
    "h1": "{name} cards: graded prices and live listings",
    "intro": "Graded {name} cards listed right now. Each one is a real slab in a vault, owned through a token on Solana."
  },
  "mon": {
    "title": "{name} card prices: PSA 10, PSA 9 & graded values",
    "description": "Live {name} Pokémon card prices by grade: PSA 10, PSA 9, CGC and BGS asks on Collector Crypt and Magic Eden.",
    "h1": "{name} card prices",
    "lede": "Every graded {name} slab listed right now, with the lowest and median asking price for each grade."
  },
  /** Local Pokémon names by hub slug. English uses the hub's own name. */
  pokemon: names,
};
