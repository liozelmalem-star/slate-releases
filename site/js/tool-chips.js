import { reduced } from "./motion.js";

/* The connected-tool chips, lighting in sequence. */
export function initToolChips() {
// Mirrors what actually happens on first launch: Slate finds each tool and registers
// itself, one after another. What changes is only the chip's leaf mark — the control
// stays one control, which is why kind lives in the mark and not in the border.
const tools = [...document.querySelectorAll("#tools .tool")];
if (reduced) {
  tools.forEach((t) => t.classList.add("lit"));
} else if ("IntersectionObserver" in window) {
  const toolIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        tools.forEach((t, i) => setTimeout(() => t.classList.add("lit"), 260 + i * 190));
        toolIo.disconnect();
      }
    },
    { threshold: 0.5 },
  );
  if (tools[0]) toolIo.observe(tools[0].parentElement);
} else {
  tools.forEach((t) => t.classList.add("lit"));
}
}
