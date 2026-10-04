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
        eyebrow="Mentorship, not just a score"
        title="Ten lenses you can be coached through."
        lede="EQUITAS shows how different readers in the funding system see an application. Mentor Chat, where you talk to these perspectives, is still being built."
      />
      <p className="mt-6">
        <StatusBadge status="Coming" />
      </p>
      <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {lenses.map((item) => (
          <li key={item.name} className="rounded-2xl bg-surface p-6 shadow-card">
            <p className="text-[17px] leading-[1.35] tracking-[-0.02em]">{item.name}</p>
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
