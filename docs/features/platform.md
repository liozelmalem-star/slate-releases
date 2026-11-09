# Platform & Availability

Slate is a native macOS app: Tauri 2, a Rust host and a React 19 webview. Linux and Windows are **early builds**.

**Each Mac CPU has its own app** (Apple Silicon, Intel). An installed universal copy (releases up to 0.1.54) updates to its own CPU's app. Each release also builds a Linux `.deb` and a Windows installer on GitHub's runners, attached only when the build passes. The early builds boot and pass tests but are not used day to day, and the Windows port is unfinished (issue #138).

## Platform support today

| Platform | Can you download it? | Status |
| --- | --- | --- |
| macOS, Apple Silicon | **Yes** — the `curl` installer | Primary platform, smoke-tested |
| macOS, Intel | **Yes** — the `curl` installer | Its own app, built on the release Mac for Intel. Before each release it boots, and its sidecar builds an app, through Rosetta |
| Linux (x86_64, `.deb`) | **Yes** — `Slate_0.1.62_amd64.deb` from [the latest release](https://github.com/liozelmalem-star/slate-releases/releases/latest), then `sudo apt install ./Slate_0.1.62_amd64.deb` | Built, installed and booted on Ubuntu 22.04 before each release |
| Windows 10/11 | **Yes** — `Slate_0.1.62_x64-setup.exe` from [the latest release](https://github.com/liozelmalem-star/slate-releases/releases/latest) | Built and booted on Windows before each release. Not signed with a Windows certificate, so SmartScreen warns on first install |

Slate needs **macOS 13.5 (Ventura) or later** (bundled server: Node 24). `LSMinimumSystemVersion` in `Info.plist` makes an older Mac refuse to open the app rather than show a window with no server.

For Linux, each release's platform build runs the Rust tests on a GitHub Ubuntu 22.04 runner, builds the `.deb`, installs it and waits up to 60 seconds for the app to log that it started. On Linux:

* shortcuts read Ctrl instead of ⌘
* closing the window minimizes it
* the tray icon has a menu (Open Slate, Quit Slate), because a Linux tray reports no clicks
* Slate watches a project and your agents' transcript folders one folder at a time, never inside build output such as `node_modules` or `dist`. It uses at most a quarter of `fs.inotify.max_user_watches`, and no more than 8,192. At the cap it says so once in its log and stops adding folders. Git and the periodic checks still see changes there.

Releases are cut by hand on an Apple Silicon Mac, which also builds the Intel app and signs the Linux `.deb` and the Windows installer with the same updater key.

## How you install it

Run the `curl` command in [Getting Started](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started.md). It downloads the prebuilt app, checks checksum and code signature, and installs to `/Applications`; a missing or wrong checksum, or a signature other than Slate's own certificate, stops it. There is no Homebrew cask, App Store listing or AppImage. A `.deb` or Windows installer comes from the GitHub release when it carries one (the site's README says which).

Each release also carries one `.dmg` per CPU (`Slate_<version>_aarch64.dmg`, `Slate_<version>_x64.dmg`). It is **not** the supported path. Slate is signed with its own self-signed certificate and is not notarized by Apple, and macOS quarantines whatever a browser downloads, so the image opens with "Apple could not verify Slate is free of malware". On macOS 15 and later only System Settings → Privacy & Security clears that. `curl` sets no quarantine flag, which is why the installer is a script.

## How you remove it

Run the `curl` command in [Uninstalling](https://liozelmalem-star.github.io/slate-releases/docs/overview/uninstalling.md): it removes Slate's entries from agents and the app, and keeps your workspace unless you ask otherwise.

## See also

* [Licensing & Updates](https://liozelmalem-star.github.io/slate-releases/docs/features/licensing.md)
* [Uninstalling](https://liozelmalem-star.github.io/slate-releases/docs/overview/uninstalling.md)
* [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
