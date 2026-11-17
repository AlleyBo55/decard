"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Chevron, Close as CloseIcon } from "@/components/icons";
import { useLocale } from "@/components/LocaleProvider";
import { LOCALES, localeMeta, localizeHref, stripLangSearch, stripLocale, type Locale } from "@/lib/i18n";
import { fmt } from "@/lib/i18n/format";
import { clsx } from "@/lib/clsx";

// The language picker: a pill in the header that opens a "type chart" of every language. One native
// <dialog> on every screen: a bottom sheet on phones, a card under the header from tablets up. Every
// choice is a real <a hreflang> to the same page in that language, so crawlers can follow them too.

/** Each language's stamp colour, from the Pokémon type palette (lib/poke-types.ts family). */
const STAMP: Record<Locale, { bg: string; fg: string }> = {
  en: { bg: "#6390F0", fg: "#29263D" },
  ja: { bg: "#C22E28", fg: "#FFFFFF" },
  id: { bg: "#7AC74C", fg: "#29263D" },
  ms: { bg: "#F7D02C", fg: "#29263D" },
  th: { bg: "#F95587", fg: "#29263D" },
  vi: { bg: "#A6B91A", fg: "#29263D" },
  ko: { bg: "#D685AD", fg: "#29263D" },
  ru: { bg: "#96D9D6", fg: "#29263D" },
  zh: { bg: "#6F35FC", fg: "#FFFFFF" },
  es: { bg: "#E2BF65", fg: "#29263D" },
  fr: { bg: "#A98FF3", fg: "#29263D" },
  it: { bg: "#B6A136", fg: "#29263D" },
  nb: { bg: "#B7B7CE", fg: "#29263D" },
  de: { bg: "#705746", fg: "#FFFFFF" },
  nl: { bg: "#EE8130", fg: "#29263D" },
};

/** The same page in another language. English is unprefixed; `?lang=en` makes the proxy remember it. */
function choiceHref(code: Locale, current: string) {
  const path = current.startsWith("/") ? current : `/${current}`;
  if (code !== "en") return localizeHref(code, path);
  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  const before = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const queryAt = before.indexOf("?");
  const params = new URLSearchParams(queryAt >= 0 ? before.slice(queryAt + 1) : "");
  params.set("lang", "en");
  const base = queryAt >= 0 ? before.slice(0, queryAt) : before;
  return `${base}?${params.toString()}${hash}`;
}

/** A sub-label only when it adds something: "Japanese" under 日本語, nothing under "English". */
function subLabel(native: string, name: string | undefined) {
  if (!name) return null;
  const a = native.toLowerCase();
  const b = name.toLowerCase();
  return a.includes(b) || b.includes(a) ? null : name;
}

function Globe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
    </svg>
  );
}

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const pathname = usePathname() || "/";
  const { locale, t, names } = useLocale();
  const copy = t.common.switcher;
  const uid = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  // The query and hash join the links once the picker opens: the server render has neither.
  const [tail, setTail] = useState("");

  const bare = stripLocale(pathname);
  const current = `${bare}${tail}`;
  const meta = localeMeta(locale);
  const uiTag = meta.html;

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      d.querySelector<HTMLElement>('[aria-current="true"]')?.focus();
    } else if (!open && d.open) d.close();
  }, [open]);

  const show = () => {
    const kept = stripLangSearch(new URLSearchParams(window.location.search)).toString();
    setTail(`${kept ? `?${kept}` : ""}${window.location.hash}`);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${uid}-langs`}
        className={clsx("lang-pill", dark && "is-dark")}
      >
        <Globe className="lang-pill-globe" />
        <span className="lang-pill-code" aria-hidden>
          {meta.short}
        </span>
        <Chevron className="lang-pill-caret" />
        <span className="sr-only">{fmt(copy.button, { name: meta.native })}</span>
      </button>

      <dialog
        ref={dialogRef}
        id={`${uid}-langs`}
        aria-labelledby={`${uid}-langs-title`}
        className={clsx("lang-sheet", dark && "is-dark")}
        onClose={() => setOpen(false)}
        // A press on the backdrop lands on the <dialog> itself.
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      >
        <div className="lang-body">
          <div className="lang-grab" aria-hidden />
          <div className="lang-head">
            <span className="lang-head-ball pokeball" aria-hidden style={{ ["--s" as string]: "120px" }} />
            <div className="min-w-0">
              <p className="lang-kicker">{copy.kicker}</p>
              <h2 id={`${uid}-langs-title`} className="lang-title">
                {copy.title}
              </h2>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="lang-close" aria-label={copy.close}>
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <ul className="lang-grid">
            {LOCALES.map((item, i) => {
              const here = item.code === locale;
              const sub = subLabel(item.native, names[item.code]);
              return (
                <li key={item.code} style={{ ["--i" as string]: i }}>
                  <a
                    href={choiceHref(item.code, current)}
                    hrefLang={item.hreflang}
                    lang={item.html}
                    aria-current={here ? "true" : undefined}
                    className="lang-tile"
                    style={{ ["--c" as string]: STAMP[item.code].bg, ["--cf" as string]: STAMP[item.code].fg }}
                  >
                    <span className="lang-stamp" aria-hidden>
                      {item.short}
                    </span>
                    <span className="lang-text">
                      <span className="lang-native">{item.native}</span>
                      {sub && (
                        <span className="lang-sub" lang={uiTag}>
                          {sub}
                        </span>
                      )}
                      {here && (
                        <span className="lang-here" lang={uiTag}>
                          {copy.current}
                        </span>
                      )}
                    </span>
                    <span className="lang-hello" aria-hidden>
                      {item.hello}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="lang-hint">{copy.hint}</p>
        </div>
      </dialog>
    </>
  );
}
