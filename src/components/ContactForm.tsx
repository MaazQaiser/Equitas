"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

const field =
  "mt-1.5 w-full rounded-[8px] border border-line-2 bg-surface px-3 py-2 text-[15px] font-normal normal-case tracking-normal text-ink";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!message.trim()) next.message = "Write a short message.";
    if (!consent) next.consent = "Confirm you agree to be contacted.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="rounded-[16px] border border-line bg-surface p-6 shadow-card sm:p-8">
        <p className="text-[20px] font-light tracking-[-0.02em]">Message received.</p>
        <p className="mt-2 text-[15px] leading-[1.55] text-muted">
          Thank you. This form does not send email yet. A named contact will reply when that path is live. For a department
          demo, use the institutional form.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <p>
        <label htmlFor="contact-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Amara Okafor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={`${field} h-11`}
        />
        {errors.name ? (
          <span id="contact-name-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.name}
          </span>
        ) : null}
      </p>
      <p>
        <label htmlFor="contact-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={`${field} h-11`}
        />
        {errors.email ? (
          <span id="contact-email-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.email}
          </span>
        ) : null}
      </p>
      <p>
        <label htmlFor="contact-message" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="What do you need help with?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={field}
        />
        {errors.message ? (
          <span id="contact-message-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.message}
          </span>
        ) : null}
      </p>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[15px]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#B39952]"
          aria-invalid={errors.consent ? true : undefined}
        />
        <span>I agree to be contacted about this message.</span>
      </label>
      {errors.consent ? (
        <span className="text-[13px] text-ink" role="alert">
          {errors.consent}
        </span>
      ) : null}
      <div>
        <Button type="submit" variant="primary">
          Send message
        </Button>
      </div>
    </form>
  );
}
