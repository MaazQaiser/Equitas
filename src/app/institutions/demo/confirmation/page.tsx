import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Demo request received | EQUITAS Intelligence",
  description: "A named contact will write within two working days.",
};

export default function DemoConfirmationPage() {
  return (
    <>
      <SiteHeader current="institutions" />
      <main id="main">
        <PageHero
          eyebrow="Request received"
          title="A named person will write within two working days."
          lede={
            <>
              <p>
                Institutional partnerships will email you with times. The contact name is still to
                confirm. You can also book a slot from the calendar link in that email.
              </p>
              <p>We will not add you to a marketing sequence.</p>
            </>
          }
          actions={
            <>
              <Button href="/institutions" variant="primary">
                Back to institutions
              </Button>
              <Button href="/institutions/roadmap" variant="ghost">
                Where we are headed
              </Button>
            </>
          }
        />
      </main>
      <SiteFooter />
    </>
  );
}
