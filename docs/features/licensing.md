# Licensing & Updates

## Licensing

**Free for individuals. Team plans are coming.** The Free plan is everything Slate does on this Mac, with no card, no time limit, no licence key and no trial timer. Team is for shared workspaces. It has no price yet.

**Settings → Account** shows who is signed in and your plan. On the Team card, **Tell me when it's ready** records that you want it, and we email you when it is.

Slate is proprietary software, licensed under the [Terms of Use](https://liozelmalem-star.github.io/slate-releases/docs/legal/terms-of-use.md). Your workspace stays yours on every plan: it is a SQLite file on your machine, and you can always open and export it.

## Auto-updates

Tauri's updater asks Slate's update service (the `update` Edge Function in its Supabase project) first, then the release manifest on **GitHub Releases**. A check sends app version, system, CPU, channel (release or prerelease) and a random install id. Files always come from GitHub Releases.

**Releases roll out in steps.** The service can offer a release to part of the copies first and stop offering a bad one; a stopped version already downloaded is not installed on quit. The install id places your copy in a group ([Privacy](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)). A prerelease build also gets the next prerelease; a release build gets releases only.

Slate checks 8 seconds after opening, then every 4 hours, **downloads in the background** and tells you when ready.

**On a Mac, updates usually download only what changed**: a patch from the previous version, about 5% of the full download (6 MB instead of 126 MB from 0.1.53 to 0.1.54). Slate rebuilds the new version from the patch and a kept copy of the current one (about 50 MB in its cache folder), installing only if the result is exactly the published release and its signature checks out; otherwise it downloads the whole version. If macOS clears the kept copy, the next update is full.

The update installs **when you next quit**, never while you work or by restarting itself. **Restart now** in the notice first says how many CLI sessions are open. Quit and **Restart now** treat sessions alike: a Claude Code session goes to the background (Slate types `/bg` and it keeps running as a background job), a session from another tool is ended, and a session already in the background keeps running.

> **Note:** **About** in Settings shows your version, any waiting update with full release notes, and **Check now**. A failed check or install says why, with **Try again**. Website, Documentation and Source lines open in your browser.

### If Slate won't start

After three launches in a row fail to reach a working window, the next starts in **safe mode**: the server runs, and the rest of the background is skipped (startup repairs, task and automation schedulers, sync, auto-capture, reminders, keep-awake, agent reconnect). One screen checks for an update at once and installs it. It says "No newer version is published yet." when there is none, "Could not check for updates" on failure, and with Automatic updates off keeps showing "Looking for a newer version…". Your workspace file is never touched. **Start normally** retries a normal launch; **Open logs** shows the log folder.

## See also

* [Platform & Availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md)
* [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
