import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "If a limit applied | EQUITAS Intelligence",
  description: "The limit message names the work you were doing. You keep what you have already done.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
