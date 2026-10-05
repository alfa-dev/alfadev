window.Alfa = window.Alfa || {};

/**
 * Section entrance handling.
 *
 * Browsers with `animation-timeline: view()` get the "Deriva" effect straight
 * from CSS (css/effects.css) — sections tip back in perspective and straighten
 * as they cross the viewport. This module is the fallback for everything else
 * (IntersectionObserver + .is-visible), and also drives the progress-rail
 * numerals as the visitor moves between chapters.
 */
(function () {
  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function setupProgressRail(targets) {
    var rail = document.getElementById("progress-rail");
    var current = rail && rail.querySelector(".progress-rail__current");
    if (!current) return function () {};

    return function (chapter) {
      if (chapter) current.textContent = chapter;
    };
  }

  function init() {
    var targets = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!targets.length) return;

    var updateRail = setupProgressRail(targets);

    if (reduceMotion() || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach(function (el) { observer.observe(el); });

    /* A lighter-weight observer just tracks which chapter is centered in the
       viewport, independent of the one-shot reveal above. */
    var railObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) updateRail(entry.target.dataset.chapter);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    targets.forEach(function (el) {
      if (el.dataset.chapter) railObserver.observe(el);
    });
  }

  window.Alfa.reveal = { init: init };
})();
