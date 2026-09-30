"use client";

import Link from "next/link";
import { MODULES, STAGES } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { StatusBadge } from "@/components/StatusBadge";

export function StageGroupedTools({
  personaliseHref = "/onboarding/you",
  showPersonalise = false,
}: {
  personaliseHref?: string;
  showPersonalise?: boolean;
}) {
  return (
    <div>
      {showPersonalise && (
        <p className="mb-10 max-w-[46ch] text-[15px] leading-[1.55] text-muted">
          You can{" "}
          <Link href={personaliseHref} className="text-gold-text no-underline hover:underline">
            personalise this start
          </Link>{" "}
          whenever you want.
        </p>
      )}
      <div className="flex flex-col gap-12">
        {STAGES.map((stage) => {
          const tools = MODULES.filter((module) => module.stage === stage.name);
          return (
            <section key={stage.slug}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="text-[clamp(28px,3vw,36px)] font-light tracking-[-0.03em]">{stage.name}</h2>
                <StatusBadge status={stage.status} />
              </div>
              <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.5] text-muted">
                {stage.promise.endsWith(".") ? stage.promise : `${stage.promise}.`}
              </p>
              {tools.length > 0 ? (
                <ul className="mt-5 m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <Link
                        href={`/app/tool?module=${moduleSlug(tool.name)}`}
                        className="block h-full rounded-2xl bg-surface p-5 no-underline shadow-card"
                      >
                        <h3 className="text-[18px] font-medium tracking-[-0.02em]">{tool.name}</h3>
                        <p className="mt-2 text-[14.5px] leading-[1.5] text-muted">{tool.description}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-[15px] text-muted">Coming. Nothing to start here yet.</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
