import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex flex-shrink-0 items-center gap-3 no-underline ${
        dark ? "text-band-ink" : "text-ink"
      }`}
    >
      <span
        aria-hidden="true"
        className="flex h-[34px] w-[34px] flex-shrink-0 flex-col justify-center gap-[3px] rounded-full border-[1.5px] border-gold px-[6px] py-2"
      >
        <i className="block h-[3px] w-full rounded-sm bg-gold" />
        <i className="block h-[3px] w-full rounded-sm bg-gold" />
        <i className="block h-[3px] w-full rounded-sm bg-gold" />
      </span>
      <span>
        <span className="font-wordmark block text-[18px] font-semibold leading-[1.1] tracking-[0.11em]">
          EQUITAS
        </span>
        <span
          className={`mt-0.5 block text-[8px] font-bold tracking-[0.28em] ${
            dark ? "text-gold-on-band" : "text-gold-text"
          }`}
        >
          INTELLIGENCE
        </span>
      </span>
    </Link>
  );
}
