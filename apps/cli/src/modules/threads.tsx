import {
	useNavigation,
	useNavigationFor,
	useThreads,
} from "../store/selectors.js";
import { formatNumber, randomNumber } from "../common/utils.js";
import { useTheme } from "../common/theme.js";
import { Section } from "../components/section.js";
import { SELECTOR } from "../common/consts.js";

export function Threads() {
	const theme = useTheme();
	const threads = useThreads();
	const navigation = useNavigation();
	const navigationThreads = useNavigationFor("threads");

	const isActive = navigation?.activePanel === "threads";

	return (
		<Section flexGrow={1} active={isActive}>
			<box marginBottom={1}>
				<text fg={theme.fg}>
					<strong>#test</strong>
					<span fg={theme.muted}> — {threads.length} threads</span>
				</text>
			</box>
			{threads.length === 0 ? (
				<text fg={theme.muted}>
					<em>No threads in this channel yet.</em>
				</text>
			) : (
				threads.map((thread, index) => {
					const isSelected = index === navigationThreads?.index;
					const voteCount = randomNumber(-10000, 20000);
					const voteCountFormatted = formatNumber(Math.abs(voteCount));
					const replyCount = randomNumber(0, 1000);
					const replyCountFormatted = formatNumber(replyCount);
					let voteColor = "gray";
					let voteSymbol = "\u{2191}";
					if (voteCount > 0) {
						voteColor = theme.upvote;
					} else if (voteCount < 0) {
						voteColor = theme.downvote;
						voteSymbol = "\u{2193}";
					}

					return (
						<box key={thread.id} flexDirection="column" marginBottom={1}>
							{/* row - content */}
							<box
								style={{
									flexDirection: "row",
								}}
							>
								<text fg={isActive ? theme.primary : theme.muted}>
									<strong>{`${SELECTOR} `}</strong>
								</text>
								<text fg={voteColor}>
									{voteSymbol}
									{voteCountFormatted}
								</text>
								<text fg={theme.fg}>
									<strong> · </strong>
								</text>
								<text fg={theme.muted}>{`${replyCountFormatted}`} replies</text>
								<text fg={theme.fg}>
									<strong> · </strong>
								</text>
								<text fg={theme.muted}>1h ago</text>
							</box>

							{/* row - replies */}
							<box paddingLeft={2}>
								<text fg={theme.fg}>{thread.preview}</text>
							</box>
						</box>
					);
				})
			)}
		</Section>
	);
}
