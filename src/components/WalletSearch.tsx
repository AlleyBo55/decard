"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cardImage } from "@/lib/constants";
import { fmtUsd, gradeShort, shortCardName } from "@/lib/format";
import { BallSearch } from "@/components/icons";
import { GradePill } from "@/components/ui";
import { clsx } from "@/lib/clsx";

interface Suggestion {
  mint: string;
  name: string;
  grade: string | null;
  gradingCompany: string | null;
  category: string | null;
  price: number | null;
  currency: string | null;
}

const ADDRESS = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

/**
 * Smart search. Typing a card name shows live suggestions; Enter opens the
 * highlighted card or the full scanner results. A pasted address opens the
 * wallet. Press "/" anywhere to focus the header search.
 */
export function WalletSearch({
  compact,
  autoFocus,
  onDone,
}: {
  compact?: boolean;
  autoFocus?: boolean;
  onDone?: () => void;
}) {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);

  const query = value.trim();
  const searchable = query.length >= 2 && !ADDRESS.test(query);

  // Debounced typeahead; aborted on every keystroke so stale answers never land.
  useEffect(() => {
    if (!searchable) return;
    const v = query;
    const ctrl = new AbortController();
    const id = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(v)}`, { signal: ctrl.signal });
        const data = await res.json();
        setResults(data.results ?? []);
        setTotal(data.total ?? 0);
        setActive(-1);
        setOpen(true);
      } catch {
        // aborted or offline
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      ctrl.abort();
      window.clearTimeout(id);
    };
  }, [query, searchable]);

  const showList = open && searchable;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // "/" focuses the header search, like most trading terminals.
  useEffect(() => {
    if (!compact) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key !== "/" || t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [compact]);

  function go(path: string) {
    setOpen(false);
    setValue("");
    setResults([]);
    onDone?.();
    router.push(path);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    if (active >= 0 && results[active]) return go(`/card/${results[active].mint}`);
    if (ADDRESS.test(v)) return go(`/wallet/${v}`);
    go(`/scanner?search=${encodeURIComponent(v)}`);
  }

  return (
    <div ref={boxRef} className={clsx("relative", !compact && "w-full")}>
      <form onSubmit={submit} role="search" className="relative flex items-center">
        <BallSearch className="absolute left-3.5 h-5 w-5 text-ink-mute pointer-events-none" />
        <input
          ref={inputRef}
          value={value}
          autoFocus={autoFocus}
          onChange={(e) => {
            setValue(e.target.value);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (!showList || !results.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => (a + 1) % results.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => (a <= 0 ? results.length - 1 : a - 1));
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder={compact ? "Search cards or wallets" : "Search a card, or paste a wallet address"}
          spellCheck={false}
          autoComplete="off"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-label="Search cards or wallets"
          className={clsx(
            "w-full rounded-full bg-cream-hi border-2 border-ink/80 pl-11 text-ink placeholder:text-ink-mute/80 outline-none transition-shadow",
            "focus:border-ink focus:shadow-[0_0_0_4px_rgb(255_203_5_/_0.55)]",
            compact ? "h-10 pr-12 text-sm w-64 lg:w-72" : "h-14 pr-28 text-base",
          )}
        />
        {compact ? (
          <kbd className="absolute right-3 font-pixel text-[9px] text-ink-mute border border-sand rounded px-1.5 py-1">/</kbd>
        ) : (
          <button type="submit" className="absolute right-1.5 btn btn-red !h-11 !px-5">
            {loading ? "..." : "Search"}
          </button>
        )}
      </form>

      {showList && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-50 mt-2 w-full min-w-[320px] paper overflow-hidden animate-pop"
        >
          {results.length === 0 && (
            <p className="px-4 py-3 font-pixel text-[9px] text-ink-mute">{loading ? "Searching..." : "No cards found"}</p>
          )}
          {results.map((r, i) => (
            <button
              key={r.mint}
              type="button"
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                go(`/card/${r.mint}`);
              }}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2 text-left transition-colors",
                i === active ? "bg-pika/30" : "hover:bg-cream-lo",
              )}
            >
              <img
                src={cardImage(r.mint, "front", 128)}
                alt=""
                loading="lazy"
                className="h-11 w-8 rounded object-contain bg-cream-lo shrink-0"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold truncate">{shortCardName(r.name)}</span>
                <span className="block text-[11px] text-ink-mute truncate">{r.name}</span>
              </span>
              <GradePill label={gradeShort(r.gradingCompany, r.grade)} />
              {r.price != null && (
                <span className="text-sm font-extrabold tabular-nums shrink-0">
                  {r.currency === "USDC" ? fmtUsd(r.price) : `${r.price}◎`}
                </span>
              )}
            </button>
          ))}
          {results.length > 0 && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                go(`/scanner?search=${encodeURIComponent(value.trim())}`);
              }}
              className="w-full px-3 py-2.5 text-center text-sm font-extrabold text-azure-deep hover:bg-cream-lo border-t border-sand"
            >
              See all {total.toLocaleString()} results →
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletSearch;
