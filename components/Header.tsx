import Image from "next/image";
import { getFirstImage } from "@/lib/images";
import { company, nav } from "@/data/site-content";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  const logoSrc = getFirstImage("logo");

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-base/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt={company.name}
              width={220}
              height={64}
              priority
              className="logo-glow h-14 w-auto sm:h-16"
            />
          ) : (
            <span className="font-display text-lg font-semibold tracking-wide text-white sm:text-xl">
              {company.name.toUpperCase()}
            </span>
          )}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray transition-colors hover:text-accent-bright"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-accent/40 bg-accent-dim px-5 py-2 text-sm font-medium text-white transition-colors hover:border-accent hover:bg-accent/20"
          >
            Get a Quote
          </a>
        </nav>

        <MobileNav items={nav} />
      </div>
    </header>
  );
}
