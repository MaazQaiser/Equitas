# Investigator status for Cherisse

This note covers the investigator experience only. It does not request or start new screens. The contracted 27 UI screens are done. A walkthrough video is at `demo/EQUITAS-demo.mp4`.

## What a module can do today

Everything in the product app runs in one browser tab. There is no server account, no real review model, and no payment. Closing the browser clears the work.

Three labels used below:

- **Works in this browser session:** the click does something and the result stays until the tab closes.
- **Sample only:** the screen exists and is labelled sample, demo, or coming soon.
- **Not built:** the control is present, or named in the product, and does not perform the action.

## How modules connect

One selected grant workspace is shared by the Grant Submission Navigator, the review tools, and Reviewer Perspectives. "Follow Up in Perspectives" stores a link to the latest sample review so that perspective can see it. Mentor notes, Funding Discovery, Budget, and post-award screens do not read that workspace. An investigator cannot return on another day or another computer and continue.

## Mentor Chat and reviewer perspectives

Reviewer Perspectives (ten lenses, including Study Section Reviewer and Biostatistician) lets the investigator pick a lens, type a question, and receive a sample reply, with a monthly conversation cap. Voice is marked coming soon. Mentor Hub is a separate notes and rating form. Mentor matching is not live and no one is contacted.

## Entry and navigation

Marketing site, then early access or create an account, then three onboarding steps (role, plan, email preferences), then the dashboard. Header: Home, Navigator, All tools, Perspectives. A tool link on the marketing site returns to that tool after sign-in.

## Confidentiality

Institution and funder screens do not open an investigator's draft, because there is no multi-user system. That is not a permission model. The boundary that keeps investigator materials private still has to be designed before any shared platform work. The funder experience is not built. Institution screens are a separate demo and are outside this review.

## Implemented investigator screens

| Area | Screen | Status |
|---|---|---|
| Entry | Marketing home | Works in this session |
| Entry | Sign-up, sign-in | Works in this session (mock) |
| Entry | Forgot password | Not built |
| Entry | Onboarding (role, plan, preferences) | Works in this session |
| Home | Empty and filled dashboard | Works in this session |
| Navigator | New grant form, eight stages | Works in this session |
| Navigator | Outside share link (comment, approve) | Works in this session; link dies with browser data |
| Review | Study Section Simulator, Opening Statement, Equity Intelligence, Gap Analysis | Sample only (labelled Sample output) |
| Perspectives | Reviewer Perspectives P01–P10 | Sample only |
| Mentor | Mentor Hub, session notes, quality | Works in this session; matching not live |
| Discovery / budget / learning | Funding Discovery, Budget Builder, Learning Center | Sample only |
| Post-award | Post-award suite | Sample only (Demo data) |
| Plans | Plan lock and demo checkout | Works in this session; no card charged. Dollar amounts in the app are prototype figures, not an approved price list. |

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
