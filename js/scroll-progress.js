window.Alfa = window.Alfa || {};

(function () {
  function init() {
    var bar = document.getElementById("scroll-progress");
    if (!bar) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll(root)")) {
      return;
    }

    var ticking = false;

    function update() {
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - doc.clientHeight;
      var pct = scrollable > 0 ? doc.scrollTop / scrollable : 0;
      bar.style.transform = "scaleX(" + pct + ")";
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  window.Alfa.scrollProgress = { init: init };
})();
