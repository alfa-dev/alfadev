# Reference: KAGE (mengto.github.io/kage)

Scroll-driven narrative site presenting a guided night walk through a Kyoto
mountain temple, in five chapters. Built by Onest design studio. Included here
as a design reference — not a template to copy 1:1.

## Concept

A single long-scroll experience structured like a guided tour: a cold open
("scroll to enter"), four numbered chapters, and a closing chapter. Content is
paced in discrete beats rather than a continuous feed — each chapter has its
own hero moment, then sub-sections numbered like steps (`01/03`, `02/03`...).
The whole thing leans on restraint: long pauses of negative space, a tiny
color vocabulary, and copy kept to short, evocative fragments instead of
paragraphs.

## Design tokens (extracted from source)

**Color**
```
--ink:       #05070a   /* page background */
--ink-2:     #0a0e12   /* secondary/raised surface */
--bone:      #dfe7e0   /* primary text */
--bone-dim:  #aab4ad   /* secondary text */
--muted:     #78837c   /* tertiary/meta text */
--line:      rgba(223,231,224,.13)   /* hairline borders */
--line-soft: rgba(223,231,224,.07)   /* faint dividers */
--vermilion: #e0231c   /* primary accent — torii-gate red */
--ember:     #ff5a3c   /* warm glow accent, used sparingly */
--gold:      #c9a24a   /* secondary accent, lantern light */
```
One dark neutral scale + one hot accent (vermilion) + one warm secondary
(gold/ember) used only for glows. Nothing else. That restraint is the palette.

**Type**
- `Onest` (variable, weight 300–ish base) for Latin text — geometric grotesque,
  not a display face doing the heavy lifting.
- A Japanese face (`NotoJP`) layered in for kanji/hiragana fragments used as
  section markers (e.g. a chapter titled in kanji with the English gloss set
  small underneath).
- A separate `Wordmark` face for the brand mark only.
- Full fluid type scale via `clamp()`, roughly 13px → 124px across ~15 steps —
  every size ties min/preferred/max to viewport width rather than breakpoints.

**Motion**
```
--ease:     cubic-bezier(.22,.61,.36,1)
--ease-out: cubic-bezier(.16,1,.3,1)
--ease-io:  cubic-bezier(.65,0,.35,1)
```
Three custom eases used consistently instead of default/ease-in-out, plus
per-element random-ish delay offsets (`--fg-delay: 90ms/180ms/270ms`) so
layered foreground elements don't animate in lockstep.

**Spacing / shape**
- One fluid padding token: `--pad: clamp(20px, 3.4vw, 56px)`, reused instead
  of a fixed spacing scale.
- `--nav-h: 84px` fixed header height.
- Radii: `100px` (pill/chip) or `50%` (dot/circle) — no in-between radius.

## Structure

**Nav** — fixed header (`.nav`, `.nav-links`, `.nav-burger` for mobile),
brand mark (`.brand`, `.brand-tx`), 4 chapter links.

**Hero (`.hero`)** — `.hero-top`, `.display.h-hero` (the big fluid headline),
`.hero-sub`, `.hero-cue` (scroll affordance), `.hero-side` and `.hero-spacer`
for layout balance, `.hero-foot` with a stat row (`.gate-stats`).

**Foreground layering (`.fg`, `.fg-el`)** — a stack of PNG cutouts
(`fg-wall`, `fg-pine`, `fg-lantern`, `fg-stones`, `fg-bush`, `fg-grass`,
`fg-hill`, `fg-ruins`, `fg-sakura`, `fg-leaves`) each independently
parallaxed/faded on scroll, some with an idle sway (`fg-el--sway`) or flip
(`fg-el--flip`) modifier. This is the site's main "depth" trick: flat
illustrated layers moving at different scroll speeds rather than a 3D scene,
except in the garden chapter where a real WebGL (`three.min.js`) scene takes
over.

**Sections (`.sec`)** — each chapter is a `.sec` with a `.sec-head`
(eyebrow + kanji + English title), then either a `.gate-grid`/`.cards` grid
of `.card` items (icon/kanji `.card-ar`, fragment `.card-fr`, label
`.card-lab`, meta `.card-meta`) or a `.les` (lesson) list with numbered
entries and duration meta. A `.chip` component marks short tags/labels
(rounded pill, `border-radius:100px`).

**Cursor (`.cur`, `.cur-dot`, `.cur-head`)** — a custom cursor replacement is
present. *(Flag: this directly conflicts with this project's own memory —
"no custom cursor / no inertia scroll" was an explicit rejection on alfadev.
Do not port this piece over.)*

**Footer (`.foot`)** — `.foot-brand`, `.foot-grid` (chapter/practice/elsewhere
link columns), `.foot-base` (copyright + credits + stack line).

## Patterns worth borrowing (vs. not)

Worth adapting to a dev portfolio in spirit, not literally:
- One accent color used with total discipline, everywhere.
- Chapter/section numbering as a structural device (`01/03`) — a portfolio
  already does this informally with `// AboutBlock`-style labels; the KAGE
  version formalizes progress-through-content as a visible counter.
- Fluid type via `clamp()` end-to-end instead of breakpoint jumps.
- Layered parallax foreground elements as a cheaper alternative to full 3D
  for sections that don't need the WebGL budget.
- Named custom eases instead of default transition curves.

Not a fit here (per existing project direction):
- Custom cursor, scroll hijacking/inertia — already rejected for this site.
- The temple/nature illustration language itself — this is a dev portfolio
  with an established terminal/mono-space/WebGL-constellation identity;
  KAGE's visual vocabulary (kanji, torii red, ukiyo-e-adjacent illustration)
  doesn't transplant, only its *structural* and *restraint* lessons do.
