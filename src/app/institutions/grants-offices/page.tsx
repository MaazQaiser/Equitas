import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { PageHero, SectionHead } from "@/components/PageHero";
import { StatusBadge } from "@/components/StatusBadge";
import { CtaBand } from "@/components/CtaBand";
import { MODULES } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { SECTION, WRAP } from "@/lib/ui";

const OFFICE = [
  "Post-Award Management",
  "Subaward & Invoicing",
  "Budget & Finance",
] as const;

const ATTENTION = [
  { title: "RPPR due in 18 days", body: "Progress reporting kept on the calendar, not in a spreadsheet." },
  { title: "Two subaward invoices waiting", body: "Collaborating sites tracked in one list." },
  { title: "Budget revision for a no-cost extension", body: "Numbers checked before the request goes out." },
];

export const metadata: Metadata = {
  title: "For grants offices | EQUITAS Intelligence",
  description:
    "The administrative work, tracked in one place. Post-award, subawards, invoices and budgets for research administrators.",
};

export default function GrantsOfficesPage() {
  const tools = OFFICE.map((name) => MODULES.find((item) => item.name === name)).filter(
    (item): item is (typeof MODULES)[number] => Boolean(item),
  );

  return (
    <>
      <SiteHeader current="institutions" ctaHref="/institutions/demo" ctaLabel="Request a demo" />
      <main id="main">
        <PageHero
          eyebrow="For grants offices"
          title="Intelligence beside the systems you already use."
          lede={
            <p>
              Standard award tracking, invoicing and subawards should stay in the tools you already
              run. EQUITAS is not a live grants-office product. What follows is a concept for an
              intelligence layer, labelled Coming.
            </p>
          }
          actions={
            <>
              <Button href="/institutions/demo" variant="primary">
                Request a demo
              </Button>
              <Button href="/onboarding?from=manage&need=award" variant="ghost">
                Try it with a free account
              </Button>
            </>
          }
          note="Concept. Not a live administrative system."
          visual={
            <ul className="m-0 grid list-none gap-3 p-0">
              {ATTENTION.map((item, i) => (
                <li key={item.title} className="rounded-2xl bg-surface p-6 shadow-card">
                  <p className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</p>
                  <h3 className="mt-2 text-[18px] tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          }
        />

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="What you get"
            title="Four jobs, one list of what needs attention."
            lede="Each module is a concept. A traditional system says RPPR due in 18 days. A future EQUITAS layer could help spot milestones that lack progress data. That is not current capability."
          />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool.name} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card sm:p-8">
                <StatusBadge status="Coming" />
                <h3 className="mt-6 text-[22px] tracking-[-0.03em]">{tool.name}</h3>
                <p className="mt-3 flex-1 text-[15.5px] leading-[1.55] text-muted">{tool.description}</p>
                <p className="mt-6">
                  <a
                    href={`/app/tool?module=${moduleSlug(tool.name)}`}
                    className="text-[15px] text-gold-text no-underline hover:underline"
                  >
                    Look at {tool.name} →
                  </a>
                </p>
              </li>
            ))}
            <li className="flex flex-col rounded-2xl bg-surface p-7 shadow-card sm:p-8">
              <StatusBadge status="Coming" />
              <h3 className="mt-6 text-[22px] tracking-[-0.03em]">Portfolio compliance</h3>
              <p className="mt-3 flex-1 text-[15.5px] leading-[1.55] text-muted">
                See which awards need a report, an invoice or a budget check, across the investigators
                you support.
              </p>
            </li>
          </ul>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <SectionHead
              eyebrow="Why it sits here"
              title="A different organising idea. The same brand."
              lede="A principal investigator moves through Imagine, Design, Compete, Review and Manage. A grants manager works across many of those people at once."
            />
            <ul className="m-0 grid list-none gap-4 p-0">
              {ATTENTION.map((item, i) => (
                <li key={item.title} className="rounded-2xl bg-surface p-6 shadow-card">
                  <p className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</p>
                  <h3 className="mt-3 text-[19px] tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.5] text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Talk to a person about your office."
          primary={{ href: "/institutions/demo", label: "Request a demo" }}
          secondary={{ href: "/onboarding?from=manage", label: "Create a free account" }}
          note="An individual can try the tools. An office buys through the institution."
        />
      </main>
      <SiteFooter />
    </>
  );
}
