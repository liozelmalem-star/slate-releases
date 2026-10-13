import { initTheme } from "./theme.js";
import { CHAPTERS } from "./tour-chapters.js";

/* The guided tour at /tour/.
 *
 * Two halves that never share a stylesheet: this page (the chapter list and the step card,
 * on the site's tokens) and an iframe, tour/app.html, that shows Slate's own captured
 * screens under the app's own CSS. This module drives the frame through the small API it
 * exposes as `window.slateTour` and hears every click inside it.
 *
 * A chapter is a list of steps. A step names the screen to show, the element to ring, the
 * words for the card, and optionally an action: `click` (wait for the visitor to click the
 * ringed element, or press Next), `type` (type into a field), and `patch` (change the
 * screen in place — tick a box, answer a card). Clicking a place on the rail jumps to its
 * chapter, whatever step you were on. */

initTheme();

const $ = (s) => document.querySelector(s);
const frame = $("#win");
const wrap = $(".win-wrap");
const box = $(".win-frame");
const DONE_KEY = "slate-tour-done";

let T = null; // the frame's API, once it says it is ready
let ch = 0;
let st = 0;
let busy = 0;

const done = new Set(readDone());
function readDone() {
  try {
    return JSON.parse(localStorage.getItem(DONE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveDone() {
  try {
    localStorage.setItem(DONE_KEY, JSON.stringify([...done]));
  } catch {
    // private mode: the ticks just do not survive a reload
  }
}

/* ── Scale the 1320×860 window to whatever width it has ─────────────────── */
function fit() {
  const w = box.clientWidth;
  const s = w / 1320;
  frame.style.transform = `scale(${s})`;
  box.style.height = `${Math.round(860 * s)}px`;
}
new ResizeObserver(fit).observe(box);
fit();

/* ── The chapter list ───────────────────────────────────────────────────── */
function renderChapters() {
  const ol = $(".chapters");
  ol.innerHTML = CHAPTERS.map(
    (c, i) => `<li class="${done.has(c.id) ? "done" : ""}">
      <button type="button" data-ch="${i}" ${i === ch ? 'aria-current="step"' : ""}>
        ${c.icon ? `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${c.icon}</svg>` : ""}
        <span>${c.title}</span><span class="n">${c.steps.length}</span>
      </button></li>`,
  ).join("");
  ol.querySelector('[aria-current="step"]')?.scrollIntoView({ block: "nearest", inline: "nearest" });
}
$(".chapters").addEventListener("click", (e) => {
  const b = e.target.closest("[data-ch]");
  if (b) go(Number(b.dataset.ch), 0);
});

/* ── The step card ──────────────────────────────────────────────────────── */
const POINTER =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4.1 12 6"/><path d="m5.1 8-2.9-.8"/><path d="m6 12-1.9 2"/><path d="M7.2 2.2 8 5.1"/><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"/></svg>';

function renderCard() {
  const c = CHAPTERS[ch];
  const s = c.steps[st];
  $(".step-kicker .name").textContent = c.title;
  $(".step-kicker .count").textContent = `${st + 1} of ${c.steps.length}`;
  $(".step-card h2").textContent = s.title;
  $(".step-body").innerHTML = s.body;
  const tryEl = $(".step-try");
  if (s.try) {
    tryEl.hidden = false;
    tryEl.innerHTML = `${POINTER}<span>${s.try}</span>`;
  } else {
    tryEl.hidden = true;
  }
  $(".step-dots").innerHTML = c.steps
    .map((_, i) => `<button type="button" data-st="${i}" aria-label="Step ${i + 1}" ${i === st ? 'aria-current="step"' : ""}></button>`)
    .join("");
  $("#prev").disabled = ch === 0 && st === 0;
  const last = st === c.steps.length - 1;
  const nextCh = CHAPTERS[ch + 1];
  $("#next").textContent = s.click ? "Show me" : last ? (nextCh ? `Next: ${nextCh.title} →` : "Finish") : "Next";
}
$(".step-dots").addEventListener("click", (e) => {
  const b = e.target.closest("[data-st]");
  if (b) go(ch, Number(b.dataset.st));
});
$("#prev").addEventListener("click", () => back());
$("#next").addEventListener("click", () => forward());
document.addEventListener("keydown", (e) => {
  if (e.target.closest?.("input,textarea")) return;
  if (e.key === "ArrowRight") forward();
  if (e.key === "ArrowLeft") back();
});

function back() {
  if (st > 0) go(ch, st - 1);
  else if (ch > 0) go(ch - 1, CHAPTERS[ch - 1].steps.length - 1);
}
function forward() {
  const c = CHAPTERS[ch];
  if (st < c.steps.length - 1) return go(ch, st + 1);
  done.add(c.id);
  saveDone();
  if (ch < CHAPTERS.length - 1) go(ch + 1, 0);
  else renderChapters();
}

/* ── Moving between steps ───────────────────────────────────────────────── */
async function go(c, s) {
  ch = c;
  st = s;
  const my = ++busy;
  const step = CHAPTERS[ch].steps[st];
  history.replaceState(null, "", `#${CHAPTERS[ch].id}/${st + 1}`);
  renderChapters();
  renderCard();
  if (!T) return;
  // A step may start from a screen as an earlier step left it (a ticked box, a typed
  // question): replay the chapter's patches up to here so jumping in mid-chapter shows
  // the same thing as walking to it.
  await T.show(step.screen);
  if (my !== busy) return;
  for (const earlier of CHAPTERS[ch].steps.slice(0, st)) {
    if (earlier.screen === step.screen && earlier.after) T.patch(earlier.after);
  }
  if (step.patch) T.patch(step.patch);
  if (step.spot) setTimeout(() => my === busy && T.spot(step.spot, step.spotOpts), 60);
  else T.unspot();
  if (step.type) {
    await new Promise((r) => setTimeout(r, 450));
    if (my === busy) await T.type(step.type[0], step.type[1]);
  }
}

/* ── Clicks inside the window ───────────────────────────────────────────── */
const PLACES = new Map(CHAPTERS.filter((c) => c.place).map((c, i) => [c.place, CHAPTERS.indexOf(c)]));

function onFrameClick({ el, x }) {
  const step = CHAPTERS[ch].steps[st];
  // The rail: any of its places opens that place's chapter.
  if (x < 64) {
    const ctl = el.closest("a,button,[role=tab],[role=button],[role=link]") || el;
    const label = [ctl.textContent, ctl.getAttribute("aria-label"), ctl.getAttribute("title")]
      .filter(Boolean)
      .map((t) => t.replace(/\s+/g, " ").trim())
      .join(" | ");
    for (const [place, i] of PLACES) {
      if (label.split(" | ").some((l) => l === place || l.endsWith(place) || l.startsWith(`${place} `))) return go(i, 0);
    }
  }
  // The step's own target, or anything inside it.
  const target = step.click === true ? step.spot : step.click;
  if (target) {
    const t = T.find(target);
    if (t && (t === el || t.contains(el))) {
      if (step.after) T.patch(step.after);
      return forward();
    }
  }
  // Links a chapter declares for free exploration: a row that opens the next screen.
  for (const link of CHAPTERS[ch].links || []) {
    const t = T.find(link.match);
    if (t && (t === el || t.contains(el))) return go(ch, link.step);
  }
  nudge();
}

let nudgeTimer = 0;
function nudge() {
  wrap.classList.remove("nudge");
  void wrap.offsetWidth;
  wrap.classList.add("nudge");
  clearTimeout(nudgeTimer);
  nudgeTimer = setTimeout(() => wrap.classList.remove("nudge"), 400);
  const step = CHAPTERS[ch].steps[st];
  if (step.spot) T.spot(step.spot, step.spotOpts);
}

/* ── Start ──────────────────────────────────────────────────────────────── */
function fromHash() {
  const m = /^#([\w-]+)(?:\/(\d+))?/.exec(location.hash);
  if (!m) return [0, 0];
  const i = CHAPTERS.findIndex((c) => c.id === m[1]);
  if (i < 0) return [0, 0];
  const n = Math.min(Math.max(Number(m[2] || 1) - 1, 0), CHAPTERS[i].steps.length - 1);
  return [i, n];
}

function attach() {
  T = frame.contentWindow?.slateTour;
  if (!T) return false;
  $(".win-loading")?.remove();
  T.listen(onFrameClick);
  T.preload([...new Set(CHAPTERS.flatMap((c) => c.steps.map((s) => s.screen)))].slice(0, 12));
  const [c, s] = fromHash();
  go(c, s);
  return true;
}
window.addEventListener("message", (e) => {
  if (e.source === frame.contentWindow && e.data?.slateTour === "ready") attach();
});
frame.addEventListener("load", () => {
  if (!T) attach();
});
const [c0, s0] = fromHash();
ch = c0;
st = s0;
renderChapters();
renderCard();
// The frame may have finished before this module ran, and its "ready" with it.
attach();
