import { Fragment, type ReactNode } from "react";

/**
 * "Floor card: {card} at {price}" + { card: <Link/> }: fills placeholders with elements, so a
 * translated sentence keeps its own word order. Unknown placeholders stay as written.
 */
export function rich(template: string, parts: Record<string, ReactNode>): ReactNode {
  return template
    .split(/\{(\w+)\}/g)
    .map((piece, i) => (i % 2 === 0 ? piece : <Fragment key={i}>{piece in parts ? parts[piece] : `{${piece}}`}</Fragment>));
}
