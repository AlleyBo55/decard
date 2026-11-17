import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  copy: {
    label: "Kopieer het contractadres van CARDS",
    idle: "Kopiëren",
    copied: "Gekopieerd ✓",
    selected: "Geselecteerd",
  },
  ticker: {
    price: "PRIJS",
    srPrice: "CARDS-prijs",
    unavailable: "Niet beschikbaar",
    unit: "24u",
    updated: "Bijgewerkt {time}",
  },
  countdown: {
    label: "Resterende tijd tot de unlock",
    units: { days: "DAGEN", hours: "UUR", minutes: "MIN", seconds: "SEC" },
    words: {
      days: { one: "dag", other: "dagen" },
      hours: { one: "uur", other: "uur" },
      minutes: { one: "minuut", other: "minuten" },
      seconds: { one: "seconde", other: "seconden" },
    },
    done: "VRIJGEGEVEN!",
  },
  live: {
    packs: "PACKS GEOPEND",
    inLastSeconds: { other: "in de laatste {n}s" },
    inLastMinutes: { other: "in de laatste {n} min" },
    noWindow: "binnen het venster van de feed",
    dollars: "DOLLARS AAN PACKS",
    dollarsNote: "packprijzen, gratis spins niet meegeteld",
    pace: "TEMPO",
    paceValue: "{n}/min",
    paceNote: "packs per minuut",
    buybacks: "NAAR TERUGKOPEN",
    buybacksNote: "tegen het tarief van de laatste 30 dagen (schatting)",
    list: "Nieuwste pulls",
    free: "Gratis",
    error: "De live feed is nu niet beschikbaar.",
    waiting: "Wachten op het volgende pack…",
  },
};
