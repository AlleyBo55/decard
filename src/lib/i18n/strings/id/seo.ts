import type { Strings } from "../en";
import type { Translation } from "../types";

export const seo: Translation<Strings["seo"]> = {
  "pages": {
    "/scanner": {
      "title": "Pemindai listing kartu graded",
      "description": "Listing kartu graded di Collector Crypt dan Magic Eden, diurutkan menurut skor, harga, atau yang terbaru."
    },
    "/cards": {
      "title": "Direktori kartu graded",
      "description": "Setiap kartu graded yang sedang dijual, dengan nama, grade, set, dan tahun."
    },
    "/tape": {
      "title": "Pita transaksi kartu graded",
      "description": "Penjualan, listing, dan bid Collector Crypt saat masuk di Solana."
    },
    "/luck": {
      "title": "Analisis keberuntungan gacha",
      "description": "Bandingkan tarikan paket sebuah dompet dengan peluang yang dipublikasikan."
    },
    "/guide": {
      "title": "Panduan kartu graded",
      "description": "Grading, PSA, CGC, BGS, laporan populasi, slab, dan istilah kolektor."
    },
    "/pokemon-card-value-checker": {
      "title": "Pengecek harga kartu Pokémon",
      "description": "Bandingkan harga jual kartu Pokémon graded, nilai asuransi, dan grade PSA, CGC, atau BGS."
    },
    "/pokemon": {
      "title": "Harga kartu Pokémon per Pokémon",
      "description": "Panduan harga graded untuk tiap Pokémon: PSA, CGC, dan BGS."
    },
    "/sales": {
      "title": "Penjualan kartu graded terbaru",
      "description": "Penjualan Collector Crypt yang sudah settle di Solana, dengan kartu, grade, dan harga."
    },
    "/tokenized-trading-cards": {
      "title": "Kartu trading ter-token di Solana",
      "description": "Bagaimana slab di brankas diperdagangkan sebagai token dan ditebus menjadi kartu fisik."
    },
    "/cards-token": {
      "title": "Harga, beli balik, dan burn $CARDS",
      "description": "Harga dan suplai $CARDS, plus pendapatan gacha yang membeli balik dan membakarnya."
    },
    "/rip": {
      "title": "Buka paket kartu graded",
      "description": "Buka paket dan terima slab asli yang sudah dinilai PSA, CGC, atau BGS."
    },
    "/gym": {
      "title": "Papan peringkat dan peluang Rip Gym",
      "description": "Papan peringkat dan peluang di balik paket kartu graded."
    },
    "/redeem": {
      "title": "Tukar NFT dengan slab fisik",
      "description": "Bakar tokennya dan kirim slab PSA, CGC, atau BGS. Ongkir dalam USDC."
    },
    "/topics": {
      "title": "Topik, venue, dan waralaba kartu graded",
      "description": "PSA, CGC, BGS, penukaran, buka paket, dan harga untuk tiap waralaba."
    }
  },
  "hub": {
    "title": "Harga kartu {name} bergradasi",
    "description": "Harga slab {name} PSA, CGC, dan BGS di Collector Crypt dan Magic Eden, di Solana.",
    "h1": "Harga dan listing kartu {name}",
    "intro": "Kartu {name} bergradasi yang sedang dijual. Slab fisiknya ada di brankas, diperdagangkan sebagai token di Solana, dan bisa ditebus."
  },
  "mon": {
    "title": "Harga kartu {name}: PSA 10 dan PSA 9",
    "description": "Harga kartu Pokémon {name} menurut grade: PSA 10, PSA 9, CGC, dan BGS.",
    "h1": "Harga kartu {name}",
    "lede": "Setiap slab {name} yang sedang dijual, dengan harga terendah dan median per grade."
  }
};
