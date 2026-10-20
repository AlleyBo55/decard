// The Trainer's Guide: plain-language definitions for newcomers. Each section
// is shown as a Pokémon type; terms are numbered like Pokédex entries.

export interface GuideTerm {
  term: string;
  short: string;
  body: string;
  tip?: string;
}

export interface GuideSection {
  id: string;
  title: string;
  category: string; // drives the type colour via poke-types
  terms: GuideTerm[];
}

export const GUIDE: GuideSection[] = [
  {
    id: "grading",
    title: "Grading",
    category: "Gundam",
    terms: [
      {
        term: "Grading",
        short: "A professional score of a card's condition.",
        body: "An independent company inspects the card's centering, corners, edges and surface, then assigns a number. A higher grade means a cleaner card and usually a much higher price. The grade is sealed in with the card, so buyers don't have to judge condition from photos.",
      },
      {
        term: "PSA, CGC and BGS",
        short: "The three graders you'll see most.",
        body: "PSA (Professional Sports Authenticator), CGC (Certified Guaranty Company) and BGS (Beckett) each have their own scale and label. The same card can get different grades from different companies, and the market prices them differently, so always check who graded it.",
        tip: "PSA 10s usually command the biggest premium for Pokémon cards.",
      },
      {
        term: "The 1 to 10 scale",
        short: "10 is flawless, 9 is near-perfect.",
        body: "PSA calls a 10 GEM-MT (gem mint). A 9 is still strong. Below 8 the wear is visible and prices drop sharply. CGC and BGS also give half grades like 9.5, and BGS awards Pristine 10 and the famous Black Label for a perfect card.",
      },
      {
        term: "Slab",
        short: "The sealed plastic case a graded card lives in.",
        body: "After grading, the card is locked in a tamper-evident holder with a label showing the card, the grade and a certification number. 'Slabbed' simply means graded and sealed.",
      },
      {
        term: "Cert number",
        short: "The slab's unique ID.",
        body: "Every slab has a certification number printed on its label. You can look it up on the grader's site to confirm the card and grade are real. On a Decard card page, PSA and CGC cert numbers link straight to the lookup.",
      },
      {
        term: "Raw card",
        short: "An ungraded card.",
        body: "A card that hasn't been graded. Raw cards are cheaper but their condition is a judgement call. Tokenized cards on Collector Crypt are graded, so you always know what you're getting.",
      },
    ],
  },
  {
    id: "rarity",
    title: "Rarity and value",
    category: "Riftbound",
    terms: [
      {
        term: "Population report (pop)",
        short: "How many copies exist at each grade.",
        body: "Graders publish how many of each card they've graded at every level. If only 12 copies exist as a PSA 10, that card is scarce at that grade, which supports a higher price. A low pop at the top grade is one of the strongest rarity signals.",
        tip: "Decard shows pop as 'base stats' bars on every card page.",
      },
      {
        term: "Pop 1",
        short: "The only copy at that grade.",
        body: "A card with a population of one at its grade. If the grade is high, it's often a collector's grail and trades at a big premium.",
      },
      {
        term: "Gem rate",
        short: "The share of a card that grades 10.",
        body: "Out of every copy submitted, the percentage that came back as a perfect 10. A low gem rate means perfect copies are hard to get, so each 10 is worth more. A high gem rate means 10s are common.",
      },
      {
        term: "Insured value",
        short: "The vault's declared worth of the card.",
        body: "Collector Crypt keeps the physical card in a professional vault and records an insured value for it. It's a useful reference for what the card is worth, though the live market can trade above or below it.",
      },
      {
        term: "Parallel, alt art and full art",
        short: "Special versions of a card.",
        body: "A parallel is an alternate printing that's rarer than the base card. Full art cards fill the whole face with artwork; alternate art cards use a different illustration. These versions often carry big premiums.",
      },
      {
        term: "1st Edition",
        short: "The earliest print run of a set.",
        body: "Older Pokémon sets marked their first print run with a '1st Edition' stamp. Those copies are rarer and usually far more valuable than later unlimited prints of the same card.",
      },
    ],
  },
  {
    id: "buying-and-selling",
    title: "Buying and selling",
    category: "Pokemon",
    terms: [
      {
        term: "Floor",
        short: "The cheapest listing available.",
        body: "The lowest asking price in a category or set right now. 'Sweeping the floor' means buying up the cheapest listings. The floor is the fastest read on what entry costs today.",
      },
      {
        term: "Listing",
        short: "A card put up for sale at a set price.",
        body: "The owner picks a price and the card shows on the market until someone buys it or the listing is cancelled. On Collector Crypt the card stays in the owner's wallet while listed; it's delegated for sale rather than moved into escrow.",
      },
      {
        term: "Offer or bid",
        short: "A price a buyer proposes.",
        body: "Instead of paying the asking price, a buyer can offer less and wait. Offers are backed by USDC held in the buyer's escrow, and on Collector Crypt an offer must be at least 10% of the card's insured value. The owner can accept, ignore, or wait for better.",
      },
      {
        term: "Deal score",
        short: "How far below insured value a listing sits.",
        body: "A Decard number from 0 to 100 shown as an HP bar. It compares the asking price with the insured value, so a card listed well under its insured worth scores high. It's a quick filter for underpriced listings, not a guarantee, so always check the card.",
        tip: "Only shown on USDC listings that have an insured value.",
      },
      {
        term: "Spread",
        short: "The gap between the best bid and the asking price.",
        body: "If a card is listed at $500 and the best bid is $420, the spread is $80. A tight spread means buyers and sellers agree on value; a wide one means there's room to negotiate.",
      },
      {
        term: "Fees",
        short: "What a sale costs.",
        body: "Collector Crypt's marketplace takes a platform fee from the seller's proceeds, 2% by default. The buyer pays exactly the listed price. On-chain network fees on Solana are fractions of a cent.",
      },
      {
        term: "Flip",
        short: "Buying to resell quickly.",
        body: "Buying a card and relisting it soon after for a higher price. Flips work when you buy under value, so deal score and recent sales are your best friends.",
      },
    ],
  },
  {
    id: "on-chain",
    title: "On-chain basics",
    category: "One Piece",
    terms: [
      {
        term: "Tokenized card",
        short: "A physical card owned through an on-chain token.",
        body: "The real slab sits in a vault while ownership is tracked by a token on Solana. Holding the token means owning the card. You can trade it in seconds, or redeem it to have the physical card shipped to you.",
      },
      {
        term: "Vault",
        short: "Where the physical card is stored.",
        body: "A secure, insured facility (for example a grader's own vault) that holds the slab for you. Vaulting is what makes instant on-chain trading possible.",
      },
      {
        term: "Redeem",
        short: "Turn the token back into the physical card.",
        body: "Redeeming burns the token and ships the slab to your address. After that, the card trades like any normal physical card again.",
      },
      {
        term: "pNFT, cNFT and Core",
        short: "Token formats used for cards.",
        body: "Different technical standards for the same idea. pNFTs enforce royalties on transfer, cNFTs are cheaper to create at scale, and Core is a newer single-account format. For traders the difference is mostly invisible.",
      },
      {
        term: "Wallet",
        short: "Your on-chain account and its address.",
        body: "A Solana address that holds your tokens. Every address is public, so anyone can look up a wallet's cards and history. On Decard, paste an address to open its Trainer Card.",
      },
      {
        term: "USDC vs SOL",
        short: "The two currencies you'll see.",
        body: "Collector Crypt prices in USDC, a dollar-pegged stablecoin, so its prices read like dollars. Magic Eden listings often settle in SOL, whose dollar value moves. Decard converts SOL at the live rate so you can compare fairly.",
      },
      {
        term: "Escrow",
        short: "Funds held to back your offers.",
        body: "When you make an offer, USDC sits in an escrow account tied to your wallet. One escrow balance backs all your open offers together, so keep it funded for the offers you want to stay live.",
      },
      {
        term: "Bulk bid bots",
        short: "Wallets that update many offers at once.",
        body: "Some wallets adjust bids on dozens of cards in a single transaction. They add a lot of noise to the tape, so Decard tags them as BOT and hides them by default.",
      },
    ],
  },
  {
    id: "collector-slang",
    title: "Collector slang",
    category: "Lorcana",
    terms: [
      {
        term: "Grail",
        short: "The card you'd trade almost anything for.",
        body: "A collector's ultimate target, usually a rare card in a top grade. Everyone's grail is different.",
      },
      {
        term: "Chase card",
        short: "The card everyone opens packs hoping to hit.",
        body: "The most wanted card in a set, often a special illustration or alternate art. Chase cards drive pack demand and hold value best.",
      },
      {
        term: "Gacha packs",
        short: "Mystery packs that reveal a random card.",
        body: "Collector Crypt sells digital packs that open into a random tokenized graded card, with an option to sell the pull back for USDC. Fun to open, but the expected value can be below the pack price.",
      },
      {
        term: "Strategy coins",
        short: "pump.fun coins that buy graded cards.",
        body: "Some pump.fun tokens route their creator fees into buying graded cards on Collector Crypt, then raffle or distribute them to holders. Their wallets show up on the tape as steady buyers.",
      },
      {
        term: "Whale",
        short: "A trainer who moves big money.",
        body: "A wallet that buys or holds a lot of high-value cards. Watching whales is a classic way to spot where the market is heading. Star a wallet on its Trainer Card to keep an eye on it.",
      },
    ],
  },
];
