import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/Button";
import { HashScroll } from "@/components/HashScroll";
import { DeepIntro } from "@/components/DeepIntro";
import { PageHero, SectionHead } from "@/components/PageHero";
import { ScoreScale } from "@/components/Previews";
import { H2, SECTION, WRAP } from "@/lib/ui";
const BODY = "mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-muted";

const PATH = [
  "Submission",
  "Assignment",
  "Reviewers",
  "Preliminary scores",
  "The meeting",
  "Summary statement",
  "Council",
  "Decision",
];

const GLOSSARY: { term: string; meaning: string }[] = [
  {
    term: "Study section",
    meaning: "The NIH panel of working scientists that scores an application.",
  },
  {
    term: "Impact score",
    meaning:
      "The overall number from 10 to 90. It is the average of reviewer scores, multiplied by ten. Lower is better.",
  },
  {
    term: "Triage",
    meaning:
      "When an application is not discussed at the meeting because its preliminary scores put it in the lower half. You still get written comments.",
  },
  {
    term: "Assignment",
    meaning: "The step where your application is sent to a study section and to the reviewers who will read it.",
  },
  {
    term: "Preliminary scores",
    meaning: "Scores given before the meeting. They decide which applications are discussed.",
  },
  {
    term: "Summary statement",
    meaning: "The written feedback you receive after review. It includes scores and comments.",
  },
  {
    term: "Council",
    meaning: "The later NIH body that considers study section scores and makes funding recommendations.",
  },
  {
    term: "A1",
    meaning: "The one allowed resubmission of an application that was not funded.",
  },
  {
    term: "R-series",
    meaning: "NIH research project grants, including R01. Scored on three factors since January 2025.",
  },
  {
    term: "K award",
    meaning: "A career development award. Scored on five criteria.",
  },
  {
    term: "Fellowship",
    meaning: "Training awards such as F31 and F32, scored on five criteria.",
  },
  {
    term: "T award",
    meaning: "Institutional training grants such as T32, scored on five criteria.",
  },
];

export const metadata: Metadata = {
  title: "How grant review works | EQUITAS Intelligence",
  description:
    "Your application is decided in a room you will never enter. Here is what happens inside it: who reads it, where it goes, how the score is made, and what comes back.",
};

export default function HowGrantReviewWorksPage() {
  return (
    <>
      <SiteHeader current="learn" />
      <HashScroll />
      <main id="main">
        <DeepIntro current="review" />
        <PageHero
          eyebrow="Learn · How grant review works"
          title="Your application is decided in a room you will never enter."
          lede={
            <p>
              Here is what happens inside it: who reads it, where it goes, how the score is made, and
              what comes back to you.
            </p>
          }
          actions={
            <>
              <Button href="#path" variant="primary">
                Follow the path
              </Button>
              <Button href="#glossary" variant="ghost">
                Glossary
              </Button>
            </>
          }
          note="An 8 minute read. No account needed."
          visual={<ScoreScale />}
        />

        <section className={`${WRAP} ${SECTION}`}>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] lg:gap-16">
            <p
              aria-hidden="true"
              className="font-wordmark text-[clamp(140px,22vw,220px)] leading-none text-gold-text"
            >
              3
            </p>
            <div>
              <h2 className={`max-w-[16ch] ${H2}`}>Three people read your application properly.</h2>
              <p className={BODY}>
                They are working scientists with their own labs and their own deadlines. They read
                perhaps eight applications for one meeting, on top of a full job. They are not
                full-time reviewers.
              </p>
            </div>
          </div>
        </section>

        <section id="path" className="scroll-mt-24 bg-band text-band-ink">
          <div className={`${WRAP} ${SECTION}`}>
            <h2 className={`max-w-[16ch] ${H2}`}>The path your application takes.</h2>
            <p className="mt-6 max-w-[54ch] text-[clamp(17px,1.6vw,20px)] leading-[1.55] text-band-muted">
              A study section is the NIH panel that scores an application. This is the path it takes.
            </p>
            <div className="relative mt-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[7px] right-[6%] left-[6%] hidden h-px bg-band-line lg:block"
              />
              <ol className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-10 p-0 sm:grid-cols-4 lg:grid-cols-8">
                {PATH.map((step) => (
                  <li key={step} className="flex flex-col items-start">
                    <span
                      aria-hidden="true"
                      className="relative z-[1] mb-3 block h-[15px] w-[15px] rounded-full border-[1.5px] border-gold-on-band bg-gold-on-band"
                    />
                    <span className="font-display text-[19px] font-medium leading-tight tracking-[-0.02em]">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className={`${WRAP} py-[clamp(120px,16vw,200px)]`}>
          <h2 className="max-w-[14ch] text-[clamp(40px,5.6vw,72px)] font-light leading-[1.04] tracking-[-0.04em]">
            About half are never discussed.
          </h2>
          <p className={`${BODY} mt-10`}>
            Preliminary scores are given before the meeting. The lower half are not talked about at
            all. This is called triage. You still get written feedback, but the conversation never
            happened.
          </p>
          <p className={BODY}>
            It is rarely a verdict on your science. It usually means the application did not make its
            case fast enough for three busy readers.
          </p>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <h2 className={`max-w-[14ch] ${H2}`}>What the scores mean.</h2>
            <div className="mt-12 max-w-[720px]">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[7px] right-[4%] left-[4%] h-px bg-line-2"
                />
                <ol className="m-0 flex list-none items-start justify-between p-0">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                    <li key={n} className="flex flex-col items-center">
                      <span
                        aria-hidden="true"
                        className={`relative z-[1] mb-3 block h-[15px] w-[15px] rounded-full border-[1.5px] ${
                          n === 1 ? "border-gold bg-gold" : "border-gold bg-bg-2"
                        }`}
                      />
                      <span className="text-[13px] tabular-nums text-muted">{n}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-3 flex justify-between text-[13px] text-muted">
                <span>1 exceptional</span>
                <span>9 poor</span>
              </div>
            </div>
            <p className={BODY}>
              Each reviewer scores 1 to 9. The scores are averaged and multiplied by ten. The result
              is the impact score, from 10 to 90. Lower is better.
            </p>
            <table className="mt-12 w-full max-w-[640px] border-collapse text-left text-[15px] leading-[1.45]">
              <caption className="sr-only">How scoring differs by award type</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-3 pr-4 font-medium" />
                  <th scope="col" className="py-3 pr-4 font-medium">
                    R-series grants
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Fellowships, K and T awards
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <th scope="row" className="py-3 pr-4 font-medium">
                    Scored on
                  </th>
                  <td className="py-3 pr-4 text-muted">Three factors</td>
                  <td className="py-3 text-muted">Five criteria</td>
                </tr>
                <tr>
                  <th scope="row" className="py-3 pr-4 font-medium">
                    Changed
                  </th>
                  <td className="py-3 pr-4 text-muted">January 2025</td>
                  <td className="py-3 text-muted">Unchanged</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={`${WRAP} ${SECTION}`}>
          <h2 className={`max-w-[14ch] ${H2}`}>The summary statement.</h2>
          <p className={BODY}>
            Weeks later you get written feedback. Read it for what reviewers could not find, not only
            what they disliked.
          </p>
          <p className={BODY}>
            Most funded applications were resubmitted. You get one resubmission, marked A1.
          </p>
        </section>

        <section className="bg-bg-2">
          <div className={`${WRAP} ${SECTION}`}>
            <h2 className={`max-w-[16ch] ${H2}`}>You can see all of this before you submit.</h2>
            <p className={BODY}>
              EQUITAS shows you the review your own application would get. The scores, the discussion
              behind them, and what to change first.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/journey/review" variant="primary">
                Continue at Review
              </Button>
              <Button href="/onboarding?from=review&need=scored" variant="ghost">
                Create a free account
              </Button>
            </div>
          </div>
        </section>

        <section id="glossary" className={`scroll-mt-24 ${WRAP} ${SECTION} grid items-start gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16`}>
          <div className="lg:sticky lg:top-28">
            <SectionHead eyebrow="Glossary" title="The words, in plain language." />
          </div>
          <dl className="m-0 grid grid-cols-1 sm:grid-cols-[minmax(8rem,14rem)_minmax(0,1fr)]">
            {GLOSSARY.map((item) => (
              <div key={item.term} className="contents">
                <dt className="border-t border-line py-5 pr-10 text-[15px] font-medium leading-[1.4]">
                  {item.term}
                </dt>
                <dd className="m-0 border-t border-line py-5 text-[15px] leading-[1.5] text-muted">
                  {item.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
