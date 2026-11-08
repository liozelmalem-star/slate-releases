// Settings: what belongs to the app and this computer.
export const settings = {
  id: "settings",
  title: "Settings",
  place: "Settings",
  icon: '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
  links: [
    { match: { text: "Account", exact: true }, step: 1 },
    { match: { text: "Workspaces", exact: true }, step: 3 },
    { match: { text: "Appearance", exact: true }, step: 8 },
    { match: { text: "Terminal", exact: true }, step: 9 },
    { match: { text: "Keyboard", exact: true }, step: 10 },
    { match: { text: "About", exact: true }, step: 11 },
  ],
  steps: [
    {
      screen: "settings-account",
      spot: { css: 'button[aria-label="Settings"]' },
      spotOpts: { pad: 6 },
      title: "The app, and this computer",
      body:
        "<p><strong>Settings</strong> opens from its icon, the sliders at the bottom of the rail. It holds what belongs to the app and this computer: your account, the workspaces this machine holds, how Slate looks, the terminal, shortcuts and the version.</p>" +
        "<p>How a workspace reaches agents and apps is in Connect instead.</p>",
    },
    {
      screen: "settings-account",
      spot: { text: "Continue with GitHub", exact: true },
      title: "Account",
      body:
        "<p>Sign in once. Your work never leaves your Mac. Every person signs in on first launch, with Google or GitHub. The account holds your name, email and plan; your docs, sessions and memory stay on this computer. Signing in also lets you share a whole workspace with the people in it, and read the ones they share with you.</p>" +
        "<p><strong>Continue with GitHub</strong> or <strong>Continue with Google</strong> opens your browser to approve it. Once signed in, you set the display name people see on what you publish.</p>",
    },
    {
      screen: "settings-account",
      spot: { text: "Workspaces", exact: true },
      click: true,
      title: "Workspaces",
      body: "<p>Next: who can see what.</p>",
      try: "Open <strong>Workspaces</strong>.",
    },
    {
      screen: "settings-workspaces",
      spot: { text: "A workspace is an audience", up: 1 },
      title: "A workspace is an audience",
      body:
        "<p>Each workspace is its own file on this computer. Everything inside a <strong>shared</strong> one — docs, decisions, git activity, sessions — is readable by its members. Everything in an unshared one stays on this machine.</p>" +
        "<p>So you never mark docs as private. Work you don't want shared goes in a workspace you haven't shared; to share one project, <strong>Move to…</strong> a shared workspace.</p>",
    },
    {
      screen: "settings-workspaces",
      spot: { text: "On this machine only", up: 2 },
      title: "Personal, and sharing",
      body:
        "<p><strong>Personal</strong> is the workspace every window falls back to. It is not shared until you turn sharing on. <strong>Share</strong> says exactly how much it would publish before you agree; turning it off withdraws what was published, and everything stays on this computer.</p>" +
        "<p>Sharing, and <strong>New workspace</strong> for a team, need you signed in. Until then the button is hidden, and Personal works as it is.</p>",
    },
    {
      screen: "settings-workspaces",
      spot: { text: "On this machine only", up: 2 },
      click: true,
      title: "Open a workspace",
      body: "<p>Click a workspace's row to open its dialog: <strong>General</strong>, <strong>Storage</strong> and, for a shared one, <strong>Members</strong>.</p>",
      try: "Click <strong>Personal</strong>.",
    },
    {
      screen: "settings-manage",
      spot: { css: "[role=dialog]" },
      title: "General: sharing and colour",
      body:
        "<p><strong>General</strong> holds the <strong>Sharing</strong> switch, the same one for every workspace, and its <strong>Colour</strong>, which marks it in your list and the switcher. A workspace you made also has its name here.</p>" +
        "<p>Personal cannot be removed from this machine: it is the workspace every window falls back to.</p>",
      try: "Open <strong>Storage</strong>.",
      click: { text: "Storage", exact: true },
    },
    {
      screen: "settings-storage",
      spot: { css: "[role=dialog]" },
      title: "Storage: one file",
      body:
        "<p><strong>Storage</strong> is the workspace's one SQLite file: <strong>Open</strong> shows it, <strong>Move…</strong> relocates it — to a synced folder, say — and it shows the size and how much space can be reclaimed.</p>" +
        "<p><strong>Export</strong> saves a consistent copy, and <strong>Restore a backup</strong> brings back one Slate took before an upgrade.</p>",
    },
    {
      screen: "settings-appearance",
      spot: { text: "Mint", exact: true, up: 3 },
      title: "Appearance: two themes",
      body:
        "<p><strong>Mint</strong> (the default) is dark; <strong>Forest</strong> is light.</p>" +
        "<p><kbd>⇧⌘L</kbd> flips between light and dark. <kbd>⌘+</kbd> and <kbd>⌘−</kbd> make the whole app bigger or smaller.</p>",
    },
    {
      screen: "settings-terminal",
      spot: { text: "Type", exact: true, up: 1 },
      title: "Terminal",
      body:
        "<p>How the sessions Slate runs look and behave: <strong>Font</strong>, <strong>Size</strong> and <strong>Line height</strong>; the cursor's <strong>Shape</strong> and <strong>Blink</strong>; <strong>Copy on select</strong>; and <strong>Scrollback</strong>, the lines <kbd>⌘F</kbd> can reach.</p>",
    },
    {
      screen: "settings-keyboard",
      spot: { text: "Command palette", exact: true, up: 1 },
      title: "Keyboard",
      body:
        "<p>Every shortcut, in one list. Click a key to record a new one; <kbd>Esc</kbd> cancels. If another command already had that key, it moves here and Slate tells you which one lost it.</p>" +
        "<p><kbd>?</kbd> shows the cheatsheet anywhere in the app.</p>",
    },
    {
      screen: "settings-about",
      spot: { text: "Check for updates", up: 2 },
      title: "About: version and updates",
      body:
        "<p>The version you are running, and <strong>Check now</strong> to look for a newer one. Updates download in the background and install when you quit.</p>" +
        "<p><strong>Logs</strong> opens the app and agent logs — attach the latest file when you report a problem.</p>",
    },
    {
      screen: "settings-about",
      spot: { text: "Help improve Slate", up: 2 },
      title: "Help improve Slate: off by default",
      body:
        "<p>Two switches, both off until you turn one on. <strong>Anonymous usage counts</strong> sends four events — Slate opened, a session captured, a memory used, an app opened — and which agent. <strong>Crash reports</strong> send the error and where in Slate's code it happened.</p>" +
        "<p>Neither ever includes your docs, your conversations or a file path. <strong>New id</strong> replaces the random id they are sent under.</p>",
    },
    {
      screen: "settings-appearance",
      spot: { text: "Forest", exact: true, up: 2 },
      title: "Try it: make Slate yours",
      body:
        "<p>Working in daylight? Pick <strong>Forest</strong>, the light theme. Then open <strong>Keyboard</strong> and give <strong>Go to Memory</strong> a key of its own, so the place you visit most is one press away.</p>",
    },
  ],
};
