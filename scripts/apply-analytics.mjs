// Sweeps every published HTML page and rewrites the analytics block in <head>
// from scripts/site-config.mjs. Idempotent: run it as often as you like.
//
//   node scripts/apply-analytics.mjs
//
// It also removes the legacy artefacts that shipped to production:
//   - the unrendered {{GA4_ID}} gtag snippet (a broken network request)
//   - the "verification meta tag goes here" / "TODO: Add GA4" comments

import fs from "node:fs";
import path from "node:path";
import { analyticsBlock, ANALYTICS_START, ANALYTICS_END } from "./site-config.mjs";

const root = process.cwd();

// Published pages only. Design drafts and proposal mockups are excluded on
// purpose so we do not pollute analytics with internal previews.
const ROOT_PAGES = ["index.html", "company.html", "contact.html", "works.html", "thanks.html"];
const PAGE_DIRS = ["japan-partner"];

function collect() {
  const files = ROOT_PAGES.map((f) => path.join(root, f)).filter((f) => fs.existsSync(f));
  for (const dir of PAGE_DIRS) {
    const base = path.join(root, dir);
    if (!fs.existsSync(base)) continue;
    const walk = (d) => {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const full = path.join(d, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (entry.name.endsWith(".html")) files.push(full);
      }
    };
    walk(base);
  }
  return files;
}

const LEGACY_PATTERNS = [
  // Unrendered generator placeholder: script tag + the inline gtag config that follows it.
  /[ \t]*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\{\{GA4_ID\}\}"><\/script>\s*\n[ \t]*<script>[\s\S]*?<\/script>\s*\n/g,
  // Standalone placeholder script tag, in case the pair was already split.
  /[ \t]*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\{\{GA4_ID\}\}"><\/script>\s*\n/g,
  /[ \t]*<!-- Google Search Console verification meta tag goes here\. -->\s*\n/g,
  /[ \t]*<!-- TODO: Add GA4 snippet after the measurement ID is finalized\. -->\s*\n/g,
];

const blockRe = new RegExp(
  `[ \\t]*${ANALYTICS_START}[\\s\\S]*?${ANALYTICS_END}\\s*\\n`,
  "g"
);

const block = analyticsBlock();
let changed = 0;

for (const file of collect()) {
  const before = fs.readFileSync(file, "utf8");
  let html = before;

  for (const pattern of LEGACY_PATTERNS) html = html.replace(pattern, "");
  html = html.replace(blockRe, "");

  if (!html.includes("</head>")) {
    console.warn(`skip (no </head>): ${path.relative(root, file)}`);
    continue;
  }
  html = html.replace("</head>", `${block}\n</head>`);

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed += 1;
    console.log(`updated ${path.relative(root, file)}`);
  }
}

console.log(`\n${changed} file(s) updated.`);
