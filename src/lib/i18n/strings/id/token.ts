import type { Strings } from "../en";
import type { Translation } from "../types";

export const token: Translation<Strings["token"]> = {
  copy: {
    label: "Salin alamat kontrak CARDS",
    idle: "Salin",
    copied: "Tersalin ✓",
    selected: "Terpilih",
  },
  ticker: {
    price: "HARGA",
    srPrice: "Harga CARDS",
    unavailable: "Tidak tersedia",
    unit: "24 jam",
    updated: "Diperbarui {time}",
  },
  countdown: {
    label: "Sisa waktu sampai unlock",
    units: { days: "HARI", hours: "JAM", minutes: "MNT", seconds: "DTK" },
    words: {
      days: { other: "hari" },
      hours: { other: "jam" },
      minutes: { other: "menit" },
      seconds: { other: "detik" },
    },
    done: "SUDAH UNLOCK!",
  },
  live: {
    packs: "PACK DIBUKA",
    inLastSeconds: { other: "dalam {n} dtk terakhir" },
    inLastMinutes: { other: "dalam {n} mnt terakhir" },
    noWindow: "dalam rentang feed",
    dollars: "DOLAR TERPAKAI",
    dollarsNote: "harga pack, spin gratis tidak dihitung",
    pace: "LAJU",
    paceValue: "{n}/mnt",
    paceNote: "pack per menit",
    buybacks: "UNTUK BUYBACK",
    buybacksNote: "dengan rasio 30 hari (perkiraan)",
    list: "Pull terbaru",
    free: "Gratis",
    error: "Feed live sedang tidak tersedia.",
    waiting: "Menunggu pack berikutnya…",
  },
};
