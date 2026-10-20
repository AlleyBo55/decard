"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cardImage } from "@/lib/constants";
import { fmtUsd } from "@/lib/format";
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

export function WalletSearch({ compact }: { compact?: boolean }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  // debounced typeahead
  useEffect(() => {
    const v = value.trim();
    if (v.length < 2 || ADDRESS.test(v)) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/suggest?q=${encodeURIComponent(v)}`);
        const data = await res.json();
        setResults(data.results ?? []);
        setTotal(data.total ?? 0);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [value]);

  // close on outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    setOpen(false);
    if (ADDRESS.test(v)) router.push(`/wallet/${v}`);
    else router.push(`/scanner?search=${encodeURIComponent(v)}`);
  }

  return (
    <div ref={boxRef} className="relative">
      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder={compact ? "Search cards or wallet" : "Search a card name, or paste a wallet"}
          spellCheck={false}
          className={clsx(
            "bg-black/20 border border-white/25 rounded-md px-3 py-2 text-sm outline-none focus:border-dex-yellow text-white placeholder:text-white/50",
            compact ? "w-56" : "w-full sm:w-96",
          )}
        />
        <button
          type="submit"
          className="rounded-md bg-dex-yellow px-3 py-2 text-sm font-semibold text-black hover:brightness-105"
        >
          Go
        </button>
      </form>

      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[320px] rounded-xl border-2 border-line bg-panel shadow-xl overflow-hidden">
          {loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted">Searching</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 text-sm text-muted">No cards found</div>
          )}
          {results.map((r) => (
            <button
              key={r.mint}
              onMouseDown={() => {
                setOpen(false);
                setValue("");
                router.push(`/card/${r.mint}`);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-panel-2"
            >
              <img
                src={cardImage(r.mint, "front", 128)}
                alt=""
                loading="lazy"
                className="h-10 w-7 rounded object-cover bg-panel-2 shrink-0"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-ink truncate">{r.name}</span>
                <span className="text-[11px] text-dex-gold font-mono">
                  {r.gradingCompany} {r.grade}
                  {r.category ? ` · ${r.category}` : ""}
                </span>
              </span>
              {r.price != null && (
                <span className="text-xs font-semibold tabular-nums text-up shrink-0">
                  {r.currency === "USDC" ? fmtUsd(r.price) : `${r.price}◎`}
                </span>
              )}
            </button>
          ))}
          {results.length > 0 && (
            <button
              onMouseDown={() => {
                setOpen(false);
                router.push(`/scanner?search=${encodeURIComponent(value.trim())}`);
              }}
              className="w-full px-3 py-2.5 text-center text-xs text-dex-yellow hover:bg-panel-2 border-t border-line"
            >
              See all {total.toLocaleString()} results
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default WalletSearch;
