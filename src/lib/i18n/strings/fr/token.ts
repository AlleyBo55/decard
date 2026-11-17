import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  copy: {
    label: "Copier l’adresse du contrat CARDS",
    idle: "Copier",
    copied: "Copié ✓",
    selected: "Sélectionnée",
  },
  ticker: {
    price: "PRIX",
    srPrice: "Prix de CARDS",
    unavailable: "Indisponible",
    unit: "24 h",
    updated: "Mis à jour à {time}",
  },
  countdown: {
    label: "Temps restant avant le déblocage",
    units: { days: "JOURS", hours: "HEURES", minutes: "MIN", seconds: "SEC" },
    words: {
      days: { one: "jour", many: "jours", other: "jours" },
      hours: { one: "heure", many: "heures", other: "heures" },
      minutes: { one: "minute", many: "minutes", other: "minutes" },
      seconds: { one: "seconde", many: "secondes", other: "secondes" },
    },
    done: "DÉBLOQUÉ !",
  },
  live: {
    packs: "BOOSTERS OUVERTS",
    inLastSeconds: { one: "ces {n} dernières secondes", many: "ces {n} dernières secondes", other: "ces {n} dernières secondes" },
    inLastMinutes: { one: "ces {n} dernières minutes", many: "ces {n} dernières minutes", other: "ces {n} dernières minutes" },
    noWindow: "sur la période du flux",
    dollars: "DOLLARS DÉPENSÉS",
    dollarsNote: "prix des boosters, tours gratuits exclus",
    pace: "RYTHME",
    paceValue: "{n}/min",
    paceNote: "boosters par minute",
    buybacks: "POUR LES RACHATS",
    buybacksNote: "au rythme des 30 derniers jours (estimation)",
    list: "Derniers tirages",
    free: "Gratuit",
    error: "Le flux en direct est indisponible pour le moment.",
    waiting: "En attente du prochain booster…",
  },
};
