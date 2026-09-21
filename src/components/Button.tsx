import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "gold" | "onband" | "onband-ghost";

// Primary is a compact navy control. The quiet action is a cream pill
// with a hairline, so the pair reads the way a Maze hero does, in our
// colours.
const VARIANTS: Record<Variant, string> = {
  primary: "rounded-[8px] bg-band text-band-ink ring-1 ring-band-line hover:bg-band-2",
  ghost:
    "rounded-full bg-surface/70 text-ink ring-1 ring-inset ring-line backdrop-blur-[2px] hover:bg-surface",
  gold: "rounded-[8px] bg-gold text-[#12202F] hover:opacity-90",
  onband: "rounded-[8px] bg-gold text-[#12202F] hover:opacity-90",
  "onband-ghost":
    "rounded-full bg-transparent text-band-ink ring-1 ring-inset ring-band-line hover:ring-band-ink",
};

export function Button({
  href,
  variant = "primary",
  children,
  type,
  onClick,
  className = "",
}: {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
}) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap px-5 text-[16px] font-normal tracking-[-0.01em] no-underline transition-colors duration-200 ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
