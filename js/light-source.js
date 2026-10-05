window.Alfa = window.Alfa || {};

/**
 * "Luz de Token" — one global light source for the whole page.
 *
 * Scroll position drives the light down the viewport (--light-x / --light-y on
 * :root). Every lit surface then gets that same single light PROJECTED into its
 * own box, so a card near the light burns on the edge that faces it while a
 * card further away stays dim. It is one coherent light, not a per-element
 * hover glow — it exists whether or not the pointer is anywhere near.
 */
(function () {
  var SELECTOR = ".card, main > section";

  function init() {
    var root = document.documentElement;

    /* Reduced motion: the light stays where tokens.css parked it (50% / 20%),
       every surface inherits that static position from :root, and no rAF is
       ever scheduled. The page is still lit — just frozen. */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var lit = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
    var ticking = false;

    function update() {
      ticking = false;

      var scrollable = root.scrollHeight - root.clientHeight;
      var p = scrollable > 0 ? Math.min(1, Math.max(0, root.scrollTop / scrollable)) : 0;

      /* The light descends the viewport as the page scrolls, drifting
         sideways just enough to keep the highlight from feeling mechanical. */
      var yPct = 4 + p * 92;
      var xPct = 50 + Math.sin(p * Math.PI * 1.5) * 28;

      root.style.setProperty("--light-y", yPct.toFixed(2) + "%");
      root.style.setProperty("--light-x", xPct.toFixed(2) + "%");

      var lx = (xPct / 100) * window.innerWidth;
      var ly = (yPct / 100) * window.innerHeight;

      for (var i = 0; i < lit.length; i++) {
        var el = lit[i];
        var r = el.getBoundingClientRect();
        if (r.bottom < -400 || r.top > window.innerHeight + 400) continue;
        if (!r.width || !r.height) continue;
        el.style.setProperty("--light-x", (((lx - r.left) / r.width) * 100).toFixed(2) + "%");
        el.style.setProperty("--light-y", (((ly - r.top) / r.height) * 100).toFixed(2) + "%");
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  window.Alfa.lightSource = { init: init };
})();
