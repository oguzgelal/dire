import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import App from "./app.js";

const renderer = await createCliRenderer({
	screenMode: "alternate-screen",
	exitOnCtrlC: true,
	consoleMode: "console-overlay",
});

createRoot(renderer).render(<App />);
