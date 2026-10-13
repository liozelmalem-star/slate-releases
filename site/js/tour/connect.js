// Connect: which AI tools this workspace runs, the apps it reads, and what runs on its own.
export const connect = {
  id: "connect",
  title: "Connect",
  place: "Connect",
  icon: '<path d="M12 22v-5"/><path d="M15 8V2"/><path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"/><path d="M9 8V2"/>',
  links: [
    { match: { text: "AI tools", exact: true }, step: 1 },
    { match: { text: "Integrations", exact: true }, step: 7 },
    { match: { text: "Background jobs", exact: true }, step: 10 },
  ],
  steps: [
    {
      screen: "connect",
      spot: { css: "main" },
      spotOpts: { dim: false, pad: -4 },
      title: "How this workspace reaches outside itself",
      body:
        "<p><strong>Connect</strong> is where setup lives after onboarding: which AI tools this workspace runs, which apps it reads your work from, and what Slate does on its own. It sits at the bottom of the rail, beside Trash and Settings.</p>" +
        "<p>It is per workspace. Open it in Personal and it describes Personal.</p>",
    },
    {
      screen: "connect",
      spot: { text: "Claude Code", exact: true, up: 3 },
      title: "Five AI tools, one row each",
      body:
        "<p>Claude Code, Codex, Gemini, Cursor and OpenCode, always in that order. Here Claude Code and Codex are on, and Claude Code is the <strong>default</strong> — the one this workspace reaches for when nothing more specific is named.</p>" +
        "<p>Each row names the profile and model it runs under, and the config file Slate writes for that tool.</p>",
    },
    {
      screen: "connect",
      spot: { css: 'button[aria-label="Connect Gemini"]' },
      spotOpts: { pad: 8 },
      title: "The switch installs Slate into the tool",
      body:
        "<p>Turning a tool on does two things. It installs Slate into that tool, so its sessions are captured and it can read and write your workspace. And it lets this workspace run on it — Home, agents and skills need a tool to run on.</p>" +
        "<p>Turning it off takes Slate back out. A file only Slate changed goes back to exactly what it was.</p>",
    },
    {
      screen: "connect",
      spot: { text: "Claude Code", exact: true },
      click: true,
      title: "Open a tool's row",
      body: "<p>The chevron opens a row to show everything else about that tool in this workspace.</p>",
      try: "Click <strong>Claude Code</strong>.",
    },
    {
      screen: "connect-open",
      spot: { text: "Profile", exact: true, up: 1 },
      title: "Profile and model",
      body:
        "<p>A <strong>Profile</strong> is one login of the tool on this Mac — its config folder, such as <code>~/.claude</code> or <code>~/.claude-work</code>. <strong>Add</strong> names another one, so your work and personal workspaces can sign in differently.</p>" +
        "<p><strong>Model</strong> left on <strong>Its own default</strong> lets the tool pick.</p>",
    },
    {
      screen: "connect-open",
      spot: { text: "Slate records sessions run in Claude Code", up: 1 },
      title: "Capture",
      body:
        "<p><strong>Capture</strong> decides whether Slate records this tool's sessions. Turn it off and the tool stays connected, but its sessions stop landing in Memory and Activity. Other tools are not affected.</p>" +
        "<p>Turning Claude Code on also connects Claude Desktop, when it is on this Mac.</p>",
    },
    {
      screen: "connect-open",
      spot: { text: "Your Claude account", up: 3 },
      title: "The MCP servers it reaches",
      body:
        "<p><strong>MCP servers</strong> lists every server this tool declares under this profile, and how each one stands — <strong>Live</strong>, <strong>Needs sign-in</strong>, and so on. Your Claude account's connectors are one row, since only Claude Code can use them.</p>" +
        "<p>When something is not answering, this is where you look first. <strong>Refresh</strong> re-reads them all.</p>",
    },
    {
      screen: "connect-open",
      spot: { text: "Integrations", exact: true },
      click: true,
      title: "Integrations",
      body: "<p>The apps your work lives in — issue trackers, code review, chat — connect on the next tab.</p>",
      try: "Open <strong>Integrations</strong>.",
    },
    {
      screen: "connect-integrations",
      spot: { text: "GitHub", exact: true, up: 1 },
      title: "Connect an app, see your work in Tasks",
      body:
        "<p>One tile per app. Press <strong>Connect</strong>, approve Slate on the app's own page in your browser, and what you owe there shows up in Tasks. No AI tool is involved. GitHub here is <strong>Connected</strong> and was read a minute ago.</p>" +
        "<p>The sign-in stays on this Mac, so restarts and updates never ask again.</p>",
    },
    {
      screen: "connect-integrations",
      spot: { text: "Review 6" },
      click: true,
      title: "Find the app you need",
      body:
        "<p><strong>Solve</strong>, <strong>Review</strong> and <strong>Reply</strong> narrow the grid to the apps whose work shows in that group of Tasks. <strong>Find an integration</strong> searches by name.</p>",
      try: "Click <strong>Review</strong>.",
    },
    {
      screen: "connect-int-review",
      spot: { text: "Gerrit", exact: true, up: 2 },
      title: "Reviews, and what is coming",
      body:
        "<p>These are the apps that send you code to review. Self-hosted ones such as Gerrit and Gitea connect with a token you paste, kept only on this Mac.</p>" +
        "<p><strong>Coming soon</strong> lists the apps Slate cannot connect yet, each saying why.</p>",
    },
    {
      screen: "connect-int-review",
      spot: { text: "Background jobs", exact: true },
      click: true,
      title: "Background jobs",
      body: "<p>The last tab lists everything Slate does when you are not asking it to.</p>",
      try: "Open <strong>Background jobs</strong>.",
    },
    {
      screen: "connect-jobs",
      spot: { within: { css: "main" }, text: "Scheduled agents", exact: true, up: 3 },
      title: "What runs for this workspace",
      body:
        "<p>Each job has a switch and says what it does. Under <strong>This workspace</strong> are the ones that act on this workspace alone: <strong>Scheduled agents</strong>, <strong>Shared workspace sync</strong>, <strong>Reminders</strong> and more.</p>" +
        "<p>Turn one off and Slate says, in amber, what that costs. The side panel counts how many are <strong>off</strong>.</p>",
    },
    {
      screen: "connect-jobs-mac",
      spot: { text: "Capturing your AI sessions", up: 2 },
      title: "What runs for the whole Mac",
      body:
        "<p><strong>This Mac</strong> holds the jobs there is only one of on this computer, so turning one off turns it off everywhere. <strong>Capturing your AI sessions</strong> says how many projects it watches and when it last captured.</p>" +
        "<p><strong>Automatic updates</strong> downloads a new version in the background and installs it when you next quit.</p>",
    },
    {
      screen: "connect",
      spot: { css: 'button[aria-label="Connect Cursor"]' },
      spotOpts: { pad: 8 },
      title: "Try it: add a second tool",
      body:
        "<p>You use Cursor for front-end work and want its sessions in Memory too. Turn on <strong>Cursor</strong>'s switch, then open its row and make sure it says <strong>Stop capturing</strong> — Cursor's capture is a button rather than a switch.</p>" +
        "<p>Run one Cursor session in a project folder. It shows up in Sessions and Activity, and the skills you keep in Toolkit reach Cursor as well.</p>",
    },
  ],
};
