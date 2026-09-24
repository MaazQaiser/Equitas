"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { STAGES, type StageStatus } from "@/lib/content";

const EMPHASIS = new Set(["compete", "review"]);

// The column is data-driven. Delete Manage from STAGES and its card goes too.
export function JourneyRail({ current }: { current?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = [...list.querySelectorAll<HTMLElement>("[data-stage-card]")];
    if (cards.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const focus = window.innerHeight * 0.42;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - focus);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive((prev) => (prev === best ? prev : best));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={listRef} className="m-0 flex list-none flex-col gap-3 p-0">
      {STAGES.map((stage, i) => {
        const emphasis = EMPHASIS.has(stage.slug);
        return (
          <li key={stage.slug}>
            <Link
              href={`/journey/${stage.slug}`}
              data-stage-card={stage.slug}
              aria-current={stage.slug === current ? "page" : undefined}
              className="flex items-stretch gap-2 no-underline"
            >
              <span
                className={`tl-rail flex w-12 shrink-0 flex-col items-center justify-between rounded-[18px] py-4 sm:w-[52px]${
                  i === active ? " is-current" : ""
                }`}
              >
                <span className="tl-num text-[12px] tracking-[0.08em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <PathDot status={stage.status} />
              </span>
              <span
                className={`timeline-card min-w-0 flex-1 rounded-[22px] px-5 py-5 sm:px-6 sm:py-6${
                  i === active ? " is-current" : ""
                }`}
              >
                <h3
                  className={`font-display leading-[1.05] tracking-[-0.03em] ${
                    emphasis ? "text-[clamp(28px,3vw,36px)]" : "text-[clamp(26px,2.6vw,32px)]"
                  }`}
                >
                  {stage.name}
                </h3>
                <p className="tl-muted mt-3 max-w-[36ch] text-[15.5px] leading-[1.45]">{stage.promise}</p>
                {stage.slug === "imagine" && (
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14px] leading-[1.45]">
                    <span>Start with a research question.</span>
                    <span>Coming</span>
                  </p>
                )}
                <p className="mt-4 text-[14px]">{stage.status}</p>
                {stage.modules.length > 0 && (
                  <p className="tl-muted mt-3 text-[13.5px] leading-[1.45]">{stage.modules.join(" · ")}</p>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function PathDot({ status }: { status: StageStatus }) {
  return (
    <span aria-hidden="true" className="tl-dot relative block h-3.5 w-3.5 shrink-0 overflow-hidden rounded-full border-[1.5px]">
      {status === "Available" && <span className="tl-dot-fill absolute inset-0" />}
      {status === "Partly available" && <span className="tl-dot-fill absolute inset-y-0 left-0 w-1/2" />}
    </span>
  );
}
