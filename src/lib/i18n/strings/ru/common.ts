import type { Strings } from "../en";
import type { Translation } from "../types";
export const common: Translation<Strings["common"]> = {
  "skip": "Перейти к содержанию",
  "language": "Язык",
  "search": "Поиск",
  "close": "Закрыть меню",
  "more": "Ещё",
  "guide": "Гид",
  "new": "Новое",
  "ripCta": "Открыть пак →",
  "homeLabel": "Decard: на главную",
  "mainNav": "Основное меню",
  "sourceCode": "Исходный код {name}",
  "newSuffix": ", новое",
  "tabs": {
    "/": "Главная",
    "/scanner": "Сканер",
    "/rip": "Паки",
    "/tape": "Лента"
  },
  "groups": {
    "market": {
      "label": "Рынок",
      "blurb": "Цены и сделки"
    },
    "play": {
      "label": "Игра",
      "blurb": "Паки и пуллы"
    },
    "learn": {
      "label": "Обучение"
    }
  },
  "nav": {
    "/tape": {
      "title": "Лента сделок",
      "desc": "Все продажи, лоты и ставки в блокчейне"
    },
    "/sales": {
      "title": "Недавние продажи",
      "desc": "Завершённые продажи по карте, грейду и цене"
    },
    "/cards": {
      "title": "Каталог карт",
      "desc": "Все слабы в продаже по названию, сету и грейду"
    },
    "/pokemon": {
      "title": "Цены по покемонам",
      "desc": "Справочник цен на грейды для каждого покемона"
    },
    "/cards-token": {
      "title": "Токен $CARDS",
      "desc": "Цена, выкуп и сжигание"
    },
    "/rip": {
      "title": "Открыть паки",
      "desc": "Настоящий грейдированный слаб в каждом паке"
    },
    "/gym": {
      "title": "Стадион паков",
      "desc": "Таблицы лидеров и шансы паков"
    },
    "/redeem": {
      "title": "Вывести слаб",
      "desc": "Доставка настоящей карты домой"
    },
    "/luck#live": {
      "title": "Гача онлайн",
      "desc": "Каждый пулл гачи в реальном времени"
    },
    "/luck": {
      "title": "Анализатор удачи",
      "desc": "Сравнить пуллы кошелька с шансами"
    },
    "/guide": {
      "title": "Гид",
      "desc": "Грейдинг, редкость и сленг коллекционеров"
    },
    "/topics": {
      "title": "Темы",
      "desc": "PSA, CGC, площадки, спорт и паки"
    },
    "/tokenized-trading-cards": {
      "title": "Токенизированные карты",
      "desc": "Как слабы из хранилища торгуются на Solana"
    }
  },
  "categories": {
    "Pokemon": "Покемон",
    "One Piece": "One Piece",
    "Dragon Ball": "Dragon Ball",
    "Riftbound": "Riftbound",
    "Marvel": "Marvel",
    "Yu-Gi-Oh!": "Yu-Gi-Oh!",
    "Magic The Gathering": "Magic: The Gathering",
    "Lorcana": "Disney Lorcana",
    "DC": "DC Comics",
    "Gundam": "Gundam",
    "Naruto": "Naruto",
    "Union Arena": "Union Arena",
    "Soccer": "Футбол",
    "Basketball": "Баскетбол",
    "Football": "Американский футбол",
    "Baseball": "Бейсбол",
    "Hockey": "Хоккей",
    "Vibes": "Vibes TCG"
  },
  "switcher": {
    "button": "Сменить язык. Сейчас: {name}",
    "kicker": "Язык",
    "title": "Выберите язык",
    "hint": "Меню, гиды и страницы переключаются на выбранный язык. Названия карт, грейды и цены остаются такими, как в лотах.",
    "current": "Вы здесь",
    "close": "Закрыть"
  },
  "footer": {
    "blurb": "Сканируй их всех! Бесплатный Покедекс с открытым исходным кодом для токенизированных грейдированных карт на Solana, с актуальными лотами Collector Crypt, Magic Eden и Slabz.",
    "explore": "Разделы",
    "franchises": "Франшизы",
    "learn": "Обучение",
    "openSource": "ОТКРЫТЫЙ КОД · MIT",
    "repoCta": "Ставьте звезду, делайте форк, присылайте PR ★",
    "builtInPublic": "СТРОИМ В ОТКРЫТУЮ",
    "konami": "Псс: попробуйте ↑ ↑ ↓ ↓ ← → ← → B A.",
    "disclaimer": "Фанатский проект, не связан с Nintendo, Creatures, GAME FREAK, The Pokémon Company или Collector Crypt. Данные: публичный API Collector Crypt и Solana RPC. Это не финансовая рекомендация.",
    "links": {
      "/scanner": "Сканер лотов",
      "/cards": "Каталог карт",
      "/scanner?orderBy=deal": "Лучшие предложения",
      "/tape": "Лента сделок",
      "/rip": "Открыть паки с картами",
      "/gym": "Стадион паков: таблицы лидеров",
      "/redeem": "Вывести слаб",
      "/luck#live": "Гача онлайн",
      "/luck": "Анализатор удачи",
      "/cards-token": "Токен $CARDS",
      "/sales": "Недавние продажи",
      "/pokemon": "Цены по покемонам",
      "/cards#all": "Все карты в продаже",
      "/tokenized-trading-cards": "Как работают токенизированные карты",
      "/topics": "PSA, площадки и темы",
      "/guide": "Гид тренера",
      "/guide#grading": "Что такое грейдинг?",
      "/guide#buying-and-selling": "Индекс выгоды"
    }
  },
  "notFound": {
    "text": "Дикий 404 появился! Этой страницы нет в Покедексе.",
    "home": "Бежать домой",
    "scanner": "Открыть сканер"
  },
  "error": {
    "text": "Ой! Страница потеряла сознание. Источник данных не ответил вовремя.",
    "retry": "Оживить страницу",
    "home": "На главную"
  },
  "notice": "Названия карт, грейды и цены остаются на английском. Это переведённая версия того же рынка."
};
