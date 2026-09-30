"use client";

import { AuthLayout } from "@/components/AuthLayout";
import { OptionList } from "@/components/OptionList";
import { ProgressDots } from "@/components/ProgressDots";
import { AUDIENCE } from "@/lib/onboarding";
import { writeSession } from "@/lib/session";

export default function AudiencePage() {
  return (
    <AuthLayout>
      <ProgressDots step={1} />
      <h1 className="max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Which best describes you?
      </h1>
      <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-muted">
        This decides which tools you see. You can change it later.
      </p>
      <OptionList
        name="Which best describes you?"
        options={AUDIENCE}
        nextHref="/onboarding/funder"
        skipHref="/onboarding/funder"
        onChoose={(id) => writeSession({ audience: id === "unsure" ? undefined : id })}
        onSkip={() => writeSession({ audience: undefined })}
      />
    </AuthLayout>
  );
}
