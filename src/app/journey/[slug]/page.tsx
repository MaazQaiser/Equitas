import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { JourneyStrip } from "@/components/JourneyStrip";
import { StatusBadge } from "@/components/StatusBadge";
import { ComingCapture } from "@/components/ComingCapture";
import { PageHero, SectionHead } from "@/components/PageHero";
import { StagePreview } from "@/components/Previews";
import { CtaBand } from "@/components/CtaBand";
import { GUIDES, STAGES, STAGE_WORDS, guideHref, journeyStages, moduleStatus } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { onboardingQuery } from "@/lib/session";
import { EYEBROW, SECTION, WRAP } from "@/lib/ui";

export function generateStaticParams() {
  return STAGES.map((stage) => ({ slug: stage.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stage = journeyStages().find((item) => item.slug === slug);
  if (!stage) return {};
  return {
    title: `${stage.name} | EQUITAS Intelligence`,
    description: stage.promise,
  };
}

export default async function StagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stages = journeyStages();
  const index = stages.findIndex((stage) => stage.slug === slug);
  const stage = stages[index];
  if (!stage) notFound();

  const previous = index > 0 ? stages[index - 1] : null;
  const next = index < stages.length - 1 ? stages[index + 1] : null;
  const word = STAGE_WORDS[index] ?? String(index + 1);
  const promise = stage.promise.endsWith(".") ? stage.promise : `${stage.promise}.`;
  const guides = GUIDES.filter((guide) => guide.stage === stage.name);
  const isComing = stage.status === "Coming";
  const firstTool = stage.tools[0];

  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="border-b border-line bg-bg-2">
          <div className={`${WRAP} py-7`}>
            <JourneyStrip current={stage.slug} />
          </div>
        </div>

        <PageHero
          eyebrow={
            <>
              Stage {word} · {stage.status}
            </>
          }
          title={stage.name}
          lede={
            <>
              <p className="text-[clamp(20px,2vw,26px)] leading-[1.3] tracking-[-0.025em] text-ink">{promise}</p>
              <p>{stage.getBody}</p>
            </>
          }
          actions={
            isComing ? (
              <Button href="#coming" variant="primary">
                Tell us what would help
              </Button>
            ) : (
              <>
                <Button href={onboardingQuery(stage.slug)} variant="primary">
                  Start in {stage.name}
                </Button>
                {firstTool && (
                  <Button href={`/app/tool?module=${moduleSlug(firstTool.name)}`} variant="ghost">
                    Look at {firstTool.name}
                  </Button>
                )}
              </>
            )
          }
          note={stage.statusNote}
          visual={<StagePreview slug={stage.slug} />}
        />

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead eyebrow="Is this your stage?" title="You are here if." />
            <ul className="m-0 mt-12 grid list-none gap-5 p-0 md:grid-cols-3">
              {stage.hereIf.map((line, i) => (
                <li key={line} className="flex flex-col rounded-2xl bg-surface p-7 shadow-card">
                  <span className="text-[13px] tabular-nums text-gold-text">{`0${i + 1}`}</span>
                  <p className="mt-6 text-[19px] leading-[1.4] tracking-[-0.02em]">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {stage.tools.length > 0 && (
          <section className={`${WRAP} ${SECTION}`}>
            <SectionHead
              eyebrow="Tools in this stage"
              title={stage.tools.length === 1 ? "One tool, built for this step." : `${stage.tools.length} tools, one plain job each.`}
              lede="Each one says what it does and who it is for. Open any of them to see what it looks like."
            />
            <ul
              className={`m-0 mt-12 grid list-none gap-5 p-0 ${
                stage.tools.length === 1
                  ? "max-w-[620px]"
                  : stage.tools.length === 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2"
              }`}
            >
              {stage.tools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={`/app/tool?module=${moduleSlug(tool.name)}`}
                    className="lift flex h-full flex-col rounded-2xl bg-surface p-7 no-underline shadow-card sm:p-8"
                  >
                    <StatusBadge status={moduleStatus(tool.name)} />
                    <span className="mt-6 text-[24px] leading-[1.15] tracking-[-0.03em]">{tool.name}</span>
                    <span className="mt-3 flex-1 text-[15.5px] leading-[1.55] text-muted">{tool.description}</span>
                    <span className="mt-8 text-[15px] text-gold-text">Open {tool.name} →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {stage.coming && (
          <section id="coming" className={`scroll-mt-24 ${WRAP} ${stage.tools.length > 0 ? "pb-[clamp(80px,10vw,136px)]" : SECTION}`}>
            <div className="grid gap-10 rounded-2xl border border-dashed border-line-2 bg-bg-2 px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <StatusBadge status="Coming" />
                <h2 className="mt-5 text-[clamp(28px,3vw,40px)] font-light leading-[1.08] tracking-[-0.035em]">
                  What&rsquo;s coming in {stage.name}
                </h2>
                <p className="mt-4 max-w-[48ch] text-[16.5px] leading-[1.6] text-muted">{stage.coming}</p>
              </div>
              <div className="self-end">
                <ComingCapture id={`coming-${stage.slug}`} />
              </div>
            </div>
          </section>
        )}

        <section className="bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
            <SectionHead band eyebrow="What you get" title={stage.getHeading} />
            <ol className="m-0 grid list-none gap-3 p-0">
              {stage.getLines.map((line, i) => (
                <li key={line} className="grid grid-cols-[2.5rem_1fr] items-baseline rounded-2xl bg-band-2 px-6 py-5">
                  <span className="text-[13px] tabular-nums text-gold-on-band">{`0${i + 1}`}</span>
                  <span className="text-[18px] leading-[1.4] tracking-[-0.02em]">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {guides.length > 0 && (
          <section className={`${WRAP} ${SECTION}`}>
            <SectionHead eyebrow="Read first" title={`Guides for ${stage.name}.`} lede="Free to read. No account needed." />
            <ul className="m-0 mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <Link
                    href={guideHref(guide)}
                    className="lift flex h-full flex-col rounded-2xl bg-surface p-7 no-underline shadow-card"
                  >
                    <span className={EYEBROW}>{guide.minutes} minute read</span>
                    <span className="mt-4 text-[22px] leading-[1.2] tracking-[-0.03em]">{guide.title}</span>
                    <span className="mt-3 flex-1 text-[15px] leading-[1.5] text-muted">{guide.line}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Adjacent stages" className={`${WRAP} ${guides.length > 0 ? "pb-[clamp(80px,10vw,136px)]" : SECTION}`}>
          <div className="grid gap-5 md:grid-cols-2">
            {previous ? (
              <Link href={`/journey/${previous.slug}`} className="lift flex flex-col rounded-2xl bg-surface p-7 no-underline shadow-card">
                <span className="text-[13px] text-muted">← Previous stage</span>
                <span className="mt-3 text-[26px] tracking-[-0.03em]">{previous.name}</span>
                <span className="mt-1 text-[15px] text-muted">{previous.promise}</span>
              </Link>
            ) : (
              <Link href="/journey" className="lift flex flex-col rounded-2xl bg-surface p-7 no-underline shadow-card">
                <span className="text-[13px] text-muted">← Overview</span>
                <span className="mt-3 text-[26px] tracking-[-0.03em]">The whole journey</span>
                <span className="mt-1 text-[15px] text-muted">All six stages on one page</span>
              </Link>
            )}
            {next ? (
              <Link href={`/journey/${next.slug}`} className="lift flex flex-col rounded-2xl bg-surface p-7 text-right no-underline shadow-card">
                <span className="text-[13px] text-muted">Next stage →</span>
                <span className="mt-3 text-[26px] tracking-[-0.03em]">{next.name}</span>
                <span className="mt-1 text-[15px] text-muted">{next.promise}</span>
              </Link>
            ) : (
              <Link href="/journey" className="lift flex flex-col rounded-2xl bg-surface p-7 text-right no-underline shadow-card">
                <span className="text-[13px] text-muted">Overview →</span>
                <span className="mt-3 text-[26px] tracking-[-0.03em]">The whole journey</span>
                <span className="mt-1 text-[15px] text-muted">All six stages on one page</span>
              </Link>
            )}
          </div>
        </nav>

        <CtaBand
          title={isComing ? "Start where it is built today." : `Start in ${stage.name}.`}
          primary={{ href: onboardingQuery(isComing ? "compete" : stage.slug), label: "Create a free account" }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
