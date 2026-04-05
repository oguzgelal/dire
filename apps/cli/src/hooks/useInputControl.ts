import {useApp, useInput} from 'ink';
import {useDire} from './useDire.js';

export function useInputControl() {
	const {exit} = useApp();

	const {
		activePanel,
		activePanelSet,
		selectionThreadIndex,
		selectionThreadIndexSet,
		selectionChannelIndex,
		selectionChannelIndexSet,
	} = useDire();

	useInput((input, key) => {
		if (input === 'q') {
			exit();
			return;
		}

		if (key.leftArrow) {
			activePanelSet('sidebar');
			return;
		}

		if (key.rightArrow) {
			if (activePanel === 'sidebar') {
				activePanelSet('threads');
				selectionThreadIndexSet(0);
				return;
			}
		}

		if (key.return) {
			if (activePanel === 'sidebar') {
				activePanelSet('threads');
				selectionThreadIndexSet(0);
				return;
			}
		}

		if (key.upArrow) {
			if (activePanel === 'sidebar') {
				selectionChannelIndexSet(Math.max(0, selectionChannelIndex - 1));
			} else {
				selectionThreadIndexSet(Math.max(0, selectionThreadIndex - 1));
			}

			return;
		}

		if (key.downArrow) {
			if (activePanel === 'sidebar') {
				selectionChannelIndexSet(selectionThreadIndex + 1);
			} else {
				selectionThreadIndexSet(selectionThreadIndex + 1);
			}
		}
	});
}
