import Link from "next/link";
import type { ReactNode } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import { ExampleTag } from "@/components/PageHero";
import { GUIDES, guideHref, journeyStages, type StageStatus } from "@/lib/content";

// Static product previews for page heroes. Every one is labelled as an
// example, so none of them reads as a live result or a real user.

function Frame({
  title,
  tag = "Example",
  children,
  className = "",
}: {
  title: string;
  tag?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`m-0 rounded-2xl bg-surface p-6 text-ink shadow-card sm:p-7 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="text-[18px] font-medium leading-none tracking-[-0.03em]">{title}</p>
        {tag && <ExampleTag>{tag}</ExampleTag>}
      </div>
      <span aria-hidden="true" className="mt-3 block h-px w-16 bg-gold" />
      <div className="mt-5">{children}</div>
    </figure>
  );
}

export const SAMPLE_CRITERIA = [
  { name: "Significance", value: 3, width: 78 },
  { name: "Investigator", value: 2, width: 90 },
  { name: "Innovation", value: 5, width: 48 },
  { name: "Approach", value: 6, width: 36 },
  { name: "Environment", value: 2, width: 86 },
];

export function ScoreBars({ criteria = SAMPLE_CRITERIA }: { criteria?: typeof SAMPLE_CRITERIA }) {
  return (
    <>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {criteria.map((c) => (
          <li key={c.name} className="grid grid-cols-[108px_1fr_1.5rem] items-center gap-3">
            <span className="text-[14px] tracking-[-0.01em]">{c.name}</span>
            <span aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-bg-2">
              <span className="block h-full rounded-full bg-gold" style={{ width: `${c.width}%` }} />
            </span>
            <span className="text-right text-[16px] tabular-nums">{c.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-muted">Each criterion is scored 1 to 9. Lower is stronger.</p>
    </>
  );
}

export function ReviewReport({ className = "" }: { className?: string }) {
  return (
    <Frame title="Review report" className={className}>
      <ScoreBars />
      <p className="mt-5 border-t border-line pt-4 text-[14.5px] leading-[1.5] tracking-[-0.02em]">
        &ldquo;The power calculation in Aim 2 assumes an effect size the pilot does not support.&rdquo;
      </p>
      <p className="mt-4 rounded-xl bg-bg-2 px-4 py-3 text-[13.5px] leading-[1.5]">
        <span className="font-medium">Fix first:</span> state the assumption next to the effect size
        the pilot actually supports.
      </p>
    </Frame>
  );
}

function Rows({ rows }: { rows: { a: string; b: string; c?: ReactNode }[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {rows.map((row) => (
        <li
          key={row.a}
          className="flex items-start justify-between gap-4 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0"
        >
          <span>
            <span className="block text-[14.5px] leading-[1.4] tracking-[-0.01em]">{row.a}</span>
            <span className="mt-1 block text-[13px] text-muted">{row.b}</span>
          </span>
          {row.c && <span className="shrink-0 text-[13px] text-muted">{row.c}</span>}
        </li>
      ))}
    </ul>
  );
}

function ComingPreview({ lines }: { lines: string[] }) {
  return (
    <figure className="m-0 rounded-2xl border border-dashed border-line-2 bg-surface/60 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[18px] font-medium leading-none tracking-[-0.03em]">What this stage will do</p>
        <StatusBadge status="Coming" />
      </div>
      <span aria-hidden="true" className="mt-3 block h-px w-16 bg-line-2" />
      <ol className="m-0 mt-5 flex list-none flex-col gap-3 p-0">
        {lines.map((line, i) => (
          <li key={line} className="flex items-baseline gap-3 text-[15px] leading-[1.45]">
            <span className="text-[12px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
            {line}
          </li>
        ))}
      </ol>
      <p className="mt-5 text-[13px] text-muted">Not built yet. Nothing here is live.</p>
    </figure>
  );
}

export function StagePreview({ slug }: { slug: string }) {
  switch (slug) {
    case "imagine":
      return (
        <Frame title="Funded in your area">
          <p className="mb-4 rounded-xl bg-bg-2 px-4 py-3 text-[14px] leading-[1.45]">
            Your question: does a check-in after discharge reduce readmission?
          </p>
          <Rows
            rows={[
              { a: "Transitional care after discharge", b: "NIH institute, R01", c: "Funded" },
              { a: "Nurse-led follow-up calls", b: "U.S. foundation", c: "Funded" },
              { a: "Readmission in rural hospitals", b: "AHRQ", c: "Funded" },
            ]}
          />
          <p className="mt-4 text-[13px] text-muted">Illustrative titles, not real awards.</p>
        </Frame>
      );
    case "design":
      return (
        <Frame title="Your question, answered plainly">
          <p className="rounded-xl bg-bg-2 px-4 py-3 text-[14px] leading-[1.45]">
            Does a follow-up phone survey of discharged patients need IRB review?
          </p>
          <p className="mt-4 text-[14.5px] leading-[1.6]">
            Almost certainly yes. You are collecting data from people about their health, so it counts
            as human subjects research. Your IRB decides the level of review. Plan for it before the
            timeline, not after.
          </p>
          <p className="mt-4 text-[13px] text-muted">Plain guidance. Your IRB makes the decision.</p>
        </Frame>
      );
    case "compete":
      return (
        <Frame title="Section by section">
          <Rows
            rows={[
              { a: "Specific aims", b: "Two aims a reviewer can tell apart", c: "Clear" },
              { a: "Approach", b: "Power assumption not stated", c: "Fix first" },
              { a: "Career development", b: "Training goals need a skill gap", c: "Revise" },
              { a: "Mentor plan", b: "Meeting schedule named", c: "Clear" },
            ]}
          />
        </Frame>
      );
    case "review":
      return <ReviewReport />;
    case "manage":
      return (
        <Frame title="Coming due">
          <Rows
            rows={[
              { a: "RPPR progress report", b: "Annual report to NIH", c: "In 21 days" },
              { a: "No-cost extension", b: "Request before the end date", c: "In 48 days" },
              { a: "Subaward invoice, Site B", b: "Quarterly invoice", c: "Received" },
              { a: "Budget, year two", b: "Spending against plan", c: "On track" },
            ]}
          />
        </Frame>
      );
    default:
      return (
        <ComingPreview
          lines={[
            "Turn findings into practice or policy",
            "Carry the work into the next grant",
            "Keep the skill, not just the output",
          ]}
        />
      );
  }
}

export function JourneyMini({ current }: { current?: string }) {
  const stages = journeyStages();
  return (
    <figure className="m-0 rounded-2xl bg-surface p-3 shadow-card sm:p-4">
      <ol className="m-0 list-none p-0">
        {stages.map((stage, i) => (
          <li key={stage.slug}>
            <Link
              href={`/journey/${stage.slug}`}
              aria-current={current === stage.slug ? "page" : undefined}
              className={`grid grid-cols-[2rem_1fr] items-start gap-3 rounded-xl px-3 py-3.5 no-underline transition-colors ${
                current === stage.slug ? "bg-band text-band-ink" : "hover:bg-bg"
              }`}
            >
              <span
                className={`pt-1 text-[12px] tabular-nums ${
                  current === stage.slug ? "text-gold-on-band" : "text-gold-text"
                }`}
              >
                {`0${i + 1}`}
              </span>
              <span>
                <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <span className="text-[19px] tracking-[-0.025em]">{stage.name}</span>
                  <StatusWord status={stage.status} onBand={current === stage.slug} />
                </span>
                <span
                  className={`mt-0.5 block text-[13.5px] leading-[1.4] ${
                    current === stage.slug ? "text-band-muted" : "text-muted"
                  }`}
                >
                  {stage.promise}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function StatusWord({ status, onBand }: { status: StageStatus; onBand?: boolean }) {
  if (!onBand) return <StatusBadge status={status} />;
  return (
    <span className="text-[10.5px] font-bold uppercase tracking-[0.11em] text-gold-on-band">{status}</span>
  );
}

export function AccessGap() {
  const rows = [
    ["Someone down the hall who has reviewed", "Nobody to ask"],
    ["Knows what reviewers look for", "Guesses from public guidance"],
    ["Told what to fix first", "Learns from a summary statement"],
    ["Understands triage before it happens", "Finds out after"],
  ];
  return (
    <figure className="m-0 overflow-hidden rounded-2xl bg-surface shadow-card">
      <div className="grid grid-cols-2 border-b border-line bg-bg-2 text-[12px] font-medium uppercase tracking-[0.12em]">
        <p className="px-5 py-4 text-gold-text">With a reviewer mentor</p>
        <p className="border-l border-line px-5 py-4 text-muted">Without one</p>
      </div>
      <ul className="m-0 list-none p-0">
        {rows.map(([a, b]) => (
          <li key={a} className="grid grid-cols-2 border-b border-line text-[14.5px] leading-[1.45] last:border-b-0">
            <span className="px-5 py-4">{a}</span>
            <span className="border-l border-line px-5 py-4 text-muted">{b}</span>
          </li>
        ))}
      </ul>
      <figcaption className="border-t border-line bg-band px-5 py-4 text-[14.5px] text-band-ink">
        EQUITAS gives the second column what the first already has.
      </figcaption>
    </figure>
  );
}

export function Checklist({ title, items, tag }: { title: string; items: string[]; tag?: ReactNode }) {
  return (
    <Frame title={title} tag={tag ?? null}>
      <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.45]">
            <span
              aria-hidden="true"
              className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-gold text-[11px] text-band"
            >
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

export function ScoreScale() {
  return (
    <Frame title="How the score is made" tag={null}>
      <div className="relative">
        <span aria-hidden="true" className="absolute top-[7px] right-[3%] left-[3%] h-px bg-line-2" />
        <ol className="m-0 flex list-none justify-between p-0">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
            <li key={n} className="flex flex-col items-center">
              <span
                aria-hidden="true"
                className={`relative mb-2 block h-[15px] w-[15px] rounded-full border-[1.5px] border-gold ${
                  n === 3 || n === 4 ? "bg-gold" : "bg-surface"
                }`}
              />
              <span className="text-[13px] tabular-nums text-muted">{n}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="mt-2 flex justify-between text-[12px] text-muted">
        <span>1 exceptional</span>
        <span>9 poor</span>
      </div>
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
        <p className="rounded-xl bg-bg-2 px-2 py-3">
          <span className="block text-[22px] font-light tabular-nums">3, 4, 3</span>
          <span className="text-[11.5px] text-muted">three reviewers</span>
        </p>
        <span aria-hidden="true" className="text-muted">
          →
        </span>
        <p className="rounded-xl bg-bg-2 px-2 py-3">
          <span className="block text-[22px] font-light tabular-nums">3.33</span>
          <span className="text-[11.5px] text-muted">average</span>
        </p>
        <span aria-hidden="true" className="text-muted">
          ×10
        </span>
        <p className="rounded-xl bg-band px-2 py-3 text-band-ink">
          <span className="block text-[22px] font-light tabular-nums">33</span>
          <span className="text-[11.5px] text-band-muted">impact score</span>
        </p>
      </div>
      <p className="mt-4 text-[13px] text-muted">Impact scores run from 10 to 90. Lower is better.</p>
    </Frame>
  );
}

export function ReadingList() {
  const picks = GUIDES.slice(0, 4);
  return (
    <figure className="m-0 rounded-2xl bg-surface p-3 shadow-card sm:p-4">
      <p className="px-3 pt-2 pb-3 text-[12px] font-medium uppercase tracking-[0.14em] text-gold-text">
        Start here
      </p>
      <ol className="m-0 list-none p-0">
        {picks.map((guide, i) => (
          <li key={guide.slug}>
            <Link
              href={guideHref(guide)}
              className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-3 rounded-xl px-3 py-3.5 no-underline hover:bg-bg"
            >
              <span className="text-[12px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
              <span>
                <span className="block text-[16.5px] leading-[1.3] tracking-[-0.02em]">{guide.title}</span>
                <span className="mt-1 block text-[13px] text-muted">{guide.stage}</span>
              </span>
              <span className="text-[13px] text-muted">{guide.minutes} min</span>
            </Link>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function ShortAnswer({ q, a, lines }: { q: string; a: string; lines: string[] }) {
  return (
    <figure className="m-0 rounded-2xl bg-band p-7 text-band-ink shadow-card sm:p-8">
      <p className="text-[12px] uppercase tracking-[0.14em] text-gold-on-band">The short answer</p>
      <p className="mt-5 text-[clamp(22px,2.2vw,28px)] font-light leading-[1.25] tracking-[-0.03em]">{q}</p>
      <p className="mt-3 text-[clamp(36px,4vw,48px)] font-light leading-none tracking-[-0.04em] text-gold-on-band">
        {a}
      </p>
      <ul className="m-0 mt-7 flex list-none flex-col gap-3 border-t border-band-line p-0 pt-6">
        {lines.map((line) => (
          <li key={line} className="text-[15px] leading-[1.5] text-band-muted">
            {line}
          </li>
        ))}
      </ul>
    </figure>
  );
}
