import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PERSPECTIVES, canUseVoice, hasPerspective, planById } from "../lib/plans";
import { selectWorkspace, sendChatMessage, startChat, useSession } from "../lib/session";
import { ModuleGate } from "../components/AccessGate";
import { Button, Card, Field, Honesty, Page, inputClass } from "../components/ui";

const nameOf = (id: string) => PERSPECTIVES.find((p) => p.id === id)?.name ?? id;

export function PerspectivesPage() {
  return (
    <ModuleGate module="mentor_chat">
      <PerspectivesInner />
    </ModuleGate>
  );
}

function PerspectivesInner() {
  const { user, workspaces, selectedWorkspaceId, chats } = useSession();
  const [params] = useSearchParams();
  const [stage, setStage] = useState("Drafting aims");
  const [activeChatId, setActiveChatId] = useState(params.get("chat") ?? "");

  useEffect(() => {
    const chatId = params.get("chat");
    if (chatId) setActiveChatId(chatId);
  }, [params]);
  const [message, setMessage] = useState("");
  const [crisisOpen, setCrisisOpen] = useState(false);
  const [limitMsg, setLimitMsg] = useState("");
  const [voiceNote, setVoiceNote] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];
  const recommended = useMemo(() => ["P01", "P10", "P06"], []);

  if (!user) return null;

  const voiceOk = canUseVoice(user.plan, user.accessState);
  const cap = planById(
    user.accessState === "trial" || user.accessState === "grace" ? "grantee_pro" : user.plan,
  ).chatCap;

  function openPerspective(id: (typeof PERSPECTIVES)[number]["id"]) {
    if (!hasPerspective(user!.plan, user!.accessState, id)) return;
    const chat = startChat({
      perspectiveId: id,
      workspaceId: selectedWorkspaceId,
      stage,
    });
    setActiveChatId(chat.id);
    setLimitMsg("");
    if (window.innerWidth < 1024) setTimeout(() => chatRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function onSend(e: FormEvent) {
    e.preventDefault();
    if (!activeChat || !message.trim()) return;
    const result = sendChatMessage(activeChat.id, message.trim());
    if (result?.limited) {
      setLimitMsg(`You have used all ${cap} conversations on your plan this month. Upgrade your plan or wait until next month.`);
      return;
    }
    setMessage("");
    setLimitMsg("");
  }

  return (
    <Page
      title="Reviewer Perspectives"
      lede="Ask how a specific kind of reviewer would read your draft. Pick a perspective to start."
    >
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <Field label="Grant workspace">
          <select className={inputClass} value={selectedWorkspaceId ?? ""} onChange={(e) => selectWorkspace(e.target.value)}>
            {workspaces.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title}
              </option>
            ))}
            {workspaces.length === 0 ? <option value="">No grant yet</option> : null}
          </select>
        </Field>
        <Field label="Where are you right now?">
          <select className={inputClass} value={stage} onChange={(e) => setStage(e.target.value)}>
            <option>Drafting aims</option>
            <option>After analysis</option>
            <option>Preparing resubmission</option>
            <option>Nervous before submitting</option>
          </select>
        </Field>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-gold-text">Recommended first</h2>
          <div className="mt-3 space-y-2">
            {PERSPECTIVES.filter((p) => recommended.includes(p.id)).map((p) => (
              <PerspectiveCard
                key={p.id}
                {...p}
                locked={!hasPerspective(user.plan, user.accessState, p.id)}
                onOpen={() => openPerspective(p.id)}
              />
            ))}
          </div>
          <h2 className="mt-6 text-[13px] font-bold uppercase tracking-[0.12em] text-muted">More perspectives</h2>
          <div className="mt-3 space-y-2">
            {PERSPECTIVES.filter((p) => !recommended.includes(p.id)).map((p) => (
              <PerspectiveCard
                key={p.id}
                {...p}
                locked={!hasPerspective(user.plan, user.accessState, p.id)}
                onOpen={() => openPerspective(p.id)}
              />
            ))}
          </div>
          {PERSPECTIVES.some((p) => !hasPerspective(user.plan, user.accessState, p.id)) ? (
            <p className="mt-4 text-[14px] text-muted">
              Perspectives marked "Not on your plan" open on higher plans.{" "}
              <Link to="/dashboard/plans" className="text-gold-text underline underline-offset-2">
                Compare plans
              </Link>
            </p>
          ) : null}
        </div>

        <Card className="lg:sticky lg:top-24 lg:self-start">
          <div ref={chatRef} className="scroll-mt-24" />
          {activeChat ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[22px]">{nameOf(activeChat.perspectiveId)}</h2>
                <p className="text-[12px] text-muted">
                  {user.chatUsedThisMonth} of {cap} conversations used this month
                </p>
              </div>
              {activeChat.linkedAnalysisId ? (
                <p className="mt-2 text-[13px] text-gold-text">Linked to analysis: this perspective can see your latest review result.</p>
              ) : null}
              <ol aria-live="polite" aria-label="Messages" className="mt-4 max-h-[360px] space-y-3 overflow-y-auto rounded-[12px] bg-bg-2 p-3">
                {activeChat.messages.map((m, i) => (
                  <li key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <p
                      className={`max-w-[85%] rounded-[12px] px-3 py-2 text-[14px] leading-[1.5] ${
                        m.role === "user" ? "bg-band text-band-ink" : "bg-surface text-ink ring-1 ring-line"
                      }`}
                    >
                      <span className="sr-only">{m.role === "user" ? "You: " : `${nameOf(activeChat.perspectiveId)}: `}</span>
                      {m.text}
                    </p>
                  </li>
                ))}
              </ol>
              {limitMsg ? (
                <p role="alert" className="mt-3 text-[14px] text-danger">
                  {limitMsg}
                </p>
              ) : null}
              <form onSubmit={onSend} className="mt-4 space-y-3">
                <label htmlFor="chat-message" className="sr-only">
                  Your message
                </label>
                <textarea
                  id="chat-message"
                  className={`${inputClass} min-h-[88px]`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) onSend(e);
                  }}
                  placeholder="e.g. What would a reviewer question first in my Aim 2?"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button type="submit" disabled={!message.trim()}>
                    Send
                  </Button>
                  <Button type="button" variant="danger" onClick={() => setCrisisOpen(true)}>
                    Urgent help
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={!voiceOk}
                    onClick={() =>
                      setVoiceNote(
                        voiceOk
                          ? "Voice conversations are coming soon. Nothing is recorded."
                          : "Voice is available from Investigator plans upward.",
                      )
                    }
                  >
                    Voice
                  </Button>
                </div>
                {!voiceOk ? (
                  <p className="text-[12px] text-muted">Voice is available on the Investigator plan and above.</p>
                ) : null}
                {voiceNote ? <p className="text-[13px] text-muted">{voiceNote}</p> : null}
              </form>
            </>
          ) : (
            <div className="py-6 text-center">
              <p className="text-[16px]">No conversation open</p>
              <p className="mt-1 text-[14px] text-muted">Choose a perspective from the list to start.</p>
            </div>
          )}

          <div className="mt-8 border-t border-line pt-4">
            <h3 className="text-[14px] font-medium">Your conversations</h3>
            <ul className="mt-2 space-y-1 text-[13px]">
              {chats.slice(0, 8).map((c) => (
                <li key={c.id}>
                  <button type="button" className="underline" onClick={() => setActiveChatId(c.id)}>
                    {nameOf(c.perspectiveId)} · {c.stage}
                  </button>
                </li>
              ))}
              {chats.length === 0 ? <li className="text-muted">Your past conversations will show here.</li> : null}
            </ul>
          </div>
        </Card>
      </div>

      {crisisOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/40 p-4">
          <Card className="max-w-md">
            <h2 className="font-display text-[22px]">Urgent help</h2>
            <p className="mt-3 text-[14px] text-muted">
              If you are in crisis, contact local emergency services or a trusted person now. This product does not
              replace clinical care.
            </p>
            <ul className="mt-4 space-y-2 text-[14px]">
              <li>US: 988 Suicide and Crisis Lifeline</li>
              <li>International: findahelpline.com</li>
            </ul>
            <div className="mt-4">
              <Button onClick={() => setCrisisOpen(false)}>Close</Button>
            </div>
          </Card>
        </div>
      )}
    </Page>
  );
}

function PerspectiveCard({
  name,
  group,
  locked,
  onOpen,
}: {
  id: string;
  name: string;
  group: string;
  locked: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      disabled={locked}
      onClick={onOpen}
      className="flex w-full items-start justify-between rounded-xl border border-line bg-surface px-3 py-3 text-left disabled:opacity-60"
    >
      <span>
        <span className="block text-[14px] font-medium">
          {name}
        </span>
        <span className="text-[12px] text-muted">{group}</span>
      </span>
      {locked ? <Honesty>Not on your plan</Honesty> : null}
    </button>
  );
}
