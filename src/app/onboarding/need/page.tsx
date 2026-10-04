"use client";

import { AuthLayout } from "@/components/AuthLayout";
import { OptionList } from "@/components/OptionList";
import { ProgressDots } from "@/components/ProgressDots";
import { NEEDS } from "@/lib/onboarding";
import { writeSession } from "@/lib/session";
import { useSession } from "@/lib/useSession";

export default function NeedPage() {
  const selected = useSession().session.need;
  const selectedLabel = NEEDS.find((item) => item.id === selected)?.label;

  return (
    <AuthLayout>
      <ProgressDots step={3} />
      <h1 className="max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        What do you need help with right now?
      </h1>
      <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-muted">
        This picks where on the journey you start.
      </p>
      {selectedLabel && (
        <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.5] text-muted">
          Filled from your search: {selectedLabel}. Choose it again to confirm, or pick something else.
        </p>
      )}
      <OptionList
        name="What do you need help with right now?"
        options={NEEDS}
        selectedId={selected}
        nextHref="/onboarding/start"
        skipHref="/onboarding/start"
        onChoose={(id) => writeSession({ need: id })}
        onSkip={() => writeSession({ need: selected })}
      />
    </AuthLayout>
  );
}
