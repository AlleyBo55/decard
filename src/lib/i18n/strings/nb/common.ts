import type { Strings } from "../en";
import type { Translation } from "../types";

export const common: Translation<Strings["common"]> = {
  "skip": "Hopp til innholdet",
  "language": "Språk",
  "search": "Søk",
  "close": "Lukk menyen",
  "more": "Mer",
  "guide": "Guide",
  "new": "Ny",
  "ripCta": "Åpne en pakke →",
  "homeLabel": "Decards forside",
  "mainNav": "Hovedmeny",
  "sourceCode": "Kildekoden til {name}",
  "newSuffix": ", ny",
  "tabs": {
    "/": "Hjem",
    "/scanner": "Skanner",
    "/rip": "Pakker",
    "/tape": "Live"
  },
  "groups": {
    "market": {
      "label": "Marked",
      "blurb": "Priser og handel"
    },
    "play": {
      "label": "Spill",
      "blurb": "Pakker og trekk"
    },
    "learn": {
      "label": "Lær"
    }
  },
  "nav": {
    "/tape": {
      "title": "Live-handel",
      "desc": "Alle salg, annonser og bud på kjeden"
    },
    "/sales": {
      "title": "Siste salg",
      "desc": "Gjennomførte salg etter kort, karakter og pris"
    },
    "/cards": {
      "title": "Kortkatalog",
      "desc": "Alle slabs til salgs etter navn, sett og karakter"
    },
    "/pokemon": {
      "title": "Pokémon-priser",
      "desc": "Prisguider for graderte kort, Pokémon for Pokémon"
    },
    "/cards-token": {
      "title": "$CARDS-tokenet",
      "desc": "Pris, tilbakekjøp og brenning"
    },
    "/rip": {
      "title": "Åpne pakker",
      "desc": "En ekte gradert slab i hver pakke"
    },
    "/gym": {
      "title": "Rip Gym",
      "desc": "Topplister og pakkeodds"
    },
    "/redeem": {
      "title": "Løs inn en slab",
      "desc": "Få det ekte kortet sendt hjem"
    },
    "/luck#live": {
      "title": "Gacha live",
      "desc": "Hvert gachatrekk idet det skjer"
    },
    "/luck": {
      "title": "Flaksanalyse",
      "desc": "Mål trekkene til en lommebok mot oddsen"
    },
    "/guide": {
      "title": "Guide",
      "desc": "Gradering, sjeldenhet og samlerslang"
    },
    "/topics": {
      "title": "Emner",
      "desc": "PSA, CGC, markedsplasser, sport og pakkeåpning"
    },
    "/tokenized-trading-cards": {
      "title": "Tokeniserte kort forklart",
      "desc": "Slik handles slabs i hvelv på Solana"
    }
  },
  "categories": {
    "Pokemon": "Pokémon",
    "One Piece": "One Piece",
    "Dragon Ball": "Dragon Ball",
    "Riftbound": "Riftbound",
    "Marvel": "Marvel",
    "Yu-Gi-Oh!": "Yu-Gi-Oh!",
    "Magic The Gathering": "Magic: The Gathering",
    "Lorcana": "Disney Lorcana",
    "DC": "DC Comics",
    "Gundam": "Gundam",
    "Naruto": "Naruto",
    "Union Arena": "Union Arena",
    "Soccer": "Fotball",
    "Basketball": "Basketball",
    "Football": "Amerikansk fotball",
    "Baseball": "Baseball",
    "Hockey": "Ishockey",
    "Vibes": "Vibes TCG"
  },
  "switcher": {
    "button": "Bytt språk. Nåværende: {name}",
    "kicker": "Språk",
    "title": "Velg språk",
    "hint": "Menyer, guider og sider bytter språk. Kortnavn, karakterer og priser vises slik de er lagt ut.",
    "current": "Du er her",
    "close": "Lukk"
  },
  "footer": {
    "blurb": "Skann dem alle. En gratis Pokédex med åpen kildekode for tokeniserte graderte kort på Solana, med live annonser fra Collector Crypt, Magic Eden og Slabz.",
    "explore": "Utforsk",
    "franchises": "Franchiser",
    "learn": "Lær",
    "openSource": "ÅPEN KILDEKODE · MIT",
    "repoCta": "Gi den en stjerne, fork den, send en PR ★",
    "builtInPublic": "BYGGET ÅPENT",
    "konami": "Psst: prøv ↑ ↑ ↓ ↓ ← → ← → B A.",
    "disclaimer": "Laget av fans og ikke tilknyttet Nintendo, Creatures, GAME FREAK, The Pokémon Company eller Collector Crypt. Data: Collector Crypts offentlige API og Solana RPC. Ikke finansiell rådgivning.",
    "links": {
      "/scanner": "Annonseskanner",
      "/cards": "Kortkatalog",
      "/scanner?orderBy=deal": "Beste kupp",
      "/tape": "Live-handel",
      "/rip": "Åpne kortpakker",
      "/gym": "Rip Gym-topplister",
      "/redeem": "Løs inn en slab",
      "/luck#live": "Gacha live",
      "/luck": "Flaksanalyse for trekk",
      "/cards-token": "$CARDS-tokenet",
      "/sales": "Siste salg",
      "/pokemon": "Pokémon-priser",
      "/cards#all": "Alle kort til salgs",
      "/tokenized-trading-cards": "Tokeniserte kort forklart",
      "/topics": "PSA, markedsplasser og emner",
      "/guide": "Trenerguiden",
      "/guide#grading": "Hva er gradering?",
      "/guide#buying-and-selling": "Kuppscore"
    }
  },
  "notFound": {
    "text": "En vill 404 dukket opp! Denne siden finnes ikke i Pokédexen.",
    "home": "Løp hjem",
    "scanner": "Åpne skanneren"
  },
  "error": {
    "text": "Å nei! Denne siden besvimte. En datakilde svarte ikke i tide.",
    "retry": "Bruk en Revive",
    "home": "Tilbake til forsiden"
  },
  "notice": "Kortnavn, karakterer og priser står på engelsk. Dette er den oversatte utgaven av det samme markedet."
};
