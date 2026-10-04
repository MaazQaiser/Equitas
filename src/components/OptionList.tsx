"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export function OptionList({
  name,
  options,
  nextHref,
  skipHref,
  selectedId,
  onChoose,
  onSkip,
}: {
  name: string;
  options: readonly { id: string; label: string }[];
  nextHref: string;
  skipHref: string;
  selectedId?: string;
  onChoose: (id: string) => void;
  onSkip?: () => void;
}) {
  const router = useRouter();

  function choose(id: string) {
    onChoose(id);
    router.push(nextHref);
  }

  function skip() {
    onSkip?.();
    router.push(skipHref);
  }

  return (
    <div>
      <div role="radiogroup" aria-label={name} className="mt-10 flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={option.id === selectedId}
            onClick={() => choose(option.id)}
            className={`min-h-11 rounded-2xl bg-surface px-5 py-4 text-left text-[16px] leading-[1.4] shadow-card ring-1 hover:ring-gold ${
              option.id === selectedId ? "ring-gold" : "ring-transparent"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="mt-8">
        <Button type="button" variant="ghost" onClick={skip}>
          Skip this question
        </Button>
      </p>
    </div>
  );
}
