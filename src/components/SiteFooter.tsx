import Link from "next/link";
import { Logo } from "@/components/Logo";
import { STAGES } from "@/lib/content";

const LANGUAGES = [
  "English",
  "Español",
  "Português",
  "Français",
  "العربية",
  "中文",
  "हिंदी",
  "Kiswahili",
  "Deutsch",
  "Italiano",
];

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Journey",
    links: STAGES.map((s) => ({ label: s.name, href: `/journey/${s.slug}` })),
  },
  {
    heading: "Researchers",
    links: [
      { label: "Trainees", href: "/researchers/trainees" },
      { label: "Investigators", href: "/researchers/investigators" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Institutions",
    links: [
      { label: "Overview", href: "/institutions" },
      { label: "For grants offices", href: "/institutions/grants-offices" },
      { label: "What leaders see", href: "/institutions/what-leaders-see" },
      { label: "Request a demo", href: "/institutions/demo" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "How grant review works", href: "/resources/how-grant-review-works" },
      { label: "Glossary", href: "/resources/glossary" },
      { label: "Guides", href: "/resources/guides" },
      { label: "FAQ", href: "/resources/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "The reviewer behind EQUITAS", href: "/about/reviewer" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Accessibility", href: "/legal/accessibility" },
  { label: "Data and security", href: "/legal/data-security" },
];

export function SiteFooter() {
  return (
    <footer className="bg-band text-band-muted">
      <div className="mx-auto w-full max-w-[1180px] px-6 py-[clamp(56px,7vw,80px)] md:px-10">
        <div className="mb-12 flex flex-col gap-5 border-b border-band-line pb-10 sm:flex-row sm:items-end sm:justify-between">
          <Logo dark />
          <p className="max-w-[16ch] text-[clamp(22px,2.2vw,28px)] font-light leading-[1.15] tracking-[-0.03em] text-band-ink">
            Every Researcher Deserves the Infrastructure
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="mb-4 text-[12px] font-normal uppercase leading-none tracking-[0.14em] text-gold-on-band">
                {col.heading}
              </p>
              <ul className="flex list-none flex-col gap-2.5 p-0">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[14px] no-underline hover:text-band-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-band-line pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 [Legal entity name]. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <label htmlFor="footer-lang" className="sr-only">
              Language
            </label>
            <select
              id="footer-lang"
              defaultValue="English"
              className="rounded-md border border-band-line bg-transparent px-2 py-1.5 text-[13px] text-band-ink"
            >
              {LANGUAGES.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {LEGAL.map((item, i) => (
                <span key={item.href} className="inline-flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-band-line">
                      ·
                    </span>
                  )}
                  <Link href={item.href} className="no-underline hover:text-band-ink">
                    {item.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
