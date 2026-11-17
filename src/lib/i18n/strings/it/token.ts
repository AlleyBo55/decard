import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  copy: {
    label: "Copia l'indirizzo del contratto CARDS",
    idle: "Copia",
    copied: "Copiato ✓",
    selected: "Selezionato",
  },
  ticker: {
    price: "PREZZO",
    srPrice: "Prezzo di CARDS",
    unavailable: "Non disponibile",
    unit: "24h",
    updated: "Aggiornato alle {time}",
  },
  countdown: {
    label: "Tempo rimasto allo sblocco",
    units: { days: "GIORNI", hours: "ORE", minutes: "MIN", seconds: "SEC" },
    words: {
      days: { one: "giorno", many: "giorni", other: "giorni" },
      hours: { one: "ora", many: "ore", other: "ore" },
      minutes: { one: "minuto", many: "minuti", other: "minuti" },
      seconds: { one: "secondo", many: "secondi", other: "secondi" },
    },
    done: "SBLOCCATO!",
  },
  live: {
    packs: "BUSTINE APERTE",
    inLastSeconds: { one: "nell'ultimo {n} s", many: "negli ultimi {n} s", other: "negli ultimi {n} s" },
    inLastMinutes: { one: "nell'ultimo {n} min", many: "negli ultimi {n} min", other: "negli ultimi {n} min" },
    noWindow: "nel periodo del feed",
    dollars: "DOLLARI SPESI",
    dollarsNote: "prezzi delle bustine, giri gratis esclusi",
    pace: "RITMO",
    paceValue: "{n}/min",
    paceNote: "bustine al minuto",
    buybacks: "VERSO I RIACQUISTI",
    buybacksNote: "al ritmo degli ultimi 30 giorni (stima)",
    list: "Ultime estrazioni",
    free: "Gratis",
    error: "Il feed in diretta non è disponibile al momento.",
    waiting: "In attesa della prossima bustina…",
  },
};
