import type { Strings } from "../en";
import type { Translation } from "../types";
export const gym: Translation<Strings["gym"]> = {
  "rank": "Puesto {n}",
  "showTop": "Mostrar los {n} primeros",
  "epicPlus": "Épica+",
  "page": {
    "breadcrumb": "Ruta de navegación",
    "crumb": "Liga Rip",
    "poweredBy": "Con tecnología de {logo}",
    "poweredByLabel": "Con tecnología de Slabz",
    "h1": "La Liga Rip. {accent}",
    "h1Accent": "Escala hasta Campeón.",
    "lede": "Entrenadores clasificados por los sobres que abren, y cada sobre de Slabz convertido en un gimnasio según sus probabilidades.",
    "rulesKicker": "Reglas de la liga",
    "rulesTitle": "Cómo funciona la liga",
    "rulesNote": "Los valores son valores asegurados, no precios de venta garantizados. Abre solo lo que estés dispuesto a gastar. Los sobres, las probabilidades y el feed de Slabz vienen de {slabz}.",
    "loading": "Cargando la liga"
  },
  "rules": [
    {
      "title": "Campeón y Alto Mando",
      "text": "Los entrenadores se ordenan por sobres abiertos y, después, por el valor de lo que sacaron. El primer puesto es Campeón; del segundo al quinto, Alto Mando; del sexto al décimo, Entrenador Guay, y del undécimo en adelante, Retador."
    },
    {
      "title": "Dos ligas",
      "text": "La Liga Decard cuenta cada sobre abierto en Decard. Slabz en vivo clasifica a todos los jugadores de Slabz según las últimas 100 tiradas en Slabz, más o menos las últimas horas, y se actualiza cada 30 segundos."
    },
    {
      "title": "Cada sobre es un gimnasio",
      "text": "Los gimnasios se ordenan según las probabilidades publicadas de cada sobre: la probabilidad de sacar una carta Épica o Legendaria, o el valor asegurado medio por tirada frente al precio del sobre."
    },
    {
      "title": "El Líder de Gimnasio",
      "text": "El líder de un gimnasio es la carta Legendaria más valiosa que puede salir en ese sobre. Cada tirada es aleatoria y las probabilidades son las mismas para todos: tu puesto nunca las cambia."
    }
  ],
  "titles": {
    "champion": "Campeón",
    "elite": "Alto Mando",
    "ace": "Entrenador Guay",
    "challenger": "Retador"
  },
  "badges": {
    "pokemon": "Medalla Chispa",
    "onepiece": "Medalla Timón",
    "dragonball": "Medalla Sol",
    "riftbound": "Medalla Grieta",
    "lorcana": "Medalla Tinta",
    "basketball": "Medalla Aro",
    "football": "Medalla Emparrillado",
    "baseball": "Medalla Jonrón",
    "soccer": "Medalla Césped",
    "sports": "Medalla Trofeo"
  },
  "span": {
    "fewHours": "las últimas horas",
    "minutes": { "one": "el último minuto", "many": "los últimos {n} minutos", "other": "los últimos {n} minutos" },
    "hours": { "one": "la última hora", "many": "las últimas {n} horas", "other": "las últimas {n} horas" }
  },
  "odds": {
    "oneIn": "1 de cada {n}",
    "most": "la mayoría de las tiradas"
  },
  "stats": {
    "rips": "Aperturas",
    "pulls": "Tiradas",
    "trainers": "Entrenadores",
    "players": "Jugadores",
    "pulled": "Valor sacado"
  },
  "ladder": {
    "heading": "Clasificaciones de entrenadores",
    "tabs": "Clasificaciones",
    "decardTab": "Liga Decard",
    "slabzTab": "Slabz en vivo",
    "open": "Abierta",
    "decardBlurb": "Los entrenadores de Decard, ordenados por los sobres que abrieron en Decard desde siempre.",
    "updated": "Actualizado {ago}.",
    "live": "EN VIVO",
    "slabzBlurb": {
      "one": "Todos los jugadores de Slabz ordenados por tiradas en la última apertura de Slabz, que cubre más o menos {span}.",
      "many": "Todos los jugadores de Slabz ordenados por tiradas en las últimas {n} aperturas de Slabz, que cubren más o menos {span}.",
      "other": "Todos los jugadores de Slabz ordenados por tiradas en las últimas {n} aperturas de Slabz, que cubren más o menos {span}."
    },
    "newest": "Última tirada {ago}.",
    "inviteTitle": "La Liga Decard está abierta.",
    "inviteText": "Abre un sobre en Decard y empiezas como su Campeón.",
    "seePodium": "Ver el podio",
    "ripPack": "Abre un sobre",
    "decardList": "Entrenadores de Decard",
    "slabzList": "Jugadores de Slabz",
    "showAllTrainers": { "one": "Mostrar {n} entrenador", "many": "Mostrar a los {n} entrenadores", "other": "Mostrar a los {n} entrenadores" },
    "showAllPlayers": { "one": "Mostrar {n} jugador", "many": "Mostrar a los {n} jugadores", "other": "Mostrar a los {n} jugadores" },
    "topThree": "Los tres primeros",
    "place": "Puesto {n}:",
    "openSpot": "Puesto libre",
    "claim": "Abre y es tuyo",
    "waiting": "Esperando a un entrenador",
    "bestPull": "Mejor carta",
    "rips": { "one": "{n} apertura", "many": "{n} aperturas", "other": "{n} aperturas" },
    "pulls": { "one": "{n} tirada", "many": "{n} tiradas", "other": "{n} tiradas" },
    "ghostName": "Tu nombre aquí",
    "ghostText": "Con un sobre abierto en Decard ya estás en la tabla.",
    "decardEmptyTitle": "La Liga Decard está abierta. El podio te espera.",
    "decardEmptyError": "La clasificación aparece aquí en cuanto los primeros entrenadores abran sobres, y se actualiza cada minuto. Abre un sobre y empiezas como Campeón.",
    "decardEmpty": "Todavía ningún entrenador abrió un sobre en Decard. Abre uno y empiezas como Campeón.",
    "slabzEmptyTitle": "La liga de Slabz se está tomando un respiro.",
    "slabzEmptyError": "El feed en vivo de Slabz no respondió. Vuelve por sí solo en un momento.",
    "slabzEmpty": "Ahora mismo no hay tiradas en el feed.",
    "seeSlabz": "Ver la liga de Slabz",
    "seeDecard": "Ver la Liga Decard"
  },
  "gyms": {
    "kicker": "Gimnasios",
    "title": "Cada sobre es un gimnasio",
    "lede": "Ordenados por tus posibilidades de sacar algo grande, según las probabilidades publicadas de cada sobre. El líder del gimnasio es la carta Legendaria más valiosa que puede salir en ese sobre.",
    "count": { "one": "{n} gimnasio", "many": "{n} gimnasios", "other": "{n} gimnasios" },
    "universes": { "one": "{n} universo", "many": "{n} universos", "other": "{n} universos" },
    "rankBy": "Ordenar gimnasios por",
    "showFrom": "Mostrar gimnasios de",
    "all": "Todos",
    "universeTitle": "{universe}: {badge}",
    "epic": "Épica o superior",
    "ev": "Mejor retorno",
    "noteLabel": "{label}:",
    "about": {
      "epic": "Tu probabilidad de que una tirada salga Épica o Legendaria.",
      "legendary": "Tu probabilidad de sacar la categoría más alta, donde espera el líder de cada gimnasio.",
      "ev": "El valor asegurado medio por tirada como porcentaje del precio del sobre. Más del 100% significa que la tirada media vale más que el sobre."
    },
    "tieEpic": "Ahora mismo todos los gimnasios abiertos tienen la misma probabilidad de Épica o superior, {pct} ({oneIn}), así que los empates se deciden por el mejor retorno.",
    "tieLegendary": "Ahora mismo todos los gimnasios abiertos tienen la misma probabilidad de Legendaria, {pct} ({oneIn}), así que los empates se deciden por el mejor retorno.",
    "error": "Los gimnasios están cerrados un momento. Los sobres vuelven enseguida.",
    "none": "Ahora mismo no hay gimnasios abiertos.",
    "showAll": { "one": "Mostrar {n} gimnasio", "many": "Mostrar los {n} gimnasios", "other": "Mostrar los {n} gimnasios" },
    "card": {
      "kind": "Gimnasio de {universe} · {badge}",
      "vs": "VS",
      "leader": "Líder",
      "scouting": "Buscando al líder…",
      "hiding": "El líder está escondido",
      "ret": "Retorno",
      "avg": "media {value}",
      "heat": { "one": "{n} apertura en Slabz en {span}", "many": "{n} aperturas en Slabz en {span}", "other": "{n} aperturas en Slabz en {span}" },
      "cold": "Ninguna apertura en Slabz en {span}",
      "ours": { "one": "{n} apertura en Decard", "many": "{n} aperturas en Decard", "other": "{n} aperturas en Decard" },
      "challenge": "Retar",
      "challengeLabel": "Reta al gimnasio {name}: abre un sobre por {price}",
      "paused": "Vuelve pronto",
      "closed": "Cerrado"
    }
  },
  "hall": {
    "kicker": "Salón de la Fama",
    "title": "Los mayores hits de Slabz ahora mismo",
    "lede": "Las cartas más valiosas que salieron en Slabz en {span}. En vivo, se actualiza cada 30 segundos.",
    "rank": "#{n}"
  }
};
