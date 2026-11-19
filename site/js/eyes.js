// Slate Bot's eyes in the hero follow the pointer, as they do on the Sessions map
// (packages/ui/src/pages/Sessions/parts/SessionGraph/use-eyes-follow.ts): moved straight on
// the element once a frame, back to centre when the pointer leaves, still under reduced motion.
const eyes = document.querySelector(".hero-world .b-eyes");
const bot = document.querySelector(".hero-world .bot");
if (eyes && bot && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const REACH = 2.2;
  let at = null;
  let frame = 0;
  const draw = () => {
    frame = 0;
    if (!at) return void (eyes.style.transform = "");
    const box = bot.getBoundingClientRect();
    const dx = at.x - (box.left + box.width / 2);
    const dy = at.y - (box.top + box.height / 2);
    const length = Math.hypot(dx, dy) || 1;
    const pull = Math.min(1, length / box.width) * REACH;
    eyes.style.transform = `translate(${(dx / length) * pull}px, ${(dy / length) * pull}px)`;
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
  addEventListener("pointermove", (e) => { at = { x: e.clientX, y: e.clientY }; schedule(); });
  document.documentElement.addEventListener("pointerleave", () => { at = null; schedule(); });
}
