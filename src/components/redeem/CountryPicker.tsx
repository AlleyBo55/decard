"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale, useT } from "@/components/LocaleProvider";
import { fmt, plural } from "@/lib/i18n/format";
import type { Country } from "@/lib/redeem/countries";
import { countryByA2, searchCountries } from "@/lib/redeem/names";
import { regionOf } from "@/lib/redeem/rates";
import { COUNTRIES } from "@/lib/redeem/countries";
import { clsx } from "@/lib/clsx";
import { useCountryName } from "./text";

// The keyboard and screen-reader way to the same choice as the globe: an ARIA 1.2 combobox with
// type-ahead over the provider's countries (everyday names, codes and aliases all match).

/** 🇯🇵 from "JP". Systems without flag glyphs show the two letters, which still read. */
export const flagOf = (a2: string) => String.fromCodePoint(...[...a2.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

const QUICK = ["US", "CA", "GB", "DE", "JP", "AU", "SG", "BR"];

export function CountryPicker({ value, onPick }: { value: Country | null; onPick: (c: Country) => void }) {
  const t = useT();
  const { locale } = useLocale();
  const name = useCountryName();
  const s = t.redeem.picker;
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const listId = `${id}-list`;
  // English names always match; other languages add their own (Jepang, 日本).
  const results = useMemo(() => searchCountries(q, locale === "en" ? undefined : name), [q, locale, name]);
  const shown = open ? results : [];
  const activeIdx = Math.min(active, Math.max(0, shown.length - 1));
  const activeOpt = shown[activeIdx];

  useEffect(() => {
    if (!open || !activeOpt) return;
    list.current?.querySelector<HTMLElement>(`[data-a2="${activeOpt.a2}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, activeOpt]);

  const choose = (c: Country) => {
    onPick(c);
    setQ("");
    setOpen(false);
    setActive(0);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive(Math.min(activeIdx + 1, results.length - 1));
        return;
      case "ArrowUp":
        e.preventDefault();
        if (!open) setOpen(true);
        else setActive(Math.max(activeIdx - 1, 0));
        return;
      case "PageDown":
        if (!open) return;
        e.preventDefault();
        setActive(Math.min(activeIdx + 8, results.length - 1));
        return;
      case "PageUp":
        if (!open) return;
        e.preventDefault();
        setActive(Math.max(activeIdx - 8, 0));
        return;
      case "Enter":
        if (open && activeOpt) {
          e.preventDefault();
          choose(activeOpt);
        }
        return;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
        } else if (q) {
          e.preventDefault();
          setQ("");
        }
        return;
      case "Tab":
        setOpen(false);
        return;
    }
  };

  return (
    <div className="rd-combo">
      <label htmlFor={`${id}-input`} className="rd-label">
        {s.label}
      </label>
      <div className="rd-combo-field">
      <div className="rd-combo-box">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden>
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="m13 13 4.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <input
          ref={input}
          id={`${id}-input`}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && activeOpt ? `${id}-${activeOpt.a2}` : undefined}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder={value ? fmt(s.placeholderPicked, { country: name(value) }) : fmt(s.placeholder, { count: COUNTRIES.length })}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKey}
        />
        {q && (
          <button
            type="button"
            className="rd-combo-clear"
            aria-label={s.clear}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQ("");
              input.current?.focus();
            }}
          >
            ×
          </button>
        )}
      </div>
      <ul
        ref={list}
        id={listId}
        role="listbox"
        aria-label={s.list}
        className="rd-combo-list"
        hidden={!open}
        // Keeps focus in the input while a click picks an option.
        onMouseDown={(e) => e.preventDefault()}
      >
        {shown.map((c, i) => (
          <li
            key={c.a2}
            id={`${id}-${c.a2}`}
            data-a2={c.a2}
            role="option"
            aria-selected={value?.a2 === c.a2}
            className={clsx("rd-combo-opt", i === activeIdx && "is-active")}
            onClick={() => choose(c)}
            onMouseMove={() => i !== activeIdx && setActive(i)}
          >
            <span className="rd-flag" aria-hidden>
              {flagOf(c.a2)}
            </span>
            <span className="min-w-0 flex-1 truncate">{name(c)}</span>
            <span className="rd-combo-zone">{t.redeem.regions[regionOf(c)]}</span>
            {value?.a2 === c.a2 && (
              <span className="text-[var(--rd-gold)]" aria-hidden>
                ✓
              </span>
            )}
          </li>
        ))}
        {open && shown.length === 0 && (
          <li className="rd-combo-none" role="option" aria-selected={false} aria-disabled>
            {fmt(s.noMatch, { q })}
          </li>
        )}
      </ul>
      </div>
      <p className="sr-only" aria-live="polite">
        {open ? plural(locale, results.length, s.matches) : ""}
      </p>
      <div className="rd-quick" role="group" aria-label={s.popular}>
        {QUICK.map((a2) => {
          const c = countryByA2(a2);
          if (!c) return null;
          return (
            <button key={a2} type="button" className={clsx("rd-chip", value?.a2 === a2 && "is-on")} aria-pressed={value?.a2 === a2} onClick={() => onPick(c)}>
              <span aria-hidden>{flagOf(a2)}</span> {name(c)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
