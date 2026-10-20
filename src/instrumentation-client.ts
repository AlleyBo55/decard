import { ROUTE_START, type RouteStartDetail } from "@/lib/route-progress";

// Next calls this at the start of every App Router navigation: <Link>,
// router.push/replace and back/forward. RouteProgress shows the bar and
// finishes it once the new URL commits.
export function onRouterTransitionStart(url: string) {
  window.dispatchEvent(new CustomEvent<RouteStartDetail>(ROUTE_START, { detail: { url } }));
}
