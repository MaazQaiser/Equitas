# EQUITAS website — starter kit

Everything needed to start building the redesign in Claude Code.

```
equitas-starter/
├── README.md              you are here — setup steps
├── CLAUDE.md              project rules. Claude Code reads this automatically
├── PLAN.md                the build spec: sitemap, pages, flows, phases
└── design/
    ├── prototype.html     clickable reference, 7 screens
    └── walkthrough.html   plain-English explainer for the client
```

Open `design/prototype.html` in a browser first. That is the target.

---

## Getting started

### 1. Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

Needs Node 18 or newer. Check with `node -v`.

### 2. Put this folder where you want the project

```bash
cd ~/Projects
# move or unzip equitas-starter here, then:
cd equitas-starter
```

### 3. Start Claude Code

```bash
claude
```

It picks up `CLAUDE.md` on its own. You do not need to paste the rules in.

### 4. First prompt

Paste this:

> Read CLAUDE.md and PLAN.md, then open design/prototype.html to see the target.
> Set up a Next.js project with Tailwind and TypeScript in this folder. Wire the
> brand tokens from CLAUDE.md into the Tailwind config, using the two-group
> colour split described there so the dark bands never invert. Then build the
> homepage from PLAN.md section 4. Stop after the homepage so I can review.

### 5. Preview it

```bash
npm run dev
```

Then open `http://localhost:3000`.

---

## Suggested order

Build in this order and review at each stop. One page at a time works far better
than asking for the whole site at once.

1. Project setup, tokens, shared layout, header and footer
2. Homepage
3. Stage page template, then the six stage pages from one loop of content
4. Onboarding, the three questions
5. Signed-in home
6. Inside a tool — empty state, then the result state
7. Institutions and the demo form
8. Resources and guides

---

## Prompts that work well

**Building a page**
> Build the Compete stage page using the template in PLAN.md section 5, with the
> content for Compete from CLAUDE.md. Match the spacing and type scale in
> design/prototype.html.

**Getting the tokens right**
> Check every colour in the codebase against CLAUDE.md. Flag anything using
> #B39952 for text under 18px — that fails AA on cream and must use #75601F.

**Accessibility pass**
> Audit this page against the accessibility section of CLAUDE.md. Check contrast,
> keyboard order, focus rings, form labels and heading levels. Fix what fails.

**Content**
> Rewrite this copy against the voice rules in CLAUDE.md. Remove every em dash and
> any hype word.

---

## On the stack

`Next.js` is assumed above because it handles both the marketing pages and the
signed-in area, and Claude Code works well with it.

`Astro` is the better choice if the signed-in app already exists elsewhere and
this project is only the marketing site plus guides. It ships less JavaScript,
which matters for the low-bandwidth audience named in `CLAUDE.md`.

Either is fine. Decide before step 4 and tell Claude Code which one.

---

## Two things to keep in mind

**Manage is not approved yet.** The sixth journey stage is our recommendation,
not the client's instruction. Build it so it can be removed cleanly if she says
no — content-driven, not hard-coded into six separate components.

**The colour bug.** Dark bands must never invert. Keep page tokens and band
tokens in separate groups, exactly as `CLAUDE.md` describes. This already shipped
broken once: the navy band turned pale in dark mode while the text stayed white.
