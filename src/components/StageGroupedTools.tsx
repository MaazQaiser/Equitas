"use client";

import Link from "next/link";
import { useState } from "react";
import { MODULES, STAGES, moduleStatus, moduleWeight, audienceKey } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { StatusBadge } from "@/components/StatusBadge";
import { useSession } from "@/lib/useSession";

export function StageGroupedTools({
  personaliseHref = "/onboarding/you",
  showPersonalise = false,
  collapseOthers = false,
}: {
  personaliseHref?: string;
  showPersonalise?: boolean;
  collapseOthers?: boolean;
}) {
  const audience = useSession().session.audience;
  const need = useSession().session.need;
  const from = useSession().session.from;
  const key = audienceKey(audience);
  const openSlug =
    from ||
    (need === "award"
      ? "manage"
      : need === "unfunded" || need === "scored"
        ? "review"
        : need === "writing"
          ? "compete"
          : need === "study"
            ? "design"
            : need === "funding"
              ? "imagine"
              : "compete");
  const [open, setOpen] = useState<string>(openSlug);

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
      <div className="flex flex-col gap-8">
        {STAGES.map((stage) => {
          const tools = MODULES.filter((module) => module.stage === stage.name);
          const primary = tools.filter((tool) => moduleWeight(tool.name, key) === "primary");
          const more = tools.filter((tool) => moduleWeight(tool.name, key) === "secondary");
          const shown = key ? [...primary, ...more] : tools;
          const isOpen = !collapseOthers || open === stage.slug || shown.length === 0;

          return (
            <section key={stage.slug}>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                {collapseOthers ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen((current) => (current === stage.slug ? "" : stage.slug))}
                    className="text-left text-[clamp(28px,3vw,36px)] font-light tracking-[-0.03em]"
                  >
                    {stage.name}
                  </button>
                ) : (
                  <h2 className="text-[clamp(28px,3vw,36px)] font-light tracking-[-0.03em]">{stage.name}</h2>
                )}
                <StatusBadge status={stage.status} />
              </div>
              <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.5] text-muted">
                {stage.promise.endsWith(".") ? stage.promise : `${stage.promise}.`}
              </p>
              <p className="mt-2 max-w-[46ch] text-[13.5px] leading-[1.5] text-muted">{stage.statusNote}</p>
              {isOpen &&
                (shown.length > 0 ? (
                  <ul className="mt-5 m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
                    {shown.map((tool) => {
                      const weight = moduleWeight(tool.name, key);
                      return (
                        <li key={tool.name}>
                          <Link
                            href={`/app/tool?module=${moduleSlug(tool.name)}`}
                            className="block h-full rounded-2xl bg-surface p-5 no-underline shadow-card"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h3 className="text-[18px] font-medium tracking-[-0.02em]">{tool.name}</h3>
                              <StatusBadge status={moduleStatus(tool.name)} compact />
                            </div>
                            {key && weight === "secondary" && (
                              <p className="mt-1 text-[12px] uppercase tracking-[0.1em] text-gold-text">More tools</p>
                            )}
                            <p className="mt-2 text-[14.5px] leading-[1.5] text-muted">{tool.description}</p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-4 text-[15px] text-muted">Coming. Nothing to start here yet.</p>
                ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
