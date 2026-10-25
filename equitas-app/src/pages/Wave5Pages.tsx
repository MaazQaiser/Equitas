import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModuleGate } from "../components/AccessGate";
import { Button, Card, Field, Honesty, Page, inputClass } from "../components/ui";

export function InstitutionalPage() {
  return (
    <ModuleGate module="institutional">
      <Page
        title="Research Office"
        lede="See grant activity and pipeline across a department or institution. Tracking, not forecasting."
      >
        <Honesty>Tracking dashboard</Honesty>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-[12px] uppercase text-muted">Active awards</p>
            <p className="mt-2 font-display text-[32px]">42</p>
          </Card>
          <Card>
            <p className="text-[12px] uppercase text-muted">Pending</p>
            <p className="mt-2 font-display text-[32px]">18</p>
          </Card>
          <Card>
            <p className="text-[12px] uppercase text-muted">Pipeline $</p>
            <p className="mt-2 font-display text-[32px]">$12.4M</p>
            <p className="mt-1 text-[12px] text-muted">On our roadmap, not built yet: financial forecasting</p>
          </Card>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-[14px]">
          <Link className="underline" to="/dashboard/dept-chair">
            Dept Chair view
          </Link>
          <Link className="underline" to="/dashboard/institutional/workflows">
            Workflows
          </Link>
          <Link className="underline" to="/pilot">
            Pilot intake
          </Link>
        </div>
      </Page>
    </ModuleGate>
  );
}

export function DeptChairPage() {
  return (
    <ModuleGate module="institutional">
      <Page title="Department Chair view" lede="Faculty submission activity for chair review.">
        <Card className="text-[14px] text-muted">
          <p>Faculty with submissions this cycle: 11</p>
          <p className="mt-2">Needs mentor match: 3</p>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function InstitutionalWorkflowsPage() {
  return (
    <ModuleGate module="institutional">
      <Page title="Institutional workflows" lede="See who needs to review and sign each application, and where it is waiting.">
        <Card className="text-[14px] text-muted">
          <p>Routing: PI → Grants officer → Chair → SPA</p>
          <p className="mt-2">Average days in queue (demo): 4.2</p>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function PilotPage() {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <Page narrow title="Thank you" lede="We have your details and will be in touch to plan a pilot.">
        <Button to="/sign-in">Sign in</Button>
      </Page>
    );
  return (
    <Page narrow title="Start an institutional pilot" lede="Tell us about your institution and we will be in touch to plan a pilot.">
      <Card>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Field label="Institution">
            <input required className={inputClass} autoComplete="organization" placeholder="e.g. University of Nairobi" />
          </Field>
          <Field label="Contact email">
            <input required className={inputClass} type="email" autoComplete="email" placeholder="you@university.edu" />
          </Field>
          <Button type="submit">Send</Button>
        </form>
      </Card>
    </Page>
  );
}

export function T32PdPage() {
  return (
    <Page
      title="T32 Program Director"
      lede="Manage training grant slots, appointments, and trainee progress."
      actions={<Button to="/dashboard/t32pd/new">New T32 workspace</Button>}
    >
      <Card className="text-[14px] text-muted">
        <p>Open slots: 2 · Appointed trainees: 6</p>
        <p className="mt-2">Next progress reports due in 45 days</p>
      </Card>
    </Page>
  );
}

export function T32PdNewPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  return (
    <Page narrow title="New T32 workspace" lede="One workspace per training grant. You can add trainees after.">
      <form
        className="max-w-md space-y-3"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          navigate("/dashboard/t32pd");
        }}
      >
        <Field label="Program name">
          <input required className={inputClass} placeholder="e.g. Cardiovascular Research Training Program" value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Button type="submit">Create workspace</Button>
      </form>
    </Page>
  );
}
