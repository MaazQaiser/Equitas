import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MODULE_META } from "../lib/plans";
import { GSN_STAGES, createExpiredShare, createShare, createWorkspace, setGsnStage, useSession } from "../lib/session";
import { ModuleGate } from "../components/AccessGate";
import { productAbsolute } from "../lib/sites";
import { Badge, Button, Card, Field, FormPage, FormSection, Full, Page, formatDate, inputClass } from "../components/ui";

const STAGE_TOOLS: Record<number, (keyof typeof MODULE_META)[]> = {
  0: ["funding_discovery"],
  1: ["opening_statement", "gap_analysis", "equity"],
  2: ["study_section", "mentor_chat"],
  3: ["budget", "compliance"],
  4: ["pre_award"],
  5: [],
  6: ["study_section", "resubmission"],
  7: ["post_award"],
};

const STAGE_HELP: Record<number, string> = {
  0: "Confirm the funder, mechanism and deadline. Check what has already been funded in your area.",
  1: "Draft the narrative. Start with the opening page and the specific aims.",
  2: "Read the draft the way a study section would before anyone else does.",
  3: "Assemble the budget, compliance and supporting documents.",
  4: "Get internal sign-off from your department and grants office.",
  5: "Share the final draft with an outside reader for a last check.",
  6: "Decide whether this version is ready, or whether it needs another pass.",
  7: "Submitted. Track what happens next.",
};

export function GsnNewPage() {
  return (
    <ModuleGate module="gsn">
      <GsnNewInner />
    </ModuleGate>
  );
}

function GsnNewInner() {
  const navigate = useNavigate();
  const [funder, setFunder] = useState("NIH");
  const [ic, setIc] = useState("");
  const [mechanism, setMechanism] = useState("R01");
  const [revision, setRevision] = useState<"A0" | "A1">("A0");
  const [deadline, setDeadline] = useState("");
  const [foa, setFoa] = useState("");
  const [poMeeting, setPoMeeting] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>({});
  const [summary, setSummary] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!title.trim()) next.title = "Give this grant a short name so you can find it later.";
    if (deadline && new Date(deadline) < new Date(new Date().toDateString()))
      next.deadline = "This date has passed. Choose a future deadline.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSummary(true);
  }

  function create() {
    const ws = createWorkspace({
      title: title.trim(),
      funder,
      ic: ic || "Not set",
      mechanism,
      revision,
      deadline: deadline || new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
      foa: foa || "Not set",
    });
    navigate(`/dashboard/gsn?ws=${ws.id}`);
  }

  if (summary) {
    const groups: [string, [string, string][]][] = [
      [
        "The grant",
        [
          ["Name", title],
          ["Application type", revision === "A1" ? "Resubmission (A1)" : "New application (A0)"],
        ],
      ],
      [
        "Funder",
        [
          ["Funder", funder],
          ["Mechanism", mechanism],
          ["Institute or center", ic || "Not set"],
          ["Funding opportunity", foa || "Not set"],
        ],
      ],
      [
        "Timing",
        [
          ["Deadline", deadline ? formatDate(deadline) : "Not set. We will use 90 days from today."],
          ["Program Officer meeting", poMeeting ? "Planned" : "Not planned"],
        ],
      ],
    ];
    return (
      <FormPage
        eyebrow="New grant workspace"
        title="Check the details"
        lede="You can edit these later from the Navigator."
        actions={
          <>
            <Button variant="ghost" onClick={() => setSummary(false)}>
              Edit details
            </Button>
            <Button onClick={create}>Create workspace</Button>
          </>
        }
      >
        {groups.map(([section, rows]) => (
          <FormSection key={section} title={section}>
            {rows.map(([k, v]) => (
              <div key={k}>
                <p className="text-[13px] text-muted">{k}</p>
                <p className="mt-1 text-[16px]">{v}</p>
              </div>
            ))}
          </FormSection>
        ))}
      </FormPage>
    );
  }

  return (
    <FormPage
      eyebrow="New grant workspace"
      title="Tell us about this grant"
      lede="One workspace holds one application. Only the name is required to start."
      onSubmit={onSubmit}
      actions={
        <>
          <Button to="/dashboard" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </>
      }
    >
      <FormSection title="The grant" description="A name you will recognise, and whether this is a first try or a resubmission.">
        <Field label="Grant name" hint="Something short you will recognise." error={errors.title}>
          <input className={inputClass} placeholder="e.g. R01 hospital readmission trial" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label="Application type">
          <select className={inputClass} value={revision} onChange={(e) => setRevision(e.target.value as "A0" | "A1")}>
            <option value="A0">New application (A0)</option>
            <option value="A1">Resubmission (A1)</option>
          </select>
        </Field>
      </FormSection>

      <FormSection title="Funder" description="Who you are applying to. This decides which stages and tools we suggest.">
        <Field label="Funder">
          <select className={inputClass} value={funder} onChange={(e) => setFunder(e.target.value)}>
            <option>NIH</option>
            <option>CIHR</option>
            <option>Wellcome</option>
            <option>ERC</option>
          </select>
        </Field>
        <Field label="Mechanism">
          <select className={inputClass} value={mechanism} onChange={(e) => setMechanism(e.target.value)}>
            <option>R01</option>
            <option>R21</option>
            <option>K08</option>
            <option>F31</option>
            <option>T32</option>
          </select>
        </Field>
        <div>
          <Field label="Institute or center" optional hint={funder === "NIH" ? "The NIH institute you expect to fund this, like NHLBI." : undefined}>
            <input className={inputClass} placeholder={funder === "NIH" ? "e.g. NHLBI" : "Not needed for this funder"} value={ic} onChange={(e) => setIc(e.target.value)} />
          </Field>
          {funder === "NIH" ? (
            <button type="button" className="mt-2 min-h-9 text-[14px] text-gold-text underline underline-offset-2" onClick={() => setIc("NHLBI")}>
              Suggest an institute
            </button>
          ) : null}
        </div>
        <Field label="Funding opportunity number" optional>
          <input className={inputClass} placeholder="e.g. PAR-25-123" value={foa} onChange={(e) => setFoa(e.target.value)} />
        </Field>
      </FormSection>

      <FormSection title="Timing" description="If you leave the deadline empty, we plan for 90 days from today.">
        <Field label="Deadline" optional error={errors.deadline}>
          <input type="date" className={inputClass} value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        </Field>
        <Full>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px]">
            <input type="checkbox" className="h-4 w-4 accent-[#B39952]" checked={poMeeting} onChange={(e) => setPoMeeting(e.target.checked)} />I plan to meet the Program Officer first
          </label>
        </Full>
      </FormSection>
    </FormPage>
  );
}

export function GsnPage() {
  return (
    <ModuleGate module="gsn">
      <GsnInner />
    </ModuleGate>
  );
}

function GsnInner() {
  const { workspaces, selectedWorkspaceId, shares } = useSession();
  const ws = workspaces.find((w) => w.id === selectedWorkspaceId) ?? workspaces[0];
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  if (!ws) {
    return (
      <Page narrow title="Grant Submission Navigator" lede="Add a grant to see its eight stages, from setup to submitted.">
        <Button to="/dashboard/gsn/new">Add your first grant</Button>
      </Page>
    );
  }

  const stage = ws.gsnStage;
  const tools = STAGE_TOOLS[stage] ?? [];
  const wsShares = shares.filter((s) => s.workspaceId === ws.id);

  function makeLink(expired = false) {
    const s = expired ? createExpiredShare(ws.id) : createShare(ws.id, ws.title);
    setShareUrl(productAbsolute(`/review/${s.token}`));
    setCopied(false);
  }

  return (
    <Page
      eyebrow="Grant Submission Navigator"
      title={ws.title}
      lede={`${ws.funder} ${ws.mechanism} · Due ${formatDate(ws.deadline)}`}
      actions={
        <Button to="/dashboard/gsn/new" variant="ghost">
          New grant workspace
        </Button>
      }
    >
      <nav aria-label="Stages" className="mb-6 overflow-x-auto pb-2">
        <ol className="flex min-w-max gap-2">
          {GSN_STAGES.map((name, i) => {
            const done = i < stage;
            const current = i === stage;
            return (
              <li key={name}>
                <button
                  type="button"
                  aria-current={current ? "step" : undefined}
                  onClick={() => setGsnStage(ws.id, i)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-[13px] ring-1 ring-inset ${
                    current ? "bg-band text-band-ink ring-band" : done ? "bg-gold/15 text-ink ring-gold/40" : "bg-surface text-muted ring-line"
                  }`}
                >
                  <span aria-hidden="true">{done ? "✓" : i + 1}</span>
                  {name}
                  {done ? <span className="sr-only">(done)</span> : null}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <Card>
        <p className="text-[13px] text-muted">
          Stage {stage + 1} of 8
        </p>
        <h2 className="mt-1 text-[28px]">{GSN_STAGES[stage]}</h2>
        <p className="mt-2 max-w-[60ch] text-[15px] text-muted">{STAGE_HELP[stage]}</p>

        {tools.length > 0 && (
          <>
            <h3 className="mt-6 text-[15px] font-medium">Tools for this stage</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {tools.map((id) => (
                <li key={id}>
                  <Link
                    to={MODULE_META[id].path}
                    className="flex min-h-12 items-center justify-between rounded-[10px] border border-line px-4 no-underline hover:border-gold"
                  >
                    {MODULE_META[id].name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {stage === 5 && (
          <div className="mt-6 rounded-[12px] bg-bg-2 p-4">
            <h3 className="text-[16px] font-medium">Ask an outside reader</h3>
            <p className="mt-1 text-[14px] text-muted">
              Create a private link to this draft. The reader does not need an account. The link stops working after 7 days.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={() => makeLink()}>Create share link</Button>
              <Button variant="quiet" onClick={() => makeLink(true)}>
                Create expired link (test)
              </Button>
            </div>
            {shareUrl ? (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <label htmlFor="share-url" className="sr-only">
                  Share link
                </label>
                <input id="share-url" readOnly value={shareUrl} className={`${inputClass} text-[14px]`} onFocus={(e) => e.target.select()} />
                <Button
                  variant="ghost"
                  onClick={() => {
                    void navigator.clipboard?.writeText(shareUrl);
                    setCopied(true);
                  }}
                >
                  {copied ? "Copied" : "Copy link"}
                </Button>
                <a href={shareUrl} className="text-[14px] text-gold-text underline underline-offset-2">
                  Open
                </a>
              </div>
            ) : null}
            {wsShares.length > 0 && (
              <ul className="mt-4 space-y-1 text-[13px] text-muted">
                {wsShares.slice(0, 3).map((s) => (
                  <li key={s.token}>
                    Link created · expires {formatDate(s.expiresAt)} ·{" "}
                    <Badge tone={s.decision === "changes_requested" ? "danger" : s.decision === "approved" ? "gold" : "muted"}>
                      {s.decision === "approved" ? "Approved" : s.decision === "changes_requested" ? "Changes requested" : "Waiting"}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2 border-t border-line pt-5">
          <Button disabled={stage <= 0} variant="ghost" onClick={() => setGsnStage(ws.id, Math.max(0, stage - 1))}>
            Previous stage
          </Button>
          <Button disabled={stage >= 7} onClick={() => setGsnStage(ws.id, Math.min(7, stage + 1))}>
            {stage >= 7 ? "All stages done" : `Mark done and go to ${GSN_STAGES[stage + 1]}`}
          </Button>
        </div>
      </Card>
    </Page>
  );
}
