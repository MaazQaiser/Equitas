import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero, SectionHead } from "@/components/PageHero";
import { ShortAnswer } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { FAQ, FAQ_MORE } from "@/lib/content";
import { SECTION, WRAP } from "@/lib/ui";

const GROUPS = [
  { id: "product", title: "About EQUITAS", items: [FAQ[0], FAQ_MORE[0], FAQ_MORE[1], FAQ[4]] },
  { id: "account", title: "Your account and your work", items: [FAQ[1], FAQ[2], FAQ_MORE[4], FAQ_MORE[2]] },
  { id: "coverage", title: "Funders and languages", items: [FAQ[3], FAQ_MORE[3]] },
];

const MORE = [
  { href: "/legal/data-security", title: "Data and security", body: "How drafts, accounts and the search box are handled." },
  { href: "/pricing", title: "Pricing", body: "What is free, and what paid plans add." },
  { href: "/resources/how-grant-review-works", title: "How grant review works", body: "The path an application takes, and how the score is made." },
];

export const metadata: Metadata = {
  title: "FAQ | EQUITAS Intelligence",
  description:
    "Does EQUITAS write grants? Who sees your work? What is free? Plain answers for researchers.",
};

export default function FaqPage() {
  return (
    <>
      <SiteHeader current="learn" />
      <main id="main">
        <PageHero
          eyebrow="Learn · FAQ"
          title="Questions researchers ask."
          lede={
            <p>
              EQUITAS does not write grants. These answers start there, because that is the first
              question that matters.
            </p>
          }
          actions={
            <>
              <Button href="#product" variant="primary">
                Read the answers
              </Button>
              <Button href="/about#contact" variant="ghost">
                Ask us something else
              </Button>
            </>
          }
          visual={
            <ShortAnswer
              q="Does EQUITAS write my grant?"
              a="No."
              lines={[
                "It shows how reviewers may see your work.",
                "On this version, pasted text stays in your browser session.",
                "The Free plan is $0. No card needed.",
              ]}
            />
          }
        />

        {GROUPS.map((group, i) => (
          <section key={group.id} id={group.id} className={`scroll-mt-24 ${i % 2 === 0 ? "bg-bg-2" : ""}`}>
            <div className={`${WRAP} ${SECTION} grid items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
              <SectionHead eyebrow={`0${i + 1}`} title={group.title} />
              <FaqAccordion items={group.items} />
            </div>
          </section>
        ))}

        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead eyebrow="Read more" title="The full detail." />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
            {MORE.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="lift flex h-full flex-col rounded-2xl bg-surface p-7 no-underline shadow-card">
                  <span className="text-[22px] tracking-[-0.03em]">{item.title}</span>
                  <span className="mt-3 flex-1 text-[15px] leading-[1.5] text-muted">{item.body}</span>
                  <span className="mt-6 text-[15px] text-gold-text">Open →</span>
                </Link>
              </li>
            ))}
          </ul>
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
