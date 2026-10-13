/* The mark that assembles beside the five places.
 *
 * Each pillar section names its leaf (data-leaf) and its place (data-name). As the
 * reader scrolls, every pillar whose top has passed the middle of the screen lights
 * its leaf on the sticky mark, so the full mark is complete exactly when the fifth
 * place has been read — and the "One Slate" section below it shows the whole thing.
 * Scrolling back up turns leaves off again: the mark always says where you are. */
export function initAssemble() {
  const box = document.querySelector(".assemble");
  const mark = box?.querySelector(".mk");
  const cap = box?.querySelector(".assemble-cap");
  const pillars = [...document.querySelectorAll(".pillar[data-leaf]")];
  const one = document.getElementById("one");
  if (!box || !mark || !pillars.length) return;

  let ticking = false;
  function update() {
    ticking = false;
    const mid = innerHeight * 0.55;
    const lit = pillars.filter((p) => p.getBoundingClientRect().top < mid);
    mark.dataset.on = lit.map((p) => p.dataset.leaf).join(" ");
    const first = pillars[0].getBoundingClientRect().top;
    const done = one ? one.getBoundingClientRect().top < mid : false;
    box.classList.toggle("on", first < innerHeight * 0.8 && !done);
    const cur = lit[lit.length - 1];
    cap.textContent = cur ? `${cur.dataset.name} · ${lit.length} of 5` : "";
  }
  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  addEventListener("resize", update);
  update();

  // The payoff mark ships fully lit, so it reads without JavaScript; with it, the leaves
  // go dark and light one by one, top to bottom, when the section comes into view.
  const hero = one?.querySelector(".mk-hero");
  if (hero && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const all = hero.dataset.on.split(" ");
    const order = ["red", "amber", "teal", "blue", "green"].filter((l) => all.includes(l));
    hero.dataset.on = "";
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      order.forEach((leaf, i) =>
        setTimeout(() => { hero.dataset.on = order.slice(0, i + 1).join(" "); }, 250 + i * 260),
      );
    }, { threshold: 0.4 });
    io.observe(hero);
  }
}
