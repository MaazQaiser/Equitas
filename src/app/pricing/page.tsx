import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { FaqAccordion } from "@/components/FaqAccordion";
import { PageHero, SectionHead } from "@/components/PageHero";
import { Checklist } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { H2, SECTION, WRAP } from "@/lib/ui";

const PLANS = [
  {
    name: "Free",
    for: "Any researcher. Introduces reviewer-informed guidance on the sample and labelled previews.",
    price: "$0",
    href: "/onboarding",
    cta: "Create a free account",
    variant: "primary" as const,
  },
  {
    name: "Individual",
    for: "Regular applicants. Approved depth and continuity, billed in U.S. dollars.",
    price: "U.S. dollars",
    href: "/onboarding",
    cta: "Create an account",
    variant: "ghost" as const,
    note: "The approved Individual amount is not pasted into this build yet. We will not invent it.",
  },
  {
    name: "Institution",
    for: "Departments and universities. Scales access and governance across an organization.",
    price: "Talk to us",
    href: "/institutions#demo",
    cta: "Request a demo",
    variant: "ghost" as const,
  },
];

const PRICING_FAQ = [
  {
    q: "What happens when I reach my limit?",
    a: "Usage limits are part of the approved packaging. They are not live on this version of the site, so nothing is counting down in your account today.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time, once billing exists. You keep access until the period ends.",
  },
  {
    q: "Do you offer institutional invoicing?",
    a: "Yes. Institutional plans are set up through a conversation, not checkout. Request a demo and we will invoice from there.",
  },
  {
    q: "Is the free plan a trial?",
    a: "No. It does not expire. You can explore a reviewer lens on a sample without paying, and without a clock running out.",
  },
];

export const metadata: Metadata = {
  title: "Pricing | EQUITAS Intelligence",
  description:
    "Free introduces reviewer-informed guidance. Individual adds approved depth. Institution scales access. Amounts are in U.S. dollars.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader current="pricing" />
      <main id="main">
        <PageHero
          eyebrow="Pricing"
          title="Free, Individual, Institution."
          lede={
            <p>
              Free introduces reviewer-informed guidance. Individual provides approved depth and
              continuity. Institution scales approved access and governance. Amounts are in U.S.
              dollars.
            </p>
          }
          actions={
            <>
              <Button href="/onboarding" variant="primary">
                Create a free account
              </Button>
              <Button href="#plans" variant="ghost">
                See the three plans
              </Button>
            </>
          }
          note="Invited by your institution? Use your invitation instead. You will not need a plan."
          visual={
            <Checklist
              title="Free, on every account"
              items={[
                "No card needed to start",
                "Every funder we cover",
                "All ten languages",
                "It does not expire",
              ]}
            />
          }
        />

        <section id="plans" className={`scroll-mt-24 ${WRAP} pb-[clamp(72px,9vw,120px)] pt-4`}>
          <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-3">
            {PLANS.map((plan) => (
              <li key={plan.name} className="flex flex-col rounded-2xl bg-surface p-8 shadow-card">
                <h2 className="text-[clamp(28px,2.6vw,36px)] font-light tracking-[-0.03em]">{plan.name}</h2>
                <p className="mt-3 text-[15px] leading-[1.5] text-muted">{plan.for}</p>
                <p className="mt-8 text-[clamp(32px,3vw,44px)] font-light tracking-[-0.03em]">{plan.price}</p>
                {"note" in plan && plan.note ? (
                  <p className="mt-3 text-[13px] leading-[1.5] text-muted">{plan.note}</p>
                ) : null}
                <div className="mt-8">
                  <Button href={plan.href} variant={plan.variant}>
                    {plan.cta}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[58ch] text-[15px] leading-[1.55] text-muted">
            A feature comparison will appear when approved entitlements are in this build. Until
            then the three cards are the offer. We will not fill empty rows with placeholders.
          </p>
        </section>

        <section id="reduced-pricing" className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
          <div className="rounded-2xl border border-dashed border-line-2 bg-bg-2 px-6 py-10 sm:px-10 sm:py-12">
            <p className="inline-block rounded-full bg-band px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-on-band">
              A proposal. Not an offer yet.
            </p>
            <h2 className={`mt-6 max-w-[16ch] ${H2}`}>Reduced pricing where it is needed.</h2>
            <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-muted">
              Researchers at under-resourced institutions are why EQUITAS exists. We are working out a
              reduced price, or a free upgrade, for researchers based in low- and middle-income
              countries, and for minority-serving institutions.
            </p>
            <p className="mt-5 max-w-[54ch] text-[16px] font-medium leading-[1.55]">
              This is not an offer yet. When the terms are set, they will be stated here, plainly.
            </p>
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
            <SectionHead eyebrow="Billing" title="Billing questions." />
            <FaqAccordion items={PRICING_FAQ} />
          </div>
        </section>

        <CtaBand
          title="Start on Free. Decide later."
          secondary={{ href: "/institutions#demo", label: "Talk to us about your institution" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
