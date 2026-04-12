import React from "react";
import { Box } from "ink";
import { Channels } from "./modules/channels.js";
import { BarBottom } from "./components/bar-bottom.js";
import { BarTop } from "./components/bar-top.js";
import { Threads } from "./modules/threads.js";
// import { useIsCompact } from './hooks/useIsCompact.js';
// import { useDire } from './hooks/store.js';
import { useDimensions } from "./hooks/useDimensions.js";
import { useInputControl } from "./hooks/useInputControl.js";
import { Guide } from "./modules/guide.js";

export default function App() {
	useInputControl();
	// const compact = useIsCompact();
	// const {activePanel} = useDire();
	const { height } = useDimensions();

	// const showSidebar = compact ? activePanel === 'channels' : true;
	// const showThreads = compact ? activePanel === 'threads' : true;

	return (
		// https://github.com/vadimdemedes/ink/issues/450#issuecomment-1836274483
		<>
			{/* <Box height={1} width="100%" /> */}
			<Box flexDirection="column" width="100%" height={height - 1}>
				{/* <BarTop /> */}
				<Box flexDirection="row" width="100%" flexGrow={1}>
					<Channels />
					<Threads />
					<Guide />
				</Box>
				<BarBottom />
			</Box>
		</>
	);
}
