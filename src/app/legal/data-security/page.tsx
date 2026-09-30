import type { Metadata } from "next";
import Link from "next/link";
import { LegalBlock, LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Data and security | EQUITAS Intelligence",
  description:
    "How EQUITAS handles drafts, the public search box, and accounts. Your work stays yours. Drafts are not used to train models.",
};

export default function DataSecurityPage() {
  return (
    <LegalLayout
      slug="data-security"
      title="Data and security"
      intro="Your work stays yours. Drafts are not used to train models. This page is the full version of the line under the homepage search box."
    >
      <LegalBlock title="The public search box">
        <p>
          The box on the homepage is for a short sentence about what you need. For example: my K
          award was not funded. It is not a place to paste an application.
        </p>
        <p>
          Please do not paste grant text or patient data there. That warning sits next to the box
          because that is where the worry occurs, not only in a policy page.
        </p>
      </LegalBlock>

      <LegalBlock title="What you paste into a tool">
        <p>
          When you paste aims or a draft into a tool, that text is yours. It is not used to train
          models. It is not shared with other users. It is not shown on institutional dashboards.
          Those views track activity, not the wording of an application.
        </p>
        <p>
          On this version of the site, a signed-in session lives in your browser. A full account
          and server-side store are being built. When they are live, this page will name where
          drafts sit and how long they are kept.
        </p>
      </LegalBlock>

      <LegalBlock title="Accounts">
        <p>
          An account holds the name and email you gave us. Google and ORCID are offered as ways to
          continue. Those connections are not live OAuth on this version. They continue you into
          the product without claiming a live link to those services yet.
        </p>
        <p>
          Self-serve account deletion is not built yet. Email to confirm, and we will delete what
          we hold.
        </p>
      </LegalBlock>

      <LegalBlock title="What we do not do">
        <p>We do not sell drafts or account data.</p>
        <p>We do not use your unpublished work to train models.</p>
        <p>We do not put patient-identifying data into a public search index.</p>
        <p>
          We do not claim a third-party security audit we have not completed. When one exists, it
          will be named here.
        </p>
      </LegalBlock>

      <LegalBlock title="Related pages">
        <p>
          <Link href="/legal/privacy" className="text-gold-text no-underline hover:underline">
            Privacy
          </Link>{" "}
          covers collection and sharing.{" "}
          <Link href="/legal/terms" className="text-gold-text no-underline hover:underline">
            Terms
          </Link>{" "}
          cover how the product may be used.{" "}
          <Link href="/resources/faq" className="text-gold-text no-underline hover:underline">
            FAQ
          </Link>{" "}
          answers who sees your work in one line.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
