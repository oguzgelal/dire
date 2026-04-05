import React from 'react';
import {Box} from 'ink';
import {Sidebar} from './modules/sidebar.js';
import {BarBottom} from './components/bar-bottom.js';
import {BarTop} from './components/bar-top.js';
import {ThreadList} from './components/thread-list.js';
import {useIsCompact} from './hooks/useIsCompact.js';
import {useDimensions} from './hooks/useDimensions.js';
import {useDire} from './hooks/useDire.js';
import {useInputControl} from './hooks/useInputControl.js';

export default function App() {
	useInputControl();
	const compact = useIsCompact();

	const {activePanel} = useDire();
	const {height} = useDimensions();

	const showSidebar = compact ? activePanel === 'sidebar' : true;
	const showThreads = compact ? activePanel === 'threads' : true;

	return (
		<Box flexDirection="column" width="100%" height={height}>
			<BarTop />
			<Box flexDirection="row" width="100%" flexGrow={1}>
				{showSidebar && <Sidebar />}
				{showThreads && <ThreadList />}
			</Box>
			<BarBottom />
		</Box>
	);
}
