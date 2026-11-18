import type { Strings } from "../en";
import type { Translation } from "../types";

export const rip: Translation<Strings["rip"]> = {
  "page": {
    "breadcrumb": "Ruta de navegación",
    "poweredBy": "Con tecnología de {logo}",
    "h1": "Abre un sobre. {accent}",
    "h1Accent": "Atrapa un slab.",
    "lede": {
      "one": "Un slab gradeado real en cada sobre, en {n} universo que se abre a su manera.",
      "many": "Un slab gradeado real en cada sobre, en {n} universos que se abren cada uno a su manera.",
      "other": "Un slab gradeado real en cada sobre, en {n} universos que se abren cada uno a su manera."
    },
    "howKicker": "Cómo funciona",
    "howTitle": "Cuatro pasos hasta tu slab",
    "steps": [
      {
        "title": "Elige tu universo",
        "text": "Pokémon, One Piece, Dragon Ball, Riftbound, Lorcana o deportes. Cada sobre muestra sus probabilidades, el valor medio por tirada y sus mejores griales."
      },
      {
        "title": "Mantén para abrir",
        "text": "Inicia sesión firmando un mensaje gratis con tu wallet. Luego mantén presionado el sobre o usa el botón Abrir sobre y aprueba el pago en USDC."
      },
      {
        "title": "Rasga el sobre",
        "text": "Cada universo tiene su propia revelación. La luz que sale por la abertura te dice la rareza antes de que gire la carta."
      },
      {
        "title": "Quédatelo o revéndelo",
        "text": "Guarda el slab gradeado en tu wallet o revéndelo en un toque dentro de las 72 horas."
      }
    ],
    "faqKicker": "Preguntas sobre aperturas",
    "faqTitle": "Antes de abrir un sobre",
    "faq": [
      {
        "q": "¿Qué trae un sobre de Slabz?",
        "a": "Una carta coleccionable gradeada real (PSA, BGS o CGC) del universo del sobre, guardada en una bóveda y enviada a tu wallet de Solana como NFT. Slabz gestiona los sobres; Decard es donde los abres."
      },
      {
        "q": "¿Cómo pago?",
        "a": "En USDC desde tu propia wallet de Solana, más un poco de SOL para las comisiones de la red. El precio del botón es el precio del sobre. Decard nunca guarda tu dinero ni tus claves: tu wallet firma cada pago."
      },
      {
        "q": "¿Puedo revender una carta?",
        "a": "Sí, en un toque, dentro de las 72 horas posteriores a abrir el sobre. La cantidad que muestra el botón de venta es lo que llega a tu wallet."
      },
      {
        "q": "¿Qué es Turbo?",
        "a": "Cuando a un sobre le quedan pocas comunes, Turbo te deja abrirlo igual: si te sale una común, se paga en USDC a tu wallet en lugar de la carta. Las cartas más raras llegan como siempre."
      },
      {
        "q": "¿Qué son la EXP, los niveles y las medallas?",
        "a": "Son tu ficha de entrenador: cada apertura da EXP, las cartas más raras dan más y las medallas marcan hitos como tu primera rara o una racha de 3 días. Se calculan con las cartas que sacó tu wallet y se guardan en este dispositivo. Nunca cambian las probabilidades."
      },
      {
        "q": "¿Y si se interrumpe una apertura?",
        "a": "No se cobra nada hasta que tu pago se confirma on-chain. Una vez pagado, el sobre te espera en tu colección hasta que se abre, y puedes reintentar la apertura sin riesgo: un sobre nunca se reparte dos veces."
      }
    ],
    "disclaimer": "Cada tirada es aleatoria. Los valores son valores asegurados, no precios de venta garantizados. Abre solo lo que estés dispuesto a gastar. {slabz} gestiona los sobres, las probabilidades y los pagos."
  },
  "universeNames": {
    "basketball": "Baloncesto",
    "football": "Fútbol americano",
    "baseball": "Béisbol",
    "soccer": "Fútbol",
    "sports": "Deportes"
  },
  "universes": {
    "pokemon": { "cry": "¡Ya está! ¡{name} atrapado!", "valueLabel": "Valor asegurado", "tagline": "Lanza una Poké Ball. Atrapa un slab.", "dealing": "Se mueve… se mueve… se mueve…" },
    "onepiece": { "cry": "¡Nueva recompensa! ¡{name}!", "valueLabel": "Recompensa", "tagline": "Zarpa en busca del One Piece.", "dealing": "Subiendo el tesoro a bordo…" },
    "dragonball": { "cry": "¡Poder al máximo! ¡{name}!", "valueLabel": "Nivel de poder", "tagline": "Cárgalo a más de 8000.", "dealing": "Reuniendo energía…" },
    "riftbound": { "cry": "¡Invocación desde la Grieta: {name}!", "valueLabel": "Valor de la Grieta", "tagline": "La Grieta está abierta.", "dealing": "Se abre la Grieta…" },
    "lorcana": { "cry": "¡Entintado! {name} se une a tu leyenda.", "valueLabel": "Valor de leyenda", "tagline": "Entinta algo legendario.", "dealing": "Entintando tu carta…" },
    "basketball": { "cry": "¡Canasta limpia! ¡{name}!", "valueLabel": "Valor de la carta", "tagline": "Sin tocar aro.", "dealing": "Se eleva hacia el aro…" },
    "football": { "cry": "¡Touchdown! ¡{name}!", "valueLabel": "Valor de la carta", "tagline": "Pase profundo.", "dealing": "El balón está en el aire…" },
    "baseball": { "cry": "¡Jonrón! ¡{name}!", "valueLabel": "Valor de la carta", "tagline": "Sácala del parque.", "dealing": "Ahí viene el lanzamiento…" },
    "soccer": { "cry": "¡GOOOL! ¡{name}!", "valueLabel": "Valor de la carta", "tagline": "Por la escuadra.", "dealing": "Preparando el tiro libre…" },
    "sports": { "cry": "¡Gran jugada! ¡{name}!", "valueLabel": "Valor de la carta", "tagline": "Todos los deportes, un sobre.", "dealing": "Revisando la jugada…" }
  },
  "lab": {
    "devnet": "Devnet · USDC de prueba",
    "offline": "La máquina de sobres está desconectada ahora mismo. Los sobres vuelven en breve.",
    "empty": "El estante de sobres está vacío ahora mismo.",
    "pullsKicker": "Ficha de entrenador",
    "pullsTitle": "Tu nivel, tus medallas y tus cartas",
    "pullsText": "EXP por cada apertura, medallas por tus mejores cartas y cada carta que atrapaste, lista para guardar o revender.",
    "opening": "Abriendo tu sobre",
    "unknownPack": "Sobre de Slabz"
  },
  "machine": {
    "arena": "Arena de sobres",
    "universes": "Universos",
    "buy": "Abre este sobre",
    "paused": "En pausa",
    "price": "Precio",
    "avgPull": "Valor medio",
    "avgPullHint": "El valor asegurado esperado de una tirada",
    "sellBack": "Reventa",
    "sellBackHint": "Revende cualquier carta en un toque, dentro de las 72 horas tras abrir el sobre",
    "avgPullPct": "Valor medio: {pct}% del precio",
    "turbo": "Turbo",
    "turboSub": "Vende las comunes por USDC automáticamente",
    "turboHint": "Cuando quedan pocas comunes, si te sale una común se paga en USDC en lugar de la carta, así la apertura siempre se completa",
    "rip": "Abrir sobre",
    "ripping": "Abriendo…",
    "fine": "Un slab gradeado real en cada sobre. Quédatelo o revéndelo en un toque.",
    "topGrails": "Mejores griales",
    "howItWorks": "Cómo funciona",
    "stage": "Sobres de {universe}. Usa las flechas para navegar.",
    "slot": "{name}, {price}",
    "slotSelected": "{name}, {price}, seleccionado",
    "hold": "Mantén para abrir",
    "prev": "Sobre anterior",
    "next": "Sobre siguiente",
    "prices": "Precio del sobre",
    "dockRip": "Abrir"
  },
  "odds": {
    "title": "Probabilidades",
    "perPack": "1 carta por sobre",
    "refreshing": "Actualizando las probabilidades. Vuelven en un momento.",
    "seeGrails": "Ver los mejores griales",
    "chase": "Cartas chase",
    "oneIn": "1 de cada {n}",
    "mostPulls": "la mayoría de las tiradas"
  },
  "cutscene": {
    "soundOn": "Activar sonido",
    "mute": "Silenciar",
    "close": "Cerrar",
    "progress": "Progreso de la apertura",
    "steps": { "reserve": "Reservar", "approve": "Aprobar", "pay": "Pagar", "open": "Abrir" },
    "buying": "Sacando un sobre nuevo de la bóveda…",
    "buyingSub": "Reservando tu {pack}. No se cobra nada hasta que lo apruebes en tu wallet.",
    "turbo": "¡A este sobre le quedan pocas comunes!",
    "turboSub": "Activa Turbo para abrirlo igual: si te sale una común, se paga en USDC a tu wallet en lugar de la carta. Las raras o mejores llegan como siempre.",
    "signing": "Aprueba {price} USDC en tu wallet",
    "signingSub": "Revisa la cantidad en la ventana emergente. El pago es válido durante un minuto, más o menos.",
    "paying": "Enviando tu pago a Solana…",
    "payingSub": "Suele tardar unos segundos. No cierres esta pestaña.",
    "openingSub": "¡Pagado! Se está repartiendo tu carta. Puedes cerrar esto: te espera en tu colección.",
    "stoppedPaid": "¡Tu sobre está a salvo!",
    "stopped": "La apertura se detuvo.",
    "ripTurbo": "Abrir con Turbo",
    "retryOpen": "Intentar abrirlo otra vez",
    "retry": "Reintentar",
    "notNow": "Ahora no",
    "holdLabel": "Mantén presionado para abrir el sobre",
    "hold": "Mantén para abrir",
    "legendary": "¡LEGENDARIA!",
    "skip": "Saltar",
    "frames": { "dex": "N.º {n} {name}", "wanted": "SE BUSCA", "jumbotron": "★ JUGADÓN ★", "scouter": "NIVEL DE PODER" }
  },
  "result": {
    "xp": "+{xp} EXP",
    "mult": "{mult} tu sobre",
    "turboPaid": "Turbo pagó {price} USDC a tu wallet por esta común.",
    "quoting": "Consultando el precio de reventa",
    "sell": "Venta instantánea · {price} USDC",
    "signing": "Aprueba la venta en tu wallet…",
    "settling": "Vendiendo",
    "sold": "¡Vendida! {amount} USDC a tu wallet.",
    "receipt": "Recibo",
    "retry": "Reintentar",
    "ripAgain": "Abrir otro · {price}",
    "done": "Listo",
    "keep": "Me la quedo",
    "share": "Compartir pull"
  },
  "news": {
    "levelUp": "{level} ¡Subiste de nivel! Nuevo título: {title}.",
    "badge": "Medalla desbloqueada: {name}"
  },
  "trainer": {
    "level": "Nv. {n}",
    "titles": {
      "Rookie": "Novato",
      "Ace Trainer": "Entrenador Guay",
      "Gym Leader": "Líder de Gimnasio",
      "Elite Four": "Alto Mando",
      "Champion": "Campeón",
      "Legend": "Leyenda"
    },
    "badges": {
      "first": { "name": "Primera captura", "hint": "Abre tu primer sobre" },
      "green": { "name": "En verde", "hint": "Saca una carta que valga más que su sobre" },
      "rare": { "name": "Hallazgo raro", "hint": "Saca una rara o mejor" },
      "epic": { "name": "Cazador de épicas", "hint": "Saca una épica" },
      "legend": { "name": "Legendario", "hint": "Saca una legendaria" },
      "big": { "name": "Gran hit", "hint": "Saca 3× el precio de tu sobre" },
      "travel": { "name": "Trotamundos", "hint": "Abre sobres de 3 universos" },
      "ten": { "name": "Coleccionista", "hint": "Abre 10 sobres" },
      "streak": { "name": "En racha", "hint": "Abre sobres 3 días seguidos" },
      "flip": { "name": "Venta rápida", "hint": "Revende una carta" }
    },
    "startTitle": "Crea tu ficha de entrenador",
    "startText": "Cada apertura da EXP. Sube de Novato a Campeón, mantén una racha diaria y desbloquea medallas con tus mejores cartas.",
    "connect": "Conectar wallet",
    "xpLabel": "EXP para el siguiente nivel",
    "xp": "{xp} EXP · {next} para Nv. {level}",
    "streak": "Racha",
    "rips": "Aperturas",
    "best": "Mejor",
    "badgesLabel": "Medallas",
    "badgeHint": "{name}: {hint}",
    "earned": "{name}, conseguida",
    "locked": "{name}, bloqueada: {hint}",
    "today": "Hoy: {rips} · {spent} gastados · {pulled} en cartas",
    "ripsToday": { "one": "{n} apertura", "many": "{n} aperturas", "other": "{n} aperturas" },
    "keepStreak": {
      "one": "Abre un sobre hoy para mantener tu racha de {n} día.",
      "many": "Abre un sobre hoy para mantener tu racha de {n} días.",
      "other": "Abre un sobre hoy para mantener tu racha de {n} días."
    },
    "nextBadge": "Próxima medalla: {hint}.",
    "allBadges": "Todas las medallas conseguidas. Digno de un Campeón."
  },
  "box": {
    "error": "Tus cartas no cargaron. Vuelve a intentarlo en un momento.",
    "empty": "Tu colección está vacía. ¡Elige un sobre y abre el primero!",
    "pack": "Sobre de {price}",
    "paid": "Pagado · listo para abrir",
    "open": "Ábrelo",
    "view": "Ver {name}",
    "mult": "{mult} el sobre",
    "turboPaid": "Turbo pagó {price} USDC",
    "sell": "Vender o guardar",
    "viewButton": "Ver",
    "loading": "Cargando…",
    "older": "Cartas anteriores"
  },
  "grails": {
    "kicker": "Mejores griales",
    "title": "Cartas chase de {pack}",
    "showTop": "Ver los mejores griales",
    "showAll": "Ver todas las cartas",
    "filter": "Filtrar por rareza",
    "all": "Todas",
    "error": "Las cartas del sobre no cargaron. Se actualizan solas en breve.",
    "loading": "Cargando…",
    "more": "Cargar más cartas"
  },
  "hits": {
    "label": "Últimas cartas sacadas",
    "live": "APERTURAS EN VIVO",
    "empty": "Aún no hay aperturas. ¡Sé el primer entrenador en abrir un sobre en Decard!"
  },
  "wallet": {
    "trainer": "Nv. {level} · {title}",
    "streak": { "one": "Racha de {n} día", "many": "Racha de {n} días", "other": "Racha de {n} días" },
    "signedIn": "● Sesión iniciada",
    "signedInDevnet": "● Sesión iniciada · devnet",
    "sessionEnds": "La sesión termina a las {time}.",
    "signOut": "Cerrar sesión",
    "checkWallet": "Revisa tu wallet",
    "connecting": "Conectando…",
    "connect": "Conectar",
    "connectLong": "Conectar wallet",
    "signIn": "Entrar",
    "signInLong": "Inicia sesión para abrir",
    "pickerTitle": "Elige tu wallet",
    "pickerText": "Firmarás un mensaje corto para demostrar que la wallet es tuya. Es gratis: sin transacción ni comisión.",
    "none": "No se encontró ninguna wallet de Solana",
    "noneText": "En el teléfono, abre Decard dentro de la app de tu wallet. En escritorio, instala una y recarga la página.",
    "approveSignIn": "Aprueba el inicio de sesión en tu wallet",
    "connectingDots": "Conectando",
    "close": "Cerrar",
    "rejected": "Cerraste la ventana de la wallet. No se firmó nada.",
    "failed": "Esa wallet no pudo iniciar sesión. Inténtalo de nuevo o elige otra wallet."
  },
  "flow": {
    "openFailed": "{error} Tu sobre está pagado: ábrelo desde tu ficha de entrenador.",
    "openSlow": "Tu carta aún se está repartiendo. El sobre está pagado y a salvo: ábrelo desde tu ficha de entrenador en un minuto.",
    "rejected": "La red rechazó el pago, normalmente por falta de USDC o SOL, o porque la ventana de la wallet estuvo abierta demasiado tiempo. No se cobró nada.",
    "unconfirmed": "Aún no pudimos confirmar el pago. Si se completó, el sobre aparecerá en tu ficha de entrenador listo para abrir. No vuelvas a pagar.",
    "closed": "Cerraste la ventana de la wallet, así que no se cobró nada. El sobre reservado se libera solo.",
    "signFailed": "Tu wallet no pudo firmar el pago. No se cobró nada.",
    "generic": "Algo salió mal. Inténtalo de nuevo."
  },
  "sale": {
    "unavailable": "La reventa no está disponible para esta carta.",
    "autoSold": "Turbo ya pagó esta común en USDC.",
    "boughtBack": "Ya la revendiste.",
    "quoteFailed": "No se pudo cargar el precio de reventa.",
    "failed": "La venta no se completó. La carta sigue siendo tuya: inténtalo de nuevo.",
    "settling": "La venta aún se está procesando. Vuelve a mirar en un minuto antes de intentarlo otra vez.",
    "closed": "El plazo de reventa de 72 horas ya terminó.",
    "startFailed": "No se pudo iniciar la venta.",
    "signFailed": "Tu wallet no pudo firmar la venta. No cambió nada.",
    "rejected": "La red rechazó la venta. La carta sigue siendo tuya: inténtalo de nuevo."
  }
};
