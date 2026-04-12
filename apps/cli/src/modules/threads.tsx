import {
	useNavigation,
	useNavigationFor,
	useThreads,
} from "../store/selectors.js"
import { formatNumber, randomNumber } from "../common/utils.js"
import { theme } from "../common/theme.js"
import { Section } from "../components/section.js"

export function Threads() {
	const threads = useThreads()
	const navigation = useNavigation()
	const navigationThreads = useNavigationFor("threads")

	const isActive = navigation?.activePanel === "threads"

	return (
		<Section flexGrow={1} active={isActive}>
			<box marginBottom={1}>
				<text>
					<strong>#test</strong>
					<span fg={theme.dim}> — {threads.length} threads</span>
				</text>
			</box>
			{threads.length === 0 ? (
				<text fg={theme.dim}>
					<em>No threads in this channel yet.</em>
				</text>
			) : (
				threads.map((thread, index) => {
					const isSelected = index === navigationThreads?.index
					const voteCount = randomNumber(-10000, 20000)
					const voteCountFormatted = formatNumber(Math.abs(voteCount))
					const replyCount = randomNumber(0, 1000)
					const replyCountFormatted = formatNumber(replyCount)
					let voteColor = "gray"
					let voteSymbol = "\u{2191}"
					if (voteCount > 0) {
						voteColor = theme.upvote
					} else if (voteCount < 0) {
						voteColor = theme.downvote
						voteSymbol = "\u{2193}"
					}

					return (
						<box key={thread.id} flexDirection="column" marginBottom={1}>
							{/* row - content */}
							<box>
								<text fg={isActive ? theme.primary : theme.dim}>
									<strong>{isSelected ? "\u{276F} " : "  "}</strong>
								</text>
								<text fg={voteColor}>
									{voteSymbol}
									{voteCountFormatted}
								</text>
								<text>
									<strong> · </strong>
								</text>
								<text fg={theme.dim}>
									{`${replyCountFormatted}`} replies
								</text>
								<text>
									<strong> · </strong>
								</text>
								<text fg={theme.dim}>1h ago</text>
							</box>

							{/* row - replies */}
							<box paddingLeft={2}>
								<text>{thread.preview}</text>
							</box>
						</box>
					)
				})
			)}
		</Section>
	)
}
