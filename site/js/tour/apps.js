// Apps: small apps your AI tool builds inside Slate, which read your workspace and act only
// through what you allow. Screens: apps, apps-picker, apps-builder, apps-code, apps-perms
// (app previews are captured into their iframes as srcdoc). The chat history and the
// contract card are drawn with the app's own markup (ChatRows.tsx, ChatAsks.tsx): the demo
// app was published without a chat, so the builder shows only its version row.

const DONE_DOT = '<span aria-hidden="true" class="h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-green-500"></span>';
const step = (text, code, time, extra = "") =>
  `<div class="flex flex-col gap-0.5" data-testid="chat-step"><span class="flex min-w-0 items-center gap-2 text-meta text-slate-600 dark:text-slate-300">${DONE_DOT}<span class="min-w-0 flex-1 truncate">${text}${code ? ` <code class="font-mono text-slate-700 dark:text-slate-200">${code}</code>` : ""}${extra}</span><span class="shrink-0 tabular-nums text-slate-400 dark:text-slate-500">${time}</span></span></div>`;
const added = (n) => `<span class="ml-1.5 font-mono shrink-0 tabular-nums"><span class="text-leaf-green-600 dark:text-leaf-green-400">+${n}</span></span>`;

const HISTORY =
  '<div class="ml-8 self-end whitespace-pre-wrap rounded-lg bg-slate-900/[0.05] px-3 py-2 text-sm text-slate-800 dark:bg-white/[0.06] dark:text-slate-100">Show the pull requests waiting on my review, oldest first, and my own that are still open. Count the review items in Tasks too.</div>' +
  step("Reading the app's files", "", "0.3 s") +
  step("Checking what Slate knows", "", "0.8 s") +
  step("Wrote", "App.tsx", "4.2 s", added(64)) +
  step("Wrote", "slate.json", "1.1 s", added(14)) +
  step("Ran", "yarn tsc --noEmit", "6.8 s", ", no errors") +
  step("Building a new version", "", "1.9 s");

const BTN = "inline-flex select-none items-center justify-center rounded font-medium transition duration-150 ease-snappy gap-1.5 px-2.5 py-1 text-xs";
const perm = (title, detail) =>
  `<li data-testid="contract-permission"><span class="text-meta font-medium text-slate-800 dark:text-slate-100">${title}</span><span class="block text-meta text-slate-500 dark:text-slate-400">${detail}</span></li>`;
const CONTRACT =
  '<div data-tour="contract" class="flex gap-2 px-3 py-2 items-start rounded-lg border border-leaf-amber-500/30 bg-leaf-amber-500/5">' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 text-leaf-amber-600 dark:text-leaf-amber-400" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>' +
  '<div class="min-w-0 flex-1 text-xs text-leaf-amber-700 dark:text-leaf-amber-300"><section aria-label="PR review queue asks" data-testid="chat-contract">' +
  '<span class="mb-1 block text-micro font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">PR review queue asks</span>' +
  '<p class="mb-2 text-sm text-slate-800 dark:text-slate-100">It reads the pages, memories and sessions of its own project. It also asks for:</p>' +
  '<ul class="mb-2 flex flex-col gap-1.5">' +
  perm("Read your GitHub", "Your open pull requests, the ones waiting for your review, and their checks. Read only, as the GitHub account this workspace uses. PR review queue says why: “List the pull requests waiting on you”") +
  perm("Read your Tasks", "Every open item in Tasks, from every connected app. PR review queue says why: “Count review items in Tasks”") +
  "</ul>" +
  `<div class="flex gap-2"><button type="button" class="${BTN} bg-brand-600 text-white shadow-sm hover:bg-brand-500">Allow</button><button type="button" class="${BTN} border border-slate-900/[0.08] bg-white text-slate-700 dark:border-white/[0.07] dark:bg-transparent dark:text-slate-200">Not now</button></div>` +
  "</section></div></div>";

/** The chat's list of rows: the column that holds the version row. */
const chatList = (find) => find({ text: "Version 1", clickable: false })?.closest(".flex.flex-col.gap-3");

function addHistory(root, find) {
  const list = chatList(find);
  if (!list || list.querySelector('[data-testid="chat-step"]')) return;
  list.insertAdjacentHTML("afterbegin", HISTORY);
}

function addContract(root, find) {
  const list = chatList(find);
  if (!list || list.querySelector('[data-tour="contract"]')) return;
  list.insertAdjacentHTML("beforeend", CONTRACT);
}

const ON = "bg-white text-slate-900 dark:text-slate-50 shadow-sm dark:bg-slate-900 dark:text-white";
const OFF = "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200";
function discussMode(root, find) {
  const build = find({ text: "Build", exact: true });
  const discuss = find({ text: "Discuss", exact: true });
  if (!build || !discuss) return;
  for (const c of ON.split(" ")) build.classList.remove(c);
  build.classList.add(...OFF.split(" "));
  for (const c of OFF.split(" ")) discuss.classList.remove(c);
  discuss.classList.add(...ON.split(" "));
  build.setAttribute("aria-pressed", "false");
  discuss.setAttribute("aria-pressed", "true");
  const box = root.querySelector('textarea[aria-label="Ask for a change"]');
  if (box) box.placeholder = "Talk it through — nothing changes until you say Build it";
}

const DESCRIBE = { css: 'textarea[placeholder="Describe an app…"]' };

export const apps = {
  id: "apps",
  title: "Apps",
  place: "Apps",
  icon: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 4v4"/><path d="M2 8h20"/><path d="M6 4v4"/>',
  steps: [
    {
      screen: "apps",
      spot: { text: "What will you build next?", up: 1 },
      title: "Small apps, built by asking",
      body: "<p><strong>Apps</strong> are small tools that run inside Slate: a review queue, a weekly chart of your sessions, a form that files tasks. You describe one, your AI tool writes it, and you change it by asking again.</p><p>An app reads your workspace, acts only through what you allow, and never reaches the internet.</p>",
    },
    {
      screen: "apps",
      spot: DESCRIBE,
      type: [DESCRIBE, "My to-dos due this week, grouped by project, with a button to mark one done"],
      title: "Describe it in your own words",
      body: "<p>Write what the app should show and do, then press the arrow or <kbd>Enter</kbd>. You stay here: a card for the new app appears at once, marked <strong>Building</strong>, then <strong>Ready</strong>.</p><p>The work runs in a session Slate keeps in the background, under your own AI tool and account.</p>",
    },
    {
      screen: "apps-picker",
      spot: { css: ".menu-pop" },
      title: "Pick the tool that builds it",
      body: "<p>The box starts on your workspace's tool (set in <strong>Connect</strong>). Click its name to pick another connected tool.</p><p><strong>Keep it in a folder…</strong> puts the next app in a folder you choose, as a git repository where every version is a commit. Otherwise it lives only in Slate.</p>",
    },
    {
      screen: "apps",
      spot: { text: "PR review queue", within: { css: "main" }, up: 3 },
      click: { text: "PR review queue", within: { css: "main" } },
      title: "Your apps",
      body: "<p>Each card shows the app itself, running small. <strong>PR review queue</strong> lists pull requests waiting on you; <strong>Sessions this week</strong> charts your AI sessions.</p><p>An app you leave unopened for 60 days moves to Trash, with a warning on its card first.</p>",
      try: "Click <strong>PR review queue</strong> to open it.",
    },
    {
      screen: "apps-builder",
      patch: addHistory,
      spot: { text: "Version 1", up: 4 },
      title: "The chat that built it",
      body: "<p>Each app opens as its own builder, with the chat on the left. While your tool works, every step shows as it happens, with how long it took: what it read, what it wrote, the type check.</p><p>Each build leaves a <strong>Version</strong> row. An older one has <strong>Restore</strong>, which brings it back as the newest.</p>",
    },
    {
      screen: "apps-builder",
      patch: (root, find) => {
        addHistory(root, find);
        addContract(root, find);
      },
      spot: { css: '[data-tour="contract"]' },
      click: { text: "Allow", exact: true },
      after: (root) => root.querySelector('[data-tour="contract"]')?.remove(),
      title: "It asks before it does more",
      body: "<p>Reading its project is free. Anything more needs a permission: reading your GitHub or Tasks, changing Tasks, saving memories, writing pages, running agents.</p><p>A new app asks once, on a card that lists each permission and the app's reason. <strong>Allow</strong> grants exactly that. <strong>Not now</strong> means it asks the first time it uses one.</p>",
      try: "Click <strong>Allow</strong>.",
    },
    {
      screen: "apps-builder",
      patch: addHistory,
      spot: { text: "Discuss", exact: true, up: 1 },
      click: { text: "Discuss", exact: true },
      after: discussMode,
      title: "Build, or Discuss first",
      body: "<p>To change the app, type in the box: <em>“make the buttons green”</em>, <em>“add a filter for this week”</em>. In <strong>Build</strong> the tool makes the change and a new version appears.</p><p><strong>Discuss</strong> talks a change through and changes nothing until you say <strong>Build it</strong>.</p>",
      try: "Click <strong>Discuss</strong>.",
    },
    {
      screen: "apps-builder",
      patch: addHistory,
      spot: { text: "Running · v1", up: 2 },
      spotOpts: { pad: 2 },
      title: "Preview: the app, live",
      body: "<p>Preview runs the app and updates as the chat works. The bar on top has <strong>Point at it</strong> (ask about one part), <strong>Reload</strong> and <strong>Full size</strong> (<kbd>Esc</kbd> returns).</p><p>The line underneath says what it can reach: <strong>Reads Personal. No internet.</strong></p>",
    },
    {
      screen: "apps-builder",
      patch: addHistory,
      spot: { text: "Code", exact: true, within: { css: "main" } },
      click: true,
      title: "Preview, Code, Dashboard",
      body: "<p>The bar on top holds the app's name, three views, <strong>Hide chat</strong> and the <strong>⋯</strong> menu (<strong>Move to Trash</strong>). <strong>‹ Apps</strong> brings the list back.</p>",
      try: "Click <strong>Code</strong>.",
    },
    {
      screen: "apps-code",
      patch: addHistory,
      spot: { css: "main .cm-editor" },
      spotOpts: { pad: 0 },
      click: { text: "Dashboard", exact: true },
      title: "Edit the files yourself",
      body: "<p><strong>Code</strong> is the app's folder: a file tree and an editor that completes <code>slate.</code> calls as you type. Press <kbd>⌘S</kbd> to save; Slate type-checks and builds it, and saves nothing if that fails.</p><p><strong>Diff</strong> compares with the version before, and <strong>Blame</strong> shows which version wrote each line.</p>",
      try: "Click <strong>Dashboard</strong>.",
    },
    {
      screen: "apps-perms",
      patch: addHistory,
      spot: { text: "Permissions", exact: true, up: 3 },
      title: "Dashboard: what it reads and may do",
      body: "<p><strong>Data</strong> shows what the app reads and the little it keeps for itself (up to 1 MB, never synced). <strong>Permissions</strong> lists what it asked for; take any of it back with its switch. <strong>The internet</strong>: never.</p><p><strong>Versions</strong> restores an older one; <strong>Usage</strong> counts how often you open it.</p>",
    },
    {
      screen: "apps",
      spot: DESCRIBE,
      title: "Try it",
      body: "<p>Describe a small app you would open every day, for example: <em>“A weekly chart of the memories each AI tool saved, with the five newest under it.”</em> Press <kbd>Enter</kbd> and open its card to watch the chat.</p><p>Then ask for one change in <strong>Build</strong>, and see the new version arrive in Preview.</p>",
    },
  ],
};
