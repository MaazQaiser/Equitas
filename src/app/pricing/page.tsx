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
    name: "Researchers",
    for: "Individual researchers who want early access to reviewer-informed guidance.",
    price: "Register interest",
    href: "/#early-access",
    cta: "Register interest",
    variant: "primary" as const,
    note: "We will write when a place opens. No card is asked for here.",
  },
  {
    name: "Individual",
    for: "Regular applicants who need ongoing depth once access is open.",
    price: "Talk to us",
    href: "/#early-access",
    cta: "Register interest",
    variant: "ghost" as const,
    note: "Approved amounts are not published on this page. Ask us when you are ready.",
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
    q: "How do I get access today?",
    a: "Register interest for early access, or request an institutional demo. Invited by your institution? Use your invitation. You will not need a public plan.",
  },
];

export const metadata: Metadata = {
  title: "Pricing | EQUITAS Intelligence",
  description:
    "Register interest for researcher access, or request an institutional demo. Amounts are set in conversation, not on this page.",
};

export default function PricingPage() {
  return (
    <>
      <SiteHeader current="pricing" ctaHref="/#early-access" ctaLabel="Join early access" />
      <main id="main">
        <PageHero
          eyebrow="Access"
          title="Interest first. Amounts in conversation."
          lede={
            <p>
              Register interest for early access as a researcher, or request a demo for your institution. We do not
              publish unapproved dollar amounts or a public trial promise on this page.
            </p>
          }
          actions={
            <>
              <Button href="/#early-access" variant="primary">
                Register interest
              </Button>
              <Button href="/institutions#demo" variant="ghost">
                Request a demo
              </Button>
            </>
          }
          note="Invited by your institution? Use your invitation instead. You will not need a public plan."
          visual={
            <Checklist
              title="What you get when you write"
              items={[
                "A place on the early access list",
                "Or a named contact for institutions",
                "No card collected on this page",
                "Plain labels for what is built today",
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
                <p className="mt-8 text-[clamp(28px,2.6vw,36px)] font-light tracking-[-0.03em]">{plan.price}</p>
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
            A feature comparison will appear when approved entitlements are in this build. Until then the three cards
            are the offer. We will not fill empty rows with placeholders.
          </p>
        </section>

        <section id="reduced-pricing" className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
          <div className="rounded-2xl border border-dashed border-line-2 bg-bg-2 px-6 py-10 sm:px-10 sm:py-12">
            <p className="inline-block rounded-full bg-band px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-on-band">
              A proposal. Not an offer yet.
            </p>
            <h2 className={`mt-6 max-w-[16ch] ${H2}`}>Reduced pricing where it is needed.</h2>
            <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-muted">
              Researchers at under-resourced institutions are why EQUITAS exists. We are working out access for
              researchers based in low- and middle-income countries, and for minority-serving institutions.
            </p>
            <p className="mt-5 max-w-[54ch] text-[16px] font-medium leading-[1.55]">
              This is not an offer yet. When the terms are set, they will be stated here, plainly.
            </p>
          </div>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
            <SectionHead eyebrow="Access" title="Access questions." />
            <FaqAccordion items={PRICING_FAQ} />
          </div>
        </section>

        <CtaBand
          title="Register interest, or talk to us."
          primary={{ href: "/#early-access", label: "Join early access" }}
          secondary={{ href: "/institutions#demo", label: "Talk to us about your institution" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
