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
