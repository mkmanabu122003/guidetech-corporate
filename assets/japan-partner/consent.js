/* Cookie consent banner.
   Analytics storage is denied by default in the Consent Mode block emitted in
   <head>. This script only ever moves it to granted, and remembers the choice
   so the banner is not shown again. No cookie is written before a choice. */
(function () {
  var KEY = "gt-consent";
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { return; }
  if (stored === "granted" || stored === "denied") return;

  function set(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: value });
    }
    var el = document.getElementById("consent-banner");
    if (el) el.remove();
  }

  function build() {
    var wrap = document.createElement("div");
    wrap.id = "consent-banner";
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-label", "Cookie preferences");
    wrap.innerHTML =
      '<p>We use analytics cookies to see which guides people find useful. ' +
      'They are not used for advertising, and declining changes nothing about how the site works.</p>' +
      '<div class="consent-actions">' +
      '<button type="button" data-consent="denied" class="consent-decline">Decline</button>' +
      '<button type="button" data-consent="granted" class="consent-accept">Accept</button>' +
      "</div>";
    wrap.addEventListener("click", function (e) {
      var choice = e.target && e.target.getAttribute("data-consent");
      if (choice) set(choice);
    });
    document.body.appendChild(wrap);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build, { once: true });
  } else {
    build();
  }
})();
