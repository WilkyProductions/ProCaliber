import Image from "next/image";
import { getAllImages } from "@/lib/images";

export default function Gallery() {
  const images = getAllImages("gallery");

  return (
    <section id="gallery" className="border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-accent-bright">
            Our Work
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Panels &amp; Installations in the Field
          </h2>
        </div>

        {images.length ? (
          <div className="mt-14 grid auto-rows-[280px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image, i) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${
                  i % 5 === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-14 rounded-2xl border border-dashed border-border p-12 text-center text-sm text-gray-dim">
            Drop project photos into /public/images/gallery to populate this
            section automatically.
          </div>
        )}
      </div>
    </section>
  );
}
