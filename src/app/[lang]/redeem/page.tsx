import type { Metadata } from "next";
import { asLocale, localeMeta, localePath, type Locale } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import localFont from "next/font/local";
import Link from "@/components/LocaleLink";
import { Fragment, Suspense } from "react";
import { RedeemLab } from "@/components/redeem/RedeemLab";
import { RedeemSkeleton } from "@/components/redeem/RedeemSkeleton";
import { COUNTRIES } from "@/lib/redeem/countries";
import { cents, INSURANCE_OVER_CENTS, PER_EXTRA_CARD_CENTS, REGIONS, US_SIGNATURE_CENTS, US_SIGNATURE_OVER_CENTS, type Region } from "@/lib/redeem/rates";
import { MAX_CARDS } from "@/lib/redeem/types";
import { SITE_URL } from "@/lib/constants";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";
import "@/components/rip/rip.css";
import "@/components/redeem/redeem.css";

// The same display face as /rip and /gym (OFL), loaded by this route only.
const lilita = localFont({ src: "../../fonts/LilitaOne.woff2", variable: "--font-lilita", weight: "400", display: "swap" });

const PATH = "/redeem";
const TITLE = "Redeem a graded card NFT for the real slab, shipped home";
const DESCRIPTION =
  "Trade your Collector Crypt card NFT for the physical graded slab: pick your country on the globe, get a live shipping quote, then burn the NFT and pay shipping in USDC. Tracked from the vault to your door.";

type Props = { params: Promise<{ lang: string }> };

/** seo.pages["/redeem"], for the metadata and the JSON-LD alike. */
const copyFor = (lang: Locale) => pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = copyFor(lang);
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

const ZONES: Region[] = ["usa", "canada", "europe", "oceania", "world"];

/** `text` with each {key} of `nodes` swapped for its node, wherever the translation puts it. */
function slots(text: string, nodes: Record<string, React.ReactNode>) {
  return text.split(/\{(\w+)\}/).map((part, i) => (i % 2 === 0 ? part : <Fragment key={i}>{part in nodes ? nodes[part] : `{${part}}`}</Fragment>));
}

export default async function RedeemPage({ params }: Props) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const s = t.redeem.page;
  const copy = copyFor(lang);
  const how = s.how.steps.map((x, i) => ({ n: String(i + 1).padStart(2, "0"), title: x.title, text: fmt(x.text, { max: MAX_CARDS }) }));
  // Plain text on the server, so search engines and AI assistants read it without the app.
  const rates = {
    usa: cents(REGIONS.usa.baseCents),
    canada: cents(REGIONS.canada.baseCents),
    europe: cents(REGIONS.europe.baseCents),
    oceania: cents(REGIONS.oceania.baseCents),
    extra: cents(PER_EXTRA_CARD_CENTS),
    over: cents(INSURANCE_OVER_CENTS),
    count: COUNTRIES.length,
  };
  const faq = s.faq.items.map((f) => ({ q: f.q, a: fmt(f.a, rates) }));
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        inLanguage: localeMeta(lang).html,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      breadcrumbLd(`${pageUrl}#breadcrumbs`, [
        { name: s.home, path: localePath(lang, "/") },
        { name: s.crumb, path: localePath(lang, PATH) },
      ]),
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
  const link = "font-black text-white underline decoration-[var(--rd-gold)] underline-offset-4";

  return (
    <div className={`rw rd ${lilita.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <header className="rw-intro">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="https://slabz.com" target="_blank" rel="noopener" className="rw-powered" aria-label={fmt(s.poweredBy, { logo: "Slabz" })}>
            {slots(s.poweredBy, { logo: <img src="/rip/slabz.webp?v=11a0a005" alt="Slabz" width={30} height={32} /> })}
          </a>
          <nav aria-label={s.breadcrumb} className="hidden items-center gap-2 text-sm font-bold text-[var(--rd-mute)] sm:flex">
            <Link href="/" className="hover:text-white">
              {s.home}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">{s.crumb}</span>
          </nav>
        </div>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h1 className="rw-h1 rd-h1">
            {s.h1} <span>{s.h1Accent}</span>
          </h1>
          <p className="hidden max-w-md text-sm font-bold text-[var(--rd-mute)] lg:block">{s.lede}</p>
        </div>
      </header>

      <Suspense fallback={<RedeemSkeleton />}>
        <RedeemLab />
      </Suspense>

      <section id="how" aria-labelledby="rd-how" className="mt-20 flex scroll-mt-24 flex-col gap-6">
        <div className="rw-head">
          <span className="rw-kicker rd-kicker">{s.how.kicker}</span>
          <h2 id="rd-how">{s.how.title}</h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {how.map((step) => (
            <li key={step.n} className="rd-info-card">
              <span className="rd-display text-4xl text-[var(--rd-gold)]">{step.n}</span>
              <h3 className="text-lg font-extrabold">{step.title}</h3>
              <p className="text-sm font-semibold text-[var(--rd-mute)]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="rd-costs" className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="rw-head">
            <span className="rw-kicker rd-kicker">{s.costs.kicker}</span>
            <h2 id="rd-costs">{s.costs.title}</h2>
          </div>
          <p className="text-sm font-semibold text-[var(--rd-mute)]">{s.costs.text}</p>
          <table className="rd-rates">
            <caption className="sr-only">{s.costs.caption}</caption>
            <thead>
              <tr>
                <th scope="col">{s.costs.zone}</th>
                <th scope="col">{t.redeem.rates.firstSlab}</th>
                <th scope="col">{t.redeem.rates.extraSlab}</th>
              </tr>
            </thead>
            <tbody>
              {ZONES.map((z) => (
                <tr key={z}>
                  <th scope="row">{t.redeem.regions[z]}</th>
                  <td className="rd-money">{cents(REGIONS[z].baseCents)}</td>
                  <td className="rd-money">{cents(PER_EXTRA_CARD_CENTS)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="rd-dest-notes">
            <li>{fmt(s.costs.insurance, { over: cents(INSURANCE_OVER_CENTS) })}</li>
            <li>{fmt(s.costs.signature, { price: cents(US_SIGNATURE_CENTS), over: cents(US_SIGNATURE_OVER_CENTS) })}</li>
            <li>{s.costs.networkFee}</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rw-head">
            <span className="rw-kicker rd-kicker">{s.burn.kicker}</span>
            <h2>{s.burn.title}</h2>
          </div>
          <div className="rd-info-card">
            <p className="text-sm font-semibold text-[var(--rd-mute)]">{s.burn.claim}</p>
            <p className="text-sm font-semibold text-[var(--rd-mute)]">{s.burn.final}</p>
            <p className="text-sm font-semibold text-[var(--rd-mute)]">
              {slots(fmt(s.burn.ships, { count: COUNTRIES.length, max: MAX_CARDS }), {
                rip: (
                  <Link href="/rip" className={link}>
                    {s.burn.rip}
                  </Link>
                ),
                scanner: (
                  <Link href="/scanner" className={link}>
                    {s.burn.scanner}
                  </Link>
                ),
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 flex w-full max-w-3xl flex-col gap-6" aria-labelledby="rd-faq">
        <div className="rw-head">
          <span className="rw-kicker rd-kicker">{s.faq.kicker}</span>
          <h2 id="rd-faq">{s.faq.title}</h2>
        </div>
        <div className="flex flex-col gap-2">
          {faq.map((f) => (
            <details key={f.q} className="rd-info-card group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-[var(--rd-gold)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-[var(--rd-mute)]">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-sm font-semibold text-[var(--rd-mute)]">
          {slots(s.faq.footer, {
            slabz: (
              <a href="https://slabz.com" target="_blank" rel="noopener noreferrer" className={link}>
                Slabz
              </a>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
