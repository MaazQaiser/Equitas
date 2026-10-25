import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ModuleGate } from "../components/AccessGate";
import { Card, Honesty, Page } from "../components/ui";

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
    <Page title={title} lede={lede}>
      <div className="mb-4">
        <Honesty>Demo data</Honesty>
      </div>
      {children}
    </Page>
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
  return (
    <ModuleGate module="post_award">
      <DemoShell title="No-Cost Extension" lede="A no-cost extension gives you more time to finish the work without new money.">
        <Card className="text-[14px] text-muted">
          <p>Award R01HL000000 · unobligated balance $42,100</p>
          <p className="mt-2">Justification draft ready · PO notified · pending GMS</p>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function RpprPage() {
  return (
    <ModuleGate module="post_award">
      <DemoShell title="RPPR" lede="Your yearly Research Performance Progress Report to NIH.">
        <Card className="text-[14px] text-muted">
          <p>Due in 28 days · Section B publications incomplete</p>
          <p className="mt-2">Section C products: 1 manuscript under review</p>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function TrackerPage() {
  return (
    <ModuleGate module="post_award">
      <DemoShell title="Award Tracker" lede="Track spending and milestones across your award.">
        <Card className="text-[14px]">
          <p>Year 2 burn rate: 48% of authorized</p>
          <p className="mt-2 text-muted">Tracking only. Forecasting is on the roadmap, not built yet.</p>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function PortfolioPage() {
  return (
    <ModuleGate module="post_award">
      <DemoShell title="Portfolio Strategy" lede="See your active, pending and planned awards in one place.">
        <Card className="text-[14px] text-muted">
          <p>Active: 2 · Pending: 1 · Planned submissions: 1</p>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function SubawardPage() {
  return (
    <ModuleGate module="subaward">
      <DemoShell
        title="Subaward & Invoicing"
        lede="Track subawards, subcontracts and invoices across collaborating sites."
      >
        <Card className="text-[14px] text-muted">
          <p>Site A invoice #14 · $12,400 · awaiting PI approval</p>
          <p className="mt-2">Site B invoice #9 · paid</p>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}

export function CompliancePage() {
  return (
    <ModuleGate module="compliance">
      <DemoShell
        title="Regulatory Compliance"
        lede="Get IRB, human subjects and policy questions answered in plain language."
      >
        <Card className="text-[14px] text-muted">
          <p>IRB protocol #2024-118 · continuing review due in 60 days</p>
          <p className="mt-2">Human subjects: Yes · Clinical trial: No</p>
        </Card>
      </DemoShell>
    </ModuleGate>
  );
}
