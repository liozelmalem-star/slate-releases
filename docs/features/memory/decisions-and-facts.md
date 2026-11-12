# Decisions & Memories

A **decision** is a choice kept with its reasoning. A **`fact`** stays true across tasks. Recall memories to know what is so; read decisions to know why.

## Decisions

`record_decision` needs `title`, `reasoning` and `confidence` (`high`, `medium`, `low`); it also takes `alternatives`, `outcome`, `source_ref`. It writes a decision memory (confidence 0.95, 0.8, 0.6) and a decision doc with the full reasoning. `recall` ranks a decision first for a "why" question.

The same title under the same project updates your decision doc: the reasoning is replaced, and the lines under **Outcome** stay. In a shared workspace, a teammate's decision doc with that title is left alone, and you get a doc of your own.

`remember` stores a memory as a decision when the text reads like one and no `kind` is given. `kind: "decision"` must carry its reason (`reason` or in the sentence) or it is refused.

### A decision learns what came of it

When an [agent run](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks.md) relied on a decision (it was in the run's brief and the session cited it; brief-only is left alone), the outcome is added by itself:

| Event | Line added under **Outcome** |
|---|---|
| Pull request merged | *Shipped in "Fix the invoice rounding" (link), 2026-10-14*, also on the memory. |
| Closed without merging | *Not shipped*, also when its task is done. **Mark done** on that run later adds no *Shipped*: only a merge does. |
| Task done, pull request open or unreadable | Nothing. The run ends, but only a merge is evidence that the work shipped. |
| Merged GitHub pull request reverted within 30 days | *Reverted: "…" was undone in (link)*. Counted only on exact evidence: a merged pull request naming this one as reverted (GitHub's Revert button), or a commit saying "This reverts commit" with the merge's commit id (`git revert`). |

Checked hourly through your own `gh`; GitLab merge requests are not checked. The first line replaces "To be determined."; later lines are added beside it; the same line is never written twice.

## Memories

| Attribute | Meaning |
| --------- | ------- |
| `text` | The knowledge. |
| `kind` | `decision`, `preference`, `state`, `fact` or `lesson`. |
| `trigger` | For a lesson, the command pattern or file glob it arrives on. See [Lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/lessons.md). |
| `confidence` | How strongly held; near-duplicates strengthen it. |
| `status` | `active` or `superseded`. |
| `subject` | The **slot** it asserts about, if any. See [Slots](#slots-how-a-memory-replaces-another). |
| `origin`, `origin_tool` | `person` (you in the app) or `agent`, and which tool. |
| `pinned` | Every session in its project starts with it. |
| `last_used_at` | When a session last cited it. |
| `source_hash` | Fingerprint of the cited lines (whole file for a bare file), so a later change can be flagged. |

[`recall`](recall-remember.md) ranks by BM25 ([how](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md#how-results-are-ranked)), scaled by confidence, and returns no memories when none covers enough of the query. Knowledge that no longer holds is **superseded**, not removed.

## What a project keeps

Open the project's settings, **Memory**:

* **Keep**, a preset: *The workspace default*, *Decisions and lessons only*, *Every kind, from every writer*.
* **Advanced**: which kinds are kept; which writers may save (agents, Slate's automations and tasks, apps, the agents' own memory files); words a memory may never mention; whether this project's sessions are captured.

Each setting shows its source: here, a group above, the workspace, or default. A word banned higher up stays banned. A refused memory is not saved and the agent is told why. What you save in the app, and an accepted proposal, is never filtered. A new policy applies from now on; kept memories stay.

## Shelf life and resting

**Shelf life.** A `state` memory goes stale: 14 days after its last *confirmation* it leaves the **recall pool** (no session, automation or `recall` offers it; only `recall` with `as_of` reads it). It stays `active` in the store and Memory list, not under **retired**. Restating or confirming restarts the 14 days. Only `state` has a shelf life. A `state` memory whose branch landed or was removed is retired at the next start of Slate (goal and open items included), and you can bring it back like any retired memory. Once per workspace, Slate also retired every `state` memory already past the 14 days.

**Resting.** A memory unused and unrestated for 30 days **rests**: it leaves the session [index](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#the-brief), stays stored and searchable. Citing, restating or pinning wakes it. Pinned memories and preferences never rest.

## Slots: how a memory replaces another

A preference and a state are single-valued, so a new one should retire the old. Similarity cannot decide ("Dark theme" and "light theme" share no words). A **slot** is a stable dotted key for the axis (`ui.theme`, `deps.db-boundary`, `branch.slate.main.state`); a later memory on the same slot retires the earlier.

The writer passes it as `subject`: two or more dot-joined parts, no spaces, no date. A `subject` that is not a key (branch name, dated snapshot, title with spaces) is dropped, and the memory is deduplicated by similarity.

An agent must pass a key for a `state` or it is refused. For a preference it is optional: with none, Slate uses a slot the project already uses, only when the text clearly names it, and never invents one. Decisions, lessons and plain `fact` memories take no slot; they accumulate.

## Memories Slate writes for itself

Slate derives one `state` memory per branch with **uncommitted work** (data of [Parked work](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md)), on slot `branch.<repo>.<branch>.state`, refreshed at server start. Landed or committed branches produce none; each reading supersedes the last; an abandoned one fades after 14 days.

## Is the corpus still worth trusting?

The **Are memories reachable?** Activity widget (add from **Edit**) measures three failures and can repair them:

| Failure | Repair |
|---|---|
| Memory filed under a removed doc (recall walks the doc tree, so it is unreachable) | Moves it to a scope recall reaches. |
| Memory filed under the folder's group, not its project | Moves it when the cited file exists in exactly one project below the group, or the teaching session belongs to one; else it stays. |
| Citation that no longer resolves (`path/to/file.ts:42`; a reused path can hit an unrelated file) | Drops the citation, keeps the claim. |

A citation whose project folder is not on this machine, or that is not a file path (a version like `Node 24.14`, an RFC, a domain like `stripe.com`), is **not judged**, never stale. **Show what would change** before repairing lists files not found and each memory it would move. It also reports, untouched: memories recall never returned, longer than a sentence, untagged, and exact duplicates (dedup runs on every write, so a rising count means a fault). Nothing runs on its own. A memory whose cited file is gone is left out of what sessions get and marked **cited file gone**.

## Repairing memory by hand

[Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md)'s list offers:

* **Needs review.** A claim contradicting a firmer memory waits here, never overwriting it: **Keep existing**, **Replace it** or **Keep both**.
* **Retire session.** Retires everything a session wrote but what you pinned or protected, after showing each; the **retired** chip lists them for 30 days.
* **Tidy proposals.** [Tidy](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md#tidying-a-projects-memory) merges and retirements wait under **Needs review** with what they change and why. The **to review** row says what waits and who proposed it. **Accept all**, with **Undo**. The rail's Memory icon counts them.
* **Pin.** Puts the memory atop its project's index for every session.
* **Hide from sessions.** The memory stays stored and listed but is not given out: not to a session, a teammate (one already shared is withdrawn), AI memory care, an @-mention or an app.
  * Words copied into docs when it was saved (Preferences, a branch doc, a note, a decision doc) stay as you wrote them for you; wherever a doc leaves your hands (agent, app, teammate) they become `[held memory]`.
  * **Give to sessions again** restores both.
  * In a shared workspace the hide reaches your other computers on the same account at their next sync (and so does giving it back). In a never-shared workspace it stays on this computer.
  * A teammate sees a hidden memory as removed, with no sign.

## See also

* [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md): how memories and decisions are written and read.
* [Memory Graph](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md): memories on the files they cite.
