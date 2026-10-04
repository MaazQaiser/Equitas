"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

const SIZES = ["Under 50", "50 to 200", "200 to 500", "More than 500"];

export function DemoForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [size, setSize] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!role.trim()) next.role = "Enter your role.";
    if (!institution.trim()) next.institution = "Enter your institution.";
    if (!email.trim()) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (!size) next.size = "Choose an approximate faculty size.";
    setErrors(next);
    if (Object.keys(next).length === 0) router.push("/institutions/demo/confirmation");
  }

  const field =
    "mt-1.5 h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px] font-normal normal-case tracking-normal text-ink";

  return (
    <form onSubmit={onSubmit} className="mt-8 grid max-w-[640px] grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
      <p>
        <label htmlFor="demo-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Name
        </label>
        <input
          id="demo-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "demo-name-error" : undefined}
          className={field}
        />
        {errors.name && (
          <span id="demo-name-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.name}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="demo-role" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Role
        </label>
        <input
          id="demo-role"
          name="role"
          type="text"
          autoComplete="organization-title"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          aria-invalid={errors.role ? true : undefined}
          aria-describedby={errors.role ? "demo-role-error" : undefined}
          className={field}
        />
        {errors.role && (
          <span id="demo-role-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.role}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="demo-institution" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Institution
        </label>
        <input
          id="demo-institution"
          name="institution"
          type="text"
          autoComplete="organization"
          value={institution}
          onChange={(event) => setInstitution(event.target.value)}
          aria-invalid={errors.institution ? true : undefined}
          aria-describedby={errors.institution ? "demo-institution-error" : undefined}
          className={field}
        />
        {errors.institution && (
          <span id="demo-institution-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.institution}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="demo-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Email
        </label>
        <input
          id="demo-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "demo-email-error" : undefined}
          className={field}
        />
        {errors.email && (
          <span id="demo-email-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.email}
          </span>
        )}
      </p>
      <p className="sm:col-span-2">
        <label htmlFor="demo-size" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
          Approximate faculty size
        </label>
        <select
          id="demo-size"
          name="size"
          value={size}
          onChange={(event) => setSize(event.target.value)}
          aria-invalid={errors.size ? true : undefined}
          aria-describedby={errors.size ? "demo-size-error" : undefined}
          className={field}
        >
          <option value="">Choose one</option>
          {SIZES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors.size && (
          <span id="demo-size-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
            {errors.size}
          </span>
        )}
      </p>
      <div className="sm:col-span-2">
        <Button type="submit" variant="primary">
          Request a demo
        </Button>
      </div>
    </form>
  );
}
