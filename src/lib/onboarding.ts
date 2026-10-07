import { MODULES, STAGES, type Module } from "@/lib/content";

export const AUDIENCE = [
  { id: "trainee", label: "Trainee or postdoc" },
  { id: "early", label: "Early-stage investigator" },
  { id: "established", label: "Established investigator" },
  { id: "admin", label: "Research administrator or grants office" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const FUNDERS = [
  { id: "nih", label: "NIH" },
  { id: "nsf", label: "NSF" },
  { id: "federal", label: "Other U.S. federal (AHRQ, PCORI)" },
  {
    id: "foundation",
    label: "U.S. foundation (RWJF, American Heart Association, American Cancer Society)",
  },
  { id: "international", label: "International (ERC, Wellcome, CIHR, NHMRC)" },
  { id: "unsure", label: "Not sure yet" },
] as const;

export const NEEDS = [
  { id: "funding", label: "Finding funding", stage: "imagine" },
  { id: "study", label: "Planning my study", stage: "design" },
  { id: "writing", label: "Writing my application", stage: "compete" },
  { id: "scored", label: "Exploring a reviewer lens on my draft", stage: "review" },
  { id: "unfunded", label: "My application was not funded", stage: "review" },
  { id: "award", label: "Managing an award I have won", stage: "manage" },
] as const;

export const FROM_NEED: Record<string, string> = {
  imagine: "funding",
  design: "study",
  compete: "writing",
  review: "scored",
  manage: "award",
};

export function moduleSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function moduleByName(name: string) {
  return MODULES.find((item) => item.name === name);
}

export function labelFor(list: readonly { id: string; label: string }[], id?: string) {
  return list.find((item) => item.id === id)?.label;
}

function soften(label?: string) {
  if (!label) return undefined;
  return label.charAt(0).toLowerCase() + label.slice(1);
}

export type Recommendation = {
  personalised: boolean;
  summary: string;
  stageName: string;
  stagePromise: string;
  stageSlug: string;
  primary: Module;
  related: Module[];
};

function pick(names: string[]) {
  return names.map((name) => moduleByName(name)).filter((item): item is Module => Boolean(item));
}

export function recommend(input: {
  audience?: string;
  funder?: string;
  need?: string;
  from?: string;
}): Recommendation | null {
  const needId =
    input.need && input.need !== "unsure"
      ? input.need
      : input.from
        ? FROM_NEED[input.from]
        : undefined;
  const need = NEEDS.find((item) => item.id === needId);
  if (!need) return null;

  const stage = STAGES.find((item) => item.slug === need.stage);
  if (!stage) return null;

  const audience = input.audience && input.audience !== "unsure" ? input.audience : undefined;
  let primaryName = "Pre-Award Review";
  let relatedNames: string[] = [];

  if (need.id === "funding") {
    primaryName = "Funding Discovery";
    relatedNames = ["Regulatory Compliance", "Pre-Award Review"];
  } else if (need.id === "study") {
    primaryName = "Regulatory Compliance";
    relatedNames = ["Funding Discovery", "Pre-Award Review"];
  } else if (need.id === "writing") {
    if (input.funder === "international") {
      primaryName = "International Research";
      relatedNames = ["Pre-Award Review", "Study Section Simulator"];
    } else if (audience === "trainee") {
      primaryName = "Trainee & GRA Tools";
      relatedNames = ["Pre-Award Review", "K Award Suite"];
    } else {
      primaryName = "Pre-Award Review";
      relatedNames = audience === "admin"
        ? ["Institutional Intelligence", "K Award Suite"]
        : ["K Award Suite", "Study Section Simulator"];
    }
  } else if (need.id === "scored") {
    primaryName = "Study Section Simulator";
    relatedNames =
      audience === "trainee"
        ? ["Pre-Award Review", "Trainee & GRA Tools"]
        : ["Pre-Award Review", "Resubmission Strategy"];
  } else if (need.id === "unfunded") {
    primaryName = "Resubmission Strategy";
    relatedNames = ["Study Section Simulator", "Pre-Award Review"];
  } else if (need.id === "award") {
    primaryName = "Post-Award Management";
    relatedNames =
      audience === "admin"
        ? ["Subaward & Invoicing", "Institutional Intelligence"]
        : ["Budget & Finance", "Subaward & Invoicing"];
  }

  const primary = moduleByName(primaryName);
  if (!primary) return null;

  const told = [
    soften(labelFor(AUDIENCE, audience)),
    labelFor(FUNDERS, input.funder !== "unsure" ? input.funder : undefined),
  ].filter((item): item is string => Boolean(item));
  if (input.need) told.push(need.label.toLowerCase());

  const summary = told.length
    ? `Based on what you told us: ${told.join(", ")}.`
    : `You started from ${stage.name}.`;

  return {
    personalised: true,
    summary,
    stageName: stage.name,
    stagePromise: stage.promise,
    stageSlug: stage.slug,
    primary,
    related: pick(relatedNames).filter((item) => item.name !== primary.name).slice(0, 2),
  };
}
