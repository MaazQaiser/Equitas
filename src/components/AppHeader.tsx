"use client";

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { audienceKey } from "@/lib/content";
import { FUNDERS } from "@/lib/onboarding";
import { useSession } from "@/lib/useSession";

export function AppHeader({
  current = "home",
}: {
  current?: "home" | "journey" | "tools" | "saved" | "seats" | "chair" | "help";
}) {
  const { session } = useSession();
  const id = session.funder;
  const label = FUNDERS.find((item) => item.id === id)?.label;
  const funder = label && id !== "unsure" ? (id === "nih" || id === "nsf" ? label : label.split(" (")[0]) : "NIH";
  const office = audienceKey(session.audience) === "grants_manager" || audienceKey(session.audience) === "institution";

  const links = [
    { href: "/app", label: "Home", key: "home" as const },
    { href: "/journey", label: "My journey", key: "journey" as const },
    { href: "/app/tool", label: "Tools", key: "tools" as const },
    { href: "/app/saved", label: "Saved", key: "saved" as const },
    ...(office
      ? [
          { href: "/app/seats", label: "Seats", key: "seats" as const },
          { href: "/app/chair", label: "Pipeline", key: "chair" as const },
        ]
      : []),
    { href: "/resources/guides", label: "Help", key: "help" as const },
  ];

  return (
    <header className="border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-8 gap-y-3 px-6 py-3.5 md:px-10">
        <Logo href="/app" />
        <nav aria-label="App" className="flex flex-wrap items-center gap-5 text-[14px] sm:gap-6">
          {links.map((item) => {
            const on = current === item.key;
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
        <p className="ml-auto text-[13px] text-muted">
          {session.invited ? "Institution · " : ""}
          {funder} · English
        </p>
      </div>
    </header>
  );
}
