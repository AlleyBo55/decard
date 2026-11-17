import type { Strings } from "../en";
import type { Translation } from "../types";

export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "Kopier kontraktadressen til CARDS",
    "idle": "Kopier",
    "copied": "Kopiert ✓",
    "selected": "Markert"
  },
  "ticker": {
    "price": "PRIS",
    "srPrice": "CARDS-pris",
    "unavailable": "Utilgjengelig",
    "unit": "24 t",
    "updated": "Oppdatert {time}"
  },
  "countdown": {
    "label": "Tid igjen til opplåsingen",
    "units": {
      "days": "DAGER",
      "hours": "TIMER",
      "minutes": "MIN",
      "seconds": "SEK"
    },
    "words": {
      "days": { "one": "dag", "other": "dager" },
      "hours": { "one": "time", "other": "timer" },
      "minutes": { "one": "minutt", "other": "minutter" },
      "seconds": { "one": "sekund", "other": "sekunder" }
    },
    "done": "LÅST OPP!"
  },
  "live": {
    "packs": "PAKKER ÅPNET",
    "inLastSeconds": {
      "one": "de siste {n} s",
      "other": "de siste {n} s"
    },
    "inLastMinutes": {
      "one": "de siste {n} min",
      "other": "de siste {n} min"
    },
    "noWindow": "i tidsvinduet",
    "dollars": "DOLLAR I PAKKER",
    "dollarsNote": "pakkepriser, gratisspinn ikke medregnet",
    "pace": "TEMPO",
    "paceValue": "{n}/min",
    "paceNote": "pakker i minuttet",
    "buybacks": "TIL TILBAKEKJØP",
    "buybacksNote": "med 30-dagerssatsen (estimat)",
    "list": "Nyeste trekk",
    "free": "Gratis",
    "error": "Live-dataene er utilgjengelige akkurat nå.",
    "waiting": "Venter på neste pakke…"
  }
};
