import type { Strings } from "../en";
import type { Translation } from "../types";
export const checker: Translation<Strings["checker"]> = {
  "breadcrumb": {
    "label": "Ruta de navegación",
    "home": "Inicio",
    "page": "Valor de cartas Pokémon"
  },
  "ld": {
    "about": ["Precios de cartas Pokémon", "Valor de cartas coleccionables gradeadas", "Gradeo PSA"],
    "currentPrices": "Precios actuales de cartas Pokémon gradeadas en venta"
  },
  "hero": {
    "kicker": "Precios Pokémon · valores PSA · cartas gradeadas",
    "h1": "¿Cuánto vale tu {accent}",
    "h1Accent": "carta Pokémon?",
    "lede": "Busca una carta Pokémon gradeada por nombre, set, número de carta, número de certificación o mint de Solana. Compara su precio pedido actual con su referencia asegurada y luego revisa las pujas, la población y el historial de mercado en la página de la carta.",
    "meta": "Gratis, de solo lectura y sin registro · Revisado el {date} · Herramienta de datos independiente, no una tasación"
  },
  "search": {
    "label": "¿Qué carta Pokémon quieres consultar?",
    "hint": "Agrega el set, el año, el número de carta y la nota si los sabes. Las búsquedas concretas separan impresiones parecidas.",
    "placeholder": "p. ej. 1999 Charizard 4/102 PSA 10",
    "submit": "Ver anuncios en vivo",
    "example": "Buscar {name}"
  },
  "prices": {
    "kicker": "Resumen del mercado en vivo",
    "title": "Precios actuales de cartas Pokémon en venta",
    "intro": "Anuncios recientes y fiables en USDC de cartas Pokémon gradeadas, cada uno con su mercado indicado. Los anuncios y los valores asegurados vienen de la API de Collector Crypt, que cubre Collector Crypt y Magic Eden. Este resumen se guarda en caché hasta cinco minutos. Los precios pedidos y las referencias aseguradas sirven para comparar, no son valores de venta garantizados.",
    "unavailable": "Los ejemplos actuales no están disponibles temporalmente. La búsqueda sigue abriendo el escáner del mercado en vivo.",
    "empty": "Los ejemplos actuales no están disponibles temporalmente. El consultor de valor y las guías de cartas siguen funcionando.",
    "cardAlt": "Anverso de {name}",
    "asking": "PRECIO",
    "insured": "REF. ASEGURADA",
    "underInsured": "Precio {pct}% por debajo del valor asegurado",
    "venue": "En {venue}",
    "updated": "actualizado el {date}",
    "browseAll": "Ver todos los anuncios Pokémon en vivo",
    "guidesTitle": "Guías de precios por Pokémon",
    "guide": "Precios de {name}",
    "allGuides": "Todas las guías de precios Pokémon"
  },
  "howTo": {
    "title": "Cómo consultar el valor de una carta Pokémon",
    "steps": [
      {
        "title": "1. Identifica la carta exacta",
        "text": "Comprueba el año, el set, el número de carta, el idioma, la paralela, la edición y si está firmada. Un nombre de personaje conocido no basta."
      },
      {
        "title": "2. Confirma el slab",
        "text": "Revisa la empresa de gradeo, la nota numérica y el número de certificación. Compara la etiqueta física con el registro de la empresa de gradeo."
      },
      {
        "title": "3. Compara la demanda real",
        "text": "Las ventas aceptadas recientes y las pujas activas muestran lo que los compradores pagaron o podrían pagar. Un precio pedido sin vender solo muestra lo que quiere un vendedor."
      },
      {
        "title": "4. Ajusta por escasez y liquidez",
        "text": "Revisa la población de la nota, las copias con nota superior, la cantidad de anuncios y la actividad de transacciones. La escasez solo importa cuando los coleccionistas también quieren la carta."
      }
    ],
    "cardPage": "Abre la página de una carta en Decard para reunir su identidad, nota, certificado, precio pedido, valor asegurado, mejor puja, informe de población e historial on-chain decodificado. Ningún dato por sí solo es una valoración completa."
  },
  "priceMeaning": {
    "title": "Precio pedido, valor asegurado y valor de mercado no son lo mismo",
    "terms": "Un {listingPrice} es lo que pide ahora el vendedor. No demuestra que un comprador lo vaya a aceptar. Un {insuredValue} es una referencia que acompaña a la carta en bóveda. Sirve para comparar, pero no es un pago garantizado, una tasación ni un precio de venta futuro.",
    "listingPrice": "precio de anuncio",
    "insuredValue": "valor asegurado",
    "dealScore": "La puntuación de oferta de Decard mide cuánto está un precio pedido en USDC por debajo del valor asegurado. Por ejemplo, una carta asegurada en $100 y a la venta por $80 tiene un 20. Eso significa “a la venta un 20% por debajo de la referencia asegurada”, no “20% de beneficio garantizado”.",
    "estimate": "Una estimación más sólida combina ventas aceptadas recientes, pujas activas, anuncios comparables, la nota exacta y la población de la carta. Los slabs con poco movimiento pueden tener una gran diferencia entre el precio pedido visible y lo que un comprador pagará de verdad."
  },
  "psa": {
    "title": "¿Qué determina el valor de una carta Pokémon PSA?",
    "grade": "PSA 10 es la nota numérica estándar más alta, pero no hace que cualquier carta sea cara. La demanda del personaje, el set, el año de impresión, el idioma, la edición, el número de carta, la ilustración, la rareza y la población influyen en el valor. Un PSA 9 puede ser más escaso o más coleccionado que un PSA 10 de otra carta.",
    "multiplier": "No existe un multiplicador universal fiable para pasar de una carta sin gradear a un PSA 9 o PSA 10. El precio del gradeo, el riesgo de autenticación, la incertidumbre sobre el estado y el número de copias con nota alta cambian de una carta a otra. Compara la misma impresión y nota siempre que puedas.",
    "more": "Aprende los términos de PSA, CGC, BGS y población"
  },
  "limits": {
    "title": "Lo que este consultor puede y no puede decirte",
    "coverage": "Decard cubre cartas físicas gradeadas por profesionales, tokenizadas en Solana y negociadas en Collector Crypt, Magic Eden y Slabz. No estima el estado de cartas sin gradear, no promete autenticidad más allá de los registros mostrados de la empresa de gradeo y del custodio, ni predice precios futuros.",
    "verify": "La disponibilidad en los mercados, las pujas, los valores asegurados y las condiciones de canje pueden cambiar. Verifica la carta, la certificación, el anuncio, el custodio y las condiciones de retiro actuales antes de decidir. Decard es independiente, está hecho por fans y no está afiliado a PSA, Nintendo, Creatures, GAME FREAK, The Pokémon Company, Collector Crypt ni Magic Eden."
  },
  "faq": {
    "title": "Preguntas frecuentes sobre el valor de cartas Pokémon",
    "items": [
      {
        "q": "¿Cuánto vale mi carta Pokémon?",
        "a": "Primero identifica la impresión exacta y su estado; luego compara la misma carta y nota con ventas aceptadas, pujas activas y anuncios fiables. Solo con el nombre de la carta no se puede obtener un valor fiable."
      },
      {
        "q": "¿Una nota PSA 10 garantiza un valor alto?",
        "a": "No. La nota describe el estado y la autenticación. La demanda, la rareza, la población y la liquidez deciden si los coleccionistas pagarán más."
      },
      {
        "q": "¿Uso precios pedidos o precios de ventas cerradas?",
        "a": "Usa los dos, pero da más peso a las ventas comparables recientes y a las pujas ejecutables. Los precios pedidos muestran cuántas cartas hay a la venta y qué esperan los vendedores, incluidos anuncios que quizá nunca se vendan."
      },
      {
        "q": "¿Decard es gratis?",
        "a": "Sí. Las páginas de consulta son públicas y de solo lectura, y consultar una carta no requiere wallet ni cuenta."
      }
    ]
  },
  "aside": {
    "label": "Guía del consultor de valor",
    "onThisPage": "EN ESTA PÁGINA",
    "toc": {
      "currentPrices": "Precios actuales",
      "howToCheck": "Cómo consultar el valor",
      "priceMeaning": "Qué significan los precios",
      "psaValue": "Valor de cartas PSA",
      "limitations": "Limitaciones",
      "questions": "Preguntas"
    },
    "directory": "Abrir el catálogo de cartas gradeadas",
    "tokenized": "Cómo funcionan las cartas tokenizadas"
  }
};
