import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { DeepIntro } from "@/components/DeepIntro";
import { PageHero, SectionHead } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { GUIDES, MODULES, STAGES, guideBySlug, guideHref } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { EYEBROW, SECTION, WRAP } from "@/lib/ui";

const WRITTEN = GUIDES.filter((guide) => !guide.href);

export function generateStaticParams() {
  return WRITTEN.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide || guide.href) return {};
  return {
    title: `${guide.title} | EQUITAS Intelligence`,
    description: guide.line,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide || guide.href || guide.body.length === 0) notFound();
  const stage = STAGES.find((item) => item.name === guide.stage);
  const tools = MODULES.filter((m) => m.stage === guide.stage);
  const related = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const [lead, ...rest] = guide.body;

  return (
    <>
      <SiteHeader current="learn" />
      <main id="main">
        <DeepIntro current={stage?.slug} />
        <PageHero
          tone="sand"
          before={
            <p className="mb-8">
              <Link href="/resources/guides" className="text-[14px] text-gold-text no-underline hover:underline">
                ← All guides
              </Link>
            </p>
          }
          eyebrow={
            <>
              Guide · {guide.stage} · {guide.minutes} minute read
            </>
          }
          title={guide.title}
          lede={<p>{guide.line}</p>}
          visual={
            <aside className="rounded-2xl bg-surface p-7 shadow-card sm:p-8">
              <p className={EYEBROW}>About this guide</p>
              <dl className="m-0 mt-5 grid gap-4 text-[15.5px]">
                <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <dt className="text-muted">Stage</dt>
                  <dd className="m-0">
                    {stage ? (
                      <Link href={`/journey/${stage.slug}`} className="no-underline hover:text-gold-text">
                        {stage.name} →
                      </Link>
                    ) : (
                      guide.stage
                    )}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <dt className="text-muted">Reading time</dt>
                  <dd className="m-0">{guide.minutes} minutes</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
                  <dt className="text-muted">Account needed</dt>
                  <dd className="m-0">No</dd>
                </div>
              </dl>
            </aside>
          }
        />

        <section className={`${WRAP} ${SECTION} grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20`}>
          <article className="max-w-[64ch]">
            <p className="text-[clamp(21px,2.1vw,26px)] font-light leading-[1.45] tracking-[-0.02em]">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-7 text-[18px] leading-[1.75] text-ink/85">
                {paragraph}
              </p>
            ))}
          </article>
          <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-band p-7 text-band-ink shadow-card">
              <p className="text-[12px] uppercase tracking-[0.14em] text-gold-on-band">Try it on your draft</p>
              <p className="mt-4 text-[20px] leading-[1.3] tracking-[-0.025em]">
                See how your own application would be read.
              </p>
              <div className="mt-6">
                <Button href="/how-it-works" variant="onband">
                  See a sample review
                </Button>
              </div>
            </div>
            {tools.length > 0 && stage && (
              <div className="rounded-2xl bg-surface p-7 shadow-card">
                <p className={EYEBROW}>Tools for {stage.name}</p>
                <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
                  {tools.map((t) => (
                    <li key={t.name}>
                      <Link href={`/app/tool?module=${moduleSlug(t.name)}`} className="block no-underline hover:text-gold-text">
                        <span className="block text-[16px] tracking-[-0.015em]">{t.name}</span>
                        <span className="mt-1 block">
                          <StatusBadge status={stage.status} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <SectionHead eyebrow="Keep reading" title="More guides." />
            <ul className="m-0 mt-12 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link href={guideHref(g)} className="lift flex h-full flex-col rounded-2xl bg-surface p-7 no-underline shadow-card">
                    <span className={EYEBROW}>{g.stage}</span>
                    <span className="mt-4 text-[22px] leading-[1.2] tracking-[-0.03em]">{g.title}</span>
                    <span className="mt-3 flex-1 text-[15px] leading-[1.5] text-muted">{g.line}</span>
                    <span className="mt-6 text-[14px] text-muted">{g.minutes} minute read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CtaBand
          title="See this applied to your own work."
          primary={{
            href: stage ? `/journey/${stage.slug}` : "/journey",
            label: stage ? `Continue at ${stage.name}` : "See the journey",
          }}
          secondary={{
            href: stage ? `/onboarding?from=${stage.slug}` : "/onboarding",
            label: "Create a free account",
          }}
        />
      </main>
      <SiteFooter />
    </>
  );
}
