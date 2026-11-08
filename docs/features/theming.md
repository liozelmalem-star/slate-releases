# Themes

Slate has two themes: **Mint** (dark) and **Forest** (light). Choose one in **Settings → Appearance**; it sets the light/dark mode and the whole palette at once.

| Theme | Mode | Look |
| --- | --- | --- |
| **Mint** | Dark | The default. A near-black, neutral ground; the brand in mint |
| **Forest** | Light | An off-white, neutral ground; the brand in forest green |

Surfaces, borders, text and icons at rest are neutral grey. Green is kept for a few things: Slate's mark, the main button, what is selected, and the rail tab you are on.

* **Charts** draw one series in sage. The bar you point at turns mint or forest.
* **State keeps its own colours.** Amber means something needs you, red means it failed or the next step cannot be undone, and green means done or connected. A state is always shown with a word or an icon too.
* **The running light is lime,** the brand's fourth colour, and nothing else is: a bright lime on Mint, a deep one on Forest.
* **Terminal output stays in colour.** A CLI's red means a failure. The terminal takes its surface from the theme and keeps its sixteen ANSI colours.

## Workspace colours

A workspace can wear one of nine colours: **Cobalt, Lagoon, Iris, Silver, Orchid, Fjord, Heather, Wisteria** and **Graphite**. They are cool colours and two neutrals, so none competes with the brand green or reads as a state. A few are close for some colour-vision types (Iris and Silver under tritanopia), so a workspace's mark is always shown beside its name. Choose one in **Settings → Workspaces**. The colour marks the workspace in the switcher's list, in Settings, in the Sessions workspace picker and as a small dot on the workspace tile. Doc icons, the rail tabs and the Sessions map wear the brand, not the workspace.

## Light and dark with ⌘⇧L

**⌘⇧L**, or **Toggle light / dark theme** in the palette, switches between Mint and Forest. The **Active** card in Settings → Appearance moves with it. All keys: [Keyboard shortcuts](https://liozelmalem-star.github.io/slate-releases/docs/features/shortcuts.md).

## Brand colour

Buttons, links and focus rings use mint on Mint and forest on Forest. It is not a setting. On Mint the main button is mint with forest words; on Forest it is forest with paper-white words.

> **Note:** There is no per-element colour picker and no custom theme file. A theme chosen in an older version (Strata, Chalk, Onyx or Graphite) opens as Mint or Forest, whichever has the same mode.

## Size

**⌘+ and ⌘−** zoom the whole app (text, icons, spacing, memory graph) in ten-percent steps from 80% to 140%, starting at 110%. The zoom is saved on this computer, not in your workspace. In a terminal the same keys resize only that terminal's font; click outside it to zoom the app again.

## See also

* [Memory Graph and Map](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md)
* [Typed Docs & Hierarchy](https://liozelmalem-star.github.io/slate-releases/docs/features/docs/typed-docs.md)
* [Sessions — the Live Tracker](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md): where the running light appears
