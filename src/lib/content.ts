// Central journey/module data, taken verbatim from CLAUDE.md.
// Manage is the agency's addition, still pending the client's approval —
// kept here as ordinary content (not hard-coded per-stage components) so
// it can be removed by deleting one entry.

export type StageStatus = "Available" | "Partly available" | "Coming";

export type Stage = {
  slug: string;
  name: string;
  promise: string;
  status: StageStatus;
  modules: string[];
};

export const STAGES: Stage[] = [
  {
    slug: "imagine",
    name: "Imagine",
    promise: "Shape your question and find funding that fits",
    status: "Partly available",
    modules: ["Funding Discovery"],
  },
  {
    slug: "design",
    name: "Design",
    promise: "Build a study reviewers will trust",
    status: "Partly available",
    modules: ["Regulatory Compliance"],
  },
  {
    slug: "compete",
    name: "Compete",
    promise: "Develop an application that can be funded",
    status: "Available",
    modules: [
      "Pre-Award Review",
      "K Award Suite",
      "Trainee & GRA Tools",
      "International Research",
    ],
  },
  {
    slug: "review",
    name: "Review",
    promise: "See your application the way reviewers will",
    status: "Available",
    modules: ["Study Section Simulator", "Resubmission Strategy"],
  },
  {
    slug: "manage",
    name: "Manage",
    promise: "Steward your award and its money",
    status: "Available",
    modules: ["Post-Award Management", "Subaward & Invoicing", "Budget & Finance"],
  },
  {
    slug: "transform",
    name: "Transform",
    promise: "Turn your research into impact",
    status: "Coming",
    modules: [],
  },
];

export type Module = {
  name: string;
  stage: string | null; // null = institutional, not part of the journey
  description: string;
};

export const MODULES: Module[] = [
  {
    name: "Funding Discovery",
    stage: "Imagine",
    description:
      "Find what has already been funded in your area, and who funded it.",
  },
  {
    name: "Regulatory Compliance",
    stage: "Design",
    description:
      "Get IRB, human subjects and policy questions answered in plain language.",
  },
  {
    name: "Pre-Award Review",
    stage: "Compete",
    description:
      "Read your draft the way a reviewer will, section by section, before you submit.",
  },
  {
    name: "K Award Suite",
    stage: "Compete",
    description:
      "Plan the career development sections that decide K awards, including the mentor plan and training goals.",
  },
  {
    name: "Trainee & GRA Tools",
    stage: "Compete",
    description:
      "Everything an F31, F32 or T32 application needs, written for a first-time applicant.",
  },
  {
    name: "International Research",
    stage: "Compete",
    description:
      "Apply to ERC, Wellcome and other non-US funders, with each one's conventions explained.",
  },
  {
    name: "Study Section Simulator",
    stage: "Review",
    description:
      "See the score your application would get and the discussion behind it.",
  },
  {
    name: "Resubmission Strategy",
    stage: "Review",
    description: "Work out why it was not funded and what to change before the A1.",
  },
  {
    name: "Post-Award Management",
    stage: "Manage",
    description:
      "Keep RPPR reports, no-cost extensions and progress reporting on schedule.",
  },
  {
    name: "Subaward & Invoicing",
    stage: "Manage",
    description:
      "Track subawards, subcontracts and invoices across collaborating sites.",
  },
  {
    name: "Budget & Finance",
    stage: "Manage",
    description: "Build and monitor a grant budget that survives review and audit.",
  },
  {
    name: "Institutional Intelligence",
    stage: null,
    description: "See grant activity and pipeline across a department or institution.",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Does EQUITAS write my grant?",
    a: "No. It helps you understand how your own work will be read and scored. We do not draft applications, and for NIH submissions that distinction matters.",
  },
  {
    q: "Is it really free?",
    a: "Yes, to start. You can create an account and use the core tools without a card. Paid plans add more reviews and higher limits.",
  },
  {
    q: "Who sees my work?",
    a: "Only you. Your drafts are not used to train models and are not shared with other users or institutions.",
  },
  {
    q: "Which funders does it cover?",
    a: "NIH first, plus NSF, ERC, Wellcome and LMIC funders. Each has its own review conventions built in.",
  },
  {
    q: "My application was not funded. Can this help?",
    a: "Yes. Resubmission Strategy is built for exactly that, and works from your summary statement.",
  },
];
