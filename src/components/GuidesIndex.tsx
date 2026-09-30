"use client";

import { useState } from "react";
import Link from "next/link";
import { STAGES, guideHref, type Guide } from "@/lib/content";

export function GuidesIndex({ guides }: { guides: Guide[] }) {
  const [stage, setStage] = useState("All");
  const filters = ["All", ...STAGES.map((item) => item.name)];
  const visible = stage === "All" ? guides : guides.filter((guide) => guide.stage === stage);
  const featured = visible.find((guide) => guide.featured);
  const rest = visible.filter((guide) => !guide.featured);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter guides by stage">
        {filters.map((name) => {
          const selected = stage === name;
          return (
            <button
              key={name}
              type="button"
              aria-pressed={selected}
              onClick={() => setStage(name)}
              className={`min-h-11 rounded-full px-4 text-[14px] tracking-[-0.01em] ${
                selected
                  ? "bg-band text-band-ink ring-1 ring-band-line"
                  : "bg-surface text-ink ring-1 ring-inset ring-line hover:bg-surface/80"
              }`}
            >
              {name}
            </button>
          );
        })}
      </div>

      {featured && (
        <Link
          href={guideHref(featured)}
          className="mt-10 block rounded-2xl bg-surface p-8 no-underline shadow-card sm:p-10"
        >
          <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-gold-text">
            {featured.stage}
          </p>
          <h2 className="mt-4 max-w-[20ch] text-[clamp(32px,4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
            {featured.title}
          </h2>
          <p className="mt-4 max-w-[54ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-muted">
            {featured.line}
          </p>
          <p className="mt-6 text-[14px] text-muted">{featured.minutes} minute read</p>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-10 m-0 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={guideHref(guide)}
                className="lift flex h-full flex-col rounded-2xl bg-surface p-6 no-underline shadow-card sm:p-7"
              >
                <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-gold-text">
                  {guide.stage}
                </p>
                <h3 className="mt-3 text-[22px] font-light leading-[1.15] tracking-[-0.03em]">
                  {guide.title}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.5] text-muted">{guide.line}</p>
                <p className="mt-6 text-[14px] text-muted">{guide.minutes} minute read</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {visible.length === 0 && (
        <p className="mt-12 max-w-[42ch] text-[16px] leading-[1.55] text-muted">
          No guides in this stage yet. The set will grow.
        </p>
      )}
    </>
  );
}
