import type { Strings } from "../en";
import type { Translation } from "../types";
export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "Скопировать адрес контракта CARDS",
    "idle": "Копировать",
    "copied": "Скопировано ✓",
    "selected": "Выделено"
  },
  "ticker": {
    "price": "ЦЕНА",
    "srPrice": "Цена CARDS",
    "unavailable": "Недоступно",
    "unit": "24 ч",
    "updated": "Обновлено {time}"
  },
  "countdown": {
    "label": "Время до разблокировки",
    "units": { "days": "ДН", "hours": "ЧАС", "minutes": "МИН", "seconds": "СЕК" },
    "words": {
      "days": { "one": "день", "few": "дня", "many": "дней", "other": "дня" },
      "hours": { "one": "час", "few": "часа", "many": "часов", "other": "часа" },
      "minutes": { "one": "минута", "few": "минуты", "many": "минут", "other": "минуты" },
      "seconds": { "one": "секунда", "few": "секунды", "many": "секунд", "other": "секунды" }
    },
    "done": "РАЗБЛОКИРОВАНО!"
  },
  "live": {
    "packs": "ОТКРЫТО ПАКОВ",
    "inLastSeconds": {
      "one": "за последнюю {n} с",
      "few": "за последние {n} с",
      "many": "за последние {n} с",
      "other": "за последние {n} с"
    },
    "inLastMinutes": {
      "one": "за последнюю {n} мин",
      "few": "за последние {n} мин",
      "many": "за последние {n} мин",
      "other": "за последние {n} мин"
    },
    "noWindow": "в окне ленты",
    "dollars": "ПОТРАЧЕНО НА ПАКИ",
    "dollarsNote": "цены паков, без бесплатных круток",
    "pace": "ТЕМП",
    "paceValue": "{n}/мин",
    "paceNote": "паков в минуту",
    "buybacks": "НА ВЫКУП",
    "buybacksNote": "по доле за 30 дней (оценка)",
    "list": "Новые пуллы",
    "free": "Бесплатно",
    "error": "Лента сейчас недоступна.",
    "waiting": "Ждём следующий пак…"
  }
};
