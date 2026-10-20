import Link from "next/link";
import { DialogBox } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center pt-10">
      <div className="flex flex-col items-center gap-8 text-center">
        <span className="pokeball pokeball-wobble" style={{ ["--s" as string]: "96px" }} />
        <DialogBox className="max-w-md">
          <p className="dialog-text">A wild 404 appeared! This page isn&apos;t in the Pokédex.</p>
        </DialogBox>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-red">
            Run home
          </Link>
          <Link href="/scanner" className="btn btn-cream">
            Open the scanner
          </Link>
        </div>
      </div>
    </section>
  );
}
