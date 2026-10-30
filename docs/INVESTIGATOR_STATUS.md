# Investigator status for Cherisse

This note covers the investigator experience only. It does not request or start new screens. The contracted 27 UI screens are done. A walkthrough video is at `demo/EQUITAS-demo.mp4`.

## What a module can do today

Everything in the product app runs in one browser tab. There is no server account, no real review model, and no payment. Closing the browser clears the work.

Status words used below:

- **Yes (prototype-complete):** the user can finish the path on that page (forms validate, lists filter, sample runs produce labelled results). Honesty labels such as Sample output, Coming soon, and Demo data stay where there is no real backend.
- **Works in this browser session:** same meaning for older rows that were already interactive.
- **Not built:** named in scope but intentionally out of this prototype pass (see later phase).

## How modules connect

One selected grant workspace is shared by the Grant Submission Navigator, the review tools, and Reviewer Perspectives. "Follow Up in Perspectives" stores a link to the latest sample review so that perspective can see it. Mentor Matching → session → quality is one path. Universal Search queries local tools and workspaces only. An investigator cannot return on another day or another computer and continue.

## Mentor Chat and reviewer perspectives

Reviewer Perspectives (ten lenses, including Study Section Reviewer and Biostatistician) lets the investigator pick a lens, type a question, and receive a sample reply, with a monthly conversation cap. Voice stays coming soon after click. Mentor Hub includes Mentor Matching (sample cards), session notes, and quality rating. No mentor is contacted.

## Entry and navigation

Marketing site, then early access or create an account, then three onboarding steps (role, plan, email preferences), then the dashboard. Header: Home, Navigator, All tools, Perspectives. Search tools from the dashboard. Footer: Privacy, Terms, Contact (in-app summaries plus contact form). A tool link on the marketing site returns to that tool after sign-in.

## Confidentiality

Institution and funder screens do not open an investigator's draft, because there is no multi-user system. That is not a permission model. The boundary that keeps investigator materials private still has to be designed before any shared platform work. The funder experience is not built. Institution screens are a separate demo and are outside this review.

## Implemented investigator screens

| Area | Screen | Status |
|---|---|---|
| Entry | Marketing home | Works in this session |
| Entry | Sign-up, sign-in | Works in this session (mock) |
| Entry | Forgot / reset password | Yes (prototype-complete); reset email is not sent |
| Entry | Onboarding (role, plan, preferences) | Works in this session |
| Entry | In-app Privacy / Terms summaries | Yes (prototype-complete); link to full marketing legal |
| Entry | Contact us | Yes (prototype-complete); message stays in session |
| Home | Empty and filled dashboard | Works in this session |
| Home | Universal Search | Yes (prototype-complete); local catalogue only |
| Navigator | New grant form, eight stages | Works in this session |
| Navigator | Outside share link (comment, approve) | Works in this session; link dies with browser data |
| Review | Study Section, Opener, Equity, Gap Analysis | Yes (prototype-complete); Sample output + copy/print stubs |
| Perspectives | Reviewer Perspectives P01–P10 | Yes (prototype-complete); empty/locked/cap/linked states |
| Mentor | Matching → session → quality | Yes (prototype-complete); Demo mentors |
| Discovery | Funding Discovery detail | Yes (prototype-complete); Coming soon for live search |
| Budget | Budget Builder | Yes (prototype-complete); editable sample lines |
| Pre-award / summary / de-id | Task list, upload success, copy cleaned text | Yes (prototype-complete) |
| Compete extras | K Award, Resubmission, International checklists | Yes (prototype-complete); demo checklists |
| Learning | Learning Center lessons + Trainee Hub | Yes (prototype-complete); mark complete in session |
| Post-award | NCE, RPPR, Tracker, Subaward, Compliance boards | Yes (prototype-complete); Demo data |
| Institutional | Chair table + workflow filters | Yes (prototype-complete); tracking, not forecasting |
| CEO | Panels + equity empty state | Yes (prototype-complete); founder only |
| Plans | Plan lock and demo checkout | Works in this session; Prototype prices honesty line; no card charged |

## Website presentation work (outside the 27 screens)

Done on the marketing site in this pass:

- Sample simulator (`AimsPair`) is in the homepage hero. Four-step review kept below. No licensed researcher photograph yet; that slot waits on a file you approve.
- Early-access form: name, email, user type, consent, confirmation. Public CTAs say "Join early access". App sign-in remains for people who already have access.
- Audience cards, grant-review versus general writing tool block, independence statement on About, institutional inquiry wording (tracking, not forecasting, not draft access), pricing without dollar amounts or trial promises, contact form with success and error states.
- Header, footer, and mobile menu expose early access, researchers, institutions, and pricing. No hardcoded localhost links in the public UI.

## Explicitly later phase

Not part of the 27 screens and not started:

- A project that survives closing the browser and is shared across Funding Matching, Mentor Coaching, the Simulator, and Document Review.
- A permission model that keeps investigator drafts and feedback hidden from institution and funder users.
- A funder experience.
- Funding Matching, Collaborative Document Review, and the shared integration architecture.
