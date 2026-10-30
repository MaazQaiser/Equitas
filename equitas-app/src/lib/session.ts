import { useSyncExternalStore } from "react";
import type { ModuleId, PerspectiveId, PlanId } from "./plans";
import { PERSPECTIVES, planById } from "./plans";

export type AccessState = "trial" | "grace" | "suspended" | "paid" | "signed_out";

export type RoleId =
  | "preparing"
  | "k_award"
  | "fellowship"
  | "t32pd"
  | "active_pi"
  | "institutional"
  | "other";

export type Confidence = "Reviewer-calibrated" | "Framework-calibrated" | "General guidance";

export type Workspace = {
  id: string;
  title: string;
  funder: string;
  ic: string;
  mechanism: string;
  revision: "A0" | "A1";
  deadline: string;
  foa: string;
  gsnStage: number;
  progress: number;
};

export type Analysis = {
  id: string;
  module: ModuleId;
  workspaceId: string;
  input: string;
  scores?: { name: string; value: number | string }[];
  overall?: number;
  confidence: Confidence;
  confidenceNote?: string;
  priorityActions: string[];
  createdAt: string;
};

export type ChatMessage = { role: "user" | "assistant"; text: string };

export type Chat = {
  id: string;
  perspectiveId: PerspectiveId;
  workspaceId: string | null;
  stage: string;
  messages: ChatMessage[];
  linkedAnalysisId?: string;
  updatedAt: string;
};

export type ShareToken = {
  token: string;
  workspaceId: string;
  title: string;
  expiresAt: string;
  comments: { author: string; text: string; at: string }[];
  decision: "pending" | "approved" | "changes_requested";
};

export type EquityRequest = {
  id: string;
  email: string;
  country: string;
  status: "pending" | "approved" | "rejected";
};

export type WaitlistEntry = { id: string; role: string; email: string; at: string };

export type User = {
  email: string;
  name: string;
  role: RoleId;
  persona: string;
  careerStage: "early" | "mid" | "established";
  funder: "NIH" | "CIHR" | "International";
  plan: PlanId;
  accessState: AccessState;
  isFounder: boolean;
  invitedInstitutional: boolean;
  trialEndsAt: string | null;
  notifications: { deadlines: boolean; tips: boolean; product: boolean };
  chatUsedThisMonth: number;
  onboarded: boolean;
};

export type BudgetLine = { id: string; label: string; amount: number };
export type ChecklistMap = Record<string, Record<string, boolean>>;

export type Session = {
  user: User | null;
  workspaces: Workspace[];
  selectedWorkspaceId: string | null;
  analyses: Analysis[];
  chats: Chat[];
  shares: ShareToken[];
  equityRequests: EquityRequest[];
  waitlist: WaitlistEntry[];
  theme: "light" | "dark";
  language: string;
  billingAnnual: boolean;
  /** Prototype-only UI state for incomplete modules */
  checklists: ChecklistMap;
  budgetLines: BudgetLine[];
  lessonsDone: string[];
  mentorMatchId: string | null;
  searchRecent: string[];
};

const KEY = "equitas-app-session-v1";
const GSN_STAGES = [
  "Setup",
  "Narrative",
  "Review",
  "Documents",
  "Approval",
  "Final",
  "Go / No-Go",
  "Submitted",
];

export { GSN_STAGES };

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

const DEFAULT_BUDGET: BudgetLine[] = [
  { id: "b1", label: "Personnel", amount: 180000 },
  { id: "b2", label: "Supplies", amount: 24000 },
  { id: "b3", label: "Travel", amount: 6000 },
  { id: "b4", label: "Indirect costs at 56%", amount: 117600 },
];

function emptySession(): Session {
  return {
    user: null,
    workspaces: [],
    selectedWorkspaceId: null,
    analyses: [],
    chats: [],
    shares: [],
    equityRequests: [],
    waitlist: [],
    theme: "light",
    language: "English",
    billingAnnual: false,
    checklists: {},
    budgetLines: DEFAULT_BUDGET,
    lessonsDone: [],
    mentorMatchId: null,
    searchRecent: [],
  };
}

function load(): Session {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return emptySession();
    return { ...emptySession(), ...JSON.parse(raw) } as Session;
  } catch {
    return emptySession();
  }
}

let state: Session = typeof window !== "undefined" ? load() : emptySession();
const listeners = new Set<() => void>();

function emit() {
  sessionStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.lang = state.language === "العربية" ? "ar" : "en";
  document.documentElement.dir = state.language === "العربية" ? "rtl" : "ltr";
}

function set(partial: Partial<Session> | ((s: Session) => Session)) {
  state = typeof partial === "function" ? partial(state) : { ...state, ...partial };
  emit();
}

export function getSession() {
  return state;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSession() {
  return useSyncExternalStore(subscribe, getSession, emptySession);
}

export function defaultPersona(role: RoleId): string {
  switch (role) {
    case "preparing":
      return "Mid-Career Investigator";
    case "k_award":
      return "K-Award";
    case "fellowship":
      return "Fellowship";
    case "t32pd":
      return "T32 Program Director";
    case "active_pi":
      return "Active PI";
    case "institutional":
      return "Institutional Track";
    default:
      return "Active PI";
  }
}

export function signUp(email: string, name: string, asFounder = false) {
  const user: User = {
    email,
    name,
    role: "preparing",
    persona: "Mid-Career Investigator",
    careerStage: "mid",
    funder: "NIH",
    plan: "free",
    accessState: asFounder ? "paid" : "trial",
    isFounder: asFounder,
    invitedInstitutional: false,
    trialEndsAt: asFounder ? null : daysFromNow(14),
    notifications: { deadlines: true, tips: true, product: false },
    chatUsedThisMonth: 0,
    onboarded: asFounder,
  };
  set({ user, workspaces: [], selectedWorkspaceId: null });
}

export function signInPreset(
  kind: "free" | "trial" | "grace" | "suspended" | "founder" | "institutional" | "investigator",
) {
  const base: User = {
    email: `${kind}@equitas.demo`,
    name: kind === "founder" ? "Founder" : "Demo Researcher",
    role: kind === "institutional" ? "institutional" : kind === "founder" ? "preparing" : "preparing",
    persona: kind === "institutional" ? "Institutional Track" : "Mid-Career Investigator",
    careerStage: "mid",
    funder: "NIH",
    plan: "free",
    accessState: "paid",
    isFounder: kind === "founder",
    invitedInstitutional: kind === "institutional",
    trialEndsAt: null,
    notifications: { deadlines: true, tips: true, product: false },
    chatUsedThisMonth: 0,
    onboarded: true,
  };

  if (kind === "free") {
    base.plan = "free";
    base.accessState = "paid";
  } else if (kind === "trial") {
    base.plan = "free";
    base.accessState = "trial";
    base.trialEndsAt = daysFromNow(1);
    base.onboarded = true;
  } else if (kind === "grace") {
    base.plan = "free";
    base.accessState = "grace";
    base.trialEndsAt = daysFromNow(-1);
  } else if (kind === "suspended") {
    base.plan = "free";
    base.accessState = "suspended";
  } else if (kind === "investigator") {
    base.plan = "investigator";
    base.accessState = "paid";
  } else if (kind === "institutional") {
    base.plan = "institutional";
    base.accessState = "paid";
    base.role = "institutional";
  } else if (kind === "founder") {
    base.isFounder = true;
    base.plan = "grantee_pro";
    base.accessState = "paid";
  }

  const workspaces =
    kind === "founder" || kind === "suspended"
      ? []
      : [
          {
            id: "ws_demo",
            title: "R01 readmission trial",
            funder: "NIH",
            ic: "NHLBI",
            mechanism: "R01",
            revision: "A0" as const,
            deadline: daysFromNow(45).slice(0, 10),
            foa: "PAR-25-123",
            gsnStage: 2,
            progress: 35,
          },
        ];

  set({
    user: base,
    workspaces,
    selectedWorkspaceId: workspaces[0]?.id ?? null,
  });
}

export function signOut() {
  set({
    user: null,
    workspaces: [],
    selectedWorkspaceId: null,
    analyses: [],
    chats: [],
  });
}

export function updateUser(patch: Partial<User>) {
  if (!state.user) return;
  set({ user: { ...state.user, ...patch } });
}

export function completeOnboarding(role: RoleId, plan: PlanId, startTrial: boolean) {
  if (!state.user) return;
  updateUser({
    role: role === "other" ? "active_pi" : role,
    persona: defaultPersona(role === "other" ? "active_pi" : role),
    plan,
    accessState: startTrial ? "trial" : "paid",
    trialEndsAt: startTrial ? daysFromNow(14) : null,
    onboarded: true,
  });
}

export function setPlan(plan: PlanId) {
  updateUser({ plan, accessState: "paid", trialEndsAt: null });
}

export function cancelPlan() {
  updateUser({ plan: "free", accessState: "paid" });
}

export function createWorkspace(input: Omit<Workspace, "id" | "gsnStage" | "progress">) {
  const ws: Workspace = { ...input, id: uid("ws"), gsnStage: 0, progress: 5 };
  set({
    workspaces: [...state.workspaces, ws],
    selectedWorkspaceId: ws.id,
  });
  return ws;
}

export function selectWorkspace(id: string) {
  set({ selectedWorkspaceId: id });
}

export function setGsnStage(workspaceId: string, stage: number) {
  set({
    workspaces: state.workspaces.map((w) =>
      w.id === workspaceId
        ? { ...w, gsnStage: stage, progress: Math.round(((stage + 1) / 8) * 100) }
        : w,
    ),
  });
}

export function runAnalysis(
  module: ModuleId,
  workspaceId: string,
  input: string,
): Analysis {
  const analysis: Analysis = {
    id: uid("an"),
    module,
    workspaceId,
    input,
    confidence: "Reviewer-calibrated",
    confidenceNote: "Illustrative sample. Not a real study section score.",
    priorityActions: [
      "State the effect size the pilot actually supports next to the proposed sample.",
      "Name the power assumption in Aim 2 so a skeptical reader can test it.",
      "Say plainly that practicality is the point, not a limitation.",
    ],
    createdAt: new Date().toISOString(),
  };

  if (module === "study_section") {
    analysis.scores = [
      { name: "Factor 1 Importance", value: 3 },
      { name: "Factor 2 Rigor and Feasibility", value: 6 },
      { name: "Factor 3 Expertise and Resources", value: "Sufficient" },
    ];
    analysis.overall = 3;
  } else if (module === "gap_analysis") {
    analysis.scores = [
      { name: "Power assumption", value: "High gap" },
      { name: "Outcome definition", value: "Medium gap" },
      { name: "Team fit", value: "Low gap" },
    ];
  } else if (module === "equity") {
    analysis.scores = [
      { name: "Population inclusion", value: 4 },
      { name: "Community relevance", value: 5 },
      { name: "Access barriers", value: 3 },
    ];
  } else {
    analysis.scores = [{ name: "Opening clarity", value: 4 }];
  }

  set({ analyses: [analysis, ...state.analyses] });
  return analysis;
}

export function startChat(opts: {
  perspectiveId: PerspectiveId;
  workspaceId: string | null;
  stage: string;
  linkedAnalysisId?: string;
  seed?: string;
}) {
  const chat: Chat = {
    id: uid("chat"),
    perspectiveId: opts.perspectiveId,
    workspaceId: opts.workspaceId,
    stage: opts.stage,
    linkedAnalysisId: opts.linkedAnalysisId,
    messages: opts.seed
      ? [
          {
            role: "assistant",
            text: `I can see your latest review result. ${opts.seed}`,
          },
        ]
      : [
          {
            role: "assistant",
            text: `I will read your work the way a ${PERSPECTIVES.find((p) => p.id === opts.perspectiveId)?.name ?? "reviewer"} would. What would you like me to look at?`,
          },
        ],
    updatedAt: new Date().toISOString(),
  };
  set({ chats: [chat, ...state.chats] });
  if (state.user) {
    updateUser({ chatUsedThisMonth: state.user.chatUsedThisMonth + 1 });
  }
  return chat;
}

export function sendChatMessage(chatId: string, text: string) {
  const chat = state.chats.find((c) => c.id === chatId);
  if (!chat || !state.user) return;
  const cap = planById(
    state.user.accessState === "trial" || state.user.accessState === "grace"
      ? "grantee_pro"
      : state.user.plan,
  ).chatCap;
  if (state.user.chatUsedThisMonth >= cap) {
    return { limited: true as const };
  }
  const reply =
    "A skeptical reader will look for evidence in the draft, not reassurance. Name the assumption, show the pilot number, and say what the sample can detect.";
  set({
    chats: state.chats.map((c) =>
      c.id === chatId
        ? {
            ...c,
            messages: [
              ...c.messages,
              { role: "user", text },
              { role: "assistant", text: reply },
            ],
            updatedAt: new Date().toISOString(),
          }
        : c,
    ),
  });
  updateUser({ chatUsedThisMonth: state.user.chatUsedThisMonth + 1 });
  return { limited: false as const };
}

export function createShare(workspaceId: string, title: string) {
  const token = uid("tok");
  const share: ShareToken = {
    token,
    workspaceId,
    title,
    expiresAt: daysFromNow(7),
    comments: [],
    decision: "pending",
  };
  set({ shares: [share, ...state.shares] });
  return share;
}

export function createExpiredShare(workspaceId: string) {
  const token = uid("tok");
  const share: ShareToken = {
    token,
    workspaceId,
    title: "Expired sample document",
    expiresAt: daysFromNow(-1),
    comments: [],
    decision: "pending",
  };
  set({ shares: [share, ...state.shares] });
  return share;
}

export function findShare(token: string) {
  return state.shares.find((s) => s.token === token);
}

export function commentOnShare(token: string, author: string, text: string) {
  set({
    shares: state.shares.map((s) =>
      s.token === token
        ? {
            ...s,
            comments: [...s.comments, { author, text, at: new Date().toISOString() }],
          }
        : s,
    ),
  });
}

export function decideShare(token: string, decision: ShareToken["decision"]) {
  set({
    shares: state.shares.map((s) => (s.token === token ? { ...s, decision } : s)),
  });
}

export function addWaitlist(role: string, email: string) {
  set({
    waitlist: [
      { id: uid("wl"), role, email, at: new Date().toISOString() },
      ...state.waitlist,
    ],
  });
}

export function requestEquity(email: string, country: string) {
  set({
    equityRequests: [
      { id: uid("eq"), email, country, status: "pending" },
      ...state.equityRequests,
    ],
  });
}

export function reviewEquity(id: string, status: "approved" | "rejected") {
  set({
    equityRequests: state.equityRequests.map((e) => (e.id === id ? { ...e, status } : e)),
  });
}

export function setTheme(theme: "light" | "dark") {
  set({ theme });
}

export function setLanguage(language: string) {
  set({ language });
}

export function setBillingAnnual(billingAnnual: boolean) {
  set({ billingAnnual });
}

export function toggleChecklist(group: string, id: string) {
  const g = state.checklists[group] ?? {};
  set({
    checklists: {
      ...state.checklists,
      [group]: { ...g, [id]: !g[id] },
    },
  });
}

export function setChecklistItem(group: string, id: string, value: boolean) {
  const g = state.checklists[group] ?? {};
  set({
    checklists: {
      ...state.checklists,
      [group]: { ...g, [id]: value },
    },
  });
}

export function checklistDone(group: string, id: string) {
  return Boolean(state.checklists[group]?.[id]);
}

export function setBudgetLine(id: string, patch: Partial<BudgetLine>) {
  set({
    budgetLines: state.budgetLines.map((l) => (l.id === id ? { ...l, ...patch } : l)),
  });
}

export function addBudgetLine(label: string, amount: number) {
  set({ budgetLines: [...state.budgetLines, { id: uid("bl"), label, amount }] });
}

export function removeBudgetLine(id: string) {
  set({ budgetLines: state.budgetLines.filter((l) => l.id !== id) });
}

export function markLessonDone(id: string) {
  if (state.lessonsDone.includes(id)) return;
  set({ lessonsDone: [...state.lessonsDone, id] });
}

export function setMentorMatch(id: string | null) {
  set({ mentorMatchId: id });
}

export function pushSearchRecent(q: string) {
  const t = q.trim();
  if (!t) return;
  set({ searchRecent: [t, ...state.searchRecent.filter((x) => x !== t)].slice(0, 8) });
}

export function trialDaysLeft(user: User | null) {
  if (!user?.trialEndsAt) return null;
  const ms = new Date(user.trialEndsAt).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

// Apply theme on load
if (typeof document !== "undefined") {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.dir = state.language === "العربية" ? "rtl" : "ltr";
}
