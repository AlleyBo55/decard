import type { Strings } from "../en";
import type { Translation } from "../types";

export const seo: Translation<Strings["seo"]> = {
  pages: {
    "/scanner": {
      title: "Listing kartu graded menurut skor diskon",
      description: "Listing kartu graded live di Collector Crypt, Magic Eden, dan Slabz, diurutkan per skor diskon, harga, atau terbaru. Filter Pokémon, One Piece, Riftbound, dll.",
    },
    "/cards": {
      title: "Direktori kartu graded: Pokémon, PSA, dan lainnya",
      description: "Jelajahi kartu graded yang sedang di-list menurut nama persis, grade, set, tahun, nomor kartu, dan kategori, termasuk kartu Pokémon dan slab PSA.",
    },
    "/tape": {
      title: "Transaksi live kartu graded di Solana",
      description: "Setiap penjualan, listing, dan bid kartu graded di marketplace Collector Crypt, diurai live: kartu, grade, harga, dan dompet. Bot bid massal bisa disaring.",
    },
    "/luck": {
      title: "Cek hoki pull gacha",
      description: "Beri skor setiap pull gacha Collector Crypt terverifikasi di dompet, atau satu pull saja, dibanding kartu dan peluang tier yang berlaku saat pull didapat.",
    },
    "/guide": {
      title: "Istilah kartu: PSA vs CGC, slang hobi dan kripto",
      description: "Glosarium sederhana kartu graded tokenisasi: PSA vs CGC vs BGS, pop report, SIR dan manga rare, plus slang kolektor dan Solana yang sering muncul di X.",
    },
    "/pokemon-card-value-checker": {
      title: "Cek harga kartu Pokémon: harga pasaran & nilai PSA",
      description: "Cek harga listing kartu Pokémon terkini, nilai asuransi, dan grade-nya. Bandingkan slab PSA, CGC, dan BGS dari listing marketplace live, gratis tanpa login.",
    },
    "/pokemon": {
      title: "Harga kartu Pokémon graded per Pokémon",
      description: "Panduan harga graded untuk {count} Pokémon, dari Charizard dan Pikachu sampai Umbreon dan Gengar: harga listing PSA, CGC, dan BGS live per grade.",
    },
    "/sales": {
      title: "Penjualan kartu graded terbaru di Solana",
      description: "Penjualan tuntas terbaru kartu Pokémon graded dan kartu tokenisasi lain di Collector Crypt: kartu, grade, harga, pembeli, penjual, dan transaksi Solana-nya.",
    },
    "/tokenized-trading-cards": {
      title: "Apa itu kartu trading tokenisasi di Solana?",
      description: "Cara kerja kartu graded tokenisasi di Solana: brankas, NFT kartu, trading USDC, nilai asuransi, skor diskon, pop report, redeem, dan risikonya.",
    },
    "/cards-token": {
      title: "Harga token $CARDS: buyback dan burn",
      description: "Harga CARDS live, porsi pendapatan gacha Collector Crypt untuk buyback dan burn CARDS, total yang di-burn, unlock 29 Nov, dan status listing Coinbase.",
    },
    "/rip": {
      title: "Buka pack kartu graded Pokémon, One Piece & lainnya",
      description: "Buka mystery pack kartu graded asli di Decard, didukung Slabz: Pokémon, One Piece, olahraga, dan lainnya. Cek peluangnya, bayar USDC, jual balik sekali ketuk.",
    },
    "/gym": {
      title: "Liga Rip: top pembuka pack dan peluang pack Slabz",
      description: "Papan peringkat buka pack Slabz: Trainer Decard ala penantang Gym, semua pemain Slabz live, dan tiap pack jadi Gym menurut peluang Epik, Legendaris, dan return.",
    },
    "/redeem": {
      title: "Redeem NFT kartu graded, slab asli dikirim ke rumah",
      description: "Redeem NFT kartumu jadi slab fisik: pilih negara di globe, cek ongkir live, lalu burn NFT-nya dan bayar ongkir dalam USDC. Dilacak dari brankas sampai rumahmu.",
    },
    "/topics": {
      title: "Topik kartu graded, marketplace, dan waralaba",
      description: "Panduan PSA, CGC, BGS, slab, redeem, dan buka pack, plus hub harga live untuk Pokémon, One Piece, Riftbound, Marvel, olahraga, dan waralaba lain yang di-list.",
    },
  },
  hub: {
    title: "Harga kartu {name} graded dan listing live",
    description: "Harga live slab {name} graded di Solana: harga listing PSA, CGC, dan BGS di Collector Crypt, Magic Eden, dan Slabz.",
    h1: "Harga kartu {name} graded dan listing live",
    intro: "Kartu {name} graded yang sedang di-list. Masing-masing adalah slab asli di brankas, dimiliki lewat token di Solana.",
  },
  mon: {
    title: "Harga kartu {name}: PSA 10, PSA 9 & nilai graded",
    description: "Harga kartu Pokémon {name} live per grade: harga listing PSA 10, PSA 9, CGC, dan BGS di Collector Crypt dan Magic Eden.",
    h1: "Harga kartu {name}",
    lede: "Semua slab {name} graded yang sedang di-list, dengan harga listing terendah dan median untuk setiap grade.",
  },
  pokemon: {},
};
