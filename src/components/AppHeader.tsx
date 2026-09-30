"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { FUNDERS } from "@/lib/onboarding";
import { useSession } from "@/lib/useSession";

const LINKS = [
  { href: "/app", label: "Home" },
  { href: "/journey", label: "My journey" },
  { href: "/app", label: "Tools" },
  { href: "/resources/guides", label: "Help" },
];

export function AppHeader({ current = "home" }: { current?: "home" | "journey" | "tools" | "help" }) {
  const id = useSession().session.funder;
  const label = FUNDERS.find((item) => item.id === id)?.label;
  const funder = label && id !== "unsure" ? (id === "nih" || id === "nsf" ? label : label.split(" (")[0]) : "NIH";

  return (
    <header className="border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3.5 md:px-10">
        <Logo href="/app" />
        <nav aria-label="App" className="flex flex-wrap items-center gap-5 text-[14px] sm:gap-6">
          {LINKS.map((item) => {
            const key = item.label === "Home" ? "home" : item.label === "My journey" ? "journey" : item.label === "Tools" ? "tools" : "help";
            const on = current === key;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={on ? "page" : undefined}
                className={`border-b py-1 no-underline ${
                  on ? "border-gold" : "border-transparent hover:border-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <p className="ml-auto text-[13px] text-muted">{funder} · English</p>
      </div>
    </header>
  );
}
