import type { ReactNode } from "react";
import { Link, Navigate, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { MODULE_META, PLANS, hasModule, type ModuleId } from "../lib/plans";
import { useSession } from "../lib/session";
import { Button, Card, Page } from "./ui";

export function RequireAuth() {
  const { user } = useSession();
  const location = useLocation();
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/access-required?next=${next}`} replace />;
  }
  if (user.isFounder && !location.pathname.startsWith("/dashboard/ceo")) {
    return <Navigate to="/dashboard/ceo" replace />;
  }
  const allowedWhileSuspended = ["/dashboard/plans", "/pricing", "/my-profile", "/settings"];
  if (user.accessState === "suspended" && !allowedWhileSuspended.some((p) => location.pathname.startsWith(p))) {
    return <SuspendedWall />;
  }
  if (!user.onboarded && !location.pathname.startsWith("/onboard") && location.pathname !== "/post-auth") {
    return <Navigate to="/onboard" replace />;
  }
  return <Outlet />;
}

export function FounderOnly() {
  const { user } = useSession();
  if (!user?.isFounder) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

function SuspendedWall() {
  return (
    <Page
      narrow
      title="Your trial has ended"
      lede="Choose a plan to keep using EQUITAS. Your workspaces and conversations are still saved."
    >
      <div className="flex flex-wrap gap-2">
        <Button to="/dashboard/plans">See plans</Button>
        <Button to="/my-profile" variant="ghost">
          My profile
        </Button>
      </div>
    </Page>
  );
}

export function ModuleGate({ module, children }: { module: ModuleId; children: ReactNode }) {
  const { user } = useSession();
  if (!user) return null;
  if (user.isFounder) return <>{children}</>;
  if (hasModule(user.plan, user.accessState, module)) return <>{children}</>;
  const name = MODULE_META[module].name;
  const cheapest = PLANS.find((p) => p.modules.includes(module) && p.monthly !== null);
  return (
    <Page narrow eyebrow="Not on your plan" title={`${name} is not on your plan`}>
      <Card>
        <p className="text-[15px] text-muted">
          {cheapest
            ? `${name} is included from the ${cheapest.name} plan (${cheapest.price}).`
            : `${name} is available on institutional plans.`}{" "}
          Your saved work stays where it is when you upgrade.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button to="/dashboard/plans">Compare plans</Button>
          <Button to="/tools" variant="ghost">
            See tools on my plan
          </Button>
        </div>
      </Card>
    </Page>
  );
}

function labelForPath(path: string) {
  const hit = Object.values(MODULE_META).find((m) => path.startsWith(m.path));
  return hit?.name;
}

export function AccessRequiredPage() {
  const [params] = useSearchParams();
  const next = params.get("next") ?? "";
  const target = next ? labelForPath(next) : undefined;
  const q = next ? `?next=${encodeURIComponent(next)}` : "";
  return (
    <Page
      narrow
      title={target ? `Sign in to open ${target}` : "Sign in to continue"}
      lede="This part of EQUITAS needs an account. Creating one is free for 14 days, with no card needed."
    >
      <div className="flex flex-wrap gap-3">
        <Button to={`/sign-in${q}`}>Sign in</Button>
        <Button to={`/sign-up${q}`} variant="ghost">
          Create an account
        </Button>
      </div>
      <p className="mt-6 text-[14px] text-muted">
        Just looking?{" "}
        <Link className="text-gold-text underline underline-offset-2" to={`/sign-in${q}#demo`}>
          Try a demo account
        </Link>
        .
      </p>
    </Page>
  );
}
