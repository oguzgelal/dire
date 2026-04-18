import { RGBA } from "@opentui/core";
import { useTheme } from "../common/theme.js";

type ShortcutProps = {
	shortcut: string;
	description: string;
	shortcutFg?: string | RGBA | undefined;
	descriptionFg?: string | RGBA | undefined;
};

export function Shortcut({
	shortcut,
	shortcutFg,
	description,
	descriptionFg,
}: ShortcutProps) {
	const theme = useTheme();
	return (
		<text fg={shortcutFg || theme.fg}>
			<strong>[{shortcut}]</strong>{" "}
			<span fg={descriptionFg || theme.muted}>{description}</span>
		</text>
	);
}
