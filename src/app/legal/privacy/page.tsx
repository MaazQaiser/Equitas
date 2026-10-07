import type { Metadata } from "next";
import Link from "next/link";
import { LegalBlock, LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy | EQUITAS Intelligence",
  description:
    "What EQUITAS collects on this version of the site, what is not built yet, and who can see your work.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      slug="privacy"
      title="Privacy"
      intro="This page says what we collect on this version of the site, what we do not, and what is not built yet."
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
          On this version, text you paste into a tool stays in your browser session. There is no
          server-side draft store to audit yet. Institutional illustrations track activity, not
          application text. Claims about training, subprocessors, encryption, and administrator
          visibility will be named here only when those controls exist.
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
          We do not sell your data. Institutional illustrations do not show draft text. There is no
          live administrator view of a researcher’s application on this version.
        </p>
        <p>
          Payment and identity providers (when those are live) will receive only what they need to
          run the account you chose. Those connections are not live on this version of the site.
        </p>
      </LegalBlock>

      <LegalBlock title="How long we keep it">
        <p>
          Self-serve deletion is not built yet. Session data on this version lives in your browser
          and goes away when that session is cleared. Use the demo form if you need a person to
          delete what a later account store holds.
        </p>
      </LegalBlock>

      <LegalBlock title="Contact">
        <p>EQUITAS Intelligence Inc.</p>
        <p>Use the institutional demo form to reach a person. We will not invent an address here.</p>
      </LegalBlock>
    </LegalLayout>
  );
}
