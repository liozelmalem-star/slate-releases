import { CHAPTERS } from "./tour-chapters.js?v=20261108b";

/* The product, live, under the hero: the tour's own window (tour/app.html), with Slate's
 * real screens captured from the running app. The tabs open a place; so does the app's
 * own rail, and a row a tour chapter links (an artifact, a thread) opens its next screen.
 * Nothing moves by itself: a window that changes under someone exploring it is one they
 * cannot explore. The full tour, with its steps, is one link away. */
const CAPTIONS = {
  artifacts: "Artifacts keeps what your agents publish — a dashboard, a report, a page — with every version, and a box to ask for a change.",
  toolkit: "Toolkit keeps one set of skills, rules and MCP servers, and keeps every agent in sync with it.",
  home: "Home opens on what needs you — a session waiting on an answer, an automation asking first — and a box to ask anything.",
  sessions: "Sessions shows every AI session on your Mac, by project and branch: who is working, who is waiting on you.",
  memory: "Memory maps what your tools learned onto the files it cites, tidies itself with an Undo, and asks you only when two memories disagree.",
  automations: "Automations work through what you owe and write to a thread you can answer, on the agent you already use.",
  tasks: "Tasks gathers what you owe — reviews, issues, replies — beside your own to-dos.",
  projects: "Projects keeps plans, designs and bug reports beside the code and branch they belong to.",
  activity: "Activity turns every session into one board: what you did, where the time went, what Slate learned.",
  widgets: "Widgets are small apps your agent builds by asking, reading your workspace with no internet.",
  connect: "Connect signs every agent in once and reads your apps through Slate.",
  trash: "Trash keeps what you deleted until you empty it.",
  settings: "Settings: themes, privacy, and what Slate may send — off unless you turn it on.",
};
/* A tab names the screen it showed when the window was a picture. */
const TAB_CHAPTER = { standup: "automations" };

export function initShowcase() {
  const frame = document.getElementById("live-frame");
  const cap = document.getElementById("show-cap");
  const box = document.getElementById("live");
  const tabs = [...document.querySelectorAll(".show-tabs [data-shot]")];
  if (!frame || !box) return;

  // The captured window is 1320×860; scale it to the width it has, as the tour does.
  const fit = () => {
    const s = box.clientWidth / 1320;
    frame.style.transform = `scale(${s})`;
    box.style.height = `${Math.round(860 * s)}px`;
  };
  new ResizeObserver(fit).observe(box);
  fit();

  const byId = new Map(CHAPTERS.map((c) => [c.id, c]));
  const places = new Map(CHAPTERS.filter((c) => c.place).map((c) => [c.place, c.id]));
  let T = null;
  let chapter = byId.get("sessions");

  async function open(id, step = 0) {
    const c = byId.get(id);
    if (!c || !T) return;
    chapter = c;
    const s = c.steps[Math.min(step, c.steps.length - 1)];
    await T.show(s.screen);
    if (s.patch) T.patch(s.patch);
    T.unspot();
    if (cap) cap.textContent = CAPTIONS[id] ?? "";
    tabs.forEach((t) => t.setAttribute("aria-selected", String((TAB_CHAPTER[t.dataset.shot] ?? t.dataset.shot) === id)));
  }

  function onClick({ el, x }) {
    if (x < 64) {
      const ctl = el.closest("a,button,[role=tab],[role=button],[role=link]") || el;
      const label = [ctl.textContent, ctl.getAttribute("aria-label"), ctl.getAttribute("title")]
        .filter(Boolean)
        .map((t) => t.replace(/\s+/g, " ").trim());
      for (const [place, id] of places) {
        if (label.some((l) => l === place || l.endsWith(place) || l.startsWith(`${place} `))) return open(id);
      }
    }
    for (const link of chapter.links || []) {
      const t = T.find(link.match);
      if (t && (t === el || t.contains(el))) return open(chapter.id, link.step);
    }
  }

  function attach() {
    if (T) return;
    T = frame.contentWindow?.slateTour;
    if (!T) return;
    T.listen(onClick);
    open("sessions");
  }
  window.addEventListener("message", (e) => {
    if (e.source === frame.contentWindow && e.data?.slateTour === "ready") attach();
  });
  frame.addEventListener("load", attach);
  attach();

  tabs.forEach((t) => t.addEventListener("click", () => open(TAB_CHAPTER[t.dataset.shot] ?? t.dataset.shot)));
}
