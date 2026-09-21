"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
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

export function SiteHeader() {
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileJourneyOpen, setMobileJourneyOpen] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setJourneyOpen(false);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (journeyRef.current && !journeyRef.current.contains(e.target as Node)) {
        setJourneyOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header className="font-outfit sticky top-0 z-50 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center gap-8 px-6 py-3.5 md:px-10">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 text-[14px] tracking-[-0.01em] lg:flex">
          <div ref={journeyRef} className="relative">
            <button
              type="button"
              aria-expanded={journeyOpen}
              aria-controls="journey-menu"
              onClick={() => setJourneyOpen((v) => !v)}
              className="rounded-sm py-1 hover:text-muted aria-expanded:text-ink"
            >
              Your research journey
            </button>
            {journeyOpen && (
              <div
                id="journey-menu"
                className="menu-in absolute left-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 rounded-2xl border border-line bg-surface p-4 shadow-card"
              >
                <p className="px-2 pb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-text">
                  Six stages, honestly labelled
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {STAGES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/journey/${s.slug}`}
                      onClick={() => setJourneyOpen(false)}
                      className="flex flex-col gap-1 rounded px-3 py-2.5 no-underline hover:bg-bg-2"
                    >
                      <span className="font-display text-[18px]">{s.name}</span>
                      <span className="text-[12.5px] leading-snug text-muted">{s.promise}</span>
                      <StatusBadge status={s.status} />
                    </Link>
                  ))}
                </div>
                <div className="mt-3 border-t border-line pt-3 px-2">
                  <Link
                    href="/journey"
                    onClick={() => setJourneyOpen(false)}
                    className="text-[13.5px] font-bold text-gold-text no-underline hover:underline"
                  >
                    See the whole journey →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link className="rounded-sm py-1 no-underline hover:text-muted" href="/researchers/trainees">
            For researchers
          </Link>
          <Link className="rounded-sm py-1 no-underline hover:text-muted" href="/institutions">
            For institutions
          </Link>
          <Link className="rounded-sm py-1 no-underline hover:text-muted" href="/pricing">
            Pricing
          </Link>
          <Link className="rounded-sm py-1 no-underline hover:text-muted" href="/resources">
            Learn
          </Link>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-5 text-[14px]">
          <Link href="/signin" className="hidden no-underline hover:text-muted lg:inline">
            Sign in
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-band px-4 text-[15px] text-band-ink no-underline ring-1 ring-band-line hover:bg-band-2"
          >
            Create free account
          </Link>
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex rounded border border-line-2 px-3 py-2.5 text-[13px] lg:hidden"
          >
            Menu
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-0 top-[68px] z-50 overflow-y-auto bg-bg lg:hidden"
        >
          <nav className="flex flex-col">
            <div className="border-b border-line">
              <button
                type="button"
                aria-expanded={mobileJourneyOpen}
                onClick={() => setMobileJourneyOpen((v) => !v)}
                className="flex min-h-[44px] w-full items-center justify-between px-4 py-4 text-left text-[16px]"
              >
                Your research journey
                <span aria-hidden="true">{mobileJourneyOpen ? "−" : "+"}</span>
              </button>
              {mobileJourneyOpen && (
                <div className="bg-bg-2 pb-2">
                  {STAGES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/journey/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[44px] flex-col justify-center gap-1 px-6 py-3 no-underline"
                    >
                      <span className="text-[15px] font-semibold">{s.name}</span>
                      <StatusBadge status={s.status} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {[
              ["For researchers", "/researchers/trainees"],
              ["For institutions", "/institutions"],
              ["Pricing", "/pricing"],
              ["Learn", "/resources"],
              ["Sign in", "/signin"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[44px] items-center border-b border-line px-4 py-4 text-[16px] no-underline"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-line px-4 py-5">
            <label htmlFor="mobile-lang" className="mb-2 block text-[12px] font-bold uppercase tracking-[0.1em] text-muted">
              Language
            </label>
            <select id="mobile-lang" className="w-full rounded border border-line-2 bg-surface px-3 py-3 text-[15px]">
              {LANGUAGES.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
}
