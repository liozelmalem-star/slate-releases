<p align="center">
  <img src="assets/icon.svg" width="88" height="88" alt="">
</p>

<h1 align="center">Slate</h1>

<p align="center"><b>Local AI memory that follows you across every tool.</b></p>

<p align="center">
  <a href="https://liozelmalem-star.github.io/slate-releases/">Website</a> ·
  <a href="https://github.com/liozelmalem-star/slate-releases/releases/latest">Latest release</a> ·
  <a href="install.sh">install.sh</a>
</p>

---

## Install

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/install.sh | bash
```

This is the command for macOS, Apple Silicon or Intel — one universal app. For Linux and
Windows, see [Status](#status). No Homebrew, no Node, no Rust, no build step — the download
already contains everything.

The script installs `Slate.app` into `/Applications` and opens it.

Then a four-step setup runs — **Welcome, AI tool, Connect, Project** — and every step can
be skipped. **Connect** installs Slate into the AI tools you pick — Claude Code, Codex,
Gemini, Cursor, OpenCode — as a plugin in Claude Code, Codex, Gemini and Cursor, and through its
config file in OpenCode. It asks first: nothing outside Slate is touched until you connect one, and after
that Slate keeps tools you install later connected too.
Full walkthrough: [Getting Started](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started/).

Updates arrive on their own. Slate checks while it is open, downloads a new version in the
background, and installs it when you next quit — or press **Restart now**. **Settings →
About → Check now** if you don't want to wait.

### Read it before you run it

Piping anything to `bash` means trusting whoever wrote it and wherever it is hosted.
[`install.sh`](install.sh) is short and commented and says what each step does. Read it.

### Why a script and not a `.dmg`

Slate is not notarized by Apple yet. macOS quarantines anything a *browser* downloads,
and for an un-notarized app that quarantine turns into *"Apple could not verify Slate is
free of malware"* — which on recent macOS you can only clear by digging through System
Settings → Privacy & Security.

Quarantine is applied by the downloading application, not by the network, and `curl`
doesn't set it. So an app installed by this script simply opens, without anyone being
asked to disable a security control.

The honest tradeoff: the installer verifies a SHA256 checksum, but the script and the
binaries come from the same host, so that covers a corrupted download rather than a
compromised one. Notarization is what buys third-party authenticity, and it isn't
done yet. Updates *are* signed — the app verifies a minisign signature against a public
key compiled into it and refuses anything that doesn't match.

### Manual install

Prefer to do it yourself? Grab the `.dmg` from
[the latest release](https://github.com/liozelmalem-star/slate-releases/releases/latest),
then clear the quarantine flag:

```bash
xattr -dr com.apple.quarantine /Applications/Slate.app
```

---

## Uninstall

```bash
curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash
```

**Your workspace is kept.** Every page and everything Slate remembered stays where it is.
Deleting it takes a second, explicit flag.

Add `--dry-run` to see every step first without changing anything — worth doing once,
because the line that matters is the one naming your workspace and its size.

Slate installs itself into the AI tools you connect it to, so deleting `Slate.app` by hand
leaves those entries behind pointing at an app that is gone. The uninstaller takes them
out for you — and only the ones Slate put there. An MCP server you registered yourself is
never touched.

| Flag | What it does |
| --- | --- |
| `--dry-run` | Print every step and change nothing |
| `--delete-workspace` | Also delete your pages, your memory and the backups |
| `--keep-connections` | Leave Slate's entries in your AI tools alone |
| `--prefix <dir>` | Look for `Slate.app` somewhere other than `/Applications` |

Pass a flag through the pipe with `bash -s --`, e.g.
`… | bash -s -- --dry-run`. Full detail, including how to do it all by hand:
[Uninstalling](https://liozelmalem-star.github.io/slate-releases/docs/overview/uninstalling/).

---

## What Slate is

A personal, local-first AI workspace — and the memory layer under every AI tool you use.
Everything lives in SQLite files on your computer.

- **On your computer, not in a cloud.** No account, and free during the alpha. Nothing leaves the
  machine unless you act; usage counts are opt-in and off until you turn them on.
- **One memory for every AI tool.** Slate is an MCP server with
  [24 tools](https://liozelmalem-star.github.io/slate-releases/docs/mcp/). Claude Code,
  Codex, Cursor, Gemini and OpenCode `recall` at the start of a task and `remember` at
  the end, into the same workspace — so what Claude Code learns on Tuesday, Cursor knows
  on Wednesday.
- **Sessions, captured and live.** Slate reads the transcripts your AI CLIs already write
  and keeps each session as a page. **Sessions** shows every one on this computer — who is
  working, who is waiting on you — and starts new ones locally, in the cloud, or for your
  phone.
- **Home, on the CLI you already have.** The in-app agent drives Claude Code, Codex,
  Cursor, OpenCode or Gemini under the sign-in you already have. No API keys — except that
  Gemini CLI itself now needs one, or a paid Code Assist licence, from Google.
- **Agents.** Work that runs for you on a trigger — a standup at 7:00, a plan for each new
  ticket — inside rules you set: reading goes ahead, writing asks you first, merging and
  deleting are refused.
- **Apps and Artifacts.** Describe a small app and your AI tool builds it inside Slate; it
  reads your workspace and has no internet. Pages and charts your tools publish land in
  Artifacts, every version kept.
- **Tasks.** Issues, reviews and replies you owe, from the tools that report them, beside
  the to-dos you write yourself.
- **Pages, Toolkit, Workspaces.** Nested, typed pages in a block editor; skills written once
  and synced to every tool; and sharing scoped to a whole workspace, off until you sign in.

Read the whole manual at
[liozelmalem-star.github.io/slate-releases/docs](https://liozelmalem-star.github.io/slate-releases/docs/).

---

## About this repository

This repo is the **distribution surface** for Slate: the installer, the website, and the
release downloads. There is no source code here — Slate's source is private.

| Path | What it is |
| --- | --- |
| `install.sh` | The installer. Kept current on every release. |
| `uninstall.sh` | The uninstaller. Removes Slate and takes it back out of the AI tools it installed itself into. |
| `index.html` | The landing page, served by GitHub Pages at the site root. |
| `docs/` | The documentation site: a hub at `/docs/`, connecting your AI tools at `/docs/connect/`, the MCP tool overview at `/docs/mcp/`, and the generated manual under `/docs/overview/`, `/docs/features/` and `/docs/legal/`. Each section is a directory, so adding one never moves an existing URL. |
| `tour/` | The guided tour at `/tour/`: Slate's own rendered screens (`tour/screens/`) shown in a frame (`tour/app.html`) with the app's compiled stylesheet, driven by the chapters in `site/js/tour/`. See [`site/README.md`](site/README.md#the-tour). |
| `site/` | Everything the website is made of: `site/css/` and `site/js/`, split so a page composes modules rather than copying them. [`site/README.md`](site/README.md) says what belongs where. |
| `assets/shots/` | Real screenshots of Slate used on the landing page, captured at 2× from the running app with example data. |
| `assets/` | Brand marks, copied from the Slate source repo's `public/assets/` — `icon.svg` (the app tile, used by the pages and the header above), `icon-dark.svg` (the same tile on the app's dark neutral, shown in the dark theme and as the dark-mode tab icon), `mark.svg` (bare, on transparency) and `logo.svg` (the lockup). Edit them there, not here. |
| Releases | The universal `.app.tar.gz` the updater consumes (Apple Silicon and Intel), its signature, the `.dmg`, `latest.json`, and `SHASUMS256.txt`. |

`index.html`, `install.sh` and `uninstall.sh` stay at the root because each is pinned by a
public URL — Pages serves the first at the site root, and the two scripts are the
addresses in the commands above, in the app, and in the release pipeline. Everything they load
lives under `site/`.

`install.sh` is generated from the Slate source repo rather than edited here — it has to
agree with the release pipeline about the shape of `latest.json`, and one source of truth
is what keeps them from drifting. Edits made directly to this file will be overwritten by
the next release.

---

## Status

**Alpha.**

<!-- slate:readme-platforms -->
Latest release: **0.1.49**.

| Platform | Status |
| --- | --- |
| macOS, Apple Silicon | Available — the primary platform, used every day |
| macOS, Intel | Available — the same universal app |
| Linux (x86_64, `.deb`) | Not in the latest release. A release attaches it only when it builds, installs and boots on Ubuntu 22.04 |
| Windows | Being ported. It boots on Windows 10/11, but the latest release has no installer |

The `curl` installer is for macOS; on any other system it says so rather than installing
something that won't run.
<!-- /slate:readme-platforms -->

Found a bug? Open an issue here.
