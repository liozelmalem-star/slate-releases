# Status and flow

Every session has a **status**, which says whether it needs you, and a **flow**, which says which step of its work it is on. Slate reads both from the session's transcript and git. The agent reports nothing.

## Status

| Status | When |
| --- | --- |
| **Needs you** | The agent finished a turn and waits: on permission for a tool call, on an answer, or with a finished report. Home shows each as a card ([Home](https://liozelmalem-star.github.io/slate-releases/docs/features/home.md)) |
| **Working** | The agent wrote to its session in the last 45 seconds |
| **Idle** | Quiet, and you spoke last |

A session needs a running process to be live. A quiet transcript with no process is a closed conversation: it leaves the list and never shows as **Needs you**.

A session that only waits is **Idle**, however fresh its transcript: its newest step is a running `sleep`, a shell loop that sleeps until something is ready, or a scheduled wakeup. The wait must be the whole command: `sleep 30 && npm test` is work.

For a Claude Code tool call with no result yet, the session is **Working**, with three exceptions that read **Needs you**: a question to you, once 45 seconds have passed; any call quiet for more than 30 minutes, which is a prompt nobody answered; and, in a session Slate runs, a quiet call while its terminal shows nothing new.

### What Slate cannot see

- A permission prompt in a session Slate does not run reads as **Working** for Claude Code, for up to 30 minutes, and as **Idle** for other agents. The exception is a Claude Code session that Claude Code itself reports as waiting: that reads **Needs you** at once.
- "Waiting for permission" and "answered, waiting for your next prompt" both read **Needs you**.

## Flow

The flow shows on the row (a bar and a word, **Check**), above the terminal (**Working · Check**), and in Details under **Progress**.

A build has five steps: **Overview**, **Plan**, **Build**, **Check**, **Land**. Research has three: **Asked**, **Published**, **Decided**.

**The word is the step the session is on now; the bar is how far it has got.** A session that ran its tests and went back to editing reads **Build** again, while its bar stays filled through Check. When the latest step only waits, the word is **Waiting**.

The bar has one colour: done steps are solid, the current step is lighter, steps ahead are grey. Only three things change a segment's colour:

- **Red** on Check when the session stopped on a failed check. The word reads **Check failed**.
- **Amber** on the current step while the session waits on you.
- **Green** on every step once the work is on the default branch.

| Step | Lights when |
| --- | --- |
| **Overview** | The session started and is reading |
| **Plan** | A plan was approved or a to-do list written, or an approved brief opened the session |
| **Build** | A file in the session's own checkout was edited |
| **Check** | Tests or the project's checks ran |
| **Land** | The work is on the default branch, on origin or locally |
| **Asked**, **Published**, **Decided** | Research was asked; it published a doc or artifact; you replied after it published |

A skill names its steps in its `SKILL.md` frontmatter, such as `flow: overview plan edit check land`, where `edit` shows as Build. With no skill, only the steps that happened show.

**The goal** at the top of Progress is the first Slate finds: a brief the first prompt names, the issue in the branch name (`fix/<n>-…`) or the prompt (`#<n>`), the branch's plan doc in Slate, or else the first prompt, marked *as asked*.
