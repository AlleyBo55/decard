import type { Strings } from "../en";
import type { Translation } from "../types";
export const card: Translation<Strings["card"]> = {
  "meta": {
    "notFound": "Карта не найдена",
    "title": "{name}: цена · {set}",
    "titleNoSet": "{name}: цена",
    "description": "{name}. Страховая стоимость {insured}. Текущая цена, поп-репорт, ставки и история в блокчейне на Decard.",
    "imageAlt": "{name}: страховая стоимость, лот, лучшая ставка и популяция",
    "pullImageAlt": "{name} из пака за {pack}, страховая стоимость {insured}",
    "pullTitle": "Пулл: {name} из пака за {pack}",
    "pullDescription": "Страховая стоимость {insured}: {multiple} к цене пака. Цену пака указал тот, кто поделился. Текущая цена, поп-репорт и ставки на Decard.",
    "pullDescriptionNoValue": "Цену пака указал тот, кто поделился. Текущая цена, поп-репорт и ставки на Decard."
  },
  "jsonLd": {
    "gradingCompany": "Грейдинговая компания",
    "grade": "Грейд",
    "set": "Сет",
    "year": "Год",
    "cardNumber": "Номер карты",
    "parallel": "Параллель",
    "certNumber": "Номер сертификата",
    "gradePopulation": "Популяция грейда",
    "populationHigher": "Популяция выше",
    "totalPopulation": "Общая популяция с грейдом",
    "identifier": "Сертификат {company} {cert}",
    "anyGrader": "Грейдинг"
  },
  "loading": "Загружаем карту",
  "breadcrumb": {
    "label": "Хлебные крошки",
    "scanner": "Сканер"
  },
  "sharedPull": {
    "label": "Пулл, которым поделились",
    "kicker": "ПОДЕЛИЛИСЬ ПУЛЛОМ",
    "pulled": "Выпала из пака за {pack}.",
    "pulledWithValue": "Выпала из пака за {pack}. Страховая стоимость — {multiple} к цене пака.",
    "note": "Цену пака указал тот, кто поделился ссылкой.",
    "cta": "Оценить свои пуллы →"
  },
  "actions": {
    "viewOnCollectorCrypt": "Смотреть на Collector Crypt ↗",
    "buyOnSlabz": "Купить на Slabz · {price} ↗"
  },
  "authenticated": "✓ Подлинность подтверждена",
  "rarity": {
    "LEGENDARY": "ЛЕГЕНДАРНАЯ",
    "RARE": "РЕДКАЯ",
    "UNCOMMON": "НЕОБЫЧНАЯ",
    "COMMON": "ОБЫЧНАЯ"
  },
  "price": {
    "listed": "Цена лота",
    "notListed": "Не в продаже",
    "listedOn": "на {venue} · обновлено {ago}",
    "insured": "СТРАХОВКА",
    "bestBid": "ЛУЧШАЯ СТАВКА",
    "underInsured": "На {pct}% ниже страховой стоимости",
    "overInsured": "На {pct}% выше страховой стоимости"
  },
  "facts": {
    "title": "Данные Покедекса",
    "set": "Сет",
    "year": "Год",
    "number": "Номер",
    "parallel": "Параллель",
    "grader": "Грейдер",
    "grade": "Грейд",
    "cert": "Сертификат №",
    "vault": "Хранилище",
    "token": "Токен"
  },
  "pop": {
    "title": "Базовые характеристики · поп-репорт {company}",
    "fullReport": "Полный поп-репорт ↗",
    "grade": "Поп {grade}",
    "plain": "Поп",
    "higher": "Выше",
    "total": "Всего",
    "gemRate": "Доля десяток",
    "summary": "{pop} с этим грейдом из {total} всего, {higher} выше.",
    "summaryNoneHigher": "{pop} с этим грейдом из {total} всего, выше нет ни одной.",
    "lastGem": "Последний Gem Mint выдан {date}."
  },
  "bids": {
    "title": "Активные ставки",
    "count": "Активные ставки ({n})",
    "unavailable": "Активные ставки сейчас недоступны. Загляните чуть позже.",
    "none": "Активных ставок нет. Станьте первым тренером, который сделает предложение.",
    "ofInsured": "{pct}% от страховки"
  },
  "trainer": {
    "title": "Тренер",
    "collectorCryptName": "Имя на Collector Crypt: {name}",
    "open": "Открыть карточку тренера →",
    "unknown": "Владелец неизвестен."
  },
  "history": {
    "title": "История в блокчейне",
    "error": "Сейчас не удалось прочитать историю этой карты.",
    "empty": "В блокчейне пока нет истории сделок с этой картой."
  },
  "slab": {
    "showFront": "Показать лицевую сторону слаба",
    "showBack": "Показать оборот слаба",
    "backAlt": "{name}, оборот слаба",
    "flip": "↻ Перевернуть слаб"
  },
  "related": {
    "sameKicker": "Сравните грейды",
    "sameTitle": "Другие слабы {name} в продаже",
    "sameSub": "Текущие цены лотов, сначала дешёвые.",
    "sameLabel": "Другие лоты {name}",
    "hubLink": "{name}: цены на карты по грейдам",
    "scannerLink": "Все лоты {name} в сканере",
    "setKicker": "Тот же сет",
    "setTitle": "Ещё из сета {set}",
    "setSub": "Сначала новые лоты.",
    "setLabel": "Другие лоты из сета {set}"
  },
  "receipt": {
    "button": "Поделиться пуллом",
    "close": "Закрыть",
    "slabLabel": "Ваш слаб",
    "title": "Чек пулла",
    "heading": "Поделитесь пуллом",
    "statsLabel": "Характеристики слаба",
    "insured": "Страховка",
    "bestBid": "Лучшая ставка",
    "listedAt": "Выставлен за {price} на {venue}",
    "notListed": "Сейчас не в продаже",
    "checking": "Проверяем лот…",
    "packQuestion": "Сколько стоил пак?",
    "optional": "Необязательно",
    "otherAmount": "Другая сумма",
    "otherAmountLabel": "Другая цена пака в долларах",
    "noPack": "Без пака",
    "invalidPack": "Введите сумму от $1 до $100 000.",
    "meter": "Страховка ÷ пак",
    "exp": "ОПЫТ",
    "noteMultiple": "Страховая стоимость — {multiple} к цене пака за {pack}.",
    "notePick": "Выберите цену пака, чтобы увидеть множитель.",
    "noteNoValue": "Для этого слаба нет страховой стоимости.",
    "shareIt": "Поделиться",
    "postOnX": "Опубликовать в X",
    "saveImage": "Сохранить картинку",
    "more": "Ещё",
    "copy": "Копировать",
    "preview": "Превью ссылки",
    "previewNote": "Так ссылку покажут X и Discord",
    "previewAlt": "Картинка для публикации: {name}",
    "rendering": "Рисуем…",
    "fine": "Цену пака указываете вы, и её никто не проверяет. Страховая стоимость — это цифра Collector Crypt, а не цена продажи. Цифры на картинке обновляются раз в день.",
    "lidTag": "ЧЕК ПУЛЛА",
    "share": "Поделиться",
    "copyLink": "Копировать ссылку",
    "toast": {
      "discord": "Скопировано. Вставьте ссылку в Discord, и чек развернётся.",
      "copied": "Ссылка скопирована.",
      "copyFailed": "Не удалось скопировать. Нажмите на ссылку и удерживайте.",
      "shareFailed": "Меню «Поделиться» не открылось. Скопируйте ссылку."
    },
    "say": {
      "throw": "DECARD использует ПОКЕБОЛ!",
      "click": "Щёлк!",
      "multiple": "Страховая стоимость: {multiple} к паку за {pack}!",
      "caught": "Попался! Поймали {name}!"
    },
    "post": {
      "pulled": "Мой пулл: {name} из пака за {pack}.",
      "pulledWithValue": "Мой пулл: {name} из пака за {pack}. Страховая стоимость {insured} ({multiple} к паку).",
      "insured": "страховая стоимость {insured}",
      "pop": "поп {pop}"
    }
  },
  "stage": {
    "showFront": "Показать лицевую сторону слаба",
    "showBack": "Показать оборот слаба",
    "flip": "↻ Перевернуть",
    "tilt": "◎ Наклонить",
    "skip": "Пропустить ▸▸"
  }
};
