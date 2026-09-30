"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/AppHeader";
import { StageGroupedTools } from "@/components/StageGroupedTools";
import { useSession } from "@/lib/useSession";

export default function AppHomePage() {
  const router = useRouter();
  const { session, hydrated } = useSession();
  const ready = hydrated && session.signedIn;

  useEffect(() => {
    if (hydrated && !session.signedIn) router.replace("/signin");
  }, [hydrated, session.signedIn, router]);

  if (!ready) return null;

  return (
    <>
      <AppHeader current="home" />
      <main id="main" className="mx-auto w-full max-w-[1180px] px-6 py-[clamp(48px,7vw,88px)] md:px-10">
        <h1 className="max-w-[14ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
          Your tools, by stage.
        </h1>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-[1.5] text-muted">
          Not a flat grid. Start from where you are in the work.
        </p>
        <div className="mt-12">
          <StageGroupedTools showPersonalise />
        </div>
      </main>
    </>
  );
}
