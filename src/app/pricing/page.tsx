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
    for: "Any researcher",
    price: "£0",
    href: "/onboarding",
    cta: "Create a free account",
    variant: "primary" as const,
  },
  {
    name: "Individual",
    for: "Regular applicants",
    price: "To confirm",
    href: "/onboarding",
    cta: "Choose this plan",
    variant: "ghost" as const,
  },
  {
    name: "Institution",
    for: "Departments and universities",
    price: "Talk to us",
    href: "/institutions#demo",
    cta: "Request a demo",
    variant: "ghost" as const,
  },
];

const COMPARE: { feature: string; values: [string, string, string]; same?: boolean }[] = [
  {
    feature: "Reviews per month",
    values: ["Number to confirm", "Number to confirm", "Number to confirm"],
  },
  {
    feature: "Tools included",
    values: ["Stages to confirm", "Stages to confirm", "Stages to confirm"],
  },
  {
    feature: "Funders",
    values: ["All funders", "All funders", "All funders"],
    same: true,
  },
  {
    feature: "Languages",
    values: ["All ten", "All ten", "All ten"],
    same: true,
  },
  {
    feature: "Saved work and history",
    values: ["To confirm", "To confirm", "To confirm"],
  },
  {
    feature: "Institutional dashboard",
    values: ["Not included", "Not included", "Included"],
  },
  {
    feature: "Support",
    values: ["To confirm", "To confirm", "To confirm"],
  },
];

const PRICING_FAQ = [
  {
    q: "What happens when I reach my limit?",
    a: "New reviews wait until the period resets. You keep the work you have already done. The reset date will be stated here once the billing period is confirmed.",
  },
  {
    q: "Can I cancel?",
    a: "Yes, any time. You keep access until the period ends.",
  },
  {
    q: "Do you offer institutional invoicing?",
    a: "Yes. Institutional plans are set up through a conversation, not checkout. Request a demo and we will invoice from there.",
  },
  {
    q: "Is the free plan a trial?",
    a: "No. It does not expire. You can understand how your application will be reviewed without paying, and without a clock running out mid-application.",
  },
];

export const metadata: Metadata = {
  title: "Pricing | EQUITAS Intelligence",
  description:
    "Free to start. Always. You can understand how your application will be reviewed without paying anything. Paid plans add more of it.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader current="pricing" />
      <main id="main">
        <PageHero
          eyebrow="Pricing"
          title="Free to start. Always."
          lede={
            <p>
              You can understand how your application will be reviewed without paying anything. Paid
              plans add more of it.
            </p>
          }
          actions={
            <>
              <Button href="/onboarding" variant="primary">
                Create a free account
              </Button>
              <Button href="#plans" variant="ghost">
                Compare plans
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
                "Your drafts stay yours",
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
                <div className="mt-8">
                  <Button href={plan.href} variant={plan.variant}>
                    {plan.cta}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <h2 className={`max-w-[16ch] ${H2}`}>What is in each plan.</h2>
            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-[15px] leading-[1.45]">
                <caption className="sr-only">What each plan includes</caption>
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="py-3 pr-6 font-medium">
                      <span className="sr-only">Feature</span>
                    </th>
                    {PLANS.map((plan) => (
                      <th key={plan.name} scope="col" className="py-3 pr-6 font-medium last:pr-0">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.feature} className="border-b border-line">
                      <th scope="row" className="py-4 pr-6 align-top font-medium">
                        {row.feature}
                      </th>
                      {row.values.map((value, i) => (
                        <td
                          key={PLANS[i].name}
                          className={`py-4 pr-6 align-top last:pr-0 ${
                            row.same ? "text-ink" : "text-muted"
                          }`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-8 max-w-[54ch] text-[15px] leading-[1.55] text-muted">
              Funders and languages are the same on every plan. A researcher in any country gets all
              ten languages, including on Free.
            </p>
          </div>
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
          title="Start free. Decide later."
          secondary={{ href: "/institutions#demo", label: "Talk to us about your institution" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
