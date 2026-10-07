import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { SectionHead } from "@/components/PageHero";
import { PERSPECTIVES } from "@/lib/content";
import { SECTION, WRAP } from "@/lib/ui";

export function Perspectives({
  id = "perspectives",
}: {
  id?: string;
}) {
  const lenses = PERSPECTIVES.filter((item) => item.kind === "lens");
  const guide = PERSPECTIVES.find((item) => item.kind === "guide");

  return (
    <section id={id} className={`scroll-mt-24 ${WRAP} ${SECTION}`}>
      <SectionHead
        eyebrow="Simulated professional lenses"
        title="Nine ways a draft can be read. Not officials, and not a chat yet."
        lede="Each lens is a structured professional read: what it contributes, when it is useful, and where it stops. Mentor Chat, where you talk to these perspectives, is still being built. These are not actual reviewers, endorsement, or access to confidential deliberations."
      />
      <p className="mt-6">
        <StatusBadge status="Coming" />
        <span className="ml-3 text-[14px] text-muted">Mentor Chat</span>
      </p>
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 lg:grid-cols-3">
        {lenses.map((item) => (
          <li key={item.name} className="flex flex-col rounded-2xl bg-surface p-6 shadow-card">
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-gold-text">{item.group}</p>
            <p className="mt-2 text-[17px] leading-[1.35] tracking-[-0.02em]">{item.name}</p>
            <p className="mt-3 text-[14px] leading-[1.5] text-muted">{item.useful}</p>
            <p className="mt-3 text-[13px] leading-[1.45] text-muted">{item.limit}</p>
          </li>
        ))}
      </ul>
      {guide && (
        <Link
          href="/resources/how-grant-review-works"
          className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-band p-6 text-band-ink no-underline shadow-card sm:p-7"
        >
          <span>
            <span className="block text-[12px] uppercase tracking-[0.14em] text-gold-on-band">Available now</span>
            <span className="mt-2 block text-[19px] leading-[1.3] tracking-[-0.02em]">{guide.name}</span>
          </span>
          <span className="shrink-0 text-[15px] text-gold-on-band">Read the guide →</span>
        </Link>
      )}
    </section>
  );
}
