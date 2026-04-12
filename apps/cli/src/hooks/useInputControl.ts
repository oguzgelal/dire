import { useKeyboard, useRenderer } from "@opentui/react";
import { useDire } from "../store/store.js";

export function useInputControl() {
	const renderer = useRenderer();
	const { onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onEnter, onT } =
		useDire();

	useKeyboard((key) => {
		if (key.name === "c") {
			renderer.console.toggle();
		}

		if (key.name === "t") {
			onT();
		}

		if (key.name === "q") {
			renderer.destroy();
			return;
		}

		if (key.name === "left") {
			onArrowLeft();
			return;
		}

		if (key.name === "right") {
			onArrowRight();
			return;
		}

		if (key.name === "enter") {
			onEnter();
			return;
		}

		if (key.name === "up") {
			onArrowUp();
			return;
		}

		if (key.name === "down") {
			onArrowDown();
			return;
		}
	});
}
