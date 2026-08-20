import { initTheme } from "./theme.js";
import { reveal } from "./reveal.js";
import { initCopy } from "./copy.js";
import { initToolChips } from "./tool-chips.js";
import { initReleases } from "./releases.js";
import { initDemo } from "./demo.js";
import { initGraph } from "./graph.js";

/* The landing page's entry point.
 *
 * Every module below is independent and no-ops when its element is absent, so the
 * order here is about what the reader sees first rather than about dependencies:
 * the theme before anything paints, then the parts of the page that are already
 * on screen, then the network. */
initTheme();
reveal(document.querySelectorAll(".reveal"));
initCopy();
initToolChips();
initDemo();
initGraph();
initReleases();
