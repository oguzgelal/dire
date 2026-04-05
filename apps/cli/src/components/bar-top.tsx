import React from 'react';
import {Box, Text} from 'ink';
import {CHANNELS_WIDTH} from '../common/consts.js';

export function BarTop() {
	return (
		<Box width={'100%'} paddingX={1}>
			{/* logo */}
			<Box width={CHANNELS_WIDTH} flexShrink={0}>
				<Text color={'cyan'} bold>
					ꘈ DIRE (^o^)丿
				</Text>
			</Box>

			<Box flexGrow={1} />

			{/* profile */}
			<Box>
				<Text color={'cyan'} bold>
					oguzgelal [0]
				</Text>
			</Box>
		</Box>
	);
}
