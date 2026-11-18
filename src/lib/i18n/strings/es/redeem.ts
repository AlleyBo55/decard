import type { Strings } from "../en";
import type { Translation } from "../types";

export const redeem: Translation<Strings["redeem"]> = {
  "page": {
    "poweredBy": "Con tecnología de {logo}",
    "breadcrumb": "Ruta de navegación",
    "home": "Inicio",
    "crumb": "Canjear",
    "h1": "Lleva tu slab a casa.",
    "h1Accent": "De la bóveda a tu puerta.",
    "lede": "Canjea el NFT de una carta por el slab gradeado real: siete paradas, dos firmas gratis y una sola aprobación que quema y paga.",
    "how": {
      "kicker": "Cómo funciona el canje",
      "title": "Del NFT al slab en tus manos",
      "steps": [
        {
          "title": "Identifícate",
          "text": "Conecta la wallet de Solana que guarda las cartas y firma dos mensajes gratis: uno para Decard y otro para el mostrador de envíos de Slabz. Sin transacción ni comisión."
        },
        {
          "title": "Elige tu equipo",
          "text": "Elige hasta {max} cartas gradeadas para enviarlas juntas. La suma de sus valores asegurados es el valor declarado del paquete."
        },
        {
          "title": "Elige tu país",
          "text": "Gira el globo o busca en la lista. Cada zona de envío tiene una tarifa publicada, que ves mientras eliges."
        },
        {
          "title": "Revisa la cotización",
          "text": "Agrega la dirección y recibe la cotización en vivo del mostrador de envíos: envío, seguro y comisiones, en USDC. Esa cifra es lo que pagas."
        },
        {
          "title": "Libera los slabs",
          "text": "Una sola aprobación en tu wallet quema los NFT de las cartas y paga el envío. Luego la bóveda empaqueta los slabs físicos."
        },
        {
          "title": "Sigue el viaje",
          "text": "Sigue el paquete desde el empaquetado hasta la entrega, con el número de seguimiento del transportista en cuanto sale."
        }
      ]
    },
    "costs": {
      "kicker": "Cuánto cuesta",
      "title": "Tarifas de envío publicadas",
      "text": "Se paga en USDC al liberar. Estas son las tarifas publicadas, que te dan un precio orientativo mientras eliges; la cantidad que se cobra es la cotización en vivo de la revisión, con las comisiones de gestión que correspondan, y la confirmas antes de que se abra tu wallet.",
      "caption": "Tarifas de envío por zona",
      "zone": "Zona",
      "insurance": "Seguro: 0.5% del valor declarado, que se agrega cuando ese valor supera {over}. El valor declarado es la suma de los valores asegurados de las cartas.",
      "signature": "Entrega con firma en EE. UU.: {price}, cuando el valor declarado supera {over}.",
      "networkFee": "Comisión de red: una fracción de centavo en SOL, que paga tu wallet como en cualquier transacción de Solana."
    },
    "burn": {
      "kicker": "Qué significa quemar",
      "title": "Una carta, un derecho",
      "claim": "El NFT de tu carta es tu derecho sobre un slab de la bóveda. Para liberar el slab, el NFT se quema: se destruye en Solana, en la misma aprobación que paga el envío. Así, ninguna carta puede enviarse y seguir negociándose a la vez.",
      "final": "Una quema es definitiva. El NFT no se puede restaurar, poner a la venta, revender ni canjear dos veces. Las cartas en venta se retiran primero de la venta, en la misma aprobación.",
      "ships": "Se envía a los {count} países y territorios de la lista del proveedor de envíos, hasta {max} slabs por paquete. ¿Aún no tienes cartas para enviar? Saca una {rip} o encuentra una en el {scanner}.",
      "rip": "abriendo sobres",
      "scanner": "escáner"
    },
    "faq": {
      "kicker": "Preguntas sobre el canje",
      "title": "Antes de enviar",
      "items": [
        {
          "q": "¿Qué significa canjear una carta?",
          "a": "Cada NFT de carta de Collector Crypt representa un slab gradeado real (PSA, BGS o CGC) guardado en una bóveda. Canjear cambia el NFT por el propio slab: el NFT se quema en Solana y la bóveda envía la carta física a tu dirección."
        },
        {
          "q": "¿Qué significa quemar el NFT? ¿Puedo deshacerlo?",
          "a": "Quemar destruye el NFT on-chain, en la misma aprobación que paga el envío, para que una carta nunca pueda enviarse y seguir negociándose a la vez. Es definitivo: un NFT quemado no se puede restaurar, poner a la venta, revender ni volver a canjear. Decard te pide marcar una casilla y mantener presionado el botón de liberar antes incluso de que se abra tu wallet."
        },
        {
          "q": "¿Cuánto cuesta el envío?",
          "a": "Las tarifas publicadas empiezan en {usa} por el primer slab a EE. UU., {canada} a Canadá, {europe} a Europa y {oceania} a Australia, Nueva Zelanda y el resto del mundo, más {extra} por cada slab extra en el mismo paquete. Se agrega un seguro del 0.5% cuando el valor declarado supera {over}. La cantidad que pagas es la cotización en vivo de la revisión, incluidas las comisiones de gestión que correspondan."
        },
        {
          "q": "¿Cómo pago?",
          "a": "En USDC desde la misma wallet de Solana, dentro de las transacciones que queman los NFT, más una fracción de centavo en SOL por la comisión de red. Decard nunca guarda tu dinero ni tus claves: tu wallet firma cada transacción y no se cobra nada hasta que lo hace."
        },
        {
          "q": "¿A qué países puedo enviar?",
          "a": "Eliges entre los {count} países y territorios de la lista del proveedor de envíos. El proveedor revisa cada dirección, y la cotización de la revisión confirma que tu paquete puede viajar antes de que se cobre nada."
        },
        {
          "q": "¿Cuánto tarda la entrega?",
          "a": "Depende de la cola de empaquetado de la bóveda y del transportista de tu país. El viaje muestra cada etapa: reservado, empaquetando, en camino con el número de seguimiento del transportista, y entregado."
        },
        {
          "q": "¿Qué pasa si se interrumpe la liberación?",
          "a": "Cerrar la ventana de la wallet lo cancela todo: no se quema ni se cobra nada. En cuanto apruebas, el envío se guarda al momento en tu dispositivo, y si se interrumpe, puedes terminarlo desde tus viajes para ese mismo envío, así que nunca pagas dos veces."
        },
        {
          "q": "¿Decard guarda mi dirección?",
          "a": "No. Las direcciones las guarda el proveedor de envíos de Slabz y se leen en vivo mientras tu pase de envío es válido. Los servidores de Decard las transmiten sin almacenarlas ni registrarlas, y esta página solo las mantiene en memoria."
        }
      ],
      "footer": "{slabz} y su proveedor de envíos se encargan del envío, la custodia en bóveda y la preparación de los pedidos. Los valores asegurados no son precios de venta garantizados."
    }
  },
  "steps": {
    "checkin": {
      "title": "Registro del Entrenador",
      "short": "Registro",
      "lede": "Tres pasos gratis: tu wallet, Decard y un pase de envío de 14 minutos. Ninguno mueve nada."
    },
    "party": {
      "title": "Elige tu equipo",
      "short": "Equipo",
      "lede": "Elige los slabs que viajan a casa, hasta {max} en un envío. La suma de sus valores asegurados es el valor declarado."
    },
    "region": {
      "title": "Elige tu región",
      "short": "Región",
      "lede": "Gira el globo hasta tu país o búscalo. Cada zona de envío tiene su propia tarifa publicada."
    },
    "home": {
      "title": "Tu ciudad",
      "short": "Ciudad",
      "lede": "¿Dónde exactamente? El transportista necesita un nombre, una calle, un teléfono y un correo electrónico."
    },
    "review": {
      "title": "Revisa la ruta",
      "short": "Revisión",
      "lede": "Todo el viaje en una página. Léela como un extracto bancario: esto es lo que se cobra."
    },
    "release": {
      "title": "Liberación",
      "short": "Liberación",
      "lede": "Los NFT se queman y el envío se paga en USDC, en una sola aprobación de la wallet."
    },
    "journey": {
      "title": "El viaje",
      "short": "Viaje",
      "lede": "De la bóveda a tu puerta, parada a parada."
    }
  },
  "stopOf": "Parada {n} de {total}",
  "regions": {
    "usa": "EE. UU.",
    "canada": "Canadá",
    "europe": "Europa",
    "oceania": "Australia y NZ",
    "world": "Resto del mundo"
  },
  "place": "{city}, {country}",
  "slabs": {
    "one": "{n} slab",
    "many": "{n} slabs",
    "other": "{n} slabs"
  },
  "nfts": {
    "one": "{n} NFT",
    "many": "{n} NFT",
    "other": "{n} NFT"
  },
  "rates": {
    "firstSlab": "Primer slab",
    "extraSlab": "Cada slab extra"
  },
  "problems": {
    "ALREADY_REDEEMED": "Ya se canjeó",
    "IN_OTHER_SHIPMENT": "En otro envío",
    "UNAVAILABLE": "No se puede enviar ahora",
    "OTHER": "No se puede enviar"
  },
  "actions": {
    "back": "Atrás",
    "tryAgain": "Reintentar",
    "change": "Cambiar",
    "checkWallet": "Revisa tu wallet",
    "signInAgain": "Volver a iniciar sesión",
    "renewPass": "Renovar el pase",
    "renewTheLink": "Renueva el pase",
    "renewFree": "Renovar el pase (gratis)",
    "checkAgain": "Volver a comprobar",
    "backToReview": "Volver a la revisión",
    "backToParty": "Volver a tu equipo"
  },
  "errors": {
    "generic": "Algo salió mal. Inténtalo de nuevo.",
    "network": "Error de red. Revisa tu conexión.",
    "timeout": "No hubo respuesta a tiempo.",
    "cancelled": "Se canceló la solicitud.",
    "http": "La solicitud falló ({status}).",
    "passNeeded": "Este paso necesita un pase de envío.",
    "connectFirst": "Primero conecta tu wallet e inicia sesión.",
    "passClosed": "Cerraste la ventana de la wallet. El pase es un mensaje gratis: sin transacción ni comisión.",
    "passAuth": "Tu sesión de Decard expiró. Vuelve a iniciar sesión y luego consigue tu pase.",
    "passFailed": "La wallet no pudo firmar el pase. Inténtalo de nuevo.",
    "addressesPass": "Consigue un pase de envío para ver tus direcciones guardadas.",
    "addressesFailed": "No se pudieron cargar tus direcciones guardadas.",
    "quoteFailed": "No se pudo cotizar la ruta. Inténtalo de nuevo.",
    "shipmentFailed": "No se pudo leer el envío."
  },
  "lab": {
    "loading": "Cargando el viaje de canje",
    "authLost": "Tu sesión de Decard expiró. Vuelve a iniciar sesión para continuar: no se envió nada nuevo.",
    "passExpired": "Tu pase de envío expiró. Renuévalo para seguir viendo direcciones, cotizaciones y envíos: es un mensaje gratis.",
    "summary": "Resumen del viaje",
    "passLeft": "Pase de envío: quedan {timer}. Cuando expira, se renueva con una firma gratis.",
    "passAbout": "El pase de envío es un mensaje gratis que firma tu wallet. Te abre el mostrador de envíos de Slabz durante 14 minutos.",
    "devnet": "Devnet: tus cartas se leen de la devnet de Collector Crypt."
  },
  "route": {
    "label": "Ruta de canje",
    "stop": "Parada {n} de {total}: {title}",
    "stopDone": "Parada {n} de {total}: {title}, completada",
    "stopLocked": "Parada {n} de {total}: {title}, aún no alcanzada",
    "stopDoneLocked": "Parada {n} de {total}: {title}, completada, aún no alcanzada"
  },
  "map": {
    "loading": "Desplegando el mapa…",
    "failed": "El mapa no cargó.",
    "vault": "Bóveda",
    "zoomIn": "Acercar",
    "zoomOut": "Alejar",
    "wholeRoute": "Ver toda la ruta",
    "wholeGlobe": "Ver todo el globo",
    "hintPick": "Arrastra, desliza o usa las flechas del teclado para girar el globo, y más y menos para hacer zoom. Haz clic o toca un país, o presiona Enter para elegir el del centro. La lista de países hace lo mismo.",
    "hint": "Arrastra, desliza o usa las flechas del teclado para girar el globo, y más y menos para hacer zoom.",
    "centred": "Centrado en {country}.",
    "openSea": "Sobre mar abierto.",
    "selected": "Seleccionado: {country}.",
    "globePicked": "Globo. País elegido: {country}.",
    "globeEmpty": "Globo de los países a los que pueden viajar los slabs.",
    "globeRoute": "Globo con la ruta desde la bóveda de Slabz hasta {place}.",
    "cardLabel": "Mapa de {country}, con todo el país marcado con un círculo",
    "cardLabelEmpty": "Mapa",
    "pickFirst": "Primero elige un país en el globo.",
    "hometown": "Tu ciudad",
    "notPicked": "Aún sin elegir"
  },
  "picker": {
    "label": "Buscar en el mapa",
    "placeholderPicked": "{country} · escribe para cambiar",
    "placeholder": "Escribe un país ({count} para elegir)",
    "clear": "Borrar la búsqueda",
    "list": "Países",
    "noMatch": "Ningún país coincide con “{q}”. Prueba con su nombre en inglés o su código de dos letras.",
    "matches": {
      "one": "{n} país coincide.",
      "many": "{n} países coinciden.",
      "other": "{n} países coinciden."
    },
    "popular": "Destinos populares"
  },
  "checkIn": {
    "wallet": {
      "title": "Conecta tu wallet",
      "text": "La wallet de Solana que guarda tus cartas de Collector Crypt.",
      "busy": "Conectando…",
      "action": "Conectar wallet"
    },
    "signIn": {
      "title": "Inicia sesión en Decard",
      "text": "Un mensaje gratis demuestra que la wallet es tuya. Sin transacción ni comisión.",
      "done": "Sesión iniciada",
      "action": "Iniciar sesión"
    },
    "pass": {
      "title": "Consigue tu pase de envío",
      "text": "Un mensaje gratis más te abre el mostrador de envíos de Slabz durante 14 minutos. Cuando expira, se renueva solo.",
      "done": "Válido por {timer}",
      "action": "Obtener el pase"
    },
    "trainer": "Entrenador",
    "switchWallet": "Cambiar de wallet",
    "done": "Listo",
    "after": "Después del paso {n}",
    "next": "Elige tu equipo",
    "journeys": "Tus viajes ({n})",
    "allFree": "Tres pasos rápidos, todos gratis."
  },
  "walletPicker": {
    "title": "Elige tu wallet",
    "text": "Firmarás un mensaje corto para demostrar que la wallet es tuya. Es gratis: sin transacción ni comisión.",
    "none": "No se encontró ninguna wallet de Solana",
    "noneText": "En el teléfono, abre Decard dentro de la app de tu wallet. En escritorio, instala una y recarga la página.",
    "approve": "Aprueba el inicio de sesión en tu wallet…",
    "connecting": "Conectando…",
    "close": "Cerrar"
  },
  "party": {
    "loading": "Cargando tus cartas",
    "failedTitle": "No pudimos leer tus cartas",
    "failedText": "Collector Crypt no respondió hace un momento. Espera un poco y vuelve a esta parada.",
    "emptyTitle": "Aún no hay slabs gradeados en esta wallet",
    "emptyText": "El canje funciona con cartas gradeadas de Collector Crypt guardadas en la wallet conectada. Primero abre un sobre o consigue una en el escáner.",
    "rip": "Abre un sobre",
    "scanner": "Explorar el escáner",
    "count": "{n} / {max} en tu equipo",
    "declared": "Declarado",
    "selectTop": "Elegir los {max} primeros",
    "selectAll": "Elegir todos",
    "clear": "Limpiar",
    "filter": "Filtrar tus cartas",
    "filterPlaceholder": {
      "one": "Filtra {n} carta por nombre o nota",
      "many": "Filtra {n} cartas por nombre o nota",
      "other": "Filtra {n} cartas por nombre o nota"
    },
    "insuredLead": "Con seguro durante el viaje.",
    "insuredText": "Si el valor declarado supera {over}, se agrega automáticamente un seguro del 0.5% del valor declarado.",
    "listed": "En venta · se retira primero",
    "noMatch": "Ninguna carta coincide con “{q}”.",
    "pickOne": "Elige al menos un slab",
    "pack": {
      "one": "Empaquetar {n} slab",
      "many": "Empaquetar {n} slabs",
      "other": "Empaquetar {n} slabs"
    },
    "flagged": {
      "one": "{n} carta marcada en la revisión: sácala para continuar.",
      "many": "{n} cartas marcadas en la revisión: sácalas para continuar.",
      "other": "{n} cartas marcadas en la revisión: sácalas para continuar."
    }
  },
  "region": {
    "destination": "Destino",
    "zone": "Zona de envío",
    "yourSlabs": {
      "one": "Tu envío de {n} slab",
      "many": "Tu envío de {n} slabs",
      "other": "Tu envío de {n} slabs"
    },
    "signature": "La entrega con firma suma {price} cuando el valor declarado supera {over}.",
    "insurance": "El seguro suma {price}: el 0.5% del valor declarado, que supera {over}.",
    "published": "Tarifas publicadas, sin incluir las comisiones de gestión ni de red. La cotización real llega en la revisión, antes de que se cobre nada.",
    "emptyTitle": "¿Hacia dónde van los slabs?",
    "emptyText": "Gira el globo y toca tu país, o escríbelo arriba. Las islas pequeñas aparecen como puntos: acerca el zoom para tocarlas.",
    "next": "Rumbo a {country}",
    "pick": "Elige un país"
  },
  "home": {
    "labels": {
      "name": "Nombre completo",
      "line1": "Calle y número",
      "line2": "Apartamento, oficina, piso (opcional)",
      "city": "Ciudad o localidad",
      "state": "Estado, provincia o región",
      "postalCode": "Código postal",
      "phoneNumber": "Teléfono, con código de país",
      "email": "Correo electrónico"
    },
    "hints": {
      "name": "La persona que firma al recibir el paquete.",
      "state": "¿Donde vives no hay estados ni provincias? Repite la ciudad.",
      "phoneNumber": "El transportista lo imprime en la etiqueta.",
      "email": "Aquí te llegan las actualizaciones del seguimiento."
    },
    "errors": {
      "tooLong": "Usa {max} caracteres como máximo.",
      "nameMissing": "¿Quién debe firmar al recibir el paquete?",
      "line1Missing": "Agrega la calle y el número.",
      "cityMissing": "Agrega la ciudad o localidad.",
      "stateMissing": "Agrega el estado, la provincia o la región.",
      "postalCodeMissing": "Agrega el código postal.",
      "postalCodeFormat": "Solo letras, números, espacios y guiones.",
      "phoneMissing": "El transportista necesita un número de teléfono.",
      "phoneFormat": "Números con el código de país, por ejemplo +1 555 010 0199. Se aceptan espacios, guiones y paréntesis.",
      "emailMissing": "Las actualizaciones del seguimiento llegan a este correo.",
      "emailFormat": "Ese correo no parece correcto."
    },
    "rejected": "El proveedor de envíos no puede usar esta dirección: {detail}",
    "rejectedAny": "El proveedor de envíos no puede usar esta dirección: revisa cada línea",
    "savePass": "Para guardar necesitas tu pase de envío: un mensaje gratis para firmar.",
    "saveAuth": "Tu sesión de Decard expiró. Vuelve a iniciar sesión y luego guarda.",
    "saveFailed": "No se pudo guardar la dirección. Inténtalo de nuevo.",
    "saved": "Guardada. Los slabs viajarán a {city}.",
    "deleted": "Dirección eliminada.",
    "deleteFailed": "No se pudo eliminar la dirección. Inténtalo de nuevo.",
    "moveTrip": "{country}: si la eliges, el viaje cambia a ese país",
    "notListed": "{country}: el proveedor no tiene este país en su lista. Edítala para usarla.",
    "deleteConfirm": "¿Eliminarla?",
    "deleting": "Eliminando…",
    "delete": "Eliminar",
    "keep": "Conservar",
    "edit": "Editar",
    "editLabel": "Editar la dirección de {name}, {city}",
    "deleteLabel": "Eliminar la dirección de {name}, {city}",
    "shippingTo": "Envío a {country}",
    "passLead": "Tu pase de envío expiró.",
    "passText": "Las direcciones guardadas se leen en vivo con él. {renew} (un mensaje gratis) para verlas, o agrega una nueva.",
    "loading": "Cargando las direcciones guardadas",
    "add": "+ Agregar una dirección en {country}",
    "savedIn": "Direcciones guardadas en {country}",
    "noneIn": "Aún no hay ninguna en {country}.",
    "elsewhere": {
      "one": "{n} dirección guardada en otro país",
      "many": "{n} direcciones guardadas en otros países",
      "other": "{n} direcciones guardadas en otros países"
    },
    "formEdit": "Editar la dirección",
    "formNew": "¿Adónde enviamos los slabs?",
    "cancel": "Cancelar",
    "country": "País",
    "changeOnGlobe": "Cambiar en el globo",
    "saving": "Guardando en el mostrador de envíos…",
    "saveChanges": "Guardar cambios",
    "saveShip": "Guardar y enviar aquí",
    "keptBy": "La guarda el proveedor de envíos de Slabz. Decard nunca la almacena.",
    "next": "Revisar la ruta a {city}",
    "saveFirst": "Primero guarda la dirección",
    "pickAddress": "Elige una dirección"
  },
  "pass": {
    "label": "Pase de envío",
    "ticket": "Ticket del envío",
    "valid": "Válido por {timer}",
    "passValid": "Pase {timer}",
    "signing": "Firmando…",
    "expired": "Expirado",
    "passExpired": "Pase expirado",
    "notIssued": "Sin emitir",
    "from": "Origen",
    "vault": "Bóveda de Slabz",
    "vaultSub": "Gradeados y asegurados",
    "to": "Destino",
    "yourTown": "Tu ciudad",
    "pickOnGlobe": "Elígela en el globo",
    "yourDoor": "Tu puerta",
    "savedHere": "Guardado en este dispositivo",
    "cargo": "Carga",
    "declared": "Declarado",
    "region": "Región",
    "shipping": "Envío",
    "estShipping": "Envío estimado",
    "charged": "Se cobra en USDC",
    "chargedSub": "De tu wallet, al liberar",
    "estimated": "Total estimado",
    "estimatedSub": "Tarifas publicadas. La cotización real llega en la revisión.",
    "paid": "Pagado en USDC",
    "paidSub": "Tal como lo registró el mostrador de envíos"
  },
  "review": {
    "route": "La ruta",
    "quote": "La cotización",
    "live": "En vivo desde el mostrador de envíos",
    "passLead": "El pase de envío expiró.",
    "passText": "La cotización se lee con él. {renew} (un mensaje gratis).",
    "loading": "Obteniendo la cotización",
    "noneCanTravel": "Ninguna de estas cartas puede viajar ahora.",
    "someCantTravel": {
      "one": "{n} de tus {total} cartas no puede viajar ahora.",
      "many": "{n} de tus {total} cartas no pueden viajar ahora.",
      "other": "{n} de tus {total} cartas no pueden viajar ahora."
    },
    "takeOut": {
      "one": "Sacarla y volver a cotizar",
      "many": "Sacar estas {n} y volver a cotizar",
      "other": "Sacar estas {n} y volver a cotizar"
    },
    "askAgain": "Volver a cotizar",
    "shipping": "Envío ({zone})",
    "yourZone": "tu zona",
    "insurance": "Seguro",
    "fees": "Comisiones",
    "total": "Total a pagar en USDC",
    "totalMeta": "{slabs} · declarado {price}",
    "networkFee": "Más la comisión de red de Solana, una fracción de centavo en SOL. Si el mostrador de envíos da otro precio al liberar, primero confirmas el nuevo total.",
    "cargo": "Carga · {slabs}",
    "declared": "Valor declarado {price}",
    "listed": {
      "one": "{n} carta está en venta: la liberación la retira primero de la venta, en la misma aprobación de la wallet.",
      "many": "{n} cartas están en venta: la liberación las retira primero de la venta, en la misma aprobación de la wallet.",
      "other": "{n} cartas están en venta: la liberación las retira primero de la venta, en la misma aprobación de la wallet."
    },
    "destination": "Destino",
    "note": "Nota para el personal de envíos (opcional)",
    "notePlaceholder": "Código de acceso, horario de entrega… Solo texto, se guarda con el envío.",
    "finalTitle": "Antes de liberar: esto es definitivo",
    "finalBurn": {
      "one": "Al liberar, {burns} que tienes en tu wallet. Una quema no se puede deshacer: después, el NFT no se puede poner a la venta, revender ni restaurar.",
      "many": "Al liberar, {burns} que tienes en tu wallet. Una quema no se puede deshacer: después, los NFT no se pueden poner a la venta, revender ni restaurar.",
      "other": "Al liberar, {burns} que tienes en tu wallet. Una quema no se puede deshacer: después, los NFT no se pueden poner a la venta, revender ni restaurar."
    },
    "finalBurns": {
      "one": "se quema el NFT de esta carta",
      "many": "se queman los NFT de estas {n} cartas",
      "other": "se queman los NFT de estas {n} cartas"
    },
    "finalPay": {
      "one": "La misma aprobación {pays} por el envío, y la bóveda manda el slab físico a {city}.",
      "many": "La misma aprobación {pays} por el envío, y la bóveda manda los slabs físicos a {city}.",
      "other": "La misma aprobación {pays} por el envío, y la bóveda manda los slabs físicos a {city}."
    },
    "finalPays": "paga {amount} en USDC",
    "theQuote": "la cotización",
    "finalCheck": "Revisa la dirección ahora: los slabs van exactamente adonde indica.",
    "next": "Continuar a la liberación · {price}",
    "waiting": "Esperando la cotización"
  },
  "release": {
    "whatItDoes": "Qué hace la liberación",
    "burnForGood": "quema definitiva",
    "usdcShipping": "USDC para el envío",
    "home": "Tu casa",
    "title": {
      "one": "Libera el slab",
      "many": "Libera los {n} slabs",
      "other": "Libera los {n} slabs"
    },
    "renewLead": "Primero renueva tu pase de envío.",
    "renewText": "Expiró, y la liberación lo necesita.",
    "passValid": "Pase de envío válido por {timer}. Si quedan menos de tres minutos, primero se renueva para que la liberación no se quede a medias.",
    "agree": "Entiendo que {burn}, algo que no se puede deshacer, y que pago {amount} desde mi wallet para enviar {them} a {place}.",
    "agreeBurn": {
      "one": "se quema el NFT de esta carta",
      "many": "se queman los NFT de estas {n} cartas",
      "other": "se queman los NFT de estas {n} cartas"
    },
    "agreeAmount": "{price} en USDC",
    "agreeQuoted": "la cantidad cotizada",
    "agreeThem": {
      "one": "el slab",
      "many": "los slabs",
      "other": "los slabs"
    },
    "yourAddress": "mi dirección",
    "hold": "Mantén para liberar {n} · {price}",
    "holdHint": "Después, tu wallet muestra las transacciones que debes aprobar: la quema de cada NFT y el pago en USDC, todo en una sola ventana. Cerrar la ventana lo cancela todo; no se cobra nada antes de que apruebes.",
    "backToReview": "← Volver a la revisión",
    "holding": "Sigue presionando…",
    "early": "Mantenlo un poco más, hasta que se llene el sello.",
    "holdHelp": "Mantén presionado el sello (o la barra espaciadora).",
    "stages": ["Reservar el envío", "Aprobar en tu wallet", "Quemar y pagar", "En camino"],
    "preparing": "Reservando el envío con el mostrador de envíos…",
    "signing": "Aprueba en tu wallet",
    "burning": "Quemando y pagando en Solana…",
    "burningText": "Puede tardar hasta un minuto mientras la red confirma. Mantén esta pestaña abierta.",
    "waitText": "En este punto no se quema ni se cobra nada. Mantén esta pestaña abierta.",
    "signingOne": "Tu wallet muestra una transacción: quemará {nfts} y pagará {price} en USDC.",
    "signingMany": {
      "one": "Tu wallet muestra {n} transacción: quema {nfts} y paga {price} en USDC. Apruébala.",
      "many": "Tu wallet muestra {n} transacciones: juntas queman {nfts} y pagan {price} en USDC. Apruébalas todas a la vez.",
      "other": "Tu wallet muestra {n} transacciones: juntas queman {nfts} y pagan {price} en USDC. Apruébalas todas a la vez."
    },
    "notes": {
      "fresh": "Transacciones nuevas, mismo envío. Aprueba una vez más.",
      "rest": "Aprueba el resto del envío.",
      "burnRejected": "La red rechazó la quema, así que no se canjeó nada. Obteniendo las transacciones de nuevo…",
      "takenOver": "Un envío más reciente tomó el relevo. Retomándolo…",
      "slowSign": "La firma tardó un rato, así que la red necesita transacciones nuevas…",
      "newTotal": "Obteniendo transacciones nuevas para el nuevo total…",
      "refetch": "Obteniendo transacciones nuevas…",
      "pickUp": "Retomando el envío…",
      "checking": "Comprobando en qué punto está el envío…",
      "unsigned": "Algunos tramos siguen sin firmar. Obteniéndolos…"
    },
    "repricedFinishTitle": "Confirma lo que queda por pagar",
    "repricedTitle": "El total cambió",
    "repricedFinish": "Terminar el envío {id} cuesta {price} en USDC por {cards}. Todavía no se firmó nada.",
    "remaining": {
      "one": "{n} carta restante",
      "many": "{n} cartas restantes",
      "other": "{n} cartas restantes"
    },
    "remainingAll": "sus cartas restantes",
    "repriced": "El mostrador de envíos ahora pide {price}, no los {confirmed} que confirmaste. No se firmó ni se cobró nada.",
    "accept": "Pagar {price} en USDC y quemar {nfts}.",
    "theNfts": "los NFT",
    "holdAccept": "Mantén para aceptar · {price}",
    "notNow": "Ahora no",
    "flagged": {
      "one": "{n} carta marcada: la verás señalada en tu equipo y en la revisión.",
      "many": "{n} cartas marcadas: las verás señaladas en tu equipo y en la revisión.",
      "other": "{n} cartas marcadas: las verás señaladas en tu equipo y en la revisión."
    },
    "next": {
      "prepare": "Reintentar",
      "sign": "Abrir la wallet de nuevo",
      "resume": "Reintentar este paso",
      "complete": "Reintentar este paso",
      "check": "Comprobar el envío",
      "review": "Volver a la revisión",
      "address": "Editar la dirección",
      "journey": "Abrir tus viajes",
      "none": "Volver a tu equipo"
    },
    "seeJourneys": "Ver tus viajes",
    "keepLead": "Mantén esta pestaña abierta.",
    "keepSaved": "El envío está guardado en este dispositivo, así que siempre puedes terminarlo desde tus viajes.",
    "keepUnsigned": "No se cobra nada hasta que tu wallet lo apruebe.",
    "stops": {
      "signIn": {
        "title": "Vuelve a iniciar sesión",
        "message": "Tu sesión de Decard expiró. Vuelve a iniciar sesión para continuar; no se envió nada nuevo."
      },
      "passNeeded": {
        "title": "Necesitas un pase de envío",
        "message": "La liberación necesita un pase de envío nuevo: un mensaje gratis para firmar. No se envió nada nuevo."
      },
      "replaced": {
        "title": "Un envío más reciente tomó el relevo",
        "message": "Otro canje de estas cartas reemplazó a este antes de la quema, así que no se cobró nada por él. Tus viajes muestran el más reciente."
      },
      "notPaid": {
        "title": "No se cobró nada",
        "message": "Este envío nunca se pagó, así que no se quemó ni se cobró nada. Cuando quieras, empieza un canje nuevo desde tu equipo."
      },
      "deskSaidNo": {
        "title": "El mostrador de envíos dijo que no",
        "message": "{detail} No empieces un canje nuevo: reintenta este paso."
      },
      "stillWaiting": {
        "title": "Seguimos esperando al mostrador de envíos",
        "message": "Aún no recibimos respuesta. Tu envío está guardado: inténtalo de nuevo en un momento y no empieces un canje nuevo."
      },
      "burnFailed": {
        "title": "La quema no se completó",
        "message": "{detail} Comprueba el envío antes de volver a intentarlo."
      },
      "network": {
        "title": "Esperando a la red",
        "message": "Aún no pudimos confirmar la quema. Tu envío está guardado: vuelve a comprobarlo en un minuto y no empieces un canje nuevo."
      },
      "connect": {
        "title": "Conecta tu wallet",
        "message": "La wallet que guarda estas cartas tiene que aprobar la liberación. No se quemó ni se cobró nada."
      },
      "closed": {
        "title": "No pasó nada",
        "message": "Cerraste la ventana de la wallet. No se quemó nada y no se cobró nada. Tus cartas siguen en tu wallet."
      },
      "unsigned": {
        "title": "La wallet no firmó",
        "message": "Tu wallet no pudo firmar las transacciones. No se quemó nada y no se cobró nada."
      },
      "short": {
        "title": "La wallet no firmó",
        "message": "La wallet devolvió menos firmas de las pedidas. No se envió nada."
      },
      "invalidCards": {
        "title": "Algunas cartas no pueden viajar",
        "message": "Sácalas de tu equipo y vuelve a revisar la ruta. No se quemó ni se cobró nada."
      },
      "addressRejected": {
        "title": "Se rechazó la dirección",
        "message": "{detail} No se quemó ni se cobró nada."
      },
      "conflict": {
        "title": "Estas cartas ya están reservadas",
        "message": "Otro envío incluye algunas de estas cartas y puede que ya esté pagado. Continúa ese desde tus viajes en lugar de empezar uno nuevo."
      },
      "alreadyDone": {
        "title": "Ya van en camino",
        "message": "Estas cartas ya se quemaron para el envío. Síguelas en tus viajes."
      },
      "prepareFailed": {
        "title": "No se pudo iniciar el envío",
        "message": "{detail} No se quema ni se cobra nada hasta que firmes, así que puedes reintentarlo sin riesgo."
      },
      "prepareNoAnswer": {
        "title": "No se pudo iniciar el envío",
        "message": "El mostrador de envíos no respondió. No se quema ni se cobra nada hasta que firmes, así que puedes reintentarlo sin riesgo."
      },
      "checkWaiting": {
        "title": "Seguimos esperando",
        "message": "Aún no pudimos leer el envío. Inténtalo de nuevo en un minuto."
      }
    }
  },
  "journey": {
    "status": {
      "pending_burn": "Esperando la quema",
      "processing": "Empaquetando en la bóveda",
      "shipped": "En camino",
      "delivered": "Entregado",
      "failed": "Fallido",
      "cancelled": "Cancelado"
    },
    "stops": [
      { "title": "Reservado", "text": "Envío creado" },
      { "title": "Empaquetando", "text": "Quemado, pagado y en preparación" },
      { "title": "En camino", "text": "Con el transportista" },
      { "title": "En casa", "text": "Entregado" }
    ],
    "checking": "Comprobando…",
    "unreadable": "No se pudo leer",
    "inProgress": "En curso",
    "yourDoor": "tu puerta",
    "strip": "Ruta desde la bóveda de Slabz hasta {place}: {pct}% del recorrido",
    "passLead": "Tu pase de envío expiró.",
    "passText": "Los envíos se leen con él, así que los estados de abajo pueden estar desactualizados.",
    "where": "Dónde está el paquete",
    "shipment": "Envío",
    "shipmentRef": "Envío · {id}",
    "delivered": "¡Por fin en casa!",
    "stalledTitle": {
      "failed": "Envío fallido",
      "cancelled": "Envío cancelado"
    },
    "reading": "Leyendo el envío…",
    "yourShipment": "Tu envío",
    "stalled": {
      "failed": "El proveedor de envíos marcó este envío como fallido. Escribe al soporte de Slabz con la referencia de arriba antes de volver a intentarlo.",
      "cancelled": "El proveedor de envíos marcó este envío como cancelado. Escribe al soporte de Slabz con la referencia de arriba antes de volver a intentarlo."
    },
    "stalledAs": {
      "failed": "El proveedor de envíos marcó este envío como fallido (“{status}”). Escribe al soporte de Slabz con la referencia de arriba antes de volver a intentarlo.",
      "cancelled": "El proveedor de envíos marcó este envío como cancelado (“{status}”). Escribe al soporte de Slabz con la referencia de arriba antes de volver a intentarlo."
    },
    "pendingLead": "Este envío se reservó, pero su quema aún no se confirmó.",
    "pendingText": "Si se interrumpió una liberación, termínala aquí: tu wallet aprueba solo lo que falta, para este mismo envío, así que no se paga nada dos veces.",
    "finish": "Terminar este envío",
    "tracking": "Seguimiento",
    "trackingWith": "Seguimiento · {carrier}",
    "trackIt": "Rastrear ↗",
    "trackParcel": "Rastrear el paquete ↗",
    "paid": "Pagado",
    "shipping": "Envío",
    "insurance": "Seguro",
    "booked": "Reservado",
    "updated": "Última actualización",
    "cards": {
      "one": "{n} carta en este envío",
      "many": "{n} cartas en este envío",
      "other": "{n} cartas en este envío"
    },
    "renewToRead": "Renueva el pase para leer este envío.",
    "final": "Estado final.",
    "polling": "Se actualiza cada 30 segundos mientras esta página está abierta.",
    "pickTitle": "Elige un viaje para seguir",
    "pickText": "Cada envío que empiezas aquí queda guardado en este dispositivo, para que puedas seguirlo o terminar uno que se interrumpió.",
    "noneTitle": "Aún no hay viajes en este dispositivo",
    "noneText": "Los envíos que empieces en este dispositivo aparecen aquí, con su seguimiento.",
    "others": "Tus otros viajes · en este dispositivo",
    "all": "Tus viajes · en este dispositivo",
    "passNeeded": "Hace falta el pase",
    "more": "Canjear más slabs"
  }
};
