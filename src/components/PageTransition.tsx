"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

// GPU-only route transition (opacity + small rise), keyed on the path so
// filter changes inside a page don't replay it. The page a visit lands on
// skips it: its server HTML shipped at opacity 0 and stayed blank until hydration.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [landing, setLanding] = useState<string | null>(pathname);
  // Forget the landing path on the first navigation, so going back to it animates too.
  if (landing !== null && pathname !== landing) setLanding(null);
  if (pathname === landing) return <div>{children}</div>;
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
