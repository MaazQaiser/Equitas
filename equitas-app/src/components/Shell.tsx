import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  addWaitlist,
  selectWorkspace,
  setLanguage,
  setTheme,
  signOut,
  trialDaysLeft,
  useSession,
} from "../lib/session";
import { planById } from "../lib/plans";
import { marketingUrl } from "../lib/sites";
import { Button, Field, Logo, inputClass } from "./ui";

const LANGS = ["English", "Español", "Português", "Français", "العربية", "中文", "हिंदी", "Kiswahili", "Deutsch", "Italiano"];

const NAV = [
  { to: "/dashboard", label: "Home", end: true },
  { to: "/dashboard/gsn", label: "Navigator" },
  { to: "/tools", label: "All tools" },
  { to: "/dashboard/reviewer-perspectives", label: "Perspectives" },
];

export function ComingSoonBanner() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("Researcher");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address, like you@university.edu.");
      return;
    }
    addWaitlist(role, email.trim());
    setDone(true);
  }

  return (
    <div className="bg-gold px-4 text-center text-[13px] text-[#12202F]">
      <span>EQUITAS is in early access.</span>{" "}
      <button type="button" className="inline-flex min-h-8 items-center font-semibold underline underline-offset-2" onClick={() => setOpen(true)}>
        Join the early access list
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1d33]/50 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="waitlist-title" className="w-full max-w-md rounded-[16px] bg-surface p-6 text-left text-ink shadow-lg">
            <h2 id="waitlist-title" className="text-[26px]">
              Join the early access list
            </h2>
            {done ? (
              <>
                <p className="mt-3 text-[15px] text-muted">Thank you. We will email you when your place opens.</p>
                <div className="mt-6">
                  <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
              </>
            ) : (
              <form onSubmit={submit} noValidate className="mt-4 space-y-4">
                <p className="text-[15px] text-muted">We will only use your email for early access news.</p>
                <Field label="I am a">
                  <select className={inputClass} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option>Researcher</option>
                    <option>Trainee</option>
                    <option>Grants office</option>
                    <option>Institution</option>
                  </select>
                </Field>
                <Field label="Email" error={error}>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@university.edu"
                    className={inputClass}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </Field>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button type="submit">Join the list</Button>
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function AccessBanners() {
  const { user } = useSession();
  if (!user || user.isFounder) return null;
  const days = trialDaysLeft(user);

  if (user.accessState === "grace") {
    return (
      <div role="status" className="border-b border-line bg-bg-2 px-4 py-2 text-center text-[14px]">
        Your free trial has ended. Your work is saved for 48 hours. Select a plan to continue.{" "}
        <Link to="/dashboard/plans" className="font-medium text-gold-text underline underline-offset-2">
          See plans
        </Link>
      </div>
    );
  }
  if (user.accessState === "trial" && days !== null && days <= 4) {
    return (
      <div role="status" className="border-b border-line bg-bg-2 px-4 py-2 text-center text-[14px]">
        Your free trial ends in {days <= 1 ? "1 day" : `${days} days`}.{" "}
        <Link to="/dashboard/plans" className="font-medium text-gold-text underline underline-offset-2">
          Choose a plan
        </Link>
      </div>
    );
  }
  return null;
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 py-1 no-underline transition-colors ${isActive ? "border-gold text-ink" : "border-transparent text-muted hover:text-ink"}`;

export function AppShell() {
  const { user, workspaces, selectedWorkspaceId, theme, language } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (!user) return <Outlet />;

  const planName = user.isFounder ? "Founder" : user.accessState === "trial" ? "Free trial" : planById(user.plan).name;
  const home = user.isFounder ? "/dashboard/ceo" : "/dashboard";

  const workspaceSelect = (id: string, className: string) =>
    !user.isFounder && workspaces.length > 0 ? (
      <div className={className}>
        <label htmlFor={id} className="sr-only">
          Current grant workspace
        </label>
        <select
          id={id}
          className="min-h-10 w-full max-w-[240px] truncate rounded-full border border-line bg-surface px-3 text-[14px]"
          value={selectedWorkspaceId ?? ""}
          onChange={(e) => selectWorkspace(e.target.value)}
        >
          {workspaces.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>
      </div>
    ) : null;

  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ComingSoonBanner />
      <AccessBanners />
      <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center gap-4 px-4 md:px-8">
          <Logo to={home} />
          {!user.isFounder && (
            <nav aria-label="Main" className="ml-6 hidden items-center gap-6 text-[14px] lg:flex">
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={navClass}>
                  {n.label}
                </NavLink>
              ))}
            </nav>
          )}
          <div className="ml-auto flex items-center gap-2">
            {workspaceSelect("ws-desktop", "hidden md:block")}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls="account-menu"
                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3 text-[14px]"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-band text-[11px] font-medium text-band-ink"
                >
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline">{planName}</span>
                <span aria-hidden="true" className="text-[10px] text-muted">
                  ▾
                </span>
              </button>
              {menuOpen && (
                <div
                  id="account-menu"
                  className="absolute right-0 top-[calc(100%+8px)] w-[260px] rounded-[12px] border border-line bg-surface p-2 text-[14px] shadow-card"
                >
                  <div className="border-b border-line px-3 pb-3 pt-2">
                    <p className="truncate font-medium">{user.name}</p>
                    <p className="truncate text-[13px] text-muted">{user.email}</p>
                    <p className="mt-1 text-[12px] text-gold-text">{planName}</p>
                  </div>
                  <ul className="py-1">
                    {!user.isFounder && (
                      <>
                        <MenuLink to="/my-profile">My profile</MenuLink>
                        <MenuLink to="/settings">Settings</MenuLink>
                        <MenuLink to="/dashboard/plans">Plans and billing</MenuLink>
                      </>
                    )}
                    {user.isFounder && <MenuLink to="/dashboard/ceo">CEO dashboard</MenuLink>}
                    <li>
                      <a href={marketingUrl("/")} className="flex min-h-10 items-center rounded-[8px] px-3 no-underline hover:bg-bg-2">
                        Visit the EQUITAS website
                      </a>
                    </li>
                  </ul>
                  <div className="flex items-center justify-between gap-2 border-t border-line px-3 py-2">
                    <button type="button" className="min-h-10 text-[13px] text-muted hover:text-ink" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                      {theme === "light" ? "Dark theme" : "Light theme"}
                    </button>
                    <label className="sr-only" htmlFor="lang-menu">
                      Language
                    </label>
                    <select
                      id="lang-menu"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="min-h-9 rounded-[8px] border border-line bg-surface px-2 text-[13px]"
                    >
                      {LANGS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="border-t border-line pt-1">
                    <button
                      type="button"
                      className="flex min-h-10 w-full items-center rounded-[8px] px-3 text-left hover:bg-bg-2"
                      onClick={() => {
                        signOut();
                        navigate("/sign-in?signedOut=1");
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
            {!user.isFounder && (
              <button
                type="button"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className="inline-flex min-h-10 items-center rounded-[8px] border border-line-2 px-3 text-[14px] lg:hidden"
              >
                {mobileOpen ? "Close" : "Menu"}
              </button>
            )}
          </div>
        </div>
        {mobileOpen && (
          <nav id="mobile-nav" aria-label="Main" className="border-t border-line bg-bg lg:hidden">
            <ul className="mx-auto max-w-[1180px] px-4 py-2">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    end={n.end}
                    className={({ isActive }) =>
                      `flex min-h-12 items-center border-b border-line text-[16px] no-underline ${isActive ? "font-medium text-ink" : "text-muted"}`
                    }
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {workspaceSelect("ws-mobile", "mx-auto max-w-[1180px] px-4 pb-4 pt-2 md:hidden")}
          </nav>
        )}
      </header>
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

function MenuLink({ to, children }: { to: string; children: string }) {
  return (
    <li>
      <Link to={to} className="flex min-h-10 items-center rounded-[8px] px-3 no-underline hover:bg-bg-2">
        {children}
      </Link>
    </li>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-bg-2">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-[13px] text-muted md:px-8">
        <p>Every Researcher Deserves the Infrastructure</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link className="hover:text-ink" to="/privacy-policy">
            Privacy
          </Link>
          <Link className="hover:text-ink" to="/terms-of-service">
            Terms
          </Link>
          <Link className="hover:text-ink" to="/contact">
            Contact
          </Link>
          <a className="hover:text-ink" href={marketingUrl("/legal/accessibility")}>
            Accessibility
          </a>
          <a className="hover:text-ink" href={marketingUrl("/")}>
            EQUITAS website
          </a>
        </nav>
      </div>
    </footer>
  );
}

/** Signed-out surfaces in the app (auth, review links). Mirrors the marketing header so the handoff feels like one product. */
export function PublicShell() {
  const { pathname } = useLocation();
  const onSignIn = pathname.startsWith("/sign-in");
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ComingSoonBanner />
      <header className="border-b border-line bg-bg">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center gap-4 px-4 md:px-8">
          <Logo />
          <nav aria-label="Account" className="ml-auto flex items-center gap-4 text-[14px] sm:gap-5">
            <a href={marketingUrl("/pricing")} className="hidden no-underline hover:text-muted sm:inline">
              Pricing
            </a>
            {onSignIn ? (
              <Button to="/sign-up">Create an account</Button>
            ) : (
              <>
                <Link to="/sign-in" className="no-underline hover:text-muted">
                  Sign in
                </Link>
                {!pathname.startsWith("/sign-up") && <Button to="/sign-up">Create an account</Button>}
              </>
            )}
          </nav>
        </div>
      </header>
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
