window.Alfa = window.Alfa || {};

(function () {
  var STAGGER_MS = 15;
  var TARGETS = ["#hero-heading", ".hero__tagline"];
  var splitInstances = [];

  function reduceMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function teardown() {
    splitInstances.forEach(function (instance) {
      if (instance && instance.revert) instance.revert();
    });
    splitInstances = [];
  }

  function run() {
    if (reduceMotion() || typeof window.SplitType === "undefined") return;

    teardown();

    TARGETS.forEach(function (selector) {
      var el = document.querySelector(selector);
      if (!el) return;

      var instance = new window.SplitType(el, { types: "words, chars" });
      splitInstances.push(instance);

      var chars = el.querySelectorAll(".char");
      chars.forEach(function (char, i) {
        char.classList.add("split-char");
        char.style.transitionDelay = i * STAGGER_MS + "ms";
      });

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          chars.forEach(function (char) { char.classList.add("is-visible"); });
        });
      });
    });
  }

  window.addEventListener("alfa:langchange", run);

  window.Alfa.heroReveal = { init: run };
})();
