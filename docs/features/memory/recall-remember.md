# Recall & Remember

A session gets memory three ways: an index at the start, a search it runs, and a lesson on the tool call it is about. At the end it calls `remember`. This guide covers search and citing.

| Guide | Covers |
| ---- | -------------- |
| [What a session is given at the start](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md) | Brief, index, other places it is given out, filter rules. |
| [Lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/lessons.md) | Memory that arrives on the tool call it is about. |
| [`remember`](remember.md) | Saving, correcting, what is refused. |
| [Tidying and measuring memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md) | Tidy proposals, declines, lessons to skills, progress logging, measuring. |

## `recall` and `get_memory`: search in two steps

```
recall({ query, cwd })
recall({ query, cwd, as_of: "2026-08-01" })
get_memory({ refs })
```

`recall` searches the project's memories and docs and returns one line per memory with ref and citation. Default 8 results, 25 at most, memories at most half, docs the rest. When the query is about the branch (it names the branch, or asks what is open or in progress) the first result is the branch brief: goal, open items, recent sessions and commits, from records labelled with the branch and from git. A memory scoring under 0.7 of the best memory's score is left out; the best one always stays. A doc matches when its text holds all the query's words; a doc found by its title alone, and captured session docs, are not returned. `kind: "pages"` searches docs only, up to 20 results.

### How results are ranked

Memories are ranked lexically and locally with BM25. No model is called and nothing is downloaded.

* Each query word counts by its rarity among your memories. Sentence (counts most), tags, citation and reason are read; words match by stem ("refused" finds "refusal").
* Recent memories are lifted slightly; a newer near-tie on the same subject comes first.
* From 200 memories in a workspace, a match is lifted (at most doubled) by how close its words sit to the query's in your store (latent semantic analysis, fitted in memory). It only re-orders keyword matches; a memory sharing no word is never added.
* Your acts on the code move a match, at most doubled or halved: merges and Confirms lift, reverts and discards of the code its sessions wrote lower (see [Citing](#citing-how-slate-learns-what-helped)).

**Nothing found is an answer.** From 50 memories in a project, a memory covering too little of the query is not returned, so an unanswerable question gets none. A barely passing memory is marked `weak`. `citation: changed` or `citation: gone` (file missing) means read the code before relying on it. The cited file is read in the session's checkout first, then the project's folder, so a worktree session checks against its branch.

**Second search.** `also` takes up to three other phrasings; each is searched alone and results merged. Use after a thin first search.

**The past.** `as_of` answers from what memory believed at the end of that day (UTC; no zone means UTC), including claims replaced since; each carries `until`. Memories only (a doc keeps just its current text). Use it for "what did we decide back then", not for work you are about to do. It does not count as memory offered to a session.

### `get_memory`

| Field | Meaning |
| ----- | ------- |
| `reason` | Why it was written. |
| `source_ref` | The file or commit it is about. |
| `citation` | `same`: cited code unchanged (for a line range or symbol, those lines, found again after edits above; for a bare file, the whole file). `changed`: check the code first. `gone`: file missing. `unchecked`: nothing to compare. |
| `status`, `pinned`, `written`, `cited` | Active and pinned state; when written and last cited. |
| `evidence` | Counts of **confirmed**, **cited**, **contradicted**, and by which tools. |
| `history` | What it `replaced` (newest first) and its `replaced_by` (oldest first), each with until when it was believed. |

* **Confirmed:** another tool restated it, or you confirmed in the app (the writer repeating itself is an echo, not counted). Your Merge of a branch counts.
* **Cited:** a session named its ref in its own replies.
* **Contradicted:** your Reverts and Discards of branches whose sessions cited it.
* A claim several tools reached is surer. Each tool counts once per session (once a day with no session). Slate re-reading a source it holds (re-imported tool memory file, re-derived branch reading) never counts.

A ref naming no memory comes back under `unknown`.

## Citing: how Slate learns what helped

Agents **list the refs of memories that shaped their work** in `used`, accepted by `remember` and `log_mission_progress`. Each ref counts as a use at once and records the last-cited time. Refs never go in the reply; one written there anyway is counted when the session ends.

Your signal is what you do to the code:

* A Merge in review confirms the memories the branch's sessions cited.
* A Revert or Discard contradicts them.
* Saving an edit on cited lines asks whether the memory still holds (see [What agents know about the file](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#what-agents-know-about-the-file)).

Each shows on the memory's card with an undo. A memory your acts contradicted at least twice, with no confirmation, leaves the index and stops being added to tool calls as a lesson, unless pinned; `recall` still finds it, lower. A confirmation restores it. A memory nobody cites or restates for 30 days **rests**: it leaves the index, stays stored and searchable. Pinned memories and preferences never rest.

## See also

* [Decisions & Memories](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md): what `recall` ranks and returns.
* [Session Capture](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-capture.md): the automatic side, including other tools' own memory.
* [Slate as an MCP Server](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server.md): the tool surface.
