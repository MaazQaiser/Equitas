import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { TrackingView } from "@/components/TrackingView";
import { PageHero, SectionHead } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { CtaBand } from "@/components/CtaBand";
import { SECTION, WRAP } from "@/lib/ui";

const VIEWS = [
  {
    title: "Who is applying",
    body: "Faculty grant activity across a department, by group. Trainees, early-career faculty and established investigators, in one table.",
  },
  {
    title: "Where applications stand",
    body: "In progress, submitted, and resubmitting. You can see the pipeline as it is today, not as a prediction.",
  },
  {
    title: "Where support is needed",
    body: "Applications that would benefit from a senior reader, flagged early enough to act.",
  },
];

export const metadata: Metadata = {
  title: "What leaders see | EQUITAS Intelligence",
  description:
    "Faculty grant activity, pipeline status, and where support is needed. Tracking across a department. Not a forecast of future funding.",
};

export default function WhatLeadersSeePage() {
  return (
    <>
      <SiteHeader current="institutions" ctaHref="/institutions/demo" ctaLabel="Request a demo" />
      <main id="main">
        <PageHero
          eyebrow="What leaders see"
          title="Your view of the pipeline."
          lede={
            <p>
              Department and chair views are labelled tracking illustrations: faculty grant activity,
              where applications stand, and where support is needed. They are not a live deployment
              and not a forecast. Know where support is needed. They do not show drafts.
            </p>
          }
          actions={
            <>
              <Button href="/institutions/demo" variant="primary">
                Request a demo
              </Button>
              <Button href="/institutions/roadmap" variant="ghost">
                Where we are headed
              </Button>
            </>
          }
          note="Tracking. Not forecasting."
          visual={<TrackingView />}
        />

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="Tracking only"
            title="Three things a chair could point at."
            lede="Every number on these screens is a labelled example. Nothing here is a live institution, a forecast, or a ranking of private coaching activity."
          />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
            {VIEWS.map((view) => (
              <li key={view.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card">
                <StatusBadge status="Coming" />
                <h3 className="mt-6 text-[22px] tracking-[-0.03em]">{view.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.55] text-muted">{view.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[62ch] rounded-r-xl border-l-[3px] border-gold bg-bg-2 px-5 py-4 text-[15px] leading-[1.6]">
            Forecasting, seeing the pipeline before the awards land, is on our roadmap. It is not
            something the platform does today. That work has its own page so the limit is unmissable.
          </p>
          <p className="mt-6">
            <Button href="/institutions/roadmap" variant="ghost">
              Read where we are headed
            </Button>
          </p>
        </section>

        <CtaBand
          title="See this applied to your faculty."
          primary={{ href: "/institutions/demo", label: "Request a demo" }}
          secondary={{ href: "/institutions", label: "Back to institutions" }}
          note="Tracking today. Forecasting is on the roadmap, not built yet."
        />
      </main>
      <SiteFooter />
    </>
  );
}
