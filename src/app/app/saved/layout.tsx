import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved work | EQUITAS Intelligence",
  description: "Come back to reviews you already ran. Saved in this browser for this session.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
