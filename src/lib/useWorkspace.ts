"use client";

import { useMemo, useSyncExternalStore } from "react";
import { WORKSPACE_EVENT, WORKSPACE_KEY, emptyWorkspace, type Workspace } from "@/lib/workspace";

function subscribe(onChange: () => void) {
  window.addEventListener(WORKSPACE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(WORKSPACE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readRaw() {
  try {
    return window.sessionStorage.getItem(WORKSPACE_KEY);
  } catch {
    return null;
  }
}

const noop = () => () => {};

export function useWorkspace(): { workspace: Workspace; hydrated: boolean } {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const raw = useSyncExternalStore(subscribe, readRaw, () => null);
  const workspace = useMemo(() => {
    if (!raw) return emptyWorkspace();
    try {
      return { ...emptyWorkspace(), ...JSON.parse(raw) } as Workspace;
    } catch {
      return emptyWorkspace();
    }
  }, [raw]);
  return { workspace, hydrated };
}
