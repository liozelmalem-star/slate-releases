# What Slate costs your machine

**When nothing changes, Slate does nothing.** If you are not typing, no file changed and no AI session is writing, Slate uses almost no CPU and wakes your Mac as little as it can. Slate's tests measure this against the limits below, and a change that goes over one fails them.

Limits only go down. When a change makes Slate cheaper, its limit drops in the same change.

***

## The limits

Each number is the most Slate may use. Each limit was set from the median of several measured runs, plus room for a busy machine: twice the measured CPU, 10% more memory, size and wake-ups. The tables are written from the limits file the tests read, so this guide cannot disagree with them.

"% of one core" is the share of one processor core. 100% is one core fully busy, and your Mac has several.

<!-- footprint:begin — written by scripts/gate/footprint-doc.mjs from scripts/gate/footprint-budget.json. Edit the budget, then run it. -->
### With the window open and idle

| Screen open | At most, % of one core |
| --- | --- |
| Sessions | 1.5% |
| Home | 0.4% |
| Projects | 1.5% |
| Tasks | 0.6% |
| Memory | 1% |
| Activity | 0.6% |
| Artifacts | 4.5% |
| Widgets | 3.5% |
| Automations | 1.5% |
| Toolkit | 0.4% |
| Connect | 2% |
| Trash | 0.6% |
| Settings | 1.5% |
| Window hidden | 3% |

### Slate's server, idle

| Store | CPU, % of one core | Wake-ups per second | Memory |
| --- | --- | --- | --- |
| A new user | 0.05% | 0.2 | 138 MB |
| Six months of use | 0.05% | 0.2 | 208 MB |
| A heavy user | 0.05% | 0.2 | 236 MB |

In use, on the heavy store with an agent's sessions captured and Tasks, Sessions and Memory opened, the memory the server's code still uses two minutes after launch is at most 51 MB. It counts what the code keeps, not what macOS has not taken back yet, so it is smaller than the table above.

With a window open and nothing running, the server wakes at most 0.55 times per second.

### Slate's server, while AI sessions work

Two sessions working, one of them writing every 2 seconds, on the six-months store.

| What | At most |
| --- | --- |
| CPU, % of one core | 2% |
| Programs it starts on its own, per second | 0 |
| Times it re-asks an agent about a session in a long tool call, per second | 0.05 |

### Download and disk

Each kind of Mac has its own download, since 0.1.55:

| Chip | Download (.dmg), at most | Installed app (.app), at most |
| --- | --- | --- |
| Apple Silicon | 132 MB | 403 MB |
| Intel | 132 MB | 403 MB |

Measured on a MacBook Pro with an Apple M4 Pro (14 cores, 48 GB of memory) on macOS 26. MB is 1,024 × 1,024 bytes.
<!-- footprint:end -->

***

## How they are measured

The tests use no data of yours. They make their own stores and launch their own copy of the app. Five parts:

* **The server.** It runs on three made-up stores built from a fixed seed: a new user, six months of use and a heavy user. The test starts the server, lets it settle, then watches it for a fixed time while nothing happens. It records CPU, how often the server woke to run code, and memory at the end, as Activity Monitor shows it (memory written to, not memory macOS can take back).
* **The server while AI sessions work.** The six-months store, with two made-up AI sessions in a made-up home folder, one in a project folder and one in a plain folder, one writing every 2 seconds. The test records CPU and counts every program the server starts on its own (such as `git`), through stand-ins that log each start. While only the sessions' own writing changes, that count must be zero. Your real sessions are never read.
* **The server in use.** The heavy store with 600 MB of made-up AI sessions captured (three still running), and Tasks, Sessions and Memory opened. Two minutes after launch the test reads the memory the server's code still holds after everything unused is cleared.
* **The app.** A test copy opens each screen in turn and stays on it, idle. The test adds the CPU of every process the copy owns: the app, its server and the web view helpers macOS starts. Then it hides the window and measures once more.
* **The size.** The download (`.dmg`), the installed app (`.app`), and the part of the app and server built for each chip.

A number over its limit is measured again, and counts only if both runs are over, so a short spike on a busy machine does not fail a change. The limits come from one Mac, named under the tables. A slower Mac may show a higher percentage for the same idle Slate.

***

## Check it yourself

Use Activity Monitor (Applications → Utilities).

1. Leave Slate open on any screen and do not touch it for a minute.
2. In the **CPU** tab, search for `Slate`. You see the app and its server (`slate-mcp`). Add their **% CPU**. The tables also count the web view helpers, so the real total is a little higher.
3. In the **Energy** tab, read Slate's **Energy Impact** and **Avg Energy Impact**. An idle Slate sits near zero. A high average while you did not use it is worth reporting.
4. Hide the window (⌘H) and look again. That is the "Window hidden" row.

Your numbers can exceed the idle limits for a good reason. While an AI session writes, Slate reads it as it happens, which is work you asked for. The "while AI sessions work" limit covers that. Slate reads what a session wrote and starts no programs on a timer to check on it.

A working session does not keep the screen moving. Its dot on the rail and in Sessions moves when the session starts working or starts waiting on you, then holds still. Slate's tests reject any animation that never ends, except while something finishes on its own, such as a web page loading or an app being built.

***

## See also

* [Platform & Availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md)
* [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
