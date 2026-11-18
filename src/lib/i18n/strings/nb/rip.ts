import type { Strings } from "../en";
import type { Translation } from "../types";

export const rip: Translation<Strings["rip"]> = {
  "page": {
    "breadcrumb": "Brødsmulesti",
    "poweredBy": "Drevet av {logo}",
    "h1": "Åpne en pakke. {accent}",
    "h1Accent": "Fang en slab.",
    "lede": {
      "one": "En ekte gradert slab i hver pakke, i {n} univers som åpnes på sin egen måte.",
      "other": "En ekte gradert slab i hver pakke, fordelt på {n} universer som åpnes på hver sin måte."
    },
    "howKicker": "Slik fungerer det",
    "howTitle": "Fire steg til slaben din",
    "steps": [
      {
        "title": "Velg univers",
        "text": "Pokémon, One Piece, Dragon Ball, Riftbound, Lorcana eller sport. Hver pakke viser oddsen, snittverdien per trekk og de største drømmekortene."
      },
      {
        "title": "Hold for å åpne",
        "text": "Logg inn med en gratis melding i lommeboken, hold deretter inne pakken eller trykk på Åpne, og godkjenn USDC-betalingen."
      },
      {
        "title": "Riv den opp",
        "text": "Hvert univers har sin egen avsløring. Lyset fra sømmen viser sjeldenheten før kortet snur seg."
      },
      {
        "title": "Behold eller selg",
        "text": "Behold den graderte slaben i lommeboken, eller selg den tilbake med ett trykk innen 72 timer."
      }
    ],
    "faqKicker": "Spørsmål om pakkeåpning",
    "faqTitle": "Før du åpner",
    "faq": [
      {
        "q": "Hva er i en Slabz-pakke?",
        "a": "Ett ekte gradert samlekort (PSA, BGS eller CGC) fra pakkens univers, oppbevart i hvelv og levert til Solana-lommeboken din som en NFT. Slabz driver pakkene; Decard er der du åpner dem."
      },
      {
        "q": "Hvordan betaler jeg?",
        "a": "Med USDC fra din egen Solana-lommebok, pluss litt SOL til nettverksgebyrer. Prisen på knappen er prisen på pakken. Decard oppbevarer aldri pengene eller nøklene dine: lommeboken din signerer hver betaling."
      },
      {
        "q": "Kan jeg selge et kort tilbake?",
        "a": "Ja, med ett trykk, innen 72 timer etter at du åpnet pakken. Beløpet på salgsknappen er det som havner i lommeboken din."
      },
      {
        "q": "Hva er Turbo?",
        "a": "Når en pakke begynner å gå tom for vanlige kort, lar Turbo deg åpne likevel: trekker du et vanlig kort, blir det utbetalt i USDC til lommeboken din i stedet for kortet. Sjeldnere trekk kommer som vanlig."
      },
      {
        "q": "Hva er XP, nivåer og merker?",
        "a": "Trenerkortet ditt: hver åpning gir XP, sjeldnere trekk gir mer, og merker viser milepæler som ditt første sjeldne kort eller 3 dager på rad. De bygges fra trekkene i lommeboken din og lagres på denne enheten. De endrer aldri oddsen."
      },
      {
        "q": "Hva om en åpning blir avbrutt?",
        "a": "Du belastes ikke før betalingen er bekreftet på kjeden. Når pakken er betalt, venter den i samlingen din til den åpnes, og det er trygt å prøve å åpne den på nytt: en pakke deles aldri ut to ganger."
      }
    ],
    "disclaimer": "Hvert trekk er tilfeldig. Verdiene er forsikringsverdier, ikke garanterte salgspriser. Åpne bare pakker for penger du er komfortabel med å bruke. Pakker, odds og utbetalinger drives av {slabz}."
  },
  "universeNames": {
    "basketball": "Basketball",
    "football": "Amerikansk fotball",
    "baseball": "Baseball",
    "soccer": "Fotball",
    "sports": "Sport"
  },
  "universes": {
    "pokemon": { "cry": "Der satt den! {name} ble fanget!", "valueLabel": "Forsikringsverdi", "tagline": "Kast en ball. Fang en slab.", "dealing": "Vipp … vipp … vipp …" },
    "onepiece": { "cry": "Ny dusør! {name}!", "valueLabel": "Dusør", "tagline": "Sett seil mot One Piece.", "dealing": "Heiser opp skatten…" },
    "dragonball": { "cry": "Kraften stiger! {name}!", "valueLabel": "Kraftnivå", "tagline": "Lad opp til over 9000.", "dealing": "Samler energi…" },
    "riftbound": { "cry": "Påkalt fra Riften: {name}!", "valueLabel": "Riftverdi", "tagline": "Riften er åpen.", "dealing": "Riften åpner seg…" },
    "lorcana": { "cry": "Skapt av blekk! {name} blir med i historien din.", "valueLabel": "Lore-verdi", "tagline": "Skap noe legendarisk med blekk.", "dealing": "Tegner kortet ditt med blekk…" },
    "basketball": { "cry": "Swish! {name}!", "valueLabel": "Kortverdi", "tagline": "Rent i kurven.", "dealing": "Går opp for en dunk…" },
    "football": { "cry": "Touchdown! {name}!", "valueLabel": "Kortverdi", "tagline": "Kast langt.", "dealing": "Ballen er i luften…" },
    "baseball": { "cry": "Home run! {name}!", "valueLabel": "Kortverdi", "tagline": "Slå den ut av banen.", "dealing": "Her kommer kastet…" },
    "soccer": { "cry": "MÅÅÅL! {name}!", "valueLabel": "Kortverdi", "tagline": "Rett i krysset.", "dealing": "Gjør klar til frispark…" },
    "sports": { "cry": "Storspill! {name}!", "valueLabel": "Kortverdi", "tagline": "All sport i én pakke.", "dealing": "Sjekker reprisen…" }
  },
  "lab": {
    "devnet": "Devnet · test-USDC",
    "offline": "Pakkemaskinen er frakoblet akkurat nå. Pakkene er snart tilbake.",
    "empty": "Pakkehyllen er tom akkurat nå.",
    "pullsKicker": "Trenerkort",
    "pullsTitle": "Nivået, merkene og trekkene dine",
    "pullsText": "XP for hver åpning, merker for de beste trekkene dine og alle kortene du har fanget, klare til å beholdes eller selges tilbake.",
    "opening": "Åpner pakken din",
    "unknownPack": "Slabz-pakke"
  },
  "machine": {
    "arena": "Pakkearena",
    "universes": "Universer",
    "buy": "Åpne denne pakken",
    "paused": "Pauset",
    "price": "Pris",
    "avgPull": "Snitt per trekk",
    "avgPullHint": "Forventet forsikringsverdi for ett trekk",
    "sellBack": "Selg tilbake",
    "sellBackHint": "Selg hvilket som helst kort tilbake med ett trykk, innen 72 timer etter åpning",
    "avgPullPct": "Snitt per trekk {pct}\u00A0% av prisen",
    "turbo": "Turbo",
    "turboSub": "Selg vanlige kort automatisk for USDC",
    "turboHint": "Når det er lite vanlige kort igjen, blir et vanlig trekk utbetalt i USDC i stedet for kortet, slik at åpningen alltid går gjennom",
    "rip": "Åpne pakken",
    "ripping": "Åpner…",
    "fine": "En ekte gradert slab i hver pakke. Behold den, eller selg den tilbake med ett trykk.",
    "topGrails": "Største drømmekort",
    "howItWorks": "Slik fungerer det",
    "stage": "{universe}-pakker. Bla med piltastene.",
    "slot": "{name}, {price}",
    "slotSelected": "{name}, {price}, valgt",
    "hold": "Hold for å åpne",
    "prev": "Forrige pakke",
    "next": "Neste pakke",
    "prices": "Pakkepris",
    "dockRip": "Åpne"
  },
  "odds": {
    "title": "Odds",
    "perPack": "1 kort per pakke",
    "refreshing": "Oddsen oppdateres. Tilbake om et øyeblikk.",
    "seeGrails": "Se de største drømmekortene",
    "chase": "Chase-kort",
    "oneIn": "1 av {n}",
    "mostPulls": "de fleste trekk"
  },
  "cutscene": {
    "soundOn": "Slå på lyd",
    "mute": "Slå av lyd",
    "close": "Lukk",
    "progress": "Fremdrift for åpningen",
    "steps": { "reserve": "Reserver", "approve": "Godkjenn", "pay": "Betal", "open": "Åpne" },
    "buying": "Henter en fersk pakke fra hvelvet…",
    "buyingSub": "Reserverer {pack} til deg. Du belastes ikke før du godkjenner i lommeboken din.",
    "turbo": "Det er lite vanlige kort igjen i denne pakken!",
    "turboSub": "Slå på Turbo for å åpne likevel: et vanlig trekk blir utbetalt i USDC til lommeboken din i stedet for kortet. Sjeldne og bedre trekk kommer som vanlig.",
    "signing": "Godkjenn {price} USDC i lommeboken din",
    "signingSub": "Sjekk beløpet i popup-vinduet. Betalingen er gyldig i omtrent ett minutt.",
    "paying": "Sender betalingen din til Solana…",
    "payingSub": "Tar som regel noen sekunder. Hold denne fanen åpen.",
    "openingSub": "Betalt! Kortet ditt deles ut. Du kan lukke dette: det venter i samlingen din.",
    "stoppedPaid": "Pakken din er trygg!",
    "stopped": "Åpningen stoppet.",
    "ripTurbo": "Åpne med Turbo",
    "retryOpen": "Prøv å åpne igjen",
    "retry": "Prøv igjen",
    "notNow": "Ikke nå",
    "holdLabel": "Hold inne for å rive opp pakken",
    "hold": "Hold for å åpne",
    "legendary": "LEGENDARISK!",
    "skip": "Hopp over",
    "frames": { "dex": "Nr. {n} {name}", "wanted": "ETTERLYST", "jumbotron": "★ HØYDEPUNKT ★", "scouter": "KRAFTNIVÅ" }
  },
  "result": {
    "xp": "+{xp} XP",
    "mult": "{mult} pakkeprisen",
    "turboPaid": "Turbo betalte {price} USDC til lommeboken din for dette vanlige kortet.",
    "quoting": "Sjekker prisen for tilbakesalg",
    "sell": "Selg nå · {price} USDC",
    "signing": "Godkjenn salget i lommeboken din…",
    "settling": "Selger",
    "sold": "Solgt! {amount} USDC til lommeboken din.",
    "receipt": "Kvittering",
    "retry": "Prøv igjen",
    "ripAgain": "Åpne igjen · {price}",
    "done": "Ferdig",
    "keep": "Behold",
    "share": "Del trekket"
  },
  "news": {
    "levelUp": "{level} Nytt nivå! Du er nå {title}.",
    "badge": "Merke låst opp: {name}"
  },
  "trainer": {
    "level": "Lv {n}",
    "titles": {
      "Rookie": "Fersking",
      "Ace Trainer": "Topptrener",
      "Gym Leader": "Gymleder",
      "Elite Four": "Elite Four",
      "Champion": "Mester",
      "Legend": "Legende"
    },
    "badges": {
      "first": { "name": "Første fangst", "hint": "Åpne den første pakken din" },
      "green": { "name": "I pluss", "hint": "Trekk et kort som er verdt mer enn pakken" },
      "rare": { "name": "Sjeldent funn", "hint": "Trekk et sjeldent kort eller bedre" },
      "epic": { "name": "Episk jeger", "hint": "Trekk et episk kort" },
      "legend": { "name": "Legendarisk", "hint": "Trekk et legendarisk kort" },
      "big": { "name": "Kjempehit", "hint": "Trekk 3× pakkeprisen" },
      "travel": { "name": "Globetrotter", "hint": "Åpne pakker fra 3 universer" },
      "ten": { "name": "Samler", "hint": "Åpne 10 pakker" },
      "streak": { "name": "I fyr og flamme", "hint": "Åpne pakker 3 dager på rad" },
      "flip": { "name": "Kjapp flipp", "hint": "Selg et kort tilbake" }
    },
    "startTitle": "Start trenerkortet ditt",
    "startText": "Hver åpning gir XP. Gå opp i nivå fra Fersking til Mester, hold rekken i gang dag etter dag, og lås opp merker for de beste trekkene dine.",
    "connect": "Koble til lommebok",
    "xpLabel": "XP til neste nivå",
    "xp": "{xp} XP · {next} til Lv {level}",
    "streak": "På rad",
    "rips": "Åpninger",
    "best": "Beste",
    "badgesLabel": "Merker",
    "badgeHint": "{name}: {hint}",
    "earned": "{name}, oppnådd",
    "locked": "{name}, låst: {hint}",
    "today": "I dag: {rips} · {spent} brukt · {pulled} trukket",
    "ripsToday": { "one": "{n} åpning", "other": "{n} åpninger" },
    "keepStreak": {
      "one": "Åpne en pakke i dag for å beholde rekken din på {n} dag.",
      "other": "Åpne en pakke i dag for å beholde rekken din på {n} dager."
    },
    "nextBadge": "Neste merke: {hint}.",
    "allBadges": "Alle merker er låst opp. Mesterklasse."
  },
  "box": {
    "error": "Trekkene dine ble ikke lastet inn. Prøv igjen om et øyeblikk.",
    "empty": "Samlingen din er tom. Velg en pakke og åpne din første!",
    "pack": "{price}-pakke",
    "paid": "Betalt · klar til å åpnes",
    "open": "Åpne den",
    "view": "Se {name}",
    "mult": "{mult} pakken",
    "turboPaid": "Turbo betalte {price} USDC",
    "sell": "Selg eller behold",
    "viewButton": "Se",
    "loading": "Laster…",
    "older": "Eldre trekk"
  },
  "grails": {
    "kicker": "Største drømmekort",
    "title": "Chase-kort i {pack}",
    "showTop": "Vis de største drømmekortene",
    "showAll": "Se alle kortene",
    "filter": "Filtrer etter sjeldenhet",
    "all": "Alle",
    "error": "Kortutvalget ble ikke lastet inn. Det oppdateres av seg selv om litt.",
    "loading": "Laster…",
    "more": "Last inn flere kort"
  },
  "hits": {
    "label": "Siste trekk",
    "live": "TREKK LIVE",
    "empty": "Ingen trekk ennå. Bli den første treneren som åpner en pakke på Decard!"
  },
  "wallet": {
    "trainer": "Lv {level} · {title}",
    "streak": { "one": "{n} dag på rad", "other": "{n} dager på rad" },
    "signedIn": "● Logget inn",
    "signedInDevnet": "● Logget inn · devnet",
    "sessionEnds": "Økten varer til {time}.",
    "signOut": "Logg ut",
    "checkWallet": "Sjekk lommeboken din",
    "connecting": "Kobler til…",
    "connect": "Koble til",
    "connectLong": "Koble til lommebok",
    "signIn": "Logg inn",
    "signInLong": "Logg inn for å åpne pakker",
    "pickerTitle": "Velg lommebok",
    "pickerText": "Du signerer en kort melding for å bevise at lommeboken er din. Det er gratis: ingen transaksjon, ingen gebyr.",
    "none": "Fant ingen Solana-lommebok",
    "noneText": "På mobil åpner du Decard inne i lommebokappen din. På datamaskin installerer du en lommebok og laster inn siden på nytt.",
    "approveSignIn": "Godkjenn innloggingen i lommeboken din",
    "connectingDots": "Kobler til",
    "close": "Lukk",
    "rejected": "Du lukket lommebokvinduet. Ingenting ble signert.",
    "failed": "Den lommeboken kunne ikke logge inn. Prøv igjen, eller velg en annen lommebok."
  },
  "flow": {
    "openFailed": "{error} Pakken din er betalt: åpne den fra samlingen din.",
    "openSlow": "Kortet ditt deles fortsatt ut. Pakken er betalt og trygg: åpne den fra samlingen din om et minutt.",
    "rejected": "Nettverket avviste betalingen, som regel fordi det var for lite USDC eller SOL, eller fordi et vindu sto åpent for lenge. Du ble ikke belastet.",
    "unconfirmed": "Vi kunne ikke bekrefte betalingen ennå. Hvis den gikk gjennom, dukker pakken opp i samlingen din, klar til å åpnes. Ikke betal på nytt.",
    "closed": "Du lukket lommebokvinduet, så du ble ikke belastet. Den reserverte pakken frigjøres av seg selv.",
    "signFailed": "Lommeboken din kunne ikke signere betalingen. Du ble ikke belastet.",
    "generic": "Noe gikk galt. Prøv igjen."
  },
  "sale": {
    "unavailable": "Tilbakesalg er ikke tilgjengelig for dette kortet.",
    "autoSold": "Turbo har allerede utbetalt dette vanlige kortet i USDC.",
    "boughtBack": "Allerede solgt tilbake.",
    "quoteFailed": "Kunne ikke hente prisen for tilbakesalg.",
    "failed": "Salget gikk ikke gjennom. Kortet er fortsatt ditt: prøv igjen.",
    "settling": "Salget behandles fortsatt. Sjekk igjen om et minutt før du prøver på nytt.",
    "closed": "Fristen på 72 timer for tilbakesalg har gått ut.",
    "startFailed": "Kunne ikke starte salget.",
    "signFailed": "Lommeboken din kunne ikke signere salget. Ingenting ble endret.",
    "rejected": "Nettverket avviste salget. Kortet er fortsatt ditt: prøv igjen."
  }
};
