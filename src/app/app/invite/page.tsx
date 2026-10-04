"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { activateSeat } from "@/lib/workspace";
import { writeSession } from "@/lib/session";
import { useSession } from "@/lib/useSession";

const FIELD =
  "mt-1.5 h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px] font-normal normal-case tracking-normal text-ink";

function InviteForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { session, hydrated } = useSession();
  const presetEmail = params.get("email") ?? "";
  const role = params.get("role") ?? "";
  const [name, setName] = useState(session.name);
  const [email, setEmail] = useState(presetEmail || session.email);
  const [error, setError] = useState("");

  const audience = role === "chair" || role === "institution" ? "institution" : role === "admin" ? "admin" : session.audience;

  function accept(nextName: string, nextEmail: string) {
    activateSeat(nextEmail);
    writeSession({
      signedIn: true,
      invited: true,
      name: nextName,
      email: nextEmail,
      audience: audience || session.audience,
    });
    router.push("/app");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter the email on the invitation.");
      return;
    }
    accept(name.trim(), email.trim());
  }

  if (!hydrated) return null;

  return (
    <>
      {session.signedIn ? <AppHeader /> : <SiteHeader />}
      <main id="main" className="mx-auto w-full max-w-[720px] px-6 py-[clamp(56px,8vw,104px)] md:px-10">
        <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Institutional invitation</p>
        <h1 className="mt-3 max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          Your institution already covers this.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-muted">
          Accept with the email on the invitation. You will not see pricing. Institutional sign-in
          (SSO) is not connected yet.
        </p>

        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4" noValidate>
          <p>
            <label htmlFor="invite-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
              Name
            </label>
            <input id="invite-name" value={name} onChange={(event) => setName(event.target.value)} className={FIELD} />
          </p>
          <p>
            <label htmlFor="invite-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
              Email on the invitation
            </label>
            <input
              id="invite-email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "invite-email-error" : undefined}
              className={FIELD}
            />
            {error ? (
              <span id="invite-email-error" className="mt-1.5 block text-[13px]" role="alert">
                {error}
              </span>
            ) : null}
          </p>
          <div>
            <Button type="submit" variant="primary">
              Accept the invitation
            </Button>
          </div>
        </form>

        <p className="mt-8 text-[14px] text-muted">Institutional sign-in, when it is connected.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              const nextEmail = email.trim() || presetEmail;
              if (!nextEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
                setError("Enter the email on the invitation.");
                return;
              }
              accept(name.trim(), nextEmail);
            }}
          >
            Continue with institutional SSO
          </Button>
        </div>
        <p className="mt-4 max-w-[48ch] text-[13px] leading-[1.5] text-muted">
          That button does not talk to an identity provider yet. It only marks this session as invited
          so pricing stays hidden.
        </p>
      </main>
    </>
  );
}

export default function InvitePage() {
  return (
    <Suspense>
      <InviteForm />
    </Suspense>
  );
}
