/**
 * UX audit across marketing (Next) and product app (Vite).
 * Crawls links, checks each page at three viewports, writes JSON + screenshots to ../.tmp/audit.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const MKT = process.env.MKT || "http://localhost:3003";
const APP = process.env.APP || "http://localhost:5173";
const OUT = path.resolve(process.cwd(), "../.tmp/audit");
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
];

const APP_ROUTES = [
  "/dashboard", "/dashboard/gsn/new", "/dashboard/gsn", "/dashboard/study-section", "/dashboard/opener",
  "/dashboard/equity", "/dashboard/gap-analysis", "/dashboard/reviewer-perspectives", "/dashboard/plans",
  "/my-profile", "/settings", "/dashboard/discovery", "/dashboard/budget", "/dashboard/pre-award",
  "/dashboard/summary-statement", "/dashboard/de-identification", "/learning-center", "/dashboard/trainee",
  "/dashboard/resubmission", "/dashboard/international", "/dashboard/mentor", "/dashboard/mentor-session",
  "/dashboard/mentor-quality", "/dashboard/k-award", "/dashboard/post-award", "/dashboard/nce",
  "/dashboard/rppr", "/dashboard/tracker", "/dashboard/portfolio-strategy", "/dashboard/subaward",
  "/dashboard/compliance", "/dashboard/institutional", "/dashboard/dept-chair",
  "/dashboard/institutional/workflows", "/dashboard/t32pd", "/dashboard/t32pd/new",
];
const APP_PUBLIC = ["/", "/sign-in", "/sign-up", "/access-required", "/pricing", "/pilot", "/review/bad-token"];

async function inspect(page) {
  return page.evaluate(() => {
    const issues = [];
    const doc = document.documentElement;
    if (doc.scrollWidth > window.innerWidth + 1) {
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
        .slice(0, 3)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      issues.push({ type: "overflow-x", detail: `${doc.scrollWidth}px > ${window.innerWidth}px`, wide });
    }
    for (const el of document.querySelectorAll("input, select, textarea")) {
      if (el.type === "hidden" || el.type === "checkbox" || el.type === "radio" || el.type === "range" || el.type === "file") continue;
      const id = el.id;
      const labelled =
        el.getAttribute("aria-label") ||
        el.getAttribute("aria-labelledby") ||
        el.closest("label") ||
        (id && document.querySelector(`label[for="${id}"]`));
      if (!labelled) issues.push({ type: "no-label", detail: el.outerHTML.slice(0, 120) });
      if ((el.tagName === "INPUT" || el.tagName === "TEXTAREA") && !el.placeholder)
        issues.push({ type: "no-placeholder", detail: el.outerHTML.slice(0, 120) });
    }
    for (const el of document.querySelectorAll("a, button")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const text = (el.innerText || el.getAttribute("aria-label") || "").trim();
      if (!text) issues.push({ type: "empty-control", detail: el.outerHTML.slice(0, 120) });
      const cs = getComputedStyle(el);
      if (cs.color === cs.backgroundColor && text)
        issues.push({ type: "invisible-text", detail: `${text} ${cs.color}` });
      if (r.height < 24 && el.tagName === "BUTTON")
        issues.push({ type: "small-target", detail: `${text} ${Math.round(r.height)}px` });
    }
    for (const img of document.querySelectorAll("img")) if (!img.hasAttribute("alt")) issues.push({ type: "img-no-alt", detail: img.src });
    if (!document.querySelector("h1")) issues.push({ type: "no-h1", detail: "" });
    if (document.querySelectorAll("h1").length > 1) issues.push({ type: "multi-h1", detail: document.querySelectorAll("h1").length });
    const bodyText = document.body.innerText;
    if (bodyText.includes("—")) issues.push({ type: "em-dash", detail: bodyText.slice(bodyText.indexOf("—") - 40, bodyText.indexOf("—") + 20) });
    const title = document.title;
    return { issues, title, h1: document.querySelector("h1")?.innerText ?? "" };
  });
}

async function crawlMarketing(page) {
  const seen = new Set();
  const queue = ["/"];
  const pages = [];
  while (queue.length && seen.size < 60) {
    const p = queue.shift();
    if (seen.has(p)) continue;
    seen.add(p);
    const res = await page.goto(MKT + p, { waitUntil: "domcontentloaded" }).catch(() => null);
    const status = res?.status() ?? 0;
    const finalUrl = page.url();
    pages.push({ path: p, status, finalUrl });
    if (!finalUrl.startsWith(MKT)) continue;
    const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
    for (const h of links) {
      if (!h || h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:")) continue;
      if (h.startsWith("http")) continue;
      const clean = h.split("#")[0].split("?")[0];
      if (clean && !seen.has(clean)) queue.push(clean);
    }
  }
  return pages;
}

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push({ url: page.url(), text: m.text().slice(0, 200) }));
  page.on("pageerror", (e) => consoleErrors.push({ url: page.url(), text: String(e).slice(0, 200) }));

  const report = { marketing: [], app: [], consoleErrors };

  const mktPages = await crawlMarketing(page);
  const externalLinks = new Set();
  for (const mp of mktPages) {
    if (!mp.finalUrl.startsWith(MKT)) {
      report.marketing.push({ ...mp, note: "redirects to app" });
      continue;
    }
    for (const vp of VIEWPORTS) {
      await page.setViewportSize(vp);
      await page.goto(MKT + mp.path, { waitUntil: "networkidle" }).catch(() => {});
      const r = await inspect(page);
      const ext = await page.$$eval("a[href^='http']", (as) => as.map((a) => a.href));
      ext.forEach((e) => externalLinks.add(e));
      report.marketing.push({ path: mp.path, status: mp.status, vp: vp.name, ...r });
      if (["/", "/pricing", "/researchers"].includes(mp.path))
        await page.screenshot({ path: `${OUT}/mkt${mp.path.replace(/\//g, "_") || "_home"}-${vp.name}.png`, fullPage: false });
    }
  }
  report.externalLinks = [...externalLinks];

  for (const p of APP_PUBLIC) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize(vp);
      await page.goto(APP + p, { waitUntil: "networkidle" });
      const r = await inspect(page);
      report.app.push({ path: p, vp: vp.name, signedIn: false, ...r });
      if (["/sign-in", "/sign-up"].includes(p))
        await page.screenshot({ path: `${OUT}/app${p.replace(/\//g, "_")}-${vp.name}.png` });
    }
  }

  await page.setViewportSize(VIEWPORTS[2]);
  await page.goto(APP + "/sign-in");
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(APP + "/sign-in#demo");
  await page.getByRole("button", { name: /^Investigator plan/ }).click();
  await page.waitForURL(/dashboard/);
  // extend trial so banners do not dominate
  await page.evaluate(() => {
    const raw = JSON.parse(sessionStorage.getItem("equitas-app-session-v1"));
    raw.user.plan = "grantee_pro";
    raw.user.accessState = "paid";
    raw.user.trialEndsAt = null;
    sessionStorage.setItem("equitas-app-session-v1", JSON.stringify(raw));
  });

  for (const p of APP_ROUTES) {
    for (const vp of VIEWPORTS) {
      await page.setViewportSize(vp);
      await page.goto(APP + p, { waitUntil: "networkidle" });
      const r = await inspect(page);
      report.app.push({ path: p, vp: vp.name, signedIn: true, finalUrl: page.url(), ...r });
      if (["/dashboard", "/dashboard/gsn", "/dashboard/reviewer-perspectives", "/dashboard/study-section"].includes(p))
        await page.screenshot({ path: `${OUT}/app${p.replace(/\//g, "_")}-${vp.name}.png` });
    }
  }

  await browser.close();
  fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 2));

  const summarize = (rows) => {
    const by = {};
    for (const row of rows) for (const i of row.issues ?? []) {
      const k = i.type;
      by[k] ??= new Set();
      by[k].add(`${row.path} [${row.vp}] ${typeof i.detail === "string" ? i.detail.slice(0, 90) : i.detail}${i.wide ? " ← " + i.wide.join(", ") : ""}`);
    }
    return Object.fromEntries(Object.entries(by).map(([k, v]) => [k, [...v]]));
  };
  console.log("MARKETING pages:", mktPages.length, "non-200:", mktPages.filter((p) => p.status >= 400).map((p) => `${p.path} ${p.status}`));
  console.log(JSON.stringify(summarize(report.marketing), null, 1));
  console.log("APP");
  console.log(JSON.stringify(summarize(report.app), null, 1));
  console.log("CONSOLE ERRORS", JSON.stringify([...new Map(consoleErrors.map((e) => [e.text, e])).values()].slice(0, 20), null, 1));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
