import React from 'react';
import {Box, Text} from 'ink';
import {Panel} from '../common/types.js';

type HelpBarProps = {
	compact: boolean;
	activePanel: Panel;
};

export function HelpBar({compact, activePanel}: HelpBarProps) {
	return (
		<Box paddingX={1} gap={2}>
			<Text color="gray">
				<Text bold color="white">
					↑↓
				</Text>{' '}
				navigate
			</Text>
			{compact ? (
				activePanel === 'threads' ? (
					<Text color="gray">
						<Text bold color="white">
							s
						</Text>{' '}
						channels
					</Text>
				) : (
					<Text color="gray">
						<Text bold color="white">
							enter
						</Text>{' '}
						open channel
					</Text>
				)
			) : (
				<>
					<Text color="gray">
						<Text bold color="white">
							←→
						</Text>{' '}
						switch panel
					</Text>
					<Text color="gray">
						<Text bold color="white">
							enter
						</Text>{' '}
						select
					</Text>
				</>
			)}
			<Text color="gray">
				<Text bold color="white">
					q
				</Text>{' '}
				quit
			</Text>
		</Box>
	);
}
