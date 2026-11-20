# Search and save

Agents read and write memory through Slate's MCP tools. You do not call these yourself;
this explains what your agents do with them, so you know what to expect. Every
argument is in the [MCP tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md#memory).

## Search: `recall`

`recall` searches the project's memories, its docs in Slate, and the project's own
Markdown files (`AGENTS.md`, `CLAUDE.md`, `README.md`, `CONTRIBUTING.md` at its root, and
the `.md` files under `docs/`, `doc/`, `adr/` and `decisions/`). It returns a shortlist of
15, one line each, best first. The agent picks the ones that answer its task.

- **Ranking is local.** Words are matched by how rare they are among your memories. No
  model is called and nothing is downloaded. Recent memories rank slightly higher.
- **Nothing found is an answer.** A question nothing covers gets no memories, and a
  one-line note naming up to three docs worth reading.
- **A changed citation is flagged.** `citation: changed` means the cited code changed since
  the memory was written; `citation: gone` means the file is missing. The agent reads the
  code before relying on it.
- **About the branch.** When the question names the branch, or asks what is open or in
  progress, the first result is the branch's brief: its goal, open items, recent sessions
  and commits.
- **The past.** With `as_of` and a date, `recall` answers from what memory believed at the
  end of that day.

`get_memory` reads memories in full: why each was written, the file it cites, who
confirmed it, and what it replaced.

## Save: `remember`

A session saves one memory per call, as one sentence, with a kind: `decision`,
`preference`, `state` (where something stands), `fact` or `lesson`
([Kinds of memory](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md)).

- **Filing.** The memory belongs to the project the session works in. With no project it is
  global and reaches every session.
- **Duplicates.** A near-duplicate strengthens the memory already there. The reply lists up
  to 3 close memories, so the agent can replace one that is wrong.
- **Pinning.** `index: true` pins the memory into the project's index, up to 25 per project.
- **Secrets.** Recognised keys, tokens and passwords are saved as `[secret]`.
- **Disagreement.** A claim that contradicts a surer memory never overwrites it. It waits
  for you under [To review](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/map.md#to-review).

**What is worth saving**: a correction you made, an approach you confirmed, a decision and
its reason, something true that is not obvious. Agents are asked to save at most two per
task. After real work with nothing saved (5 changes or 10 of your turns), or after you
corrected the agent, the session's end asks it once to save what the next session needs.

**What is refused**, each with the reason: passing status ("currently editing X"), a
progress note or a git snapshot, a decision with no reason, an agent's memory with three
or more numbers, a `state` with no `subject`, and anything the project's memory settings
turn off ([What a project keeps](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/decisions-and-facts.md#what-a-project-keeps)).

**Correcting.** The agent writes the true claim and names the wrong one in `replaces`. The
wrong one is retired.

## Lessons

A lesson says what to do in a situation. Give it a `when`, and it arrives with the
matching tool call:

| `when` | Arrives with |
| --- | --- |
| `{ tool: "shell", match: "<regular expression>" }` | A command that matches, such as `git push` |
| `{ tool: "read", path: "<glob>" }` | Reading a matching file, such as `packages/db/**` |
| `{ tool: "edit", path: "<glob>" }` | Editing or writing a matching file |

A memory that cites the file being read or edited arrives the same way. At most 2 memories
arrive per call, each once per session. The call is never blocked or changed. A pattern that
matches everything is refused.

| Agent | When the lesson arrives |
| --- | --- |
| Claude Code | Before a shell, read or edit call |
| Codex | Before a shell or patch call, once you trust Slate's hook under `/hooks` |
| Gemini, Cursor | After a shell, read or edit call, in its result |
| OpenCode | After a shell, read, edit or patch call, in its result |

## Progress on a branch

`log_mission_progress` reports a session's work on its branch. Its goal and open items
become what the next session on that branch is told. Each decision becomes a memory. The
summary is kept with the project's sessions. On `main`, `master` or `develop` the goal is
not changed.

## How Slate learns what helped

An agent names the refs of the memories it used, in `used` on its next tool call, never in
its reply. Your own acts on the code count too:

- your merge of a branch confirms the memories its sessions used;
- a revert or a discard contradicts them;
- saving an edit on cited lines asks whether the memory still holds
  ([What agents know about the file](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/files.md#what-agents-know-about-the-file)).

Each shows on the memory's card with an undo. A memory contradicted twice and never
confirmed leaves the index unless pinned. A memory nobody uses or restates for 30 days
rests: it leaves the index but stays searchable.
