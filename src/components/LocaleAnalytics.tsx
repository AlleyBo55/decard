"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Gtag = (command: string, name: string, params?: Record<string, unknown>) => void;

/**
 * One extra GA4 event per page, not a second page_view. The path already says
 * which language URL was opened (`/ja/...`). This adds a language field so a
 * report can group those visits without parsing the path.
 */
export function LocaleAnalytics({ locale }: { locale: string }) {
  const pathname = usePathname() || "/";

  useEffect(() => {
    let tries = 0;
    const send = () => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (typeof gtag !== "function") return false;
      gtag("set", "user_properties", { site_language: locale });
      gtag("event", "locale_page", {
        language: locale,
        page_path: pathname,
        page_location: window.location.href,
      });
      return true;
    };
    if (send()) return;
    const timer = window.setInterval(() => {
      tries += 1;
      if (send() || tries > 10) window.clearInterval(timer);
    }, 300);
    return () => window.clearInterval(timer);
  }, [locale, pathname]);

  return null;
}
