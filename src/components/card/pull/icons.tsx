// Share-target glyphs, 24px grid, currentColor.

type P = { className?: string };

export function XLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function TelegramLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M2.6 11.2 19.9 4.5c.8-.3 1.5.2 1.2 1.4l-2.9 13.8c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L6.7 13.9l-4.4-1.4c-1-.3-1-1 .3-1.3z" />
    </svg>
  );
}

/** Reddit's alien, simplified. */
export function RedditLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <ellipse cx="12" cy="14.6" rx="7.6" ry="5.4" />
      <circle cx="4.9" cy="11.6" r="1.9" />
      <circle cx="19.1" cy="11.6" r="1.9" />
      <circle cx="17.2" cy="4.6" r="1.6" />
      <path d="M12 9.4 13.3 3.9l3.9.9" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9.2" cy="13.7" r="1.25" fill="var(--pr-ico-bg, #fff)" />
      <circle cx="14.8" cy="13.7" r="1.25" fill="var(--pr-ico-bg, #fff)" />
      <path d="M9 16.8c1.8 1.2 4.2 1.2 6 0" fill="none" stroke="var(--pr-ico-bg, #fff)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function DiscordLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M19.3 5.3A17 17 0 0 0 15 4l-.5 1.1a15.6 15.6 0 0 0-5 0L9 4a17 17 0 0 0-4.3 1.3C2 9.4 1.3 13.4 1.6 17.3A17.2 17.2 0 0 0 6.9 20l1.1-1.8c-.6-.2-1.2-.5-1.8-.9l.4-.3a12.2 12.2 0 0 0 10.8 0l.4.3c-.6.4-1.2.7-1.8.9l1.1 1.8a17.1 17.1 0 0 0 5.3-2.7c.4-4.5-.7-8.5-3.1-12zM8.7 14.9c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2zm6.6 0c-1 0-1.9-1-1.9-2.2s.8-2.2 1.9-2.2 1.9 1 1.9 2.2-.8 2.2-1.9 2.2z" />
    </svg>
  );
}

function Stroke({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function LinkIcon({ className }: P) {
  return (
    <Stroke className={className}>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.4 1.4" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.4-1.4" />
    </Stroke>
  );
}

export function DownloadIcon({ className }: P) {
  return (
    <Stroke className={className}>
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </Stroke>
  );
}

export function ShareIcon({ className }: P) {
  return (
    <Stroke className={className}>
      <path d="M12 3v12M8 7l4-4 4 4M7 11H5v10h14V11h-2" />
    </Stroke>
  );
}
