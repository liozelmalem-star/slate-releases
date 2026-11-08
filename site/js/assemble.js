/* The story beside the five places.
 *
 * Each place's own icon (the app's family mark) stays pinned beside the five sections
 * and crossfades to the place being read, in the brand's tones, the way the app's rail
 * lights a place when it is selected. The Slate mark shows before the first place and
 * after the last. */
export function initAssemble() {
  const stack = document.querySelector(".place-stack");
  const cap = document.querySelector(".story-cap");
  const steps = [...document.querySelectorAll(".step[data-name]")];
  const icons = stack ? [...stack.querySelectorAll(".place-icon")] : [];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (stack && steps.length) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const mid = innerHeight * 0.5;
      let cur = -1;
      steps.forEach((st, i) => {
        if (st.getBoundingClientRect().top < mid) cur = i;
      });
      const last = steps[steps.length - 1].getBoundingClientRect();
      const done = last.bottom < innerHeight * 0.75;
      const name = !done && steps[cur] ? steps[cur].dataset.name : "";
      for (const ic of icons) ic.classList.toggle("on", ic.dataset.for === name);
      steps.forEach((st, i) => {
        st.classList.toggle("now", i === cur);
        st.classList.toggle("seen", i < cur);
      });
      cap.querySelector("b").textContent = done ? "One Slate" : name || "Five places";
      cap.querySelector("span").textContent = done ? "all five, together" : name ? `${cur + 1} of ${steps.length}` : "one home for your agents";
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
