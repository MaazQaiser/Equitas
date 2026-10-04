import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DemoForm } from "@/components/DemoForm";
import { PageHero } from "@/components/PageHero";
import { WRAP } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Request a demo | EQUITAS Intelligence",
  description: "Five fields. A named contact will write back with a time.",
};

export default function DemoPage() {
  return (
    <>
      <SiteHeader current="institutions" />
      <main id="main">
        <PageHero
          eyebrow="For institutions"
          title="Talk to a person."
          lede={
            <p>
              Five fields. We will come back with a named contact and a time, not a marketing
              sequence.
            </p>
          }
        />
        <section className={`${WRAP} pb-[clamp(80px,10vw,136px)]`}>
          <div className="max-w-[720px] rounded-2xl bg-surface p-7 shadow-card sm:p-9 [&>form]:mt-0">
            <DemoForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
