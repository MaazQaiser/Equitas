import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModuleGate } from "../components/AccessGate";
import { Badge, Button, Card, Field, FormPage, FormSection, Full, Honesty, Page, inputClass } from "../components/ui";

const FACULTY = [
  { name: "A. Mensah", mech: "R01", status: "Pending", mentor: true },
  { name: "J. Chen", mech: "K23", status: "Submitted", mentor: false },
  { name: "R. Alvarez", mech: "R21", status: "Pending", mentor: true },
  { name: "S. Okeke", mech: "F32", status: "Awarded", mentor: false },
];

const WORKFLOWS = [
  { title: "Hypertension R01", step: "Grants officer", days: 3 },
  { title: "Nurse K23", step: "Chair", days: 5 },
  { title: "Training F32", step: "SPA", days: 1 },
  { title: "Implementation R21", step: "PI", days: 2 },
];

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
  const [filter, setFilter] = useState("All");
  const rows = useMemo(
    () => FACULTY.filter((f) => filter === "All" || f.status === filter),
    [filter],
  );
  return (
    <ModuleGate module="institutional">
      <Page title="Department Chair view" lede="Faculty submission activity for chair review. Tracking sample data only.">
        <Honesty>Demo table · tracking</Honesty>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {["All", "Pending", "Submitted", "Awarded"].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              className={`min-h-9 rounded-full px-4 text-[14px] ${filter === s ? "bg-band text-band-ink" : "bg-surface text-muted ring-1 ring-line"}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
        <Card className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-2 font-medium">Faculty</th>
                <th className="py-2 font-medium">Mechanism</th>
                <th className="py-2 font-medium">Status</th>
                <th className="py-2 font-medium">Mentor</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-b border-line last:border-0">
                  <td className="py-2.5">{r.name}</td>
                  <td className="py-2.5">{r.mech}</td>
                  <td className="py-2.5">
                    <Badge tone={r.status === "Awarded" ? "gold" : "muted"}>{r.status}</Badge>
                  </td>
                  <td className="py-2.5 text-muted">{r.mentor ? "Needs match" : "Ok"}</td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-muted">
                    No faculty match this filter.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function InstitutionalWorkflowsPage() {
  const [q, setQ] = useState("");
  const rows = WORKFLOWS.filter((w) => `${w.title} ${w.step}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <ModuleGate module="institutional">
      <Page title="Institutional workflows" lede="See who needs to review and sign each application, and where it is waiting.">
        <Honesty>Demo queue · tracking</Honesty>
        <Card className="mt-4">
          <Field label="Filter workflows">
            <input className={inputClass} value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Chair or R01" />
          </Field>
          <p className="mt-3 text-[13px] text-muted">Routing: PI → Grants officer → Chair → SPA · Average days in queue (demo): 4.2</p>
          <ul className="mt-4 divide-y divide-line">
            {rows.map((w) => (
              <li key={w.title} className="flex flex-wrap justify-between gap-2 py-3 text-[14px]">
                <span>
                  <span className="font-medium">{w.title}</span>
                  <span className="ml-2 text-muted">Waiting on {w.step}</span>
                </span>
                <span className="text-muted">{w.days} days</span>
              </li>
            ))}
            {rows.length === 0 ? <li className="py-3 text-muted">No workflows match “{q}”.</li> : null}
          </ul>
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
    <Page title="Start an institutional pilot" lede="Tell us about your institution and we will be in touch to plan a pilot.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <FormSection title="Your institution" description="We use this only to contact you about a pilot.">
          <Field label="Institution">
            <input required className={inputClass} autoComplete="organization" placeholder="e.g. University of Nairobi" />
          </Field>
          <Field label="Contact email">
            <input required className={inputClass} type="email" autoComplete="email" placeholder="you@university.edu" />
          </Field>
        </FormSection>
        <div className="flex justify-end border-t border-line py-4">
          <Button type="submit">Send</Button>
        </div>
      </form>
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
    <FormPage
      title="New T32 workspace"
      lede="One workspace per training grant. You can add trainees after."
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        navigate("/dashboard/t32pd");
      }}
      actions={
        <>
          <Button to="/dashboard/t32pd" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create workspace</Button>
        </>
      }
    >
      <FormSection title="Training program" description="The name your trainees and grants office use for it.">
        <Full>
          <Field label="Program name">
            <input required className={inputClass} placeholder="e.g. Cardiovascular Research Training Program" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
        </Full>
      </FormSection>
    </FormPage>
  );
}
