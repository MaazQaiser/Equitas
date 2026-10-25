import { Link } from "react-router-dom";
import { cloneElement, isValidElement, useId, type ReactElement, type ReactNode } from "react";
import type { Confidence } from "../lib/session";
import { marketingUrl } from "../lib/sites";

type Variant = "primary" | "ghost" | "danger" | "quiet";

const VARIANTS: Record<Variant, string> = {
  primary: "rounded-[8px] bg-band text-band-ink ring-1 ring-band-line hover:bg-band-2",
  ghost: "rounded-full bg-surface text-ink ring-1 ring-inset ring-line hover:ring-line-2",
  danger: "rounded-full bg-surface text-danger ring-1 ring-inset ring-danger/40 hover:ring-danger",
  quiet: "rounded-[8px] bg-transparent text-ink underline-offset-4 hover:underline",
};

export function Button({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  type = "button",
  disabled,
  className = "",
  ...rest
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  "aria-describedby"?: string;
}) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap px-5 text-[15px] font-normal no-underline transition-colors disabled:opacity-50 ${VARIANTS[variant]} ${className}`;
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}

export function Logo({ to, href }: { to?: string; href?: string }) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="flex h-[34px] w-[34px] flex-shrink-0 flex-col justify-center gap-[3px] rounded-full border-[1.5px] border-gold px-[6px] py-2"
      >
        <i className="block h-[3px] w-full bg-gold" />
        <i className="block h-[3px] w-full bg-gold" />
        <i className="block h-[3px] w-full bg-gold" />
      </span>
      <span>
        <span className="font-wordmark block text-[18px] font-semibold leading-[1.1] tracking-[0.11em]">EQUITAS</span>
        <span className="mt-0.5 block text-[8px] font-bold tracking-[0.28em] text-gold-text">INTELLIGENCE</span>
      </span>
    </>
  );
  const cls = "flex flex-shrink-0 items-center gap-3 text-ink no-underline";
  if (to)
    return (
      <Link to={to} className={cls} aria-label="EQUITAS Intelligence home">
        {inner}
      </Link>
    );
  return (
    <a href={href ?? marketingUrl("/")} className={cls} aria-label="EQUITAS Intelligence home">
      {inner}
    </a>
  );
}

const CARD_TONE = {
  default: "bg-surface shadow-card ring-1 ring-line",
  band: "bg-band text-band-ink shadow-card ring-1 ring-band-line",
  placeholder: "border border-dashed border-line-2 bg-transparent",
} as const;

export function Card({
  children,
  className = "",
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof CARD_TONE;
}) {
  return <div className={`rounded-[16px] p-5 md:p-6 ${CARD_TONE[tone]} ${className}`}>{children}</div>;
}

export function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: "gold" | "muted" | "danger" }) {
  const c =
    tone === "muted" ? "bg-bg-2 text-muted" : tone === "danger" ? "bg-danger/10 text-danger" : "bg-gold/15 text-gold-text";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] ${c}`}>
      {children}
    </span>
  );
}

export function ConfidenceBadge({ level, note }: { level: Confidence; note?: string }) {
  return (
    <div className="rounded-[12px] bg-bg-2 px-4 py-3">
      <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold-text">Confidence</p>
      <p className="mt-1 text-[15px] font-medium">{level}</p>
      {note ? <p className="mt-1 text-[13px] text-muted">{note}</p> : null}
    </div>
  );
}

export function Honesty({ children }: { children: ReactNode }) {
  return <Badge tone="muted">{children}</Badge>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-text">{children}</p>;
}

export function Page({
  title,
  lede,
  eyebrow,
  children,
  actions,
  narrow,
}: {
  title: string;
  lede?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  actions?: ReactNode;
  narrow?: boolean;
}) {
  return (
    <div className={`mx-auto w-full ${narrow ? "max-w-[560px]" : "max-w-[1180px]"} px-4 py-8 md:px-8 md:py-12`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow ? <div className="mb-3">{<Eyebrow>{eyebrow}</Eyebrow>}</div> : null}
          <h1 className="max-w-[22ch] text-[clamp(30px,4.4vw,46px)]">{title}</h1>
          {lede ? <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.55] text-muted">{lede}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}

/** Label + control + hint + error, wired with ids so errors are announced and tied to the input. */
export function Field({
  label,
  children,
  hint,
  error,
  optional,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  error?: string;
  optional?: boolean;
}) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-medium">
        {label}
        {optional ? <span className="ml-1 font-normal text-muted">(optional)</span> : null}
      </label>
      <div className="mt-1.5">{control}</div>
      {hint ? (
        <p id={hintId} className="mt-1.5 text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClass =
  "min-h-11 w-full rounded-[8px] border border-line-2 bg-surface px-3 py-2 text-[16px] aria-[invalid=true]:border-danger";

export function formatDate(iso: string) {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function daysUntil(iso: string) {
  const d = new Date(iso.length === 10 ? `${iso}T00:00:00` : iso).getTime();
  const days = Math.ceil((d - Date.now()) / 86400000);
  if (days < 0) return `${Math.abs(days)} days ago`;
  if (days === 0) return "today";
  if (days === 1) return "tomorrow";
  return `in ${days} days`;
}
