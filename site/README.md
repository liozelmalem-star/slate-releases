# `site/`

Everything the website is made of, minus the two files GitHub Pages and the
installer pin to the repository root.

```
index.html                 the landing page       → /
docs/index.html            the docs hub           → /docs/
docs/connect/index.html    connecting your tools  → /docs/connect/
docs/mcp/index.html        the 24-tool overview   → /docs/mcp/
docs/overview/  ]
docs/features/  ]  GENERATED — do not edit. See "The guide is generated".
docs/legal/     ]
install.sh                 the installer          → /install.sh
uninstall.sh               the uninstaller        → /uninstall.sh
assets/                    brand marks (icon, mark, logo)
site/
  css/
    tokens.css      the ramps, both themes — load first, everything reads it
    base.css        document, typography, focus ring, scrollbars
    layout.css      measure, section rhythm, section label, reveal, footer
    components.css  theme switcher, the one card surface, notes, inline code
    home.css        the landing page's own furniture
    docs.css        every page under /docs/
    prose.css       rendered markdown only — the generated pages
  js/
    motion.js       prefers-reduced-motion, read once and shared
    theme.js        the switcher; announces `slate:theme`
    reveal.js       fade sections in on scroll
    slab.js         the mark's geometry, ported from the app
    copy.js         the install command's copy button
    tool-chips.js   the connected-tool chips
    demo.js         the two-tool memory loop
    graph.js        the memory-graph canvas
    releases.js     version + changelog, live from the GitHub API
    home.js         entry for /
    docs-page.js    entry for every page under /docs/
```

## Why `index.html` and the two scripts are not in here

`index.html` is what GitHub Pages serves at the site root, and `install.sh` and
`uninstall.sh` are pinned by their public URLs —
`https://liozelmalem-star.github.io/slate-releases/install.sh`
appears in the README, in the app, and in the release pipeline. Moving either
breaks a published address. Everything they load lives in here.

## Rules

**Colour is decided once.** `tokens.css` holds the ramps, lifted verbatim from the
app's `packages/ui/src/App.css`. No other stylesheet states an RGB value; they read
the semantic tokens (`--ground`, `--surface`, `--text`, `--edge`) so a theme is one
block of overrides rather than a variant on every selector.

**A page owns its furniture and nothing else's.** The hero, the installer and the
memory graph belong to `home.css`; everything under `/docs/` shares `docs.css`. If
two pages need the same thing it moves into `components.css` rather than copied.

**Modules do not import each other to talk.** The theme switcher dispatches
`slate:theme`; the canvas listens. That is why `theme.js` knows nothing about the
graph, and adding a second canvas needs no edit to the switcher.

**Every module no-ops when its element is missing.** `home.js` and `tools-page.js`
both call `initTheme()`, and each `init*` returns early if the page has nothing for
it. A new page composes the modules it wants and ignores the rest.

## No build step

These are plain ES modules and plain CSS, served as-is by GitHub Pages. There is
nothing to compile, and no dependency to install — open `index.html` over a local
server and it is the site.

```bash
python3 -m http.server 8899   # then http://localhost:8899
```

## What is still duplicated, and when to stop

With no build step, each page carries its own `<head>`, the slab `<symbol>` defs and
a four-line theme script. Two of those are deliberate:

- **The theme script must be inline.** It runs before first paint; loaded as a module
  it would run *after*, and a returning dark-mode reader would get a white flash on
  every navigation. Four lines is the price of having no build step.
- **The slab symbols are inert markup.** Eight lines, no behaviour, and an external
  SVG sprite trades that for `currentColor` edge cases across browsers.

The theme *switcher* used to be duplicated too and no longer is — `theme.js` builds
its own DOM, which is why a page only has to call `initTheme()`. That is the pattern
to reach for next: if a fourth page arrives and the `<head>` boilerplate starts
drifting, that is the signal to add a build step, not to keep copying.

## The guide is generated

`docs/overview/`, `docs/features/` and `docs/legal/` are **written by a script and
overwritten on every publish.** Editing them by hand loses the edit at the next release.

The source is the private repo's `docs/`, and the rule for what reaches this one is a
single file: **`docs/SUMMARY.md` lists exactly what is public.** Everything else there —
`internals/`, `plans/`, `developing/` — is unreachable by the builder rather than merely
unlisted, so "nothing private ships" is a property of the code and not a promise. A
published page that links into that half fails the build rather than shipping a dead link.

| | |
|---|---|
| Renderer | `scripts/release/build-docs.mjs` (private repo) |
| Publisher | `yarn docs:publish` — builds here, commits the three directories, pushes `main` |
| Preview | `yarn docs:publish --dry-run` |
| Styling | `site/css/prose.css`, scoped under `.prose` so it cannot reach these pages |

The publisher refuses to run if this repo has hand-written changes outside those three
directories, so a landing-page edit can never be swept into a docs commit.

**The two pages under `/docs/` that are NOT generated** — `connect/` and `mcp/` — stay
hand-written. They are marketing-grade: live tool chips, a memory graph, a copy button.
They are also the reason the generator exists: `/docs/mcp/` advertised **26** MCP tools
for a surface of **21**, five of them deleted, because the count lived in a repo where the
private one's `check-tool-parity.mjs` could not see it. If either page grows a number that
the product decides, move that page into the generated set rather than retyping it.
Until then, check `/docs/mcp/` against the contract table in the private repo's
`docs/features/mcp-server/connecting.md` on every release — it fell behind again, to 21
for a surface of 24, between September and October.

`/docs/` is still built to be added to, never moved: each section is its own directory
with an `index.html`, so a new page is a new folder and never a changed URL.

One caution that has already cost a release's worth of trust: the private docs describe
the product as it is meant to become. That is now checked at the source — `platform.md`
carries a "Can you download it?" column and `getting-started.md` opens with the one bundle
that actually ships — but the rule stands. **Anything published here has to be true of
what a visitor can install today.**

## The tour

`/tour/` walks through every place in Slate on Slate's **own rendered screens** — not
mockups. Each file in `tour/screens/` is the `<body>` the running app drew for one state
(an open dialog, a selected tab), and `tour/app.css` is the stylesheet the app had loaded
when it drew them, so a screen is pixel-for-pixel the app. Nothing of the app's source is
here: only what it rendered.

| Piece | What it is |
|---|---|
| `tour/index.html` | The page: chapter list, step card, and the frame |
| `tour/app.html`, `tour/app.js` | The frame. Shows a screen, rings an element, types, patches; reports every click |
| `site/js/tour.js` | The engine: steps, the ring, rail clicks jump to a chapter, `#chapter/step` in the URL |
| `site/js/tour/<place>.js` | One chapter per place — its steps, the screen each shows, what it rings |
| `tour/screens/*.html` | Captured screens, scrubbed of the capture machine's paths |
| `tour/app.css`, `tour/fonts/` | The app's compiled stylesheet and its fonts — generated, do not edit |

**When Slate's UI changes, the screens go stale.** They were captured by driving the real
app in a browser against its own local server with a seeded demo workspace (the e2e
suite's setup: `SLATE_E2E_UI=1 yarn dev`, `window.__SLATE_E2E_SERVER__`), saving
`document.body.innerHTML` and the union of loaded stylesheet rules for each state. To
refresh a chapter, recapture its states the same way, keep the screen ids, and re-check
each step's ring by opening `/tour/#<chapter>/<step>`.

## The landing page's brand device

Each of the five places on the landing page owns one leaf of the mark — red Sessions,
teal Memory, green Agents & Tasks, amber Apps & Artifacts, blue Toolkit. The hero's cards
and each feature section light only their leaf (`.mk[data-on]`, the `#mark5` symbol), and
`site/js/assemble.js` lights the pinned mark leaf by leaf as the five sections scroll past.

## Cache versions

Every page loads its CSS and JS with `?v=<date><letter>`. Bump it in every hand-written
page whenever a stylesheet or script changes — Pages lets browsers cache them for ten
minutes, and a new page with an old stylesheet renders broken.
