import { industries } from "@/data/site-content";

export default function Industries() {
  return (
    <section id="industries" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
        <div>
          <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-accent-bright">
            Who We Serve
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Focused on Water &amp; Wastewater
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray sm:text-lg">
            Our team understands the standards and reliability that municipal
            and industrial water infrastructure demands — and we build to
            meet them.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {industries.map((industry) => (
            <li
              key={industry}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent-bright shadow-[0_0_10px_var(--color-accent-bright)]" />
              <span className="text-sm font-medium text-white">{industry}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
