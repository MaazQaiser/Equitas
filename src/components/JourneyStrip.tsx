import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { journeyStages } from "@/lib/content";

export function JourneyStrip({ current }: { current?: string }) {
  const stages = journeyStages();

  return (
    <nav aria-label="Stages" className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[7px] right-[8%] left-[8%] hidden h-px bg-line-2 lg:block"
      />
      <ol className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-8 p-0 sm:grid-cols-3 lg:grid-cols-6">
        {stages.map((stage) => {
          const href = current ? `/journey/${stage.slug}` : `#${stage.slug}`;
          const isCurrent = stage.slug === current;
          return (
            <li key={stage.slug}>
              <Link
                href={href}
                aria-current={isCurrent ? "page" : undefined}
                className="flex flex-col items-start no-underline"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-[1] mb-3 block h-[15px] w-[15px] overflow-hidden rounded-full border-[1.5px] ${
                    stage.status === "Coming"
                      ? "border-line-2 bg-bg"
                      : "border-gold"
                  }`}
                >
                  {stage.status === "Available" && <span className="absolute inset-0 bg-gold" />}
                  {stage.status === "Partly available" && (
                    <span className="absolute inset-y-0 left-0 w-1/2 bg-gold" />
                  )}
                </span>
                <span
                  className={`font-display text-[19px] leading-tight tracking-[-0.02em] ${
                    isCurrent
                      ? "border-b-[1.5px] border-gold pb-0.5 font-medium text-ink"
                      : "font-medium text-muted"
                  }`}
                >
                  {stage.name}
                </span>
                <span className="mt-2">
                  <StatusBadge status={stage.status} />
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
