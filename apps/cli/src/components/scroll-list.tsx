import { useEffect, useRef } from "react";
import { useTheme } from "../common/theme.js";
import { ScrollBoxRenderable } from "@opentui/core";

type ScrollListProps = {
	active?: boolean;
	selectedItemIndex?: number;
	items: {
		id: string;
		content: () => React.ReactNode;
	}[];
};

export function ScrollList({
	active,
	items,
	selectedItemIndex,
}: ScrollListProps) {
	const theme = useTheme();
	const scrollboxRef = useRef<ScrollBoxRenderable>(null);

	useEffect(() => {
		if (selectedItemIndex == null || !scrollboxRef.current) return;
		const childId = items[selectedItemIndex]?.id;
		if (childId) {
			scrollboxRef.current.scrollChildIntoView(childId);
		}
	}, [selectedItemIndex, items]);

	return (
		<scrollbox
			ref={scrollboxRef}
			focused={active}
			height="100%"
			scrollX={false}
			flexGrow={1}
			style={{
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
