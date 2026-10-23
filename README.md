<div align="center">

<a href="https://www.decard.fun"><img src=".github/assets/banner.png" alt="Decard: the Pokédex for tokenized graded cards on Solana" width="100%"></a>

# Decard

**The free, open-source scanner and tracker for [Collector Crypt](https://collectorcrypt.com) graded cards on Solana.**<br>
DexScreener, Magic Eden, GMGN and Arkham for card traders, wrapped in a Game Boy.

[![Live site](https://img.shields.io/badge/live-decard.fun-e3350d?style=flat-square)](https://www.decard.fun)
[![License: MIT](https://img.shields.io/badge/license-MIT-ffcb05?style=flat-square)](./LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-29263d?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-2a75bb?style=flat-square&logo=typescript&logoColor=white)](./tsconfig.json)
[![No API key](https://img.shields.io/badge/API_key-not_required-3dbe6e?style=flat-square)](#configuration)

**[Open decard.fun](https://www.decard.fun)** · [Listing scanner](https://www.decard.fun/scanner) · [Trade tape](https://www.decard.fun/tape) · [Trainer's guide](https://www.decard.fun/guide)

</div>

---

Collector Crypt vaults real PSA, CGC and BGS slabs and trades them as tokens on Solana. Its marketplace shows what's for sale. **Decard shows what's worth buying**: every live listing on Collector Crypt and Magic Eden ranked by discount to insured value, every on-chain sale and bid as it lands, and any wallet's collection. Read-only and keyless: no login, no wallet connection, no API key.

<a href="https://www.decard.fun"><img src=".github/assets/home.jpg" alt="Decard home page with live listing stats, card and wallet search, and a 3D Poké Ball" width="100%"></a>

## Highlights

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://www.decard.fun/scanner"><img src=".github/assets/scanner.jpg" alt="Listing scanner ranking Collector Crypt listings by deal score"></a>
      <br><b>📡 Listing scanner</b><br>Every live listing on Collector Crypt (USDC) and Magic Eden (SOL). Sort by best deal, newest or price, and filter by category, venue and price.
    </td>
    <td width="50%" valign="top">
      <img src=".github/assets/card.jpg" alt="Card page for a 1999 Charizard 1st Edition PSA 10 with listed price, insured value, best bid and PSA pop report">
      <br><b>🃏 Card pages</b><br>Flip the slab, compare the price with insured value, and read the PSA or CGC pop report, live bids, owner and on-chain history.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://www.decard.fun/tape"><img src=".github/assets/tape.jpg" alt="Live trade tape of decoded Collector Crypt sales, listings and bids next to a Game Boy player"></a>
      <br><b>⚡ Live trade tape</b><br>Sales, listings, reprices and bids decoded from the Collector Crypt marketplace program, with a bulk-bot filter and a playable Game Boy.
    </td>
    <td width="50%" valign="top">
      <img src=".github/assets/wallet.jpg" alt="Wallet tracer showing a trainer card with 87 graded cards and their insured value">
      <br><b>🔎 Wallet tracer</b><br>Paste any Solana address for its graded cards, insured value and marketplace activity. Label whales and star wallets to a watchlist.
    </td>
  </tr>
</table>

## Features

- **Deal score.** `(1 − price ÷ insured value) × 100`, clamped to 0–100, on every USDC listing with an insured value. Higher means further under insured value. It's a filter, not a guarantee.
- **Scanner.** Category chips with live counts, venue and price filters, list or grid view, and Load more on every sort. The server-rendered [graded card directory](https://www.decard.fun/cards) exposes exact names, grades, sets and years to search engines and AI crawlers.
- **Trade tape.** Hides bulk bid bots by default, shows who bid on whom, and refreshes every 10 seconds.
- **Card pages.** Rarity tier from the pop report, gem rate, PSA and CGC cert lookups, and each live bid as a share of insured value.
- **Wallets.** Holdings sorted by insured value, list price or name, plus decoded activity. Labels and the watchlist stay in your browser (localStorage).
- **Trainer's guide.** A plain-language glossary of grading, pop reports, gem rate, insured value, bids and vaults, plus a sourced [guide to tokenized trading cards on Solana](https://www.decard.fun/tokenized-trading-cards).
- **Easter eggs.** Tap the 3D Poké Ball to catch a deal, and try ↑ ↑ ↓ ↓ ← → ← → B A.

## How it works

There is no database and no indexer. Next.js route handlers read public sources, cache them briefly and serve the browser through `/api`:

| Source | Used for | Key |
|---|---|---|
| Collector Crypt marketplace API | listings, card details, insured values, bids, pop reports, holdings | none (optional `CC_API_KEY` raises rate limits) |
| Collector Crypt image CDN | card images, pre-sized WebP | none |
| Solana RPC: public endpoint, or Helius | trade tape, card and wallet history | none (optional `HELIUS_API_KEY`) |
| Jupiter, then CoinGecko | live SOL price | none |

The server-side fetcher times out slow calls, retries throttled or failed reads with backoff, holds each upstream host to a rate limit and merges identical requests, so a burst of visitors costs one upstream call.

## Quick start

Requires Node.js 20.9 or newer.

```bash
git clone https://github.com/AlleyBo55/decard
cd decard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It works with zero configuration.

## Configuration

Copy `.env.example` to `.env`. Every variable is optional.

| Variable | Scope | What it does |
|---|---|---|
| `HELIUS_API_KEY` | server only | Makes Helius the primary Solana RPC, with the public RPC as fallback when Helius is throttled or down. Free key at [helius.dev](https://dashboard.helius.dev). |
| `CC_API_KEY` | server only | Raises Collector Crypt rate limits 10x. Ask support@collectorcrypt.com. |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical origin for SEO tags, `robots.txt`, `sitemap.xml` and `llms.txt`, e.g. `https://www.decard.fun`. On Vercel it falls back to the production domain. |
| `NEXT_PUBLIC_GA_ID` | public | Google Analytics 4 measurement ID (`G-…`). Unset loads no analytics. |

Never put a key in a `NEXT_PUBLIC_` variable: those values are baked into the JavaScript every visitor downloads.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAlleyBo55%2Fdecard)

1. Import the repo on Vercel, or click the button. No build settings to change.
2. Under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your domain, plus any optional keys.
3. Deploy. `NEXT_PUBLIC_` values are read at build time, so redeploy after changing them.

Search files come built in: `sitemap.xml` lists up to 20,000 listed graded cards and refreshes its data every 6 hours, and `llms.txt` gives AI assistants a plain-text summary of the site.

## Tech

**Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict) · **Tailwind CSS v4** · **Redux Toolkit Query** for fetching and live polling · **Motion** for animation · **Three.js** with React Three Fiber for the 3D Poké Ball

```
src/
├── app/          routes, /api handlers, sitemap, robots, llms.txt, share image
├── components/   scanner, tape, card, wallet, Game Boy and guide UI
├── services/     one function per /api call the browser makes
├── store/        RTK Query endpoints, wallet labels and watchlist
├── hooks/        data hooks for each page
├── helpers/      shared fetcher: timeouts, retries, rate limits
└── lib/          Collector Crypt and Solana clients, decoding, formatting, SEO
```

## Honest limits

- Decard reads a **recent window** of on-chain activity, not all-time history. An all-time "top buyer" leaderboard needs an indexer, which this project deliberately doesn't run.
- Amounts and wallets come from the Collector Crypt program's own instruction data: list and reprice prices, bid amounts with the bidder and the owner being bid on, and gross prices on sales and taken bids.
- A pulled bid carries no amount, and a reprice shows its old price only when the earlier listing is in the same window. When a bid doesn't name the owner, Decard shows the card's current holder instead, marked as such.
- Instruction layouts we haven't verified stay blank. We'd rather show you nothing than a made-up number.

## FAQ

<details>
<summary><b>Is Decard affiliated with Collector Crypt?</b></summary>

No. Decard is independent and fan-made. It reads Collector Crypt's public API and the Solana blockchain, and links to Collector Crypt and Magic Eden when you want to buy.
</details>

<details>
<summary><b>Do I need to connect a wallet?</b></summary>

No. Decard is read-only: no account, no wallet connection, no API key. Paste any Solana address to see that wallet's cards and activity.
</details>

<details>
<summary><b>Which cards does it cover?</b></summary>

Every graded card listed on Collector Crypt: Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, Magic: The Gathering, Yu-Gi-Oh!, Gundam and sports cards, graded by PSA, CGC, Beckett (BGS) and others.
</details>

<details>
<summary><b>Can I run my own copy?</b></summary>

Yes. It's MIT-licensed and needs no keys: clone it and run `npm run dev`, or use the Vercel button above.
</details>

## Contributing

PRs welcome: new data sources, more wallet labels (`src/lib/wallet-labels.json`), extra categories, a prettier slab viewer. Run `npm run lint` and `npm run build` before you open one.

## A note on the theme

Decard is a fan-made homage to the handheld that raised a generation. It ships **zero** copyrighted sprites or trademarks: the Poké Ball is original geometry, the fonts are open source (SIL OFL) and the palette is ours. Pokémon™ is a trademark of Nintendo, Creatures and GAME FREAK. Decard is not affiliated with or endorsed by them, or by Collector Crypt. Nothing here is financial advice.

## License

[MIT](./LICENSE). Use it, fork it, sell it, learn from it. Just keep the notice.

<div align="center">

**Built for the traders, scalpers and collectors of the Solana card era.**<br>
If it saved you a bad buy, drop a ⭐.

</div>
