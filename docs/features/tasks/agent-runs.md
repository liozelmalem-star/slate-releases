# Agent runs

An agent run carries one task through an automation's steps (read, plan, build, check,
ship) in a session you can see, with your approval before it plans and before anything
leaves your computer. Only your click starts one. **Agent runs** in Automations ›
**Built-in** turns them on and off.

## Start a run

Open a task and press **Run <automation>**. It says **Starting…**, then **Running**. The
run starts at once when nothing needs you: the project is certain, an agent is set, and
the project's folder is a git repository.

The chevron beside the button picks the automation and **Runs with**, the agent for this
run only. **Default** marks the agent used when you pick none. **Edit in Automations**
opens the automation, where its steps and stops are changed.

When your agent last reported that the task's tracker needs signing in, one line under the
button says so, such as **Jira needs sign-in**, with **Sign in to Jira in Claude Code**. It
never blocks the run: without it, the run hands you the ticket update to copy.

## The start dialog

It opens only when something needs you, and shows only that:

- **An unknown project.** Slate picks the project only when it is certain: the item's own
  git repository, the project a to-do names, the project you said the item's source works
  in, or your only project. Otherwise it asks once, such as
  **Which project does Jira PROJ work in?**, and remembers the answer. The project's
  **Settings…** lists these under **Work from**; remove one and the dialog asks again.
- **A block**, with its fix: **Connect an agent for this project**, or
  **This folder is not a git repository**. **Run it** stays grey until it is fixed.

## What the run does

1. It makes a branch named after the task, such as `fix/proj-12-short-title`, in a folder
   of its own, and runs the project's **Set up** command there.
2. It starts your agent there, with the task's card
   ([A session started from a task](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/session-start-brief.md#a-session-started-from-a-task)).
3. Each step the agent reports shows in the task's timeline. While it works, the last entry
   says so with a live dot, such as **Claude Code is reviewing…**. You never need the
   terminal; **Open session** shows it.

After each step the run waits for **Next**.

## Approvals

- **After the plan**: **Approve plan** or **Send back** with a note. **Save as Plan doc**
  keeps the plan as the project's Plan doc for the branch.
- **Before anything leaves your computer**: **Approve to ship** shows the commits, the
  changed files, and the exact pull request, ticket update, review or reply, each with
  **Copy**. For a review you choose **Post comments**, **Request changes** or **Approve**.
- Approving lets exactly what you approved through, once. Merging and closing are always
  refused ([Agent run rules](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/agent-run-rules.md)).
- After shipping, Slate reads the pull request back and says whether it
  **Matches what you approved**.

A run waiting on you counts in **Needs you**.

## Autopilot

Autopilot runs the steps back to back without **Next**. It still stops at both approvals,
at a held call, and after a long chain of steps. A failed check goes back to building up
to 2 times, then stops.

It is off until you turn on **Autopilot** in the project's **Settings…**. Then a switch
under the run's last entry moves between **Step by step** and **Autopilot**. Gemini
runs step by step only.

## Finish a run

After shipping, the run waits for the merge. Slate checks the pull request every 2 minutes
with `gh` or `glab`. A merge, or the task being done, ends the run.

- **Mark done** finishes it by hand.
- A pull request closed without a merge stops the run: **Mark done** or
  **Watch for the merge again**.
- A reply or review you posted yourself: **I sent it myself**.

A finished run keeps its [receipt](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/receipts.md) in the task's timeline, keeps a lesson if
the agent reported one, and removes its folder. Its branch goes too, unless it holds work
that is nowhere else. Every run of the last 14 days is listed in
[Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md).

## Stop, resume, discard

- **Stop**, the square on the run's live line, ends its session and keeps its folder and
  branch. The run says **Stopped by you**, with **Resume** and **Discard**. **Resume**
  continues the conversation in a new session.
- Typing in the run's session pauses it until **Resume**.
- **Reopen session** reopens an ended session in the run's folder.
- An agent that ends its turn without reporting its step stops the run: the task shows
  **Stopped**, the agent's last line and **Retry**. A session that never starts stops the
  run after 5 minutes.
- **Discard** asks first: **Removes the run's folder. A branch with work stays.**
  **Discard** or **Keep**. When the session cannot be stopped, **Discard anyway** keeps the
  folder.
