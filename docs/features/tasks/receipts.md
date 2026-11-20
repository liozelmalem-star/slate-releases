# Receipts

A receipt shows what an agent session really ran, checked against what it said, so you can
trust a "the tests pass" without reading the transcript. Slate writes one from the
session's transcript when a turn ends, in any captured agent, with no model and nothing
leaving this computer. A session that only talked (no check, no changed file, no commit)
gets none.

You find a receipt on a finished agent run's task, as **Receipt**, and on a session in
[Sessions](https://liozelmalem-star.github.io/slate-releases/docs/features/sessions.md).

## What it shows

- **It said**: the first paragraph of the last reply.
- **Checked against the transcript**: where what it said and what it ran disagree, with the
  evidence. Otherwise: **What it said matches what it ran.**
- **What it ran**: every test, gate, lint, typecheck and build, in order, with the passed
  and failed counts or the exit code.
- **What changed**: the files it edited.
- **Outcome**: the commits it made, and whether they are **On the default branch**, were
  **Reverted on the default branch** within 30 days, or are
  **Not on the default branch yet**.

Checks are found in `package.json` scripts, `make` and `just` targets, and the pre-push
hook, which always counts as a gate. Cursor records commands but not their results, so its
runs show **not recorded**.

## Flags

| Badge | Flag |
| --- | --- |
| **Flagged** (red) | **A test failed, then passed on a re-run with no change in between** |
| **Flagged** (red) | **The last run failed, and nothing passed after it** |
| **Flagged** (red) | **It said the checks pass, but no test or gate run passed** |
| **Worth a look** (amber) | **A run ended without a result**: it was stopped before saying how it went |
| **Worth a look** (amber) | **It edited a file outside the project**. Temporary folders and the agents' own folders do not count |
| **Worth a look** (amber) | **A test's expected value was changed** |

A receipt with no flag shows **Matches**.

## Actions

- **Mark reviewed** clears it from the count. New runs, edits or commits in that session
  ask again.
- **Open session** opens the session's tab.
- **Copy as Markdown** copies the whole receipt, for a pull request.
- **Share as artifact** publishes the same text as an [artifact](https://liozelmalem-star.github.io/slate-releases/docs/features/artifacts.md).

## What is stored

One receipt per session that ran a check, changed a file or made a commit, in the workspace
that holds the project's folder: the session, its title and branch, the first paragraph of
the last reply, each run's command and result, the edited paths, the flags, the commits,
and when you marked it reviewed. Never a run's output beyond its counts, and never the text
of an edit. It stays on this computer and is never shared.
