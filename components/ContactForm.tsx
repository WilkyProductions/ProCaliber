"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/30 bg-accent-dim p-8 text-center">
        <p className="font-display text-lg font-semibold text-white">
          Message sent
        </p>
        <p className="mt-2 text-sm text-gray">
          Thanks for reaching out — we&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-white placeholder:text-gray-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-white placeholder:text-gray-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray">
          Phone <span className="text-gray-dim">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-white placeholder:text-gray-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="(000) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-white placeholder:text-gray-dim focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Tell us about your project..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-accent px-7 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(47,143,255,0.35)] transition-transform hover:scale-[1.01] hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
