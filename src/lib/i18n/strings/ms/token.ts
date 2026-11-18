import type { Strings } from "../en";
import type { Translation } from "../types";

export const token: Translation<Strings["token"]> = {
  "copy": {
    "label": "Salin alamat kontrak CARDS",
    "idle": "Salin",
    "copied": "Disalin ✓",
    "selected": "Dipilih"
  },
  "ticker": {
    "price": "HARGA",
    "srPrice": "Harga CARDS",
    "unavailable": "Tidak tersedia",
    "unit": "24j",
    "updated": "Dikemas kini {time}"
  },
  "countdown": {
    "label": "Masa berbaki sebelum pembukaan kunci",
    "units": { "days": "HARI", "hours": "JAM", "minutes": "MIN", "seconds": "SAAT" },
    "words": {
      "days": { "other": "hari" },
      "hours": { "other": "jam" },
      "minutes": { "other": "minit" },
      "seconds": { "other": "saat" }
    },
    "done": "KUNCI DIBUKA!"
  },
  "live": {
    "packs": "PEK DIBUKA",
    "inLastSeconds": { "other": "dalam {n} saat terakhir" },
    "inLastMinutes": { "other": "dalam {n} minit terakhir" },
    "noWindow": "dalam tempoh suapan",
    "dollars": "DOLAR DIBELANJAKAN",
    "dollarsNote": "harga pek, putaran percuma tidak dikira",
    "pace": "KADAR",
    "paceValue": "{n}/min",
    "paceNote": "pek seminit",
    "buybacks": "UNTUK PEMBELIAN BALIK",
    "buybacksNote": "pada kadar 30 hari (anggaran)",
    "list": "Cabutan terkini",
    "free": "Percuma",
    "error": "Suapan langsung tidak tersedia buat masa ini.",
    "waiting": "Menunggu pek seterusnya…"
  }
};
