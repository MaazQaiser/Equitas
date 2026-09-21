import type { StageStatus } from "@/lib/content";

const DOT: Record<StageStatus, string> = {
  Available: "bg-gold",
  "Partly available": "bg-gold [background:linear-gradient(90deg,var(--gold)_50%,transparent_50%)] border border-gold",
  Coming: "bg-transparent border border-line-2",
};

// CLAUDE.md: "Always show the word. Never encode status with colour alone."
// The word itself is the signal; the dot is a redundant visual cue, not the
// only one.
export function StatusBadge({ status }: { status: StageStatus }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.11em] text-gold-text">
      <span aria-hidden="true" className={`block h-[9px] w-[9px] rounded-full ${DOT[status]}`} />
      {status}
    </span>
  );
}
