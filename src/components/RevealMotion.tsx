"use client";

import { useEffect } from "react";

// Installs the scroll-reveal behaviour for every [data-reveal] element.
//
// Order matters here. The .js-reveal class (which is what actually hides
// anything) goes on only after the observer exists and after everything
// already on screen has been marked done. So a viewer whose JS never
// arrives, or who asked for reduced motion, sees the full page rather
// than a blank one.
export function RevealMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    for (const el of targets) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("reveal-done");
      }
    }

    document.documentElement.classList.add("js-reveal");

    const pending = () =>
      targets.filter((el) => !el.classList.contains("reveal-done") && !el.classList.contains("is-visible"));

    const show = (el: HTMLElement) => {
      el.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    for (const el of pending()) observer.observe(el);

    // Sticky columns can sit in view without a fresh intersection
    // callback. A scroll check keeps that text from staying blank.
    let frame = 0;
    const scan = () => {
      frame = 0;
      for (const el of pending()) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight * 0.92) show(el);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(scan);
    };

    scan();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("hashchange", onScroll);
    const settle = window.setTimeout(scan, 400);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onScroll);
      window.clearTimeout(settle);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("js-reveal");
    };
  }, []);

  return null;
}
