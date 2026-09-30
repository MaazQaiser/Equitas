"use client";

import { useEffect } from "react";

function jumpToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  document.getElementById(id)?.scrollIntoView();
}

export function HashScroll() {
  useEffect(() => {
    jumpToHash();
    window.addEventListener("hashchange", jumpToHash);
    return () => window.removeEventListener("hashchange", jumpToHash);
  }, []);

  return null;
}
