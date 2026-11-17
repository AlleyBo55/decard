// English source. Translations in ../<locale>/luck.ts must keep these keys.
// /luck: Decard's pull luck analyzer (score a wallet's gacha pulls, or one pack memo, against the cards
// and tier odds each pull was drawn from) and the live gacha below it (feed, hall of fame, odds now).
// The gacha, its packs, odds and verifier are Collector Crypt's. Tier names come from ui.gachaTiers.
// A "memo" is a pack's ID ("cc-…"); "insured value" is Collector Crypt's listed value of a card.
export const luck = {
  /** The image of a pulled card. {name} is the card's name. */
  cardFront: "Front of {name}",
  /** A tier chip: "Epic tier". {tier} is a ui.gachaTiers name. */
  tier: "{tier} tier",
  /** A score out of 100. {score} is 0 to 100, e.g. 72.5. */
  score: "Luck score {score}/100",
  /** The short label beside the luck score bar. */
  bar: "Luck",
  /** Button after a request failed. */
  retry: "Try again",
  /** The share button after a click. */
  share: {
    shared: "Shared",
    copied: "Link copied",
    failed: "Sharing failed. Copy the URL from the address bar.",
  },
  /** The page header (app/[lang]/luck/page.tsx). */
  page: {
    breadcrumb: "Breadcrumb",
    /** This page in the breadcrumb, on the page and in search results. */
    crumb: "Gacha",
    kicker: "Gacha hub",
    /** {accent} is h1Accent, drawn in the accent colour. */
    h1: "Live gacha, odds now, {accent}",
    h1Accent: "pull luck.",
    lede: "Watch Collector Crypt packs open as they land, check what the next pull can return before you buy, and score any pull against the exact card pool and tier odds it was drawn from. Paste a wallet to score every pull it opened, or one pack memo or official verify-selection URL.",
    /** Links that jump down the page. */
    jumpLabel: "On this page",
    jump: {
      live: "Live pulls",
      hallOfFame: "Hall of fame",
      odds: "Odds now",
    },
    note: "Collector Crypt Solana only. Values are insured values, not sale prices, returns or profit. Every pull is independent, so a cold streak doesn't make the next pack luckier.",
    /** Screen-reader name of the live gacha section. */
    liveLabel: "Live gacha",
  },
  /** The form (components/luck/LuckAnalyzer.tsx). "cc-…" is how every pack memo starts: keep it. */
  analyzer: {
    kicker: "Pack witness",
    title: "Analyze your pulls",
    sub: "Paste a Solana wallet to score every pack pull it opened, or one cc-… pack memo or official Collector Crypt verify-selection URL.",
    label: "Wallet address, pack memo or verifier URL",
    placeholder: "Paste your wallet or a cc-… pack memo",
    submit: "Analyze luck",
    help: "Only the normalized wallet address or pack memo is sent. The result URL can be bookmarked or shared.",
    /** Link to a sample result. */
    example: "Try Collector Crypt's documented example →",
    invalidTitle: "Enter a wallet address or a Collector Crypt pack memo.",
    invalidBody: "Paste a Solana wallet address, a cc- memo with its complete ID, or the official verify-selection URL that contains it.",
    /** Loader label; the page adds "...". */
    loading: "Checking the historical pull",
  },
  /** Why one pull could not be scored. */
  errors: {
    legacy: {
      title: "This legacy pull cannot be scored.",
      body: "Older pulls without a provable historical pool snapshot do not contain enough data for a fair comparison.",
    },
    pending: {
      title: "This pull is not ready yet.",
      body: "Collector Crypt has not published all verification data for this pull. Try this memo again later.",
    },
    unverified: {
      title: "Collector Crypt did not verify this pull.",
      body: "Decard will not show a luck score unless the official selection witness verifies successfully.",
    },
    incomplete: {
      title: "This pull does not have complete historical data.",
      body: "The saved pool or odds are incomplete, so Decard cannot calculate a defensible luck score.",
    },
    badMemo: {
      title: "That pack memo could not be analyzed.",
      body: "Check that it belongs to a Collector Crypt Solana pull, then paste the memo or its official verify-selection URL again.",
    },
    unavailable: {
      title: "The luck data source is unavailable.",
      body: "The upstream pull data could not be loaded. Your memo is still in the URL, so you can try again safely.",
    },
  },
  /** One scored pull. */
  result: {
    verified: "Selection verified",
    percentile: "Historical percentile",
    /** {pct} is a percentage, drawn in green. */
    beat: "You beat {pct} of possible pulls.",
    /** {pct} is a percentage, drawn in bold. */
    matchOrBeat: "{pct} could match or beat it.",
    /** The facts grid: a label, then an optional line under the value. */
    metrics: {
      insured: "Insured value",
      insuredDetail: "Historical committed leaf value",
      tierChance: "Tier chance",
      tie: "Exact tie chance",
      tieDetail: "Same insured value",
      candidates: "Tier candidates",
      candidatesDetail: "Frozen candidate pool",
      available: "Available at pull",
      availableDetail: "Eligible for selection",
      unavailable: "Unavailable at pull",
      unavailableDetail: "Already removed",
      basis: "Odds basis",
      committed: "Committed thresholds",
      published: "Published machine odds",
      poolVersion: "Pool version",
      pulledAt: "Pulled at",
      /** When the pull has no time. */
      notReported: "Not reported",
    },
    note: "Insured value describes the historical pack witness. It is not a current market price or a profit estimate.",
    /** Follows note, by how this pack's odds were fixed. */
    noteCommitted: "Tier odds were committed with this pack.",
    notePublished: "This older pack exposes published machine odds, not per-pack committed thresholds.",
    cardPage: "Card page →",
    /** {wallet} is a shortened address. */
    wallet: "Wallet {wallet} →",
    /** Screen-reader name of that link. {wallet} is the full address. */
    walletLabel: "Open wallet {wallet}",
    solscan: "Solscan transaction ↗",
    verifier: "Official verifier ↗",
    share: "Share pull",
    /** Screen-reader name of the share button. */
    shareLabel: "Share luck result for {name}",
    /** The shared link's title and text. */
    shareTitle: "Gacha pull luck: {score}/100",
    shareText: "{name} beat {pct} of possible pulls in its historical pool.",
    howTitle: "How the score works",
    how: [
      "Luck score = the chance of a lower insured-value pull + half the chance of an equal-value pull. Tier odds are applied first, then cards inside the rolled tier are compared using the pool that was available at the time.",
      "Equal insured values are ties. Each tie counts as half a win in the midrank percentile, rather than being reported as a card this pull beat.",
    ],
  },
  /** Every pull of one wallet (components/luck/WalletLuck.tsx). */
  wallet: {
    pulls: { one: "{n} pull", other: "{n} pulls" },
    kicker: "Wallet pull luck",
    /** {wallet} is a shortened address. */
    title: "Wallet {wallet}",
    average: "Average luck score",
    /** {score} is 0 to 100. */
    score: "Wallet luck {score}/100",
    /** While no pull is scored yet. */
    scorePending: "Wallet luck …",
    /** {n} is how many pulls were scored; {pct} is a percentage, drawn in green. */
    run: {
      one: "Across {n} pull, luckier than {pct} of fair {n}-pull runs.",
      other: "Across {n} pulls, luckier than {pct} of fair {n}-pull runs.",
    },
    /** Progress while pulls are scored. {n} is the total. */
    scoring: { one: "Scoring {done} of {n} pull…", other: "Scoring {done} of {n} pulls…" },
    noneScored: "None of these pulls could be scored. The list below says why.",
    /** {value} and {expected} are dollar amounts in bold; {ratio} is a percentage. */
    value: "Pulled {value} of insured value vs {expected} expected ({ratio}).",
    /** Follows value when only some pulls report an expected value. {n} is how many were scored. */
    valueSample: {
      one: "Covers the {sample} of {n} pull that report expected value.",
      other: "Covers the {sample} of {n} pulls that report expected value.",
    },
    tiers: "Tiers pulled",
    share: "Share wallet luck",
    /** The shared link's title. */
    shareTitle: "Gacha wallet luck: {score}/100",
    walletPage: "Wallet page →",
    best: "Best pull",
    list: "Pulls, newest first",
    /** A pull that could not be scored, at the end of its row. */
    notScored: "Not scored",
    /** {value} is a dollar amount. */
    insured: "{value} insured",
    /** Why a pull in the list was not scored. */
    reasons: {
      legacy: "Legacy pull, no pool snapshot",
      unverified: "Not verified by Collector Crypt",
      pending: "Not verified yet",
      incomplete: "Incomplete historical data",
      unsupported: "Unsupported pull",
      unavailable: "Unavailable right now",
    },
    errors: {
      badWallet: {
        title: "That wallet address could not be read.",
        body: "Check that it is a Solana wallet address, then paste it again.",
      },
      unavailable: {
        title: "This wallet's history is unavailable right now.",
        body: "Its Solana transaction history could not be loaded. The wallet is still in the URL, so you can try again safely.",
      },
    },
    /** Loader label; the page adds "...". */
    loading: "Reading this wallet's pack history",
    /** Notes under the list. */
    notes: {
      other: {
        one: "{n} pull not credited to this wallet by the official verifier is left out.",
        other: "{n} pulls not credited to this wallet by the official verifier are left out.",
      },
      latest: { one: "Showing your latest {n} pull.", other: "Showing your latest {n} pulls." },
      scanned: { one: "Scanned the latest {n} transaction.", other: "Scanned the latest {n} transactions." },
      failed: { one: "{n} pull could not be scored.", other: "{n} pulls could not be scored." },
    },
    empty: {
      title: "No Collector Crypt pack pulls found in this wallet.",
      body: "Collector Crypt may open packs from an embedded wallet. If so, paste the wallet address shown in your Collector Crypt profile instead.",
      /** {wallet} is a shortened address. */
      open: "Open wallet {wallet} →",
    },
    howTitle: "How wallet luck works",
    how: [
      "Every pull gets its own luck score and the wallet score is their average. 50 is average luck: a fair pull scores above 50 about half the time.",
      "The run percentile compares that average with fair runs of the same number of pulls. Averaging 60 over 40 pulls is far rarer than one pull scoring 60.",
      "Values are insured values from each pack's historical witness, not sale prices or profit. Each pull is independent, so a cold streak doesn't make the next pack luckier.",
    ],
  },
  /** The live gacha (components/gacha). Short uppercase labels are drawn in a pixel font. */
  gacha: {
    kicker: "Live gacha",
    /** {accent} is titleAccent, drawn in the accent colour. */
    title: "Packs opening {accent}",
    titleAccent: "right now.",
    sub: "Every Collector Crypt pack opening as it lands, the biggest epic pulls of the last twelve hours, and what one pull can give you right now.",
    /** Tier chip of a pull whose card isn't awarded yet. */
    opening: "Opening",
    /** {multiple} is like "9.1×". */
    packMultiple: "{multiple} the pack price",
    /** Screen-reader name of a wallet link. {wallet} is a shortened address. */
    walletLuck: "Pull luck for wallet {wallet}",
    live: "LIVE",
    noEpics: "No epic pulls in the recent window.",
  },
  /** Pack openings as they land (components/gacha/LiveFeed.tsx). */
  feed: {
    title: "Live pulls",
    perMinute: "Pulls / min",
    epics: "Epics",
    best: "Best ×",
    /** Footer: the time the feed spans, then how many pulls it holds ({pulls} is footPulls). */
    footSeconds: "LAST {n}S · {pulls}",
    footMinutes: "LAST {n} MIN · {pulls}",
    footPulls: { one: "{n} PULL", other: "{n} PULLS" },
    refresh: "REFRESHES EVERY 10S",
    error: "The gacha feed didn't answer. It usually comes back within a few seconds.",
    empty: "No packs opened in the last couple of minutes.",
    /** Pull tags. */
    turbo: "TURBO",
    free: "FREE",
    /** Link to a pull's luck score. */
    score: "SCORE",
    /** That link read by screen readers. {pack} is a pack name, {tier} a tier, {value} a dollar amount. */
    scorePull: "Score this pull: {pack}, {tier}",
    scorePullValue: "Score this pull: {pack}, {tier}, {value}",
    /** Stands in for {tier} before the card is awarded. */
    notAwarded: "not awarded yet",
    /** Read out when an epic lands. {value} and {price} are dollar amounts; {multiple} is like 9.1. */
    epic: "Epic hit: a {value} card from {pack}.",
    epicMultiple: "Epic hit: a {value} card from {pack}, {multiple} times the {price} price.",
  },
  /** The biggest recent epic pulls (components/gacha/HallOfFame.tsx). */
  hall: {
    title: "Hall of fame",
    status: "EPIC TIER",
    refresh: "REFRESHES EVERY MINUTE",
    sortLabel: "Rank hits by",
    sorts: {
      multiple: "Biggest ×",
      value: "Highest $",
      newest: "Newest",
    },
    /** {ago} is like "5h ago". */
    window: { one: "{n} latest epic pull", other: "{n} latest epic pulls" },
    windowSince: { one: "{n} latest epic pull · since {ago}", other: "{n} latest epic pulls · since {ago}" },
    windowLoading: "Latest epic pulls",
    error: "The winners list didn't load. It tries again every minute.",
    topThree: "Top three",
    ranks: "Ranks 4 to 10",
    /** A podium card read by screen readers. {multiple} is like "9.1×". */
    podium: "{name}, {multiple} the pack price, rank {rank}",
  },
  /** The home page's biggest recent hit (components/gacha/FeaturedHit.tsx). */
  featured: {
    title: "Biggest hit lately",
    /** Read by screen readers. {multiple} is like "9.1×". */
    label: "{name}, {multiple} the pack price",
    /** {ago} is like "5h ago". */
    caption: { one: "Best multiple of the {n} latest epic pull.", other: "Best multiple of the {n} latest epic pulls." },
    captionSince: {
      one: "Best multiple of the {n} latest epic pull, since {ago}.",
      other: "Best multiple of the {n} latest epic pulls, since {ago}.",
    },
  },
  /** What one pull can return now (components/gacha/PullNow.tsx, OddsSnapshot.tsx). */
  odds: {
    cardBeats: "Card worth ≥ what you pay",
    sellBack: "Sell-back returns ≥ what you pay",
    double: "Card worth 2× or more",
    /** A chance that can't be worked out. */
    na: "n/a",
    /** Game-style label on the chance bars. */
    hp: "HP",
    /** {n} is like 20,000. */
    oneIn: "1 in {n}",
    /** Under a chance bar. {n} is like 2.5 or 40. */
    oneInPulls: { other: "about 1 in {n} pulls" },
    /** {price} is a dollar amount. */
    perPull: "{price} a pull",
    /** {cents} is like "93.5¢". */
    perDollar: "{cents} per $1",
    /** How long ago the card pool was read. Fills {age} below. */
    poolAge: {
      underMinute: "under a minute",
      minutes: { other: "{n} min" },
      hours: { other: "{n} h" },
      days: { one: "{n} day", other: "{n} days" },
    },
    /** The small odds panel. */
    snapshot: {
      title: "ODDS NOW",
      poolRead: "POOL READ {age} AGO",
      failed: "Needs the live card pool, which didn't load.",
      missing: "Not published for this pack.",
      /** {value} is a dollar amount, {odds} is like "1 in 20,000". */
      topChase: "Top chase {value} · {odds}",
      cashBack: "Cash back per $1 if you sell back",
      dashed: "The dashed line marks $1.00. A bar that stops short of it means selling back returns less than the pull cost, on average.",
    },
    /** The full odds panel. */
    pullNow: {
      title: "If you pull now",
      pool: "POOL {age}",
      tierOddsStatus: "TIER ODDS",
      refresh: "ODDS REFRESH EVERY 5 MIN",
      error: "The machine list didn't load. It tries again every minute.",
      empty: "No machines are open right now.",
      categories: "Machine category",
      /** {category} is a franchise, e.g. Pokémon. */
      machines: "{category} machines",
      scrollLeft: "Scroll machines left",
      scrollRight: "Scroll machines right",
      /** Above the machine's name. */
      onePullOf: "One pull of",
      unknownPack: "That pack isn't open right now, so these are its last published numbers.",
      failed: "Live pool odds didn't load, so these are the machine's published numbers.",
      chances: "Your chances on one pull",
      sellBack: "If you sell it back",
      cashBack: "average cash back per $1 you spend",
      /** The gauge read by screen readers. {cents} is like "93.5¢". */
      gauge: "{cents} back per $1 on average. Break-even is $1.00.",
      ev: "Card EV per $1",
      /** {pct} is like "85%". */
      evNote: "Average insured value of the card per $1. Insured value isn't cash: selling back pays {pct} of it.",
      tierOdds: "Tier odds",
      /** The tier bar read by screen readers. {list} is like "Common 75%, Rare 5%". */
      tierOddsLabel: "Tier odds: {list}",
      chase: "Chase cards right now",
      noChase: "No chase cards are published for this pack.",
      chaseFailed: "Chase cards need the live pool, which didn't load.",
      /** Why a chance shows n/a. */
      naFailed: "This needs the live card pool, which didn't load.",
      naMissing: "Collector Crypt hasn't published the pool data this needs.",
      /** The panel's footnote: footPool or footPublished, then footNote. {range} is like "93–95¢". */
      footPool: "Pool read {age} ago.",
      footPublished: "Straight from the published tier odds.",
      footNote: "Tier odds don't change between pulls; selling back returns about {range} per $1 on average. Each pull is independent.",
    },
  },
};
