import React from "react";
import { Box, Text } from "ink";
import {
	useNavigation,
	useNavigationFor,
	useThreads,
} from "../store/selectors.js";
import { formatNumber, randomNumber } from "../common/utils.js";
import { theme } from "../common/theme.js";

export function Threads() {
	const threads = useThreads();
	const navigation = useNavigation();
	const navigationThreads = useNavigationFor("threads");

	const isActive = navigation?.activePanel === "threads";

	return (
		<Box
			flexDirection="column"
			flexGrow={1}
			borderStyle="single"
			borderColor={isActive ? theme.primary : theme.dim}
			paddingX={1}
		>
			<Box marginBottom={1}>
				<Text bold>#test</Text>
				<Text color={theme.dim}> — {threads.length} threads</Text>
			</Box>
			{threads.length === 0 ? (
				<Text color={theme.dim} italic>
					No threads in this channel yet.
				</Text>
			) : (
				threads.map((thread, index) => {
					const isSelected = index === navigationThreads?.index;
					const voteCount = randomNumber(-10000, 20000);
					const voteCountFormatted = formatNumber(Math.abs(voteCount));
					const replyCount = randomNumber(0, 1000);
					const replyCountFormatted = formatNumber(replyCount);
					let voteColor = "gray";
					let voteSymbol = "↑";
					if (voteCount > 0) {
						voteColor = theme.upvote;
					} else if (voteCount < 0) {
						voteColor = theme.downvote;
						voteSymbol = "↓";
					}

					return (
						<Box key={thread.id} flexDirection="column" marginBottom={1}>
							{/* row - content */}
							<Box>
								<Text bold color={isActive ? theme.primary : theme.dim}>
									{isSelected ? "❯ " : "  "}
								</Text>
								<Text color={voteColor}>
									{voteSymbol}
									{voteCountFormatted}
								</Text>
								<Text bold> · </Text>
								<Text color={theme.dim}>
									{`${replyCountFormatted}`} replies
								</Text>
								<Text bold> · </Text>
								<Text color={theme.dim}>1h ago</Text>
							</Box>

							{/* row - replies */}
							<Box paddingLeft={2}>
								<Text>{thread.preview}</Text>
							</Box>
						</Box>
					);
				})
			)}
		</Box>
	);
}
