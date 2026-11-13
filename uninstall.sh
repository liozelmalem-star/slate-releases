#!/usr/bin/env bash
# Slate uninstaller — macOS.
#
#   curl -fsSL https://liozelmalem-star.github.io/slate-releases/uninstall.sh | bash
#
# Canonical home: github.com/liozelmalem-star/slate-releases (public). Authored in the
# private source repo and copied there on every release, beside install.sh, for the same
# reason that one is: this script and the app's own --disconnect-all flag have to agree,
# and a copy that drifts is a copy that leaves things behind.
#
# Takes Slate off this Mac and puts back what it changed. YOUR WORKSPACE IS KEPT unless
# you pass --delete-workspace.
#
# WHAT IT REMOVES
# ---------------
#   1. Slate's entries in every AI tool it installed itself into — the plugin trees, the
#      capture hooks and the MCP server registrations, in whichever accounts Slate
#      actually wrote to.
#   2. /Applications/Slate.app
#   3. The "Start Slate at login" item: the one macOS holds for the app (System Settings →
#      Login Items), and the ~/Library/LaunchAgents/Slate.plist versions before 0.1.69 wrote.
#   4. The logs, the cache and the webview state.
#   5. The workspace itself — ONLY with --delete-workspace.
#
# WHY STEP 1 RUNS FIRST, AND FROM THE APP
# ---------------------------------------
# Slate writes into seven other products, each with its own config format, its own
# account layout and its own idea of what "installed" means. The app already knows all of
# that, and it keeps a record of exactly which accounts it wrote to — so it is asked to
# undo its own work rather than this script guessing at seven file formats. That record is
# also what keeps the removal safe: an MCP server you registered yourself, or a plugin
# marketplace that merely shares a name, is not Slate's to take out and is left alone.
#
# The consequence is that step 1 has to happen while the app bundle still exists. If you
# have already dragged Slate to the Trash, this script will say so and skip that step —
# reinstall it first if you want those entries cleaned up.
#
# WHY IT NEVER ASKS
# -----------------
# Piped to bash, this script IS stdin, so there is nothing left to read an answer from —
# a prompt here would either hang or silently take the next line of the script as your
# reply. So the destructive half is opt-in on the command line instead: the default run
# cannot delete your docs, and --dry-run shows you everything first.
#
# Options:
#   --dry-run            print every step and change nothing
#   --delete-workspace   also delete your docs, your memory and the backups
#   --prefix <dir>       look for Slate.app somewhere other than /Applications
#   --keep-connections   leave Slate's entries in your AI tools alone

set -euo pipefail

# ── Output ─────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; DIM='\033[2m'; BOLD='\033[1m'; RESET='\033[0m'
ok()   { echo -e "${GREEN}✓${RESET} $*"; }
info() { echo -e "${BOLD}→${RESET} $*"; }
warn() { echo -e "${YELLOW}!${RESET} $*"; }
dim()  { echo -e "${DIM}$*${RESET}"; }
die()  { echo -e "${RED}✗${RESET} $*" >&2; exit 1; }

DRY_RUN=false
DELETE_WORKSPACE=false
KEEP_CONNECTIONS=false
PREFIX="/Applications"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)          DRY_RUN=true; shift ;;
    --delete-workspace) DELETE_WORKSPACE=true; shift ;;
    --keep-connections) KEEP_CONNECTIONS=true; shift ;;
    --prefix)           PREFIX="${2:-}"; [[ -n "$PREFIX" ]] || die "--prefix needs a value"; shift 2 ;;
    -h|--help)          sed -n '2,47p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) die "unknown option: $1" ;;
  esac
done

echo ""
echo -e "${BOLD}Slate — uninstaller${RESET}"
echo "─────────────────────────────────────"
if $DRY_RUN; then dim "  DRY RUN — nothing will be changed."; echo ""; fi

# SLATE_UNINSTALL_TEST (below) lets the test run the script on any machine.
[[ "$(uname -s)" == "Darwin" || -n "${SLATE_UNINSTALL_TEST:-}" ]] || die "Slate's uninstaller is macOS-only."

APP="$PREFIX/Slate.app"

# ── The bundle identifier, read from the bundle itself ─────────────────────────
# Asked of the app rather than written down for the paths below, so the two cannot drift: it is
# the identifier Slate resolves its data directory from. But the bundle at $PREFIX/Slate.app
# is only a name; another product can sit there. Every path below is built from the id, so an
# id that is not Slate's is refused before anything is quit or removed, and so is a bundle whose
# id cannot be read: a failed read says nothing about whose bundle it is. Slate has only ever
# shipped as app.slate.workspace. The fallback is only reached when the bundle is already gone,
# which is also the one case where nothing can be verified anyway.
SLATE_BUNDLE_ID="app.slate.workspace"
PLIST_BUDDY="${SLATE_PLISTBUDDY:-/usr/libexec/PlistBuddy}"
BUNDLE_ID="$SLATE_BUNDLE_ID"
if [[ -e "$APP" ]]; then
  FOUND="$("$PLIST_BUDDY" -c 'Print :CFBundleIdentifier' "$APP/Contents/Info.plist" 2>/dev/null || true)"
  if [[ -z "$FOUND" ]]; then
    die "Could not read the bundle id of $APP, so it may not be Slate.
   Nothing was removed. If it is Slate, move it to the Trash yourself and run this again."
  fi
  if [[ "$FOUND" != "$SLATE_BUNDLE_ID" ]]; then
    die "$APP is not Slate: its bundle id is $FOUND, not $SLATE_BUNDLE_ID.
   Nothing was removed. If it is Slate, pass --prefix with the folder that holds it."
  fi
fi

SUPPORT="$HOME/Library/Application Support/$BUNDLE_ID"
LOGS="$HOME/Library/Logs/$BUNDLE_ID"
CACHES="$HOME/Library/Caches/$BUNDLE_ID"
WEBKIT="$HOME/Library/WebKit/$BUNDLE_ID"
# The "Start Slate at login" item: the app's autostart plugin writes <product name>.plist here.
# SLATE_UNINSTALL_TEST=1 is the test hook: the script then touches nothing outside the folders
# it is pointed at. It never looks for a running Slate, never asks one to quit and never calls
# launchctl, so a test cannot stop the live app on the machine that runs it.
TEST_HOOK="${SLATE_UNINSTALL_TEST:-}"
# The folder is overridable so a test never touches the real one.
LAUNCH_AGENTS="${SLATE_LAUNCH_AGENTS_DIR:-$HOME/Library/LaunchAgents}"
# Under sudo, the login item belongs to the person who ran sudo, not to root.
GUI_UID="${SUDO_UID:-$(id -u)}"
LOGIN_ITEM="$LAUNCH_AGENTS/Slate.plist"

# `du` on a path that does not exist is an error, not a zero.
size_of() { [[ -e "$1" ]] && du -sh "$1" 2>/dev/null | awk '{print $1}' || echo "—"; }

# ── 1. Say what is about to happen ─────────────────────────────────────────────
echo "  Slate.app          $(size_of "$APP")   $APP"
if [[ -e "$LOGIN_ITEM" ]]; then echo "  Login item         $LOGIN_ITEM"; fi
echo "  Logs               $(size_of "$LOGS")"
echo "  Cache              $(size_of "$CACHES")"
echo "  Webview state      $(size_of "$WEBKIT")"
if $DELETE_WORKSPACE; then
  echo -e "  ${RED}Workspace${RESET}          $(size_of "$SUPPORT")   ${RED}WILL BE DELETED${RESET}"
else
  echo "  Workspace          $(size_of "$SUPPORT")   kept"
fi
echo ""

if [[ ! -e "$APP" && ! -e "$SUPPORT" && ! -e "$LOGIN_ITEM" ]]; then
  ok "Slate is not installed here — nothing to do."
  exit 0
fi

run() { if $DRY_RUN; then dim "    would: $*"; else "$@"; fi; }

# ── 2. Quit a running Slate ────────────────────────────────────────────────────
# The executable is `slate`, lowercase — it takes its name from the Cargo package, not
# from productName. Both spellings are tested for the same reason install-slate.sh tests
# both: `pgrep -x Slate` alone never matched, and the check was silently dead.
slate_running() {
  [[ -z "$TEST_HOOK" ]] || return 1
  pgrep -xq slate 2>/dev/null || pgrep -xq Slate 2>/dev/null
}

if slate_running; then
  info "Quitting Slate…"
  if ! $DRY_RUN; then
    osascript -e 'tell application "Slate" to quit' 2>/dev/null || true
    for _ in 1 2 3 4 5 6 7 8 9 10; do
      slate_running || break
      sleep 0.5
    done
    if slate_running; then warn "Slate is still running — quit it and re-run if anything is left behind."; fi
  else
    dim "    would: quit the running Slate"
  fi
fi

# ── 3. Take Slate out of the AI tools ──────────────────────────────────────────
# From the bundle, because the bundle is what knows how — and AFTER the quit, so the copy
# being uninstalled cannot rewrite the two records this step reads and then deletes.
#
# A failure here is reported and does not stop the rest: leaving the app installed
# because one config file was read-only would be a worse outcome than the entry that
# stayed behind.
CONNECTIONS_LEFT=false
if $KEEP_CONNECTIONS; then
  dim "  Leaving Slate's entries in your AI tools alone (--keep-connections)."
elif [[ ! -x "$APP/Contents/MacOS/slate" ]]; then
  warn "Slate.app is not at $APP, so its entries in your AI tools cannot be removed."
  dim "  They are inert without the app, but to clean them up: reinstall Slate, then"
  dim "  re-run this. Nothing else below needs the app."
  CONNECTIONS_LEFT=true
else
  info "Removing Slate from your AI tools…"
  FLAG="--disconnect-all"
  if $DRY_RUN; then FLAG="--list-connections"; fi
  # Never `die` on this: `set -e` would take the whole uninstall down over one
  # unwritable config and leave the app installed.
  if OUTPUT="$("$APP/Contents/MacOS/slate" "$FLAG" 2>/dev/null)"; then
    if [[ -n "$OUTPUT" ]]; then echo "$OUTPUT" | sed 's/^/    /'; fi
    ok "AI tools cleaned up"
  else
    if [[ -n "${OUTPUT:-}" ]]; then echo "$OUTPUT" | sed 's/^/    /'; fi
    warn "Some entries could not be removed — listed above. The rest of the uninstall continues."
    CONNECTIONS_LEFT=true
  fi
fi

# ── 3b. The login item macOS holds for the app ────────────────────────────────
# Start Slate at login is registered through SMAppService, from a plist inside the bundle, so
# only the bundle can take it back out, and it must, before the bundle goes: otherwise System
# Settings → Login Items keeps listing a Slate item. Run even with --keep-connections, which
# only spares the AI tools' entries.
if [[ -z "$TEST_HOOK" && -x "$APP/Contents/MacOS/slate" ]]; then
  if $DRY_RUN; then
    dim "    would: take Slate out of System Settings → Login Items"
  elif "$APP/Contents/MacOS/slate" --remove-login-item >/dev/null 2>&1; then
    ok "Removed Slate from Login Items"
  else
    warn "Could not take Slate out of Login Items — remove it in System Settings → General → Login Items."
  fi
fi

# ── 4. The bundle ──────────────────────────────────────────────────────────────
if [[ -e "$APP" ]]; then
  info "Removing ${APP}…"
  [[ -w "$PREFIX" ]] || die "$PREFIX is not writable by $(whoami). Re-run with sudo, or pass --prefix."
  run rm -rf "$APP"
  ok "Removed the app"
fi

# ── 4b. The old login item ─────────────────────────────────────────────────────
# Versions before 0.1.69 wrote Start Slate at login as a file in ~/Library/LaunchAgents. Left
# behind, launchd tries to start the missing app at every login and System Settings keeps
# listing a "Slate" background item. Unloaded first (best effort: it is only loaded after a
# login that ran it), then the file goes.
if [[ -e "$LOGIN_ITEM" ]]; then
  if [[ -z "$TEST_HOOK" ]]; then
    run launchctl bootout "gui/$GUI_UID/Slate" 2>/dev/null || true
  fi
  run rm -f "$LOGIN_ITEM"
  ok "Removed the start-at-login item"
fi

# ── 5. Logs, cache, webview ────────────────────────────────────────────────────
# Not the workspace: these three are all rebuildable, hold nothing the user wrote, and
# leaving them behind is how an uninstall-then-reinstall inherits a broken cache.
for path in "$LOGS" "$CACHES" "$WEBKIT"; do
  [[ -e "$path" ]] || continue
  run rm -rf "$path"
done
ok "Removed logs, cache and webview state"

# ── 6. The workspace ───────────────────────────────────────────────────────────
# Off by default and deliberately hard to do by accident. This directory is the product:
# every doc, the whole memory graph, and the pre-migration backups. Nothing else on the
# machine holds a copy, and no cloud has one — a shared workspace syncs docs, not this
# file. Deleting it is not recoverable.
if $DELETE_WORKSPACE; then
  if [[ -e "$SUPPORT" ]]; then
    warn "Deleting your workspace — $(size_of "$SUPPORT") — from $SUPPORT"
    run rm -rf "$SUPPORT"
    ok "Workspace deleted"
  fi
else
  if [[ -e "$SUPPORT" ]]; then
    ok "Workspace kept at $SUPPORT"
    dim "  It is plain SQLite. workspace.db opens in any SQLite browser, with or without"
    dim "  Slate installed. Reinstalling Slate picks it up exactly where you left off."
    dim "  To delete it too: re-run with --delete-workspace."
  fi
fi

echo ""
if $DRY_RUN; then
  dim "  Nothing was changed. Re-run without --dry-run to do it."
else
  echo -e "${BOLD}Slate has been removed.${RESET}"
  if $CONNECTIONS_LEFT; then dim "  Some AI-tool entries were left behind — see above."; fi
fi
echo ""
