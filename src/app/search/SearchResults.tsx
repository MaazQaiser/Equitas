"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ComingCapture } from "@/components/ComingCapture";
import { Button } from "@/components/Button";
import { SectionHead } from "@/components/PageHero";
import { STAGES } from "@/lib/content";
import { inferFromFromQuery, inferNeedFromQuery, searchCatalog } from "@/lib/search";
import { onboardingQuery, writeSession } from "@/lib/session";
import { useSession } from "@/lib/useSession";
import { SECTION } from "@/lib/ui";

export function SearchResults({ query }: { query: string }) {
  const audience = useSession().session.audience;
  const hits = searchCatalog(query, audience);
  const need = inferNeedFromQuery(query);
  const from = inferFromFromQuery(query);

  useEffect(() => {
    if (need || from) writeSession({ need, from });
  }, [need, from]);

  if (hits.length > 0) {
    return (
      <section className="pb-[clamp(80px,10vw,136px)]">
        <SectionHead title={`${hits.length} ${hits.length === 1 ? "match" : "matches"}.`} />
        <ul className="m-0 mt-10 grid list-none gap-4 p-0">
          {hits.map((hit) => (
            <li key={`${hit.kind}-${hit.href}`}>
              <Link href={hit.href} className="lift flex flex-col rounded-2xl bg-surface p-6 no-underline shadow-card sm:p-7">
                <span className="text-[12px] uppercase tracking-[0.12em] text-gold-text">
                  {hit.kind}
                  {hit.stage ? ` · ${hit.stage}` : ""}
                </span>
                <span className="mt-3 text-[22px] leading-[1.2] tracking-[-0.03em]">{hit.title}</span>
                <span className="mt-2 text-[15px] leading-[1.55] text-muted">{hit.body}</span>
              </Link>
            </li>
          ))}
          </ul>
          <p className="mt-10">
            <Button href={onboardingQuery(from, need)} variant="primary">
              Create a free account
            </Button>
          </p>
        </section>
      );
    }

  return (
    <section className={SECTION}>
      <SectionHead
        title="We could not match that."
        lede="Here is the journey. Most people in your situation start at Compete."
      />
      <ul className="m-0 mt-10 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((stage) => (
          <li key={stage.slug}>
            <Link href={`/journey/${stage.slug}`} className="block rounded-2xl bg-surface p-6 no-underline shadow-card">
              <span className="text-[20px] tracking-[-0.03em]">{stage.name}</span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-muted">{stage.promise}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12 rounded-2xl bg-bg-2 p-7">
        <h3 className="text-[22px] tracking-[-0.03em]">Tell us what you were looking for.</h3>
        <p className="mt-2 max-w-[46ch] text-[15px] leading-[1.55] text-muted">
          If a search returns nothing, that is useful. We will use it to fill the gap.
        </p>
        <ComingCapture id="missing" />
      </div>
    </section>
  );
}
