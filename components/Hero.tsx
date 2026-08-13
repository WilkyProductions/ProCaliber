import Image from "next/image";
import { getFirstImage } from "@/lib/images";
import { hero } from "@/data/site-content";

export default function Hero() {
  const heroImage = getFirstImage("hero");

  return (
    <section id="top" className="relative flex min-h-[92vh] min-h-[92svh] items-center overflow-hidden pt-24">
      {heroImage && (
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-base/40" />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
        <p className="mb-4 font-display text-sm font-medium uppercase tracking-[0.3em] text-accent-bright">
          {hero.eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-white text-glow sm:text-5xl md:text-6xl">
          {hero.heading}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-gray sm:text-lg">
          {hero.subheading}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={hero.ctaHref}
            className="rounded-full bg-accent px-7 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(47,143,255,0.35)] transition-transform hover:scale-[1.03] hover:bg-accent/90"
          >
            {hero.ctaLabel}
          </a>
          <a
            href="#services"
            className="rounded-full border border-border px-7 py-3 text-sm font-medium text-gray transition-colors hover:border-accent/50 hover:text-white"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
