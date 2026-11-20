# What Slate costs your machine

**When nothing changes, Slate does nothing.** If you are not typing, no file changed and no AI session is writing, Slate uses almost no CPU and wakes your Mac as little as it can. The numbers below are the most Slate may use. Slate's tests measure every change against them, and a change that goes over a limit fails. Limits only go down.

"% of one core" is the share of one processor core: 100% is one core fully busy, and your Mac has several.

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

### Started at login, no window

When Slate starts at login, it loads no window until you open it: only the app, its menu bar icon and the server run. Together they use at most 0.2% of one core and 278 MB of memory, with no webview loaded.

### Slate's server, idle

| Store | CPU, % of one core | Wake-ups per second | Memory |
| --- | --- | --- | --- |
| A new user | 0.05% | 0.2 | 138 MB |
| Six months of use | 0.05% | 0.2 | 208 MB |
| A heavy user | 0.05% | 0.2 | 236 MB |

In use, on the heavy store with an agent's sessions captured and Tasks, Sessions and Memory opened, the memory the server's code still uses two minutes after launch is at most 51 MB. It counts what the code keeps, not what macOS has not taken back yet, so it is smaller than the table above.

With a window open and nothing running, the server wakes at most 0.3 times per second.

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

The tests use no data of yours. They build their own stores (a new user, six months of use, a heavy user) and launch their own copy of the app. A number over its limit is measured again, and counts only if both runs are over. The limits come from the Mac named under the tables; a slower Mac may show a higher percentage for the same idle Slate.

## Check it yourself

Use Activity Monitor (Applications → Utilities).

1. Leave Slate open on any screen and do not touch it for a minute.
2. In the **CPU** tab, search for `Slate`. You see the app and its server (`slate-mcp`). Add their **% CPU**. The limits also count the web view's helper processes, so the real total is a little higher.
3. In the **Energy** tab, read Slate's **Energy Impact** and **Avg Energy Impact**. An idle Slate sits near zero. A high average while you did not use it is worth reporting.
4. Hide the window (⌘H) and look again. That is the "Window hidden" row.

Your numbers can be higher than the idle limits for a good reason. While an AI session writes, Slate reads it as it happens; the "while AI sessions work" limit covers that. Slate starts no programs on a timer to check on a session.

## See also

* [Platform and availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md)
* [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
