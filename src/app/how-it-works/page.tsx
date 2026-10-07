import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { ExampleTag, PageHero, SectionHead } from "@/components/PageHero";
import { ScoreBars } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { StatusBadge } from "@/components/StatusBadge";
import {
  SAMPLE_CONCERN,
  SAMPLE_EXCERPT,
  SAMPLE_LENSES,
  SAMPLE_NOTICE,
  SAMPLE_STRENGTHEN,
  SAMPLE_WHY,
} from "@/lib/sampleReview";
import { EYEBROW, SECTION, WRAP } from "@/lib/ui";

const CHAIN = [
  {
    label: "Application excerpt",
    title: "A sentence a reviewer can test.",
    body: SAMPLE_EXCERPT,
  },
  {
    label: "Contrasting reviewer lenses",
    title: "Two professional reads, not characters.",
    body: "",
  },
  {
    label: "Factor affected",
    title: "Factor 2, Rigor and Feasibility.",
    body: "Under the NIH Simplified Review Framework, this is scored 1 to 9. Factor 3, Expertise and Resources, is assessed for sufficiency and is not scored on that scale.",
  },
  {
    label: "Discussion topic",
    title: "Would the room spend time on the unnamed assumption?",
    body: "Modelling how discussion changes a panel is a longer-term concept. It is not live, and this page does not reproduce an actual study section.",
    concept: true,
  },
  {
    label: "Revision priority",
    title: SAMPLE_STRENGTHEN,
    body: SAMPLE_WHY,
  },
];

export const metadata: Metadata = {
  title: "See how it works | EQUITAS Intelligence",
  description:
    "A worked example on fictional aims: the reviewer concern, the factor it sits under, and what to strengthen. Illustrative, not a real study section.",
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="See how it works"
          title="From an excerpt to a revision, with the reason shown."
          lede={
            <p>
              This is what the Study Section Simulator demonstrates today. It is built on a made-up
              application so you can see the reasoning without sharing anything. It is not a
              validated reproduction of a study section, and it is not a funding prediction.
            </p>
          }
          actions={
            <>
              <Button href="#chain" variant="primary">
                Follow the sample
              </Button>
              <Button href="/app/tool" variant="ghost">
                Open the Simulator
              </Button>
            </>
          }
          note="Illustrative sample. NIH Simplified Review Framework."
          visual={
            <div className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[18px] font-medium tracking-[-0.03em]">Factor scores</p>
                <ExampleTag>Sample</ExampleTag>
              </div>
              <ScoreBars />
            </div>
          }
        />

        <section id="chain" className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="A visual demonstration"
            title="What the concern is based on, at each step."
            lede="You should be able to understand the reasoning and challenge it. Nothing here is a guaranteed score."
          />
          <ol className="m-0 mt-12 flex list-none flex-col gap-5 p-0">
            {CHAIN.map((step, i) => (
              <li key={step.label} className="rounded-2xl bg-surface p-7 shadow-card sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                  <p className={EYEBROW}>{step.label}</p>
                  {step.concept ? <StatusBadge status="Coming" /> : <ExampleTag>Illustrative</ExampleTag>}
                </div>
                <h3 className="mt-5 max-w-[40ch] text-[clamp(22px,2.4vw,30px)] font-light leading-[1.2] tracking-[-0.03em]">
                  {step.title}
                </h3>
                {i === 1 ? (
                  <ul className="m-0 mt-6 grid list-none gap-4 p-0 lg:grid-cols-2">
                    {SAMPLE_LENSES.map((lens) => (
                      <li key={lens.who} className="rounded-xl bg-bg-2 px-5 py-5">
                        <p className="text-[12px] uppercase tracking-[0.12em] text-gold-text">{lens.factor}</p>
                        <p className="mt-2 text-[16px] font-medium tracking-[-0.02em]">{lens.who}</p>
                        <p className="mt-3 text-[15px] leading-[1.55] text-muted">{lens.body}</p>
                        <p className="mt-3 text-[13px] leading-[1.5] text-muted">{lens.basis}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.6] text-muted">{step.body}</p>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <SectionHead
              eyebrow="What to notice"
              title={SAMPLE_NOTICE}
              lede={SAMPLE_CONCERN}
            />
            <div className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
              <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">What to strengthen</p>
              <p className="mt-4 text-[20px] leading-[1.35] tracking-[-0.02em]">{SAMPLE_STRENGTHEN}</p>
              <p className="mt-4 text-[15px] leading-[1.55] text-muted">{SAMPLE_WHY}</p>
              <p className="mt-6 text-[13px] text-muted">
                Build the judgment to notice this in your next application.
              </p>
            </div>
          </div>
        </section>

        <CtaBand
          title="Now see the sample on a draft you paste."
          primary={{ href: "/onboarding?from=review", label: "Create an account" }}
          secondary={{ href: "/app/tool", label: "Open the Study Section Simulator" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
