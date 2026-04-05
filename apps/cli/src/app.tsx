import React, {useState, useMemo} from 'react';
import {Box, Text, useInput, useApp, useStdout} from 'ink';
import {channels, COMPACT_BREAKPOINT, threads} from './common/consts.js';
import {Sidebar} from './modules/sidebar.js';
import {HelpBar} from './components/help-bar.js';
import {Panel} from './common/types.js';

type ThreadListProps = {
	channelName: string;
	selectedIndex: number;
	active: boolean;
};

function ThreadList({channelName, selectedIndex, active}: ThreadListProps) {
	const filtered = useMemo(
		() => threads.filter(t => t.channel === channelName),
		[channelName],
	);

	return (
		<Box
			flexDirection="column"
			flexGrow={1}
			borderStyle="single"
			borderColor={active ? 'cyan' : 'gray'}
			paddingX={1}
		>
			<Box marginBottom={1}>
				<Text bold color="white">
					#{channelName}
				</Text>
				<Text color="gray"> — {filtered.length} threads</Text>
			</Box>
			{filtered.length === 0 ? (
				<Text color="gray" italic>
					No threads in this channel yet.
				</Text>
			) : (
				filtered.map((thread, index) => {
					const isSelected = index === selectedIndex;

					return (
						<Box key={thread.id} flexDirection="column" marginBottom={1}>
							<Box>
								{isSelected && active ? (
									<Text color="cyan" bold>
										{'❯ '}
									</Text>
								) : (
									<Text>{'  '}</Text>
								)}
								<Text
									bold
									color={isSelected && active ? 'cyan' : 'white'}
									inverse={isSelected && active}
								>
									{thread.author}
								</Text>
								<Text color="gray"> · {thread.time}</Text>
							</Box>
							<Box paddingLeft={2}>
								<Text color={isSelected && active ? 'white' : 'gray'}>
									{thread.preview}
								</Text>
							</Box>
							<Box paddingLeft={2}>
								<Text color="gray" dimColor>
									{thread.replies} {thread.replies === 1 ? 'reply' : 'replies'}
								</Text>
							</Box>
						</Box>
					);
				})
			)}
		</Box>
	);
}

export default function App() {
	const {exit} = useApp();
	const {stdout} = useStdout();
	const width = stdout?.columns ?? 80;
	const height = stdout?.rows ?? 24;
	const compact = width < COMPACT_BREAKPOINT;

	const [activePanel, setActivePanel] = useState<Panel>('sidebar');
	const [channelIndex, setChannelIndex] = useState(0);
	const [threadIndex, setThreadIndex] = useState(0);

	const currentChannel = channels[channelIndex]!.name;
	const filteredThreads = useMemo(
		() => threads.filter(t => t.channel === currentChannel),
		[currentChannel],
	);

	useInput((input, key) => {
		if (input === 'q') {
			exit();
			return;
		}

		// Compact mode: "s" switches to sidebar
		if (compact && input === 's' && activePanel === 'threads') {
			setActivePanel('sidebar');
			return;
		}

		if (key.leftArrow && !compact) {
			setActivePanel('sidebar');
			return;
		}

		if (key.rightArrow && !compact) {
			if (activePanel === 'sidebar') {
				setActivePanel('threads');
				setThreadIndex(0);
				return;
			}
		}

		if (key.return) {
			if (activePanel === 'sidebar') {
				setActivePanel('threads');
				setThreadIndex(0);
				return;
			}
		}

		if (key.upArrow) {
			if (activePanel === 'sidebar') {
				setChannelIndex(i => Math.max(0, i - 1));
			} else {
				setThreadIndex(i => Math.max(0, i - 1));
			}

			return;
		}

		if (key.downArrow) {
			if (activePanel === 'sidebar') {
				setChannelIndex(i => Math.min(channels.length - 1, i + 1));
			} else {
				setThreadIndex(i => Math.min(filteredThreads.length - 1, i + 1));
			}
		}

		if (key.tab && !compact) {
			setActivePanel(p => (p === 'sidebar' ? 'threads' : 'sidebar'));
		}
	});

	const showSidebar = compact ? activePanel === 'sidebar' : true;
	const showThreads = compact ? activePanel === 'threads' : true;

	return (
		<Box flexDirection="column" width="100%" height={height}>
			<Box flexDirection="row" width="100%" flexGrow={1}>
				{showSidebar && (
					<Sidebar
						selectedIndex={channelIndex}
						active={activePanel === 'sidebar'}
						compact={compact}
					/>
				)}
				{showThreads && (
					<ThreadList
						channelName={currentChannel}
						selectedIndex={threadIndex}
						active={activePanel === 'threads'}
					/>
				)}
			</Box>
			<HelpBar compact={compact} activePanel={activePanel} />
		</Box>
	);
}
