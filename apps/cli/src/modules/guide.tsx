import React from "react";
import { Box, Text } from "ink";
import { GUIDE_WIDTH } from "../common/consts.js";
import { useIsCompact } from "../hooks/useIsCompact.js";
import { Shortcut } from "../components/shortcut.js";

export function Guide() {
	const compact = useIsCompact();

	return (
		<Box
			flexShrink={0}
			flexDirection="column"
			width={compact ? "100%" : GUIDE_WIDTH}
			flexGrow={compact ? 1 : 0}
			gap={0}
		>
			{/* options */}
			<Box
				paddingX={1}
				flexGrow={1}
				borderStyle="single"
				flexDirection="column"
			>
				<Box marginBottom={1}>
					<Text bold>Options</Text>
				</Box>

				<Box flexDirection="column">
					<Shortcut shortcut="u" description="upvote" />
					<Shortcut shortcut="d" description="downvote" />
					<Shortcut shortcut="r" description="report" />
					<Shortcut shortcut="p" description="pin channel" />
				</Box>
			</Box>

			{/* Commands */}
			<Box
				paddingX={1}
				flexGrow={1}
				borderStyle="single"
				flexDirection="column"
			>
				<Box marginBottom={1}>
					<Text bold>Commands</Text>
				</Box>

				<Box flexDirection="column">
					<Shortcut shortcut="x" description="next page" />
					<Shortcut shortcut="z" description="previous page" />
					<Shortcut shortcut="s" description="sign in" />
					<Shortcut shortcut="n" description="new post" />
					<Shortcut shortcut="n" description="new channel" />
					<Shortcut shortcut="r" description="refresh" />
				</Box>
			</Box>
		</Box>
	);
}
