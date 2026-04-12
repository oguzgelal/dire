import React, { type FC } from "react";
import { Box, BoxProps } from "ink";
import { SectionLabel } from "./section-label.js";
import { theme } from "../common/theme.js";

type SectionProps = BoxProps & {
	children?: React.ReactNode;
	label?: string;
	active?: boolean;
};

export const Section: FC<SectionProps> = ({
	children,
	active,
	label,
	...rest
}) => {
	return (
		<Box
			position="relative"
			flexShrink={0}
			flexDirection="column"
			borderStyle="single"
			borderColor={active ? theme.primary : theme.dim}
			paddingLeft={1}
			{...rest}
		>
			{!!label && <SectionLabel label={label} />}
			{children}
		</Box>
	);
};
