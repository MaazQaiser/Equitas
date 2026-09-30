import { Logo } from "@/components/Logo";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthLayout({
  children,
  aside,
  wide = false,
  card = false,
}: {
  children: ReactNode;
  aside?: ReactNode;
  wide?: boolean;
  card?: boolean;
}) {
  const width = wide ? "max-w-[1180px]" : "max-w-[720px]";
  if (card) {
    return (
      <div className="flex min-h-full flex-col">
        <header className="border-b border-line/80 bg-bg/85">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3.5 md:px-10">
            <Logo />
            {aside}
          </div>
        </header>
        <main id="main" className="flex w-full flex-1 justify-center px-4 py-[clamp(40px,7vw,88px)] sm:px-6">
          <div className="w-full max-w-[520px] rounded-2xl bg-surface p-7 shadow-card sm:p-10">{children}</div>
        </main>
      </div>
    );
  }
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-line/80 bg-bg/85">
        <div className={`mx-auto flex ${width} items-center justify-between px-6 py-3.5 md:px-10`}>
          <Logo />
          {aside}
        </div>
      </header>
      <main id="main" className={`mx-auto w-full ${width} flex-1 px-6 py-[clamp(48px,8vw,96px)] md:px-10`}>
        {children}
      </main>
    </div>
  );
}

export function AuthAside({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-[14px] no-underline hover:text-muted">
      {label}
    </Link>
  );
}
