// Tiny classnames joiner. Keeps the bundle lean — no dependency.
export function clsx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
