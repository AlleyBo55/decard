<div align="center">

# 🔴 Decard ⚪

### Gotta scan &apos;em all.

**The open-source Pokédex for tokenized graded cards on Solana.**
Live listing scanner, on-chain trade tape, and wallet tracer for [Collector Crypt](https://collectorcrypt.com) — the marriage of DexScreener, Magic Eden, GMGN and Arkham, wrapped in a Game Boy.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
![No API key](https://img.shields.io/badge/API_key-not_required-brightgreen)

**⭐ Star it · 🍴 Fork it · 🛠️ Ship it — it&apos;s MIT, it&apos;s yours.**

</div>

---

## What it does

The pump.fun + Collector Crypt card mania minted a new kind of trader: part degen scalper, part lifelong collector. Decard is the terminal they didn&apos;t have. Every number on screen is read live from public endpoints — **no login, no wallet connect, no API key.**

- 📡 **Listing Scanner** — every live graded-card listing across Collector Crypt (USDC) and Magic Eden (SOL), with a **deal score** that ranks how far below insured value each card sits. Filter by category, grade, source and price.
- ⚡ **Live Trade Tape** — every on-chain sale, listing and offer as it lands, decoded straight from the marketplace program and enriched with card name, grade and image.
- 🔎 **Wallet Tracer** — paste any Solana address to see its holdings, insured total, and decoded activity. Label whales, build a watchlist.
- 🃏 **Card Pages** — flip the slab, read the PSA/CGC population and gem rate, see live listings and the card&apos;s full on-chain history.
- 📚 **Categories** — Pokémon, One Piece, Riftbound, Dragon Ball, Lorcana, sports and more, with live counts.

## Why it&apos;s different

No backend. No database. No indexer. Decard is a pure Next.js frontend that reads:

| Source | Used for | Key? |
|---|---|---|
| Collector Crypt Marketplace API | listings, cards, offers, holdings | no |
| Collector Crypt Metadata CDN | card images (pre-sized WebP) | no |
| Public Solana RPC | on-chain activity, trade tape, card history | no |
| Jupiter / CoinGecko | live SOL price | no |

That means you can fork it, `npm install`, and have a working card terminal in two minutes.

## Quick start

```bash
git clone https://github.com/AlleyBo55/decard
cd decard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). That&apos;s it — it works with zero configuration.

### Optional env (`.env.local`)

Everything runs keyless. Two optional keys raise limits and unlock extras:

```bash
HELIUS_API_KEY=      # optional — higher-throughput RPC if the public one throttles
CC_API_KEY=          # optional — 10x Collector Crypt rate limits (email support@collectorcrypt.com)
```

## Tech

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with a hand-built Pokédex theme
- **TanStack Query** for live polling
- **Three.js + React Three Fiber** for the 3D Poké ball
- **Motion** for the animations

## Honest limits

Decard reads a **recent window** of on-chain activity, not all-time history — a true market-wide "top buyer of all time" leaderboard needs an indexer, which this project deliberately doesn&apos;t run. Offer *bid amounts* for offer-only events aren&apos;t exposed by the public RPC, so those rows show the card and action without a dollar figure. Sales show real settled prices. We&apos;d rather show you nothing than a made-up number.

## Contributing

PRs welcome — new data sources, more wallet labels, extra categories, a prettier slab viewer. Open an issue or just ship a fork.

## A note on the theme

Decard is a fan-made tool styled as an homage to the handheld that raised a generation. It ships **zero** copyrighted sprites or trademarks — the Poké ball is original geometry, the fonts are system fonts, the palette is ours. Pokémon™ is a trademark of Nintendo / Creatures / GAME FREAK; Decard is not affiliated with or endorsed by them, or by Collector Crypt.

## License

[MIT](./LICENSE) — use it, fork it, sell it, learn from it. Just keep the notice.

<div align="center">

**Built for the traders, scalpers and collectors of the Solana card era.**
If it saved you a bad buy, drop a ⭐.

</div>
