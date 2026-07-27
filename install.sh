#!/usr/bin/env bash
# Slate installer — macOS, Apple Silicon.
#
#   curl -fsSL https://liozelmalem-star.github.io/slate-releases/install.sh | bash
#
# Canonical home: github.com/liozelmalem-star/slate-releases (public). Authored in the
# private source repo and copied here by CI on every release, because this script and
# scripts/release/make-updater-manifest.mjs have to agree on the shape of latest.json.
#
# Downloads a prebuilt Slate.app and installs it to /Applications. No Homebrew, no
# Node, no Rust, no compile step — the app bundle already contains everything,
# including the slate-mcp and slate-server sidecars.
#
# WHY curl AND NOT A .dmg
# -----------------------
# Slate is not notarized by Apple (no Developer Program enrollment). macOS quarantines
# anything a *browser* downloads, and for an un-notarized app that quarantine turns into
# "Apple could not verify Slate is free of malware", which on macOS 15+ can only be
# cleared by a trip to System Settings → Privacy & Security.
#
# The quarantine attribute is set by the downloading application, not by the network.
# curl does not set it. So an app installed by this script carries no quarantine flag
# and simply opens — without asking anyone to disable a security control.
#
# The tradeoff is honest and worth stating: piping a script to bash means trusting this
# script and the host serving it. Read it first — that is the point of a plain-text
# installer. The checksum step below covers a corrupted or swapped tarball, but both the
# script and the tarball come from the same origin, so it is integrity, not third-party
# authenticity. Notarization is what buys authenticity, and that is a later step.
#
# Options:
#   --no-launch          install but don't open Slate
#   --version <v>        install a specific version instead of the latest
#   --prefix <dir>       install somewhere other than /Applications

set -euo pipefail

# ── Where releases live ────────────────────────────────────────────────────────
# A PUBLIC repo holding only build artifacts, so the source repo can stay private.
# `latest.json` is the same manifest the in-app updater reads, so the installer and
# the updater can never disagree about what the current version is.
RELEASES_REPO="${SLATE_RELEASES_REPO:-liozelmalem-star/slate-releases}"
RELEASES_BASE="https://github.com/${RELEASES_REPO}/releases"

# ── Output ─────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; DIM='\033[2m'; BOLD='\033[1m'; RESET='\033[0m'
ok()   { echo -e "${GREEN}✓${RESET} $*"; }
info() { echo -e "${BOLD}→${RESET} $*"; }
warn() { echo -e "${YELLOW}!${RESET} $*"; }
dim()  { echo -e "${DIM}$*${RESET}"; }
die()  { echo -e "${RED}✗${RESET} $*" >&2; exit 1; }

LAUNCH=true
WANT_VERSION=""
PREFIX="/Applications"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-launch) LAUNCH=false; shift ;;
    --version)   WANT_VERSION="${2:-}"; [[ -n "$WANT_VERSION" ]] || die "--version needs a value"; shift 2 ;;
    --prefix)    PREFIX="${2:-}";       [[ -n "$PREFIX" ]]       || die "--prefix needs a value";  shift 2 ;;
    -h|--help)   sed -n '2,30p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) die "unknown option: $1" ;;
  esac
done

echo ""
echo -e "${BOLD}Slate — installer${RESET}"
echo "─────────────────────────────────────"

# ── 1. Platform ────────────────────────────────────────────────────────────────
[[ "$(uname -s)" == "Darwin" ]] || die "Slate's installer is macOS-only right now."

ARCH="$(uname -m)"
if [[ "$ARCH" != "arm64" ]]; then
  die "Slate currently ships Apple Silicon builds only (this Mac is $ARCH).
   An Intel build needs an x86_64 job in release.yml — ask before assuming it exists."
fi

MACOS_VER="$(sw_vers -productVersion)"
ok "macOS $MACOS_VER on Apple Silicon"

# ── 2. Resolve the version to install ──────────────────────────────────────────
# latest.json is emitted by tauri-action alongside the bundles. Shape:
#   {"version":"0.1.1","notes":"…","platforms":{"darwin-aarch64":{"signature":"…","url":"…"}}}
if [[ -n "$WANT_VERSION" ]]; then
  MANIFEST_URL="${RELEASES_BASE}/download/v${WANT_VERSION#v}/latest.json"
else
  MANIFEST_URL="${RELEASES_BASE}/latest/download/latest.json"
fi

info "Checking for the latest release…"
MANIFEST="$(curl -fsSL "$MANIFEST_URL" 2>/dev/null)" || die "Could not reach the release manifest:
   $MANIFEST_URL

   If that URL 404s, the releases repo is private or has no published release yet.
   It must be PUBLIC — the in-app updater fetches it anonymously too."

VERSION="$(printf '%s' "$MANIFEST" | grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/')"
[[ -n "$VERSION" ]] || die "The manifest at $MANIFEST_URL has no \"version\" field."

# Pull the darwin-aarch64 block, then its url. Kept to grep/sed so the installer has no
# dependency beyond what ships with macOS — no jq, no python.
PLATFORM_BLOCK="$(printf '%s' "$MANIFEST" | tr -d '\n ' | grep -o '"darwin-aarch64":{[^}]*}' || true)"
[[ -n "$PLATFORM_BLOCK" ]] || die "Release $VERSION has no darwin-aarch64 build."
TARBALL_URL="$(printf '%s' "$PLATFORM_BLOCK" | grep -o '"url":"[^"]*"' | head -1 | sed 's/.*"\(http[^"]*\)"$/\1/')"
[[ -n "$TARBALL_URL" ]] || die "Release $VERSION has no download URL for darwin-aarch64."

ok "Slate $VERSION"

# ── 3. Download ────────────────────────────────────────────────────────────────
TMP="$(mktemp -d -t slate-install)"
trap 'rm -rf "$TMP"' EXIT

TARBALL="$TMP/Slate.app.tar.gz"
info "Downloading…"
curl -fL --progress-bar -o "$TARBALL" "$TARBALL_URL" \
  || die "Download failed: $TARBALL_URL"

BYTES="$(stat -f%z "$TARBALL")"
[[ "$BYTES" -gt 1000000 ]] || die "Downloaded file is only $BYTES bytes — that is not an app bundle."
ok "Downloaded $(( BYTES / 1024 / 1024 )) MB"

# ── 4. Verify ──────────────────────────────────────────────────────────────────
# Guards against a truncated or corrupted transfer. Not a substitute for notarization:
# the checksum file and the tarball share an origin, so a compromised origin defeats it.
SHASUMS_URL="${TARBALL_URL%/*}/SHASUMS256.txt"
if SHASUMS="$(curl -fsSL "$SHASUMS_URL" 2>/dev/null)"; then
  ASSET_NAME="${TARBALL_URL##*/}"
  EXPECTED="$(printf '%s' "$SHASUMS" | grep -F " $ASSET_NAME" | awk '{print $1}' | head -1)"
  if [[ -n "$EXPECTED" ]]; then
    ACTUAL="$(shasum -a 256 "$TARBALL" | awk '{print $1}')"
    [[ "$ACTUAL" == "$EXPECTED" ]] || die "Checksum mismatch — refusing to install.
   expected $EXPECTED
   actual   $ACTUAL"
    ok "Checksum verified"
  else
    warn "SHASUMS256.txt has no entry for $ASSET_NAME — skipping verification."
  fi
else
  warn "No SHASUMS256.txt published for this release — skipping verification."
fi

# ── 5. Unpack ──────────────────────────────────────────────────────────────────
info "Unpacking…"
tar -xzf "$TARBALL" -C "$TMP" || die "Could not unpack the archive."
NEW_APP="$(find "$TMP" -maxdepth 2 -name 'Slate.app' -type d | head -1)"
[[ -n "$NEW_APP" ]] || die "No Slate.app inside the archive."

# ── 6. Quit a running Slate ────────────────────────────────────────────────────
# Replacing the bundle underneath a running app leaves it in a half-updated state where
# the sidecars it spawns no longer match the binary that spawned them.
if pgrep -xq Slate 2>/dev/null; then
  info "Quitting the running Slate…"
  osascript -e 'tell application "Slate" to quit' 2>/dev/null || true
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    pgrep -xq Slate 2>/dev/null || break
    sleep 0.5
  done
  pgrep -xq Slate 2>/dev/null && warn "Slate is still running — close it and re-run if the install misbehaves."
fi

# ── 7. Install ─────────────────────────────────────────────────────────────────
DEST="$PREFIX/Slate.app"
info "Installing to $DEST…"

if [[ ! -w "$PREFIX" ]]; then
  die "$PREFIX is not writable by $(whoami).
   Re-run with --prefix \"\$HOME/Applications\", or with sudo if you meant to install system-wide."
fi

rm -rf "$DEST"
# ditto rather than cp -R: it preserves extended attributes and resource forks, which a
# plain copy can silently drop from a .app.
ditto "$NEW_APP" "$DEST" || die "Could not copy the app into $PREFIX."

# ── 8. Make sure it can actually launch ────────────────────────────────────────
# curl does not set com.apple.quarantine, so this is normally a no-op — it matters when
# someone downloads the tarball in a browser and runs the installer against it by hand.
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

# Apple Silicon refuses to execute a Mach-O with no signature at all. Release builds are
# ad-hoc signed by the linker, but re-signing the assembled bundle is free and removes a
# whole class of "damaged and can't be opened" reports caused by a stale signature over
# freshly copied contents.
if ! codesign --verify --deep "$DEST" 2>/dev/null; then
  info "Ad-hoc signing the bundle…"
  codesign --force --deep --sign - "$DEST" 2>/dev/null \
    || warn "Ad-hoc signing failed. If Slate won't open, install Xcode Command Line Tools: xcode-select --install"
fi

ok "Installed Slate $VERSION"

# ── 9. Done ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}Slate $VERSION is installed.${RESET}"
echo ""
dim "  Your workspace is one SQLite file on this Mac. Nothing is uploaded unless you"
dim "  sign in and explicitly share a page."
echo ""
dim "  On first launch Slate registers itself as an MCP server with the AI tools it"
dim "  finds — Claude Code, Cursor, Codex, Gemini. No config to edit."
echo ""
dim "  Updates arrive in-app: Settings → About → Check for updates."
echo ""

if [[ "$LAUNCH" == true ]]; then
  info "Opening Slate…"
  open -a "$DEST" || warn "Could not open it automatically — launch Slate from $PREFIX."
else
  dim "  Launch it with: open -a Slate"
fi
echo ""
