import {useStdout} from 'ink';

export function useDimensions() {
	const {stdout} = useStdout();

	const width = stdout?.columns ?? 80;
	const height = stdout?.rows ?? 24;

	return {width, height};
}
