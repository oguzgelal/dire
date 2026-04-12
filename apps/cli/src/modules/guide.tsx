import { GUIDE_WIDTH } from "../common/consts.js"
import { useIsCompact } from "../hooks/useIsCompact.js"
import { Shortcut } from "../components/shortcut.js"
import { Section } from "../components/section.js"

export function Guide() {
	const compact = useIsCompact()

	return (
		<box
			flexShrink={0}
			flexDirection="column"
			width={compact ? "100%" : GUIDE_WIDTH}
			flexGrow={compact ? 1 : 0}
			gap={0}
		>
			{/* options */}
			<Section flexGrow={1} label="Options">
				<box flexDirection="column">
					<Shortcut shortcut="u" description="upvote" />
					<Shortcut shortcut="d" description="downvote" />
					<Shortcut shortcut="r" description="report" />
					<Shortcut shortcut="p" description="pin channel" />
				</box>
			</Section>

			{/* Commands */}
			<Section flexGrow={1} label="Commands">
				<box flexDirection="column">
					<Shortcut shortcut="x" description="next page" />
					<Shortcut shortcut="z" description="previous page" />
					<Shortcut shortcut="s" description="sign in" />
					<Shortcut shortcut="n" description="new post" />
					<Shortcut shortcut="n" description="new channel" />
					<Shortcut shortcut="r" description="refresh" />
				</box>
			</Section>
		</box>
	)
}
