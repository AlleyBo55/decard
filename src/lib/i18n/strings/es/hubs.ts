import type { Strings } from "../en";
import type { Translation } from "../types";
export const hubs: Translation<Strings["hubs"]> = {
  "crumbs": {
    "label": "Ruta de navegación",
    "home": "Inicio",
    "cards": "Cartas",
    "pokemon": "Precios de cartas Pokémon"
  },
  "updated": "Actualizado: {time} · se renueva cada 15 minutos aprox.",
  "credit": "Imágenes de Pokémon de Pokémon HOME, vía {link}.",
  "browse": "Explora cartas por franquicia",
  "market": {
    "grade": "NOTA",
    "listed": "EN VENTA",
    "lowestAsk": "PRECIO MÁS BAJO",
    "medianAsk": "PRECIO MEDIANO",
    "lowestCard": "CARTA MÁS BARATA",
    "lowestPsa10": "PSA 10 MÁS BARATO",
    "onVenue": "en {venue}",
    "byGrade": "Precios por nota",
    "cheapest": "Primero las más baratas",
    "top": "Lo más alto del mercado"
  },
  "categoryMarket": {
    "empty": "No hay cartas gradeadas de {noun} en venta en USDC ahora mismo. Los nuevos slabs aparecen aquí a medida que los coleccionistas los tokenizan y los ponen a la venta.",
    "emptyLink": "Busca anuncios de {noun} en el escáner.",
    "listedNow": "EN VENTA AHORA",
    "graded": "GRADEADAS, EN USDC",
    "partial": {
      "other": "Esta actualización leyó los {read} anuncios más baratos de {n} anuncios de {noun}. Cada precio más bajo de aquí es exacto, pero las medianas se omiten en lugar de adivinarlas, y no aparece ninguna nota cuya copia más barata cueste más que esos anuncios."
    },
    "left": {
      "one": "{n} anuncio más está sin gradear, tiene precio en SOL o está muy por encima del valor asegurado, así que estos precios lo dejan fuera.",
      "many": "{n} anuncios más están sin gradear, tienen precio en SOL o están muy por encima del valor asegurado, así que estos precios los dejan fuera.",
      "other": "{n} anuncios más están sin gradear, tienen precio en SOL o están muy por encima del valor asegurado, así que estos precios los dejan fuera."
    },
    "thin": {
      "one": "Solo hay {n} carta gradeada de {noun} en venta en USDC ahora mismo, así que un solo anuncio nuevo puede mover estas cifras.",
      "many": "Solo hay {n} cartas gradeadas de {noun} en venta en USDC ahora mismo, así que un solo anuncio nuevo puede mover estas cifras.",
      "other": "Solo hay {n} cartas gradeadas de {noun} en venta en USDC ahora mismo, así que un solo anuncio nuevo puede mover estas cifras."
    },
    "byGradeTitle": "A qué precio están las cartas gradeadas de {noun}",
    "byGradeNote": "Cada nota agrupa todas las cartas de {noun} con esa nota, desde cartas comunes hasta cartas chase, así que abre la carta más barata para ver exactamente cuál es.",
    "cheapestTitle": "Las cartas gradeadas de {noun} más baratas",
    "cheapestMore": "Ordena y filtra los anuncios de {noun} en el escáner",
    "topTitle": "Los precios más altos de cartas de {noun}"
  },
  "guideMarket": {
    "allVenues": "Todos los mercados",
    "venue": "MERCADO",
    "venueGroup": "Mercado del anuncio",
    "none": "No hay slabs gradeados de {name} en venta en USDC ahora mismo.",
    "noneOn": "No hay slabs gradeados de {name} en {venue} en venta en USDC ahora mismo.",
    "seeAll": {
      "one": "Ver {n} en el escáner.",
      "many": "Ver los {n} en el escáner.",
      "other": "Ver los {n} en el escáner."
    },
    "gradedSlabs": "SLABS GRADEADOS",
    "priced": "CON PRECIO EN USDC",
    "left": {
      "one": "{n} anuncio más tiene precio en SOL o está muy por encima del valor asegurado, así que estos precios lo dejan fuera.",
      "many": "{n} anuncios más tienen precio en SOL o están muy por encima del valor asegurado, así que estos precios los dejan fuera.",
      "other": "{n} anuncios más tienen precio en SOL o están muy por encima del valor asegurado, así que estos precios los dejan fuera."
    },
    "everyListing": "El escáner muestra todos los anuncios.",
    "byGradeTitle": "A qué precio está {name} en cada nota",
    "byGradeTitleOn": "A qué precio está {name} en cada nota en {venue}",
    "byGradeNote": "Cada nota agrupa todas las impresiones de {name}, así que una misma nota puede abarcar cartas muy distintas. Abre la carta más barata para ver exactamente cuál es.",
    "cheapestTitle": "Las cartas gradeadas de {name} más baratas",
    "cheapestTitleOn": "Las cartas gradeadas de {name} más baratas en {venue}",
    "cheapestMore": "Ordena y filtra todos los anuncios de {name} en el escáner",
    "cheapestMoreOn": "Ordena y filtra todos los anuncios de {name} en {venue} en el escáner",
    "topTitle": "Los precios más altos de {name}",
    "topTitleOn": "Los precios más altos de {name} en {venue}"
  },
  "category": {
    "kicker": "Franquicia · cartas gradeadas tokenizadas",
    "lede": "Cartas gradeadas de {noun} en venta ahora en Collector Crypt y Magic Eden. Cada una es un slab real en una bóveda, que se posee mediante un token en Solana. Mira el precio más bajo y el mediano de cada nota, y abre cualquier carta para ver su informe de población, sus pujas y su historial. Los precios son precios pedidos en vivo, no ventas cerradas.",
    "ledeLowest": "Cartas gradeadas de {noun} en venta ahora en Collector Crypt y Magic Eden. Cada una es un slab real en una bóveda, que se posee mediante un token en Solana. Mira el precio más bajo de cada nota, y abre cualquier carta para ver su informe de población, sus pujas y su historial. Los precios son precios pedidos en vivo, no ventas cerradas.",
    "pokemonTitle": "¿Buscas un Pokémon en concreto?",
    "pokemonText": {
      "other": "Charizard, Pikachu, Umbreon y {n} más tienen su propia guía de precios, con el precio más bajo y el mediano de cada nota."
    },
    "pokemonAll": {
      "other": "Las {n} guías de precios Pokémon"
    },
    "unavailable": "Los anuncios de {noun} en vivo no están disponibles temporalmente. La guía de abajo sigue siendo válida, y el {scanner} muestra los anuncios actuales.",
    "unavailableLink": "escáner",
    "aboutTitle": "Sobre las cartas gradeadas de {noun}",
    "terms": "TÉRMINOS QUE VERÁS",
    "scannerMore": "Busca anuncios de {noun} en el escáner",
    "glossaryMore": "El glosario de cartas gradeadas y jerga",
    "explainerMore": "Cómo funcionan las cartas coleccionables tokenizadas",
    "salesMore": "Ventas recientes verificadas",
    "faqKicker": "Preguntas sobre {name}",
    "faqTitle": "Tus preguntas, respondidas.",
    "relatedTitle": "Franquicias relacionadas",
    "relatedName": "Cartas de {name}",
    "relatedSub": "Precios gradeados y anuncios en vivo →",
    "everyFranchise": "Todas las franquicias",
    "ldAbout": "Cartas coleccionables de {name}",
    "ldListings": "Cartas gradeadas de {noun} en venta ahora"
  },
  "index": {
    "kicker": "Guías de precios · cartas Pokémon gradeadas",
    "h1": "Precios de cartas Pokémon, {accent}",
    "h1Accent": "Pokémon a Pokémon.",
    "lede": "Elige un Pokémon para ver todos sus slabs gradeados en venta en Collector Crypt o Magic Eden, el precio más bajo y el mediano de cada nota, y las cartas más baratas y más valiosas del mercado ahora mismo.",
    "tile": "Precios PSA 10, PSA 9 y CGC →",
    "showsTitle": "Qué muestra cada guía",
    "shows": "Cada guía lee todos los anuncios gradeados de ese Pokémon en Collector Crypt y Magic Eden, indica el mercado de cada anuncio, te deja cambiar entre ellos y se actualiza cada 15 minutos aprox. Agrupa los precios pedidos en USDC por nota, enlaza la carta más barata de cada nota y muestra los slabs más baratos y más valiosos. Los precios son precios pedidos, no ventas cerradas.",
    "checkerMore": "Busca el valor de cualquier carta Pokémon",
    "salesMore": "Mira las ventas recientes verificadas",
    "ldGuides": "Guías de precios de cartas Pokémon"
  },
  "guide": {
    "description": "Precios en vivo de cartas Pokémon de {name} por nota: precios pedidos más bajos y medianos de slabs PSA 10, PSA 9, CGC y BGS en Collector Crypt y Magic Eden.",
    "h1": "Precios de cartas de {name} {accent}",
    "h1Accent": "por nota.",
    "lede": "Cada slab gradeado de {name} tokenizado por Collector Crypt y en venta ahora, en Collector Crypt o Magic Eden, con el precio pedido más bajo y el mediano de cada nota. Cambia de mercado para compararlos. Los precios son precios pedidos en vivo en USDC, no ventas cerradas.",
    "kicker": "Guía de precios Pokémon · slabs gradeados",
    "partial": "algunos anuncios no se pudieron leer esta vez",
    "unavailable": "Los anuncios de {name} en vivo no están disponibles temporalmente. La guía de abajo sigue siendo válida, y el escáner muestra todos los anuncios.",
    "empty": "No hay slabs gradeados de {name} en venta ahora mismo.",
    "howTitle": "Cómo leer los precios de {name}",
    "howPrintings": "{name} aparece en muchas cartas distintas: sets, años, números de carta, idiomas, acabados holo y promos. Dos slabs de {name} con la misma nota pueden tener precios muy diferentes porque son impresiones distintas, así que compara la carta exacta, no solo el nombre y la nota.",
    "howAsking": "Estos son precios pedidos: lo que los vendedores quieren hoy. Las {sales} y las pujas en vivo de cada página de carta muestran lo que los compradores pagan de verdad. El valor asegurado es una referencia, no un precio de venta garantizado.",
    "howAskingLink": "ventas recientes",
    "howGrades": "Las notas más altas suelen costar más, pero la escasez la marca el informe de población: cuántas copias registró la empresa de gradeo con esa nota o superior. Cada página de carta lo muestra.",
    "checkerMore": "Consulta el valor de cualquier carta Pokémon",
    "gradesMore": "Las notas de PSA, CGC y BGS, explicadas",
    "more": "Más guías de precios Pokémon",
    "loading": "Cargando la guía de precios",
    "ldName": "Precios de cartas de {name} por nota",
    "ldAbout": "Cartas coleccionables Pokémon de {name}"
  }
};
