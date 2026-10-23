import type { Metadata } from "next";
import Link from "next/link";
import { DialogBox, Kicker, MoreLink, TypeChip } from "@/components/ui";
import { REPO_URL, SITE_NAME, SITE_URL } from "@/lib/constants";
import { PRIMARY_CATEGORIES } from "@/lib/poke-types";
import { categoryPath, jsonLd, OG_IMAGE } from "@/lib/seo";

const PATH = "/tokenized-trading-cards";
const TITLE = "Tokenized trading cards on Solana: Collector Crypt guide";
const DESCRIPTION =
  "How tokenized graded cards work on Solana: vault custody, Collector Crypt NFTs, USDC trading, insured value, deal scores, population reports, redemption and risks.";
const PUBLISHED = "2026-10-23";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    title: `${TITLE} · ${SITE_NAME}`,
    description: DESCRIPTION,
    url: PATH,
    images: [OG_IMAGE],
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    section: "Tokenized trading cards",
    tags: ["Collector Crypt", "tokenized trading cards", "onchain TCG", "Solana", "graded cards"],
  },
  twitter: { card: "summary_large_image", title: `${TITLE} · ${SITE_NAME}`, description: DESCRIPTION, images: [OG_IMAGE.url] },
};

const SOURCES = {
  product: "https://docs.collectorcrypt.com/product-info",
  market: "https://docs.collectorcrypt.com/marketplace/user-guide",
  deposit: "https://docs.collectorcrypt.com/vault/deposit",
  withdraw: "https://docs.collectorcrypt.com/vault/withdraw",
  solana: "https://solana.com/news/tokenized-cards-and-physical-collectibles",
  psa: "https://www.psacard.com/Pop",
} as const;

const FAQ = [
  {
    q: "Is a tokenized trading card the same as a digital card?",
    a: "No. In the model covered here, a unique on-chain asset represents a professionally graded physical card held in a vault. The token can move between wallets while the slab stays in custody, and the owner can follow the platform's process to redeem the physical card.",
  },
  {
    q: "Is this a TCG, NFT, RWA or crypto trading card?",
    a: "It can be described with all four terms, but they mean different things. TCG identifies the card category, NFT describes the unique on-chain asset, and RWA describes its link to a physical item. Tokenized trading card is the clearest overall term.",
  },
  {
    q: "Does a high Decard deal score guarantee profit?",
    a: "No. It only measures the discount between a USDC listing and Collector Crypt's insured value. It does not prove demand, liquidity, authenticity beyond the displayed records, future sale price or redemption economics.",
  },
  {
    q: "Do I need a wallet to use Decard?",
    a: "No. Decard is a read-only research tool. You only need a compatible Solana wallet, USDC and SOL when you choose to transact on a marketplace such as Collector Crypt.",
  },
  {
    q: "Where does Decard get its card and market data?",
    a: "Listings, card details, insured values, bids and population reports come from Collector Crypt's public API. Market activity comes from the Collector Crypt marketplace program on Solana. Decard has no database or private indexer.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${SITE_URL}${PATH}#article`,
      headline: TITLE,
      description: DESCRIPTION,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      datePublished: PUBLISHED,
      dateModified: PUBLISHED,
      inLanguage: "en",
      isAccessibleForFree: true,
      mainEntityOfPage: `${SITE_URL}${PATH}`,
      author: { "@type": "Organization", name: "Decard contributors", url: REPO_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
      },
      about: [
        { "@type": "Thing", name: "Tokenized trading cards" },
        { "@type": "Thing", name: "Collector Crypt" },
        { "@type": "Thing", name: "Solana" },
        { "@type": "Thing", name: "Trading card games" },
      ],
      citation: Object.values(SOURCES),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Tokenized trading cards", item: `${SITE_URL}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 flex flex-col gap-4">
      <h2 className="h-display text-[clamp(1.8rem,4vw,2.6rem)]">{title}</h2>
      <div className="flex flex-col gap-4 text-[1.05rem] leading-8 text-ink-soft">{children}</div>
    </section>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">
      {children} ↗
    </a>
  );
}

export default function TokenizedTradingCardsPage() {
  return (
    <article className="pt-8 sm:pt-12 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">Home</Link>
        <span aria-hidden>›</span>
        <span className="text-ink">Tokenized trading cards</span>
      </nav>

      <header className="mt-10 max-w-4xl flex flex-col gap-6">
        <Kicker>Collector Crypt · Solana · onchain TCG</Kicker>
        <h1 className="h-display text-[clamp(2.7rem,7vw,5.2rem)]">
          Tokenized trading cards, <span className="text-poke">explained.</span>
        </h1>
        <p className="text-xl sm:text-2xl leading-relaxed text-ink-soft max-w-3xl">
          A graded Pokémon, One Piece or sports card can stay protected in a vault while its ownership moves on Solana. Here is how that model works, what Collector Crypt does, and how to research a card before you trade it.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/scanner?orderBy=deal" className="btn btn-red">Scan live listings</Link>
          <Link href="/guide" className="btn btn-cream">Open the graded-card glossary</Link>
        </div>
        <p className="text-sm text-ink-mute">
          By <a href={REPO_URL} target="_blank" rel="noreferrer" className="font-bold hover:text-poke-deep">Decard contributors</a> · Published and reviewed <time dateTime={PUBLISHED}>October 23, 2026</time> · 10 minute read · Independent, not financial advice
        </p>
      </header>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          ["PHYSICAL", "A professionally graded slab remains in vault custody."],
          ["ONCHAIN", "A unique Solana asset records the transferable ownership claim."],
          ["REDEEMABLE", "The owner can follow the custodian's process to receive the card."],
        ].map(([label, text]) => (
          <div key={label} className="paper p-5">
            <span className="font-pixel text-[9px] text-poke-deep">{label}</span>
            <p className="mt-3 font-bold leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] items-start">
        <div className="flex flex-col gap-16 max-w-3xl">
          <Section id="what-is-a-tokenized-card" title="What is a tokenized trading card?">
            <p>
              A tokenized trading card connects a unique blockchain asset to a physical collectible held by a custodian. The physical slab does not need to cross the country every time ownership changes. Instead, the on-chain asset moves between wallets, and the underlying card stays in storage until an owner redeems it.
            </p>
            <p>
              This is different from a purely digital collectible. Collector Crypt says its card assets are physically redeemable: a collector can deposit an eligible graded card and receive the corresponding asset, or burn that asset during withdrawal so the physical card can be shipped. Read the current <SourceLink href={SOURCES.product}>Collector Crypt product description</SourceLink>, <SourceLink href={SOURCES.deposit}>deposit process</SourceLink> and <SourceLink href={SOURCES.withdraw}>withdrawal process</SourceLink> before transacting because custody, eligibility, costs and timing can change.
            </p>
            <DialogBox arrow={false} className="!p-6">
              <p className="dialog-text">TOKEN ≠ THE SLAB ITSELF</p>
              <p className="mt-3 text-ink-soft">
                The asset is the transferable on-chain record tied to the vaulted card. Redemption depends on the custodian, the card&apos;s status and the platform&apos;s current terms.
              </p>
            </DialogBox>
          </Section>

          <Section id="collector-crypt" title="How Collector Crypt works on Solana">
            <p>
              Collector Crypt combines card custody with a Solana marketplace. According to its documentation, deposited cards must already be graded. After inspection and vaulting, the depositor receives an NFT representing the card. The marketplace uses USDC for purchases and SOL for network fees.
            </p>
            <ol className="grid gap-4 sm:grid-cols-2 list-none">
              {[
                ["01", "Grade and vault", "An eligible slab is inspected and stored; its identity includes details such as set, serial number, grader, grade and certification."],
                ["02", "Represent ownership", "A unique asset in a Solana wallet points to that card while the physical slab remains in custody."],
                ["03", "Trade", "A holder can list the asset. Collector Crypt describes listings as escrowless: the asset stays in the seller's wallet until a sale."],
                ["04", "Redeem", "The owner starts a withdrawal, burns the on-chain asset and pays applicable shipping so the custodian can send the slab."],
              ].map(([n, title, text]) => (
                <li key={n} className="paper p-5">
                  <span className="font-pixel text-[9px] text-azure-deep">STEP {n}</span>
                  <h3 className="mt-3 font-display font-bold text-xl text-ink">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
            <p>
              The broader model is often called tokenized collectibles or real-world assets (RWAs). The <SourceLink href={SOURCES.solana}>Solana Foundation overview</SourceLink> describes several platforms that use on-chain ownership while physical items stay in custody. Each platform has different terms, so “tokenized” alone does not tell you who holds the item or exactly what redemption guarantees.
            </p>
          </Section>

          <Section id="research" title="How to research a tokenized graded card">
            <p>A good listing is more than a familiar character and a low price. Check these fields together:</p>
            <div className="dash-divide border-y border-sand">
              {[
                ["Identity", "Match the year, set, card number, language, parallel and autograph status. Similar-looking releases can have very different values."],
                ["Grade and certificate", "Confirm the grading company, numeric grade and certificate number. Follow Decard's cert link to the grader when one is available."],
                ["Population", "The population report counts how many examples the grader recorded at this grade and above. Low population can support scarcity, but it does not create demand."],
                ["Price and insured value", "Treat insured value as one reference supplied with the card, not a guaranteed sale price or a complete appraisal."],
                ["Bids and activity", "Live offers, recent sales and listing changes reveal more about liquidity than an asking price by itself."],
                ["Custody and redemption", "Check the current custodian, withdrawal eligibility, shipping cost, destination restrictions and expected timing on the marketplace."],
              ].map(([term, meaning]) => (
                <div key={term} className="grid gap-2 py-5 sm:grid-cols-[170px_1fr]">
                  <h3 className="font-display font-bold text-xl text-ink">{term}</h3>
                  <p className="text-base leading-relaxed">{meaning}</p>
                </div>
              ))}
            </div>
            <p>
              PSA describes its <SourceLink href={SOURCES.psa}>Population Report</SourceLink> as the record of how many items it has graded at each grade. Decard shows the reported grade population, population higher, total population and gem rate when Collector Crypt provides them.
            </p>
          </Section>

          <Section id="deal-score" title="Decard's deal score">
            <p>
              Deal score is a ranking shortcut for Collector Crypt listings priced in USDC. It measures how far the asking price is below the card&apos;s insured value:
            </p>
            <div className="paper p-6 sm:p-8 border-l-4 !border-l-pika">
              <p className="font-pixel text-[10px] text-ink-mute">FORMULA</p>
              <p className="mt-4 font-display font-bold text-2xl sm:text-3xl text-ink">(1 − listing price ÷ insured value) × 100</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div><span className="text-xs font-bold text-ink-mute">INSURED</span><p className="font-display font-bold text-2xl text-ink">$100</p></div>
                <div><span className="text-xs font-bold text-ink-mute">LISTED</span><p className="font-display font-bold text-2xl text-ink">$80</p></div>
                <div><span className="text-xs font-bold text-ink-mute">DEAL SCORE</span><p className="font-display font-bold text-2xl text-up">20</p></div>
              </div>
            </div>
            <p>
              The score is clamped from 0 to 100. It appears only when a card has an insured value and a USDC listing, because Decard does not guess a dollar price for SOL listings when ranking deals. A score of 20 means “listed 20% under insured value,” not “worth 20% more” and not “guaranteed profit.”
            </p>
            <MoreLink href="/scanner?orderBy=deal">Open the live best-deal ranking</MoreLink>
          </Section>

          <Section id="tcg-nft-rwa" title="TCG, NFT, RWA or crypto trading card?">
            <p>
              These labels overlap, but they answer different questions. <strong className="text-ink">TCG</strong> means trading card game and describes categories such as Pokémon, One Piece or Magic: The Gathering. <strong className="text-ink">NFT</strong> describes a unique blockchain asset. <strong className="text-ink">RWA</strong> emphasizes that the asset is connected to something physical. “Crypto trading card” is informal and can also mean a card that exists only digitally.
            </p>
            <p>
              <strong className="text-ink">TCC</strong> is sometimes used informally for “trading card crypto,” but it has no consistent meaning across the card market. “Tokenized trading cards” or “onchain TCG collectibles” describes this category more clearly.
            </p>
            <p>
              For the model Decard tracks, <strong className="text-ink">tokenized graded trading card</strong> is the least ambiguous phrase: a specific, professionally graded physical slab represented on-chain while held in custody.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRIMARY_CATEGORIES.slice(0, 8).map((category) => (
                <TypeChip key={category} category={category} href={categoryPath(category)} />
              ))}
            </div>
          </Section>

          <Section id="risks" title="What the token does not remove">
            <ul className="grid gap-4 list-none">
              {[
                ["Market risk", "A listing, insured value or past sale does not guarantee what another buyer will pay. Thinly traded cards may have a wide spread between asking prices and executable bids."],
                ["Custody risk", "The physical card is held by a custodian. Verify who holds it, the insurance arrangement and what happens if the platform or custodian has a problem."],
                ["Redemption risk", "Shipping fees, supported destinations, taxes, delays and card eligibility can change. Partner-vault cards may take longer to ship."],
                ["Metadata risk", "Wrong set, parallel, grade or certificate data can distort comparisons. Verify the slab and grader record rather than relying on one screen."],
                ["Wallet and contract risk", "Marketplace transactions require wallet signatures. Read every transaction, protect seed phrases and use official links."],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-4">
                  <span aria-hidden className="mt-2 h-3 w-3 shrink-0 rounded-full border-2 border-ink bg-pika" />
                  <p><strong className="text-ink">{title}.</strong> {text}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="how-decard-works" title="What Decard adds">
            <p>
              Collector Crypt provides the assets and marketplace. Decard is an independent research interface over public data. It combines the marketplace catalogue with on-chain activity so a collector can move from discovery to due diligence without connecting a wallet.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Listing scanner", "Ranks listings by deal score, price or freshness across Collector Crypt and Magic Eden."],
                ["Card pages", "Bring together card identity, grade, certificate, insured value, pop report, listing, bids and history."],
                ["Live tape", "Decodes recent Collector Crypt marketplace instructions into sales, listings, reprices and bids."],
                ["Wallet tracer", "Shows the graded cards and decoded marketplace activity associated with any Solana address."],
              ].map(([title, text]) => (
                <div key={title} className="paper p-5">
                  <h3 className="font-display font-bold text-xl text-ink">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <p>
              Decard has no database and no private market indexer. Listings, insured values, bids and population data come from Collector Crypt&apos;s public API; activity comes from the Collector Crypt marketplace program on Solana. Short caches reduce upstream load, so numbers can lag by seconds. See the <Link href="/guide" className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">Trainer&apos;s Guide</Link> for every field and limitation.
            </p>
          </Section>

          <Section id="faq" title="Frequently asked questions">
            <div className="dash-divide border-y border-sand">
              {FAQ.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-xl text-ink [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden className="shrink-0 font-pixel text-[9px] text-poke transition-transform group-open:rotate-90">▶</span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </Section>

          <Section id="sources" title="Sources and methodology">
            <p>
              This guide summarizes the platform model; marketplace terms are controlled by the original providers. Check these sources for current operational details:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2 text-base">
              <li><SourceLink href={SOURCES.product}>Collector Crypt product information</SourceLink></li>
              <li><SourceLink href={SOURCES.market}>Collector Crypt marketplace user guide</SourceLink></li>
              <li><SourceLink href={SOURCES.deposit}>Collector Crypt depositing cards</SourceLink></li>
              <li><SourceLink href={SOURCES.withdraw}>Collector Crypt withdrawing cards</SourceLink></li>
              <li><SourceLink href={SOURCES.solana}>Solana overview of tokenized cards and collectibles</SourceLink></li>
              <li><SourceLink href={SOURCES.psa}>PSA Population Report (sign-in may be required)</SourceLink></li>
              <li><a href={REPO_URL} target="_blank" rel="noreferrer" className="font-bold text-azure-deep underline decoration-sand-dark underline-offset-4 hover:text-poke-deep">Decard source code and calculation logic ↗</a></li>
            </ul>
          </Section>

          <DialogBox className="!p-6 sm:!p-8" arrow={false}>
            <p className="dialog-text">READY TO RESEARCH A CARD?</p>
            <p className="mt-3 text-lg text-ink-soft">Scan the live market, then open a card to verify its grade, population, bids and history.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/scanner?orderBy=deal" className="btn btn-red">Find live deals</Link>
              <Link href="/tape" className="btn btn-cream">Watch the trade tape</Link>
            </div>
          </DialogBox>
        </div>

        <aside className="hidden lg:block sticky top-28 paper p-5" aria-label="On this page">
          <p className="font-pixel text-[9px] text-poke-deep">ON THIS PAGE</p>
          <ol className="mt-4 flex flex-col gap-2 text-sm font-bold text-ink-soft">
            {[
              ["what-is-a-tokenized-card", "Tokenized cards"],
              ["collector-crypt", "Collector Crypt"],
              ["research", "Research checklist"],
              ["deal-score", "Deal score"],
              ["tcg-nft-rwa", "TCG, NFT and RWA"],
              ["risks", "Risks"],
              ["how-decard-works", "How Decard works"],
              ["faq", "FAQ"],
              ["sources", "Sources"],
            ].map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="hover:text-poke-deep">{label}</a></li>
            ))}
          </ol>
        </aside>
      </div>
    </article>
  );
}
