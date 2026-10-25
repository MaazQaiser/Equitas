import { useState } from "react";
import { Link } from "react-router-dom";
import { AnalysisTool } from "../components/AnalysisTool";
import { ModuleGate } from "../components/AccessGate";
import { Badge, Button, Card, Field, Honesty, Page, inputClass } from "../components/ui";

const SAMPLE_FUNDED = [
  { title: "Community hypertension pragmatic trial", funder: "NHLBI", mech: "R01", year: "FY2024" },
  { title: "Nurse-led remote monitoring after discharge", funder: "NINR", mech: "R21", year: "FY2023" },
  { title: "Equity-focused implementation in primary care", funder: "CIHR", mech: "Project", year: "FY2025" },
];

export function DiscoveryPage() {
  const [q, setQ] = useState("");
  const results = SAMPLE_FUNDED.filter((r) => `${r.title} ${r.funder} ${r.mech}`.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <ModuleGate module="funding_discovery">
      <Page title="Funding Discovery" lede="Find what has already been funded in your area, and who funded it." actions={<Honesty>Coming soon · sample results</Honesty>}>
        <Card>
          <Field label="Search funded projects" hint="These three projects are examples. Live search is not built yet.">
            <input type="search" className={inputClass} placeholder="Try a topic, institute or mechanism, like “NHLBI” or “R21”" value={q} onChange={(e) => setQ(e.target.value)} />
          </Field>
          <ul className="mt-5 divide-y divide-line">
            {results.map((r) => (
              <li key={r.title} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <span className="text-[15px]">{r.title}</span>
                <span className="text-[13px] text-muted">
                  {r.funder} {r.mech} · {r.year}
                </span>
              </li>
            ))}
            {results.length === 0 ? <li className="py-3 text-[14px] text-muted">No sample projects match “{q}”.</li> : null}
          </ul>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function BudgetPage() {
  const rows: [string, string][] = [
    ["Personnel", "$180,000"],
    ["Supplies", "$24,000"],
    ["Travel", "$6,000"],
    ["Indirect costs at 56%", "$117,600"],
  ];
  return (
    <ModuleGate module="budget">
      <Page title="Budget Builder" lede="Build and monitor a grant budget that survives review and audit." actions={<Honesty>Coming soon · example budget</Honesty>}>
        <Card className="max-w-[560px]">
          <h2 className="text-[20px]">Year 1 example</h2>
          <dl className="mt-3 divide-y divide-line text-[15px]">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5">
                <dt className="text-muted">{k}</dt>
                <dd className="m-0 tabular-nums">{v}</dd>
              </div>
            ))}
            <div className="flex justify-between py-2.5 font-medium">
              <dt>Total</dt>
              <dd className="m-0 tabular-nums">$327,600</dd>
            </div>
          </dl>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function PreAwardPage() {
  const items = [
    { title: "Just-in-Time materials", due: "Due in 12 days", done: false },
    { title: "Other Support update", due: "Due in 20 days", done: false },
    { title: "IRB approval letter", due: "Sent", done: true },
  ];
  return (
    <ModuleGate module="pre_award">
      <Page title="Pre-Award Notification System" lede="Track the tasks between a fundable score and the award notice, so nothing slips.">
        <Card className="max-w-[720px]">
          <ul className="divide-y divide-line">
            {items.map((i) => (
              <li key={i.title} className="flex flex-wrap items-center justify-between gap-2 py-3 text-[15px]">
                <span>
                  {i.title}
                  <span className="ml-2 text-[13px] text-muted">{i.due}</span>
                </span>
                <Badge tone={i.done ? "gold" : "muted"}>{i.done ? "Done" : "To do"}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function SummaryStatementPage() {
  const [file, setFile] = useState("");
  return (
    <ModuleGate module="resubmission">
      <Page narrow title="Upload a summary statement" lede="Your summary statement is the starting point for a resubmission plan. Remove names before you upload.">
        <Card>
          <label htmlFor="summary-file" className="block text-[14px] font-medium">
            Summary statement (PDF or text)
          </label>
          <input
            id="summary-file"
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")}
            className="mt-2 block w-full text-[14px] file:mr-3 file:min-h-10 file:rounded-[8px] file:border-0 file:bg-band file:px-4 file:text-band-ink"
          />
          {file ? (
            <p role="status" className="mt-3 text-[14px] text-muted">
              {file} is ready. It stays in your browser and is not uploaded anywhere.
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-2">
            <Button to="/dashboard/resubmission">Continue to resubmission plan</Button>
            <Button to="/dashboard/de-identification" variant="ghost">
              Remove names first
            </Button>
          </div>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function DeIdentificationPage() {
  const [raw, setRaw] = useState("");
  const cleaned = raw.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[NAME]").replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[ID]");
  return (
    <Page title="Remove names and identifiers" lede="Paste text and we replace obvious names and ID numbers. Always read the result yourself before sharing.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Field label="Original text" hint="Processed in your browser only.">
            <textarea className={`${inputClass} min-h-[200px]`} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="e.g. Reviewer Jane Smith noted that participant 123-45-6789…" />
          </Field>
        </Card>
        <Card>
          <h2 className="text-[14px] font-medium">Cleaned text</h2>
          <p aria-live="polite" className="mt-2 whitespace-pre-wrap text-[15px] text-muted">
            {cleaned || "The cleaned version will appear here as you type."}
          </p>
        </Card>
      </div>
    </Page>
  );
}

export function LearningCenterPage() {
  const lessons = [
    ["What a study section is", "The panel of scientists who read and score your application."],
    ["How an impact score is formed", "Why 1 is best, 9 is weakest, and what moves the number."],
    ["What triage means", "Why some applications are not discussed, and what that tells you."],
    ["Reading a summary statement", "How to find the critique that actually decided your score."],
  ];
  return (
    <ModuleGate module="learning_center">
      <Page title="Learning Center" lede="Short lessons on how grant review works.">
        <ul className="grid gap-3 md:grid-cols-2">
          {lessons.map(([t, d]) => (
            <li key={t}>
              <Card className="h-full">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[20px]">{t}</h2>
                  <Badge tone="muted">Coming soon</Badge>
                </div>
                <p className="mt-2 text-[14px] text-muted">{d}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Page>
    </ModuleGate>
  );
}

export function TraineeHubPage() {
  const links: [string, string, string][] = [
    ["/dashboard/opener", "Opening Statement Optimizer", "Make your first page clear to a reviewer."],
    ["/dashboard/reviewer-perspectives", "First-Time Applicant Mentor", "Ask the questions you might not ask a person."],
    ["/learning-center", "Learning Center", "Study sections, impact scores and triage in plain words."],
  ];
  return (
    <ModuleGate module="trainee_gra">
      <Page title="Trainee Learning Hub" lede="Everything an F31, F32 or T32 application needs, written for a first-time applicant.">
        <ul className="grid gap-3 md:grid-cols-3">
          {links.map(([to, name, d]) => (
            <li key={to}>
              <Link to={to} className="flex h-full flex-col rounded-[14px] border border-line bg-surface p-4 no-underline hover:border-gold">
                <span className="text-[16px] font-medium">{name}</span>
                <span className="mt-2 text-[14px] text-muted">{d}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </ModuleGate>
  );
}

export function ResubmissionPage() {
  const steps = ["Upload your summary statement", "Match each critique to an aim", "Decide what to change and what to defend", "Draft the introduction to the resubmission"];
  return (
    <ModuleGate module="resubmission">
      <Page title="Continuous Improvement System" lede="Work out why it was not funded and what to change before the A1.">
        <Card className="max-w-[720px]">
          <h2 className="text-[20px]">How it works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] text-muted">
            {steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <div className="mt-6">
            <Button to="/dashboard/summary-statement">Upload summary statement</Button>
          </div>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function InternationalPage() {
  const funders: [string, string][] = [
    ["ERC", "How to write an excellence narrative for a European panel."],
    ["Wellcome", "What Wellcome expects on community engagement."],
    ["CIHR", "How to report sex and gender considerations."],
  ];
  return (
    <ModuleGate module="international">
      <Page title="International Research" lede="Apply to ERC, Wellcome and other non-US funders, with each one's conventions explained.">
        <ul className="grid gap-3 md:grid-cols-3">
          {funders.map(([f, d]) => (
            <li key={f}>
              <Card className="h-full">
                <h2 className="text-[20px]">{f}</h2>
                <p className="mt-2 text-[14px] text-muted">{d}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Page>
    </ModuleGate>
  );
}

export function OpenerPage() {
  return (
    <AnalysisTool
      module="opening_statement"
      title="Opening Statement Optimizer"
      lede="Make the first page show the question, the stakes and the approach in the first few lines."
      placeholder="Paste your opening paragraph or specific aims page…"
    />
  );
}

export function EquityPage() {
  return (
    <AnalysisTool
      module="equity"
      title="Equity Intelligence"
      lede="Check who is included, who is missing, and whether access barriers are named."
      placeholder="Paste your study population, recruitment or inclusion section…"
    />
  );
}

export function StudySectionPage() {
  return (
    <AnalysisTool
      module="study_section"
      title="Study Section Simulator"
      lede="See the score your application might get and the reviewer discussion behind it."
      placeholder="Paste a section of your draft, like Significance or Approach…"
    />
  );
}

export function GapAnalysisPage() {
  return (
    <AnalysisTool
      module="gap_analysis"
      title="Grant Application Gap Analysis"
      lede="Find the missing assumptions and weak links where a skeptical reader will stop."
      placeholder="Paste your aims and approach…"
    />
  );
}
