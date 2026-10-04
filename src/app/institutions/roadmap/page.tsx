import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SECTION, WRAP } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Where we are headed | EQUITAS Intelligence",
  description:
    "Seeing the pipeline before the awards land is on our roadmap. It is not something the platform does today.",
};

export default function RoadmapPage() {
  return (
    <>
      <SiteHeader current="institutions" />
      <main id="main">
        <PageHero
          tone="sand"
          eyebrow="On our roadmap. Not built yet."
          title="Seeing the pipeline before the awards land."
          lede={
            <p>
              This is a direction we are building toward. It is not something the platform does today.
              Institutional dashboards now are tracking, not forecasting.
            </p>
          }
          actions={
            <>
              <Button href="/institutions/demo" variant="primary">
                Talk to us about being an early partner
              </Button>
              <Button href="/institutions/what-leaders-see" variant="ghost">
                What leaders see today
              </Button>
            </>
          }
        />

        <section className={`${WRAP} ${SECTION}`}>
          <p className="max-w-[68ch] text-[18px] leading-[1.6]">
            Because the platform estimates how competitive an application is, those estimates
            aggregated across a department become a forward-looking picture of likely research
            funding. For a chair or a research finance lead, that means seeing where funding is
            likely to come from, and where it is at risk, before the decisions arrive.
          </p>
          <p className="mt-6 max-w-[68ch] text-[18px] leading-[1.6]">
            That picture is not available yet. Today you can see faculty grant activity, pipeline
            status, and where support is needed. Those views track what is happening now.
          </p>
          <p className="mt-10 inline-block rounded-full bg-band px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.14em] text-gold-on-band">
            On our roadmap. Not built yet.
          </p>
        </section>
      </main>
      <CtaBand
        title="Talk to a person about this."
        primary={{ href: "/institutions/demo", label: "Request a demo" }}
        secondary={{ href: "/institutions", label: "Back to institutions" }}
      />
      <SiteFooter />
    </>
  );
}
