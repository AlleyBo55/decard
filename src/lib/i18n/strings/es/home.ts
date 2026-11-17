import type { Strings } from "../en";
import type { Translation } from "../types";
export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · Pokédex de cartas gradeadas",
  "live": "EN VIVO",
  "hero": {
    "lead": "",
    "scan": "Escanéalos",
    "tail": "a todos."
  },
  "lede": "Anuncios en vivo de Collector Crypt, Magic Eden y Slabz, puntuaciones de oferta y los movimientos de cada wallet, para cartas gradeadas tokenizadas en Solana.",
  "newKicker": "Novedades en Decard",
  "newTitle": "Abre sobres y quédate con slabs de verdad.",
  "typeKicker": "Elige tu tipo",
  "typeTitle": "Explora por franquicia.",
  "typeSub": "Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, deportes y más, todo gradeado: precios en vivo por nota de cada slab en venta en Collector Crypt, Magic Eden y Slabz.",
  "faqKicker": "Preguntas del Entrenador",
  "faqTitle": "Tus preguntas, respondidas.",
  "tipTitle": "CONSEJO DEL PROFESOR",
  "tip": "Un PSA 10 con una población de 12 no tiene nada que ver con un PSA 10 que tiene todo el mundo. Antes de comprar, mira el informe de población, la tasa de Gem Mint y cuánto se aleja el precio del valor asegurado.",
  "guideBtn": "Lee la Guía del Entrenador",
  "dealBtn": "Busca una oferta",
  "title": "Cartas gradeadas en Solana: sobres, precios y canje",
  "description": "Abre sobres con slabs reales de PSA, CGC y BGS, busca ofertas en Collector Crypt, Magic Eden y Slabz y recibe la carta física en casa. Pokémon, One Piece y más.",
  "faq": [
    {
      "q": "¿Qué es Decard?",
      "a": "Un escáner y rastreador gratis y de código abierto para cartas gradeadas tokenizadas en Solana. Ordena los anuncios en vivo de Collector Crypt, Magic Eden y Slabz por puntuación de oferta, decodifica cada venta, anuncio y puja on-chain, y muestra informes de población y las cartas de cualquier wallet."
    },
    {
      "q": "¿Qué es la puntuación de oferta?",
      "a": "Cuánto está un anuncio en USDC por debajo del valor asegurado de la carta, de 0 a 100. Una carta asegurada en $100 y a la venta por $80 tiene un 20. Si ordenas el escáner por mejor oferta, verás primero los descuentos más grandes."
    },
    {
      "q": "¿Decard es parte de Collector Crypt?",
      "a": "No. Decard es independiente y está hecho por fans. Lee la API pública del mercado de Collector Crypt y la blockchain de Solana, y te lleva a Collector Crypt, Magic Eden o Slabz cuando quieres comprar."
    },
    {
      "q": "¿Tengo que registrarme o conectar una wallet?",
      "a": "No para mirar. El escáner, las operaciones en vivo y los rastreadores son de solo lectura: sin cuenta, sin conectar wallet y sin clave de API. Pega cualquier dirección de Solana para ver las cartas gradeadas de esa wallet y su actividad en el mercado. Conecta una wallet solo si quieres abrir sobres."
    },
    {
      "q": "¿Qué cartas cubre Decard?",
      "a": "Todas las cartas gradeadas tokenizadas en venta en Collector Crypt, Magic Eden o Slabz: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam y cartas deportivas, gradeadas por PSA, CGC, Beckett (BGS) y otras empresas."
    },
    {
      "q": "¿De dónde salen los datos?",
      "a": "Los anuncios, los valores asegurados, las pujas y los informes de población vienen de la API pública de Collector Crypt. Las operaciones en vivo se decodifican del programa del mercado de Collector Crypt en Solana. No hay base de datos: cada número se lee en vivo."
    }
  ],
  "more": [
    { "href": "/pokemon-card-value-checker", "label": "Consulta el valor de una carta Pokémon" },
    { "href": "/pokemon", "label": "Precios de cartas por Pokémon" },
    { "href": "/luck", "label": "Mide la suerte de una tirada del gacha" },
    { "href": "/cards-token", "label": "Precio, recompras y quemas de $CARDS" },
    { "href": "/sales", "label": "Ventas recientes verificadas" },
    { "href": "/cards", "label": "Explora todas las cartas en venta" },
    { "href": "/tokenized-trading-cards", "label": "Cómo funcionan las cartas coleccionables tokenizadas" },
    { "href": "/guide", "label": "Todos los términos de la Guía del Entrenador" }
  ],
  "stats": {
    "listed": "Cartas en venta",
    "floor": "Mínimo",
    "top": "Anuncio más caro"
  },
  "catch": {
    "unlisted": "No en venta",
    "blip": "{card}, {price}",
    "blipUnder": "{card}, {price}, {under}% por debajo del valor asegurado",
    "throw": "Lanza la Poké Ball para atrapar una oferta",
    "throw3d": "Lanza la Poké Ball para atrapar una oferta al azar",
    "caught": "¡Ya está! ¡{card} atrapado!",
    "insured": "valor asegurado {value}",
    "under": "{pct}% por debajo",
    "view": "Ver carta",
    "again": "Lanzar otra vez",
    "shaking": "Se mueve… se mueve…",
    "prompt": "Toca la Poké Ball para atrapar una oferta",
    "promptAgain": "Toca la Poké Ball para lanzarla otra vez"
  },
  "ticker": {
    "label": "Recién publicadas",
    "loading": "Leyendo el mercado…",
    "empty": "No hay anuncios nuevos en los últimos minutos."
  },
  "ripCard": {
    "title": "Abre sobres de cartas gradeadas.",
    "hook": "Un slab real de {psa}, {bgs} o {cgc} en cada sobre.",
    "body": "Pokémon, One Piece, Dragon Ball, Lorcana y deportes, cada uno con su propia revelación. Quédate con el slab o revéndelo en un toque.",
    "cta": "Abre un sobre",
    "gym": "{gym} clasificaciones y probabilidades de los sobres",
    "gymName": "Rip Gym:",
    "pulled": "Recién sacadas",
    "pullsLabel": "Últimas cartas sacadas en Decard",
    "idle": "Cada sobre trae un slab gradeado real. Abre uno y tu carta aparecerá aquí."
  },
  "redeemCard": {
    "eyebrow": "Canjear",
    "title": "Lleva tu slab {em}",
    "titleEm": "a casa.",
    "body": "¿Te salió una joya? Cambia su NFT por el slab gradeado real, enviado desde la bóveda hasta tu puerta.",
    "cta": "Canjear una carta",
    "vault": "Bóveda",
    "town": "Tu ciudad"
  },
  "gachaCard": {
    "live": "Gacha en vivo",
    "title": "Sobres abriéndose ahora mismo.",
    "body": "Cada sobre de Collector Crypt que se abre, al instante.",
    "cta": "Ver el gacha en vivo",
    "score": "Puntúa mis tiradas",
    "counting": "Contando tiradas…",
    "perMinute": {
      "one": "{n} tirada por minuto",
      "many": "{n} tiradas por minuto",
      "other": "{n} tiradas por minuto"
    },
    "biggest": "mayor hit reciente {multiple}, {card} {value}"
  },
  "market": {
    "kicker": "En el mercado",
    "tabsLabel": "Anuncios",
    "tabs": {
      "deals": {
        "label": "Mejores ofertas",
        "title": "Por debajo del valor asegurado, {em}",
        "em": "ordenadas.",
        "sub": "Anuncios en vivo en USDC, ordenados según cuánto están por debajo del valor asegurado de la bóveda. Cuanto más llena la barra de PS, mayor el descuento.",
        "more": "Abrir el escáner"
      },
      "new": {
        "label": "Recién publicadas",
        "title": "Recién llegadas al mercado.",
        "sub": "Los anuncios más nuevos de Collector Crypt y Magic Eden, en cuanto aparecen.",
        "more": "Ver todas las novedades"
      },
      "top": {
        "label": "La vitrina",
        "title": "Las cartas más caras en venta.",
        "sub": "Griales y Gem Mint, del precio más alto al más bajo.",
        "more": "Ver la vitrina"
      }
    }
  },
  "onChain": {
    "kicker": "En vivo on-chain",
    "title": "Cada movimiento, al instante.",
    "sub": "Decodificado directamente del programa del mercado de Collector Crypt: cada venta, anuncio y puja.",
    "more": "Todas las operaciones en vivo",
    "gameBoy": "A y B cambian de evento, SELECT oculta los bots y START abre todas las operaciones.",
    "moves": "Últimos movimientos",
    "quiet": "El mercado está tranquilo ahora mismo.",
    "bidsTitle": "Pujas calientes",
    "bidsSub": "Cartas que reciben pujas ahora mismo, con la mejor puja en vivo.",
    "bids": {
      "one": "{n} puja",
      "many": "{n} pujas",
      "other": "{n} pujas"
    },
    "ofInsured": "{pct}% del aseg.",
    "noBids": "No hay pujas en vivo en el periodo reciente."
  },
  "offline": {
    "title": "La Pokédex perdió la señal por un momento.",
    "retry": "Reintentar",
    "text": "Los datos del mercado no respondieron. Suelen volver en unos segundos."
  },
  "snapshot": {
    "kicker": "Resumen del mercado",
    "title": "Elige un tipo, lee el mercado.",
    "sub": "Cartas en venta, precio mínimo y el anuncio más caro de cada categoría, en Collector Crypt, Magic Eden y Slabz."
  },
  "dex": {
    "allVenues": "Todos los mercados",
    "venue": "Mercado",
    "no": "N.º {no}",
    "type": "Categoría de tipo {type}",
    "listed": "En venta",
    "floor": "Mínimo",
    "top": "Anuncio más caro",
    "floorCard": "Carta más barata: {card} por {price}",
    "types": {
      "electric": "Eléctrico",
      "water": "Agua",
      "fire": "Fuego",
      "grass": "Planta",
      "psychic": "Psíquico",
      "fighting": "Lucha",
      "dragon": "Dragón",
      "fairy": "Hada",
      "ghost": "Fantasma",
      "dark": "Siniestro",
      "steel": "Acero",
      "ground": "Tierra",
      "flying": "Volador",
      "normal": "Normal"
    }
  }
};
