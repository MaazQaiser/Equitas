import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { MODULE_META, PLANS, hasModule, type ModuleId } from "../lib/plans";
import { requestEquity, setBillingAnnual, signInPreset, signUp, useSession } from "../lib/session";
import { marketingUrl } from "../lib/sites";
import { Badge, Button, Card, Field, Page, inputClass } from "../components/ui";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEXT_KEY = "equitas-next";

function rememberNext(next: string | null) {
  if (next && next.startsWith("/")) sessionStorage.setItem(NEXT_KEY, next);
}

export function peekNext(fallback = "/dashboard") {
  const n = sessionStorage.getItem(NEXT_KEY);
  return n && n.startsWith("/") ? n : fallback;
}

export function clearNext() {
  sessionStorage.removeItem(NEXT_KEY);
}

export function takeNext(fallback = "/dashboard") {
  const n = sessionStorage.getItem(NEXT_KEY);
  sessionStorage.removeItem(NEXT_KEY);
  return n && n.startsWith("/") ? n : fallback;
}

/** `/` is not a page of its own: signed-in users go to their dashboard, everyone else to the marketing home. */
export function RootRedirect() {
  const { user } = useSession();
  useEffect(() => {
    if (!user) window.location.replace(marketingUrl("/"));
  }, [user]);
  if (user) return <Navigate to={user.isFounder ? "/dashboard/ceo" : "/dashboard"} replace />;
  return null;
}

function PasswordInput({
  value,
  onChange,
  autoComplete,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  autoComplete: string;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        {...rest}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder="At least 8 characters"
        className={`${inputClass} pr-20`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-pressed={show}
        className="absolute right-1 top-1/2 min-h-9 -translate-y-1/2 rounded-[6px] px-3 text-[13px] text-muted hover:text-ink"
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
}

function AuthCard({ children }: { children: ReactNode }) {
  return <Card className="p-6 md:p-8">{children}</Card>;
}

const PRESETS = [
  ["trial", "Researcher on a free trial", "1 day left, full access"],
  ["free", "Researcher on the Free plan", "Shows locked tools"],
  ["investigator", "Investigator plan", "Paid, most review tools"],
  ["grace", "Trial just ended", "48 hour grace period"],
  ["suspended", "Trial expired", "Plan wall"],
  ["institutional", "Invited by an institution", "No pricing shown"],
  ["founder", "Founder", "CEO dashboard only"],
] as const;

export function SignInPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const signedOut = params.get("signedOut") === "1";

  useEffect(() => rememberNext(params.get("next")), [params]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address, like you@university.edu.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 8) next.password = "Passwords are at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    signUp(email.trim(), email.split("@")[0]);
    navigate("/post-auth");
  }

  function go(kind: (typeof PRESETS)[number][0]) {
    signInPreset(kind);
    navigate("/post-auth");
  }

  return (
    <Page narrow title="Sign in" lede="Welcome back. Pick up where you left off.">
      {signedOut ? (
        <p role="status" className="mb-4 rounded-[8px] bg-bg-2 px-4 py-3 text-[14px]">
          You have signed out.
        </p>
      ) : null}
      <AuthCard>
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@university.edu"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <div>
            <Field label="Password" error={errors.password}>
              <PasswordInput autoComplete="current-password" value={password} onChange={setPassword} />
            </Field>
            <p className="mt-2 text-right text-[13px]">
              <Link to="/forgot-password" className="text-gold-text underline underline-offset-2">
                Forgot password?
              </Link>
            </p>
          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <p className="mt-6 text-center text-[14px] text-muted">
          New to EQUITAS?{" "}
          <Link to="/sign-up" className="font-medium text-ink underline underline-offset-2">
            Create an account
          </Link>
        </p>
      </AuthCard>

      <details id="demo" className="mt-6 rounded-[16px] border border-dashed border-line-2 p-5" open={window.location.hash === "#demo"}>
        <summary className="cursor-pointer text-[15px] font-medium">
          Try a demo account <Badge tone="muted">Prototype</Badge>
        </summary>
        <p className="mt-2 text-[14px] text-muted">Each one opens the app in a different account state. Nothing is saved after you close the tab.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {PRESETS.map(([k, label, note]) => (
            <li key={k}>
              <button
                type="button"
                className="flex min-h-14 w-full flex-col items-start justify-center rounded-[10px] border border-line bg-surface px-3 py-2 text-left hover:border-gold"
                onClick={() => go(k)}
              >
                <span className="text-[14px] font-medium">{label}</span>
                <span className="text-[12px] text-muted">{note}</span>
              </button>
            </li>
          ))}
        </ul>
      </details>
    </Page>
  );
}

export function SignUpPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => rememberNext(params.get("next")), [params]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address, like you@university.edu.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    signUp(email.trim(), name.trim());
    navigate("/post-auth");
  }

  return (
    <Page narrow title="Create your account" lede="Free for 14 days with full access. No card needed.">
      <AuthCard>
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <Field label="Full name" error={errors.name}>
            <input autoComplete="name" placeholder="Your full name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Work email" hint="Use your university or institute email if you have one." error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@university.edu"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label="Password" hint="At least 8 characters." error={errors.password}>
            <PasswordInput autoComplete="new-password" value={password} onChange={setPassword} />
          </Field>
          <Button type="submit" className="w-full">
            Create account
          </Button>
          <p className="text-center text-[13px] text-muted">
            By creating an account you agree to the{" "}
            <a className="underline underline-offset-2" href={marketingUrl("/legal/terms")}>
              Terms
            </a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href={marketingUrl("/legal/privacy")}>
              Privacy Policy
            </a>
            .
          </p>
        </form>
        <p className="mt-6 border-t border-line pt-5 text-center text-[14px] text-muted">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium text-ink underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </AuthCard>
    </Page>
  );
}

export function ForgotPasswordPage() {
  return (
    <Page narrow title="Reset your password" lede="Password reset is not built yet in this early version.">
      <AuthCard>
        <p className="text-[15px] text-muted">
          Sign in with the password you chose, or create a new account with the same email. We are adding email reset before launch.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button to="/sign-in">Back to sign in</Button>
          <Button to="/sign-up" variant="ghost">
            Create an account
          </Button>
        </div>
      </AuthCard>
    </Page>
  );
}

const TOOL_GROUPS: { stage: string; modules: ModuleId[] }[] = [
  { stage: "Imagine", modules: ["funding_discovery"] },
  { stage: "Design", modules: ["compliance"] },
  { stage: "Compete", modules: ["gsn", "opening_statement", "gap_analysis", "equity", "pre_award", "trainee_gra", "k_award", "international", "budget"] },
  { stage: "Review", modules: ["study_section", "resubmission", "mentor_chat"] },
  { stage: "Manage", modules: ["post_award", "subaward"] },
  { stage: "Learn and get support", modules: ["learning_center", "mentor_hub"] },
  { stage: "Institution", modules: ["institutional"] },
];

const TOOL_BLURBS: Partial<Record<ModuleId, string>> = {
  funding_discovery: "Find what has already been funded in your area, and who funded it.",
  compliance: "Get IRB, human subjects and policy questions answered in plain language.",
  gsn: "Move one application through eight stages, from setup to submitted.",
  opening_statement: "Make the first page show the question, the stakes and the approach.",
  gap_analysis: "Find the assumptions and weak links a skeptical reader will notice.",
  equity: "Check who is included, who is missing, and which barriers are named.",
  pre_award: "Track the tasks between a good score and the award notice.",
  trainee_gra: "Everything an F31, F32 or T32 application needs, written for a first-time applicant.",
  k_award: "Plan the steps when an award moves between institutions.",
  international: "Apply to ERC, Wellcome and other non-US funders, with each one's conventions explained.",
  budget: "Build and monitor a grant budget that survives review and audit.",
  study_section: "See the score your application would get and the discussion behind it.",
  resubmission: "Work out why it was not funded and what to change before the A1.",
  mentor_chat: "Ask how a specific kind of reviewer would read your draft.",
  post_award: "Keep RPPR reports, no-cost extensions and progress reporting on schedule.",
  subaward: "Track subawards, subcontracts and invoices across collaborating sites.",
  learning_center: "Short lessons on study sections, scoring and triage.",
  mentor_hub: "Find a human mentor and keep notes from each session.",
  institutional: "See grant activity across a department. Tracking, not forecasting.",
};

export function ToolsPage() {
  const { user } = useSession();
  const [q, setQ] = useState("");
  const [onlyMine, setOnlyMine] = useState(false);
  if (!user) return null;
  const query = q.trim().toLowerCase();
  const groups = TOOL_GROUPS.map((g) => ({
    ...g,
    modules: g.modules.filter((m) => {
      const meta = MODULE_META[m];
      const text = `${meta.name} ${TOOL_BLURBS[m] ?? ""}`.toLowerCase();
      if (query && !text.includes(query)) return false;
      if (onlyMine && !hasModule(user.plan, user.accessState, m)) return false;
      return true;
    }),
  })).filter((g) => g.modules.length);

  return (
    <Page title="All tools" lede="Grouped by where you are in the research journey. Tools outside your plan are marked.">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Field label="Search tools">
            <input
              type="search"
              placeholder="Try “budget”, “resubmission” or “K award”"
              className={inputClass}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </Field>
        </div>
        <label className="flex min-h-11 items-center gap-2 text-[14px]">
          <input type="checkbox" className="h-4 w-4" checked={onlyMine} onChange={(e) => setOnlyMine(e.target.checked)} />
          Only show tools on my plan
        </label>
      </div>
      {groups.length === 0 ? (
        <Card>
          <p className="text-muted">No tools match “{q}”. Try a shorter word.</p>
        </Card>
      ) : (
        <div className="space-y-10">
          {groups.map((g) => (
            <section key={g.stage} aria-labelledby={`stage-${g.stage}`}>
              <h2 id={`stage-${g.stage}`} className="mb-4 text-[22px]">
                {g.stage}
              </h2>
              <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {g.modules.map((m) => {
                  const locked = !hasModule(user.plan, user.accessState, m);
                  return (
                    <li key={m}>
                      <Link
                        to={MODULE_META[m].path}
                        className="flex h-full flex-col rounded-[14px] border border-line bg-surface p-4 no-underline transition-colors hover:border-gold"
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="text-[16px] font-medium">{MODULE_META[m].name}</span>
                          {locked ? <Badge tone="muted">Not on your plan</Badge> : null}
                        </span>
                        <span className="mt-2 text-[14px] leading-[1.5] text-muted">{TOOL_BLURBS[m]}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Page>
  );
}

export function PricingPage() {
  const { billingAnnual, user } = useSession();
  useEffect(() => {
    if (!user) window.location.replace(marketingUrl("/pricing"));
  }, [user]);
  if (!user) return null;
  if (user.invitedInstitutional) {
    return (
      <Page narrow title="Your institution covers your access" lede="You were invited by your institution, so there is nothing to buy.">
        <Button to="/dashboard">Go to my dashboard</Button>
      </Page>
    );
  }
  return (
    <Page
      title="Plans and pricing"
      lede="Every plan starts with a 14-day free trial. Amounts are in U.S. dollars."
      actions={
        <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-surface p-1 text-[14px]">
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={(p === "annual") === billingAnnual}
              onClick={() => setBillingAnnual(p === "annual")}
              className={`min-h-9 rounded-full px-4 ${((p === "annual") === billingAnnual) ? "bg-band text-band-ink" : "text-muted"}`}
            >
              {p === "monthly" ? "Monthly" : "Annual"}
            </button>
          ))}
        </div>
      }
    >
      <PlanGrid annual={billingAnnual} cta={<Button to="/dashboard/plans">Manage my plan</Button>} />
      <EquityAccessCard />
    </Page>
  );
}

export function PlanGrid({ annual, cta }: { annual: boolean; cta?: ReactNode }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {PLANS.map((p) => (
        <li key={p.id}>
          <Card className={`h-full ${p.recommended ? "ring-2 ring-gold" : ""}`}>
            {p.recommended ? <Badge>Most chosen</Badge> : null}
            <h2 className="mt-2 text-[24px]">{p.name}</h2>
            <p className="mt-2 text-[22px]">
              {p.monthly == null ? "Custom" : annual ? `$${p.monthly * 10} / year` : p.price}
            </p>
            {annual && p.monthly ? <p className="text-[13px] text-muted">Two months free on annual</p> : null}
            <p className="mt-3 text-[14px] text-muted">
              {p.modules.length} tools · {p.perspectives.length} reviewer perspectives · {p.chatCap} conversations a month
            </p>
            {cta ? <div className="mt-5">{cta}</div> : null}
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function EquityAccessCard() {
  const { user } = useSession();
  const [email, setEmail] = useState(user?.email ?? "");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState<{ email?: string; country?: string }>({});
  const [done, setDone] = useState(false);
  return (
    <Card className="mt-8">
      <h2 className="text-[24px]">Equity Access</h2>
      <p className="mt-2 max-w-[60ch] text-[15px] text-muted">
        For researchers in lower-resource settings. Tell us where you work and we will review your request by hand.
      </p>
      {done ? (
        <p role="status" className="mt-4 text-[15px]">
          Request sent. We will email you after review.
        </p>
      ) : (
        <form
          noValidate
          className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-start"
          onSubmit={(e) => {
            e.preventDefault();
            const next: typeof errors = {};
            if (!EMAIL_RE.test(email.trim())) next.email = "Enter a valid email address.";
            if (!country.trim()) next.country = "Enter the country where you work.";
            setErrors(next);
            if (Object.keys(next).length) return;
            requestEquity(email.trim(), country.trim());
            setDone(true);
          }}
        >
          <Field label="Email" error={errors.email}>
            <input type="email" autoComplete="email" placeholder="you@university.edu" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Country where you work" error={errors.country}>
            <input autoComplete="country-name" placeholder="e.g. Kenya" className={inputClass} value={country} onChange={(e) => setCountry(e.target.value)} />
          </Field>
          <div className="md:pt-[30px]">
            <Button type="submit">Request Equity Access</Button>
          </div>
        </form>
      )}
    </Card>
  );
}

export function LegalPage({ title }: { title: string }) {
  const path = title.toLowerCase().includes("privacy") ? "/legal/privacy" : "/legal/terms";
  useEffect(() => window.location.replace(marketingUrl(path)), [path]);
  return null;
}

export function ParkedPage({ name }: { name: string }) {
  return (
    <Page narrow eyebrow="Older standalone page" title={name} lede="This page is from an earlier version of EQUITAS. It is kept for reference and is not linked from the menus.">
      <Button href={marketingUrl("/")}>Go to the EQUITAS website</Button>
    </Page>
  );
}
