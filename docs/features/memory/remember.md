# `remember`: save what you learned

One concise statement per call, one typed memory. Part of [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).

## Contents

- [Saving a memory](#saving-a-memory)
- [What is worth saving](#what-is-worth-saving)
- [Correcting a memory](#correcting-a-memory)
- [What is refused](#what-is-refused)

## Saving a memory

| `kind` | Captures |
| ---- | ------------- |
| `decision` | A choice ("chose X over Y because Z"). |
| `preference` | How you like to work. An agent's `preference` that names no person and sets no rule ("Never …", "Use …") is saved as a `lesson`; a tool's own `feedback` memory is imported as a lesson. |
| `state` | A durable note on where things stand. |
| `fact` | Durable project knowledge. |
| `lesson` | What to do in a situation, and why; can say [when](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/lessons.md). |

`kind` is optional; Slate infers it. Preferences and states go in a [slot](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#slots-how-a-memory-replaces-another) when one fits, so a new preference retires the one it contradicts.

* **Filing.** Under the **project** you work in (a worktree beside it counts). A near-duplicate strengthens the existing memory. With no folder or doc, or a folder no project holds, it is filed global (memory is never dropped) and reaches every session. `global: true` asks for it. `remember` also appends the statement to the branch's doc (not for global).
* **Neighbours.** The answer lists up to 3 close memories it was not merged into. If one says the same or is wrong, call again with its ref in `replaces`.
* **Pinning.** `index: true` pins into the project's index (25). When full, the reply lists it and adds nothing; call again naming one to drop with `unindex`. A dropped memory stays stored and searchable.
* **Author.** Each memory records you, or the agent by name (the connecting tool if no `source`).
* **Secrets.** Recognised keys, tokens and passwords become `[secret]`, the rest kept. This covers app input, `reason`, citation, and docs an agent writes (decision doc, progress report, saved document).
* **Disagreement.** A claim contradicting a firmer memory waits under **Needs review** in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) beside it; it never overwrites.
* **Citations.** With a `source_ref`, Slate stores a fingerprint. If the file changes, the cited line is past its end, or the cited `path:symbol` no longer appears, the memory leaves the session-start index and `get_memory` says `changed` (`recall` still finds it). Restating the claim takes a fresh reading and restores it. You can also answer in a file open beside a session: it marks every cited line and offers **Confirm**, **Correct**, **Retire** (see [What agents know about the file](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#what-agents-know-about-the-file)).

## What is worth saving

A correction you made, an approach you confirmed, a decision and why, something true and not obvious. Not what code, git or docs say, fix recipes, or current status. The contract asks for at most two memories per task (most save none); this is asked, not enforced. Home's AI and automations get the same rule.

**Nothing saved.** After real work (5 changes or 10 of your turns) with no memory, the session's end asks the agent once to save what the next session needs. If you corrected the agent ("no, …", "wrong", "I told you", or the Hebrew equivalent) it asks even after a short session, quoting your correction so the agent saves a lesson. A session that saved anything is not asked.

## Correcting a memory

Write the true claim and name the wrong one:

```
remember({ text: "The gate has ten steps", replaces: ["m:7f3a2b1c"] })
```

Each named memory in the same project is retired for the new one. The response lists what was retired and any ref it could not place.

## What is refused

A refused write says how to fix it.

| Refused | Fix |
|---|---|
| Transient text ("currently editing X") | — |
| An agent's progress note ("I am taking …", "landed on origin/main as `<sha>`", "Open on `<branch>:`", a `state` starting "As of `<date>`") outside a `mission.<branch>.*` slot | Use `log_mission_progress`. |
| An agent's git snapshot ("main is 11 commits ahead") | Git answers these. |
| A tool call's own markup (`<parameter …>`) | The call was malformed. |
| A decision with no reason | Pass `reason`, or say why ("because", "so", "rather than", "never", "the owner wants"). |
| Three or more numbers in an agent's memory | Keep the claim in the sentence; put numbers in `reason`. |
| An agent's `state` with no `subject` | Pass a dotted key like `release.next-version`. A [handoff](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md) is exempt. |
| A vague reason with AI memory care on | `reason` needs at least four words on why it changes what a future agent does. |
| What project settings turn off (writer, kind, banned word) | See [What a project keeps](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#what-a-project-keeps). |
| A workspace read-only for you (viewer, or deleted forever) | The call fails and says which. |

A short line with no verb is kept with a warning that it reads as a title. What you write in the app is held only to the transient-text and decision rules; the rest and project settings apply to agents, automations and apps.
