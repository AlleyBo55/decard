import type { Strings } from "../en";
import type { Translation } from "../types";
/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  "sale": "Toll! {card} wurde für {price} gefangen!",
  "saleNoPrice": "Toll! {card} wurde gefangen!",
  "bidTaken": "{card} hat ein Gebot von {price} angenommen!",
  "bidTakenNoPrice": "{card} hat ein Gebot angenommen!",
  "listed": "Ein wildes {card} erscheint auf dem Markt!",
  "reprice": "{card} hat seinen Preis geändert!",
  "delist": "{card} ist vom Markt geflüchtet!",
  "newBid": "Trainer {trainer} wirft ein Gebot auf {card}!",
  "bidEdit": "Trainer {trainer} passt ein Gebot auf {card} an.",
  "bidPulled": "Trainer {trainer} ruft ein Gebot auf {card} zurück.",
  "other": "Mit {card} ist etwas passiert…"
};
export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "VERKAUF",
    "BID TAKEN": "ZUSCHLAG",
    "REPRICE": "NEUER PREIS",
    "DELIST": "ENTFERNT",
    "LISTED": "GELISTET",
    "NEW BID": "NEUES GEBOT",
    "BID EDIT": "GEBOT GEÄNDERT",
    "BID PULLED": "GEBOT ENTFERNT"
  },
  "ripTiers": {
    "common": { "label": "Gewöhnlich", "ballName": "Pokéball", "cry": "Toll!" },
    "rare": { "label": "Selten", "ballName": "Superball", "cry": "Superfang!" },
    "epic": { "label": "Episch", "ballName": "Hyperball", "cry": "Hyperfang!" },
    "legendary": { "label": "Legendär", "ballName": "Meisterball", "cry": "Ein Legendäres erscheint!" }
  },
  "gachaTiers": {
    "common": "Gewöhnlich",
    "uncommon": "Ungewöhnlich",
    "rare": "Selten",
    "epic": "Episch"
  },
  "primitives": {
    "otherCategory": "Andere",
    "deal": "DEAL",
    "dealScore": "Deal-Score {score}/100",
    "loading": "Lädt"
  },
  "unknownCard": "Unbekannte Karte",
  "cardTile": {
    "unlisted": "Nicht gelistet",
    "insured": "vers. {value}"
  },
  "activity": {
    "unresolvedCard": "Karte nicht zugeordnet",
    "fromWallet": "von {wallet}",
    "byWallet": "von {wallet}",
    "currentHolder": "aktueller Besitzer · {address}",
    "bot": "BOT ×{n}",
    "botOffers": { "one": "{n} Gebot in einer Transaktion", "other": "{n} Gebote in einer Transaktion" }
  },
  "search": {
    "placeholderCompact": "Karten oder Wallets suchen",
    "placeholder": "Karte suchen oder Wallet-Adresse einfügen",
    "label": "Karten oder Wallets suchen",
    "button": "Suchen",
    "searching": "Suche läuft…",
    "empty": "Keine Karten gefunden",
    "seeAll": { "one": "{n} Ergebnis ansehen", "other": "Alle {n} Ergebnisse ansehen" }
  },
  "rail": { "left": "Nach links scrollen", "right": "Nach rechts scrollen" },
  "konami": { "on": "DMG-Modus an! Willkommen zurück im Jahr 1996.", "off": "Zurück zu vollen Farben." },
  "gameBoy": {
    "modes": { "all": "ALLE", "trainers": "OHNE BOTS", "sales": "VERKÄUFE" },
    "booting": "DEX startet…",
    "empty": "Keine Trainer in der Nähe. Warte auf den nächsten Zug…",
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
      "device": "Live-Markt-Game-Boy. Mit den Pfeiltasten durch die Ereignisse blättern, mit Enter eine Karte öffnen.",
      "previous": "Vorheriges Ereignis",
      "next": "Nächstes Ereignis",
      "b": "B: vorheriges Ereignis",
      "a": "A: nächstes Ereignis",
      "select": "Select: Filter ist {mode}",
      "start": "Start: ganzen Ticker öffnen"
    },
    "battle": battle
  }
};
