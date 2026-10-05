/* Enhancement layer for company.html only: custom cursor, wheel-driven
 * inertia scroll, tilt-on-hover, and magnetic buttons. Explicitly
 * requested for this page as a scoped exception to the site's usual
 * "no custom cursor / no inertia scroll / no hover gimmick" rule.
 *
 * Everything here is gated behind a fine pointer and no reduced-motion
 * preference: touch devices and anyone who asked for less motion get
 * plain native cursor/scroll/hover instead.
 */
(function () {
  var canEnhance =
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canEnhance) return;

  document.documentElement.classList.add("has-custom-cursor");

  /* Custom cursor: dot tracks instantly, ring lags behind. */
  var dot = document.querySelector(".cursor-dot");
  var ring = document.querySelector(".cursor-ring");
  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  if (dot && ring) {
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = "translate(" + mouseX + "px," + mouseY + "px) translate(-50%, -50%)";
    });

    (function ringLoop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = "translate(" + ringX + "px," + ringY + "px) translate(-50%, -50%)";
      requestAnimationFrame(ringLoop);
    })();

    var hoverTargets = document.querySelectorAll("a, button, .co-card, .co-feature, .co-step");
    hoverTargets.forEach(function (el) {
      el.addEventListener("mouseenter", function () { document.body.classList.add("cursor-active"); });
      el.addEventListener("mouseleave", function () { document.body.classList.remove("cursor-active"); });
    });
  }

  /* Wheel-driven inertia scroll: lerp the real scroll position toward a
     wheel-accumulated target. Keyboard, touch and anchor-link jumps stay
     native — only the mouse wheel is intercepted. */
  (function inertiaScroll() {
    var current = window.scrollY;
    var target = window.scrollY;
    var ease = 0.09;
    var raf = null;

    function maxScroll() {
      return document.documentElement.scrollHeight - window.innerHeight;
    }

    function loop() {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        raf = null;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey) return; // let pinch-zoom through untouched
      e.preventDefault();
      target = Math.max(0, Math.min(target + e.deltaY, maxScroll()));
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: false });

    window.addEventListener("resize", function () {
      target = Math.max(0, Math.min(target, maxScroll()));
    });

    window.addEventListener("scroll", function () {
      if (raf) return; // ignore scroll events we caused ourselves
      current = window.scrollY;
      target = window.scrollY;
    });
  })();

  /* Tilt on hover: rotate toward the pointer, spring back on leave. */
  function bindTilt(el, maxDeg) {
    el.addEventListener("mousemove", function (e) {
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = "rotateY(" + (px * maxDeg) + "deg) rotateX(" + (-py * maxDeg) + "deg)";
      el.style.setProperty("--mx", (px + 0.5) * 100 + "%");
      el.style.setProperty("--my", (py + 0.5) * 100 + "%");
    });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
    });
  }

  document.querySelectorAll(".co-card").forEach(function (el) { bindTilt(el, 8); });
  document.querySelectorAll(".co-feature").forEach(function (el) { bindTilt(el, 5); });
  document.querySelectorAll(".co-step").forEach(function (el) { bindTilt(el, 6); });
  var mock = document.querySelector(".co-mock");
  if (mock) bindTilt(mock, 6);

  /* Magnetic pull on primary buttons and team links. */
  function bindMagnetic(el, strength) {
    el.addEventListener("mousemove", function (e) {
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = "translate(" + (x * strength) + "px," + (y * strength) + "px)";
    });
    el.addEventListener("mouseleave", function () {
      el.style.transform = "";
    });
  }

  document.querySelectorAll(".btn, .co-team__link").forEach(function (el) { bindMagnetic(el, 0.25); });
})();
