import { theme } from "../common/theme.js"

type ShortcutProps = {
	shortcut: string
	description: string
}

export function Shortcut({ shortcut, description }: ShortcutProps) {
	return (
		<text>
			<strong>[{shortcut}]</strong>{" "}
			<span fg={theme.dim}>{description}</span>
		</text>
	)
}

