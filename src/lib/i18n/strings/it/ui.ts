import type { Strings } from "../en";
import type { Translation } from "../types";

/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  sale: "Preso! {card} catturato per {price}!",
  saleNoPrice: "Preso! {card} catturato!",
  bidTaken: "{card} accetta un'offerta di {price}!",
  bidTakenNoPrice: "{card} accetta un'offerta!",
  listed: "Appare un {card} selvatico sul mercato!",
  reprice: "{card} cambia prezzo!",
  delist: "{card} è fuggito dal mercato!",
  newBid: "L'Allenatore {trainer} lancia un'offerta su {card}!",
  bidEdit: "L'Allenatore {trainer} modifica un'offerta su {card}.",
  bidPulled: "L'Allenatore {trainer} richiama un'offerta su {card}.",
  other: "Qualcosa è successo a {card}...",
};

export const ui: Translation<Strings["ui"]> = {
  verbs: {
    SALE: "VENDITA",
    "BID TAKEN": "OFFERTA ACCETTATA",
    REPRICE: "NUOVO PREZZO",
    DELIST: "ANNUNCIO RIMOSSO",
    LISTED: "IN VENDITA",
    "NEW BID": "NUOVA OFFERTA",
    "BID EDIT": "OFFERTA MODIFICATA",
    "BID PULLED": "OFFERTA RITIRATA",
  },
  ripTiers: {
    common: { label: "Comune", ballName: "Poké Ball", cry: "Preso!" },
    rare: { label: "Rara", ballName: "Mega Ball", cry: "Bella presa!" },
    epic: { label: "Epica", ballName: "Ultra Ball", cry: "Ultra presa!" },
    legendary: { label: "Leggendaria", ballName: "Master Ball", cry: "Appare un leggendario!" },
  },
  gachaTiers: {
    common: "Comune",
    uncommon: "Non comune",
    rare: "Rara",
    epic: "Epica",
  },
  primitives: {
    otherCategory: "Altro",
    deal: "AFFARE",
    dealScore: "Punteggio affare {score}/100",
    loading: "Caricamento",
  },
  unknownCard: "Carta sconosciuta",
  cardTile: {
    unlisted: "Non in vendita",
    insured: "assic. {value}",
  },
  activity: {
    unresolvedCard: "Carta non identificata",
    fromWallet: "da {wallet}",
    byWallet: "da {wallet}",
    currentHolder: "possessore attuale · {address}",
    bot: "BOT ×{n}",
    botOffers: {
      one: "{n} offerta in una sola transazione",
      many: "{n} offerte in una sola transazione",
      other: "{n} offerte in una sola transazione",
    },
  },
  search: {
    placeholderCompact: "Cerca carte o wallet",
    placeholder: "Cerca una carta o incolla un indirizzo wallet",
    label: "Cerca carte o wallet",
    button: "Cerca",
    searching: "Ricerca in corso...",
    empty: "Nessuna carta trovata",
    seeAll: { one: "Vedi {n} risultato", many: "Vedi tutti i {n} risultati", other: "Vedi tutti i {n} risultati" },
  },
  rail: { left: "Scorri a sinistra", right: "Scorri a destra" },
  konami: { on: "Modalità DMG attiva! Bentornato nel 1996.", off: "Di nuovo a colori." },
  gameBoy: {
    modes: { all: "TUTTI", trainers: "NO BOT", sales: "VENDITE" },
    booting: "Avvio del DEX...",
    empty: "Nessun Allenatore nei paraggi. In attesa della prossima mossa...",
    live: "DIRETTA",
    device: {
      power: "◀ OFF · ON ▶",
      stripe: "LIVE ON-CHAIN · DOT MATRIX",
      battery: "BATTERY",
      model: "POCKET · {mode}",
      select: "SELECT",
      start: "START",
    },
    aria: {
      device: "Game Boy del mercato in diretta. Usa le frecce per scorrere gli eventi e Invio per aprire una carta.",
      previous: "Evento precedente",
      next: "Evento successivo",
      b: "B: evento precedente",
      a: "A: evento successivo",
      select: "Select: il filtro è {mode}",
      start: "Start: apri tutte le operazioni",
    },
    battle,
  },
};
