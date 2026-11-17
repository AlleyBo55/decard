// English source. Translations in ../<locale>/tokenPage.ts must keep these keys.
// Server-only: the /cards-token page (app/[lang]/cards-token/page.tsx) and the server components in
// components/token (hero card, base stats, price line, flywheel, buyback chart, supply meter). The page's title
// and description are seo.ts pages["/cards-token"]. $CARDS is Collector Crypt's token; Decard tracks it.
// CARDS, CARD-USD, USDC, $1, ¢ and brand names stay as written. {stamp} is always a date and time in UTC.

export const tokenPage = {
  /** Alt text of the share image. */
  imageAlt: "CARDS price, 30-day buybacks, CARDS burned and Coinbase status",
  /** The breadcrumb <nav> label. */
  breadcrumb: "Breadcrumb",
  /** Structured data about the token. */
  ld: {
    /** Another name for the token, next to $CARDS and CARD. */
    alternateName: "Collector Crypt token",
    description: "The Solana SPL token of Collector Crypt, the marketplace and gacha for vaulted graded trading cards.",
  },
  hero: {
    kicker: "Collector Crypt · Solana token",
    /** {accent} is h1Accent, drawn with a swash. */
    h1: "$CARDS token: price, buybacks and {accent}",
    h1Accent: "burns",
    lede: "CARDS is Collector Crypt's Solana token. Its gacha sells 20 to 30 card packs a minute, and part of that revenue buys CARDS back to burn. Here is the live price, how much of each dollar ripped turns into buybacks, how many CARDS are gone, the next unlock and where the Coinbase listing stands.",
    /** Under the Coinbase badge. {date} is when Coinbase announced it, {sources} the linked news sites, {checked} Decard's last check. */
    roadmap: "Roadmap since {date} ({sources})",
    roadmapChecked: "Roadmap since {date} ({sources}) · checked {checked}",
    contract: "CONTRACT (SOLANA MINT)",
    /** The <nav> label of the outbound buttons. */
    links: "CARDS on other sites",
    jupiterSwap: "Jupiter swap",
    /** The dialog box under the hero, written like Pokémon battle text. {bought} is a dollar amount, {burned} a CARDS amount. */
    dialog: "CARDS used BUYBACK! {bought} of CARDS bought back in 30 days. {burned} CARDS have burned so far.",
    dialogNoData: "CARDS used BUYBACK! Pack revenue buys CARDS back, and the team burns it.",
  },
  /** The Coinbase badge in the hero and the "Is CARDS on Coinbase?" answer. {product} is a Coinbase market like CARD-USD, {checked} Decard's last check. */
  coinbase: {
    /** {date} is when Coinbase added the token to its roadmap. Every answer below includes it as {added}. */
    added: "Coinbase added CARD (its ticker for Collector Crypt's token) to its listing roadmap on {date}.",
    /** Decard's live check failed. */
    unavailable: {
      badge: "On Coinbase's listing roadmap · live check unavailable",
      answer: "{added} It was not trading then, and Decard's live check of Coinbase Exchange is unavailable right now.",
    },
    trading: {
      badge: "Trading on Coinbase · {product}",
      answer: "Yes. Coinbase Exchange lists {product} and it is online (checked {checked}). {added}",
    },
    /** A market exists but is not open. {status} is Coinbase's own status word, or notOnline / unknownStatus. */
    listed: {
      badge: "On Coinbase · {product} {status}",
      notOnline: "not online",
      answer: "Coinbase Exchange has a {product} market with status \"{status}\", so trading is not open yet (checked {checked}). {added}",
      unknownStatus: "unknown",
    },
    roadmap: {
      badge: "On Coinbase's listing roadmap · not trading yet",
      answer: "Not yet. {added} Trading depends on market-making support and technical infrastructure. Decard checks Coinbase Exchange every 10 minutes; at {checked} it had no CARD-USD market.",
    },
  },
  /** The hero's holographic card, drawn like a Pokémon card (components/token/DexCard.tsx). */
  card: {
    label: "CARDS as a trading card",
    stage: "BASIC · SOLANA SPL TOKEN",
    /** Hit points, written as Pokémon cards in your language print it. */
    hp: "HP",
    /** Tooltip on HP. {hp} is 1 to 100, {ath} the all-time high price, {day} its date. */
    hpTitle: "HP {hp}/100: the price is {hp}% of the all-time high of {ath} ({day})",
    hpTitleNoDay: "HP {hp}/100: the price is {hp}% of the all-time high of {ath}",
    hpUnavailable: "HP needs the price and the all-time high, which are unavailable right now",
    /** The type chip on the art. */
    type: "Fire · Burn",
    /** The Pokédex line under the art. Ht and Wt are a Pokémon card's height and weight. */
    dex: "Burning Coin Token · Ht: 6 decimals · Wt: 2B max supply",
    /** Added to the dex line after " · ". {price} is the all-time high. */
    dexAth: "ATH {price}",
    /** The card's two moves. */
    buyback: "Buyback",
    buybackText: "Pack revenue buys CARDS, last 30 days",
    burn: "Burn",
    burnText: "CARDS gone for good",
    /** {share} is the burned share of the max supply. */
    burnTextShare: "CARDS gone for good, {share} of max",
    weakness: "weakness",
    /** {day} is the unlock date ("Nov 29"), or unlockDone once it has passed. */
    unlock: "Unlock {day}",
    /** {share} is how much the unlock adds to the circulating supply. */
    unlockShare: "Unlock {day} +{share}",
    unlockDone: "done",
    resistance: "resistance",
    resistanceValue: "Buyback & burn",
    credit: "Fan-made card by Decard · not affiliated with Collector Crypt",
  },
  stats: {
    kicker: "Pokédex data",
    title: "Base stats",
    sub: "Each bar is a number against the reference written under it, so a short bar tells you something.",
    asOf: "Jupiter, as of {stamp}.",
    unavailable: "Jupiter's market data is unavailable right now.",
    /** One bar each (components/token/BaseStats.tsx): a short label, and the note under the bar. {share} is a percentage. */
    rows: {
      marketCap: { label: "Mkt cap", note: "{share} of FDV" },
      fdv: { label: "FDV", note: "{share} of FDV at the all-time high" },
      /** {circ} and {max} are CARDS amounts. */
      circ: { label: "Circ", note: "{circ} of {max} max supply" },
      /** {n} wallets hold CARDS, {change} is their 24h change. The bar is drawn against 100K wallets. */
      holders: { label: "Holders", note: { one: "{n} wallet, {change} in 24h · bar to 100K", other: "{n} wallets, {change} in 24h · bar to 100K" } },
      liquidity: { label: "Liquidity", note: "{share} of market cap, in DEX pools" },
      /** {buys} is the share of the volume that was buys. */
      volume: { label: "24h vol", note: "{share} of market cap traded, {buys} buys" },
      traders: { label: "Traders", note: "{share} of holders traded in 24h" },
    },
    entryKicker: "POKÉDEX ENTRY · BURNING COIN TOKEN",
    entry: "It feeds on ripped packs. A share of every pack sold comes back as CARDS bought on the market, and those CARDS are burned for good, so the supply can only shrink.",
  },
  /** 30 days of prices as a line (components/token/BaseStats.tsx PriceLine). */
  priceLine: {
    title: "PRICE · 30 DAYS",
    /** Screen-reader summary. {from} and {to} are dates, {change} a percentage, the rest prices. */
    label: "CARDS price over 30 days, {from} to {to}: from {first} to {last} ({change}), low {low}, high {high}.",
    empty: "The 30-day price history is unavailable right now.",
    low: "30d low",
    high: "30d high",
    ath: "All-time high",
    fromAth: "From ATH",
  },
  flywheel: {
    kicker: "Packs → revenue → burns",
    title: "The flywheel",
    sub: "Packs ripped on Collector Crypt's gacha are revenue, and part of that revenue buys CARDS back to burn. Pick a window.",
    howTitle: "How the loop works",
    /** The loop's three steps, in order: a bold title, then the text. */
    steps: [
      {
        title: "1. Packs ripped.",
        text: "Gacha pack sales on Collector Crypt and storefronts built on it, such as Jupiter Gacha, paid on Solana, Base or Robinhood Chain, or by card.",
      },
      {
        title: "2. Collector Crypt revenue.",
        text: "Pack sales and marketplace royalties, minus what Collector Crypt pays to buy cards back from players, plus the trading fees its treasury claims from the CARDS/USDC pool.",
      },
      {
        title: "3. Bought back and burned.",
        text: "CARDS bought with gacha revenue (since April 2026) plus the CARDS share of those claimed pool fees, which the team burns. Shown in dollars at the time of purchase.",
      },
    ],
    /** Bold, before derived. */
    derivedLabel: "Derived:",
    /** {bought} and {sales} are dollar amounts. */
    derived: "the centre number is 30-day buybacks ÷ 30-day pack sales ({bought} ÷ {sales}).",
    derivedNoNumbers: "the centre number is 30-day buybacks ÷ 30-day pack sales.",
    derivedMore: "The shares under each step divide DefiLlama's totals for the same window. Definitions summarise DefiLlama's methodology for Collector Crypt.",
    unavailable: "DefiLlama is unavailable right now, so the loop has no numbers.",
    /** The loop itself (components/token/Flywheel.tsx): window tabs, then one node per step. */
    windowLabel: "Time window",
    tabs: { "24h": "24h", "7d": "7d", "30d": "30d", all: "All time" },
    /** Read by screen readers after each amount. */
    spans: { "24h": "in the last 24 hours", "7d": "in the last 7 days", "30d": "in the last 30 days", all: "all time" },
    packs: "Packs ripped",
    packsSub: "gacha pack sales",
    revenue: "Collector Crypt revenue",
    /** {share} is a percentage. */
    revenueSub: "{share} of pack sales",
    revenueSubNoShare: "kept after card buybacks",
    buyback: "CARDS bought back & burned",
    buybackSub: "{share} of revenue",
    buybackSubNoShare: "in USD",
    nodeUnavailable: "unavailable",
    /** The centre of the loop, under a figure like "0.19¢". */
    hubText: "of every $1 ripped ends up as CARDS buybacks",
    hubNote: "30-day average · derived",
  },
  live: {
    kicker: "Live · Collector Crypt gacha",
    title: "Packs ripping right now",
    sub: "The last couple of minutes of pack openings, refreshed every 10 seconds. This is the activity that funds the buybacks.",
    more: "Open the live gacha feed",
    /** The Pokédex frame's title and its badge. */
    screen: "Live rips",
    badge: "LIVE",
  },
  buybacks: {
    kicker: "Bought back and burned",
    title: "Buybacks, day by day",
    sub: "The dollar value of CARDS bought back and burned each day for the last 60 days, from DefiLlama.",
    empty: "The daily buyback series is unavailable right now.",
    /** Total per window, shown in capitals. */
    windows: { "24h": "Last 24h", "7d": "Last 7 days", "30d": "Last 30 days", all: "All time" },
    note: "Totals are DefiLlama's own windows. Buybacks come in bursts, so a quiet week says little about the next one.",
    asOf: "As of {stamp}.",
  },
  /** Daily buybacks as bars (components/token/BuybackChart.tsx). {n} is the number of days shown. */
  chart: {
    /** Screen-reader summary. {from}, {to} and {topDay} are dates, {total} and {top} dollar amounts, {quiet} the days with no buyback. */
    label: {
      one: "Daily CARDS buybacks, {from} to {to}: {total} in total, biggest day {top} on {topDay}, {quiet} of {n} day with none.",
      other: "Daily CARDS buybacks, {from} to {to}: {total} in total, biggest day {top} on {topDay}, {quiet} of {n} days with none.",
    },
    /** {share} is the biggest day's share of the total. */
    caption: {
      one: "{total} bought back over this {n} day. {quiet} of the {n} day show no buyback, and the biggest day, {topDay}, was {share} of the total. Days are dated as DefiLlama dates them (UTC).",
      other: "{total} bought back over these {n} days. {quiet} of the {n} days show no buyback, and the biggest day, {topDay}, was {share} of the total. Days are dated as DefiLlama dates them (UTC).",
    },
    table: "Daily numbers",
    day: "Day (UTC)",
    amount: "Bought back and burned",
    /** A day with no buyback. */
    none: "none",
  },
  supply: {
    kicker: "2B max supply",
    title: "Supply meter",
    unavailable: "Supply numbers are unavailable right now.",
    /** {max} and {total} are CARDS amounts. */
    formula: "Burned = {max} max supply − total supply ({total}).",
    formulaNoTotal: "Burned = {max} max supply − total supply.",
    sources: "Circulating and total supply from Jupiter, max supply from CoinGecko.",
    /** The bar's parts (components/token/SupplyMeter.tsx): a name, and a note in the legend. */
    circulating: "Circulating",
    circulatingNote: "trading now",
    /** {day} is the unlock date. */
    unlocks: "Unlocks {day}",
    unlocksNote: "moves to circulating",
    locked: "Not circulating yet",
    lockedNote: "minted, not counted as circulating",
    burned: "Burned",
    burnedNote: "max supply − total supply",
    /** Screen-reader summary. {max} is a CARDS amount, {parts} lists every part as `part`. */
    label: "Supply of {max} CARDS: {parts}.",
    /** {name} is the part's name in lower case, {value} a CARDS amount, {share} a percentage. */
    part: "{name} {value} ({share})",
    /** Tooltip on each part of the bar. */
    tooltip: "{name}: {value} CARDS ({share})",
  },
  unlock: {
    kicker: "Next unlock",
    kickerPast: "Last unlock",
    title: "Unlock countdown",
    titlePast: "Unlock done",
    /** Small labels in capitals. */
    date: "DATE",
    amount: "AMOUNT",
    share: "OF CIRCULATING",
    /** On the LCD once the unlock has passed. {day} is the date, in capitals. */
    done: "UNLOCKED {day}",
    power: "COUNTING TO 00:00 UTC",
    /** {amount} is a CARDS amount, {worth} its dollar value, {day} the date, {source} the linked source. */
    note: "{amount} CARDS unlock on {day}, per {source}.",
    noteWorth: "{amount} CARDS (about {worth} at today's price) unlock on {day}, per {source}.",
    notePast: "{amount} CARDS unlocked on {day}, per {source}.",
    notePastWorth: "{amount} CARDS (about {worth} at today's price) unlocked on {day}, per {source}.",
    noHour: "The source gives the date, not the hour.",
  },
  /** Shown on the page and sent as FAQ structured data. Answers with a variant pick it by what data is available. */
  faq: {
    kicker: "Questions",
    title: "CARDS token FAQ",
    what: {
      q: "What is CARDS?",
      /** {mint} is the contract address, {decimals} is 6, {max} the max supply. */
      a: "CARDS is the Solana token of Collector Crypt, the marketplace and gacha for vaulted, graded trading cards. It is an SPL token (mint {mint}) with {decimals} decimals and a {max} max supply.",
      /** With market data: {circ} circulating, {price} the price, {cap} the market cap. */
      aMarket: "CARDS is the Solana token of Collector Crypt, the marketplace and gacha for vaulted, graded trading cards. It is an SPL token (mint {mint}) with {decimals} decimals and a {max} max supply, of which {circ} are circulating. It trades around {price} for a {cap} market cap (Jupiter, {stamp}).",
    },
    /** The answer is a, then totals (when known), lumpy, then rate (when known). */
    buybacks: {
      q: "How do the CARDS buybacks work?",
      a: "Since April 2026 Collector Crypt spends part of its gacha revenue buying CARDS on the market. Its treasury also claims trading fees from the CARDS/USDC pool, and the CARDS share of those fees joins the pile. The team burns what it buys.",
      /** {month} and {all} are dollar amounts. */
      totals: "DefiLlama counts {month} bought back in the last 30 days and {all} all time.",
      lumpy: "Buybacks are lumpy, with big days and quiet days.",
      /** {cents} is like "0.19¢". */
      rate: "Over 30 days they add up to about {cents} of every $1 spent on packs (derived from DefiLlama's totals).",
    },
    burned: {
      q: "How many CARDS have been burned?",
      /** {burned}, {max} and {total} are CARDS amounts, {share} a percentage. */
      a: "About {burned} CARDS, {share} of the {max} max supply. Decard works this out as the max supply minus the current total supply ({total}, from Jupiter), so it counts every CARDS destroyed since launch.",
      aUnavailable: "Decard works this out as the 2B max supply minus the current total supply, which is unavailable right now.",
    },
    unlock: {
      q: "When is the next CARDS unlock?",
      /** {day} is the date, {amount} a CARDS amount, {share} a percentage. */
      a: "On {day}, {amount} CARDS unlock (SolanaFloor), about {share} of today's circulating supply. Unlocked tokens move from \"not circulating yet\" into circulation.",
      aPast: "The last unlock SolanaFloor listed was on {day}: {amount} CARDS, about 6.7% of the circulating supply at the time.",
    },
    /** The answer is coinbase.*.answer. */
    coinbase: { q: "Is CARDS on Coinbase?" },
    sources: {
      q: "Where does this data come from?",
      a: "Price, market cap, supply, holders, liquidity and 24h trading come from Jupiter; the all-time high and 30-day prices from CoinGecko; pack sales, revenue and buybacks from DefiLlama; the listing check from Coinbase Exchange's public API. The page is rebuilt about every 5 minutes and the card's price refreshes every minute. Burned supply and the per-dollar buyback rate are derived by Decard.",
    },
  },
  /**
   * One item per source: a bold label, then sentences. {jupiter}, {coingecko}, {defillama} and {solanafloor} are
   * links showing that name. The *Unavailable variants replace "as of {stamp}" when that source did not answer.
   */
  sources: {
    kicker: "Receipts",
    title: "Sources and methodology",
    market: {
      label: "Market:",
      text: "{jupiter} tokens API for price, market cap, FDV, supply, holders, liquidity, 24h volume and traders, as of {stamp}.",
      textUnavailable: "{jupiter} tokens API for price, market cap, FDV, supply, holders, liquidity, 24h volume and traders (unavailable).",
      more: "Refreshed every minute; the card's price line polls Jupiter's price API through Decard once a minute while the tab is open.",
    },
    history: {
      label: "History:",
      /** {ath} is the all-time high price. */
      text: "{coingecko} for the all-time high ({ath}), max supply and 30 daily prices, as of {stamp}.",
      textNoAth: "{coingecko} for the all-time high, max supply and 30 daily prices, as of {stamp}.",
      textUnavailable: "{coingecko} for the all-time high, max supply and 30 daily prices (unavailable).",
      more: "Refreshed every 20 to 30 minutes.",
    },
    flywheel: {
      label: "Flywheel and buybacks:",
      text: "{defillama} volume (pack sales), revenue and holders revenue (buybacks) for Collector Crypt, as of {stamp}.",
      textUnavailable: "{defillama} volume (pack sales), revenue and holders revenue (buybacks) for Collector Crypt (unavailable).",
      more: "Refreshed every 30 minutes; DefiLlama itself updates daily.",
      /** {link} is openSource, linked to DefiLlama's adapter code. */
      adapter: "Their adapter is {link}.",
      openSource: "open source",
    },
    coinbase: {
      label: "Coinbase:",
      /** {checked} is Decard's last check. */
      text: "Coinbase Exchange's public products API, CARD-USD and CARDS-USD, checked {checked}.",
      textUnavailable: "Coinbase Exchange's public products API, CARD-USD and CARDS-USD (check unavailable).",
      more: "A 404 means no market yet. Checked every 10 minutes.",
      /** {sources} are the linked news sites, {date} the day of the news. */
      roadmap: "Roadmap news from {sources}, {date}.",
    },
    unlock: {
      label: "Unlock:",
      text: "{solanafloor}, November 2026 unlock schedule.",
    },
    derived: {
      label: "Derived by Decard:",
      text: "burned = max supply − total supply. Cents per $1 ripped = 30-day buybacks ÷ 30-day pack sales. HP = price ÷ all-time high. The live-rips buyback figure applies the 30-day rate to the pack dollars in the feed window, so it is an estimate.",
    },
    /** A fold with DefiLlama's own definitions, which stay in English as DefiLlama writes them. */
    definitions: "DefiLlama's own definitions",
    metrics: { volume: "Volume", revenue: "Revenue", holdersRevenue: "Holders revenue" },
    disclaimer: "Not financial advice. Decard is independent and fan-made, not affiliated with Collector Crypt, Coinbase, Jupiter, CoinGecko or DefiLlama. Pokémon is a trademark of Nintendo and The Pokémon Company; the art here is original.",
    rebuilt: "Page rebuilt {stamp}.",
    /** After rebuilt. {change} is the 24h price change, {fromAth} the distance from the all-time high. */
    change: "Price change {change} over 24h.",
    changeAth: "Price change {change} over 24h, {fromAth} from the all-time high.",
  },
  related: {
    label: "Related pages",
    title: "Keep exploring",
    luck: "Pull luck and the live gacha",
    explainer: "Tokenized trading cards, explained",
    sales: "Recent graded card sales on Solana",
  },
};
