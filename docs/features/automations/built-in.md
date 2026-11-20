# Built-in automations

**Built-in**, the second row in the [Automations](https://liozelmalem-star.github.io/slate-releases/docs/features/automations.md) side panel, lists everything Slate does without being asked, each with a switch. Every row says what it does, and an "Off." line says what you lose while it is off.

Every switch holds for the whole app, in every workspace on this computer, except **AI memory care**, which holds for the open workspace only.

## The switches

| Switch | What it does | Off means | Starts |
| --- | --- | --- | --- |
| **Scheduled automations** | Starts your automations at their times and files each report under its group or project | Nothing starts on its own; you can still run automations by hand | On |
| **Shared workspace sync** | Every 2 minutes, pushes the docs you wrote in a shared workspace and pulls other people's | Shared workspaces stop updating both ways | On |
| **Automatic updates** | Checks for a new version, downloads it, and installs it when you quit | You keep your version until you check in Settings → About | On |
| **Tell me when a session needs me** | One notification when a session starts waiting on your answer and Slate is not in front | No notification; the amber dot and ⌘⇧J still show it | On |
| **Show Slate in the menu bar** | A menu bar icon lists the sessions working or waiting on you, with a count while one needs you | The icon leaves; Sessions and ⌘⇧J still show every session | On |
| **Start Slate at login** | Starts Slate in the menu bar at login, with no window | Slate starts only when you open it, and your agents cannot reach it before | Your choice at setup |
| **Auto-capture** | Watches your agents' transcripts and your projects, and files what happens into the workspace that owns the folder | Nothing is captured on its own; agents can still write through Slate's MCP server | On |
| **Agent runs** | Lets you start an agent run on a task, and every 2 minutes checks whether a shipped run's pull request merged | A task offers only **Just open a session** | On |
| **Reminders** | Rings when a task you set a time on comes due | Nothing rings; the times stay on their tasks | On |
| **Keep the computer awake** | Stops the computer sleeping while a session or automation works | The computer sleeps on schedule, and running work pauses | Off |
| **AI memory care** | [Below](#ai-memory-care) | Only the free rules tidy memory; nothing is spent | Off |

**Auto-capture** has a card at the top as well as its row; both are one switch. Each agent also has its own **Capture** switch in [Connect → Agents](https://liozelmalem-star.github.io/slate-releases/docs/features/connect.md).

A switch takes effect within about a minute; **Auto-capture** at once.

## AI memory care

Each night at 03:00, while the computer is awake and Slate is open, your agent reads up to 50 memories the free rules cannot judge. It reads each one twice, separately, against the code the memory cites.

- A memory both readings call wrong is retired. You can bring it back from Memory.
- A memory they disagree on waits for you in Memory → **Needs review**, at most 10 at once.
- A missed night is skipped.

Its card shows what it reads, which agent and profile it runs on, and what the first month costs. Choose a **Monthly cap** of 1 million, 4 million or **No cap**, then **Turn on**. It stops for the month at the cap. It uses your agent's tokens; on a plan, the same allowance as your own sessions. It runs as an automation named **AI memory care**, so **Scheduled automations** must be on.

## Starting at login

Your agents reach Slate's memory, skills and connections only while Slate runs. Starting at login keeps it reachable.

- **Only if you choose it.** Setup offers it ticked on the **Agents** step. If you skipped that step, Slate asks once, in a strip at the top of the window: **Turn on** or **Not now**.
- **It is a macOS login item**, listed under Slate's name in **System Settings → General → Login Items**. If macOS waits for your approval, the row says so, with **Open Login Items**.
- **No window.** A login start shows only the menu bar icon. The Dock icon, the menu bar panel or a `slate://` link opens the window. If you are signed out, the window opens at once.
- **Managed Macs.** When your organization sets it, the row says **Managed by your organization** and the switch is locked ([Managed Macs](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security/security-details.md#managed-macs)).
- **Updates still arrive.** With **Automatic updates** on, Slate checks 10 minutes after a login start, then every 4 hours, and installs when it quits or you log out.

## Keeping the computer awake

The computer stays awake only while there is work: a session that is working, a running automation, or a turn of Slate's own agent. A session that only waits on you does not count. The screen can still turn off, and you can still put the computer to sleep yourself.

The **coffee cup** in the top bar is the same switch. While it holds, it says why, such as "Holding now — 1 session working, 1 automation running".

## What reaches the network

- **Slate's own account**: the update check and shared workspace sync ([Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)).
- **Your agent, under its own sign-in**: scheduled automations, runs on an item, agent runs and AI memory care.
- **Your own `gh` or `glab`**: the agent run merge check.

Turning a switch off removes nothing: captured sessions stay, and shared docs stay shared.
