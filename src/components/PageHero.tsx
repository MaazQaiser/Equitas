import type { CSSProperties, ReactNode } from "react";
import { EYEBROW, EYEBROW_BAND, WRAP } from "@/lib/ui";

type Tone = "cream" | "sand" | "band";

const enterDelay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

const TONE: Record<Tone, string> = {
  cream: "",
  sand: "bg-bg-2",
  band: "bg-band text-band-ink",
};

export function PageHero({
  eyebrow,
  title,
  lede,
  actions,
  note,
  visual,
  tone = "cream",
  before,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  note?: ReactNode;
  visual?: ReactNode;
  tone?: Tone;
  before?: ReactNode;
}) {
  const onBand = tone === "band";
  return (
    <section className={`relative overflow-x-clip ${TONE[tone]}`}>
      <div
        className={`${WRAP} grid items-center gap-12 py-[clamp(56px,8vw,112px)] ${
          visual ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16" : ""
        }`}
      >
        <div className="relative z-10 min-w-0">
          {before}
          <p className={`mb-6 ${onBand ? EYEBROW_BAND : EYEBROW}`}>{eyebrow}</p>
          {/* Not animated: the heading is the LCP element. */}
          <h1 className="max-w-[17ch] text-[clamp(40px,5vw,66px)] font-light leading-[1.04] tracking-[-0.045em]">
            {title}
          </h1>
          {lede && (
            <div
              className={`enter mt-6 flex max-w-[48ch] flex-col gap-3 text-[clamp(17px,1.6vw,19px)] leading-[1.55] tracking-[-0.015em] ${
                onBand ? "text-band-muted" : "text-muted"
              }`}
              style={enterDelay(80)}
            >
              {lede}
            </div>
          )}
          {actions && (
            <div className="enter mt-9 flex flex-wrap items-center gap-3" style={enterDelay(140)}>
              {actions}
            </div>
          )}
          {note && (
            <p
              className={`enter mt-5 text-[14px] tracking-[-0.01em] ${onBand ? "text-band-muted" : "text-muted"}`}
              style={enterDelay(190)}
            >
              {note}
            </p>
          )}
        </div>
        {visual && (
          <div className="enter relative min-w-0" style={enterDelay(220)}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  band = false,
  center = false,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  band?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      {eyebrow && <p className={`mb-5 ${band ? EYEBROW_BAND : EYEBROW}`}>{eyebrow}</p>}
      <h2
        className={`max-w-[18ch] text-[clamp(34px,4.4vw,56px)] font-light leading-[1.04] tracking-[-0.035em] ${
          center ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-6 max-w-[52ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] tracking-[-0.015em] ${
            band ? "text-band-muted" : "text-muted"
          } ${center ? "mx-auto" : ""}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function ExampleTag({ children = "Example", band = false }: { children?: ReactNode; band?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em] ${
        band ? "bg-band-2 text-gold-on-band" : "bg-bg-2 text-gold-text"
      }`}
    >
      {children}
    </span>
  );
}
