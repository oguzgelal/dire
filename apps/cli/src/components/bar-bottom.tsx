import React from 'react';
import {Box, Text} from 'ink';
import {useIsCompact} from '../hooks/useIsCompact.js';

export function BarBottom() {
	const compact = useIsCompact();

	return (
		<Box
			flexShrink={0}
			paddingX={1}
			gap={2}
			alignItems="center"
			justifyContent="center"
		>
			{/* navigate */}
			<Text color="gray">
				<Text bold color="white">
					[↑↓]
				</Text>{' '}
				navigate
			</Text>

			{/* select */}
			{!compact && (
				<>
					<Text color="gray">
						<Text bold color="white">
							[←→]
						</Text>{' '}
						switch panels
					</Text>
					<Text color="gray">
						<Text bold color="white">
							[enter]
						</Text>{' '}
						select
					</Text>
				</>
			)}

			{/* quit */}
			<Text color="gray">
				<Text bold color="white">
					[q]
				</Text>{' '}
				quit
			</Text>
		</Box>
	);
}
