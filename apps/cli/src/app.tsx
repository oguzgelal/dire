import { Channels } from "./modules/channels.js";
import { BarBottom } from "./components/bar-bottom.js";
import { Threads } from "./modules/threads.js";
import { useInputControl } from "./hooks/useInputControl.js";
import { Guide } from "./modules/guide.js";
import { useTheme } from "./common/theme.js";
import { OptionsDialog } from "./components/options-dialog.js";

export default function App() {
	useInputControl();
	const theme = useTheme();

	return (
		<box
			position="relative"
			width="100%"
			height="100%"
			flexDirection="column"
			backgroundColor={theme.bg}
		>
			<OptionsDialog
				doClose={() => {}}
				options={[
					{ id: "upvote", label: "Upvote" },
					{ id: "downvote", label: "Downvote" },
					{ id: "comments", label: "Comments" },
					{ id: "open-link", label: "Open link" },
					{ id: "report", label: "Report" },
				]}
			/>
			<box flexDirection="row" width="100%" flexGrow={1}>
				<Channels />
				<Threads />
				<Guide />
			</box>
			<BarBottom />
		</box>
	);
}
