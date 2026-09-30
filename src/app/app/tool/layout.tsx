import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sample review | EQUITAS Intelligence",
  description:
    "A sample Study Section Simulator review, built on a made-up application: the draft, the scores, the discussion, and what to fix first.",
};

export default function ToolLayout({ children }: { children: ReactNode }) {
  return children;
}
