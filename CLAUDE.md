# EQUITAS Intelligence — project context

Read this before writing any code. It holds the client's fixed constraints.
`PLAN.md` holds the full build spec. `design/prototype.html` is the approved
reference for layout and interaction.

---

## What the product is

EQUITAS teaches researchers how their grant applications will actually be
reviewed and scored, so they can strengthen them before submitting. It is
calibrated by a real, active NIH study section reviewer.

It does **not** write grants. Never imply otherwise — for NIH submissions this
is an integrity issue, not a marketing preference.

**Tagline (do not change):** Every Researcher Deserves the Infrastructure

---

## The core problem we are solving

The current site shows twelve tools in one flat grid, identical for everyone.
A first-time user cannot tell what is there or where to begin.

The fix is two-axis filtering: **journey stage** × **audience**. A trainee sees
four tools, not twelve.

---

## The journey (organising principle for the whole site)

| Stage | Promise | Status |
|---|---|---|
| Imagine | Shape your question and find funding that fits | Partly available |
| Design | Build a study reviewers will trust | Partly available |
| Compete | Develop an application that can be funded | Available |
| Review | See your application the way reviewers will | Available |
| Manage | Steward your award and its money | Available |
| Transform | Turn your research into impact | Coming |

Five stages are the founder's. **Manage is our addition and is still pending her
approval** — keep it isolated enough to remove cleanly.

Status words are exactly three: `Available`, `Partly available`, `Coming`.
Always show the word. Never encode status with colour alone.

---

## The four audiences

| Audience | Sees | Buys |
|---|---|---|
| Trainee | First fellowship / K award tools | No, free |
| Investigator | R-series, resubmission, scoring | Sometimes |
| Grants Manager | Post-award, subaward, budget | Via institution |
| Institution | Dashboards, pipeline | Yes — this is the revenue |

Homepage speaks to Trainee and Investigator **only**. Institutions get a
separate route. Never blend the two messages on one page.

---

## Brand tokens (fixed — client says colours stay)

```css
--navy:       #0F1D33;  /* dark bands, primary buttons */
--gold:       #B39952;  /* accent, rules, active dots */
--gold-text:  #75601F;  /* gold for SMALL TEXT on cream — AA safe */
--cream:      #F2EEE5;  /* page ground */
--sand:       #E9E2D1;  /* raised panels */
--white:      #FFFFFF;  /* cards */
--muted:      #59636F;  /* secondary text */
--line:       #DCD5C4;  /* hairlines */
```

**`#B39952` fails AA on cream at body size.** Use `--gold-text` for any gold
text under 18px. This is a hard rule.

### Colour architecture (important — this caused a real bug)

Split tokens into two groups that behave differently:

1. **Page tokens** — flip with the viewer's theme (background, body text, cards).
2. **Band tokens** — a dark surface with light text in **both** themes.

Never hard-code a text colour on a dark band. If `--navy` flips in dark mode but
the text on it stays hard-coded light, the band goes pale and the text vanishes.
That bug shipped once already.

### Type

- Display: `"Playfair Display", Georgia, serif` — headings only
- Body: `Arial, "Helvetica Neue", Helvetica, sans-serif`

Client specified both. She left fonts open to discussion; Arial is the weakest
asset against her Apple/Linear references, but **do not change it without her
sign-off**.

---

## Voice rules

- Short declarative sentences.
- **No em dashes.** Client stated this explicitly.
- No hype. No "leverages", "empowers", "unlocks", "seamless".
- Banned section labels: Solutions, Capabilities, Our Mission, Services.
- Never claim guaranteed funding.
- AI is described as how one reviewer's expertise reaches many people. It is
  never the headline and never illustrated with neural networks or sparkles.
- Write for non-native English readers. Define *study section*, *impact score*,
  *triage* on first use.
- Every module gets one plain sentence saying what it does and who it is for —
  never a keyword list.

---

## Module descriptions (rewritten — use these verbatim)

| Module | Stage | Description |
|---|---|---|
| Funding Discovery | Imagine | Find what has already been funded in your area, and who funded it. |
| Regulatory Compliance | Design | Get IRB, human subjects and policy questions answered in plain language. |
| Pre-Award Review | Compete | Read your draft the way a reviewer will, section by section, before you submit. |
| K Award Suite | Compete | Plan the career development sections that decide K awards, including the mentor plan and training goals. |
| Trainee & GRA Tools | Compete | Everything an F31, F32 or T32 application needs, written for a first-time applicant. |
| International Research | Compete | Apply to ERC, Wellcome and other non-US funders, with each one's conventions explained. |
| Study Section Simulator | Review | See the score your application would get and the discussion behind it. |
| Resubmission Strategy | Review | Work out why it was not funded and what to change before the A1. |
| Post-Award Management | Manage | Keep RPPR reports, no-cost extensions and progress reporting on schedule. |
| Subaward & Invoicing | Manage | Track subawards, subcontracts and invoices across collaborating sites. |
| Budget & Finance | Manage | Build and monitor a grant budget that survives review and audit. |
| Institutional Intelligence | — | See grant activity and pipeline across a department or institution. |

The originals ("PRAM, RPPR, NCE") were search keywords. Keep those as search
metadata, never as display text.

---

## Accessibility — a requirement, not a nice-to-have

Client's words: where polish and accessibility conflict, accessibility wins.

- WCAG 2.1 AA. 4.5:1 body text, 3:1 large text and UI controls.
- **Allow pinch-zoom.** The live site sets `maximum-scale=1`, which fails AA.
- Full keyboard operation with a visible focus ring.
- Labelled form fields; errors announced and tied to their input.
- Respect `prefers-reduced-motion`.
- Right-to-left layout support for Arabic.
- Ten languages: English, Español, Português, Français, العربية, 中文, हिंदी,
  Kiswahili, Deutsch, Italiano.

## Performance

Users include researchers on limited bandwidth. This is a stated audience.

- Homepage under 1MB.
- LCP under 2.5s on a mid-range Android over 3G.
- Compress images, lazy-load below the fold.
- Any animation must be droppable without losing meaning.

---

## Honesty rules

- Never show an unbuilt feature as live.
- The institutional **financial forecasting** feature does not exist. It must
  always carry a visible "on our roadmap, not built yet" label.
- Institutional dashboards today are **tracking**, not forecasting. Say tracking.
- Do not invent user counts, institution logos or testimonials.

---

## Things not to do

- Do not put four audience pills in front of a first-time visitor.
- Do not build twelve separate module marketing pages — that recreates the grid.
- Do not gate value behind a signup or a sales call.
- Do not show pricing to a user invited by their institution.
- Do not use stock photography or generic blue corporate imagery.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
