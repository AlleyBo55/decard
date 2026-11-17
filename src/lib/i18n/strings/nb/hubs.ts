import type { Strings } from "../en";
import type { Translation } from "../types";

export const hubs: Translation<Strings["hubs"]> = {
  "crumbs": {
    "label": "Brødsmulesti",
    "home": "Hjem",
    "cards": "Kort",
    "pokemon": "Pokémon-kortpriser"
  },
  "updated": "Oppdatert {time} · oppdateres omtrent hvert 15. minutt",
  "credit": "Pokémon-bilder fra Pokémon HOME, via {link}.",
  "browse": "Bla i kort etter franchise",
  "market": {
    "grade": "KARAKTER",
    "listed": "TIL SALGS",
    "lowestAsk": "LAVESTE PRIS",
    "medianAsk": "MEDIANPRIS",
    "lowestCard": "BILLIGSTE KORT",
    "lowestPsa10": "LAVESTE PSA 10",
    "onVenue": "på {venue}",
    "byGrade": "Priser per karakter",
    "cheapest": "Billigst først",
    "top": "Toppen av markedet"
  },
  "categoryMarket": {
    "empty": "Ingen graderte {noun}-kort er til salgs i USDC akkurat nå. Nye slabs dukker opp her når samlere tokeniserer og legger dem ut.",
    "emptyLink": "Søk etter {noun}-annonser i skanneren.",
    "listedNow": "TIL SALGS NÅ",
    "graded": "GRADERT, I USDC",
    "partial": {
      "one": "Denne oppdateringen leste de {read} billigste av {n} {noun}-annonse. Hver laveste pris her er nøyaktig, men medianer er utelatt i stedet for gjettet, og en karakter der det billigste eksemplaret koster mer enn disse, vises ikke.",
      "other": "Denne oppdateringen leste de {read} billigste av {n} {noun}-annonser. Hver laveste pris her er nøyaktig, men medianer er utelatt i stedet for gjettet, og en karakter der det billigste eksemplaret koster mer enn disse, vises ikke."
    },
    "left": {
      "one": "{n} annonse til er ugradert, priset i SOL eller ligger langt over forsikringsverdien, så disse prisene utelater den.",
      "other": "{n} annonser til er ugraderte, priset i SOL eller ligger langt over forsikringsverdien, så disse prisene utelater dem."
    },
    "thin": {
      "one": "Bare {n} gradert {noun}-kort er til salgs i USDC akkurat nå, så én ny annonse kan flytte disse tallene.",
      "other": "Bare {n} graderte {noun}-kort er til salgs i USDC akkurat nå, så én ny annonse kan flytte disse tallene."
    },
    "byGradeTitle": "Hva graderte {noun}-kort er lagt ut for",
    "byGradeNote": "Hver karakter samler alle {noun}-kort med den karakteren, fra vanlige kort til chase-kort, så åpne det billigste kortet for å se nøyaktig hvilket det er.",
    "cheapestTitle": "De billigste graderte {noun}-kortene",
    "cheapestMore": "Sorter og filtrer {noun}-annonser i skanneren",
    "topTitle": "Høyeste priser for {noun}-kort"
  },
  "guideMarket": {
    "allVenues": "Alle markedsplasser",
    "venue": "MARKEDSPLASS",
    "venueGroup": "Markedsplass for annonsene",
    "none": "Ingen graderte {name}-slabs er til salgs i USDC akkurat nå.",
    "noneOn": "Ingen graderte {name}-slabs på {venue} er til salgs i USDC akkurat nå.",
    "seeAll": {
      "one": "Se {n} i skanneren.",
      "other": "Se alle {n} i skanneren."
    },
    "gradedSlabs": "GRADERTE SLABS",
    "priced": "PRISET I USDC",
    "left": {
      "one": "{n} annonse til er priset i SOL eller ligger langt over forsikringsverdien, så disse prisene utelater den.",
      "other": "{n} annonser til er priset i SOL eller ligger langt over forsikringsverdien, så disse prisene utelater dem."
    },
    "everyListing": "Skanneren viser alle annonser.",
    "byGradeTitle": "Hva {name} er lagt ut for, per karakter",
    "byGradeTitleOn": "Hva {name} er lagt ut for på {venue}, per karakter",
    "byGradeNote": "Hver karakter samler alle trykk av {name}, så én karakter kan dekke svært ulike kort. Åpne det billigste kortet for å se nøyaktig hvilket det er.",
    "cheapestTitle": "De billigste graderte {name}-kortene",
    "cheapestTitleOn": "De billigste graderte {name}-kortene på {venue}",
    "cheapestMore": "Sorter og filtrer alle {name}-annonser i skanneren",
    "cheapestMoreOn": "Sorter og filtrer alle {name}-annonser på {venue} i skanneren",
    "topTitle": "Høyeste priser for {name}",
    "topTitleOn": "Høyeste priser for {name} på {venue}"
  },
  "category": {
    "kicker": "Franchiseoversikt · tokeniserte graderte kort",
    "lede": "Graderte {noun}-kort til salgs akkurat nå på Collector Crypt og Magic Eden, hvert av dem en ekte slab i et hvelv, eid gjennom et token på Solana. Se laveste pris og medianpris for hver karakter, og åpne et hvilket som helst kort for populasjonsrapport, bud og historikk. Prisene er live utlagte priser, ikke gjennomførte salg.",
    "ledeLowest": "Graderte {noun}-kort til salgs akkurat nå på Collector Crypt og Magic Eden, hvert av dem en ekte slab i et hvelv, eid gjennom et token på Solana. Se laveste pris for hver karakter, og åpne et hvilket som helst kort for populasjonsrapport, bud og historikk. Prisene er live utlagte priser, ikke gjennomførte salg.",
    "pokemonTitle": "Ser du etter én bestemt Pokémon?",
    "pokemonText": {
      "one": "Charizard, Pikachu, Umbreon og {n} til har egne prisguider, med laveste pris og medianpris for hver karakter.",
      "other": "Charizard, Pikachu, Umbreon og {n} til har egne prisguider, med laveste pris og medianpris for hver karakter."
    },
    "pokemonAll": {
      "one": "{n} prisguide for Pokémon",
      "other": "Alle {n} prisguider for Pokémon"
    },
    "unavailable": "Live {noun}-annonser er midlertidig utilgjengelige. Guiden nedenfor gjelder fortsatt, og {scanner} viser aktuelle annonser.",
    "unavailableLink": "skanneren",
    "aboutTitle": "Om graderte {noun}-kort",
    "terms": "BEGREPER DU MØTER",
    "scannerMore": "Søk etter {noun}-annonser i skanneren",
    "glossaryMore": "Ordliste for graderte kort og slang",
    "explainerMore": "Slik fungerer tokeniserte samlekort",
    "salesMore": "Siste verifiserte salg",
    "faqKicker": "{name}: ofte stilte spørsmål",
    "faqTitle": "Spørsmål og svar.",
    "relatedTitle": "Relaterte franchiser",
    "relatedName": "{name}-kort",
    "relatedSub": "Priser på graderte kort og live annonser →",
    "everyFranchise": "Alle franchiser",
    "ldAbout": "{name}-samlekort",
    "ldListings": "Graderte {noun}-kort til salgs nå"
  },
  "index": {
    "kicker": "Prisguider · graderte Pokémon-kort",
    "h1": "Pokémon-kortpriser, {accent}",
    "h1Accent": "én Pokémon om gangen.",
    "lede": "Velg en Pokémon for å se alle graderte slabs av den som er lagt ut på Collector Crypt eller Magic Eden, laveste pris og medianpris for hver karakter, og de billigste og mest verdifulle kortene på markedet akkurat nå.",
    "tile": "PSA 10-, PSA 9- og CGC-priser →",
    "showsTitle": "Hva hver guide viser",
    "shows": "Hver guide leser alle graderte annonser av den Pokémonen på Collector Crypt og Magic Eden, viser hvilken markedsplass hver annonse ligger på, lar deg bytte mellom dem og oppdateres omtrent hvert 15. minutt. Den grupperer utlagte USDC-priser per karakter, lenker til det billigste kortet for hver karakter og viser hvilke slabs som er billigst og mest verdifulle. Prisene er utlagte priser, ikke gjennomførte salg.",
    "checkerMore": "Søk opp verdien på et hvilket som helst Pokémon-kort",
    "salesMore": "Se siste verifiserte salg",
    "ldGuides": "Prisguider for Pokémon-kort"
  },
  "guide": {
    "description": "Live priser på Pokémon-kort med {name} per karakter: laveste pris og medianpris for PSA 10-, PSA 9-, CGC- og BGS-slabs på Collector Crypt og Magic Eden.",
    "h1": "{name}-kortpriser {accent}",
    "h1Accent": "per karakter.",
    "lede": "Alle graderte {name}-slabs tokenisert av Collector Crypt og til salgs akkurat nå, på Collector Crypt eller Magic Eden, med laveste pris og medianpris for hver karakter. Bytt markedsplass for å sammenligne. Prisene er live utlagte USDC-priser, ikke gjennomførte salg.",
    "kicker": "Pokémon-prisguide · graderte slabs",
    "partial": "noen annonser kunne ikke leses denne gangen",
    "unavailable": "Live {name}-annonser er midlertidig utilgjengelige. Guiden nedenfor gjelder fortsatt, og skanneren viser alle annonser.",
    "empty": "Ingen graderte {name}-slabs er til salgs akkurat nå.",
    "howTitle": "Slik leser du {name}-priser",
    "howPrintings": "{name} finnes på mange ulike kort: sett, år, kortnumre, språk, holo-varianter og promoer. To {name}-slabs med samme karakter kan ha svært ulik pris fordi de er ulike trykk, så sammenlign det eksakte kortet, ikke bare navnet og karakteren.",
    "howAsking": "Dette er utlagte priser: det selgerne vil ha i dag. {sales} og de live budene på hver kortside viser hva kjøperne faktisk betaler. Forsikringsverdien er en referanse, ikke en garantert salgspris.",
    "howAskingLink": "Siste salg",
    "howGrades": "Høyere karakterer har vanligvis et pristillegg, men knapphet kommer fra populasjonsrapporten: hvor mange eksemplarer graderingsselskapet har registrert med den karakteren og høyere. Hver kortside viser den.",
    "checkerMore": "Sjekk verdien på et hvilket som helst Pokémon-kort",
    "gradesMore": "PSA-, CGC- og BGS-karakterer forklart",
    "more": "Flere prisguider for Pokémon",
    "loading": "Laster prisguiden",
    "ldName": "{name}-kortpriser per karakter",
    "ldAbout": "Pokémon-samlekort med {name}"
  }
};
