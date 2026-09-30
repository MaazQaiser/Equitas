"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthAside, AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { writeSession } from "@/lib/session";

const FIELD =
  "mt-1.5 h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px] font-normal normal-case tracking-normal text-ink";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function continueOn() {
    writeSession({ signedIn: true, email: email.trim() });
    router.push("/app");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least eight characters.";
    setErrors(next);
    if (Object.keys(next).length === 0) continueOn();
  }

  return (
    <AuthLayout card aside={<AuthAside href="/onboarding" label="Create account" />}>
      <h1 className="max-w-[12ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Sign in
      </h1>
      <form onSubmit={onSubmit} className="mt-10 flex max-w-[420px] flex-col gap-4" noValidate>
        <p>
          <label htmlFor="signin-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
            Email
          </label>
          <input
            id="signin-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "signin-email-error" : undefined}
            className={FIELD}
          />
          {errors.email && (
            <span id="signin-email-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
              {errors.email}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="signin-password" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
            Password
          </label>
          <input
            id="signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "signin-password-error" : undefined}
            className={FIELD}
          />
          {errors.password && (
            <span id="signin-password-error" className="mt-1.5 block text-[13px] text-ink" role="alert">
              {errors.password}
            </span>
          )}
        </p>
        <p>
          <Link href="/signin/forgot" className="text-[14px] text-gold-text no-underline hover:underline">
            Forgot password
          </Link>
        </p>
        <div>
          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </div>
      </form>
      <p className="mt-8 max-w-[36ch] text-[14px] leading-[1.5] text-muted">Or</p>
      <div className="mt-3 flex max-w-[420px] flex-col gap-3 sm:flex-row">
        <Button type="button" variant="ghost" onClick={() => continueOn()}>
          Continue with Google
        </Button>
        <Button type="button" variant="ghost" onClick={() => continueOn()}>
          Continue with ORCID
        </Button>
      </div>
    </AuthLayout>
  );
}
