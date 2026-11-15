# Typed Docs & Hierarchy

`doc_type` says what kind a doc is. It gives memory tools a structure to navigate. A doc has no status: no draft, active or done on screen, and no tool sets one.

## Doc types

A new doc is a plain **Doc**, and every new doc starts empty, whatever its type: you write it, or ask your agent to. A doc's type is set when it is made and never changes after: for a different type, make another doc. The label under the title shows the type with its icon; it is not a control. A person writes seven types: Doc, Plan, Design, Meeting, Review, Test, Bug. You choose one when you make the doc:

- the **+** on a type folder in Projects → Docs (Plans, Reviews…) makes an empty doc of that type in that project;
- ⌘N makes a plain Doc, and ⌘K has **New Plan**, **New Review** and the rest;
- **Write with AI** picks the type from what you ask for, and an agent names it in `create_doc`'s `doc_type`.

The new doc opens with the caret in its title, and the tree shows it in its folder. Group, project and branch are made by Slate from folders and sessions. The `DocType` enum is in `@slate/schema` (`doc-type/types.ts`):

| DocType | Purpose |
| --- | --- |
| `general` | Plain knowledge doc |
| `design` | Design doc |
| `plan` | Implementation or work plan |
| `review` | Review write-up |
| `meeting` | Meeting notes |
| `test-plan` | Test plan |
| `bug-report` | Bug report |
| `group` | Set of projects you made and named; no folder of its own |
| `project` | One folder, usually a git repository, in a group or alone |
| `mission` | Legacy; work now files under its project ([`mission` docs](missions.md)) |

## The line under the title

Some types show one quiet line under the title that says where the doc stands. Nothing in it needs a migration: the counts are read from the doc's checklist when drawn, and the fields live in the doc's `properties` JSON beside its branch label (`DocHeader` in `@slate/schema`, `doc-type/header.ts`).

| Type | The line | Set by |
| --- | --- | --- |
| Plan | **Steps done: 7 of 12**, counted from its checklist; ticking a step moves it at once | the checklist |
| Test Plan | **3 pass · 2 open**: a ticked case passed, the rest are open | the checklist |
| Bug Report | Severity **S1**, **S2** or **S3** (the words GitHub Issues use) and state **Open** or **Closed** | you, or an agent |
| Design | **Decision:** one line | you, or an agent |
| Review | Verdict **Approved** or **Changes needed** | you, or an agent |

Doc and Meeting have no line. A plan or a test with no checklist shows none. On a doc you can write, an unset field shows its name (**Severity**, **State**) to click; someone reading a teammate's doc sees only the fields that are set.

An agent sets the same fields through MCP: `create_doc` and `append_to_doc` take `severity`, `state`, `decision` and `verdict`. `append_to_doc` accepts a field with no Markdown, so it can close a bug without touching its text. The shape each type expects (a plan's phases with `- [ ]` steps, a bug's steps and evidence) is in `create_doc`'s description, so the agent writes it; Slate never puts it into your doc.

## The hierarchy

Structural types nest as memory expects (`@slate/schema`, `doc-type/rules.ts`):

```
group
└── project
    └── branch
        └── knowledge docs
            (plan | design | test-plan | bug-report | review | meeting | general)
```

A project may stand at top level with no group. Knowledge docs may sit directly under a `group` or `project`. `ALLOWED_DOC_CHILDREN` says what nests under what; for groups, projects and branches it is enforced on move (a `project` dropped in a `branch` is refused). A knowledge doc in an unusual place shows a tree warning.

Memory tools work without a doc id: on `recall` or `remember` Slate resolves a **target** by walking from the current project and group. A memory belongs to the project it concerns and says which git branch it was learned on (a label, never a doc). A decision's full reasoning is a decision doc under the project, labelled with its branch; the tree counts them in a **Decisions** row.

## Filling one in

Slate never creates a knowledge doc without asking: at a milestone your agent asks whether to save it ([`mission` docs](missions.md#slate-offers-the-doc-at-each-milestone)). To have an agent write into a doc, use **Start session** on the doc's header or its Sessions tab. The launcher hands the CLI the doc, its lineage (group → project → branch), the branch's goal and next open item, and the project's recorded decisions ([Sessions → Starting a session from a doc](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#from-a-doc)).

See also: [Docs & the Block Editor](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md), [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).
