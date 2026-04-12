import { useTheme } from "../common/theme.js";

type ShortcutProps = {
	shortcut: string;
	description: string;
};

export function Shortcut({ shortcut, description }: ShortcutProps) {
	const theme = useTheme();
	return (
		<text fg={theme.fg}>
			<strong>[{shortcut}]</strong> <span fg={theme.muted}>{description}</span>
		</text>
	);
}
