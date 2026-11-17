"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LocaleProvider";

const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** ↑↑↓↓←→←→BA flips the whole site into original Game Boy (DMG) green. */
export function Konami() {
  const t = useT();
  const [toast, setToast] = useState<"on" | "off" | null>(null);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
      if (pos === CODE.length) {
        pos = 0;
        const root = document.documentElement;
        const on = root.dataset.theme !== "dmg";
        if (on) root.dataset.theme = "dmg";
        else delete root.dataset.theme;
        setToast(on ? "on" : "off");
        window.setTimeout(() => setToast(null), 2600);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!toast) return null;
  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 dialog animate-pop" role="status">
      <p className="dialog-text whitespace-nowrap">{t.ui.konami[toast]}</p>
    </div>
  );
}
