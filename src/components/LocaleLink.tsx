"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizeHref } from "@/lib/i18n";
import { useLocale } from "@/components/LocaleProvider";

type Props = ComponentProps<typeof NextLink>;

/** Same as next/link, but keeps the current language prefix on in-app hrefs. */
export function Link({ href, ...rest }: Props) {
  const { locale } = useLocale();
  const localized = typeof href === "string" ? localizeHref(locale, href) : href;
  return <NextLink href={localized} {...rest} />;
}

export default Link;
