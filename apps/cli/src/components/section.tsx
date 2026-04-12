import { type ReactNode } from "react";
import { SectionLabel } from "./section-label.js";
import { useTheme } from "../common/theme.js";

type SectionProps = {
	children?: ReactNode;
	label?: string;
	active?: boolean;
	width?: number | `${number}%` | "auto";
	flexGrow?: number;
	flexShrink?: number;
};

export function Section({
	children,
	active,
	label,
	width,
	flexGrow,
	flexShrink = 0,
}: SectionProps) {
	const theme = useTheme();
	return (
		<box
			position="relative"
			flexShrink={flexShrink}
			flexDirection="column"
			border
			borderStyle="single"
			borderColor={active ? theme.primary : theme.muted}
			paddingLeft={1}
			width={width}
			flexGrow={flexGrow}
		>
			{!!label && <SectionLabel label={label} />}
			{children}
		</box>
	);
}
