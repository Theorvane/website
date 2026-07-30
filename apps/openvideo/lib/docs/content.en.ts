import type { DocPage, LocaleStrings } from "./types";

export const enStrings: LocaleStrings = {
	indexTitle: "OpenVideo documentation",
	indexSummary: "Install OpenVideo from source, learn the workspace and timeline, put the Edit Agent to work, and connect only the model providers you want.",
	indexLede: "OpenVideo runs from source today — there is no packaged installer yet. Everything documented here is behaviour this build actually has; planned work is called out as not yet available.",
	sidebarLabel: "Documentation",
	onThisPage: "On this page",
	previous: "Previous",
	next: "Next",
	backToSite: "open-video.app",
	languageLabel: "Language",
	groups: { start: "Start", editing: "Editing", agent: "Edit Agent", models: "Models and generation", reference: "Reference" },
};

const overview: DocPage = {
	title: "What OpenVideo is",
	summary: "A local-first desktop video editor with an agent that can operate the timeline instead of only advising you.",
	blocks: [
		{ kind: "paragraph", text: "OpenVideo is an open-source Electron application for editing video on your own machine. You open a folder as a project, put clips on a timeline, and export an H.264/AAC MP4 through the FFmpeg already installed on your system." },
		{ kind: "paragraph", text: "What separates it from a conventional editor is the **Edit Agent**: a chat panel docked beside the timeline that calls the same operations the interface does. It can read your timeline, place and trim clips, generate voice or video, and start an export — and it asks for approval before anything that writes to your project." },
		{ kind: "note", tone: "caution", text: "OpenVideo is pre-release. It runs from source; there is no packaged installer and no auto-update. See [Install and run](/docs/install)." },
		{ kind: "heading", text: "What you get" },
		{ kind: "list", items: [
			"A real timeline — video and audio tracks, trim, split, move, duplicate, keyframes, transitions, per-track mix, undo and redo",
			"Local export to H.264/AAC MP4 through your own FFmpeg binary",
			"An agent with a typed tool surface that operates the editor, not a suggestion box",
			"Voice and video generation studios in the same workspace, importing results straight into the open project",
			"Roughly 150 model providers to choose from, or a local Ollama engine and no account at all",
		] },
		{ kind: "heading", text: "What is deliberately absent" },
		{ kind: "paragraph", text: "There is no account, no telemetry, no analytics, and no crash reporting. The app reaches a provider only when you ask it to, using a provider you connected yourself. Read [Data and privacy](/docs/data-and-privacy) for the boundary in detail." },
		{ kind: "heading", text: "Current boundaries" },
		{ kind: "table", head: ["Works today", "Not yet"], rows: [
			["Selected-window capture to local WebM", "Full-screen capture; microphone or system-audio mix in the recorder"],
			["Local projects, media, timeline editing, undo and redo", "Cloud sync, hosted rendering, accounts, auto-update"],
			["Local H.264/AAC MP4 export", "Other export formats; frame-perfect multitrack mastering guarantees"],
			["Agent-driven editing, generation, and export", "Unattended operation — writes always ask for approval"],
			["Google Veo image-to-video via a reference image", "Sora reference images, which need a multipart upload path this build does not send"],
		] },
		{ kind: "paragraph", text: "The Program Monitor is a best-effort review surface. The FFmpeg export is the authoritative output." },
		{ kind: "heading", text: "Where to go next" },
		{ kind: "list", ordered: true, items: [
			"[Install and run](/docs/install) — prerequisites, clone, and first launch",
			"[Projects and folders](/docs/projects) — how a project maps to a folder you choose",
			"[The workspace](/docs/workspace) — a tour of the editing surface",
			"[The Edit Agent](/docs/edit-agent) — what the agent can do and what it asks before doing",
		] },
	],
};

const install: DocPage = {
	title: "Install and run",
	summary: "Prerequisites, cloning the repository, pointing OpenVideo at your FFmpeg, and verifying the build from source.",
	blocks: [
		{ kind: "note", tone: "caution", text: "There is no packaged installer or auto-update yet. OpenVideo runs from source, and this page will say otherwise only when that changes." },
		{ kind: "heading", text: "Prerequisites" },
		{ kind: "list", items: [
			"Node.js 22 or newer and npm 10 or newer",
			"FFmpeg on your machine — required for MP4 export",
			"macOS only: Screen Recording permission for the terminal running OpenVideo, if you use window capture",
		] },
		{ kind: "heading", text: "Clone and run" },
		{ kind: "code", language: "bash", lines: ["git clone https://github.com/Theorvane/openvideo.git", "cd openvideo", "npm install", "npm run dev"] },
		{ kind: "paragraph", text: "`npm run dev` starts the Electron app with the renderer in development mode. The first launch opens the start page, where you pick a folder to open as your first project." },
		{ kind: "heading", text: "Pointing at your FFmpeg" },
		{ kind: "paragraph", text: "OpenVideo drives the FFmpeg **you** installed rather than bundling its own. Either make `ffmpeg` discoverable through an absolute directory on `PATH`, or name the binary explicitly:" },
		{ kind: "code", language: "bash", lines: ["VIDEO_TOOL_FFMPEG_PATH=/absolute/path/to/ffmpeg npm run dev"] },
		{ kind: "note", tone: "info", text: "Relative FFmpeg paths are rejected. Without a usable FFmpeg, OpenVideo reports the problem instead of starting an export it cannot finish." },
		{ kind: "heading", text: "Running the agent with no cloud account" },
		{ kind: "paragraph", text: "A local [Ollama](https://ollama.com) engine needs no key, no account, and no network call:" },
		{ kind: "code", language: "bash", lines: ["ollama pull qwen2.5-coder", "ollama serve"] },
		{ kind: "paragraph", text: "Then choose the local model in the chat panel's model picker. Note that watching footage needs a vision-capable model — see [Providers and models](/docs/providers)." },
		{ kind: "heading", text: "Verify from source" },
		{ kind: "code", language: "bash", lines: ["npm run typecheck", "npm test", "npm run build"] },
		{ kind: "paragraph", text: "`npm run build` compiles the main, preload, and renderer bundles into `out/`. It does not package an installer. Some behaviour can only be checked by hand: operating-system permissions, real provider calls, and final render quality." },
	],
};

const projects: DocPage = {
	title: "Projects and folders",
	summary: "A project is a folder you choose. Media, chat history, and generated results are written inside it.",
	blocks: [
		{ kind: "paragraph", text: "OpenVideo has no project database and no hidden library. You point it at a folder, and that folder is the project. Assets you import are copied into it, agent conversations are stored in it, and finished generations land in it." },
		{ kind: "figure", image: "projects", alt: "The Projects page listing project folders beside grouped Edit Agent chat history", caption: "The start page keeps projects on the left and past Edit Agent conversations on the right. Picking a chat reopens its project and restores the transcript." },
		{ kind: "heading", text: "Opening and removing projects" },
		{ kind: "list", items: [
			"Open a folder from the start page to register it as a project and enter the workspace",
			"Recent projects stay listed so you can return without browsing for the folder again",
			"Removing a project only unregisters it — **the folder you chose is never deleted recursively**",
		] },
		{ kind: "heading", text: "What is written inside a project" },
		{ kind: "table", head: ["Contents", "Notes"], rows: [
			["Imported media", "Copied into the project folder so the timeline does not depend on files elsewhere on disk"],
			["Timeline state", "Saved with the project; undo and redo operate within a session"],
			["Agent conversations", "Stored as a path-free `chats.json`, kept per project as switchable sessions"],
			["Generated results", "Voice and video jobs import into the open project as assets"],
		] },
		{ kind: "note", tone: "info", text: "App-managed projects and window recordings live under Electron user data instead. Move recordings elsewhere with `VIDEO_TOOL_RECORDINGS_DIR=/absolute/path/to/recordings npm run dev`." },
		{ kind: "paragraph", text: "Because a project is an ordinary folder, backing it up, moving it to another machine, or putting it in version control is your decision and needs nothing from OpenVideo." },
	],
};

const workspace: DocPage = {
	title: "The workspace",
	summary: "A tour of the editing surface: media dock, Program Monitor, inspector, timeline, and the docked agent chat.",
	blocks: [
		{ kind: "paragraph", text: "Opening a project lands you in the workspace. One tab strip switches between editing and the two generation studios, and the agent chat stays docked beside all three." },
		{ kind: "figure", image: "editor", alt: "The OpenVideo editing workspace: media bin, program monitor, inspector, timeline, and the Edit Agent chat panel", caption: "The editing surface — project and media dock on the left, Program Monitor and inspector in the middle, timeline along the bottom, Edit Agent on the right." },
		{ kind: "heading", text: "The regions" },
		{ kind: "table", head: ["Region", "What it does"], rows: [
			["Project and media dock", "Lists the project's imported assets and lets you drag them onto tracks"],
			["Program Monitor", "Plays the timeline for review. Best-effort — the FFmpeg export is the authoritative output"],
			["Inspector", "Edits the selected clip: opacity, scale, position, rotation, volume, keyframes, and transitions"],
			["Timeline", "Video and audio tracks, playhead, per-track audio mix"],
			["Edit Agent", "The chat panel that can operate all of the above. See [The Edit Agent](/docs/edit-agent)"],
		] },
		{ kind: "heading", text: "Layout control" },
		{ kind: "paragraph", text: "The left dock and the inspector can each be collapsed to give the timeline more room, and the layout can be reset to its default. All three are bound to keys by default — `⌘1`, `⌘2`, and `⌘0` — and can be remapped in [Settings](/docs/settings)." },
		{ kind: "heading", text: "Switching studios" },
		{ kind: "paragraph", text: "The tab strip moves between the editor, [voice generation](/docs/voice-generation), and [video generation](/docs/video-generation). The agent chat does not reset when you switch, so a conversation can span editing and generation in the same session." },
	],
};

const timeline: DocPage = {
	title: "Timeline editing",
	summary: "Importing media, arranging clips, keyframes and transitions, and the default keyboard shortcuts.",
	blocks: [
		{ kind: "paragraph", text: "The timeline holds video and audio tracks. Import local media into the project, drop it on a track, and arrange it with the mouse or the keyboard." },
		{ kind: "heading", text: "Clip operations" },
		{ kind: "list", items: [
			"Trim, split, move, duplicate, and delete clips",
			"Undo and redo across the editing session",
			"Adjust opacity, scale, position, rotation, and volume in the inspector",
			"Add keyframes for animated properties and transitions between clips",
			"Set a per-track audio mix",
			"Review with the playhead in the Program Monitor",
		] },
		{ kind: "heading", text: "Default shortcuts" },
		{ kind: "paragraph", text: "Shown with the macOS `⌘` modifier; on Windows and Linux this is `Ctrl`. Every binding is remappable in **Settings → Shortcuts**, and conflicting chords are rejected rather than silently overwritten." },
		{ kind: "table", head: ["Action", "Default"], rows: [
			["Play / pause", "`Space`"],
			["Undo", "`⌘Z`"],
			["Redo", "`⇧⌘Z`"],
			["Split", "`S`"],
			["Delete selection", "`Delete` (also `Backspace`)"],
			["Duplicate clip", "`⌘D`"],
			["Select all clips", "`⌘A`"],
			["Clear selection", "`Escape`"],
			["Save timeline", "`⌘S`"],
			["Step back / forward", "`←` / `→`"],
			["Nudge clip earlier / later", "`⌥←` / `⌥→`"],
			["Go to start / end", "`Home` / `End`"],
			["Toggle project dock", "`⌘1`"],
			["Toggle inspector", "`⌘2`"],
			["Reset layout", "`⌘0`"],
		] },
		{ kind: "note", tone: "info", text: "The agent can perform the same clip operations through its tool surface — see [Agent tools](/docs/agent-tools) — so \"trim the second clip to four seconds\" is an alternative to doing it by hand, not a different feature." },
	],
};

const exportPage: DocPage = {
	title: "Exporting",
	summary: "How OpenVideo renders an MP4 through your own FFmpeg, and what it refuses to start.",
	blocks: [
		{ kind: "paragraph", text: "Export produces an H.264/AAC MP4 by driving the FFmpeg binary on your machine. OpenVideo does not bundle its own, does not upload your timeline, and does not render in the cloud." },
		{ kind: "heading", text: "Before you export" },
		{ kind: "list", ordered: true, items: [
			"Make sure `ffmpeg` is discoverable on `PATH` through an absolute directory, or set `VIDEO_TOOL_FFMPEG_PATH` to the binary",
			"Review the timeline in the Program Monitor — it is a preview, not the final render",
			"Start the export from the editor, or ask the agent to start one",
		] },
		{ kind: "note", tone: "caution", text: "Without a usable FFmpeg, OpenVideo reports the problem rather than starting an export it cannot complete. Relative FFmpeg paths are rejected. See [Troubleshooting](/docs/troubleshooting)." },
		{ kind: "heading", text: "What the export is authoritative for" },
		{ kind: "paragraph", text: "The Program Monitor is a best-effort review surface built for speed of iteration. Where the monitor and the exported file differ, the exported file is correct. Frame-perfect multitrack mastering guarantees are explicitly not claimed by this build." },
		{ kind: "heading", text: "Agent-started exports" },
		{ kind: "paragraph", text: "`exportProjectVideo` lets the agent start a local export, and because it writes a file it pauses for your approval first. The render still runs entirely on your machine through the same FFmpeg." },
		{ kind: "heading", text: "Formats" },
		{ kind: "paragraph", text: "H.264/AAC MP4 is the only export target today. Other container and codec choices are not yet available." },
	],
};

const editAgent: DocPage = {
	title: "The Edit Agent",
	summary: "A chat panel that operates the editor through a typed tool surface, and asks approval before it writes.",
	blocks: [
		{ kind: "paragraph", text: "The Edit Agent is not a copilot that writes suggestions for you to apply by hand. It calls the same operations the interface calls, through a typed tool surface in the Electron main process." },
		{ kind: "heading", text: "The approval model" },
		{ kind: "list", items: [
			"**Read-only calls run immediately** — reading the timeline, inspecting assets, sampling frames",
			"**Anything that writes to your project or starts a job pauses for approval** — placing or trimming clips, generation jobs, exports",
			"There is no unattended mode. A conversation cannot silently modify a project while you are away",
		] },
		{ kind: "heading", text: "It can see the footage" },
		{ kind: "paragraph", text: "Ask about a clip and frames are sampled and handed to the model as images with timestamps, so the answer comes from what is actually on screen rather than from a file name. This needs a vision-capable model; a text-only local model will still edit, but cannot watch." },
		{ kind: "heading", text: "Sessions" },
		{ kind: "paragraph", text: "Conversations are kept per project as sessions. Start a new one, switch back to an earlier one, or delete it. History is stored in a path-free `chats.json` inside the project folder, and the start page lists past conversations so picking one reopens its project with the transcript restored." },
		{ kind: "heading", text: "The boundary it works inside" },
		{ kind: "paragraph", text: "The agent reaches your project only through the typed tool surface. It has no shell access, and the renderer never handles filesystem paths, FFmpeg arguments, API keys, or OAuth tokens. See [Agent tools](/docs/agent-tools) for the full list and [Data and privacy](/docs/data-and-privacy) for the boundary." },
		{ kind: "heading", text: "Choosing its model" },
		{ kind: "paragraph", text: "The agent's model comes from **Settings → Edit Agent**, and the chat panel has its own picker. Only providers you have connected offer models — including none but a local Ollama engine. See [Providers and models](/docs/providers)." },
	],
};

const agentTools: DocPage = {
	title: "Agent tools",
	summary: "The typed operations the Edit Agent can call, and which of them ask for approval first.",
	blocks: [
		{ kind: "paragraph", text: "Every capability the agent has is one of these named tools in the main process. Nothing else is reachable from a conversation." },
		{ kind: "table", head: ["The agent can", "Tool", "Approval"], rows: [
			["Read a project timeline and asset metadata", "`getProjectTimeline`", "Runs immediately"],
			["Watch footage as sampled frames it can see", "`watchProjectVideo`", "Runs immediately"],
			["Place a clip on the timeline", "`addClipToTimeline`", "Asks first"],
			["Trim a timeline clip", "`trimTimelineClip`", "Asks first"],
			["Restyle a clip's effects", "`updateClipEffects`", "Asks first"],
			["Generate speech", "`createSpeechJob`", "Asks first"],
			["Generate video", "`createVideoJob`", "Asks first"],
			["Follow a generation job", "`getJobStatus`", "Runs immediately"],
			["Import a finished generation into the project", "`importGeneratedResult`", "Asks first"],
			["Start a local export", "`exportProjectVideo`", "Asks first"],
		] },
		{ kind: "note", tone: "info", text: "The rule is structural rather than a per-tool allowlist: reads go through, and anything that writes to your project or starts a job waits for you." },
		{ kind: "heading", text: "What is not in the list" },
		{ kind: "list", items: [
			"No shell or arbitrary command execution",
			"No filesystem access outside the project the conversation belongs to",
			"No provider credential access — keys stay in main-process safe storage",
			"No network calls except to a provider you connected, for a request you asked for",
		] },
		{ kind: "paragraph", text: "Because the tools are the same operations the interface uses, anything the agent does is something you could have done by hand, and shows up in the timeline the same way." },
	],
};

const providers: DocPage = {
	title: "Providers and models",
	summary: "Connect a local engine, an API key, or a ChatGPT sign-in — and see only the models you actually have.",
	blocks: [
		{ kind: "paragraph", text: "The provider and model registry is generated from a snapshot of the [models.dev](https://models.dev) catalogue — roughly 150 providers and several thousand models — so the picker lists what exists rather than a hand-kept shortlist. Only providers you have connected show their models." },
		{ kind: "heading", text: "Ways to connect" },
		{ kind: "table", head: ["Method", "What it means"], rows: [
			["**Local**", "[Ollama](https://ollama.com) runs models on your machine with no key, no account, and no network call"],
			["**API key**", "Connect a provider in **Settings → Providers**. Only connected providers' models appear in pickers"],
			["**ChatGPT sign-in**", "OpenAI accepts either an API key or a ChatGPT sign-in (PKCE OAuth), for the model set that backend serves"],
		] },
		{ kind: "note", tone: "info", text: "API keys and OAuth tokens are written to Electron `safeStorage` in the main process and never reach the renderer. The interface only learns whether you are connected." },
		{ kind: "heading", text: "Generation providers" },
		{ kind: "table", head: ["Job", "Providers with a real adapter"], rows: [
			["Speech", "ElevenLabs, OpenAI"],
			["Video", "Google Veo, OpenAI Sora"],
		] },
		{ kind: "paragraph", text: "Providers without a real adapter stay listed but honestly unavailable rather than pretending to work. Google Veo supports image-to-video from a reference image; Sora reference images need a multipart upload path this build does not send." },
		{ kind: "heading", text: "Choosing which models appear" },
		{ kind: "paragraph", text: "**Settings → Models** searches the catalogue and controls which models show up in pickers, so a connected provider with hundreds of models does not flood the list. **Settings → Edit Agent** sets the model the agent uses by default." },
		{ kind: "heading", text: "Working with no provider at all" },
		{ kind: "paragraph", text: "Editing, the timeline, and export need no provider. A local Ollama model is enough for the agent, though watching footage needs a vision-capable model. The catalogue is regenerated in the repository with `scripts/generateLlmCatalog.mjs`." },
	],
};

const voiceGeneration: DocPage = {
	title: "Voice generation",
	summary: "Write a script, pick a voice model, and import the result straight into the open project.",
	blocks: [
		{ kind: "paragraph", text: "The voice studio is a tab in the same workspace as the editor, so a generated narration track lands in the project you already have open." },
		{ kind: "figure", image: "voice", alt: "The Voice Generation studio with a voice picker and a script composer", caption: "Pick a voice model, compose the script, generate, and import the finished audio as a project asset." },
		{ kind: "heading", text: "The flow" },
		{ kind: "list", ordered: true, items: [
			"Connect a speech provider — ElevenLabs or OpenAI — in **Settings → Providers**",
			"Choose a voice model in the studio's picker",
			"Write or paste the script",
			"Generate, and follow the job while it runs",
			"Import the result; it becomes an asset in the open project, ready for a timeline track",
		] },
		{ kind: "note", tone: "info", text: "The agent can do the same thing with `createSpeechJob`, `getJobStatus`, and `importGeneratedResult`. Because a job costs money at your provider, it asks for approval first." },
		{ kind: "heading", text: "Where results are written" },
		{ kind: "paragraph", text: "Generated audio is written into the project folder alongside your other assets — see [Projects and folders](/docs/projects). Nothing is uploaded except the script text you asked to be spoken, sent to the provider you connected." },
		{ kind: "heading", text: "Boundaries" },
		{ kind: "paragraph", text: "Voice generation requires a cloud provider; there is no local speech engine in this build. Providers listed without a real adapter stay unavailable rather than failing halfway through a job." },
	],
};

const videoGeneration: DocPage = {
	title: "Video generation",
	summary: "Prompt with a style, aspect ratio, and duration — optionally seeded by a reference image.",
	blocks: [
		{ kind: "paragraph", text: "The video studio sits beside the editor and the voice studio. A finished job imports into the open project as an asset you can drop straight on the timeline." },
		{ kind: "figure", image: "video", alt: "The Video Generation studio with style, aspect ratio, duration, and reference image controls", caption: "Prompt controls for style, aspect ratio, and duration, with an optional reference image for image-to-video." },
		{ kind: "heading", text: "The flow" },
		{ kind: "list", ordered: true, items: [
			"Connect a video provider — Google Veo or OpenAI Sora — in **Settings → Providers**",
			"Write the prompt and set style, aspect ratio, and duration",
			"Optionally pick a reference image to seed image-to-video",
			"Generate, and follow the job while it runs",
			"Import the result into the open project",
		] },
		{ kind: "heading", text: "Reference images" },
		{ kind: "paragraph", text: "Google Veo supports image-to-video from a reference image. Sora reference images are **not** available in this build: they need a multipart upload path it does not send, and the studio says so rather than dropping the image silently." },
		{ kind: "note", tone: "info", text: "A picked reference image crosses the renderer boundary as bytes, never as a filesystem path — the same rule the rest of the app follows. See [Data and privacy](/docs/data-and-privacy)." },
		{ kind: "heading", text: "Cost and approval" },
		{ kind: "paragraph", text: "Your provider bills you directly for generation; OpenVideo never sits between you and them. When the agent starts a job with `createVideoJob` it asks for approval first for the same reason." },
	],
};

const settings: DocPage = {
	title: "Settings",
	summary: "Every settings section, from theme and local tool readiness to providers, shortcuts, and updates.",
	blocks: [
		{ kind: "paragraph", text: "Settings is a page of focused sections rather than a single wall of options." },
		{ kind: "table", head: ["Section", "What it controls"], rows: [
			["Appearance", "Theme mode and command desk presets"],
			["Local Tools", "Local runtime readiness for desktop capture, narration, and final export"],
			["Voice", "Cloud voice generation boundaries and where its models are managed"],
			["Video", "Video model preference and local result import boundaries"],
			["Providers", "Connected providers, and popular providers you can connect"],
			["Models", "Search the catalogue and choose which models appear in pickers"],
			["Edit Agent", "Model preference for the docked agent panel"],
			["Shortcuts", "Timeline editor keyboard shortcut remapping"],
			["Updates", "Installed version and how new releases reach this build"],
			["Data & Privacy", "Local storage, provider authorization, and deletion expectations"],
		] },
		{ kind: "heading", text: "Remapping shortcuts" },
		{ kind: "paragraph", text: "**Settings → Shortcuts** lists every timeline action with its current chord. Assigning a chord already in use is refused with the conflicting action named, and a binding can be returned to its default. See [Timeline editing](/docs/timeline) for the default set." },
		{ kind: "heading", text: "Local tool readiness" },
		{ kind: "paragraph", text: "**Local Tools** reports whether the local runtime pieces export depends on are actually present, so a missing FFmpeg surfaces here instead of at the end of a render. Configure the path with `VIDEO_TOOL_FFMPEG_PATH` — see [Install and run](/docs/install)." },
		{ kind: "heading", text: "Updates" },
		{ kind: "note", tone: "caution", text: "There is no auto-update. **Updates** shows the installed version and explains that new releases reach this build by pulling the repository and rebuilding." },
	],
};

const dataAndPrivacy: DocPage = {
	title: "Data and privacy",
	summary: "Where your footage lives, what crosses the process boundary, and what is never collected.",
	blocks: [
		{ kind: "paragraph", text: "OpenVideo's privacy properties are structural rather than a setting you have to find and switch on." },
		{ kind: "heading", text: "What is never collected" },
		{ kind: "list", items: [
			"**No account.** There is nothing to sign up for",
			"**No telemetry.** No analytics, crash reporting, or usage tracking",
			"**No background network calls.** The app talks to a provider only when you ask it to, using a provider you connected",
		] },
		{ kind: "heading", text: "Where your data lives" },
		{ kind: "paragraph", text: "Projects are folders you choose. Assets, chat history, and generated results are written inside them. App-managed projects and window recordings live under Electron user data, and recordings can be redirected with `VIDEO_TOOL_RECORDINGS_DIR`." },
		{ kind: "heading", text: "The process boundary" },
		{ kind: "paragraph", text: "The renderer talks to the main process through one narrow typed `window.videoTool` bridge. Raw `ipcRenderer`, filesystem paths, FFmpeg arguments, API keys, and OAuth tokens stay outside it. A picked reference image, for example, crosses as bytes and never as a path." },
		{ kind: "table", head: ["Stays in the main process", "Reaches the interface"], rows: [
			["Filesystem paths", "Asset identifiers and metadata"],
			["FFmpeg arguments", "Export progress and result state"],
			["API keys and OAuth tokens", "Whether a provider is connected"],
		] },
		{ kind: "heading", text: "Capture is scoped" },
		{ kind: "paragraph", text: "Window capture grants access to the single source you select, recorded to a local WebM file. Full-screen capture and microphone or system-audio mixing are not in the recorder yet." },
		{ kind: "heading", text: "Removal" },
		{ kind: "paragraph", text: "Removing a project unregisters it from the list — a folder you chose is never deleted recursively. Conversations can be deleted individually. What you delete is gone locally, because there was never a server copy." },
		{ kind: "heading", text: "What providers receive" },
		{ kind: "paragraph", text: "A provider only ever receives what you ask the agent or a studio to send it: prompt text, a script, sampled frames when you ask about footage, or a reference image you picked. Your project folder is not indexed or uploaded." },
	],
};

const troubleshooting: DocPage = {
	title: "Troubleshooting",
	summary: "Export failures, missing FFmpeg, capture permissions, provider errors, and agent limits.",
	blocks: [
		{ kind: "heading", text: "Export refuses to start" },
		{ kind: "paragraph", text: "OpenVideo checks FFmpeg before rendering and reports the problem instead of failing halfway. Confirm the binary is discoverable through an **absolute** directory on `PATH`, or name it explicitly — relative paths are rejected:" },
		{ kind: "code", language: "bash", lines: ["VIDEO_TOOL_FFMPEG_PATH=/absolute/path/to/ffmpeg npm run dev"] },
		{ kind: "paragraph", text: "**Settings → Local Tools** reports local runtime readiness, so check there first." },
		{ kind: "heading", text: "The export does not match the Program Monitor" },
		{ kind: "paragraph", text: "The monitor is a best-effort review surface; the FFmpeg output is authoritative. Frame-perfect multitrack mastering is not a guarantee this build makes — see [Exporting](/docs/export)." },
		{ kind: "heading", text: "Window capture records nothing on macOS" },
		{ kind: "paragraph", text: "macOS requires Screen Recording permission for the terminal running OpenVideo. Grant it in System Settings and restart the app. Full-screen capture, and microphone or system-audio mix in the recorder, are not available yet." },
		{ kind: "heading", text: "No models in the picker" },
		{ kind: "paragraph", text: "Only connected providers show models. Connect one in **Settings → Providers**, then use **Settings → Models** to choose which of its models appear. With nothing connected, run a local Ollama model instead — see [Install and run](/docs/install)." },
		{ kind: "heading", text: "The agent cannot see my footage" },
		{ kind: "paragraph", text: "`watchProjectVideo` hands sampled frames to the model as images, which requires a vision-capable model. A text-only local model can still edit the timeline but cannot answer questions about what is on screen." },
		{ kind: "heading", text: "A generation provider is listed but unavailable" },
		{ kind: "paragraph", text: "Providers without a real adapter stay visible and honestly unavailable rather than pretending to work. Speech runs on ElevenLabs or OpenAI; video on Google Veo or OpenAI Sora. Sora reference images are not supported in this build." },
		{ kind: "heading", text: "The agent stopped and is waiting" },
		{ kind: "paragraph", text: "That is the approval gate, not a hang. Anything that writes to your project or starts a job asks first — see [The Edit Agent](/docs/edit-agent)." },
		{ kind: "heading", text: "Still stuck" },
		{ kind: "paragraph", text: "Reproduce from a clean build with `npm run typecheck`, `npm test`, and `npm run build`, then open an issue at [github.com/Theorvane/openvideo/issues](https://github.com/Theorvane/openvideo/issues) with your platform, Node version, and FFmpeg version." },
	],
};

export const enPages: Readonly<Record<string, DocPage>> = {
	overview,
	install,
	projects,
	workspace,
	timeline,
	export: exportPage,
	"edit-agent": editAgent,
	"agent-tools": agentTools,
	providers,
	"voice-generation": voiceGeneration,
	"video-generation": videoGeneration,
	settings,
	"data-and-privacy": dataAndPrivacy,
	troubleshooting,
};
