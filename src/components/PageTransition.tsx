"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";

// GPU-only route transition (opacity + small rise), keyed on the path so
// filter changes inside a page don't replay it.
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
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
