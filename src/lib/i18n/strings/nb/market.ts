import type { Strings } from "../en";
import type { Translation } from "../types";

export const market: Translation<Strings["market"]> = {
  "breadcrumb": "Brødsmulesti",
  "scanner": {
    "kicker": "Annonseskanner",
    "h1a": "Hver annonse,",
    "h1b": "rangert.",
    "lede": "Live graderte kort på Collector Crypt, Magic Eden og Slabz. Kuppscoren viser hvor langt under forsikringsverdien hver USDC-annonse ligger, så de beste kjøpene havner øverst.",
    "prices": "Se priser på Pokémon-kort og PSA-verdier →",
    "directory": "Bla i katalogen over graderte kort etter eksakt navn, karakter, sett og år →",
    "crumb": "Skanner",
    "categoryTitle": "Graderte {name}-kort til salgs på Solana",
    "categoryTitleShort": "Graderte {name}-kort på Solana",
    "categoryDescription": "Live annonser for graderte {name}-kort på Collector Crypt og Magic Eden, rangert etter kuppscore: hvor langt under forsikringsverdien hver slab ligger.",
    "scanning": "Skanner markedet"
  },
  "scannerTable": {
    "allTypes": "Alle typer",
    "filter": "Filtrer etter navn, sett, mint eller sert.nr.",
    "filterLabel": "Filtrer annonser",
    "sortLabel": "Sorter",
    "sorts": {
      "deal": "Beste kupp",
      "listedDateDesc": "Nyeste",
      "listedPriceAsc": "Pris ↑",
      "listedPriceDesc": "Pris ↓"
    },
    "venueLabel": "Markedsplass",
    "allVenues": "Alle",
    "min": "$ min",
    "max": "$ maks",
    "minLabel": "minstepris",
    "maxLabel": "makspris",
    "viewLabel": "Visning",
    "list": "Liste",
    "grid": "Rutenett",
    "matching": {
      "one": "{n} kort som passer",
      "other": "{n} kort som passer"
    },
    "deals": "kupp på graderte kort blant de ferskeste og billigste, beste først",
    "dealsSlabz": "kupp på graderte kort fra toppen av Slabz' egen kuppliste, beste først",
    "updating": "OPPDATERER",
    "errorTitle": "Skanneren besvimte!",
    "errorText": "Markedet svarte ikke. Prøv igjen om et øyeblikk.",
    "retry": "Gjenoppliv den",
    "empty": "Ingen kort her. Prøv en annen type eller utvid prisområdet.",
    "columns": {
      "card": "KORT",
      "price": "PRIS",
      "insured": "FORSIKRET",
      "deal": "KUPPSCORE",
      "listed": "LAGT UT"
    },
    "unlisted": "Ikke til salgs",
    "aboveInsured": "Over forsikringsverdi",
    "loadingMore": "Laster...",
    "loadMore": "Last inn flere kort"
  },
  "tape": {
    "kicker": "Live-handel",
    "h1": "Markedets {accent}",
    "h1Accent": "hjerteslag.",
    "lede": "Hver bevegelse i Collector Crypts markedsplassprogram, dekodet i sanntid: hvem som kjøpte hva, med hvilken karakter, for hvor mye og fra hvem.",
    "sales": "Siste salg med priser og lenker til Solana-transaksjonene →"
  },
  "tapeBoard": {
    "volume": "Salgsvolum",
    "volumeNote": {
      "one": "{n} salg",
      "other": "{n} salg"
    },
    "biggest": "Største salg",
    "biggestNote": "i dette tidsvinduet",
    "bids": "Budbevegelser",
    "bidsNote": {
      "one": "{n} fra massebud-botter",
      "other": "{n} fra massebud-botter"
    },
    "traders": "Aktive trenere",
    "tradersNote": {
      "one": "siste {n} hendelse",
      "other": "siste {n} hendelser"
    },
    "filterLabel": "Filter",
    "filters": {
      "all": "Alle bevegelser",
      "sales": "Salg",
      "listings": "Annonser",
      "bids": "Bud"
    },
    "hideBots": "Skjul massebud-botter",
    "refresh": "OPPDATERER 10s",
    "errorTitle": "Live-handelen floket seg!",
    "errorText": "Den offentlige Solana-RPC-en svarte ikke. Den kommer som regel tilbake i løpet av sekunder.",
    "retry": "Prøv igjen",
    "emptyTitle": "Ingenting i dette filteret akkurat nå.",
    "emptyText": "Prøv Alle bevegelser, eller vis massebud-botter. Salg på Collector Crypt kommer i rykk og napp."
  },
  "sales": {
    "loading": "Laster siste salg",
    "kicker": "Gjennomførte salg · verifisert på Solana",
    "h1": "Siste kortsalg, {accent}",
    "h1Accent": "svart på hvitt.",
    "lede": "De siste gjennomførte salgene av tokeniserte graderte kort på Collector Crypts markedsplass: hva som ble solgt, med hvilken karakter, for hvor mye og mellom hvilke lommebøker. Hver rad lenker til Solana-transaksjonen som gjennomførte salget.",
    "window": "Salg fra {from} til {to} · oppdateres omtrent hvert 5. minutt",
    "unavailable": "Salgene er midlertidig utilgjengelige. Live-handelen viser fortsatt markedsaktiviteten idet den skjer.",
    "empty": "Ingen gjennomførte salg i det siste tidsvinduet. Live-handelen viser annonser og bud idet de skjer.",
    "stats": {
      "sales": "SALG",
      "volume": "USDC-VOLUM",
      "median": "MEDIANSALG",
      "window": "TIDSVINDU"
    },
    "hours": "{n} t",
    "biggest": "Største salg i dette tidsvinduet: {card} for {price}.",
    "biggestUnresolved": "et kort som ikke er identifisert ennå",
    "unresolved": "Kortet er ikke identifisert ennå",
    "trade": "fra {seller} {arrow} {buyer}",
    "soldList": "Nylig solgte kort",
    "sourceTitle": "Hvor salgene kommer fra",
    "sourceTreasury": "Salg på Collector Crypts markedsplass betaler et gebyr til Collector Crypts treasury-lommebok. Decard leser de nyeste transaksjonene til den lommeboken fra Solana, dekoder markedsplassinstruksjonen i hver av dem og beholder de gjennomførte salgene som har en pris. Kortnavn, karakterer og bilder kommer fra Collector Crypts katalog, matchet på kortets asset-adresse på kjeden.",
    "sourcePrice": "Kjøp bruker prisen som står i instruksjonen. For godtatte bud på kort som er lagt ut, er prisen selgerens USDC-kreditt, regnet opp med markedsplassgebyret på 2\u00a0%. Salg gjennomført i SOL viser SOL-beløpet og holdes utenfor dollartotalene.",
    "sourceScope": "Bare salg på Collector Crypts markedsplass er med. Collector Crypt-kort selges også på Magic Eden, og de salgene er ikke tatt med her.",
    "coverTitle": "Hva listen ikke dekker",
    "coverWindow": "Det er et nylig tidsvindu på noen timer, ikke en fullstendig historikk. Hver kortside viser kortets egen historikk på kjeden, og live-handelen viser annonser og bud idet de skjer.",
    "coverValue": "En salgspris er det én kjøper betalte én gang. Sammenlign flere salg av samme kort og karakter, og sjekk live bud, før du regner ett enkelt salg som kortets verdi. Ikke finansiell rådgivning.",
    "links": {
      "tape": "Følg live-handelen",
      "pokemon": "Pokémon-priser per Pokémon",
      "checker": "Sjekk verdien på et Pokémon-kort"
    }
  },
  "cards": {
    "loading": "Laster kortkatalogen",
    "pageTitle": "{title}, side {n}",
    "pageDescription": "Bla gjennom side {n} av graderte kort til salgs nå, etter eksakt navn, karakter, sett, år, kortnummer og kategori, inkludert Pokémon-kort og PSA-slabs.",
    "crumb": "Katalog over graderte kort",
    "crumbPage": "Side {n}",
    "kicker": "Aktuelle annonser · i markedsplassens navnerekkefølge",
    "list": "Graderte kort til salgs nå",
    "listPage": "Graderte kort til salgs nå, side {n}",
    "count": {
      "one": "{n} gradert kort til salgs, med priser per {time}.",
      "other": "{n} graderte kort til salgs, med priser per {time}."
    },
    "countRange": {
      "one": "Kort {from}–{to} av {n} gradert kort til salgs, med priser per {time}.",
      "other": "Kort {from}–{to} av {n} graderte kort til salgs, med priser per {time}."
    },
    "pageOf": "Side {page} av {total}",
    "serial": "Nr. {serial}",
    "emptyTitle": "Ingen graderte kort er til salgs akkurat nå.",
    "emptyText": "Katalogen filtrerer bort ugraderte varer, pakker og merch.",
    "pagination": "Sidenavigasjon for kortkatalogen",
    "previous": "Forrige",
    "next": "Neste",
    "current": "Side {n}, nåværende side",
    "goTo": "Gå til side {n}"
  },
  "wallet": {
    "title": "Trener {addr}",
    "description": "Samling av graderte kort, forsikringsverdi og markedsaktivitet på kjeden for lommeboken {addr}.",
    "kicker": "Trenersøk",
    "loading": "Åpner trenerkortet",
    "trainer": "Trener",
    "card": "TRENERKORT",
    "watch": "Legg til i følgelisten",
    "unwatch": "Fjern fra følgelisten",
    "name": "NAVN",
    "namePlaceholder": "Gi denne treneren et navn",
    "rename": "Gi nytt navn",
    "label": "+ Etikett",
    "bot": "Bot",
    "known": "Kjent",
    "id": "ID-nr.",
    "copy": "Kopier",
    "copied": "Kopiert!",
    "luck": "Trekkflaks →",
    "badges": "MERKER",
    "stats": {
      "cards": "KORT",
      "value": "VERDI",
      "listed": "TIL SALGS"
    },
    "sections": "Trenerseksjoner",
    "collection": "Samling",
    "collectionCount": "Samling ({n})",
    "activity": "Aktivitet",
    "sortLabel": "Sorter samlingen",
    "sorts": {
      "value": "Forsikringsverdi",
      "price": "Utlagt pris",
      "name": "Navn"
    },
    "bagError": "Fikk ikke åpnet sekken til denne treneren akkurat nå.",
    "bagEmpty": "Sekken til denne treneren er tom.",
    "bagEmptyText": "Fant ingen Collector Crypt-kort i denne lommeboken.",
    "showing": {
      "one": "Viser topp {shown} av {n} kort.",
      "other": "Viser topp {shown} av {n} kort."
    },
    "activityError": "Kjeden svarte ikke. Prøv igjen om et øyeblikk.",
    "activityEmpty": "Ingen markedsbevegelser funnet for denne treneren ennå.",
    "sprite": "Trenerfigur"
  }
};
