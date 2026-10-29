import { reduced } from "./motion.js";
import { reveal } from "./reveal.js";

/* Version, ship date and changelog, read live from the GitHub API. */
export async function initReleases() {
// One request, not two: /releases carries the whole list, so the newest stable
// entry and the total count both come out of it. Unauthenticated GitHub allows
// 60 requests an hour per IP, which is ample for a page of this size, and the
// API sends Access-Control-Allow-Origin: * so this works from Pages.
//
// Every failure path is the same path — leave both elements hidden. A version
// line that says "loading" or "unknown" is worse than no version line: it
// reports on this page's plumbing where the reader wanted a fact about Slate.
(async () => {
  const strip = document.getElementById("rel");
  const stripText = document.getElementById("rel-text");
  const sec = document.getElementById("news-sec");

  let releases;
  try {
    const res = await fetch(
      "https://api.github.com/repos/liozelmalem-star/slate-releases/releases?per_page=100",
      { headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) return;
    releases = await res.json();
  } catch {
    return; // offline, blocked, or rate-limited — the page is complete without this
  }
  if (!Array.isArray(releases) || releases.length === 0) return;

  // What a visitor can actually install: the newest release that is neither a
  // draft nor a pre-release. Taking releases[0] would happily advertise a
  // pre-release as the current version.
  const shipped = releases.filter((r) => !r.draft && !r.prerelease);
  const latest = shipped[0];
  if (!latest) return;

  // Whole days, floored, in the reader's own timezone. "Shipped 2 days ago" is
  // the claim being made and an hours-precise version of it would be false as
  // often as it was true.
  const days = Math.floor((Date.now() - Date.parse(latest.published_at)) / 86400000);
  const when =
    days <= 0 ? "shipped today" : days === 1 ? "shipped yesterday" : `shipped ${days} days ago`;

  stripText.innerHTML = "";
  const bits = [latest.tag_name, when];
  if (shipped.length > 1) bits.push(`${shipped.length} releases`);
  bits.forEach((bit, i) => {
    if (i) {
      const sep = document.createElement("span");
      sep.className = "sep";
      sep.textContent = "·";
      stripText.append(sep);
    }
    // textContent, never innerHTML: this is remote data, and it is not this
    // page's business to let a release title inject markup into the hero.
    const span = document.createElement("span");
    span.textContent = bit;
    stripText.append(span);
  });
  strip.hidden = false;

  // The changelog is authored one bold lead sentence per change — CHANGELOG.md
  // says so in its own header. Those leads ARE the summary written for this
  // exact reader, so they are lifted whole rather than re-summarised here.
  const leads = [...(latest.body || "").matchAll(/\*\*(.+?)\*\*/gs)]
    .map((m) => m[1].replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 12)
    .slice(0, 3);
  if (leads.length === 0) return;

  document.getElementById("news-ver").textContent =
    `${latest.tag_name} · ${new Date(latest.published_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;

  const list = document.getElementById("news");
  for (const lead of leads) {
    const row = document.createElement("div");
    row.className = "news-item";
    row.innerHTML = '<svg class="tick" width="9" height="9"><use href="#slab-9"/></svg>';
    const para = document.createElement("p");
    para.textContent = lead;
    row.append(para);
    list.append(row);
  }
  sec.hidden = false;
  // The section was hidden when the IntersectionObserver swept the page, so it
  // was never given a reveal to trigger. Observing it now is the difference
  // between a section that fades in and one that is permanently invisible.
  if (!reduced && "IntersectionObserver" in window) {
    const io2 = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io2.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io2.observe(sec);
  } else {
    sec.classList.add("in");
  }
})();
}
