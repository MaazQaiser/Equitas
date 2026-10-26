/**
 * Records one continuous demo of the full EQUITAS journey with burned-in captions,
 * click highlights and title cards, then converts it to MP4.
 *
 * Needs the site running (`npm run dev`). The website and the app share one origin.
 * Run: npm run demo:video   ->   ../demo/EQUITAS-demo.mp4
 */
import { chromium } from "playwright";
import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const MKT = process.env.EQUITAS_MARKETING_URL || "http://localhost:3003";
const APP = process.env.EQUITAS_APP_URL || `${MKT}/product`;
const OUT_DIR = path.resolve(process.cwd(), "../demo");
const RAW_DIR = path.join(OUT_DIR, ".raw");
const SIZE = { width: 1280, height: 800 };
const CAPTION_H = 76;

const OVERLAY = `
(() => {
  const install = () => {
    if (document.getElementById("__demo-cap")) return;
    const css = document.createElement("style");
    css.textContent = \`
      #__demo-cap{position:fixed;left:0;right:0;bottom:0;height:${CAPTION_H}px;z-index:2147483646;display:flex;align-items:center;justify-content:center;padding:0 48px;background:rgba(15,29,51,.94);color:#F2EEE5;font:500 19px/1.4 Outfit,Arial,sans-serif;text-align:center;border-top:2px solid #B39952;pointer-events:none;transition:opacity .25s}
      #__demo-cap:empty{opacity:0}
      #__demo-ring{position:fixed;width:44px;height:44px;margin:-22px 0 0 -22px;border:3px solid #B39952;border-radius:50%;z-index:2147483647;pointer-events:none;opacity:0;box-shadow:0 0 0 6px rgba(179,153,82,.25)}
      #__demo-ring.on{animation:__demo-pulse .7s ease-out}
      @keyframes __demo-pulse{0%{opacity:1;transform:scale(.6)}100%{opacity:0;transform:scale(1.6)}}
      #__demo-card{position:fixed;inset:0;z-index:2147483647;display:none;flex-direction:column;align-items:center;justify-content:center;gap:14px;background:#0F1D33;color:#F2EEE5;text-align:center;padding:40px}
      #__demo-card.on{display:flex}
      #__demo-card .k{font:700 14px/1 Outfit,Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#B39952}
      #__demo-card .t{font:300 52px/1.1 Outfit,Arial,sans-serif;letter-spacing:-.02em;max-width:900px}
      #__demo-card .s{font:400 20px/1.5 Outfit,Arial,sans-serif;color:#C9C2B2;max-width:760px}
      body{padding-bottom:${CAPTION_H}px!important}
      [class*="bottom-0"]{bottom:${CAPTION_H}px!important}
      .fixed.bottom-4{bottom:${CAPTION_H + 16}px!important}
      nextjs-portal{display:none!important}
    \`;
    document.head.appendChild(css);
    const cap = document.createElement("div"); cap.id = "__demo-cap";
    const ring = document.createElement("div"); ring.id = "__demo-ring";
    const card = document.createElement("div"); card.id = "__demo-card";
    card.innerHTML = '<div class="k"></div><div class="t"></div><div class="s"></div>';
    document.body.append(cap, ring, card);
    const saved = sessionStorage.getItem("__demo-cap");
    if (saved) cap.textContent = saved;
  };
  window.__demo = {
    cap(text) { install(); sessionStorage.setItem("__demo-cap", text); document.getElementById("__demo-cap").textContent = text; },
    ring(x, y) { install(); const r = document.getElementById("__demo-ring"); r.style.left = x + "px"; r.style.top = y + "px"; r.classList.remove("on"); void r.offsetWidth; r.classList.add("on"); },
    card(k, t, s) { install(); const c = document.getElementById("__demo-card"); c.querySelector(".k").textContent = k; c.querySelector(".t").textContent = t; c.querySelector(".s").textContent = s || ""; c.classList.add("on"); },
    uncard() { const c = document.getElementById("__demo-card"); if (c) c.classList.remove("on"); },
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install); else install();
})();
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const readTime = (text) => Math.min(6500, 1400 + text.length * 42);

async function main() {
  fs.rmSync(RAW_DIR, { recursive: true, force: true });
  fs.mkdirSync(RAW_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: SIZE, recordVideo: { dir: RAW_DIR, size: SIZE } });
  await context.addInitScript(OVERLAY);
  const page = await context.newPage();
  page.setDefaultTimeout(15000);

  const evalDemo = (fn, ...args) => page.evaluate(([f, a]) => window.__demo[f](...a), [fn, args]).catch(() => {});

  async function say(text, hold = true) {
    await evalDemo("cap", text);
    if (hold) await sleep(readTime(text));
  }

  async function card(kicker, title, sub = "") {
    await evalDemo("cap", "");
    await evalDemo("card", kicker, title, sub);
    await sleep(3200);
    await evalDemo("uncard");
  }

  async function point(locator) {
    await locator.scrollIntoViewIfNeeded();
    await sleep(250);
    const box = await locator.boundingBox();
    if (box) {
      const x = box.x + box.width / 2;
      const y = box.y + box.height / 2;
      await page.mouse.move(x, y, { steps: 12 });
      await evalDemo("ring", x, y);
      await sleep(550);
    }
  }

  async function click(locator, caption) {
    if (caption) await say(caption);
    await point(locator);
    await locator.click();
    await sleep(900);
  }

  async function type(locator, text, caption, delay = 35) {
    if (caption) await say(caption, false);
    await point(locator);
    await locator.click();
    await locator.pressSequentially(text, { delay });
    await sleep(700);
  }

  async function scrollBy(px, steps = 6) {
    for (let i = 0; i < steps; i++) {
      await page.mouse.wheel(0, px / steps);
      await sleep(120);
    }
    await sleep(500);
  }

  async function goto(url) {
    await page.goto(url, { waitUntil: "networkidle" });
    await sleep(400);
  }

  async function resetApp() {
    await goto(`${APP}/sign-in`);
    await page.evaluate(() => {
      const cap = sessionStorage.getItem("__demo-cap");
      sessionStorage.clear();
      if (cap) sessionStorage.setItem("__demo-cap", cap);
    });
  }

  async function demoSignIn(label, caption) {
    await goto(`${APP}/sign-in`);
    await say(caption);
    const details = page.locator("details#demo");
    if ((await details.getAttribute("open")) === null) await click(details.locator("summary"), "Open “Try a demo account” to switch between example users.");
    await click(page.getByRole("button", { name: new RegExp(`^${label}`) }), `Sign in as: ${label}.`);
    await page.waitForURL(/\/(dashboard|onboard|ceo)/);
    await sleep(800);
  }

  // Intro
  await goto(MKT);
  await card(
    "Product demo",
    "EQUITAS Intelligence",
    "See your grant application the way reviewers will, before you submit. Every Researcher Deserves the Infrastructure.",
  );

  // 1. Marketing site to app
  await card("1 of 7", "From the website into the app", "A researcher lands on the public site and finds a tool.");
  await say("This is the public EQUITAS website. It explains how grant review works and what the product does.");
  await say("EQUITAS teaches you how reviewers will read and score your application. It does not write grants.");
  await scrollBy(700);
  await say("A sample shows the idea: your draft on the left, a reviewer's reading of it on the right.");
  await say("Tools are arranged along the research journey: Imagine, Design, Compete, Review, Manage, Transform.");
  await goto(`${MKT}/journey/review`);
  await say("Here is the Review stage. Each stage lists the tools that help at that moment.");
  await scrollBy(500);
  const simLink = page.locator("a[href*='module=study-section-simulator']").first();
  await click(simLink, "The researcher clicks the Study Section Simulator.");
  await page.waitForURL(/\/product\//);
  await sleep(600);
  await say("The website hands off to the app. The app knows which tool you wanted and asks you to sign in first.");
  await click(page.locator("main a[href*='/sign-up']").first(), "New here, so we click “Create an account”.");

  // 2. Sign-up and onboarding
  await card("2 of 7", "Create an account", "Free for 14 days. No card needed.");
  await say("Sign-up asks for three things only: name, work email and a password.");
  await type(page.getByLabel("Full name"), "Amara Okafor", "Full name.");
  await type(page.getByLabel("Work email"), "amara@university.edu", "Work email. A university address is best.");
  await type(page.getByLabel("Password", { exact: true }), "reviewready", "A password of at least 8 characters.");
  await click(page.getByRole("button", { name: "Create account" }), "Create the account.");
  await page.waitForURL(/\/onboard/);
  await say("Step 1 of 3. What brings you here? This decides which tools appear first. The progress bar stays visible.");
  await click(page.getByText("I run funded projects"), "Amara runs funded projects, so she picks this.");
  await click(page.getByRole("button", { name: "Continue" }), "Continue.");
  await say("Step 2 of 3. Start with a free trial, subscribe now, or request Equity Access for lower-resource settings.");
  await click(page.getByRole("button", { name: "Start trial" }), "Most people start with the free trial.");
  await say("Step 3 of 3. Choose which emails you want. These can be changed later in Settings.");
  await click(page.getByRole("button", { name: "Continue" }), "Continue.");
  await sleep(600);

  // 3. Workspace + Navigator
  await card("3 of 7", "Add a grant and follow the Navigator", "One workspace holds one application, from setup to submitted.");
  await say("Because Amara clicked the Simulator on the website, the app brings her straight back to it.");
  await say("A review needs a grant to attach to, so the tool asks her to add one first.");
  await click(page.getByRole("link", { name: "Create workspace" }), "Click “Create workspace”.");
  await say("The form uses the full page. Each section says why it matters. Only the name is required.");
  await type(page.getByLabel("Grant name"), "R01 hospital readmission trial", "Give the grant a short name.");
  await click(page.getByRole("button", { name: "Suggest an institute" }), "For NIH, EQUITAS can suggest the institute likely to fund it.");
  await click(page.getByRole("button", { name: "Continue" }), "The action buttons stay pinned at the bottom. Continue.");
  await say("A quick check of the details before anything is created.");
  await click(page.getByRole("button", { name: "Create workspace" }), "Create the workspace.");
  await page.waitForURL(/\/dashboard\/gsn/);
  await say("This is the Grant Submission Navigator. Eight stages, from Setup to Submitted.");
  await say("Each stage explains what to do now and links the tools that help.");
  await click(page.getByRole("button", { name: /^Mark done and go to/ }), "Mark Setup done.");
  await click(page.getByRole("button", { name: /^Mark done and go to/ }), "Mark the Narrative done. Now we reach Review.");
  await click(page.locator("main").getByRole("link", { name: /Study Section Simulator/ }).first(), "At Review, open the Study Section Simulator.");

  // 4. Simulator + Perspectives
  await card("4 of 7", "See the score before reviewers do", "A study section is the expert panel that scores NIH grants.");
  await say("Paste part of the draft. EQUITAS reminds you to remove names first.");
  await type(
    page.getByLabel("Paste draft text"),
    "Aim 1 tests whether a nurse-led discharge call cuts 30-day readmissions in 400 adults across three hospitals.",
    "Paste a section of the draft.",
    12,
  );
  await click(page.getByRole("button", { name: "Run review" }), "Run the review.");
  await say("The result shows an impact score. 1 is best and 9 is weakest. It is clearly marked as sample output in this prototype.");
  await scrollBy(250, 3);
  await say("Factor scores, how confident the read is, and what to strengthen first.");
  await click(page.getByRole("button", { name: "Follow Up in Perspectives" }), "To talk it through, follow up in Reviewer Perspectives.");
  await say("Reviewer Perspectives lets you ask how a specific kind of reviewer would read your work. This one can see the review result.");
  await type(
    page.getByPlaceholder(/What would a reviewer question first/),
    "What would a reviewer question first in Aim 1?",
    "Ask a question.",
    25,
  );
  await click(page.getByRole("button", { name: "Send" }), "Send.");
  await say("The perspective answers in plain language. Urgent help is there when a deadline is close.");

  // 5. Plans
  await card("5 of 7", "Plans and locked tools", "What a Free plan user sees, and how upgrading works.");
  await resetApp();
  await demoSignIn("Researcher on the Free plan", "Now a different user: a researcher on the Free plan.");
  await goto(`${APP}/dashboard/study-section`);
  await say("The Simulator is not on the Free plan. The page says so plainly and names the cheapest plan that includes it.");
  await click(page.getByRole("link", { name: "Compare plans" }), "Compare plans.");
  await say("Monthly or annual billing. The current plan is marked. Equity Access is offered below.");
  await click(page.getByRole("button", { name: "Upgrade to Investigator", exact: true }), "Upgrade to Investigator.");
  await say("This checkout is a demo. No card is charged.");
  await click(page.getByRole("button", { name: "Confirm payment" }), "Confirm.");
  await say("The plan changes straight away.");
  await goto(`${APP}/dashboard/study-section`);
  await say("The Simulator is now open.");

  // 6. Outside reviewer
  await card("6 of 7", "Ask an outside reader", "Share the final draft with a colleague. They do not need an account.");
  await resetApp();
  await demoSignIn("Investigator plan", "Sign in as an Investigator with a grant already in progress.");
  await goto(`${APP}/dashboard/gsn`);
  await click(page.getByRole("navigation", { name: "Stages" }).getByRole("button", { name: /^Final/ }), "Jump to the Final stage.");
  await click(page.getByRole("button", { name: "Create share link" }), "Create a share link. It works for 7 days.");
  const href = await page.locator("a[href*='/review/']").first().getAttribute("href");
  await say("Now we open the link the way the outside reader would.");
  await goto(new URL(href, APP).href);
  await say("The reader sees the draft title, can leave comments, and gives a decision.");
  await type(page.getByLabel("Your name"), "Dr. Lee, Biostatistics", "They add their name.");
  await type(page.getByLabel("Comment"), "Power analysis is clear. Ready to submit.", "And a comment.", 25);
  await click(page.getByRole("button", { name: "Add comment" }), "Add the comment.");
  await click(page.getByRole("button", { name: "Approve" }), "Then approve. The applicant sees this straight away.");

  // 7. Other users
  await card("7 of 7", "Other people who use EQUITAS", "Institutions, ended trials and the founder view.");
  await resetApp();
  await demoSignIn("Invited by an institution", "A researcher invited by their institution.");
  await goto(`${APP}/pricing`);
  await say("Their institution pays, so they never see prices.");
  await goto(`${APP}/dashboard/institutional`);
  await say("The research office view. Dashboards track grant activity. Forecasting is on the roadmap, not built yet.");
  await resetApp();
  await demoSignIn("Trial just ended", "A user whose free trial has just ended.");
  await say("A clear banner. Their work is kept for 48 hours while they choose a plan.");
  await resetApp();
  await demoSignIn("Founder", "Finally, the founder.");
  await say("The CEO dashboard is the founder's view of product health. Every number here is labelled as sample data.");
  await scrollBy(400);

  await card("Thank you", "EQUITAS Intelligence", "Every Researcher Deserves the Infrastructure.");

  const video = page.video();
  await context.close();
  await browser.close();

  const raw = await video.path();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = path.join(OUT_DIR, "EQUITAS-demo.mp4");
  execFileSync(
    ffmpegPath,
    ["-y", "-i", raw, "-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", out],
    { stdio: "ignore" },
  );
  fs.rmSync(RAW_DIR, { recursive: true, force: true });
  console.log("Wrote", out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
