# EQUITAS website — build spec

Companion to `CLAUDE.md` (constraints) and `design/prototype.html` (reference).
This file is the what-to-build list.

---

## 1. Open decisions

These change the sitemap. Confirm before building the affected areas.

| # | Question | Our answer | Blocks |
|---|---|---|---|
| 1 | Where do post-award tools live? | Add a sixth stage, **Manage** | Sitemap, nav, stage pages |
| 2 | Is Grants Manager its own audience? | Yes, but under Institutions | Sitemap, nav |
| 3 | How does Transform appear with nothing built? | Keep it, label Coming, capture email | Stage pages |
| 4 | Who rewrites module descriptions? | Done — see `CLAUDE.md` | Every page listing a module |

---

## 2. Sitemap

31 public pages, none more than two clicks from home.

```
/
/journey                     overview
/journey/imagine
/journey/design
/journey/compete
/journey/review
/journey/manage
/journey/transform
/researchers/trainees
/researchers/investigators
/institutions
/institutions/grants-offices
/institutions/what-leaders-see
/institutions/roadmap         forecasting, clearly labelled
/institutions/demo
/pricing
/resources
/resources/how-grant-review-works
/resources/glossary
/resources/guides/*
/resources/faq
/about
/about/reviewer
/signin  /signup  /onboarding
/legal/privacy  /legal/terms  /legal/accessibility  /legal/data-security
```

**Rules**
- Modules do **not** get individual marketing pages. Stage pages describe them
  and link into the app.
- A researcher never passes through institutional content to reach signup.
- An institutional buyer never lands in researcher signup. Their route ends at
  a demo request.

---

## 3. Navigation

**Public header:** The research journey (mega menu, six stages with status) ·
For researchers · For institutions · Pricing · Resources · Sign in ·
**Create free account** (button, always visible)

The journey mega menu is where discoverability is won. It shows all six stages
with honest status words, so a visitor learns the product's shape without
clicking.

**Mobile:** full-screen menu, rows expand in place, no nested drawers. Language
selector at the bottom, not the header. Tap targets 44px minimum.

**App header (signed in):** Home · My journey · Tools · Help, plus one
`NIH · English` control, notifications, avatar.
Removed: tagline hero, audience pills, ten language chips, five funder chips.

---

## 4. Homepage sections, in order

1. Hero — *Most researchers were never shown how grant review works. EQUITAS shows you.*
2. Credibility strip — three facts, no invented numbers
3. **Where are you in your research?** — six stage cards. The core fix.
4. Or tell us what you need — search with four example prompts
5. See your application through a reviewer's eyes — three steps with real screenshots
6. Two ways in — Trainees / Investigators
7. The reviewer behind EQUITAS — photo, name, credentials. *Missing today; highest-value addition.*
8. Mission
9. For institutions — one distinct band, one link
10. Questions researchers ask — FAQ, opening with "Does EQUITAS write my grant?"
11. Final CTA

---

## 5. Stage page template

One template, seven pages.

1. Journey bar, all six stages, current marked
2. Stage name, one-line promise, status word
3. "You are here if…" — three bullets in the user's words
4. Tools in this stage — one card each, plain description
5. "What's coming" block for anything unbuilt, with email capture
6. Links to previous and next stage
7. Create a free account

---

## 6. Onboarding — three questions

Each changes what the user sees next. All skippable.

| Step | Question | Sets |
|---|---|---|
| 1 | Which best describes you? | Audience (permanent filter) |
| 2 | Which funder are you working with? | Funder conventions |
| 3 | What do you need help with right now? | Starting stage and first tool |

Language is detected and shown as a changeable default, not asked.

**After:** one recommended tool, large, with a Start button. Two related tools
below. Not a grid.

**If skipped:** stage-grouped tools, never an unfiltered grid.

---

## 7. Inside a tool — the screen that decides retention

Build the empty state as carefully as the result.

**Empty state**
- One line saying what to paste and what comes back
- A textarea with a realistic placeholder
- **Load the sample** — critical for users nervous about pasting unpublished work
- Privacy answer placed here, where the worry occurs, not in a policy page
- Validation: do not run on an empty box; error tied to the input

**Result state**
- Overall score with a plain-language reading
- Per-criterion breakdown
- Two or three reviewer comments in quotes, attributed
- **Fixes ranked by impact on score** — this is the payoff
- Save, and one next step

---

## 8. User flows

### Discovery and activation
1. **Trainee finds their stage** — home → stage section → Compete → tool → signup → onboarding → tool
2. **Investigator after rejection** — types "my grant was not funded" → Resubmission Strategy → signup pre-filled
3. **Not ready** — See how it works → sample result → signup
4. **From search engine** — lands on a guide → guide ends in its stage
5. **Referred by colleague** — lands deep; every page carries the journey bar and one line of context
6. **Signup and onboarding** — context carried through
7. **First tool to first result** — empty state with example; success = one real result in session one
8. **Skips onboarding** — stage-grouped, still better than today's default
9. **Hits a developing stage** — status word, email capture, redirect to what works

### Lifecycle
10. **Returning user** — back inside a tool within one click of signing in
11. **Deadline approaching** — email naming their application, one link into the tool
12. **Outcome arrives** — funded → Manage. Not funded → Resubmission, no cheering
13. **Free to paid** — limit message names what they were doing. No dark patterns

### Institutional
14. **Buyer evaluates** — pain → value → what leaders see → roadmap → demo. Five-field form. Confirmation names a person and a time
15. **Institution rolls out** — admin console, invite by email, activation view
16. **Faculty joins via invite** — institutional SSO, no pricing shown
17. **Grants manager daily use** — list of what needs attention, not a journey
18. **Chair reviews pipeline** — tracking only, forecasting labelled roadmap

---

## 9. Search behaviour

- Match plain language, not module names. "My grant ends soon" is a sentence.
- Rank by the audience filter. A trainee searching "budget" must not get
  Subaward & Invoicing first.
- Return the stage alongside the tool, so search teaches the journey.
- Accept all ten languages.
- **Never an empty result.** Fall back to the journey plus a way to tell us what
  was missing.
- Privacy warning: keep it, shorten it, stop shouting it.

---

## 10. Measurement

| Question | Measure |
|---|---|
| Can visitors place themselves? | Sessions opening a stage page or search |
| Does signup follow? | Home → account conversion |
| Do they reach value? | New accounts producing a real result in session one |
| **Did we fix discoverability?** | **Distinct modules used per user in month one** |
| Does the journey hold? | Users returning and moving to a second stage |
| Institutional | Demo requests, demo → pilot |

Row four answers the client's actual complaint. If users still touch one module
and stop, the redesign has not worked however good it looks.

---

## 11. Build order

| Phase | Contents |
|---|---|
| **Now** | Enable pinch-zoom, fix page title and meta description, fix footer entity name. Hours of work, two are live AA/SEO failures |
| **1** | Homepage, journey overview, six stage pages, onboarding, module descriptions |
| **2** | Signed-in home, search, empty states, sample reviewer report |
| **3** | Institutions, grants offices, roadmap page, demo flow, seat management |
| **4** | Resources, guides, glossary — slow to pay off, so start writing early |

---

## 12. Still needed from the client

- [ ] Answers to the four decisions, especially the sixth stage
- [ ] Reviewer biography, photo, permission to name her study section experience
- [ ] Pricing tiers and limits
- [ ] Product screenshots: Study Section Simulator, institutional and chair views
- [ ] Brand files: logo source, design-tokens colour file, licensed fonts
- [ ] A decision on Arial
