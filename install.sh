#!/usr/bin/env bash
# Slate installer — macOS, Apple Silicon.
#
#   curl -fsSL https://liozelmalem-star.github.io/slate-releases/install.sh | bash
#
# Canonical home: github.com/liozelmalem-star/slate-releases (public). Authored in the
# private source repo and copied here by CI on every release, because this script and
# `infra updater manifest` (packages/infra/src/updater) have to agree on the shape of latest.json.
#
# Downloads a prebuilt Slate.app and installs it to /Applications. No Homebrew, no
# Node, no Rust, no compile step — the app bundle already contains everything,
# including the slate-mcp sidecar.
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
# installer. The download must match its published checksum, and the app must carry
# Slate's own code signature (pinned below). Both checks fail closed: no install.
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

# ── The signature every Slate.app must carry ──────────────────────────────────
# The designated requirement of a genuine Slate.app: its bundle identifier, signed by the
# "Slate Self-Signed" certificate with exactly this SHA-1. The private key behind that
# certificate lives only in the owner's Mac keychain, never on GitHub, so a bundle that
# satisfies this was signed on that Mac — whoever controls the release host cannot fake it.
# The release refuses to publish a bundle whose requirement differs from this line
# (packages/infra/src/release/signature.ts), so a new certificate cannot break installs.
SLATE_DESIGNATED_REQUIREMENT='identifier "app.slate.workspace" and certificate leaf = H"b6d21f5a5ec6c4645267e47735de935f53d6b9c3"'

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

# One universal app serves both CPUs; the manifest names it under each Mac key, so a
# release from before Intel builds says plainly that it has none.
case "$(uname -m)" in
  arm64) PLATFORM="darwin-aarch64"; CPU="Apple Silicon" ;;
  x86_64) PLATFORM="darwin-x86_64"; CPU="Intel" ;;
  *) die "Slate runs on Apple Silicon and Intel Macs (this Mac is $(uname -m))." ;;
esac

MACOS_VER="$(sw_vers -productVersion)"
ok "macOS $MACOS_VER on $CPU"

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

# Pull this Mac's platform block, then its url. Kept to grep/sed so the installer has no
# dependency beyond what ships with macOS — no jq, no python.
PLATFORM_BLOCK="$(printf '%s' "$MANIFEST" | tr -d '\n ' | grep -o "\"$PLATFORM\":{[^}]*}" || true)"
[[ -n "$PLATFORM_BLOCK" ]] || die "Release $VERSION has no $PLATFORM build."
TARBALL_URL="$(printf '%s' "$PLATFORM_BLOCK" | grep -o '"url":"[^"]*"' | head -1 | sed 's/.*"\(http[^"]*\)"$/\1/')"
[[ -n "$TARBALL_URL" ]] || die "Release $VERSION has no download URL for $PLATFORM."
# The manifest names the URL, so it could point anywhere. Download only from this repo's
# own release assets.
case "$TARBALL_URL" in
  "${RELEASES_BASE}/download/"*) ;;
  *) die "The manifest points the download outside ${RELEASES_BASE}/download/ — refusing to install.
   $TARBALL_URL" ;;
esac

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
# What is checked, and each check refuses to install when it fails:
#   - the tarball comes from this repo's own release assets (step 2);
#   - its SHA-256 matches SHASUMS256.txt — this catches a truncated or corrupted transfer,
#     but the checksum file shares the tarball's origin, so it proves nothing about who
#     built it;
#   - the unpacked app satisfies SLATE_DESIGNATED_REQUIREMENT (step 5) — this is the
#     authenticity check: only the owner's Mac holds the key that can sign it.
# What is not checked: this script itself is served from that same origin, so a
# compromised origin could serve a script with the checks removed. Read it before piping
# it to bash. Apple notarization would cover that; Slate is not notarized yet.
SHASUMS_URL="${TARBALL_URL%/*}/SHASUMS256.txt"
SHASUMS="$(curl -fsSL "$SHASUMS_URL" 2>/dev/null)" \
  || die "No SHASUMS256.txt published for this release — refusing to install an unverified download.
   $SHASUMS_URL"
ASSET_NAME="${TARBALL_URL##*/}"
EXPECTED="$(printf '%s' "$SHASUMS" | grep -F " $ASSET_NAME" | awk '{print $1}' | head -1 || true)"
[[ -n "$EXPECTED" ]] \
  || die "SHASUMS256.txt has no entry for $ASSET_NAME — refusing to install an unverified download."
ACTUAL="$(shasum -a 256 "$TARBALL" | awk '{print $1}')"
[[ "$ACTUAL" == "$EXPECTED" ]] || die "Checksum mismatch — refusing to install.
   expected $EXPECTED
   actual   $ACTUAL"
ok "Checksum verified"

# ── 5. Unpack ──────────────────────────────────────────────────────────────────
info "Unpacking…"
tar -xzf "$TARBALL" -C "$TMP" || die "Could not unpack the archive."
NEW_APP="$(find "$TMP" -maxdepth 2 -name 'Slate.app' -type d | head -1)"
[[ -n "$NEW_APP" ]] || die "No Slate.app inside the archive."

# Slate's own signature, checked before anything on this Mac changes.
verify_signature() {
  codesign --verify --deep --strict -R="$SLATE_DESIGNATED_REQUIREMENT" "$1" 2>&1
}
SIG_ERR="$(verify_signature "$NEW_APP")" || die "This Slate.app is not signed by Slate — refusing to install.
   $SIG_ERR"
ok "Signature verified"

# ── 6. Quit a running Slate ────────────────────────────────────────────────────
# Replacing the bundle underneath a running app leaves it in a half-updated state where
# the sidecars it spawns no longer match the binary that spawned them.
#
# The executable is `slate`, lowercase — it takes its name from the Cargo package, not
# from productName. `pgrep -x Slate` is case-sensitive, so it never matched and this
# whole block was dead: the installer would overwrite a running app while claiming to
# have checked. Both spellings are tested so a later `mainBinaryName` change cannot
# quietly break it again.
slate_running() { pgrep -xq slate 2>/dev/null || pgrep -xq Slate 2>/dev/null; }

if slate_running; then
  info "Quitting the running Slate…"
  # By app name, which AppleScript resolves through the bundle — unaffected by the
  # executable's spelling.
  osascript -e 'tell application "Slate" to quit' 2>/dev/null || true
  for _ in 1 2 3 4 5 6 7 8 9 10; do
    slate_running || break
    sleep 0.5
  done
  slate_running && warn "Slate is still running — close it and re-run if the install misbehaves."
fi

# ── 7. Install ─────────────────────────────────────────────────────────────────
DEST="$PREFIX/Slate.app"
# Braces are load-bearing: bash reads the ellipsis as part of the identifier, and `set -u`
# then aborts the install on a variable nobody wrote — after the download, before the copy.
info "Installing to ${DEST}…"

if [[ ! -w "$PREFIX" ]]; then
  die "$PREFIX is not writable by $(whoami).
   Re-run with --prefix \"\$HOME/Applications\", or with sudo if you meant to install system-wide."
fi

rm -rf "$DEST"
# ditto rather than cp -R: it preserves extended attributes and resource forks, which a
# plain copy can silently drop from a .app.
ditto "$NEW_APP" "$DEST" || die "Could not copy the app into $PREFIX."

# ── 8. Make sure the installed copy is the one that was verified ───────────────
# The copy is checked again against the same pinned signature. A copy that fails is
# removed, so a bundle that is not Slate's is never left in place to be opened. There is
# no re-signing fallback: signing a bundle here would bless whatever is in it.
if ! SIG_ERR="$(verify_signature "$DEST")"; then
  rm -rf "$DEST"
  die "The installed copy failed the signature check and was removed.
   $SIG_ERR"
fi

# curl does not set com.apple.quarantine, so this is normally a no-op — it matters when
# someone downloads the tarball in a browser and runs the installer against it by hand.
# Removing it skips Gatekeeper, which would otherwise reject an app Apple has not
# notarized. That is acceptable only because the pinned-certificate check above has
# already proved the bundle was signed on the owner's Mac; it stays until Slate is
# notarized.
xattr -dr com.apple.quarantine "$DEST" 2>/dev/null || true

ok "Installed Slate $VERSION"

# ── 9. Done ────────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}Slate $VERSION is installed.${RESET}"
echo ""
dim "  Your workspace is one SQLite file on this Mac. Nothing is uploaded unless you"
dim "  sign in and explicitly share a page."
echo ""
dim "  Slate can register itself as an MCP server with the AI tools it finds — Claude"
dim "  Code, Cursor, Codex, Gemini. It asks first: connect one from the setup screen"
dim "  and it keeps the rest current for you. Nothing outside Slate is touched until"
dim "  you do."
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
