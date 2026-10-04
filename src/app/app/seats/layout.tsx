import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seats | EQUITAS Intelligence",
  description: "Invite faculty by email. Invited researchers do not see pricing.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
