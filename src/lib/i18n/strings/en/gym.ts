// English source. Translations in ../<locale>/gym.ts must keep these keys.
// The /gym Rip League: both trainer ladders, every pack ranked as a gym, the Hall of Fame and the rules.
// Ranks are the league's own words: Champion, Elite Four, Ace Trainer, Challenger. Tier names
// (Common, Rare, Epic, Legendary) come from ui.ripTiers.
export const gym = {
  /** Screen-reader words around a rank number that stays visible: "Rank 3". */
  rank: "Rank {n}",
  /** "Show more" toggles on the ladder and the gyms, folded back. {n} is 10 or 9. */
  showTop: "Show the top {n}",
  /** Short label for Epic and Legendary pulls together, in stats and gym cards. */
  epicPlus: "Epic+",
  /** The header and the league rules (app/[lang]/gym/page.tsx). */
  page: {
    breadcrumb: "Breadcrumb",
    /** This page in the breadcrumb, on the page and in search results. */
    crumb: "Rip League",
    /** The Slabz badge. {logo} is the Slabz logo. */
    poweredBy: "Powered by {logo}",
    /** The same badge, read by screen readers. */
    poweredByLabel: "Powered by Slabz",
    /** {accent} is h1Accent, drawn in the accent colour. */
    h1: "The Rip League. {accent}",
    h1Accent: "Climb to Champion.",
    lede: "Trainers ranked by the packs they rip, and every Slabz pack ranked as a gym by its odds.",
    rulesKicker: "League rules",
    rulesTitle: "How the league works",
    /** {slabz} is a link to slabz.com that reads "Slabz". */
    rulesNote: "Values are insured values, not guaranteed sale prices. Only rip what you're happy to spend. Packs, odds and the Slabz feed come from {slabz}.",
    /** Screen-reader label while the league loads. */
    loading: "Loading the league",
  },
  /** The four league rules, in order. Search engines read these too. */
  rules: [
    {
      title: "Champion and Elite Four",
      text: "Trainers rank by packs ripped, then by the value they pulled. First place is the Champion, second to fifth the Elite Four, sixth to tenth Ace Trainers, and everyone after a Challenger.",
    },
    {
      title: "Two leagues",
      text: "The Decard League counts every pack ripped on Decard. Slabz live ranks every Slabz player across the last 100 pulls on Slabz, about the last few hours, and refreshes every 30 seconds.",
    },
    {
      title: "Every pack is a gym",
      text: "Gyms rank by each pack's published odds: the chance of an Epic or Legendary pull, or the average pull's insured value against the pack price.",
    },
    {
      title: "The gym leader",
      text: "A gym's leader is the most valuable Legendary card in its pool. Every pull is random and the odds are the same for everyone: rank never changes them.",
    },
  ],
  /** A trainer's rank title: 1st, 2nd to 5th, 6th to 10th, everyone after. */
  titles: {
    champion: "Champion",
    elite: "Elite Four",
    ace: "Ace Trainer",
    challenger: "Challenger",
  },
  /** Each universe's gym badge. Original names, no franchise marks. */
  badges: {
    pokemon: "Spark Badge",
    onepiece: "Helm Badge",
    dragonball: "Sunburst Badge",
    riftbound: "Rift Badge",
    lorcana: "Ink Badge",
    basketball: "Hoop Badge",
    football: "Gridiron Badge",
    baseball: "Slugger Badge",
    soccer: "Pitch Badge",
    sports: "Trophy Badge",
  },
  /** How far back Slabz's feed reaches. Fills {span} below: "the last 5 hours". */
  span: {
    /** When the feed's times are unknown. */
    fewHours: "few hours",
    minutes: { one: "{n} minute", other: "{n} minutes" },
    hours: { one: "{n} hour", other: "{n} hours" },
  },
  /** Pack odds as a ratio: "1 in 25" for 4%. */
  odds: {
    oneIn: "1 in {n}",
    /** Odds of about 67% or better. */
    most: "most pulls",
  },
  /** Labels in the ladder's stats bar, podium and rows. */
  stats: {
    rips: "Rips",
    pulls: "Pulls",
    trainers: "Trainers",
    players: "Players",
    /** Total insured value pulled. */
    pulled: "Pulled",
  },
  /** The two leaderboards under one podium (components/gym/Ladder.tsx). */
  ladder: {
    /** Screen-reader heading over both ladders. */
    heading: "Trainer leaderboards",
    tabs: "Leaderboards",
    decardTab: "Decard League",
    slabzTab: "Slabz live",
    /** Tab count while no one has ripped on Decard yet. */
    open: "Open",
    decardBlurb: "Decard trainers ranked by packs ripped on Decard, all time.",
    /** {ago} is a relative time that keeps ticking: "5m ago". */
    updated: "Updated {ago}.",
    live: "LIVE",
    /** {n} is the pulls in Slabz's feed (about 100). {span} is a span above. */
    slabzBlurb: {
      one: "Every Slabz player ranked by pulls across the last {n} rip on Slabz, about the last {span}.",
      other: "Every Slabz player ranked by pulls across the last {n} rips on Slabz, about the last {span}.",
    },
    /** {ago} is a relative time that keeps ticking: "12s ago". */
    newest: "Newest pull {ago}.",
    inviteTitle: "The Decard League is open.",
    inviteText: "Rip one pack on Decard and you start as its Champion.",
    seePodium: "See the podium",
    ripPack: "Rip a pack",
    decardList: "Decard trainers",
    slabzList: "Slabz players",
    showAllTrainers: { one: "Show all {n} trainer", other: "Show all {n} trainers" },
    showAllPlayers: { one: "Show all {n} player", other: "Show all {n} players" },
    topThree: "Top three",
    /** Screen-reader words before a podium name. */
    place: "Place {n}:",
    openSpot: "Open spot",
    claim: "Rip to claim",
    waiting: "Waiting for a trainer",
    bestPull: "Best pull",
    rips: { one: "{n} rip", other: "{n} rips" },
    pulls: { one: "{n} pull", other: "{n} pulls" },
    /** The empty row under a small ladder. */
    ghostName: "Your name here",
    ghostText: "One rip on Decard puts you on the board.",
    decardEmptyTitle: "The Decard League is open. The podium is yours to take.",
    decardEmptyError: "Standings land here as soon as the first trainers rip, and refresh every minute. Rip one pack and you start as Champion.",
    decardEmpty: "No trainer has ripped on Decard yet. Rip one pack and you start as Champion.",
    slabzEmptyTitle: "The Slabz league is catching its breath.",
    slabzEmptyError: "Slabz's live feed didn't answer. It comes back on its own in a moment.",
    slabzEmpty: "No pulls in the feed right now.",
    seeSlabz: "See the Slabz league",
    seeDecard: "See the Decard League",
  },
  /** Every pack as a gym (components/gym/Gyms.tsx). */
  gyms: {
    kicker: "Gyms",
    title: "Every pack is a gym",
    lede: "Ranked by your chance of a big pull, straight from each pack's published odds. The gym leader is the most valuable Legendary card in its pool.",
    count: { one: "{n} gym", other: "{n} gyms" },
    universes: { one: "{n} universe", other: "{n} universes" },
    rankBy: "Rank gyms by",
    showFrom: "Show gyms from",
    all: "All",
    /** Tooltip on a universe filter: "Pokémon: Spark Badge". */
    universeTitle: "{universe}: {badge}",
    /** Ranking buttons. The Legendary one reads ui.ripTiers. */
    epic: "Epic or better",
    ev: "Best return",
    /** The picked ranking, bold, before what it means. */
    noteLabel: "{label}:",
    about: {
      epic: "Your chance that one pull comes out Epic or Legendary.",
      legendary: "Your chance of the top tier, where every gym's leader waits.",
      ev: "The average pull's insured value as a share of the pack price. Over 100% means the average pull is worth more than the pack.",
    },
    /** When every open gym ties. {pct} is "5%", {oneIn} is "1 in 20". */
    tieEpic: "Right now every open gym has the same {pct} Epic-or-better odds ({oneIn}), so ties go to the best return.",
    tieLegendary: "Right now every open gym has the same {pct} Legendary odds ({oneIn}), so ties go to the best return.",
    error: "The gyms are closed for a moment. Packs come back shortly.",
    none: "No gyms are open right now.",
    showAll: { one: "Show all {n} gym", other: "Show all {n} gyms" },
    /** One gym card. */
    card: {
      /** "Pokémon gym · Spark Badge". */
      kind: "{universe} gym · {badge}",
      /** Between the pack and its leader's card. */
      vs: "VS",
      leader: "Leader",
      scouting: "Scouting the leader…",
      hiding: "The leader is in hiding",
      /** Short label for the average pull against the pack price. */
      ret: "Return",
      /** {value} is the average pull's value: "avg $54". */
      avg: "avg {value}",
      /** {span} is a span above: "12 rips on Slabz · last 5 hours". */
      heat: { one: "{n} rip on Slabz · last {span}", other: "{n} rips on Slabz · last {span}" },
      cold: "No Slabz rips in the last {span}",
      ours: { one: "{n} rip on Decard", other: "{n} rips on Decard" },
      challenge: "Challenge",
      /** {name} is the pack, {price} its price. */
      challengeLabel: "Challenge the {name} gym: rip a pack for {price}",
      paused: "Back shortly",
      closed: "Closed",
    },
  },
  /** The biggest pulls on Slabz (components/gym/HallOfFame.tsx). */
  hall: {
    kicker: "Hall of Fame",
    title: "Biggest pulls on Slabz right now",
    /** {span} is a span above. */
    lede: "The most valuable cards pulled across Slabz in the last {span}. Live, refreshed every 30 seconds.",
    /** Place in the list: "#1". */
    rank: "#{n}",
  },
};
