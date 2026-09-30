const ROWS = [
  { area: "Early-career faculty", inProgress: "8", needSupport: "5", submitted: "2" },
  { area: "Established investigators", inProgress: "11", needSupport: "3", submitted: "6" },
  { area: "Trainee fellowships", inProgress: "14", needSupport: "7", submitted: "4" },
];

export function TrackingView({ band = false }: { band?: boolean }) {
  return (
    <figure className="m-0 text-ink">
      <div className="overflow-x-auto rounded-2xl bg-surface shadow-card">
        <div className="border-b border-line px-6 py-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold-text">
            Department view
          </p>
          <p className="mt-2 text-[18px] font-medium tracking-[-0.02em]">Faculty grant activity</p>
          <p className="mt-1 text-[14px] text-muted">This cycle. Tracking only.</p>
        </div>
        <table className="w-full border-collapse text-left text-[14px]">
          <caption className="sr-only">Example tracking table. Not a live institution.</caption>
          <thead>
            <tr className="border-b border-line bg-bg-2">
              <th scope="col" className="px-6 py-3 font-medium">
                Group
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                In progress
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Need support
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.area} className="border-b border-line last:border-b-0">
                <th scope="row" className="px-6 py-3.5 font-medium">
                  {row.area}
                </th>
                <td className="px-4 py-3.5 text-muted">{row.inProgress}</td>
                <td className="px-4 py-3.5 text-muted">{row.needSupport}</td>
                <td className="px-6 py-3.5 text-muted">{row.submitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className={`mt-3 text-[13px] ${band ? "text-band-muted" : "text-muted"}`}>
        An illustration of tracking. Not a live institution, and not a forecast.
      </figcaption>
    </figure>
  );
}
