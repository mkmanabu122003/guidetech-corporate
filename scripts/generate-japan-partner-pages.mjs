import fs from "node:fs";
import path from "node:path";

const site = "https://guidetech.jp";
const serviceName = "GuideTech Japan Partner";
const brandToken = "{{JAPAN_PARTNER_SERVICE_NAME}}";
const ga4 = "{{GA4_ID}}";
const root = process.cwd();
const today = "2026-08-08";

const enPosts = [
  {
    slug: "japanese-translation-services-pricing-guide",
    kw: "japanese translation services price",
    title: "Japanese Translation Services Price Guide for Software Teams",
    description: "A practical guide to Japanese translation services price ranges, localization costs, and when software teams should budget beyond word rates.",
    lead: "Japanese translation services price pages often make translation look simple: multiply a word count by a rate and wait for delivery. For software companies entering Japan, that view misses the expensive parts. UI strings need context, help centers need tone decisions, invoices need local terms, and launch teams need someone who understands both product operations and Japanese business expectations.",
    cta: "/japan-partner/en/pricing.html",
    ctaText: "See pricing structure",
    headings: [
      ["What pricing usually includes", "A basic per-word quote normally covers translation of supplied text, one pass of editing, and light project management. It usually does not include product walkthroughs, string-context review, QA inside the interface, glossary governance, screenshots, customer support macros, or operational decisions such as how to describe invoices, tax registration, payment timing, and cancellation language in Japanese. Those gaps matter because Japanese buyers notice both language and process."],
      ["Typical cost ranges", "For general business text, English-to-Japanese professional translation is often quoted per source word. Software localization usually moves to project pricing because UI testing, terminology, and layout checks create work that is not visible in a spreadsheet. A serious launch budget should separate document translation, website localization, in-product localization, support material, and post-launch updates. The placeholder rates on our pricing page should be replaced before publication."],
      ["Why software costs more than documents", "A product string rarely explains itself. A button label may need to fit a narrow mobile width, match a workflow state, and avoid sounding abrupt. A permission prompt may need formal but not legalistic Japanese. A billing screen may require words that Japanese accounting teams recognize. This is why software localization in Japan is not just translation. It is product adaptation under local constraints."],
      ["How to compare vendors", "Ask whether the team reviews UI context, whether they can work with string files, whether they maintain a glossary, whether they understand SaaS billing, and whether they can stay after launch. A low word rate can be useful for simple documents, but it becomes expensive if your team spends weeks rewriting Japanese in the interface."],
      ["Budgeting for the first 90 days", "A practical first budget covers landing pages, core app flows, sales decks, help center articles, support macros, and legal-commercial pages that Japanese buyers expect to see. After launch, reserve budget for support language, product changes, customer questions, and sales enablement. The best model is not a one-time translation burst. It is a working localization system."]
    ],
    faq: [
      ["What is a normal Japanese translation services price?", "It depends on subject matter, turnaround, review depth, and whether the work is plain text or software localization. Replace the pricing placeholders before publishing final rates."],
      ["Is per-word pricing enough for SaaS?", "Per-word pricing can work for documents. For product UI and launch operations, project or monthly pricing is usually more realistic."],
      ["Should we translate before product-market validation?", "Translate only the surfaces needed to test demand, sales calls, support, and onboarding. Then expand based on evidence."]
    ]
  },
  {
    slug: "software-localization-japan-guide",
    kw: "software localization japan",
    title: "Software Localization Japan Guide for AI and SaaS Companies",
    description: "A practical software localization Japan guide covering UI, honorific tone, local formats, LINE, payments, invoices, support, and launch readiness.",
    lead: "Software localization Japan projects fail when teams treat Japanese as a final content layer. The product may be translated, but the experience still feels foreign: button labels overflow, support macros sound cold, dates and names appear in unfamiliar order, and billing language does not match how Japanese companies buy software.",
    cta: "/japan-partner/en/localization.html",
    ctaText: "Explore localization service",
    headings: [
      ["Start with product context", "The translator needs to know who is using the product, what state the user is in, and what action the interface expects. Japanese can be compact in some places and longer in others. Without screenshots, role definitions, and flow context, even accurate text can damage usability."],
      ["Design honorific tone deliberately", "Japanese business language has levels. Too casual can feel careless. Too formal can make a modern AI product feel slow and distant. The right tone depends on whether the screen is onboarding, error recovery, analytics, billing, support, or administration. A product glossary should define tone as well as terminology."],
      ["Local formats are product details", "Dates, postal codes, addresses, personal names, company names, currency, tax labels, and phone fields affect trust. Japanese users expect fields to behave in familiar ways. A checkout screen that ignores local formats can feel unready even when the core product is strong."],
      ["LINE, payments, and invoices", "Japan has channel expectations that may not appear in an English product roadmap. LINE is often part of customer communication. Bank transfer and invoice workflows remain important in B2B. The invoice system and qualified invoice registration topics should be represented carefully in billing and support language."],
      ["QA inside the interface", "String review in a spreadsheet is not enough. The team should inspect screens, empty states, navigation, validation errors, email templates, and help center paths. Screenshots and short recordings accelerate review because the issue is often layout, state, or tone rather than vocabulary."]
    ],
    faq: [
      ["What is software localization for Japan?", "It is the adaptation of product language, UI behavior, formats, support, and launch operations for Japanese business users."],
      ["Do we need LINE integration?", "Not always. But the decision should be made consciously based on customer segment and support model."],
      ["Can we start with the website only?", "Yes, if the goal is demand testing. For paid pilots, support and billing surfaces usually need localization too."]
    ]
  },
  {
    slug: "japanese-translation-agency-vs-localization-partner",
    kw: "japanese translation agency",
    title: "Japanese Translation Agency vs Localization Partner",
    description: "How a Japanese translation agency differs from a localization partner for AI and SaaS companies launching in Japan.",
    lead: "A Japanese translation agency can be the right choice when you need accurate text delivered quickly. But a software company entering Japan often needs more than text. It needs someone to interpret product context, adapt sales and support flows, and stay available after the first launch.",
    cta: "/japan-partner/en/",
    ctaText: "See the Japan localization offer",
    headings: [
      ["What agencies do well", "Agencies are useful for defined documents, controlled schedules, and high-volume text. They can coordinate translators, editors, and terminology. For manuals, policies, marketing pages, and one-time collateral, that structure can work well."],
      ["Where the model breaks for products", "Software localization requires decisions agencies may not be authorized to make. Should this error message apologize? Should this feature name stay English? Should the onboarding sequence mention a Japanese workflow? Should the billing label match accounting language or product language? These questions sit between translation, product, sales, and operations."],
      ["What a localization partner adds", "A partner works closer to the product team. They ask for screenshots, review flows, maintain a glossary, inspect UI fit, suggest support macros, and help prioritize launch surfaces. They do not pretend translation alone creates market readiness."],
      ["Why post-launch support matters", "After the first release, customers ask questions your glossary did not anticipate. Sales teams discover objections. Support tickets reveal confusing wording. Product changes create new strings. If the localization team disappears after delivery, your Japanese experience starts drifting immediately."],
      ["Choosing the right model", "Use an agency for controlled text work. Use a localization partner when Japan is a market entry project, not a content task. Many companies need both over time, but the early launch stage benefits from product-aware ownership."]
    ],
    faq: [
      ["Is GuideTech a translation agency?", "No. GuideTech positions this offer as product-aware localization and Japan launch support operated by a Tokyo-based team."],
      ["Can an agency localize software?", "Some can, but you should verify UI review, product context, and post-launch support before assuming fit."],
      ["What should we localize first?", "Usually the website, sales deck, core onboarding, billing pages, support macros, and the product flows needed for pilot customers."]
    ]
  },
  {
    slug: "doing-business-in-japan-for-software-companies",
    kw: "doing business in japan",
    title: "Doing Business in Japan for Software Companies",
    description: "A first-90-days guide to doing business in Japan for overseas AI and SaaS companies without a local office.",
    lead: "Doing business in Japan as a software company is not only a market research exercise. Buyers evaluate trust, continuity, support, procurement, billing, local language, and whether your team understands how implementation actually happens inside Japanese organizations.",
    cta: "/japan-partner/en/launch-partner.html",
    ctaText: "Explore launch partner support",
    headings: [
      ["The first question is trust", "Japanese companies often want to know who will answer questions, how long support will continue, whether invoices will be understandable, and whether implementation training can happen in Japanese. A strong product still needs a local operating surface."],
      ["Localize the buying process", "Sales pages are only one part of the journey. Procurement language, security explanations, invoice details, cancellation terms, and onboarding documents can slow deals if they feel imported without context. Localizing the buying process reduces friction before legal review begins."],
      ["Plan the first 90 days", "The first month should focus on scope, priority surfaces, glossary, and buyer-facing materials. The second month should support pilot conversations and product QA. The third month should refine support, billing, sales objections, and training based on real conversations."],
      ["AI implementation needs local practice", "For AI products, Japanese customers often need help translating use cases into workflows, prompts, approvals, and training. A launch partner should be able to explain the product in Japanese and help the buyer apply it inside daily work."],
      ["Do not overbuild before evidence", "A full Japan operation is expensive. Start with the surfaces needed to sell, support, invoice, and learn. Then add deeper localization, partner channels, events, and local hiring when the signal is clear."]
    ],
    faq: [
      ["Do we need a Japan office first?", "Not necessarily. Many teams can test demand with a local operating partner before committing to an entity or office."],
      ["What should happen in the first 90 days?", "Prioritize localized sales surfaces, pilot support, buyer Q&A, billing readiness, and feedback loops into product."],
      ["Can localization support AI implementation?", "Yes. For AI tools, localization should include training language, workflow examples, and support for internal adoption."]
    ]
  }
];

const esPosts = [
  {
    slug: "traduccion-japones-servicios-precios",
    kw: "precio servicios traducción japonés",
    title: "Precio de Servicios de Traducción al Japonés para Software",
    description: "Guía práctica sobre precios de traducción al japonés, costes de localización y presupuestos para empresas SaaS que entran en Japón.",
    lead: "El precio de servicios de traducción al japonés no debería calcularse solo por palabra cuando una empresa de software quiere vender en Japón. La interfaz, el tono profesional, la facturación, el soporte y los materiales comerciales necesitan contexto de producto y conocimiento operativo local.",
    cta: "/japan-partner/en/pricing.html",
    ctaText: "Ver estructura de precios",
    headings: [
      ["Qué suele incluir una tarifa por palabra", "Una tarifa básica puede cubrir traducción, edición y gestión mínima. Para una empresa SaaS, eso deja fuera revisión de interfaz, glosario, pruebas visuales, macros de soporte, páginas de facturación y adaptación del proceso de compra japonés."],
      ["Por qué la localización cuesta más", "Una cadena de producto no es una frase aislada. Puede aparecer en móvil, en un error, en una pantalla de pago o en una configuración administrativa. Cada contexto cambia el tono y la longitud posible."],
      ["Presupuesto para entrada en Japón", "Separar traducción documental, localización web, localización de producto, soporte y trabajo mensual ayuda a evitar sorpresas. Los precios finales deben sustituir los placeholders antes de publicar la página de precios."],
      ["Cómo comparar proveedores", "Pregunte si revisan capturas, si entienden flujos SaaS, si pueden trabajar con archivos de strings y si siguen después del lanzamiento. La tarifa baja puede salir cara si el equipo interno debe corregir todo."],
      ["Un modelo práctico", "Empiece por las superficies que generan confianza: página principal, flujo de onboarding, ventas, soporte, facturación y documentación de piloto. Después amplíe con aprendizaje real del mercado."]
    ],
    faq: [
      ["¿Cuánto cuesta traducir al japonés?", "Depende del contenido, contexto, revisión y si incluye localización de software."],
      ["¿Sirve una tarifa por palabra para SaaS?", "Sirve para documentos simples. Para producto y lanzamiento, un proyecto o modelo mensual suele ser mejor."],
      ["¿Qué traducir primero?", "Las superficies necesarias para vender, incorporar usuarios, responder soporte y facturar."]
    ]
  },
  {
    slug: "localizacion-software-japon",
    kw: "localización de software en Japón",
    title: "Localización de Software en Japón para Empresas SaaS",
    description: "Guía de localización de software en Japón: interfaz, tono, formatos, LINE, pagos, facturas y soporte.",
    lead: "La localización de software en Japón no consiste en traducir una lista de textos. Un producto puede estar en japonés y aun así parecer extranjero si los botones no caben, el tono no encaja, las fechas resultan raras o el proceso de facturación no transmite confianza.",
    cta: "/japan-partner/en/localization.html",
    ctaText: "Ver servicio de localización",
    headings: [
      ["Contexto antes que palabras", "El equipo de localización debe conocer usuario, pantalla, acción esperada y estado del flujo. Sin capturas ni explicación de producto, una traducción correcta puede ser mala experiencia."],
      ["Tono profesional japonés", "El japonés empresarial necesita niveles de formalidad. Un tono demasiado casual puede parecer descuidado; uno demasiado formal puede hacer lento un producto moderno. La decisión debe estar en el glosario."],
      ["Formatos locales", "Fechas, nombres, direcciones, códigos postales, moneda, impuestos y teléfonos son detalles de producto. En Japón, estos detalles influyen en la confianza."],
      ["LINE, pagos y facturación", "Para B2B, la transferencia bancaria, las facturas y ciertas expectativas de comunicación siguen siendo importantes. No todos necesitan LINE, pero la decisión debe ser consciente."],
      ["Pruebas dentro de la interfaz", "Revisar una hoja de cálculo no basta. Hay que ver errores, estados vacíos, menús, emails y ayuda dentro del flujo real."]
    ],
    faq: [
      ["¿Qué es localizar software para Japón?", "Adaptar lenguaje, UI, formatos, soporte y operación al uso japonés."],
      ["¿Siempre hace falta LINE?", "No siempre. Depende del segmento y del modelo de soporte."],
      ["¿Puedo empezar solo con la web?", "Sí, si el objetivo es validar demanda antes de localizar todo el producto."]
    ]
  },
  {
    slug: "agencia-traduccion-japones-vs-partner-localizacion",
    kw: "agencia de traducción japonés",
    title: "Agencia de Traducción Japonés vs Partner de Localización",
    description: "Diferencias entre una agencia de traducción al japonés y un partner de localización para lanzar software en Japón.",
    lead: "Una agencia de traducción japonés puede ser útil para documentos definidos. Pero una empresa de software que entra en Japón suele necesitar un partner que entienda producto, ventas, soporte y operación local después del lanzamiento.",
    cta: "/japan-partner/en/",
    ctaText: "Ver oferta de lanzamiento en Japón",
    headings: [
      ["Lo que una agencia hace bien", "Las agencias funcionan bien con documentos cerrados, volumen alto y plazos claros. Pueden coordinar traductores, editores y glosarios."],
      ["Dónde aparece el problema", "En software, muchas decisiones no son solo lingüísticas: tono de errores, nombres de funciones, facturación, soporte, onboarding y confianza comercial."],
      ["Qué aporta un partner", "Un partner pide capturas, revisa flujos, mantiene glosario, prueba interfaz y conecta lenguaje con venta y soporte."],
      ["La importancia del post-lanzamiento", "Después de publicar aparecen tickets, objeciones comerciales y nuevas cadenas de producto. Si el equipo desaparece, la experiencia japonesa se deteriora."],
      ["Cómo elegir", "Use agencia para texto controlado. Use partner cuando Japón sea una entrada de mercado, no solo un encargo de contenido."]
    ],
    faq: [
      ["¿GuideTech es una agencia?", "La oferta se plantea como localización orientada a producto y apoyo de lanzamiento en Japón."],
      ["¿Una agencia puede localizar software?", "Algunas sí, pero hay que verificar revisión de UI, contexto de producto y soporte posterior."],
      ["¿Qué modelo conviene al inicio?", "Un modelo práctico que cubra venta, producto, soporte y facturación."]
    ]
  },
  {
    slug: "hacer-negocios-en-japon-empresas-software",
    kw: "hacer negocios en Japón",
    title: "Hacer Negocios en Japón para Empresas de Software",
    description: "Guía de los primeros 90 días para empresas de software y AI que quieren hacer negocios en Japón sin oficina local.",
    lead: "Hacer negocios en Japón como empresa de software exige más que traducir una web. Los compradores evalúan confianza, continuidad, soporte, facturación, implementación y si existe alguien capaz de explicar el producto en japonés operativo.",
    cta: "/japan-partner/en/launch-partner.html",
    ctaText: "Ver apoyo de lanzamiento",
    headings: [
      ["La confianza es el primer producto", "El comprador quiere saber quién responde, cómo se factura, si habrá soporte y si la implementación puede explicarse en japonés."],
      ["Localizar el proceso de compra", "Ventas, seguridad, facturación, cancelación y onboarding deben sentirse preparados para Japón, no importados de otro mercado."],
      ["Primeros 90 días", "Mes uno: alcance, glosario y materiales. Mes dos: pilotos y QA. Mes tres: soporte, facturación y feedback de clientes reales."],
      ["AI necesita implementación local", "Las herramientas de AI requieren ejemplos, formación, prompts, flujos internos y aprobación. La localización debe cubrir adopción, no solo texto."],
      ["No sobredimensionar antes de validar", "Antes de abrir oficina, conviene vender, apoyar, facturar y aprender con una superficie local mínima pero creíble."]
    ],
    faq: [
      ["¿Necesito oficina en Japón?", "No siempre. Puede validar demanda con apoyo operativo local."],
      ["¿Qué priorizar?", "Venta, soporte, facturación, onboarding y aprendizaje de pilotos."],
      ["¿La localización ayuda a vender AI?", "Sí, si incluye casos de uso, formación y adaptación a flujos internos japoneses."]
    ]
  }
];

const enToEsSlug = new Map(enPosts.map((post, index) => [post.slug, esPosts[index].slug]));
const esToEnSlug = new Map(esPosts.map((post, index) => [post.slug, enPosts[index].slug]));

function rel(file) {
  const dir = path.dirname(file);
  const depth = dir === "." ? 0 : dir.split(path.sep).length;
  return depth === 0 ? "" : "../".repeat(depth);
}

function mkdirFor(file) {
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
}

function write(file, html) {
  mkdirFor(file);
  fs.writeFileSync(path.join(root, file), html);
}

function json(data) {
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

function ld(schemas) {
  return schemas.map((schema) => `<script type="application/ld+json">${json(schema)}</script>`).join("\n");
}

function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site}${item.url}`
    }))
  };
}

function org() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GuideTech",
    url: "https://guidetech.jp",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Shibuya-ku",
      addressRegion: "Tokyo",
      addressCountry: "JP"
    }
  };
}

function service(url, name, description) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "Organization", name: "GuideTech", url: "https://guidetech.jp" },
    areaServed: "Japan",
    serviceType: "Japan local partner services, localization, and launch support",
    url: `${site}${url}`
  };
}

function faqSchema(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a }
    }))
  };
}

function articleSchema(post, url, lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: lang === "es" ? "GuideTech Japan Partner team" : "GuideTech Japan Partner team" },
    publisher: { "@type": "Organization", name: "GuideTech" },
    datePublished: today,
    dateModified: today,
    mainEntityOfPage: `${site}${url}`
  };
}

function head({ file, lang = "en", title, description, canonical, hreflang = true, schemas = [] }) {
  const r = rel(file);
  let altBase = "/japan-partner/";
  let enAlt = canonical.replace("/japan-partner/es/", "/japan-partner/en/");
  let esAlt = canonical.replace("/japan-partner/en/", "/japan-partner/es/");
  const enArticle = canonical.match(/^\/japan-partner\/en\/blog\/(.+)\.html$/);
  const esArticle = canonical.match(/^\/japan-partner\/es\/blog\/(.+)\.html$/);
  if (enArticle && enToEsSlug.has(enArticle[1])) {
    esAlt = `/japan-partner/es/blog/${enToEsSlug.get(enArticle[1])}.html`;
  }
  if (esArticle && esToEnSlug.has(esArticle[1])) {
    enAlt = `/japan-partner/en/blog/${esToEnSlug.get(esArticle[1])}.html`;
  }
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${site}${canonical}">
  ${hreflang ? `<link rel="alternate" hreflang="en" href="${site}${enAlt}">
  <link rel="alternate" hreflang="es" href="${site}${esAlt}">
  <link rel="alternate" hreflang="x-default" href="${site}${altBase}">` : ""}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${site}${canonical}">
  <meta property="og:image" content="${site}/assets/japan-partner/images/og-default.webp">
  <meta name="twitter:card" content="summary_large_image">
  <!-- Google Search Console verification meta tag goes here. -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${ga4}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${ga4}');
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${r}assets/japan-partner/style.css">
  ${ld(schemas)}
</head>`;
}

function header(lang = "en", current = "") {
  const prefix = `/japan-partner/${lang}`;
  const labels = lang === "es"
    ? { services: "Servicios", pricing: "Precios", work: "Experiencia", blog: "Blog", about: "About", contact: "Contacto", loc: "Localización", sourcing: "Proveedores", launch: "Partner Japón" }
    : { services: "Services", pricing: "Pricing", work: "Work", blog: "Blog", about: "About", contact: "Contact", loc: "Localization", sourcing: "Supplier Sourcing", launch: "Launch Partner" };
  return `<header class="site-header">
  <div class="wrap header-inner">
    <!-- Service name token for future rename: ${brandToken} -->
    <a class="brand" href="${prefix}/"><strong>${serviceName}</strong><span>by GuideTech</span></a>
    <div class="lang-switch"><a class="${lang === "en" ? "current" : ""}" href="/japan-partner/en/">EN</a><a class="${lang === "es" ? "current" : ""}" href="/japan-partner/es/">ES</a></div>
    <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false" data-nav-toggle>☰</button>
    <nav class="nav" data-nav>
      <div class="nav-item"><a class="${current === "services" ? "current" : ""}" href="${prefix}/launch-partner.html">${labels.services}</a><div class="dropdown"><a href="${prefix}/launch-partner.html">${labels.launch}</a><a href="${prefix}/supplier-sourcing.html">${labels.sourcing}</a><a href="${prefix}/localization.html">${labels.loc}</a></div></div>
      <a class="${current === "pricing" ? "current" : ""}" href="${prefix}/pricing.html">${labels.pricing}</a>
      <a class="${current === "work" ? "current" : ""}" href="${prefix}/work.html">${labels.work}</a>
      <a class="${current === "blog" ? "current" : ""}" href="${prefix}/blog/">${labels.blog}</a>
      <a class="${current === "about" ? "current" : ""}" href="${prefix}/about.html">${labels.about}</a>
      <a class="header-cta" href="${prefix}/contact.html">${labels.contact}</a>
    </nav>
  </div>
</header>`;
}

function footer(lang = "en") {
  const prefix = lang === "root" ? "/japan-partner/en" : `/japan-partner/${lang}`;
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div><h2>${serviceName}</h2><p>Your local partner in Japan for software launch, localization, supplier sourcing, and operations. Operated by <a href="https://guidetech.jp">GuideTech</a> in Tokyo, Shibuya.</p></div>
      <div><h3>Services</h3><div class="footer-links"><a href="${prefix}/launch-partner.html">Japan Launch Partner</a><a href="${prefix}/supplier-sourcing.html">Supplier Sourcing</a><a href="${prefix}/localization.html">Software Localization</a><a href="${prefix}/pricing.html">Pricing</a></div></div>
      <div><h3>Company</h3><div class="footer-links"><a href="${prefix}/work.html">Work</a><a href="${prefix}/about.html">About</a><a href="${prefix}/contact.html">Contact</a></div></div>
      <div><h3>Languages</h3><div class="footer-links"><a href="/japan-partner/en/">English</a><a href="/japan-partner/es/">Español</a></div></div>
    </div>
    <div class="footer-bottom">Operated by GuideTech. © 2026 GuideTech Inc.</div>
  </div>
</footer>
<script src="/assets/japan-partner/script.js"></script>`;
}

function page({ file, lang = "en", current, title, description, canonical, schemas, body }) {
  return `${head({ file, lang, title, description, canonical, schemas })}
<body>
${header(lang, current)}
${body}
${footer(lang)}
</body>
</html>`;
}

function hero(title, lead, actions = true) {
  const side = actions
    ? `<figure class="hero-visual"><img src="/assets/japan-partner/images/hero-local-partner-tokyo.webp" alt="Bright Tokyo office desk representing GuideTech Japan Partner local operations" width="1536" height="864" fetchpriority="high"></figure>`
    : `<aside class="hero-panel"><strong>Built for overseas AI and SaaS teams</strong><ul><li>Local partner support from Tokyo</li><li>Localization, supplier sourcing, billing, and support</li><li>Ongoing operations after first release</li></ul></aside>`;
  return `<section class="hero"><div class="wrap hero-grid"><div class="hero-copy"><p class="eyebrow">${serviceName}</p><h1>${title}</h1><p>${lead}</p>${actions ? `<div class="hero-actions"><a class="button" href="/japan-partner/en/contact.html">Talk to GuideTech</a><a class="button secondary" href="/japan-partner/en/launch-partner.html">View services</a></div>` : ""}</div>${side}</div></section>`;
}

function cards(items) {
  return `<div class="grid three">${items.map((item) => `<article class="card"><h3>${item[0]}</h3><p>${item[1]}</p>${item[2] ? `<div class="metric"><strong>${item[2]}</strong></div>` : ""}</article>`).join("")}</div>`;
}

function hubDiagram() {
  return `<div class="diagram hub-diagram"><div class="hub-node">Localization</div><div class="hub-node">Supplier Sourcing</div><div class="hub-node">Customer Support</div><div class="hub-node">Invoicing / Admin</div><div class="hub-center">GuideTech<br>Japan Partner</div><div class="hub-node">Local Communication</div><div class="hub-node">AI Implementation</div><div class="hub-node">Training</div><div class="hub-node">Product Feedback</div></div>`;
}

function flowDiagram(items, six = false) {
  return `<div class="diagram flow ${six ? "six" : ""}">${items.map((item) => `<div class="flow-step"><strong>${item}</strong></div>`).join("")}</div>`;
}

function beforeAfterDiagram() {
  return `<div class="diagram before-after"><div class="ui-sample"><p class="eyebrow">Before</p><h3>Literal UI copy</h3><div class="ui-bar" style="width:92%"></div><div class="ui-bar" style="width:78%"></div><p class="note">Short English labels are translated without flow context, tone rules, or Japanese layout checks.</p><span class="ui-button">Start</span></div><div class="ui-sample"><p class="eyebrow">After</p><h3>Japan-ready product language</h3><div class="ui-bar" style="width:72%;background:rgba(99,114,95,.24)"></div><div class="ui-bar" style="width:88%;background:rgba(99,114,95,.24)"></div><p class="note">Action labels, support tone, billing language, and UI length are reviewed inside the real journey.</p><span class="ui-button">Set up for Japan</span></div></div>`;
}

function coverFor(slug) {
  if (slug.includes("pricing") || slug.includes("precios")) return "blog-pricing.webp";
  if (slug.includes("localization") || slug.includes("localizacion")) return "blog-localization.webp";
  if (slug.includes("agency") || slug.includes("agencia")) return "blog-agency-vs-partner.webp";
  return "blog-doing-business.webp";
}

function sampleDocument(title, rows) {
  return `<div class="sample-doc"><div class="sample-doc-head"><span>${title}</span><span>Sample deliverable</span></div>${rows.map((row) => `<div class="sample-row"><strong>${row[0]}</strong><span>${row[1]}</span><span class="status">${row[2]}</span></div>`).join("")}</div>`;
}

function articleDiagram(slug, lang) {
  if (slug.includes("pricing") || slug.includes("precios")) {
    return `<div class="diagram"><h3>${lang === "es" ? "Tres niveles de compra" : "Three buying levels"}</h3>${sampleDocument(lang === "es" ? "Comparación de alcance" : "Scope comparison", [["Translation", "Documents and pages", "Entry"], ["Localization", "UI, support, billing surfaces", "Project"], ["Japan Partner", "Local operations and reporting", "Monthly"]])}</div>`;
  }
  if (slug.includes("localization") || slug.includes("localizacion")) {
    return `<div class="diagram"><h3>${lang === "es" ? "Capas de localización" : "Localization layers"}</h3><div class="matrix"><div class="matrix-cell"><strong>UI</strong><p class="note">Labels, layout, empty states</p></div><div class="matrix-cell"><strong>Tone</strong><p class="note">Honorifics, support, errors</p></div><div class="matrix-cell"><strong>Format</strong><p class="note">Dates, names, invoices</p></div><div class="matrix-cell"><strong>Support</strong><p class="note">Macros, help, escalation</p></div></div></div>`;
  }
  if (slug.includes("agency") || slug.includes("agencia")) {
    return `<div class="diagram"><h3>${lang === "es" ? "Agencia vs partner local" : "Agency vs local partner"}</h3>${sampleDocument(lang === "es" ? "Comparación operativa" : "Operating comparison", [["Agency", "Delivers translated text", "Text"], ["Localization partner", "Reviews product context", "Product"], ["Local partner", "Coordinates Japan operations", "Execution"]])}</div>`;
  }
  return `<div class="diagram"><h3>${lang === "es" ? "Primeros 90 días" : "First 90 days"}</h3><div class="timeline"><div class="timeline-item"><span>Days 1-30</span><strong>Scope and readiness</strong><p class="note">Buyer surfaces, supplier needs, risks</p></div><div class="timeline-item"><span>Days 31-60</span><strong>Pilot and outreach</strong><p class="note">Customer conversations and vendor contact</p></div><div class="timeline-item"><span>Days 61-90</span><strong>Operate and decide</strong><p class="note">Report, feedback, go / no-go</p></div></div></div>`;
}

const serviceSchemas = (url, desc) => [org(), service(url, serviceName, desc), breadcrumbs([{ name: "Home", url: "/" }, { name: serviceName, url }])];

write("japan-partner/index.html", `${head({
  file: "japan-partner/index.html",
  lang: "en",
  title: "Japan Partner by GuideTech | Language Selection",
  description: "Choose English or Spanish resources for software localization and Japan launch support by GuideTech.",
  canonical: "/japan-partner/",
  hreflang: false,
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "Japan Partner", url: "/japan-partner/" }])]
})}
<body>
<main class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy"><p class="eyebrow">${serviceName}</p><h1>Japan localization resources for overseas software teams.</h1><p>Choose a language to explore product-aware Japanese localization, Japan launch support, pricing guidance, and practical articles for AI and SaaS companies.</p></div>
    <aside class="hero-panel"><strong>Select language</strong><div class="hero-actions"><a class="button" href="/japan-partner/en/">English</a><a class="button secondary" href="/japan-partner/es/">Español</a></div></aside>
  </div>
</main>
${footer("root")}
</body>
</html>`);

write("japan-partner/en/index.html", page({
  file: "japan-partner/en/index.html",
  current: "home",
  title: "Japan Local Partner for Software Companies | GuideTech",
  description: "Your local partner in Japan for overseas AI and SaaS teams: localization, supplier sourcing, customer support, invoicing, and launch operations.",
  canonical: "/japan-partner/en/",
  schemas: serviceSchemas("/japan-partner/en/", "Japan local partner support, supplier sourcing, localization, and launch operations for overseas software companies."),
  body: `${hero("Your local partner in Japan for software launch, localization, and operations.", "GuideTech helps overseas AI and SaaS companies operate in Japan without hiring a local team on day one. We can support Japanese localization, supplier sourcing, customer support, invoicing, local communication, and implementation work from Tokyo.")}
<section class="section"><div class="wrap"><div class="section-head"><h2>The common Japan launch gap</h2><p>Many products arrive with translated pages but foreign operations. Buyers feel the gap quickly.</p></div>${cards([
  ["Literal UI", "Buttons, empty states, validation errors, and settings screens sound translated instead of designed."],
  ["No local operator", "There is no Japan-side person to coordinate questions, suppliers, support, invoices, and buyer expectations."],
  ["Missing local operations", "LINE, payment habits, invoice expectations, local support, supplier search, and onboarding are treated as afterthoughts."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Three pillars</h2><p>Every page, project, and monthly engagement is tied to product, Japan operations, and continuity.</p></div>${cards([
  ["We speak product, not just Japanese", "We review UI context, string constraints, help centers, emails, and product flows."],
  ["We know how Japan does business", "We account for supplier sourcing, LINE, payments, qualified invoices, procurement language, and business etiquette."],
  ["We stay after launch", "We support ongoing updates, customer questions, vendor coordination, training, and feedback loops after the first release."]
])}</div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>What a local partner can cover</h2><p>Start with the operational surface you need today, then expand as Japan signal increases.</p></div>${cards([
  ["Japan Launch Partner", "Monthly local partner support for Japanese CS, invoicing, local contact, supplier coordination, AI implementation, and training.", "Main offer"],
  ["Supplier Sourcing", "Find, screen, contact, and coordinate Japanese vendors, implementation partners, venues, agencies, and operational suppliers.", "Local execution"],
  ["Software Localization", "UI strings, tone design, glossary, screenshots, QA notes, and implementation-ready feedback.", "SEO entry"]
])}<div style="margin-top:26px">${hubDiagram()}</div></div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>What you can receive</h2><p>Practical artifacts make the local partner role concrete before a full Japan commitment.</p></div><div class="grid three"><div>${sampleDocument("Japan readiness audit", [["Product surface", "Website, onboarding, support, billing", "Review"], ["Local risks", "Buyer trust, supplier gaps, admin issues", "Flag"], ["Recommendation", "Go / no-go and next sprint", "Decide"]])}</div><div>${sampleDocument("Supplier shortlist", [["Vendor type", "Implementation, agency, venue, support", "Define"], ["Screening notes", "Fit, language, price model, risk", "Compare"], ["Next action", "Intro, meeting, or hold", "Act"]])}</div><div>${sampleDocument("Weekly report", [["Customer signals", "Questions, objections, pilot needs", "Learn"], ["Operations", "Invoices, suppliers, support items", "Track"], ["Product feedback", "Localization and workflow issues", "Improve"]])}</div></div></div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>Process</h2><p>A simple operating rhythm for teams without a Japan office.</p></div><div class="grid four">${["Scope the launch surfaces", "Plan glossary, tone, and workflows", "Build localized assets and review UI", "Handover, support, and improve"].map((x) => `<article class="card step"><h3>${x}</h3><p>We keep the work connected to buyer trust, product usability, and operational readiness.</p></article>`).join("")}</div></div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>FAQ</h2><p>Short answers for early Japan planning.</p></div><div class="faq">${[
  ["Are you a translation agency?", "No. Translation can be part of the work, but the offer is product-aware localization and Japan launch operations."],
  ["Can you start before we have a Japan office?", "Yes. The service is designed for overseas teams without local staff."],
  ["Do you handle software UI?", "Yes. UI strings, screenshots, glossary decisions, and fit issues are central to the localization work."],
  ["Can you support AI implementation?", "Yes. The launch partner offer includes Japanese customer training and implementation support for AI products."],
  ["Do you publish fixed prices?", "The structure is public, but final placeholders must be replaced before launch."],
  ["Which teams are a fit?", "Seed to Series B AI and SaaS companies that are too early for large BPO or full local hiring."]
].map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>`
}));

write("japan-partner/en/localization.html", page({
  file: "japan-partner/en/localization.html",
  current: "services",
  title: "Japanese Localization for Software Teams | GuideTech",
  description: "Japanese localization and software localization Japan support covering UI strings, tone, formats, LINE, payments, invoices, and product QA.",
  canonical: "/japan-partner/en/localization.html",
  schemas: serviceSchemas("/japan-partner/en/localization.html", "Japanese software localization service for overseas AI and SaaS companies."),
  body: `${hero("Japanese localization that respects the product, not only the sentence.", "Japanese localization and software localization Japan work should make your interface, support, billing, and onboarding feel intentional for Japanese business users.", false)}
<section class="section"><div class="wrap"><div class="section-head"><h2>What we localize</h2><p>The practical details that make a product feel ready for Japanese users.</p></div>${cards([
  ["UI length and layout", "Japanese can expand or compress differently from English. We flag labels, buttons, tabs, and mobile layouts that need adjustment."],
  ["Honorific tone design", "We define when to use polite, concise, reassuring, or procedural Japanese across onboarding, errors, support, and billing."],
  ["Formats and typography", "Dates, addresses, names, postal codes, currency, line breaks, punctuation, and Japanese composition are reviewed as product details."],
  ["LINE and communication", "We assess whether LINE belongs in support, onboarding, customer success, or not at all for your segment."],
  ["Payments and invoices", "We review Japanese billing wording, bank transfer expectations, tax labels, and qualified invoice terminology."],
  ["Before and after review", "Example: an English CTA like “Get started” may become a more explicit Japanese action when the next step involves business setup."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Before and after</h2><p>Localization becomes clearer when it is shown as a product decision, not a spreadsheet task.</p></div>${beforeAfterDiagram()}</div></section>
<section class="section"><div class="narrow"><h2>Deliverables</h2><ul class="check-list"><li>Glossary and tone rules for product, support, and sales language.</li><li>Localized strings or copy with context notes.</li><li>Screenshot-based QA comments for UI fit and user trust.</li><li>Recommendations for Japanese support, billing, and onboarding surfaces.</li></ul></div></section>`
}));

write("japan-partner/en/launch-partner.html", page({
  file: "japan-partner/en/launch-partner.html",
  current: "services",
  title: "Japan Launch Partner for AI and SaaS Companies | GuideTech",
  description: "Monthly Japan launch partner support for overseas AI and SaaS companies: Japanese support, invoices, local contact, implementation, and training.",
  canonical: "/japan-partner/en/launch-partner.html",
  schemas: serviceSchemas("/japan-partner/en/launch-partner.html", "Monthly Japan launch partner support for overseas software companies."),
  body: `${hero("A Tokyo operating partner for your first Japan customers.", "The launch partner service is for teams that need more than content. We help operate Japanese customer support, invoice workflows, local communication, AI implementation, and training after launch.", false)}
<section class="section"><div class="wrap"><div class="section-head"><h2>Monthly operating scope</h2><p>Designed for overseas teams without Japan staff.</p></div>${cards([
  ["Japanese customer support", "Support macros, buyer questions, escalation summaries, and customer-facing Japanese communication."],
  ["Billing and invoices", "Japanese invoice wording, practical billing support, and internal notes for qualified invoice expectations."],
  ["Local business contact", "A Tokyo-based team that can understand context and keep communication moving with customers and suppliers."],
  ["Supplier sourcing", "Research, shortlist, contact, and coordinate Japanese suppliers, agencies, venues, implementation partners, and specialist vendors."],
  ["AI implementation", "Japanese training, use-case translation, workflow setup, and practical adoption support for customer teams."],
  ["Weekly reporting", "A simple weekly report covering tickets, sales friction, localization issues, and product feedback."],
  ["Slack collaboration", "Async coordination with your product, sales, and operations team."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Monthly operating rhythm</h2><p>The value is in steady local execution, not a one-time handoff.</p></div>${flowDiagram(["Weekly sync", "Customer / supplier coordination", "Support and invoice handling", "Report and product feedback"])}</div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>Weekly report sample</h2><p>The monthly partner model should create visible operating evidence every week.</p></div>${sampleDocument("Japan operations report", [["Customer questions", "Support themes, objections, requested docs", "Signal"], ["Supplier actions", "Outreach, replies, meetings, open risks", "Track"], ["Admin items", "Invoices, forms, local wording, next approvals", "Resolve"], ["Product feedback", "UI, support, billing, training improvements", "Improve"]])}</div></section>
<section class="section"><div class="narrow"><h2>Contract model</h2><p>Monthly partner engagement. Scope, response windows, communication channels, and included deliverables are defined before kickoff. TODO: Final commercial terms must be confirmed before publication.</p></div></section>`
}));

write("japan-partner/en/supplier-sourcing.html", page({
  file: "japan-partner/en/supplier-sourcing.html",
  current: "services",
  title: "Supplier Sourcing in Japan for Software Companies | GuideTech",
  description: "Japan supplier sourcing support for overseas AI and SaaS companies: vendor research, outreach, screening, coordination, and local communication.",
  canonical: "/japan-partner/en/supplier-sourcing.html",
  schemas: serviceSchemas("/japan-partner/en/supplier-sourcing.html", "Supplier sourcing and vendor coordination in Japan for overseas software companies."),
  body: `${hero("Find and coordinate the Japanese suppliers your launch depends on.", "Supplier sourcing in Japan is often the missing operational layer for overseas software companies. GuideTech can research, contact, screen, and coordinate vendors from Tokyo so your team is not guessing from overseas.", false)}
<section class="section"><div class="wrap"><div class="section-head"><h2>What we can help source</h2><p>The goal is not a long spreadsheet. The goal is a workable shortlist and practical coordination.</p></div>${cards([
  ["Implementation partners", "Local agencies, consultants, training partners, and technical collaborators who can support customer delivery."],
  ["Operational suppliers", "Vendors for events, customer meetings, materials, local logistics, and business operations."],
  ["Sales and support partners", "Japanese-speaking partners for customer communication, enablement, documentation, and frontline support."],
  ["Vendor screening", "Initial outreach, fit checks, availability, language ability, pricing structure, and risk notes."],
  ["Local coordination", "Japanese communication, meeting setup, expectation alignment, and follow-up summaries for your overseas team."],
  ["Handover notes", "Clear next steps, open risks, decision points, and recommended supplier path."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Sourcing process</h2><p>A structured process keeps supplier discovery from becoming a loose list of names.</p></div>${flowDiagram(["Define need", "Research", "Outreach", "Screen", "Shortlist", "Coordinate"], true)}</div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>Shortlist sample</h2><p>Supplier sourcing should produce decision-ready notes, not only names and links.</p></div>${sampleDocument("Supplier shortlist", [["Vendor A", "Strong category fit, English possible, needs scope confirmation", "Intro"], ["Vendor B", "Good pricing signal, Japanese-only communication", "Screen"], ["Vendor C", "Specialist capability, unclear availability", "Hold"], ["Next step", "Schedule two intro calls and request sample proposal", "Act"]])}</div></section>`
}));

write("japan-partner/en/pricing.html", page({
  file: "japan-partner/en/pricing.html",
  current: "pricing",
  title: "Japan Partner Pricing for Localization and Launch Support | GuideTech",
  description: "Pricing structure for Japan local partner support, supplier sourcing, translation, software localization, and monthly launch operations.",
  canonical: "/japan-partner/en/pricing.html",
  schemas: serviceSchemas("/japan-partner/en/pricing.html", "Pricing structure for Japan local partner support, software localization, and launch operations."),
  body: `${hero("Public pricing structure for Japan partner work.", "Japan partner pricing should show what local execution includes. We separate translation, software localization, supplier sourcing, and monthly launch support so teams can budget honestly.", false)}
<section class="section"><div class="wrap"><div class="todo">TODO: Replace {{PRICE_TRANSLATION}}, {{PRICE_LOCALIZATION_MIN}}, {{PRICE_LOCALIZATION_MAX}}, {{PRICE_PARTNER_MIN}}, and {{PRICE_PARTNER_MAX}} before public launch.</div><div class="table-wrap" style="margin-top:24px"><table><thead><tr><th>Offer</th><th>Placeholder price</th><th>Best for</th><th>Includes</th></tr></thead><tbody><tr><td><strong>Translation</strong></td><td>{{PRICE_TRANSLATION}} / word</td><td>Documents, web pages, sales materials</td><td>Translation, editing, glossary notes</td></tr><tr><td><strong>Software Localization</strong></td><td>{{PRICE_LOCALIZATION_MIN}}–{{PRICE_LOCALIZATION_MAX}} / project</td><td>UI, product flows, help center, launch assets</td><td>Context review, tone design, UI QA notes, localized assets</td></tr><tr><td><strong>Launch Partner</strong></td><td>{{PRICE_PARTNER_MIN}}–{{PRICE_PARTNER_MAX}} / month</td><td>Teams selling or piloting in Japan</td><td>Support, invoices, local contact, AI implementation, reporting</td></tr></tbody></table></div></div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Pricing FAQ</h2><p>Commercial details to confirm during scoping.</p></div><div class="faq">${[
  ["Can we pay in USD?", "TODO: Confirm accepted currencies before publication."],
  ["Is there a minimum contract?", "TODO: Confirm minimum order and minimum monthly term."],
  ["Can we start with only translation?", "Yes. Translation can be an entry point before a larger localization or launch partner engagement."]
].map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>`
}));

write("japan-partner/en/work.html", page({
  file: "japan-partner/en/work.html",
  current: "work",
  title: "Selected Work | Japan Partner by GuideTech",
  description: "Selected anonymized work areas from GuideTech relevant to AI implementation, software operations, and Japan-facing support.",
  canonical: "/japan-partner/en/work.html",
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "Work", url: "/japan-partner/en/work.html" }])],
  body: `${hero("Selected work, without invented logos or inflated numbers.", "This page is intentionally conservative. We describe relevant operating experience in anonymized form and avoid claims that cannot be substantiated.", false)}
<section class="section"><div class="wrap">${cards([
  ["AI workflow implementation", "Planning and implementation support for Japanese business workflows, internal tools, and automation surfaces."],
  ["Travel and local operations", "Japan-based coordination experience for overseas partners requiring local suppliers, communication, and execution detail."],
  ["Software and support operations", "Practical experience turning technical capabilities into customer-facing workflows, documentation, and support routines."]
])}<p class="note" style="margin-top:24px">TODO: Add named case studies only after client permission and factual review.</p></div></section>`
}));

write("japan-partner/en/about.html", page({
  file: "japan-partner/en/about.html",
  current: "about",
  title: "About GuideTech Japan Partner",
  description: "GuideTech operates Japan localization and launch support from Tokyo, Shibuya for overseas AI and SaaS companies.",
  canonical: "/japan-partner/en/about.html",
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "About", url: "/japan-partner/en/about.html" }])],
  body: `${hero("Operated by GuideTech in Tokyo.", "GuideTech runs AI implementation support for Japanese companies and Japan-based operations for overseas partners. This Japan Partner offer connects that practical background to overseas AI and SaaS teams entering Japan.", false)}
<section class="section"><div class="wrap"><div class="operator-card"><div class="portrait-placeholder"><span>TODO: representative photo</span></div><div><p class="eyebrow">Operator profile</p><h2>Tokyo-based execution for overseas software teams.</h2><p>GuideTech is based in Shibuya, Tokyo. The Japan Partner service is designed around practical operating work: localizing product surfaces, coordinating Japanese suppliers, supporting customer communication, and turning AI or SaaS capabilities into usable workflows for Japanese organizations.</p><ul class="checks"><li>AI implementation and workflow support for Japanese companies</li><li>Japan-side supplier, support, and operational coordination</li><li>English and Japanese communication bridge for overseas teams</li><li>Conservative public claims until names, photos, and cases are approved</li></ul><p><a href="https://guidetech.jp">Visit GuideTech corporate site</a></p></div></div></div></section>
<section class="section alt"><div class="wrap grid two"><div class="card"><h3>Company</h3><p>GuideTech Inc.<br>Tokyo, Shibuya-ku<br><a href="https://guidetech.jp">https://guidetech.jp</a></p></div><div class="card"><h3>Before publication</h3><p>TODO: Add approved representative name, title, photo, and any named client references only after factual review.</p></div></div></section>`
}));

write("japan-partner/en/contact.html", page({
  file: "japan-partner/en/contact.html",
  current: "contact",
  title: "Contact GuideTech Japan Partner",
  description: "Contact GuideTech about Japanese translation, software localization, and Japan launch partner support.",
  canonical: "/japan-partner/en/contact.html",
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "Contact", url: "/japan-partner/en/contact.html" }])],
  body: `${hero("Ready to localize your product for Japan?", "Tell us what you are building, what Japan launch surface you need first, and whether you need translation, software localization, or ongoing launch support.", false)}
<section class="section"><div class="narrow"><form class="form" name="japan-partner-contact" method="POST" action="/japan-partner/en/thanks.html" netlify netlify-honeypot="bot-field"><p class="hidden"><label>Do not fill this out: <input name="bot-field"></label></p><input type="hidden" name="form-name" value="japan-partner-contact"><label>Organization<input name="organization" type="text"></label><div class="form-row"><label>Name*<input name="name" type="text" required></label><label>Email*<input name="email" type="email" required></label></div><label>Inquiry type<select name="inquiry_type"><option>Translation</option><option>Localization</option><option>Launch Partner</option><option>Other</option></select></label><label>Message*<textarea name="message" required></textarea></label><button class="button" type="submit">Send inquiry</button></form></div></section>`
}));

write("japan-partner/en/thanks.html", page({
  file: "japan-partner/en/thanks.html",
  current: "contact",
  title: "Thank You | GuideTech Japan Partner",
  description: "Thank you for contacting GuideTech Japan Partner.",
  canonical: "/japan-partner/en/thanks.html",
  schemas: [org()],
  body: `${hero("Thank you. We received your inquiry.", "GuideTech will review your message and reply with the next practical step for translation, localization, or Japan launch support.", false)}`
}));

write("japan-partner/en/404.html", page({
  file: "japan-partner/en/404.html",
  title: "Page Not Found | GuideTech Japan Partner",
  description: "The requested Japan localization page could not be found.",
  canonical: "/japan-partner/en/404.html",
  schemas: [org()],
  body: `${hero("Page not found.", "The page may have moved. Return to the Japan localization homepage or contact GuideTech.", true)}`
}));

function blogIndex(lang, posts, title, description, intro) {
  const file = `japan-partner/${lang}/blog/index.html`;
  const canonical = `/japan-partner/${lang}/blog/`;
  write(file, page({
    file,
    lang,
    current: "blog",
    title,
    description,
    canonical,
    schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "Blog", url: canonical }])],
    body: `${hero(title, intro, false)}<section class="section"><div class="wrap grid two">${posts.map((post) => `<article class="card"><p class="eyebrow">${post.kw}</p><h3><a href="/japan-partner/${lang}/blog/${post.slug}.html">${post.title}</a></h3><p>${post.description}</p></article>`).join("")}</div></section>`
  }));
}

blogIndex("en", enPosts, "Japan Partner Blog", "Practical articles about Japanese translation, Japan partner services, localization, supplier sourcing, and doing business in Japan.", "Practical guides for overseas software teams preparing to find local partners, localize, sell, support, and operate in Japan.");
blogIndex("es", esPosts, "Blog de Partner Local en Japón", "Artículos prácticos en español sobre partner local en Japón, localización, proveedores y entrada al mercado.", "Guías para empresas de software que quieren vender, apoyar e implementar productos en Japón.");

function articlePage(lang, post) {
  const file = `japan-partner/${lang}/blog/${post.slug}.html`;
  const url = `/japan-partner/${lang}/blog/${post.slug}.html`;
  const faqHtml = post.faq.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("");
  const support = lang === "es"
    ? [
      "Para una empresa AI o SaaS en fase inicial, la prueba práctica no es si una frase está traducida, sino si un comprador japonés puede entender el valor, completar el onboarding, hacer preguntas y aprobar una compra sin sentir que el producto todavía está fuera de mercado.",
      "Conviene documentar cada decisión en un glosario vivo: nombres de funciones, tono de soporte, términos de facturación, ejemplos de uso y palabras que no deben traducirse. Ese sistema reduce retrabajo cuando aparecen nuevas pantallas, campañas o preguntas de clientes.",
      "La primera versión debe ser suficientemente creíble para vender y aprender. Después, las conversaciones comerciales, los tickets de soporte y las dudas de implementación muestran qué partes de la localización merecen más inversión.",
      "También es importante separar lo urgente de lo completo. Una empresa no necesita localizar todo el producto para iniciar conversaciones serias, pero sí necesita que las superficies visibles para un comprador japonés sean coherentes y operables.",
      "El equipo interno debe recibir notas accionables, no solo texto final. Cuando una traducción depende de una limitación de interfaz, una política de soporte o una práctica de facturación japonesa, esa razón debe quedar clara para producto, ventas y operaciones.",
      "La revisión final debería hacerse dentro del flujo real siempre que sea posible. Muchas incidencias aparecen solo al ver el texto en botones, modales, emails, tablas o pantallas móviles, especialmente cuando el japonés obliga a cambiar jerarquía o longitud."
    ]
    : [
      "For early-stage AI and SaaS companies, the practical test is not whether a sentence is translated. It is whether Japanese buyers can understand the value, complete onboarding, ask questions, and approve the purchase without feeling that the product is still outside the market.",
      "Each decision should be recorded in a living glossary: feature names, support tone, billing terms, use-case examples, and words that should remain in English. That system reduces rework when new screens, campaigns, or customer questions appear.",
      "The first version should be credible enough to sell and learn. After that, sales conversations, support tickets, and implementation questions show which parts of localization deserve deeper investment.",
      "It is also important to separate urgent from complete. A company does not need to localize the entire product before starting serious conversations, but the surfaces a Japanese buyer sees must feel coherent, reliable, and operable.",
      "Internal teams should receive actionable notes, not only final text. When a wording choice depends on an interface limitation, a support policy, or a Japanese billing practice, product, sales, and operations need to understand the reason.",
      "Final review should happen inside the real flow whenever possible. Many issues appear only when the text is seen in buttons, modals, emails, tables, or mobile screens, especially when Japanese changes hierarchy or line length."
    ];
  const approach = lang === "es"
    ? ["Cómo trabaja GuideTech", "GuideTech mantiene la localización cerca de la realidad de lanzamiento. Preferimos un conjunto más pequeño de superficies fiables antes que una traducción amplia sin contexto. La primera versión debe ayudar a vender, aprender, apoyar y mejorar. Cuando crece la evidencia, la superficie localizada puede crecer con ella."]
    : ["How GuideTech approaches this", "GuideTech keeps localization close to launch reality. We prefer a smaller set of high-trust surfaces over a broad translation dump. The first version should help your team sell, learn, support, and improve. When the evidence grows, the localized surface can grow with it."];
  const body = `<section class="section alt"><div class="wrap article-layout"><article class="article"><p class="eyebrow">${post.kw}</p><h1>${post.title}</h1><p class="article-meta">By GuideTech Japan Partner team · Updated ${today}</p><figure class="article-cover"><img src="/assets/japan-partner/images/${coverFor(post.slug)}" alt="${post.title} visual guide" width="1200" height="630" loading="lazy"></figure><p>${post.lead}</p>${articleDiagram(post.slug, lang)}${post.headings.map(([h, text], i) => `<h2 id="section-${i + 1}">${h}</h2><p>${text}</p>${support.map((p) => `<p>${p}</p>`).join("")}`).join("")}<h2>${approach[0]}</h2><p>${approach[1]}</p><p><a href="${post.cta}">${post.ctaText}</a></p><h2>FAQ</h2><div class="faq">${faqHtml}</div></article><aside class="toc"><strong>In this guide</strong>${post.headings.map(([h], i) => `<a href="#section-${i + 1}">${h}</a>`).join("")}<a href="${post.cta}">${post.ctaText}</a></aside></div></section>`;
  write(file, page({
    file,
    lang,
    current: "blog",
    title: `${post.title} | GuideTech`,
    description: post.description,
    canonical: url,
    schemas: [articleSchema(post, url, lang), faqSchema(post.faq), breadcrumbs([{ name: "Home", url: "/" }, { name: "Blog", url: `/japan-partner/${lang}/blog/` }, { name: post.title, url }])],
    body
  }));
}

enPosts.forEach((post) => articlePage("en", post));
esPosts.forEach((post) => articlePage("es", post));

write("japan-partner/es/index.html", page({
  file: "japan-partner/es/index.html",
  lang: "es",
  title: "Localización al Japonés para Empresas de Software | GuideTech",
  description: "Partner local en Japón, localización y apoyo de entrada al mercado para empresas AI y SaaS, operado por GuideTech en Tokio.",
  canonical: "/japan-partner/es/",
  schemas: serviceSchemas("/japan-partner/es/", "Localización al japonés y apoyo de lanzamiento en Japón para empresas de software."),
  body: `${hero("No solo traducimos su producto al japonés. Lo hacemos funcionar en Japón.", "La localización al japonés para software debe cubrir interfaz, ventas, soporte, facturación y adopción real. GuideTech trabaja desde Tokio con contexto de producto y conocimiento operativo local.")}
<section class="section"><div class="wrap"><div class="section-head"><h2>Recursos en español</h2><p>Guías para empresas de España y América Latina que quieren vender software en Japón.</p></div>${cards(esPosts.map((post) => [post.title, post.description, `<a href="/japan-partner/es/blog/${post.slug}.html">Leer guía</a>`]))}</div></section>`
}));

write("japan-partner/es/localization.html", page({
  file: "japan-partner/es/localization.html",
  lang: "es",
  current: "services",
  title: "Localización al Japonés para Software | GuideTech",
  description: "Servicio de localización al japonés para equipos de software: interfaz, tono, formatos, soporte, pagos y facturación.",
  canonical: "/japan-partner/es/localization.html",
  schemas: serviceSchemas("/japan-partner/es/localization.html", "Servicio de localización al japonés para empresas SaaS y AI."),
  body: `${hero("Localización al japonés con contexto de producto.", "Ayudamos a adaptar interfaz, tono, formatos, soporte, facturación y materiales de venta para que un producto de software funcione mejor en Japón.", false)}
<section class="section"><div class="wrap">${cards([
  ["Interfaz y longitud", "Revisión de botones, menús, estados vacíos y errores para evitar textos correctos pero incómodos."],
  ["Tono japonés", "Definición de formalidad para ventas, soporte, onboarding y administración."],
  ["Operación local", "Notas sobre LINE, pagos, facturas, formatos japoneses y expectativas B2B."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Antes y después</h2><p>La localización se entiende mejor como una decisión de producto, no como una hoja de cálculo.</p></div>${beforeAfterDiagram()}</div></section>`
}));

write("japan-partner/es/launch-partner.html", page({
  file: "japan-partner/es/launch-partner.html",
  lang: "es",
  current: "services",
  title: "Partner de Lanzamiento en Japón para SaaS | GuideTech",
  description: "Apoyo mensual para empresas AI y SaaS que necesitan soporte japonés, facturación, contacto local e implementación en Japón.",
  canonical: "/japan-partner/es/launch-partner.html",
  schemas: serviceSchemas("/japan-partner/es/launch-partner.html", "Apoyo mensual de lanzamiento en Japón para empresas de software."),
  body: `${hero("Un partner operativo en Tokio para sus primeros clientes japoneses.", "El servicio cubre soporte en japonés, facturación, contacto local, implementación de AI, formación y reporting mensual.", false)}
<section class="section"><div class="wrap">${cards([
  ["Soporte japonés", "Macros, respuestas, escalaciones y feedback de clientes."],
  ["Facturación", "Lenguaje de facturas, pagos y notas operativas para B2B japonés."],
  ["Búsqueda de proveedores", "Investigación, contacto, screening y coordinación de proveedores, agencias, venues y partners japoneses."],
  ["Implementación AI", "Formación, casos de uso y adopción práctica para equipos japoneses."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Ritmo mensual</h2><p>El valor está en la ejecución local continua, no en una entrega aislada.</p></div>${flowDiagram(["Sync semanal", "Coordinación cliente / proveedor", "Soporte y facturación", "Reporte y feedback"])}</div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>Ejemplo de reporte semanal</h2><p>El modelo mensual debe producir evidencia operativa visible cada semana.</p></div>${sampleDocument("Reporte de operaciones en Japón", [["Preguntas de clientes", "Temas de soporte, objeciones, documentos solicitados", "Señal"], ["Acciones con proveedores", "Contacto, respuestas, reuniones, riesgos abiertos", "Seguimiento"], ["Administración", "Facturas, formularios, textos locales, aprobaciones", "Resolver"], ["Feedback de producto", "UI, soporte, facturación, formación", "Mejorar"]])}</div></section>`
}));

write("japan-partner/es/supplier-sourcing.html", page({
  file: "japan-partner/es/supplier-sourcing.html",
  lang: "es",
  current: "services",
  title: "Búsqueda de Proveedores en Japón para SaaS | GuideTech",
  description: "Apoyo de búsqueda de proveedores en Japón para empresas AI y SaaS: investigación, contacto, screening, coordinación y comunicación local.",
  canonical: "/japan-partner/es/supplier-sourcing.html",
  schemas: serviceSchemas("/japan-partner/es/supplier-sourcing.html", "Búsqueda y coordinación de proveedores en Japón para empresas de software extranjeras."),
  body: `${hero("Encuentre y coordine proveedores japoneses desde Tokio.", "La búsqueda de proveedores en Japón suele ser una capa operativa difícil para equipos extranjeros. GuideTech puede investigar, contactar, filtrar y coordinar vendors para que su equipo no dependa solo de búsquedas desde fuera.", false)}
<section class="section"><div class="wrap">${cards([
  ["Partners de implementación", "Agencias, consultores, formadores y colaboradores técnicos para apoyar clientes japoneses."],
  ["Proveedores operativos", "Vendors para eventos, reuniones, materiales, logística local y operaciones de negocio."],
  ["Screening inicial", "Contacto, fit, disponibilidad, capacidad lingüística, estructura de precios y riesgos."],
  ["Coordinación local", "Comunicación japonesa, reuniones, seguimiento y resúmenes claros para el equipo extranjero."]
])}</div></section>
<section class="section alt"><div class="wrap"><div class="section-head"><h2>Proceso de búsqueda</h2><p>Un proceso estructurado evita que la búsqueda se convierta en una lista suelta de nombres.</p></div>${flowDiagram(["Definir necesidad", "Investigar", "Contactar", "Filtrar", "Shortlist", "Coordinar"], true)}</div></section>
<section class="section"><div class="wrap"><div class="section-head"><h2>Ejemplo de shortlist</h2><p>La búsqueda de proveedores debe producir notas listas para decidir, no solo nombres y enlaces.</p></div>${sampleDocument("Shortlist de proveedores", [["Proveedor A", "Buen fit de categoría, inglés posible, falta confirmar alcance", "Intro"], ["Proveedor B", "Buena señal de precio, comunicación solo en japonés", "Filtrar"], ["Proveedor C", "Capacidad especializada, disponibilidad incierta", "Esperar"], ["Siguiente paso", "Agendar dos llamadas y pedir propuesta de muestra", "Actuar"]])}</div></section>`
}));

write("japan-partner/es/pricing.html", page({
  file: "japan-partner/es/pricing.html",
  lang: "es",
  current: "pricing",
  title: "Precios de Partner Local en Japón | GuideTech",
  description: "Estructura de precios para partner local en Japón, búsqueda de proveedores, traducción, localización y apoyo mensual de lanzamiento.",
  canonical: "/japan-partner/es/pricing.html",
  schemas: serviceSchemas("/japan-partner/es/pricing.html", "Precios de traducción, localización y lanzamiento en Japón."),
  body: `${hero("Estructura de precios para localización en Japón.", "Los precios finales deben confirmarse antes de publicación. Esta página mantiene placeholders visibles para evitar publicar cifras no aprobadas.", false)}
<section class="section"><div class="wrap"><div class="todo">TODO: Sustituir {{PRICE_TRANSLATION}}, {{PRICE_LOCALIZATION_MIN}}, {{PRICE_LOCALIZATION_MAX}}, {{PRICE_PARTNER_MIN}} y {{PRICE_PARTNER_MAX}} antes del lanzamiento público.</div><div class="table-wrap" style="margin-top:24px"><table><thead><tr><th>Oferta</th><th>Precio placeholder</th><th>Incluye</th></tr></thead><tbody><tr><td><strong>Translation</strong></td><td>{{PRICE_TRANSLATION}} / word</td><td>Traducción, edición y notas de glosario.</td></tr><tr><td><strong>Software Localization</strong></td><td>{{PRICE_LOCALIZATION_MIN}}–{{PRICE_LOCALIZATION_MAX}} / project</td><td>Contexto, tono, UI y QA.</td></tr><tr><td><strong>Launch Partner</strong></td><td>{{PRICE_PARTNER_MIN}}–{{PRICE_PARTNER_MAX}} / month</td><td>Soporte, facturación, contacto local e implementación.</td></tr></tbody></table></div></div></section>`
}));

write("japan-partner/es/work.html", page({
  file: "japan-partner/es/work.html",
  lang: "es",
  current: "work",
  title: "Experiencia Seleccionada | GuideTech Japan Partner",
  description: "Áreas de experiencia anonimizadas de GuideTech relacionadas con AI, operaciones locales y soporte de software.",
  canonical: "/japan-partner/es/work.html",
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "Experiencia", url: "/japan-partner/es/work.html" }])],
  body: `${hero("Experiencia seleccionada sin logos inventados.", "Describimos áreas de experiencia de forma conservadora y sin afirmar clientes, números o resultados que no estén aprobados.", false)}
<section class="section"><div class="wrap">${cards([
  ["Implementación AI", "Apoyo práctico para flujos de trabajo, automatización y herramientas internas en Japón."],
  ["Operaciones locales", "Coordinación desde Japón para socios y proyectos que requieren ejecución local."],
  ["Soporte de software", "Documentación, soporte y operaciones para convertir tecnología en uso real."]
])}</div></section>`
}));

write("japan-partner/es/about.html", page({
  file: "japan-partner/es/about.html",
  lang: "es",
  current: "about",
  title: "About GuideTech Japan Partner",
  description: "GuideTech opera partner local, localización y apoyo de lanzamiento en Japón desde Tokio, Shibuya.",
  canonical: "/japan-partner/es/about.html",
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "About", url: "/japan-partner/es/about.html" }])],
  body: `${hero("Operado por GuideTech en Tokio.", "GuideTech apoya implementación de AI para empresas japonesas y operaciones locales para socios extranjeros. Esta oferta conecta esa experiencia con empresas SaaS que entran en Japón.", false)}
<section class="section"><div class="wrap"><div class="operator-card"><div class="portrait-placeholder"><span>TODO: foto representante</span></div><div><p class="eyebrow">Perfil operativo</p><h2>Ejecución desde Tokio para equipos de software extranjeros.</h2><p>GuideTech está basado en Shibuya, Tokio. El servicio Japan Partner se centra en trabajo operativo: localizar superficies de producto, coordinar proveedores japoneses, apoyar comunicación con clientes y convertir capacidades AI o SaaS en flujos utilizables para organizaciones japonesas.</p><ul class="checks"><li>Implementación AI y soporte de workflows para empresas japonesas</li><li>Coordinación local de proveedores, soporte y operaciones</li><li>Puente de comunicación en inglés y japonés para equipos extranjeros</li><li>Claims públicos conservadores hasta aprobar nombres, fotos y casos</li></ul><p><a href="https://guidetech.jp">Ver sitio corporativo de GuideTech</a></p></div></div></div></section>
<section class="section alt"><div class="wrap grid two"><div class="card"><h3>Empresa</h3><p>GuideTech Inc.<br>Tokio, Shibuya-ku<br><a href="https://guidetech.jp">https://guidetech.jp</a></p></div><div class="card"><h3>Antes de publicar</h3><p>TODO: Añadir nombre, cargo, foto y referencias de clientes solo después de revisión factual.</p></div></div></section>`
}));

write("japan-partner/es/contact.html", page({
  file: "japan-partner/es/contact.html",
  lang: "es",
  current: "contact",
  title: "Contacto | GuideTech Japan Partner",
  description: "Contacte con GuideTech sobre traducción al japonés, localización de software y lanzamiento en Japón.",
  canonical: "/japan-partner/es/contact.html",
  schemas: [org(), breadcrumbs([{ name: "Home", url: "/" }, { name: "Contacto", url: "/japan-partner/es/contact.html" }])],
  body: `${hero("Hablemos de su entrada en Japón.", "Cuéntenos qué producto está construyendo y qué superficie necesita localizar primero.", false)}
<section class="section"><div class="narrow"><form class="form" name="japan-partner-contact" method="POST" action="/japan-partner/es/thanks.html" netlify netlify-honeypot="bot-field"><p class="hidden"><label>No rellenar: <input name="bot-field"></label></p><input type="hidden" name="form-name" value="japan-partner-contact"><label>Organization<input name="organization" type="text"></label><div class="form-row"><label>Name*<input name="name" type="text" required></label><label>Email*<input name="email" type="email" required></label></div><label>Inquiry type<select name="inquiry_type"><option>Translation</option><option>Localization</option><option>Launch Partner</option><option>Other</option></select></label><label>Message*<textarea name="message" required></textarea></label><button class="button" type="submit">Enviar</button></form></div></section>`
}));

write("japan-partner/es/thanks.html", page({
  file: "japan-partner/es/thanks.html",
  lang: "es",
  current: "contact",
  title: "Gracias | GuideTech Japan Partner",
  description: "Gracias por contactar con GuideTech Japan Partner.",
  canonical: "/japan-partner/es/thanks.html",
  schemas: [org()],
  body: `${hero("Gracias. Hemos recibido su mensaje.", "GuideTech revisará la consulta y responderá con el siguiente paso práctico.", false)}`
}));

const urls = [
  "/japan-partner/",
  "/japan-partner/en/",
  "/japan-partner/en/localization.html",
  "/japan-partner/en/supplier-sourcing.html",
  "/japan-partner/en/launch-partner.html",
  "/japan-partner/en/pricing.html",
  "/japan-partner/en/work.html",
  "/japan-partner/en/about.html",
  "/japan-partner/en/contact.html",
  "/japan-partner/en/thanks.html",
  "/japan-partner/en/blog/",
  "/japan-partner/es/",
  "/japan-partner/es/localization.html",
  "/japan-partner/es/supplier-sourcing.html",
  "/japan-partner/es/launch-partner.html",
  "/japan-partner/es/pricing.html",
  "/japan-partner/es/work.html",
  "/japan-partner/es/about.html",
  "/japan-partner/es/contact.html",
  "/japan-partner/es/thanks.html",
  "/japan-partner/es/blog/",
  ...enPosts.map((p) => `/japan-partner/en/blog/${p.slug}.html`),
  ...esPosts.map((p) => `/japan-partner/es/blog/${p.slug}.html`)
];

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${site}${url}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`);

write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`);
