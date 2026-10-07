import type { Metadata } from "next";
import Link from "next/link";
import { LegalBlock, LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms | EQUITAS Intelligence",
  description:
    "The terms for using EQUITAS. It does not write grants. It does not guarantee funding.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      slug="terms"
      title="Terms"
      intro="EQUITAS teaches how reviewers may see an application. You remain the author of your own work."
    >
      <LegalBlock title="What EQUITAS is">
        <p>
          EQUITAS Intelligence helps researchers explore potential reviewer concerns so they can
          strengthen a draft before they submit. It does not write applications. For NIH
          submissions that distinction is an integrity issue, not a marketing preference. A
          simulated score is not a study section result.
        </p>
        <p>We never claim guaranteed funding. Nobody can promise that.</p>
      </LegalBlock>

      <LegalBlock title="Your account">
        <p>
          You can start free, with no card. You are responsible for the accuracy of the name and
          email you give us, and for any application you later submit to a funder.
        </p>
        <p>
          If your institution invited you, you will not be shown pricing. Institutional access is
          set up through that institution, not through a public checkout.
        </p>
      </LegalBlock>

      <LegalBlock title="Your work">
        <p>
          You own the drafts you paste. Using EQUITAS is like using a mentor: you still write the
          application. Do not submit generated text as if it were a service that authors grants. It
          does not.
        </p>
        <p>
          How drafts, accounts and the public search box are handled is on{" "}
          <Link href="/legal/data-security" className="text-gold-text no-underline hover:underline">
            Data and security
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-gold-text no-underline hover:underline">
            Privacy
          </Link>
          .
        </p>
      </LegalBlock>

      <LegalBlock title="Acceptable use">
        <p>
          Do not paste other people&rsquo;s unpublished work without their permission. Do not paste
          patient data, or any information that would identify a research participant, into the
          public search box or into a tool unless it already belongs in the application you are
          preparing and you have the right to include it.
        </p>
        <p>
          Do not try to break the service, scrape it at a volume that harms other researchers, or
          present EQUITAS as the author of a submission.
        </p>
      </LegalBlock>

      <LegalBlock title="The service as it stands">
        <p>
          Stages and tools are labelled Available, Partly available, or Coming. Features on the
          roadmap, including institutional financial forecasting, are labelled as not built yet.
          Paid plan amounts and entitlements are not published on this version until the approved
          schedule is in the build. They are not live offers.
        </p>
        <p>
          This version of the site uses a browser session for sign-in. A full account system is
          being built. We may change these terms. The date at the top of the page is the date of
          this version.
        </p>
      </LegalBlock>

      <LegalBlock title="Contact">
        <p>EQUITAS Intelligence Inc. An independent company.</p>
        <p>Use the institutional demo form to reach a person. We will not invent an address here.</p>
      </LegalBlock>
    </LegalLayout>
  );
}
