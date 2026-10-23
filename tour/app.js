// The window inside the tour: Slate's own rendered screens, captured from the running app,
// shown one at a time. Nothing here is Slate's code — each screen is the HTML the app drew
// and app.css is the stylesheet it drew it with (see tour/README.md).
//
// The page around it (site/js/tour.js) drives this frame:
//   show(id)            put a captured screen up
//   spot(target, opts)  ring one element and dim the rest
//   type(target, text)  type into a field, a character at a time
//   patch(fn)           change the screen in place — a ticked step, an answered card
// and hears back every click, as { el } with what was clicked, so a step can wait for it.

const cache = new Map();
let current = null;
let onClick = () => {};
let spotEl = null;
let ringEl = null;
let typing = null;

async function load(id) {
  if (!cache.has(id)) {
    cache.set(
      id,
      fetch(`screens/${id}.html`).then((r) => {
        if (!r.ok) throw new Error(`no screen ${id}`);
        return r.text();
      }),
    );
  }
  return cache.get(id);
}

export function preload(ids) {
  for (const id of ids) load(id).catch(() => {});
}

export async function show(id) {
  const html = await load(id);
  clearSpot();
  if (typing) typing.cancel = true;
  const root = document.getElementById("screen");
  root.innerHTML = html;
  current = id;
  // The capture froze what a canvas drew and where each pane was scrolled; put both back.
  for (const c of root.querySelectorAll("canvas[data-snap]")) {
    const img = new Image();
    img.onload = () => {
      const ctx = c.getContext("2d");
      ctx?.drawImage(img, 0, 0);
    };
    img.src = c.getAttribute("data-snap");
  }
  for (const el of root.querySelectorAll("[data-scroll-top]")) {
    el.scrollTop = Number(el.getAttribute("data-scroll-top"));
  }
  return root;
}

export function currentScreen() {
  return current;
}

/** Find an element by CSS selector, or by its visible text: the smallest visible element
 *  whose own text matches, preferring something you can click. */
export function find(target) {
  const root = document.getElementById("screen");
  if (!target) return null;
  if (typeof target === "string") return root.querySelector(target);
  const scope = target.within ? find(target.within) || root : root;
  if (target.css) return scope.querySelector(target.css);
  const want = target.text;
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  const match = (s) => (target.exact ? norm(s) === want : norm(s).includes(want));
  const attr = (el) =>
    [el.getAttribute("aria-label"), el.getAttribute("title"), el.getAttribute("placeholder")]
      .filter(Boolean)
      .join(" ");
  let best = null;
  for (const el of scope.querySelectorAll("*")) {
    if (el.closest("[hidden]")) continue;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (!(match(el.textContent || "") || match(attr(el)))) continue;
    // The smallest one that still matches: descend while a child also matches.
    if (!best || best.contains(el)) best = el;
  }
  if (best && target.clickable !== false) {
    // tabindex="-1" only makes a container focusable (a dialog does it), not clickable.
    const up = best.closest(
      'button,a,[role=button],[role=tab],[role=option],[role=menuitem],label,input,textarea,[tabindex]:not([tabindex="-1"])',
    );
    if (up) best = up;
  }
  if (best && target.up) {
    for (let i = 0; i < target.up; i++) best = best.parentElement || best;
  }
  return best;
}

function clearSpot() {
  spotEl?.remove();
  ringEl?.remove();
  spotEl = ringEl = null;
}

/** Ring one element. `dim` darkens everything else; `pad` widens the ring. */
export function spot(target, { dim = true, pad = 6, pulse = true } = {}) {
  clearSpot();
  const el = find(target);
  if (!el) return null;
  el.scrollIntoView({ block: "nearest", inline: "nearest" });
  const r = el.getBoundingClientRect();
  // Kept inside the window, with room for the ring's glow: an element taller than the
  // window (a whole editor) would otherwise be ringed on three sides only.
  const edge = 6;
  const left = Math.max(edge, r.left - pad);
  const top = Math.max(edge, r.top - pad);
  const right = Math.min(window.innerWidth - edge, r.right + pad);
  const bottom = Math.min(window.innerHeight - edge, r.bottom + pad);
  const box = { left, top, width: right - left, height: bottom - top };
  ringEl = document.createElement("div");
  ringEl.className = `tour-ring${pulse ? " is-pulse" : ""}${dim ? " is-dim" : ""}`;
  Object.assign(ringEl.style, {
    left: `${box.left}px`,
    top: `${box.top}px`,
    width: `${box.width}px`,
    height: `${box.height}px`,
  });
  document.getElementById("overlay").appendChild(ringEl);
  return { el, box };
}

export function unspot() {
  clearSpot();
}

/** Type into a field the way a person would. Resolves when done, or early if the screen changes. */
export async function type(target, text, { cps = 38 } = {}) {
  const el = find(target);
  if (!el) return;
  const field = el.matches("input,textarea") ? el : el.querySelector("input,textarea");
  if (!field) return;
  const job = { cancel: false };
  typing = job;
  field.focus({ preventScroll: true });
  field.value = "";
  for (const ch of text) {
    if (job.cancel) return;
    field.value += ch;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    await new Promise((r) => setTimeout(r, 1000 / cps));
  }
}

/** Change the screen in place. The callback gets the screen root and `find`. */
export function patch(fn) {
  fn(document.getElementById("screen"), find);
}

export function listen(fn) {
  onClick = fn;
}

// Every click is reported, and none of them reach anything: these are pictures of
// controls, and a form or a link inside one must not navigate the frame.
document.addEventListener(
  "click",
  (e) => {
    const el = e.target instanceof Element ? e.target : null;
    if (!el || el.closest("#overlay")) return;
    const field = el.closest("input,textarea,[contenteditable=true]");
    if (!field) e.preventDefault();
    onClick({ el, x: e.clientX, y: e.clientY });
  },
  true,
);
document.addEventListener("submit", (e) => e.preventDefault(), true);
// Keys stay in fields; nothing else listens for them.
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target instanceof HTMLTextAreaElement && !e.shiftKey) e.preventDefault();
});

window.slateTour = { show, spot, unspot, type, patch, listen, find, preload, currentScreen };
window.parent?.postMessage({ slateTour: "ready" }, "*");
