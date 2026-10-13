// Setup: installing Slate, its first-run wizard (Welcome, AI tool, Connect, Project), and
// the Set up Slate card Home opens with. Screens: setup-*.
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
        `<p>Slate runs on a Mac with Apple Silicon. Open Terminal and run:</p>` +
        `<p><code class="inline" style="white-space:normal;word-break:break-all">${CMD}</code></p>` +
        "<p>It downloads the app, puts it in <strong>Applications</strong> and opens it. Nothing else to install, and no account to make. The first time Slate opens, it shows this short setup.</p>",
    },
    {
      screen: "setup-welcome",
      spot: { text: "Already watching" , up: 2 },
      title: "Welcome to Slate",
      body:
        "<p>Slate keeps your pages, notes and captured AI sessions in one file on your Mac. Claude Code, Codex, Gemini, Cursor and OpenCode all read and write that same memory.</p>" +
        "<p>If one of those tools is already on your Mac, Slate says so here: it is <strong>Already watching</strong> them, and nothing was changed or sent anywhere.</p>",
    },
    {
      screen: "setup-welcome",
      spot: { text: "Continue", exact: true },
      title: "Four short steps, each one skippable",
      body:
        "<p>The dots at the top are the steps: <strong>Welcome</strong>, <strong>AI tool</strong>, <strong>Connect</strong> and <strong>Project</strong>. <strong>Skip</strong> moves on, and the <strong>×</strong> leaves setup.</p>" +
        "<p>Whichever way you leave, setup is marked done and does not come back. Everything here can be changed later in Connect and Projects.</p>",
      try: "Click <strong>Continue</strong>.",
      click: true,
    },
    {
      screen: "setup-aitool",
      spot: { text: "Claude Code", exact: true, within: { text: "Pick your AI tool", up: 2 } },
      title: "Pick your AI tool",
      body:
        "<p>Slate has no API keys and calls no model itself. Its AI runs on a tool you already have installed, under your own login.</p>" +
        "<p>Pick the one you use. Slate checks that its command line is really there and signed in.</p>",
      try: "Click <strong>Claude Code</strong>.",
      click: true,
    },
    {
      screen: "setup-aitool-ready",
      spot: { text: "Ready", exact: true },
      title: "Ready means it answered",
      body:
        "<p><strong>Ready</strong> appears only after Slate asked the tool and got an answer. That tool is now this workspace's AI tool.</p>" +
        "<p>If a tool is missing it says <strong>Not installed</strong> and where to get it. Everything else in Slate still works without one.</p>",
      try: "Click <strong>Continue</strong>.",
      click: { text: "Continue", exact: true },
    },
    {
      screen: "setup-connect",
      spot: { text: "Connect your AI tools", up: 1 },
      title: "Connect your AI tools",
      body:
        "<p>Connecting lets a tool search and write your Slate memory. Slate adds itself to that tool's own settings file as an MCP server, and copies the file aside first.</p>" +
        "<p><strong>Connected</strong> tools are done. <strong>Detected</strong> ones are installed but not connected yet.</p>",
    },
    {
      screen: "setup-connect",
      spot: { text: "Connect all", exact: true },
      title: "Connect them all at once",
      body:
        "<p><strong>Connect all</strong> connects every detected tool in one go. The green note then names the tools that can now reach your workspace.</p>" +
        "<p>You can disconnect any of them later from Connect.</p>",
      try: "Click <strong>Continue</strong>.",
      click: { text: "Continue", exact: true },
    },
    {
      screen: "setup-project",
      spot: { text: "Choose a folder" },
      title: "Add your first project",
      body:
        "<p>A project is a code folder Slate knows. Slate watches the branch you are on and files what your AI sessions produce under that project, so every tool can find it again.</p>" +
        "<p>Nothing is copied or uploaded: Slate stores the path and reads git metadata. This is the one step worth not skipping.</p>",
    },
    {
      screen: "setup-project",
      spot: { text: "Open Slate", exact: true },
      title: "Open Slate",
      body:
        "<p>After you pick a folder, a green box confirms Slate is watching it. More projects can be added any time from the project picker at the top of Projects.</p>" +
        "<p><strong>Open Slate</strong> finishes setup and takes you to Home.</p>",
      try: "Click <strong>Open Slate</strong>.",
      click: true,
    },
    {
      screen: "setup-home",
      spot: { text: "Set up Slate", up: 3 },
      spotOpts: { pad: 4 },
      title: "Set up Slate, on Home",
      body:
        "<p>Home opens with a <strong>Set up Slate</strong> card: three steps, each ticked from what is really in your workspace, not from clicks. A step you did somewhere else ticks itself.</p>" +
        "<p>The header counts them (<strong>2 of 3 done</strong>). <strong>Skip setup</strong> hides the card for good.</p>",
    },
    {
      screen: "setup-home",
      spot: { text: "Start a session", up: 2 },
      title: "Connect a tool, then start a session",
      body:
        "<p><strong>Connect an AI tool</strong> ticks once this workspace has one. <strong>Start a session</strong> ticks when Slate has captured a session: run your tool in a project folder, from your own terminal or from Slate's <strong>New session</strong>.</p>",
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
