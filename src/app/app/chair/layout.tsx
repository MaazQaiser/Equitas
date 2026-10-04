import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pipeline | EQUITAS Intelligence",
  description: "Faculty grant activity and where support is needed. Tracking, not forecasting.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
