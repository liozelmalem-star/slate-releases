# Licensing and updates

Slate is free for individuals. The **Free** plan is everything Slate does on this Mac, with no card, no time limit and no licence key. **Team** is for sharing a workspace with your team. It is coming and has no price yet.

## Your plan

**Settings → Account** shows your plan as two cards, **Free** and **Team**. Press **Tell me when it's ready** on the Team card and Slate emails you when Team is ready; the button then reads **We'll email you**. An account with early access to Team reads **Early access** and can share workspaces now.

Slate is proprietary software, licensed under the [Terms of use](https://liozelmalem-star.github.io/slate-releases/docs/legal/terms-of-use.md). Your workspace stays yours on every plan: it is a file on your Mac that you can always open and export.

## Updates

Slate checks for a new version 8 seconds after it opens, then every 4 hours while it stays open. A Slate started at login with no window checks after about 10 minutes, then about every 4 hours. What a check sends is in [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md#what-leaves-your-mac).

When a new version exists, Slate downloads it in the background and tells you it is ready. On a Mac it usually downloads only what changed since your version. It installs only if the result is exactly the published release and its signature checks out; otherwise it downloads the whole version.

The update installs **when you next quit**. Slate never restarts itself while you work. To install sooner, press **Restart now**; if Slate hosts sessions, it first says how many a restart ends.

New versions can go out to part of the installed copies first. A version that is stopped after it downloaded is not installed.

**Settings → About** shows your version, a waiting update with its release notes, and **Check now**. A failed check or install says why, with **Try again**.

To stop the automatic check and download, turn off **Automatic updates** in **Automations › Built-in**. **Check now** still works, and a downloaded update waits for **Restart now**.

## If Slate will not start

After three launches in a row fail to finish starting, the next one opens in **safe mode**: *Slate started in safe mode*. It skips the watcher, background automations and everything else that is not needed to fix it, and checks for an update at once. Your workspace file is not touched.

* **Start normally** tries a normal launch again.
* **Open logs** shows the log folder, for a problem report.

## See also

* [Platform and availability](https://liozelmalem-star.github.io/slate-releases/docs/features/platform.md)
* [Privacy and security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
