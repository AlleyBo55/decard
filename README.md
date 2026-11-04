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
[![Pull luck: VRF verified](https://img.shields.io/badge/pull_luck-VRF_verified-9a2257?style=flat-square)](#live-gacha)
[![$CARDS tracker](https://img.shields.io/badge/%24CARDS-buybacks_%2B_burns-ee8130?style=flat-square)](#cards-token)
[![18 franchise hubs](https://img.shields.io/badge/franchise_hubs-18-6390f0?style=flat-square)](#franchise-hubs)
[![Self-hosted](https://img.shields.io/badge/self--hosted-Docker_%2B_Caddy-1d5690?style=flat-square&logo=docker&logoColor=white)](#deploy)

**[Open decard.fun](https://www.decard.fun)** · [$CARDS token](https://www.decard.fun/cards-token) · [Franchise hubs](https://www.decard.fun/cards/pokemon) · [Live gacha](https://www.decard.fun/luck#live) · [Listing scanner](https://www.decard.fun/scanner) · [Trade tape](https://www.decard.fun/tape) · [Trainer's guide](https://www.decard.fun/guide)

🔥 **New:** the [$CARDS token tracker](#cards-token), [18 franchise hubs](#franchise-hubs), a slang-savvy glossary, and a [faster, leaner Decard](#faster-lighter).

</div>

---

Collector Crypt vaults real PSA, CGC and BGS slabs and trades them as tokens on Solana. Its marketplace shows what's for sale. **Decard shows what's worth buying**: every live listing on Collector Crypt and Magic Eden ranked by discount to insured value, every on-chain sale and bid as it lands, and any wallet's collection. Now it watches the gacha too: every pack as it rips, the odds of your next pull, and a verified luck score for every pull. Read-only and keyless: no login, no wallet connection, no API key.

<a href="https://www.decard.fun"><img src=".github/assets/home.jpg" alt="Decard home page with live listing stats, card and wallet search, and a 3D Poké Ball" width="100%"></a>

<a id="cards-token"></a>

## 🔥 New: the $CARDS token tracker

**Coinbase just put CARD on its listing roadmap. Decard shows what's actually behind the token.**

Collector Crypt sells gacha packs around the clock, and part of that revenue buys $CARDS back to burn. [decard.fun/cards-token](https://www.decard.fun/cards-token) puts the whole loop on one page, next to the packs ripping right now.

<a href="https://www.decard.fun/cards-token"><img src=".github/assets/cards-token.jpg" alt="Decard's $CARDS page: a holographic Pokédex card with the live price, the buyback flywheel and base stats" width="100%"></a>

- 🃏 **Holographic Pokédex entry**: a live price that flashes green or red, HP as the price against the all-time high, plus 24h change, market cap and holders.
- 🔄 **The flywheel**: pack sales → Collector Crypt revenue → CARDS bought back and burned, animated in pure CSS, for 24h, 7d, 30d and all time. Also how many cents of every $1 ripped end up as buybacks.
- 📊 **Buybacks, day by day**: 60 days of buyback-and-burn bars from DefiLlama, with the biggest day called out.
- 🔥 **Supply meter**: the 2B max supply split into circulating, not yet circulating, and burned.
- ⏳ **Unlock countdown**: a Game Boy LCD ticking down to the next unlock.
- 🟦 **Coinbase watch**: checks Coinbase Exchange for a live CARD market, so the badge flips on its own the day it lists.
- 🎰 **Live rips**: packs and dollars ripped in the last couple of minutes, straight from the gacha feed.

Every number is server-rendered and sourced, with an "as of" time. Not financial advice.

<a id="franchise-hubs"></a>

## 🗺️ New: 18 franchise hubs + a slang-savvy glossary

Every franchise Collector Crypt lists now has its own landing page, with live asks by grade, the cheapest and priciest slabs, a short collector's guide and an FAQ:

[Pokémon](https://www.decard.fun/cards/pokemon) · [One Piece](https://www.decard.fun/cards/one-piece) · [Dragon Ball](https://www.decard.fun/cards/dragon-ball) · [Riftbound](https://www.decard.fun/cards/riftbound) · [Marvel](https://www.decard.fun/cards/marvel) · [Yu-Gi-Oh!](https://www.decard.fun/cards/yu-gi-oh) · [Magic: The Gathering](https://www.decard.fun/cards/magic-the-gathering) · [Disney Lorcana](https://www.decard.fun/cards/lorcana) · [DC](https://www.decard.fun/cards/dc) · [Gundam](https://www.decard.fun/cards/gundam) · [Naruto](https://www.decard.fun/cards/naruto) · [Union Arena](https://www.decard.fun/cards/union-arena) · [Vibes](https://www.decard.fun/cards/vibes) · [Soccer](https://www.decard.fun/cards/soccer) · [Basketball](https://www.decard.fun/cards/basketball) · [Football](https://www.decard.fun/cards/football) · [Baseball](https://www.decard.fun/cards/baseball) · [Hockey](https://www.decard.fun/cards/hockey)

<a href="https://www.decard.fun/cards/one-piece"><img src=".github/assets/hubs.jpg" alt="Decard's One Piece hub: live listings, prices by grade and a collector's guide" width="100%"></a>

The [Trainer's Guide](https://www.decard.fun/guide) now speaks both hobby and crypto, with 35 new terms: slab, grail, SIR and SAR, manga rare, case break, crack and resub, BGS Black Label, seed phrase, SPL token, degen, ape in, diamond hands, WAGMI, LFG and more. Each one has its own link (`/guide#manga-rare`).

<a id="faster-lighter"></a>

## ⚡ New: faster and lighter

- **Pages paint before the JavaScript loads.** The page wrapper used to stay invisible until hydration. Now the server HTML shows at once.
- **Share images went from 492 KB PNGs to 84–117 KB JPEGs**, cached after the first render: about 2 ms of CPU each instead of 120–190 ms. The default share image is built once at build time.
- **The full catalogue is crawlable again.** Collector Crypt moved its marketplace to cursor paging, which had cut the sitemap to 327 URLs. One in-memory walk now feeds a sitemap of 13.5k+ card URLs with image entries, and a `/cards` directory at 300 KB per page instead of 1 MB.
- **Compressed API responses** (zstd/gzip through Caddy), a working keyless Solana RPC (PublicNode), and a `robots.txt` that welcomes search and AI answer engines but turns away SEO scraper bots.
- **Structured data everywhere**: Organization, WebPage, CollectionPage, BreadcrumbList, FAQPage, ItemList and DefinedTermSet, with visible breadcrumbs.

<a id="live-gacha"></a>

## 🎰 Live Gacha + Pull Luck

**Watch every rip. Know your odds. Prove your luck.**

Collector Crypt collectors rip 20 to 30 gacha packs a minute. Decard now puts every one on screen the moment it opens, crowns the biggest epic hits, shows what one pull can do *before* you buy, and scores every pull you've made against the exact card pool it was drawn from. No "trust me bro" odds: the luck math replays Collector Crypt's own VRF proof.

<a href="https://www.decard.fun/luck#live"><img src=".github/assets/home-gacha.jpg" alt="Decard home page live gacha band: a Pokédex of live pack pulls, the biggest recent hit at 100 times its pack price, and the odds of the next pull" width="100%"></a>

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://www.decard.fun/luck#live"><img src=".github/assets/gacha.jpg" alt="Live pulls feed next to the Hall of Fame podium of the biggest epic pulls, ranked by multiple"></a>
      <br><b>🔴 Live pulls + 🏆 Hall of Fame</b><br>Every pack as it lands: the card, its value, the multiple and the wallet. Epic hits flash the Pokédex lens. The Hall of Fame ranks the latest 100 epic pulls by multiple. When this was captured, #1 was a $100 soccer pack that pulled a $10,000 Lamine Yamal (100×).
    </td>
    <td width="50%" valign="top">
      <a href="https://www.decard.fun/luck#odds"><img src=".github/assets/odds.jpg" alt="If you pull now panel with the chances of one pull, a cash-back gauge, tier odds and chase cards"></a>
      <br><b>🎯 If you pull now</b><br>Pick a pack before you rip it: your chance the card beats the price, that the instant buyback pays you back, and that you double up. Plus the chase cards with their exact 1-in-N odds and a gauge of the cents you get back per $1. Read from the live pool every 5 minutes.
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://www.decard.fun/luck?memo=cc-77161af0-8001-425b-9213-e5e1d24083d6"><img src=".github/assets/luck.jpg" alt="Pull luck result for a PSA 10 card: luck score 65.8 out of 100, beating 64.7% of possible pulls, selection verified"></a>
      <br><b>🍀 Pull luck</b><br>Paste a wallet and every pull it opened gets a luck score out of 100, replayed against the frozen pool and odds behind its VRF proof. 50 is average luck. The whole wallet gets a score too, compared with fair runs of the same length. If Collector Crypt's verifier wouldn't pass a pull, Decard won't score it.
    </td>
    <td width="50%" valign="top" align="center">
      <a href="https://www.decard.fun/luck#live"><img src=".github/assets/gacha-mobile.jpg" alt="The live pulls Pokédex on a phone" width="240"></a>
      <br><b>📱 Made for thumbs</b><br>The same Pokédex on a phone, an iPad or a desktop. Check it between rips.
    </td>
  </tr>
</table>

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
- **Live gacha.** Live pulls refresh every 10 seconds, the Hall of Fame every minute and pack odds every 5 minutes. New epic hits are announced to screen readers, and the animations respect reduced-motion settings.
- **Pull luck.** `luck = P(a worse pull) + ½ × P(an equal-value pull)`, with the tier odds applied first and every available card in the rolled tier equally likely, the way Collector Crypt's VRF picks them. A wallet's score is the average over its latest 50 pulls, compared with fair runs of the same length.
- **Trainer's guide.** A plain-language glossary of grading, pop reports, gem rate, insured value, bids and vaults, plus a sourced [guide to tokenized trading cards on Solana](https://www.decard.fun/tokenized-trading-cards).
- **Easter eggs.** Tap the 3D Poké Ball to catch a deal, and try ↑ ↑ ↓ ↓ ← → ← → B A.

## How it works

There is no database and no indexer. Next.js route handlers read public sources, cache them briefly and serve the browser through `/api`:

| Source | Used for | Key |
|---|---|---|
| Collector Crypt marketplace API | listings, card details, insured values, bids, pop reports, holdings | none (optional `CC_API_KEY` raises rate limits) |
| Collector Crypt image CDN | card images, pre-sized WebP | none |
| Solana RPC: PublicNode, or Helius | trade tape, card and wallet history | none (optional `HELIUS_API_KEY`) |
| Collector Crypt gacha site | live pulls, recent epic hits, machine odds, pool snapshots, VRF proofs | none |
| Solana RPC: full-history public endpoint, or Helius | a wallet's gacha pack history | none |
| Jupiter, then CoinGecko | live SOL price | none |
| Jupiter, CoinGecko | CARDS price, supply, holders, all-time high, 30-day history | none |
| DefiLlama | gacha pack sales, Collector Crypt revenue, CARDS buybacks and burns | none |
| Coinbase Exchange | whether a CARD market is live yet | none |

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

decard.fun runs on one small VPS (Tencent Cloud Lighthouse, 2 vCPU / 2 GB) as a Docker container behind [Caddy](https://caddyserver.com), which handles HTTPS and renews its own Let's Encrypt certificates.

1. **Server:** any Linux box with Docker and the Compose plugin, ports 80 and 443 open, and your domain's A records pointing at it.
2. **GitHub secrets:** create a `production` environment that only `master` may deploy to, holding `LIGHTHOUSE_HOST`, `LIGHTHOUSE_USER`, `LIGHTHOUSE_SSH_KEY` (a key with no passphrase) and `LIGHTHOUSE_KNOWN_HOSTS` (from `ssh-keyscan -t ed25519 <host>`). The optional keys (`HELIUS_API_KEY`, `CC_API_KEY`, `NEXT_PUBLIC_GA_ID`) go there too.
3. **Push to `master`.** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the image, streams it to the server over SSH (no registry), and swaps the app container with [`deploy/compose.yaml`](deploy/compose.yaml). Edit [`deploy/Caddyfile`](deploy/Caddyfile) for your own domain.

The Dockerfile works on any container host. Vercel works too: import the repo and set `NEXT_PUBLIC_SITE_URL`. Expect the share images and the sitemap to use most of a free plan's CPU.

Search files come built in: `sitemap.xml` lists every listed graded card with its image (from one in-memory catalogue walk every 6 hours), plus the franchise hubs and guides, and `llms.txt` gives AI assistants a plain-text summary of the site.

## Tech

**Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict) · **Tailwind CSS v4** · **Redux Toolkit Query** for fetching and live polling · **Motion** for animation · **Three.js** with React Three Fiber for the 3D Poké Ball

```
src/
├── app/          routes, /api handlers, sitemap, robots, llms.txt, share image
├── components/   scanner, tape, card, wallet, gacha, luck, Game Boy and guide UI
├── services/     one function per /api call the browser makes
├── store/        RTK Query endpoints, wallet labels and watchlist
├── hooks/        data hooks for each page
├── helpers/      shared fetcher: timeouts, retries, rate limits
└── lib/          Collector Crypt, gacha and Solana clients, VRF luck math, decoding, formatting, SEO
```

## Honest limits

- Decard reads a **recent window** of on-chain activity, not all-time history. An all-time "top buyer" leaderboard needs an indexer, which this project deliberately doesn't run.
- Amounts and wallets come from the Collector Crypt program's own instruction data: list and reprice prices, bid amounts with the bidder and the owner being bid on, and gross prices on sales and taken bids.
- A pulled bid carries no amount, and a reprice shows its old price only when the earlier listing is in the same window. When a bid doesn't name the owner, Decard shows the card's current holder instead, marked as such.
- Instruction layouts we haven't verified stay blank. We'd rather show you nothing than a made-up number.
- The live gacha reads feeds that Collector Crypt's own gacha site uses. They aren't a documented API and can change, so a broken feed hides its panel instead of showing a guess.
- "If you pull now" combines the published tier odds with the newest pool snapshot for the tier that decides each number, refreshed every 5 minutes. Pools move between pulls: these are the odds of the next pull, not a promise.
- Luck scores rank pulls by insured value, not market price or profit. Every pull is independent, so a bad streak doesn't make the next pack luckier. On average, packs return less than they cost if you sell them back (87–98¢ per $1 when this was written).

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
<summary><b>Can Decard improve my gacha odds?</b></summary>

No. Each machine's tier odds are fixed, and every pull is decided by a VRF roll on your own wallet signature, so nobody can time or steer it, Decard included. Decard shows you the real odds before you rip and checks the math after.
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

**Built for the traders, rippers and collectors of the Solana card era.**<br>
If it saved you a bad buy, or proved that rip was a Legendary, drop a ⭐.

</div>
