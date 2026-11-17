import { notFound } from "next/navigation";

// Any path no route matches lands here, so it gets the localized 404 (../not-found.tsx)
// inside the site layout instead of Next's bare English page. Still a 404 status.
export default function Missing() {
  notFound();
}
