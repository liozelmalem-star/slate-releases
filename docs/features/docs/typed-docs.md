# Typed Docs & Hierarchy

`doc_type` says what kind a doc is; `status` says where it stands. Together they give memory tools a structure to navigate.

## Doc types

A new doc is a plain **Doc**. The chip under the title (**Doc ▾**) changes its type any time, listing the seven types a person writes: Doc, Plan, Design, Review, Meeting, Test Plan, Bug Report. A change appends the new type's template headings after the existing text, once. Group, project and branch are made by Slate from folders and sessions, so they are not in the menu. The `DocType` enum is in `@slate/schema` (`doc-type/types.ts`):

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

## Status

From `DOC_STATUSES`: `draft` (started, not active), `active` (in progress), `done`, `canceled` (abandoned).

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
