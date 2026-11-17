import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "CARDS-Vertragsadresse kopieren",
    "idle": "Kopieren",
    "copied": "Kopiert ✓",
    "selected": "Markiert"
  },
  "ticker": {
    "price": "PREIS",
    "srPrice": "CARDS-Preis",
    "unavailable": "Nicht verfügbar",
    "unit": "24 h",
    "updated": "Aktualisiert {time}"
  },
  "countdown": {
    "label": "Verbleibende Zeit bis zum Unlock",
    "units": { "days": "TAGE", "hours": "STD", "minutes": "MIN", "seconds": "SEK" },
    "words": {
      "days": { "one": "Tag", "other": "Tage" },
      "hours": { "one": "Stunde", "other": "Stunden" },
      "minutes": { "one": "Minute", "other": "Minuten" },
      "seconds": { "one": "Sekunde", "other": "Sekunden" }
    },
    "done": "FREIGEGEBEN!"
  },
  "live": {
    "packs": "GEÖFFNETE PACKS",
    "inLastSeconds": { "one": "in der letzten {n} s", "other": "in den letzten {n} s" },
    "inLastMinutes": { "one": "in der letzten {n} Min.", "other": "in den letzten {n} Min." },
    "noWindow": "im Zeitraum des Feeds",
    "dollars": "DOLLAR IN PACKS",
    "dollarsNote": "Pack-Preise, ohne Freispiele",
    "pace": "TEMPO",
    "paceValue": "{n}/Min.",
    "paceNote": "Packs pro Minute",
    "buybacks": "FÜR RÜCKKÄUFE",
    "buybacksNote": "zur 30-Tage-Rate (Schätzung)",
    "list": "Neueste Pulls",
    "free": "Gratis",
    "error": "Der Live-Feed ist gerade nicht verfügbar.",
    "waiting": "Warte auf das nächste Pack…"
  }
};
