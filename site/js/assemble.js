/* The story beside the five places.
 *
 * A large mark stays pinned while the five sections scroll. Before a place is
 * reached its leaf is grey and pushed apart from the others; the place being read
 * lights its leaf and glows; places already read stay lit. The spread closes as the
 * reader moves down, so after the fifth the leaves sit together as the whole mark —
 * and the "One Slate" section below lights it once more, top to bottom. */
const SPREAD = { red: -1, amber: -0.5, teal: 0, blue: 0.5, green: 1 };

export function initAssemble() {
  const mark = document.querySelector(".big-mark");
  const cap = document.querySelector(".story-cap");
  const steps = [...document.querySelectorAll(".step[data-leaf]")];
  const leaves = mark ? [...mark.querySelectorAll(".lf")] : [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (mark && steps.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const mid = innerHeight * 0.5;
      let cur = -1;
      steps.forEach((st, i) => {
        if (st.getBoundingClientRect().top < mid) cur = i;
      });
      // 0 before the first place, 1 once the last has been read.
      const last = steps[steps.length - 1].getBoundingClientRect();
      const done = last.bottom < innerHeight * 0.75;
      const progress = done ? 1 : Math.max(0, cur + 1) / (steps.length + 1);
      const gap = reduced ? 0 : (1 - progress) * 70;
      for (const lf of leaves) {
        const leaf = lf.dataset.leaf;
        const idx = steps.findIndex((s) => s.dataset.leaf === leaf);
        const lit = done || (idx >= 0 && idx <= cur);
        lf.classList.toggle("lit", lit);
        lf.classList.toggle("now", !done && idx === cur);
        lf.style.transform = `translateY(${SPREAD[leaf] * gap}px)`;
      }
      steps.forEach((st, i) => {
        st.classList.toggle("now", i === cur);
        st.classList.toggle("seen", i < cur);
      });
      const s = steps[cur];
      cap.querySelector("b").textContent = done ? "One Slate" : s ? s.dataset.name : "Five places";
      cap.querySelector("span").textContent = done ? "all five, together" : s ? `${cur + 1} of ${steps.length}` : "scroll to build it";
    };
    addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    addEventListener("resize", update);
    update();
  }

  // The payoff mark ships fully lit; with JavaScript its leaves light one by one,
  // top to bottom, when the section comes into view.
  const hero = document.querySelector("#one .mk-hero");
  if (hero && "IntersectionObserver" in window && !reduced) {
    const order = ["red", "amber", "teal", "blue", "green"];
    hero.dataset.on = "";
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      order.forEach((_, i) =>
        setTimeout(() => {
          hero.dataset.on = order.slice(0, i + 1).join(" ");
        }, 250 + i * 260),
      );
    }, { threshold: 0.4 });
    io.observe(hero);
  }
}
