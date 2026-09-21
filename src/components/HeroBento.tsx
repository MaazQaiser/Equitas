"use client";

import { useEffect, useRef, useState } from "react";

const CRITERIA: { name: string; value: number; width: number }[] = [
  { name: "Significance", value: 3, width: 78 },
  { name: "Investigator", value: 2, width: 90 },
  { name: "Innovation", value: 5, width: 48 },
  { name: "Approach", value: 6, width: 36 },
  { name: "Environment", value: 2, width: 86 },
];

const PARAS = [
  "Aim 1 tests whether a brief check-in after discharge lowers readmission among adults leaving the ward.",
  "Aim 2 follows 240 patients for 30 days. The outcome is readmission. The power calculation assumes an effect size larger than the pilot supports.",
  "The sample is named. The site is named. The assumption the calculation depends on is left unnamed.",
  "Reviewers can see that gap before the discussion begins. The score moves when the assumption is stated in the aim.",
  "State the assumption next to the effect size the pilot actually supports.",
];

const FEEDBACK =
  "The power calculation in Aim 2 assumes an effect size the pilot doesn’t support.";

const REVIEWERS = ["/hero/reviewer-1.jpg", "/hero/reviewer-2.jpg", "/hero/reviewer-3.jpg"];

const WORDS = PARAS.flatMap((para, pi) => para.split(" ").map((word, wi) => ({ word, key: `${pi}-${wi}` })));

const WORD_MS = 190;
const HOLD_PAPER_MS = 700;
const HOLD_REPORT_MS = 4600;

export function HeroBento() {
  const textRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [phase, setPhase] = useState<"paper" | "report">("paper");
  const [lit, setLit] = useState(0);
  const [bar, setBar] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setPhase("report");
      return;
    }

    let cancelled = false;
    let timer = 0;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    async function loop() {
      while (!cancelled) {
        setPhase("paper");
        setLit(0);
        await wait(420);
        for (let i = 1; i <= WORDS.length; i += 1) {
          if (cancelled) return;
          setLit(i);
          await wait(WORD_MS);
        }
        if (cancelled) return;
        await wait(HOLD_PAPER_MS);
        setPhase("report");
        await wait(HOLD_REPORT_MS);
      }
    }

    loop();

    const onChange = () => {
      if (!mq.matches) return;
      cancelled = true;
      window.clearTimeout(timer);
      setPhase("report");
    };
    mq.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    const el = wordRefs.current[lit - 1];
    if (!el || lit === 0) return;
    const lineTop = el.offsetTop;
    const line = wordRefs.current.filter(
      (node): node is HTMLSpanElement => node !== null && Math.abs(node.offsetTop - lineTop) < 3,
    );
    const first = line[0];
    const last = line[line.length - 1];
    if (!first || !last) return;
    setBar({
      top: el.offsetTop + el.offsetHeight - 1,
      left: first.offsetLeft,
      width: last.offsetLeft + last.offsetWidth - first.offsetLeft,
    });
  }, [lit]);

  let seen = 0;

  return (
    <article className="font-outfit mt-10 w-full rounded-2xl bg-surface p-5 shadow-card sm:p-6 lg:mt-0 lg:w-[min(48%,440px)] lg:shrink-0">
      <div className="hero-swap" data-phase={phase}>
        <div className="hero-paper" aria-hidden="true">
          <p className="text-[18px] font-medium leading-none tracking-[-0.03em]">Specific aims</p>
          <span className="mt-3 block h-px w-16 bg-gold" />
          <div ref={textRef} className="relative mt-4">
            {PARAS.map((para, pi) => {
              const parts = para.split(" ");
              const start = seen;
              seen += parts.length;
              return (
                <p key={para} className="mt-3 text-[14.5px] leading-[1.65] tracking-[-0.01em] first:mt-0">
                  {parts.map((word, wi) => {
                    const index = start + wi;
                    const current = index === lit - 1;
                    return (
                      <span
                        key={`${pi}-${wi}`}
                        ref={(node) => {
                          wordRefs.current[index] = node;
                        }}
                        className="scan-word"
                        style={{
                          backgroundColor: current ? "rgb(179 153 82 / 0.45)" : "transparent",
                        }}
                      >
                        {word}{" "}
                      </span>
                    );
                  })}
                </p>
              );
            })}
            <span
              className="scan-bar"
              style={{
                top: bar.top,
                left: bar.left,
                width: bar.width,
                opacity: phase === "paper" && lit > 0 ? 1 : 0,
              }}
            />
          </div>
        </div>

        <div className="hero-report">
          <p className="text-[18px] font-medium leading-none tracking-[-0.03em]">Review report</p>

          <ul className="mt-4 flex flex-col gap-3">
            {CRITERIA.map((c) => (
              <li key={c.name} className="grid grid-cols-[108px_1fr_1.5rem] items-center gap-3">
                <span className="text-[14px] tracking-[-0.01em]">{c.name}</span>
                <span className="h-2 overflow-hidden rounded-full bg-bg-2">
                  <span className="block h-full rounded-full bg-gold" style={{ width: `${c.width}%` }} />
                </span>
                <span className="text-right text-[16px] tabular-nums">{c.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[12px] text-muted">Lower is stronger.</p>

          <p className="mt-5 border-t border-line pt-4 text-[14.5px] leading-[1.5] tracking-[-0.02em]">
            “{FEEDBACK}”
          </p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex" aria-hidden="true">
              {REVIEWERS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-surface"
                  style={{ marginLeft: i === 0 ? 0 : -8 }}
                />
              ))}
            </div>
            <p className="text-[13px] text-muted">3 reviewers</p>
          </div>
        </div>
      </div>
    </article>
  );
}
