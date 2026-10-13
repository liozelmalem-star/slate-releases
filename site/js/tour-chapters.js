// The tour's chapters, in rail order after setup. Each lives in its own file under
// site/js/tour/ so a place's guide can change without touching the others.
import { setup } from "./tour/setup.js";
import { sessions } from "./tour/sessions.js";
import { home } from "./tour/home.js";
import { tasks } from "./tour/tasks.js";
import { projects } from "./tour/projects.js";
import { memory } from "./tour/memory.js";
import { activity } from "./tour/activity.js";
import { artifacts } from "./tour/artifacts.js";
import { apps } from "./tour/apps.js";
import { agents } from "./tour/agents.js";
import { toolkit } from "./tour/toolkit.js";
import { connect } from "./tour/connect.js";
import { trash } from "./tour/trash.js";
import { settings } from "./tour/settings.js";

export const CHAPTERS = [setup, sessions, home, tasks, projects, memory, activity, artifacts, apps, agents, toolkit, connect, trash, settings];
