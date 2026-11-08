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

  // The download line names the version a visitor gets and when it shipped, from the
  // same release the chip reads, so the page can never claim a version that is not out.
  const dlVer = document.getElementById("dl-ver");
  if (dlVer) {
    const day = (r) =>
      new Date(r.published_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    dlVer.textContent = ` · ${latest.tag_name} · released ${day(latest)}`;
    dlVer.hidden = false;
  }

  // "Shipped lately": the newest four releases, each with its date and the changelog's
  // headline, which CHANGELOG.md writes as the first bold line of every section.
  const list = document.getElementById("rel-list");
  const sec = document.getElementById("releases");
  if (!list || !sec) return;
  for (const r of shipped.slice(0, 4)) {
    const head = (r.body || "").match(/\*\*(.+?)\*\*/s);
    const li = document.createElement("li");
    const time = document.createElement("time");
    time.dateTime = r.published_at.slice(0, 10);
    time.textContent = new Date(r.published_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
    const ver = document.createElement("b");
    ver.textContent = r.tag_name.replace(/^v/, "");
    const what = document.createElement("span");
    // textContent, never innerHTML: release notes are remote data.
    what.textContent = head ? head[1].replace(/\s+/g, " ").trim() : r.name || "";
    li.append(time, ver, what);
    list.append(li);
  }
  sec.hidden = false;
  // The section was hidden when the IntersectionObserver swept the page, so it was never
  // given a reveal to trigger. Observing it now is the difference between a section that
  // fades in and one that stays invisible.
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
