import { services } from "@/data/site-content";

export default function Services() {
  return (
    <section id="services" className="border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-accent-bright">
            What We Do
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Full-Service Industrial Electrical &amp; Controls
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/40"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <h3 className="font-display text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
