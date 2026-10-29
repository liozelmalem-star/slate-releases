import { reduced } from "./motion.js";

/* The loop demo: two tool sessions writing and reading one memory. */
export function initDemo() {
// A step machine, not a CSS animation: the beats have to be reordered and
// retimed as the copy changes, and every step is the same operation — reveal a
// line that is already in the DOM. Nothing here is created or measured at play
// time except the spark's two endpoints.
const demo = document.getElementById("demo");
if (demo) {
  const frame = demo.querySelector(".demo-frame");
  const spark = demo.querySelector(".demo-spark");
  const steps = new Map([...demo.querySelectorAll("[data-step]")].map((el) => [el.dataset.step, el]));
  const typers = new Map([...demo.querySelectorAll("[data-type]")].map((el) => [el.dataset.type, el]));
  const empty = demo.querySelector(".demo-empty");
  const atom = demo.querySelector(".demo-atom");
  const count = demo.querySelector("[data-count]");

  // The atom's `last_confirmed_at`, which FactRow prints as a bare YYYY-MM-DD.
  // Stamped from the clock rather than written into the markup: a hard-coded
  // date is correct on the day it ships and stale every day after.
  const today = demo.querySelector("[data-today]");
  if (today) today.textContent = new Date().toISOString().slice(0, 10);

  const TEXT = {
    p1: "we'll use SQLite, not Postgres — it has to work offline",
    p2: "why are we on sqlite here?",
  };

  let timers = [];
  let typer = 0;

  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const show = (key) => steps.get(key)?.classList.add("on");

  function reset() {
    for (const t of timers) clearTimeout(t);
    timers = [];
    clearInterval(typer);
    for (const el of steps.values()) el.classList.remove("on");
    for (const el of typers.values()) {
      el.textContent = "";
      el.classList.remove("typing");
    }
    atom.classList.remove("hit");
    empty.classList.remove("gone");
    count.textContent = "0";
  }

  function type(key) {
    const el = typers.get(key);
    const full = TEXT[key];
    let i = 0;
    el.textContent = "";
    el.classList.add("typing");
    clearInterval(typer);
    typer = setInterval(() => {
      el.textContent = full.slice(0, (i += 1));
      if (i >= full.length) {
        clearInterval(typer);
        el.classList.remove("typing");
      }
    }, 26);
  }

  // The spark arcs between the real boxes of the two ends, read at play time.
  // That is what lets the panes sit side by side on a laptop and stacked on a
  // phone without this knowing which — a hand-drawn path would only be right
  // in one of the two layouts.
  function fly(fromEl, toEl) {
    if (!spark.animate) return;
    const f = frame.getBoundingClientRect();
    const a = fromEl.getBoundingClientRect();
    const b = toEl.getBoundingClientRect();
    const x0 = a.left - f.left + Math.min(a.width, 120);
    const y0 = a.top - f.top + a.height / 2;
    const x1 = b.left - f.left + Math.min(b.width, 60);
    const y1 = b.top - f.top + b.height / 2;
    spark.animate(
      [
        { transform: `translate(${x0}px, ${y0}px) scale(.3)`, opacity: 0 },
        { transform: `translate(${(x0 + x1) / 2}px, ${(y0 + y1) / 2 - 26}px) scale(1)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${x1}px, ${y1}px) scale(.3)`, opacity: 0 },
      ],
      { duration: 760, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }

  // The beats, in ms from the top. Read it as the story: type, call, write,
  // a day passes, ask, call, read, answer.
  function play() {
    reset();
    at(200, () => show("s1"));
    at(500, () => { show("p1"); type("p1"); });
    at(2200, () => show("c1"));
    at(2950, () => { show("k1"); fly(steps.get("c1"), atom); });
    at(3500, () => { empty.classList.add("gone"); show("atom"); count.textContent = "1"; });
    at(4600, () => show("day"));
    at(5000, () => show("s2"));
    at(5300, () => { show("p2"); type("p2"); });
    at(6300, () => show("c2"));
    // The read runs the other way, and the row rings for exactly as long as it
    // is being read. Nothing about the atom changes: `uses_count` is NOT moved
    // by a recall — offering a fact is not evidence that it helped, and the
    // counter only moves later, when the watcher judges the transcript
    // (server/src/operations/consolidate/recall-attribution.ts).
    at(6900, () => { atom.classList.add("hit"); fly(atom, steps.get("c2")); });
    at(7650, () => show("r2"));
    at(8400, () => { show("a2"); atom.classList.remove("hit"); });
    at(12400, play);
  }

  // The finished frame, for reduced motion and for anything without the APIs
  // this needs. It is a legitimate still of the end state, not a fallback that
  // says less: every line is there, both tools have run, the atom is stored.
  function still() {
    for (const el of steps.values()) el.classList.add("on");
    for (const [key, el] of typers) el.textContent = TEXT[key];
    empty.classList.add("gone");
    count.textContent = "1";
  }

  if (reduced || !("IntersectionObserver" in window)) {
    still();
  } else {
    // Two independent conditions gate playback and neither may clobber the
    // other's state, so both are recorded and one function decides.
    let onScreen = false;
    let playing = false;

    function sync() {
      const run = onScreen && !document.hidden;
      if (run === playing) return;
      playing = run;
      if (run) play();
      else reset();
    }

    new IntersectionObserver(
      (entries) => {
        for (const e of entries) onScreen = e.isIntersecting;
        sync();
      },
      { threshold: 0.3 },
    ).observe(frame);

    document.addEventListener("visibilitychange", sync);
  }
}
}
