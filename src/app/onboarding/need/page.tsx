"use client";

import { AuthLayout } from "@/components/AuthLayout";
import { OptionList } from "@/components/OptionList";
import { ProgressDots } from "@/components/ProgressDots";
import { NEEDS } from "@/lib/onboarding";
import { writeSession } from "@/lib/session";

export default function NeedPage() {
  return (
    <AuthLayout>
      <ProgressDots step={3} />
      <h1 className="max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        What do you need help with right now?
      </h1>
      <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-muted">
        This picks where on the journey you start.
      </p>
      <OptionList
        name="What do you need help with right now?"
        options={NEEDS}
        nextHref="/onboarding/start"
        skipHref="/onboarding/start"
        onChoose={(id) => writeSession({ need: id })}
        onSkip={() => writeSession({ need: undefined })}
      />
    </AuthLayout>
  );
}
