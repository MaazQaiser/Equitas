import type { CSSProperties } from "react";
import { MODULES } from "@/lib/content";

function Row({
  items,
  direction,
  duration,
  label,
  tone = "band",
}: {
  items: string[];
  direction?: "reverse";
  duration: string;
  label: string;
  tone?: "band" | "page";
}) {
  const chip =
    tone === "page"
      ? "whitespace-nowrap rounded-[12px] bg-surface px-5 py-3 text-[15.5px] text-ink shadow-card"
      : "whitespace-nowrap rounded-[12px] bg-band-2 px-5 py-3 text-[15.5px] text-band-ink";

  const track = (
    <ul className="m-0 flex list-none items-center gap-3 p-0 pr-3">
      {items.map((item) => (
        <li key={item} className={chip}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="marquee"
      style={{ "--marquee-duration": duration } as CSSProperties}
    >
      <div className="marquee-track" data-direction={direction}>
        {/* The visible copy carries the accessible list. */}
        <div aria-label={label} role="group">
          {track}
        </div>
        {/* The duplicate only exists to make the loop seamless, so it is
            hidden from assistive tech and removed under reduced motion. */}
        <div aria-hidden="true">{track}</div>
      </div>
    </div>
  );
}

const TOOL_NAMES = MODULES.filter((m) => m.stage !== null).map((m) => m.name);

export function CapabilityRows() {
  const mid = Math.ceil(TOOL_NAMES.length / 2);
  return (
    <div className="flex flex-col gap-3">
      <Row items={TOOL_NAMES.slice(0, mid)} duration="46s" label="Tools" tone="page" />
      <Row
        items={TOOL_NAMES.slice(mid)}
        direction="reverse"
        duration="54s"
        label="More tools"
        tone="page"
      />
    </div>
  );
}
