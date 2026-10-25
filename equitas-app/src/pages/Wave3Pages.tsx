import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModuleGate } from "../components/AccessGate";
import { Button, Card, Field, Honesty, Page, inputClass } from "../components/ui";

export function MentorHubPage() {
  return (
    <ModuleGate module="mentor_hub">
      <Page
        title="Mentor Hub"
        lede="Choose the kind of mentor you need, keep notes from each session, and tell us how it went."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Career development mentor", focus: "K / F path" },
            { name: "Methods mentor", focus: "Design and stats" },
            { name: "Writing mentor", focus: "Narrative clarity" },
          ].map((m) => (
            <Card key={m.name}>
              <h2 className="font-display text-[20px]">{m.name}</h2>
              <p className="mt-2 text-[13px] text-muted">{m.focus}</p>
              <div className="mt-4">
                <Button to="/dashboard/mentor-session">Start session</Button>
              </div>
            </Card>
          ))}
        </div>
      </Page>
    </ModuleGate>
  );
}

export function MentorSessionPage() {
  const [note, setNote] = useState("");
  const navigate = useNavigate();
  return (
    <ModuleGate module="mentor_hub">
      <Page narrow title="Mentor session" lede="Write down what you discussed and what you will do next. Mentor matching is not live yet, so no one is contacted.">
        <Card>
          <Field label="Session notes">
            <textarea
              className={`${inputClass} min-h-[160px]`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What did you discuss? What will you do before the next session?"
            />
          </Field>
          <div className="mt-4">
            <Button onClick={() => navigate("/dashboard/mentor-quality")}>End session and rate it</Button>
          </div>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function MentorQualityPage() {
  const [rating, setRating] = useState(4);
  return (
    <ModuleGate module="mentor_hub">
      <Page narrow title="Mentor quality review" lede="How useful was this session? Your rating helps us suggest better matches.">
        <Card>
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
          <p aria-live="polite" className="mt-2 text-[15px]">Your rating: {rating} of 5</p>
          <div className="mt-4">
            <Button to="/dashboard/mentor">Back to Mentor Hub</Button>
          </div>
        </Card>
      </Page>
    </ModuleGate>
  );
}

export function KAwardPage() {
  return (
    <ModuleGate module="k_award">
      <Page
        title="Grant Transfer Workflow"
        lede="Plan the steps when an award or application moves to a new institution."
      >
        <Honesty>Previously called K Award Suite</Honesty>
        <Card className="mt-4 space-y-3 text-[14px]">
          <p>1. Confirm relinquishing institution contacts</p>
          <p>2. Collect equipment and unobligated balance list</p>
          <p>3. File transfer request with grants management</p>
          <p>4. Update Other Support and biosketches at the new site</p>
          <p className="text-muted">
            Related: <Link to="/dashboard/mentor">Mentor Hub</Link> for career plan sections on K applications.
          </p>
        </Card>
      </Page>
    </ModuleGate>
  );
}
