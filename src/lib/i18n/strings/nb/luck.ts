import type { Strings } from "../en";
import type { Translation } from "../types";

export const luck: Translation<Strings["luck"]> = {
  "cardFront": "Forsiden av {name}",
  "tier": "Nivå: {tier}",
  "score": "Flaksscore {score}/100",
  "bar": "Flaks",
  "retry": "Prøv igjen",
  "share": {
    "shared": "Delt",
    "copied": "Lenke kopiert",
    "failed": "Delingen mislyktes. Kopier URL-en fra adressefeltet."
  },
  "page": {
    "breadcrumb": "Brødsmulesti",
    "crumb": "Gacha",
    "kicker": "Gachasenter",
    "h1": "Gacha live, odds nå og {accent}",
    "h1Accent": "trekkflaks.",
    "lede": "Se Collector Crypt-pakker åpnes idet det skjer, sjekk hva neste trekk kan gi før du kjøper, og mål ethvert trekk mot nøyaktig det kortutvalget og den nivåoddsen det ble trukket fra. Lim inn en lommebok for å måle alle trekkene den har åpnet, eller ett pakkememo eller en offisiell verifiseringslenke.",
    "jumpLabel": "På denne siden",
    "jump": {
      "live": "Trekk live",
      "hallOfFame": "Hall of Fame",
      "odds": "Odds nå"
    },
    "note": "Kun Collector Crypt på Solana. Verdiene er forsikringsverdier, ikke salgspriser, avkastning eller fortjeneste. Hvert trekk er uavhengig, så en rekke med uflaks gjør ikke neste pakke heldigere.",
    "liveLabel": "Gacha live"
  },
  "analyzer": {
    "kicker": "Pakkebevis",
    "title": "Analyser trekkene dine",
    "sub": "Lim inn en Solana-lommebok for å måle alle pakketrekkene den har åpnet, eller ett pakkememo (cc-…) eller en offisiell verifiseringslenke fra Collector Crypt.",
    "label": "Lommebokadresse, pakkememo eller verifiseringslenke",
    "placeholder": "Lim inn lommeboken din eller et pakkememo (cc-…)",
    "submit": "Analyser flaksen",
    "help": "Bare den normaliserte lommebokadressen eller pakkememoet sendes. Resultatlenken kan bokmerkes eller deles.",
    "example": "Prøv Collector Crypts dokumenterte eksempel →",
    "invalidTitle": "Skriv inn en lommebokadresse eller et pakkememo fra Collector Crypt.",
    "invalidBody": "Lim inn en Solana-lommebokadresse, et memo som starter med cc- og har hele ID-en, eller den offisielle verifiseringslenken som inneholder det.",
    "loading": "Sjekker det historiske trekket"
  },
  "errors": {
    "legacy": {
      "title": "Dette eldre trekket kan ikke måles.",
      "body": "Eldre trekk uten et bevisbart historisk øyeblikksbilde av kortutvalget har ikke nok data til en rettferdig sammenligning."
    },
    "pending": {
      "title": "Dette trekket er ikke klart ennå.",
      "body": "Collector Crypt har ikke publisert alle verifiseringsdataene for dette trekket. Prøv dette memoet igjen senere."
    },
    "unverified": {
      "title": "Collector Crypt verifiserte ikke dette trekket.",
      "body": "Decard viser ikke en flaksscore med mindre det offisielle utvalgsbeviset blir verifisert."
    },
    "incomplete": {
      "title": "Dette trekket mangler fullstendige historiske data.",
      "body": "Det lagrede kortutvalget eller oddsen er ufullstendig, så Decard kan ikke beregne en flaksscore som holder vann."
    },
    "badMemo": {
      "title": "Det pakkememoet kunne ikke analyseres.",
      "body": "Sjekk at det hører til et Collector Crypt-trekk på Solana, og lim inn memoet eller den offisielle verifiseringslenken på nytt."
    },
    "unavailable": {
      "title": "Datakilden for flaksanalysen er utilgjengelig.",
      "body": "Trekkdataene fra kilden kunne ikke lastes inn. Memoet ditt ligger fortsatt i URL-en, så du kan trygt prøve igjen."
    }
  },
  "result": {
    "verified": "Utvalget er verifisert",
    "percentile": "Historisk persentil",
    "beat": "Du slo {pct} av mulige trekk.",
    "matchOrBeat": "{pct} kunne tangert eller slått det.",
    "metrics": {
      "insured": "Forsikringsverdi",
      "insuredDetail": "Historisk forhåndslåst bladverdi",
      "tierChance": "Sjanse for nivået",
      "tie": "Sjanse for nøyaktig lik verdi",
      "tieDetail": "Samme forsikringsverdi",
      "candidates": "Kandidater i nivået",
      "candidatesDetail": "Fryst kandidatutvalg",
      "available": "Tilgjengelig ved trekket",
      "availableDetail": "Kunne velges",
      "unavailable": "Utilgjengelig ved trekket",
      "unavailableDetail": "Allerede fjernet",
      "basis": "Grunnlag for oddsen",
      "committed": "Forhåndslåste terskler",
      "published": "Publisert maskinodds",
      "poolVersion": "Versjon av kortutvalget",
      "pulledAt": "Trukket",
      "notReported": "Ikke oppgitt"
    },
    "note": "Forsikringsverdien beskriver det historiske pakkebeviset. Den er ikke en aktuell markedspris eller et anslag på fortjeneste.",
    "noteCommitted": "Nivåoddsen ble låst sammen med denne pakken.",
    "notePublished": "Denne eldre pakken viser publisert maskinodds, ikke forhåndslåste terskler per pakke.",
    "cardPage": "Kortside →",
    "wallet": "Lommebok {wallet} →",
    "walletLabel": "Åpne lommeboken {wallet}",
    "solscan": "Transaksjon på Solscan ↗",
    "verifier": "Offisiell verifisering ↗",
    "share": "Del trekket",
    "shareLabel": "Del flaksresultatet for {name}",
    "shareTitle": "Flaks i gachatrekk: {score}/100",
    "shareText": "{name} slo {pct} av mulige trekk i sitt historiske kortutvalg.",
    "howTitle": "Slik beregnes scoren",
    "how": [
      "Flaksscore = sjansen for et trekk med lavere forsikringsverdi + halve sjansen for et trekk med lik verdi. Nivåoddsen brukes først, deretter sammenlignes kortene i nivået som ble trukket, ut fra kortutvalget som var tilgjengelig da.",
      "Like forsikringsverdier regnes som uavgjort. Hvert uavgjort resultat teller som en halv seier i midtrang-persentilen, i stedet for å bli regnet som et kort dette trekket slo."
    ]
  },
  "wallet": {
    "pulls": { "one": "{n} trekk", "other": "{n} trekk" },
    "kicker": "Trekkflaks for lommebok",
    "title": "Lommebok {wallet}",
    "average": "Gjennomsnittlig flaksscore",
    "score": "Lommebokflaks {score}/100",
    "scorePending": "Lommebokflaks …",
    "run": {
      "one": "Over {n} trekk: heldigere enn {pct} av rettferdige serier med {n} trekk.",
      "other": "Over {n} trekk: heldigere enn {pct} av rettferdige serier med {n} trekk."
    },
    "scoring": { "one": "Måler {done} av {n} trekk…", "other": "Måler {done} av {n} trekk…" },
    "noneScored": "Ingen av disse trekkene kunne måles. Listen under forklarer hvorfor.",
    "value": "Trakk {value} i forsikringsverdi mot {expected} forventet ({ratio}).",
    "valueSample": {
      "one": "Gjelder {sample} av {n} trekk som oppgir forventet verdi.",
      "other": "Gjelder de {sample} av {n} trekk som oppgir forventet verdi."
    },
    "tiers": "Trukne nivåer",
    "share": "Del lommebokflaksen",
    "shareTitle": "Gachaflaks for lommebok: {score}/100",
    "walletPage": "Lommebokside →",
    "best": "Beste trekk",
    "list": "Trekk, nyeste først",
    "notScored": "Ikke målt",
    "insured": "{value} forsikret",
    "reasons": {
      "legacy": "Eldre trekk, uten øyeblikksbilde av kortutvalget",
      "unverified": "Ikke verifisert av Collector Crypt",
      "pending": "Ikke verifisert ennå",
      "incomplete": "Ufullstendige historiske data",
      "unsupported": "Trekk som ikke støttes",
      "unavailable": "Utilgjengelig akkurat nå"
    },
    "errors": {
      "badWallet": {
        "title": "Den lommebokadressen kunne ikke leses.",
        "body": "Sjekk at det er en Solana-lommebokadresse, og lim den inn på nytt."
      },
      "unavailable": {
        "title": "Historikken til denne lommeboken er utilgjengelig akkurat nå.",
        "body": "Solana-transaksjonshistorikken kunne ikke lastes inn. Lommeboken ligger fortsatt i URL-en, så du kan trygt prøve igjen."
      }
    },
    "loading": "Leser pakkehistorikken til denne lommeboken",
    "notes": {
      "other": {
        "one": "{n} trekk som den offisielle verifiseringen ikke knytter til denne lommeboken, er utelatt.",
        "other": "{n} trekk som den offisielle verifiseringen ikke knytter til denne lommeboken, er utelatt."
      },
      "latest": { "one": "Viser {n} siste trekk.", "other": "Viser de {n} siste trekkene." },
      "scanned": { "one": "Skannet {n} siste transaksjon.", "other": "Skannet de {n} siste transaksjonene." },
      "failed": { "one": "{n} trekk kunne ikke måles.", "other": "{n} trekk kunne ikke måles." }
    },
    "empty": {
      "title": "Fant ingen pakketrekk fra Collector Crypt i denne lommeboken.",
      "body": "Collector Crypt kan åpne pakker fra en innebygd lommebok. I så fall limer du inn lommebokadressen som vises i Collector Crypt-profilen din i stedet.",
      "open": "Åpne lommeboken {wallet} →"
    },
    "howTitle": "Slik fungerer lommebokflaks",
    "how": [
      "Hvert trekk får sin egen flaksscore, og lommebokens score er gjennomsnittet av dem. 50 er gjennomsnittlig flaks: et rettferdig trekk får over 50 omtrent halvparten av gangene.",
      "Seriepersentilen sammenligner gjennomsnittet med rettferdige serier med like mange trekk. Et snitt på 60 over 40 trekk er langt sjeldnere enn at ett enkelt trekk får 60.",
      "Verdiene er forsikringsverdier fra hver pakkes historiske bevis, ikke salgspriser eller fortjeneste. Hvert trekk er uavhengig, så en rekke med uflaks gjør ikke neste pakke heldigere."
    ]
  },
  "gacha": {
    "kicker": "Gacha live",
    "title": "Pakker som åpnes {accent}",
    "titleAccent": "akkurat nå.",
    "sub": "Alle Collector Crypt-pakker som åpnes idet det skjer, de største episke trekkene de siste tolv timene og hva ett trekk kan gi deg akkurat nå.",
    "opening": "Åpnes",
    "packMultiple": "{multiple} pakkeprisen",
    "walletLuck": "Trekkflaks for lommeboken {wallet}",
    "live": "LIVE",
    "noEpics": "Ingen episke trekk i den siste perioden."
  },
  "feed": {
    "title": "Trekk live",
    "perMinute": "Trekk / min",
    "epics": "Episke",
    "best": "Beste ×",
    "footSeconds": "SISTE {n} SEK · {pulls}",
    "footMinutes": "SISTE {n} MIN · {pulls}",
    "footPulls": { "one": "{n} TREKK", "other": "{n} TREKK" },
    "refresh": "OPPDATERES HVERT 10. SEK",
    "error": "Gachastrømmen svarte ikke. Den er som regel tilbake i løpet av noen sekunder.",
    "empty": "Ingen pakker åpnet de siste par minuttene.",
    "turbo": "TURBO",
    "free": "GRATIS",
    "score": "SCORE",
    "scorePull": "Mål dette trekket: {pack}, {tier}",
    "scorePullValue": "Mål dette trekket: {pack}, {tier}, {value}",
    "notAwarded": "ikke tildelt ennå",
    "epic": "Episk hit: et {value}-kort fra {pack}.",
    "epicMultiple": "Episk hit: et {value}-kort fra {pack}, {multiple} ganger prisen på {price}."
  },
  "hall": {
    "title": "Hall of Fame",
    "status": "EPISK NIVÅ",
    "refresh": "OPPDATERES HVERT MINUTT",
    "sortLabel": "Ranger hits etter",
    "sorts": {
      "multiple": "Største ×",
      "value": "Høyeste $",
      "newest": "Nyeste"
    },
    "window": { "one": "{n} siste episke trekk", "other": "{n} siste episke trekk" },
    "windowSince": { "one": "{n} siste episke trekk · det eldste {ago}", "other": "{n} siste episke trekk · det eldste {ago}" },
    "windowLoading": "Siste episke trekk",
    "error": "Vinnerlisten ble ikke lastet inn. Den prøver igjen hvert minutt.",
    "topThree": "Topp tre",
    "ranks": "Plass 4 til 10",
    "podium": "{name}, {multiple} pakkeprisen, plass {rank}"
  },
  "featured": {
    "title": "Største hit nylig",
    "label": "{name}, {multiple} pakkeprisen",
    "caption": { "one": "Beste multippel av {n} siste episke trekk.", "other": "Beste multippel av de {n} siste episke trekkene." },
    "captionSince": {
      "one": "Beste multippel av {n} siste episke trekk, det eldste {ago}.",
      "other": "Beste multippel av de {n} siste episke trekkene, det eldste {ago}."
    }
  },
  "odds": {
    "cardBeats": "Kortet er verdt ≥ det du betaler",
    "sellBack": "Tilbakesalg gir ≥ det du betaler",
    "double": "Kortet er verdt 2× eller mer",
    "na": "ukjent",
    "hp": "HP",
    "oneIn": "1 av {n}",
    "oneInPulls": { "one": "omtrent 1 av {n} trekk", "other": "omtrent 1 av {n} trekk" },
    "perPull": "{price} per trekk",
    "perDollar": "{cents} per $1",
    "poolAge": {
      "underMinute": "under ett minutt",
      "minutes": { "one": "{n} min", "other": "{n} min" },
      "hours": { "one": "{n} time", "other": "{n} timer" },
      "days": { "one": "{n} dag", "other": "{n} dager" }
    },
    "snapshot": {
      "title": "ODDS NÅ",
      "poolRead": "UTVALG LEST FOR {age} SIDEN",
      "failed": "Krever det live kortutvalget, som ikke ble lastet inn.",
      "missing": "Ikke publisert for denne pakken.",
      "topChase": "Største chase-kort {value} · {odds}",
      "cashBack": "Penger tilbake per $1 hvis du selger tilbake",
      "dashed": "Den stiplede linjen markerer $1.00. En stolpe som slutter før den, betyr at tilbakesalg i snitt gir mindre enn trekket kostet."
    },
    "pullNow": {
      "title": "Hvis du trekker nå",
      "pool": "UTVALG {age}",
      "tierOddsStatus": "NIVÅODDS",
      "refresh": "ODDS OPPDATERES HVERT 5. MIN",
      "error": "Maskinlisten ble ikke lastet inn. Den prøver igjen hvert minutt.",
      "empty": "Ingen maskiner er åpne akkurat nå.",
      "categories": "Maskinkategori",
      "machines": "{category}-maskiner",
      "scrollLeft": "Bla maskinene til venstre",
      "scrollRight": "Bla maskinene til høyre",
      "onePullOf": "Ett trekk fra",
      "unknownPack": "Den pakken er ikke åpen akkurat nå, så dette er de sist publiserte tallene.",
      "failed": "Live odds for kortutvalget ble ikke lastet inn, så dette er maskinens publiserte tall.",
      "chances": "Sjansene dine på ett trekk",
      "sellBack": "Hvis du selger kortet tilbake",
      "cashBack": "penger tilbake i snitt per $1 du bruker",
      "gauge": "{cents} tilbake per $1 i snitt. Balansepunktet er $1.00.",
      "ev": "Forventet kortverdi per $1",
      "evNote": "Gjennomsnittlig forsikringsverdi for kortet per $1. Forsikringsverdi er ikke kontanter: tilbakesalg betaler {pct} av den.",
      "tierOdds": "Nivåodds",
      "tierOddsLabel": "Nivåodds: {list}",
      "chase": "Chase-kort akkurat nå",
      "noChase": "Ingen chase-kort er publisert for denne pakken.",
      "chaseFailed": "Chase-kortene krever det live kortutvalget, som ikke ble lastet inn.",
      "naFailed": "Dette krever det live kortutvalget, som ikke ble lastet inn.",
      "naMissing": "Collector Crypt har ikke publisert dataene om kortutvalget som dette krever.",
      "footPool": "Kortutvalget ble lest for {age} siden.",
      "footPublished": "Rett fra den publiserte nivåoddsen.",
      "footNote": "Nivåoddsen endres ikke mellom trekk; tilbakesalg gir i snitt omtrent {range} per $1. Hvert trekk er uavhengig."
    }
  }
};
