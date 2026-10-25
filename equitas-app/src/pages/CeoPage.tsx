import { reviewEquity, useSession } from "../lib/session";
import { Button, Card, Honesty, Page } from "../components/ui";

export function CeoPage() {
  const { equityRequests, waitlist } = useSession();

  return (
    <Page
      title="CEO Dashboard"
      lede="Operations at a glance. Numbers on this page are examples until live data is connected."
    >
      <Honesty>Demo data · founder only</Honesty>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">Prediction / business</h2>
          <p className="mt-2 font-display text-[28px]">62%</p>
          <p className="text-[13px] text-muted">Sample calibration hit rate</p>
        </Card>
        <Card>
          <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">GAGA metrics</h2>
          <p className="mt-2 font-display text-[28px]">1,204</p>
          <p className="text-[13px] text-muted">Sample analysis runs</p>
        </Card>
        <Card>
          <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-muted">GLIL / upload health</h2>
          <p className="mt-2 font-display text-[28px]">98.1%</p>
          <p className="text-[13px] text-muted">Successful de-id passes</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-[22px]">Social proof / flags / outcomes</h2>
          <ul className="mt-3 space-y-2 text-[14px] text-muted">
            <li>Flag: summary statement OCR failed · 2 open</li>
            <li>Outcome sample: A1 funded after gap pass · anonymized</li>
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-[22px]">LMIC Equity Access review</h2>
          <ul className="mt-3 space-y-3">
            {equityRequests.length === 0 ? (
              <li className="text-[14px] text-muted">No pending requests.</li>
            ) : (
              equityRequests.map((e) => (
                <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2 text-[14px]">
                  <span>
                    {e.email} · {e.country} · {e.status.charAt(0).toUpperCase() + e.status.slice(1)}
                  </span>
                  {e.status === "pending" ? (
                    <span className="flex gap-2">
                      <Button onClick={() => reviewEquity(e.id, "approved")}>Approve</Button>
                      <Button variant="ghost" onClick={() => reviewEquity(e.id, "rejected")}>
                        Reject
                      </Button>
                    </span>
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-[22px]">Perspectives editor</h2>
          <p className="mt-2 text-[14px] text-muted">Edit how each of the ten reviewer perspectives responds. Not connected yet.</p>
        </Card>
        <Card>
          <h2 className="font-display text-[22px]">Calibration records</h2>
          <p className="mt-2 text-[14px] text-muted">The library of reviewer-calibrated examples. Not connected yet.</p>
        </Card>
        <Card>
          <h2 className="font-display text-[22px]">Mentor Chat / voice / usage</h2>
          <p className="mt-2 text-[14px] text-muted">Example: 812 conversations · 14 voice sessions · 3 people near their monthly limit</p>
        </Card>
        <Card>
          <h2 className="font-display text-[22px]">Calibration KV / Waitlist</h2>
          <ul className="mt-3 max-h-40 space-y-2 overflow-y-auto text-[13px] text-muted">
            {waitlist.length === 0 ? (
              <li>Waitlist empty.</li>
            ) : (
              waitlist.map((w) => (
                <li key={w.id}>
                  {w.role} · {w.email} · {w.at.slice(0, 10)}
                </li>
              ))
            )}
          </ul>
        </Card>
      </div>
    </Page>
  );
}
