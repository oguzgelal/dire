import React from "react";
import { Box, Text } from "ink";
import { CHANNELS_WIDTH } from "../common/consts.js";
import { useIsCompact } from "../hooks/useIsCompact.js";
import {
	useChannels,
	useNavigation,
	useNavigationFor,
} from "../store/selectors.js";
import { theme } from "../common/theme.js";

export function Channels() {
	const compact = useIsCompact();
	const channels = useChannels();
	const navigation = useNavigation();
	const navigationChannels = useNavigationFor("channels");

	const active = navigation?.activePanel === "channels";

	return (
		<Box
			flexShrink={0}
			flexDirection="column"
			width={compact ? "100%" : CHANNELS_WIDTH}
			flexGrow={compact ? 1 : 0}
			borderStyle="single"
			borderColor={active ? theme.primary : theme.dim}
			paddingX={1}
		>
			<Box marginBottom={1}>
				<Text bold>Channels</Text>
			</Box>
			{channels.map((channel, index) => {
				const isSelected = index === navigationChannels?.index;
				const hasUnread = channel.unread > 0;

				return (
					<Box key={channel.name}>
						{isSelected ? (
							<Text color={active ? theme.primary : theme.dim} bold>
								{"❯ "}
							</Text>
						) : (
							<Text>{"  "}</Text>
						)}
						<Text
							color={isSelected && active ? theme.primary : undefined}
							bold={isSelected}
						>
							#{channel.name}
						</Text>
						{hasUnread && (
							<Text color="green" bold>
								{" "}
								({channel.unread})
							</Text>
						)}
					</Box>
				);
			})}
		</Box>
	);
}
