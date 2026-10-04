import { JourneyStrip } from "@/components/JourneyStrip";
import { WRAP } from "@/lib/ui";

export function DeepIntro({ current }: { current?: string }) {
  return (
    <div className="border-b border-line bg-bg-2">
      <div className={`${WRAP} py-7`}>
        <p className="mb-5 max-w-[62ch] text-[15px] leading-[1.55] text-muted">
          EQUITAS shows how reviewers read an application. This page is part of that journey. You do
          not need to have seen the homepage first.
        </p>
        <JourneyStrip current={current} />
      </div>
    </div>
  );
}
