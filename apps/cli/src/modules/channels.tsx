import React from 'react';
import {Box, Text} from 'ink';
import {CHANNELS_WIDTH} from '../common/consts.js';
import {useDire} from '../hooks/useDire.js';
import {useIsCompact} from '../hooks/useIsCompact.js';

export function Channels() {
	const compact = useIsCompact();
	const {channels, activePanel, selectionChannelIndex} = useDire();

	const active = activePanel === 'channels';

	return (
		<Box
			flexDirection="column"
			width={compact ? '100%' : CHANNELS_WIDTH}
			flexGrow={compact ? 1 : 0}
			borderStyle="single"
			borderColor={active ? 'cyan' : 'gray'}
			paddingX={1}
		>
			<Box marginBottom={1}>
				<Text bold color="white">
					Channels
				</Text>
			</Box>
			{channels.map((channel, index) => {
				const isSelected = index === selectionChannelIndex;
				const hasUnread = channel.unread > 0;

				return (
					<Box key={channel.name}>
						{isSelected && active ? (
							<Text color="cyan" bold>
								{'❯ '}
							</Text>
						) : (
							<Text>{'  '}</Text>
						)}
						<Text
							color={
								isSelected && active ? 'cyan' : hasUnread ? 'white' : 'gray'
							}
							bold={isSelected || hasUnread}
							inverse={isSelected && active}
						>
							#{channel.name}
						</Text>
						{hasUnread && (
							<Text color="green" bold>
								{' '}
								({channel.unread})
							</Text>
						)}
					</Box>
				);
			})}
		</Box>
	);
}
