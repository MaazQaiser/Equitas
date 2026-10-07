"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { useSession } from "@/lib/useSession";

function UpgradeBody() {
  const params = useSearchParams();
  const { session, hydrated } = useSession();
  const doing = params.get("doing") || session.lastDoing || "your review";

  if (!hydrated) return null;

  if (session.invited) {
    return (
      <>
        {session.signedIn ? <AppHeader /> : <SiteHeader current="pricing" />}
        <main id="main" className="mx-auto w-full max-w-[720px] px-6 py-[clamp(56px,8vw,104px)] md:px-10">
          <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Your institution covers this</p>
          <h1 className="mt-3 max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
            You do not need a plan.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-muted">
            You were invited by your institution. Pricing is not shown on this account. You can go
            back to {doing}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/app" variant="primary">
              Back to my tools
            </Button>
            <Button href="/app/saved" variant="ghost">
              Open saved work
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      {session.signedIn ? <AppHeader /> : <SiteHeader current="pricing" />}
      <main id="main" className="mx-auto w-full max-w-[800px] px-6 py-[clamp(56px,8vw,104px)] md:px-10">
        <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">If a limit applied</p>
        <h1 className="mt-3 max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          You were working on {doing}.
        </h1>
        <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-muted">
          New reviews would wait until the period resets. The work you have already done stays
          available. Nothing is deleted, and nothing is counting down.
        </p>
        <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.6] text-muted">
          Paid limits are not live. The approved Individual dollar amount is not pasted into this
          build yet. You can keep using the tools.
        </p>

        <ul className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2">
          <li className="rounded-2xl bg-surface p-6 shadow-card">
            <h2 className="text-[22px] tracking-[-0.02em]">Stay on Free</h2>
            <p className="mt-3 text-[15px] leading-[1.55] text-muted">
              Keep the reviews you have. Come back when the period resets, once that date is set.
            </p>
            <div className="mt-6">
              <Button href="/app/saved" variant="primary">
                Keep my saved work
              </Button>
            </div>
          </li>
          <li className="rounded-2xl bg-surface p-6 shadow-card">
            <h2 className="text-[22px] tracking-[-0.02em]">Ask about a paid plan</h2>
            <p className="mt-3 text-[15px] leading-[1.55] text-muted">
              Individual pricing is approved by the founder and billed in U.S. dollars. The amount
              will appear on the pricing page when that source is in this build. Institutions talk
              to us. You can cancel any time once billing exists.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/pricing#plans" variant="ghost">
                Compare plans
              </Button>
              <Button href="/institutions/demo" variant="ghost">
                Talk about an institution
              </Button>
            </div>
          </li>
        </ul>
      </main>
    </>
  );
}

export default function UpgradePage() {
  return (
    <Suspense>
      <UpgradeBody />
    </Suspense>
  );
}
