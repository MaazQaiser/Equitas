"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { StatusBadge } from "@/components/StatusBadge";
import { STAGES } from "@/lib/content";

const OPEN_MS = 150;
const CLOSE_MS = 250;

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

const LEARN = [
  { label: "How grant review works", href: "/resources/how-grant-review-works" },
  { label: "Guides", href: "/resources/guides" },
  { label: "FAQ", href: "/resources/faq" },
];

const NAV_LINK =
  "border-b border-transparent py-1 no-underline hover:border-gold";

type MenuId = "journey" | "learn";

export function SiteHeader({
  current,
  ctaHref = "/onboarding",
  ctaLabel = "Create free account",
}: {
  current?: "institutions" | "researchers" | "learn" | "pricing";
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const onInstitutions = current === "institutions";
  const onResearchers = current === "researchers";
  const onLearn = current === "learn";
  const onPricing = current === "pricing";
  const [open, setOpen] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileJourneyOpen, setMobileJourneyOpen] = useState(false);
  const [mobileLearnOpen, setMobileLearnOpen] = useState(false);

  const openTimer = useRef<number>(0);
  const closeTimer = useRef<number>(0);
  const journeyBtnRef = useRef<HTMLButtonElement>(null);
  const learnBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const stageLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const learnLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  function clearTimers() {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }

  function intend(id: MenuId) {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    if (open === id) return;
    openTimer.current = window.setTimeout(() => setOpen(id), OPEN_MS);
  }

  function intendClose() {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_MS);
  }

  function toggle(id: MenuId, fromMouseClick: boolean) {
    clearTimers();
    if (fromMouseClick && open === id) return;
    setOpen((current) => (current === id ? null : id));
  }

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        mobileBtnRef.current?.focus();
        return;
      }
      if (open === "journey") {
        e.preventDefault();
        setOpen(null);
        journeyBtnRef.current?.focus();
      } else if (open === "learn") {
        e.preventDefault();
        setOpen(null);
        learnBtnRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      const target = e.target as Node;
      const header = document.getElementById("site-header");
      if (header && !header.contains(target)) setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open, mobileOpen]);

  function moveFocus(
    event: React.KeyboardEvent,
    refs: React.MutableRefObject<(HTMLAnchorElement | null)[]>,
    startFromButton: boolean,
  ) {
    const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const links = refs.current.filter((node): node is HTMLAnchorElement => node !== null);
    if (links.length === 0) return;
    event.preventDefault();
    const current = links.findIndex((node) => node === document.activeElement);
    let next = current;
    if (event.key === "Home" || (startFromButton && current < 0 && (event.key === "ArrowDown" || event.key === "ArrowRight"))) {
      next = 0;
    } else if (event.key === "End") {
      next = links.length - 1;
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = current < 0 ? 0 : (current + 1) % links.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = current < 0 ? links.length - 1 : (current - 1 + links.length) % links.length;
    }
    links[next]?.focus();
  }

  function onClusterBlur(event: React.FocusEvent<HTMLElement>, id: MenuId) {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setOpen((current) => (current === id ? null : current));
    }
  }

  return (
    <header id="site-header" className="font-outfit sticky top-0 z-50 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-[1320px] items-center gap-3 px-4 py-3.5 sm:gap-8 sm:px-6 md:px-10">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-7 text-[14px] tracking-[-0.01em] lg:flex">
          <div
            onMouseEnter={() => intend("journey")}
            onMouseLeave={intendClose}
            onBlur={(event) => onClusterBlur(event, "journey")}
            onKeyDown={(event) => open === "journey" && moveFocus(event, stageLinkRefs, true)}
          >
            <button
              ref={journeyBtnRef}
              type="button"
              aria-expanded={open === "journey"}
              aria-controls="journey-menu"
              aria-haspopup="true"
              onClick={(event) => toggle("journey", event.detail > 0)}
              className={`${NAV_LINK} ${open === "journey" ? "border-gold" : ""}`}
            >
              Your research journey
            </button>
            {open === "journey" && (
              <div
                id="journey-menu"
                className="menu-in absolute top-full z-50 hidden border-t border-line bg-surface shadow-card lg:block"
                style={{ left: "50%", width: "100vw", marginLeft: "-50vw" }}
              >
                <ul className="mx-auto m-0 grid max-w-[1180px] list-none grid-cols-6 items-stretch gap-3 px-6 py-8 md:px-10">
                  {STAGES.map((stage, i) => (
                    <li key={stage.slug} className="min-w-0">
                      <Link
                        ref={(node) => {
                          stageLinkRefs.current[i] = node;
                        }}
                        href={`/journey/${stage.slug}`}
                        onClick={() => setOpen(null)}
                        className="flex h-full flex-col rounded-xl border border-line bg-white p-4 no-underline shadow-card transition-[border-color,box-shadow] duration-200 hover:border-gold/35 hover:shadow-card-hover"
                      >
                        <span className="font-display text-[19px] leading-[1.12] tracking-[-0.03em] text-ink">
                          {stage.name}
                        </span>
                        <span className="mt-2 text-[13px] leading-snug text-muted">{stage.promise}</span>
                        <span className="mt-3">
                          <StatusBadge status={stage.status} compact />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mx-auto max-w-[1180px] border-t border-line px-6 py-4 md:px-10">
                  <Link
                    href="/journey"
                    onClick={() => setOpen(null)}
                    className="text-[13.5px] text-gold-text no-underline hover:underline"
                  >
                    See the whole journey →
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link
            className={`${NAV_LINK} ${onResearchers ? "border-gold" : ""}`}
            href="/researchers"
            aria-current={onResearchers ? "page" : undefined}
            onMouseEnter={intendClose}
          >
            For researchers
          </Link>
          <Link
            className={`${NAV_LINK} ${onInstitutions ? "border-gold" : ""}`}
            href="/institutions"
            aria-current={onInstitutions ? "page" : undefined}
            onMouseEnter={intendClose}
          >
            For institutions
          </Link>
          <Link
            className={`${NAV_LINK} ${onPricing ? "border-gold" : ""}`}
            href="/pricing"
            aria-current={onPricing ? "page" : undefined}
            onMouseEnter={intendClose}
          >
            Pricing
          </Link>
          <div
            className="relative"
            onMouseEnter={() => intend("learn")}
            onMouseLeave={intendClose}
            onBlur={(event) => onClusterBlur(event, "learn")}
            onKeyDown={(event) => open === "learn" && moveFocus(event, learnLinkRefs, true)}
          >
            <button
              ref={learnBtnRef}
              type="button"
              aria-expanded={open === "learn"}
              aria-controls="learn-menu"
              aria-haspopup="true"
              onClick={(event) => toggle("learn", event.detail > 0)}
              className={`${NAV_LINK} ${open === "learn" || onLearn ? "border-gold" : ""}`}
              aria-current={onLearn ? "true" : undefined}
            >
              Learn
            </button>
            {open === "learn" && (
              <div
                id="learn-menu"
                className="menu-in absolute left-0 top-full z-50 hidden pt-3 lg:block"
              >
                <ul className="m-0 w-[240px] list-none rounded-2xl border border-line bg-surface p-2 text-ink shadow-card">
                  {LEARN.map((item, i) => (
                    <li key={item.href}>
                      <Link
                        ref={(node) => {
                          learnLinkRefs.current[i] = node;
                        }}
                        href={item.href}
                        onClick={() => setOpen(null)}
                        className="block rounded-xl px-3 py-2.5 text-[14px] leading-snug text-ink no-underline hover:bg-bg-2"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2.5 text-[14px] sm:gap-5">
          <Link href="/signin" className="hidden no-underline hover:text-muted lg:inline">
            Sign in
          </Link>
          {ctaHref.startsWith("#") ? (
            <a
              href={ctaHref}
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[8px] bg-band px-3 text-[14px] text-band-ink no-underline ring-1 ring-band-line hover:bg-band-2 sm:px-4 sm:text-[15px]"
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-[8px] bg-band px-3 text-[14px] text-band-ink no-underline ring-1 ring-band-line hover:bg-band-2 sm:px-4 sm:text-[15px]"
            >
              {ctaLabel === "Create free account" ? (
                <>
                  <span className="min-[400px]:hidden">Start free</span>
                  <span className="hidden min-[400px]:inline">{ctaLabel}</span>
                </>
              ) : (
                ctaLabel
              )}
            </Link>
          )}
          <button
            ref={mobileBtnRef}
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              setOpen(null);
              setMobileOpen((v) => !v);
            }}
            className="inline-flex min-h-11 items-center rounded border border-line-2 px-3 text-[13px] lg:hidden"
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
                  <Link
                    href="/journey"
                    onClick={() => setMobileOpen(false)}
                    className="flex min-h-[44px] items-center px-6 py-3 text-[15px] text-gold-text no-underline"
                  >
                    See the whole journey
                  </Link>
                  {STAGES.map((stage) => (
                    <Link
                      key={stage.slug}
                      href={`/journey/${stage.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[44px] flex-col justify-center gap-1 px-6 py-3 no-underline"
                    >
                      <span className="text-[15px] font-semibold">{stage.name}</span>
                      <span className="text-[13px] leading-snug text-muted">{stage.promise}</span>
                      <StatusBadge status={stage.status} compact />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {[
              ["For researchers", "/researchers"],
              ["For institutions", "/institutions"],
              ["Pricing", "/pricing"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                aria-current={
                  (href === "/institutions" && onInstitutions) ||
                  (href === "/researchers" && onResearchers) ||
                  (href === "/pricing" && onPricing)
                    ? "page"
                    : undefined
                }
                className="flex min-h-[44px] items-center border-b border-line px-4 py-4 text-[16px] no-underline"
              >
                {label}
              </Link>
            ))}
            <div className="border-b border-line">
              <button
                type="button"
                aria-expanded={mobileLearnOpen}
                onClick={() => setMobileLearnOpen((v) => !v)}
                className="flex min-h-[44px] w-full items-center justify-between px-4 py-4 text-left text-[16px]"
              >
                Learn
                <span aria-hidden="true">{mobileLearnOpen ? "−" : "+"}</span>
              </button>
              {mobileLearnOpen && (
                <div className="bg-bg-2 pb-2">
                  {LEARN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex min-h-[44px] items-center px-6 py-3 text-[15px] no-underline"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/signin"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[44px] items-center border-b border-line px-4 py-4 text-[16px] no-underline"
            >
              Sign in
            </Link>
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
