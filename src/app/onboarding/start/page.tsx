"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/Button";
import { JourneyStrip } from "@/components/JourneyStrip";
import { StageGroupedTools } from "@/components/StageGroupedTools";
import { moduleSlug, recommend } from "@/lib/onboarding";
import { useSession } from "@/lib/useSession";
import type { Recommendation } from "@/lib/onboarding";

export default function StartPage() {
  const { session, hydrated } = useSession();
  const result: Recommendation | null | "loading" = hydrated
    ? recommend({
        audience: session.audience,
        funder: session.funder,
        need: session.need,
        from: session.from,
      })
    : "loading";

  if (result === "loading") {
    return (
      <AuthLayout>
        <p className="text-muted">Loading…</p>
      </AuthLayout>
    );
  }

  if (!result) {
    return (
      <AuthLayout wide>
        <h1 className="max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          Your tools, by stage.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.5] text-muted">
          Grouped by where you are in the work, not a flat grid.
        </p>
        <div className="mt-10">
          <JourneyStrip current="compete" />
        </div>
        <div className="mt-10">
          <StageGroupedTools showPersonalise collapseOthers />
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <h1 className="max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Here is where to start.
      </h1>
      <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-muted">{result.summary}</p>
      <div className="mt-8">
        <JourneyStrip current={result.stageSlug} />
      </div>
      <p className="mt-8 text-[18px] tracking-[-0.02em]">
        {result.stageName}
        <span className="text-muted"> · {result.stagePromise}</span>
      </p>
      <article className="mt-8 rounded-2xl bg-surface p-8 shadow-card sm:p-10">
        <h2 className="text-[clamp(28px,3vw,36px)] font-light tracking-[-0.03em]">{result.primary.name}</h2>
        <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.5] text-muted">{result.primary.description}</p>
        <div className="mt-8">
          <Button href={`/app/tool?module=${moduleSlug(result.primary.name)}`} variant="primary">
            Start
          </Button>
        </div>
      </article>
      {result.related.length > 0 && (
        <ul className="mt-6 m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
          {result.related.map((tool) => (
            <li key={tool.name}>
              <Link
                href={`/app/tool?module=${moduleSlug(tool.name)}`}
                className="block h-full rounded-2xl bg-surface p-6 no-underline shadow-card"
              >
                <h3 className="text-[18px] font-medium tracking-[-0.02em]">{tool.name}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.5] text-muted">{tool.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-10">
        <Button href="/app" variant="ghost">
          See every tool
        </Button>
      </p>
    </AuthLayout>
  );
}
