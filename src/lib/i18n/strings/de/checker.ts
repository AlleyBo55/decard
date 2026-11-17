import type { Strings } from "../en";
import type { Translation } from "../types";
export const checker: Translation<Strings["checker"]> = {
  "breadcrumb": {
    "label": "Brotkrümelnavigation",
    "home": "Start",
    "page": "Pokémon-Kartenwert-Checker"
  },
  "ld": {
    "about": ["Pokémon-Kartenpreise", "Werte gegradeter Sammelkarten", "PSA-Grading"],
    "currentPrices": "Aktuelle Angebotspreise gegradeter Pokémon-Karten"
  },
  "hero": {
    "kicker": "Pokémon-Preise · PSA-Werte · gegradete Karten",
    "h1": "Pokémon-{accent}",
    "h1Accent": "Kartenwert-Checker.",
    "lede": "Suche eine gegradete Pokémon-Karte nach Name, Set, Kartennummer, Zertifikatsnummer oder Solana-Mint. Vergleiche ihren aktuellen Angebotspreis mit dem Versicherungswert als Richtwert und prüfe dann Gebote, Population und Markthistorie auf der jeweiligen Kartenseite.",
    "meta": "Kostenlos, rein lesend und ohne Login · Geprüft am {date} · Unabhängiges Daten-Tool, kein Gutachten"
  },
  "search": {
    "label": "Welche Pokémon-Karte willst du prüfen?",
    "hint": "Gib Set, Jahr, Kartennummer und Note an, wenn du sie kennst. Genaue Suchen trennen ähnliche Versionen.",
    "placeholder": "z. B. 1999 Charizard 4/102 PSA 10",
    "submit": "Live-Angebote prüfen",
    "example": "{name} suchen"
  },
  "prices": {
    "kicker": "Live-Marktüberblick",
    "title": "Aktuelle Angebotspreise für Pokémon-Karten",
    "intro": "Aktuelle, glaubwürdige USDC-Angebote gegradeter Pokémon-Karten, jeweils mit ihrem Marktplatz gekennzeichnet. Angebote und Versicherungswerte stammen aus der API von Collector Crypt, die Collector Crypt und Magic Eden abdeckt. Dieser Überblick wird bis zu fünf Minuten zwischengespeichert. Angebotspreise und Versicherungswerte sind Vergleichswerte, keine garantierten Verkaufswerte.",
    "unavailable": "Aktuelle Beispiele sind vorübergehend nicht verfügbar. Die Suche öffnet trotzdem den Live-Scanner des Marktplatzes.",
    "empty": "Aktuelle Beispiele sind vorübergehend nicht verfügbar. Der Wert-Checker und die Recherche-Guides funktionieren weiterhin.",
    "cardAlt": "Vorderseite von {name}",
    "asking": "PREIS",
    "insured": "VERS.-WERT",
    "underInsured": "Angebot {pct} % unter Versicherungswert",
    "venue": "Auf {venue}",
    "updated": "aktualisiert am {date}",
    "browseAll": "Alle Live-Angebote für Pokémon durchsuchen",
    "guidesTitle": "Preisguides nach Pokémon",
    "guide": "{name}-Preise",
    "allGuides": "Alle Pokémon-Preisguides"
  },
  "howTo": {
    "title": "So prüfst du den Wert einer Pokémon-Karte",
    "steps": [
      {
        "title": "1. Die genaue Karte bestimmen",
        "text": "Gleiche Jahr, Set, Kartennummer, Sprache, Parallel-Variante, Edition und Autogramm-Status ab. Ein bekannter Name allein reicht nicht."
      },
      {
        "title": "2. Den Slab bestätigen",
        "text": "Prüfe Grading-Anbieter, Zahlennote und Zertifikatsnummer. Vergleiche das physische Label mit dem Eintrag des Grading-Anbieters."
      },
      {
        "title": "3. Echte Nachfrage vergleichen",
        "text": "Kürzlich angenommene Verkäufe und aktive Gebote zeigen, was Käufer gezahlt haben oder zahlen würden. Ein unverkaufter Angebotspreis zeigt nur, was ein Verkäufer will."
      },
      {
        "title": "4. Seltenheit und Liquidität einrechnen",
        "text": "Prüfe die Population in der Note, höher gegradete Exemplare, die Angebotstiefe und die Handelsaktivität. Seltenheit zählt nur, wenn Sammler die Karte auch wollen."
      }
    ],
    "cardPage": "Öffne eine einzelne Kartenseite auf Decard, um Identität, Note, Zertifikat, Angebotspreis, Versicherungswert, bestes Gebot, Pop-Report und entschlüsselte On-Chain-Historie zusammen zu sehen. Kein einzelnes Feld ist eine vollständige Bewertung."
  },
  "priceMeaning": {
    "title": "Angebotspreis, Versicherungswert und Marktwert sind verschiedene Dinge",
    "terms": "Ein {listingPrice} ist die aktuelle Forderung des Verkäufers. Er beweist nicht, dass ein Käufer ihn akzeptiert. Ein {insuredValue} ist ein Richtwert, der mit der Karte im Tresor geliefert wird. Er ist zum Vergleichen nützlich, aber keine garantierte Auszahlung, kein Gutachten und kein zukünftiger Verkaufspreis.",
    "listingPrice": "Angebotspreis",
    "insuredValue": "Versicherungswert",
    "dealScore": "Der Deal-Score von Decard misst, wie weit ein USDC-Angebotspreis unter dem Versicherungswert liegt. Eine Karte mit 100 $ Versicherungswert, die für 80 $ gelistet ist, hat zum Beispiel einen Score von 20. Das bedeutet „20 % unter dem Versicherungswert gelistet“, nicht „20 % garantierter Gewinn“.",
    "estimate": "Eine bessere Schätzung kombiniert kürzlich angenommene Verkäufe, aktive Gebote, vergleichbare Angebote, die genaue Note und die Population der Karte. Bei selten gehandelten Slabs kann zwischen dem sichtbaren Angebotspreis und dem Preis, den ein Käufer tatsächlich zahlt, eine große Lücke liegen."
  },
  "psa": {
    "title": "Was bestimmt den Wert einer PSA-Pokémon-Karte?",
    "grade": "PSA 10 ist die höchste reguläre Zahlennote, macht aber nicht jede Karte teuer. Die Nachfrage nach dem Pokémon, Set, Druckjahr, Sprache, Edition, Kartennummer, Artwork, Seltenheit und Population beeinflussen den Wert. Eine PSA 9 kann seltener oder gefragter sein als eine nicht verwandte PSA 10.",
    "multiplier": "Es gibt keinen verlässlichen allgemeinen Faktor von ungegradet (raw) zu PSA 9 oder PSA 10. Grading-Kosten, Echtheitsrisiko, unsicherer Zustand und die Zahl hoch gegradeter Exemplare ändern sich von Karte zu Karte. Vergleiche, wann immer möglich, dieselbe Version in derselben Note.",
    "more": "Begriffe zu PSA, CGC, BGS und Population lernen"
  },
  "limits": {
    "title": "Was dieser Checker kann und was nicht",
    "coverage": "Decard erfasst professionell gegradete physische Karten, die auf Solana tokenisiert sind und auf Collector Crypt, Magic Eden und Slabz gehandelt werden. Decard schätzt nicht den Zustand ungegradeter Karten, verspricht keine Echtheit über die angezeigten Einträge von Grading-Anbieter und Verwahrer hinaus und sagt keinen zukünftigen Preis voraus.",
    "verify": "Verfügbarkeit auf dem Marktplatz, Gebote, Versicherungswerte und Einlösungsbedingungen können sich ändern. Prüfe die aktuelle Karte, die Zertifizierung, das Angebot, den Verwahrer und die Bedingungen für die Herausgabe, bevor du eine Entscheidung triffst. Decard ist unabhängig, von Fans gemacht und nicht mit PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt oder Magic Eden verbunden."
  },
  "faq": {
    "title": "Häufige Fragen zum Wert von Pokémon-Karten",
    "items": [
      {
        "q": "Wie viel ist meine Pokémon-Karte wert?",
        "a": "Bestimme zuerst die genaue Version und den Zustand und vergleiche dann dieselbe Karte in derselben Note anhand angenommener Verkäufe, aktiver Gebote und glaubwürdiger Angebote. Ein Kartenname allein ergibt keinen verlässlichen Wert."
      },
      {
        "q": "Garantiert eine PSA 10 einen hohen Wert?",
        "a": "Nein. Die Note beschreibt Zustand und Echtheit. Nachfrage, Seltenheit, Population und Liquidität entscheiden, ob Sammler einen Aufpreis zahlen."
      },
      {
        "q": "Soll ich Angebotspreise oder Verkaufspreise nutzen?",
        "a": "Beides, aber gewichte kürzliche vergleichbare Verkäufe und echte Gebote stärker. Angebotspreise zeigen, wie viel verfügbar ist und was Verkäufer erwarten, auch bei Angeboten, die vielleicht nie verkauft werden."
      },
      {
        "q": "Ist Decard kostenlos?",
        "a": "Ja. Die Recherche-Seiten sind öffentlich und rein lesend, und zum Prüfen einer Karte brauchst du weder Wallet noch Konto."
      }
    ]
  },
  "aside": {
    "label": "Guide zum Wert-Checker",
    "onThisPage": "AUF DIESER SEITE",
    "toc": {
      "currentPrices": "Aktuelle Preise",
      "howToCheck": "Wert prüfen",
      "priceMeaning": "Was Preise bedeuten",
      "psaValue": "Wert von PSA-Karten",
      "limitations": "Grenzen",
      "questions": "Fragen"
    },
    "directory": "Verzeichnis gegradeter Karten öffnen",
    "tokenized": "So funktionieren tokenisierte Karten"
  }
};
