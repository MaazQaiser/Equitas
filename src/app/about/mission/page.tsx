import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { PageHero, SectionHead } from "@/components/PageHero";
import { AccessGap } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { EYEBROW, SECTION, WRAP } from "@/lib/ui";

const LINES = [
  {
    title: "The infrastructure already exists, for some people.",
    body: "Researchers at well-funded institutions have mentors who have sat on review panels. A study section is the NIH panel that scores an application. Those mentors explain what reviewers look for, what weakens a draft, and what to fix first.",
  },
  {
    title: "Most researchers do not have that.",
    body: "They write a first fellowship, a K award or an R-series application without anyone who has been in the room. Strong science still scores badly when nobody has shown how reviewers may see it.",
  },
  {
    title: "That gap is about access, not ability.",
    body: "EQUITAS gives every researcher the same understanding, at every institution. The software is how one reviewer's expertise reaches many people. It is not the headline.",
  },
];

export const metadata: Metadata = {
  title: "Mission | EQUITAS Intelligence",
  description:
    "Every Researcher Deserves the Infrastructure. Researchers at well-funded institutions have mentors who have sat on review panels. Most researchers do not.",
};

export default function MissionPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="Why EQUITAS exists"
          title={
            <>
              <span className="block">Every Researcher Deserves</span>
              <span className="block">the Infrastructure</span>
            </>
          }
          lede={
            <p>
              Researchers at well-funded institutions have mentors who have sat on review panels.
              Most researchers do not. EQUITAS gives every researcher that same understanding, at
              every institution.
            </p>
          }
          actions={
            <>
              <Button href="/onboarding" variant="primary">
                Create a free account
              </Button>
              <Button href="/about#credibility" variant="ghost">
                The reviewer behind EQUITAS
              </Button>
            </>
          }
          visual={<AccessGap />}
        />

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead eyebrow="The story" title="The tagline is the reason the company exists." />
          <ol className="m-0 mt-12 grid list-none gap-5 p-0">
            {LINES.map((item, i) => (
              <li key={item.title} className="grid gap-4 rounded-2xl bg-surface p-7 shadow-card sm:grid-cols-[2.5rem_1fr] sm:p-9">
                <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                <div>
                  <h3 className="text-[22px] leading-[1.25] tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.6] text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <SectionHead
              eyebrow="What this is not"
              title="EQUITAS does not write your grant."
              lede="It helps you understand how reviewers may see your work. For an NIH audience that distinction is an integrity question, not a marketing preference."
            />
            <div>
              <p className="max-w-[48ch] text-[16px] leading-[1.6] text-muted">
                We do not claim guaranteed funding. We do not invent user counts. We label what is
                not built. The live wedge today is the Study Section Simulator sample. Manage is
                coming. EQUITAS is an independent company, not a university product.
              </p>
              <p className="mt-8">
                <Link href="/about" className={`${EYEBROW} no-underline hover:underline`}>
                  Back to About →
                </Link>
              </p>
            </div>
          </div>
        </section>

        <CtaBand title="Start your research journey." />
      </main>
      <SiteFooter />
    </>
  );
}
