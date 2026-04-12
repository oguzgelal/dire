import React, { type FC } from "react";
import { Box, Text } from "ink";
import { theme } from "../common/theme.js";

type SectionLabelProps = {
	label: string;
};

export const SectionLabel: FC<SectionLabelProps> = ({ label }) => {
	return (
		<Box alignItems="center" marginTop={-1} marginBottom={1}>
			<Box>
				<Text bold color={theme.primary}>
					{label}
				</Text>
			</Box>
		</Box>
	);
};
