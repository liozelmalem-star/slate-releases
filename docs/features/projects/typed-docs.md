# Doc types

Every doc has a type, so a project's docs sort themselves into folders and an agent knows
what shape to write. You write five types: **Plan**, **Design**, **Review**, **Bug** and
**Note**. A plain doc is a note. A test pass is a review.

## Choose a type

You choose the type when you make the doc, and it never changes after. For another type,
make another doc.

- the **+** on a project's row, or on a type folder in **Docs** ([Add a doc](https://liozelmalem-star.github.io/slate-releases/docs/features/projects/tree.md#add-a-doc));
- **⌘N** makes a note; ⌘K has **New Plan**, **New Review** and the others;
- **Generate a doc** (⌘⇧G) picks the type from what you ask for.

Every new doc starts empty. You write it, or ask your agent to. A project holds any number
of docs of each type, from any branch.

| Type | What it holds |
| --- | --- |
| **Plan** | What will be built, in what order, and why: goal, phases, decisions, risks, out of scope |
| **Design** | How it will work and look, and what was decided: the need, the screen, the approach, options considered, the decision |
| **Review** | What was found and decided: what was reviewed, what holds, what must change, the decision. One check item per finding or test case ([Check items](https://liozelmalem-star.github.io/slate-releases/docs/features/projects/editor.md#check-items)) |
| **Bug** | What is broken and why: what happens, steps to reproduce, expected and actual, the cause, the fix and the test that guards it |
| **Note** | Anything else: findings, a write-up, meeting notes, research |

These shapes are what agents are told to write. Slate never puts them into your doc.

## The line under the title

Some types show one line under the title. It says what the doc decided, or how bad a bug
is. It is read-only on screen: an agent writes it, and you change it by asking your agent.

| Type | The line |
| --- | --- |
| **Design** | **Decision:** and one line, or **Decision: not decided yet** |
| **Bug** | Its severity: **S1 · broken, no way around it**, **S2 · wrong, with a way around it** or **S3 · minor** |
| **Review** | Its decision: **Approved** or **Changes needed** |

A plan and a note have no line. A bug or a review shows nothing until an agent writes it.

## Docs your agent saves

Slate never makes a doc without asking. When your request names a milestone (a plan, a
review or test pass, a bug report, a design), Slate tells your agent to ask in the chat
whether to keep it as a doc. The agent asks with its own question tool, so in most agents
you click an answer.

- **Yes**: the agent saves the doc in the project, labelled with the branch. If the branch
  already has a doc of that type, it adds to that doc and keeps what is there.
- **No**: nothing is saved.

**A plan from plan mode** is kept as the project's Plan doc for that branch. A later plan
on the same branch replaces the one Slate saved. A Plan doc you wrote is never changed.

To have an agent change an existing doc, ask it in a session. It reads and writes docs
through Slate's tools ([MCP tool reference](https://liozelmalem-star.github.io/slate-releases/docs/features/mcp-server/tools.md#docs)). The doc's header
shows the sessions working on it; click one to open it.
