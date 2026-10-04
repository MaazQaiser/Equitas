import {
  GUIDES,
  MODULES,
  STAGES,
  audienceKey,
  guideHref,
  moduleWeight,
  type AudienceKey,
  type Guide,
} from "@/lib/content";
import { NEEDS, moduleSlug } from "@/lib/onboarding";

export type SearchHit = {
  kind: "tool" | "guide" | "stage";
  title: string;
  body: string;
  href: string;
  stage?: string;
  weight: number;
};

const NEED_RULES: { keys: string[]; need: string }[] = [
  { keys: ["not funded", "was not funded", "rejected", "triage", "summary statement", "resubmit", "a1", "critiques"], need: "unfunded" },
  { keys: ["score", "study section", "how it will be scored", "simulator"], need: "scored" },
  { keys: ["k award", "career development", "mentor plan", "plan my k", "specific aims", "review my aims", "fellowship", "f31", "f32", "t32"], need: "writing" },
  { keys: ["find funding", "funding that fits", "who funded"], need: "funding" },
  { keys: ["irb", "human subjects", "regulatory", "planning my study"], need: "study" },
  { keys: ["rppr", "progress report", "no-cost", "nce", "grant ends", "award i have"], need: "award" },
];

const INTENTS: { keys: string[]; module: string; order?: number }[] = [
  { keys: ["not funded", "was not funded", "rejected", "triage", "summary statement", "resubmit", "a1", "critiques"], module: "Resubmission Strategy", order: 0 },
  { keys: ["not funded", "was not funded", "rejected", "summary statement", "critiques"], module: "Study Section Simulator", order: 1 },
  { keys: ["specific aims", "review my aims", "aims", "pre-award", "draft section"], module: "Pre-Award Review" },
  { keys: ["k award", "career development", "mentor plan", "plan my k"], module: "K Award Suite" },
  { keys: ["f31", "f32", "t32", "fellowship", "trainee", "gra"], module: "Trainee & GRA Tools" },
  { keys: ["find funding", "funding that fits", "who funded", "reporter", "imagine"], module: "Funding Discovery" },
  { keys: ["score", "study section", "how it will be scored", "simulator", "reviewer"], module: "Study Section Simulator" },
  { keys: ["irb", "human subjects", "regulatory", "compliance", "policy"], module: "Regulatory Compliance" },
  { keys: ["erc", "wellcome", "cihr", "nhmrc", "international", "non-us"], module: "International Research" },
  { keys: ["rppr", "progress report", "no-cost", "nce", "grant ends", "award i have"], module: "Post-Award Management" },
  { keys: ["subaward", "subcontract", "invoice"], module: "Subaward & Invoicing" },
  { keys: ["budget", "finance", "audit"], module: "Budget & Finance" },
  { keys: ["pipeline", "department", "faculty", "chair"], module: "Institutional Intelligence" },
];

function normalize(q: string) {
  return q.toLowerCase().replace(/[“”"]/g, "").replace(/\s+/g, " ").trim();
}

export function inferNeedFromQuery(query: string) {
  const q = normalize(query);
  if (!q) return undefined;
  return NEED_RULES.find((rule) => rule.keys.some((word) => q.includes(word)))?.need;
}

export function inferFromFromQuery(query: string) {
  const need = inferNeedFromQuery(query);
  if (!need) return undefined;
  return NEEDS.find((item) => item.id === need)?.stage;
}

function rankFor(name: string, audience?: AudienceKey) {
  const weight = moduleWeight(name, audience);
  if (weight === "primary") return 0;
  if (weight === "secondary") return 1;
  return 2;
}

export function searchCatalog(query: string, audience?: string): SearchHit[] {
  const q = normalize(query);
  if (!q) return [];
  const key = audienceKey(audience);
  const hits: SearchHit[] = [];

  for (const intent of INTENTS) {
    if (intent.keys.some((word) => q.includes(word))) {
      const tool = MODULES.find((item) => item.name === intent.module);
      if (tool) {
        hits.push({
          kind: "tool",
          title: tool.name,
          body: tool.description,
          href: `/app/tool?module=${moduleSlug(tool.name)}`,
          stage: tool.stage ?? "Institutions",
          weight: intent.order ?? rankFor(tool.name, key),
        });
      }
    }
  }

  for (const tool of MODULES) {
    const hay = `${tool.name} ${tool.description} ${tool.stage ?? ""}`.toLowerCase();
    if (q.split(" ").every((word) => word.length < 3 || hay.includes(word))) {
      if (!hits.some((hit) => hit.title === tool.name)) {
        hits.push({
          kind: "tool",
          title: tool.name,
          body: tool.description,
          href: `/app/tool?module=${moduleSlug(tool.name)}`,
          stage: tool.stage ?? "Institutions",
          weight: rankFor(tool.name, key) + 3,
        });
      }
    }
  }

  for (const guide of GUIDES) {
    const hay = `${guide.title} ${guide.line} ${guide.body.join(" ")}`.toLowerCase();
    if (q.split(" ").some((word) => word.length > 3 && hay.includes(word))) {
      hits.push({
        kind: "guide",
        title: guide.title,
        body: guide.line,
        href: guideHref(guide),
        stage: guide.stage,
        weight: 4,
      });
    }
  }

  for (const stage of STAGES) {
    const hay = `${stage.name} ${stage.promise}`.toLowerCase();
    if (hay.includes(q) || q.includes(stage.name.toLowerCase())) {
      hits.push({
        kind: "stage",
        title: stage.name,
        body: stage.promise,
        href: `/journey/${stage.slug}`,
        stage: stage.name,
        weight: 5,
      });
    }
  }

  const sorted = hits.sort((a, b) => a.weight - b.weight || a.title.localeCompare(b.title));
  if (inferNeedFromQuery(q) !== "unfunded") return sorted;

  const guide = GUIDES.find((item) => item.slug === "how-grant-review-works");
  if (guide && !sorted.some((hit) => hit.title === guide.title)) {
    sorted.push({
      kind: "guide",
      title: guide.title,
      body: guide.line,
      href: guideHref(guide),
      stage: guide.stage,
      weight: 2,
    });
  }

  const pinned: SearchHit[] = [];
  const rest = [...sorted];
  for (const title of ["Resubmission Strategy", "Study Section Simulator", "How grant review works"]) {
    const index = rest.findIndex((hit) => hit.title === title);
    if (index >= 0) pinned.push(rest.splice(index, 1)[0]);
  }
  return [...pinned, ...rest];
}

export function suggestionsFor(audience?: string, stageSlug?: string): Guide[] {
  const stageName = STAGES.find((item) => item.slug === stageSlug)?.name;
  const fromStage = stageName ? GUIDES.filter((guide) => guide.stage === stageName) : [];
  const rest = GUIDES.filter((guide) => !fromStage.includes(guide));
  const list = [...fromStage, ...rest];
  if (audienceKey(audience) === "trainee") {
    return list.filter((guide) => guide.slug !== "erc-and-wellcome").slice(0, 3);
  }
  return list.slice(0, 3);
}
