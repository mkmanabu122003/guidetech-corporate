# guidetech.jp

Static site on Netlify, deployed from `main`.

## Local preview

Use `netlify dev`, not a plain static server.

```bash
netlify dev
```

Public URLs are extensionless (`/japan-partner/en/pricing`, not `pricing.html`).
Netlify resolves those to the `.html` file; `python -m http.server` does not, so
a plain static server returns 404 for every page and the redirects in
`_redirects` never run.

## Regenerating pages

```bash
node scripts/generate-sourcing-articles.mjs   # guides, blog indexes, sitemap, feed, _redirects
node scripts/apply-analytics.mjs              # GA4 + consent block into every page
node scripts/check-site.mjs                   # pre-deploy checks
```

`scripts/generate-japan-partner-pages.mjs` is the retired original generator and
refuses to run. It would overwrite newer pages with placeholder content.

## Where things live

| Concern | File |
|---|---|
| Analytics and Search Console IDs | `scripts/site-config.mjs` |
| Design tokens (the only `:root`) | `assets/japan-partner/tokens.css` |
| Service and guide page styles | `assets/japan-partner/style.css` |
| Homepage component styles | inline in `japan-partner/en/index.html` |
| Cookie consent banner | `assets/japan-partner/consent.js` |
| Guide content | `scripts/generate-sourcing-articles.mjs` |
| Not served publicly | `scripts/`, `docs/`, `image-src/` (404'd in `netlify.toml`) |

## Checks

`scripts/check-site.mjs` runs in CI on every push. Each rule exists because the
bug shipped once: template placeholders reaching production, internal links
pointing at non-canonical URLs, missing images, over-long titles, duplicated
paragraphs across the blog, and design tokens defined in two places.
