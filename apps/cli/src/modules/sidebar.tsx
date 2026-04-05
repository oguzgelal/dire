import React from 'react';
import {Box, Text} from 'ink';
import {channels} from '../common/consts.js';
type SidebarProps = {
	selectedIndex: number;
	active: boolean;
	compact: boolean;
};

export function Sidebar({selectedIndex, active, compact}: SidebarProps) {
	return (
		<Box
			flexDirection="column"
			width={compact ? '100%' : 24}
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
				const isSelected = index === selectedIndex;
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
							# {channel.name}
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
