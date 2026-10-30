import { Link, Navigate } from "react-router-dom";
import { MODULE_META, hasModule, type ModuleId } from "../lib/plans";
import { GSN_STAGES, useSession } from "../lib/session";
import { Badge, Button, Card, Page, daysUntil, formatDate } from "../components/ui";

const PERSONA_TILES: Record<string, ModuleId[]> = {
  "Mid-Career Investigator": ["study_section", "gsn", "mentor_chat", "gap_analysis"],
  Fellowship: ["trainee_gra", "opening_statement", "mentor_chat", "learning_center"],
  "K-Award": ["k_award", "mentor_hub", "mentor_chat", "gsn"],
  "T32 Program Director": ["trainee_gra", "institutional", "learning_center"],
  "Active PI": ["study_section", "post_award", "budget", "mentor_chat"],
  "Institutional Track": ["institutional", "pre_award", "compliance"],
};

export function DashboardHome() {
  const { user, workspaces, analyses, chats } = useSession();
  if (!user) return null;
  if (user.isFounder) return <Navigate to="/dashboard/ceo" replace />;

  const tiles = PERSONA_TILES[user.persona] ?? PERSONA_TILES["Mid-Career Investigator"];
  const empty = workspaces.length === 0;
  const next = [...workspaces].sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
  const firstName = user.name.split(" ")[0];

  return (
    <Page
      eyebrow={empty ? "Welcome" : "Today's focus"}
      title={empty ? `Welcome, ${firstName}` : `Good to see you, ${firstName}`}
      lede={
        <>
          Your tools are set for <strong className="font-medium text-ink">{user.persona}</strong>.{" "}
          <Link to="/settings" className="text-gold-text underline underline-offset-2">
            Change
          </Link>
        </>
      }
      actions={
        <div className="flex flex-wrap gap-2">
          <Button to="/search" variant="ghost">
            Search tools
          </Button>
          <Button to="/dashboard/gsn/new">{empty ? "Add your first grant" : "New grant workspace"}</Button>
        </div>
      }
    >
      {empty ? (
        <Card className="max-w-[720px]">
          <h2 className="text-[26px]">Start with one grant</h2>
          <p className="mt-2 text-[15px] text-muted">
            A workspace holds one application: its funder, mechanism and deadline. Every tool can then work from the same draft.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button to="/dashboard/gsn/new">Add your first grant</Button>
            <Button to="/tools" variant="ghost">
              Browse all tools
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <h2 className="text-[22px]">Your grants</h2>
            <ul className="mt-4 divide-y divide-line">
              {workspaces.map((w) => (
                <li key={w.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to="/dashboard/gsn" className="text-[16px] font-medium underline-offset-4 hover:underline">
                      {w.title}
                    </Link>
                    <span className="text-[13px] text-muted">
                      Due {formatDate(w.deadline)} · {daysUntil(w.deadline)}
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] text-muted">
                    {w.funder} {w.mechanism} · {w.ic} · {w.revision === "A1" ? "Resubmission" : "New application"}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div
                      role="progressbar"
                      aria-label={`${w.title} progress`}
                      aria-valuenow={w.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      className="h-1.5 flex-1 overflow-hidden rounded-full bg-bg-2"
                    >
                      <div className="h-full rounded-full bg-gold" style={{ width: `${w.progress}%` }} />
                    </div>
                    <span className="text-[13px] text-muted">
                      Stage {w.gsnStage + 1} of 8: {GSN_STAGES[w.gsnStage]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
          <div className="space-y-4">
            {next ? (
              <Card tone="band">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-gold-on-band">Next deadline</p>
                <p className="mt-2 text-[20px] font-light">{next.title}</p>
                <p className="mt-1 text-[14px] text-band-muted">
                  {formatDate(next.deadline)}, {daysUntil(next.deadline)}
                </p>
                <div className="mt-4">
                  <Link to="/dashboard/gsn" className="inline-flex min-h-11 items-center rounded-[8px] bg-gold px-4 text-[15px] text-[#12202F] no-underline hover:opacity-90">
                    Continue in Navigator
                  </Link>
                </div>
              </Card>
            ) : null}
            <Card>
              <h2 className="text-[22px]">Recent activity</h2>
              {analyses.length === 0 && chats.length === 0 ? (
                <p className="mt-2 text-[14px] text-muted">Nothing yet. Run a review or start a conversation and it will show here.</p>
              ) : (
                <ul className="mt-3 space-y-2 text-[14px]">
                  {analyses.slice(0, 3).map((a) => (
                    <li key={a.id}>
                      <Link to={MODULE_META[a.module].path} className="underline-offset-4 hover:underline">
                        {MODULE_META[a.module].name}
                      </Link>{" "}
                      <span className="text-muted">· {formatDate(a.createdAt)}</span>
                    </li>
                  ))}
                  {chats.slice(0, 2).map((c) => (
                    <li key={c.id}>
                      <Link to={`/dashboard/reviewer-perspectives?chat=${c.id}`} className="underline-offset-4 hover:underline">
                        Conversation with {c.perspectiveId}
                      </Link>{" "}
                      <span className="text-muted">· {c.stage}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      )}

      <section aria-labelledby="suggested" className="mt-10">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="suggested" className="text-[24px]">
            Suggested for you
          </h2>
          <Link to="/tools" className="text-[14px] text-gold-text underline underline-offset-2">
            See all tools
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((m) => {
            const locked = !hasModule(user.plan, user.accessState, m);
            return (
              <li key={m}>
                <Link
                  to={MODULE_META[m].path}
                  className="flex h-full min-h-24 flex-col justify-between rounded-[14px] border border-line bg-surface p-4 no-underline transition-colors hover:border-gold"
                >
                  <span className="text-[15px] font-medium">{MODULE_META[m].name}</span>
                  <span className="mt-3 flex items-center justify-between text-[13px] text-muted">
                    {locked ? <Badge tone="muted">Not on your plan</Badge> : <span>Open</span>}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Page>
  );
}
