#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import meow from "meow";
import App from "./app.js";

meow(
	`
	Usage
	  $ dire
`,
	{
		importMeta: import.meta,
	}
);

// Enter alternate screen buffer + hide cursor
process.stdout.write("\x1B[?1049h");
process.stdout.write("\x1B[?25l");

const { waitUntilExit } = render(<App />, { exitOnCtrlC: true });

waitUntilExit().then(() => {
	// Restore: show cursor + leave alternate screen
	process.stdout.write("\x1B[?25h");
	process.stdout.write("\x1B[?1049l");
});
