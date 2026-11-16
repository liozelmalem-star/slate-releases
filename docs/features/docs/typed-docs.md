# Typed Docs & Hierarchy

`doc_type` says what kind a doc is. It gives memory tools a structure to navigate. A doc has no status: no draft, active or done on screen, and no tool sets one.

## Doc types

A plain doc is a **Note**, and every new doc starts empty, whatever its type: you write it, or ask your agent to. A doc's type is set when it is made and never changes after: for a different type, make another doc. The tree's folder and the breadcrumb name the type; the open doc does not repeat it. A person writes five: Plan, Design, Review, Bug and Note. A Note is the plain doc, filed with the notes agents write. A test pass is a Review. A project holds any number of docs of each type, on any branch. You choose one when you make the doc:

- the **+** on a type folder in Projects → Docs (Plans, Reviews…) makes an empty doc of that type in that project;
- ⌘N makes a Note, and ⌘K has **New Plan**, **New Review** and the rest;
- **Write with AI** picks the type from what you ask for, and an agent names it in `create_doc`'s `doc_type`.

The new doc opens with the caret in its title, and the tree shows it in its folder. Group, project and branch are made by Slate from folders and sessions. The `DocType` enum is in `@slate/schema` (`doc-type/types.ts`):

| DocType | Purpose |
| --- | --- |
| `note` | A note: the plain doc, shown in the Notes folder. Sessions and decisions are notes too, told apart by `properties.kind` |
| `design` | How it will work and look, and what was decided: Need, The screen (a mockup or a flow), Approach, Options considered, Decision |
| `plan` | What will be built, in what order, and why: Goal, Phases (what each delivers), Decisions, Risks, Out of scope |
| `review` | What was found and decided: What was reviewed, What holds, What must change (with evidence), Decision |
| `bug-report` | What is broken and why: What happens, Steps to reproduce, Expected and actual, Why, The fix and the test that guards it |
| `group` | Set of projects you made and named; no folder of its own |
| `project` | One folder, usually a git repository, in a group or alone |
| `mission` | Legacy; work now files under its project ([`mission` docs](missions.md)) |

## The line under the title

A doc is the product's source of truth, not a tracker, so a type's line says what the doc decided or how bad a bug is, in words. It never counts steps or results, and it has no state to manage. The fields live in the doc's `properties` JSON beside its branch label (`DocHeader` in `@slate/schema`, `doc-type/header.ts`).

| Type | The line |
| --- | --- |
| Design | **Decision:** one line, or **Decision: not decided yet** |
| Bug Report | Its severity in words: **S1 · broken, no way around it**, **S2 · wrong, with a way around it** or **S3 · minor** |
| Review | Its decision: **Approved** or **Changes needed** |

A plan and a note have no line. A bug or a review shows nothing until its field is written. The line is read-only: an agent writes it, and you change it the way you change anything in the doc, by asking the AI helper.

An agent sets the fields through MCP: `create_doc` and `append_to_doc` take `severity`, `decision` and `verdict`. A repeat `create_doc` with the same type, branch and title updates that doc; another title makes another doc. The names before 2026-11-15 still work: `general` and `meeting` make a note, `test-plan` a review. `append_to_doc` accepts a field with no Markdown. The shape each type expects is in `create_doc`'s description, so the agent writes it; Slate never puts it into your doc.

## The hierarchy

Structural types nest as memory expects (`@slate/schema`, `doc-type/rules.ts`):

```
group
└── project
    └── branch
        └── knowledge docs
            (plan | design | review | bug-report | note)
```

A project may stand at top level with no group. Knowledge docs may sit directly under a `group` or `project`. `ALLOWED_DOC_CHILDREN` says what nests under what; for groups, projects and branches it is enforced on move (a `project` dropped in a `branch` is refused). A knowledge doc in an unusual place shows a tree warning.

Memory tools work without a doc id: on `recall` or `remember` Slate resolves a **target** by walking from the current project and group. A memory belongs to the project it concerns and says which git branch it was learned on (a label, never a doc). A decision's full reasoning is a decision doc under the project, labelled with its branch; the tree counts them in a **Decisions** row.

## Filling one in

These docs are the product's source of truth for everyone who builds it: design, product, R&D and UX. They hold no progress, no counts and no status. The shapes above are what agents are told to write (`create_doc`'s description); Slate never puts them into your doc. A small fix is typed in the doc; anything larger you ask the **AI helper** (the lime circle) for, and the agent rewrites the doc. A Design's screen is a published mockup placed in its text ([Artifacts → Inside a Design](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md#finding-one)).

Slate never creates a knowledge doc without asking: at a milestone your agent asks whether to save it ([`mission` docs](missions.md#slate-offers-the-doc-at-each-milestone)). To have an agent write into a doc, use **Start session** on the doc's header or its Sessions tab. The launcher hands the CLI the doc, its lineage (group → project → branch), the branch's goal and next open item, and the project's recorded decisions ([Sessions → Starting a session from a doc](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions/start.md#from-a-doc)).

See also: [Docs & the Block Editor](https://liozelmalem-star.github.io/slate-releases/docs/features/docs.md), [Recall & Remember](https://liozelmalem-star.github.io/slate-releases/docs/features/memory/recall-remember.md).
