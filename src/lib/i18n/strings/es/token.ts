import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "Copiar la dirección del contrato de CARDS",
    "idle": "Copiar",
    "copied": "Copiado ✓",
    "selected": "Seleccionada"
  },
  "ticker": {
    "price": "PRECIO",
    "srPrice": "Precio de CARDS",
    "unavailable": "No disponible",
    "unit": "24 h",
    "updated": "Actualizado a las {time}"
  },
  "countdown": {
    "label": "Tiempo que falta para el desbloqueo",
    "units": {
      "days": "DÍAS",
      "hours": "HRS",
      "minutes": "MIN",
      "seconds": "SEG"
    },
    "words": {
      "days": {
        "one": "día",
        "many": "días",
        "other": "días"
      },
      "hours": {
        "one": "hora",
        "many": "horas",
        "other": "horas"
      },
      "minutes": {
        "one": "minuto",
        "many": "minutos",
        "other": "minutos"
      },
      "seconds": {
        "one": "segundo",
        "many": "segundos",
        "other": "segundos"
      }
    },
    "done": "¡DESBLOQUEADO!"
  },
  "live": {
    "packs": "SOBRES ABIERTOS",
    "inLastSeconds": {
      "other": "en los últimos {n} s"
    },
    "inLastMinutes": {
      "other": "en los últimos {n} min"
    },
    "noWindow": "en el periodo de los datos",
    "dollars": "DÓLARES EN SOBRES",
    "dollarsNote": "precios de los sobres, sin tiradas gratis",
    "pace": "RITMO",
    "paceValue": "{n}/min",
    "paceNote": "sobres por minuto",
    "buybacks": "PARA RECOMPRAS",
    "buybacksNote": "al ritmo de 30 días (estimación)",
    "list": "Tiradas más recientes",
    "free": "Gratis",
    "error": "Los datos en vivo no están disponibles ahora mismo.",
    "waiting": "Esperando el próximo sobre…"
  }
};
