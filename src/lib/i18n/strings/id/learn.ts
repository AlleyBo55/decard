import type { Strings } from "../en";
import type { Translation } from "../types";

export const learn: Translation<Strings["learn"]> = {
  crumbs: {
    label: "Jejak navigasi",
    home: "Beranda",
    topics: "Topik",
  },
  guide: {
    kicker: "Panduan Trainer",
    h1: "{accent} kartu graded-mu.",
    h1Accent: "Pokédex",
    lede: {
      other:
        "{n} entri yang membahas semua hal yang ditemui Trainer baru di Decard, dari grading dan pop report sampai bid dan brankas, plus istilah kolektor dan kripto yang kamu lihat di X. Bahasanya sederhana, dan tidak ada jargon yang dibiarkan tanpa penjelasan.",
    },
    hello: "Halo! Selamat datang di dunia kartu graded.",
    explainer: {
      title: "Baru kenal kartu on-chain?",
      text: "Mulai dari penyimpanan di brankas, kepemilikan lewat token, redeem, skor diskon, dan risikonya.",
      cta: "Baca panduan 10 menit",
    },
    outro: {
      title: "Siap mempraktikkannya?",
      text: "Buka pemindai, urutkan menurut Diskon terbesar, dan temukan kartu yang diperdagangkan di bawah nilai asuransinya.",
      cta: "Buka pemindai",
    },
    glossaryName: "Glosarium Decard untuk istilah kartu graded, kolektor, dan kripto",
    question: "Apa itu {term}?",
  },
  book: {
    search: "Cari di panduan",
    index: "Indeks panduan",
    empty: "Tidak ada entri yang cocok dengan “{query}”.",
  },
  topics: {
    kicker: "Indeks · lembaga grading, marketplace, waralaba",
    h1: "Semua yang {accent} di Decard.",
    h1Accent: "benar-benar ada harganya",
    lede: "Harga listing live untuk kartu graded di brankas, plus panduan berbahasa sederhana tentang lembaga grading dan marketplace yang sering tertukar. Karakter, klub, atau selebritas yang tidak punya slab di katalog tidak dibuatkan halaman kosong.",
    guides: "Panduan",
    franchises: "Waralaba",
    franchisesNote: "Setiap hub berisi harga listing live per grade untuk game, komik, manga, atau olahraga itu.",
    pokemon: "Pokémon, per karakter",
    pokemonNote: "Pokémon yang punya cukup listing graded untuk panduan harganya sendiri. Sisanya ada di hub Pokémon.",
    tools: "Fitur",
    toolLinks: {
      scanner: "Pemindai listing",
      cards: "Direktori kartu",
      checker: "Cek harga kartu Pokémon",
      sales: "Penjualan terbaru",
      tape: "Transaksi live",
      rip: "Buka pack",
      redeem: "Redeem slab",
      guide: "Panduan Trainer",
      explainer: "Penjelasan kartu tokenisasi",
      token: "Token $CARDS",
    },
    hubItem: "Kartu {name}",
    pokemonItem: "Harga kartu {name}",
  },
  topic: {
    updated: "Diperbarui {date}. Independen, buatan penggemar, bukan nasihat keuangan.",
    faq: "Pertanyaan",
    more: "Baca juga",
  },
};
