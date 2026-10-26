/**
 * Headless-ish verification against the running Vite app.
 * Uses Playwright if available; otherwise prints manual checklist reminder.
 */
import { createRequire } from "node:module";

const BASE = process.env.EQUITAS_APP_URL || "http://localhost:5173/product";
const results = [];

function pass(id, note = "") {
  results.push({ id, ok: true, note });
  console.log(`PASS ${id}${note ? ` — ${note}` : ""}`);
}
function fail(id, note = "") {
  results.push({ id, ok: false, note });
  console.log(`FAIL ${id}${note ? ` — ${note}` : ""}`);
}

async function main() {
  let chromium;
  try {
    const require = createRequire(import.meta.url);
    ({ chromium } = require("playwright"));
  } catch {
    try {
      const mod = await import("playwright");
      chromium = mod.chromium;
    } catch {
      console.error("Playwright not installed. Run: npm i -D playwright && npx playwright install chromium");
      process.exit(1);
    }
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  page.setDefaultTimeout(15000);

  async function clear() {
    await page.goto(`${BASE}/sign-in`);
    await page.evaluate(() => sessionStorage.clear());
    await page.reload();
    await page.waitForLoadState("networkidle");
  }

  async function signInPreset(label) {
    await page.goto(`${BASE}/sign-in#demo`);
    const details = page.locator("details#demo");
    if ((await details.getAttribute("open").catch(() => null)) === null) await details.locator("summary").click();
    await page.getByRole("button", { name: new RegExp(`^${label}`) }).click();
    await page.waitForURL(/\/(dashboard|post-auth|onboard|ceo)/);
  }

  const visible = (loc) =>
    loc
      .first()
      .waitFor({ state: "visible", timeout: 4000 })
      .then(() => true)
      .catch(() => false);
  const setSession = (fn) =>
    page.evaluate((src) => {
      const raw = JSON.parse(sessionStorage.getItem("equitas-app-session-v1"));
      new Function("raw", src)(raw);
      sessionStorage.setItem("equitas-app-session-v1", JSON.stringify(raw));
    }, fn);

  async function signUpAndOnboard(name, email) {
    await page.goto(`${BASE}/sign-up`);
    await page.getByLabel("Full name").fill(name);
    await page.getByLabel("Work email").fill(email);
    await page.getByLabel("Password", { exact: true }).fill("password123");
    await page.getByRole("button", { name: "Create account" }).click();
    await page.waitForURL(/\/onboard/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForURL(/\/onboard\/plan/);
    await page.getByRole("button", { name: "Start trial" }).click();
    await page.waitForURL(/\/onboard\/preferences/);
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForURL(/\/dashboard$/);
  }

  async function openFinalStage() {
    await page.goto(`${BASE}/dashboard/gsn`);
    await page.getByRole("navigation", { name: "Stages" }).getByRole("button", { name: /^Final/ }).click();
  }

  // H1 sign up -> onboard -> empty dashboard
  await clear();
  await signUpAndOnboard("Verify User", "verify@equitas.demo");
  (await visible(page.getByRole("link", { name: "Add your first grant" })))
    ? pass("H1", "empty dashboard")
    : fail("H1", await page.locator("h1,h2").allTextContents().then((t) => t.join("|")));

  // H2 create workspace -> advance stages
  await page.getByRole("link", { name: "Add your first grant" }).first().click();
  await page.waitForURL(/\/gsn\/new/);
  await page.getByLabel("Grant name").fill("Verify R01");
  await page.getByRole("button", { name: "Suggest an institute" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Create workspace" }).click();
  await page.waitForURL(/\/dashboard\/gsn/);
  for (let i = 0; i < 7; i++) {
    await page.getByRole("button", { name: /^Mark done and go to/ }).click();
  }
  (await visible(page.getByRole("heading", { name: "Submitted", exact: true }))) ? pass("H2", "reached Submitted") : fail("H2");

  // H3 study section -> follow up
  const DRAFT = "Aim 1 tests effect size in a pragmatic sample of 400 adults across three sites.";
  await page.goto(`${BASE}/dashboard/study-section`);
  await page.getByLabel("Paste draft text").fill(DRAFT);
  await page.getByRole("button", { name: "Run review" }).click();
  await page.getByRole("heading", { name: "Result" }).waitFor();
  await page.getByRole("button", { name: "Follow Up in Perspectives" }).click();
  await page.waitForURL(/reviewer-perspectives/);
  await page.waitForTimeout(300);
  (await visible(page.getByText(/Linked to analysis/))) ? pass("H3") : fail("H3", "missing linked analysis");

  // H4 opener pattern
  await page.goto(`${BASE}/dashboard/opener`);
  await page.getByLabel("Paste draft text").fill(DRAFT);
  await page.getByRole("button", { name: "Run review" }).click();
  (await visible(page.getByRole("button", { name: "Follow Up in Perspectives" }))) ? pass("H4") : fail("H4");

  // H5 perspectives send + urgent help
  await page.goto(`${BASE}/dashboard/reviewer-perspectives`);
  await page.getByRole("button", { name: /First-Time Applicant Mentor/ }).first().click();
  await page.getByPlaceholder(/What would a reviewer question first/).fill("What will a reviewer challenge?");
  await page.getByRole("button", { name: "Send" }).click();
  (await visible(page.getByRole("button", { name: "Urgent help" }))) ? pass("H5") : fail("H5");

  // H6 free lock -> upgrade via demo checkout
  await clear();
  await signInPreset("Researcher on the Free plan");
  await page.goto(`${BASE}/dashboard/study-section`);
  const locked = await visible(page.getByText(/is not on your plan/));
  await page.getByRole("link", { name: "Compare plans" }).click();
  await page.waitForURL(/\/dashboard\/plans/);
  await page.getByRole("button", { name: "Upgrade to Investigator", exact: true }).click();
  await page.getByRole("button", { name: "Confirm payment" }).click();
  const paidMsg = await visible(page.getByText(/You are now on the Investigator plan/));
  await page.goto(`${BASE}/dashboard/study-section`);
  const unlocked = !(await visible(page.getByText(/is not on your plan/)));
  locked && paidMsg && unlocked ? pass("H6") : fail("H6", `locked=${locked} paid=${paidMsg} unlocked=${unlocked}`);

  // H7 share approve
  await clear();
  await signInPreset("Investigator plan");
  await openFinalStage();
  await page.getByRole("button", { name: "Create share link" }).click();
  const shareHref = await page.locator("a[href*='/review/']").first().getAttribute("href");
  await page.goto(shareHref);
  await page.getByLabel("Your name").fill("Outside Reviewer");
  await page.getByLabel("Comment").fill("Looks ready.");
  await page.getByRole("button", { name: "Add comment" }).click();
  await page.getByRole("button", { name: "Approve" }).click();
  const commented = await visible(page.getByText("Looks ready."));
  (commented && (await visible(page.getByText("Approved", { exact: true })))) ? pass("H7") : fail("H7");

  // H8 discovery / budget / learning
  await page.goto(`${BASE}/dashboard/discovery`);
  const d = await visible(page.getByRole("heading", { name: "Funding Discovery" }));
  await page.goto(`${BASE}/dashboard/budget`);
  const b = await visible(page.getByRole("heading", { name: "Budget Builder" }));
  await page.goto(`${BASE}/learning-center`);
  const l = await visible(page.getByRole("heading", { name: "Learning Center" }));
  d && b && l ? pass("H8") : fail("H8");

  // H9 mentor path
  await page.goto(`${BASE}/dashboard/mentor`);
  const mentorOk = await visible(page.getByRole("heading", { name: "Mentor Hub" }));
  await page.goto(`${BASE}/dashboard/mentor-session`);
  await page.getByLabel("Session notes").fill("Discussed Aim 2 power.");
  await page.goto(`${BASE}/dashboard/mentor-quality`);
  mentorOk && (await visible(page.getByRole("heading", { name: "Mentor quality review" })))
    ? pass("H9")
    : fail("H9");

  // H10 post-award demo
  await setSession(`raw.user.plan = "grantee_pro"; raw.user.accessState = "paid";`);
  await page.reload();
  await page.goto(`${BASE}/dashboard/post-award`);
  const demo = await visible(page.getByText("Demo data", { exact: true }));
  const nce = await visible(page.getByRole("link", { name: "No-Cost Extension" }));
  demo && nce ? pass("H10") : fail("H10");

  // H11 institutional
  await clear();
  await signInPreset("Invited by an institution");
  await page.goto(`${BASE}/dashboard/institutional`);
  (await visible(page.getByRole("heading", { name: "Research Office" }))) ? pass("H11") : fail("H11");

  // H12 T32
  await page.goto(`${BASE}/dashboard/t32pd/new`);
  await page.waitForSelector("form input");
  await page.locator("form input").first().fill("Verify T32");
  await page.getByRole("button", { name: "Create workspace" }).click();
  await page.waitForURL((url) => url.pathname === "/dashboard/t32pd", { timeout: 5000 }).catch(() => {});
  (await visible(page.getByRole("heading", { name: "T32 Program Director" }))) ? pass("H12") : fail("H12", page.url());

  // H13 founder CEO + equity
  await clear();
  await signInPreset("Founder");
  await page.waitForURL(/\/dashboard\/ceo/);
  await setSession(`raw.equityRequests = [{ id: "eq_test", email: "lmic@test.org", country: "Kenya", status: "pending" }];`);
  await page.reload();
  await page.getByRole("button", { name: "Approve" }).click();
  (await visible(page.getByText(/lmic@test.org · Kenya · Approved/))) ? pass("H13") : fail("H13");

  // H14 persona settings
  await clear();
  await signInPreset("Investigator plan");
  await page.goto(`${BASE}/settings`);
  const roleSelect = page.getByLabel("I am mainly a");
  const fellowshipLabel = await roleSelect.locator("option[value='fellowship']").textContent();
  await roleSelect.selectOption("fellowship");
  await page.goto(`${BASE}/dashboard`);
  (await visible(page.getByText(fellowshipLabel.trim(), { exact: true }))) ? pass("H14", fellowshipLabel) : fail("H14");

  // H15 pricing toggle (signed in)
  await page.goto(`${BASE}/pricing`);
  await page.getByRole("button", { name: "Annual" }).click();
  (await visible(page.getByText(/\/ year/))) ? pass("H15") : fail("H15");

  // Edge cases
  await clear();
  await page.goto(`${BASE}/dashboard`);
  (await visible(page.getByRole("heading", { name: /^Sign in to/ }))) ? pass("E1") : fail("E1");

  await signInPreset("Founder");
  await page.goto(`${BASE}/dashboard`);
  await page.waitForURL(/\/dashboard\/ceo/, { timeout: 5000 }).catch(() => {});
  page.url().includes("/dashboard/ceo") ? pass("E2") : fail("E2", page.url());

  await clear();
  await signInPreset("Trial expired");
  await page.goto(`${BASE}/dashboard`);
  (await visible(page.getByText("Your trial has ended"))) ? pass("E3") : fail("E3");

  await clear();
  await signInPreset("Researcher on a free trial");
  await page.goto(`${BASE}/dashboard`);
  (await visible(page.getByText(/Your free trial ends in \d+ days?/))) ? pass("E4") : fail("E4");

  await clear();
  await signInPreset("Trial just ended");
  await page.goto(`${BASE}/dashboard`);
  (await visible(page.getByText(/Select a plan to continue/))) ? pass("E5") : fail("E5");

  await clear();
  await signUpAndOnboard("No WS", "nows@equitas.demo");
  await page.goto(`${BASE}/dashboard/study-section`);
  await page.waitForTimeout(200);
  (await visible(page.getByText("Add a grant first"))) && (await visible(page.getByRole("link", { name: "Create workspace" })))
    ? pass("E6")
    : fail("E6", await page.locator("h1").textContent());

  await clear();
  await signInPreset("Investigator plan");
  await page.goto(`${BASE}/dashboard/study-section`);
  await page.getByRole("button", { name: "Run review" }).click();
  (await visible(page.getByText(/Paste draft text before you run/))) ? pass("E7") : fail("E7");

  await clear();
  await signInPreset("Researcher on the Free plan");
  await page.goto(`${BASE}/dashboard/reviewer-perspectives`);
  (await visible(page.getByText("Not on your plan"))) && (await visible(page.getByRole("link", { name: "Compare plans" })))
    ? pass("E8")
    : fail("E8");

  await setSession(`raw.user.chatUsedThisMonth = 999;`);
  await page.reload();
  await page.getByRole("button", { name: /First-Time Applicant Mentor/ }).first().click();
  await page.getByPlaceholder(/What would a reviewer question first/).fill("test");
  await page.getByRole("button", { name: "Send" }).click();
  (await visible(page.getByText(/You have used all \d+ conversations/))) ? pass("E9") : fail("E9");

  (await visible(page.getByText(/Voice is available on the Investigator plan/))) ? pass("E13") : fail("E13");

  await clear();
  await signInPreset("Investigator plan");
  await openFinalStage();
  await page.getByRole("button", { name: "Create expired link (test)" }).click();
  const expiredHref = await page.locator("a[href*='/review/']").first().getAttribute("href");
  await page.goto(expiredHref);
  (await visible(page.getByRole("heading", { name: "This link has expired" }))) ? pass("E10") : fail("E10");

  await page.goto(`${BASE}/review/not-a-real-token`);
  (await visible(page.getByRole("heading", { name: "This link does not work" }))) ? pass("E11") : fail("E11");

  await openFinalStage();
  await page.getByRole("button", { name: "Create share link" }).click();
  const changeHref = await page.locator("a[href*='/review/']").first().getAttribute("href");
  await page.goto(changeHref);
  await page.getByRole("button", { name: "Request changes" }).click();
  (await visible(page.getByText("Changes requested", { exact: true }))) ? pass("E12") : fail("E12");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE}/dashboard`);
  await page.getByRole("button", { name: "Menu" }).click();
  const mobileNav = await visible(page.locator("#mobile-nav").getByRole("link", { name: "All tools" }));
  const noOverflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  mobileNav && noOverflow ? pass("E14", "mobile menu opens, no horizontal scroll") : fail("E14", `nav=${mobileNav} overflow=${!noOverflow}`);
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto(`${BASE}/settings`);
  await page.getByLabel("Language").selectOption("العربية");
  const dir = await page.evaluate(() => document.documentElement.dir);
  dir === "rtl" ? pass("E15") : fail("E15", dir);
  await page.getByLabel("Language").selectOption("English");

  await page.goto(`${BASE}/live`);
  const liveBanner = await visible(page.getByText("Older standalone page", { exact: true }));
  await page.goto(`${BASE}/dashboard`);
  const noLiveNav = !(await visible(page.getByRole("link", { name: "Live" })));
  liveBanner && noLiveNav ? pass("E16") : fail("E16");

  await page.goto(`${BASE}/dashboard/mentor-matching`);
  await page.waitForURL(/\/dashboard\/mentor$/, { timeout: 5000 }).catch(() => {});
  page.url().endsWith("/dashboard/mentor") ? pass("E17") : fail("E17", page.url());

  await clear();
  await signInPreset("Researcher on a free trial");
  await page.goto(`${BASE}/pricing`);
  await page.getByLabel("Email", { exact: true }).fill("equity@test.org");
  await page.getByLabel("Country where you work").fill("Uganda");
  await page.getByRole("button", { name: "Request Equity Access" }).click();
  await page.goto(`${BASE}/sign-in`);
  await setSession(`raw.user = null;`);
  await signInPreset("Founder");
  await page.goto(`${BASE}/dashboard/ceo`);
  (await visible(page.getByText(/equity@test.org/))) ? pass("E18") : fail("E18");

  await clear();
  await signInPreset("Invited by an institution");
  await page.goto(`${BASE}/pricing`);
  (await visible(page.getByText(/institution covers your access/i))) ? pass("E19") : fail("E19");

  await clear();
  await signInPreset("Investigator plan");
  await setSession(`raw.user.plan = "grantee_pro";`);
  await page.reload();
  await page.goto(`${BASE}/dashboard/post-award`);
  const demoLabel = await visible(page.getByText("Demo data", { exact: true }));
  await page.goto(`${BASE}/dashboard/discovery`);
  const coming = await visible(page.getByText("Coming soon · sample results"));
  demoLabel && coming ? pass("E20") : fail("E20");

  // E21 return-to destination after sign in
  await clear();
  await page.goto(`${BASE}/dashboard/budget`);
  await page.waitForURL(/access-required/);
  const signInLink = page.locator("main a[href*='/sign-in?next=']").first();
  const hasNextLink = await visible(signInLink);
  await signInLink.click();
  await page.waitForURL(/\/sign-in\?next=/);
  await page.locator("details#demo summary").click();
  await page.getByRole("button", { name: /^Investigator plan/ }).click();
  await page.waitForTimeout(400);
  hasNextLink && page.url().endsWith("/dashboard/budget") ? pass("E21", "returned to Budget Builder") : fail("E21", page.url());

  await browser.close();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.filter((r) => r.ok).length}/${results.length} passed`);
  if (failed.length) {
    console.log("Failed:", failed.map((f) => f.id).join(", "));
    process.exitCode = 1;
  }

  // Write markdown for the agent to place in docs/
  const lines = [
    "# WAVE_FULL_VERIFY",
    "",
    `Date: ${new Date().toISOString().slice(0, 10)}`,
    `App: ${BASE}`,
    `Result: ${results.filter((r) => r.ok).length}/${results.length} passed`,
    "",
    "## Happy paths",
    "",
    "| ID | Result | Notes |",
    "|---|---|---|",
    ...results
      .filter((r) => r.id.startsWith("H"))
      .map((r) => `| ${r.id} | ${r.ok ? "PASS" : "FAIL"} | ${r.note} |`),
    "",
    "## Edge cases",
    "",
    "| ID | Result | Notes |",
    "|---|---|---|",
    ...results
      .filter((r) => r.id.startsWith("E"))
      .map((r) => `| ${r.id} | ${r.ok ? "PASS" : "FAIL"} | ${r.note} |`),
    "",
  ];
  const fs = await import("node:fs");
  const path = await import("node:path");
  const out = path.resolve(process.cwd(), "../docs/WAVE_FULL_VERIFY.md");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, lines.join("\n"));
  console.log("Wrote", out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
