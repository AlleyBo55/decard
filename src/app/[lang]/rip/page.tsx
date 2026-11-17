import type { Metadata } from "next";
import { asLocale, localeMeta, localePath } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { fmt, plural } from "@/lib/i18n/format";
import { stringsFor } from "@/lib/i18n/strings";
import localFont from "next/font/local";
import Link from "@/components/LocaleLink";
import { Suspense } from "react";
import { RipLab } from "@/components/rip/RipLab";
import { MachineSkeleton } from "@/components/rip/RipMachine";
import { rich } from "@/components/rip/rich";
import { UNIVERSES } from "@/components/rip/universes";
import { SITE_URL } from "@/lib/constants";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

// The rip page's display face (OFL): chunky and game-like, with digits that read at a glance.
// Only this route loads it.
const lilita = localFont({ src: "../../fonts/LilitaOne.woff2", variable: "--font-lilita", weight: "400", display: "swap" });

const PATH = "/rip";
const TITLE = "Rip graded card packs: Pokémon, One Piece and more";
const DESCRIPTION =
  "Rip mystery packs of real graded cards on Decard, powered by Slabz: Pokémon, One Piece, Dragon Ball, Riftbound, Lorcana and sports. See the odds and top grails, pay in USDC from your wallet, and sell back in one tap.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

export default async function RipPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.rip.page;
  const seo = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const home = t.common.tabs["/"];
  const crumb = t.common.nav[PATH].title;
  const pageUrl = `${SITE_URL}${localePath(lang, PATH)}`;
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: localeMeta(lang).html,
        isPartOf: { "@id": WEBSITE_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      },
      breadcrumbLd(`${pageUrl}#breadcrumbs`, [
        { name: home, path: localePath(lang, "/") },
        { name: crumb, path: localePath(lang, PATH) },
      ]),
      {
        "@type": "FAQPage",
        // Plain text on the server, so search engines and AI assistants read it without the app.
        mainEntity: copy.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
  return (
    <div className={`rw ${lilita.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      {/* Compact on purpose: the arena below should own the first screen on every device. */}
      <header className="rw-intro">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="https://slabz.com" target="_blank" rel="noopener" className="rw-powered" aria-label={fmt(copy.poweredBy, { logo: "Slabz" })}>
            {rich(copy.poweredBy, { logo: <img src="/rip/slabz.webp?v=11a0a005" alt="Slabz" width={30} height={32} /> })}
          </a>
          <nav aria-label={copy.breadcrumb} className="hidden items-center gap-2 text-sm font-bold text-[var(--rw-mute)] sm:flex">
            <Link href="/" className="hover:text-white">
              {home}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">{crumb}</span>
          </nav>
        </div>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h1 className="rw-h1">{rich(copy.h1, { accent: <span>{copy.h1Accent}</span> })}</h1>
          <p className="hidden max-w-md text-sm font-bold text-[var(--rw-mute)] lg:block">{plural(lang, UNIVERSES.length, copy.lede)}</p>
        </div>
      </header>

      <Suspense fallback={<MachineSkeleton />}>
        <RipLab />
      </Suspense>

      <section id="how" aria-labelledby="rp-how" className="mt-20 flex scroll-mt-24 flex-col gap-6">
        <div className="rw-head">
          <span className="rw-kicker">{copy.howKicker}</span>
          <h2 id="rp-how">{copy.howTitle}</h2>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((s, i) => (
            <li key={i} className="rw-card flex flex-col gap-2 p-5">
              <span className="rw-display text-4xl text-[var(--u-glow,#ffcb05)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-extrabold">{s.title}</h3>
              <p className="text-sm font-semibold text-[var(--rw-mute)]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-20 flex w-full max-w-3xl flex-col gap-6">
        <div className="rw-head">
          <span className="rw-kicker">{copy.faqKicker}</span>
          <h2>{copy.faqTitle}</h2>
        </div>
        <div className="flex flex-col gap-2">
          {copy.faq.map((f) => (
            <details key={f.q} className="rw-card group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden className="shrink-0 text-[var(--u-glow,#ffcb05)] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-[var(--rw-mute)]">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-sm font-semibold text-[var(--rw-mute)]">
          {rich(copy.disclaimer, {
            slabz: (
              <a href="https://slabz.com" target="_blank" rel="noopener noreferrer" className="font-black text-white underline decoration-[var(--u-glow,#ffcb05)] underline-offset-4">
                Slabz
              </a>
            ),
          })}
        </p>
      </section>
    </div>
  );
}
