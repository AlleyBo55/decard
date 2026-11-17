// English source. Translations in ../<locale>/rip.ts must keep these keys.
// The /rip page (app/[lang]/rip/page.tsx) and components/rip: the pack arena, the rip cutscene, the trainer
// card, the collection box, the grails, the wallet bar and picker. Tier names are in ui.ts ripTiers.

/** Arena names for the universes that are not franchise names, by components/rip/universes.ts id. Franchise names (Pokémon, One Piece...) stay as written. */
const universeNames: Record<string, string> = {
  basketball: "Basketball",
  /** American football. */
  football: "Football",
  baseball: "Baseball",
  soccer: "Soccer",
  /** Packs that mix sports. */
  sports: "Sports",
};

/** Trainer titles, keyed by the English title lib/rip/trainer.ts gives for a level (Lv 1, 3, 6, 10, 15, 25). */
const titles: Record<string, string> = {
  Rookie: "Rookie",
  "Ace Trainer": "Ace Trainer",
  "Gym Leader": "Gym Leader",
  "Elite Four": "Elite Four",
  Champion: "Champion",
  Legend: "Legend",
};

/** Trainer badges by lib/rip/trainer.ts BADGES id. `hint` says how to earn it. */
const badges: Record<string, { name: string; hint: string }> = {
  first: { name: "First Catch", hint: "Rip your first pack" },
  green: { name: "In the Green", hint: "Pull a card worth more than its pack" },
  rare: { name: "Rare Find", hint: "Pull a rare or better" },
  epic: { name: "Epic Hunter", hint: "Pull an epic" },
  legend: { name: "Legendary", hint: "Pull a legendary" },
  big: { name: "Big Hit", hint: "Pull 3× your pack price" },
  travel: { name: "Globetrotter", hint: "Rip packs from 3 universes" },
  ten: { name: "Collector", hint: "Rip 10 packs" },
  streak: { name: "On Fire", hint: "Rip 3 days in a row" },
  flip: { name: "Quick Flip", hint: "Sell a card back" },
};

export const rip = {
  /** The page around the arena (app/[lang]/rip/page.tsx). Its title and description are seo.ts pages["/rip"]. */
  page: {
    breadcrumb: "Breadcrumb",
    /** Badge linking to slabz.com. {logo} is the Slabz logo; screen readers hear "Slabz" in its place. */
    poweredBy: "Powered by {logo}",
    /** {accent} is h1Accent, drawn in the universe's colour. */
    h1: "Rip a pack. {accent}",
    h1Accent: "Catch a slab.",
    lede: {
      one: "A real graded slab in every pack, across {n} universe that rips its own way.",
      other: "A real graded slab in every pack, across {n} universes that each rip their own way.",
    },
    howKicker: "How it works",
    howTitle: "Four steps to your slab",
    steps: [
      {
        title: "Pick your universe",
        text: "Pokémon, One Piece, Dragon Ball, Riftbound, Lorcana or sports. Every pack shows its odds, average pull and top grails.",
      },
      {
        title: "Hold to rip",
        text: "Sign in with a free wallet message, then hold the pack or press Rip and approve the USDC payment.",
      },
      {
        title: "Tear it open",
        text: "Every universe has its own reveal. The light from the seam tells you the rarity before the card flips.",
      },
      {
        title: "Keep or sell",
        text: "Keep the graded slab in your wallet, or sell it back in one tap within 72 hours.",
      },
    ],
    faqKicker: "Rip FAQ",
    faqTitle: "Before you rip",
    /** Also the page's FAQ structured data. */
    faq: [
      {
        q: "What is in a Slabz pack?",
        a: "One real graded trading card (PSA, BGS or CGC) from the pack's universe, held in a vault and delivered to your Solana wallet as an NFT. Slabz runs the packs; Decard is where you rip them.",
      },
      {
        q: "How do I pay?",
        a: "In USDC from your own Solana wallet, plus a little SOL for network fees. The price on the button is the price of the pack. Decard never holds your money or your keys: your wallet signs every payment.",
      },
      {
        q: "Can I sell a card back?",
        a: "Yes, in one tap, within 72 hours of opening the pack. The amount on the sell button is what lands in your wallet.",
      },
      {
        q: "What is Turbo?",
        a: "When a pack runs low on commons, Turbo lets you rip anyway: if you pull a common it's paid out to your wallet in USDC instead of the card. Rarer pulls arrive as usual.",
      },
      {
        q: "What are XP, levels and badges?",
        a: "Your trainer card: every rip earns XP, rarer pulls earn more, and badges mark milestones like your first rare or a 3-day streak. They are built from your wallet's pulls and saved on this device. They never change the odds.",
      },
      {
        q: "What if a rip is interrupted?",
        a: "Nothing is charged until your payment confirms on-chain. Once paid, the pack waits in your collection until it opens, and opening is safe to retry: a pack is never dealt twice.",
      },
    ],
    /** {slabz} is a link to slabz.com reading "Slabz". */
    disclaimer:
      "Every pull is random. Values are insured values, not guaranteed sale prices. Only rip what you're happy to spend. Packs, odds and payouts are run by {slabz}.",
  },
  universeNames,
  /**
   * Each universe's voice, by components/rip/universes.ts id. cry: the reveal shout, {name} is the card's
   * short name in capitals ("ABRA"). valueLabel: what the reveal calls the card's value. tagline: the big
   * line behind the packs. dealing: while the card is dealt.
   */
  universes: {
    pokemon: { cry: "Gotcha! {name} was caught!", valueLabel: "Insured value", tagline: "Throw a ball. Catch a slab.", dealing: "Shake… shake… shake…" },
    onepiece: { cry: "A new bounty! {name}!", valueLabel: "Bounty", tagline: "Set sail for the One Piece.", dealing: "Hauling up the treasure…" },
    dragonball: { cry: "Power up! {name}!", valueLabel: "Power level", tagline: "Charge it past 9,000.", dealing: "Gathering energy…" },
    riftbound: { cry: "Summoned from the Rift: {name}!", valueLabel: "Rift value", tagline: "The Rift is open.", dealing: "The Rift is opening…" },
    lorcana: { cry: "Inked! {name} joins your lore.", valueLabel: "Lore value", tagline: "Ink something legendary.", dealing: "Inking your card…" },
    basketball: { cry: "Swish! {name}!", valueLabel: "Card value", tagline: "Nothing but net.", dealing: "Going up for the dunk…" },
    football: { cry: "Touchdown! {name}!", valueLabel: "Card value", tagline: "Go long.", dealing: "The ball is in the air…" },
    baseball: { cry: "Home run! {name}!", valueLabel: "Card value", tagline: "Swing for the fences.", dealing: "Here comes the pitch…" },
    soccer: { cry: "GOOOAL! {name}!", valueLabel: "Card value", tagline: "Top bins.", dealing: "Lining up the free kick…" },
    sports: { cry: "Big play! {name}!", valueLabel: "Card value", tagline: "Every sport, one rip.", dealing: "Reviewing the play…" },
  },
  /** The live part of the page (components/rip/RipLab.tsx). */
  lab: {
    /** Badge in the arena when the backend runs on Solana devnet (test money). */
    devnet: "Devnet · test USDC",
    offline: "The pack machine is offline right now. Packs will be back shortly.",
    empty: "The pack shelf is empty right now.",
    pullsKicker: "Trainer card",
    pullsTitle: "Your level, badges and pulls",
    pullsText: "XP for every rip, badges for your best pulls, and every card you've caught, ready to keep or sell back.",
    /** Floating button that brings back a pack being opened. */
    opening: "Opening your pack",
    /** Name for a pull whose pack is no longer in the catalog. */
    unknownPack: "Slabz pack",
  },
  /** The arena: universe rail, pack carousel, buy panel (components/rip/RipMachine.tsx). */
  machine: {
    arena: "Pack arena",
    universes: "Universes",
    buy: "Rip this pack",
    paused: "Paused",
    price: "Price",
    avgPull: "Avg pull",
    avgPullHint: "The expected insured value of one pull",
    sellBack: "Sell back",
    sellBackHint: "Sell any card back in one tap, within 72 hours of opening",
    /** {pct} is a whole number. */
    avgPullPct: "Avg pull {pct}% of price",
    /** Slabz's name for the option. */
    turbo: "Turbo",
    turboSub: "Auto-sell commons for USDC",
    turboHint: "When commons run low, a common pull is paid out in USDC instead of the card, so the rip always goes through",
    rip: "Rip pack",
    ripping: "Ripping…",
    fine: "A real graded slab in every pack. Keep it, or sell it back in one tap.",
    topGrails: "Top grails",
    howItWorks: "How it works",
    /** The carousel's accessible name. {universe} is the universe's name. */
    stage: "{universe} packs. Arrow keys to browse.",
    /** A pack on the carousel, for screen readers. {price} is "$50". */
    slot: "{name}, {price}",
    slotSelected: "{name}, {price}, selected",
    hold: "Hold to rip",
    prev: "Previous pack",
    next: "Next pack",
    /** The row of price buttons under the carousel. */
    prices: "Pack price",
    /** The mobile dock's button, next to the price. */
    dockRip: "Rip",
  },
  /** The odds panel. */
  odds: {
    title: "Odds",
    perPack: "1 card per pack",
    refreshing: "Odds are refreshing. Back in a moment.",
    seeGrails: "See the top grails",
    chase: "Chase cards",
    /** Under a tier's percent: "1 in 25". */
    oneIn: "1 in {n}",
    /** Instead of "1 in N" when the tier comes up more often than not. */
    mostPulls: "most pulls",
  },
  /** The full-screen rip (components/rip/Cutscene.tsx), before the card shows. */
  cutscene: {
    soundOn: "Turn sound on",
    mute: "Mute sound",
    close: "Close",
    progress: "Rip progress",
    steps: { reserve: "Reserve", approve: "Approve", pay: "Pay", open: "Open" },
    buying: "Grabbing a fresh pack from the vault…",
    /** {pack} is the pack's name. */
    buyingSub: "Reserving your {pack}. Nothing is charged until you approve it in your wallet.",
    turbo: "Commons are running low in this pack!",
    turboSub: "Turn on Turbo to rip anyway: a common pull is paid out to your wallet in USDC instead of the card. Rare and better arrive as usual.",
    /** {price} is "$50". */
    signing: "Approve {price} USDC in your wallet",
    signingSub: "Check the amount in the popup. The payment is valid for about a minute.",
    paying: "Sending your payment to Solana…",
    payingSub: "Usually a few seconds. Keep this tab open.",
    openingSub: "Paid! Your card is being dealt. You can close this: it waits in your collection.",
    stoppedPaid: "Your pack is safe!",
    stopped: "The rip stopped.",
    ripTurbo: "Rip with Turbo",
    retryOpen: "Try opening again",
    retry: "Try again",
    notNow: "Not now",
    holdLabel: "Hold to rip the pack open",
    hold: "Hold to rip",
    /** Shout across the screen on a legendary pull. */
    legendary: "LEGENDARY!",
    skip: "Skip",
    /** Labels on the frame around the revealed card. dex: {n} is the Pokédex number ("063"), {name} the card's short name. */
    frames: { dex: "No.{n} {name}", wanted: "WANTED", jumbotron: "★ HIGHLIGHT ★", scouter: "POWER LEVEL" },
  },
  /** The revealed card's panel: value, sell-back and next steps. */
  result: {
    xp: "+{xp} XP",
    /** {mult} is "2.4×". */
    mult: "{mult} your pack",
    turboPaid: "Turbo paid {price} USDC to your wallet for this common.",
    /** Animated dots follow. */
    quoting: "Checking the sell-back offer",
    /** {price} is the offer, drawn large. */
    sell: "Instant sell · {price} USDC",
    signing: "Approve the sale in your wallet…",
    /** Animated dots follow. */
    settling: "Selling",
    /** {amount} is "+$12.50". A Receipt link follows. */
    sold: "Sold! {amount} USDC to your wallet.",
    receipt: "Receipt",
    retry: "Try again",
    /** {price} is the pack's price. */
    ripAgain: "Rip again · {price}",
    done: "Done",
    keep: "Keep it",
    share: "Share pull",
  },
  /** Level-up and badge toasts, after a rip and on the page. */
  news: {
    /** {level} is trainer.level in bold; {title} the new trainer title. */
    levelUp: "{level} Level up! You're now a {title}.",
    badge: "Badge unlocked: {name}",
  },
  /** The trainer card (components/rip/TrainerCard.tsx) and trainer progress everywhere. */
  trainer: {
    /** A trainer level, short. */
    level: "Lv {n}",
    titles,
    badges,
    startTitle: "Start your trainer card",
    startText: "Every rip earns XP. Level up from Rookie to Champion, keep a daily streak going, and unlock badges for your best pulls.",
    connect: "Connect wallet",
    xpLabel: "XP to next level",
    /** {xp} is total XP, {next} the XP still needed, {level} the next level's number. */
    xp: "{xp} XP · {next} to Lv {level}",
    streak: "Streak",
    rips: "Rips",
    best: "Best",
    badgesLabel: "Badges",
    /** Tooltip on a locked badge. */
    badgeHint: "{name}: {hint}",
    /** Screen-reader text per badge. */
    earned: "{name}, earned",
    locked: "{name}, locked: {hint}",
    /** {rips} is ripsToday; {spent} and {pulled} are dollar amounts. */
    today: "Today: {rips} · {spent} in · {pulled} pulled",
    ripsToday: { one: "{n} rip", other: "{n} rips" },
    keepStreak: { one: "Rip today to keep your {n}-day streak.", other: "Rip today to keep your {n}-day streak." },
    /** {hint} is the next badge's hint with its first letter lowercased. */
    nextBadge: "Next badge: {hint}.",
    allBadges: "Every badge earned. Champion stuff.",
  },
  /** The trainer's collection (components/rip/PCBox.tsx). */
  box: {
    error: "Your pulls didn't load. Try again in a moment.",
    empty: "Your collection is empty. Pick a pack and rip your first one!",
    /** A paid pack whose name is unknown. {price} is "$50". */
    pack: "{price} pack",
    paid: "Paid · ready to open",
    open: "Open it",
    /** Accessible name of a card's picture. */
    view: "View {name}",
    /** {mult} is the card's value over the pack price, "2.4×". */
    mult: "{mult} pack",
    turboPaid: "Turbo paid {price} USDC",
    sell: "Sell or keep",
    viewButton: "View",
    loading: "Loading…",
    older: "Older pulls",
  },
  /** The chase cards section (components/rip/Grails.tsx). */
  grails: {
    kicker: "Top grails",
    /** {pack} is the pack's name. */
    title: "Chase cards in {pack}",
    showTop: "Show top grails",
    showAll: "See every card",
    filter: "Filter by rarity",
    all: "All",
    error: "The card pool didn't load. It refreshes on its own shortly.",
    loading: "Loading…",
    more: "Load more cards",
  },
  /** The live pulls ticker (components/rip/HitsStrip.tsx). */
  hits: {
    label: "Latest pulls",
    live: "LIVE PULLS",
    empty: "No pulls yet. Be the first trainer to rip on Decard!",
  },
  /** Wallet button, menu and picker (components/rip/WalletBar.tsx), also used on /redeem. */
  wallet: {
    /** {level} is the level number, {title} the trainer title. */
    trainer: "Lv {level} · {title}",
    streak: { one: "{n}-day streak", other: "{n}-day streak" },
    signedIn: "● Signed in",
    signedInDevnet: "● Signed in · devnet",
    /** {time} is the session's end time, e.g. "02:30 PM". */
    sessionEnds: "Session ends {time}.",
    signOut: "Sign out",
    checkWallet: "Check your wallet",
    connecting: "Connecting…",
    /** The button's short labels on phones and long ones on wider screens. */
    connect: "Connect",
    connectLong: "Connect wallet",
    signIn: "Sign in",
    signInLong: "Sign in to rip",
    pickerTitle: "Choose your wallet",
    pickerText: "You'll sign a short message to prove the wallet is yours. It's free: no transaction, no fee.",
    none: "No Solana wallet found",
    noneText: "On a phone, open Decard inside your wallet app. On a computer, install one and refresh.",
    /** Animated dots follow. */
    approveSignIn: "Approve the sign-in in your wallet",
    /** Animated dots follow. */
    connectingDots: "Connecting",
    close: "Close",
    /** Sign-in errors (components/rip/RipProvider.tsx). */
    rejected: "You closed the wallet prompt. Nothing was signed.",
    failed: "That wallet couldn't sign in. Try again, or pick another wallet.",
  },
  /** Why a rip stopped (hooks/pages/Rip/useRipFlow.ts). "My Pulls" is the trainer card section. */
  flow: {
    /** {error} is the server's reason, a full sentence in English. */
    openFailed: "{error} Your pack is paid: open it from My Pulls.",
    openSlow: "Your card is still being dealt. The pack is paid and safe: open it from My Pulls in a minute.",
    rejected: "The network rejected the payment, usually for not enough USDC or SOL, or a prompt left open too long. Nothing was charged.",
    unconfirmed: "We couldn't confirm the payment yet. If it went through, the pack shows up in My Pulls ready to open. Don't pay again.",
    closed: "You closed the wallet prompt, so nothing was charged. The reserved pack is released on its own.",
    signFailed: "Your wallet couldn't sign the payment. Nothing was charged.",
    generic: "Something went wrong. Please try again.",
  },
  /** Selling a card back (hooks/pages/Rip/useBuyback.ts). */
  sale: {
    unavailable: "Sell-back isn't available for this card.",
    autoSold: "Turbo already paid this common out in USDC.",
    boughtBack: "Already sold back.",
    quoteFailed: "Couldn't load the sell-back offer.",
    failed: "The sale didn't go through. The card is still yours: try again.",
    settling: "The sale is still settling. Check back in a minute before trying again.",
    closed: "The 72-hour sell-back window has closed.",
    startFailed: "Couldn't start the sale.",
    signFailed: "Your wallet couldn't sign the sale. Nothing changed.",
    rejected: "The network rejected the sale. The card is still yours: try again.",
  },
};
