import { reduced } from "./motion.js";
import { THEME_EVENT } from "./theme.js";
import { SLAB_MIN_HEIGHT, SLAB_HUB_HEIGHT_RATIO, traceSlab } from "./slab.js";

/* The memory graph behind the landing page.
 *
 * Deliberately the same picture Slate's own graph draws: hubs with atoms spoked
 * off them, faint similarity threads between hubs, and a pulse travelling the path
 * a recall takes. It is atmosphere — the #veil over it exists so it never wins
 * against a sentence.
 *
 * It LISTENS for `slate:theme` rather than being called by the switcher. A canvas
 * is the one surface on this site that cannot re-paint from CSS, because it holds
 * resolved colours; everything else re-paints itself. Keeping that as an event is
 * why the switcher and the graph never import each other.
 */
export function initGraph() {
  // Deliberately the same picture Slate's own graph draws (see the app's
  // memory-graph renderer): hubs with atoms spoked off them, faint similarity
  // threads between hubs, and a pulse travelling the path a recall takes.
  //
  // A hub is the mark's slab and wears its project's leaf; an atom is a plain dot.
  // Both of those are the app's rules rather than choices made here — structural
  // hubs take the logo's shape while atoms stay round (ADR 0021), and an atom at
  // one or two pixels is under SLAB_MIN_HEIGHT anyway, where the rule says circle.
  //
  // The four hues are the four a project may take: green is left out because it
  // sits 16° from teal and the two cannot be told apart as small marks.
  const canvas = document.getElementById("graph");
  // Every module on this site no-ops when its element is absent, so a page can
  // compose the parts it wants without the others throwing on the way past.
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  // Amber takes its 600 here and its 400 everywhere else on the page — see the
  // token block. A hub is the largest area of leaf colour anywhere on this page,
  // which is where the lightness difference between the hues stops being invisible.
  // Every colour the canvas paints comes out of the token block, resolved through
  // getComputedStyle. Nothing here states an rgb value, which is the same rule the
  // app's renderer follows — a leaf names a hue and `--leaf-*` says what it is, so
  // a re-hue moves everything at once.
  //
  // Resolved into `pal` rather than read per node: getComputedStyle is not free and
  // this runs on every animation tick. `readPalette()` is called again on a theme
  // change, which is the only time any of it moves.
  const HUBS = ["--hub-blue", "--hub-amber", "--hub-teal", "--hub-red"];
  const css = () => getComputedStyle(document.documentElement);
  let pal;

  function readPalette() {
    const c = css();
    // "18 21 27" → "18,21,27", so it can be dropped straight into rgba().
    const rgb = (name) => c.getPropertyValue(name).trim().replace(/ +/g, ",");
    const num = (name) => parseFloat(c.getPropertyValue(name)) || 0;
    pal = {
      hubs: HUBS.map(rgb),
      hubA: num("--graph-hub-a"),
      atom: rgb("--graph-atom"),
      atomA: num("--graph-atom-a"),
      spokeA: num("--graph-spoke-a"),
      threadA: num("--graph-thread-a"),
      pulse: rgb("--graph-pulse"),
      core: rgb("--graph-core"),
    };
  }
  readPalette();

  let hubs = [];
  let threads = [];
  let pulses = [];
  let w = 0;
  let h = 0;
  let raf = 0;

  const rand = (a, b) => a + Math.random() * (b - a);

  function layout() {
    const dpr = Math.min(devicePixelRatio || 1, 2); // cap: a 3x buffer costs fill rate for no visible gain
    w = innerWidth;
    h = innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fewer, smaller hubs on a phone — the graph is atmosphere, not content, and it
    // must never compete with the install command for either attention or battery.
    const narrow = w < 720;
    const hubCount = narrow ? 3 : 5;
    const scale = Math.min(w, h) / (narrow ? 620 : 900);

    hubs = Array.from({ length: hubCount }, (_, i) => {
      // Spread hubs on a loose ring so they never stack, then jitter so it does not
      // read as a clock face.
      const a = (i / hubCount) * Math.PI * 2 + rand(-0.35, 0.35);
      const r = Math.min(w, h) * rand(0.26, 0.46);
      const atomCount = Math.round(rand(4, 8));
      return {
        x: w / 2 + Math.cos(a) * r,
        y: h / 2 + Math.sin(a) * r,
        // A hub with more atoms gets a bigger ring rather than cramming everyone onto
        // the same radius — the app's spoke sizing, in miniature.
        orbit: (54 + atomCount * 7) * scale,
        // The mark itself does NOT scale below the floor. A slab drawn shorter than
        // SLAB_MIN_HEIGHT stops being one, and the fix is to clamp rather than to
        // shallow the angle — so on a phone the hubs simply stay this size.
        mark: Math.max(SLAB_MIN_HEIGHT / SLAB_HUB_HEIGHT_RATIO, 30 * scale),
        // An index, not a colour: the palette is re-resolved on a theme change and
        // the hubs keep their identity across it.
        hue: i % HUBS.length,
        angle: rand(0, Math.PI * 2),
        speed: rand(0.00008, 0.00022) * (Math.random() < 0.5 ? -1 : 1),
        drift: rand(0, Math.PI * 2),
        atoms: Array.from({ length: atomCount }, (_, j) => ({
          offset: (j / atomCount) * Math.PI * 2 + rand(-0.2, 0.2),
          r: rand(0.82, 1.12),
          size: rand(1.1, 2.2) * scale,
        })),
      };
    });

    // Similarity threads: a handful of cross-hub links, the thing that makes this a
    // graph rather than a set of separate wheels.
    threads = [];
    for (let i = 0; i < hubs.length; i++) {
      const j = (i + 1 + Math.floor(Math.random() * (hubs.length - 1))) % hubs.length;
      if (i === j) continue;
      threads.push({
        a: i,
        b: j,
        ai: Math.floor(Math.random() * hubs[i].atoms.length),
        bi: Math.floor(Math.random() * hubs[j].atoms.length),
      });
    }
    pulses = [];
  }

  function atomPos(hub, atom) {
    const a = hub.angle + atom.offset;
    return {
      x: hub.x + Math.cos(a) * hub.orbit * atom.r,
      y: hub.y + Math.sin(a) * hub.orbit * atom.r,
    };
  }

  function spawnPulse() {
    if (!threads.length || pulses.length >= 2) return;
    pulses.push({ thread: threads[Math.floor(Math.random() * threads.length)], t: 0 });
  }

  // Rounded joins everywhere, and a stroke in the fill's own colour — the same pair
  // of attributes the app uses to round a slab. The artwork has no sharp point, so
  // neither does anything drawn from it.
  ctx.lineJoin = "round";

  function draw(now) {
    ctx.clearRect(0, 0, w, h);
    ctx.lineJoin = "round";

    for (const hub of hubs) {
      hub.angle += hub.speed * 16;
      // A slow bob so the composition never sits perfectly still.
      const bob = Math.sin(now * 0.00016 + hub.drift) * 5;

      // Spokes
      ctx.lineWidth = 1;
      for (const atom of hub.atoms) {
        const p = atomPos(hub, atom);
        const grad = ctx.createLinearGradient(hub.x, hub.y + bob, p.x, p.y + bob);
        grad.addColorStop(0, `rgba(${pal.hubs[hub.hue]},${pal.spokeA})`);
        grad.addColorStop(1, `rgba(${pal.atom},0.015)`);
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(hub.x, hub.y + bob);
        ctx.lineTo(p.x, p.y + bob);
        ctx.stroke();
      }

      // Atoms. Neutral, and round: they are anonymous here — there is no fact kind
      // for them to state, and inventing one would be paint rather than punctuation.
      for (const atom of hub.atoms) {
        const p = atomPos(hub, atom);
        ctx.fillStyle = `rgba(${pal.atom},${pal.atomA})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y + bob, atom.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // The hub: one slab, in its project's leaf.
      const paint = `rgba(${pal.hubs[hub.hue]},${pal.hubA})`;
      traceSlab(ctx, hub.x, hub.y + bob, hub.mark);
      ctx.fillStyle = paint;
      ctx.strokeStyle = paint;
      ctx.lineWidth = Math.max(1, hub.mark * 0.12);
      ctx.fill();
      ctx.stroke();
    }

    // Similarity threads
    ctx.lineWidth = 1;
    for (const t of threads) {
      const A = hubs[t.a];
      const B = hubs[t.b];
      if (!A || !B) continue;
      const pa = atomPos(A, A.atoms[t.ai]);
      const pb = atomPos(B, B.atoms[t.bi]);
      ctx.strokeStyle = `rgba(${pal.atom},${pal.threadA})`;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }

    // Recall pulses travelling a thread. In the accent: a recall is the app doing
    // something, and the app says that in brand.
    for (let i = pulses.length - 1; i >= 0; i--) {
      const pulse = pulses[i];
      pulse.t += 0.0055;
      if (pulse.t >= 1) {
        pulses.splice(i, 1);
        continue;
      }
      const A = hubs[pulse.thread.a];
      const B = hubs[pulse.thread.b];
      if (!A || !B) {
        pulses.splice(i, 1);
        continue;
      }
      const pa = atomPos(A, A.atoms[pulse.thread.ai]);
      const pb = atomPos(B, B.atoms[pulse.thread.bi]);
      const x = pa.x + (pb.x - pa.x) * pulse.t;
      const y = pa.y + (pb.y - pa.y) * pulse.t;
      // Fade in and out so it never pops at either end.
      const alpha = Math.sin(pulse.t * Math.PI) * 0.7;
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 16);
      glow.addColorStop(0, `rgba(${pal.pulse},${alpha * 0.55})`);
      glow.addColorStop(1, `rgba(${pal.pulse},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(${pal.core},${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.7, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(draw);
  }

  function start() {
    layout();
    if (reduced) {
      draw(0);                    // one static frame: the composition, none of the motion
      cancelAnimationFrame(raf);
      return;
    }
    raf = requestAnimationFrame(draw);
    setInterval(spawnPulse, 2600);
  }

  // A hidden tab should not be animating; browsers throttle rAF anyway, but stopping
  // outright means a backgrounded page costs nothing at all.
  document.addEventListener("visibilitychange", () => {
    if (reduced) return;
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
  });

  // The canvas holds resolved colours, so a theme change has to be handed to it.
  document.addEventListener(THEME_EVENT, () => {
    readPalette();
    if (reduced) draw(0); // no rAF loop is running to pick the change up on its own
  });

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    // Rebuilding the layout mid-drag would thrash; settle first.
    resizeTimer = setTimeout(() => {
      layout();
      if (reduced) draw(0);
    }, 180);
  });

  start();
}
