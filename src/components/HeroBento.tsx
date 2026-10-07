"use client";

import { useEffect, useRef, useState } from "react";
import { ScoreBars } from "@/components/Previews";
import { SAMPLE_CONCERN } from "@/lib/sampleReview";

const PARAS = [
  "Aim 1 tests whether a brief check-in after discharge lowers readmission among adults leaving the ward.",
  "Aim 2 follows 240 patients for 30 days. The outcome is readmission. The power calculation assumes an effect size larger than the pilot supports.",
  "The sample is named. The site is named. The assumption the calculation depends on is left unnamed.",
  "A reviewer can see that gap before a discussion begins. The concern sits under Factor 2, Rigor and Feasibility.",
  "State the assumption next to the effect size the pilot actually supports.",
];

const WORDS = PARAS.flatMap((para, pi) => para.split(" ").map((word, wi) => ({ word, key: `${pi}-${wi}` })));

const PARA_START = PARAS.map((_, pi) =>
  PARAS.slice(0, pi).reduce((sum, para) => sum + para.split(" ").length, 0),
);

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
    if (mq.matches) return;

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

  return (
    <article className="font-outfit mt-10 w-full rounded-2xl bg-surface p-5 shadow-card sm:p-6 lg:mt-0 lg:w-[min(48%,440px)] lg:shrink-0">
      <div className="hero-swap" data-phase={phase}>
        <div className="hero-paper" aria-hidden="true">
          <p className="text-[18px] font-medium leading-none tracking-[-0.03em]">Specific aims</p>
          <span className="mt-3 block h-px w-16 bg-gold" />
          <div ref={textRef} className="relative mt-4">
            {PARAS.map((para, pi) => {
              const parts = para.split(" ");
              const start = PARA_START[pi];
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
          <div className="mt-4">
            <ScoreBars />
          </div>
          <p className="mt-5 border-t border-line pt-4 text-[14.5px] leading-[1.5] tracking-[-0.02em]">
            “{SAMPLE_CONCERN}”
          </p>
        </div>
      </div>
    </article>
  );
}
