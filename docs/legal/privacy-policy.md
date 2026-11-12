# Privacy policy

<!-- Factual update 2026-11-08. Still a template: counsel must review before release. -->

# Privacy Policy

## Contents

- [Your Account](#your-account)
- [What Slate Stores, and Where](#what-slate-stores-and-where)
- [What Leaves Your Device, and When](#what-leaves-your-device-and-when)
- [How Long the Cloud Keeps It](#how-long-the-cloud-keeps-it)
- [No Tracking, No Sale of Data](#no-tracking-no-sale-of-data)
- [Third-Party Model Providers](#third-party-model-providers)
- [Service Providers](#service-providers)
- [Your Control, Export, and Deletion](#your-control-export-and-deletion)
- [Children](#children)
- [Changes to This Policy](#changes-to-this-policy)
- [Contact](#contact)
- [See also](#see-also)

> **Note:** This is a template/placeholder legal document for a product still in development.
> It is not legal advice and does not create a contract. It should be reviewed and
> completed by qualified counsel before any commercial release, and jurisdiction,
> contact, and licensing details filled in.

Slate is a local-first desktop application. It is built so that your workspace lives
on your machine and nothing leaves it without an explicit action on your part. This
policy explains what Slate stores, where it stores it, and the narrow set of cases
where data crosses the boundary of your device.

The short version: you sign in once with Google or GitHub, your account holds your name,
email and plan, your workspace is a file you own, and the only workspace content that
ever reaches a server is what is in a workspace you specifically choose to share.

## Your Account

Slate requires an account. On first launch you sign in with Google or GitHub. Sign-in is
handled by Supabase Auth, in Slate's own Supabase project. The account holds:

- your name, email address and picture link, as supplied by Google or GitHub;
- which of the two providers you signed in with;
- your plan (Free, or Team when it is available);
- if you asked to hear when Team is ready, that you asked and from which screen.

The account holds none of your docs, sessions or memories. The sign-in session is kept
in a permission-restricted file (`cloud-session.json`) in Slate's application-data folder,
never inside a database, so later launches work offline.

When you are online, Slate contacts its Supabase project at each start and whenever the
sign-in token renews. It renews the token, makes sure your account exists, and reads which
workspaces you belong to. Those requests carry your account id and your IP address, and no
workspace content. Supabase Auth also keeps sign-in logs that hold your IP address.

**Invitations.** When you invite someone to a shared workspace, their email address and the
role you chose are stored in our database until they accept or decline. Slate sends no
email: the invitation opens in your own mail app, and you send it.

## What Slate Stores, and Where

Everything you create in Slate — docs, the block-editor content, agent runs, captured
AI sessions, decisions, memories, automations, skills, and settings — is stored
locally in SQLite database files on your device: `workspace.db` for your Personal
workspace, one more file for each shared workspace, and `machine.db` for the settings
that describe this computer.

Slate stores no embeddings and downloads no machine-learning model. Memory is retrieved
by keyword matching computed on your device, re-ordered by word statistics that Slate
fits in memory from your own stored memories and never writes to disk or sends anywhere.

| Item | Location |
|---|---|
| Workspace database | See per-platform paths below |
| Sign-in session | A permission-restricted file (`cloud-session.json`) in Slate's application-data folder, never inside a database |

The workspace database lives at:

```
macOS    ~/Library/Application Support/app.slate.workspace/workspace.db
Linux    $XDG_DATA_HOME/app.slate.workspace/
Windows  %APPDATA%\app.slate.workspace\
```

You can override the location with the `SLATE_DB_PATH` environment variable. The
database uses WAL mode, and Slate takes an automatic backup before running schema
migrations.

Slate holds no provider API keys. Where Slate drives a command-line tool (see below),
that tool holds its own authentication under its own configuration. Your Slate sign-in
session token is written to a permission-restricted
file in Slate's application-data folder rather than inside any database, so exporting your
workspace cannot hand anyone a live credential.

## What Leaves Your Device, and When

Slate's default posture is that nothing leaves the machine. Apart from your sign-in
(above), four standing exceptions run without a click each time. Three of them need your
choice or your opt-in first. The update check runs by default, and you can switch it off.
A problem report you send, requests you start yourself and connections you set up are
described after the four.

1. **Model calls made by your own installed CLIs.** Slate's model providers (called
   "agents") drive command-line tools you have already installed and authenticated —
   the agents you connect (16 supported, see the [docs](https://liozelmalem-star.github.io/slate-releases/docs/features/agent/brains.md)). When you use Home, a
   session, an agent run or an automation, the relevant CLI sends your prompt and context
   to that provider to generate a response, when you ask it to or on a schedule you set.
   A cloud session sends your project's code to the vendor's computer (Claude Code clones
   the project's GitHub remote, or uploads the code if there is none). **On my phone**
   connects a session to claude.ai, and Anthropic keeps that conversation. Slate does not hold a raw provider API key; the CLI makes the request
   under its own account and its own terms. What is sent, and to whom, is governed by
   the provider you chose (see "Third-Party Model Providers" below).

2. **The contents of a shared workspace you create or join.** Slate includes an optional
   team layer. Sharing a workspace needs the Team plan. Every workspace is unshared until you
   choose to share it, and a workspace that has never been shared has no counterpart in our
   database at all — nothing about it is transmitted, and nothing can be.
   Your **Personal** workspace begins unshared. Choosing to share it shows you a count of
   what would be published before you confirm.

   Within a shared workspace, the rows you author are copied to a hosted Postgres database
   (Supabase) where that workspace's members can read them. What is sent is:

   - **Docs** — title, block content, a plain-text rendering of that content for search,
     the document type, and the parent link.
   - **Memories** — the saved sentence, its kind, its subject, its confidence, for a
     lesson the trigger that says when it applies, and the title of the doc it was
     learned against.
   - **Development activity** — commits (the subject line only, never the rest of the commit
     message), branch created / deleted / merged / switched events, and
     a record that an AI session happened (its branch and the time).
   - **Artifacts** — the docs an agent publishes to be looked at: the title, the kind
     (HTML or Markdown), the description, the name of the agent that made it, the doc it
     was made under, and the content of its newest version.
   - **Your identity** — the display name, email address, and avatar supplied by your
     sign-in provider.

   What is **never** sent, from any workspace: your doc metadata (the `properties` bag,
   which is where a project's or a group's folder path is held), the absolute path recorded against a
   commit (the normalised git remote URL is sent in its place), counts of files and lines
   changed, per-file lists of the files you touched or staged, the contents of any AI session
   transcript and the doc a captured AI session is stored as, the reasoning text behind
   a memory, any memory that belongs to no doc, any memory you hid from sessions, any memory
   an app saved, and your application settings. The set of activity types that may be stored
   is enforced by a constraint in the database itself, not only by the application.

   **What we cannot filter is the text itself.** A doc's body and a memory's sentence
   are sent as written. If you typed a filesystem path into a doc, or an agent recorded one
   inside a decision it wrote, that text is transmitted with the rest of the row — Slate does
   not inspect or redact prose. The structured places a path is held are withheld; a path
   written in a sentence is content, and content in a shared workspace is what a shared
   workspace is for.

   Sharing is one-way. Other members can read what you wrote but cannot modify it, and
   nothing another member writes is ever copied over a doc of yours. Moving a doc out of a
   shared workspace withdraws it on the next synchronisation, and **Erase my work** removes
   every row you authored in that workspace for every member — though, as with any
   publication, withdrawal is not retroactive. Access is enforced by database-level row
   security, so a person who is not a member of a workspace cannot read its contents.

3. **The update check.** Slate asks its update service, and the release host if the service
   does not answer, whether a newer version exists. No workspace content is sent. The
   request carries your app version, your operating system and
   processor type, whether you run a prerelease, and a random **install id**. The install
   id is 16 random bytes generated on your machine the first time Slate starts, kept in
   the file `install-id` in Slate's data folder. It is not derived from your hardware, your
   hostname, your account or anything else about you, and it is not the telemetry id
   below. Its only use is to place your copy in a stable group when a new version is
   offered to part of the installed copies first. The update service stores no record of
   it, but the id is part of the request, so it appears, with your IP address, in the request
   logs that the service's host (Supabase) keeps for a short time. Deleting the file makes Slate generate a new id. Before it installs a downloaded
   update, Slate asks the service whether that version was withdrawn, sending only the
   version number. Like any web request, these reveal your IP address and that you run
   Slate. It runs eight seconds after the window opens and every four hours while it stays open, and
   whenever you press "Check now" in Settings → About. When a newer version exists, Slate
   also downloads it from the release host, GitHub Releases, in the background, and installs it when you next
   quit. You can switch the automatic check and download off in Automations › Built-in
   (Automatic updates); the manual check still works.

4. **Opt-in telemetry.** Slate can report anonymous usage counts and crash reports.
   Both are **off** until you turn them on, in Settings → About, and they are separate
   switches. What is sent is a closed list, enforced in code rather than promised here:

   - **Usage counts** — three events only: Slate was opened, a session was captured, a
     memory was recalled. Each carries a random installation id, the app version,
     the operating system name, the time, and, for a captured session or a recall, which AI
     tool it was: one of the 16 agents Slate supports, or other. Nothing else.
   - **Crash reports** — the *type* of error (for example `TypeError`) and where in
     Slate's own code it happened. The error's own text is never sent: it is written
     wherever the failure occurred, so it can quote whatever Slate was working on at the
     time, and no rule about future code could keep that safe. Only the type and the call
     stack travel, and the stack is reduced to its call lines, at most twenty. Each keeps
     its function name, file name and line number. Directories are stripped, and every line
     that is not a call line is dropped, the one that would have carried the message
     included.

   The installation id is 16 random bytes generated on your machine. It is not derived
   from your hardware, your hostname, your account, or anything else about you, and you
   can replace it at any time with the "New id" button beside it. To have counts already
   sent deleted, email that id to the contact below before you press "New id"; otherwise
   they are deleted after 180 days.

   **The id and both consent switches are per machine, not per workspace** — they live
   in `machine.db`, the same file that holds your other app-level settings, never inside
   `workspace.db`. Deleting a workspace database does not touch them: turning both
   switches off, or pressing "New id", is how you reset telemetry. Deleting `machine.db`
   itself removes the id and both switches along with every other machine-level setting.

   No doc content, no session content, no conversation content, and no file paths are
   ever included in either channel.

**A problem report you send.** When you press **Send report** in the report dialog, Slate
sends what you wrote, which screen you were on (which can name a project and a branch), the
text of the error you reported from (if any), your Slate version, your macOS version and
your chip, and, unless you untick it, the last 40 lines of the app log. Every file path in
the error and the log lines is replaced by `~/…` before the dialog shows them. That is the
only cleaning: the log lines and the error text are otherwise sent as written. The dialog
shows every line that is sent before you send it, and you can untick the log. A report
carries no doc, session or conversation content, no account details and no installation id.
It is sent only when you press Send, whether or not telemetry is on, and is stored in
Slate's own Supabase project, readable only by the Slate team. What you wrote, the screen,
the error and the version are then copied to a private GitHub issue, so the team can track
the fix; the log lines stay in Supabase. When you turned crash reports on, a crash's type
and stack may be copied to a private GitHub issue in the same way.

**Requests you start yourself.** When you press a button for it, git and `gh` fetch, pull,
push and open pull requests against your own remote. A widget's GitHub action (approve,
request changes, comment or label) runs only after you confirm the card that names the
account. A live artifact can load a script from cdnjs, jsDelivr or unpkg, and that host
sees the address it asks for.

**Connections you set up yourself.** Tasks reads your integrations, and Slate makes some of
those requests itself. The first two kinds start when you connect the tool, and Disconnect
stops them. For an app you connected with a pasted token, Slate sends read requests with that
token to the address you gave it, and follows no link that leaves that address. For a tool
gateway at a web address, and for an app you connected from Slate, it signs in with the token
that server issued to Slate and sends it only to that server. GitHub is read through your own
`gh` sign-in. A toolkit entry already in an agent's own MCP configuration is asked for its
list of tools at its own address, with the key that configuration already holds, when Tasks
syncs and when you let a widget use one of its tools. What these requests
carry is what the other server needs to answer. None of them sends a doc, a session or a
memory of yours.

Aside from your sign-in, the four exceptions, a problem report you send, the requests you
start and the connections described above, Slate makes no outbound network requests with
your workspace data.

## How Long the Cloud Keeps It

| What | How long |
|---|---|
| Usage counts and crash reports | 180 days, then deleted by a daily job in the database |
| Problem reports | 12 months, then deleted by a daily job in the database. The GitHub issue copy is deleted on request to the contact below |
| Your account: profile, plan, Team interest and sign-in logs | Until you delete your account |
| Invitations | Until they are accepted or declined |
| Shared workspace rows you authored | Until you withdraw or erase them, stop sharing, or delete your account |
| Request logs of the update service and the release host | A short time, set by Supabase and GitHub rather than by Slate |

## No Tracking, No Sale of Data

Slate requires an account (see [Your Account](#your-account)). The account holds who you
are and your plan, and no backend receives your docs, sessions, or files unless you have
shared the workspace they are in.

- There is no behavioral analytics, ad tracking, profiling, or background monitoring.
- Your content is never used to train shared, public, or third-party AI models by
  Slate.
- Your data is never sold, rented, or traded.

The filesystem watcher that captures AI sessions (from the conversation files of the AI
tools you connect) runs locally on your machine and writes only into your
local workspace database.

## Third-Party Model Providers

When you use an agent, the underlying CLI communicates with that provider's service.
Those interactions are governed by the provider's own terms and privacy policy, not by
this document:

- The **Claude Code CLI** communicates with Anthropic under Anthropic's terms.
- The **Codex CLI** communicates with OpenAI under OpenAI's terms.
- The **Cursor CLI** communicates with Cursor under Cursor's terms.
- The **Gemini CLI** communicates with Google under Google's terms.
- The **OpenCode CLI** communicates with whichever provider you configured in it, under
  that provider's terms.
- The **GitHub Copilot CLI** communicates with GitHub under GitHub's terms.
- Every other agent you connect communicates with its own vendor, or the provider you
  configured in it, under that party's terms.

You choose which agent to use, and you authenticate those tools yourself. Similarly,
any external MCP server you connect to Slate operates under its own terms; data you
send to a connected tool is handled by whoever runs that tool.

## Service Providers

These companies process data for Slate:

| Provider | What it does for Slate |
|---|---|
| **Supabase**, hosted on AWS in Singapore | Accounts and sign-in, shared workspace rows, opt-in telemetry, problem reports, invitations and the update service |
| **Amazon Web Services** | Supabase's host |
| **GitHub** | Sign-in (if you choose it), the release downloads, and the private issues that problem reports and crashes are copied to |
| **Google** | Sign-in (if you choose it) |

Your own actions also reach third parties that are not Slate's providers: the vendor of each
agent CLI you use, the script hosts a live artifact loads from (cdnjs, jsDelivr, unpkg), the
integrations you connect, and your own git remotes. Each handles that data under its own
terms and privacy policy.

## Your Control, Export, and Deletion

Because each workspace is a single local file, you are in full control of it.

- **Export** — Settings → Workspaces, then the workspace, then Storage offers a one-click copy of
  that workspace's file (`workspace.db` for Personal). Because it
  is just a SQLite file, your data is portable and readable with standard tools.
- **Open the folder** — the same Storage tab can open Slate's data folder directly.
- **Deletion** — deleting a workspace's database file removes that workspace's local data.
  The uninstall command keeps your workspace files unless you pass `--delete-workspace`;
  with it, the folder `~/Library/Application Support/app.slate.workspace/` goes, with
  `machine.db`, the shared workspaces' files and the sign-in files in it. A Personal
  workspace you moved elsewhere is not in that folder and stays. Uninstalling Slate stops all local processing, including the session watcher and
  any scheduled automations. Without that flag it does not touch the telemetry id or consent
  switches described above — those live in `machine.db`, a separate per-machine file, and
  are reset the way that section describes, not by deleting a workspace.
- **Withdrawing shared content** — moving a doc out of a shared workspace removes it from
  that workspace on the next synchronisation.
- **Stop sharing** — switching sharing off for a workspace stops it publishing anything further
  and withdraws what you have already published there: the rows in our database are blanked,
  and every member's copy drops them on their next synchronisation. The workspace and its
  contents remain on your device. If you switch sharing on again, the next synchronisation
  publishes them again.
- **Erasure** — **Erase my work** on a shared workspace deletes every doc, memory and
  activity record you authored there, for every member. Deleting content locally has the same
  effect on the copies: the next synchronisation withdraws from our database anything your device
  no longer holds. It is offered separately from
  *leaving* a workspace, which removes only your own machine's copy and deletes nothing
  upstream.

- **Account deletion** — Settings → Account → **Delete my account forever** removes your Slate account
  from our database: your sign-in identity, name, email, plan and Team interest, your
  memberships, the content of the rows you authored in shared workspaces (each row is blanked and marked deleted, keeping only its id, your user id and the time, so teammates' devices delete their copies), invitations you sent or that are
  waiting for you, any account only you were in, and the sign-in audit records that hold your
  email and IP address. It signs you out and leaves everything on your device. While you own an
  account that has other members, Slate asks you to transfer it or remove them first. Some
  copies sit outside our database and are not reached by it: request logs kept by our hosting
  providers, copies already on teammates' devices (which drop your rows on their next
  synchronisation, and the content of a workspace deleted forever, for people who were members
  when it was deleted), anonymous usage counts keyed to this installation (deleted after 180 days),
  and problem reports you chose to send, with their issue copies.

Because every person signs in, our database holds a record of your account even if you
never share anything: your profile (name, email and picture link), your account and plan,
and your Team interest, and Supabase Auth keeps sign-in logs with your IP address.
**Delete my account forever** removes them, along with the shared rows you authored. Your
email address cannot be changed in Slate, because it comes from Google or GitHub. Your workspaces' contents are on our servers only
if you shared a workspace or joined one, and those copies are the rows you authored, removed or
blanked when you erase, withdraw or delete your account.

## Children

Slate is a general-purpose productivity tool and is not directed at children. [Insert
minimum-age and children's-data statement appropriate to your jurisdiction before
release.]

## Changes to This Policy

This policy may be updated as Slate moves from a personal tool toward a commercial
release. Material changes will be reflected here, and roadmap items will be described
accurately as they ship.

## Contact

Privacy, security and support: **slate.ai.app@gmail.com**.

## See also

- [Privacy & Security](https://liozelmalem-star.github.io/slate-releases/docs/features/privacy-and-security.md)
- [Licensing & Updates](https://liozelmalem-star.github.io/slate-releases/docs/features/licensing.md)
