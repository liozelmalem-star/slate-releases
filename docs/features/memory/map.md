# Memory Graph

Memory opens on the **graph**: every memory of the projects on screen, on the files it is about, coloured by use. The list beside it is where you read, search, correct and retire.

Empty, Memory says **Nothing saved yet** (*Memories appear here as sessions end*) with **Connect an agent**. It opens on **All projects**, then on your last-picked project. The rail's Memory icon counts what waits for review.

**Graph | Rules** under the project picker switches the view. **Rules** lists your memory rules by where each holds, and the main area shows the one you pick, ready to edit; **+** in the panel title adds one ([Rules](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#rules-which-memories-your-agents-get)).

## The graph

Each folder is a **country**: a tinted region with name, memory count and share used (`server 213 · 3% used`, or the count alone until a session uses one), sized by count, drawn in sage. A memory used this month is a brand-coloured dot.

* A folder holding most of the project opens into its own folders (`packages` shows `ui`, `server`…). Memories citing the folder itself keep a town of their own.
* Folders under 12 memories share **Other**. Memories citing no file sit on a dashed-coast island, **General**.
* On **All projects** each project is one country, never opened, never in Other.
* **Each memory is a dot**, gathered by its cited file. Solid and bright: used this month or new this week. Faint hollow ring: never used. A country of hollow rings is dead weight to clean up.
* **No lines.** What sits inside what is the structure.
* **Click a country to go in.** The map shows it alone, files with three or more memories named and ringed; the list shows and follows only its memories. If a retire or project switch removes the country, both go back out. Go back via the path (`slate › server`), empty space, or Escape (which first closes anything in front, such as ⌘K or a field you edit).
* **Counts are lenses.** Click one in "80 used this month · 984 never used · …" to light and list only those; click again to clear. A count of zero is not drawn.
* **One session's memories.** A session in Sessions says how many memories it was given, used and wrote. Click that line to see exactly those, with a row "Showing “…” — 3 given · 1 used · 2 written". **Clear**, or a use filter, shows all.
* **Graph and list are one selection.** A list row goes into its country and opens its card; a dot scrolls the list to its row.

The map is fixed: no zoom, pan or scroll. On the whole map a click enters a country even over a dot; inside one, a click on a dot opens its card.

## A memory's card

Shows its travel ("Given to 57 sessions, used in 0 · used 1× · last 2026-09-26"), cited file, what your merges, reverts, discards and edits said (dated, with undo; see [What agents know about the file](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#what-agents-know-about-the-file)), what it replaced, other memories on the file, a likely duplicate with **Merge**, ref (`m:…`), author, confirmations ("confirmed 2× by Codex") and uses ("used 3× in Gemini, Claude Code").

**Edit** opens a growing text box: **Save** (⌘Enter) or **Cancel** (Esc). List rows offer the same actions as icons and show "hidden from sessions" or "protected". Each is undone from the same place.

* **Pin:** every session in its project starts with it.
* **Hide from sessions** (undo: **Give to sessions again**): stays in Memory, but no reply a connected agent reads carries it (recall, briefs, index, `remember`'s neighbours, `get_memory`, `list_memories`, lessons, handoff notes).
* **Protect:** AI memory care never reads it and **Retire all** never takes it.
* **Retire**, **Bring back** (active again unless a newer memory replaced it; covers a memory [AI memory care](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) retired). **Retire session** retires everything the session wrote, after a preview; pinned and protected memories stay.

## The list

Graph and list share one scope, the **project picker** at the head of the side panel.

* **Search** needs every typed word in the memory's text, tags, cited file or `m:` ref; the graph lights matches.
* **Kind** over the graph counts each kind (`577 facts`, `389 decisions`, `40 status notes`; a status note is kind `state`) and filters the list only. **Every kind** clears it.
* A row shows kind, about two lines, and last-confirmed day, and marks **cited file gone** when recall holds it back.
* **Filters:** use count, country, kind, search words and likely duplicates are chips on one **Filters:** line; click one to drop it, or **Clear all**. No match: "No memory matches these filters." and, in one project, **Search all projects**.
* **Likely duplicates:** a line above the graph; click to list only those, then open one for **Merge**.

**Retire a whole list.** Under **never used** or **not used this month**, **Retire all** says how many first. Pinned and protected stay (counted apart, "· 1 protected stays"). **Undo** reverses all at once.

The **retired** chip shows what was retired in the last 30 days that nothing replaced (up to 50) in the picked project, each with **Bring back**. A status note that lapsed after 14 days was never retired; it stays in the main list. The chip serves retirements whose Undo is gone or that AI memory care made overnight.

## Needs review

Contradicting claims and tidy proposals wait at the top. When something waits, one amber line shows the count ("15 to review"); click it for a popup:

* One line says what waits and who proposed it ("12 merges and 3 retirements, proposed by Claude Code (14) and memory care (1).") and how many claims disagree with a surer memory.
* **Accept all** applies every proposal; **Undo** reverses the batch.
* A lesson that became a skill is named; the name opens it in Toolkit.
* Each proposal and disagreement has its own buttons ([Repairing memory by hand](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#repairing-memory-by-hand)). The popup closes when empty, or on Esc.

**Learned this week**, above the card, is one line on the last seven days: memories you accepted, lessons that became skills, decisions an agent run closed, declines kept (and how many were said more than once), and what your acts taught (*3 memories confirmed by your merges, 1 contradicted by a revert*; undone acts do not count). A quiet week draws nothing.

AI memory care's switch, cost and monthly token cap are last in **Built-in** ([Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md)), per workspace. What it retired shows under **retired**; what it doubts waits here.

## See also

* [Decisions & Memories](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md): the data the graph draws.
* [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory.md): how memory fits together.
