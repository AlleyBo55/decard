// The Trainer's Guide: plain-language definitions for newcomers. Each section
// is shown as a Pokémon type; terms are numbered like Pokédex entries. The
// numbers shift as entries are added, so links use each term's `id` instead.

export interface GuideTerm {
  /** Stable anchor (/guide#id) that hubs and search results link to: never rename or reuse one. */
  id: string;
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
        id: "card-grading",
        term: "Grading",
        short: "A professional score of a card's condition.",
        body: "An independent company inspects the card's centering, corners, edges and surface, then assigns a number. A higher grade means a cleaner card and usually a much higher price. The grade is sealed in with the card, so buyers don't have to judge condition from photos.",
      },
      {
        id: "psa-cgc-bgs",
        term: "PSA, CGC and BGS",
        short: "The three graders you'll see most.",
        body: "PSA (Professional Sports Authenticator), CGC (Certified Guaranty Company) and BGS (Beckett) each have their own scale and label. The same card can get different grades from different companies, and the market prices them differently, so always check who graded it.",
        tip: "PSA 10s usually command the biggest premium for Pokémon cards.",
      },
      {
        id: "grading-scale",
        term: "The 1 to 10 scale",
        short: "10 is flawless, 9 is near-perfect.",
        body: "PSA calls a 10 GEM-MT (gem mint). A 9 is still strong. Below 8 the wear is visible and prices drop sharply. CGC and BGS also give half grades like 9.5, and BGS awards Pristine 10 and the famous Black Label for a perfect card.",
      },
      {
        id: "slab",
        term: "Slab",
        short: "The sealed plastic case a graded card lives in.",
        body: "After grading, the card is locked in a tamper-evident holder with a label showing the card, the grade and a certification number. 'Slabbed' simply means graded and sealed.",
      },
      {
        id: "cert-number",
        term: "Cert number",
        short: "The slab's unique ID.",
        body: "Every slab has a certification number printed on its label. You can look it up on the grader's site to confirm the card and grade are real. On a Decard card page, PSA and CGC cert numbers link straight to the lookup.",
      },
      {
        id: "raw-card",
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
        id: "population-report",
        term: "Population report (pop)",
        short: "How many copies exist at each grade.",
        body: "Graders publish how many of each card they've graded at every level. If only 12 copies exist as a PSA 10, that card is scarce at that grade, which supports a higher price. A low pop at the top grade is one of the strongest rarity signals.",
        tip: "Decard shows pop as 'base stats' bars on every card page.",
      },
      {
        id: "pop-1",
        term: "Pop 1",
        short: "The only copy at that grade.",
        body: "A card with a population of one at its grade. If the grade is high, it's often a collector's grail and trades at a big premium.",
      },
      {
        id: "gem-rate",
        term: "Gem rate",
        short: "The share of a card that grades 10.",
        body: "Out of every copy submitted, the percentage that came back as a perfect 10. A low gem rate means perfect copies are hard to get, so each 10 is worth more. A high gem rate means 10s are common.",
      },
      {
        id: "insured-value",
        term: "Insured value",
        short: "The vault's declared worth of the card.",
        body: "Collector Crypt keeps the physical card in a professional vault and records an insured value for it. It's a useful reference for what the card is worth, though the live market can trade above or below it.",
      },
      {
        id: "alt-art",
        term: "Parallel, alt art and full art",
        short: "Special versions of a card.",
        body: "A parallel is an alternate printing that's rarer than the base card. Full art cards fill the whole face with artwork; alternate art cards use a different illustration. These versions often carry big premiums.",
      },
      {
        id: "first-edition",
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
        id: "floor",
        term: "Floor",
        short: "The cheapest listing available.",
        body: "The lowest asking price in a category or set right now. 'Sweeping the floor' means buying up the cheapest listings. The floor is the fastest read on what entry costs today.",
      },
      {
        id: "listing",
        term: "Listing",
        short: "A card put up for sale at a set price.",
        body: "The owner picks a price and the card shows on the market until someone buys it or the listing is cancelled. On Collector Crypt the card stays in the owner's wallet while listed; it's delegated for sale rather than moved into escrow.",
      },
      {
        id: "offer",
        term: "Offer or bid",
        short: "A price a buyer proposes.",
        body: "Instead of paying the asking price, a buyer can offer less and wait. Offers are backed by USDC held in the buyer's escrow, and on Collector Crypt an offer must be at least 10% of the card's insured value. The owner can accept, ignore, or wait for better.",
      },
      {
        id: "deal-score",
        term: "Deal score",
        short: "How far below insured value a listing sits.",
        body: "A Decard number from 0 to 100 shown as an HP bar. It compares the asking price with the insured value, so a card listed well under its insured worth scores high. It's a quick filter for underpriced listings, not a guarantee, so always check the card.",
        tip: "Only shown on USDC listings that have an insured value.",
      },
      {
        id: "spread",
        term: "Spread",
        short: "The gap between the best bid and the asking price.",
        body: "If a card is listed at $500 and the best bid is $420, the spread is $80. A tight spread means buyers and sellers agree on value; a wide one means there's room to negotiate.",
      },
      {
        id: "fees",
        term: "Fees",
        short: "What a sale costs.",
        body: "Collector Crypt's marketplace takes a platform fee from the seller's proceeds, 2% by default. The buyer pays exactly the listed price. On-chain network fees on Solana are fractions of a cent.",
      },
      {
        id: "flip",
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
        id: "tokenized-card",
        term: "Tokenized card",
        short: "A physical card owned through an on-chain token.",
        body: "The real slab sits in a vault while ownership is tracked by a token on Solana. Holding the token means owning the card. You can trade it in seconds, or redeem it to have the physical card shipped to you.",
      },
      {
        id: "vault",
        term: "Vault",
        short: "Where the physical card is stored.",
        body: "A secure, insured facility (for example a grader's own vault) that holds the slab for you. Vaulting is what makes instant on-chain trading possible.",
      },
      {
        id: "redeem",
        term: "Redeem",
        short: "Turn the token back into the physical card.",
        body: "Redeeming burns the token and ships the slab to your address. After that, the card trades like any normal physical card again.",
      },
      {
        id: "pnft-cnft-core",
        term: "pNFT, cNFT and Core",
        short: "Token formats used for cards.",
        body: "Different Metaplex standards for the same idea. pNFTs enforce royalties on transfer, cNFTs are cheaper to create at scale, and Metaplex Core is a newer single-account format. For traders the difference is mostly invisible.",
      },
      {
        id: "wallet",
        term: "Wallet",
        short: "Your on-chain account and its address.",
        body: "A Solana address that holds your tokens. Every address is public, so anyone can look up a wallet's cards and history. On Decard, paste an address to open its Trainer Card.",
      },
      {
        id: "usdc-vs-sol",
        term: "USDC vs SOL",
        short: "The two currencies you'll see.",
        body: "Collector Crypt prices in USDC, a dollar-pegged stablecoin, so its prices read like dollars. Magic Eden listings often settle in SOL, whose dollar value moves. Decard converts SOL at the live rate so you can compare fairly.",
      },
      {
        id: "escrow",
        term: "Escrow",
        short: "Funds held to back your offers.",
        body: "When you make an offer, USDC sits in an escrow account tied to your wallet. One escrow balance backs all your open offers together, so keep it funded for the offers you want to stay live.",
      },
      {
        id: "bid-bots",
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
        id: "grail",
        term: "Grail",
        short: "The card you'd trade almost anything for.",
        body: "A collector's ultimate target, usually a rare card in a top grade. Everyone's grail is different.",
      },
      {
        id: "chase-card",
        term: "Chase card",
        short: "The card everyone opens packs hoping to hit.",
        body: "The most wanted card in a set, often a special illustration or alternate art. Chase cards drive pack demand and hold value best.",
      },
      {
        id: "hit",
        term: "Hit",
        short: "A valuable card pulled from a pack.",
        body: "Any card worth noticeably more than the pack it came from, such as an alternate art, a secret rare, a numbered parallel or an autograph. 'What did you hit?' means 'what good cards did you pull?'",
      },
      {
        id: "pull",
        term: "Pull",
        short: "A card you got from a pack, or getting it.",
        body: "'I pulled a Charizard' means it came out of a pack you opened. On Collector Crypt, a pull is the graded card a gacha pack awards, and Decard's luck checker scores it against the pack's odds.",
      },
      {
        id: "rip",
        term: "Rip",
        short: "To open packs.",
        body: "'Ripping packs' means opening them, often on camera or a livestream. A 'rip and ship' is a stream where the host opens product live and ships the cards to buyers.",
      },
      {
        id: "case-break",
        term: "Case break",
        short: "A group opening of a whole case of boxes.",
        body: "Buyers pay for a spot, often a team, a character or a random slot, and receive the cards from the case that match it. Breaks spread the cost of an expensive case across many collectors.",
      },
      {
        id: "gacha",
        term: "Gacha packs",
        short: "Mystery packs that reveal a random card.",
        body: "Collector Crypt sells digital packs that open into a random tokenized graded card, with an option to sell the pull back for USDC. Fun to open, but the expected value can be below the pack price.",
      },
      {
        id: "buyback",
        term: "Buyback",
        short: "Selling a gacha pull straight back for USDC.",
        body: "Collector Crypt's gacha machines offer to buy the card you just pulled for a set percentage of its insured value, paid instantly in USDC. It's fast cash, but you give up the chance to sell the card for more.",
      },
      {
        id: "pc",
        term: "PC (personal collection)",
        short: "Cards you keep, not flip.",
        body: "'Going in the PC' means a card isn't for sale. Collectors' PCs often center on one character, set or player.",
      },
      {
        id: "comps",
        term: "Comps",
        short: "Recent sales of the same card and grade.",
        body: "Short for comparables. Checking comps before buying or listing tells you what the card actually sells for, which can be far from its asking prices. Decard's recent sales page and each card's history are a good place to start.",
      },
      {
        id: "gem-mint",
        term: "Gem mint",
        short: "Top condition: a 10, or a 9.5 at Beckett.",
        body: "PSA labels its 10 GEM-MT 10, CGC has a Gem Mint 10 below its Pristine 10, and Beckett calls a 9.5 Gem Mint. 'Gemmed' means a card came back from grading at gem mint.",
      },
      {
        id: "centering",
        term: "Centering",
        short: "How evenly the image sits within the borders.",
        body: "Graders compare the borders on each side, front and back. A card can be flawless otherwise and still miss a 10 because it was printed or cut off-center.",
      },
      {
        id: "crack-and-resub",
        term: "Crack and resub",
        short: "Breaking a card out of its slab to grade it again.",
        body: "Collectors crack a slab when they think the card could earn a higher grade or a better-valued label on a second try. It's a gamble: the new grade can come back lower. A tokenized card has to be redeemed before its slab can be cracked.",
      },
      {
        id: "bgs-black-label",
        term: "BGS Black Label",
        short: "A Beckett Pristine 10 with all four subgrades at 10.",
        body: "Beckett grades centering, corners, edges and surface separately. When all four are perfect 10s, the card gets a black label instead of the gold Pristine label. Black Labels are rare and usually trade at a large premium over other 10s.",
      },
      {
        id: "cgc-pristine-10",
        term: "CGC Pristine 10",
        short: "CGC's top grade, a step above its Gem Mint 10.",
        body: "CGC gives Pristine 10 to cards that look virtually flawless under magnification. Both labels say 10, so check which one a slab carries before comparing prices.",
      },
      {
        id: "holo",
        term: "Holo and reverse holo",
        short: "Foil on the artwork, or on everything but the artwork.",
        body: "A holo (holofoil) card has a shiny foil illustration. A reverse holo flips that: the frame and text box are foil and the art is not. Many modern Pokémon cards come in both a regular and a reverse holo version.",
      },
      {
        id: "shadowless",
        term: "Shadowless",
        short: "An early Pokémon Base Set print with no drop shadow.",
        body: "The first English Base Set print runs lack the shadow along the right edge of the art box that later Unlimited prints added. Shadowless cards, including every 1st Edition Base Set card, usually sell for more than Unlimited copies.",
      },
      {
        id: "secret-rare",
        term: "Secret rare",
        short: "A rarity above a set's regular rares.",
        body: "In Pokémon, secret rares are numbered past the set's printed total, like 201/198. One Piece marks its top rarity SEC, and in Yu-Gi-Oh! a Secret Rare is a specific foil treatment, so the exact meaning depends on the game.",
      },
      {
        id: "sir-and-sar",
        term: "SIR and SAR",
        short: "Pokémon's special illustration rares and special art rares.",
        body: "Special Illustration Rares (SIR) are the English full-art cards with scene-style artwork that arrived with the Scarlet & Violet era, and Special Art Rares (SAR) are the matching Japanese rarity. They are usually the most valuable cards in a modern set.",
      },
      {
        id: "manga-rare",
        term: "Manga rare",
        short: "A One Piece alternate art set against manga panels.",
        body: "A rare One Piece Card Game parallel whose artwork places the character over black-and-white panels from the manga. Manga rares are some of the most sought-after cards in the game.",
      },
      {
        id: "numbered",
        term: "Numbered cards (/99)",
        short: "Cards stamped with their print run.",
        body: "A card marked 23/99 is copy 23 of 99, and a 1/1 is one of a kind. Lower print runs usually carry bigger premiums. Numbering is common in sports cards and appears on some trading card game promos and special editions.",
      },
    ],
  },
  {
    id: "crypto-slang",
    title: "Crypto and Solana slang",
    category: "Magic The Gathering",
    terms: [
      {
        id: "seed-phrase",
        term: "Seed phrase",
        short: "The 12 or 24 words that control a wallet.",
        body: "Anyone with these words can take everything in the wallet, so keep them offline and never type them into a website, a DM or a 'support' form. Decard never asks for one.",
      },
      {
        id: "phantom-and-solflare",
        term: "Phantom and Solflare",
        short: "Popular Solana wallet apps.",
        body: "Browser extensions and mobile apps that hold SOL, USDC and NFTs, sign transactions and connect to marketplaces like Collector Crypt and Magic Eden. Decard doesn't need one: paste any address to look a wallet up.",
      },
      {
        id: "sol",
        term: "SOL",
        short: "Solana's native coin.",
        body: "Every Solana transaction pays a small network fee in SOL, so a wallet needs a little even when it trades in USDC. Decard marks SOL prices with ◎ and converts them to dollars at the live rate.",
      },
      {
        id: "spl-token",
        term: "SPL token",
        short: "Solana's standard for fungible tokens.",
        body: "Coins and stablecoins on Solana, USDC included, are SPL tokens issued through Solana's token programs. Each one is identified by its mint address.",
      },
      {
        id: "nft",
        term: "NFT",
        short: "A non-fungible token: one unique item on-chain.",
        body: "Unlike a coin, every NFT is one of a kind with its own address. A tokenized card is an NFT that stands for one specific vaulted slab, so owning the NFT means owning the card.",
      },
      {
        id: "mint",
        term: "Mint",
        short: "Creating a token, or the address that identifies it.",
        body: "Minting puts a new token on-chain, and its mint address is its permanent ID; Decard card pages use that address in their URL. In grading, 'Mint' means condition instead, as in PSA Mint 9.",
      },
      {
        id: "on-chain-and-off-chain",
        term: "On-chain and off-chain",
        short: "Recorded on the blockchain, or kept somewhere else.",
        body: "On-chain sales, listings and bids are public Solana transactions anyone can verify. Off-chain data, like a card's grade or insured value, comes from a company's own records.",
      },
      {
        id: "solscan",
        term: "Solscan",
        short: "A Solana block explorer.",
        body: "A website for looking up any Solana transaction, wallet or token. Decard links trades on its tape and sales page to Solscan, so you can check them yourself.",
      },
      {
        id: "airdrop",
        term: "Airdrop",
        short: "Free tokens sent to wallets.",
        body: "Projects airdrop tokens or NFTs to reward early users or holders. Some must be claimed on the project's own site, which is why fake 'claim your airdrop' links are a favourite scam: only trust links from the project's official accounts.",
      },
      {
        id: "rug-pull",
        term: "Rug pull",
        short: "When a project's creators cash out and vanish.",
        body: "The team behind a coin or NFT project drains its liquidity or dumps its holdings, leaving buyers with tokens worth little or nothing. Anonymous teams and hype without a working product are common warning signs.",
      },
      {
        id: "whale",
        term: "Whale",
        short: "A trainer who moves big money.",
        body: "A wallet that buys or holds a lot of high-value cards. Watching whales is a classic way to spot where the market is heading. Star a wallet on its Trainer Card to keep an eye on it.",
      },
      {
        id: "strategy-coins",
        term: "Strategy coins",
        short: "pump.fun coins that buy graded cards.",
        body: "Some pump.fun tokens route their creator fees into buying graded cards on Collector Crypt, then raffle or distribute them to holders. Their wallets show up on the tape as steady buyers.",
      },
      {
        id: "degen",
        term: "Degen",
        short: "A trader who takes big, fast risks.",
        body: "Short for degenerate, said half as a joke and half as a badge. Degens ape into new coins, mystery packs and thin markets hoping for a big win.",
      },
      {
        id: "ape-in",
        term: "Ape in",
        short: "To buy fast and big, without much research.",
        body: "'I aped in' means someone bought heavily on hype or impulse. It's how people catch early runs, and how they end up buying the top.",
      },
      {
        id: "diamond-hands",
        term: "Diamond hands and paper hands",
        short: "Holding through the drops, or selling at the first dip.",
        body: "Diamond hands keep holding however far the price falls; paper hands sell at the first sign of trouble. Collectors use both for cards as well as coins.",
      },
      {
        id: "ath",
        term: "ATH",
        short: "All-time high.",
        body: "The highest price a coin, token or card has ever reached. 'Back at ATH' means it's trading at its record again.",
      },
      {
        id: "wagmi-and-ngmi",
        term: "WAGMI and NGMI",
        short: "\"We're all gonna make it\" and \"not gonna make it\".",
        body: "WAGMI is crypto Twitter's group cheer of optimism. NGMI is the opposite, aimed at a bad decision or at someone who gave up too early.",
      },
      {
        id: "gm",
        term: "GM",
        short: "Good morning.",
        body: "The default greeting on crypto Twitter, posted at any hour. Replying 'gm' is how many collector communities on X say hello.",
      },
      {
        id: "lfg",
        term: "LFG",
        short: "Pure hype for a big moment.",
        body: "Short for 'let's f-ing go', posted after a great pull, a big sale or a price pump. In gaming it can also mean 'looking for group'.",
      },
    ],
  },
];
