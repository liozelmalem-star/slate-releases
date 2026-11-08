// Setup: installing Slate, signing in, its first-run wizard (Welcome, Agents, Integrations,
// Project), and the Set up Slate card Home keeps for what setup skipped. Screens: setup-*.
const CMD = "curl -fsSL https://liozelmalem-star.github.io/slate-releases/install.sh | bash";

export const setup = {
  id: "setup",
  title: "Setup",
  icon: '<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  steps: [
    {
      screen: "setup-welcome",
      spot: { text: "Welcome to Slate", up: 3 },
      spotOpts: { pad: 4 },
      title: "Install Slate",
      body:
        `<p>Slate runs on a Mac, Apple Silicon or Intel. Open Terminal and run:</p>` +
        `<p><code class="inline" style="white-space:normal;word-break:break-all">${CMD}</code></p>` +
        "<p>It downloads the app, puts it in <strong>Applications</strong> and opens it. Nothing else to install. The first time Slate opens, you sign in once, with Google or GitHub. Your work never leaves your Mac. Then Slate shows this short setup.</p>",
    },
    {
      screen: "setup-welcome",
      spot: { text: "Take the full tour", up: 2 },
      title: "Welcome to Slate",
      body:
        "<p>Slate keeps your docs, notes and captured AI sessions in one file on your Mac. Every agent you connect, out of the 16 Slate supports, reads and writes that same memory.</p>" +
        "<p>The welcome screen flips through what you are about to see. <strong>Take the full tour</strong> opens this guide.</p>",
    },
    {
      screen: "setup-welcome",
      spot: { text: "Continue", exact: true },
      title: "Four short steps",
      body:
        "<p>The dots at the top are the steps: <strong>Welcome</strong>, <strong>Agents</strong>, <strong>Integrations</strong> and <strong>Project</strong>. <strong>Back</strong> goes to the one before, and <strong>Skip setup</strong> leaves from any step. Every account is on Free.</p>" +
        "<p>Everything you choose here can be changed later, in Settings, Connect and Projects.</p>",
      try: "Click <strong>Continue</strong>.",
      click: true,
    },
    {
      screen: "setup-aitool",
      spot: { text: "Connect your agents", up: 1 },
      title: "Connect your agents",
      body:
        "<p>Connecting lets a tool search and write your Slate memory. Slate installs itself into each tool, as a plugin where the tool takes one.</p>" +
        "<p>A tool Slate found on your Mac says <strong>Detected</strong>. <strong>Connect all</strong> turns on every detected tool at once. Ten newer tools read <strong>Beta</strong>: Slate works with them, but nobody has run a session on them yet to check every part.</p>",
    },
    {
      screen: "setup-aitool",
      spot: { css: 'button[aria-label="Connect Claude Code"]' },
      spotOpts: { pad: 8 },
      title: "One switch per tool",
      body:
        "<p>Each switch connects one tool. Setup turns on only what you choose, even for a tool that already has Slate.</p>" +
        "<p>No tool installed yet? <strong>I'll connect one later</strong> lets you carry on, and Connect offers it any time.</p>",
      try: "Turn on <strong>Claude Code</strong>.",
      click: true,
    },
    {
      screen: "setup-aitool-ready",
      spot: { text: "Claude Code", exact: true, up: 2 },
      title: "Connected, and running Slate's AI",
      body:
        "<p><strong>Connected</strong> appears once the tool's config really holds Slate.</p>" +
        "<p>Slate has no API keys and calls no model itself. <strong>Runs Slate's AI</strong> picks the tool its own AI runs on, under your login. Slate checks that its command line is really there; if it is not, it says where to get it.</p>",
      try: "Click <strong>Continue</strong>.",
      click: { text: "Continue", exact: true },
    },
    {
      screen: "setup-integrations",
      spot: { text: "Connect your integrations", up: 1 },
      title: "Connect your integrations",
      body:
        "<p>Integrations bring what is waiting on you into Tasks: GitHub, Linear, Jira, Notion, GitLab and more. Nothing connects until you press <strong>Connect</strong>.</p>" +
        "<p>Nothing here is required. The same list is in Connect, any time.</p>",
      try: "Click <strong>Continue</strong>.",
      click: { text: "Continue", exact: true },
    },
    {
      screen: "setup-project",
      spot: { text: "Choose your projects", up: 1 },
      title: "Choose your projects",
      body:
        "<p>A project is a code folder Slate knows. Slate watches the branch you are on and files what your AI sessions produce under that project, so every tool can find it again.</p>" +
        "<p>The folders your AI sessions already ran in come first. <strong>Or choose another folder</strong> adds any other. Nothing is copied or uploaded: Slate stores the path and reads git metadata.</p>",
    },
    {
      screen: "setup-project",
      spot: { text: "Open Slate", exact: true },
      title: "Open Slate",
      body:
        "<p>More projects can be added any time from the project picker at the top of Projects.</p>" +
        "<p><strong>Open Slate</strong> finishes setup and takes you to Sessions, where every AI session on this Mac shows live. <strong>Skip setup</strong> goes there too.</p>",
      try: "Click <strong>Open Slate</strong>.",
      click: true,
    },
    {
      screen: "setup-home",
      spot: { text: "Set up Slate", up: 3 },
      spotOpts: { pad: 4 },
      title: "Set up Slate, on Home",
      body:
        "<p>Home keeps a <strong>Set up Slate</strong> card for whatever setup skipped: three steps, each ticked from what is really in your workspace, not from clicks. A step you did somewhere else ticks itself.</p>" +
        "<p>The header counts them (<strong>2 of 3 done</strong>). <strong>Skip setup</strong> hides the card for good.</p>",
    },
    {
      screen: "setup-home",
      spot: { text: "Start a session", up: 2 },
      title: "Connect a tool, then start a session",
      body:
        "<p><strong>Connect an agent</strong> ticks once this workspace has one. <strong>Start a session</strong> ticks when Slate has captured a session: run your tool in a project folder, from your own terminal or from Slate's <strong>New session</strong>.</p>",
    },
    {
      screen: "setup-home",
      spot: { text: "Open Memory", exact: true },
      title: "See your first memory",
      body:
        "<p>The last step ticks when a session has saved its first memory: something it decided or learned, kept for every tool. The first open step always carries the blue button.</p>" +
        "<p>When all three are done, the card goes away and does not come back.</p>",
      try: "Next, meet <strong>Sessions</strong>, where every AI session on your Mac shows up live.",
    },
  ],
};
