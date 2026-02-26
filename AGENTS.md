# AGENTS.md

## Cursor Cloud specific instructions

This is a simple static website (personal portfolio + Donorbox donation widget prototype). There is no build system, no package manager, no test framework, and no linting configured.

### Serving the site

Serve files with any HTTP static file server. The `donorbox_widget_wix.html` page uses a CDN-loaded LESS compiler that requires HTTP (not `file://`).

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080/index.html` or `http://localhost:8080/donorbox_widget_wix.html`.

### Key pages

- `index.html` — Main portfolio page with a JS typing animation effect
- `_index.html` — Alternate/older version of the portfolio page
- `donorbox_widget_wix.html` + `styles.less` — Donation widget prototype (PicoCSS + LESS via CDN)

### Notes

- No `package.json`, no npm/yarn/pnpm dependencies to install.
- No automated tests or linting exist in this repo.
- All external dependencies (PicoCSS, LESS compiler, Inter font, Flaticon icons) are loaded from CDNs at runtime.
