export type PlanId =
  | "free"
  | "trainee"
  | "investigator"
  | "investigator_plus"
  | "grantee_pro"
  | "institutional";

export type ModuleId =
  | "opening_statement"
  | "equity"
  | "mentor_chat"
  | "learning_center"
  | "pre_award"
  | "funding_discovery"
  | "trainee_gra"
  | "k_award"
  | "study_section"
  | "resubmission"
  | "budget"
  | "compliance"
  | "post_award"
  | "subaward"
  | "international"
  | "institutional"
  | "gap_analysis"
  | "gsn"
  | "mentor_hub";

export type PerspectiveId =
  | "P01"
  | "P02"
  | "P03"
  | "P04"
  | "P05"
  | "P06"
  | "P07"
  | "P08"
  | "P09"
  | "P10";

export const PLANS: {
  id: PlanId;
  name: string;
  price: string;
  monthly: number | null;
  modules: ModuleId[];
  perspectives: PerspectiveId[];
  chatCap: number;
  recommended?: boolean;
}[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    monthly: 0,
    modules: ["opening_statement", "equity", "mentor_chat", "learning_center"],
    perspectives: ["P10"],
    chatCap: 10,
  },
  {
    id: "trainee",
    name: "Trainee",
    price: "$19 / month",
    monthly: 19,
    modules: [
      "opening_statement",
      "equity",
      "mentor_chat",
      "learning_center",
      "pre_award",
      "funding_discovery",
      "trainee_gra",
      "k_award",
      "gap_analysis",
      "gsn",
      "mentor_hub",
    ],
    perspectives: ["P10", "P01", "P06"],
    chatCap: 40,
  },
  {
    id: "investigator",
    name: "Investigator",
    price: "$199 / month",
    monthly: 199,
    recommended: true,
    modules: [
      "opening_statement",
      "equity",
      "mentor_chat",
      "learning_center",
      "pre_award",
      "funding_discovery",
      "trainee_gra",
      "k_award",
      "study_section",
      "resubmission",
      "budget",
      "compliance",
      "gap_analysis",
      "gsn",
      "mentor_hub",
    ],
    perspectives: ["P10", "P01", "P06", "P02", "P07", "P08", "P09"],
    chatCap: 80,
  },
  {
    id: "investigator_plus",
    name: "Investigator+",
    price: "$279 / month",
    monthly: 279,
    modules: [
      "opening_statement",
      "equity",
      "mentor_chat",
      "learning_center",
      "pre_award",
      "funding_discovery",
      "trainee_gra",
      "k_award",
      "study_section",
      "resubmission",
      "budget",
      "compliance",
      "post_award",
      "subaward",
      "international",
      "gap_analysis",
      "gsn",
      "mentor_hub",
    ],
    perspectives: ["P10", "P01", "P06", "P02", "P07", "P08", "P09", "P03", "P05"],
    chatCap: 120,
  },
  {
    id: "grantee_pro",
    name: "Grantee Pro",
    price: "$349 / month",
    monthly: 349,
    modules: [
      "opening_statement",
      "equity",
      "mentor_chat",
      "learning_center",
      "pre_award",
      "funding_discovery",
      "trainee_gra",
      "k_award",
      "study_section",
      "resubmission",
      "budget",
      "compliance",
      "post_award",
      "subaward",
      "international",
      "institutional",
      "gap_analysis",
      "gsn",
      "mentor_hub",
    ],
    perspectives: ["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08", "P09", "P10"],
    chatCap: 200,
  },
  {
    id: "institutional",
    name: "Institutional",
    price: "Custom",
    monthly: null,
    modules: [
      "opening_statement",
      "equity",
      "mentor_chat",
      "learning_center",
      "pre_award",
      "funding_discovery",
      "trainee_gra",
      "k_award",
      "study_section",
      "resubmission",
      "budget",
      "compliance",
      "post_award",
      "subaward",
      "international",
      "institutional",
      "gap_analysis",
      "gsn",
      "mentor_hub",
    ],
    perspectives: ["P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08", "P09", "P10"],
    chatCap: 200,
  },
];

export const PERSPECTIVES: {
  id: PerspectiveId;
  name: string;
  group: string;
  nihOnly?: boolean;
}[] = [
  { id: "P01", name: "Study Section Reviewer", group: "Scientific review" },
  { id: "P02", name: "Program Officer", group: "Funding strategy", nihOnly: true },
  { id: "P03", name: "Advisory Council Member", group: "Funding strategy", nihOnly: true },
  { id: "P04", name: "Scientific Review Officer", group: "Review administration", nihOnly: true },
  { id: "P05", name: "Grants Management Specialist", group: "Review administration", nihOnly: true },
  { id: "P06", name: "Biostatistician", group: "Scientific review" },
  { id: "P07", name: "Equity Reviewer", group: "Relevance or impact" },
  { id: "P08", name: "Community Advocate", group: "Relevance or impact" },
  { id: "P09", name: "Generalist Reviewer", group: "Scientific review" },
  { id: "P10", name: "First-Time Applicant Mentor", group: "Guidance" },
];

export const MODULE_META: Record<
  ModuleId,
  { name: string; path: string; stage?: string }
> = {
  opening_statement: { name: "Opening Statement Optimizer", path: "/dashboard/opener" },
  equity: { name: "Equity Intelligence", path: "/dashboard/equity" },
  mentor_chat: { name: "Reviewer Perspectives", path: "/dashboard/reviewer-perspectives" },
  learning_center: { name: "Learning Center", path: "/learning-center" },
  pre_award: { name: "Pre-Award Notification System", path: "/dashboard/pre-award" },
  funding_discovery: { name: "Funding Discovery", path: "/dashboard/discovery" },
  trainee_gra: { name: "Trainee Learning Hub", path: "/dashboard/trainee" },
  k_award: { name: "Grant Transfer Workflow", path: "/dashboard/k-award" },
  study_section: { name: "Study Section Simulator", path: "/dashboard/study-section" },
  resubmission: { name: "Continuous Improvement System", path: "/dashboard/resubmission" },
  budget: { name: "Budget Builder", path: "/dashboard/budget" },
  compliance: { name: "Regulatory Compliance", path: "/dashboard/compliance" },
  post_award: { name: "Post-Award Manager", path: "/dashboard/post-award" },
  subaward: { name: "Subaward Invoice System", path: "/dashboard/subaward" },
  international: { name: "International Research", path: "/dashboard/international" },
  institutional: { name: "Research Office", path: "/dashboard/institutional" },
  gap_analysis: { name: "Grant Application Gap Analysis", path: "/dashboard/gap-analysis" },
  gsn: { name: "Grant Submission Navigator", path: "/dashboard/gsn" },
  mentor_hub: { name: "Mentor Hub", path: "/dashboard/mentor" },
};

export function planById(id: PlanId) {
  return PLANS.find((p) => p.id === id)!;
}

export function effectivePlan(accessState: string, plan: PlanId): PlanId {
  if (accessState === "trial" || accessState === "grace") return "grantee_pro";
  return plan;
}

export function hasModule(plan: PlanId, accessState: string, module: ModuleId) {
  const id = effectivePlan(accessState, plan);
  return planById(id).modules.includes(module);
}

export function hasPerspective(plan: PlanId, accessState: string, p: PerspectiveId) {
  const id = effectivePlan(accessState, plan);
  return planById(id).perspectives.includes(p);
}

export function canUseVoice(plan: PlanId, accessState: string) {
  const id = effectivePlan(accessState, plan);
  return ["investigator", "investigator_plus", "grantee_pro", "institutional"].includes(id);
}
