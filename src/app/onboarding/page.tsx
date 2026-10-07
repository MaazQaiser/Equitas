"use client";

import { FormEvent, useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthAside, AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { writeSession } from "@/lib/session";

const FIELD =
  "mt-1.5 h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px] font-normal normal-case tracking-normal text-ink";

function CreateAccountForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const from = params.get("from");
    const need = params.get("need");
    if (from || need) writeSession({ from: from ?? undefined, need: need ?? undefined });
  }, [params]);

  function continueOn(patch: { name?: string; email?: string }) {
    const from = params.get("from") ?? undefined;
    const need = params.get("need") ?? undefined;
    writeSession({ signedIn: true, from, need, name: patch.name ?? name, email: patch.email ?? email });
    router.push("/onboarding/you");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least eight characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) continueOn({});
  }

  return (
    <>
      <h1 className="max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Create your free account
      </h1>
      <form onSubmit={onSubmit} className="mt-10 flex max-w-[420px] flex-col gap-4" noValidate>
        <p>
          <label htmlFor="signup-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
            Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "signup-name-error" : undefined}
            className={FIELD}
          />
          {errors.name && (
            <span id="signup-name-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
              {errors.name}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="signup-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "signup-email-error" : undefined}
            className={FIELD}
          />
          {errors.email && (
            <span id="signup-email-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
              {errors.email}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="signup-password" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "signup-password-error" : undefined}
            className={FIELD}
          />
          {errors.password && (
            <span id="signup-password-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
              {errors.password}
            </span>
          )}
        </p>
        <div className="pt-2">
          <Button type="submit" variant="primary">
            Create account
          </Button>
        </div>
      </form>
      <p className="mt-8 max-w-[36ch] text-[14px] leading-[1.5] text-muted">Or</p>
      <div className="mt-3 flex max-w-[420px] flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          variant="ghost"
          onClick={() => continueOn({ name: name.trim() || "Google account" })}
        >
          Continue with Google
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => continueOn({ name: name.trim() || "ORCID account" })}
        >
          Continue with ORCID
        </Button>
      </div>
      <p className="mt-8 max-w-[42ch] text-[14px] leading-[1.55] text-muted">
        The Study Section Simulator sample is live. Other modules are labelled previews.
      </p>
    </>
  );
}

export default function OnboardingPage() {
  return (
    <AuthLayout card aside={<AuthAside href="/signin" label="Sign in" />}>
      <Suspense fallback={<p className="text-muted">Loading…</p>}>
        <CreateAccountForm />
      </Suspense>
    </AuthLayout>
  );
}
