import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { PageHero, SectionHead } from "@/components/PageHero";
import { JourneyMini } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { journeyStages } from "@/lib/content";
import { EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const PICK = [
  { when: "I have a deadline coming up.", stage: "Compete", href: "/journey/compete" },
  { when: "I have a draft and want a reviewer lens before I submit.", stage: "Review", href: "/journey/review" },
  { when: "My application was not funded.", stage: "Review", href: "/journey/review" },
  { when: "I have an idea but no funder yet.", stage: "Imagine", href: "/journey/imagine" },
  { when: "I have been funded and reports are due.", stage: "Manage", href: "/journey/manage" },
  { when: "I am choosing methods or waiting on the IRB.", stage: "Design", href: "/journey/design" },
];

const LABELS = [
  { status: "Available" as const, body: "Built and working today. Present capability, shown with the strongest emphasis." },
  { status: "Partly available" as const, body: "Exactly what works today is named. The rest is still being built, and says so." },
  { status: "Coming" as const, body: "Not built yet. You can see where it will sit. Nothing here is a functioning workflow." },
];

export const metadata: Metadata = {
  title: "Your research journey | EQUITAS Intelligence",
  description:
    "Research is a journey. EQUITAS supports every step, from the question to the award, with honest labels for what is available today.",
};

export default function JourneyPage() {
  const stages = journeyStages();

  return (
    <>
      <SiteHeader />
      <main id="main">
        <PageHero
          eyebrow="The research journey"
          title="Research is a journey. We support every step."
          lede={
            <p>
              The live wedge today is the Study Section Simulator sample in Review. Compete, Imagine
              and Design are partly available as labelled previews. Manage and Transform are coming.
              Every stage is labelled, so you always know what you are getting.
            </p>
          }
          actions={
            <>
              <Button href="/onboarding" variant="primary">
                Find my stage
              </Button>
              <Button href="#pick" variant="ghost">
                Not sure where you are?
              </Button>
            </>
          }
          note="Three questions. We point you to one place to start."
          visual={<JourneyMini />}
        />

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead eyebrow="Six stages" title="What each stage does for you." />
            <ol className="m-0 mt-12 list-none p-0">
              {stages.map((stage, i) => (
                <li key={stage.slug} id={stage.slug} className="scroll-mt-24 border-t border-line-2 last:border-b">
                  <Link
                    href={`/journey/${stage.slug}`}
                    className="group grid gap-4 py-8 no-underline md:grid-cols-[4rem_minmax(0,0.9fr)_minmax(0,1.1fr)_auto] md:items-start md:gap-8"
                  >
                    <span className="text-[14px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                    <span>
                      <span className="block text-[clamp(28px,3vw,38px)] leading-none tracking-[-0.035em] group-hover:text-gold-text">
                        {stage.name}
                      </span>
                      <span className="mt-3 block">
                        <StatusBadge status={stage.status} />
                      </span>
                    </span>
                    <span>
                      <span className="block text-[18px] leading-[1.4] tracking-[-0.02em]">{stage.promise}.</span>
                      <span className="mt-2 block text-[14px] leading-[1.45] text-muted">{stage.statusNote}</span>
                      <span className="mt-3 flex flex-wrap gap-2">
                        {stage.tools.length > 0 ? (
                          stage.tools.map((tool) => (
                            <span key={tool.name} className="rounded-full bg-surface px-3 py-1.5 text-[13px] shadow-card">
                              {tool.name}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full border border-dashed border-line-2 px-3 py-1.5 text-[13px] text-muted">
                            No tools yet
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="text-[15px] text-gold-text md:pt-2">Open {stage.name} →</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="pick" className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
          <SectionHead
            eyebrow="Not sure where you are?"
            title="Start from where you are right now."
            lede="Pick the sentence that sounds like you."
          />
          <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {PICK.map((item) => (
              <li key={item.when}>
                <Link
                  href={item.href}
                  className="lift flex h-full flex-col justify-between gap-8 rounded-2xl bg-surface p-7 no-underline shadow-card"
                >
                  <span className="text-[19px] leading-[1.4] tracking-[-0.02em]">&ldquo;{item.when}&rdquo;</span>
                  <span className="text-[15px] text-gold-text">Start at {item.stage} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <div>
              <p className={`mb-5 ${EYEBROW_BAND}`}>Honest labels</p>
              <h2 className="max-w-[16ch] text-[clamp(34px,4.4vw,56px)] font-light leading-[1.04] tracking-[-0.035em]">
                Three words. Always shown.
              </h2>
              <p className="mt-6 max-w-[46ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-band-muted">
                We never show an unbuilt feature as live. Every stage and every tool carries one of
                these words.
              </p>
            </div>
            <ul className="m-0 grid list-none gap-3 p-0">
              {LABELS.map((item) => (
                <li key={item.status} className="rounded-2xl bg-band-2 px-6 py-5">
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold-on-band">{item.status}</span>
                  <p className="mt-2 text-[16px] leading-[1.5]">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="Three questions. One place to start."
          lede="Most people start at Compete if they have a deadline, or Review if they already have a draft."
          primary={{ href: "/onboarding", label: "Find my stage" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
