import { useApp, useInput } from "ink";
import { useDire } from "../store/store.js";

export function useInputControl() {
	const { exit } = useApp();
	const { onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onEnter } =
		useDire();

	useInput((input, key) => {
		if (input === "q") {
			exit();
			return;
		}

		if (key.leftArrow) {
			onArrowLeft();
			return;
		}

		if (key.rightArrow) {
			onArrowRight();
			return;
		}

		if (key.return) {
			onEnter();
			return;
		}

		if (key.upArrow) {
			onArrowUp();
			return;
		}

		if (key.downArrow) {
			onArrowDown();
			return;
		}
	});
}
