"use client";

import Link from "next/link";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/Button";
import { ExampleTag } from "@/components/PageHero";
import { RequireSignIn } from "@/components/RequireSignIn";
import { removeSavedWork } from "@/lib/workspace";
import { useWorkspace } from "@/lib/useWorkspace";

function SavedList() {
  const { workspace } = useWorkspace();

  return (
    <>
      <AppHeader current="saved" />
      <main id="main" className="mx-auto w-full max-w-[1180px] px-6 py-[clamp(48px,7vw,88px)] md:px-10">
        <p className="text-[12px] uppercase tracking-[0.14em] text-gold-text">Saved work</p>
        <h1 className="mt-3 max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          Come back to what you already ran.
        </h1>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.6] text-muted">
          Saved reviews stay in this browser for this session. They are not sent to a server yet.
        </p>

        {workspace.saved.length === 0 ? (
          <div className="mt-12 max-w-[560px] rounded-2xl bg-surface p-8 shadow-card">
            <h2 className="text-[22px] tracking-[-0.02em]">Nothing saved yet.</h2>
            <p className="mt-3 text-[15px] leading-[1.55] text-muted">
              Run a review and save it. You will land back here in one click the next time you sign in.
            </p>
            <div className="mt-6">
              <Button href="/app/tool" variant="primary">
                Open the Study Section Simulator
              </Button>
            </div>
          </div>
        ) : (
          <ul className="m-0 mt-12 grid list-none gap-4 p-0">
            {workspace.saved.map((item) => (
              <li key={item.id} className="rounded-2xl bg-surface p-6 shadow-card sm:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[12px] uppercase tracking-[0.1em] text-gold-text">{item.module}</p>
                  {item.example ? <ExampleTag>Example</ExampleTag> : null}
                </div>
                <h2 className="mt-3 text-[22px] tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-2 max-w-[62ch] text-[15px] leading-[1.55] text-muted">{item.excerpt}</p>
                <p className="mt-3 text-[13px] text-muted">
                  Saved {new Date(item.savedAt).toLocaleString()}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`/app/tool?module=${item.slug}`} variant="primary">
                    Open this review
                  </Button>
                  <Button type="button" variant="ghost" onClick={() => removeSavedWork(item.id)}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-12 max-w-[54ch] text-[14px] leading-[1.55] text-muted">
          Paid limits are not live. If one applied, the message would name the work you were doing.{" "}
          <Link href="/pricing/upgrade" className="text-gold-text no-underline hover:underline">
            See that screen.
          </Link>
        </p>
      </main>
    </>
  );
}

export default function SavedPage() {
  return (
    <RequireSignIn>
      <SavedList />
    </RequireSignIn>
  );
}
