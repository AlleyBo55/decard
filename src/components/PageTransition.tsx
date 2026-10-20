"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

// Cheap, GPU-only transition (opacity + small translate) keyed on the path.
// No layout thrash, respects reduced-motion via the browser's own handling of
// transform animations.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
