window.Alfa = window.Alfa || {};

/**
 * "Campo de glifos α" — the site's one signature background motif.
 *
 * A sparse grid of small α characters, lit by the same global light that
 * js/light-source.js drives (--light-x/--light-y on :root), plus a soft
 * brighten near the pointer. It's texture, not a protagonist: low density,
 * low max opacity, never competing with foreground text.
 */
(function () {
  var GLYPH = "α";
  var CELL = 88; /* px between glyph centers */
  var BASE_ALPHA = 0.035;
  var LIGHT_ALPHA = 0.16;
  var POINTER_RADIUS = 220;
  var POINTER_ALPHA = 0.3;

  /* Deterministic pseudo-random per cell, so the field reads as a loose
     scatter rather than a rigid, wallpaper-like grid. */
  function hash(a, b) {
    var h = Math.sin(a * 127.1 + b * 311.7) * 43758.5453;
    return h - Math.floor(h);
  }

  function init() {
    var canvas = document.getElementById("glyph-field");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var root = document.documentElement;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width, height, cols, rows;
    var pointer = { x: -9999, y: -9999, active: false };
    var accent = getComputedStyle(root).getPropertyValue("--accent").trim() || "#7ef9c4";

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL) + 1;
      rows = Math.ceil(height / CELL) + 1;
    }

    function lightPoint() {
      var xPct = parseFloat(getComputedStyle(root).getPropertyValue("--light-x")) || 50;
      var yPct = parseFloat(getComputedStyle(root).getPropertyValue("--light-y")) || 20;
      return { x: (xPct / 100) * width, y: (yPct / 100) * height };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px " + (getComputedStyle(root).getPropertyValue("--font-mono") || "monospace");
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      var light = lightPoint();
      var maxDist = Math.max(width, height) * 0.8;

      for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
          var jitterX = (hash(col, row) - 0.5) * CELL * 0.7;
          var jitterY = (hash(row, col) - 0.5) * CELL * 0.7;
          var x = col * CELL + jitterX;
          var y = row * CELL + jitterY;

          var dLight = Math.hypot(x - light.x, y - light.y);
          var lightT = Math.max(0, 1 - dLight / maxDist);
          var cellNoise = 0.6 + hash(col * 3, row * 7) * 0.4;
          var alpha = (BASE_ALPHA + lightT * (LIGHT_ALPHA - BASE_ALPHA)) * cellNoise;

          if (pointer.active) {
            var dPointer = Math.hypot(x - pointer.x, y - pointer.y);
            if (dPointer < POINTER_RADIUS) {
              var pointerT = 1 - dPointer / POINTER_RADIUS;
              alpha = Math.max(alpha, BASE_ALPHA + pointerT * (POINTER_ALPHA - BASE_ALPHA));
            }
          }

          ctx.fillStyle = colorWithAlpha(accent, alpha);
          ctx.fillText(GLYPH, x, y);
        }
      }
    }

    function colorWithAlpha(hex, alpha) {
      var h = hex.replace("#", "");
      if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
      var r = parseInt(h.substr(0, 2), 16);
      var g = parseInt(h.substr(2, 2), 16);
      var b = parseInt(h.substr(4, 2), 16);
      return "rgba(" + r + "," + g + "," + b + "," + alpha.toFixed(3) + ")";
    }

    resize();
    draw();

    if (reduceMotion) return; /* static single frame, no rAF ever scheduled */

    var ticking = false;
    function scheduleDraw() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        draw();
        ticking = false;
      });
    }

    window.addEventListener("scroll", scheduleDraw, { passive: true });
    window.addEventListener("resize", function () {
      resize();
      scheduleDraw();
    });
    window.addEventListener("pointermove", function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      scheduleDraw();
    });
    window.addEventListener("pointerleave", function () {
      pointer.active = false;
      scheduleDraw();
    });
  }

  window.Alfa.glyphField = { init: init };
})();
