"use client";

import { useState, type FormEvent } from "react";

export function ComingCapture({ id = "coming" }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const fieldId = `${id}-email`;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Enter an email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <p className="mt-5 text-[15px] leading-[1.6] text-muted" role="status">
        Thank you. We will use this to decide what to build.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-5 max-w-[420px]" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor={fieldId} className="mb-1.5 block text-[13px] text-ink">
            Email
          </label>
          <input
            id={fieldId}
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (error) setError("");
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className="h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px]"
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-[8px] bg-band px-5 text-[16px] text-band-ink ring-1 ring-band-line hover:bg-band-2"
        >
          Send
        </button>
      </div>
      {error && (
        <p id={`${fieldId}-error`} className="mt-1.5 text-[13px] text-ink" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
