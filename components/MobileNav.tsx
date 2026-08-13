"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

type NavItem = { label: string; href: string };

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(5, 7, 11, 0.97)" }}
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center text-white"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-medium tracking-wide text-white transition-colors hover:text-accent-bright"
              >
                {item.label}
              </a>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
