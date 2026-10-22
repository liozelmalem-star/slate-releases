import { reduced } from "./motion.js";

/* The hero's window: five real screens of Slate behind five tabs. It moves on by
 * itself every few seconds until the reader picks a tab, and then it stays put —
 * a carousel that keeps moving under someone who is reading it is a carousel
 * nobody can read. Reduced motion never advances it at all. */
const CAPTIONS = {
  artifacts: "Artifacts keeps what your AI tools publish — a dashboard, a report, a page — with every version, and a box to ask for a change.",
  toolkit: "Toolkit keeps one set of skills, rules and MCP servers, and keeps every AI tool in sync with it.",
  home: "Home opens on what needs you — a session waiting on an answer, an agent asking first — and a box to ask anything.",
  sessions: "Sessions shows every AI session on your Mac, by project and branch: who is working, who is waiting on you.",
  memory: "Memory maps what your tools learned onto the files it cites, and holds proposed changes for you to review.",
  standup: "Agents work through what you owe and write to a thread you can answer. This one posts a standup every weekday at 7:00.",
  tasks: "Tasks gathers what you owe — reviews, issues, replies — beside your own to-dos, with reminders.",
};
const ALTS = {
  artifacts: "An artifact named Checkout funnel: conversion figures and a bar chart an AI tool published",
  toolkit: "Toolkit: a project's skills, in sync with every AI tool",
  home: "Slate's Home: ten things need you, with a session waiting on an answer at the top",
  sessions: "Sessions: the live list grouped by project beside a map of every session on this computer",
  memory: "Memory: memories mapped onto the folders they cite, with proposed changes waiting for review",
  standup: "The Standup agent's thread: a report per project for yesterday and today",
  tasks: "Tasks: to-dos, review requests and Slack replies that need you",
};

export function initShowcase() {
  const tabs = [...document.querySelectorAll(".show-tabs [data-shot]")];
  const img = document.getElementById("show-img");
  const cap = document.getElementById("show-cap");
  if (!tabs.length || !img) return;

  // Warm the cache so a switch never shows a half-loaded frame.
  for (const t of tabs) {
    const pre = new Image();
    pre.src = `assets/shots/${t.dataset.shot}${window.devicePixelRatio > 1 ? "" : "-1x"}.webp`;
  }

  let i = 0;
  let timer = 0;
  function show(n) {
    i = (n + tabs.length) % tabs.length;
    const id = tabs[i].dataset.shot;
    tabs.forEach((t, k) => t.setAttribute("aria-selected", String(k === i)));
    img.classList.add("fading");
    setTimeout(() => {
      img.srcset = `assets/shots/${id}-1x.webp 1320w, assets/shots/${id}.webp 2640w`;
      img.src = `assets/shots/${id}.webp`;
      img.alt = ALTS[id];
      cap.textContent = CAPTIONS[id];
      img.onload = () => img.classList.remove("fading");
      if (img.complete) img.classList.remove("fading");
    }, reduced ? 0 : 180);
  }
  tabs.forEach((t, k) =>
    t.addEventListener("click", () => {
      clearInterval(timer);
      show(k);
    }),
  );
  if (!reduced) timer = setInterval(() => show(i + 1), 6000);
}
