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
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(5, 7, 11, 0.97)" }}
          >
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
