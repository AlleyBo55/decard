"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copies the contract address. Where the Clipboard API is missing or blocked,
 * it selects the address text instead so Ctrl+C / long-press still works.
 */
export function CopyAddress({ value, targetId }: { value: string; targetId: string }) {
  const [state, setState] = useState<"idle" | "copied" | "select">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      const el = document.getElementById(targetId);
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(range);
      }
      setState("select");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2_000);
  }

  return (
    <button type="button" onClick={copy} className="btn btn-cream tk-copy" aria-label="Copy the CARDS contract address">
      <span aria-live="polite">{state === "copied" ? "Copied ✓" : state === "select" ? "Selected" : "Copy"}</span>
    </button>
  );
}
