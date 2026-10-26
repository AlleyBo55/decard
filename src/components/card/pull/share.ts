// Share targets and the one analytics event for the pull receipt. Browser only.

export type ShareMethod = "x" | "telegram" | "reddit" | "discord" | "copy" | "native" | "download";

/** Web intents. Discord has none: a pasted link unfurls the receipt from the page's og:image. */
export function intentLinks(url: string, text: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(text);
  return {
    x: `https://x.com/intent/post?text=${t}&url=${u}`,
    telegram: `https://t.me/share/url?url=${u}&text=${t}`,
    reddit: `https://www.reddit.com/submit?url=${u}&title=${t}`,
  };
}

type Gtag = (command: "event", name: string, params: Record<string, unknown>) => void;

/**
 * GA4 `share_pull`, once per share. The intents can't report back, so X,
 * Telegram and Reddit count when their window opens; the share sheet counts
 * only when it completes. A no-op when analytics isn't loaded.
 */
export function trackShare(method: ShareMethod, mint: string, pack: number | null) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", "share_pull", { method, item_id: mint, pack_price: pack ?? 0 });
}

/** "decard-mega-charizard-x-ex-psa-10.png" */
export function receiptFileName(title: string) {
  const slug = title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  return `decard-${slug || "pull"}.png`;
}
