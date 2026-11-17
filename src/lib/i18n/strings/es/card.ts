import type { Strings } from "../en";
import type { Translation } from "../types";
export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "Carta no encontrada",
    "title": "Precio de {name} · {set}",
    "titleNoSet": "Precio de {name}",
    "description": "{name}. Asegurada en {insured}. Precio en vivo, informe de población, pujas e historial on-chain en Decard.",
    "imageAlt": "{name}: valor asegurado, anuncio, mejor puja y población",
    "pullImageAlt": "{name} sacada de un sobre de {pack}, asegurada en {insured}",
    "pullTitle": "{name} sacada de un sobre de {pack}",
    "pullDescription": "Valor asegurado {insured}, {multiple} el precio del sobre. Precio del sobre indicado por quien lo comparte. Precio en vivo, informe de población y pujas en Decard.",
    "pullDescriptionNoValue": "Precio del sobre indicado por quien lo comparte. Precio en vivo, informe de población y pujas en Decard."
  },
  "jsonLd": {
    "gradingCompany": "Empresa de gradeo",
    "grade": "Nota",
    "set": "Set",
    "year": "Año",
    "cardNumber": "Número de carta",
    "parallel": "Paralela",
    "certNumber": "Número de certificación",
    "gradePopulation": "Población en esta nota",
    "populationHigher": "Población con nota superior",
    "totalPopulation": "Población gradeada total",
    "identifier": "Certificación {company} {cert}",
    "anyGrader": "Gradeo"
  },
  "loading": "Cargando carta",
  "breadcrumb": {
    "label": "Ruta de navegación",
    "scanner": "Escáner"
  },
  "sharedPull": {
    "label": "Pull compartido",
    "kicker": "PULL COMPARTIDO",
    "pulled": "Sacada de un sobre de {pack}.",
    "pulledWithValue": "Sacada de un sobre de {pack}. El valor asegurado es {multiple} el precio del sobre.",
    "note": "El precio del sobre lo indica quien compartió el enlace.",
    "cta": "Puntúa tus propias tiradas →"
  },
  "actions": {
    "viewOnCollectorCrypt": "Ver en Collector Crypt ↗",
    "buyOnSlabz": "Comprar en Slabz · {price} ↗"
  },
  "authenticated": "✓ Autenticada",
  "rarity": {
    "LEGENDARY": "LEGENDARIA",
    "RARE": "RARA",
    "UNCOMMON": "INFRECUENTE",
    "COMMON": "COMÚN"
  },
  "price": {
    "listed": "Precio de venta",
    "notListed": "No en venta",
    "listedOn": "en {venue} · actualizado {ago}",
    "insured": "ASEGURADO",
    "bestBid": "MEJOR PUJA",
    "underInsured": "{pct}% por debajo del valor asegurado",
    "overInsured": "{pct}% por encima del valor asegurado"
  },
  "facts": {
    "title": "Datos de la Pokédex",
    "set": "Set",
    "year": "Año",
    "number": "Número",
    "parallel": "Paralela",
    "grader": "Gradeadora",
    "grade": "Nota",
    "cert": "N.º de cert.",
    "vault": "Bóveda",
    "token": "Token"
  },
  "pop": {
    "title": "Estadísticas base · informe de población de {company}",
    "fullReport": "Informe completo ↗",
    "grade": "Pob. {grade}",
    "plain": "Pob.",
    "higher": "Superior",
    "total": "Total",
    "gemRate": "Tasa gem",
    "summary": "{pop} gradeadas con esta nota de {total} en total, {higher} con nota superior.",
    "summaryNoneHigher": "{pop} gradeadas con esta nota de {total} en total, y ninguna con nota superior.",
    "lastGem": "Última Gem Mint gradeada: {date}."
  },
  "bids": {
    "title": "Pujas en vivo",
    "count": "Pujas en vivo ({n})",
    "unavailable": "Las pujas en vivo no están disponibles ahora. Vuelve a mirar en un momento.",
    "none": "No hay pujas en vivo. Sé el primer entrenador en pujar.",
    "ofInsured": "{pct}% del aseg."
  },
  "trainer": {
    "title": "Entrenador",
    "collectorCryptName": "Nombre en Collector Crypt: {name}",
    "open": "Abrir la ficha de entrenador →",
    "unknown": "Dueño desconocido."
  },
  "history": {
    "title": "Historial on-chain",
    "error": "No se pudo leer el historial de esta carta ahora mismo.",
    "empty": "Todavía no hay historial de mercado on-chain."
  },
  "slab": {
    "showFront": "Mostrar el anverso del slab",
    "showBack": "Mostrar el reverso del slab",
    "backAlt": "{name}, reverso del slab",
    "flip": "↻ Girar slab"
  },
  "related": {
    "sameKicker": "Compara notas",
    "sameTitle": "Otros slabs de {name} en venta ahora",
    "sameSub": "Precios actuales, primero los más bajos.",
    "sameLabel": "Otros anuncios de {name}",
    "hubLink": "Precios de cartas de {name} por nota",
    "scannerLink": "Todos los anuncios de {name} en el escáner",
    "setKicker": "Mismo set",
    "setTitle": "Más de {set}",
    "setSub": "Primero los anuncios más nuevos.",
    "setLabel": "Más anuncios de {set}"
  },
  "receipt": {
    "button": "Compartir pull",
    "close": "Cerrar",
    "slabLabel": "Tu slab",
    "title": "Recibo del pull",
    "heading": "Comparte tu pull",
    "statsLabel": "Estadísticas del slab",
    "insured": "Asegurado",
    "bestBid": "Mejor puja",
    "listedAt": "En venta por {price} en {venue}",
    "notListed": "No está en venta ahora",
    "checking": "Comprobando el anuncio…",
    "packQuestion": "¿Cuánto costó el sobre?",
    "optional": "Opcional",
    "otherAmount": "Otra cantidad",
    "otherAmountLabel": "Otro precio del sobre en dólares",
    "noPack": "Sin sobre",
    "invalidPack": "Escribe de $1 a $100,000.",
    "meter": "Asegurado ÷ sobre",
    "exp": "EXP",
    "noteMultiple": "El valor asegurado es {multiple} el precio del sobre de {pack}.",
    "notePick": "Elige el precio del sobre para ver el múltiplo.",
    "noteNoValue": "Este slab no tiene valor asegurado registrado.",
    "shareIt": "Compártelo",
    "postOnX": "Publicar en X",
    "saveImage": "Guardar imagen",
    "more": "Más",
    "copy": "Copiar",
    "preview": "Vista previa del enlace",
    "previewNote": "Lo que muestran X y Discord",
    "previewAlt": "Imagen para compartir de {name}",
    "rendering": "Generando…",
    "fine": "El precio del sobre lo pones tú; nadie lo comprueba. El valor asegurado es la cifra de Collector Crypt, no un precio de venta. Las cifras de la imagen se actualizan una vez al día.",
    "lidTag": "RECIBO DEL PULL",
    "share": "Compartir",
    "copyLink": "Copiar enlace",
    "toast": {
      "discord": "Copiado. Pégalo en Discord y se desplegará el recibo.",
      "copied": "Enlace copiado.",
      "copyFailed": "No se pudo copiar. Mantén presionado el enlace para copiarlo.",
      "shareFailed": "No se abrió el menú para compartir. Copia el enlace."
    },
    "say": {
      "throw": "¡DECARD usó POKé BALL!",
      "click": "¡Clic!",
      "multiple": "¡Valor asegurado: {multiple} el sobre de {pack}!",
      "caught": "¡Ya está! ¡{name} atrapado!"
    },
    "post": {
      "pulled": "Me salió {name} en un sobre de {pack}.",
      "pulledWithValue": "Me salió {name} en un sobre de {pack}. Valor asegurado {insured} ({multiple} el sobre).",
      "insured": "valor asegurado {insured}",
      "pop": "población {pop}"
    }
  },
  "stage": {
    "showFront": "Mostrar el anverso del slab",
    "showBack": "Mostrar el reverso del slab",
    "flip": "↻ Girar",
    "tilt": "◎ Inclinar",
    "skip": "Saltar ▸▸"
  }
};
