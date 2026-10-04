const KEY = "equitas-workspace";
export const WORKSPACE_KEY = KEY;
export const WORKSPACE_EVENT = "equitas-workspace-change";

export type SavedWork = {
  id: string;
  title: string;
  module: string;
  slug: string;
  savedAt: number;
  excerpt: string;
  example: boolean;
};

export type Seat = {
  id: string;
  email: string;
  name: string;
  status: "invited" | "active";
  sentAt: number;
};

export type Workspace = {
  saved: SavedWork[];
  seats: Seat[];
  reviewsThisPeriod: number;
};

export function emptyWorkspace(): Workspace {
  return { saved: [], seats: [], reviewsThisPeriod: 0 };
}

export function readWorkspace(): Workspace {
  if (typeof window === "undefined") return emptyWorkspace();
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return emptyWorkspace();
    return { ...emptyWorkspace(), ...JSON.parse(raw) };
  } catch {
    return emptyWorkspace();
  }
}

export function writeWorkspace(patch: Partial<Workspace>) {
  const next = { ...readWorkspace(), ...patch };
  window.sessionStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(WORKSPACE_EVENT));
  return next;
}

function id() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function addSavedWork(item: Omit<SavedWork, "id" | "savedAt">) {
  const workspace = readWorkspace();
  const entry: SavedWork = { ...item, id: id(), savedAt: Date.now() };
  const saved = [entry, ...workspace.saved.filter((row) => row.slug !== item.slug || row.excerpt !== item.excerpt)];
  return writeWorkspace({ saved });
}

export function removeSavedWork(itemId: string) {
  const workspace = readWorkspace();
  return writeWorkspace({ saved: workspace.saved.filter((row) => row.id !== itemId) });
}

export function recordReview() {
  const workspace = readWorkspace();
  return writeWorkspace({ reviewsThisPeriod: workspace.reviewsThisPeriod + 1 });
}

export function addSeat(email: string, name: string) {
  const workspace = readWorkspace();
  const existing = workspace.seats.find((seat) => seat.email.toLowerCase() === email.toLowerCase());
  if (existing) return { workspace, seat: existing, created: false };
  const seat: Seat = { id: id(), email, name, status: "invited", sentAt: Date.now() };
  const next = writeWorkspace({ seats: [seat, ...workspace.seats] });
  return { workspace: next, seat, created: true };
}

export function activateSeat(email: string) {
  const workspace = readWorkspace();
  const seats = workspace.seats.map((seat) =>
    seat.email.toLowerCase() === email.toLowerCase() ? { ...seat, status: "active" as const } : seat,
  );
  return writeWorkspace({ seats });
}

export function inviteHref(email: string, role?: string) {
  const params = new URLSearchParams({ email });
  if (role) params.set("role", role);
  return `/app/invite?${params.toString()}`;
}
