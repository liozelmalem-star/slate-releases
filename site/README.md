# `site/`

Everything the website is made of, minus the two files GitHub Pages and the
installer pin to the repository root.

```
index.html                 the landing page       → /
docs/index.html            the docs hub           → /docs/
docs/connect/index.html    connecting your tools  → /docs/connect/
docs/mcp/index.html        the 26-tool reference  → /docs/mcp/
install.sh                 the installer          → /install.sh
assets/                    brand marks (icon, mark, logo)
site/
  css/
    tokens.css      the ramps, both themes — load first, everything reads it
    base.css        document, typography, focus ring, scrollbars
    layout.css      measure, section rhythm, section label, reveal, footer
    components.css  theme switcher, the one card surface, notes, inline code
    home.css        the landing page's own furniture
    docs.css        every page under /docs/
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

## Why `index.html` and `install.sh` are not in here

`index.html` is what GitHub Pages serves at the site root, and `install.sh` is
pinned by its public URL — `https://liozelmalem-star.github.io/slate-releases/install.sh`
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

## Growing the docs

`/docs/` is built to be added to, never moved. Each section is its own directory with
an `index.html`, so a new page is a new folder and a new card on the hub — no existing
URL changes. The plan is for `overview/`, `features/` and `legal/` to be copied out of
the private repo's `docs/` by CI on release, the same way `install.sh` already is;
`internals/`, `developing/` and `plans/` never leave that repo.

One caution learned the hard way: the private docs describe the product as it is meant
to become. `overview/getting-started.md` currently says Slate is a desktop app for
"macOS, Windows, and Linux", while the only build that exists is macOS on Apple
Silicon — which is what this site says. Anything synced has to be true of what a
visitor can actually install today.
