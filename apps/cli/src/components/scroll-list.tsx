import React, { useEffect, useRef, useState, type FC } from "react";
import { Box, DOMElement, measureElement } from "ink";

type ScrollListProps = {
	debug?: boolean;
	selectedItemIndex?: number;
	items: {
		id: string;
		content: () => React.ReactNode;
	}[];
};

export const ScrollList: FC<ScrollListProps> = ({
	debug,
	items,
	selectedItemIndex,
}) => {
	const [scrollTop, scrollTopSet] = useState(0);

	const containerRef = useRef<DOMElement>(null);
	const itemRefs = useRef<Map<number, DOMElement>>(new Map());

	useEffect(() => {
		if (selectedItemIndex == null || !containerRef.current) return;

		const viewportHeight = measureElement(containerRef.current).height;
		if (viewportHeight <= 0) return;

		let offsetTop = 0;
		let selectedHeight = 0;

		for (let i = 0; i <= selectedItemIndex; i++) {
			const el = itemRefs.current.get(i);
			if (!el) continue;
			const { height } = measureElement(el);
			if (i < selectedItemIndex) {
				offsetTop += height;
			} else {
				selectedHeight = height;
			}
		}

		scrollTopSet((prev) => {
			// Selected item is above the visible area — scroll up
			if (offsetTop < prev) return offsetTop;
			// Selected item is below the visible area — scroll down
			if (offsetTop + selectedHeight > prev + viewportHeight)
				return offsetTop + selectedHeight - viewportHeight;
			return prev;
		});
	}, [selectedItemIndex, items]);

	return (
		<Box
			ref={containerRef}
			height="100%"
			flexDirection="column"
			flexGrow={1}
			overflow={debug ? "visible" : "hidden"}
		>
			<Box flexShrink={0} flexDirection="column" marginTop={-scrollTop}>
				{items.map((item, index) => (
					<Box
						key={item.id}
						ref={(el: DOMElement | null) => {
							if (el) itemRefs.current.set(index, el);
							else itemRefs.current.delete(index);
						}}
					>
						{item.content()}
					</Box>
				))}
			</Box>
		</Box>
	);
};
