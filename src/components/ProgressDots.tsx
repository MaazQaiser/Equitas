"use client";

export function ProgressDots({ step }: { step: 1 | 2 | 3 }) {
  const words = ["one", "two", "three"];
  return (
    <div className="mb-8">
      <p className="text-[12px] font-normal uppercase tracking-[0.14em] text-gold-text">
        Step {words[step - 1]} of three
      </p>
      <ol className="mt-3 m-0 flex list-none gap-2 p-0" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <li
            key={n}
            className={`block h-2.5 w-2.5 rounded-full ${
              n <= step ? "bg-gold" : "border-[1.5px] border-line-2 bg-transparent"
            }`}
          />
        ))}
      </ol>
    </div>
  );
}
