# Platform and availability

Slate is a native app for macOS 13.5 (Ventura) or later. There is one app for Apple Silicon and one for Intel, and the installer picks the one for your Mac. An older macOS refuses to open the app.

**Linux and Windows are paused.** New releases are for macOS only. Earlier releases that included a Linux `.deb` or a Windows installer stay available on GitHub, but they no longer get updates.

## Platform support today

| Platform | Can you download it? | Status |
| --- | --- | --- |
| macOS, Apple Silicon | **Yes** — the `curl` installer | Primary platform, smoke-tested |
| macOS, Intel | **Yes** — the `curl` installer | Its own app, built on the release Mac for Intel. Before each release it boots, and its sidecar builds an app, through Rosetta |

## Install

Run the `curl` command in [Install and first ten minutes](https://liozelmalem-star.github.io/slate-releases/docs/overview/getting-started.md#install). It downloads the app, checks its checksum and Slate's own signature, and installs it to `/Applications`. There is no Homebrew cask and no App Store listing.

Each release also has a `.dmg` for each chip. It is not the supported way to install. Slate is signed with its own certificate and is not notarized by Apple, so macOS blocks a disk image a browser downloaded, with *Apple could not verify Slate is free of malware*. On macOS 15 and later, only **System Settings → Privacy & Security** lets it open. The `curl` installer avoids this.

## Remove

Run the command in [Uninstalling](https://liozelmalem-star.github.io/slate-releases/docs/overview/uninstalling.md). It takes Slate out of your agents, removes the app and keeps your workspace unless you ask otherwise.

## See also

* [Licensing and updates](https://liozelmalem-star.github.io/slate-releases/docs/features/licensing.md)
* [What Slate costs your machine](https://liozelmalem-star.github.io/slate-releases/docs/features/footprint.md)
