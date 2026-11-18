import type { Strings } from "../en";
import type { Translation } from "../types";

export const ui: Translation<Strings["ui"]> = {
  "verbs": {
    "SALE": "JUALAN",
    "BID TAKEN": "BIDAAN DITERIMA",
    "REPRICE": "UBAH HARGA",
    "DELIST": "NYAHSENARAI",
    "LISTED": "DISENARAIKAN",
    "NEW BID": "BIDAAN BAHARU",
    "BID EDIT": "BIDAAN DIUBAH",
    "BID PULLED": "BIDAAN DITARIK"
  },
  "ripTiers": {
    "common": { "label": "Biasa", "ballName": "Poké Ball", "cry": "Dapat!" },
    "rare": { "label": "Jarang", "ballName": "Great Ball", "cry": "Tangkapan hebat!" },
    "epic": { "label": "Epik", "ballName": "Ultra Ball", "cry": "Tangkapan ultra!" },
    "legendary": { "label": "Legenda", "ballName": "Master Ball", "cry": "Legenda muncul!" }
  },
  "gachaTiers": {
    "common": "Biasa",
    "uncommon": "Kurang biasa",
    "rare": "Jarang",
    "epic": "Epik"
  },
  "primitives": {
    "otherCategory": "Lain-lain",
    "deal": "TAWARAN",
    "dealScore": "Skor tawaran {score}/100",
    "loading": "Memuatkan"
  },
  "unknownCard": "Kad tidak dikenali",
  "cardTile": {
    "unlisted": "Tidak dijual",
    "insured": "ins {value}"
  },
  "activity": {
    "unresolvedCard": "Kad belum dikenal pasti",
    "fromWallet": "daripada {wallet}",
    "byWallet": "oleh {wallet}",
    "currentHolder": "pemegang semasa · {address}",
    "bot": "BOT ×{n}",
    "botOffers": { "other": "{n} bidaan dalam satu transaksi" }
  },
  "search": {
    "placeholderCompact": "Cari kad atau dompet",
    "placeholder": "Cari kad, atau tampal alamat dompet",
    "label": "Cari kad atau dompet",
    "button": "Cari",
    "searching": "Mencari...",
    "empty": "Tiada kad dijumpai",
    "seeAll": { "other": "Lihat {n} hasil" }
  },
  "rail": { "left": "Tatal ke kiri", "right": "Tatal ke kanan" },
  "konami": { "on": "Mod DMG dihidupkan! Selamat kembali ke tahun 1996.", "off": "Kembali kepada warna penuh." },
  "gameBoy": {
    "modes": { "all": "SEMUA", "trainers": "TANPA BOT", "sales": "JUALAN" },
    "booting": "Menghidupkan DEX...",
    "empty": "Tiada jurulatih berdekatan. Menunggu langkah seterusnya...",
    "live": "LANGSUNG",
    "device": {
      "power": "◀ OFF · ON ▶",
      "stripe": "LIVE ON-CHAIN · DOT MATRIX",
      "battery": "BATTERY",
      "model": "POCKET · {mode}",
      "select": "SELECT",
      "start": "START"
    },
    "aria": {
      "device": "Game Boy pasaran langsung. Guna kekunci anak panah untuk melihat peristiwa dan Enter untuk membuka kad.",
      "previous": "Peristiwa sebelumnya",
      "next": "Peristiwa seterusnya",
      "b": "B: peristiwa sebelumnya",
      "a": "A: peristiwa seterusnya",
      "select": "Select: penapis {mode}",
      "start": "Start: buka pita dagangan penuh"
    },
    "battle": {
      "sale": "Dapat! {card} ditangkap dengan {price}!",
      "saleNoPrice": "Dapat! {card} berjaya ditangkap!",
      "bidTaken": "{card} menerima bidaan {price}!",
      "bidTakenNoPrice": "{card} menerima bidaan!",
      "listed": "{card} liar muncul di pasaran!",
      "reprice": "{card} menukar harganya!",
      "delist": "{card} lari dari pasaran!",
      "newBid": "Jurulatih {trainer} membaling bidaan kepada {card}!",
      "bidEdit": "Jurulatih {trainer} melaraskan bidaan pada {card}.",
      "bidPulled": "Jurulatih {trainer} menarik balik bidaan pada {card}.",
      "other": "Sesuatu berlaku kepada {card}..."
    }
  }
};
