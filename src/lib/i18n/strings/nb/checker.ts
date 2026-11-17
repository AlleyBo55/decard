import type { Strings } from "../en";
import type { Translation } from "../types";

export const checker: Translation<Strings["checker"]> = {
  "breadcrumb": {
    "label": "Brødsmulesti",
    "home": "Hjem",
    "page": "Verdisjekk for Pokémon-kort"
  },
  "ld": {
    "about": ["Priser på Pokémon-kort", "Verdier for graderte samlekort", "PSA-gradering"],
    "currentPrices": "Aktuelle priser på graderte Pokémon-kort"
  },
  "hero": {
    "kicker": "Pokémon-priser · PSA-verdier · graderte kort",
    "h1": "Hva er Pokémon-kortet {accent}",
    "h1Accent": "ditt verdt?",
    "lede": "Søk opp et gradert Pokémon-kort etter navn, sett, kortnummer, sertifikatnummer eller Solana-mint. Sammenlign den aktuelle prisen med forsikringsverdien som referanse, og se deretter på bud, populasjon og markedshistorikk på kortets egen side.",
    "meta": "Gratis, bare til visning og uten innlogging · Gjennomgått {date} · Uavhengig dataverktøy, ikke en takst"
  },
  "search": {
    "label": "Hvilket Pokémon-kort vil du sjekke?",
    "hint": "Legg til sett, år, kortnummer og karakter når du vet dem. Presise søk skiller like trykk fra hverandre.",
    "placeholder": "f.eks. 1999 Charizard 4/102 PSA 10",
    "submit": "Sjekk live annonser",
    "example": "Søk etter {name}"
  },
  "prices": {
    "kicker": "Live øyeblikksbilde av markedet",
    "title": "Aktuelle priser på Pokémon-kort",
    "intro": "Nylige, troverdige USDC-annonser for graderte Pokémon-kort, hver merket med markedsplassen sin. Annonser og forsikringsverdier kommer fra Collector Crypts API, som dekker Collector Crypt og Magic Eden. Øyeblikksbildet mellomlagres i opptil fem minutter. Utlagte priser og forsikringsverdier er sammenligningsgrunnlag, ikke garanterte salgsverdier.",
    "unavailable": "Aktuelle eksempler er midlertidig utilgjengelige. Søket åpner fortsatt den live markedsskanneren.",
    "empty": "Aktuelle eksempler er midlertidig utilgjengelige. Verdisjekken og guidene for kortresearch fungerer fortsatt.",
    "cardAlt": "Forsiden av {name}",
    "asking": "PRIS",
    "insured": "FORSIKRET REF.",
    "underInsured": "Prisen er {pct}\u00a0% under forsikringsverdien",
    "venue": "På {venue}",
    "updated": "oppdatert {date}",
    "browseAll": "Bla gjennom alle live Pokémon-annonser",
    "guidesTitle": "Prisguider per Pokémon",
    "guide": "{name}-priser",
    "allGuides": "Alle prisguider for Pokémon"
  },
  "howTo": {
    "title": "Slik sjekker du verdien på et Pokémon-kort",
    "steps": [
      {
        "title": "1. Finn det eksakte kortet",
        "text": "Sjekk år, sett, kortnummer, språk, parallell, utgave og om kortet er signert. Et kjent figurnavn er ikke nok."
      },
      {
        "title": "2. Bekreft slaben",
        "text": "Sjekk graderingsselskapet, tallkarakteren og sertifikatnummeret. Sammenlign den fysiske etiketten med registeret til graderingsselskapet."
      },
      {
        "title": "3. Sammenlign reell etterspørsel",
        "text": "Nylige godtatte salg og aktive bud viser hva kjøpere har betalt eller kan komme til å betale. En usolgt pris viser bare hva én selger vil ha."
      },
      {
        "title": "4. Juster for knapphet og likviditet",
        "text": "Se på populasjonen i karakteren, eksemplarer gradert høyere, antall annonser og transaksjonsaktivitet. Knapphet betyr bare noe når samlere også vil ha kortet."
      }
    ],
    "cardPage": "Åpne en kortside på Decard for å samle identitet, karakter, sertifikat, pris, forsikringsverdi, beste bud, populasjonsrapport og dekodet historikk på kjeden på ett sted. Ingen enkeltfelt er en fullstendig verdivurdering."
  },
  "priceMeaning": {
    "title": "Pris, forsikringsverdi og markedsverdi er ikke det samme",
    "terms": "En {listingPrice} er det selgeren ber om akkurat nå. Den beviser ikke at en kjøper vil godta den. En {insuredValue} er en referanse som følger med kortet i hvelvet. Den er nyttig for sammenligning, men den er ingen garantert utbetaling, takst eller fremtidig salgspris.",
    "listingPrice": "utlagt pris",
    "insuredValue": "forsikringsverdi",
    "dealScore": "Decards kuppscore måler hvor langt under forsikringsverdien en USDC-pris ligger. Et kort forsikret for $100 og lagt ut for $80 får for eksempel 20. Det betyr «lagt ut 20\u00a0% under forsikringsreferansen», ikke «garantert 20\u00a0% fortjeneste».",
    "estimate": "Et sterkere anslag kombinerer nylige godtatte salg, aktive bud, sammenlignbare annonser, den eksakte karakteren og kortets populasjon. Slabs som sjelden handles, kan ha et stort gap mellom den synlige prisen og prisen en kjøper faktisk betaler."
  },
  "psa": {
    "title": "Hva bestemmer verdien på et PSA-gradert Pokémon-kort?",
    "grade": "PSA 10 er den høyeste vanlige tallkarakteren, men den gjør ikke alle kort dyre. Etterspørselen etter figuren, sett, trykkeår, språk, utgave, kortnummer, illustrasjon, sjeldenhet og populasjon påvirker alle verdien. En PSA 9 kan være sjeldnere eller mer ettertraktet enn en helt annen PSA 10.",
    "multiplier": "Det finnes ingen pålitelig, universell multiplikator fra ugradert til PSA 9 eller PSA 10. Graderingskostnad, risiko ved autentisering, usikkerhet om tilstand og antall eksemplarer med høy karakter varierer fra kort til kort. Sammenlign samme trykk og karakter når det er mulig.",
    "more": "Lær begrepene PSA, CGC, BGS og populasjon"
  },
  "limits": {
    "title": "Hva denne verdisjekken kan og ikke kan fortelle deg",
    "coverage": "Decard dekker profesjonelt graderte fysiske kort som er tokenisert på Solana og handles på Collector Crypt, Magic Eden og Slabz. Decard anslår ikke tilstanden til ugraderte kort, lover ikke ekthet utover registrene til graderingsselskapet og oppbevareren som vises, og spår ikke fremtidige priser.",
    "verify": "Tilgjengelighet på markedsplassene, bud, forsikringsverdier og vilkår for innløsning kan endre seg. Kontroller det aktuelle kortet, sertifikatet, annonsen, oppbevareren og vilkårene for uttak før du tar en beslutning. Decard er uavhengig, laget av fans og ikke tilknyttet PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt eller Magic Eden."
  },
  "faq": {
    "title": "Vanlige spørsmål om verdien på Pokémon-kort",
    "items": [
      {
        "q": "Hvor mye er Pokémon-kortet mitt verdt?",
        "a": "Finn først det eksakte trykket og tilstanden, og sammenlign så samme kort og karakter med godtatte salg, aktive bud og troverdige annonser. Et kortnavn alene gir ingen pålitelig verdi."
      },
      {
        "q": "Garanterer en PSA 10 høy verdi?",
        "a": "Nei. Karakteren beskriver tilstand og autentisering. Etterspørsel, sjeldenhet, populasjon og likviditet avgjør om samlere vil betale ekstra."
      },
      {
        "q": "Bør jeg bruke utlagte priser eller salgspriser?",
        "a": "Bruk begge, men legg mest vekt på nylige sammenlignbare salg og bud som kan godtas. Utlagte priser viser tilbudet og selgernes forventninger, også annonser som kanskje aldri blir solgt."
      },
      {
        "q": "Er Decard gratis?",
        "a": "Ja. Researchsidene er offentlige og bare til visning, og du trenger verken lommebok eller konto for å sjekke et kort."
      }
    ]
  },
  "aside": {
    "label": "Guide til verdisjekken",
    "onThisPage": "PÅ DENNE SIDEN",
    "toc": {
      "currentPrices": "Aktuelle priser",
      "howToCheck": "Slik sjekker du verdien",
      "priceMeaning": "Hva prisene betyr",
      "psaValue": "Verdi på PSA-kort",
      "limitations": "Begrensninger",
      "questions": "Spørsmål"
    },
    "directory": "Åpne katalogen over graderte kort",
    "tokenized": "Slik fungerer tokeniserte kort"
  }
};
