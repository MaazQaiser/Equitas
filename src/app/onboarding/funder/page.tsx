"use client";

import { AuthLayout } from "@/components/AuthLayout";
import { OptionList } from "@/components/OptionList";
import { ProgressDots } from "@/components/ProgressDots";
import { FUNDERS } from "@/lib/onboarding";
import { writeSession } from "@/lib/session";
import { useSession } from "@/lib/useSession";

export default function FunderPage() {
  const need = useSession().session.need;
  const next = need ? "/onboarding/start" : "/onboarding/need";

  return (
    <AuthLayout>
      <ProgressDots step={2} />
      <h1 className="max-w-[16ch] text-[clamp(32px,4.4vw,48px)] font-light leading-[1.08] tracking-[-0.035em]">
        Which funder are you working with?
      </h1>
      <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-muted">
        We will set everything to that funder&rsquo;s review conventions.
      </p>
      {need && (
        <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.5] text-muted">
          We already know what you need help with from how you arrived. We will not ask that again.
        </p>
      )}
      <OptionList
        name="Which funder are you working with?"
        options={FUNDERS}
        nextHref={next}
        skipHref={next}
        onChoose={(id) => writeSession({ funder: id === "unsure" ? undefined : id })}
        onSkip={() => writeSession({ funder: undefined })}
      />
    </AuthLayout>
  );
}
