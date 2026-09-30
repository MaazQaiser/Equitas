import type { Metadata } from "next";
import { LegalBlock, LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Accessibility | EQUITAS Intelligence",
  description:
    "How EQUITAS is built to meet WCAG 2.1 AA. Where polish and accessibility conflict, accessibility wins.",
};

export default function AccessibilityPage() {
  return (
    <LegalLayout
      slug="accessibility"
      title="Accessibility"
      intro="Where polish and accessibility conflict, accessibility wins. This page says what is in place, and what is still being built."
    >
      <LegalBlock title="The standard we are building to">
        <p>
          WCAG 2.1 AA. Body text is specified at 4.5:1 contrast. Large text and controls at 3:1.
          Status is always a word (Available, Partly available, Coming), never colour alone.
        </p>
        <p>
          Gold used as a colour on cream fails AA at small sizes. Small gold text uses a darker
          gold made for that job.
        </p>
      </LegalBlock>

      <LegalBlock title="What you can do today">
        <p>
          Pinch-zoom is allowed. The live EQUITAS site used to block it. This site does not set a
          maximum scale.
        </p>
        <p>
          Every page has a skip link to the main content. Forms have labels. Errors are announced
          and tied to the field they belong to. Keyboard users get a visible focus ring.
        </p>
        <p>
          Motion is optional. If you prefer reduced motion, entrance animation is dropped and
          nothing that matters is hidden.
        </p>
      </LegalBlock>

      <LegalBlock title="Languages">
        <p>
          Ten languages are in the product: English, Español, Português, Français, العربية, 中文,
          हिंदी, Kiswahili, Deutsch and Italiano. English is complete. The other languages are
          being added. The language control is in the footer and in the mobile menu.
        </p>
        <p>
          Right-to-left layout for Arabic is required and is not finished yet. When it ships, this
          page will say so.
        </p>
      </LegalBlock>

      <LegalBlock title="Tell us if something fails">
        <p>
          If a page cannot be used with a keyboard, a screen reader, or zoom, that is a defect. Email
          to confirm, and name the page. We will treat it as a bug, not as a suggestion.
        </p>
      </LegalBlock>
    </LegalLayout>
  );
}
