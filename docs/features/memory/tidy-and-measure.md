# Tidying and measuring memory

Slate calls no model to shrink memory: the session you are in proposes and you accept. Part of [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).

## Contents

- [Tidying a project's memory](#tidying-a-projects-memory)
- [Learning from what you decline](#learning-from-what-you-decline)
- [When a lesson becomes a skill](#when-a-lesson-becomes-a-skill)
- [Logging progress mid-run](#logging-progress-mid-run)
- [Measuring it](#measuring-it)

## Tidying a project's memory

1. `list_memories` reads the project's memories, 100 at a time, with refs (hidden ones are not listed).
2. `propose_memory_change` proposes a **merge** (refs become one claim), a **retirement** (wrong or outdated refs) or a **lesson** (refs forming a rule about an action, with its `when`). Every ref must belong to that project, and none may be a memory you pinned or protected: that one is yours. A merge or lesson follows [`remember`](remember.md)'s save rules.
3. Each proposal waits in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) under **Needs review**, with what it changes and why. **Merge**, **Retire** or **Make it a lesson** applies it; **Dismiss** drops it; **Accept all** applies every one, **Undo** reverses the batch. A memory you pinned or protected after the proposal still stays: a retirement leaves it out, and a merge or lesson naming it waits for you.

**AI memory care.** Turn on at the **Memory care** row in [Memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md) (see [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md)). Each night it reads up to 50 memories of one project or group (the largest) twice, separately, with its own agent and the code each cites, and retires only what both readings call wrong. Disagreements wait under **Needs review**. It shows its cost before turning on and stops at a monthly token cap you set. A retired memory nothing replaced returns with **Bring back** under the **retired** chip for 30 days. With it on, an agent's new memory must say in `reason` why it changes what a future agent does.

**Your own schedule.** Save the **Memory pass** [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/loop.md#the-ceremonies). Each morning it reads yesterday's sessions and up to 30 of the project's memories (pinned and cited first, then freshest, cut to a size budget) on the project's agent. It adds at most five memories and files merges and retirements under **Needs review**.

## Learning from what you decline

Slate keeps your no to an AI proposal: an automation's held call answered **No**, a step sent back, a held call denied, a run cancelled with a reason, an app card declined, a Home agent tool call skipped.

A no is never a memory alone. It becomes a proposal under **Memory → Needs review** when you wrote a reason (**Why? (optional)** beside each no) or declined the same action twice in 30 days in the same place. Accepting saves a lesson pinned to the automation, agent runs or app that produced it. At most five such proposals wait per project.

## When a lesson becomes a skill

A lesson used in at least three sessions is a way of working. Daily, at most three, Slate proposes one as a skill under **Memory → Needs review**. **Make it a skill** writes `.claude/skills/<name>/SKILL.md` in the project's folder, linked from `.agents/skills/<name>`, with the lesson and reason.

* A branch's lesson goes to the project's folder, not the worktree. A lesson with no project folder here is never proposed.
* The lesson then leaves the index (not read twice). A dismissed proposal is not asked again.
* The proposal also waits in **Toolkit › Suggestions**; accepting in either place writes the skill once. Other setup changes (fix, copy, remove) are only in Toolkit: Memory reviews what Slate remembers, Toolkit what agents load.

## Logging progress mid-run

`log_mission_progress` reports a run's work on its branch: the summary becomes a session entry of the project labelled with the branch; goal and open items become what the next session on that branch is told; each decision is a memory, with the summary as its reason. Every item passes the same rules as `remember` and `record_decision` (the project's memory policy and the checks on what a memory may hold), and a reworded duplicate of a decision already kept is merged. Anything refused is listed in the reply's `refused`, each line naming its item and why; a refused goal or open list also retires the one it would have replaced. No doc is made. On a trunk branch (`main`, `master`, `develop`) the goal is unchanged. A git branch is a label on records, never a doc (ADR 0119).

## Measuring it

**Does memory help?** One session in four is held out: no index, lessons or tidy offer (search still works). Slate counts turns that open with a correction ("no, …", "wrong", "I told you"). The **Does memory help?** Activity widget (add from **Edit**) compares corrections per session with and without memory, after 50 sessions per group; the holdout can be turned off there.

`yarn memory:report` prints, from a snapshot of your store: first the **cite rate** (of the lessons and decisions given to a session, the share that session used; target 40%; each session and memory pair counts once, and preferences and `fact` memories are left out, because a session follows them without naming them); sessions that used a memory and offered memories cited, counting every delivery; offers per channel (lessons are `trigger`); **reach** per tool (work sessions given memory, of those captured); the holdout comparison (corrections per session and per 100 of your turns, for each group); **health** (memories written per distinct memory used; fewer is better); **quality** (share AI memory care read that both readings kept; aim 80%); imported memories per tool; per project, active memories, index lines and changed citations. `--sample 24` writes random deliveries to judge by hand.

The index went from up to 40 short lines to 12 whole ones on 2026-11-07. To compare the two weeks on each side, run `yarn memory:report --days 14` on 2026-11-07 and again on 2026-11-21.

`yarn memory:eval --cwd <project>` runs `recall` on fixed questions and prints recall@5 and MRR per kind (plain, updated, time, unanswerable). The set quotes your memory, so it lives at `memory-eval/questions.json` in Slate's data folder. `--half tune` / `--half report` score odd / even questions; `--also <file>` passes other phrasings.
