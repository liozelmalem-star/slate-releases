# Session flow

A session's flow says where it stands in its work. Slate works it out from the transcript and git each time the tab reads it; the agent reports nothing and nothing is stored.

A build skill has five steps: **Overview, Plan, Build, Check, Land**. Research has three: **Asked, Published, Decided**. The flow shows in three places, never twice in view: on the row (a bar and the step's word, `▬▬▬▬▭ Check`), in the header ("● Working · Check"), and in Details under **Progress** (the goal, the bar, each step with what lit it).

## Reading it

**The word is the step the session is in now. The bar is how far it has got.** A session that ran its tests and went back to editing reads **Build** again, while its bar stays solid through Check.

**Waiting.** When the latest step only waits, the word is **Waiting**: a `sleep` still running, a shell loop that sleeps until something is ready, or a scheduled wakeup. An idle session mid-step reads Waiting too. Its status is Idle and nothing pulses. Details says what it waits on, such as "sleeping". Waiting on you is the amber status, and its step keeps its own word.

**The bar has one colour**, the accent: done steps are solid, the current step is lighter and breathes while it works, steps ahead are the grey track. Only these change a segment:

- **Red** on Check when the session stopped on a failed check. Build is current again, with "retry 1", and the words read "Check failed" (row) or "check failed" (header). While it still works, a failed check is not red: it is back at Build, fixing it.
- **Amber** on the current step while the session waits on you.
- **Green** on every segment once the work is on the default branch.

There is no percent and no time left, because steps take very different times.

## What lights each step

- **Overview**: the session started and is reading; it counts what it read and searched before it planned or edited. A session opened by an approved brief says "read the brief".
- **Plan**: plan mode approved in Claude Code, a todo list written (Claude Code's, Codex's `update_plan`), or an approved brief opened the session. Otherwise Plan is hollow: "no plan recorded". A session that hands work out (a message to another session, a scheduled run) is at Plan and counts its "hand-offs".
- **Build**: an edit to a file in the session's own checkout. A brief in the git folder, or a file outside the checkout, is not Build, so a session that only coordinates never reads Build. After a commit it says "committed". An edit after a check or a landing moves it back to Build.
- **Check**: a test or gate run: the project's own checks (scripts, pre-push hook) or a known test runner.
- **Land**: the work is on the default branch, origin's or the local one: its last commit, or the commit its `git push` moved it to. It is read from git even after the worktree was removed. Its last evidence is the closing card the session sends, "card sent".
- **Asked**: research was asked. **Published**: it published a doc (an artifact, a Slate doc or app). **Decided**: your reply after it published.

## Where the steps come from

Each skill lists its steps in its `SKILL.md` frontmatter, for example `flow: overview plan edit check land` (`edit` shows as Build). A helper skill for one part of another's work says `flow: step`. If the checkout is older than the skill's `flow:` line, the line in the git repository's main checkout is used.

The skill is detected (within the first five tools) from a slash command you typed, a prompt opening with a skill's run phrase, a Skill call, or the agent reading its `SKILL.md` (read tool, or `cat`, `sed`, `head`, `tail` in a `skills/` folder); `grep`/`ls` naming the file and tool-added skill lists do not count. A new skill's steps replace the old. With no skill, only steps that happened show, and no bar until there is more than the overview.

## Where the goal comes from

Slate takes the first it finds:

1. **The brief** whose path the first prompt names: its title is the goal, its checklist **Done when**. A Markdown file of at most 64 KB inside the session's checkout or git folder.
2. **The issue**: the branch is `fix/<n>-…`, or the prompt says `#<n>`.
3. **The branch's Plan doc** in Slate: its goal.
4. **The first prompt**, marked "as asked". After a slash command such as `/research why…`, the goal is what follows it. The notice Claude Code writes when you stop a turn is never the goal.
