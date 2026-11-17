import type { Strings } from "../en";
import type { Translation } from "../types";
export const market: Translation<Strings["market"]> = {
  "breadcrumb": "Ruta de navegación",
  "scanner": {
    "kicker": "Escáner de anuncios",
    "h1a": "Cada anuncio,",
    "h1b": "ordenado.",
    "lede": "Cartas gradeadas en vivo en Collector Crypt, Magic Eden y Slabz. La puntuación de oferta muestra cuánto está cada anuncio en USDC por debajo de su valor asegurado, para que las mejores compras queden arriba.",
    "prices": "Consulta precios de cartas Pokémon y valores PSA →",
    "directory": "Explora el catálogo de cartas gradeadas por nombre exacto, nota, set y año →",
    "crumb": "Escáner",
    "categoryTitle": "Cartas gradeadas de {name} en venta en Solana",
    "categoryTitleShort": "Cartas gradeadas de {name} en Solana",
    "categoryDescription": "Anuncios en vivo de cartas gradeadas de {name} en Collector Crypt y Magic Eden, ordenados por puntuación de oferta: cuánto está cada slab por debajo de su valor asegurado.",
    "scanning": "Escaneando el mercado"
  },
  "scannerTable": {
    "allTypes": "Todos los tipos",
    "filter": "Filtra por nombre, set, mint o n.º de certificado",
    "filterLabel": "Filtrar anuncios",
    "sortLabel": "Ordenar",
    "sorts": {
      "deal": "Mejor oferta",
      "listedDateDesc": "Más nuevos",
      "listedPriceAsc": "Precio ↑",
      "listedPriceDesc": "Precio ↓"
    },
    "venueLabel": "Mercado",
    "allVenues": "Todos",
    "min": "$ mín.",
    "max": "$ máx.",
    "minLabel": "precio mínimo",
    "maxLabel": "precio máximo",
    "viewLabel": "Vista",
    "list": "Lista",
    "grid": "Cuadrícula",
    "matching": {
      "one": "{n} carta encontrada",
      "many": "{n} cartas encontradas",
      "other": "{n} cartas encontradas"
    },
    "deals": "ofertas de cartas gradeadas entre las más nuevas y baratas, las mejores primero",
    "dealsSlabz": "ofertas de cartas gradeadas de lo más alto de la lista de ofertas de Slabz, las mejores primero",
    "updating": "ACTUALIZANDO",
    "errorTitle": "¡El escáner se debilitó!",
    "errorText": "El mercado no respondió. Vuelve a intentarlo en un momento.",
    "retry": "Revívelo",
    "empty": "No hay cartas aquí. Prueba otro tipo o amplía el rango de precios.",
    "columns": {
      "card": "CARTA",
      "price": "PRECIO",
      "insured": "ASEGURADO",
      "deal": "OFERTA",
      "listed": "PUBLICADO"
    },
    "unlisted": "No en venta",
    "aboveInsured": "Sobre el asegurado",
    "loadingMore": "Cargando...",
    "loadMore": "Cargar más cartas"
  },
  "tape": {
    "kicker": "Operaciones en vivo",
    "h1": "El {accent} del mercado.",
    "h1Accent": "pulso",
    "lede": "Cada movimiento en el programa del mercado de Collector Crypt, decodificado en tiempo real: quién compró qué, con qué nota, por cuánto y a quién.",
    "sales": "Ventas recientes con precios y enlaces a la transacción en Solana →"
  },
  "tapeBoard": {
    "volume": "Volumen de ventas",
    "volumeNote": {
      "one": "{n} venta",
      "many": "{n} ventas",
      "other": "{n} ventas"
    },
    "biggest": "Mayor venta",
    "biggestNote": "en este periodo",
    "bids": "Movimientos de pujas",
    "bidsNote": {
      "other": "{n} de bots de pujas masivas"
    },
    "traders": "Entrenadores activos",
    "tradersNote": {
      "one": "último {n} evento",
      "many": "últimos {n} eventos",
      "other": "últimos {n} eventos"
    },
    "filterLabel": "Filtrar",
    "filters": {
      "all": "Todo",
      "sales": "Ventas",
      "listings": "Anuncios",
      "bids": "Pujas"
    },
    "hideBots": "Ocultar bots de pujas masivas",
    "refresh": "CADA 10 s",
    "errorTitle": "¡Se enredó la cinta!",
    "errorText": "El RPC público de Solana no respondió. Suele recuperarse en segundos.",
    "retry": "Reintentar",
    "emptyTitle": "No hay nada en este filtro ahora mismo.",
    "emptyText": "Prueba con “Todo” o muestra los bots masivos. Las ventas en Collector Crypt llegan a rachas."
  },
  "sales": {
    "loading": "Cargando ventas recientes",
    "kicker": "Ventas cerradas · verificadas en Solana",
    "h1": "Ventas recientes de cartas, {accent}",
    "h1Accent": "registradas.",
    "lede": "Las últimas ventas cerradas de cartas gradeadas tokenizadas en el mercado de Collector Crypt: qué se vendió, con qué nota, por cuánto y entre qué wallets. Cada fila enlaza a la transacción de Solana que la cerró.",
    "window": "Ventas entre {from} y {to} · se actualiza cada 5 minutos aprox.",
    "unavailable": "Las ventas no están disponibles temporalmente. Las operaciones en vivo siguen mostrando la actividad del mercado al instante.",
    "empty": "No hay ventas cerradas en el último periodo. Las operaciones en vivo muestran anuncios y pujas al instante.",
    "stats": {
      "sales": "VENTAS",
      "volume": "VOLUMEN USDC",
      "median": "VENTA MEDIANA",
      "window": "PERIODO"
    },
    "hours": "{n} h",
    "biggest": "Mayor venta de este periodo: {card} por {price}.",
    "biggestUnresolved": "una carta aún sin identificar",
    "unresolved": "Carta aún sin identificar",
    "trade": "de {seller} {arrow} {buyer}",
    "soldList": "Cartas vendidas recientemente",
    "sourceTitle": "De dónde salen estas ventas",
    "sourceTreasury": "Las ventas del mercado de Collector Crypt pagan una comisión a la wallet de tesorería de Collector Crypt. Decard lee de Solana las transacciones más nuevas de esa wallet, decodifica la instrucción del mercado en cada una y se queda con las ventas cerradas que llevan precio. Los nombres, las notas y las imágenes de las cartas vienen del catálogo de Collector Crypt, emparejados por la dirección on-chain del activo de cada carta.",
    "sourcePrice": "Las compras usan el precio escrito en la instrucción. En las pujas aceptadas sobre cartas en venta, el precio es el abono en USDC al vendedor, sumándole la comisión del 2% del mercado. Las ventas cerradas en SOL muestran su cantidad en SOL y quedan fuera de los totales en dólares.",
    "sourceScope": "Solo aparecen las ventas del mercado de Collector Crypt. Las cartas de Collector Crypt también se venden en Magic Eden, y esas ventas no se incluyen aquí.",
    "coverTitle": "Lo que esta lista no cubre",
    "coverWindow": "Es un periodo reciente de unas pocas horas, no un historial completo. Cada página de carta muestra su propio historial on-chain, y las operaciones en vivo muestran anuncios y pujas al instante.",
    "coverValue": "Un precio de venta es lo que pagó un comprador una vez. Compara varias ventas de la misma carta y nota, y revisa las pujas en vivo, antes de tomar una sola venta como el valor de la carta. No es asesoramiento financiero.",
    "links": {
      "tape": "Ver las operaciones en vivo",
      "pokemon": "Precios de cartas por Pokémon",
      "checker": "Consulta el valor de una carta Pokémon"
    }
  },
  "cards": {
    "loading": "Cargando el catálogo de cartas",
    "pageTitle": "{title}, página {n}",
    "pageDescription": "Página {n} de las cartas gradeadas en venta, por nombre exacto, nota, set, año, número de carta y categoría, incluidas cartas Pokémon y slabs PSA.",
    "crumb": "Catálogo de cartas gradeadas",
    "crumbPage": "Página {n}",
    "kicker": "Anuncios actuales · ordenados por nombre",
    "list": "Cartas gradeadas en venta ahora",
    "listPage": "Cartas gradeadas en venta ahora, página {n}",
    "count": {
      "one": "{n} carta gradeada en venta, con precios del {time}.",
      "many": "{n} cartas gradeadas en venta, con precios del {time}.",
      "other": "{n} cartas gradeadas en venta, con precios del {time}."
    },
    "countRange": {
      "one": "Cartas {from}–{to} de {n} carta gradeada en venta, con precios del {time}.",
      "many": "Cartas {from}–{to} de {n} cartas gradeadas en venta, con precios del {time}.",
      "other": "Cartas {from}–{to} de {n} cartas gradeadas en venta, con precios del {time}."
    },
    "pageOf": "Página {page} de {total}",
    "serial": "N.º {serial}",
    "emptyTitle": "No hay cartas gradeadas en venta ahora mismo.",
    "emptyText": "El catálogo deja fuera los artículos sin gradear, los sobres y el merchandising.",
    "pagination": "Paginación del catálogo de cartas",
    "previous": "Anterior",
    "next": "Siguiente",
    "current": "Página {n}, página actual",
    "goTo": "Ir a la página {n}"
  },
  "wallet": {
    "title": "Entrenador {addr}",
    "description": "Colección de cartas gradeadas, valor asegurado y actividad on-chain en el mercado de la wallet {addr}.",
    "kicker": "Buscar entrenador",
    "loading": "Abriendo la ficha de entrenador",
    "trainer": "Entrenador",
    "card": "FICHA DE ENTRENADOR",
    "watch": "Agregar a la lista de seguimiento",
    "unwatch": "Quitar de la lista de seguimiento",
    "name": "NOMBRE",
    "namePlaceholder": "Ponle nombre a este entrenador",
    "rename": "Renombrar",
    "label": "+ Etiqueta",
    "bot": "Bot",
    "known": "Conocida",
    "id": "N.º ID",
    "copy": "Copiar",
    "copied": "¡Copiado!",
    "luck": "Suerte en tiradas →",
    "badges": "MEDALLAS",
    "stats": {
      "cards": "CARTAS",
      "value": "VALOR",
      "listed": "EN VENTA"
    },
    "sections": "Secciones del entrenador",
    "collection": "Colección",
    "collectionCount": "Colección ({n})",
    "activity": "Actividad",
    "sortLabel": "Ordenar colección",
    "sorts": {
      "value": "Valor asegurado",
      "price": "Precio de venta",
      "name": "Nombre"
    },
    "bagError": "No se pudo abrir la mochila de este entrenador ahora mismo.",
    "bagEmpty": "La mochila de este entrenador está vacía.",
    "bagEmptyText": "No se encontraron cartas de Collector Crypt en esta wallet.",
    "showing": {
      "one": "Se muestra {shown} de {n} carta.",
      "many": "Se muestran las primeras {shown} de {n} cartas.",
      "other": "Se muestran las primeras {shown} de {n} cartas."
    },
    "activityError": "La blockchain no respondió. Vuelve a intentarlo en un momento.",
    "activityEmpty": "Todavía no hay movimientos de mercado de este entrenador.",
    "sprite": "Sprite del entrenador"
  }
};
