import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { HashScroll } from "@/components/HashScroll";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHero, SectionHead } from "@/components/PageHero";
import { AccessGap } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { FunderList } from "@/components/FunderList";
import { EYEBROW, EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const PRINCIPLES = [
  {
    title: "It explains, every time.",
    body: "Every point comes with the reason a reviewer would raise it. The understanding stays after this grant is decided.",
  },
  {
    title: "It does not write for you.",
    body: "EQUITAS teaches researchers to see their own work the way reviewers will. For NIH submissions that line is an integrity issue.",
  },
  {
    title: "It reaches everyone.",
    body: "One reviewer cannot mentor thousands of people. The software is how one reviewer's expertise reaches many.",
  },
];

const LABELS = [
  { status: "Available" as const, body: "Built and working today." },
  { status: "Partly available" as const, body: "Some tools are live. The rest says it is still being built." },
  { status: "Coming" as const, body: "Not built yet. Shown so you can see where it will sit." },
];

export const metadata: Metadata = {
  title: "About | EQUITAS Intelligence",
  description:
    "Every Researcher Deserves the Infrastructure. EQUITAS exists so researchers can see how their applications will be read and scored, wherever they work.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <HashScroll />
      <main id="main">
        <PageHero
          eyebrow="About EQUITAS"
          title={
            <>
              <span className="block">Every Researcher Deserves</span>
              <span className="block">the Infrastructure</span>
            </>
          }
          lede={
            <>
              <p>The tagline is not a slogan. It is the reason the company exists.</p>
              <p>
                EQUITAS exists so every researcher can see how their application will be read and
                scored, wherever they work.
              </p>
            </>
          }
          actions={
            <>
              <Button href="/about/mission" variant="primary">
                Read the mission
              </Button>
              <Button href="#contact" variant="ghost">
                Contact
              </Button>
            </>
          }
          visual={<AccessGap />}
        />

        <section id="mission" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <SectionHead
            eyebrow="The tagline"
            title="Every Researcher Deserves the Infrastructure."
            lede="Researchers at well-funded institutions have mentors who have sat on review panels. Most researchers do not. That story has its own page."
          />
          <div className="lg:pt-10">
            <p className="max-w-[46ch] text-[16px] leading-[1.6] text-muted">
              EQUITAS gives every researcher that same understanding, at every institution. The
              software is how one reviewer&rsquo;s expertise reaches many people.
            </p>
            <p className="mt-8">
              <Link href="/about/mission" className="text-[16px] text-gold-text no-underline hover:underline">
                Read the mission →
              </Link>
            </p>
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <SectionHead eyebrow="The problem" title="Some researchers were taught how review works. Most were not." />
            <div className="flex flex-col gap-6 text-[clamp(17px,1.6vw,20px)] leading-[1.6] text-muted lg:pt-10">
              <p>
                At well-funded institutions, a first-time applicant has someone down the hall who has sat
                on a study section. A study section is the NIH panel that scores an application. That
                person explains what reviewers look for, what weakens an application, and what to fix
                first.
              </p>
              <p>
                Everywhere else, researchers submit without that. Strong science gets poor scores
                because nobody explained how it would be read.
              </p>
              <p className="text-ink">That gap is not about ability. It is about access.</p>
            </div>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="What EQUITAS is"
            title="The same understanding, made available to everyone."
            lede="EQUITAS shows a researcher how their application will be read, scored and discussed, and what to change before they submit."
          />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
            {PRINCIPLES.map((item, i) => (
              <li key={item.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card sm:p-8">
                <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                <h3 className="mt-8 text-[23px] leading-[1.2] tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.55] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="credibility" className="scroll-mt-24 bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20`}>
            <div>
              <p className={`mb-6 ${EYEBROW_BAND}`}>The reviewer behind EQUITAS</p>
              <h2 className="max-w-[16ch] text-[clamp(30px,3.4vw,46px)] font-light leading-[1.12] tracking-[-0.03em]">
                Calibrated by someone who does the reviewing.
              </h2>
              <p className="mt-8 max-w-[48ch] text-[16px] leading-[1.6] text-band-muted">
                An active NIH study section reviewer in the health and biomedical sciences calibrates
                EQUITAS. A study section is the NIH panel that scores an application. The scoring
                follows how review is actually conducted, not published guidance alone.
              </p>
            </div>
            <div>
              <FunderList band />
            </div>
          </div>
        </section>

        {/* Founder story: add a section here if she chooses to be named. Do not rewrite the rest. */}

        <section id="honesty" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionHead
              eyebrow="How we work"
              title="We label what is not built."
              lede="Every stage of the research journey carries a status. Features we are still building say so, including the ones we are most excited about."
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
              title="Researchers first."
              lede="Trainees writing a first fellowship or K award. Investigators facing a resubmission. Institutions who want every faculty member supported, not only the well-mentored ones."
            />
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <Link href="/researchers" className="lift flex flex-col gap-4 rounded-2xl bg-surface p-8 no-underline shadow-card sm:p-10">
                <span className={EYEBROW}>Trainees and investigators</span>
                <span className="text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.03em]">For researchers</span>
                <span className="text-[15.5px] leading-[1.6] text-muted">Free to start. See how your own application will be read.</span>
                <span className="mt-auto pt-4 text-[15px] text-gold-text">Go to researchers →</span>
              </Link>
              <Link href="/institutions" className="lift flex flex-col gap-4 rounded-2xl bg-band p-8 text-band-ink no-underline shadow-card sm:p-10">
                <span className={EYEBROW_BAND}>Departments and grants offices</span>
                <span className="text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.03em]">For institutions</span>
                <span className="text-[15.5px] leading-[1.6] text-band-muted">Support for every faculty member, and tracking across a department.</span>
                <span className="mt-auto pt-4 text-[15px] text-gold-on-band">Go to institutions →</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="contact" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <SectionHead eyebrow="Contact" title="Talk to us." lede="Buying for a department? The demo form on the institutions page reaches a named person." />
          <address className="rounded-2xl bg-surface p-7 not-italic shadow-card sm:p-9">
            <p className="text-[clamp(22px,2.4vw,30px)] font-light tracking-[-0.03em]">EQUITAS Intelligence Inc.</p>
            <dl className="m-0 mt-6 grid gap-4 text-[16px]">
              <div className="border-t border-line pt-4">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Address</dt>
                <dd className="m-0 mt-1 text-muted">To confirm</dd>
              </div>
              <div className="border-t border-line pt-4">
                <dt className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Email</dt>
                <dd className="m-0 mt-1 text-muted">To confirm</dd>
              </div>
            </dl>
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
