import type { Strings } from "../en";
import type { Translation } from "../types";
export const hubs: Translation<Strings["hubs"]> = {
  "crumbs": {
    "label": "Brotkrümelnavigation",
    "home": "Start",
    "cards": "Karten",
    "pokemon": "Pokémon-Kartenpreise"
  },
  "updated": "Stand {time} · wird etwa alle 15 Minuten aktualisiert",
  "credit": "Pokémon-Renderbilder aus Pokémon HOME, über {link}.",
  "browse": "Karten nach Franchise durchsuchen",
  "market": {
    "grade": "NOTE",
    "listed": "GELISTET",
    "lowestAsk": "TIEFSTPREIS",
    "medianAsk": "MEDIANPREIS",
    "lowestCard": "GÜNSTIGSTE KARTE",
    "lowestPsa10": "GÜNSTIGSTE PSA 10",
    "onVenue": "auf {venue}",
    "byGrade": "Preise nach Note",
    "cheapest": "Günstigste zuerst",
    "top": "Spitze des Markts"
  },
  "categoryMarket": {
    "empty": "Gerade sind keine gegradeten {noun}-Karten in USDC gelistet. Neue Slabs erscheinen hier, sobald Sammler sie tokenisieren und einstellen.",
    "emptyLink": "{noun}-Angebote im Scanner suchen.",
    "listedNow": "JETZT GELISTET",
    "graded": "GEGRADET, IN USDC",
    "partial": {
      "one": "Diese Aktualisierung hat die {read} günstigsten von {n} {noun}-Angeboten gelesen. Jeder Tiefstpreis hier ist exakt, aber Mediane werden weggelassen statt geschätzt, und eine Note, deren günstigstes Exemplar mehr kostet als diese, erscheint nicht.",
      "other": "Diese Aktualisierung hat die {read} günstigsten von {n} {noun}-Angeboten gelesen. Jeder Tiefstpreis hier ist exakt, aber Mediane werden weggelassen statt geschätzt, und eine Note, deren günstigstes Exemplar mehr kostet als diese, erscheint nicht."
    },
    "left": {
      "one": "{n} weiteres Angebot ist ungegradet, in SOL bepreist oder liegt weit über dem Versicherungswert, deshalb lassen diese Preise es weg.",
      "other": "{n} weitere Angebote sind ungegradet, in SOL bepreist oder liegen weit über dem Versicherungswert, deshalb lassen diese Preise sie weg."
    },
    "thin": {
      "one": "Gerade ist nur {n} gegradete {noun}-Karte in USDC gelistet, ein einziges neues Angebot kann diese Zahlen also verschieben.",
      "other": "Gerade sind nur {n} gegradete {noun}-Karten in USDC gelistet, ein einziges neues Angebot kann diese Zahlen also verschieben."
    },
    "byGradeTitle": "Angebotspreise gegradeter {noun}-Karten",
    "byGradeNote": "Jede Note fasst alle {noun}-Karten dieser Note zusammen, von gewöhnlichen Karten bis zu Chase-Karten. Öffne also die günstigste Karte, um genau zu sehen, welche es ist.",
    "cheapestTitle": "Die günstigsten gegradeten {noun}-Karten",
    "cheapestMore": "{noun}-Angebote im Scanner sortieren und filtern",
    "topTitle": "Die höchsten Angebotspreise für {noun}-Karten"
  },
  "guideMarket": {
    "allVenues": "Alle Marktplätze",
    "venue": "MARKTPLATZ",
    "venueGroup": "Marktplatz der Angebote",
    "none": "Gerade sind keine gegradeten {name}-Slabs in USDC gelistet.",
    "noneOn": "Gerade sind keine gegradeten {name}-Slabs auf {venue} in USDC gelistet.",
    "seeAll": { "one": "{n} im Scanner ansehen.", "other": "Alle {n} im Scanner ansehen." },
    "gradedSlabs": "GEGRADETE SLABS",
    "priced": "PREIS IN USDC",
    "left": {
      "one": "{n} weiteres Angebot ist in SOL bepreist oder liegt weit über dem Versicherungswert, deshalb lassen diese Preise es weg.",
      "other": "{n} weitere Angebote sind in SOL bepreist oder liegen weit über dem Versicherungswert, deshalb lassen diese Preise sie weg."
    },
    "everyListing": "Der Scanner zeigt jedes Angebot.",
    "byGradeTitle": "{name}: Angebotspreise je Note",
    "byGradeTitleOn": "{name}: Angebotspreise je Note auf {venue}",
    "byGradeNote": "Jede Note fasst alle Versionen von {name} zusammen, eine Note kann also sehr unterschiedliche Karten umfassen. Öffne die günstigste Karte, um genau zu sehen, welche es ist.",
    "cheapestTitle": "Die günstigsten gegradeten {name}-Karten",
    "cheapestTitleOn": "Die günstigsten gegradeten {name}-Karten auf {venue}",
    "cheapestMore": "Alle {name}-Angebote im Scanner sortieren und filtern",
    "cheapestMoreOn": "Alle {name}-Angebote auf {venue} im Scanner sortieren und filtern",
    "topTitle": "Die höchsten Angebotspreise für {name}",
    "topTitleOn": "Die höchsten Angebotspreise für {name} auf {venue}"
  },
  "category": {
    "kicker": "Franchise-Hub · tokenisierte gegradete Karten",
    "lede": "Gegradete {noun}-Karten, die gerade auf Collector Crypt und Magic Eden gelistet sind, jede ein echter Slab in einem Tresor, den du über einen Token auf Solana besitzt. Sieh dir den Tiefst- und den Medianpreis für jede Note an und öffne dann eine beliebige Karte für Pop-Report, Gebote und Historie. Die Preise sind aktuelle Angebotspreise, keine abgeschlossenen Verkäufe.",
    "ledeLowest": "Gegradete {noun}-Karten, die gerade auf Collector Crypt und Magic Eden gelistet sind, jede ein echter Slab in einem Tresor, den du über einen Token auf Solana besitzt. Sieh dir den Tiefstpreis für jede Note an und öffne dann eine beliebige Karte für Pop-Report, Gebote und Historie. Die Preise sind aktuelle Angebotspreise, keine abgeschlossenen Verkäufe.",
    "pokemonTitle": "Suchst du ein bestimmtes Pokémon?",
    "pokemonText": {
      "one": "Glurak, Pikachu, Nachtara und {n} weiteres Pokémon haben eigene Preisguides, mit Tiefst- und Medianpreis für jede Note.",
      "other": "Glurak, Pikachu, Nachtara und {n} weitere haben eigene Preisguides, mit Tiefst- und Medianpreis für jede Note."
    },
    "pokemonAll": { "one": "{n} Pokémon-Preisguide", "other": "Alle {n} Pokémon-Preisguides" },
    "unavailable": "Die Live-Angebote für {noun} sind vorübergehend nicht verfügbar. Der Guide unten gilt trotzdem, und der {scanner} zeigt aktuelle Angebote.",
    "unavailableLink": "Scanner",
    "aboutTitle": "Über gegradete {noun}-Karten",
    "terms": "BEGRIFFE, DIE DIR BEGEGNEN",
    "scannerMore": "{noun}-Angebote im Scanner suchen",
    "glossaryMore": "Das Glossar zu gegradeten Karten und Sammler-Slang",
    "explainerMore": "So funktionieren tokenisierte Sammelkarten",
    "salesMore": "Letzte verifizierte Verkäufe",
    "faqKicker": "{name}-FAQ",
    "faqTitle": "Fragen? Antworten.",
    "relatedTitle": "Verwandte Franchises",
    "relatedName": "{name}-Karten",
    "relatedSub": "Preise nach Note und Live-Angebote →",
    "everyFranchise": "Alle Franchises",
    "ldAbout": "{name}-Sammelkarten",
    "ldListings": "Jetzt gelistete gegradete {noun}-Karten"
  },
  "index": {
    "kicker": "Preisguides · gegradete Pokémon-Karten",
    "h1": "Pokémon-Kartenpreise, {accent}",
    "h1Accent": "Pokémon für Pokémon.",
    "lede": "Wähle ein Pokémon und sieh jeden gegradeten Slab davon, der auf Collector Crypt oder Magic Eden gelistet ist, den Tiefst- und Medianpreis für jede Note und die günstigsten und wertvollsten Karten, die gerade auf dem Markt sind.",
    "tile": "Preise für PSA 10, PSA 9 und CGC →",
    "showsTitle": "Was jeder Guide zeigt",
    "shows": "Jeder Guide liest alle gegradeten Angebote dieses Pokémon auf Collector Crypt und Magic Eden, kennzeichnet den Marktplatz jedes Angebots, lässt dich zwischen ihnen wechseln und aktualisiert sich etwa alle 15 Minuten. Er gruppiert die USDC-Angebotspreise nach Note, verlinkt die günstigste Karte jeder Note und listet die günstigsten und wertvollsten Slabs. Die Preise sind Angebotspreise, keine abgeschlossenen Verkäufe.",
    "checkerMore": "Wert einer beliebigen Pokémon-Karte suchen",
    "salesMore": "Letzte verifizierte Verkäufe ansehen",
    "ldGuides": "Preisguides für Pokémon-Karten"
  },
  "guide": {
    "description": "Live-Preise für {name}-Karten nach Note: Tiefst- und Medianpreise für Slabs mit PSA 10, PSA 9, CGC und BGS auf Collector Crypt und Magic Eden.",
    "h1": "{name}-Kartenpreise {accent}",
    "h1Accent": "nach Note.",
    "lede": "Jeder gegradete {name}-Slab, den Collector Crypt tokenisiert hat und der gerade auf Collector Crypt oder Magic Eden gelistet ist, mit Tiefst- und Medianpreis für jede Note. Wechsle den Marktplatz, um sie zu vergleichen. Die Preise sind aktuelle USDC-Angebotspreise, keine abgeschlossenen Verkäufe.",
    "kicker": "Pokémon-Preisguide · gegradete Slabs",
    "partial": "einige Angebote konnten diesmal nicht gelesen werden",
    "unavailable": "Die Live-Angebote für {name} sind vorübergehend nicht verfügbar. Der Guide unten gilt trotzdem, und der Scanner zeigt jedes Angebot.",
    "empty": "Gerade sind keine gegradeten {name}-Slabs gelistet.",
    "howTitle": "So liest du die Preise für {name}",
    "howPrintings": "{name} erscheint auf vielen verschiedenen Karten: Sets, Jahre, Kartennummern, Sprachen, Holo-Varianten und Promos. Zwei {name}-Slabs mit derselben Note können preislich weit auseinanderliegen, weil es verschiedene Versionen sind. Vergleiche also die genaue Karte, nicht nur Name und Note.",
    "howAsking": "Das sind Angebotspreise: was Verkäufer heute verlangen. {sales} und die Live-Gebote auf jeder Kartenseite zeigen, was Käufer tatsächlich zahlen. Der Versicherungswert ist ein Richtwert, kein garantierter Verkaufspreis.",
    "howAskingLink": "Letzte Verkäufe",
    "howGrades": "Höhere Noten erzielen meist einen Aufpreis, aber die Seltenheit ergibt sich aus dem Pop-Report: wie viele Exemplare der Grading-Anbieter in dieser Note und darüber erfasst hat. Jede Kartenseite zeigt ihn.",
    "checkerMore": "Wert einer beliebigen Pokémon-Karte prüfen",
    "gradesMore": "Noten von PSA, CGC und BGS erklärt",
    "more": "Weitere Pokémon-Preisguides",
    "loading": "Preisguide wird geladen",
    "ldName": "{name}-Kartenpreise nach Note",
    "ldAbout": "Pokémon-Sammelkarten mit {name}"
  }
};
