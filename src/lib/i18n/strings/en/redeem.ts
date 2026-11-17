// English source. Translations in ../<locale>/redeem.ts must keep these keys.
// The /redeem page (app/[lang]/redeem/page.tsx) and its journey (components/redeem): seven stops from
// check-in to the parcel on its way. Amounts ({price}, {total}, {over}) arrive formatted ("$5.99"),
// {country} is the country's name in the page's language, and {city} and {name} are as the trainer typed them.
// {timer} is a live countdown ("13:42"). Server messages ({detail}) arrive as the shipping desk sends them.
export const redeem = {
  /** The page around the journey: header, how it works, costs, burning and the FAQ (also its JSON-LD). */
  page: {
    /** {logo} is the Slabz logo. */
    poweredBy: "Powered by {logo}",
    breadcrumb: "Breadcrumb",
    home: "Home",
    crumb: "Redeem",
    h1: "Bring your slab home.",
    h1Accent: "Vault to your door.",
    lede: "Trade a card NFT for the real graded slab: seven stops, two free signatures, one approval that burns and pays.",
    how: {
      kicker: "How redeeming works",
      title: "From NFT to the slab in your hands",
      /** {max} is the most slabs one parcel takes. */
      steps: [
        {
          title: "Check in",
          text: "Connect the Solana wallet that holds the cards and sign two free messages: one for Decard, one for Slabz's shipping desk. No transaction, no fee.",
        },
        { title: "Choose your party", text: "Pick up to {max} graded cards to ship together. Their insured values add up to the declared value of the parcel." },
        { title: "Pick your country", text: "Spin the globe or search the list. Each shipping zone has a published rate, shown as you pick." },
        {
          title: "Review the quote",
          text: "Add the address and get the live quote from the shipping desk: shipping, insurance and fees, in USDC. That number is what you pay.",
        },
        { title: "Release", text: "One wallet approval burns the card NFTs and pays shipping. The vault then packs the physical slabs." },
        { title: "Follow the journey", text: "Track the parcel from packing to delivery, with the carrier's tracking number once it ships." },
      ],
    },
    costs: {
      kicker: "What it costs",
      title: "Published shipping rates",
      text: "Paid in USDC at release. These are the published rates for an indicative price while you pick; the live quote at review, with any handling fees, is the amount charged, and you confirm it before your wallet opens.",
      caption: "Shipping rates by zone",
      zone: "Zone",
      insurance: "Insurance: 0.5% of the declared value, added when it is over {over}. The declared value is the sum of the cards' insured values.",
      signature: "Signature on delivery in the USA: {price}, when the declared value is over {over}.",
      networkFee: "Network fee: a fraction of a cent in SOL, paid by your wallet like any Solana transaction.",
    },
    burn: {
      kicker: "What burning means",
      title: "One card, one claim",
      claim:
        "Your card NFT is the claim on a slab in the vault. To release the slab, the NFT is burned: destroyed on Solana, in the same approval that pays shipping. That way a card can never ship and still trade.",
      final: "A burn is final. The NFT can't be restored, listed, sold back or redeemed twice. Listed cards are delisted first, in the same approval.",
      /** {count} countries; {rip} and {scanner} are links labelled `rip` and `scanner` below. */
      ships:
        "Ships to the {count} countries and territories on the shipping provider's list, up to {max} slabs per parcel. Got cards to ship? Rip one on {rip} or find one on the {scanner}.",
      rip: "Rip packs",
      scanner: "scanner",
    },
    faq: {
      kicker: "Redeem FAQ",
      title: "Before you ship",
      /** First-slab rates arrive formatted: {usa}, {canada}, {europe}, {oceania}; then {extra} per extra slab and {over}. {count} countries. */
      items: [
        {
          q: "What does redeeming a card mean?",
          a: "Each Collector Crypt card NFT stands for one real graded slab (PSA, BGS or CGC) kept in a vault. Redeeming trades the NFT for the slab itself: the NFT is burned on Solana and the vault posts the physical card to your address.",
        },
        {
          q: "What does burning the NFT mean, and can I undo it?",
          a: "Burning destroys the NFT on-chain, in the same approval that pays for shipping, so one card can never be both shipped and still traded. It is final: a burned NFT can't be restored, listed, sold back or redeemed again. Decard asks you to tick a box and hold the release button before your wallet even opens.",
        },
        {
          q: "How much does shipping cost?",
          a: "Published rates start at {usa} for the first slab to the USA, {canada} to Canada, {europe} to Europe and {oceania} to Australia, New Zealand and the rest of the world, plus {extra} for each extra slab in the same parcel. Insurance of 0.5% is added when the declared value is over {over}. The live quote at review, including any handling fees, is the amount you pay.",
        },
        {
          q: "How do I pay?",
          a: "In USDC from the same Solana wallet, inside the transactions that burn the NFTs, plus a fraction of a cent in SOL for the network fee. Decard never holds your money or your keys: your wallet signs every transaction, and nothing is charged until it does.",
        },
        {
          q: "Which countries can I ship to?",
          a: "You pick from the {count} countries and territories on the shipping provider's list. The provider checks every address, and the quote at review confirms your parcel can travel before anything is charged.",
        },
        {
          q: "How long does delivery take?",
          a: "It depends on the vault's packing queue and the carrier for your country. The journey shows each stage: booked, packing, on the road with the carrier's tracking number, and delivered.",
        },
        {
          q: "What if the release is interrupted?",
          a: "Closing the wallet prompt cancels everything: nothing is burned or charged. Once you approve, the shipment is saved on your device straight away, and an interrupted one can be finished from your journeys for the same shipment, so you never pay twice.",
        },
        {
          q: "Does Decard keep my address?",
          a: "No. Addresses are kept by Slabz's shipping provider and read live while your shipping pass is valid. Decard's servers relay them without storing or logging them, and this page keeps them in memory only.",
        },
      ],
      /** {slabz} is a link to slabz.com. */
      footer: "Shipping, vaulting and fulfilment are run by {slabz} and its shipping provider. Insured values are not guaranteed sale prices.",
    },
  },
  /** The seven stops (components/redeem/steps.ts): heading, the route map's short label, and the line under the heading. */
  steps: {
    checkin: {
      title: "Trainer check-in",
      short: "Check in",
      lede: "Three free check-ins: your wallet, Decard, and a 14-minute shipping pass. None of them moves anything.",
    },
    party: {
      title: "Choose your party",
      short: "Party",
      /** {max} is the most slabs one shipment takes. */
      lede: "Pick the slabs that travel home, up to {max} in one shipment. Their insured values add up to the declared value.",
    },
    region: {
      title: "Pick your region",
      short: "Region",
      lede: "Spin the globe to your country, or search for it. Each shipping zone has its own published rate.",
    },
    home: {
      title: "Your hometown",
      short: "Hometown",
      lede: "Where exactly? The courier needs a name, a street, a phone number and an email.",
    },
    review: {
      title: "Review the route",
      short: "Review",
      lede: "The whole trip on one page. Read it like a bank statement: this is what gets charged.",
    },
    release: {
      title: "Release",
      short: "Release",
      lede: "The NFTs burn and shipping is paid in USDC, in one wallet approval.",
    },
    journey: {
      title: "The journey",
      short: "Journey",
      lede: "From the vault to your door, stop by stop.",
    },
  },
  /** Over a stop's heading ("Stop 03 of 07") and under the route map ("Stop 3 of 7"). */
  stopOf: "Stop {n} of {total}",
  /** Shipping zones (lib/redeem/rates.ts REGIONS). */
  regions: {
    usa: "USA",
    canada: "Canada",
    europe: "Europe",
    oceania: "Australia & NZ",
    world: "Rest of world",
  },
  /** Where a parcel goes: "Portland, United States". */
  place: "{city}, {country}",
  slabs: { one: "{n} slab", other: "{n} slabs" },
  nfts: { one: "{n} NFT", other: "{n} NFTs" },
  /** Rate table headings, on the page and at stop 3. */
  rates: {
    firstSlab: "First slab",
    extraSlab: "Each extra slab",
  },
  /** Why the shipping desk won't take a card (lib/redeem/errors.ts CardProblemCode). */
  problems: {
    ALREADY_REDEEMED: "Already redeemed",
    IN_OTHER_SHIPMENT: "In another shipment",
    UNAVAILABLE: "Can't ship right now",
    OTHER: "Can't ship",
  },
  /** Buttons several stops share. */
  actions: {
    back: "Back",
    tryAgain: "Try again",
    change: "Change",
    checkWallet: "Check your wallet",
    signInAgain: "Sign in again",
    renewPass: "Renew pass",
    /** A button inside a sentence: "{renew} (a free message)". */
    renewTheLink: "Renew the pass",
    renewFree: "Renew the pass (free)",
    checkAgain: "Check again",
    backToReview: "Back to review",
    backToParty: "Back to your party",
  },
  /**
   * Error messages the hooks hand to the page (lib/redeem/errors.ts ErrorNote). When the shipping desk sent
   * its own words, those show instead of these.
   */
  errors: {
    generic: "Something went wrong. Please try again.",
    network: "Network error. Check your connection.",
    timeout: "No answer in time.",
    cancelled: "Request was cancelled.",
    /** {status} is the HTTP status code. */
    http: "Request failed ({status}).",
    passNeeded: "A shipping pass is needed for this step.",
    connectFirst: "Connect and sign in first.",
    passClosed: "You closed the wallet prompt. The pass is a free message: no transaction, no fee.",
    passAuth: "Your Decard sign-in has expired. Sign in again, then get your pass.",
    passFailed: "The wallet couldn't sign the pass. Try again.",
    addressesPass: "Get a shipping pass to see your saved addresses.",
    addressesFailed: "Couldn't load your saved addresses.",
    quoteFailed: "Couldn't price the route. Try again.",
    shipmentFailed: "Couldn't read the shipment.",
  },
  /** The journey's frame (components/redeem/RedeemLab.tsx). */
  lab: {
    loading: "Loading the redeem journey",
    authLost: "Your Decard sign-in expired. Sign in again to carry on: nothing new was sent.",
    passExpired: "Your shipping pass ran out. Renew it to keep reading addresses, quotes and shipments: it's a free message.",
    summary: "Trip summary",
    passLeft: "Shipping pass: {timer} left. It renews with one free signature when it runs out.",
    passAbout: "The shipping pass is a free message your wallet signs. It opens Slabz's shipping desk for 14 minutes.",
    devnet: "Devnet: your cards are read from Collector Crypt's devnet.",
  },
  /** The route map stepper (components/redeem/RouteNav.tsx). {title} is the stop's title. */
  route: {
    label: "Redeem route",
    stop: "Stop {n} of {total}: {title}",
    stopDone: "Stop {n} of {total}: {title}, done",
    stopLocked: "Stop {n} of {total}: {title}, not reached yet",
    stopDoneLocked: "Stop {n} of {total}: {title}, done, not reached yet",
  },
  /** The globe and the country card (components/redeem/Globe.tsx, maps.tsx). */
  map: {
    loading: "Unrolling the map…",
    failed: "The map didn't load.",
    vault: "Vault",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    wholeRoute: "Show the whole route",
    wholeGlobe: "Show the whole globe",
    hintPick:
      "Drag, swipe or use the arrow keys to turn the globe, plus and minus to zoom. Click or tap a country, or press Enter to pick the one in the centre. The country list does the same.",
    hint: "Drag, swipe or use the arrow keys to turn the globe, plus and minus to zoom.",
    centred: "Centred on {country}.",
    openSea: "Over open sea.",
    selected: "Selected: {country}.",
    /** The globe's screen-reader name at stop 3. */
    globePicked: "Globe. {country} is picked.",
    globeEmpty: "Globe of the countries the slabs can travel to.",
    /** At review and on the journey. {place} reads "Portland, United States". */
    globeRoute: "Globe with the route from the Slabz vault to {place}.",
    cardLabel: "Map of {country}, the whole country circled",
    cardLabelEmpty: "Map",
    pickFirst: "Pick a country on the globe first.",
    hometown: "Hometown",
    notPicked: "Not picked yet",
  },
  /** The country search (components/redeem/CountryPicker.tsx). */
  picker: {
    label: "Search the map",
    placeholderPicked: "{country} · type to change",
    /** {count} countries. */
    placeholder: "Type a country ({count} to choose from)",
    clear: "Clear the search",
    list: "Countries",
    noMatch: "No country matches “{q}”. Try its English name or two-letter code.",
    matches: { one: "{n} country match.", other: "{n} countries match." },
    popular: "Popular destinations",
  },
  /** Stop 1 (components/redeem/CheckIn.tsx). */
  checkIn: {
    wallet: {
      title: "Connect your wallet",
      text: "The Solana wallet that holds your Collector Crypt cards.",
      busy: "Connecting…",
      action: "Connect wallet",
    },
    signIn: {
      title: "Sign in to Decard",
      text: "A free message proves the wallet is yours. No transaction, no fee.",
      done: "Signed in",
      action: "Sign in",
    },
    pass: {
      title: "Take your shipping pass",
      text: "One more free message opens Slabz's shipping desk for 14 minutes. It renews by itself when it runs out.",
      done: "Valid for {timer}",
      action: "Get the pass",
    },
    trainer: "Trainer",
    switchWallet: "Switch wallet",
    done: "Done",
    /** {n} is the step before. */
    after: "After step {n}",
    next: "Choose your party",
    journeys: "Your journeys ({n})",
    allFree: "Three quick check-ins, all free.",
  },
  /** The wallet picker dialog (CheckIn.tsx WalletPickerModal). */
  walletPicker: {
    title: "Choose your wallet",
    text: "You'll sign a short message to prove the wallet is yours. It's free: no transaction, no fee.",
    none: "No Solana wallet found",
    noneText: "On a phone, open Decard inside your wallet app. On a computer, install one and refresh.",
    approve: "Approve the sign-in in your wallet…",
    connecting: "Connecting…",
    close: "Close",
  },
  /** Stop 2 (components/redeem/Party.tsx). */
  party: {
    loading: "Loading your cards",
    failedTitle: "Couldn't read your cards",
    failedText: "Collector Crypt didn't answer just now. Give it a moment and come back to this stop.",
    emptyTitle: "No graded slabs in this wallet yet",
    emptyText: "Redeeming works for Collector Crypt graded cards held in the connected wallet. Rip a pack or pick one up on the scanner first.",
    rip: "Rip a pack",
    scanner: "Browse the scanner",
    /** {n} is drawn larger; {max} is the most one shipment takes. */
    count: "{n} / {max} in your party",
    declared: "Declared",
    selectTop: "Select top {max}",
    selectAll: "Select all",
    clear: "Clear",
    filter: "Filter your cards",
    filterPlaceholder: { one: "Filter {n} card by name or grade", other: "Filter {n} cards by name or grade" },
    insuredLead: "Insured on the way.",
    insuredText: "Over {over} declared, insurance at 0.5% of the declared value is added automatically.",
    listed: "Listed · delists first",
    noMatch: "No card matches “{q}”.",
    pickOne: "Pick at least one slab",
    pack: { one: "Pack {n} slab", other: "Pack {n} slabs" },
    flagged: { other: "{n} flagged at review: take them out to continue." },
  },
  /** Stop 3 (components/redeem/Region.tsx). */
  region: {
    destination: "Destination",
    zone: "Shipping zone",
    yourSlabs: { one: "Your {n} slab", other: "Your {n} slabs" },
    signature: "Signature on delivery adds {price} over {over} declared.",
    insurance: "Insurance adds {price}: 0.5% of the declared value over {over}.",
    published: "Published rates, before handling and network fees. The real quote comes at review, before anything is charged.",
    emptyTitle: "Where are the slabs heading?",
    emptyText: "Spin the globe and tap your country, or type it above. Small islands show as dots: zoom in to tap them.",
    next: "Head for {country}",
    pick: "Pick a country",
  },
  /** Stop 4 (components/redeem/Hometown.tsx): saved addresses and the address form. */
  home: {
    labels: {
      name: "Full name",
      line1: "Street address",
      line2: "Apartment, suite, floor (optional)",
      city: "City or town",
      state: "State, province or region",
      postalCode: "Postal code",
      phoneNumber: "Phone, with country code",
      email: "Email",
    },
    hints: {
      name: "Who signs for the parcel.",
      state: "No states where you live? Repeat the city.",
      phoneNumber: "The courier prints it on the label.",
      email: "Tracking updates go here.",
    },
    /** The form's checks (lib/redeem/validate.ts). {max} is the field's length limit. */
    errors: {
      tooLong: "Keep it to {max} characters or fewer.",
      nameMissing: "Who should sign for the parcel?",
      line1Missing: "Add the street address.",
      cityMissing: "Add the city or town.",
      stateMissing: "Add the state, province or region.",
      postalCodeMissing: "Add the postal code.",
      postalCodeFormat: "Letters, digits, spaces and dashes only.",
      phoneMissing: "The courier needs a phone number.",
      phoneFormat: "Digits with the country code, like +1 555 010 0199. Spaces, dashes and brackets are fine.",
      emailMissing: "Tracking updates go to this email.",
      emailFormat: "That email doesn't look right.",
    },
    rejected: "The shipping provider can't use this address: {detail}",
    rejectedAny: "The shipping provider can't use this address: check every line",
    savePass: "Saving needs your shipping pass: a free message to sign.",
    saveAuth: "Your Decard sign-in expired. Sign in again, then save.",
    saveFailed: "Couldn't save the address. Try again.",
    saved: "Saved. The slabs will travel to {city}.",
    deleted: "Address deleted.",
    deleteFailed: "Couldn't delete the address. Try again.",
    moveTrip: "{country}: picking it moves the trip there",
    /** {country} here is the address's country as saved, which the provider doesn't list. */
    notListed: "{country}: not a country the provider lists. Edit it to use it.",
    deleteConfirm: "Delete it?",
    deleting: "Deleting…",
    delete: "Delete",
    keep: "Keep",
    edit: "Edit",
    editLabel: "Edit the address for {name}, {city}",
    deleteLabel: "Delete the address for {name}, {city}",
    /** {country} is bold. */
    shippingTo: "Shipping to {country}",
    passLead: "Your shipping pass ran out.",
    /** {renew} is a button labelled actions.renewTheLink. */
    passText: "Saved addresses are read live with it. {renew} (a free message) to see them, or add a new one.",
    loading: "Loading saved addresses",
    add: "+ Add an address in {country}",
    savedIn: "Saved addresses in {country}",
    noneIn: "None yet in {country}.",
    elsewhere: { other: "{n} saved elsewhere" },
    formEdit: "Edit the address",
    formNew: "Where should the slabs go?",
    cancel: "Cancel",
    country: "Country",
    changeOnGlobe: "Change on the globe",
    saving: "Saving with the shipping desk…",
    saveChanges: "Save changes",
    saveShip: "Save and ship here",
    keptBy: "Kept by Slabz's shipping provider, never stored by Decard.",
    next: "Review the route to {city}",
    saveFirst: "Save the address first",
    pickAddress: "Pick an address",
  },
  /** The shipping pass and the shipment ticket in the side column (components/redeem/TravelPass.tsx). */
  pass: {
    label: "Shipping pass",
    ticket: "Shipment ticket",
    valid: "Valid {timer}",
    passValid: "Pass {timer}",
    signing: "Signing…",
    expired: "Expired",
    passExpired: "Pass expired",
    notIssued: "Not issued",
    from: "From",
    vault: "Slabz vault",
    vaultSub: "Graded and insured",
    to: "To",
    yourTown: "Your town",
    pickOnGlobe: "Pick it on the globe",
    yourDoor: "Your door",
    savedHere: "Saved on this device",
    cargo: "Cargo",
    declared: "Declared",
    region: "Region",
    shipping: "Shipping",
    estShipping: "Est. shipping",
    charged: "Charged in USDC",
    chargedSub: "From your wallet, at release",
    estimated: "Estimated total",
    estimatedSub: "Published rates. The real quote comes at review.",
    paid: "Paid in USDC",
    paidSub: "As the shipping desk recorded it",
  },
  /** Stop 5 (components/redeem/Review.tsx). */
  review: {
    route: "The route",
    quote: "The quote",
    live: "Live from the shipping desk",
    passLead: "The shipping pass ran out.",
    /** {renew} is a button labelled actions.renewTheLink. */
    passText: "The quote is read with it. {renew} (a free message).",
    loading: "Getting the quote",
    noneCanTravel: "None of these cards can travel right now.",
    /** {n} flagged of {total} cards. */
    someCantTravel: { other: "{n} of your {total} cards can't travel right now." },
    takeOut: { one: "Take it out and requote", other: "Take these {n} out and requote" },
    askAgain: "Ask again",
    /** {zone} is the provider's zone name, or `yourZone`. */
    shipping: "Shipping ({zone})",
    yourZone: "your zone",
    insurance: "Insurance",
    fees: "Fees",
    total: "Total, paid in USDC",
    /** {slabs} reads "3 slabs"; {price} is the declared value. */
    totalMeta: "{slabs} · declared {price}",
    networkFee: "Plus the Solana network fee, a fraction of a cent in SOL. If the shipping desk prices it differently at release, you confirm the new total first.",
    cargo: "Cargo · {slabs}",
    /** {price} is drawn larger. */
    declared: "Declared value {price}",
    listed: {
      one: "{n} is listed for sale: the release delists it first, in the same wallet approval.",
      other: "{n} are listed for sale: the release delists them first, in the same wallet approval.",
    },
    destination: "Destination",
    note: "Note for the shipping team (optional)",
    notePlaceholder: "Gate code, delivery hours… Plain text, kept with the shipment.",
    finalTitle: "Before you release: this is final",
    /** {burns} is bold, worded by `finalBurns`. */
    finalBurn: {
      one: "Releasing {burns} from your wallet. A burn can't be undone: the NFT can't be listed, sold back or restored afterwards.",
      other: "Releasing {burns} from your wallet. A burn can't be undone: the NFTs can't be listed, sold back or restored afterwards.",
    },
    finalBurns: { one: "burns this card NFT", other: "burns these {n} card NFTs" },
    /** {pays} is bold, worded by `finalPays`. */
    finalPay: {
      one: "The same approval {pays} for shipping, and the vault posts the physical slab to {city}.",
      other: "The same approval {pays} for shipping, and the vault posts the physical slabs to {city}.",
    },
    /** {amount} is the total ("$12.99") or `theQuote`. */
    finalPays: "pays {amount} in USDC",
    theQuote: "the quote",
    finalCheck: "Check the address now: the slabs go exactly where it says.",
    next: "Continue to release · {price}",
    waiting: "Waiting for the quote",
  },
  /** Stop 6 (components/redeem/Release.tsx): the burn and the payment. */
  release: {
    whatItDoes: "What the release does",
    burnForGood: "burn, for good",
    usdcShipping: "USDC for shipping",
    home: "Home",
    title: { one: "Release the slab", other: "Release the {n} slabs" },
    renewLead: "Renew your shipping pass first.",
    renewText: "It ran out, and the release needs it.",
    passValid: "Shipping pass valid for {timer}. With under three minutes left, it renews first so the release can't stop halfway.",
    /** {burn}, {amount} and {place} are bold; they're worded by agreeBurn, agreeAmount (or agreeQuoted) and place (or yourAddress). */
    agree: "I understand that {burn}, which can't be undone, and that {amount} leaves my wallet to ship {them} to {place}.",
    agreeBurn: { one: "this card NFT burns", other: "these {n} card NFTs burn" },
    agreeAmount: "{price} in USDC",
    agreeQuoted: "the quoted amount",
    agreeThem: { one: "the slab", other: "them" },
    yourAddress: "your address",
    /** {n} slabs, {price} the total (empty while unknown). */
    hold: "Hold to release {n} · {price}",
    holdHint:
      "Your wallet then shows the transactions to approve: the burn of each NFT and the USDC payment, all in one prompt. Closing the prompt cancels everything; nothing is charged before you approve.",
    backToReview: "← Back to the review",
    /** The hold-to-confirm button's helper line. */
    holding: "Keep holding…",
    early: "Hold it a little longer, until the seal fills.",
    holdHelp: "Press and hold the seal (or hold Space).",
    stages: ["Book the shipment", "Approve in your wallet", "Burn and pay", "On its way"],
    preparing: "Booking the shipment with the shipping desk…",
    signing: "Approve in your wallet",
    burning: "Burning and paying on Solana…",
    burningText: "This can take up to a minute while the network confirms. Keep this tab open.",
    waitText: "Nothing is burned or charged at this point. Keep this tab open.",
    /** What the wallet prompt holds. {nfts} reads "3 NFTs" (nfts above); {price} is the total. */
    signingOne: "Your wallet shows one transaction: it will burn {nfts} and pay {price} in USDC.",
    /** {n} transactions. */
    signingMany: { other: "Your wallet shows {n} transactions: together they burn {nfts} and pay {price} in USDC. Approve them all at once." },
    /** What a running step is doing (hooks/pages/Redeem/useRelease.ts NoteKey). */
    notes: {
      fresh: "Fresh transactions, same shipment. Approve once more.",
      rest: "Approve the rest of the shipment.",
      burnRejected: "The network turned the burn down, so nothing was redeemed. Getting the transactions again…",
      takenOver: "A newer shipment took over. Picking it up…",
      slowSign: "Signing took a while, so the network needs fresh transactions…",
      newTotal: "Getting fresh transactions for the new total…",
      refetch: "Getting fresh transactions…",
      pickUp: "Picking the shipment back up…",
      checking: "Checking where the shipment stands…",
      unsigned: "Some legs are still unsigned. Getting them…",
    },
    repricedFinishTitle: "Confirm what's left to pay",
    repricedTitle: "The total moved",
    /** {id} is the shipment id and {price} the amount, both styled; {cards} is `remaining` or `remainingAll`. */
    repricedFinish: "Finishing shipment {id} costs {price} in USDC for {cards}. Nothing has been signed yet.",
    remaining: { one: "{n} remaining card", other: "{n} remaining cards" },
    remainingAll: "its remaining cards",
    /** {price} and {confirmed} are bold. */
    repriced: "The shipping desk now asks {price}, not the {confirmed} you confirmed. Nothing has been signed or charged.",
    /** {price} is bold; {nfts} reads "3 NFTs" or `theNfts`. */
    accept: "Pay {price} in USDC and burn {nfts}.",
    theNfts: "the NFTs",
    holdAccept: "Hold to accept · {price}",
    notNow: "Not now",
    flagged: {
      one: "{n} card flagged: they're marked in your party and at review.",
      other: "{n} cards flagged: they're marked in your party and at review.",
    },
    /** What to do next from a stopped release (useRelease.ts Next). */
    next: {
      prepare: "Try again",
      sign: "Open the wallet again",
      resume: "Try this step again",
      complete: "Try this step again",
      check: "Check the shipment",
      review: "Back to review",
      address: "Edit the address",
      journey: "Open your journeys",
      none: "Back to your party",
    },
    seeJourneys: "See your journeys",
    keepLead: "Keep this tab open.",
    keepSaved: "The shipment is saved on this device, so it can always be finished from your journeys.",
    keepUnsigned: "Nothing is charged until your wallet approves.",
    /**
     * Why a release stopped (useRelease.ts StopKey). {detail} is the shipping desk's own message, or
     * errors.generic when it sent none.
     */
    stops: {
      signIn: { title: "Sign in again", message: "Your Decard sign-in expired. Sign in again to carry on; nothing new was sent." },
      passNeeded: { title: "Shipping pass needed", message: "The release needs a fresh shipping pass: a free message to sign. Nothing new was sent." },
      replaced: {
        title: "A newer shipment took over",
        message: "Another redemption of these cards replaced this one before it burned, so nothing was charged for it. Your journeys show the newer one.",
      },
      notPaid: {
        title: "Nothing was charged",
        message: "This shipment was never paid, so nothing was burned or charged. Start a new redemption from your party when you're ready.",
      },
      deskSaidNo: { title: "The shipping desk said no", message: "{detail} Don't start a new redemption: try this step again." },
      stillWaiting: {
        title: "Still waiting on the shipping desk",
        message: "We couldn't get an answer yet. Your shipment is saved: try again in a moment, and don't start a new redemption.",
      },
      burnFailed: { title: "The burn didn't go through", message: "{detail} Check the shipment before trying again." },
      network: {
        title: "Waiting for the network",
        message: "We couldn't confirm the burn yet. Your shipment is saved: check again in a minute, and don't start a new redemption.",
      },
      connect: { title: "Connect your wallet", message: "The wallet that holds these cards has to approve the release. Nothing was burned or charged." },
      closed: {
        title: "Nothing happened",
        message: "You closed the wallet prompt. Nothing was burned and nothing was charged. Your cards are still in your wallet.",
      },
      unsigned: { title: "The wallet didn't sign", message: "Your wallet couldn't sign the transactions. Nothing was burned and nothing was charged." },
      short: { title: "The wallet didn't sign", message: "The wallet returned fewer signatures than asked. Nothing was sent." },
      invalidCards: { title: "Some cards can't travel", message: "Take these out of your party, then review the route again. Nothing was burned or charged." },
      addressRejected: { title: "The address was turned down", message: "{detail} Nothing was burned or charged." },
      conflict: {
        title: "These cards are already booked",
        message: "Another shipment holds some of these cards and may already be paid. Continue that one from your journeys instead of starting a new one.",
      },
      alreadyDone: { title: "Already on their way", message: "These cards were already burned for shipping. Follow them on your journeys." },
      prepareFailed: { title: "Couldn't start the shipment", message: "{detail} Nothing is burned or charged until you sign, so trying again is safe." },
      prepareNoAnswer: {
        title: "Couldn't start the shipment",
        message: "No answer from the shipping desk. Nothing is burned or charged until you sign, so trying again is safe.",
      },
      checkWaiting: { title: "Still waiting", message: "We couldn't read the shipment yet. Try again in a minute." },
    },
  },
  /** Stop 7 (components/redeem/Journey.tsx): where the slabs are. */
  journey: {
    /** The shipping provider's lifecycle (lib/redeem/types.ts RedeemStatus). */
    status: {
      pending_burn: "Waiting for the burn",
      processing: "Packing at the vault",
      shipped: "On the road",
      delivered: "Delivered",
      failed: "Failed",
      cancelled: "Cancelled",
    },
    /** The timeline: booked, packing, on the road, home. */
    stops: [
      { title: "Booked", text: "Shipment created" },
      { title: "Packing", text: "Burned, paid, being packed" },
      { title: "On the road", text: "With the carrier" },
      { title: "Home", text: "Delivered" },
    ],
    checking: "Checking…",
    unreadable: "Couldn't read",
    inProgress: "In progress",
    yourDoor: "your door",
    /** {place} reads "Portland, United States"; {pct} is how far along, 0 to 100. */
    strip: "Route from the Slabz vault to {place}, {pct}% of the way",
    passLead: "Your shipping pass ran out.",
    passText: "Shipments are read with it, so the statuses below may be out of date.",
    where: "Where the parcel is",
    shipment: "Shipment",
    /** {id} is the provider's reference. */
    shipmentRef: "Shipment · {id}",
    delivered: "Home at last!",
    stalledTitle: { failed: "Shipment failed", cancelled: "Shipment cancelled" },
    reading: "Reading the shipment…",
    yourShipment: "Your shipment",
    stalled: {
      failed: "The shipping provider marked this shipment failed. Contact Slabz support with the reference above before trying again.",
      cancelled: "The shipping provider marked this shipment cancelled. Contact Slabz support with the reference above before trying again.",
    },
    /** {status} is the provider's own status word. */
    stalledAs: {
      failed: "The shipping provider marked this shipment failed (“{status}”). Contact Slabz support with the reference above before trying again.",
      cancelled: "The shipping provider marked this shipment cancelled (“{status}”). Contact Slabz support with the reference above before trying again.",
    },
    pendingLead: "This shipment was booked, but its burn hasn't landed.",
    pendingText: "If a release was interrupted, finish it here: your wallet approves only what's left, for this same shipment, so nothing is paid twice.",
    finish: "Finish this shipment",
    tracking: "Tracking",
    /** {carrier} is the delivery company. */
    trackingWith: "Tracking · {carrier}",
    trackIt: "Track it ↗",
    trackParcel: "Track the parcel ↗",
    paid: "Paid",
    shipping: "Shipping",
    insurance: "Insurance",
    booked: "Booked",
    updated: "Last update",
    cards: { other: "{n} cards in this shipment" },
    renewToRead: "Renew the pass to read this shipment.",
    final: "Final status.",
    polling: "Updates every 30 seconds while this page is open.",
    pickTitle: "Pick a journey to follow",
    pickText: "Every shipment you start here is remembered on this device, so you can follow it, or finish one that was interrupted.",
    noneTitle: "No journeys on this device yet",
    noneText: "Shipments you start on this device show up here, with their tracking.",
    others: "Your other journeys · on this device",
    all: "Your journeys · on this device",
    passNeeded: "Pass needed",
    more: "Redeem more slabs",
  },
};
