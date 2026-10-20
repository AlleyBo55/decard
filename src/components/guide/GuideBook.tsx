"use client";

import { useMemo, useState } from "react";
import type { GuideSection } from "@/lib/guide";
import { TypeChip } from "@/components/ui";

/** Pokédex-style guide: numbered entries, sticky index and live search. */
export function GuideBook({ sections }: { sections: GuideSection[] }) {
  const [q, setQ] = useState("");

  const numbered = useMemo(() => {
    let n = 0;
    return sections.map((s) => ({ ...s, terms: s.terms.map((t) => ({ ...t, no: ++n })) }));
  }, [sections]);

  const needle = q.trim().toLowerCase();
  const visible = numbered
    .map((s) => ({
      ...s,
      terms: s.terms.filter((t) => !needle || `${t.term} ${t.short} ${t.body}`.toLowerCase().includes(needle)),
    }))
    .filter((s) => s.terms.length);

  return (
    <div className="grid gap-12 lg:grid-cols-[260px_1fr] items-start">
      <aside className="lg:sticky lg:top-24 flex flex-col gap-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the guide"
          aria-label="Search the guide"
          className="h-11 rounded-full bg-cream-hi border-2 border-sand px-4 outline-none focus:border-ink"
        />
        <nav aria-label="Guide index" className="hidden lg:flex flex-col gap-4 max-h-[70vh] overflow-y-auto thin-scroll pr-2">
          {numbered.map((s) => (
            <div key={s.id} className="flex flex-col gap-1.5">
              <a href={`#${s.id}`} className="font-extrabold hover:text-poke-deep">
                {s.title}
              </a>
              {s.terms.map((t) => (
                <a
                  key={t.no}
                  href={`#term-${t.no}`}
                  className="menu-item ml-4 text-sm text-ink-mute hover:text-ink flex gap-2"
                >
                  <span className="font-pixel text-[8px] pt-1">#{String(t.no).padStart(3, "0")}</span>
                  {t.term}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col gap-16 min-w-0">
        {visible.length === 0 && <p className="text-ink-mute">No entries match &ldquo;{q}&rdquo;.</p>}
        {visible.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <TypeChip category={s.category} label={s.title} solid />
            </div>
            <div className="dash-divide">
              {s.terms.map((t) => (
                <article key={t.no} id={`term-${t.no}`} className="scroll-mt-28 py-7 grid sm:grid-cols-[88px_1fr] gap-x-6 gap-y-2">
                  <span className="font-pixel text-[11px] text-ink-mute pt-2">#{String(t.no).padStart(3, "0")}</span>
                  <div className="flex flex-col gap-2 max-w-2xl">
                    <h3 className="h-display text-2xl sm:text-3xl">{t.term}</h3>
                    <p className="font-extrabold text-poke-deep">{t.short}</p>
                    <p className="text-ink-soft leading-relaxed">{t.body}</p>
                    {t.tip && (
                      <p className="mt-1 text-sm text-ink-soft bg-pika/25 border-l-4 border-pika-deep rounded-r-lg px-3 py-2">
                        {t.tip}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
