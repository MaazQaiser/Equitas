import type { StageStatus } from "@/lib/content";

const DOT: Record<StageStatus, string> = {
  Available: "bg-gold",
  "Partly available":
    "bg-gold [background:linear-gradient(90deg,var(--gold)_50%,transparent_50%)] border border-gold",
  Coming: "bg-transparent border border-line-2",
};

const PILL: Record<StageStatus, string> = {
  Available: "bg-gold/15 text-gold-text",
  "Partly available": "bg-bg-2 text-gold-text ring-1 ring-gold/40",
  Coming: "bg-transparent text-muted ring-1 ring-line-2",
};

const NOTE: Record<StageStatus, string> = {
  Available: "Built and working today.",
  "Partly available": "Some of this is live. The rest is still being built, and says so.",
  Coming: "Not built yet. Shown so you can see where it will sit.",
};

export function statusNote(status: StageStatus) {
  return NOTE[status];
}

// The word is the signal. Colour and fill are extra, not the only cue.
export function StatusBadge({ status, compact }: { status: StageStatus; compact?: boolean }) {
  return (
    <span
      className={`inline-flex w-fit items-center uppercase ${PILL[status]} ${
        compact
          ? "gap-1 rounded-full px-2 py-0.5 text-[8.5px] font-semibold tracking-[0.1em]"
          : "gap-2 rounded-full px-2.5 py-1 text-[10.5px] font-bold tracking-[0.11em]"
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
