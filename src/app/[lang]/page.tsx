import Link from "@/components/LocaleLink";
import { WalletSearch } from "@/components/WalletSearch";
import { HeroCatch } from "@/components/HeroCatch";
import { HeroStats } from "@/components/home/HeroStats";
import { JustListedTicker } from "@/components/home/JustListedTicker";
import { HomeSections } from "@/components/home/HomeSections";
import { RipHighlight } from "@/components/home/RipHighlight";
import { RedeemHighlight } from "@/components/home/RedeemHighlight";
import { GachaHighlight } from "@/components/home/GachaHighlight";
import { HighlightPanel } from "@/components/home/HighlightPanel";
import { DialogBox, MoreLink, SectionHead } from "@/components/ui";
import { BrowseByFranchise } from "@/components/hubs/BrowseByFranchise";
import { isHiddenPage } from "@/lib/hidden-pages";
import { asLocale, localeMeta } from "@/lib/i18n";
import { messagesFor } from "@/lib/i18n/messages";
import { jsonLd } from "@/lib/seo";
import "@/components/home/highlights.css";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLocale((await params).lang);
  const m = messagesFor(lang).home;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: localeMeta(lang).html,
    mainEntity: m.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      {/* hero */}
      <section className="relative grid items-center gap-8 lg:gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] pt-10 sm:pt-16 lg:pt-20">
        <div className="relative z-10">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="kicker">{m.kicker}</span>
            <span className="inline-flex items-center gap-2 font-pixel text-[9px] text-up">
              <span className="live-dot" /> {m.live}
            </span>
          </div>
          <h1 className="h-display mt-6 text-[clamp(2.75rem,5.6vw,4.6rem)]">
            {m.hero.lead && <>{m.hero.lead} </>}
            <span className="text-poke">{m.hero.scan}</span>
            <br />
            <span className="swash">{m.hero.tail}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-ink-soft leading-relaxed">{m.lede}</p>
          <div className="mt-8 max-w-xl">
            <WalletSearch />
          </div>
          <HeroStats />
        </div>
        <HeroCatch />
      </section>

      <JustListedTicker />

      {/* new on Decard: rip, redeem and the live gacha */}
      <section aria-labelledby="new-on-decard" className="mt-20 sm:mt-24 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="kicker">{m.newKicker}</span>
          <h2 id="new-on-decard" className="h-display text-[clamp(1.7rem,3.4vw,2.6rem)]">
            {m.newTitle}
          </h2>
        </div>
        <div className="hl-grid">
          <RipHighlight />
          <RedeemHighlight />
          <GachaHighlight />
        </div>
      </section>

      <div className="mt-24 sm:mt-28">
        <HomeSections />
      </div>

      {/* One landing page per franchise: live prices by grade plus a short guide. */}
      <section className="mt-24 sm:mt-28 flex flex-col gap-6 max-sm:[&_.chip]:min-h-11">
        <SectionHead kicker={m.typeKicker} title={m.typeTitle} sub={m.typeSub} />
        <BrowseByFranchise />
      </section>

      {/* FAQ and the professor's tip. Native <details>, so it works and reads without JavaScript. */}
      <HighlightPanel className="mt-24 sm:mt-28">
        <section
          aria-label={m.faqKicker}
          className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16"
        >
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqLd) }} />
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <SectionHead kicker={m.faqKicker} title={m.faqTitle} />
            <DialogBox className="!p-6 sm:!p-7">
              <p className="dialog-text !text-[12px]">{m.tipTitle}</p>
              <p className="mt-3 text-ink-soft leading-relaxed">{m.tip}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/guide" className="btn btn-red min-h-11">
                  {m.guideBtn}
                </Link>
                <Link href="/scanner?orderBy=deal" className="btn btn-cream min-h-11">
                  {m.dealBtn}
                </Link>
              </div>
            </DialogBox>
          </div>
          <div className="flex flex-col gap-8">
            <div className="dash-divide">
              {m.faq.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-extrabold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="shrink-0 text-xs text-poke transition-transform group-open:rotate-90">
                      ▶
                    </span>
                  </summary>
                  <p className="pb-5 text-ink-soft leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 [&>a]:py-2.5">
              {m.more.filter((item) => !isHiddenPage(item.href)).map((item) => (
                <MoreLink key={item.href} href={item.href}>{item.label}</MoreLink>
              ))}
            </div>
          </div>
        </section>
      </HighlightPanel>
    </>
  );
}
