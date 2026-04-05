import React from 'react';
import {Box, Text} from 'ink';
import {useDire} from '../hooks/useDire.js';

export function Threads() {
	const {threads, activePanel, selectionThreadIndex} = useDire();

	const active = activePanel === 'threads';

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
					#test
				</Text>
				<Text color="gray"> — {threads.length} threads</Text>
			</Box>
			{threads.length === 0 ? (
				<Text color="gray" italic>
					No threads in this channel yet.
				</Text>
			) : (
				threads.map((thread, index) => {
					const isSelected = index === selectionThreadIndex;

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
