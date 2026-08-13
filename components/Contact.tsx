import { company, contactIntro } from "@/data/site-content";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 rounded-3xl border border-border bg-surface p-8 sm:p-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
        <div>
          <p className="font-display text-sm font-medium uppercase tracking-[0.3em] text-accent-bright">
            Contact
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {contactIntro.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-gray">
            {contactIntro.body}
          </p>

          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="text-gray-dim">Phone</dt>
              <dd className="mt-1 text-white">{company.phone}</dd>
            </div>
            <div>
              <dt className="text-gray-dim">Email</dt>
              <dd className="mt-1 text-white">{company.email}</dd>
            </div>
            <div>
              <dt className="text-gray-dim">Service Area</dt>
              <dd className="mt-1 text-white">{company.address}</dd>
            </div>
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
