import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { ModuleId } from "../lib/plans";
import { runAnalysis, selectWorkspace, startChat, useSession } from "../lib/session";
import { ModuleGate } from "./AccessGate";
import { Button, Card, ConfidenceBadge, Field, Honesty, Page, inputClass } from "./ui";

const MIN_CHARS = 40;

export function AnalysisTool({
  module,
  title,
  lede,
  placeholder,
}: {
  module: ModuleId;
  title: string;
  lede: string;
  placeholder: string;
}) {
  return (
    <ModuleGate module={module}>
      <AnalysisToolInner module={module} title={title} lede={lede} placeholder={placeholder} />
    </ModuleGate>
  );
}

function AnalysisToolInner({
  module,
  title,
  lede,
  placeholder,
}: {
  module: ModuleId;
  title: string;
  lede: string;
  placeholder: string;
}) {
  const { workspaces, selectedWorkspaceId, analyses } = useSession();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const latest = analyses.find((a) => a.module === module && a.workspaceId === selectedWorkspaceId);

  function onRun(e: FormEvent) {
    e.preventDefault();
    if (!selectedWorkspaceId) {
      setError("Choose a grant workspace first.");
      return;
    }
    if (!text.trim()) {
      setError("Paste draft text before you run the review.");
      return;
    }
    if (text.trim().length < MIN_CHARS) {
      setError(`Paste at least ${MIN_CHARS} characters so there is enough to review.`);
      return;
    }
    setError("");
    runAnalysis(module, selectedWorkspaceId, text.trim());
    setTimeout(() => document.getElementById("result")?.focus(), 0);
  }

  function followUp() {
    if (!latest) return;
    const chat = startChat({
      perspectiveId: "P01",
      workspaceId: selectedWorkspaceId,
      stage: "After analysis",
      linkedAnalysisId: latest.id,
      seed: `Your top priority is: ${latest.priorityActions[0]} What would you like to work through first?`,
    });
    navigate(`/dashboard/reviewer-perspectives?chat=${chat.id}`);
  }

  if (workspaces.length === 0) {
    return (
      <Page narrow title={title} lede={lede}>
        <Card>
          <h2 className="text-[22px]">Add a grant first</h2>
          <p className="mt-2 text-[15px] text-muted">Reviews are saved to a grant workspace so you can compare drafts over time.</p>
          <div className="mt-5">
            <Button to="/dashboard/gsn/new">Create workspace</Button>
          </div>
        </Card>
      </Page>
    );
  }

  return (
    <Page title={title} lede={lede}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card>
          <form onSubmit={onRun} noValidate className="space-y-5">
            <Field label="Grant workspace">
              <select className={inputClass} value={selectedWorkspaceId ?? ""} onChange={(e) => selectWorkspace(e.target.value)}>
                {workspaces.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Paste draft text"
              hint={`${text.trim().length} characters (need ${MIN_CHARS}+). Remove names and identifiers before you paste.`}
              error={error}
            >
              <textarea
                className={`${inputClass} min-h-[220px] leading-[1.5]`}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (error) setError("");
                }}
                placeholder={placeholder}
              />
            </Field>
            <Button type="submit">Run review</Button>
          </form>
        </Card>

        {latest ? (
          <section id="result" tabIndex={-1} aria-labelledby="result-title" className="outline-none">
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 id="result-title" className="text-[26px]">
                  Result
                </h2>
                <Honesty>Sample output</Honesty>
              </div>
              <p className="mt-1 text-[13px] text-muted">This shows the format of a review. It is not a real score.</p>
              {latest.overall != null ? (
                <p className="mt-4 text-[16px]">
                  Overall impact score: <strong className="text-[22px] font-medium">{latest.overall}</strong>
                  <span className="text-muted"> (1 is best, 9 is weakest)</span>
                </p>
              ) : null}
              <dl className="mt-4 divide-y divide-line">
                {latest.scores?.map((s) => (
                  <div key={s.name} className="flex justify-between gap-4 py-2.5 text-[15px]">
                    <dt>{s.name}</dt>
                    <dd className="m-0 font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4">
                <ConfidenceBadge level={latest.confidence} note={latest.confidenceNote} />
              </div>
              <h3 className="mt-6 text-[16px] font-medium">What to strengthen first</h3>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-[15px] text-muted">
                {latest.priorityActions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                <Button
                  variant="ghost"
                  onClick={async () => {
                    const body = [
                      title,
                      latest.overall != null ? `Overall: ${latest.overall}` : "",
                      ...(latest.scores ?? []).map((s) => `${s.name}: ${s.value}`),
                      "Priorities:",
                      ...latest.priorityActions.map((a, i) => `${i + 1}. ${a}`),
                      "(Sample output)",
                    ]
                      .filter(Boolean)
                      .join("\n");
                    try {
                      await navigator.clipboard.writeText(body);
                      setToast("Copied sample result.");
                    } catch {
                      setToast("Copy is not available in this browser.");
                    }
                  }}
                >
                  Copy result
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    window.print();
                    setToast("Print dialog opened (sample result).");
                  }}
                >
                  Print
                </Button>
                <Button onClick={followUp}>Follow Up in Perspectives</Button>
              </div>
              {toast ? (
                <p role="status" className="mt-3 text-[14px] text-muted">
                  {toast}
                </p>
              ) : null}
              <p className="mt-3 text-[14px] text-muted">Want to talk it through? A reviewer perspective will see this result.</p>
            </Card>
          </section>
        ) : (
          <Card className="border-dashed">
            <h2 className="text-[20px]">No result yet</h2>
            <p className="mt-2 text-[15px] text-muted">
              Paste at least {MIN_CHARS} characters, then run the review. Scores, confidence and priority actions will appear here as sample output.
            </p>
          </Card>
        )}
      </div>
    </Page>
  );
}
