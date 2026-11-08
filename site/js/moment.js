/* The hero film: one fixed story told over five real screens of Slate (Mint captures of the
 * running app, never redrawn). One requestAnimationFrame loop drives everything from a
 * virtual clock that stops while the film is hovered or the tab is hidden:
 *   - each screen is its own stacked layer; only opacity and transform change;
 *   - a layer's drift (a slow zoom toward its region) runs on the layer's own clock from the
 *     moment it starts to fade in until it has faded out, so motion never restarts on screen;
 *   - crossfades last FADE ms with an ease-in-out curve;
 *   - captions fade in 200 ms after their screen starts and out just before it hands over. */
(function () {
const SCENES = [
  { day: "Monday", mode: "Without Slate",
    story: "You tell Claude Code: \u201cUse pnpm in Atlas, not npm.\u201d It says it got it.",
    real: "In Slate: the Claude Code session, live, with its terminal, progress and links." },
  { day: "Tuesday", mode: "Without Slate",
    story: "Codex starts fresh in Atlas. It never heard it.",
    real: "In Slate: every live session on this Mac, by project. Amber needs you, lime is working." },
  { day: "Wednesday", mode: "Without Slate",
    story: "So you explain it again. And again next week.",
    real: "In Slate: Home puts the session that is asking you something first." },
  { day: "Thursday", mode: "With Slate",
    story: "With Slate, it is saved once, as a memory.",
    real: "In Slate: Memory. \u201cUse pnpm in Atlas, not npm\u201d is one of six memories every agent can recall." },
  { day: "Every day after", mode: "With Slate",
    story: "Claude Code and Codex both start with it. Explained once.",
    real: "In Slate: Activity. Three sessions across Claude Code and Codex, and the memory they learned." }
];
const HOLD = 4500;   // how long a scene owns the frame
const FADE = 1200;   // crossfade length
const CAP_IN = 200, CAP_FADE = 380;

const stage = document.getElementById("stage");
if (!stage) return;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = id => document.getElementById(id);
const shots = [...stage.querySelectorAll(".film-shot")];
const cap = $("cap"), real = $("real");
const N = SCENES.length;

const ease = x => x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x);              // smoothstep
const drift = x => x <= 0 ? 0 : x >= 1 ? 1 : 0.5 - 0.5 * Math.cos(Math.PI * x); // ease-in-out sine

// Per layer: opacity animates from `from` to `to`, starting at `t0`; the drift clock starts at `act`.
const layers = shots.map(img => ({ img, from: 0, to: 0, t0: -1e9, act: -1e9,
  z: reduce ? 1 : parseFloat(img.dataset.z) || 1, op: 0 }));
layers.forEach(l => { l.img.style.transformOrigin = l.img.dataset.o; });

// Steps: a label and a thin progress line per scene.
const steps = $("steps");
steps.innerHTML = SCENES.map((sc, i) =>
  `<button type="button" role="tab" data-s="${i}" aria-label="${sc.day}: ${sc.story}"><span>${sc.day}</span><i><b></b></i></button>`).join("");
const bars = [...steps.querySelectorAll("b")];
const tabs = [...steps.querySelectorAll("button")];

let vt = 0, last = null, scene = 0, sceneAt = 0, capAt = 0, started = false, hover = false, hidden = document.hidden;
let auto = !reduce, capScene = -1;

function opacityOf(l) { return l.from + (l.to - l.from) * ease((vt - l.t0) / FADE); }

function show(n) {
  const prev = scene;
  scene = n; sceneAt = vt; capAt = vt;
  layers.forEach((l, i) => {
    const now = opacityOf(l);
    if (i === n) {
      if (now < 0.01) l.act = vt;          // invisible: its drift may start fresh
      l.from = now; l.to = 1; l.t0 = vt;
    } else if (l.to !== 0) {
      l.from = now; l.to = 0; l.t0 = vt;   // keeps drifting on its own clock while it fades
    }
  });
  const sc = SCENES[n];
  $("day").textContent = sc.day;
  $("mode").textContent = sc.mode;
  stage.classList.toggle("with", sc.mode === "With Slate");
  tabs.forEach((b, i) => b.setAttribute("aria-selected", String(i === n)));
  if (prev !== n || capScene === -1) capScene = -1; // caption text swaps when it is invisible
}

function frame(now) {
  const playing = started && auto && !hover && !hidden;
  if (last !== null && (playing || anyFading())) vt += Math.min(now - last, 64);
  last = now;
  if (playing && vt - sceneAt >= HOLD) show((scene + 1) % N);

  layers.forEach(l => {
    const o = opacityOf(l);
    l.op = o;
    const k = reduce ? 0 : drift((vt - l.act) / (HOLD + FADE));
    const s = 1 + (l.z - 1) * k;
    l.img.style.opacity = o.toFixed(3);
    l.img.style.transform = `translate3d(0,0,0) scale(${s.toFixed(4)})`;
  });

  // Caption: in CAP_IN ms after its screen starts; out just before an automatic hand-over.
  const into = vt - sceneAt, capInto = vt - capAt;
  if (capScene !== scene && capInto >= CAP_IN) {
    cap.textContent = SCENES[scene].story; real.textContent = SCENES[scene].real; capScene = scene;
  }
  let co = capScene === scene ? Math.min(1, (capInto - CAP_IN) / CAP_FADE) : 0;
  if (auto && !reduce) co = Math.min(co, Math.max(0, (HOLD - into) / 220));
  cap.style.opacity = real.style.opacity = Math.max(0, co).toFixed(3);

  bars.forEach((b, i) => {
    const p = i < scene ? 1 : i > scene ? 0 : (auto ? Math.min(1, into / HOLD) : 1);
    b.style.transform = `scaleX(${p.toFixed(4)})`;
  });
  requestAnimationFrame(frame);
}
function anyFading() { return layers.some(l => vt - l.t0 < FADE) || vt - capAt < CAP_IN + CAP_FADE; }

steps.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  const n = +b.dataset.s;
  if (n !== scene) show(n); else sceneAt = vt;
});
stage.addEventListener("pointerenter", () => { hover = true; });
stage.addEventListener("pointerleave", () => { hover = false; });
document.addEventListener("visibilitychange", () => { hidden = document.hidden; });

// First frame: Monday, whole, caption ready. Motion starts once every screen is decoded and
// the film is on screen, so a visitor who lands lower does not miss Monday.
layers[0].from = layers[0].to = 1; layers[0].t0 = -1e9; layers[0].act = Infinity; // no drift before it plays
show(0);
requestAnimationFrame(frame);
const decoded = Promise.all(shots.map(i => (i.decode ? i.decode() : Promise.resolve()).catch(() => {})));
const inView = new Promise(res => {
  if (!("IntersectionObserver" in window)) return res();
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); res(); } }, { threshold: 0.35 });
  io.observe(stage);
});
Promise.all([decoded, inView]).then(() => { started = true; layers[0].act = vt; sceneAt = vt; });
})();
