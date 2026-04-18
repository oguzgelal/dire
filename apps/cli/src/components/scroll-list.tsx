import { useEffect, useRef } from "react";
import { useTheme } from "../common/theme.js";
import { ScrollBoxRenderable } from "@opentui/core";

type ScrollListProps = {
	active?: boolean;
	selectedItemIndex: number;
	items: {
		id: string;
		content: () => React.ReactNode;
	}[];
};

const SCROLL_THRESHOLD = 5; // will start scrolling after X items

export function ScrollList({
	active,
	items,
	selectedItemIndex,
}: ScrollListProps) {
	const theme = useTheme();
	const scrollboxRef = useRef<ScrollBoxRenderable>(null);
	const lastSelectedItemIndex = useRef<number>(selectedItemIndex);

	useEffect(() => {
		if (!scrollboxRef.current) return;

		if (selectedItemIndex === null) return;
		if (selectedItemIndex === undefined) return;

		const childId = items[selectedItemIndex]?.id;
		if (!childId) return;

		const scrollDir = selectedItemIndex > lastSelectedItemIndex.current ? 1 : -1; // prettier-ignore
		const scrollbox = scrollboxRef.current;

		const child = scrollbox.findDescendantById(childId);
		if (!child) return;

		let shouldScroll = false;
		if (scrollDir === 1 && selectedItemIndex > SCROLL_THRESHOLD) {
			shouldScroll = true;
		} else if (scrollDir === -1) {
			shouldScroll = true;
		}

		if (shouldScroll) {
			if (scrollDir === 1) {
				scrollbox.scrollBy(child.height);
			} else {
				scrollbox.scrollBy(-child.height);
			}
		}

		lastSelectedItemIndex.current = selectedItemIndex;
	}, [selectedItemIndex, items]);

	return (
		<scrollbox
			ref={scrollboxRef}
			focused={active}
			height="100%"
			scrollX={false}
			flexGrow={1}
			// disable default scroll behaviour
			onKeyDown={(e) => {
				e.preventDefault();
				e.stopPropagation();
			}}
			style={{
				verticalScrollbarOptions: {
					visible: active,
				},
				scrollbarOptions: {
					trackOptions: {
						foregroundColor: theme.primary,
					},
				},
			}}
		>
			{items.map((item) => (
				<box key={item.id} id={item.id}>
					{item.content()}
				</box>
			))}
		</scrollbox>
	);
}
