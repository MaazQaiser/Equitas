import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModuleGate } from "../components/AccessGate";
import { Badge, Button, Card, Field, FormPage, FormSection, Full, Honesty, Page, inputClass } from "../components/ui";
import { checklistDone, setMentorMatch, toggleChecklist, useSession } from "../lib/session";

const SAMPLE_MENTORS = [
  {
    id: "m1",
    name: "Dr. Amara Okonkwo",
    focus: "Career development mentor",
    detail: "K and F career plans, mentor letters, training goals.",
  },
  {
    id: "m2",
    name: "Dr. Luis Herrera",
    focus: "Methods mentor",
    detail: "Study design, power, and what reviewers call feasibility.",
  },
  {
    id: "m3",
    name: "Dr. Priya Nair",
    focus: "Writing mentor",
    detail: "Narrative clarity, significance framing, and page one.",
  },
];

export function MentorMatchingPage() {
  const { mentorMatchId } = useSession();
  const navigate = useNavigate();
  return (
    <ModuleGate module="mentor_hub">
      <Page
        title="Mentor Matching"
        lede="Pick a sample mentor profile, then continue to a session. Matching is demo data; no one is contacted."
        actions={<Honesty>Demo mentors</Honesty>}
      >
        <ul className="grid gap-4 md:grid-cols-3">
          {SAMPLE_MENTORS.map((m) => {
            const selected = mentorMatchId === m.id;
            return (
              <li key={m.id}>
                <Card className={`h-full ${selected ? "ring-2 ring-gold" : ""}`}>
                  <h2 className="font-display text-[20px]">{m.name}</h2>
                  <p className="mt-1 text-[13px] text-gold-text">{m.focus}</p>
                  <p className="mt-2 text-[14px] text-muted">{m.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant={selected ? "primary" : "ghost"}
                      onClick={() => setMentorMatch(m.id)}
                    >
                      {selected ? "Selected" : "Select"}
                    </Button>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button
            disabled={!mentorMatchId}
            onClick={() => navigate("/dashboard/mentor-session")}
          >
            Continue to session
          </Button>
          <Button to="/dashboard/mentor" variant="ghost">
            Back to Mentor Hub
          </Button>
        </div>
      </Page>
    </ModuleGate>
  );
}

export function MentorHubPage() {
  const { mentorMatchId } = useSession();
  const navigate = useNavigate();
  const selected = SAMPLE_MENTORS.find((m) => m.id === mentorMatchId);
  return (
    <ModuleGate module="mentor_hub">
      <Page
        title="Mentor Hub"
        lede="Choose the kind of mentor you need, keep notes from each session, and tell us how it went."
      >
        {selected ? (
          <p role="status" className="mb-5 rounded-[10px] bg-gold/15 px-4 py-3 text-[15px]">
            Matched with {selected.name} ({selected.focus}).{" "}
            <Link to="/dashboard/mentor-session" className="underline underline-offset-2">
              Open session
            </Link>
          </p>
        ) : null}
        <div className="grid gap-4 md:grid-cols-3">
          {SAMPLE_MENTORS.map((m) => (
            <Card key={m.id}>
              <h2 className="font-display text-[20px]">{m.name}</h2>
              <p className="mt-2 text-[13px] text-muted">{m.focus}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setMentorMatch(m.id);
                    navigate("/dashboard/mentor-matching");
                  }}
                >
                  Match
                </Button>
                <Button to="/dashboard/mentor-session">Start session</Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button to="/dashboard/mentor-matching">Open Mentor Matching</Button>
        </div>
      </Page>
    </ModuleGate>
  );
}

export function MentorSessionPage() {
  const { mentorMatchId } = useSession();
  const mentor = SAMPLE_MENTORS.find((m) => m.id === mentorMatchId);
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  return (
    <ModuleGate module="mentor_hub">
      <FormPage
        title="Mentor session"
        lede={
          mentor
            ? `Session with ${mentor.name}. Notes stay in this browser. No mentor is emailed.`
            : "Write down what you discussed and what you will do next. Mentor matching is demo-only, so no one is contacted."
        }
        actions={
          <>
            <Button to="/dashboard/mentor-matching" variant="ghost">
              Change match
            </Button>
            <Button onClick={() => navigate("/dashboard/mentor-quality")}>End session and rate it</Button>
          </>
        }
      >
        <FormSection title="Notes" description="Only you can see these. Short bullet points are fine.">
          <Full>
            <Field label="Session notes">
              <textarea
                className={`${inputClass} min-h-[280px]`}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What did you discuss? What will you do before the next session?"
              />
            </Field>
          </Full>
        </FormSection>
      </FormPage>
    </ModuleGate>
  );
}

export function MentorQualityPage() {
  const [rating, setRating] = useState(4);
  const [saved, setSaved] = useState(false);
  return (
    <ModuleGate module="mentor_hub">
      <Page narrow title="Mentor quality review" lede="How useful was this session? Your rating helps us suggest better matches.">
        <Card>
          {saved ? (
            <p role="status" className="text-[15px]">
              Thanks. Your rating of {rating} was saved in this session.
            </p>
          ) : (
            <>
              <label className="block text-[14px] font-medium">
                How useful was it? (1 is not useful, 5 is very useful)
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-2 block w-full"
                />
              </label>
              <p aria-live="polite" className="mt-2 text-[15px]">
                Your rating: {rating} of 5
              </p>
              <div className="mt-4">
                <Button onClick={() => setSaved(true)}>Save rating</Button>
              </div>
            </>
          )}
          <div className="mt-4">
            <Button to="/dashboard/mentor" variant="ghost">
              Back to Mentor Hub
            </Button>
          </div>
        </Card>
      </Page>
    </ModuleGate>
  );
}

const K_STEPS = [
  { id: "k1", label: "Confirm relinquishing institution contacts" },
  { id: "k2", label: "Collect equipment and unobligated balance list" },
  { id: "k3", label: "File transfer request with grants management" },
  { id: "k4", label: "Update Other Support and biosketches at the new site" },
];

export function KAwardPage() {
  useSession();
  return (
    <ModuleGate module="k_award">
      <Page
        title="Grant Transfer Workflow"
        lede="Plan the steps when an award or application moves to a new institution."
        actions={<Honesty>Demo checklist</Honesty>}
      >
        <Honesty>Previously called K Award Suite</Honesty>
        <Card className="mt-4 max-w-[720px]">
          <ul className="divide-y divide-line">
            {K_STEPS.map((s) => {
              const done = checklistDone("k_award", s.id);
              return (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-[15px]">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" checked={done} onChange={() => toggleChecklist("k_award", s.id)} />
                    <span className={done ? "text-muted line-through" : ""}>{s.label}</span>
                  </label>
                  <Badge tone={done ? "gold" : "muted"}>{done ? "Done" : "To do"}</Badge>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-[14px] text-muted">
            Related: <Link to="/dashboard/mentor">Mentor Hub</Link> for career plan sections on K applications.
          </p>
        </Card>
      </Page>
    </ModuleGate>
  );
}
