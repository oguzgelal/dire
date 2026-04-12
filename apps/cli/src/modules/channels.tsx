import { CHANNELS_WIDTH, SELECTOR } from "../common/consts.js";
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
							<box
								key={channel.name}
								style={{
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<text fg={active ? theme.primary : theme.dim}>
									<strong>{isSelected ? `${SELECTOR} ` : "  "}</strong>
								</text>
								<text fg={isSelected && active ? theme.primary : undefined}>
									{isSelected && active ? (
										<strong>#{channel.name}</strong>
									) : (
										<>#{channel.name}</>
									)}
								</text>
								{hasUnread && (
									<text fg="green">
										<strong> ({channel.unread})</strong>
									</text>
								)}
							</box>
						);
					},
				}))}
			/>
		</Section>
	);
}
