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
      "Apply to ERC, Wellcome, CIHR, NHMRC and other non-US funders, with each one's conventions explained.",
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

// Page copy for the journey overview and each stage page. Keyed by
// slug so deleting Manage from STAGES removes it here too: this map
// is only read through journeyStages().
export type StagePage = {
  hereIf: string[];
  getHeading: string;
  getBody: string;
  getLines: string[];
  coming?: string;
  captureEmail?: boolean;
};

export const STAGE_PAGES: Record<string, StagePage> = {
  imagine: {
    hereIf: [
      "You have an idea but not a clear question yet.",
      "You do not know which funder is right for it.",
      "You want to see what has already been funded in your area.",
    ],
    getHeading: "A question that can find a funder.",
    getBody:
      "Imagine is where you shape the question and see what has already been funded in your area. Funding Discovery is live. The rest of this stage is still being built.",
    getLines: [
      "See what has already been funded in your area",
      "Find who funded it",
      "Shape the question before you write",
    ],
    coming:
      "A matcher that watches for open calls fitting your profile and tells you when one appears.",
    captureEmail: true,
  },
  design: {
    hereIf: [
      "You are choosing your methods and your population.",
      "You still have IRB, human subjects or policy questions.",
      "You want reviewers to have no easy objections.",
    ],
    getHeading: "A study reviewers will trust.",
    getBody:
      "Design is where methods, population and approvals have to stand up to review. Regulatory questions are answered in plain language so you are not guessing at policy.",
    getLines: [
      "Get IRB and human subjects questions answered plainly",
      "See where policy would slow a reviewer down",
      "Build a study that can survive the first read",
    ],
    coming: "Study design and equity guidance.",
    captureEmail: true,
  },
  compete: {
    hereIf: [
      "You have a submission deadline coming up.",
      "This may be the first grant you have written on your own.",
      "You are not sure what reviewers expect a strong application to contain.",
    ],
    getHeading: "More than a score.",
    getBody:
      "Every tool in this stage explains its reasoning. You see what is weakening the application, why a reviewer would raise it, and what to change first. That is what a mentor who has sat on panels would tell you.",
    getLines: [
      "See what actually moves your score",
      "Strengthen the work before you submit",
      "Build the skill of writing to reviewers, not just this one application",
    ],
  },
  review: {
    hereIf: [
      "You want to know how it will score before you send it.",
      "It was not funded, and nobody has told you why.",
      "You are preparing an A1 and need to know what to change.",
    ],
    getHeading: "The score, and the discussion behind it.",
    getBody:
      "Review is where you see the application the way a study section would. A study section is the NIH panel that scores an application. You get the score, the reasons, and what to change before you submit or resubmit.",
    getLines: [
      "See how each section would be read",
      "Understand why the score sits where it does",
      "Know what to change before the next version",
    ],
  },
  manage: {
    hereIf: [
      "You have been funded.",
      "Reporting, no-cost extensions or progress reports are coming due.",
      "You have subawards or a budget to keep on track.",
    ],
    getHeading: "The award is won. The work is not over.",
    getBody:
      "Manage is for the reporting, subawards and budget that follow the award. Keep the administrative work on schedule so it does not interrupt the science.",
    getLines: [
      "Keep reports and extensions on schedule",
      "Track subawards and invoices across sites",
      "Watch the budget the way an audit would",
    ],
  },
  transform: {
    hereIf: [
      "Your work is done, and you want it to matter beyond the paper.",
      "You are thinking about practice, policy or the next grant.",
      "You want this stage built around what would actually help.",
    ],
    getHeading: "Impact after the paper.",
    getBody:
      "Transform is still ahead of us. The page is here so you can see where this stage will sit, and tell us what would genuinely help.",
    getLines: [
      "Turn findings into practice or policy",
      "Carry the work into the next grant",
      "Keep the skill, not just the output",
    ],
    coming:
      "This stage is still ahead of us. We are working out what would genuinely help researchers turn findings into practice, policy and the next grant. Tell us what would be most useful and we will build toward it.",
    captureEmail: true,
  },
};

export type JourneyStage = Stage &
  StagePage & {
    tools: Module[];
  };

export const STAGE_WORDS = ["one", "two", "three", "four", "five", "six"];

export function journeyStages(): JourneyStage[] {
  return STAGES.map((stage) => {
    const page = STAGE_PAGES[stage.slug];
    return {
      ...stage,
      hereIf: page?.hereIf ?? [],
      getHeading: page?.getHeading ?? "",
      getBody: page?.getBody ?? "",
      getLines: page?.getLines ?? [],
      coming: page?.coming,
      captureEmail: page?.captureEmail,
      tools: MODULES.filter((module) => module.stage === stage.name),
    };
  });
}

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
    a: "It covers NIH R, F and K awards first, then PCORI and other U.S. funders, then international and LMIC funders. Each has its own review conventions.",
  },
  {
    q: "My application was not funded. Can this help?",
    a: "Yes. Resubmission Strategy is built for exactly that, and works from your summary statement.",
  },
];

export const FAQ_MORE: { q: string; a: string }[] = [
  {
    q: "Does it guarantee funding?",
    a: "No. Nobody can promise that. EQUITAS shows how an application is likely to be read, so you can strengthen it before you submit.",
  },
  {
    q: "How is it calibrated?",
    a: "By an active NIH study section reviewer in the health and biomedical sciences. A study section is the NIH panel that scores an application. The scoring follows how review is actually conducted, not published guidance alone.",
  },
  {
    q: "Can my institution pay?",
    a: "Yes. Institutions buy a plan for their faculty. If you were invited by your institution, you will not see pricing. Request a demo from the institutions page if you are buying for a department.",
  },
  {
    q: "What languages do you support?",
    a: "Ten: English, Español, Português, Français, العربية, 中文, हिंदी, Kiswahili, Deutsch and Italiano. English is complete. The other languages are being added. The language control is in the footer and in the mobile menu.",
  },
  {
    q: "Do I need an ORCID?",
    a: "No. You can create an account with email, Google, or ORCID. ORCID is offered because most researchers already have one.",
  },
];

export type Guide = {
  slug: string;
  title: string;
  line: string;
  stage: string;
  minutes: number;
  featured?: boolean;
  href?: string;
  body: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: "how-grant-review-works",
    title: "How grant review works",
    line: "What happens to your application after you submit, who reads it, and how the score is made.",
    stage: "Review",
    minutes: 8,
    featured: true,
    href: "/resources/how-grant-review-works",
    body: [],
  },
  {
    slug: "not-discussed",
    title: "What “not discussed” really means",
    line: "Why about half of applications never get talked about at the meeting.",
    stage: "Review",
    minutes: 4,
    body: [
      "About half of the applications at an NIH meeting are never discussed. The written comments still arrive. The conversation does not.",
      "A study section is the NIH panel that scores an application. Before that panel meets, three assigned reviewers give preliminary scores. The lower half of those scores are not talked about at all. This is called triage.",
      "Triage is rarely a verdict on your science. It usually means the application did not make its case fast enough for three busy readers. They are working scientists with their own labs and their own deadlines. They read perhaps eight applications for one meeting, on top of a full job.",
      "If reviewers cannot find the question, the approach, and why it matters in the first pass, the score sits in the lower half before anyone has argued for you in the room. You still get a summary statement. You do not get the discussion that would have shown you how the panel saw it.",
      "That is why “not discussed” is so hard to read. It feels like a judgement on the work. More often it is a judgement on whether three tired people could find the case in time.",
      "Most funded applications were resubmitted. You get one resubmission, marked A1. The written comments are the material you have. Read them for what reviewers could not find, not only what they disliked.",
    ],
  },
  {
    slug: "reading-a-summary-statement",
    title: "Reading a summary statement",
    line: "How to read the written feedback for what reviewers could not find.",
    stage: "Review",
    minutes: 4,
    body: [
      "Weeks after review you receive a summary statement. That is the written feedback from the meeting: scores, comments, and a resume of the discussion if your application was talked about.",
      "If it was discussed, the comments are a record of what three reviewers, and then the panel, could and could not find. If it was not discussed, you still get written comments, but no conversation happened in the room. A study section is the NIH panel that scores an application. Triage is when preliminary scores put an application in the lower half, so it is never talked about.",
      "Read the statement for what is missing, not only for what is criticised. A reviewer who asks for a power calculation, a clearer aim, or a tighter population is often saying they could not locate the case, not that the science is empty.",
      "Criterion scores and the overall impact score are not the same thing. Each reviewer scores 1 to 9. Those scores are averaged and multiplied by ten. The impact score runs from 10 to 90. Lower is better. A strong idea can still sit in a weak place on that scale if the writing hid what the reviewers needed.",
      "You get one resubmission, marked A1. Most funded applications were resubmitted. The summary statement is the map for that next version: what to change first, and what was already clear enough to leave alone.",
    ],
  },
  {
    slug: "specific-aims-reviewers-can-follow",
    title: "Writing specific aims reviewers can follow",
    line: "How three busy readers find, or miss, the case you are making.",
    stage: "Compete",
    minutes: 4,
    body: [
      "Three people read your application properly. They are not full-time reviewers. They have their own labs, their own deadlines, and perhaps eight applications to finish before one study section meeting. A study section is the NIH panel that scores an application.",
      "Specific aims are the page they use to decide whether the rest is worth a careful read. If that page does not make the question, the approach, and the stakes findable, the later sections rarely recover the score.",
      "Reviewers look for a question they can restate, aims they can tell apart, and a reason the work has to be done this way. They look for those things quickly. A page that is dense, circular, or written for a specialist in your exact method will be scored by someone who is not that specialist.",
      "This is not a request for simpler science. It is a request for a path through the science. Name the problem. Name what you will do. Name what success would show. Leave the literature review, the method detail, and the career story in the sections that exist for them.",
      "When an application is not discussed, it is often because this page did not land in the first pass. You still get written comments. You do not get the meeting. Making the aims possible to follow is how you stay in the conversation.",
    ],
  },
  {
    slug: "k-award-reviewer",
    title: "What a K award reviewer looks for",
    line: "Why career development sections decide K awards, not only the science.",
    stage: "Compete",
    minutes: 4,
    body: [
      "A K award is a career development award. The science has to be sound. The career plan is what the review is built to judge.",
      "Reviewers are asked whether this person, with this mentor, in this environment, will become an independent investigator. They read the candidate statement, the mentor plan, and the training goals as the decision, not as attachments to a small R01.",
      "A strong research strategy with a thin training plan scores badly. So does a training plan that lists courses and meetings without saying what the candidate cannot yet do, and how the award will change that. Reviewers look for a gap in skills, a mentor who has the time and the track record to close it, and an institution that will protect the time.",
      "K awards are still scored on five criteria. That has not changed. R-series grants moved to three factors in January 2025. Do not import that simpler frame into a K. The extra criteria are the point.",
      "If you are writing your first K without a grants office behind you, the usual failure is not the idea. It is an application that reads as a research project with a career paragraph added. Reviewers notice the difference in the first pass.",
    ],
  },
  {
    slug: "erc-and-wellcome",
    title: "Applying to ERC and Wellcome as a US researcher",
    line: "How non-US funders read an application, and where NIH habits get in the way.",
    stage: "Compete",
    minutes: 4,
    body: [
      "ERC is the European Research Council. Wellcome is a major UK funder. Both fund researchers, including people whose training and first grants were NIH-shaped. They do not read like a study section.",
      "A study section is the NIH panel that scores an application on set criteria, with an impact score from 10 to 90. ERC and Wellcome use different forms, different language, and different ideas of what a strong case looks like. Pasting an NIH specific aims page into those forms is a common way to lose the reader.",
      "NIH writing often leads with significance, innovation, and approach. ERC readers are looking for a research vision and for evidence that the person can open a field, not only complete a set of aims. Wellcome readers are looking for importance, rigour, and whether the work can change practice or understanding, in Wellcome’s own terms.",
      "The conventions are learnable. They are not obvious from the call text alone. Length, structure, how you describe team and environment, and what “impact” means all shift. CIHR and NHMRC, the Canadian and Australian agencies, have their own habits as well.",
      "If you have only written for NIH, the risk is not that the science is too American. The risk is that the application is still answering NIH questions on a page that asked different ones.",
    ],
  },
  {
    slug: "finding-the-right-funder",
    title: "Finding the right funder for your question",
    line: "How to see what has already been funded in your area, and who funded it.",
    stage: "Imagine",
    minutes: 3,
    body: [
      "A fundable question is not only an important question. It is a question a specific funder is already in the business of supporting, or is trying to move toward.",
      "The fastest way to see that is to look at what has already been funded in your area, and who funded it. NIH RePORTER, funder annual reports, and funded-grant lists show the pattern: which institutes, which schemes, which methods, which populations. If nobody like you has been funded for this, that is information. It might mean the question is new. It might mean you are knocking on the wrong door.",
      "Match the question to the funder’s job, not the other way round. An NIH institute, NSF, a foundation, ERC, Wellcome, or an LMIC funder will each treat the same idea as a different kind of work. The review criteria follow from that.",
      "You do not need a finished application to do this reading. You need a question you can state in a few sentences, and the patience to see where similar questions actually went. That is the Imagine stage: shape the question and find funding that fits, before you write to a deadline that was never going to take it.",
    ],
  },
];

export const FUNDER_LEAD =
  "NIH R, F and K first. Then PCORI, then international and LMIC funders.";

export const FUNDER_COVER =
  "It covers NIH R, F and K awards first, then PCORI and other U.S. funders, then international and LMIC funders.";

export const FUNDER_GROUPS = [
  { group: "NIH", names: "R, F and K awards. Our deepest calibration." },
  {
    group: "Other U.S. funders",
    names: "PCORI, AHRQ, NSF, RWJF, American Heart Association, American Cancer Society",
  },
  { group: "International", names: "ERC, Wellcome, CIHR, NHMRC" },
  { group: "Global health", names: "LMIC funders" },
] as const;

export const PERSPECTIVES = [
  { name: "The Study Section Reviewer's Perspective", kind: "lens" as const },
  { name: "The Program Officer's Perspective", kind: "lens" as const },
  { name: "The Advisory Council Member's Perspective", kind: "lens" as const },
  { name: "The Scientific Review Officer's Perspective", kind: "lens" as const },
  { name: "The Grants Management Specialist's Perspective", kind: "lens" as const },
  { name: "The Biostatistician Reviewer's Perspective", kind: "lens" as const },
  { name: "The Equity Reviewer's Perspective", kind: "lens" as const },
  { name: "The Community Advocate's Perspective", kind: "lens" as const },
  { name: "The Generalist Reviewer's Perspective", kind: "lens" as const },
  { name: "Your Guide to How Grant Applications Actually Work", kind: "guide" as const },
];

export type AudienceKey = "trainee" | "investigator" | "grants_manager" | "institution";

export type ModuleWeight = "primary" | "secondary" | "hidden";

export function audienceKey(id?: string): AudienceKey | undefined {
  if (id === "trainee") return "trainee";
  if (id === "early" || id === "established") return "investigator";
  if (id === "admin") return "grants_manager";
  if (id === "institution") return "institution";
  return undefined;
}

const WEIGHT: Record<string, Partial<Record<AudienceKey, ModuleWeight>>> = {
  "Funding Discovery": { trainee: "primary", investigator: "primary" },
  "Regulatory Compliance": { investigator: "primary", grants_manager: "primary" },
  "Pre-Award Review": { trainee: "primary", investigator: "primary", grants_manager: "secondary" },
  "K Award Suite": { trainee: "primary", investigator: "secondary" },
  "Trainee & GRA Tools": { trainee: "primary" },
  "International Research": { trainee: "secondary", investigator: "primary" },
  "Study Section Simulator": { trainee: "primary", investigator: "primary" },
  "Resubmission Strategy": { trainee: "secondary", investigator: "primary" },
  "Post-Award Management": {
    investigator: "secondary",
    grants_manager: "primary",
    institution: "secondary",
  },
  "Subaward & Invoicing": { grants_manager: "primary", institution: "secondary" },
  "Budget & Finance": {
    investigator: "secondary",
    grants_manager: "primary",
    institution: "secondary",
  },
  "Institutional Intelligence": { grants_manager: "secondary", institution: "primary" },
};

export function moduleWeight(name: string, audience?: AudienceKey): ModuleWeight {
  if (!audience) return "primary";
  return WEIGHT[name]?.[audience] ?? "hidden";
}

export function visibleModules(audience?: string, mode: "primary" | "more" | "all" = "all"): Module[] {
  const key = audienceKey(audience);
  return MODULES.filter((module) => {
    const weight = moduleWeight(module.name, key);
    if (mode === "all") return key ? weight !== "hidden" : true;
    if (mode === "primary") return weight === "primary";
    return weight === "secondary";
  });
}

export function guideHref(guide: Guide) {
  return guide.href ?? `/resources/guides/${guide.slug}`;
}

export function guideBySlug(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug);
}
