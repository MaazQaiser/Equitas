import Link from "next/link";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HashScroll } from "@/components/HashScroll";
import { PageHero } from "@/components/PageHero";
import { Checklist } from "@/components/Previews";
import { EYEBROW, SECTION, WRAP } from "@/lib/ui";

export const LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/legal/data-security", label: "Data and security" },
] as const;

type Slug = "privacy" | "terms" | "accessibility" | "data-security";

const IN_SHORT: Record<Slug, string[]> = {
  privacy: [
    "No credit card to start",
    "We do not sell your data",
    "This version keeps pasted text in the browser session",
    "There is no live administrator view of drafts",
  ],
  terms: [
    "You remain the author of your application",
    "EQUITAS teaches review. It does not write grants",
    "No one can promise funding, and we do not",
    "A simulated score is not a study section result",
  ],
  accessibility: [
    "We aim for WCAG 2.1 AA",
    "Pinch-zoom is always allowed",
    "A visible focus ring for keyboard users",
    "Gaps are listed plainly on this page",
  ],
  "data-security": [
    "Do not paste grant text into the public search box",
    "This version keeps pasted text in the browser session",
    "SSO, encryption claims, and audits are not live",
    "We name no control we have not completed",
  ],
};

export function LegalLayout({
  slug,
  title,
  intro,
  children,
}: {
  slug: Slug;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  const current = `/legal/${slug}`;

  return (
    <>
      <SiteHeader />
      <HashScroll />
      <main id="main">
        <PageHero
          eyebrow="Legal"
          title={title}
          lede={<p>{intro}</p>}
          note="Last updated 30 September 2026."
          visual={<Checklist title="In short" items={IN_SHORT[slug]} />}
        />

        <div className="border-t border-line bg-bg-2">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20`}>
            <nav aria-label="Legal pages" className="lg:sticky lg:top-28">
              <p className={`mb-4 ${EYEBROW}`}>Legal pages</p>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0 lg:flex-col">
                {LEGAL_LINKS.map((item) => {
                  const on = item.href === current;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={on ? "page" : undefined}
                        className={`block rounded-xl px-4 py-2.5 text-[15px] no-underline ${
                          on ? "bg-band text-band-ink" : "bg-surface shadow-card hover:text-gold-text"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <article className="rounded-2xl bg-surface px-6 py-4 shadow-card sm:px-10 sm:py-8 [&>section:first-child]:mt-0">
              {children}
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 max-w-[62ch] border-t border-line pt-10 first:border-t-0 first:pt-4">
      <h2 className="text-[clamp(24px,2.4vw,32px)] font-light tracking-[-0.03em]">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 text-[16.5px] leading-[1.65] text-muted">{children}</div>
    </section>
  );
}
