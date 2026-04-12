import { Channels } from "./modules/channels.js"
import { BarBottom } from "./components/bar-bottom.js"
import { Threads } from "./modules/threads.js"
import { useInputControl } from "./hooks/useInputControl.js"
import { Guide } from "./modules/guide.js"

export default function App() {
	useInputControl()

	return (
		<box flexDirection="column" width="100%" height="100%">
			<box flexDirection="row" width="100%" flexGrow={1}>
				<Channels />
				<Threads />
				<Guide />
			</box>
			<BarBottom />
		</box>
	)
}
