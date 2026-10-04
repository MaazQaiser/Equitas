import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { GuidesIndex } from "@/components/GuidesIndex";
import { PageHero, SectionHead } from "@/components/PageHero";
import { ReadingList } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { GUIDES } from "@/lib/content";
import { SECTION, WRAP } from "@/lib/ui";

const TERMS = [
  { term: "Study section", meaning: "The NIH panel of working scientists that scores an application." },
  { term: "Impact score", meaning: "The overall number from 10 to 90. Lower is better." },
  { term: "Triage", meaning: "When an application is not discussed because its early scores put it in the lower half." },
];

export const metadata: Metadata = {
  title: "Guides | EQUITAS Intelligence",
  description:
    "How grant review actually works, explained. Plain explanations of the process, the scoring, and what reviewers are really looking for. Free to read, no account needed.",
};

export default function GuidesPage() {
  return (
    <>
      <SiteHeader current="learn" />
      <main id="main">
        <PageHero
          eyebrow="Learn · Guides"
          title="How grant review actually works, explained."
          lede={
            <p>
              Plain explanations of the process, the scoring, and what reviewers are really looking for.
              Written for first-time applicants and for readers whose first language is not English.
            </p>
          }
          actions={
            <>
              <Button href="#all-guides" variant="primary">
                Browse guides
              </Button>
              <Button href="/resources/how-grant-review-works" variant="ghost">
                Start with the basics
              </Button>
            </>
          }
          note="Free to read. No account needed."
          visual={<ReadingList />}
        />

        <section id="all-guides" className="scroll-mt-24 bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead eyebrow="All guides" title="Filter by where you are." lede="Each guide belongs to a stage of the research journey." />
            <div className="mt-10">
              <GuidesIndex guides={GUIDES} />
            </div>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionHead
              eyebrow="Three words to know"
              title="The terms every guide uses."
              lede="These come up in every review. The full list is in the glossary."
            />
            <p className="mt-8">
              <Link href="/resources/how-grant-review-works#glossary" className="text-[15px] text-gold-text no-underline hover:underline">
                Open the glossary →
              </Link>
            </p>
          </div>
          <dl className="m-0 grid gap-4">
            {TERMS.map((t) => (
              <div key={t.term} className="rounded-2xl bg-surface p-6 shadow-card sm:p-7">
                <dt className="text-[21px] tracking-[-0.025em]">{t.term}</dt>
                <dd className="m-0 mt-2 text-[15.5px] leading-[1.55] text-muted">{t.meaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <CtaBand
          title="See this applied to your own work."
          primary={{ href: "/how-it-works", label: "See a sample review" }}
          secondary={{ href: "/onboarding", label: "Create a free account" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
