import type { Strings } from "../en";
import type { Translation } from "../types";

/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  "sale": "¡Ya está! ¡{card} atrapado por {price}!",
  "saleNoPrice": "¡Ya está! ¡{card} atrapado!",
  "bidTaken": "¡{card} aceptó una puja de {price}!",
  "bidTakenNoPrice": "¡{card} aceptó una puja!",
  "listed": "¡Un {card} salvaje apareció en el mercado!",
  "reprice": "¡{card} cambió su precio!",
  "delist": "¡{card} huyó del mercado!",
  "newBid": "¡El Entrenador {trainer} le lanzó una puja a {card}!",
  "bidEdit": "El Entrenador {trainer} ajustó una puja por {card}.",
  "bidPulled": "El Entrenador {trainer} retiró una puja por {card}.",
  "other": "Algo le pasó a {card}..."
};

export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "VENTA",
    "BID TAKEN": "PUJA ACEPTADA",
    "REPRICE": "NUEVO PRECIO",
    "DELIST": "RETIRADO",
    "LISTED": "EN VENTA",
    "NEW BID": "NUEVA PUJA",
    "BID EDIT": "PUJA EDITADA",
    "BID PULLED": "PUJA RETIRADA"
  },
  "ripTiers": {
    "common": {
      "label": "Común",
      "ballName": "Poké Ball",
      "cry": "¡Ya está!"
    },
    "rare": {
      "label": "Rara",
      "ballName": "Super Ball",
      "cry": "¡Gran captura!"
    },
    "epic": {
      "label": "Épica",
      "ballName": "Ultra Ball",
      "cry": "¡Ultracaptura!"
    },
    "legendary": {
      "label": "Legendaria",
      "ballName": "Master Ball",
      "cry": "¡Apareció un legendario!"
    }
  },
  "gachaTiers": {
    "common": "Común",
    "uncommon": "Infrecuente",
    "rare": "Rara",
    "epic": "Épica"
  },
  "primitives": {
    "otherCategory": "Otros",
    "deal": "OFERTA",
    "dealScore": "Puntuación de oferta {score}/100",
    "loading": "Cargando"
  },
  "unknownCard": "Carta desconocida",
  "cardTile": {
    "unlisted": "No en venta",
    "insured": "aseg. {value}"
  },
  "activity": {
    "unresolvedCard": "Carta sin identificar",
    "fromWallet": "de {wallet}",
    "byWallet": "por {wallet}",
    "currentHolder": "dueño actual · {address}",
    "bot": "BOT ×{n}",
    "botOffers": {
      "one": "{n} puja en una transacción",
      "many": "{n} pujas en una transacción",
      "other": "{n} pujas en una transacción"
    }
  },
  "search": {
    "placeholderCompact": "Busca cartas o wallets",
    "placeholder": "Busca una carta o pega una dirección de wallet",
    "label": "Buscar cartas o wallets",
    "button": "Buscar",
    "searching": "Buscando...",
    "empty": "No se encontraron cartas",
    "seeAll": {
      "one": "Ver {n} resultado",
      "many": "Ver los {n} resultados",
      "other": "Ver los {n} resultados"
    }
  },
  "rail": {
    "left": "Desplazar a la izquierda",
    "right": "Desplazar a la derecha"
  },
  "konami": {
    "on": "¡Modo DMG activado! De vuelta a 1996.",
    "off": "Otra vez a todo color."
  },
  "gameBoy": {
    "modes": {
      "all": "TODO",
      "trainers": "SIN BOTS",
      "sales": "VENTAS"
    },
    "booting": "Encendiendo la DEX...",
    "empty": "No hay entrenadores cerca. Esperando el próximo movimiento...",
    "live": "EN VIVO",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "LIVE ON-CHAIN · DOT MATRIX",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "Game Boy del mercado en vivo. Usa las flechas para recorrer los eventos y Enter para abrir una carta.",
      "previous": "Evento anterior",
      "next": "Evento siguiente",
      "b": "B: evento anterior",
      "a": "A: evento siguiente",
      "select": "Select: filtro {mode}",
      "start": "Start: abrir todas las operaciones"
    },
    "battle": battle
  }
};
