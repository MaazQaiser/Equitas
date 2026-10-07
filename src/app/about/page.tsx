import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { HashScroll } from "@/components/HashScroll";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHero, SectionHead } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { FunderList } from "@/components/FunderList";
import { CALIBRATION_LINE } from "@/lib/content";
import { EYEBROW, EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const METHOD = [
  {
    title: "Authored reviewer reasoning",
    body: "The sample shows how a concern is grounded in the draft: the excerpt, the factor, and the next step. That is authored reasoning, not a claim that effectiveness has been validated in a study.",
  },
  {
    title: "Published criteria, applied",
    body: "Calibration follows how NIH review criteria are actually applied, including the Simplified Review Framework for R-series applications. It is not access to confidential study section deliberations.",
  },
  {
    title: "What exists today",
    body: "The Study Section Simulator sample is live and illustrative. Other modules are labelled previews or coming. Mentor Chat, longitudinal memory, and institutional forecasting are not built.",
  },
];

const LABELS = [
  { status: "Available" as const, body: "Built and working today. Shown with the strongest emphasis." },
  { status: "Partly available" as const, body: "Exactly what works today is named. The rest says it is still being built." },
  { status: "Coming" as const, body: "Not built yet. Shown so you can see where it will sit." },
];

export const metadata: Metadata = {
  title: "About | EQUITAS Intelligence",
  description:
    "Who built EQUITAS, how the review methodology is informed, and what exists today. An independent company. Not a Rutgers product.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <HashScroll />
      <main id="main">
        <PageHero
          eyebrow="About EQUITAS"
          title="Who built this, and what informs the review."
          lede={
            <>
              <p>
                EQUITAS Intelligence Inc. is an independent company. It is not a Rutgers product,
                and no university affiliation means ownership, sponsorship, endorsement, or access
                to institutional data.
              </p>
              <p>
                The why has its own page. This page is who, how, and what is live.
              </p>
            </>
          }
          actions={
            <>
              <Button href="/about/mission" variant="primary">
                Read the mission
              </Button>
              <Button href="#methodology" variant="ghost">
                How review is informed
              </Button>
            </>
          }
          visual={
            <figure className="m-0 rounded-2xl bg-surface p-7 shadow-card sm:p-8">
              <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Independent company</p>
              <p className="mt-4 text-[22px] leading-[1.3] tracking-[-0.03em]">
                Founder expertise is a foundation. It is not a substitute for validation.
              </p>
              <p className="mt-4 text-[15px] leading-[1.55] text-muted">
                We do not invent testimonials, logos, or effectiveness statistics.
              </p>
            </figure>
          }
        />

        <section id="credibility" className="scroll-mt-24 bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20`}>
            <div>
              <p className={`mb-6 ${EYEBROW_BAND}`}>The reviewer behind EQUITAS</p>
              <h2 className="max-w-[16ch] text-[clamp(30px,3.4vw,46px)] font-light leading-[1.12] tracking-[-0.03em]">
                Founder expertise, named as background.
              </h2>
              <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.6] text-band-muted">
                An active NIH study section reviewer in the health and biomedical sciences built
                EQUITAS to teach how review is read. A study section is the NIH panel that scores
                an application. {CALIBRATION_LINE} That is professional expertise applied to published
                criteria. It is not a window into confidential deliberations.
              </p>
            </div>
            <div>
              <FunderList band />
            </div>
          </div>
        </section>

        <section id="methodology" className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="Methodology"
            title="What informs the review, at a useful height."
            lede="Useful enough to trust the sample. Not a claim that the product has been proven in an outcomes study."
          />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
            {METHOD.map((item, i) => (
              <li key={item.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card sm:p-8">
                <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                <h3 className="mt-8 text-[23px] leading-[1.2] tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.55] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="honesty" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionHead
              eyebrow="How we work"
              title="We label what is not built."
              lede="Every stage of the research journey carries a status. Features we are still building say so."
            />
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6]">
              We do not claim funding outcomes. We do not publish numbers we cannot defend. For a
              product whose value rests on trust, an overclaim would cost more than it earns.
            </p>
            <p className="mt-8">
              <Link href="/journey" className="text-[16px] text-gold-text no-underline hover:underline">
                See it on the journey →
              </Link>
            </p>
          </div>
          <ul className="m-0 grid list-none gap-4 p-0">
            {LABELS.map((item) => (
              <li key={item.status} className="rounded-2xl bg-surface p-6 shadow-card sm:p-7">
                <StatusBadge status={item.status} />
                <p className="mt-3 text-[17px] leading-[1.5] tracking-[-0.01em]">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead
              eyebrow="Who it is for"
              title="Researchers first. Institutions at a separate door."
              lede="Trainees writing a first fellowship or K award. Investigators facing a resubmission. Institutions who want every faculty member supported, not only the well-mentored ones."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <Link href="/researchers" className="lift flex flex-col gap-4 rounded-2xl bg-surface p-8 no-underline shadow-card sm:p-10">
                <span className={EYEBROW}>Trainees and investigators</span>
                <span className="text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.03em]">For researchers</span>
                <span className="text-[15.5px] leading-[1.6] text-muted">
                  Explore a reviewer lens on a sample. Other modules are labelled previews.
                </span>
                <span className="mt-auto pt-4 text-[15px] text-gold-text">Go to researchers →</span>
              </Link>
              <Link href="/institutions" className="lift flex flex-col gap-4 rounded-2xl bg-band p-8 text-band-ink no-underline shadow-card sm:p-10">
                <span className={EYEBROW_BAND}>Departments and grants offices</span>
                <span className="text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.03em]">For institutions</span>
                <span className="text-[15.5px] leading-[1.6] text-band-muted">
                  Tracking illustrations across a department. Not a forecast, and not draft access.
                </span>
                <span className="mt-auto pt-4 text-[15px] text-gold-on-band">Go to institutions →</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <SectionHead
            eyebrow="Contact"
            title="Talk to us."
            lede="We will not invent an address or a named inbox. Buying for a department? The demo form reaches a person."
          />
          <address className="rounded-2xl bg-surface p-7 not-italic shadow-card sm:p-9">
            <p className="text-[clamp(22px,2.4vw,30px)] font-light tracking-[-0.03em]">EQUITAS Intelligence Inc.</p>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-muted">
              An independent company. Not owned, sponsored, or endorsed by a university. Founder
              affiliations are background, not a data-sharing arrangement.
            </p>
            <div className="mt-8">
              <Button href="/institutions#demo" variant="primary">
                Request a demo
              </Button>
            </div>
          </address>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
