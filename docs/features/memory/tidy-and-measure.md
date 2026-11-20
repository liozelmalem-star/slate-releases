# Tidying memory

Memory grows with every session, so Slate keeps it small and right without a model of its
own. Your agent proposes tidies, AI memory care can check memories each night, and every
change can be undone.

## A tidy

When a project's memory needs it, a session offers to tidy it, at most once a week. If you
agree, the agent reads the project's memories and proposes:

- a **merge**: several memories become one;
- a **retirement**: a memory that is wrong or outdated;
- a **lesson**: several memories become one rule with a `when`
  ([Lessons](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md#lessons)).

The change applies at once. **Tidied this week**, at the top of [To review](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md#to-review),
says what tidies changed in the last 7 days, with one **Undo**. A memory you pinned or
protected is never touched. A change the save rules refuse waits under **To review** for
you instead.

## AI memory care

**AI memory care** checks your memories each night with your own agent. Turn it on at the
end of **Built-in** in [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations/built-in.md). It applies to this
workspace only.

- At 03:00, when the computer is awake and Slate is open, it reads up to 50 memories of one
  project or group, with the code each cites. A missed night is skipped.
- It reads each memory twice, separately, and retires only what both readings call wrong.
  When the readings disagree, the memory waits under **To review**.
- Before you turn it on, it shows what the first month will cost in tokens. It stops for
  the month at the **Monthly cap** you set.
- A memory it retired can be brought back from **Retired** for 30 days.
- While it is on, an agent's new memory must say in its reason why it changes what a future
  agent does.

For your own schedule instead, add the **Tidy memories** starter in
[Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md#the-starters).

## Lessons from what you decline

Slate keeps your no to an AI proposal: an automation's held call answered **No**, a step
sent back, a widget card declined, a Home tool call skipped. A no becomes a proposal under
**To review** when you wrote a reason in **Why? (optional)**, or when you declined the same
action twice in 30 days in the same place. Accepting it saves a lesson. At most 5 such
proposals wait per project.

## When a lesson becomes a skill

A lesson used in at least 3 sessions is a way of working. Slate proposes it as a skill in
**Toolkit › Suggestions**, at most 3 a day. **Make it a skill** writes the skill into the
project's folder, where every agent loads it, and the lesson leaves the memory index. A
dismissed proposal is not asked again. A lesson with no project folder on this computer
is never proposed.

## Does memory help?

The **Does memory help?** card on [Activity](https://liozelmalem-star.github.io/slate-releases/docs/features/activity.md) (add it while arranging the
board) compares sessions given memory with the one session in four held out. It counts
the turns where you corrected the agent ("no, …", "wrong", "I told you"), per session, in
each group. It shows a result once each group has 50 sessions. You can turn the holdout
off there.

Two more cards read the memory layer: **Do sessions save memory?** and
**Is memory used?**.
