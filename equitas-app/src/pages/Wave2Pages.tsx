import { useState } from "react";
import { Link } from "react-router-dom";
import { AnalysisTool } from "../components/AnalysisTool";
import { ModuleGate } from "../components/AccessGate";
import { Badge, Button, Card, Field, FormPage, FormSection, Full, Honesty, Page, inputClass } from "../components/ui";
import {
  addBudgetLine,
  checklistDone,
  markLessonDone,
  removeBudgetLine,
  setBudgetLine,
  setChecklistItem,
  toggleChecklist,
  useSession,
} from "../lib/session";

const SAMPLE_FUNDED = [
  {
    id: "a1",
    title: "Community hypertension pragmatic trial",
    funder: "NHLBI",
    mech: "R01",
    year: "FY2024",
    pi: "Sample PI",
    abstract: "Tests nurse-led blood pressure control in community clinics. Sample award for discovery demos.",
  },
  {
    id: "a2",
    title: "Nurse-led remote monitoring after discharge",
    funder: "NINR",
    mech: "R21",
    year: "FY2023",
    pi: "Sample PI",
    abstract: "Pilots remote vitals after hospital discharge. Sample award for discovery demos.",
  },
  {
    id: "a3",
    title: "Equity-focused implementation in primary care",
    funder: "CIHR",
    mech: "Project",
    year: "FY2025",
    pi: "Sample PI",
    abstract: "Studies how clinics close equity gaps in hypertension care. Sample award for discovery demos.",
  },
];

export function DiscoveryPage() {
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const results = SAMPLE_FUNDED.filter((r) =>
    `${r.title} ${r.funder} ${r.mech}`.toLowerCase().includes(q.trim().toLowerCase()),
  );
  const selected = SAMPLE_FUNDED.find((r) => r.id === selectedId) ?? null;

  return (
    <ModuleGate module="funding_discovery">
      <Page
        title="Funding Discovery"
        lede="Find what has already been funded in your area, and who funded it."
        actions={<Honesty>Coming soon · sample results</Honesty>}
      >
        <div className={`grid gap-4 ${selected ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
          <Card>
            <Field label="Search funded projects" hint="These three projects are examples. Live search is not built yet.">
              <input
                type="search"
                className={inputClass}
                placeholder="Try a topic, institute or mechanism, like “NHLBI” or “R21”"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </Field>
            <ul className="mt-5 divide-y divide-line">
              {results.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className={`flex w-full flex-wrap items-baseline justify-between gap-2 py-3 text-left ${selectedId === r.id ? "text-ink" : ""}`}
                    onClick={() => setSelectedId(r.id)}
                  >
                    <span className="text-[15px] underline-offset-2 hover:underline">{r.title}</span>
                    <span className="text-[13px] text-muted">
                      {r.funder} {r.mech} · {r.year}
                    </span>
                  </button>
                </li>
              ))}
              {results.length === 0 ? (
                <li className="py-3 text-[14px] text-muted">No sample projects match “{q}”.</li>
              ) : null}
            </ul>
          </Card>
          {selected ? (
            <Card>
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-[20px]">{selected.title}</h2>
                <button type="button" className="text-[13px] text-muted underline" onClick={() => setSelectedId(null)}>
                  Close
                </button>
              </div>
              <dl className="mt-4 space-y-2 text-[14px]">
                <div>
                  <dt className="text-muted">Funder</dt>
                  <dd className="m-0">
                    {selected.funder} · {selected.mech} · {selected.year}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Investigator (sample)</dt>
                  <dd className="m-0">{selected.pi}</dd>
                </div>
                <div>
                  <dt className="text-muted">Abstract</dt>
                  <dd className="m-0 text-muted">{selected.abstract}</dd>
                </div>
              </dl>
              <p className="mt-4 text-[13px] text-muted">Sample award detail. Live NIH RePORTER search is Coming soon.</p>
            </Card>
          ) : null}
        </div>
      </Page>
    </ModuleGate>
  );
}

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function BudgetPage() {
  const { budgetLines } = useSession();
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const total = budgetLines.reduce((s, l) => s + (Number.isFinite(l.amount) ? l.amount : 0), 0);

  return (
    <ModuleGate module="budget">
      <Page
        title="Budget Builder"
        lede="Build and monitor a grant budget that survives review and audit."
        actions={<Honesty>Coming soon · editable sample</Honesty>}
      >
        <Card className="max-w-[640px]">
          <h2 className="text-[20px]">Year 1 example</h2>
          <ul className="mt-3 divide-y divide-line text-[15px]">
            {budgetLines.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center gap-2 py-2.5">
                <input
                  className={`${inputClass} min-w-[140px] flex-1`}
                  value={l.label}
                  aria-label="Line label"
                  onChange={(e) => setBudgetLine(l.id, { label: e.target.value })}
                />
                <input
                  type="number"
                  className={`${inputClass} w-[140px] tabular-nums`}
                  value={l.amount}
                  aria-label={`${l.label} amount`}
                  onChange={(e) => setBudgetLine(l.id, { amount: Number(e.target.value) || 0 })}
                />
                <Button variant="quiet" onClick={() => removeBudgetLine(l.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex justify-between text-[16px] font-medium" data-testid="budget-total">
            <span>Total</span>
            <span className="tabular-nums">{money(total)}</span>
          </p>
          <form
            className="mt-5 grid gap-3 border-t border-line pt-5 sm:grid-cols-[1fr_140px_auto]"
            onSubmit={(e) => {
              e.preventDefault();
              const n = Number(amount);
              if (!label.trim() || !Number.isFinite(n)) return;
              addBudgetLine(label.trim(), n);
              setLabel("");
              setAmount("");
            }}
          >
            <Field label="New line">
              <input className={inputClass} value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Category" />
            </Field>
            <Field label="Amount">
              <input type="number" className={inputClass} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Field>
            <div className="sm:pt-[30px]">
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Card>
      </Page>
    </ModuleGate>
  );
}

const PRE_AWARD_ITEMS = [
  { id: "pa1", title: "Just-in-Time materials", due: "Due in 12 days", defaultDone: false },
  { id: "pa2", title: "Other Support update", due: "Due in 20 days", defaultDone: false },
  { id: "pa3", title: "IRB approval letter", due: "Sent", defaultDone: true },
];

export function PreAwardPage() {
  const { checklists } = useSession();
  const group = checklists.pre_award ?? {};
  return (
    <ModuleGate module="pre_award">
      <Page title="Pre-Award Notification System" lede="Track the tasks between a fundable score and the award notice, so nothing slips.">
        <Card className="max-w-[720px]">
          <ul className="divide-y divide-line">
            {PRE_AWARD_ITEMS.map((i) => {
              const done = i.id in group ? Boolean(group[i.id]) : i.defaultDone;
              return (
                <li key={i.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-[15px]">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={done} onChange={() => setChecklistItem("pre_award", i.id, !done)} />
                    <span>
                      {i.title}
                      <span className="ml-2 text-[13px] text-muted">{i.due}</span>
                    </span>
                  </label>
                  <Badge tone={done ? "gold" : "muted"}>{done ? "Done" : "To do"}</Badge>
                </li>
              );
            })}
          </ul>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function SummaryStatementPage() {
  const [file, setFile] = useState("");
  const [saved, setSaved] = useState(false);
  return (
    <ModuleGate module="resubmission">
      <FormPage
        title="Upload a summary statement"
        lede="Your summary statement is the starting point for a resubmission plan. Remove names before you upload."
        actions={
          <>
            <Button to="/dashboard/de-identification" variant="ghost">
              Remove names first
            </Button>
            <Button
              disabled={!file}
              onClick={() => setSaved(true)}
            >
              {saved ? "Saved in session" : "Save file choice"}
            </Button>
            <Button to="/dashboard/resubmission" disabled={!saved && !file}>
              Continue to resubmission plan
            </Button>
          </>
        }
      >
        <FormSection title="Your file" description="PDF or plain text. It stays in your browser and is not uploaded anywhere.">
          <Full>
            <label htmlFor="summary-file" className="block text-[14px] font-medium">
              Summary statement (PDF or text)
            </label>
            <input
              id="summary-file"
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => {
                setFile(e.target.files?.[0]?.name ?? "");
                setSaved(false);
              }}
              className="mt-2 block w-full rounded-[12px] border border-dashed border-line-2 bg-surface p-6 text-[14px] file:mr-3 file:min-h-10 file:rounded-[8px] file:border-0 file:bg-band file:px-4 file:text-band-ink"
            />
            {file ? (
              <p role="status" className="mt-3 text-[14px] text-muted">
                {file} is ready{saved ? " and saved in this session." : "."}
              </p>
            ) : null}
            {saved ? (
              <p role="status" className="mt-2 text-[14px]">
                Success. You can continue to the resubmission plan.
              </p>
            ) : null}
          </Full>
        </FormSection>
      </FormPage>
    </ModuleGate>
  );
}

export function DeIdentificationPage() {
  const [raw, setRaw] = useState("");
  const [copied, setCopied] = useState(false);
  const cleaned = raw.replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, "[NAME]").replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[ID]");
  return (
    <Page title="Remove names and identifiers" lede="Paste text and we replace obvious names and ID numbers. Always read the result yourself before sharing.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Field label="Original text" hint="Processed in your browser only.">
            <textarea className={`${inputClass} min-h-[200px]`} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="e.g. Reviewer Jane Smith noted that participant 123-45-6789…" />
          </Field>
          <div className="mt-3">
            <Button variant="ghost" onClick={() => { setRaw(""); setCopied(false); }}>
              Clear
            </Button>
          </div>
        </Card>
        <Card>
          <h2 className="text-[14px] font-medium">Cleaned text</h2>
          <p aria-live="polite" className="mt-2 min-h-[120px] whitespace-pre-wrap text-[15px] text-muted">
            {cleaned || "The cleaned version will appear here as you type."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              disabled={!cleaned}
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(cleaned);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              Copy cleaned text
            </Button>
            {copied ? (
              <p role="status" className="text-[14px] text-muted">
                Copied.
              </p>
            ) : null}
          </div>
        </Card>
      </div>
    </Page>
  );
}

const LESSONS = [
  {
    id: "l1",
    title: "What a study section is",
    body: "A study section is the panel of scientists who read and score your application. They discuss strengths and weaknesses, then assign criterion scores that feed the overall impact score.",
  },
  {
    id: "l2",
    title: "How an impact score is formed",
    body: "Reviewers score from 1 (exceptional) to 9 (poor). The overall impact score reflects whether the work is important, rigorous and feasible. Lower numbers are better.",
  },
  {
    id: "l3",
    title: "What triage means",
    body: "Triage means some applications are not discussed in the meeting. That usually signals lower enthusiasm relative to the rest of the slate, not that the science has no value.",
  },
  {
    id: "l4",
    title: "Reading a summary statement",
    body: "Start with the resume and summary of discussion. Then map each critique to an aim. Decide what to change and what to defend before you rewrite.",
  },
];

export function LearningCenterPage() {
  const { lessonsDone } = useSession();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = LESSONS.find((l) => l.id === openId);

  if (open) {
    const done = lessonsDone.includes(open.id);
    return (
      <ModuleGate module="learning_center">
        <Page title={open.title} lede="Sample lesson. Content is fixed for this prototype.">
          <Card className="max-w-[720px]">
            <p className="text-[15px] leading-relaxed text-muted">{open.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {!done ? (
                <Button onClick={() => markLessonDone(open.id)}>Mark complete</Button>
              ) : (
                <Badge tone="gold">Completed</Badge>
              )}
              <Button variant="ghost" onClick={() => setOpenId(null)}>
                Back to lessons
              </Button>
            </div>
          </Card>
        </Page>
      </ModuleGate>
    );
  }

  return (
    <ModuleGate module="learning_center">
      <Page title="Learning Center" lede="Short lessons on how grant review works.">
        <ul className="grid gap-3 md:grid-cols-2">
          {LESSONS.map((l) => (
            <li key={l.id}>
              <Card className="h-full">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[20px]">{l.title}</h2>
                  {lessonsDone.includes(l.id) ? <Badge tone="gold">Done</Badge> : <Badge tone="muted">Sample</Badge>}
                </div>
                <p className="mt-2 text-[14px] text-muted">{l.body.slice(0, 90)}…</p>
                <div className="mt-4">
                  <Button onClick={() => setOpenId(l.id)}>Open lesson</Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Page>
    </ModuleGate>
  );
}

export function TraineeHubPage() {
  const { lessonsDone } = useSession();
  const links: [string, string, string][] = [
    ["/dashboard/opener", "Opening Statement Optimizer", "Make your first page clear to a reviewer."],
    ["/dashboard/reviewer-perspectives", "First-Time Applicant Mentor", "Ask the questions you might not ask a person."],
    ["/learning-center", "Learning Center", `Study sections, impact scores and triage${lessonsDone.length ? ` · ${lessonsDone.length} lesson(s) done` : ""}.`],
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

const RESUB_STEPS = [
  { id: "r1", label: "Upload your summary statement" },
  { id: "r2", label: "Match each critique to an aim" },
  { id: "r3", label: "Decide what to change and what to defend" },
  { id: "r4", label: "Draft the introduction to the resubmission" },
];

export function ResubmissionPage() {
  useSession();
  return (
    <ModuleGate module="resubmission">
      <Page
        title="Continuous Improvement System"
        lede="Work out why it was not funded and what to change before the A1."
        actions={<Honesty>Demo checklist</Honesty>}
      >
        <Card className="max-w-[720px]">
          <h2 className="text-[20px]">How it works</h2>
          <ul className="mt-3 divide-y divide-line">
            {RESUB_STEPS.map((s) => {
              const done = checklistDone("resubmission", s.id);
              return (
                <li key={s.id} className="flex items-center justify-between gap-2 py-3 text-[15px]">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={done} onChange={() => toggleChecklist("resubmission", s.id)} />
                    <span className={done ? "text-muted line-through" : ""}>{s.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <Button to="/dashboard/summary-statement">Upload summary statement</Button>
          </div>
        </Card>
      </Page>
    </ModuleGate>
  );
}

const INTL_CHECKS: Record<string, { id: string; label: string }[]> = {
  ERC: [
    { id: "erc1", label: "Draft excellence narrative" },
    { id: "erc2", label: "Name the European added value" },
  ],
  Wellcome: [
    { id: "w1", label: "Map community engagement plan" },
    { id: "w2", label: "Align outputs with Wellcome open research" },
  ],
  CIHR: [
    { id: "c1", label: "Sex and gender considerations section" },
    { id: "c2", label: "Knowledge translation plan" },
  ],
};

export function InternationalPage() {
  useSession();
  const [funder, setFunder] = useState<keyof typeof INTL_CHECKS>("ERC");
  const checks = INTL_CHECKS[funder];
  return (
    <ModuleGate module="international">
      <Page
        title="International Research"
        lede="Apply to ERC, Wellcome and other non-US funders, with each one's conventions explained."
        actions={<Honesty>Demo checklists</Honesty>}
      >
        <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Funder">
          {(Object.keys(INTL_CHECKS) as (keyof typeof INTL_CHECKS)[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={funder === f}
              className={`min-h-10 rounded-full px-4 text-[14px] ${funder === f ? "bg-band text-band-ink" : "bg-surface text-muted ring-1 ring-line"}`}
              onClick={() => setFunder(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <Card className="max-w-[720px]">
          <h2 className="text-[20px]">{funder} steps</h2>
          <ul className="mt-3 divide-y divide-line">
            {checks.map((c) => {
              const done = checklistDone(`intl_${funder}`, c.id);
              return (
                <li key={c.id} className="flex items-center gap-3 py-3 text-[15px]">
                  <input type="checkbox" checked={done} onChange={() => toggleChecklist(`intl_${funder}`, c.id)} />
                  <span className={done ? "text-muted line-through" : ""}>{c.label}</span>
                </li>
              );
            })}
          </ul>
        </Card>
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
