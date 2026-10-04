import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { journeyStages, type StageStatus } from "@/lib/content";

const DOT = 15;
const DOT_CENTER = DOT / 2;
/** Matches `gap-x-6` on the stage grid at lg. */
const GRID_GAP_PX = 24;

function StageDot({ status }: { status: StageStatus }) {
  return (
    <span
      aria-hidden="true"
      className={`relative z-[1] block shrink-0 overflow-hidden rounded-full border-[1.5px] ${
        status === "Coming" ? "border-line-2 bg-bg" : "border-gold bg-bg"
      }`}
      style={{ width: DOT, height: DOT }}
    >
      {status === "Available" && <span className="absolute inset-0 bg-gold" />}
      {status === "Partly available" && <span className="absolute inset-y-0 left-0 w-1/2 bg-gold" />}
    </span>
  );
}

export function JourneyStrip({ current }: { current?: string }) {
  const stages = journeyStages();

  return (
    <nav aria-label="Stages">
      <ol className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((stage, i) => {
          const href = `/journey/${stage.slug}`;
          const isCurrent = stage.slug === current;
          const hasNext = i < stages.length - 1;

          return (
            <li key={stage.slug} className="min-w-0">
              <Link
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className="flex flex-col items-start no-underline"
              >
                <div className="relative mb-3 w-full" style={{ height: DOT }}>
                  {hasNext && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 hidden h-px -translate-y-1/2 bg-line-2 lg:block"
                      style={{
                        left: DOT_CENTER,
                        width: `calc(100% - ${DOT_CENTER}px + ${GRID_GAP_PX}px)`,
                      }}
                    />
                  )}
                  <StageDot status={stage.status} />
                </div>
                <span
                  className={`font-display text-[19px] leading-tight tracking-[-0.02em] ${
                    isCurrent
                      ? "border-b border-gold pb-0.5 font-medium text-ink"
                      : "font-medium text-muted"
                  }`}
                >
                  {stage.name}
                </span>
                <span className="mt-2">
                  <StatusBadge status={stage.status} compact />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
