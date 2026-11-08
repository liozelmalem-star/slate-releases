// The published docs' behaviour: search (⌘K or /), the copy-page menu, code Copy buttons,
// the theme switch, the outline's reading position and the narrow-window menu. Plain
// browser JavaScript with no dependencies. Generated into the site by `yarn docs:build`;
// edit it in packages/infra/src/jobs/docs-site/kit/, never in slate-releases.

const root = document.body.dataset.docsRoot || "./";
const toastEl = document.querySelector(".toast");
let toastTimer = 0;

function toast(text) {
  if (!toastEl) return;
  toastEl.textContent = text;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.hidden = true;
  }, 2600);
}

async function copy(text, said) {
  try {
    await navigator.clipboard.writeText(text);
    toast(said);
  } catch {
    toast("Copy failed: your browser blocked the clipboard");
  }
}

// ── theme ────────────────────────────────────────────────────────────────────

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("slate-theme", next);
  } catch {}
});

document.querySelector("[data-menu]")?.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

// ── code blocks ──────────────────────────────────────────────────────────────

for (const button of document.querySelectorAll(".copy-code")) {
  button.addEventListener("click", () => {
    const code = button.parentElement?.querySelector("code")?.textContent ?? "";
    copy(code, "Code copied");
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy";
    }, 1600);
  });
}

// ── the copy-page menu ───────────────────────────────────────────────────────

const pageMenu = document.querySelector(".copy-page");
if (pageMenu) {
  const md = pageMenu.dataset.md;
  const url = pageMenu.dataset.mdUrl;
  const more = pageMenu.querySelector(".copy-page-more");
  const list = pageMenu.querySelector(".copy-page-menu");
  const close = () => {
    list.hidden = true;
    more.setAttribute("aria-expanded", "false");
  };
  more.addEventListener("click", (e) => {
    e.stopPropagation();
    list.hidden = !list.hidden;
    more.setAttribute("aria-expanded", String(!list.hidden));
  });
  document.addEventListener("click", (e) => {
    if (!pageMenu.contains(e.target)) close();
  });
  for (const b of pageMenu.querySelectorAll("[data-copy-md]")) {
    b.addEventListener("click", async () => {
      close();
      try {
        const text = await (await fetch(md)).text();
        copy(text, "Page copied as markdown");
      } catch {
        toast("Could not read this page's markdown");
      }
    });
  }
  for (const b of pageMenu.querySelectorAll("[data-open]")) {
    b.addEventListener("click", () => {
      close();
      const tool = b.dataset.open;
      const prompt = `Read this page of the Slate docs and use it to help me: ${url}`;
      copy(prompt, `Prompt copied. Paste it into ${tool}.`);
    });
  }
}

// ── the outline follows the reading position ─────────────────────────────────

const tocLinks = [...document.querySelectorAll(".toc a")];
if (tocLinks.length > 0 && "IntersectionObserver" in window) {
  const byId = new Map(tocLinks.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const seen = new Set();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) seen.add(e.target.id);
        else seen.delete(e.target.id);
      }
      const first = [...byId.keys()].find((id) => seen.has(id));
      if (!first) return;
      for (const a of tocLinks) a.classList.toggle("on", a === byId.get(first));
    },
    { rootMargin: "-100px 0px -60% 0px" },
  );
  for (const id of byId.keys()) {
    const h = document.getElementById(id);
    if (h) observer.observe(h);
  }
}

// ── search ───────────────────────────────────────────────────────────────────

const dialog = document.querySelector("dialog.search");
const input = dialog?.querySelector("input");
const results = dialog?.querySelector(".search-results");
let index = null;
let hits = [];
let selected = 0;

async function loadIndex() {
  if (index) return index;
  try {
    index = await (await fetch(`${root}search-index.json`)).json();
  } catch {
    index = [];
  }
  return index;
}

/** Every word must appear; a title match outranks a heading match outranks body text. */
function search(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0 || !index) return [];
  const scored = [];
  for (const e of index) {
    const title = e.t.toLowerCase();
    const heads = e.h.join(" ").toLowerCase();
    const text = e.x.toLowerCase();
    let score = 0;
    let all = true;
    for (const w of words) {
      const s =
        (title.includes(w) ? 10 : 0) + (heads.includes(w) ? 4 : 0) + (text.includes(w) ? 1 : 0);
      if (s === 0) all = false;
      score += s;
    }
    if (all) scored.push({ e, score, words });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 12);
}

function snippet(text, words) {
  const lower = text.toLowerCase();
  const at = Math.max(
    0,
    Math.min(...words.map((w) => lower.indexOf(w)).filter((i) => i >= 0)) - 40,
  );
  return (at > 0 ? "…" : "") + text.slice(at, at + 140) + "…";
}

function render() {
  if (!results) return;
  results.textContent = "";
  if (hits.length === 0) {
    const p = document.createElement("p");
    p.textContent = input.value.trim() ? "No page matches." : "Type to search every page.";
    results.append(p);
    return;
  }
  hits.forEach((h, i) => {
    const a = document.createElement("a");
    a.href = root + h.e.u;
    a.setAttribute("role", "option");
    a.setAttribute("aria-selected", String(i === selected));
    const title = document.createElement("strong");
    title.textContent = h.e.t;
    const where = document.createElement("small");
    where.textContent = `${h.e.s} · ${snippet(h.e.x, h.words)}`;
    a.append(title, where);
    results.append(a);
  });
}

async function openSearch() {
  if (!dialog) return;
  document.body.classList.remove("menu-open");
  dialog.showModal();
  input.select();
  await loadIndex();
  hits = search(input.value);
  render();
}

for (const b of document.querySelectorAll("[data-search]")) b.addEventListener("click", openSearch);

input?.addEventListener("input", () => {
  hits = search(input.value);
  selected = 0;
  render();
});

input?.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    if (hits.length === 0) return;
    selected = (selected + (e.key === "ArrowDown" ? 1 : hits.length - 1)) % hits.length;
    render();
    results.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  } else if (e.key === "Enter" && hits[selected]) {
    e.preventDefault();
    location.href = root + hits[selected].e.u;
  } else if (e.key === "Escape") {
    // A search field's own Escape only clears it; one press closes search, as the Esc
    // key shown in the box says.
    e.preventDefault();
    dialog.close();
  }
});

dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

document.addEventListener("keydown", (e) => {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable;
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    openSearch();
  } else if (e.key === "/" && !typing && !dialog?.open) {
    e.preventDefault();
    openSearch();
  }
});
