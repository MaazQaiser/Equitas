"use client";

import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { ExampleTag } from "@/components/PageHero";
import { RequireSignIn } from "@/components/RequireSignIn";
import { TrackingView } from "@/components/TrackingView";
import { StatusBadge } from "@/components/StatusBadge";

const SUPPORT = [
  {
    title: "Two K applications need a senior reader",
    body: "Flagged early enough to act. Tracking, not a prediction of the score.",
    href: "/app/tool?module=k-award-suite",
  },
  {
    title: "One resubmission is waiting on the A1",
    body: "The last summary statement is the starting point, not a new draft.",
    href: "/app/tool?module=resubmission-strategy",
  },
  {
    title: "Three R-series drafts have not been run through review",
    body: "The Study Section Simulator is the first read before they go out.",
    href: "/app/tool?module=study-section-simulator",
  },
];

function ChairView() {
  return (
    <>
      <AppHeader current="chair" />
      <main id="main" className="mx-auto w-full max-w-[1180px] px-6 py-[clamp(48px,7vw,88px)] md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Chair view</p>
          <ExampleTag>Example</ExampleTag>
        </div>
        <h1 className="mt-3 max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          The pipeline as it is today.
        </h1>
        <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.6] text-muted">
          Who is applying, where applications stand, and where support is needed. Tracking across a
          department. Not a forecast of future funding.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/app/seats" variant="primary">
            Manage seats
          </Button>
          <Button href="/institutions/roadmap" variant="ghost">
            Where we are headed
          </Button>
        </div>

        <section className="mt-14">
          <TrackingView />
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[clamp(26px,3vw,34px)] font-light tracking-[-0.03em]">Where support is needed</h2>
            <StatusBadge status="Available" />
          </div>
          <ul className="m-0 mt-8 grid list-none gap-4 p-0">
            {SUPPORT.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="block rounded-2xl bg-surface p-6 no-underline shadow-card">
                  <h3 className="text-[20px] tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-muted">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 max-w-[62ch] rounded-r-xl border-l-[3px] border-gold bg-bg-2 px-5 py-4 text-[15px] leading-[1.6]">
          Forecasting, seeing the pipeline before the awards land, is on our roadmap. It is not
          something the platform does today.{" "}
          <Link href="/institutions/roadmap" className="text-gold-text underline">
            Read where we are headed.
          </Link>
        </p>
      </main>
    </>
  );
}

export default function ChairPage() {
  return (
    <RequireSignIn>
      <ChairView />
    </RequireSignIn>
  );
}
