"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
const InView = createContext({ seen: false, visible: false });
/** Whether the surrounding HighlightPanel has come near the screen yet, and whether it is there now. */
export const useHighlightInView = () => useContext(InView);
/**
 * The frame of a home highlight. Its CSS loops pause while it is off screen ([data-offscreen] in
 * highlights.css), so the busiest page doesn't keep animating what nobody sees. The children
 * stay server-rendered; only this observer ships to the browser.
 */
export function HighlightPanel({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const value = useMemo(() => ({ seen, visible: visible === true }), [seen, visible]);
  return (
    <div ref={ref} className={className} data-offscreen={visible === false ? "" : undefined}>
      <InView.Provider value={value}>{children}</InView.Provider>
    </div>
  );
}
