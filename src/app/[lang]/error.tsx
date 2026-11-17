"use client";

import Link from "@/components/LocaleLink";
import { useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { DialogBox } from "@/components/ui";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const copy = useLocale().t.common.error;
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] grid place-items-center pt-10">
      <div className="flex flex-col items-center gap-8 text-center">
        <span className="pokeball" style={{ ["--s" as string]: "84px", rotate: "160deg" }} />
        <DialogBox className="max-w-md">
          <p className="dialog-text">{copy.text}</p>
        </DialogBox>
        <div className="flex flex-wrap justify-center gap-3">
          <button type="button" onClick={reset} className="btn btn-red">
            {copy.retry}
          </button>
          <Link href="/" className="btn btn-cream">
            {copy.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
