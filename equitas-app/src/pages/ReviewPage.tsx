import { useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";
import { commentOnShare, decideShare, useSession } from "../lib/session";
import { Badge, Button, Card, Field, Page, formatDate, inputClass } from "../components/ui";

const DECISION_LABEL = {
  pending: "Waiting for your decision",
  approved: "Approved",
  changes_requested: "Changes requested",
} as const;

export function ReviewPage() {
  const { token = "" } = useParams();
  const { shares } = useSession();
  const share = shares.find((s) => s.token === token);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<{ author?: string; text?: string }>({});

  if (!share) {
    return (
      <Page narrow title="This link does not work" lede="It may have been typed wrong, or the applicant may have removed it.">
        <Card>
          <p className="text-[15px] text-muted">Ask the person who sent it for a new link.</p>
        </Card>
      </Page>
    );
  }

  if (new Date(share.expiresAt).getTime() < Date.now()) {
    return (
      <Page narrow title="This link has expired" lede="Review links work for 7 days.">
        <Card>
          <p className="text-[15px] text-muted">This one expired on {formatDate(share.expiresAt)}. Ask the applicant to send a fresh link.</p>
        </Card>
      </Page>
    );
  }

  function onComment(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!author.trim()) next.author = "Add your name so the applicant knows who commented.";
    if (!text.trim()) next.text = "Write a comment before you send it.";
    setErrors(next);
    if (Object.keys(next).length) return;
    commentOnShare(token, author.trim(), text.trim());
    setText("");
  }

  return (
    <Page
      eyebrow="Outside review"
      title={share.title}
      lede={
        <>
          You were asked to read this draft. You do not need an account. Link expires {formatDate(share.expiresAt)}.
          <span className="mt-3 flex items-center gap-2">
            <span className="text-[14px]">Decision:</span>
            <Badge tone={share.decision === "changes_requested" ? "danger" : share.decision === "approved" ? "gold" : "muted"}>
              {DECISION_LABEL[share.decision]}
            </Badge>
          </span>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <h2 className="text-[20px]">Comments</h2>
          <ul className="mt-3 divide-y divide-line text-[15px]">
            {share.comments.map((c, i) => (
              <li key={i} className="py-3">
                <p className="font-medium">{c.author}</p>
                <p className="mt-1 text-muted">{c.text}</p>
              </li>
            ))}
            {share.comments.length === 0 ? <li className="py-3 text-muted">No comments yet. Yours will be the first.</li> : null}
          </ul>
          <form noValidate className="mt-4 space-y-4 border-t border-line pt-4" onSubmit={onComment}>
            <Field label="Your name" error={errors.author}>
              <input autoComplete="name" placeholder="e.g. Dr. Lee, Biostatistics" className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Field>
            <Field label="Comment" error={errors.text}>
              <textarea placeholder="What should the applicant change or keep?" className={`${inputClass} min-h-[120px]`} value={text} onChange={(e) => setText(e.target.value)} />
            </Field>
            <Button type="submit" variant="ghost">
              Add comment
            </Button>
          </form>
        </Card>
        <Card className="lg:self-start">
          <h2 className="text-[20px]">Your decision</h2>
          <p className="mt-2 text-[14px] text-muted">The applicant sees this straight away. You can change it later.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => decideShare(token, "approved")}>Approve</Button>
            <Button variant="ghost" onClick={() => decideShare(token, "changes_requested")}>
              Request changes
            </Button>
          </div>
        </Card>
      </div>
    </Page>
  );
}
