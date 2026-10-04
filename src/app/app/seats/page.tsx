"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { RequireSignIn } from "@/components/RequireSignIn";
import { audienceKey } from "@/lib/content";
import { addSeat, inviteHref } from "@/lib/workspace";
import { useSession } from "@/lib/useSession";
import { useWorkspace } from "@/lib/useWorkspace";

const FIELD =
  "mt-1.5 h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 text-[15px] font-normal normal-case tracking-normal text-ink";

function SeatsConsole() {
  const { session } = useSession();
  const { workspace } = useWorkspace();
  const office = audienceKey(session.audience) === "grants_manager" || audienceKey(session.audience) === "institution";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const invited = workspace.seats.filter((seat) => seat.status === "invited").length;
  const active = workspace.seats.filter((seat) => seat.status === "active").length;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      setNotice("");
      return;
    }
    const result = addSeat(email.trim(), name.trim() || email.trim());
    setError("");
    setNotice(
      result.created
        ? `Invitation ready for ${result.seat.email}. Email is not sent yet. Copy the link.`
        : `${result.seat.email} is already on the list.`,
    );
    setName("");
    setEmail("");
  }

  return (
    <>
      <AppHeader current="seats" />
      <main id="main" className="mx-auto w-full max-w-[1180px] px-6 py-[clamp(48px,7vw,88px)] md:px-10">
        <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Seats</p>
        <h1 className="mt-3 max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          Invite faculty by email.
        </h1>
        <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.6] text-muted">
          An invited researcher signs in without seeing pricing. This list lives in this browser.
          Mail and SSO are not connected yet.
        </p>

        {!office ? (
          <p className="mt-8 max-w-[54ch] rounded-r-xl border-l-[3px] border-gold bg-bg-2 px-5 py-4 text-[15px] leading-[1.6]">
            Seat management is for a grants office or a chair. You can still send a test invitation
            from here, or{" "}
            <Link href="/app/invite" className="text-gold-text underline">
              open the invitation page
            </Link>{" "}
            as a faculty member would.
          </p>
        ) : null}

        <section className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <form onSubmit={onSubmit} className="rounded-2xl bg-surface p-6 shadow-card sm:p-8" noValidate>
            <h2 className="text-[22px] tracking-[-0.02em]">Send an invitation</h2>
            <p className="mt-4">
              <label htmlFor="seat-name" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
                Name
              </label>
              <input
                id="seat-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={FIELD}
              />
            </p>
            <p className="mt-4">
              <label htmlFor="seat-email" className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
                Email
              </label>
              <input
                id="seat-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError("");
                }}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "seat-email-error" : undefined}
                className={FIELD}
              />
              {error ? (
                <span id="seat-email-error" className="mt-1.5 block text-[13px]" role="alert">
                  {error}
                </span>
              ) : null}
            </p>
            <div className="mt-6">
              <Button type="submit" variant="primary">
                Add to the list
              </Button>
            </div>
            {notice ? <p className="mt-4 text-[14px] leading-[1.5]">{notice}</p> : null}
          </form>

          <div>
            <h2 className="text-[22px] tracking-[-0.02em]">Activation</h2>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface p-5 shadow-card">
                <dt className="text-[13px] text-muted">Invited, not yet in</dt>
                <dd className="mt-2 text-[32px] font-light tabular-nums">{invited}</dd>
              </div>
              <div className="rounded-2xl bg-surface p-5 shadow-card">
                <dt className="text-[13px] text-muted">Signed in</dt>
                <dd className="mt-2 text-[32px] font-light tabular-nums">{active}</dd>
              </div>
            </dl>
            {workspace.seats.length === 0 ? (
              <p className="mt-6 text-[15px] leading-[1.55] text-muted">
                No seats yet. Add an email to create an invitation link.
              </p>
            ) : (
              <ul className="m-0 mt-6 grid list-none gap-3 p-0">
                {workspace.seats.map((seat) => (
                  <li key={seat.id} className="rounded-2xl bg-surface px-5 py-4 shadow-card">
                    <p className="text-[17px] tracking-[-0.02em]">{seat.name}</p>
                    <p className="mt-1 text-[14px] text-muted">{seat.email}</p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.1em] text-gold-text">
                      {seat.status === "active" ? "Signed in" : "Invited"}
                    </p>
                    <p className="mt-3">
                      <Link
                        href={inviteHref(seat.email)}
                        className="text-[14px] text-gold-text no-underline hover:underline"
                      >
                        Open their invitation →
                      </Link>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default function SeatsPage() {
  return (
    <RequireSignIn>
      <SeatsConsole />
    </RequireSignIn>
  );
}
