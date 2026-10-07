// One illustrative NIH R-series sample. Simplified Review Framework.
// Factor 1 and Factor 2 are scored 1 to 9. Factor 3 is sufficiency, not a 1 to 9 score.

export function scoreBarWidth(score: number) {
  return ((10 - score) / 9) * 100;
}

export const SAMPLE_EXCERPT =
  "Aim 2 follows 240 patients for 30 days. The outcome is readmission. The power calculation assumes an effect size larger than the pilot supports.";

export const SAMPLE_CONCERN =
  "The sample size rests on an effect the pilot did not show. A skeptical reviewer cannot tell whether 240 patients can answer the question.";

export const SAMPLE_NOTICE =
  "What evidence gives a skeptical reviewer confidence that this assumption will hold?";

export const SAMPLE_STRENGTHEN =
  "State the effect size the pilot actually supports, next to the sample you propose, and show the count that sample can detect.";

export const SAMPLE_WHY =
  "Factor 2, Rigor and Feasibility, is where a reviewer looks for methods that can answer the question. An unnamed assumption is a reason to doubt the design, not a reason to doubt the topic.";

export const SAMPLE_SCORED = [
  {
    factor: "Factor 1",
    name: "Importance",
    detail: "Significance and Innovation",
    value: 3,
  },
  {
    factor: "Factor 2",
    name: "Rigor and Feasibility",
    detail: "Approach",
    value: 6,
  },
] as const;

export const SAMPLE_FACTOR3 = {
  factor: "Factor 3",
  name: "Expertise and Resources",
  detail: "Investigator and Environment",
  assessment: "Sufficient",
  note: "Assessed for sufficiency, not scored 1 to 9.",
} as const;

export const SAMPLE_OVERALL = {
  name: "Overall Impact",
  value: 3,
  detail: "Holistic. Not an average of the factor scores.",
} as const;

export const SAMPLE_LENSES = [
  {
    who: "Reviewer concerned with rigor",
    factor: "Factor 2",
    body: "I could not find the assumption behind the power calculation. If the true effect is the pilot's, 240 patients will not detect it.",
    basis: "Based on the Aim 2 sentence that names the sample but not the effect the pilot supports.",
  },
  {
    who: "Reviewer concerned with importance",
    factor: "Factor 1",
    body: "The question matters and the setting is right. Practicality is a strength if the application says so plainly.",
    basis: "Based on the problem statement and the low-cost check-in design. Not a claim about a real panel.",
  },
] as const;
