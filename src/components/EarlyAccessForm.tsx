"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";

const TYPES = [
  { value: "researcher", label: "Individual researcher" },
  { value: "institution", label: "Institutional representative" },
] as const;

const field =
  "mt-1.5 h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px] font-normal normal-case tracking-normal text-ink";

export function EarlyAccessForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!userType) next.userType = "Choose how you would use EQUITAS.";
    if (!consent) next.consent = "Confirm you agree to be contacted about early access.";
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  if (done) {
    return (
      <div role="status" className="mt-8 rounded-[16px] border border-line bg-surface p-6 shadow-card">
        <p className="text-[20px] font-light tracking-[-0.02em]">You are on the early access list.</p>
        <p className="mt-2 text-[15px] leading-[1.55] text-muted">
          We have your details. We will write when a place opens. Nothing is emailed from this page yet.
        </p>
        {userType === "institution" ? (
          <p className="mt-4 text-[15px]">
            For a department demo,{" "}
            <a href="/institutions/demo" className="text-gold-text underline underline-offset-2">
              request a named contact
            </a>
            .
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-[560px] grid-cols-1 gap-4" noValidate>
      <p>
        <label htmlFor="ea-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Name
        </label>
        <input
          id="ea-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Amara Okafor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "ea-name-error" : undefined}
          className={field}
        />
        {errors.name ? (
          <span id="ea-name-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.name}
          </span>
        ) : null}
      </p>
      <p>
        <label htmlFor="ea-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Email
        </label>
        <input
          id="ea-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@university.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "ea-email-error" : undefined}
          className={field}
        />
        {errors.email ? (
          <span id="ea-email-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.email}
          </span>
        ) : null}
      </p>
      <fieldset>
        <legend className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">I am</legend>
        <div className="mt-2 space-y-2">
          {TYPES.map((t) => (
            <label key={t.value} className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px]">
              <input
                type="radio"
                name="userType"
                value={t.value}
                checked={userType === t.value}
                onChange={() => setUserType(t.value)}
                className="h-4 w-4 accent-[#B39952]"
              />
              {t.label}
            </label>
          ))}
        </div>
        {errors.userType ? (
          <span className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.userType}
          </span>
        ) : null}
      </fieldset>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[15px]">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#B39952]"
          aria-invalid={errors.consent ? true : undefined}
          aria-describedby={errors.consent ? "ea-consent-error" : undefined}
        />
        <span>I agree to be contacted about EQUITAS early access. We will not sell your email.</span>
      </label>
      {errors.consent ? (
        <span id="ea-consent-error" className="text-[13px] text-ink" role="alert">
          {errors.consent}
        </span>
      ) : null}
      <div>
        <Button type="submit" variant="primary">
          Join early access
        </Button>
      </div>
    </form>
  );
}
