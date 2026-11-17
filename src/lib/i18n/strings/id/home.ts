import type { Strings } from "../en";
import type { Translation } from "../types";

export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · dex kartu graded",
  "live": "LANGSUNG",
  "hero": { "lead": "", "scan": "pindai", "tail": "semuanya." },
  "lede": "Listing langsung, skor penawaran, dan pergerakan dompet untuk kartu graded ter-token di Collector Crypt dan Magic Eden.",
  "newKicker": "Baru di Decard",
  "newTitle": "Buka paket, simpan slab asli.",
  "typeKicker": "Pilih tipe",
  "typeTitle": "Jelajah menurut waralaba.",
  "typeSub": "Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, kartu olahraga, dan lainnya: harga jual per grade.",
  "faqKicker": "FAQ",
  "faqTitle": "Pertanyaan, dijawab.",
  "tipTitle": "TIPS PROFESOR",
  "tip": "PSA 10 dengan populasi 12 berbeda dari PSA 10 yang semua orang punya. Sebelum membeli, lihat laporan populasi, gem rate, dan jarak harga dari nilai asuransi.",
  "guideBtn": "Baca panduan",
  "dealBtn": "Cari penawaran",
  "title": "Buka paket, pindai pasar, dan tukar kartu graded di Solana",
  "description": "Buka paket berisi slab PSA, CGC, dan BGS asli, cari harga terbaik di Collector Crypt, Magic Eden, dan Slabz, lalu kirim kartu fisiknya ke rumah. Pokémon, One Piece, olahraga, dan lainnya, plus pita transaksi langsung dan pelacak dompet.",
  "faq": [
    {
      "q": "Apa itu Decard?",
      "a": "Pemindai gratis dan open source untuk kartu graded Collector Crypt di Solana. Decard mengurutkan listing, membaca jual-beli di rantai, dan menampilkan populasi serta isi dompet."
    },
    {
      "q": "Apa itu skor penawaran?",
      "a": "Seberapa jauh harga USDC di bawah nilai asuransi, dari 0 sampai 100. Asuransi $100 dan harga $80 menghasilkan skor 20. Ini bukan janji untung."
    },
    {
      "q": "Apakah Decard bagian dari Collector Crypt?",
      "a": "Tidak. Decard independen. Data dibaca dari API publik dan blockchain Solana. Tombol beli mengarah ke Collector Crypt atau Magic Eden."
    },
    {
      "q": "Perlu daftar atau menghubungkan dompet?",
      "a": "Tidak untuk melihat. Dompet hanya dipakai jika kamu membuka paket."
    },
    {
      "q": "Kartu apa saja yang dicakup?",
      "a": "Setiap kartu graded yang dijual di Collector Crypt: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic, Yu-Gi-Oh!, Gundam, dan olahraga. Grader-nya PSA, CGC, BGS, dan lainnya."
    },
    {
      "q": "Dari mana datanya?",
      "a": "Listing, nilai asuransi, bid, dan populasi dari API publik Collector Crypt. Pita transaksi dibaca dari program marketplace di Solana. Tidak ada basis data sendiri."
    }
  ],
  "more": [
    {
      "href": "/pokemon-card-value-checker",
      "label": "Cek harga kartu Pokémon"
    },
    {
      "href": "/pokemon",
      "label": "Harga per Pokémon"
    },
    {
      "href": "/luck",
      "label": "Analisis tarikan gacha"
    },
    {
      "href": "/cards-token",
      "label": "Harga dan burn $CARDS"
    },
    {
      "href": "/sales",
      "label": "Penjualan terbaru"
    },
    {
      "href": "/cards",
      "label": "Semua kartu yang dijual"
    },
    {
      "href": "/tokenized-trading-cards",
      "label": "Cara kerja kartu ter-token"
    },
    {
      "href": "/guide",
      "label": "Semua istilah"
    }
  ]
};
