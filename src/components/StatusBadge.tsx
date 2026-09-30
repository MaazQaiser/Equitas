import type { StageStatus } from "@/lib/content";

const DOT: Record<StageStatus, string> = {
  Available: "bg-gold",
  "Partly available": "bg-gold [background:linear-gradient(90deg,var(--gold)_50%,transparent_50%)] border border-gold",
  Coming: "bg-transparent border border-line-2",
};

// CLAUDE.md: "Always show the word. Never encode status with colour alone."
// The word itself is the signal; the dot is a redundant visual cue, not the
// only one.
export function StatusBadge({ status, compact }: { status: StageStatus; compact?: boolean }) {
  return (
    <span
      className={`inline-flex w-fit items-center uppercase text-gold-text ${
        compact
          ? "gap-1 text-[8.5px] font-semibold tracking-[0.1em]"
          : "gap-2 text-[10.5px] font-bold tracking-[0.11em]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`block shrink-0 rounded-full ${DOT[status]} ${compact ? "h-[6px] w-[6px]" : "h-[9px] w-[9px]"}`}
      />
      {status}
    </span>
  );
}
