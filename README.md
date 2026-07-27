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

macOS, Apple Silicon. No Homebrew, no Node, no Rust, no build step — the download
already contains everything.

The script installs `Slate.app` into `/Applications` and opens it. On first launch Slate
registers itself as an MCP server with the AI tools it finds — Claude Code, Cursor,
Codex, Gemini — so there is nothing to configure.

Updates arrive in-app: **Settings → About → Check for updates**.

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
compromised one. Notarization is what buys third-party authenticity, and it's on the
roadmap. Updates *are* signed — the app verifies a minisign signature against a public
key compiled into it and refuses anything that doesn't match.

### Manual install

Prefer to do it yourself? Grab the `.dmg` from
[the latest release](https://github.com/liozelmalem-star/slate-releases/releases/latest),
then clear the quarantine flag:

```bash
xattr -dr com.apple.quarantine /Applications/Slate.app
```

---

## What Slate is

A personal, local-first AI workspace — nested pages, a block editor, and an in-app AI
agent, all in one SQLite file on your machine.

- **One file, on your Mac.** No account, no sync, no telemetry. It works on a plane.
- **Shared memory for every AI tool.** Slate is an MCP server, so what Claude Code learns
  on Tuesday, Cursor knows on Wednesday.
- **Pages and a block editor.** Nested, typed pages — projects, repos, branches, plans,
  designs — in a keyboard-first editor.
- **An agent that runs on your CLI.** The in-app agent drives the Claude Code or Gemini
  CLI you already have. No API keys.

Everything is local by default. Nothing leaves the machine unless you sign in and
explicitly mark a page to share.

---

## About this repository

This repo is the **distribution surface** for Slate: the installer, the website, and the
release downloads. There is no source code here — Slate's source is private.

| Path | What it is |
| --- | --- |
| `install.sh` | The installer. Kept current by CI on every release. |
| `index.html` | The website, served by GitHub Pages. |
| `assets/` | Icon and wordmark. |
| Releases | The `.app.tar.gz` the updater consumes, its signature, the `.dmg`, `latest.json`, and `SHASUMS256.txt`. |

`install.sh` is generated from the Slate source repo rather than edited here — it has to
agree with the release pipeline about the shape of `latest.json`, and one source of truth
is what keeps them from drifting. Edits made directly to this file will be overwritten by
the next release.

---

## Status

**Alpha.** macOS on Apple Silicon. Intel and Linux builds don't exist yet; the installer
tells you rather than installing something that won't run.

Found a bug? Open an issue here.
