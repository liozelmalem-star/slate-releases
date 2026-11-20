# The Memory screen

**Memory** shows everything Slate remembers. The map in the main area shows where your
memories sit and which ones sessions use. The list in the side panel is where you read,
search, correct and retire them.

With nothing saved, Memory says **Nothing saved yet** and offers **Connect an agent**.

## The side panel

From the top:

- the **project picker**, which narrows the map and the list to one project. Memory opens
  on the project you picked last;
- **Map**, with the count of memories: the whole map;
- **Rules**, with its count: what your agents get ([Rules](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#rules));
- **To review**, with a count, when something waits for you ([To review](#to-review));
- the search box, **Search memories, files, m: refs**;
- **Kinds**: one row per kind of memory that has any, with its count, and **Retired**
  last ([Kinds of memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md)).

Click a kind to open it and draw only that kind on the map. Its memories are listed one
line each, newest first, with **Show N older** past the newest 10. One kind is open at a
time. Click a memory to open its card.

**Retired** lists what was retired in the last 30 days that nothing replaced, up to 50.
Open one for **Bring back**. With none, it says **Nothing retired in the last 30 days.**

## The map

Each folder of the project is a region with its name, its memory count and the share
sessions used, such as `server 213 · 3% used`. Each memory is a dot near the file it cites.

- A solid, bright dot was used this month or is new this week. A faint hollow ring was
  never used. A region full of hollow rings is worth cleaning up.
- Folders with fewer than 12 memories share **Other**. Memories that cite no file sit in
  **General**.
- On **All projects**, each project is one region.
- Click a region to go into it. The list then shows only its memories. Go back with the
  path above the map (`slate › server`), a click on empty space, or Esc.
- The map and the list are one selection: a list row opens its card on the map, and a dot
  scrolls the list to its row.

A session in Sessions says how many memories it was given, used and wrote. Click that line
to see exactly those: **Showing “…” — 3 given · 1 used · 2 written**. **Clear** shows all.

## Search and filters

Search needs every typed word in the memory's text, tags, cited file or `m:` ref. The map
lights the matches. Region, search and likely duplicates show as chips on one **Filters:**
line. Click a chip to drop it, or **Clear all**. With no match the list says
**No memory matches these filters.** and, inside one project, offers
**Search all projects**.

**N possible duplicates**, above the map, lists the likely duplicates. Open one for
**Merge**, which keeps it and retires the other.

## A memory's card

The card shows how the memory travelled (**Given to 57 sessions, used in 3**), the file it
cites, who wrote it, which agents confirmed or used it, what it replaced, and other
memories about the same file. It also shows what your own acts said about it: a merge
that confirmed it, a revert or discard that contradicted it, an edit to the cited lines.
Each has an undo.

| Action | What it does |
| --- | --- |
| **Edit** | Change the text. **Save** (⌘Enter) or **Cancel** (Esc) |
| **Pin** | Every session in its project starts with it |
| **Hide from sessions** | Keeps it in this list, but no agent is given it. **Give to sessions again** undoes it |
| **Protect** | AI memory care never reads it, and **Retire session** never takes it |
| **Retire** | Takes it out of the list and out of every session. **Bring back** undoes it |
| **Retire session** | Retires everything the session that wrote it saved, after a preview. Pinned and protected memories stay |

A memory whose cited file is gone shows **cited file gone** and is not given to sessions.

## To review

Only what Slate may not decide alone waits here:

- a claim that disagrees with a surer memory: **Keep existing**, **Replace it** or
  **Keep both**;
- a tidy change the save rules refused, a lesson from what you declined, or a memory the
  two readings of AI memory care disagree on: **Merge**, **Retire** or
  **Make it a lesson**, or **Keep as is**.

Each item needs its own choice. Click the **To review** row to open them one by one.

At the top sit two lines about the last 7 days:

- **Learned this week**: memories you accepted, new skills, decisions an agent run
  closed, the noes Slate kept, and what your merges, reverts and discards confirmed or
  contradicted.
- **Tidied this week**: what tidies merged, retired and turned into lessons, with one
  **Undo** ([Tidying memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/tidy-and-measure.md)).

A quiet week draws neither line.
