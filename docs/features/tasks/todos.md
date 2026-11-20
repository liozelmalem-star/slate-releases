# To-dos, reminders and meetings

**To-dos** are the lines you write yourself in Tasks, such as "call the accountant". A
reminder brings a to-do, or any task, back to you at the time you pick. Today's meetings
sit above the Overview.

## Add a to-do

1. Click **+** in the Tasks panel's title row.
2. Type the line and press Enter. The box stays open for the next line; Esc closes it.
3. To set a reminder first, use **Remind me** beside the box.

A to-do never syncs and never leaves on its own. No tool writes to **To-dos**, and nothing
you write lands in **Issues**, **Reviews** or **Messages**. On the Overview, your to-dos
come from **You wrote**.

Your agents can read your list and add or change your own lines with Slate's `my_tasks`
and `update_my_task` tools ([MCP tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md)).

## Work through them

To-dos are grouped by when they are due: **Overdue**, **Today**, **Tomorrow**,
**This week**, **Later** and **No time**. **Done today** sits at the bottom, struck through,
until the next day.

- **Tick the box** to finish a to-do. Tick it again to undo.
- **Double-click the title** to rename it.
- **Run <automation>** runs one of your automations on it. A to-do is a question, so
  **Research** fits it ([Which automation runs](https://liozelmalem-star.github.io/slate-releases/docs/features/tasks/workflow.md)).

## Reminders

**Remind me…** sits on a to-do, and in the **⋯** menu of any task. Pick **In an hour**,
**This evening**, **Tomorrow morning**, **Next week**, or **Pick a time…**.

When it is due, a notification shows the title, and the task moves to **Needs you** until
it is done. Set a new time to snooze it. **Clear the reminder** removes it.

- Slate must be running. A reminder that came due while Slate was closed rings once when
  you open it, and says when it was due.
- A reminder that came due while the computer slept rings within 5 minutes of waking.
- **Reminders** in Automations › **Built-in** turns them all off. The times you set stay.

For a reminder that repeats, make an [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md).

## Today's meetings

When a connected work gateway carries your calendar (Google Calendar or Outlook), a
**Today's meetings** row sits above the Overview:

- the next meeting: **in 25 min**, or **now**, its name, and **Join** when it has a video
  link;
- a line for the day with a mark per meeting, dashed when you have not answered;
- the sums: meetings, all-day events, and free time left in gaps of 45 minutes or more.

Point at a meeting for its card, with **Join** and **Open in <calendar>**. A meeting whose
title names a task key or a pull request lists that task under **About**. Declined and
cancelled meetings are left out. With no calendar there is no row.
