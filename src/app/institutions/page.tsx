import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { DemoForm } from "@/components/DemoForm";
import { TrackingView } from "@/components/TrackingView";
import { HashScroll } from "@/components/HashScroll";
import { PageHero, SectionHead } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const VIEWS = [
  { title: "Who is applying", body: "Faculty grant activity across a department, by group." },
  { title: "Where applications stand", body: "In progress, submitted, and resubmitting, in one place." },
  { title: "Where support is needed", body: "Applications that would benefit from a senior reader, flagged early." },
];

const PROBLEMS = [
  {
    title: "Funding is tighter.",
    body: "Federal budgets are under pressure and success rates reflect it. The same work now has to be presented better to reach the same outcome.",
  },
  {
    title: "Your best mentors are your busiest people.",
    body: "The faculty who have sat on study sections are the ones with the least time to coach others through an application.",
  },
  {
    title: "The gap is uneven.",
    body: "Well-connected researchers get informal guidance. Early-career faculty, and those at under-resourced institutions, often get none.",
  },
];

const CHANGES = [
  {
    title: "More competitive applications.",
    body: "Every investigator can see how their work will be read before it reaches a study section.",
  },
  {
    title: "Development you cannot staff.",
    body: "The coaching your senior faculty provide informally, available to everyone who needs it.",
  },
  {
    title: "Pipeline visibility.",
    body: "See who is applying, where the gaps are, and which submissions need support.",
  },
  {
    title: "A retention tool.",
    body: "Early-career faculty stay where they are given the infrastructure to succeed.",
  },
  {
    title: "Equity at scale.",
    body: "Support reaches the faculty who most need it, consistently rather than by who knows whom.",
  },
  {
    title: "Something to point at.",
    body: "Activity, submissions and support tracked in one place, ready for your next review.",
  },
];

const SKILLS = [
  "Understand how an application will be read and scored",
  "See what actually moves the score",
  "Strengthen the work before submission",
  "Build the skill of writing to reviewers across a career",
];

const FUNDERS: { group: string; names: string }[] = [
  { group: "U.S. federal", names: "NIH, NSF, AHRQ, PCORI" },
  { group: "U.S. foundations", names: "RWJF, American Heart Association, American Cancer Society" },
  { group: "International", names: "ERC, Wellcome, CIHR, NHMRC" },
  { group: "Global health", names: "LMIC funders" },
];

const OFFICE = [
  {
    title: "Post-Award Management",
    body: "RPPR reports, no-cost extensions and progress reporting kept on schedule.",
  },
  {
    title: "Subaward & Invoicing",
    body: "Subawards, subcontracts and invoices tracked across collaborating sites.",
  },
  {
    title: "Budget & Finance",
    body: "Grant budgets built and monitored to survive review and audit.",
  },
];

export const metadata: Metadata = {
  title: "For institutions | EQUITAS Intelligence",
  description:
    "Give every faculty member the grant support your strongest researchers already have. Tracking across a department, not a forecast of future funding.",
};

export default function InstitutionsPage() {
  return (
    <>
      <SiteHeader current="institutions" ctaHref="#demo" ctaLabel="Request a demo" />
      <HashScroll />
      <main id="main">
        <PageHero
          tone="band"
          eyebrow="For institutions"
          title="Give every faculty member the grant support your strongest researchers already have."
          lede={
            <p>
              Federal funding is harder to win, and your office cannot mentor every early-career
              investigator one to one. EQUITAS gives your whole faculty the review understanding that
              only your best-mentored researchers have today.
            </p>
          }
          actions={
            <>
              <Button href="#demo" variant="onband">
                Request a demo
              </Button>
              <Button href="#what-leaders-see" variant="onband-ghost">
                See what leaders see
              </Button>
            </>
          }
          note="Tracking across a department. Not a forecast of future funding."
          visual={<TrackingView band />}
        />

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead eyebrow="The problem" title="You cannot staff mentorship at scale." />
          <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
            {PROBLEMS.map((item, i) => (
              <li key={item.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card sm:p-8">
                <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                <h3 className="mt-8 text-[22px] leading-[1.2] tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-[1.55] text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead eyebrow="What changes" title="Outcomes across a faculty, not one application at a time." />
            <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {CHANGES.map((item) => (
                <li key={item.title} className="rounded-2xl bg-surface p-7 shadow-card">
                  <h3 className="text-[20px] leading-[1.25] tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionHead
              eyebrow="For your faculty"
              title="Mentorship, not just a score."
              lede="EQUITAS does not hand a researcher a number and leave. It explains how each part of their application will be read, what is weakening it, and what to change first."
            />
            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6]">
              The fourth one matters most. Your faculty keep the skill long after this grant.
            </p>
          </div>
          <ol className="m-0 grid list-none gap-3 p-0">
            {SKILLS.map((line, i) => (
              <li
                key={line}
                className={`grid grid-cols-[2.5rem_1fr] items-baseline rounded-2xl p-6 shadow-card ${
                  i === 3 ? "bg-band text-band-ink" : "bg-surface"
                }`}
              >
                <span className={`text-[13px] tabular-nums ${i === 3 ? "text-gold-on-band" : "text-gold-text"}`}>{`0${i + 1}`}</span>
                <span className="text-[18px] leading-[1.4] tracking-[-0.02em]">{line}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-14 lg:grid-cols-2 lg:gap-20`}>
            <div>
              <p className={`mb-5 ${EYEBROW_BAND}`}>Credibility</p>
              <h2 className="max-w-[16ch] text-[clamp(34px,4.4vw,56px)] font-light leading-[1.04] tracking-[-0.035em]">
                Calibrated by someone who does the reviewing.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-band-muted">
                An active NIH study section reviewer in the health and biomedical sciences calibrates
                EQUITAS. The scoring follows how review is actually conducted, not public guidance
                alone.
              </p>
            </div>
            <div>
              <p className="mb-4 text-[14px] text-band-muted">NIH is our deepest calibration. Your faculty will find their funder named.</p>
              <dl className="m-0 grid gap-3">
                {FUNDERS.map((f) => (
                  <div key={f.group} className="rounded-2xl bg-band-2 px-6 py-5">
                    <dt className="text-[12px] uppercase tracking-[0.14em] text-gold-on-band">{f.group}</dt>
                    <dd className="m-0 mt-2 text-[16px] leading-[1.5]">{f.names}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="what-leaders-see" className={`${WRAP} ${SECTION} scroll-mt-24`}>
          <SectionHead
            eyebrow="What leaders see"
            title="Your view of the pipeline."
            lede="Department and institutional views show faculty grant activity, where applications stand, and where support is needed."
          />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
            {VIEWS.map((v) => (
              <li key={v.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card">
                <StatusBadge status="Available" />
                <h3 className="mt-6 text-[22px] tracking-[-0.03em]">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.55] text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[62ch] rounded-r-xl border-l-[3px] border-gold bg-bg-2 px-5 py-4 text-[15px] leading-[1.6]">
            These views track what is happening now. They do not forecast future funding. That is a
            separate capability we are still building, described below.
          </p>
        </section>

        <section id="grants-offices" className="scroll-mt-24 bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead
              eyebrow="For grants offices"
              title="The administrative side, in one place."
              lede="Your research administration team works alongside the researcher journey rather than travelling it. They get a different view, built around awards and deadlines."
            />
            <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
              {OFFICE.map((item) => (
                <li key={item.title} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card">
                  <StatusBadge status="Available" />
                  <h3 className="mt-6 text-[22px] tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.55] text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="roadmap" className={`${WRAP} ${SECTION} scroll-mt-24`}>
          <div className="grid gap-10 rounded-2xl border border-dashed border-line-2 bg-bg-2 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16">
            <div>
              <p className="inline-block rounded-full bg-band px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-on-band">
                On our roadmap. Not built yet.
              </p>
              <h2 className="mt-6 max-w-[16ch] text-[clamp(30px,3.6vw,46px)] font-light leading-[1.06] tracking-[-0.035em]">
                Seeing the pipeline before the awards land.
              </h2>
              <p className="mt-6 max-w-[60ch] text-[16px] leading-[1.6] text-muted">
                Because the platform estimates how competitive an application is, those estimates
                aggregated across a department become a forward-looking picture of likely research
                funding. For a chair or a research finance lead, that means seeing where funding is
                likely to come from, and where it is at risk, before the decisions arrive.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-6">
              <p className="text-[17px] font-medium leading-[1.55]">
                This is a direction we are building toward. It is not something the platform does today.
              </p>
              <div>
                <Button href="#demo" variant="ghost">
                  Talk to us about being an early partner
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="scroll-mt-24 bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
            <SectionHead
              eyebrow="Request a demo"
              title="Talk to a person."
              lede="Five fields. We will come back with a named contact and a time, not a marketing sequence."
            />
            <div className="rounded-2xl bg-surface p-7 shadow-card sm:p-9 [&>form]:mt-0">
              <DemoForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
