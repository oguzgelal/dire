import { useApp, useInput } from "ink";
import { useDire } from "../store/store.js";

export function useInputControl() {
	const { exit } = useApp();
	const { tabSet } = useDire();

	useInput((input, key) => {
		if (input === "q") {
			exit();
			return;
		}

		// if (key.leftArrow) {
		// 	activePanelSet('channels');
		// 	return;
		// }

		// if (key.rightArrow) {
		// 	if (activePanel === 'channels') {
		// 		activePanelSet('threads');
		// 		selectionThreadIndexSet(0);
		// 		return;
		// 	}
		// }

		// if (key.return) {
		// 	if (activePanel === 'channels') {
		// 		activePanelSet('threads');
		// 		selectionThreadIndexSet(0);
		// 		return;
		// 	}
		// }

		// if (key.upArrow) {
		// 	if (activePanel === 'channels') {
		// 		selectionChannelIndexSet(Math.max(0, selectionChannelIndex - 1));
		// 	} else {
		// 		selectionThreadIndexSet(Math.max(0, selectionThreadIndex - 1));
		// 	}

		// 	return;
		// }

		// if (key.downArrow) {
		// 	if (activePanel === 'channels') {
		// 		selectionChannelIndexSet(selectionThreadIndex + 1);
		// 	} else {
		// 		selectionThreadIndexSet(selectionThreadIndex + 1);
		// 	}
		// }
	});
}
