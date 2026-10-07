import { ExampleTag } from "@/components/PageHero";
import {
  SAMPLE_CONCERN,
  SAMPLE_EXCERPT,
  SAMPLE_NOTICE,
  SAMPLE_STRENGTHEN,
} from "@/lib/sampleReview";

const PARTS = [
  { label: "Your application", body: SAMPLE_EXCERPT },
  { label: "Reviewer perspective", body: SAMPLE_CONCERN },
  { label: "What to notice", body: SAMPLE_NOTICE },
  { label: "What to strengthen", body: SAMPLE_STRENGTHEN },
];

export function ReviewLens() {
  return (
    <figure className="m-0 rounded-2xl bg-surface p-6 text-ink shadow-card sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold-text">
          Sample review
        </p>
        <ExampleTag>Illustrative</ExampleTag>
      </div>
      <ol className="m-0 mt-5 flex list-none flex-col gap-4 p-0">
        {PARTS.map((part, i) => (
          <li key={part.label} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold-text">
              {`0${i + 1}`} · {part.label}
            </p>
            <p className="mt-2 text-[15px] leading-[1.5] tracking-[-0.015em]">{part.body}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 border-t border-line pt-4 text-[13px] leading-[1.5] text-muted">
        Build the judgment to notice this in your next application. Fictional proposal. Not a live
        score.
      </figcaption>
    </figure>
  );
}
