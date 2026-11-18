import type { Strings } from "../en";
import type { Translation } from "../types";

export const home: Translation<Strings["home"]> = {
  "kicker": "Solana · dex kad bergred",
  "live": "LANGSUNG",
  "hero": { "lead": "Mesti", "scan": "imbas", "tail": "semuanya." },
  "lede": "Penyenaraian langsung daripada Collector Crypt, Magic Eden dan Slabz, skor tawaran dan setiap pergerakan dompet, untuk kad bergred bertoken di Solana.",
  "newKicker": "Baharu di Decard",
  "newTitle": "Buka pek, simpan slab sebenar.",
  "typeKicker": "Pilih jenis anda",
  "typeTitle": "Layari ikut francais.",
  "typeSub": "Kad bergred Pokémon, One Piece, Dragon Ball, Riftbound, Marvel, sukan dan banyak lagi: harga minta langsung ikut gred bagi setiap slab yang disenaraikan di Collector Crypt, Magic Eden dan Slabz.",
  "faqKicker": "Soalan lazim Jurulatih",
  "faqTitle": "Soalan anda, dijawab.",
  "tipTitle": "TIP PROFESOR",
  "tip": "PSA 10 dengan populasi 12 sangat berbeza daripada PSA 10 yang dimiliki semua orang. Sebelum anda membeli, semak laporan pop, kadar Gem Mint dan sejauh mana harganya berbeza daripada nilai insurans.",
  "guideBtn": "Baca Panduan Jurulatih",
  "dealBtn": "Cari tawaran",
  "title": "Kad bergred di Solana: buka pek, imbas dan tebus",
  "description": "Buka pek slab PSA, CGC dan BGS sebenar, cari tawaran di Collector Crypt, Magic Eden dan Slabz, lalu hantar kad fizikal ke rumah. Pokémon, One Piece dan sukan.",
  "faq": [
    {
      "q": "Apa itu Decard?",
      "a": "Pengimbas dan penjejak percuma serta sumber terbuka untuk kad bergred bertoken di Solana. Ia menyusun penyenaraian langsung daripada Collector Crypt, Magic Eden dan Slabz ikut skor tawaran, menyahkod setiap jualan, penyenaraian dan bidaan on-chain, serta memaparkan laporan populasi dan kad dalam mana-mana dompet."
    },
    {
      "q": "Apa itu skor tawaran?",
      "a": "Sejauh mana harga penyenaraian USDC berada di bawah nilai insurans kad, dari 0 hingga 100. Kad yang diinsuranskan pada $100 dan disenaraikan pada $80 mendapat skor 20. Menyusun pengimbas ikut tawaran terbaik meletakkan diskaun paling besar di atas."
    },
    {
      "q": "Adakah Decard sebahagian daripada Collector Crypt?",
      "a": "Tidak. Decard bebas dan buatan peminat. Ia membaca API pasaran awam Collector Crypt dan blockchain Solana, dan memberi pautan ke Collector Crypt, Magic Eden dan Slabz apabila anda mahu membeli."
    },
    {
      "q": "Perlukah saya mendaftar atau menyambung dompet?",
      "a": "Tidak untuk melayari. Pengimbas, pita dagangan dan penjejak bersifat baca sahaja: tiada akaun, tiada sambungan dompet dan tiada kunci API. Tampal mana-mana alamat Solana untuk melihat kad bergred dan aktiviti pasaran dompet itu. Sambung dompet hanya jika anda mahu membuka pek."
    },
    {
      "q": "Kad apa yang diliputi Decard?",
      "a": "Setiap kad bergred bertoken yang disenaraikan di Collector Crypt, Magic Eden atau Slabz: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam dan kad sukan, yang digred oleh PSA, CGC, Beckett (BGS) dan lain-lain."
    },
    {
      "q": "Apakah sumber data ini?",
      "a": "Penyenaraian, nilai insurans, bidaan dan laporan populasi datang daripada API awam Collector Crypt. Pita dagangan dinyahkod daripada program pasaran Collector Crypt di Solana. Tiada pangkalan data: setiap angka dibaca secara langsung."
    }
  ],
  "more": [
    { "href": "/pokemon-card-value-checker", "label": "Semak nilai kad Pokémon" },
    { "href": "/pokemon", "label": "Harga kad ikut Pokémon" },
    { "href": "/luck", "label": "Semak tuah cabutan gacha" },
    { "href": "/cards-token", "label": "Harga, pembelian balik dan pembakaran $CARDS" },
    { "href": "/sales", "label": "Jualan terkini yang disahkan" },
    { "href": "/cards", "label": "Layari semua kad yang disenaraikan" },
    { "href": "/tokenized-trading-cards", "label": "Cara kad dagangan bertoken berfungsi" },
    { "href": "/guide", "label": "Setiap istilah dalam Panduan Jurulatih" }
  ],
  "stats": { "listed": "Kad disenaraikan", "floor": "Harga lantai", "top": "Harga minta tertinggi" },
  "catch": {
    "unlisted": "Tidak dijual",
    "blip": "{card}, {price}",
    "blipUnder": "{card}, {price}, {under}% di bawah nilai insurans",
    "throw": "Baling Poké Ball untuk menangkap tawaran",
    "throw3d": "Baling Poké Ball untuk menangkap tawaran rawak",
    "caught": "Dapat! {card} berjaya ditangkap!",
    "insured": "insurans {value}",
    "under": "{pct}% di bawah",
    "view": "Lihat kad",
    "again": "Baling lagi",
    "shaking": "Goyang... goyang...",
    "prompt": "Ketik bola untuk menangkap tawaran",
    "promptAgain": "Ketik bola untuk membaling lagi"
  },
  "ticker": {
    "label": "Baru disenaraikan",
    "loading": "Membaca pasaran…",
    "empty": "Tiada penyenaraian baharu dalam beberapa minit lalu."
  },
  "ripCard": {
    "title": "Buka pek kad bergred.",
    "hook": "Slab {psa}, {bgs} atau {cgc} sebenar dalam setiap pek.",
    "body": "Pokémon, One Piece, Dragon Ball, Lorcana dan sukan, masing-masing dengan pendedahan tersendiri. Simpan slab itu, atau jual balik dengan satu ketikan.",
    "cta": "Buka pek",
    "gym": "{gym} papan pendahulu dan peluang pek",
    "gymName": "Gym Buka Pek:",
    "pulled": "Baru dapat",
    "pullsLabel": "Cabutan terkini di Decard",
    "idle": "Setiap pek mengandungi slab bergred sebenar. Buka satu dan cabutan anda akan muncul di sini."
  },
  "redeemCard": {
    "eyebrow": "Tebus",
    "title": "Bawa slab anda {em}",
    "titleEm": "pulang.",
    "body": "Dapat kad yang berbaloi disimpan? Tukar NFT kad itu dengan slab bergred sebenar, dihantar dari bilik kebal terus ke pintu rumah anda.",
    "cta": "Tebus kad",
    "vault": "Bilik kebal",
    "town": "Bandar anda"
  },
  "gachaCard": {
    "live": "Gacha langsung",
    "title": "Pek sedang dibuka sekarang.",
    "body": "Setiap pembukaan pek Collector Crypt sebaik sahaja berlaku.",
    "cta": "Tonton gacha langsung",
    "score": "Semak tuah cabutan saya",
    "counting": "Mengira cabutan…",
    "perMinute": { "other": "{n} cabutan seminit" },
    "biggest": "hit terbesar baru-baru ini {multiple}, {card} {value}"
  },
  "market": {
    "kicker": "Di pasaran",
    "tabsLabel": "Penyenaraian",
    "tabs": {
      "deals": {
        "label": "Tawaran terbaik",
        "title": "Di bawah nilai insurans, {em}",
        "em": "disusun.",
        "sub": "Penyenaraian USDC langsung disusun ikut sejauh mana harganya di bawah nilai insurans bilik kebal. Lebih penuh bar HP, lebih besar diskaunnya.",
        "more": "Buka pengimbas"
      },
      "new": {
        "label": "Baru disenaraikan",
        "title": "Baru masuk pasaran.",
        "sub": "Penyenaraian terkini di Collector Crypt dan Magic Eden, sebaik sahaja ia masuk.",
        "more": "Lihat semua yang baharu"
      },
      "top": {
        "label": "Rak teratas",
        "title": "Kad paling mahal yang disenaraikan.",
        "sub": "Kad idaman dan Gem Mint, disusun dari harga tertinggi ke bawah.",
        "more": "Lihat rak teratas"
      }
    }
  },
  "onChain": {
    "kicker": "Langsung on-chain",
    "title": "Setiap pergerakan, sebaik sahaja berlaku.",
    "sub": "Dinyahkod terus daripada program pasaran Collector Crypt: setiap jualan, penyenaraian dan bidaan.",
    "more": "Pita dagangan penuh",
    "gameBoy": "A dan B beralih antara peristiwa, SELECT menyembunyikan bot, START membuka pita dagangan penuh.",
    "moves": "Pergerakan terkini",
    "quiet": "Pasaran sunyi buat masa ini.",
    "bidsTitle": "Bidaan hangat",
    "bidsSub": "Kad yang sedang menerima bidaan, dengan bidaan langsung terbaik.",
    "bids": { "other": "{n} bidaan" },
    "ofInsured": "{pct}% nilai ins",
    "noBids": "Tiada bidaan langsung dalam tempoh terkini."
  },
  "offline": {
    "title": "DEX hilang isyarat seketika.",
    "retry": "Cuba lagi",
    "text": "Suapan pasaran tidak menjawab. Biasanya ia pulih dalam beberapa saat."
  },
  "snapshot": {
    "kicker": "Gambaran pasaran",
    "title": "Pilih jenis, baca pasaran.",
    "sub": "Jumlah kad disenaraikan, harga lantai dan harga minta tertinggi bagi setiap kategori, di Collector Crypt, Magic Eden dan Slabz."
  },
  "dex": {
    "allVenues": "Semua platform",
    "venue": "Platform",
    "no": "No.{no}",
    "type": "Kategori jenis {type}",
    "listed": "Disenaraikan",
    "floor": "Harga lantai",
    "top": "Harga minta tertinggi",
    "floorCard": "Kad harga lantai: {card} pada {price}",
    "types": {
      "electric": "Elektrik",
      "water": "Air",
      "fire": "Api",
      "grass": "Rumput",
      "psychic": "Psikik",
      "fighting": "Bertarung",
      "dragon": "Naga",
      "fairy": "Pari-pari",
      "ghost": "Hantu",
      "dark": "Gelap",
      "steel": "Keluli",
      "ground": "Tanah",
      "flying": "Terbang",
      "normal": "Normal"
    }
  }
};
