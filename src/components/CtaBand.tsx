import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { WRAP } from "@/lib/ui";

export function CtaBand({
  title = "Start your research journey.",
  lede,
  primary = { href: "/onboarding", label: "Create an account" },
  secondary = { href: "/how-it-works", label: "See a sample review" },
  note = "The Study Section Simulator sample is live. Other modules are labelled for what they are.",
}: {
  title?: ReactNode;
  lede?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
  note?: ReactNode;
}) {
  return (
    <section className={`${WRAP} py-[clamp(112px,14vw,192px)] text-center`}>
      <h2 className="mx-auto max-w-[16ch] text-[clamp(44px,6vw,80px)] font-light leading-[1.02] tracking-[-0.04em]">
        {title}
      </h2>
      {lede && (
        <p className="mx-auto mt-6 max-w-[44ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-muted">{lede}</p>
      )}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href={primary.href} variant="primary">
          {primary.label}
        </Button>
        {secondary && (
          <Button href={secondary.href} variant="ghost">
            {secondary.label}
          </Button>
        )}
      </div>
      {note && <p className="mt-5 text-[14px] text-muted">{note}</p>}
    </section>
  );
}
