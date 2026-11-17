import type { Strings } from "../en";
import type { Translation } from "../types";
export const learn: Translation<Strings["learn"]> = {
  crumbs: {
    label: "Percorso di navigazione",
    home: "Home",
    topics: "Argomenti",
  },
  guide: {
    kicker: "Guida dell'Allenatore",
    h1: "Il tuo Pokédex delle {accent}",
    h1Accent: "carte gradate.",
    lede: {
      one: "{n} voce su tutto ciò che un nuovo Allenatore incontra su Decard, dal grading e dai report di popolazione alle offerte e ai caveau, più il gergo da collezionisti e crypto che vedi su X. Parole semplici, nessun termine tecnico lasciato senza spiegazione.",
      many: "{n} voci su tutto ciò che un nuovo Allenatore incontra su Decard, dal grading e dai report di popolazione alle offerte e ai caveau, più il gergo da collezionisti e crypto che vedi su X. Parole semplici, nessun termine tecnico lasciato senza spiegazione.",
      other:
        "{n} voci su tutto ciò che un nuovo Allenatore incontra su Decard, dal grading e dai report di popolazione alle offerte e ai caveau, più il gergo da collezionisti e crypto che vedi su X. Parole semplici, nessun termine tecnico lasciato senza spiegazione.",
    },
    hello: "Ciao a tutti! Benvenuti nel mondo delle carte gradate.",
    explainer: {
      title: "Nuovo alle carte on-chain?",
      text: "Comincia da custodia nel caveau, proprietà tokenizzata, riscatto, punteggio affare e rischi.",
      cta: "Leggi la guida in 10 minuti",
    },
    outro: {
      title: "Pronto a metterlo in pratica?",
      text: "Apri lo scanner, ordina per Miglior affare e trova una carta scambiata sotto il suo valore assicurato.",
      cta: "Apri lo scanner",
    },
    glossaryName: "Glossario Decard dei termini su carte gradate, collezionismo e crypto",
    question: "Cosa significa {term}?",
  },
  book: {
    search: "Cerca nella guida",
    index: "Indice della guida",
    empty: "Nessuna voce corrisponde a “{query}”.",
  },
  topics: {
    kicker: "Indice · enti di grading, marketplace, franchise",
    h1: "Tutto ciò a cui Decard {accent}",
    h1Accent: "dà davvero un prezzo.",
    lede: "Prezzi richiesti in tempo reale per le carte gradate custodite nei caveau, più guide in parole semplici sugli enti di grading e sui marketplace che spesso si confondono tra loro. Pagine indicizzabili in tutto il mondo. Un personaggio, una squadra o una celebrità senza slab nel catalogo non riceve una pagina vuota.",
    guides: "Guide",
    franchises: "Franchise",
    franchisesNote: "Ogni hub mostra i prezzi richiesti in tempo reale, voto per voto, di quel gioco, fumetto, manga o sport.",
    pokemon: "Pokémon, per personaggio",
    pokemonNote: "I Pokémon con abbastanza annunci gradati da avere una guida ai prezzi tutta loro. Tutti gli altri sono nell'hub Pokémon.",
    tools: "Strumenti",
    toolLinks: {
      scanner: "Scanner degli annunci",
      cards: "Catalogo delle carte",
      checker: "Valore delle carte Pokémon",
      sales: "Vendite recenti",
      tape: "Operazioni in diretta",
      rip: "Apri bustine",
      redeem: "Riscatta uno slab",
      guide: "Guida dell'Allenatore",
      explainer: "Carte tokenizzate spiegate",
      token: "Token $CARDS",
    },
    hubItem: "Carte {name}",
    pokemonItem: "Prezzi delle carte {name}",
  },
  topic: {
    updated: "Aggiornato il {date}. Indipendente, fatto da fan, non è consulenza finanziaria.",
    faq: "Domande",
    more: "Continua",
  },
};
