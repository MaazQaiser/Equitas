import { FUNDER_GROUPS, FUNDER_LEAD } from "@/lib/content";

export function FunderList({ band = false }: { band?: boolean }) {
  return (
    <div>
      <p className={`mb-4 text-[14px] ${band ? "text-band-muted" : "text-muted"}`}>{FUNDER_LEAD}</p>
      <dl className="m-0 grid gap-3">
        {FUNDER_GROUPS.map((f) => (
          <div key={f.group} className={`rounded-2xl px-6 py-5 ${band ? "bg-band-2" : "bg-bg-2"}`}>
            <dt
              className={`text-[12px] uppercase tracking-[0.14em] ${
                band ? "text-gold-on-band" : "text-gold-text"
              }`}
            >
              {f.group}
            </dt>
            <dd className="m-0 mt-2 text-[16px] leading-[1.5]">{f.names}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
