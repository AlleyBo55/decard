import type { Strings } from "../en";
import type { Translation } from "../types";

export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · dex for graderte kort",
  "live": "LIVE",
  "hero": {
    "lead": "",
    "scan": "Skann",
    "tail": "dem alle."
  },
  "lede": "Live annonser fra Collector Crypt, Magic Eden og Slabz, kuppscore og alt som skjer i hver lommebok, for tokeniserte graderte kort på Solana.",
  "newKicker": "Nytt på Decard",
  "newTitle": "Åpne pakker, behold ekte slabs.",
  "typeKicker": "Velg din type",
  "typeTitle": "Bla etter franchise.",
  "typeSub": "Graderte Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, sport og mer: live priser per karakter for hver slab til salgs på Collector Crypt, Magic Eden og Slabz.",
  "faqKicker": "Spørsmål fra trenere",
  "faqTitle": "Spørsmål og svar.",
  "tipTitle": "PROFESSORENS TIPS",
  "tip": "En PSA 10 med en populasjon på 12 er noe helt annet enn en PSA 10 som alle eier. Før du kjøper, sjekk populasjonsrapporten, gem-raten og hvor langt prisen ligger fra forsikringsverdien.",
  "guideBtn": "Les Trenerguiden",
  "dealBtn": "Finn et kupp",
  "title": "Åpne pakker, skann markedet og løs inn graderte kort på Solana",
  "description": "Åpne pakker med ekte PSA-, CGC- og BGS-slabs, finn kupp på Collector Crypt, Magic Eden og Slabz, og få det fysiske kortet sendt hjem. Pokémon, One Piece, sport og mer, med live-handel og lommeboksporing.",
  "faq": [
    {
      "q": "Hva er Decard?",
      "a": "En gratis skanner og et sporingsverktøy med åpen kildekode for tokeniserte graderte kort på Solana. Decard rangerer live annonser fra Collector Crypt, Magic Eden og Slabz etter kuppscore, dekoder hvert salg, hver annonse og hvert bud på kjeden, og viser populasjonsrapporter og kortene i en hvilken som helst lommebok."
    },
    {
      "q": "Hva er en kuppscore?",
      "a": "Hvor langt under kortets forsikringsverdi en USDC-annonse ligger, fra 0 til 100. Et kort forsikret for $100 og lagt ut for $80 får 20. Sorterer du skanneren etter beste kupp, kommer de største rabattene først."
    },
    {
      "q": "Er Decard en del av Collector Crypt?",
      "a": "Nei. Decard er uavhengig og laget av fans. Det leser Collector Crypts offentlige API for markedsplassen og Solana-blokkjeden, og lenker videre til Collector Crypt, Magic Eden og Slabz når du vil kjøpe."
    },
    {
      "q": "Må jeg registrere meg eller koble til en lommebok?",
      "a": "Ikke for å se deg rundt. Skanneren, live-handelen og sporingsverktøyene er bare til visning: ingen konto, ingen tilkoblet lommebok og ingen API-nøkkel. Lim inn en hvilken som helst Solana-adresse for å se de graderte kortene og markedsaktiviteten til den lommeboken. Koble til en lommebok bare hvis du vil åpne pakker."
    },
    {
      "q": "Hvilke kort dekker Decard?",
      "a": "Alle tokeniserte graderte kort som er lagt ut på Collector Crypt, Magic Eden eller Slabz: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam og sportskort, gradert av PSA, CGC, Beckett (BGS) og andre."
    },
    {
      "q": "Hvor kommer dataene fra?",
      "a": "Annonser, forsikringsverdier, bud og populasjonsrapporter kommer fra Collector Crypts offentlige API. Live-handelen dekodes fra Collector Crypts markedsplassprogram på Solana. Det finnes ingen database: hvert tall leses live."
    }
  ],
  "more": [
    { "href": "/pokemon-card-value-checker", "label": "Sjekk verdien på et Pokémon-kort" },
    { "href": "/pokemon", "label": "Pokémon-priser per Pokémon" },
    { "href": "/luck", "label": "Sjekk flaksen i et gachatrekk" },
    { "href": "/cards-token", "label": "$CARDS-pris, tilbakekjøp og brenning" },
    { "href": "/sales", "label": "Siste verifiserte salg" },
    { "href": "/cards", "label": "Bla gjennom alle kort til salgs" },
    { "href": "/tokenized-trading-cards", "label": "Slik fungerer tokeniserte samlekort" },
    { "href": "/guide", "label": "Alle begrepene i Trenerguiden" }
  ],
  "stats": {
    "listed": "Kort til salgs",
    "floor": "Laveste pris",
    "top": "Dyreste annonse"
  },
  "catch": {
    "unlisted": "Ikke til salgs",
    "blip": "{card}, {price}",
    "blipUnder": "{card}, {price}, {under}\u00a0% under forsikringsverdien",
    "throw": "Kast en Poké Ball for å fange et kupp",
    "throw3d": "Kast en Poké Ball for å fange et tilfeldig kupp",
    "caught": "Der satt den! {card} ble fanget!",
    "insured": "forsikret {value}",
    "under": "{pct}\u00a0% under",
    "view": "Se kortet",
    "again": "Kast igjen",
    "shaking": "Vipp … vipp …",
    "prompt": "Trykk på ballen for å fange et kupp",
    "promptAgain": "Trykk på ballen for å kaste igjen"
  },
  "ticker": {
    "label": "Nettopp lagt ut",
    "loading": "Leser markedet…",
    "empty": "Ingen nye annonser de siste minuttene."
  },
  "ripCard": {
    "title": "Åpne pakker med graderte kort.",
    "hook": "En ekte {psa}-, {bgs}- eller {cgc}-slab i hver pakke.",
    "body": "Pokémon, One Piece, Dragon Ball, Lorcana og sport, hver med sin egen avsløring. Behold slaben, eller selg den tilbake med ett trykk.",
    "cta": "Åpne en pakke",
    "gym": "{gym} topplister og pakkeodds",
    "gymName": "Rip Gym:",
    "pulled": "Nettopp trukket",
    "pullsLabel": "Siste trekk på Decard",
    "idle": "Hver pakke har en ekte gradert slab. Åpne en, så havner trekket ditt her."
  },
  "redeemCard": {
    "eyebrow": "Løs inn",
    "title": "Få slaben din {em}",
    "titleEm": "hjem.",
    "body": "Trakk du en godbit? Bytt NFT-en mot den ekte graderte slaben, sendt fra hvelvet rett hjem til deg.",
    "cta": "Løs inn et kort",
    "vault": "Hvelv",
    "town": "Byen din"
  },
  "gachaCard": {
    "live": "Gacha live",
    "title": "Pakker som åpnes akkurat nå.",
    "body": "Hver Collector Crypt-pakke som åpnes, idet det skjer.",
    "cta": "Se gachaen live",
    "score": "Sjekk flaksen min",
    "counting": "Teller trekk…",
    "perMinute": {
      "one": "{n} trekk i minuttet",
      "other": "{n} trekk i minuttet"
    },
    "biggest": "største hit nylig {multiple}, {card} {value}"
  },
  "market": {
    "kicker": "På markedet",
    "tabsLabel": "Annonser",
    "tabs": {
      "deals": {
        "label": "Beste kupp",
        "title": "Under forsikringsverdi, {em}",
        "em": "rangert.",
        "sub": "Live USDC-annonser sortert etter hvor langt under hvelvets forsikringsverdi de ligger. Jo fullere HP-baren er, desto større er rabatten.",
        "more": "Åpne skanneren"
      },
      "new": {
        "label": "Nettopp lagt ut",
        "title": "Ferskt på markedet.",
        "sub": "De nyeste annonsene på Collector Crypt og Magic Eden, idet de kommer.",
        "more": "Se alle nye"
      },
      "top": {
        "label": "Øverste hylle",
        "title": "De dyreste kortene til salgs.",
        "sub": "Drømmekort og Gem Mint-kort, sortert fra den høyeste prisen og nedover.",
        "more": "Se øverste hylle"
      }
    }
  },
  "onChain": {
    "kicker": "Live på kjeden",
    "title": "Hver bevegelse, idet den skjer.",
    "sub": "Dekodet rett fra Collector Crypts markedsplassprogram: hvert salg, hver annonse og hvert bud.",
    "more": "All live-handel",
    "gameBoy": "A og B blar i hendelsene, SELECT skjuler botter, START åpner all live-handel.",
    "moves": "Siste bevegelser",
    "quiet": "Markedet er stille akkurat nå.",
    "bidsTitle": "Hete bud",
    "bidsSub": "Kort som får bud akkurat nå, med beste live bud.",
    "bids": {
      "one": "{n} bud",
      "other": "{n} bud"
    },
    "ofInsured": "{pct}\u00a0% av fors.",
    "noBids": "Ingen live bud i det siste tidsvinduet."
  },
  "offline": {
    "title": "DEX-en mistet signalet et øyeblikk.",
    "retry": "Prøv igjen",
    "text": "Markedsdataene svarte ikke. De kommer som regel tilbake i løpet av noen sekunder."
  },
  "snapshot": {
    "kicker": "Markedsoversikt",
    "title": "Velg en type, les markedet.",
    "sub": "Antall kort til salgs, laveste pris og dyreste annonse for hver kategori, på Collector Crypt, Magic Eden og Slabz."
  },
  "dex": {
    "allVenues": "Alle markedsplasser",
    "venue": "Markedsplass",
    "no": "Nr. {no}",
    "type": "Type: {type}",
    "listed": "Til salgs",
    "floor": "Laveste pris",
    "top": "Dyreste annonse",
    "floorCard": "Billigste kort: {card} til {price}",
    "types": {
      "electric": "Elektrisk",
      "water": "Vann",
      "fire": "Ild",
      "grass": "Gress",
      "psychic": "Psykisk",
      "fighting": "Kamp",
      "dragon": "Drage",
      "fairy": "Fe",
      "ghost": "Spøkelse",
      "dark": "Mørk",
      "steel": "Stål",
      "ground": "Bakke",
      "flying": "Flygende",
      "normal": "Normal"
    }
  }
};
