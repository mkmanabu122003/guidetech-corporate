// Pre-deploy checks for the published site.
//
//   node scripts/check-site.mjs
//
// Every rule here exists because the corresponding bug actually shipped:
// template placeholders reached production, internal links pointed at a
// non-canonical URL, an image reference outlived its file, titles ran past what
// a search result shows, and a stylesheet token was defined in two places.
//
// Exits non-zero on any failure so CI can block the deploy.

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const notes = [];

function fail(rule, detail) {
  failures.push({ rule, detail });
}

/* ------------------------------------------------------------------ */

const BLOCKED = new Set([
  "design-directions.html", "site-proposal.html", "studio-layout-proposal.html",
  "legacy-base-redesign.html", "legacy-inspired-proposal.html",
  "japan-partner-corporate-sample.html", "japan-partner-redesign-sample.html",
  "forms.html"
]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".html")) out.push(path.relative(root, full));
  }
  return out;
}

const pages = walk(path.join(root, "japan-partner"));
const rootPages = ["index.html", "company.html", "contact.html", "works.html", "thanks.html"]
  .filter((f) => fs.existsSync(path.join(root, f)));
const allPages = [...pages, ...rootPages].filter((f) => !BLOCKED.has(path.basename(f)));

const read = (f) => fs.readFileSync(path.join(root, f), "utf8");

/** Resolve a site-absolute URL to the file that serves it, or null. */
function resolveUrl(url) {
  const clean = url.split("#")[0].split("?")[0];
  if (!clean.startsWith("/")) return null;
  const rel = clean.slice(1);
  const candidates = clean.endsWith("/")
    ? [rel + "index.html"]
    : [rel, rel + ".html", rel + "/index.html"];
  return candidates.find((c) => c && fs.existsSync(path.join(root, c))) || null;
}

/* --- 1. no unrendered template placeholders --------------------------- */
for (const f of allPages) {
  const html = read(f);
  const hits = html.match(/\{\{[A-Z_]+\}\}|TODO:[^<]{0,80}/g);
  if (hits) fail("placeholder", `${f}: ${[...new Set(hits)].join(", ").slice(0, 120)}`);
}

/* --- 1b. no un-interpolated template expressions ---------------------- */
// A template literal that referenced a function instead of calling it shipped
// `${b}` into href attributes on a live page, and rule 2 missed it because the
// broken href did not start with a slash.
for (const f of allPages) {
  const hits = read(f).match(/\$\{[^}]{1,60}\}/g);
  if (hits) fail("uninterpolated-template", `${f}: ${[...new Set(hits)].slice(0, 4).join(", ")}`);
}

/* --- 2. internal links resolve, and are canonical (extensionless) ------ */
let linkCount = 0;
for (const f of allPages) {
  const html = read(f);
  for (const url of html.match(/(?:href|src)="\/[^"]*"/g) || []) {
    const value = url.slice(url.indexOf('"') + 1, -1);
    if (value.startsWith("//")) continue;
    linkCount += 1;
    if (!resolveUrl(value)) fail("broken-link", `${f} -> ${value}`);
    if (/^\/japan-partner\/.*\.html(#|$)/.test(value)) {
      fail("non-canonical-link", `${f} -> ${value} (should be extensionless)`);
    }
  }
}
notes.push(`${linkCount} internal links checked`);

/* --- 3. canonical present, extensionless, and self-resolving ---------- */
for (const f of pages) {
  const html = read(f);
  const m = html.match(/rel="canonical" href="https:\/\/guidetech\.jp([^"]*)"/);
  if (!m) { fail("canonical-missing", f); continue; }
  if (m[1].endsWith(".html")) fail("canonical-extension", `${f} -> ${m[1]}`);
  if (!resolveUrl(m[1])) fail("canonical-unresolvable", `${f} -> ${m[1]}`);
}

/* --- 4. title and description within search-result limits ------------- */
for (const f of pages) {
  const html = read(f);
  const t = html.match(/<title>([\s\S]*?)<\/title>/);
  const d = html.match(/<meta name="description" content="([^"]*)"/);
  if (!t) fail("title-missing", f);
  else if (t[1].length > 60) fail("title-too-long", `${f} (${t[1].length})`);
  if (!d) fail("description-missing", f);
  else if (d[1].length > 160 || d[1].length < 70) fail("description-length", `${f} (${d[1].length})`);
}

/* --- 5. every title is unique ----------------------------------------- */
const titles = new Map();
for (const f of pages) {
  const t = read(f).match(/<title>([\s\S]*?)<\/title>/);
  if (!t) continue;
  if (titles.has(t[1])) fail("duplicate-title", `${f} and ${titles.get(t[1])}`);
  else titles.set(t[1], f);
}

/* --- 6. JSON-LD parses ------------------------------------------------ */
let ldCount = 0;
for (const f of allPages) {
  for (const m of read(f).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    ldCount += 1;
    try { JSON.parse(m[1]); } catch (e) { fail("invalid-json-ld", `${f}: ${e.message}`); }
  }
}
notes.push(`${ldCount} JSON-LD blocks parsed`);

/* --- 7. no paragraph repeated across the blog ------------------------- */
const paras = new Map();
for (const f of pages.filter((p) => p.includes("/blog/"))) {
  for (const m of read(f).matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = m[1].replace(/<[^>]+>/g, "").trim();
    if (text.length < 150) continue;
    paras.set(text, (paras.get(text) || 0) + 1);
  }
}
for (const [text, n] of paras) {
  if (n > 1) fail("duplicate-paragraph", `x${n}: ${text.slice(0, 70)}...`);
}

/* --- 8. sitemap entries resolve and are extensionless ----------------- */
if (fs.existsSync(path.join(root, "sitemap.xml"))) {
  const urls = [...read("sitemap.xml").matchAll(/<loc>https:\/\/guidetech\.jp([^<]*)<\/loc>/g)].map((m) => m[1]);
  for (const u of urls) {
    if (u.endsWith(".html")) fail("sitemap-extension", u);
    if (!resolveUrl(u)) fail("sitemap-unresolvable", u);
  }
  notes.push(`${urls.length} sitemap URLs checked`);
} else fail("sitemap-missing", "sitemap.xml");

/* --- 9. design tokens defined exactly once ---------------------------- */
// Only the japan-partner section shares tokens; the Japanese corporate pages
// at the root are a separate design with their own palette.
const tokenDefs = [];
for (const f of [...pages, "assets/japan-partner/style.css", "assets/japan-partner/tokens.css"]) {
  if (!fs.existsSync(path.join(root, f))) continue;
  const n = (read(f).match(/:root\s*\{/g) || []).length;
  if (n) tokenDefs.push(`${f} (${n})`);
}
if (tokenDefs.length !== 1) {
  fail("token-definitions", `expected 1 :root block, found in ${tokenDefs.join(", ")}`);
}

/* --- 10. every page loads the token file ------------------------------ */
for (const f of pages) {
  if (!read(f).includes('href="/assets/japan-partner/tokens.css"')) {
    fail("tokens-not-loaded", f);
  }
}

/* ------------------------------------------------------------------ */

const grouped = new Map();
for (const { rule, detail } of failures) {
  if (!grouped.has(rule)) grouped.set(rule, []);
  grouped.get(rule).push(detail);
}

console.log(`Checked ${allPages.length} pages.`);
for (const n of notes) console.log(`  ${n}`);

if (!failures.length) {
  console.log("\nAll checks passed.");
  process.exit(0);
}

console.error(`\n${failures.length} failure(s):\n`);
for (const [rule, details] of grouped) {
  console.error(`  ${rule} (${details.length})`);
  for (const d of details.slice(0, 8)) console.error(`     ${d}`);
  if (details.length > 8) console.error(`     ...and ${details.length - 8} more`);
}
process.exit(1);
