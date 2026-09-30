"use client";

import { AuthLayout } from "@/components/AuthLayout";
import { OptionList } from "@/components/OptionList";
import { ProgressDots } from "@/components/ProgressDots";
import { FUNDERS } from "@/lib/onboarding";
import { writeSession } from "@/lib/session";

export default function FunderPage() {
  return (
    <AuthLayout>
      <ProgressDots step={2} />
      <h1 className="max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Which funder are you working with?
      </h1>
      <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-muted">
        We will set everything to that funder&rsquo;s review conventions.
      </p>
      <OptionList
        name="Which funder are you working with?"
        options={FUNDERS}
        nextHref="/onboarding/need"
        skipHref="/onboarding/need"
        onChoose={(id) => writeSession({ funder: id === "unsure" ? undefined : id })}
        onSkip={() => writeSession({ funder: undefined })}
      />
    </AuthLayout>
  );
}
