import type { Metadata } from "next";
import { asLocale, localeMeta, localePath } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { stringsFor } from "@/lib/i18n/strings";
import localFont from "next/font/local";
import Link from "@/components/LocaleLink";
import { Fragment, Suspense, type ReactNode } from "react";
import { GymLab } from "@/components/gym/GymLab";
import { GymSkeleton } from "@/components/gym/GymSkeleton";
import { SITE_URL } from "@/lib/constants";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

// The same display face as /rip (OFL), loaded by this route only.
const lilita = localFont({ src: "../../fonts/LilitaOne.woff2", variable: "--font-lilita", weight: "400", display: "swap" });

const PATH = "/gym";
const TITLE = "Rip League: top pack rippers and Slabz pack odds";
const DESCRIPTION =
  "The leaderboard for ripping Slabz packs: Decard trainers ranked like gym challengers, every Slabz player live, and every pack ranked as a gym by its Epic, Legendary and return odds.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

/** A whole sentence with {name} slots filled by elements, so translators can reorder it. */
function rich(template: string, slots: Record<string, ReactNode>) {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{slots[part]}</Fragment> : part));
}

export default async function GymPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.gym.page;
  const seo = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  const home = t.common.tabs["/"];
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
        { name: copy.crumb, path: localePath(lang, PATH) },
      ]),
    ],
  };
  return (
    <div className={`rw gy ${lilita.variable}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <header className="rw-intro">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="https://slabz.com" target="_blank" rel="noopener" className="rw-powered" aria-label={copy.poweredByLabel}>
            {rich(copy.poweredBy, { logo: <img src="/rip/slabz.webp?v=11a0a005" alt="Slabz" width={30} height={32} /> })}
          </a>
          <nav aria-label={copy.breadcrumb} className="hidden items-center gap-2 text-sm font-bold text-[var(--rw-mute)] sm:flex">
            <Link href="/" className="hover:text-white">
              {home}
            </Link>
            <span aria-hidden>›</span>
            <Link href="/rip" className="hover:text-white">
              {t.common.nav["/rip"].title}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">{copy.crumb}</span>
          </nav>
        </div>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h1 className="rw-h1">{rich(copy.h1, { accent: <span>{copy.h1Accent}</span> })}</h1>
          <p className="hidden max-w-md text-sm font-bold text-[var(--rw-mute)] lg:block">{copy.lede}</p>
        </div>
      </header>

      <Suspense fallback={<GymSkeleton />}>
        <GymLab />
      </Suspense>

      <section id="rules" aria-labelledby="gy-rules" className="mt-20 flex scroll-mt-24 flex-col gap-6">
        <div className="rw-head">
          <span className="rw-kicker">{copy.rulesKicker}</span>
          <h2 id="gy-rules">{copy.rulesTitle}</h2>
        </div>
        {/* Plain text on the server, so search engines and AI assistants read the rules without the app. */}
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.gym.rules.map((r, i) => (
            <li key={r.title} className="rw-card flex flex-col gap-2 p-5">
              <span className="rw-display text-4xl text-[var(--u-glow,#ffcb05)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-extrabold">{r.title}</h3>
              <p className="text-sm font-semibold text-[var(--rw-mute)]">{r.text}</p>
            </li>
          ))}
        </ol>
        <p className="text-sm font-semibold text-[var(--rw-mute)]">
          {rich(copy.rulesNote, {
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
