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
import { ScrollList } from "../components/scroll-list.js";
import { Section } from "../components/section.js";

export function Channels() {
	const compact = useIsCompact();
	const channels = useChannels();
	const navigation = useNavigation();
	const navigationChannels = useNavigationFor("channels");

	const active = navigation?.activePanel === "channels";

	return (
		<Section
			width={compact ? "100%" : CHANNELS_WIDTH}
			flexGrow={compact ? 1 : 0}
			active={active}
			label="Channels"
		>
			<ScrollList
				active={active}
				selectedItemIndex={navigationChannels?.index}
				items={channels.map((channel, index) => ({
					id: channel.name,
					content: () => {
						const isSelected = index === navigationChannels?.index;
						const hasUnread = channel.unread > 0;

						return (
							<Box key={channel.name}>
								<Text color={active ? theme.primary : theme.dim} bold>
									{isSelected ? "❯ " : "  "}
								</Text>
								<Text
									color={isSelected && active ? theme.primary : undefined}
									bold={isSelected}
									inverse={isSelected && active}
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
					},
				}))}
			/>
		</Section>
	);
}
