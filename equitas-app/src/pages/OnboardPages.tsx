import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { PlanId } from "../lib/plans";
import { completeOnboarding, requestEquity, updateUser, useSession, type RoleId } from "../lib/session";
import { Button, Card } from "../components/ui";
import { clearNext, peekNext, takeNext } from "./PublicPages";

const ROLES: { id: RoleId; title: string; blurb: string }[] = [
  { id: "preparing", title: "I am preparing a grant", blurb: "You are shaping or writing an application now." },
  { id: "fellowship", title: "I am a trainee", blurb: "First fellowship, F31, F32 or T32 application." },
  { id: "k_award", title: "I am on a K award path", blurb: "Career development award and mentor plan." },
  { id: "active_pi", title: "I run funded projects", blurb: "Active PI managing awards and resubmissions." },
  { id: "t32pd", title: "I direct a training program", blurb: "T32 program director." },
  { id: "institutional", title: "I work in a grants office", blurb: "Department or research office view." },
  { id: "other", title: "Something else", blurb: "We will start you with general tools." },
];

function Steps({ current }: { current: 1 | 2 | 3 }) {
  const labels = ["About you", "Your plan", "Notifications"];
  return (
    <nav aria-label="Setup progress" className="mt-4">
      <p className="text-[13px] text-muted">
        Step {current} of 3
      </p>
      <ol className="mt-2 flex gap-2">
        {labels.map((l, i) => (
          <li key={l} className="flex-1">
            <span
              aria-current={i + 1 === current ? "step" : undefined}
              className={`block h-1 rounded-full ${i + 1 <= current ? "bg-gold" : "bg-line"}`}
            />
            <span className={`mt-1.5 block text-[12px] ${i + 1 === current ? "text-ink" : "text-muted"}`}>{l}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Title and progress stay pinned under the app header; the action bar stays pinned to the bottom. Pinning is skipped on short or heavily zoomed viewports so content is never squeezed out. */
function OnboardFrame({
  step,
  title,
  lede,
  wide,
  footer,
  children,
}: {
  step: 1 | 2 | 3;
  title: string;
  lede: string;
  wide?: boolean;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pin = "[@media(min-height:560px)]:sticky";
  return (
    <div className={`mx-auto w-full ${wide ? "max-w-[1180px]" : "max-w-[560px]"} px-4 md:px-8`}>
      <div className={`${pin} top-[69px] z-30 -mx-4 border-b border-line bg-bg px-4 pb-4 pt-6 md:-mx-8 md:px-8 md:pt-10`}>
        <div className={wide ? "max-w-[560px]" : undefined}>
          <h1 className="text-[clamp(26px,4vw,40px)]">{title}</h1>
          <Steps current={step} />
        </div>
      </div>
      <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.55] text-muted">{lede}</p>
      <div className="mt-6 pb-8">{children}</div>
      <div className={`${pin} bottom-0 z-30 -mx-4 border-t border-line bg-bg px-4 py-4 md:-mx-8 md:px-8`}>
        <div className="flex flex-wrap-reverse items-center justify-between gap-3">{footer}</div>
      </div>
    </div>
  );
}

export function PostAuthPage() {
  const { user } = useSession();
  const ready = Boolean(user && !user.isFounder && user.onboarded);
  useEffect(() => {
    if (ready) clearNext();
  }, [ready]);
  if (!user) return <Navigate to="/sign-in" replace />;
  if (user.isFounder) return <Navigate to="/dashboard/ceo" replace />;
  if (!user.onboarded) return <Navigate to="/onboard" replace />;
  return <Navigate to={peekNext()} replace />;
}

export function OnboardRolePage() {
  const { user } = useSession();
  const navigate = useNavigate();
  const [role, setRole] = useState<RoleId>(
    (sessionStorage.getItem("equitas-onboard-role") as RoleId) || "preparing",
  );
  if (!user) return <Navigate to="/sign-in" replace />;
  if (user.isFounder) return <Navigate to="/dashboard/ceo" replace />;

  return (
    <OnboardFrame
      step={1}
      title="What brings you to EQUITAS?"
      lede="Pick the one closest to you. It decides which tools we show first. You can change it later."
      footer={
        <>
          <span />
          <Button
            onClick={() => {
              sessionStorage.setItem("equitas-onboard-role", role);
              navigate("/onboard/plan");
            }}
          >
            Continue
          </Button>
        </>
      }
    >
      <fieldset>
        <legend className="sr-only">Your role</legend>
        <div className="grid gap-3">
          {ROLES.map((r) => {
            const selected = role === r.id;
            return (
              <label
                key={r.id}
                className={`flex min-h-16 cursor-pointer items-start gap-3 rounded-[14px] border p-4 transition-colors ${
                  selected ? "border-gold bg-surface ring-1 ring-gold" : "border-line bg-surface hover:border-line-2"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r.id}
                  checked={selected}
                  onChange={() => setRole(r.id)}
                  className="mt-1 h-4 w-4 accent-[#B39952]"
                />
                <span>
                  <span className="block text-[16px] font-medium">{r.title}</span>
                  <span className="mt-0.5 block text-[14px] text-muted">{r.blurb}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </OnboardFrame>
  );
}

type StartChoice = "trial" | "subscribe" | "equity";

const START_OPTIONS: { id: StartChoice; title: string; body: string; action: string; recommended?: boolean }[] = [
  {
    id: "trial",
    title: "Free trial",
    body: "14 days with every tool and reviewer perspective. No card needed.",
    action: "Start trial",
    recommended: true,
  },
  {
    id: "subscribe",
    title: "Subscribe now",
    body: "Start on the Investigator plan at $199 a month. Checkout is a demo here.",
    action: "Subscribe",
  },
  {
    id: "equity",
    title: "Equity Access",
    body: "For lower-resource settings. We review each request by hand. Your trial starts while you wait.",
    action: "Request Equity Access",
  },
];

export function OnboardPlanPage() {
  const navigate = useNavigate();
  const { user } = useSession();
  const [choice, setChoice] = useState<StartChoice>("trial");
  if (!user) return <Navigate to="/sign-in" replace />;

  function finish(plan: PlanId, trial: boolean) {
    const role = (sessionStorage.getItem("equitas-onboard-role") as RoleId) || "preparing";
    completeOnboarding(role, plan, trial);
    navigate("/onboard/preferences");
  }

  function go() {
    if (choice === "subscribe") return finish("investigator", false);
    if (choice === "equity") requestEquity(user!.email, "Not given");
    finish("free", true);
  }

  const selected = START_OPTIONS.find((o) => o.id === choice)!;

  return (
    <OnboardFrame
      wide
      step={2}
      title="How would you like to start?"
      lede="Most people start with the free trial. You will not be charged when it ends unless you choose a plan."
      footer={
        <>
          <Button variant="ghost" to="/onboard">
            Back
          </Button>
          <Button onClick={go}>{selected.action}</Button>
        </>
      }
    >
      <fieldset>
        <legend className="sr-only">How would you like to start?</legend>
        <div className="grid gap-4 md:grid-cols-3">
          {START_OPTIONS.map((o) => {
            const on = choice === o.id;
            return (
              <label
                key={o.id}
                className={`flex cursor-pointer flex-col rounded-[16px] border bg-surface p-5 shadow-card transition-colors md:p-6 ${
                  on ? "border-gold ring-2 ring-gold" : "border-line hover:border-line-2"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="start"
                      value={o.id}
                      checked={on}
                      onChange={() => setChoice(o.id)}
                      className="h-4 w-4 accent-[#B39952]"
                    />
                    <span className="text-[22px] font-light">{o.title}</span>
                  </span>
                  {o.recommended ? (
                    <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold-text">Recommended</span>
                  ) : null}
                </span>
                <span className="mt-2 text-[15px] text-muted">{o.body}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </OnboardFrame>
  );
}

export function OnboardPreferencesPage() {
  const { user } = useSession();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/sign-in" replace />;

  return (
    <OnboardFrame
      step={3}
      title="What should we email you about?"
      lede="You can change these any time in Settings."
      footer={
        <>
          <Button variant="ghost" to="/onboard/plan">
            Back
          </Button>
          <Button onClick={() => navigate(takeNext())}>Continue</Button>
        </>
      }
    >
      <Card>
        <fieldset className="space-y-1">
          <legend className="sr-only">Email notifications</legend>
          {(
            [
              ["deadlines", "Deadline reminders", "A note before each grant deadline in your workspaces."],
              ["tips", "Writing tips", "One short tip a week on how reviewers read."],
              ["product", "Product updates", "When a new tool or stage opens."],
            ] as const
          ).map(([key, label, help]) => (
            <label key={key} className="flex min-h-14 cursor-pointer items-start gap-3 rounded-[10px] p-2 hover:bg-bg-2">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[#B39952]"
                checked={user.notifications[key]}
                onChange={(e) => updateUser({ notifications: { ...user.notifications, [key]: e.target.checked } })}
              />
              <span>
                <span className="block text-[15px] font-medium">{label}</span>
                <span className="block text-[13px] text-muted">{help}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </Card>
    </OnboardFrame>
  );
}
