import type { Strings } from "../en";
import type { Translation } from "../types";
export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "Karte nicht gefunden",
    "title": "{name} Preis · {set}",
    "titleNoSet": "{name} Preis",
    "description": "{name}. Versicherungswert {insured}. Live-Preis, Pop-Report, Gebote und On-Chain-Historie auf Decard.",
    "imageAlt": "{name}: Versicherungswert, Angebot, bestes Gebot und Population",
    "pullImageAlt": "{name}, gezogen aus einem Pack für {pack}, Versicherungswert {insured}",
    "pullTitle": "{name} aus einem Pack für {pack} gezogen",
    "pullDescription": "Versicherungswert {insured}, {multiple} so viel wie der Pack-Preis. Pack-Preis vom Teilenden angegeben. Live-Preis, Pop-Report und Gebote auf Decard.",
    "pullDescriptionNoValue": "Pack-Preis vom Teilenden angegeben. Live-Preis, Pop-Report und Gebote auf Decard."
  },
  "jsonLd": {
    "gradingCompany": "Grading-Anbieter",
    "grade": "Note",
    "set": "Set",
    "year": "Jahr",
    "cardNumber": "Kartennummer",
    "parallel": "Parallel",
    "certNumber": "Zertifikatsnummer",
    "gradePopulation": "Population in dieser Note",
    "populationHigher": "Population mit höherer Note",
    "totalPopulation": "Gesamte gegradete Population",
    "identifier": "{company}-Zertifizierung {cert}",
    "anyGrader": "Grading"
  },
  "loading": "Karte wird geladen",
  "breadcrumb": {
    "label": "Brotkrümelnavigation",
    "scanner": "Scanner"
  },
  "sharedPull": {
    "label": "Geteilter Pull",
    "kicker": "GETEILTER PULL",
    "pulled": "Gezogen aus einem Pack für {pack}.",
    "pulledWithValue": "Gezogen aus einem Pack für {pack}. Der Versicherungswert ist {multiple} so hoch wie der Pack-Preis.",
    "note": "Der Pack-Preis stammt von der Person, die den Link geteilt hat.",
    "cta": "Eigene Pulls bewerten →"
  },
  "actions": {
    "viewOnCollectorCrypt": "Auf Collector Crypt ansehen ↗",
    "buyOnSlabz": "Auf Slabz kaufen · {price} ↗"
  },
  "authenticated": "✓ Authentifiziert",
  "rarity": {
    "LEGENDARY": "LEGENDÄR",
    "RARE": "SELTEN",
    "UNCOMMON": "UNGEWÖHNLICH",
    "COMMON": "GEWÖHNLICH"
  },
  "price": {
    "listed": "Angebotspreis",
    "notListed": "Nicht gelistet",
    "listedOn": "auf {venue} · aktualisiert {ago}",
    "insured": "VERSICHERT",
    "bestBid": "BESTES GEBOT",
    "underInsured": "{pct} % unter Versicherungswert",
    "overInsured": "{pct} % über Versicherungswert"
  },
  "facts": {
    "title": "Pokédex-Daten",
    "set": "Set",
    "year": "Jahr",
    "number": "Nummer",
    "parallel": "Parallel",
    "grader": "Grader",
    "grade": "Note",
    "cert": "Zert.-Nr.",
    "vault": "Tresor",
    "token": "Token"
  },
  "pop": {
    "title": "Basiswerte · {company}-Pop-Report",
    "fullReport": "Ganzer Pop-Report ↗",
    "grade": "Pop {grade}",
    "plain": "Pop",
    "higher": "Höher",
    "total": "Gesamt",
    "gemRate": "Gem-Rate",
    "summary": "{pop} in dieser Note gegradet, von insgesamt {total}, {higher} höher.",
    "summaryNoneHigher": "{pop} in dieser Note gegradet, von insgesamt {total}, keine höher.",
    "lastGem": "Letzte Gem Mint gegradet: {date}."
  },
  "bids": {
    "title": "Live-Gebote",
    "count": "Live-Gebote ({n})",
    "unavailable": "Live-Gebote sind gerade nicht verfügbar. Schau gleich noch mal vorbei.",
    "none": "Keine Live-Gebote. Sei der erste Trainer, der ein Gebot abgibt.",
    "ofInsured": "{pct} % vom Vers.-Wert"
  },
  "trainer": {
    "title": "Trainer",
    "collectorCryptName": "Name bei Collector Crypt: {name}",
    "open": "Trainerpass öffnen →",
    "unknown": "Besitzer unbekannt."
  },
  "history": {
    "title": "On-Chain-Historie",
    "error": "Die Historie dieser Karte lässt sich gerade nicht lesen.",
    "empty": "Noch keine Marktplatz-Historie on-chain."
  },
  "slab": {
    "showFront": "Vorderseite des Slabs zeigen",
    "showBack": "Rückseite des Slabs zeigen",
    "backAlt": "{name}, Rückseite des Slabs",
    "flip": "↻ Slab drehen"
  },
  "related": {
    "sameKicker": "Noten vergleichen",
    "sameTitle": "Weitere {name}-Slabs im Angebot",
    "sameSub": "Aktuelle Angebotspreise, günstigste zuerst.",
    "sameLabel": "Weitere {name}-Angebote",
    "hubLink": "{name}-Kartenpreise nach Note",
    "scannerLink": "Alle {name}-Angebote im Scanner",
    "setKicker": "Gleiches Set",
    "setTitle": "Mehr aus {set}",
    "setSub": "Neueste Angebote zuerst.",
    "setLabel": "Weitere Angebote aus {set}"
  },
  "receipt": {
    "button": "Pull teilen",
    "close": "Schließen",
    "slabLabel": "Dein Slab",
    "title": "Pull-Beleg",
    "heading": "Teile deinen Pull",
    "statsLabel": "Slab-Werte",
    "insured": "Versichert",
    "bestBid": "Bestes Gebot",
    "listedAt": "Gelistet für {price} auf {venue}",
    "notListed": "Gerade nicht gelistet",
    "checking": "Angebot wird geprüft…",
    "packQuestion": "Was hat das Pack gekostet?",
    "optional": "Optional",
    "otherAmount": "Anderer Betrag",
    "otherAmountLabel": "Anderer Pack-Preis in Dollar",
    "noPack": "Kein Pack",
    "invalidPack": "Gib einen Betrag von 1 $ bis 100.000 $ ein.",
    "meter": "Versichert ÷ Pack",
    "exp": "EP",
    "noteMultiple": "Der Versicherungswert ist {multiple} so hoch wie der Pack-Preis von {pack}.",
    "notePick": "Wähle den Pack-Preis, um das Vielfache zu sehen.",
    "noteNoValue": "Für diesen Slab ist kein Versicherungswert hinterlegt.",
    "shareIt": "Teilen",
    "postOnX": "Auf X posten",
    "saveImage": "Bild speichern",
    "more": "Mehr",
    "copy": "Kopieren",
    "preview": "Link-Vorschau",
    "previewNote": "So zeigen es X und Discord",
    "previewAlt": "Teilen-Bild für {name}",
    "rendering": "Wird gerendert…",
    "fine": "Den Pack-Preis legst du fest, niemand prüft ihn. Der Versicherungswert ist die Zahl von Collector Crypt, kein Verkaufspreis. Die Zahlen im Teilen-Bild werden einmal am Tag aktualisiert.",
    "lidTag": "PULL-BELEG",
    "share": "Teilen",
    "copyLink": "Link kopieren",
    "toast": {
      "discord": "Kopiert. Füge ihn in Discord ein, dann erscheint der Beleg als Vorschau.",
      "copied": "Link kopiert.",
      "copyFailed": "Kopieren fehlgeschlagen. Halte stattdessen den Link gedrückt.",
      "shareFailed": "Das Teilen-Menü hat sich nicht geöffnet. Kopiere stattdessen den Link."
    },
    "say": {
      "throw": "DECARD setzt POKéBALL ein!",
      "click": "Klick!",
      "multiple": "Versicherungswert: {multiple} vom Pack für {pack}!",
      "caught": "Toll! {name} wurde gefangen!"
    },
    "post": {
      "pulled": "{name} aus einem Pack für {pack} gezogen.",
      "pulledWithValue": "{name} aus einem Pack für {pack} gezogen. Versicherungswert {insured} ({multiple} des Packs).",
      "insured": "Versicherungswert {insured}",
      "pop": "Pop {pop}"
    }
  },
  "stage": {
    "showFront": "Vorderseite des Slabs zeigen",
    "showBack": "Rückseite des Slabs zeigen",
    "flip": "↻ Drehen",
    "tilt": "◎ Kippen",
    "skip": "Überspringen ▸▸"
  }
};
