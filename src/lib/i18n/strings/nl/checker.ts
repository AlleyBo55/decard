import type { Strings } from "../en";
import type { Translation } from "../types";
export const checker: Translation<Strings["checker"]> = {
  breadcrumb: {
    label: "Kruimelpad",
    home: "Home",
    page: "Waardechecker voor Pokémon-kaarten",
  },
  ld: {
    about: ["Prijzen van Pokémon-kaarten", "Waarde van gegradeerde verzamelkaarten", "PSA-grading"],
    currentPrices: "Actuele vraagprijzen van gegradeerde Pokémon-kaarten",
  },
  hero: {
    kicker: "Pokémon-prijzen · PSA-waarden · gegradeerde kaarten",
    h1: "Check de waarde van je {accent}",
    h1Accent: "Pokémon-kaart.",
    lede: "Zoek een gegradeerde Pokémon-kaart op naam, set, kaartnummer, certificaatnummer of Solana-mint. Vergelijk de huidige vraagprijs met de verzekerde referentiewaarde en bekijk daarna biedingen, populatie en marktgeschiedenis op de pagina van de kaart.",
    meta: "Gratis, alleen-lezen en zonder login · Nagekeken op {date} · Onafhankelijke datatool, geen taxatie",
  },
  search: {
    label: "Welke Pokémon-kaart wil je checken?",
    hint: "Voeg set, jaar, kaartnummer en grade toe als je die weet. Specifieke zoekopdrachten onderscheiden vergelijkbare versies.",
    placeholder: "bijv. 1999 Charizard 4/102 PSA 10",
    submit: "Zoek live listings",
    example: "Zoek {name}",
  },
  prices: {
    kicker: "Live momentopname van de markt",
    title: "Actuele vraagprijzen van Pokémon-kaarten",
    intro: "Recente, geloofwaardige USDC-listings van gegradeerde Pokémon-kaarten, elk met de marktplaats erbij. Listings en verzekerde waarden komen uit de API van Collector Crypt, die Collector Crypt en Magic Eden dekt. Deze momentopname wordt tot vijf minuten in de cache bewaard. Vraagprijzen en verzekerde referenties zijn vergelijkingsmateriaal, geen gegarandeerde verkoopwaarden.",
    unavailable: "Actuele voorbeelden zijn tijdelijk niet beschikbaar. Zoeken opent nog steeds de live marktscanner.",
    empty: "Actuele voorbeelden zijn tijdelijk niet beschikbaar. De waardechecker en de gidsen over kaarten werken nog steeds.",
    cardAlt: "Voorkant van {name}",
    asking: "VRAAGPRIJS",
    insured: "VERZ. REF.",
    underInsured: "Vraagprijs {pct}% onder de verzekerde waarde",
    venue: "Op {venue}",
    updated: "bijgewerkt {date}",
    browseAll: "Bekijk alle live Pokémon-listings",
    guidesTitle: "Prijsgidsen per Pokémon",
    guide: "Prijzen van {name}",
    allGuides: "Alle Pokémon-prijsgidsen",
  },
  howTo: {
    title: "Zo check je de waarde van een Pokémon-kaart",
    steps: [
      {
        title: "1. Bepaal de exacte kaart",
        text: "Controleer jaar, set, kaartnummer, taal, parallel, editie en of er een handtekening op staat. Een bekende naam van een personage is niet genoeg.",
      },
      {
        title: "2. Controleer de slab",
        text: "Check het gradingbedrijf, de cijfergrade en het certificaatnummer. Vergelijk het fysieke label met de registratie van het gradingbedrijf.",
      },
      {
        title: "3. Vergelijk de echte koopbereidheid",
        text: "Recente geaccepteerde verkopen en actieve biedingen laten zien wat kopers betaalden of mogelijk betalen. Een onverkochte vraagprijs laat alleen zien wat één verkoper wil.",
      },
      {
        title: "4. Houd rekening met schaarste en liquiditeit",
        text: "Bekijk de populatie in die grade, het aantal hoger gegradeerde exemplaren, het aantal listings en de transactieactiviteit. Schaarste telt alleen als verzamelaars de kaart ook willen hebben.",
      },
    ],
    cardPage: "Open een kaartpagina op Decard om identiteit, grade, certificaat, vraagprijs, verzekerde waarde, beste bod, pop report en gedecodeerde on-chain geschiedenis bij elkaar te zien. Geen enkel veld op zich is een volledige waardering.",
  },
  priceMeaning: {
    title: "Vraagprijs, verzekerde waarde en marktwaarde zijn niet hetzelfde",
    terms: "Een {listingPrice} is wat de verkoper nu vraagt. Dat bewijst niet dat een koper die prijs accepteert. Een {insuredValue} is een referentie die bij de kaart in de kluis hoort. Handig om te vergelijken, maar het is geen gegarandeerde uitbetaling, taxatie of toekomstige verkoopprijs.",
    listingPrice: "vraagprijs",
    insuredValue: "verzekerde waarde",
    dealScore: "De dealscore van Decard meet hoe ver een USDC-vraagprijs onder de verzekerde waarde ligt. Een kaart die voor $100 verzekerd is en voor $80 te koop staat, scoort bijvoorbeeld 20. Dat betekent “te koop voor 20% onder de verzekerde referentie”, niet “gegarandeerd 20% winst”.",
    estimate: "Een betere schatting combineert recente geaccepteerde verkopen, actieve biedingen, vergelijkbare listings, de exacte grade en de populatie van de kaart. Bij slabs die weinig verhandeld worden, kan het verschil tussen de zichtbare vraagprijs en de prijs die een koper echt betaalt groot zijn.",
  },
  psa: {
    title: "Wat bepaalt de waarde van een Pokémon-kaart met PSA-grade?",
    grade: "PSA 10 is de hoogste standaard cijfergrade, maar dat maakt niet elke kaart duur. Vraag naar het personage, set, drukjaar, taal, editie, kaartnummer, artwork, zeldzaamheid en populatie bepalen allemaal de waarde. Een PSA 9 kan zeldzamer zijn of actiever verzameld worden dan een PSA 10 van een andere kaart.",
    multiplier: "Er bestaat geen betrouwbare vaste vermenigvuldiger van ongegradeerd (raw) naar PSA 9 of PSA 10. Gradingkosten, het risico bij de echtheidscontrole, onzekerheid over de staat en het aantal exemplaren met een hoge grade verschillen per kaart. Vergelijk waar mogelijk dezelfde versie en grade.",
    more: "Leer de termen over PSA, CGC, BGS en populatie",
  },
  limits: {
    title: "Wat deze checker wel en niet kan vertellen",
    coverage: "Decard dekt professioneel gegradeerde fysieke kaarten die op Solana zijn getokeniseerd en worden verhandeld op Collector Crypt, Magic Eden en Slabz. Decard schat de staat van ongegradeerde kaarten niet in, belooft geen echtheid buiten de getoonde gegevens van het gradingbedrijf en de bewaarder, en voorspelt geen toekomstige prijs.",
    verify: "Beschikbaarheid op marktplaatsen, biedingen, verzekerde waarden en inwisselvoorwaarden kunnen veranderen. Controleer de actuele kaart, certificering, listing, bewaarder en opnamevoorwaarden voordat je een beslissing neemt. Decard is onafhankelijk, gemaakt door fans en niet gelieerd aan PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt of Magic Eden.",
  },
  faq: {
    title: "Veelgestelde vragen over de waarde van Pokémon-kaarten",
    items: [
      {
        q: "Hoeveel is mijn Pokémon-kaart waard?",
        a: "Bepaal eerst de exacte versie en de staat, en vergelijk daarna dezelfde kaart en grade via geaccepteerde verkopen, actieve biedingen en geloofwaardige listings. Alleen een kaartnaam levert geen betrouwbare waarde op.",
      },
      {
        q: "Garandeert een PSA 10 een hoge waarde?",
        a: "Nee. De grade beschrijft de staat en de echtheid. Vraag, zeldzaamheid, populatie en liquiditeit bepalen of verzamelaars er meer voor betalen.",
      },
      {
        q: "Moet ik vraagprijzen of verkoopprijzen gebruiken?",
        a: "Gebruik allebei, maar laat recente vergelijkbare verkopen en biedingen waarop je kunt verkopen zwaarder wegen. Vraagprijzen laten het aanbod en de verwachtingen van verkopers zien, inclusief listings die misschien nooit verkopen.",
      },
      {
        q: "Is Decard gratis?",
        a: "Ja. Onderzoekspagina's zijn openbaar en alleen-lezen, en voor het checken van een kaart heb je geen wallet of account nodig.",
      },
    ],
  },
  aside: {
    label: "Gids bij de waardechecker",
    onThisPage: "OP DEZE PAGINA",
    toc: {
      currentPrices: "Actuele prijzen",
      howToCheck: "Zo check je de waarde",
      priceMeaning: "Wat prijzen betekenen",
      psaValue: "Waarde van PSA-kaarten",
      limitations: "Beperkingen",
      questions: "Vragen",
    },
    directory: "Open de kaartencatalogus",
    tokenized: "Zo werken getokeniseerde kaarten",
  },
};
