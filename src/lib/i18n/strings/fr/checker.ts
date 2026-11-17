import type { Strings } from "../en";
import type { Translation } from "../types";
export const checker: Translation<Strings["checker"]> = {
  breadcrumb: {
    label: "Fil d’Ariane",
    home: "Accueil",
    page: "Estimation de cartes Pokémon",
  },
  ld: {
    about: ["Prix des cartes Pokémon", "Valeur des cartes à collectionner gradées", "Gradation PSA"],
    currentPrices: "Prix demandés actuels des cartes Pokémon gradées",
  },
  hero: {
    kicker: "Cote Pokémon · valeurs PSA · cartes gradées",
    h1: "Estimez la valeur de vos {accent}",
    h1Accent: "cartes Pokémon.",
    lede: "Cherchez une carte Pokémon gradée par nom, set, numéro de carte, numéro de certificat ou mint Solana. Comparez son prix demandé actuel à sa référence assurée, puis examinez les offres, la population et l’historique du marché sur la page de la carte.",
    meta: "Gratuit, en lecture seule et sans inscription · Revu le {date} · Outil de données indépendant, pas une expertise",
  },
  search: {
    label: "Quelle carte Pokémon voulez-vous estimer ?",
    hint: "Ajoutez le set, l’année, le numéro de carte et la note si vous les connaissez. Une recherche précise distingue les impressions qui se ressemblent.",
    placeholder: "ex. 1999 Charizard 4/102 PSA 10",
    submit: "Voir les annonces en direct",
    example: "Chercher {name}",
  },
  prices: {
    kicker: "Aperçu du marché en direct",
    title: "Prix demandés actuels des cartes Pokémon",
    intro: "Des annonces récentes et crédibles de cartes Pokémon gradées en USDC, chacune avec sa plateforme. Les annonces et les valeurs assurées viennent de l’API de Collector Crypt, qui couvre Collector Crypt et Magic Eden. Cet aperçu est mis en cache jusqu’à cinq minutes. Les prix demandés et les références assurées servent à comparer : ce ne sont pas des valeurs de vente garanties.",
    unavailable: "Les exemples actuels sont temporairement indisponibles. La recherche ouvre toujours le scanner du marché en direct.",
    empty: "Les exemples actuels sont temporairement indisponibles. L’outil d’estimation et les guides de recherche sur les cartes fonctionnent toujours.",
    cardAlt: "Recto de {name}",
    asking: "PRIX DEMANDÉ",
    insured: "RÉF. ASSURÉE",
    underInsured: "Prix demandé {pct} % sous la valeur assurée",
    venue: "Sur {venue}",
    updated: "mis à jour le {date}",
    browseAll: "Parcourir toutes les annonces Pokémon en direct",
    guidesTitle: "Guides des prix par Pokémon",
    guide: "Cote {name}",
    allGuides: "Tous les guides des prix Pokémon",
  },
  howTo: {
    title: "Comment estimer la valeur d’une carte Pokémon",
    steps: [
      {
        title: "1. Identifiez la carte exacte",
        text: "Vérifiez l’année, le set, le numéro de carte, la langue, la variante parallèle, l’édition et la présence d’un autographe. Un nom de personnage connu ne suffit pas.",
      },
      {
        title: "2. Vérifiez le slab",
        text: "Contrôlez la société de gradation, la note chiffrée et le numéro de certificat. Comparez l’étiquette physique avec la fiche de la société de gradation.",
      },
      {
        title: "3. Comparez la demande réelle",
        text: "Les ventes récentes acceptées et les offres actives montrent ce que les acheteurs ont payé ou pourraient payer. Un prix demandé sans vente montre seulement ce qu’un vendeur veut.",
      },
      {
        title: "4. Tenez compte de la rareté et de la liquidité",
        text: "Examinez la population à cette note, les exemplaires mieux notés, la profondeur des annonces et l’activité des transactions. La rareté ne compte que si les collectionneurs veulent aussi la carte.",
      },
    ],
    cardPage: "Ouvrez la page d’une carte sur Decard pour réunir l’identité, la note, le certificat, le prix demandé, la valeur assurée, la meilleure offre, le rapport de population et l’historique on-chain décodé. Aucun champ ne suffit seul à estimer une carte.",
  },
  priceMeaning: {
    title: "Prix demandé, valeur assurée et valeur de marché sont différents",
    terms: "Un {listingPrice} est la demande actuelle du vendeur. Il ne prouve pas qu’un acheteur l’acceptera. Une {insuredValue} est une référence fournie avec la carte en coffre. Elle est utile pour comparer, mais ce n’est ni un paiement garanti, ni une expertise, ni un futur prix de vente.",
    listingPrice: "prix demandé",
    insuredValue: "valeur assurée",
    dealScore: "Le score d’affaire de Decard mesure l’écart entre un prix demandé en USDC et la valeur assurée. Par exemple, une carte assurée 100 $ et en vente à 80 $ obtient 20. Cela veut dire « en vente 20 % sous la référence assurée », et non « 20 % de profit garanti ».",
    estimate: "Une estimation plus solide combine les ventes récentes acceptées, les offres actives, les annonces comparables, la note exacte et la population de la carte. Pour les slabs peu échangés, l’écart peut être grand entre le prix demandé affiché et le prix qu’un acheteur paiera vraiment.",
  },
  psa: {
    title: "Qu’est-ce qui détermine la valeur d’une carte Pokémon PSA ?",
    grade: "PSA 10 est la note chiffrée standard la plus haute, mais elle ne rend pas chaque carte chère. La demande pour le personnage, le set, l’année d’impression, la langue, l’édition, le numéro de carte, l’illustration, la rareté et la population influent tous sur la valeur. Une PSA 9 peut être plus rare ou plus recherchée qu’une PSA 10 sans rapport.",
    multiplier: "Il n’existe pas de multiplicateur universel fiable pour passer d’une carte non gradée à une PSA 9 ou une PSA 10. Le coût de la gradation, le risque d’authentification, l’incertitude sur l’état et le nombre d’exemplaires bien notés changent d’une carte à l’autre. Comparez la même impression à la même note chaque fois que possible.",
    more: "Comprendre les termes PSA, CGC, BGS et population",
  },
  limits: {
    title: "Ce que cet outil peut et ne peut pas vous dire",
    coverage: "Decard couvre les cartes physiques gradées par des professionnels, tokenisées sur Solana et échangées sur Collector Crypt, Magic Eden et Slabz. Il n’estime pas l’état des cartes non gradées, ne promet pas leur authenticité au-delà des données affichées de la société de gradation et du dépositaire, et ne prédit aucun prix futur.",
    verify: "La disponibilité sur les plateformes, les offres, les valeurs assurées et les conditions de récupération peuvent changer. Vérifiez la carte, la certification, l’annonce, le dépositaire et les conditions de retrait actuels avant de prendre une décision. Decard est indépendant, fait par des fans et non affilié à PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt ou Magic Eden.",
  },
  faq: {
    title: "Questions fréquentes sur la valeur des cartes Pokémon",
    items: [
      {
        q: "Combien vaut ma carte Pokémon ?",
        a: "Identifiez d’abord l’impression exacte et l’état de la carte, puis comparez la même carte à la même note à l’aide des ventes acceptées, des offres actives et des annonces crédibles. Le nom d’une carte ne suffit pas pour obtenir une valeur fiable.",
      },
      {
        q: "Une note PSA 10 garantit-elle une valeur élevée ?",
        a: "Non. La note décrit l’état et l’authentification. La demande, la rareté, la population et la liquidité déterminent si les collectionneurs paieront plus cher.",
      },
      {
        q: "Faut-il se fier aux prix demandés ou aux prix de vente ?",
        a: "Aux deux, mais donnez plus de poids aux ventes récentes comparables et aux offres actives. Les prix demandés montrent ce qui est disponible et ce qu’attendent les vendeurs, y compris des annonces qui ne trouveront peut-être jamais preneur.",
      },
      {
        q: "Decard est-il gratuit ?",
        a: "Oui. Les pages de recherche sont publiques et en lecture seule, et estimer une carte ne demande ni wallet ni compte.",
      },
    ],
  },
  aside: {
    label: "Guide de l’estimation",
    onThisPage: "SUR CETTE PAGE",
    toc: {
      currentPrices: "Prix actuels",
      howToCheck: "Comment estimer",
      priceMeaning: "Ce que disent les prix",
      psaValue: "Valeur des cartes PSA",
      limitations: "Limites",
      questions: "Questions",
    },
    directory: "Ouvrir le catalogue des cartes gradées",
    tokenized: "Comment fonctionnent les cartes tokenisées",
  },
};
