import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import type { PlanId } from "../lib/plans";
import { completeOnboarding, requestEquity, updateUser, useSession, type RoleId } from "../lib/session";
import { Button, Card, Page } from "../components/ui";
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
    <nav aria-label="Setup progress" className="mb-6">
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
    <Page narrow title="What brings you to EQUITAS?" lede="Pick the one closest to you. It decides which tools we show first. You can change it later.">
      <Steps current={1} />
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
      <div className="mt-8">
        <Button
          onClick={() => {
            sessionStorage.setItem("equitas-onboard-role", role);
            navigate("/onboard/plan");
          }}
        >
          Continue
        </Button>
      </div>
    </Page>
  );
}

export function OnboardPlanPage() {
  const navigate = useNavigate();
  const { user } = useSession();
  if (!user) return <Navigate to="/sign-in" replace />;

  function finish(plan: PlanId, trial: boolean) {
    const role = (sessionStorage.getItem("equitas-onboard-role") as RoleId) || "preparing";
    completeOnboarding(role, plan, trial);
    navigate("/onboard/preferences");
  }

  return (
    <Page title="How would you like to start?" lede="Most people start with the free trial. You will not be charged when it ends unless you choose a plan.">
      <div className="max-w-[560px]">
        <Steps current={2} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="ring-2 ring-gold">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold-text">Recommended</p>
          <h2 className="mt-2 text-[24px]">Free trial</h2>
          <p className="mt-2 text-[15px] text-muted">14 days with every tool and reviewer perspective. No card needed.</p>
          <div className="mt-5">
            <Button onClick={() => finish("free", true)}>Start trial</Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-[24px]">Subscribe now</h2>
          <p className="mt-2 text-[15px] text-muted">Start on the Investigator plan at $199 a month. Checkout is a demo here.</p>
          <div className="mt-5">
            <Button variant="ghost" onClick={() => finish("investigator", false)}>
              Subscribe
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-[24px]">Equity Access</h2>
          <p className="mt-2 text-[15px] text-muted">For lower-resource settings. We review each request by hand. Your trial starts while you wait.</p>
          <div className="mt-5">
            <Button
              variant="ghost"
              onClick={() => {
                requestEquity(user.email, "Not given");
                finish("free", true);
              }}
            >
              Request Equity Access
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}

export function OnboardPreferencesPage() {
  const { user } = useSession();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/sign-in" replace />;

  return (
    <Page narrow title="What should we email you about?" lede="You can change these any time in Settings.">
      <Steps current={3} />
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
        <div className="mt-6">
          <Button onClick={() => navigate(takeNext())}>Go to my dashboard</Button>
        </div>
      </Card>
    </Page>
  );
}
