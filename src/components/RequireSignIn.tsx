"use client";

import { useEffect, type ReactNode } from "react";
import { useSession } from "@/lib/useSession";

export function RequireSignIn({ children }: { children: ReactNode }) {
  const { session, hydrated } = useSession();

  useEffect(() => {
    if (hydrated && !session.signedIn) window.location.replace("/signin");
  }, [hydrated, session.signedIn]);

  if (!hydrated || !session.signedIn) return null;
  return <>{children}</>;
}
