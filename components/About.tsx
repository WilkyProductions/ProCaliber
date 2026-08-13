import Image from "next/image";
import { getFirstImage } from "@/lib/images";
import { about } from "@/data/site-content";

export default function About() {
  const aboutImage = getFirstImage("about");

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface">
          {aboutImage ? (
            <Image
              src={aboutImage}
              alt="Pro Caliber Services team at work"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-dim">
              Add an image to /public/images/about
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {about.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {about.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-gray sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
