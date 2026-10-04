import Link from "next/link";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { JourneyRail } from "@/components/JourneyRail";
import { FaqAccordion } from "@/components/FaqAccordion";
import { RevealMotion } from "@/components/RevealMotion";
import { CapabilityRows } from "@/components/Marquee";
import { StatusBadge } from "@/components/StatusBadge";
import { Perspectives } from "@/components/Perspectives";
import { FunderList } from "@/components/FunderList";
import { AimsPair } from "@/components/Previews";
import { FUNDER_COVER } from "@/lib/content";
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

const STEPS = [
  {
    title: "Share your aims",
    body: "Paste a draft section or your specific aims page. Or start with the sample.",
    place: "mt-14 lg:col-start-1 lg:row-start-3 lg:mt-28",
    tail: "lg:[--tail:96px]",
  },
  {
    title: "See the scoring",
    body: "Get a score for each criterion, and the discussion a study section would have about it.",
    place: "mt-14 lg:col-start-2 lg:row-start-3 lg:mt-6",
    tail: "lg:[--tail:48px]",
  },
  {
    title: "Fix what matters",
    body: "Changes ranked by how much they move your score, so limited time goes to the right section.",
    place: "mt-14 lg:col-start-3 lg:row-start-2 lg:mt-0 lg:self-start lg:pt-8",
    tail: "lg:[--tail:120px]",
  },
];

export default function Home() {
  return (
    <>
      <RevealMotion />
      <SiteHeader />
      <main id="main">
        <section className="font-outfit relative mx-auto w-full max-w-[1180px] px-6 pb-10 pt-10 md:px-10 lg:pb-12 lg:pt-16">
          <div className="relative z-10 max-w-[720px]">
            <h1 className="font-outfit max-w-[18ch] text-[clamp(40px,4.8vw,64px)] font-light leading-[1.08] tracking-[-0.045em] text-ink">
              <span className="block">Most researchers were never shown how grant review works.</span>
              <span className="mt-3 block">EQUITAS shows you.</span>
            </h1>
            <p className="enter mt-6 max-w-[46ch] text-[17px] leading-[1.5] tracking-[-0.015em] text-muted" style={enterDelay(80)}>
              See your application the way reviewers will, and strengthen it before you submit.
            </p>
            <p className="enter mt-3 max-w-[46ch] text-[16px] leading-[1.5] tracking-[-0.015em] text-muted" style={enterDelay(120)}>
              EQUITAS is a research mentor across the whole arc. It starts at the research question,
              calibrated by an active NIH study section reviewer.
            </p>
            <div className="enter mt-8 flex flex-wrap items-center gap-3" style={enterDelay(160)}>
              <Button href="/how-it-works" variant="primary" className="font-outfit">
                See a sample review
              </Button>
              <Link href="#find-your-place" className="text-[15px] text-gold-text no-underline hover:underline">
                Find your place ↓
              </Link>
            </div>
            <p className="enter mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] tracking-[-0.01em] text-ink" style={enterDelay(190)}>
              Start with a research question
              <StatusBadge status="Coming" />
            </p>
            <p className="enter mt-4 text-[14px] tracking-[-0.01em] text-muted" style={enterDelay(220)}>
              Free to start. No credit card. Ten languages.
            </p>
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <p className={`mb-4 ${EYEBROW}`}>What it looks like</p>
            <h2 className="max-w-[16ch] text-[clamp(32px,4vw,48px)] font-light leading-[1.06] tracking-[-0.035em]">
              A draft on the left. How reviewers read it on the right.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.55] text-muted">
              Example. A made-up application, not a real score.
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

        <section className="relative overflow-x-clip py-[clamp(88px,10vw,132px)] pb-[clamp(120px,14vw,180px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -right-10 h-[300px] w-[min(720px,88vw)]"
            style={{
              background:
                "radial-gradient(125% 90% at 100% 0%, #ffffff 0%, #ffffff 38%, rgba(255,255,255,0) 70%)",
              filter: "blur(36px)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, #000 42%)",
              maskImage: "linear-gradient(to top, transparent 0%, #000 42%)",
            }}
          />
          <div className={`${WRAP} relative`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-0">
              <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1">
                <p className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted ring-1 ring-line">
                  In three steps
                </p>
                <h2 className="mt-7 text-[clamp(40px,4.6vw,56px)] font-medium leading-[1.02] tracking-[-0.035em]">
                  <span className="block">See your application</span>
                  <span className="block">through a reviewer&rsquo;s</span>
                  <span className="block">eyes.</span>
                </h2>
              </div>
              <p className="mt-6 max-w-[36ch] text-[16px] leading-[1.45] text-muted lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:pt-8">
                Share a section of your draft. See the score, and the change that moves it.
              </p>
              {STEPS.map((step) => (
                <div key={step.title} className={`flex items-stretch gap-4 [--tail:40px] ${step.tail} ${step.place}`}>
                  <div aria-hidden="true" className="relative w-2 shrink-0">
                    <span
                      className="absolute left-1/2 top-1 w-1.5 -translate-x-1/2"
                      style={{
                        height: "calc(100% + var(--tail))",
                        backgroundImage: "radial-gradient(circle, #B39952 0.85px, transparent 1.05px)",
                        backgroundSize: "6px 8px",
                        backgroundRepeat: "repeat-y",
                        backgroundPosition: "center top",
                      }}
                    />
                    <span
                      className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold"
                      style={{ top: "calc(100% + var(--tail) - 3px)" }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="max-w-[18ch] text-[18px] font-medium leading-[1.3] tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-[30ch] text-[14.5px] leading-[1.45] text-muted">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-bg-2">
          <Perspectives />
        </div>

        <section className={`${WRAP} ${SECTION}`}>
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
                p: "Your R-series application or resubmission, seen the way reviewers will see it. Including why the last one was not funded.",
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
                EQUITAS. A study section is the NIH panel that scores an application. The scoring
                follows how review is actually conducted, not public guidance alone.
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
              Stronger applications across your faculty, development you cannot staff one to
              one, and visibility into your funding pipeline.
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
              Create a free account
            </Button>
            <Button href="/how-it-works" variant="ghost">
              See a sample review
            </Button>
          </div>
          <p className="mt-5 text-[14px] tracking-[-0.01em] text-muted">
            Free to start. No credit card. Ten languages.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
