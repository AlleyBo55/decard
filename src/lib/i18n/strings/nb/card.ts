import type { Strings } from "../en";
import type { Translation } from "../types";

export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "Fant ikke kortet",
    "title": "{name} pris · {set}",
    "titleNoSet": "{name} pris",
    "description": "{name}. Forsikret for {insured}. Se live pris, populasjonsrapport, bud og historikk på kjeden hos Decard.",
    "imageAlt": "{name}: forsikringsverdi, annonse, beste bud og populasjon",
    "pullImageAlt": "{name} trukket fra en {pack}-pakke, forsikret for {insured}",
    "pullTitle": "Trakk {name} fra en {pack}-pakke",
    "pullDescription": "Forsikringsverdi {insured}, {multiple} pakkeprisen. Pakkeprisen er satt av den som delte. Live pris, populasjonsrapport og bud hos Decard.",
    "pullDescriptionNoValue": "Pakkeprisen er satt av den som delte. Live pris, populasjonsrapport og bud hos Decard."
  },
  "jsonLd": {
    "gradingCompany": "Graderingsselskap",
    "grade": "Karakter",
    "set": "Sett",
    "year": "År",
    "cardNumber": "Kortnummer",
    "parallel": "Parallell",
    "certNumber": "Sertifikatnummer",
    "gradePopulation": "Populasjon i karakteren",
    "populationHigher": "Populasjon høyere",
    "totalPopulation": "Total gradert populasjon",
    "identifier": "{company}-sertifikat {cert}",
    "anyGrader": "Gradering"
  },
  "loading": "Laster kortet",
  "breadcrumb": {
    "label": "Brødsmulesti",
    "scanner": "Skanner"
  },
  "sharedPull": {
    "label": "Delt trekk",
    "kicker": "DELT TREKK",
    "pulled": "Trukket fra en {pack}-pakke.",
    "pulledWithValue": "Trukket fra en {pack}-pakke. Forsikringsverdien er {multiple} pakkeprisen.",
    "note": "Pakkeprisen kommer fra den som delte lenken.",
    "cta": "Sjekk flaksen i dine egne trekk →"
  },
  "actions": {
    "viewOnCollectorCrypt": "Se på Collector Crypt ↗",
    "buyOnSlabz": "Kjøp på Slabz · {price} ↗"
  },
  "authenticated": "✓ Autentisert",
  "rarity": {
    "LEGENDARY": "LEGENDARISK",
    "RARE": "SJELDEN",
    "UNCOMMON": "UVANLIG",
    "COMMON": "VANLIG"
  },
  "price": {
    "listed": "Utlagt pris",
    "notListed": "Ikke til salgs",
    "listedOn": "på {venue} · oppdatert {ago}",
    "insured": "FORSIKRET",
    "bestBid": "BESTE BUD",
    "underInsured": "{pct}\u00a0% under forsikringsverdien",
    "overInsured": "{pct}\u00a0% over forsikringsverdien"
  },
  "facts": {
    "title": "Pokédex-data",
    "set": "Sett",
    "year": "År",
    "number": "Nummer",
    "parallel": "Parallell",
    "grader": "Graderer",
    "grade": "Karakter",
    "cert": "Sert.nr.",
    "vault": "Hvelv",
    "token": "Token"
  },
  "pop": {
    "title": "Grunnverdier · {company}-populasjonsrapport",
    "fullReport": "Hele populasjonsrapporten ↗",
    "grade": "Pop {grade}",
    "plain": "Pop",
    "higher": "Høyere",
    "total": "Totalt",
    "gemRate": "Gem-rate",
    "summary": "{pop} gradert med denne karakteren av {total} totalt, {higher} høyere.",
    "summaryNoneHigher": "{pop} gradert med denne karakteren av {total} totalt, og ingen høyere.",
    "lastGem": "Siste Gem Mint gradert {date}."
  },
  "bids": {
    "title": "Live bud",
    "count": "Live bud ({n})",
    "unavailable": "Live bud er utilgjengelige akkurat nå. Sjekk igjen om et øyeblikk.",
    "none": "Ingen live bud. Bli den første treneren som legger inn et bud.",
    "ofInsured": "{pct}\u00a0% av fors."
  },
  "trainer": {
    "title": "Trener",
    "collectorCryptName": "Collector Crypt-navn: {name}",
    "open": "Åpne trenerkortet →",
    "unknown": "Ukjent eier."
  },
  "history": {
    "title": "Historikk på kjeden",
    "error": "Fikk ikke lest historikken til dette kortet akkurat nå.",
    "empty": "Ingen markedshistorikk på kjeden ennå."
  },
  "slab": {
    "showFront": "Vis forsiden av slaben",
    "showBack": "Vis baksiden av slaben",
    "backAlt": "{name}, baksiden av slaben",
    "flip": "↻ Snu slaben"
  },
  "related": {
    "sameKicker": "Sammenlign karakterer",
    "sameTitle": "Andre {name}-slabs til salgs nå",
    "sameSub": "Aktuelle priser, laveste først.",
    "sameLabel": "Andre {name}-annonser",
    "hubLink": "{name}-kortpriser per karakter",
    "scannerLink": "Alle {name}-annonser i skanneren",
    "setKicker": "Samme sett",
    "setTitle": "Mer fra {set}",
    "setSub": "Nyeste annonser først.",
    "setLabel": "Flere annonser fra {set}"
  },
  "receipt": {
    "button": "Del trekket",
    "close": "Lukk",
    "slabLabel": "Slaben din",
    "title": "Trekkvittering",
    "heading": "Del trekket ditt",
    "statsLabel": "Slab-statistikk",
    "insured": "Forsikret",
    "bestBid": "Beste bud",
    "listedAt": "Lagt ut for {price} på {venue}",
    "notListed": "Ikke til salgs nå",
    "checking": "Sjekker annonsen…",
    "packQuestion": "Hva kostet pakken?",
    "optional": "Valgfritt",
    "otherAmount": "Annet beløp",
    "otherAmountLabel": "Annen pakkepris i dollar",
    "noPack": "Ingen pakke",
    "invalidPack": "Skriv inn fra $1 til $100\u00a0000.",
    "meter": "Forsikret ÷ pakke",
    "exp": "EXP",
    "noteMultiple": "Forsikringsverdien er {multiple} prisen på {pack}-pakken.",
    "notePick": "Velg pakkeprisen for å få multippelen.",
    "noteNoValue": "Ingen forsikringsverdi registrert for denne slaben.",
    "shareIt": "Del det",
    "postOnX": "Del på X",
    "saveImage": "Lagre bildet",
    "more": "Mer",
    "copy": "Kopier",
    "preview": "Forhåndsvisning av lenken",
    "previewNote": "Det X og Discord viser",
    "previewAlt": "Delingsbilde for {name}",
    "rendering": "Lager bildet…",
    "fine": "Du setter pakkeprisen selv; ingenting sjekker den. Forsikringsverdien er Collector Crypts tall, ikke en salgspris. Tallene i delingsbildet oppdateres én gang om dagen.",
    "lidTag": "TREKKVITTERING",
    "share": "Del",
    "copyLink": "Kopier lenken",
    "toast": {
      "discord": "Kopiert. Lim den inn i Discord, så foldes kvitteringen ut.",
      "copied": "Lenken er kopiert.",
      "copyFailed": "Kunne ikke kopiere. Trykk og hold på lenken i stedet.",
      "shareFailed": "Delingsmenyen åpnet seg ikke. Kopier lenken i stedet."
    },
    "say": {
      "throw": "DECARD brukte POKé BALL!",
      "click": "Klikk!",
      "multiple": "Forsikringsverdi: {multiple} {pack}-pakken!",
      "caught": "Der satt den! {name} ble fanget!"
    },
    "post": {
      "pulled": "Trakk {name} fra en {pack}-pakke.",
      "pulledWithValue": "Trakk {name} fra en {pack}-pakke. Forsikringsverdi {insured} ({multiple} pakken).",
      "insured": "forsikringsverdi {insured}",
      "pop": "pop {pop}"
    }
  },
  "stage": {
    "showFront": "Vis forsiden av slaben",
    "showBack": "Vis baksiden av slaben",
    "flip": "↻ Snu",
    "tilt": "◎ Vipp",
    "skip": "Hopp over ▸▸"
  }
};
