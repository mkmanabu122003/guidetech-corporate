// Single source of truth for site-wide identifiers.
//
// To connect Google Analytics 4 and Google Search Console:
//   1. Fill in ga4Id and/or gscToken below.
//   2. Run: node scripts/apply-analytics.mjs
//   3. Commit and deploy.
//
// Leaving a value empty is safe: the corresponding tag is simply not emitted.
// Never leave a template placeholder such as {{GA4_ID}} in a live page — it
// produces a broken request to googletagmanager.com on every page view.

export const site = "https://guidetech.jp";
export const serviceName = "GuideTech Japan Partner";
export const today = "2026-08-09";

// GA4 measurement ID, e.g. "G-XXXXXXXXXX". Empty = no analytics emitted.
export const ga4Id = "G-3S3JEC00N4";

// Google Search Console HTML-tag verification value: the `content` attribute
// of the meta tag Search Console shows you, NOT the whole tag.
//
// Intentionally empty: guidetech.jp is verified as a Search Console *domain
// property* via the DNS TXT record on the apex, so no meta tag is required.
// Only fill this in if you switch to URL-prefix verification.
export const gscToken = "";

// Optional: Google Tag Manager container, e.g. "GTM-XXXXXXX".
// If set, GTM is emitted instead of the direct gtag snippet.
export const gtmId = "";

export const ANALYTICS_START = "<!-- analytics:start -->";
export const ANALYTICS_END = "<!-- analytics:end -->";

/** Returns the marker-wrapped analytics block for injection into <head>. */
export function analyticsBlock({ indent = "  " } = {}) {
  const lines = [ANALYTICS_START];

  if (gscToken) {
    lines.push(`<meta name="google-site-verification" content="${gscToken}">`);
  }

  // Consent Mode v2. Analytics storage starts denied so no cookie is written
  // before the visitor chooses; the banner script grants it on accept. Google
  // still receives cookieless pings, which keeps modelled data available.
  const consentDefaults = [
    "<script>",
    "  window.dataLayer = window.dataLayer || [];",
    "  function gtag(){dataLayer.push(arguments);}",
    "  (function(){",
    "    var stored = null;",
    "    try { stored = localStorage.getItem('gt-consent'); } catch (e) {}",
    "    gtag('consent', 'default', {",
    "      ad_storage: 'denied',",
    "      ad_user_data: 'denied',",
    "      ad_personalization: 'denied',",
    "      analytics_storage: stored === 'granted' ? 'granted' : 'denied',",
    "      wait_for_update: 500",
    "    });",
    "  })();",
    "</script>"
  ];

  if (gtmId) {
    lines.push(
      `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');</script>`
    );
  } else if (ga4Id) {
    lines.push(...consentDefaults);
    lines.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>`);
    lines.push("<script>");
    lines.push("  gtag('js', new Date());");
    lines.push(`  gtag('config', '${ga4Id}');`);
    lines.push("</script>");
    lines.push('<script defer src="/assets/japan-partner/consent.js"></script>');
  }

  if (lines.length === 1) {
    lines.push("<!-- No analytics configured. Set ga4Id / gscToken in scripts/site-config.mjs. -->");
  }

  lines.push(ANALYTICS_END);
  return lines.map((line) => indent + line).join("\n");
}

/* ------------------------------------------------------------------ *
 * Author and entry offer
 *
 * These three blanks are the highest-leverage items on the site and each
 * needs a real value from you rather than a guess from a generator.
 * Filling one in and re-running the generators publishes it everywhere.
 * ------------------------------------------------------------------ */

/**
 * The named person behind the guides. An anonymous "team" byline costs you on
 * three fronts at once: E-E-A-T, AI citation, and a visitor deciding whether to
 * trust someone in Japan to verify a supplier for them.
 *
 * Leave `name` empty and the site keeps the current organisation byline.
 */
export const author = {
  name: "",            // e.g. "Manabu Kawahara"
  role: "",            // e.g. "Founder, GuideTech"
  bio: "",             // 1-2 sentences: what you have actually done in Japan, in specifics
  photo: "",           // e.g. "/assets/japan-partner/images/author.webp" — a real photo, not AI
  linkedin: "",        // profile URL, used in sameAs so the entity resolves off-site
  languages: ["Japanese", "English"]
};

/**
 * Fixed-price entry offer. "Book a free call" asks a cold overseas visitor for
 * time before they know anything about you; a defined deliverable at a
 * published price converts organic traffic and qualifies the lead in one step.
 *
 * Leave `price` empty and the page stays quote-based.
 */
export const entryOffer = {
  enabled: false,
  name: "Supplier Verification Report",
  price: "",           // e.g. "US$450" or "¥60,000"
  turnaround: "",      // e.g. "5 business days"
  scope: [
    "Corporate number and registered address checked against the National Tax Agency register",
    "Commercial register extract obtained and read, with capital, incorporation date and directors",
    "Category licences confirmed where they apply",
    "Public red flags: bankruptcy notices, address and name history, domain age",
    "A written recommendation: proceed, proceed with staged payment, or walk away"
  ],
  excludes: [
    "A credit report, which we can obtain separately at cost",
    "A site visit, quoted separately",
    "Any judgement about product quality"
  ]
};
