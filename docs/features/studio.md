# Toolkit

Each AI coding tool wants instructions in its own place and format, and hand-kept copies drift. Toolkit keeps one source and writes an adapter per tool. **Toolkit** in the app shows everything a project's agents read, one tab per kind.

## Contents

- [The source of truth](#the-source-of-truth)
- [Generated adapters](#generated-adapters)
- [Commands](#commands)
- [In the app](#in-the-app)
- [Suggestions](#suggestions)

## The source of truth

Two things, both checked in. To adopt them in an existing project: [Start using .slate](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/start-using-slate.md).

| Source | Role |
| --- | --- |
| `AGENTS.md` | Cross-tool entry point: how to work in this project. |
| `.slate/` | `config.toml` (the manifest) and `skills/`, one `SKILL.md` per skill. |

## Generated adapters

`yarn studio sync` reads the manifest and writes each tool's adapter. Most outputs are generated, listed in a Slate block of `.gitignore`, never hand-edited. Codex's project skills are tracked symlinks so Codex finds them in a fresh worktree.

| Tool | Generated paths |
| --- | --- |
| Claude Code | `.claude/skills/`, `.mcp.json`, `CLAUDE.md` |
| Cursor | `.cursor/skills/`, `.cursor/mcp.json`, `.cursor/rules/slate.mdc` |
| Codex | `.agents/skills/` (tracked), `.codex/config.toml` (generated) |
| Gemini CLI | `.gemini/skills/`, `.gemini/settings.json` |
| OpenCode | `.opencode/skills/`, `.opencode/opencode.json` |
| GitHub Copilot | `.github/skills/`, and the `.mcp.json` Claude Code reads |

The manifest's `rules` line names the rules file, `AGENTS.md` by default. Codex, Cursor, Gemini and OpenCode read it directly; `CLAUDE.md` is a symlink to it. Every adapter carries the same skills and MCP configuration in its tool's shape.

If a tool's skills folder is itself a link (often to a shared folder), sync writes nothing through it and prints a `skills skipped` line naming folder and link. The same holds for every file sync writes in the project: a tool's config, a rules adapter, `.gitignore`. When the file, or any folder on the way to it, is a link, sync writes nothing there and prints a `refused` line naming the link. A cloned project cannot use a link such as `.codex -> ~/.codex` to put servers into your own tool configs.

A real folder or file where a skill link goes (your own `.cursor/skills/alpha`, say) is left as it is and printed as a `refused` line; every other skill is still linked. One part that fails does not stop the rest: a `SKILL.md` whose frontmatter does not parse, a tool config that is not valid JSON or TOML, or a real `CLAUDE.md` where the rules link goes is skipped, every other skill, MCP file, rules file and `.gitignore` is still written, and sync then fails with every problem it met. A skill that is skipped this way keeps the link it already had.

**Writes outside the project.** When `.slate/` lists MCP servers, a sync you start writes them into the machine-wide Claude Desktop config (macOS and Windows, app installed) and `~/.cursor/mcp.json`. You start one with `yarn studio sync`, **Sync now**, or by changing a `.slate/` skill or the rules file in Toolkit. Never written by: the sync Slate runs itself when `.slate/` changes, any sync inside a linked git worktree, or with `STUDIO_SKIP_DESKTOP=1`.

**Removing an MCP server.** Studio remembers the servers it wrote, per file, in `.slate/mcp-owned.json` (ignored by git). Take a server out of `.slate/` and the next sync removes it from every tool's file, unless you changed that entry or wrote it yourself first. Entries you added by hand are never removed. In the two machine-wide files, which every project shares, Studio removes only an entry that points into this project. A dropped server run by a bare `npx` or `uvx` command, or a remote one, stays there on purpose, because Studio cannot prove it is its own; remove it by hand. A JSON file with comments or trailing commas is read, but never rewritten. Toolkit's sync pill lists that tool as "MCP file is not plain JSON (comments or trailing commas): edit it by hand", `yarn studio check` prints the same reason, and `yarn studio sync` prints it as a `refused:` line.

**Checks.** `.slate/link-copies.json` (the record Windows keeps when it copies a rules file instead of linking it) is ignored by git, like `mcp-owned.json`. A key in `.slate/config.toml` that Studio does not know, such as `tools` written under `[project]`, is an error that names the key. `yarn studio check` fails a `SKILL.md` without a non-empty `name` and `description`; `sync` still links the other skills.

## Commands

```
yarn studio sync     # write the adapters from AGENTS.md + .slate/
yarn studio check    # fail on drift (part of yarn receipt)
yarn studio status   # per-tool table of what is projected
yarn studio prove    # sources, adapters, symlinks, and a live probe of each installed tool
```

`yarn studio check` keeps a stale `CLAUDE.md` or `.cursor/` out of main.

## In the app

Edits are committed in **Projects → Code → Changes**.

The side panel's picker starts with **Your agents** ([what each keeps for every project](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/editing-and-agents.md#your-agents)), then projects that have a folder, by group, with or without `.slate/`. Groups and plain docs are not projects. An unreadable folder is reported in the doc. A project with more than one `.slate/` gets a second picker named by folder.

Every project has **Overview**, **Suggestions** (with the waiting count) and one tab per non-empty kind with its count. Hover a tab to see when a tool loads that kind: a skill when the task matches, a command on `/name`, a rule when the file in use matches, instructions at session start. **+** in the title row asks which kind to add ([Adding](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/adding.md)).

**Overview** is where Toolkit opens: one row per non-empty kind (name, first five items in one grey line, count) that opens its tab. When suggestions wait, a top card gives the count and **Review**. Your agents has no Overview and opens on Skills.

| Tab | What it lists | Where Slate reads it |
| --- | --- | --- |
| **Skills** | Every skill, marked with the tools that read it | `.slate/skills` (tagged `.slate · <group>`), `.claude/skills`, `.agents/skills`, `.cursor/skills`, `.gemini/skills`, `.opencode/skills`, `.codex/skills`, `.github/skills`, any other dot-folder with a `skills/`, and sub-packages up to three folders deep |
| **Commands** | Slash commands | `.claude/commands`, `.cursor/commands`, `.gemini/commands` (TOML), `.opencode/commands` |
| **Subagents** | Agents a session can hand work to | `.claude/agents`, `.cursor/agents`, `.gemini/agents`, `.opencode/agent(s)`, `.codex/agents` (TOML) |
| **Rules** | When-to-apply rules | `.cursor/rules/*.mdc`, `.claude/rules`, `.codex/rules/*.rules` |
| **Instructions** | What every session reads first | `AGENTS.md`, `AGENTS.override.md`, `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, `GEMINI.md`, `.cursorrules` |
| **MCP servers** | One row per server, marked with every tool that has it | `.mcp.json`, `.cursor/mcp.json`, `.gemini/settings.json`, `.codex/config.toml`, `opencode.json`, `opencode.jsonc`, `.opencode/opencode.json` |
| **Hooks** | One row per event and matcher | `.claude/settings.json`, `.claude/settings.local.json`, `.cursor/hooks.json`, `.gemini/settings.json` |
| **Plugins** | What the project turns on | `.claude/settings.json`, `.codex/config.toml`, `opencode.json`, `.opencode/opencode.json`, `.opencode/plugin(s)` |
| **Config files** | Each agent's config file | `.claude/settings.json`, `.claude/settings.local.json`, `.cursor/hooks.json`, `.cursor/cli.json`, `.gemini/settings.json`, `.codex/config.toml`, `opencode.json`, `opencode.jsonc`, `.opencode/opencode.json` |

**Output styles** (`.claude/output-styles`) has a tab too.

An empty kind keeps its tab and a **New …** button. Only tools this workspace connects get a mark. A personal file such as `settings.local.json` is marked **this computer only**. A config that does not parse is listed with the reason and what its tool does (Gemini CLI and OpenCode refuse to start).

Links into an item: a session's **Setup used**, the skill a kind of work runs in Tasks' **Workflow**, the skill an accepted lesson became (Memory), a subagent's type under a session, each skill in the composer's **/** list.

More: [usage counts, changes chip and sync pill](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/usage-and-sync.md); [adding](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/adding.md); [editing, removing and Your agents](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/editing-and-agents.md).

## Suggestions

**Suggestions** lists changes to the project's AI setup, worst first, each with one button. Nothing changes until you click. Toolkit's rail entry shows the count. Kinds and limits: [Suggestions](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/suggestions.md).

## See also

* [Project environments](https://liozelmalem-star.github.io/slate-releases/docs/features/studio/cli-profiles.md): the accounts your agents run under.
