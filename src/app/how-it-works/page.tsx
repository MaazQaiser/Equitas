import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { ExampleTag, PageHero, SectionHead } from "@/components/PageHero";
import { AimsPair, ScoreBars } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { EYEBROW, EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const STEPS = [
  {
    title: "Share your aims or a draft section.",
    body: "Paste what you have, or load the sample. You do not need an account to see how the review looks.",
  },
  {
    title: "See how a study section would score and discuss it.",
    body: "A study section is the NIH panel that scores an application. You get criterion scores and the conversation three reviewers would have.",
  },
  {
    title: "Strengthen it before you submit.",
    body: "Changes are ranked by how much they move the score, so limited time goes to the right sentence.",
  },
];

const REVIEWERS = [
  {
    who: "Reviewer 1",
    score: 3,
    body: "The question matters and the setting is right. The check-in is simple enough to adopt. My concern is Aim 2: the sample depends on an effect the pilot did not show.",
  },
  {
    who: "Reviewer 2",
    score: 4,
    body: "I could not find the assumption behind the power calculation in the aims. If the true effect is the pilot's, 240 patients will not detect it.",
  },
  {
    who: "Reviewer 3",
    score: 3,
    body: "Strong team and environment. Innovation is modest, which is fine for a practical trial, but the application should say plainly that practicality is the point.",
  },
];

const FIXES = [
  {
    effect: "Largest effect",
    title: "State the power assumption in Aim 2.",
    body: "Name the effect size the pilot actually supports, and show the sample needed for it. Two reviewers raised this.",
  },
  {
    effect: "Medium effect",
    title: "Say that practicality is the innovation.",
    body: "Reviewer 3 read the design as modest. One sentence in the aims turns that into a strength.",
  },
  {
    effect: "Small effect",
    title: "Move the first-week risk into the opening line.",
    body: "It is the reason the check-in timing matters. Reviewers should meet it before Aim 1.",
  },
];

export const metadata: Metadata = {
  title: "See how it works | EQUITAS Intelligence",
  description:
    "A worked example on fictional aims: the score, the reviewer comments, and what to fix first. No account needed.",
};

export default function HowItWorksPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="See how it works"
          title="A sample review, from draft to fix."
          lede={
            <p>
              This is what the Study Section Simulator returns. It is built on a made-up application
              so you can see the whole review without sharing anything. Nothing here is a real score.
            </p>
          }
          actions={
            <>
              <Button href="#sample" variant="primary">
                Read the sample
              </Button>
              <Button href="/app/tool" variant="ghost">
                Try it with your own draft
              </Button>
            </>
          }
          note="Example. A made-up application. No account needed."
          visual={
            <div className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-[18px] font-medium tracking-[-0.03em]">Criterion scores</p>
                <ExampleTag>Sample</ExampleTag>
              </div>
              <ScoreBars />
            </div>
          }
        />

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead eyebrow="In three steps" title="Share a section. See the scoring. Fix what matters." />
          <ol className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card">
                <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                <h3 className="mt-6 text-[21px] leading-[1.25] tracking-[-0.025em]">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sample" className="scroll-mt-24 bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <p className={EYEBROW}>The draft and the read</p>
              <ExampleTag>Example</ExampleTag>
            </div>
            <h2 className="max-w-[16ch] text-[clamp(32px,4vw,48px)] font-light leading-[1.06] tracking-[-0.035em]">
              A draft on the left. How reviewers read it on the right.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.55] text-muted">
              Illustrative sample. Not a real application or a real score.
            </p>
            <div className="mt-10">
              <AimsPair />
            </div>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <SectionHead
            eyebrow="The scores"
            title="A score for each criterion."
            lede="Each reviewer scores 1 to 9, where 1 is exceptional. Here, Approach is the weakest. That matches the flagged sentence: the argument is sound, but the numbers behind it are not shown."
          />
          <div className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-[18px] font-medium tracking-[-0.03em]">Criterion scores</p>
              <ExampleTag>Sample</ExampleTag>
            </div>
            <ScoreBars />
          </div>
        </section>

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead
              band
              eyebrow="The discussion"
              title="What the room would say."
              lede="Three assigned reviewers read the application properly. This is the conversation they would have about it, written in their voice."
            />
            <ul className="m-0 mt-12 grid list-none gap-5 p-0 lg:grid-cols-3">
              {REVIEWERS.map((reviewer) => (
                <li key={reviewer.who} className="flex flex-col rounded-2xl bg-band-2 p-7">
                  <div className="flex items-center justify-between">
                    <span className={EYEBROW_BAND}>{reviewer.who}</span>
                    <span className="text-[14px] text-band-muted">
                      Overall <span className="text-[20px] text-band-ink tabular-nums">{reviewer.score}</span>
                    </span>
                  </div>
                  <p className="mt-6 text-[17px] leading-[1.55] tracking-[-0.01em]">&ldquo;{reviewer.body}&rdquo;</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[14px] text-band-muted">Sample comments, written for this illustration.</p>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="What to fix first"
            title="Changes ranked by how much they move the score."
            lede="Limited time should go to the change that matters most. EQUITAS does not rewrite the aims for you."
          />
          <ol className="m-0 mt-12 grid list-none gap-5 p-0 lg:grid-cols-3">
            {FIXES.map((fix, i) => (
              <li
                key={fix.title}
                className={`flex flex-col rounded-2xl p-7 shadow-card sm:p-8 ${i === 0 ? "bg-band text-band-ink" : "bg-surface"}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[13px] tabular-nums ${i === 0 ? "text-gold-on-band" : "text-gold-text"}`}>
                    {`0${i + 1}`}
                  </span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-[0.12em] ${i === 0 ? "text-gold-on-band" : "text-gold-text"}`}
                  >
                    {fix.effect}
                  </span>
                </div>
                <h3 className="mt-8 text-[23px] leading-[1.2] tracking-[-0.03em]">{fix.title}</h3>
                <p className={`mt-3 text-[15.5px] leading-[1.55] ${i === 0 ? "text-band-muted" : "text-muted"}`}>
                  {fix.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <CtaBand
          title="Now see it on your own draft."
          primary={{ href: "/onboarding?from=review", label: "Create a free account" }}
          secondary={{ href: "/app/tool", label: "Open the Study Section Simulator" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
