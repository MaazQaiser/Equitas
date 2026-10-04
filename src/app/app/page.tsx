"use client";

import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { JourneyStrip } from "@/components/JourneyStrip";
import { RequireSignIn } from "@/components/RequireSignIn";
import { StageGroupedTools } from "@/components/StageGroupedTools";
import { audienceKey, visibleModules, guideHref } from "@/lib/content";
import { moduleSlug } from "@/lib/onboarding";
import { suggestionsFor } from "@/lib/search";
import { useSession } from "@/lib/useSession";
import { useWorkspace } from "@/lib/useWorkspace";

const ATTENTION = [
  { title: "RPPR due in 18 days", body: "Post-Award Management keeps progress reports on the calendar.", href: "/app/tool?module=post-award-management" },
  { title: "Two subaward invoices waiting", body: "Subaward and Invoicing tracks collaborating sites.", href: "/app/tool?module=subaward-invoicing" },
  { title: "Budget revision for a no-cost extension", body: "Budget and Finance is the place to check the numbers first.", href: "/app/tool?module=budget-finance" },
];

function AppHome() {
  const { session } = useSession();
  const { workspace } = useWorkspace();
  const gm = audienceKey(session.audience) === "grants_manager";
  const chair = audienceKey(session.audience) === "institution";

  const primary = visibleModules(session.audience, "primary");
  const suggestions = suggestionsFor(session.audience, session.from);
  const continueHref = session.lastTool ? `/app/tool?module=${session.lastTool}` : primary[0]
    ? `/app/tool?module=${moduleSlug(primary[0].name)}`
    : "/app/tool";
  const continueLabel = session.lastLabel
    ? `Continue ${session.lastLabel}`
    : primary[0]
      ? `Start ${primary[0].name}`
      : "See a sample review";

  return (
    <>
      <AppHeader current="home" />
      <main id="main" className="mx-auto w-full max-w-[1180px] px-6 py-[clamp(48px,7vw,88px)] md:px-10">
        <p className="text-[15px] text-muted">Hello{session.name ? `, ${session.name}` : ""}.</p>
        <h1 className="mt-3 max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          {gm ? "What needs attention." : "Your next step."}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={continueHref} variant="primary">
            {continueLabel}
          </Button>
          <Button href="/app/saved" variant="ghost">
            {workspace.saved.length ? `Saved work (${workspace.saved.length})` : "Saved work"}
          </Button>
          {gm || chair ? (
            <>
              <Button href="/app/seats" variant="ghost">
                Seats
              </Button>
              <Button href="/app/chair" variant="ghost">
                Pipeline
              </Button>
            </>
          ) : null}
        </div>
        <form action="/search" className="mt-10 flex max-w-[640px] flex-wrap items-center gap-3 rounded-2xl bg-surface p-2 pl-5 shadow-card">
          <label htmlFor="app-q" className="sr-only">
            Search
          </label>
          <input
            id="app-q"
            name="q"
            type="search"
            placeholder="What do you need help with?"
            className="min-w-[140px] flex-1 border-0 bg-transparent py-2.5 text-[16px] outline-none placeholder:text-muted"
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
        </form>

        {gm ? (
          <ul className="m-0 mt-12 grid list-none gap-4 p-0">
            {ATTENTION.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="block rounded-2xl bg-surface p-6 no-underline shadow-card">
                  <h2 className="text-[20px] tracking-[-0.02em]">{item.title}</h2>
                  <p className="mt-2 text-[15px] leading-[1.5] text-muted">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="mt-14">
              <JourneyStrip current={session.from} />
            </div>
            <section className="mt-14">
              <h2 className="text-[clamp(26px,3vw,34px)] font-light tracking-[-0.03em]">Suggestions for you</h2>
              <ul className="m-0 mt-6 grid list-none gap-3 p-0 sm:grid-cols-3">
                {suggestions.map((guide) => (
                  <li key={guide.slug}>
                    <Link href={guideHref(guide)} className="block h-full rounded-2xl bg-surface p-5 no-underline shadow-card">
                      <p className="text-[12px] uppercase tracking-[0.1em] text-gold-text">{guide.stage}</p>
                      <p className="mt-2 text-[17px] leading-[1.35] tracking-[-0.02em]">{guide.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            {primary.length > 0 && (
              <section className="mt-14">
                <h2 className="text-[clamp(26px,3vw,34px)] font-light tracking-[-0.03em]">Tools for your stage</h2>
                <ul className="m-0 mt-6 grid list-none gap-3 p-0 sm:grid-cols-2">
                  {primary.slice(0, 4).map((tool) => (
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
              </section>
            )}
          </>
        )}

        <section className="mt-16">
          <h2 className="text-[clamp(26px,3vw,34px)] font-light tracking-[-0.03em]">
            {gm ? "Office tools" : "All tools, by stage"}
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.5] text-muted">
            {gm
              ? "Awards and deadlines first. The researcher journey is still one click away."
              : "Your stage is open. The rest are collapsed."}
          </p>
          <div className="mt-8">
            <StageGroupedTools collapseOthers={!gm} />
          </div>
        </section>
      </main>
    </>
  );
}

export default function AppHomePage() {
  return (
    <RequireSignIn>
      <AppHome />
    </RequireSignIn>
  );
}
