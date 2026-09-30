import type { Metadata } from "next";
import Link from "next/link";
import { LegalBlock, LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy | EQUITAS Intelligence",
  description:
    "What EQUITAS collects, what it does not, and who can see your work. Your drafts stay yours.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      slug="privacy"
      title="Privacy"
      intro="Your work stays yours. This page says what we collect, what we do not, and who can see it."
    >
      <LegalBlock title="What this page covers">
        <p>
          This is the privacy notice for the EQUITAS website and account. It is written for
          researchers, not for lawyers first. If a rule is still being decided, we say so.
        </p>
      </LegalBlock>

      <LegalBlock title="What we collect">
        <p>
          When you create an account we store the name and email you give us. If you continue with
          Google or ORCID, we store that you chose that route, and the name or email those services
          return.
        </p>
        <p>
          We do not ask for a credit card to start. We do not collect a password into a durable
          store on this version of the site. Sign-in here is a prototype session in your browser.
        </p>
        <p>
          If you request an institutional demo, we store the name, role, institution, email and
          faculty-size band you submit on that form.
        </p>
      </LegalBlock>

      <LegalBlock title="Your drafts">
        <p>
          Drafts you paste into a tool are yours. They are not used to train models. They are not
          shown to other users. They are not shown on institutional dashboards. Those views track
          activity, not the text of an application.
        </p>
        <p>
          Do not paste grant text or patient data into the public search box on the homepage. That
          box is for describing what you need, in a short sentence. The longer picture is on{" "}
          <Link href="/legal/data-security" className="text-gold-text no-underline hover:underline">
            Data and security
          </Link>
          .
        </p>
      </LegalBlock>

      <LegalBlock title="Who we share with">
        <p>
          We do not sell your data. We do not share drafts with other researchers or with an
          institution unless you are on an institutional plan and the sharing is limited to
          activity tracking, not application text.
        </p>
        <p>
          Payment and identity providers (when those are live) will receive only what they need to
          run the account you chose. Those connections are not live on this version of the site.
        </p>
      </LegalBlock>

      <LegalBlock title="How long we keep it">
        <p>
          Account details are kept while the account exists. Self-serve deletion is not built yet.
          Email to confirm, and we will delete what we hold. Session data on this version lives in
          your browser and goes away when that session is cleared.
        </p>
      </LegalBlock>

      <LegalBlock title="Contact">
        <p>EQUITAS Intelligence Inc.</p>
        <p>Address to confirm.</p>
        <p>Email to confirm.</p>
      </LegalBlock>
    </LegalLayout>
  );
}
