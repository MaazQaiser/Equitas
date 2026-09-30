const KEY = "equitas-session";
export const SESSION_KEY = KEY;
export const SESSION_EVENT = "equitas-session-change";

export type Session = {
  signedIn: boolean;
  name: string;
  email: string;
  from?: string;
  audience?: string;
  funder?: string;
  need?: string;
};

export function emptySession(): Session {
  return { signedIn: false, name: "", email: "" };
}

export function readSession(): Session {
  if (typeof window === "undefined") return emptySession();
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return emptySession();
    return { ...emptySession(), ...JSON.parse(raw) };
  } catch {
    return emptySession();
  }
}

export function writeSession(patch: Partial<Session>) {
  const next = { ...readSession(), ...patch };
  window.sessionStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(SESSION_EVENT));
  return next;
}

export function clearSession() {
  window.sessionStorage.removeItem(KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function onboardingQuery(from?: string | null) {
  if (!from) return "/onboarding";
  return `/onboarding?from=${encodeURIComponent(from)}`;
}
