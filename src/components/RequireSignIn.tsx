"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/useSession";

export function RequireSignIn({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (hydrated && !session.signedIn) router.replace("/signin");
  }, [hydrated, session.signedIn, router]);

  if (!hydrated || !session.signedIn) return null;
  return <>{children}</>;
}
