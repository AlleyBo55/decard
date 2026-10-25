import type { GachaTier } from "@/lib/types";

// Display helpers shared by the single-pull result (LuckAnalyzer) and the wallet view (WalletLuck).

export type ShareState = "idle" | "shared" | "copied" | "failed";

export const TIER_STYLE: Record<GachaTier, string> = {
  common: "bg-cream-lo text-ink-soft border-sand-dark",
  uncommon: "bg-up/12 text-up border-up/30",
  rare: "bg-azure/12 text-azure-deep border-azure/30",
  epic: "bg-poke/10 text-poke-deep border-poke/30",
};

export function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function scoreOutOf100(value: number) {
  return (value * 100).toFixed(1).replace(/\.0$/, "");
}

async function copyShareUrl(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Secure-context or permission failures fall through to the local copy method.
    }
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.readOnly = true;
  field.style.position = "fixed";
  field.style.opacity = "0";
  try {
    document.body.appendChild(field);
    field.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    field.remove();
  }
}

/** Web Share where the browser offers it, else copy the URL. Null when the user closed the share sheet. */
export async function shareOrCopy(data: { title: string; text: string; url: string }): Promise<ShareState | null> {
  if (typeof navigator.share === "function") {
    try {
      if (!navigator.canShare || navigator.canShare(data)) {
        await navigator.share(data);
        return "shared";
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return null;
    }
  }

  return (await copyShareUrl(data.url)) ? "copied" : "failed";
}
