"use client";

import Link from "@/components/LocaleLink";
import { useLocale } from "@/components/LocaleProvider";
import { DialogBox } from "@/components/ui";

export default function NotFound() {
  const { notFound } = useLocale().t.common;
  return (
    <section className="min-h-[60vh] grid place-items-center pt-10">
      <div className="flex flex-col items-center gap-8 text-center">
        <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "96px" }} />
        <DialogBox className="max-w-md">
          <p className="dialog-text">{notFound.text}</p>
        </DialogBox>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-red">
            {notFound.home}
          </Link>
          <Link href="/scanner" className="btn btn-cream">
            {notFound.scanner}
          </Link>
        </div>
      </div>
    </section>
  );
}
