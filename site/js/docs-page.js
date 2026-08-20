import { initTheme } from "./theme.js";
import { reveal } from "./reveal.js";

/* Every page under /docs/. They are documents: they need the theme and the scroll
 * reveal, and nothing else on this site. */
initTheme();
reveal(document.querySelectorAll(".reveal"));
