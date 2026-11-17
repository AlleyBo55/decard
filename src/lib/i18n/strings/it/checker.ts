import type { Strings } from "../en";
import type { Translation } from "../types";
export const checker: Translation<Strings["checker"]> = {
  breadcrumb: {
    label: "Percorso di navigazione",
    home: "Home",
    page: "Valore delle carte Pokémon",
  },
  ld: {
    about: ["Prezzi delle carte Pokémon", "Valore delle carte collezionabili gradate", "Grading PSA"],
    currentPrices: "Prezzi richiesti attuali delle carte Pokémon gradate",
  },
  hero: {
    kicker: "Prezzi Pokémon · valori PSA · carte gradate",
    h1: "Quanto vale la tua {accent}",
    h1Accent: "carta Pokémon?",
    lede: "Cerca una carta Pokémon gradata per nome, set, numero della carta, numero di certificazione o mint Solana. Confronta il prezzo richiesto attuale con il riferimento assicurato, poi esamina offerte, popolazione e storico di mercato nella pagina della singola carta.",
    meta: "Gratis, in sola lettura e senza login · Revisionato il {date} · Strumento di dati indipendente, non una perizia",
  },
  search: {
    label: "Quale carta Pokémon vuoi controllare?",
    hint: "Aggiungi set, anno, numero della carta e voto se li conosci. Le ricerche precise separano le stampe simili.",
    placeholder: "es. 1999 Charizard 4/102 PSA 10",
    submit: "Controlla gli annunci",
    example: "Cerca {name}",
  },
  prices: {
    kicker: "Istantanea del mercato in tempo reale",
    title: "Prezzi richiesti attuali delle carte Pokémon",
    intro: "Annunci recenti e credibili in USDC di carte Pokémon gradate, ognuno con il suo marketplace. Annunci e valori assicurati arrivano dall'API di Collector Crypt, che copre Collector Crypt e Magic Eden. Questa istantanea resta in cache fino a cinque minuti. Prezzi richiesti e riferimenti assicurati servono per confrontare, non sono valori di vendita garantiti.",
    unavailable: "Gli esempi attuali non sono disponibili al momento. La ricerca apre comunque lo scanner del mercato in tempo reale.",
    empty: "Gli esempi attuali non sono disponibili al momento. Il controllo del valore e le guide sulle carte funzionano comunque.",
    cardAlt: "Fronte di {name}",
    asking: "RICHIESTO",
    insured: "RIF. ASSICURATO",
    underInsured: "Prezzo {pct}% sotto il valore assicurato",
    venue: "Su {venue}",
    updated: "aggiornato il {date}",
    browseAll: "Sfoglia tutti gli annunci Pokémon in tempo reale",
    guidesTitle: "Guide ai prezzi per Pokémon",
    guide: "Prezzi di {name}",
    allGuides: "Tutte le guide ai prezzi Pokémon",
  },
  howTo: {
    title: "Come controllare il valore di una carta Pokémon",
    steps: [
      {
        title: "1. Identifica la carta esatta",
        text: "Verifica anno, set, numero della carta, lingua, parallela, edizione e presenza di autografo. Il nome di un personaggio famoso non basta.",
      },
      {
        title: "2. Conferma lo slab",
        text: "Controlla l'ente di grading, il voto numerico e il numero di certificazione. Confronta l'etichetta fisica con il registro dell'ente.",
      },
      {
        title: "3. Confronta la domanda concreta",
        text: "Le vendite accettate di recente e le offerte attive mostrano quanto gli acquirenti hanno pagato o potrebbero pagare. Un prezzo richiesto rimasto invenduto mostra solo quanto vuole un venditore.",
      },
      {
        title: "4. Tieni conto di rarità e liquidità",
        text: "Valuta la popolazione del voto, le copie con voto superiore, la profondità degli annunci e l'attività delle transazioni. La rarità conta solo se i collezionisti vogliono anche la carta.",
      },
    ],
    cardPage: "Apri la pagina di una singola carta su Decard per avere insieme identità, voto, certificato, prezzo richiesto, valore assicurato, offerta migliore, report di popolazione e cronologia on-chain decodificata. Nessun dato da solo è una valutazione completa.",
  },
  priceMeaning: {
    title: "Prezzo richiesto, valore assicurato e valore di mercato sono cose diverse",
    terms: "Il {listingPrice} è la richiesta attuale del venditore. Non prova che un acquirente lo accetterà. Il {insuredValue} è un riferimento fornito con la carta custodita nel caveau. È utile per confrontare, ma non è un pagamento garantito, una perizia o un prezzo di vendita futuro.",
    listingPrice: "prezzo dell'annuncio",
    insuredValue: "valore assicurato",
    dealScore: "Il punteggio affare di Decard misura quanto un prezzo richiesto in USDC sta sotto il valore assicurato. Per esempio, una carta assicurata per $100 e in vendita a $80 fa 20. Significa “in vendita al 20% sotto il riferimento assicurato”, non “guadagno garantito del 20%”.",
    estimate: "Una stima più solida combina vendite accettate di recente, offerte attive, annunci comparabili, il voto esatto e la popolazione della carta. Gli slab poco scambiati possono avere un grande divario tra il prezzo richiesto visibile e il prezzo che un acquirente pagherà davvero.",
  },
  psa: {
    title: "Cosa determina il valore di una carta Pokémon PSA?",
    grade: "PSA 10 è il voto numerico standard più alto, ma non rende costosa ogni carta. Domanda del personaggio, set, anno di stampa, lingua, edizione, numero della carta, illustrazione, rarità e popolazione influiscono tutti sul valore. Un PSA 9 può essere più raro o più collezionato di un PSA 10 di un'altra carta.",
    multiplier: "Non esiste un moltiplicatore universale affidabile da carta non gradata a PSA 9 o PSA 10. Costo del grading, rischio di autenticazione, incertezza sulle condizioni e numero di copie con voto alto cambiano da carta a carta. Quando puoi, confronta la stessa stampa con lo stesso voto.",
    more: "Impara i termini su PSA, CGC, BGS e popolazione",
  },
  limits: {
    title: "Cosa può e non può dirti questo strumento",
    coverage: "Decard copre carte fisiche gradate da professionisti, tokenizzate su Solana e scambiate su Collector Crypt, Magic Eden e Slabz. Non stima le condizioni delle carte non gradate, non promette autenticità oltre i registri mostrati dell'ente di grading e del custode, e non prevede prezzi futuri.",
    verify: "Disponibilità sui marketplace, offerte, valori assicurati e condizioni di riscatto possono cambiare. Prima di decidere, verifica carta, certificazione, annuncio, custode e condizioni di ritiro attuali. Decard è indipendente, fatto da fan e non affiliato a PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt o Magic Eden.",
  },
  faq: {
    title: "Domande frequenti sul valore delle carte Pokémon",
    items: [
      {
        q: "Quanto vale la mia carta Pokémon?",
        a: "Prima identifica la stampa esatta e le condizioni, poi confronta la stessa carta con lo stesso voto usando vendite accettate, offerte attive e annunci credibili. Il solo nome della carta non basta per un valore affidabile.",
      },
      {
        q: "Un voto PSA 10 garantisce un valore alto?",
        a: "No. Il voto descrive condizioni e autenticazione. Domanda, rarità, popolazione e liquidità decidono se i collezionisti pagheranno un sovrapprezzo.",
      },
      {
        q: "Meglio guardare i prezzi richiesti o quelli di vendita?",
        a: "Guardali entrambi, ma dai più peso alle vendite recenti comparabili e alle offerte concrete. I prezzi richiesti mostrano quante carte ci sono in vendita e cosa si aspettano i venditori, compresi annunci che potrebbero non vendere mai.",
      },
      {
        q: "Decard è gratis?",
        a: "Sì. Le pagine di ricerca sono pubbliche e in sola lettura, e per controllare una carta non serve un wallet né un account.",
      },
    ],
  },
  aside: {
    label: "Guida al valore delle carte",
    onThisPage: "IN QUESTA PAGINA",
    toc: {
      currentPrices: "Prezzi attuali",
      howToCheck: "Come controllare il valore",
      priceMeaning: "Cosa significano i prezzi",
      psaValue: "Valore delle carte PSA",
      limitations: "Limiti",
      questions: "Domande",
    },
    directory: "Apri il catalogo delle carte gradate",
    tokenized: "Come funzionano le carte tokenizzate",
  },
};
