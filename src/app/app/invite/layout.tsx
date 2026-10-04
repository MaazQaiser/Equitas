import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invitation | EQUITAS Intelligence",
  description: "Accept an institutional invitation. You will not see pricing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
