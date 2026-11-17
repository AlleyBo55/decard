"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

// GPU-only route transition (opacity + small rise, .page-enter in globals.css), keyed on the path
// so filter changes inside a page don't replay it. The page a visit lands on skips it, so its
// server HTML paints at once. Plain CSS: the layout ships no animation library to every page.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [landing, setLanding] = useState<string | null>(pathname);
  // Forget the landing path on the first navigation, so going back to it animates too.
  if (landing !== null && pathname !== landing) setLanding(null);
  if (pathname === landing) return <div>{children}</div>;
  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
