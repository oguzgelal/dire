import { CHANNELS_WIDTH } from "../common/consts.js"
import { useTheme } from "../common/theme.js"

export function BarTop() {
	const theme = useTheme()
	return (
		<box flexShrink={0} width="100%" paddingX={1}>
			{/* logo */}
			<box width={CHANNELS_WIDTH} flexShrink={0}>
				<text fg={theme.primary}>
					<strong>{"\u{A608}"} DIRE (^o^){"\u{4E3F}"}</strong>
				</text>
			</box>

			<box flexGrow={1} />

			{/* profile */}
			<box>
				<text fg={theme.primary}>
					<strong>oguzgelal [0]</strong>
				</text>
			</box>
		</box>
	)
}
