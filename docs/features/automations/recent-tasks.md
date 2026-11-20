# Recent tasks

**Recent tasks** is the first step of a scheduled [automation](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) such as **Standup**, **Weekly review** or **Memory pass**. It gathers what happened in your sessions, then checks it against your live tools, so the report says what is true today.

Only the first step can be Recent tasks, because every later step reads its report. **Setup** shows it as "Recent tasks · looks back 7 days".

## What it reads

| Source | What comes in |
| --- | --- |
| Sessions | The newest 80 captured sessions in the look-back window (7 days unless the step sets 1 to 365), each tagged with its project and summed up in one line of at most 280 characters |
| Memories | Up to 30 memories, the same ones **What it knows** previews. Never a hidden memory |
| Docs | The titles of up to 100 docs in its project or group, newest change first |
| Its own reports | Its last 3 reports, the first 600 characters of each |

## Checking your live tools

A stored record shows what was true when it was written, so Recent tasks asks your tools first. It picks up to 3 of the folders the period's sessions worked in, and runs one short pass of your agent in each, so the project's own MCP servers load. Each pass checks, in order:

1. Jira or Linear: the issues assigned to you that are not done.
2. GitHub: your pull requests for those issues, with their state, checks and who the review waits on.
3. Calendar: today's meetings, unless Slate already read them.
4. Slack: who is waiting on what for those issues and pull requests, over about the last 3 days.

A pass asks only for keys, states, names and times. It never asks for issue text, comments or message text.

## The report

A Recent tasks report opens with three columns: **Assigned to me**, **Pull requests** and **Today's meetings**. A pull request shows its full name, such as `acme/api#12`.

- A tool that needs you to sign in shows a sign-in button, then runs the automation again.
- A tool it could not reach says so, instead of "Nothing assigned."

The text then lists what was checked in this run and which tools could not be reached.

## Writing to memory

When the step has writing back on, as **Memory pass** does, the run can save up to 5 new memories, and merge or retire the memories it was shown. Each change shows in Memory with an **Undo**. Only an automation that works in a project or group can merge or retire.

## Prompt variables

Type these in the Recent tasks prompt. Slate fills them in just before the run. Another step cannot use them, and Save says so.

| Variable | Becomes |
| --- | --- |
| `@sessions` | The sessions above |
| `@memory` | The memories above, each with its kind and reason |
| `@docs` | The doc titles above |
| `@date` | Today's date |
| `@prior_outputs` | Its own last reports |
