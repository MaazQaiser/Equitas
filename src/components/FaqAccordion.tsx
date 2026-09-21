"use client";

import { useState } from "react";
import { FAQ } from "@/lib/content";

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-line">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-[clamp(18px,2vw,22px)] tracking-[-0.02em]"
            >
              <span>{f.q}</span>
              <span aria-hidden="true" className="shrink-0 text-[20px] leading-none text-gold-text">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div id={`faq-${i}`} hidden={!isOpen} className="max-w-[66ch] pb-6 text-[16px] leading-[1.6] text-muted">
              {f.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
