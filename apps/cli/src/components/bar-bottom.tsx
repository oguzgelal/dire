import { useIsCompact } from "../hooks/useIsCompact.js";
import { useTheme } from "../common/theme.js";
import { Shortcut } from "./shortcut.js";

export function BarBottom() {
	const theme = useTheme();
	const compact = useIsCompact();

	return (
		<box
			flexShrink={0}
			paddingX={1}
			gap={2}
			alignItems="center"
			justifyContent="center"
			style={{
				flexDirection: "row",
				marginBottom: 1,
			}}
		>
			<box flexGrow={1}>
				<text fg={theme.primary}>
					<strong>
						{"\u{A608}"} DIRE (^o^){"\u{4E3F}"}
					</strong>
				</text>
			</box>

			<box
				gap={2}
				style={{
					flexDirection: "row",
				}}
			>
				{/* navigate */}
				<Shortcut shortcut={"\u{2191}\u{2193}"} description="navigate" />

				{/* select */}
				{!compact && (
					<>
						<Shortcut
							shortcut={"\u{2190}\u{2192}"}
							description="switch panels"
						/>
						<Shortcut shortcut="enter" description="select" />
					</>
				)}
				{/* quit */}
				<Shortcut shortcut="q" description="quit" />
			</box>
		</box>
	);
}
