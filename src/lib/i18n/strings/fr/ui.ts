import type { Strings } from "../en";
import type { Translation } from "../types";

/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  sale: "Et hop ! {card} est attrapé pour {price} !",
  saleNoPrice: "Et hop ! {card} est attrapé !",
  bidTaken: "{card} accepte une offre de {price} !",
  bidTakenNoPrice: "{card} accepte une offre !",
  listed: "Un {card} sauvage apparaît sur le marché !",
  reprice: "{card} change de prix !",
  delist: "{card} prend la fuite !",
  newBid: "Le Dresseur {trainer} lance une offre sur {card} !",
  bidEdit: "Le Dresseur {trainer} ajuste son offre sur {card}.",
  bidPulled: "Le Dresseur {trainer} rappelle son offre sur {card}.",
  other: "Il se passe quelque chose avec {card}…",
};

export const ui: Translation<Strings["ui"]> = {
  verbs: {
    SALE: "VENTE",
    "BID TAKEN": "OFFRE ACCEPTÉE",
    REPRICE: "NOUVEAU PRIX",
    DELIST: "RETRAIT",
    LISTED: "EN VENTE",
    "NEW BID": "NOUVELLE OFFRE",
    "BID EDIT": "OFFRE MODIFIÉE",
    "BID PULLED": "OFFRE RETIRÉE",
  },
  ripTiers: {
    common: { label: "Commune", ballName: "Poké Ball", cry: "Et hop !" },
    rare: { label: "Rare", ballName: "Super Ball", cry: "Belle prise !" },
    epic: { label: "Épique", ballName: "Hyper Ball", cry: "Hyper prise !" },
    legendary: { label: "Légendaire", ballName: "Master Ball", cry: "Un légendaire apparaît !" },
  },
  gachaTiers: {
    common: "Commune",
    uncommon: "Peu commune",
    rare: "Rare",
    epic: "Épique",
  },
  primitives: {
    otherCategory: "Autre",
    deal: "AFFAIRE",
    dealScore: "Score d’affaire {score}/100",
    loading: "Chargement",
  },
  unknownCard: "Carte inconnue",
  cardTile: {
    unlisted: "Pas en vente",
    insured: "assurée {value}",
  },
  activity: {
    unresolvedCard: "Carte non identifiée",
    fromWallet: "de {wallet}",
    byWallet: "par {wallet}",
    currentHolder: "détenteur actuel · {address}",
    bot: "BOT ×{n}",
    botOffers: { one: "{n} offre en une transaction", many: "{n} offres en une transaction", other: "{n} offres en une transaction" },
  },
  search: {
    placeholderCompact: "Chercher une carte ou un wallet",
    placeholder: "Chercher une carte ou coller une adresse de wallet",
    label: "Rechercher des cartes ou des wallets",
    button: "Rechercher",
    searching: "Recherche…",
    empty: "Aucune carte trouvée",
    seeAll: { one: "Voir {n} résultat", many: "Voir les {n} résultats", other: "Voir les {n} résultats" },
  },
  rail: { left: "Défiler vers la gauche", right: "Défiler vers la droite" },
  konami: { on: "Mode DMG activé ! Bienvenue en 1996.", off: "Retour à la couleur." },
  gameBoy: {
    modes: { all: "TOUT", trainers: "SANS BOTS", sales: "VENTES" },
    booting: "Démarrage du DEX…",
    empty: "Aucun Dresseur dans le coin. En attente du prochain mouvement…",
    live: "DIRECT",
    device: {
      power: "◀ OFF · ON ▶",
      stripe: "DIRECT ON-CHAIN · DOT MATRIX",
      battery: "BATTERY",
      model: "POCKET · {mode}",
      select: "SELECT",
      start: "START",
    },
    aria: {
      device: "Game Boy du marché en direct. Utilisez les flèches pour parcourir les événements et Entrée pour ouvrir une carte.",
      previous: "Événement précédent",
      next: "Événement suivant",
      b: "B : événement précédent",
      a: "A : événement suivant",
      select: "Select : filtre {mode}",
      start: "Start : ouvrir tout le flux",
    },
    battle,
  },
};
