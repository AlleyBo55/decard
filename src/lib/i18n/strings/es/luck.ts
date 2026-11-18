import type { Strings } from "../en";
import type { Translation } from "../types";

export const luck: Translation<Strings["luck"]> = {
  "cardFront": "Anverso de {name}",
  "tier": "Rareza {tier}",
  "score": "Puntuación de suerte {score}/100",
  "bar": "Suerte",
  "retry": "Reintentar",
  "share": {
    "shared": "Compartido",
    "copied": "Enlace copiado",
    "failed": "No se pudo compartir. Copia la URL de la barra de direcciones."
  },
  "page": {
    "breadcrumb": "Ruta de navegación",
    "crumb": "Gacha",
    "kicker": "Zona gacha",
    "h1": "Gacha en vivo, probabilidades actuales y {accent}",
    "h1Accent": "la suerte de tus tiradas.",
    "lede": "Mira cómo se abren al instante los sobres de Collector Crypt, consulta qué puede darte la próxima tirada antes de comprar y puntúa cualquier tirada según las cartas exactas y las probabilidades por rareza con las que salió. Pega una wallet para puntuar todas las tiradas que abrió, o un memo de sobre o una URL oficial del verificador.",
    "jumpLabel": "En esta página",
    "jump": {
      "live": "Tiradas en vivo",
      "hallOfFame": "Salón de la fama",
      "odds": "Probabilidades actuales"
    },
    "note": "Solo Collector Crypt en Solana. Los valores son valores asegurados, no precios de venta, retornos ni ganancias. Cada tirada es independiente: una mala racha no hace que el próximo sobre tenga más suerte.",
    "liveLabel": "Gacha en vivo"
  },
  "analyzer": {
    "kicker": "Testigo del sobre",
    "title": "Analiza tus tiradas",
    "sub": "Pega una wallet de Solana para puntuar todas las tiradas de sobres que abrió, o un memo de sobre cc-… o una URL oficial del verificador de Collector Crypt.",
    "label": "Dirección de wallet, memo del sobre o URL del verificador",
    "placeholder": "Pega tu wallet o un memo de sobre cc-…",
    "submit": "Analizar suerte",
    "help": "Solo se envía la dirección de wallet o el memo del sobre, ya normalizados. Puedes guardar en favoritos o compartir la URL del resultado.",
    "example": "Prueba el ejemplo documentado de Collector Crypt →",
    "invalidTitle": "Escribe una dirección de wallet o un memo de sobre de Collector Crypt.",
    "invalidBody": "Pega una dirección de wallet de Solana, un memo cc- con su ID completo o la URL oficial del verificador que lo contiene.",
    "loading": "Revisando la tirada histórica"
  },
  "errors": {
    "legacy": {
      "title": "Esta tirada antigua no se puede puntuar.",
      "body": "Las tiradas antiguas sin una captura verificable del pool histórico no tienen datos suficientes para una comparación justa."
    },
    "pending": {
      "title": "Esta tirada aún no está lista.",
      "body": "Collector Crypt todavía no publicó todos los datos de verificación de esta tirada. Vuelve a probar este memo más tarde."
    },
    "unverified": {
      "title": "Collector Crypt no verificó esta tirada.",
      "body": "Decard no muestra una puntuación de suerte si el testigo oficial de la selección no se verifica correctamente."
    },
    "incomplete": {
      "title": "Esta tirada no tiene datos históricos completos.",
      "body": "El pool o las probabilidades guardados están incompletos, así que Decard no puede calcular una puntuación de suerte fiable."
    },
    "badMemo": {
      "title": "No se pudo analizar ese memo de sobre.",
      "body": "Comprueba que sea de una tirada de Collector Crypt en Solana y vuelve a pegar el memo o su URL oficial del verificador."
    },
    "unavailable": {
      "title": "La fuente de datos de suerte no está disponible.",
      "body": "No se pudieron cargar los datos de origen de la tirada. Tu memo sigue en la URL, así que puedes volver a intentarlo sin problema."
    }
  },
  "result": {
    "verified": "Selección verificada",
    "percentile": "Percentil histórico",
    "beat": "Superaste el {pct} de las tiradas posibles.",
    "matchOrBeat": "El {pct} podría igualarla o superarla.",
    "metrics": {
      "insured": "Valor asegurado",
      "insuredDetail": "Valor histórico de la hoja fijada",
      "tierChance": "Probabilidad de la rareza",
      "tie": "Probabilidad de empate exacto",
      "tieDetail": "Mismo valor asegurado",
      "candidates": "Candidatas de la rareza",
      "candidatesDetail": "Pool de candidatas congelado",
      "available": "Disponibles en la tirada",
      "availableDetail": "Elegibles para la selección",
      "unavailable": "No disponibles en la tirada",
      "unavailableDetail": "Ya retiradas",
      "basis": "Base de las probabilidades",
      "committed": "Umbrales fijados",
      "published": "Probabilidades publicadas de la máquina",
      "poolVersion": "Versión del pool",
      "pulledAt": "Fecha de la tirada",
      "notReported": "No informado"
    },
    "note": "El valor asegurado describe el testigo histórico del sobre. No es un precio de mercado actual ni una estimación de ganancias.",
    "noteCommitted": "Las probabilidades por rareza se fijaron con este sobre.",
    "notePublished": "Este sobre antiguo muestra las probabilidades publicadas de la máquina, no umbrales fijados para cada sobre.",
    "cardPage": "Página de la carta →",
    "wallet": "Wallet {wallet} →",
    "walletLabel": "Abrir la wallet {wallet}",
    "solscan": "Transacción en Solscan ↗",
    "verifier": "Verificador oficial ↗",
    "share": "Compartir tirada",
    "shareLabel": "Compartir el resultado de suerte de {name}",
    "shareTitle": "Suerte en el gacha: {score}/100",
    "shareText": "{name} superó el {pct} de las tiradas posibles de su pool histórico.",
    "howTitle": "Cómo funciona la puntuación",
    "how": [
      "Puntuación de suerte = la probabilidad de una tirada con menor valor asegurado + la mitad de la probabilidad de una tirada del mismo valor. Primero se aplican las probabilidades por rareza y luego se comparan las cartas de la rareza que salió con el pool que estaba disponible en ese momento.",
      "Los valores asegurados iguales son empates. Cada empate cuenta como media victoria en el percentil de rango medio, en lugar de contarse como una carta que esta tirada superó."
    ]
  },
  "wallet": {
    "pulls": { "one": "{n} tirada", "many": "{n} tiradas", "other": "{n} tiradas" },
    "kicker": "Suerte de la wallet",
    "title": "Wallet {wallet}",
    "average": "Puntuación de suerte media",
    "score": "Suerte de la wallet {score}/100",
    "scorePending": "Suerte de la wallet …",
    "run": {
      "one": "En {n} tirada, tuviste más suerte que el {pct} de las series justas de {n} tirada.",
      "many": "En {n} tiradas, tuviste más suerte que el {pct} de las series justas de {n} tiradas.",
      "other": "En {n} tiradas, tuviste más suerte que el {pct} de las series justas de {n} tiradas."
    },
    "scoring": {
      "one": "Puntuando {done} de {n} tirada…",
      "many": "Puntuando {done} de {n} tiradas…",
      "other": "Puntuando {done} de {n} tiradas…"
    },
    "noneScored": "No se pudo puntuar ninguna de estas tiradas. La lista de abajo explica por qué.",
    "value": "Sacaste {value} en valor asegurado frente a {expected} esperados ({ratio}).",
    "valueSample": {
      "one": "Incluye {sample} de {n} tirada, la que informa el valor esperado.",
      "many": "Incluye {sample} de {n} tiradas, las que informan el valor esperado.",
      "other": "Incluye {sample} de {n} tiradas, las que informan el valor esperado."
    },
    "tiers": "Rarezas obtenidas",
    "share": "Compartir la suerte de la wallet",
    "shareTitle": "Suerte de la wallet en el gacha: {score}/100",
    "walletPage": "Página de la wallet →",
    "best": "Mejor tirada",
    "list": "Tiradas, las más recientes primero",
    "notScored": "Sin puntuar",
    "insured": "aseg. {value}",
    "reasons": {
      "legacy": "Tirada antigua, sin captura del pool",
      "unverified": "No verificada por Collector Crypt",
      "pending": "Aún sin verificar",
      "incomplete": "Datos históricos incompletos",
      "unsupported": "Tirada no compatible",
      "unavailable": "No disponible ahora mismo"
    },
    "errors": {
      "badWallet": {
        "title": "No se pudo leer esa dirección de wallet.",
        "body": "Comprueba que sea una dirección de wallet de Solana y vuelve a pegarla."
      },
      "unavailable": {
        "title": "El historial de esta wallet no está disponible ahora mismo.",
        "body": "No se pudo cargar su historial de transacciones en Solana. La wallet sigue en la URL, así que puedes volver a intentarlo sin problema."
      }
    },
    "loading": "Leyendo el historial de sobres de esta wallet",
    "notes": {
      "other": {
        "one": "Se omite {n} tirada que el verificador oficial no atribuye a esta wallet.",
        "many": "Se omiten {n} tiradas que el verificador oficial no atribuye a esta wallet.",
        "other": "Se omiten {n} tiradas que el verificador oficial no atribuye a esta wallet."
      },
      "latest": {
        "one": "Se muestra tu {n} tirada más reciente.",
        "many": "Se muestran tus {n} tiradas más recientes.",
        "other": "Se muestran tus {n} tiradas más recientes."
      },
      "scanned": {
        "one": "Se revisó {n} transacción, la más reciente.",
        "many": "Se revisaron las {n} transacciones más recientes.",
        "other": "Se revisaron las {n} transacciones más recientes."
      },
      "failed": {
        "one": "No se pudo puntuar {n} tirada.",
        "many": "No se pudieron puntuar {n} tiradas.",
        "other": "No se pudieron puntuar {n} tiradas."
      }
    },
    "empty": {
      "title": "No se encontraron tiradas de sobres de Collector Crypt en esta wallet.",
      "body": "Puede que Collector Crypt abra los sobres desde una wallet integrada. Si es así, pega la dirección de wallet que aparece en tu perfil de Collector Crypt.",
      "open": "Abrir la wallet {wallet} →"
    },
    "howTitle": "Cómo funciona la suerte de una wallet",
    "how": [
      "Cada tirada recibe su propia puntuación de suerte y la de la wallet es su media. 50 es suerte media: una tirada justa supera los 50 más o menos la mitad de las veces.",
      "El percentil de la serie compara esa media con series justas del mismo número de tiradas. Promediar 60 en 40 tiradas es mucho más raro que una sola tirada con 60.",
      "Los valores son valores asegurados del testigo histórico de cada sobre, no precios de venta ni ganancias. Cada tirada es independiente: una mala racha no hace que el próximo sobre tenga más suerte."
    ]
  },
  "gacha": {
    "kicker": "Gacha en vivo",
    "title": "Sobres abriéndose {accent}",
    "titleAccent": "ahora mismo.",
    "sub": "Cada apertura de sobres de Collector Crypt al instante, los mayores hits épicos de las últimas doce horas y lo que te puede dar una tirada ahora mismo.",
    "opening": "Abriendo",
    "packMultiple": "{multiple} el precio del sobre",
    "walletLuck": "Suerte de las tiradas de la wallet {wallet}",
    "live": "EN VIVO",
    "noEpics": "No hubo tiradas épicas recientemente."
  },
  "feed": {
    "title": "Tiradas en vivo",
    "perMinute": "Tiradas / min",
    "epics": "Épicas",
    "best": "Mejor ×",
    "footSeconds": "ÚLTIMOS {n} S · {pulls}",
    "footMinutes": "ÚLTIMOS {n} MIN · {pulls}",
    "footPulls": { "one": "{n} TIRADA", "many": "{n} TIRADAS", "other": "{n} TIRADAS" },
    "refresh": "SE ACTUALIZA CADA 10 S",
    "error": "El feed del gacha no respondió. Suele volver en unos segundos.",
    "empty": "No se abrió ningún sobre en el último par de minutos.",
    "turbo": "TURBO",
    "free": "GRATIS",
    "score": "PUNTUAR",
    "scorePull": "Puntuar esta tirada: {pack}, {tier}",
    "scorePullValue": "Puntuar esta tirada: {pack}, {tier}, {value}",
    "notAwarded": "aún sin asignar",
    "epic": "Hit épico: una carta de {value} en {pack}.",
    "epicMultiple": "Hit épico: una carta de {value} en {pack}, {multiple} veces el precio de {price}."
  },
  "hall": {
    "title": "Salón de la fama",
    "status": "RAREZA ÉPICA",
    "refresh": "SE ACTUALIZA CADA MINUTO",
    "sortLabel": "Ordenar hits por",
    "sorts": {
      "multiple": "Mayor ×",
      "value": "Mayor $",
      "newest": "Más recientes"
    },
    "window": { "one": "{n} tirada épica reciente", "many": "{n} tiradas épicas recientes", "other": "{n} tiradas épicas recientes" },
    "windowSince": {
      "one": "{n} tirada épica reciente · desde {ago}",
      "many": "{n} tiradas épicas recientes · desde {ago}",
      "other": "{n} tiradas épicas recientes · desde {ago}"
    },
    "windowLoading": "Últimas tiradas épicas",
    "error": "La lista de ganadores no cargó. Se reintenta cada minuto.",
    "topThree": "Los tres primeros",
    "ranks": "Puestos del 4 al 10",
    "podium": "{name}, {multiple} el precio del sobre, puesto {rank}"
  },
  "featured": {
    "title": "El mayor hit reciente",
    "label": "{name}, {multiple} el precio del sobre",
    "caption": {
      "one": "Mejor múltiplo de {n} tirada épica reciente.",
      "many": "Mejor múltiplo de las {n} tiradas épicas más recientes.",
      "other": "Mejor múltiplo de las {n} tiradas épicas más recientes."
    },
    "captionSince": {
      "one": "Mejor múltiplo de {n} tirada épica reciente, desde {ago}.",
      "many": "Mejor múltiplo de las {n} tiradas épicas más recientes, desde {ago}.",
      "other": "Mejor múltiplo de las {n} tiradas épicas más recientes, desde {ago}."
    }
  },
  "odds": {
    "cardBeats": "La carta vale ≥ lo que pagas",
    "sellBack": "La reventa devuelve ≥ lo que pagas",
    "double": "La carta vale 2× o más",
    "na": "n/d",
    "hp": "PS",
    "oneIn": "1 de cada {n}",
    "oneInPulls": { "many": "más o menos 1 de cada {n} tiradas", "other": "más o menos 1 de cada {n} tiradas" },
    "perPull": "{price} por tirada",
    "perDollar": "{cents} por cada $1",
    "poolAge": {
      "underMinute": "menos de un minuto",
      "minutes": { "other": "{n} min" },
      "hours": { "other": "{n} h" },
      "days": { "one": "{n} día", "many": "{n} días", "other": "{n} días" }
    },
    "snapshot": {
      "title": "PROBABILIDADES ACTUALES",
      "poolRead": "POOL LEÍDO HACE {age}",
      "failed": "Necesita el pool de cartas en vivo, que no cargó.",
      "missing": "No publicado para este sobre.",
      "topChase": "Mejor carta chase {value} · {odds}",
      "cashBack": "Lo que recuperas por cada $1 si revendes",
      "dashed": "La línea discontinua marca $1.00. Si una barra no llega hasta ella, revender devuelve de media menos de lo que cuesta la tirada."
    },
    "pullNow": {
      "title": "Si tiras ahora",
      "pool": "POOL DE HACE {age}",
      "tierOddsStatus": "PROB. POR RAREZA",
      "refresh": "SE ACTUALIZAN CADA 5 MIN",
      "error": "La lista de máquinas no cargó. Se reintenta cada minuto.",
      "empty": "No hay máquinas abiertas ahora mismo.",
      "categories": "Categoría de máquina",
      "machines": "Máquinas de {category}",
      "scrollLeft": "Desplazar las máquinas a la izquierda",
      "scrollRight": "Desplazar las máquinas a la derecha",
      "onePullOf": "Una tirada de",
      "unknownPack": "Ese sobre no está abierto ahora mismo, así que estos son sus últimos datos publicados.",
      "failed": "Las probabilidades del pool en vivo no cargaron, así que estos son los datos publicados de la máquina.",
      "chances": "Tus probabilidades en una tirada",
      "sellBack": "Si la revendes",
      "cashBack": "de vuelta de media por cada $1 que gastas",
      "gauge": "{cents} de vuelta por cada $1, de media. El punto de equilibrio es $1.00.",
      "ev": "Valor esperado por $1",
      "evNote": "Valor asegurado medio de la carta por cada $1. El valor asegurado no es dinero: al revender te pagan el {pct} de ese valor.",
      "tierOdds": "Probabilidades por rareza",
      "tierOddsLabel": "Probabilidades por rareza: {list}",
      "chase": "Cartas chase ahora mismo",
      "noChase": "No hay cartas chase publicadas para este sobre.",
      "chaseFailed": "Las cartas chase necesitan el pool en vivo, que no cargó.",
      "naFailed": "Esto necesita el pool de cartas en vivo, que no cargó.",
      "naMissing": "Collector Crypt no publicó los datos del pool que esto necesita.",
      "footPool": "Pool leído hace {age}.",
      "footPublished": "Directo de las probabilidades por rareza publicadas.",
      "footNote": "Las probabilidades por rareza no cambian entre tiradas; revender devuelve de media unos {range} por cada $1. Cada tirada es independiente."
    }
  }
};
