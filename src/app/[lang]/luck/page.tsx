import type { Metadata } from "next";
import { asLocale, localeMeta, localePath } from "@/lib/i18n";
import { pageSeo } from "@/lib/i18n/copy";
import { stringsFor } from "@/lib/i18n/strings";
import Link from "@/components/LocaleLink";
import { LiveGacha } from "@/components/gacha/LiveGacha";
import { rich } from "@/components/gacha/rich";
import { LuckAnalyzer } from "@/components/luck/LuckAnalyzer";
import { Kicker } from "@/components/ui";
import { SITE_URL } from "@/lib/constants";
import { parsePackMemo, parseWalletAddress } from "@/lib/luck";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbLd, jsonLd, pageMetadata } from "@/lib/seo";

const PATH = "/luck";
const TITLE = "Gacha pull luck analyzer";
const DESCRIPTION =
  "Score every verified Collector Crypt gacha pull in a wallet, or a single pull, against the cards and tier odds available when it was awarded.";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = asLocale((await params).lang);
  const copy = pageSeo(lang, PATH, { title: TITLE, description: DESCRIPTION });
  return pageMetadata({ title: copy.title, description: copy.description, path: PATH, lang });
}

const firstParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export default async function LuckPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ memo?: string | string[]; wallet?: string | string[] }>;
}) {
  const lang = asLocale((await params).lang);
  const t = stringsFor(lang);
  const copy = t.luck.page;
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
        isAccessibleForFree: true,
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

  const query = await searchParams;
  // A memo wins when both are present.
  const initialInput = (firstParam(query.memo) || firstParam(query.wallet)).slice(0, 500);
  const key = parsePackMemo(initialInput) ?? parseWalletAddress(initialInput) ?? "";

  return (
    <section className="pt-10 flex flex-col gap-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structured) }} />
      <nav aria-label={copy.breadcrumb} className="flex items-center gap-2 text-sm font-bold text-ink-mute">
        <Link href="/" className="hover:text-poke-deep">
          {home}
        </Link>
        <span aria-hidden>›</span>
        <span className="text-ink">{copy.crumb}</span>
      </nav>
      <header className="flex flex-col gap-4">
        <Kicker>{copy.kicker}</Kicker>
        <h1 className="h-display text-[clamp(2.4rem,5vw,3.8rem)]">
          {rich(copy.h1, { accent: <span className="text-poke">{copy.h1Accent}</span> })}
        </h1>
        <p className="text-lg text-ink-soft max-w-2xl">{copy.lede}</p>
        <nav aria-label={copy.jumpLabel} className="flex flex-wrap gap-2">
          {[
            ["#live", copy.jump.live],
            ["#hall-of-fame", copy.jump.hallOfFame],
            ["#odds", copy.jump.odds],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-cream-hi px-4 text-sm font-extrabold shadow-[0_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
            >
              {label} <span aria-hidden className="text-poke">↓</span>
            </a>
          ))}
        </nav>
        <p className="text-sm text-ink-mute max-w-2xl">{copy.note}</p>
      </header>
      <LuckAnalyzer key={key} initialInput={initialInput} />
      {/* scroll-mt adds to the root's scroll-padding, so the sticky header never covers #live. */}
      <section id="live" aria-label={copy.liveLabel} className="mt-10 scroll-mt-6">
        <LiveGacha />
      </section>
    </section>
  );
}
