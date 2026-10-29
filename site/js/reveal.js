import { reduced } from "./motion.js";

/* Fade sections in as they are scrolled to.
 *
 * Exported as a function over a node list rather than run over the whole document
 * on load, because a section can arrive LATE — the release strip un-hides "What's
 * new" only after its fetch lands, and a section that was hidden when the observer
 * first swept the page would otherwise stay invisible forever. */
export function reveal(nodes) {
  const list = [...nodes];
  if (!list.length) return;

  if (reduced || !("IntersectionObserver" in window)) {
    for (const el of list) el.classList.add("in");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        io.unobserve(e.target); // one-way: scrolling back up must not re-animate
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  for (const el of list) io.observe(el);
}
