"use client";
import { useEffect, useRef } from "react";
import { clsx } from "@/lib/clsx";

/**
 * Native <dialog> as a modal: the browser traps focus, closes on Escape and inerts the page.
 * `dismissible: false` keeps Escape from closing it while a payment is in flight. `bare` drops
 * the centred card styling, for full-screen scenes.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  dismissible = true,
  bare = false,
  className,
  style,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  dismissible?: boolean;
  bare?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      className={clsx(!bare && "rp-stage", className)}
      style={style}
      onCancel={(e) => {
        e.preventDefault();
        if (dismissible) onClose();
      }}
      onClick={(e) => {
        // A click on the backdrop lands on the <dialog> itself.
        if (dismissible && !bare && e.target === e.currentTarget) onClose();
      }}
    >
      {open && children}
    </dialog>
  );
}
