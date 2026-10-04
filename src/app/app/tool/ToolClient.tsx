"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DeepIntro } from "@/components/DeepIntro";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { ExampleTag, PageHero, SectionHead } from "@/components/PageHero";
import { ScoreBars, StagePreview } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { MODULES, STAGES } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { writeSession } from "@/lib/session";
import { useSession } from "@/lib/useSession";
import { addSavedWork, recordReview } from "@/lib/workspace";
import { EYEBROW_BAND, SECTION, WRAP } from "@/lib/ui";

const SIMULATOR = "Study Section Simulator";

const AIMS = [
  { text: "Adults discharged from a general medical ward are readmitted within 30 days at high rates. Much of that risk sits in the first week at home." },
  { text: "Aim 1 tests whether a brief nurse check-in after discharge lowers 30-day readmission among adults leaving the ward." },
  {
    text: "Aim 2 follows 240 patients for 30 days. The outcome is readmission. The power calculation assumes an effect size larger than the pilot supports.",
    flag: "The power calculation assumes an effect size larger than the pilot supports.",
  },
  { text: "Together, the aims test a low-cost step that a hospital could adopt without new staff." },
];

const REVIEWERS = [
  {
    who: "Reviewer 1",
    score: 3,
    body: "The question matters and the setting is right. The check-in is simple enough to adopt. My concern is Aim 2: the sample depends on an effect the pilot did not show.",
  },
  {
    who: "Reviewer 2",
    score: 4,
    body: "I could not find the assumption behind the power calculation in the aims. If the true effect is the pilot's, 240 patients will not detect it. That moves my score more than anything else.",
  },
  {
    who: "Reviewer 3",
    score: 3,
    body: "Strong team and environment. Innovation is modest, which is fine for a practical trial, but the application should say plainly that practicality is the point.",
  },
];

const FIXES = [
  {
    effect: "Largest effect",
    title: "State the power assumption in Aim 2.",
    body: "Name the effect size the pilot actually supports, and show the sample needed for it. Two reviewers raised this.",
  },
  {
    effect: "Medium effect",
    title: "Say that practicality is the innovation.",
    body: "Reviewer 3 read the design as modest. One sentence in the aims turns that into a strength.",
  },
  {
    effect: "Small effect",
    title: "Move the first-week risk into the opening line.",
    body: "It is the reason the check-in timing matters. Reviewers should meet it before Aim 1.",
  },
];

function ImpactCard() {
  return (
    <figure className="m-0 rounded-2xl bg-surface p-6 shadow-card sm:p-7">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[18px] font-medium leading-none tracking-[-0.03em]">Overall impact</p>
        <ExampleTag>Sample</ExampleTag>
      </div>
      <span aria-hidden="true" className="mt-3 block h-px w-16 bg-gold" />
      <div className="mt-6 flex items-end gap-5">
        <p className="text-[clamp(72px,8vw,104px)] font-light leading-[0.85] tracking-[-0.05em] tabular-nums">33</p>
        <p className="pb-2 text-[14px] leading-[1.45] text-muted">
          Impact score.
          <br />
          10 is best, 90 is weakest.
        </p>
      </div>
      <ul className="m-0 mt-6 grid list-none grid-cols-3 gap-2 p-0 text-center">
        {REVIEWERS.map((r) => (
          <li key={r.who} className="rounded-xl bg-bg-2 px-2 py-3">
            <span className="block text-[22px] font-light tabular-nums">{r.score}</span>
            <span className="text-[12px] text-muted">{r.who}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[13px] leading-[1.5] text-muted">
        Three overall scores, averaged and multiplied by ten. Likely discussed at the meeting.
      </p>
    </figure>
  );
}

const SAMPLE_DRAFT = AIMS.map((item) => item.text).join("\n\n");

function SimulatorWork({ signedIn }: { signedIn: boolean }) {
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [ran, setRan] = useState(false);

  function run() {
    if (!draft.trim()) {
      setError("Paste a section, or load the sample, before you run the review.");
      return;
    }
    setError("");
    setRan(true);
    recordReview();
    writeSession({
      lastTool: moduleSlug(SIMULATOR),
      lastLabel: "your Study Section Simulator review",
      lastDoing: "the Study Section Simulator",
    });
  }

  if (ran) {
    return (
      <SampleReview
        signedIn={signedIn}
        note="Illustrative result on the text you provided. Not a real score."
      />
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Study Section Simulator · Available"
        title="Share a section. See how a study section would read it."
        lede={
          <p>
            Paste your specific aims or another draft section. You will get criterion scores, the
            discussion three reviewers would have, and the change that moves the score first.
          </p>
        }
      />
      <section className={`${WRAP} pb-[clamp(80px,10vw,136px)]`}>
        <label htmlFor="draft" className="mb-2 block text-[14px] font-medium">
          Your draft section
        </label>
        <textarea
          id="draft"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            if (error) setError("");
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "draft-error" : "draft-privacy"}
          placeholder="Aim 1 tests whether… Aim 2 follows…"
          className="min-h-[220px] w-full rounded-2xl border border-line-2 bg-surface px-5 py-4 text-[16px] leading-[1.6] outline-none"
        />
        {error && (
          <p id="draft-error" className="mt-2 text-[14px]" role="alert">
            {error}
          </p>
        )}
        <p id="draft-privacy" className="mt-3 max-w-[62ch] text-[14px] text-muted">
          Your work stays yours. Drafts are not used to train models.{" "}
          <Link href="/legal/data-security" className="text-gold-text underline">
            How we handle your work
          </Link>
          .
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" variant="primary" onClick={run}>
            Run the review
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDraft(SAMPLE_DRAFT);
              setError("");
            }}
          >
            Load the sample
          </Button>
        </div>
        <p className="mt-4 text-[13px] text-muted">
          Not ready to paste unpublished science? Load the sample. It is a made-up application.
        </p>
      </section>
    </>
  );
}

function SaveReviewActions({ signedIn }: { signedIn: boolean }) {
  const [saved, setSaved] = useState(false);
  if (!signedIn) return null;

  function save() {
    addSavedWork({
      title: "Sample review of specific aims",
      module: SIMULATOR,
      slug: moduleSlug(SIMULATOR),
      excerpt: "Approach is the weakest. State the power assumption in Aim 2.",
      example: true,
    });
    setSaved(true);
  }

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button type="button" variant="primary" onClick={save}>
        {saved ? "Saved" : "Save this review"}
      </Button>
      {saved ? (
        <Button href="/app/saved" variant="ghost">
          Open saved work
        </Button>
      ) : null}
      <Button href="/pricing/upgrade?doing=the%20Study%20Section%20Simulator" variant="ghost">
        What if I reach a limit?
      </Button>
    </div>
  );
}

function SampleReview({ signedIn, note }: { signedIn: boolean; note?: string }) {
  return (
    <>
      <PageHero
        eyebrow="Sample review · Study Section Simulator"
        title="A sample review, from draft to fix."
        lede={
          <p>
            This is what the Study Section Simulator returns. It is built on a made-up application
            so you can see the whole review without sharing anything. A study section is the NIH panel
            that scores an application.
          </p>
        }
        actions={
          <>
            <Button href={signedIn ? "/app" : "/onboarding?from=review"} variant="primary">
              Review my own draft
            </Button>
            <Button href="/journey/review" variant="ghost">
              About the Review stage
            </Button>
          </>
        }
        note={note ?? "Illustrative sample. Not a real application or a real score."}
        visual={<ImpactCard />}
      />

      <nav aria-label="Sample sections" className="border-y border-line bg-bg-2">
        <ol className={`${WRAP} m-0 flex list-none flex-wrap gap-x-8 gap-y-3 py-5 text-[15px]`}>
          {[
            ["#draft", "1. The draft"],
            ["#scores", "2. The scores"],
            ["#discussion", "3. The discussion"],
            ["#fixes", "4. What to fix first"],
          ].map(([href, label]) => (
            <li key={href}>
              <a href={href} className="no-underline hover:text-gold-text">
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section id="draft" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
        <SectionHead
          eyebrow="1. The draft"
          title="Read the way a reviewer reads."
          lede="The simulator reads your specific aims first, because that is the page reviewers use to decide how carefully to read the rest. It marks the sentence a reviewer would stop on."
        />
        <article className="rounded-2xl bg-surface p-7 shadow-card sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[20px] font-medium tracking-[-0.03em]">Specific aims</p>
            <ExampleTag>Made-up draft</ExampleTag>
          </div>
          <span aria-hidden="true" className="mt-3 block h-px w-16 bg-gold" />
          <div className="mt-6 flex flex-col gap-4 text-[16px] leading-[1.7]">
            {AIMS.map((p) => {
              if (!p.flag) return <p key={p.text}>{p.text}</p>;
              const before = p.text.replace(p.flag, "");
              return (
                <p key={p.text}>
                  {before}
                  <mark className="rounded-[3px] bg-[rgb(179_153_82/0.35)] px-0.5 text-ink">{p.flag}</mark>
                </p>
              );
            })}
          </div>
          <aside className="mt-7 rounded-r-xl border-l-[3px] border-gold bg-bg-2 px-5 py-4 text-[15px] leading-[1.55]">
            <span className="font-medium">Where a reviewer stops:</span> the sample size rests on an
            assumption the aims never name. Reviewers see that gap before the discussion begins.
          </aside>
        </article>
      </section>

      <section id="scores" className="scroll-mt-24 bg-bg-2">
        <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <SectionHead
              eyebrow="2. The scores"
              title="A score for each criterion."
              lede="Each reviewer scores 1 to 9, where 1 is exceptional. The criterion scores show where the application is strong and where it loses ground."
            />
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.6]">
              Here, Approach is the weakest. That matches the flagged sentence: the argument is sound,
              but the numbers behind it are not shown.
            </p>
          </div>
          <div className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-[18px] font-medium tracking-[-0.03em]">Criterion scores</p>
              <ExampleTag>Sample</ExampleTag>
            </div>
            <ScoreBars />
          </div>
        </div>
      </section>

      <section id="discussion" className="scroll-mt-24 bg-band text-band-ink">
        <div className={`${WRAP} ${SECTION}`}>
          <SectionHead
            band
            eyebrow="3. The discussion"
            title="What the room would say."
            lede="Three assigned reviewers read the application properly. This is the conversation they would have about it, written in their voice."
          />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 lg:grid-cols-3">
            {REVIEWERS.map((r) => (
              <li key={r.who} className="flex flex-col rounded-2xl bg-band-2 p-7">
                <div className="flex items-center justify-between">
                  <span className={EYEBROW_BAND}>{r.who}</span>
                  <span className="text-[14px] text-band-muted">
                    Overall <span className="text-[20px] text-band-ink tabular-nums">{r.score}</span>
                  </span>
                </div>
                <p className="mt-6 text-[17px] leading-[1.55] tracking-[-0.01em]">&ldquo;{r.body}&rdquo;</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[14px] text-band-muted">Sample comments, written for this illustration.</p>
        </div>
      </section>

      <section id="fixes" className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
        <SectionHead
          eyebrow="4. What to fix first"
          title="Changes ranked by how much they move the score."
          lede="Limited time should go to the change that matters most. Each fix says why a reviewer would raise it."
        />
        <ol className="m-0 mt-12 grid list-none gap-5 p-0 lg:grid-cols-3">
          {FIXES.map((fix, i) => (
            <li
              key={fix.title}
              className={`flex flex-col rounded-2xl p-7 shadow-card sm:p-8 ${i === 0 ? "bg-band text-band-ink" : "bg-surface"}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[13px] tabular-nums ${i === 0 ? "text-gold-on-band" : "text-gold-text"}`}>{`0${i + 1}`}</span>
                <span
                  className={`text-[11px] font-bold uppercase tracking-[0.12em] ${i === 0 ? "text-gold-on-band" : "text-gold-text"}`}
                >
                  {fix.effect}
                </span>
              </div>
              <h3 className="mt-8 text-[23px] leading-[1.2] tracking-[-0.03em]">{fix.title}</h3>
              <p className={`mt-3 text-[15.5px] leading-[1.55] ${i === 0 ? "text-band-muted" : "text-muted"}`}>{fix.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[60ch] text-[15px] leading-[1.6] text-muted">
          EQUITAS does not rewrite the aims for you. It shows what a reviewer would raise, so you can
          change your own words.
        </p>
        <SaveReviewActions signedIn={signedIn} />
      </section>

      <CtaBand
        title="Now see it on your own draft."
        primary={{ href: signedIn ? "/app" : "/onboarding?from=review", label: signedIn ? "Go to my tools" : "Create a free account" }}
        secondary={{ href: "/resources/how-grant-review-works", label: "How grant review works" }}
      />
    </>
  );
}

function ToolPreview({ slug, signedIn }: { slug: string; signedIn: boolean }) {
  const tool = MODULES.find((item) => moduleSlug(item.name) === slug);
  useEffect(() => {
    if (signedIn && tool) writeSession({ lastTool: slug, lastLabel: tool.name });
  }, [signedIn, slug, tool]);
  if (!tool) {
    return (
      <PageHero
        eyebrow="Tools"
        title="That tool is not here."
        lede={<p>Open the journey and pick a tool from a stage.</p>}
        actions={
          <Button href="/journey" variant="primary">
            See every stage
          </Button>
        }
      />
    );
  }
  const stage = STAGES.find((s) => s.name === tool.stage);
  const status = stage?.status ?? "Available";
  const siblings = MODULES.filter((m) => m.stage && m.stage === tool.stage && m.name !== tool.name);

  return (
    <>
      <PageHero
        eyebrow={
          <>
            {tool.stage ?? "Institutions"} · {status}
          </>
        }
        title={tool.name}
        lede={<p>{tool.description}</p>}
        actions={
          <>
            <Button href={signedIn ? "/app" : `/onboarding?from=${stage?.slug ?? "compete"}`} variant="primary">
              {signedIn ? "Back to my tools" : "Create a free account"}
            </Button>
            <Button href="/app/tool" variant="ghost">
              See a sample review
            </Button>
          </>
        }
        note="The working screen for this tool is next. Nothing is scored on this page."
        visual={stage ? <StagePreview slug={stage.slug} /> : undefined}
      />

      <section className="bg-bg-2">
        <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
          <SectionHead
            eyebrow="How it works"
            title="Three steps, the same in every tool."
            lede="You bring your own work. EQUITAS shows how a reviewer would read it and what to change first."
          />
          <ol className="m-0 grid list-none gap-3 p-0">
            {[
              ["Share a section", "Paste the part of the application this tool is built for."],
              ["See how it reads", "Every point comes with the reason a reviewer would raise it."],
              ["Fix what matters", "Changes are ranked, so limited time goes to the right place."],
            ].map(([title, body], i) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] rounded-2xl bg-surface p-6 shadow-card">
                <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                <span>
                  <span className="block text-[19px] tracking-[-0.02em]">{title}</span>
                  <span className="mt-1 block text-[15px] leading-[1.5] text-muted">{body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {siblings.length > 0 && stage && (
        <section className={`${WRAP} ${SECTION}`}>
          <SectionHead eyebrow={`Also in ${stage.name}`} title="Other tools at this stage." />
          <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
            {siblings.map((m) => (
              <li key={m.name}>
                <Link
                  href={`/app/tool?module=${moduleSlug(m.name)}`}
                  className="lift flex h-full flex-col rounded-2xl bg-surface p-7 no-underline shadow-card"
                >
                  <StatusBadge status={status} />
                  <span className="mt-5 text-[22px] tracking-[-0.03em]">{m.name}</span>
                  <span className="mt-2 text-[15px] leading-[1.5] text-muted">{m.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link href={`/journey/${stage.slug}`} className="text-[15px] text-gold-text no-underline hover:underline">
              About the {stage.name} stage →
            </Link>
          </p>
        </section>
      )}

      <CtaBand />
    </>
  );
}

function ToolWorkspace() {
  const params = useSearchParams();
  const slug = params.get("module");
  const signedIn = useSession().session.signedIn;
  const showSample = !slug || slug === moduleSlug(SIMULATOR);
  const tool = slug ? MODULES.find((item) => moduleSlug(item.name) === slug) : MODULES.find((item) => item.name === SIMULATOR);
  const stageSlug = STAGES.find((stage) => stage.name === tool?.stage)?.slug ?? "review";

  return (
    <>
      {signedIn ? <AppHeader current="tools" /> : <SiteHeader />}
      <main id="main">
        {!signedIn && <DeepIntro current={stageSlug} />}
        {showSample ? (
          signedIn ? <SimulatorWork signedIn /> : <SampleReview signedIn={false} />
        ) : (
          <ToolPreview slug={slug ?? ""} signedIn={signedIn} />
        )}
      </main>
      <SiteFooter />
    </>
  );
}

export function ToolClient() {
  return (
    <Suspense fallback={<p className="p-10 text-muted">Loading…</p>}>
      <ToolWorkspace />
    </Suspense>
  );
}
