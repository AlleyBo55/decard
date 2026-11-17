import type { Strings } from "../en";
import type { Translation } from "../types";
export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · Dex für gegradete Karten",
  "live": "LIVE",
  "hero": { "lead": "", "scan": "Scann", "tail": "sie dir alle!" },
  "lede": "Live-Angebote von Collector Crypt, Magic Eden und Slabz, Deal-Scores und die Bewegungen jeder Wallet, für tokenisierte gegradete Karten auf Solana.",
  "newKicker": "Neu auf Decard",
  "newTitle": "Packs öffnen, echte Slabs behalten.",
  "typeKicker": "Wähle deinen Typ",
  "typeTitle": "Nach Franchise stöbern.",
  "typeSub": "Gegradete Karten von Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, Sport und mehr: Live-Angebotspreise nach Note für jeden gelisteten Slab auf Collector Crypt, Magic Eden und Slabz.",
  "faqKicker": "Trainer-FAQ",
  "faqTitle": "Fragen? Antworten.",
  "tipTitle": "TIPP VOM PROFESSOR",
  "tip": "Eine PSA 10 mit einer Population von 12 ist ein ganz anderes Kaliber als eine PSA 10, die jeder hat. Prüf vor dem Kauf den Pop-Report, die Gem-Rate und wie weit der Preis vom Versicherungswert entfernt ist.",
  "guideBtn": "Trainer-Guide lesen",
  "dealBtn": "Deal finden",
  "title": "Gegradete Karten: Packs öffnen, scannen, einlösen",
  "description": "Öffne Packs mit echten PSA-, CGC- und BGS-Slabs, finde Deals auf Collector Crypt, Magic Eden und Slabz und lass dir die Karte nach Hause schicken.",
  "faq": [
    {
      "q": "Was ist Decard?",
      "a": "Ein kostenloser Open-Source-Scanner und -Tracker für tokenisierte gegradete Karten auf Solana. Er sortiert Live-Angebote von Collector Crypt, Magic Eden und Slabz nach Deal-Score, entschlüsselt jeden On-Chain-Verkauf, jedes Angebot und jedes Gebot und zeigt Pop-Reports und die Karten jeder Wallet."
    },
    {
      "q": "Was ist ein Deal-Score?",
      "a": "Wie weit ein USDC-Angebot unter dem Versicherungswert der Karte liegt, von 0 bis 100. Eine Karte mit 100 $ Versicherungswert, die für 80 $ gelistet ist, hat einen Score von 20. Sortierst du den Scanner nach „Bester Deal“, stehen die größten Abschläge oben."
    },
    {
      "q": "Gehört Decard zu Collector Crypt?",
      "a": "Nein. Decard ist unabhängig und von Fans gemacht. Es liest die öffentliche Marktplatz-API von Collector Crypt und die Solana-Blockchain und verlinkt zu Collector Crypt, Magic Eden und Slabz, wenn du kaufen willst."
    },
    {
      "q": "Muss ich mich registrieren oder eine Wallet verbinden?",
      "a": "Nicht zum Stöbern. Scanner, Live-Ticker und Tracker lesen nur Daten: kein Konto, keine Wallet-Verbindung, kein API-Schlüssel. Füge eine beliebige Solana-Adresse ein, um die gegradeten Karten und die Marktplatz-Aktivität dieser Wallet zu sehen. Verbinde eine Wallet nur, wenn du Packs öffnen willst."
    },
    {
      "q": "Welche Karten deckt Decard ab?",
      "a": "Jede tokenisierte gegradete Karte, die auf Collector Crypt, Magic Eden oder Slabz gelistet ist: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam und Sportkarten, gegradet von PSA, CGC, Beckett (BGS) und anderen."
    },
    {
      "q": "Woher kommen die Daten?",
      "a": "Angebote, Versicherungswerte, Gebote und Pop-Reports stammen aus der öffentlichen API von Collector Crypt. Der Live-Ticker wird aus dem Marktplatz-Programm von Collector Crypt auf Solana entschlüsselt. Es gibt keine Datenbank: Jede Zahl wird live gelesen."
    }
  ],
  "more": [
    { "href": "/pokemon-card-value-checker", "label": "Wert einer Pokémon-Karte prüfen" },
    { "href": "/pokemon", "label": "Pokémon-Kartenpreise nach Pokémon" },
    { "href": "/luck", "label": "Glück eines Gacha-Pulls prüfen" },
    { "href": "/cards-token", "label": "$CARDS-Preis, Rückkäufe und Burns" },
    { "href": "/sales", "label": "Letzte verifizierte Verkäufe" },
    { "href": "/cards", "label": "Alle gelisteten Karten durchsuchen" },
    { "href": "/tokenized-trading-cards", "label": "So funktionieren tokenisierte Sammelkarten" },
    { "href": "/guide", "label": "Alle Begriffe im Trainer-Guide" }
  ],
  "stats": { "listed": "Gelistete Karten", "floor": "Tiefstpreis", "top": "Top-Angebot" },
  "catch": {
    "unlisted": "Nicht gelistet",
    "blip": "{card}, {price}",
    "blipUnder": "{card}, {price}, {under} % unter Versicherungswert",
    "throw": "Pokéball werfen und einen Deal fangen",
    "throw3d": "Pokéball werfen und einen zufälligen Deal fangen",
    "caught": "Toll! {card} wurde gefangen!",
    "insured": "versichert: {value}",
    "under": "{pct} % unter Wert",
    "view": "Karte ansehen",
    "again": "Nochmal werfen",
    "shaking": "Wackel… wackel…",
    "prompt": "Tippe auf den Ball, um einen Deal zu fangen",
    "promptAgain": "Tippe auf den Ball, um nochmal zu werfen"
  },
  "ticker": {
    "label": "Neu gelistet",
    "loading": "Markt wird gelesen…",
    "empty": "Keine neuen Angebote in den letzten Minuten."
  },
  "ripCard": {
    "title": "Packs mit gegradeten Karten öffnen.",
    "hook": "Ein echter Slab von {psa}, {bgs} oder {cgc} in jedem Pack.",
    "body": "Pokémon, One Piece, Dragon Ball, Lorcana und Sport, jeweils mit eigener Enthüllung. Behalte den Slab oder verkauf ihn mit einem Tipp zurück.",
    "cta": "Pack öffnen",
    "gym": "{gym} Ranglisten und Pack-Chancen",
    "gymName": "Rip Gym:",
    "pulled": "Gerade gezogen",
    "pullsLabel": "Neueste Pulls auf Decard",
    "idle": "Jedes Pack enthält einen echten gegradeten Slab. Öffne eins, und dein Pull landet hier."
  },
  "redeemCard": {
    "eyebrow": "Einlösen",
    "title": "Hol deinen Slab {em}",
    "titleEm": "nach Hause.",
    "body": "Eine Karte zum Behalten gezogen? Löse ihr NFT gegen den echten gegradeten Slab ein, verschickt vom Tresor bis an deine Haustür.",
    "cta": "Karte einlösen",
    "vault": "Tresor",
    "town": "Deine Stadt"
  },
  "gachaCard": {
    "live": "Live-Gacha",
    "title": "Gerade werden Packs geöffnet.",
    "body": "Jedes Pack-Opening bei Collector Crypt, sobald es landet.",
    "cta": "Live-Gacha ansehen",
    "score": "Meine Pulls bewerten",
    "counting": "Pulls werden gezählt…",
    "perMinute": { "one": "{n} Pull pro Minute", "other": "{n} Pulls pro Minute" },
    "biggest": "größter Hit zuletzt {multiple}, {card} {value}"
  },
  "market": {
    "kicker": "Auf dem Markt",
    "tabsLabel": "Angebote",
    "tabs": {
      "deals": {
        "label": "Beste Deals",
        "title": "Unter Versicherungswert, {em}",
        "em": "sortiert.",
        "sub": "Live-Angebote in USDC, sortiert danach, wie weit sie unter dem Versicherungswert des Tresors liegen. Je voller die KP-Leiste, desto größer der Abschlag.",
        "more": "Scanner öffnen"
      },
      "new": {
        "label": "Neu gelistet",
        "title": "Frisch auf dem Markt.",
        "sub": "Die neuesten Angebote auf Collector Crypt und Magic Eden, sobald sie landen.",
        "more": "Alle neuen ansehen"
      },
      "top": {
        "label": "Spitzenklasse",
        "title": "Die teuersten gelisteten Karten.",
        "sub": "Grails und Gem Mints, vom höchsten Preis abwärts.",
        "more": "Spitzenklasse ansehen"
      }
    }
  },
  "onChain": {
    "kicker": "Live auf der Blockchain",
    "title": "Jede Bewegung, sobald sie landet.",
    "sub": "Direkt aus dem Marktplatz-Programm von Collector Crypt entschlüsselt: jeder Verkauf, jedes Angebot, jedes Gebot.",
    "more": "Ganzer Live-Ticker",
    "gameBoy": "A und B blättern durch die Ereignisse, SELECT blendet Bots aus, START öffnet den ganzen Ticker.",
    "moves": "Letzte Bewegungen",
    "quiet": "Der Markt ist gerade ruhig.",
    "bidsTitle": "Heiße Gebote",
    "bidsSub": "Karten, die gerade Gebote bekommen, mit dem besten Live-Gebot.",
    "bids": { "one": "{n} Gebot", "other": "{n} Gebote" },
    "ofInsured": "{pct} % vom Vers.-Wert",
    "noBids": "Keine Live-Gebote im letzten Zeitfenster."
  },
  "offline": {
    "title": "Der Dex hat kurz das Signal verloren.",
    "retry": "Erneut versuchen",
    "text": "Der Markt-Feed hat nicht geantwortet. Meist ist er nach ein paar Sekunden wieder da."
  },
  "snapshot": {
    "kicker": "Marktüberblick",
    "title": "Wähle einen Typ, lies den Markt.",
    "sub": "Gelistete Karten, Tiefstpreis und Top-Angebot für jede Kategorie, auf Collector Crypt, Magic Eden und Slabz."
  },
  "dex": {
    "allVenues": "Alle Marktplätze",
    "venue": "Marktplatz",
    "no": "Nr.{no}",
    "type": "{type}-Kategorie",
    "listed": "Gelistet",
    "floor": "Tiefstpreis",
    "top": "Top-Angebot",
    "floorCard": "Günstigste Karte: {card} für {price}",
    "types": {
      "electric": "Elektro",
      "water": "Wasser",
      "fire": "Feuer",
      "grass": "Pflanze",
      "psychic": "Psycho",
      "fighting": "Kampf",
      "dragon": "Drache",
      "fairy": "Fee",
      "ghost": "Geist",
      "dark": "Unlicht",
      "steel": "Stahl",
      "ground": "Boden",
      "flying": "Flug",
      "normal": "Normal"
    }
  }
};
