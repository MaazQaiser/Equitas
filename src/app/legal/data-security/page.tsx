import type { Metadata } from "next";
import Link from "next/link";
import { LegalBlock, LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Data and security | EQUITAS Intelligence",
  description:
    "How EQUITAS handles drafts, the public search box, and accounts on this version of the site. What is not built is named.",
};

export default function DataSecurityPage() {
  return (
    <LegalLayout
      slug="data-security"
      title="Data and security"
      intro="This page is the full version of the line under the homepage search box, and a list of security claims we will not make until they are true."
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
          When you paste aims or a draft into a tool on this version, that text stays in your
          browser session. It is not shown on institutional illustrations. Those views are tracking
          examples, not the wording of an application.
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
          Self-serve account deletion is not built yet. Use the institutional demo form if you need
          a person to delete a later account store.
        </p>
      </LegalBlock>

      <LegalBlock title="What we do not do">
        <p>We do not sell drafts or account data.</p>
        <p>We do not put patient-identifying data into a public search index.</p>
      </LegalBlock>

      <LegalBlock title="Not yet built, so not claimed">
        <p>
          Encryption at rest, SSO or SAML, role-based administrator views, audit logs, subprocessor
          lists, provider retention, and a Responsible AI page with verified training policy are not
          implemented in this version. We will not describe them as live. Self-serve deletion is not
          built. A named security audit has not been completed.
        </p>
        <p>
          On this version, pasted text lives in the browser session. When a server-side store exists,
          this page will say where drafts sit, who can see them, and how long they are kept.
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
