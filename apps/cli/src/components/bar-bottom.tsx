import React from "react";
import { Box, Text } from "ink";
import { useIsCompact } from "../hooks/useIsCompact.js";
import { theme } from "../common/theme.js";
import { Shortcut } from "./shortcut.js";

export function BarBottom() {
	const compact = useIsCompact();

	return (
		<Box
			flexShrink={0}
			paddingX={1}
			gap={2}
			alignItems="center"
			justifyContent="center"
		>
			<Box flexGrow={1}>
				<Text color={theme.primary} bold>
					ꘈ DIRE (^o^)丿
				</Text>
			</Box>

			<Box gap={2}>
				{/* navigate */}
				<Shortcut shortcut="↑↓" description="navigate" />

				{/* select */}
				{!compact && (
					<>
						<Shortcut shortcut="←→" description="switch panels" />
						<Shortcut shortcut="enter" description="select" />
					</>
				)}
				{/* quit */}
				<Shortcut shortcut="q" description="quit" />
			</Box>
		</Box>
	);
}
