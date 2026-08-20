import { reduced } from "./motion.js";

/* The theme switcher.
 *
 * The attribute is already on <html> before this module runs — every page sets it
 * from a tiny inline script in <head>, because a theme applied after first paint
 * is a white flash on every navigation, and this site has navigation now. This
 * module only has to MOVE it, persist it, and announce it.
 *
 * Announcing matters: almost everything on the site re-paints from the semantic
 * tokens on its own, but a <canvas> holds resolved colours and cannot. Rather
 * than have this module know about the memory graph, it dispatches `slate:theme`
 * and whoever cares listens. That is the whole reason the graph and the switcher
 * are separate files that never import each other. */
export const THEME_EVENT = "slate:theme";

const SUN =
  '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/>' +
  '<path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/>' +
  '<path d="m19.07 4.93-1.41 1.41"/>';
const MOON = '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>';

const icon = (paths) =>
  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

/* The control builds its own DOM.
 *
 * It used to be markup every page copied, which is fourteen lines of inline SVG
 * duplicated per page and four places to fix a mislabelled button. A component
 * that owns its markup is one place. Nothing is lost without JavaScript either —
 * the switcher IS JavaScript, and the theme itself is already applied by the
 * inline head script before this module loads.
 *
 * Deliberately a segmented pair and not one toggle: a single button has to be
 * labelled either with the state you are in or the state you would move to, and
 * both readings are available to whoever is looking at it. Showing both options
 * and filling one removes the question. */
function render() {
  const box = document.createElement("div");
  box.className = "theme";
  box.id = "theme";
  box.setAttribute("role", "group");
  box.setAttribute("aria-label", "Colour theme");
  box.innerHTML =
    `<button type="button" data-theme-set="light" title="Light" aria-label="Light">${icon(SUN)}</button>` +
    `<button type="button" data-theme-set="dark" title="Dark" aria-label="Dark">${icon(MOON)}</button>`;
  document.body.prepend(box);
  return box;
}

export function initTheme() {
  const box = document.getElementById("theme") || render();
  const btns = [...box.querySelectorAll("[data-theme-set]")];

  function apply(next) {
    document.documentElement.dataset.theme = next;
    for (const b of btns) b.setAttribute("aria-pressed", String(b.dataset.themeSet === next));
    document.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: { theme: next, reduced } }));
    try {
      localStorage.setItem("slate-theme", next);
    } catch {
      /* Private browsing refuses the write. The theme is already applied to the
         DOM; losing the preference on the next visit is not worth an exception. */
    }
  }

  apply(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  box.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-set]");
    if (btn) apply(btn.dataset.themeSet);
  });
}
