import { initTheme } from "./theme.js";
import { reveal } from "./reveal.js";
import { initCopy } from "./copy.js";
import { initReleases } from "./releases.js";
import { initDemo } from "./demo.js";
import { initGraph } from "./graph.js";
import { initShowcase } from "./showcase.js";
import { initAssemble } from "./assemble.js";

/* The landing page's entry point. Every module no-ops when its element is absent,
 * so the order is what the reader sees first: the theme, then what is on screen,
 * then the network. */
initTheme();
// The switcher builds itself fixed to the corner; on this page it lives in the top bar.
const slot = document.querySelector(".nav-theme");
const sw = document.getElementById("theme");
if (slot && sw) slot.append(sw);
reveal(document.querySelectorAll(".reveal"));
initCopy();
initShowcase();
initAssemble();
initDemo();
initGraph();
initReleases();
