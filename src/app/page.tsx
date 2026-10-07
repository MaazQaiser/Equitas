import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { JourneyRail } from "@/components/JourneyRail";
import { FaqAccordion } from "@/components/FaqAccordion";
import { RevealMotion } from "@/components/RevealMotion";
import { CapabilityRows } from "@/components/Marquee";
import { Perspectives } from "@/components/Perspectives";
import { FunderList } from "@/components/FunderList";
import { AimsPair } from "@/components/Previews";
import { ReviewLens } from "@/components/ReviewLens";
import { CALIBRATION_LINE, FUNDER_COVER } from "@/lib/content";
import { EYEBROW_BAND } from "@/lib/ui";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

const SECTION = "py-[clamp(80px,10vw,140px)]";
const WRAP = "mx-auto w-full max-w-[1180px] px-6 md:px-10";
const EYEBROW = "text-[12px] font-normal uppercase tracking-[0.14em] text-gold-text";
const H2 = "text-[clamp(40px,5.4vw,68px)] leading-[1.02] tracking-[-0.035em]";

const EXAMPLE_PROMPTS = [
  "Review my specific aims",
  "Respond to reviewer critiques",
  "Plan my K award",
  "Find funding that fits",
];

const PATHWAYS = [
  { when: "I have an idea.", href: "/journey/imagine" },
  { when: "I am writing my first application.", href: "/journey/compete" },
  { when: "I have a draft.", href: "/how-it-works" },
  {
    when: "I am preparing a resubmission.",
    href: "/journey/review",
    note: "Already have reviewer comments? Understand what needs to change.",
  },
  { when: "I received my reviews.", href: "/journey/review" },
  { when: "I have an award.", href: "/journey/manage" },
];

const MENTORSHIP = [
  {
    title: "Teach self-assessment",
    body: "Help researchers recognize weaknesses themselves and build reviewer instinct, rather than repeatedly supplying answers.",
    now: true,
  },
  {
    title: "Help researchers find their voice",
    body: "Support clarity about why the work matters and how the narrative may be heard, without writing the grant.",
    now: true,
  },
  {
    title: "Adapt to experience",
    body: "A first-time F31 applicant may need scaffolding. An experienced R01 investigator may need concise, peer-level critique.",
    now: true,
  },
  {
    title: "Recognize development over time",
    body: "With explicit consent, future support may show recurring patterns across applications. That memory is not built yet.",
    now: false,
  },
];

export default function Home() {
  return (
    <>
      <RevealMotion />
      <SiteHeader />
      <main id="main">
        <section className="font-outfit relative mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-10 lg:pb-16 lg:pt-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="relative z-10">
              <h1 className="font-outfit max-w-[18ch] text-[clamp(40px,4.8vw,64px)] font-light leading-[1.08] tracking-[-0.045em] text-ink">
                <span className="block">Most researchers were never shown how grant review works.</span>
                <span className="mt-3 block">EQUITAS shows you.</span>
              </h1>
              <p className="enter mt-6 max-w-[46ch] text-[17px] leading-[1.5] tracking-[-0.015em] text-muted" style={enterDelay(80)}>
                Explore your application through a reviewer lens, and build the judgment to strengthen
                it before you submit.
              </p>
              <p className="enter mt-3 max-w-[46ch] text-[16px] leading-[1.5] tracking-[-0.015em] text-muted" style={enterDelay(120)}>
                EQUITAS starts by showing you how reviewers think, and is being built to support you
                across the research journey.
              </p>
              <div className="enter mt-8 flex flex-wrap items-center gap-3" style={enterDelay(160)}>
                <Button href="/how-it-works" variant="primary" className="font-outfit">
                  See a sample review
                </Button>
                <Button href="/onboarding" variant="ghost" className="font-outfit">
                  Create an account
                </Button>
              </div>
            </div>
            <div className="enter" style={enterDelay(120)}>
              <ReviewLens />
            </div>
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <p className={`mb-4 ${EYEBROW}`}>What it looks like</p>
            <h2 className="max-w-[16ch] text-[clamp(32px,4vw,48px)] font-light leading-[1.06] tracking-[-0.035em]">
              A draft on the left. A reviewer lens on the right.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.55] text-muted">
              Illustrative sample. NIH Simplified Review Framework. Not a real score and not a
              funding prediction.
            </p>
            <div className="mt-10">
              <AimsPair />
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-band py-[clamp(72px,9vw,120px)] text-band-ink">
          <div className={WRAP}>
            <p className="text-[clamp(28px,3.1vw,46px)] font-light leading-[1.2] tracking-[-0.035em]">
              <span className="md:block">An active NIH study section reviewer in the health and biomedical sciences calibrates EQUITAS. </span>
              <span className="md:block">A study section is the NIH panel that scores an application. </span>
              <span className="md:block">{FUNDER_COVER} </span>
              <span className="md:block">Available in ten languages.</span>
            </p>
          </div>
          <div className="mt-[clamp(40px,5vw,64px)]">
            <CapabilityRows />
          </div>
        </section>

        <section id="find-your-place" className={`scroll-mt-24 ${SECTION}`}>
          <div className={`${WRAP} grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.05fr)] lg:gap-16`}>
            <div className="lg:sticky lg:top-28">
              <p className={`mb-6 ${EYEBROW}`}>Find your place</p>
              <h2 className={H2}>Where are you in your research?</h2>
              <p className="mt-6 max-w-[36ch] text-[clamp(18px,1.6vw,22px)] leading-[1.4] tracking-[-0.02em] text-muted lg:max-w-none">
                Pick your stage. We will show you what helps now, and say plainly what is still
                being built.
              </p>
            </div>
            <JourneyRail />
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <p className={`mb-6 ${EYEBROW}`} data-reveal>
              Or start from your question
            </p>
            <h2 className={`max-w-[20ch] ${H2}`} data-reveal style={delay(60)}>
              Not sure where you are? Tell us what you need.
            </h2>

            <form
              action="/search"
              className="mt-10 flex max-w-[760px] flex-wrap items-center gap-3 rounded-2xl bg-surface p-2 pl-6 shadow-card"
              data-reveal
              style={delay(120)}
            >
              <label htmlFor="q" className="sr-only">
                Describe what you need
              </label>
              <input
                id="q"
                name="q"
                type="text"
                placeholder="For example: my K award was not funded"
                className="min-w-[160px] flex-1 border-0 bg-transparent py-3 text-[16.5px] outline-none placeholder:text-muted"
              />
              <span className="hidden whitespace-nowrap rounded-pill bg-bg-2 px-4 py-2 text-[13px] text-muted sm:inline">
                NIH · English
              </span>
              <Button type="submit" variant="primary">
                Search
              </Button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2.5" data-reveal style={delay(180)}>
              {EXAMPLE_PROMPTS.map((p) => (
                <Link
                  key={p}
                  href={`/search?q=${encodeURIComponent(p)}`}
                  className="rounded-pill bg-surface px-5 py-2.5 text-[14px] no-underline shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  {p}
                </Link>
              ))}
            </div>

            <p className="mt-6 max-w-[62ch] text-[14px] text-muted" data-reveal style={delay(220)}>
              Please do not paste{" "}
              <Link href="/legal/data-security" className="text-gold-text underline">
                grant text
              </Link>{" "}
              or patient data here.
            </p>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION}`}>
          <p className={`mb-6 ${EYEBROW}`}>The developmental difference</p>
          <h2 className={`max-w-[18ch] ${H2}`}>Better applications now. Better judgment for the next one.</h2>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-muted">
            EQUITAS is a mentor because it teaches you to notice what a reviewer may raise, not
            because it writes the next sentence for you.
          </p>
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-2">
            {MENTORSHIP.map((item) => (
              <li key={item.title} className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold-text">
                  {item.now ? "What this means today" : "Coming"}
                </p>
                <h3 className="mt-4 text-[22px] leading-[1.25] tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.55] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="bg-bg-2">
          <Perspectives />
        </div>

        <section className={`${WRAP} ${SECTION}`}>
          <p className={`mb-6 ${EYEBROW}`}>Start from the task</p>
          <h2 className={`max-w-[16ch] ${H2}`}>You do not have to choose a career category first.</h2>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.55] text-muted">
            Each path goes only to what exists today, labelled honestly.
          </p>
          <ul className="m-0 mt-12 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {PATHWAYS.map((item) => (
              <li key={item.when}>
                <Link
                  href={item.href}
                  className="lift flex h-full flex-col justify-between gap-6 rounded-2xl bg-surface p-6 no-underline shadow-card sm:p-7"
                >
                  <span>
                    <span className="block text-[18px] leading-[1.35] tracking-[-0.02em]">{item.when}</span>
                    {"note" in item && item.note ? (
                      <span className="mt-2 block text-[14px] leading-[1.45] text-muted">{item.note}</span>
                    ) : null}
                  </span>
                  <span className="text-[15px] text-gold-text">Continue →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                h: "Trainees",
                p: "Your first fellowship or K award, without a grants office behind you. F31, F32, T32 and K awards, explained for someone doing this for the first time.",
                href: "/researchers#trainees",
                cta: "Start at Compete",
              },
              {
                h: "Investigators",
                p: "Your R-series application or resubmission, seen through a reviewer lens. Including why the last one was not funded.",
                href: "/researchers#investigators",
                cta: "Start at Review",
              },
            ].map((w, i) => (
              <Link
                key={w.h}
                href={w.href}
                className="lift flex flex-col gap-4 rounded-2xl bg-surface p-8 no-underline shadow-card sm:p-10"
                data-reveal
                style={delay(i * 110)}
              >
                <h3 className="text-[clamp(32px,3vw,44px)] tracking-[-0.03em]">{w.h}</h3>
                <p className="text-[15.5px] leading-[1.6] text-muted">{w.p}</p>
                <span className="mt-auto pt-4 text-[15px] text-gold-text">{w.cta} →</span>
              </Link>
            ))}
          </div>
          </div>
        </section>

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20`}>
            <div>
              <p className={`mb-6 ${EYEBROW_BAND}`}>The reviewer behind EQUITAS</p>
              <h2 className="max-w-[16ch] text-[clamp(34px,4.4vw,56px)] font-light leading-[1.04] tracking-[-0.035em]">
                Calibrated by someone who does the reviewing.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-band-muted">
                An active NIH study section reviewer in the health and biomedical sciences calibrates
                EQUITAS. A study section is the NIH panel that scores an application. {CALIBRATION_LINE}
                Calibration is not access to confidential deliberations.
              </p>
              <p className="mt-6">
                <Link href="/about#credibility" className="text-[15px] text-gold-on-band no-underline hover:underline">
                  About the reviewer behind EQUITAS →
                </Link>
              </p>
            </div>
            <div>
              <FunderList band />
            </div>
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <p className={`mb-6 ${EYEBROW}`}>Why we exist</p>
            <h2 className="max-w-[18ch] text-[clamp(42px,5.6vw,76px)] leading-[1.02] tracking-[-0.04em]">
              <span className="block">Every Researcher Deserves</span>
              <span className="block">the Infrastructure</span>
            </h2>
            <p className="mt-8 max-w-[42ch] text-[clamp(18px,1.7vw,22px)] leading-[1.5] text-muted">
              Researchers at well-funded institutions have mentors who have sat on review
              panels. Most researchers do not. EQUITAS gives every researcher that same
              understanding, at every institution.
            </p>
          </div>
        </section>

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION}`}>
            <p className="mb-6 text-[12px] font-normal uppercase tracking-[0.14em] text-gold-on-band">
              For institutions
            </p>
            <h2 className={`max-w-[18ch] ${H2}`}>
              Give every faculty member the grant support your strongest researchers already have.
            </h2>
            <p className="mt-8 max-w-[42ch] text-[clamp(18px,1.7vw,22px)] leading-[1.5] text-band-muted">
              Scalable research development, not simply more seats. Extend your mentorship without
              multiplying your workload. Dashboards today are tracking, not forecasting, and they do
              not show a researcher’s drafts.
            </p>
            <div className="mt-10">
              <Button href="/institutions" variant="onband">
                Explore EQUITAS for institutions
              </Button>
            </div>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION}`}>
          <h2 className={`mb-10 max-w-[14ch] ${H2}`}>Questions researchers ask</h2>
          <FaqAccordion />
        </section>

        <section className={`${WRAP} py-[clamp(120px,14vw,200px)] text-center`}>
          <h2 className="mx-auto max-w-[14ch] text-[clamp(48px,6vw,84px)] leading-[1.02] tracking-[-0.04em]">
            Start your research journey.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href="/onboarding" variant="primary">
              Create an account
            </Button>
            <Button href="/how-it-works" variant="ghost">
              See a sample review
            </Button>
          </div>
          <p className="mt-5 text-[14px] tracking-[-0.01em] text-muted">
            The Study Section Simulator sample is live. Other modules are labelled for what they are.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
