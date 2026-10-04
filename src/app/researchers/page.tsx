import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HashScroll } from "@/components/HashScroll";
import { PageHero, SectionHead } from "@/components/PageHero";
import { ReviewReport } from "@/components/Previews";
import { StatusBadge } from "@/components/StatusBadge";
import { CtaBand } from "@/components/CtaBand";
import { FunderList } from "@/components/FunderList";
import { Perspectives } from "@/components/Perspectives";
import { MODULES, STAGES } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { EYEBROW, EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const AUDIENCES = [
  {
    id: "trainees",
    eyebrow: "Trainees and postdocs",
    title: "Your first grant, without a grants office behind you.",
    body: "Most trainees write their first fellowship or K award alone. Nobody explains how it will be read, what reviewers look for, or why the last person in your lab was funded.",
    tools: ["Trainee & GRA Tools", "K Award Suite", "Pre-Award Review", "Funding Discovery"],
    start: "Start at Compete if you have a deadline.",
    href: "/journey/compete",
    cta: "Go to Compete",
  },
  {
    id: "investigators",
    eyebrow: "Investigators",
    title: "Know how it will score before you send it.",
    body: "A strong idea still scores badly if reviewers cannot find what they need. Summary statements rarely explain why, and by the time you read one it is too late.",
    tools: ["Study Section Simulator", "Resubmission Strategy", "Pre-Award Review", "International Research"],
    start: "Start at Review if you have a draft. Compete if you are still writing.",
    href: "/journey/review",
    cta: "Go to Review",
  },
];

const WORTH = [
  { title: "See how it is read", body: "Understand how your application will be read and scored, section by section." },
  { title: "See what moves the score", body: "Changes ranked by how much they matter, so limited time goes to the right place." },
  { title: "Strengthen it first", body: "Fix what a reviewer would raise before the application leaves your desk." },
  { title: "Keep the skill", body: "Every suggestion explains its reasoning. The understanding stays after this grant is decided." },
];

const RESEARCHER_FAQ = [
  {
    q: "Does EQUITAS write my grant?",
    a: "No. It helps you understand how your own work will be read and scored. We do not draft applications, and for NIH submissions that distinction matters.",
  },
  {
    q: "Is it free?",
    a: "Free to start, no card needed. You can create an account and use the core tools without a card.",
  },
  {
    q: "Who sees my work?",
    a: "Only you. Drafts are not used to train models and are not shared with other users or institutions.",
  },
];

function statusOf(name: string) {
  const mod = MODULES.find((m) => m.name === name);
  return STAGES.find((s) => s.name === mod?.stage);
}

export const metadata: Metadata = {
  title: "For researchers | EQUITAS Intelligence",
  description:
    "The grant support that used to depend on who you knew. EQUITAS gives trainees and investigators the same review understanding, wherever you work.",
};

export default function ResearchersPage() {
  return (
    <>
      <SiteHeader current="researchers" />
      <HashScroll />
      <main id="main">
        <PageHero
          eyebrow="For researchers"
          title="The grant support that used to depend on who you knew."
          lede={
            <p>
              Researchers at well-funded institutions have mentors who have sat on review panels. Most
              researchers do not. EQUITAS gives you the same understanding, wherever you work.
            </p>
          }
          actions={
            <>
              <Button href="/onboarding" variant="primary">
                Create a free account
              </Button>
              <Button href="/how-it-works" variant="ghost">
                See a sample review
              </Button>
            </>
          }
          note="Free to start. No credit card. Ten languages."
          visual={<ReviewReport />}
        />

        <nav aria-label="Jump to your group" className="border-y border-line bg-bg-2">
          <div className={`${WRAP} flex flex-wrap items-center gap-x-8 gap-y-3 py-5 text-[15px]`}>
            <span className="text-muted">Which one are you?</span>
            {AUDIENCES.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="text-ink no-underline hover:text-gold-text">
                {a.eyebrow} ↓
              </a>
            ))}
          </div>
        </nav>

        {AUDIENCES.map((a, i) => (
          <section key={a.id} id={a.id} className={`scroll-mt-24 ${i === 1 ? "bg-bg-2" : ""}`}>
            <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
              <div className="lg:sticky lg:top-28">
                <SectionHead eyebrow={a.eyebrow} title={a.title} lede={a.body} />
                <p className="mt-8 max-w-[44ch] text-[16px] leading-[1.5]">{a.start}</p>
                <div className="mt-6">
                  <Button href={a.href} variant="primary">
                    {a.cta} →
                  </Button>
                </div>
              </div>
              <div>
                <p className={`mb-4 ${EYEBROW}`}>The tools you will see</p>
                <ul className="m-0 grid list-none gap-4 p-0">
                  {a.tools.map((name) => {
                    const mod = MODULES.find((m) => m.name === name);
                    const stage = statusOf(name);
                    if (!mod || !stage) return null;
                    return (
                      <li key={name}>
                        <Link
                          href={`/app/tool?module=${moduleSlug(name)}`}
                          className="lift flex flex-col gap-3 rounded-2xl bg-surface p-6 no-underline shadow-card sm:p-7"
                        >
                          <span className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-[12px] uppercase tracking-[0.14em] text-muted">{stage.name}</span>
                            <StatusBadge status={stage.status} />
                          </span>
                          <span className="text-[21px] tracking-[-0.025em]">{name}</span>
                          <span className="text-[15px] leading-[1.55] text-muted">{mod.description}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        ))}

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="More than one application"
            title="What you take with you."
            lede="Every tool explains its reasoning. You see what weakens an application, why a reviewer would raise it, and what to fix first."
          />
          <ol className="m-0 mt-14 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {WORTH.map((item, i) => (
              <li
                key={item.title}
                className={`flex flex-col rounded-2xl p-7 shadow-card ${
                  i === 3 ? "bg-band text-band-ink" : "bg-surface"
                }`}
              >
                <span className={`text-[13px] tabular-nums ${i === 3 ? "text-gold-on-band" : "text-gold-text"}`}>
                  {`0${i + 1}`}
                </span>
                <h3 className="mt-8 text-[22px] tracking-[-0.025em]">{item.title}</h3>
                <p className={`mt-3 text-[15px] leading-[1.55] ${i === 3 ? "text-band-muted" : "text-muted"}`}>
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="bg-bg-2">
          <Perspectives />
        </div>

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20`}>
            <div>
              <p className={`mb-6 ${EYEBROW_BAND}`}>Why you can trust it</p>
              <h2 className="max-w-[16ch] text-[clamp(30px,3.4vw,46px)] font-light leading-[1.12] tracking-[-0.03em]">
                Calibrated by someone who does the reviewing.
              </h2>
              <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.6] text-band-muted">
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

        <section className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
          <div>
            <SectionHead title="Questions researchers ask." />
            <p className="mt-6">
              <Link href="/resources/faq" className="text-[15px] text-gold-text no-underline hover:underline">
                All questions →
              </Link>
            </p>
          </div>
          <FaqAccordion items={RESEARCHER_FAQ} />
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
