import type { Strings } from "../en";
import type { Translation } from "../types";

// Declared apart: its `other` key would make the inline literal check as a plural.
const battle: Strings["ui"]["gameBoy"]["battle"] = {
  "sale": "Der satt den! {card} ble fanget for {price}!",
  "saleNoPrice": "Der satt den! {card} ble fanget!",
  "bidTaken": "{card} godtok et bud på {price}!",
  "bidTakenNoPrice": "{card} godtok et bud!",
  "listed": "En vill {card} dukket opp på markedet!",
  "reprice": "{card} endret prisen sin!",
  "delist": "{card} flyktet fra markedet!",
  "newBid": "Trener {trainer} kastet et bud på {card}!",
  "bidEdit": "Trener {trainer} justerte et bud på {card}.",
  "bidPulled": "Trener {trainer} trakk tilbake et bud på {card}.",
  "other": "Noe skjedde med {card}..."
};

export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "SALG",
    "BID TAKEN": "BUD GODTATT",
    "REPRICE": "NY PRIS",
    "DELIST": "FJERNET",
    "LISTED": "LAGT UT",
    "NEW BID": "NYTT BUD",
    "BID EDIT": "BUD ENDRET",
    "BID PULLED": "BUD TRUKKET"
  },
  "ripTiers": {
    "common": { "label": "Vanlig", "ballName": "Poké Ball", "cry": "Der satt den!" },
    "rare": { "label": "Sjelden", "ballName": "Great Ball", "cry": "Godt fanget!" },
    "epic": { "label": "Episk", "ballName": "Ultra Ball", "cry": "Ultrafangst!" },
    "legendary": { "label": "Legendarisk", "ballName": "Master Ball", "cry": "En legendarisk dukket opp!" }
  },
  "gachaTiers": {
    "common": "Vanlig",
    "uncommon": "Uvanlig",
    "rare": "Sjelden",
    "epic": "Episk"
  },
  "primitives": {
    "otherCategory": "Annet",
    "deal": "KUPP",
    "dealScore": "Kuppscore {score}/100",
    "loading": "Laster"
  },
  "unknownCard": "Ukjent kort",
  "cardTile": {
    "unlisted": "Ikke til salgs",
    "insured": "fors. {value}"
  },
  "activity": {
    "unresolvedCard": "Uidentifisert kort",
    "fromWallet": "fra {wallet}",
    "byWallet": "av {wallet}",
    "currentHolder": "nåværende eier · {address}",
    "bot": "BOT ×{n}",
    "botOffers": {
      "one": "{n} bud i én transaksjon",
      "other": "{n} bud i én transaksjon"
    }
  },
  "search": {
    "placeholderCompact": "Søk etter kort eller lommebøker",
    "placeholder": "Søk etter et kort, eller lim inn en lommebokadresse",
    "label": "Søk etter kort eller lommebøker",
    "button": "Søk",
    "searching": "Søker...",
    "empty": "Fant ingen kort",
    "seeAll": {
      "one": "Se {n} treff",
      "other": "Se alle {n} treff"
    }
  },
  "rail": {
    "left": "Bla til venstre",
    "right": "Bla til høyre"
  },
  "konami": {
    "on": "DMG-modus på! Velkommen tilbake til 1996.",
    "off": "Tilbake til full farge."
  },
  "gameBoy": {
    "modes": {
      "all": "ALLE",
      "trainers": "INGEN BOTTER",
      "sales": "SALG"
    },
    "booting": "Starter DEX-en...",
    "empty": "Ingen trenere i nærheten. Venter på neste bevegelse...",
    "live": "LIVE",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "LIVE ON-CHAIN · DOT MATRIX",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "Game Boy med live-markedet. Bruk piltastene for å bla gjennom hendelser og Enter for å åpne et kort.",
      "previous": "Forrige hendelse",
      "next": "Neste hendelse",
      "b": "B: forrige hendelse",
      "a": "A: neste hendelse",
      "select": "Select: filteret er {mode}",
      "start": "Start: åpne all live-handel"
    },
    "battle": battle
  }
};
