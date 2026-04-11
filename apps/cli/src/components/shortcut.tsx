import React, { type FC } from "react";
import { Text } from "ink";
import { theme } from "../common/theme.js";

type ShortcutProps = {
	shortcut: string;
	description: string;
};

export const Shortcut: FC<ShortcutProps> = ({ shortcut, description }) => {
	return (
		<Text>
			<Text bold>[{shortcut}]</Text>{" "}
			<Text color={theme.dim}>{description}</Text>
		</Text>
	);
};
