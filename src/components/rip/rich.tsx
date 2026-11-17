import { Fragment, type ReactNode } from "react";

/** "Sold! {amount} USDC" + { amount: <span/> }: a whole sentence with elements in its slots, so a translation keeps its own word order. */
export function rich(template: string, slots: Record<string, ReactNode>): ReactNode {
  return template.split(/\{(\w+)\}/).map((part, i) => (i % 2 ? <Fragment key={i}>{part in slots ? slots[part] : `{${part}}`}</Fragment> : part));
}
