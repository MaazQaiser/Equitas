import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ModuleGate } from "../components/AccessGate";
import { Badge, Button, Card, Honesty, Page } from "../components/ui";
import { checklistDone, setChecklistItem, toggleChecklist, useSession } from "../lib/session";

function DemoShell({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <Page title={title} lede={lede} actions={<Honesty>Demo data</Honesty>}>
      {children}
    </Page>
  );
}

function BoardRow({
  group,
  id,
  label,
  detail,
  doneLabel = "Done",
  todoLabel = "Open",
}: {
  group: string;
  id: string;
  label: string;
  detail: string;
  doneLabel?: string;
  todoLabel?: string;
}) {
  useSession();
  const done = checklistDone(group, id);
  return (
    <li className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-[14px] last:border-0">
      <div>
        <p className="font-medium text-ink">{label}</p>
        <p className="mt-1 text-muted">{detail}</p>
      </div>
      <div className="flex items-center gap-2">
        <Badge tone={done ? "gold" : "muted"}>{done ? doneLabel : todoLabel}</Badge>
        <Button variant="ghost" onClick={() => setChecklistItem(group, id, !done)}>
          {done ? "Reopen" : "Advance"}
        </Button>
      </div>
    </li>
  );
}

export function PostAwardPage() {
  return (
    <ModuleGate module="post_award">
      <DemoShell
        title="Post-Award Manager"
        lede="Keep RPPR reports, no-cost extensions and progress reporting on schedule."
      >
        <Card>
          <ul className="space-y-2 text-[14px]">
            <li>
              <Link className="underline" to="/dashboard/nce">
                No-Cost Extension
              </Link>
            </li>
            <li>
              <Link className="underline" to="/dashboard/rppr">
                RPPR
              </Link>
            </li>
            <li>
              <Link className="underline" to="/dashboard/tracker">
                Award Tracker
              </Link>
            </li>
            <li>
              <Link className="underline" to="/dashboard/portfolio-strategy">
                Portfolio Strategy
              </Link>
            </li>
            <li>
              <Link className="underline" to="/dashboard/subaward">
                Subaward & Invoicing
              </Link>
            </li>
            <li>
              <Link className="underline" to="/dashboard/compliance">
                Regulatory Compliance
              </Link>
            </li>
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function NcePage() {
  useSession();
  const submitted = checklistDone("nce", "submit");
  return (
    <ModuleGate module="post_award">
      <DemoShell title="No-Cost Extension" lede="A no-cost extension gives you more time to finish the work without new money.">
        <Card>
          <p className="text-[14px] text-muted">Award R01HL000000 · unobligated balance $42,100</p>
          <ul className="mt-4">
            <BoardRow group="nce" id="justify" label="Draft justification" detail="Explain remaining aims and timeline." />
            <BoardRow group="nce" id="po" label="Notify program officer" detail="Sample email logged in session." />
            <BoardRow
              group="nce"
              id="submit"
              label="Submit NCE request"
              detail={submitted ? "Marked submitted in this prototype." : "Pending GMS in demo data."}
              doneLabel="Submitted"
              todoLabel="Not submitted"
            />
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function RpprPage() {
  useSession();
  return (
    <ModuleGate module="post_award">
      <DemoShell title="RPPR" lede="Your yearly Research Performance Progress Report to NIH.">
        <Card>
          <p className="text-[14px] text-muted">Due in 28 days</p>
          <ul className="mt-4">
            <BoardRow group="rppr" id="secB" label="Section B publications" detail="Incomplete until you mark it done." />
            <BoardRow group="rppr" id="secC" label="Section C products" detail="1 manuscript under review (demo)." />
            <BoardRow group="rppr" id="draft" label="Save RPPR draft" detail="Draft stays in this browser session." doneLabel="Saved" todoLabel="Not saved" />
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function TrackerPage() {
  useSession();
  const milestones = [
    { id: "m1", label: "Enrollment target year 2", detail: "120 of 200 participants" },
    { id: "m2", label: "Site activation complete", detail: "3 of 4 clinics" },
    { id: "m3", label: "Data lock for interim look", detail: "Scheduled month 18" },
  ];
  return (
    <ModuleGate module="post_award">
      <DemoShell title="Award Tracker" lede="Track spending and milestones across your award.">
        <Card>
          <p className="text-[14px]">Year 2 burn rate: 48% of authorized</p>
          <p className="mt-2 text-[13px] text-muted">Tracking only. Forecasting is on the roadmap, not built yet.</p>
          <ul className="mt-4">
            {milestones.map((m) => (
              <li key={m.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3 text-[14px] last:border-0">
                <div>
                  <p className="font-medium">{m.label}</p>
                  <p className="mt-1 text-muted">{m.detail}</p>
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={checklistDone("tracker", m.id)} onChange={() => toggleChecklist("tracker", m.id)} />
                  <span className="text-[13px] text-muted">Complete</span>
                </label>
              </li>
            ))}
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function PortfolioPage() {
  useSession();
  return (
    <ModuleGate module="post_award">
      <DemoShell title="Portfolio Strategy" lede="See your active, pending and planned awards in one place.">
        <Card>
          <ul>
            <BoardRow group="portfolio" id="active" label="Active awards" detail="2 awards · demo" doneLabel="Reviewed" todoLabel="Review" />
            <BoardRow group="portfolio" id="pending" label="Pending" detail="1 application · demo" doneLabel="Reviewed" todoLabel="Review" />
            <BoardRow group="portfolio" id="planned" label="Planned submissions" detail="1 planned · demo" doneLabel="Scheduled" todoLabel="Plan" />
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function SubawardPage() {
  useSession();
  return (
    <ModuleGate module="subaward">
      <DemoShell
        title="Subaward & Invoicing"
        lede="Track subawards, subcontracts and invoices across collaborating sites."
      >
        <Card>
          <ul>
            <BoardRow group="subaward" id="inv14" label="Site A invoice #14 · $12,400" detail="Awaiting PI approval" doneLabel="Approved" todoLabel="Awaiting" />
            <BoardRow group="subaward" id="inv9" label="Site B invoice #9" detail="Paid in demo data" doneLabel="Paid" todoLabel="Open" />
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function CompliancePage() {
  useSession();
  return (
    <ModuleGate module="compliance">
      <DemoShell
        title="Regulatory Compliance"
        lede="Get IRB, human subjects and policy questions answered in plain language."
      >
        <Card>
          <p className="text-[14px] text-muted">IRB protocol #2024-118 · Human subjects: Yes · Clinical trial: No</p>
          <ul className="mt-4">
            <BoardRow group="compliance" id="cr" label="Continuing review" detail="Due in 60 days" doneLabel="Filed" todoLabel="Due" />
            <BoardRow group="compliance" id="consent" label="Consent form version check" detail="Confirm current stamped form is in use." />
          </ul>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}
