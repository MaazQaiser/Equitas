"use client";

import { useMemo, useSyncExternalStore } from "react";
import { SESSION_EVENT, SESSION_KEY, emptySession, type Session } from "@/lib/session";

function subscribe(onChange: () => void) {
  window.addEventListener(SESSION_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(SESSION_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readRaw() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

const noop = () => () => {};

// The session lives in sessionStorage, so the server render never has it.
// `hydrated` is false on the server and during hydration, true afterwards.
export function useSession(): { session: Session; hydrated: boolean } {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const session = useMemo(() => {
    if (!raw) return emptySession();
    try {
      return { ...emptySession(), ...JSON.parse(raw) } as Session;
    } catch {
      return emptySession();
    }
  }, [raw]);
  return { session, hydrated };
}
