import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { SearchResults } from "./SearchResults";
import { inferFromFromQuery, inferNeedFromQuery } from "@/lib/search";
import { onboardingQuery } from "@/lib/session";
import { WRAP } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Search | EQUITAS Intelligence",
  description: "Find a tool, a stage or a guide from a plain sentence about what you need.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const raw = await searchParams;
  const q = Array.isArray(raw.q) ? raw.q[0] ?? "" : raw.q ?? "";
  const need = inferNeedFromQuery(q);
  const from = inferFromFromQuery(q);

  return (
    <>
      <SiteHeader current="learn" />
      <main id="main">
        <PageHero
          eyebrow="Search"
          title={q.trim() ? `Results for "${q.trim()}".` : "Tell us what you need."}
          lede={
            <p>
              Search uses the words researchers actually type. Every result names the stage it belongs
              to, so the journey stays visible.
            </p>
          }
        />

        <section className={`${WRAP} pb-[clamp(80px,10vw,136px)]`}>
          <form action="/search" className="flex max-w-[760px] flex-wrap items-center gap-3 rounded-2xl bg-surface p-2 pl-6 shadow-card">
            <label htmlFor="search-q" className="sr-only">
              Describe what you need
            </label>
            <input
              id="search-q"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="For example: my grant was not funded"
              className="min-w-[160px] flex-1 border-0 bg-transparent py-3 text-[16.5px] outline-none placeholder:text-muted"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </form>
          <p className="mt-4 max-w-[62ch] text-[14px] text-muted">
            Please do not paste{" "}
            <Link href="/legal/data-security" className="text-gold-text underline">
              grant text
            </Link>{" "}
            or patient data here.
          </p>
        </section>

        {q.trim() && (
          <div className={WRAP}>
            <SearchResults query={q} />
          </div>
        )}
      </main>
      <CtaBand primary={{ href: onboardingQuery(from, need), label: "Create a free account" }} />
      <SiteFooter />
    </>
  );
}
