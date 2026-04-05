import React from 'react';
import {Box, Text} from 'ink';
import {GUIDE_WIDTH} from '../common/consts.js';
import {useIsCompact} from '../hooks/useIsCompact.js';

export function Guide() {
	const compact = useIsCompact();

	return (
		<Box
			flexDirection="column"
			width={compact ? '100%' : GUIDE_WIDTH}
			flexGrow={compact ? 1 : 0}
			gap={0}
		>
			{/* options */}
			<Box
				paddingX={1}
				flexGrow={1}
				borderStyle="single"
				borderColor="white"
				flexDirection="column"
			>
				<Box marginBottom={1}>
					<Text bold color="white">
						Options
					</Text>
				</Box>

				<Box flexDirection="column">
					<Box>
						<Text color="gray">
							<Text bold color="white">
								[u]
							</Text>{' '}
							Upvote
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[d]
							</Text>{' '}
							Downvote
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[r]
							</Text>{' '}
							Report
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[p]
							</Text>{' '}
							Pin channel
						</Text>
					</Box>
				</Box>
			</Box>

			{/* Commands */}
			<Box
				paddingX={1}
				flexGrow={1}
				borderStyle="single"
				borderColor="white"
				flexDirection="column"
			>
				<Box marginBottom={1}>
					<Text bold color="white">
						Commands
					</Text>
				</Box>

				<Box flexDirection="column">
					<Box>
						<Text color="gray">
							<Text bold color="white">
								[x]
							</Text>{' '}
							Next page
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[z]
							</Text>{' '}
							Previous page
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[s]
							</Text>{' '}
							Sign in
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[n]
							</Text>{' '}
							New post
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[n]
							</Text>{' '}
							New channel
						</Text>
					</Box>

					<Box>
						<Text color="gray">
							<Text bold color="white">
								[r]
							</Text>{' '}
							Refresh
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
