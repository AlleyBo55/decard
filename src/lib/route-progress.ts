// Window event fired by src/instrumentation-client.ts when an App Router
// navigation starts. components/RouteProgress.tsx listens for it.
export const ROUTE_START = "decard:route-start";

export interface RouteStartDetail {
  url: string;
}
