import type { Strings } from "../en";
import type { Translation } from "../types";

/** A separate const: its "other" key makes Translation<> read the whole object as a plural, which rejects the other keys in a literal. */
const battle = {
  "sale": "Попался! Поймали {card} за {price}!",
  "saleNoPrice": "Попался! Поймали {card}!",
  "bidTaken": "{card} принимает ставку {price}!",
  "bidTakenNoPrice": "{card} принимает ставку!",
  "listed": "Дикий {card} появился на рынке!",
  "reprice": "{card} меняет цену!",
  "delist": "{card} сбегает с рынка!",
  "newBid": "Тренер {trainer} бросает ставку на {card}!",
  "bidEdit": "Тренер {trainer} меняет ставку на {card}.",
  "bidPulled": "Тренер {trainer} отзывает ставку на {card}.",
  "other": "С {card} что-то происходит..."
};

export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "ПРОДАЖА",
    "BID TAKEN": "СТАВКА ПРИНЯТА",
    "REPRICE": "НОВАЯ ЦЕНА",
    "DELIST": "СНЯТ С ПРОДАЖИ",
    "LISTED": "ВЫСТАВЛЕН",
    "NEW BID": "НОВАЯ СТАВКА",
    "BID EDIT": "СТАВКА ИЗМЕНЕНА",
    "BID PULLED": "СТАВКА ОТОЗВАНА"
  },
  "ripTiers": {
    "common": { "label": "Обычная", "ballName": "Покебол", "cry": "Попался!" },
    "rare": { "label": "Редкая", "ballName": "Грейтбол", "cry": "Отличный улов!" },
    "epic": { "label": "Эпическая", "ballName": "Ультрабол", "cry": "Ультра-улов!" },
    "legendary": { "label": "Легендарная", "ballName": "Мастербол", "cry": "Появилась легенда!" }
  },
  "gachaTiers": {
    "common": "Обычная",
    "uncommon": "Необычная",
    "rare": "Редкая",
    "epic": "Эпическая"
  },
  "primitives": {
    "otherCategory": "Другое",
    "deal": "ВЫГОДА",
    "dealScore": "Индекс выгоды {score}/100",
    "loading": "Загрузка"
  },
  "unknownCard": "Неизвестная карта",
  "cardTile": {
    "unlisted": "Не в продаже",
    "insured": "страх. {value}"
  },
  "activity": {
    "unresolvedCard": "Карта не определена",
    "fromWallet": "от {wallet}",
    "byWallet": "от {wallet}",
    "currentHolder": "текущий владелец · {address}",
    "bot": "БОТ ×{n}",
    "botOffers": {
      "one": "{n} ставка в одной транзакции",
      "few": "{n} ставки в одной транзакции",
      "many": "{n} ставок в одной транзакции",
      "other": "{n} ставки в одной транзакции"
    }
  },
  "search": {
    "placeholderCompact": "Поиск карт или кошельков",
    "placeholder": "Найдите карту или вставьте адрес кошелька",
    "label": "Поиск карт или кошельков",
    "button": "Найти",
    "searching": "Ищем...",
    "empty": "Карты не найдены",
    "seeAll": {
      "one": "Показать {n} результат",
      "few": "Показать все {n} результата",
      "many": "Показать все {n} результатов",
      "other": "Показать все {n} результата"
    }
  },
  "rail": { "left": "Прокрутить влево", "right": "Прокрутить вправо" },
  "konami": { "on": "Режим DMG включён! С возвращением в 1996-й.", "off": "Снова полный цвет." },
  "gameBoy": {
    "modes": { "all": "ВСЁ", "trainers": "БЕЗ БОТОВ", "sales": "ПРОДАЖИ" },
    "booting": "Включаем Покедекс...",
    "empty": "Тренеров поблизости нет. Ждём следующего хода...",
    "live": "ОНЛАЙН",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "LIVE ON-CHAIN · DOT MATRIX",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "Game Boy с рынком в реальном времени. Стрелки листают события, Enter открывает карту.",
      "previous": "Предыдущее событие",
      "next": "Следующее событие",
      "b": "B: предыдущее событие",
      "a": "A: следующее событие",
      "select": "Select: фильтр «{mode}»",
      "start": "Start: открыть всю ленту"
    },
    "battle": battle
  }
};
