import { useState } from "react";
import { PLANS, planById, type PlanId } from "../lib/plans";
import {
  cancelPlan,
  defaultPersona,
  setBillingAnnual,
  setLanguage,
  setPlan,
  setTheme,
  trialDaysLeft,
  updateUser,
  useSession,
  type RoleId,
} from "../lib/session";
import { Badge, Button, Card, Field, Honesty, Page, formatDate, inputClass } from "../components/ui";
import { EquityAccessCard } from "./PublicPages";
import { marketingUrl } from "../lib/sites";

const ACCESS_LABEL: Record<string, string> = {
  trial: "Free trial",
  grace: "Trial ended, grace period",
  suspended: "Trial expired",
  paid: "Active",
  signed_out: "Signed out",
};

export function PlansPage() {
  const { user, billingAnnual } = useSession();
  const [checkout, setCheckout] = useState<PlanId | null>(null);
  const [justPaid, setJustPaid] = useState<string>("");

  if (!user) return null;

  if (user.invitedInstitutional) {
    return (
      <Page narrow title="Your institution covers your access" lede="You were invited by your institution, so there is nothing to buy or manage here.">
        <Button to="/dashboard">Go to my dashboard</Button>
      </Page>
    );
  }

  if (checkout) {
    const plan = planById(checkout);
    return (
      <Page narrow eyebrow="Checkout" title={`Subscribe to ${plan.name}`} lede="This is a demo checkout. No card is charged.">
        <Card>
          <dl className="divide-y divide-line text-[15px]">
            <div className="flex justify-between py-2.5">
              <dt className="text-muted">Plan</dt>
              <dd className="m-0">{plan.name}</dd>
            </div>
            <div className="flex justify-between py-2.5">
              <dt className="text-muted">Billed</dt>
              <dd className="m-0">{billingAnnual && plan.monthly ? `$${plan.monthly * 10} a year` : plan.price}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button
              onClick={() => {
                setPlan(checkout);
                setJustPaid(plan.name);
                setCheckout(null);
              }}
            >
              Confirm payment
            </Button>
            <Button variant="ghost" onClick={() => setCheckout(null)}>
              Back to plans
            </Button>
          </div>
        </Card>
      </Page>
    );
  }

  const current = planById(user.plan);
  const days = trialDaysLeft(user);
  const status =
    user.accessState === "trial"
      ? `You are on a free trial with full access${days !== null ? ` for ${days <= 1 ? "1 more day" : `${days} more days`}` : ""}.`
      : `You are on the ${current.name} plan.`;

  return (
    <Page
      eyebrow="Plans and billing"
      title="Choose your plan"
      lede={status}
      actions={
        <div role="group" aria-label="Billing period" className="inline-flex rounded-full border border-line bg-surface p-1 text-[14px]">
          {(["monthly", "annual"] as const).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={(p === "annual") === billingAnnual}
              onClick={() => setBillingAnnual(p === "annual")}
              className={`min-h-9 rounded-full px-4 ${(p === "annual") === billingAnnual ? "bg-band text-band-ink" : "text-muted"}`}
            >
              {p === "monthly" ? "Monthly" : "Annual"}
            </button>
          ))}
        </div>
      }
    >
      {justPaid ? (
        <p role="status" className="mb-6 rounded-[10px] bg-gold/15 px-4 py-3 text-[15px]">
          You are now on the {justPaid} plan. New tools are unlocked.
        </p>
      ) : null}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLANS.map((p) => {
          const isCurrent = user.plan === p.id && user.accessState === "paid";
          return (
            <li key={p.id}>
              <Card className={`flex h-full flex-col ${p.recommended ? "ring-2 ring-gold" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-[24px]">{p.name}</h2>
                  {isCurrent ? <Badge>Current plan</Badge> : p.recommended ? <Badge tone="muted">Most chosen</Badge> : null}
                </div>
                <p className="mt-2 text-[22px]">{p.monthly == null ? "Custom" : billingAnnual ? `$${p.monthly * 10} / year` : p.price}</p>
                <p className="mt-2 flex-1 text-[14px] text-muted">
                  {p.modules.length} tools · {p.perspectives.length} reviewer perspectives · {p.chatCap} conversations a month
                </p>
                <div className="mt-5">
                  {p.id === "institutional" ? (
                    <Button href={marketingUrl("/institutions/demo")} variant="ghost">
                      Talk to us
                    </Button>
                  ) : isCurrent ? (
                    <Button variant="ghost" disabled>
                      Your current plan
                    </Button>
                  ) : (
                    <Button onClick={() => setCheckout(p.id)} variant={p.recommended ? "primary" : "ghost"}>
                      {p.monthly === 0 ? "Switch to Free" : `Upgrade to ${p.name}`}
                    </Button>
                  )}
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
      <EquityAccessCard />
    </Page>
  );
}

export function MyProfilePage() {
  const { user } = useSession();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  if (!user) return null;
  const plan = planById(user.plan);

  return (
    <Page narrow title="My profile" lede="Your account and billing.">
      <Card>
        <dl className="divide-y divide-line text-[15px]">
          {(
            [
              ["Name", user.name],
              ["Email", user.email],
              ["Plan", user.accessState === "trial" ? "Free trial" : plan.name],
              ["Status", ACCESS_LABEL[user.accessState]],
              ...(user.trialEndsAt ? ([["Trial ends", formatDate(user.trialEndsAt)]] as [string, string][]) : []),
            ] as [string, string][]
          ).map(([k, v]) => (
            <div key={k} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr]">
              <dt className="text-muted">{k}</dt>
              <dd className="m-0 break-words">{v}</dd>
            </div>
          ))}
        </dl>
        {user.invitedInstitutional ? (
          <div className="mt-4">
            <Honesty>Covered by your institution</Honesty>
          </div>
        ) : (
          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            <Button to="/dashboard/plans">Change plan</Button>
            {user.plan !== "free" && !confirmCancel ? (
              <Button variant="danger" onClick={() => setConfirmCancel(true)}>
                Cancel subscription
              </Button>
            ) : null}
          </div>
        )}
        {confirmCancel ? (
          <div role="alertdialog" aria-labelledby="cancel-title" className="mt-4 rounded-[12px] border border-danger/40 p-4">
            <p id="cancel-title" className="text-[15px] font-medium">
              Cancel your {plan.name} plan?
            </p>
            <p className="mt-1 text-[14px] text-muted">You will move to the Free plan. Your workspaces stay saved, but some tools will lock.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="danger"
                onClick={() => {
                  cancelPlan();
                  setConfirmCancel(false);
                  setCancelled(true);
                }}
              >
                Yes, cancel
              </Button>
              <Button variant="ghost" onClick={() => setConfirmCancel(false)}>
                Keep my plan
              </Button>
            </div>
          </div>
        ) : null}
        {cancelled ? (
          <p role="status" className="mt-4 text-[14px]">
            Your plan is cancelled. You are now on Free.
          </p>
        ) : null}
      </Card>
    </Page>
  );
}

const ROLES: RoleId[] = ["preparing", "k_award", "fellowship", "t32pd", "active_pi", "institutional"];
const LANGS = ["English", "Español", "Português", "Français", "العربية", "中文", "हिंदी", "Kiswahili", "Deutsch", "Italiano"];

export function SettingsPage() {
  const { user, theme, language } = useSession();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const flash = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Page narrow title="Settings" lede="Changes save as you make them.">
      <p aria-live="polite" className="sr-only">
        {saved ? "Saved" : ""}
      </p>
      <div className="space-y-4">
        <Card>
          <h2 className="text-[20px]">Your tools</h2>
          <div className="mt-4">
            <Field label="I am mainly a" hint="This decides which tools appear first on your home page.">
              <select
                className={inputClass}
                value={user.role}
                onChange={(e) => {
                  const role = e.target.value as RoleId;
                  updateUser({ role, persona: defaultPersona(role) });
                  flash();
                }}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {defaultPersona(r)}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Card>
        <Card>
          <h2 className="text-[20px]">Display</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Theme">
              <select
                className={inputClass}
                value={theme}
                onChange={(e) => {
                  setTheme(e.target.value as "light" | "dark");
                  flash();
                }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </Field>
            <Field label="Language" hint="Only English text is ready. Arabic switches the layout to right-to-left.">
              <select
                className={inputClass}
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  flash();
                }}
              >
                {LANGS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
          </div>
        </Card>
        <Card>
          <h2 className="text-[20px]">Email notifications</h2>
          <fieldset className="mt-3 space-y-1">
            <legend className="sr-only">Email notifications</legend>
            {(
              [
                ["deadlines", "Deadline reminders"],
                ["tips", "Writing tips"],
                ["product", "Product updates"],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px]">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#B39952]"
                  checked={user.notifications[k]}
                  onChange={(e) => {
                    updateUser({ notifications: { ...user.notifications, [k]: e.target.checked } });
                    flash();
                  }}
                />
                {label}
              </label>
            ))}
          </fieldset>
        </Card>
      </div>
      {saved ? (
        <p className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-band px-4 py-2 text-[14px] text-band-ink shadow-card">
          Saved
        </p>
      ) : null}
    </Page>
  );
}
