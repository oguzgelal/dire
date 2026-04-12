import React, { useEffect, useMemo, useRef, useState, type FC } from "react";
import { Box, DOMElement, Text, measureElement } from "ink";
import figures from "figures";
import { theme } from "../common/theme.js";

const SCROLL_BAR_FILLED = figures.lineVerticalBold;
const SCROLL_BAR_EMPTY = "";

type ScrollListProps = {
	active?: boolean;
	debug?: boolean;
	selectedItemIndex?: number;
	items: {
		id: string;
		content: () => React.ReactNode;
	}[];
};

export const ScrollList: FC<ScrollListProps> = ({
	active,
	debug,
	items,
	selectedItemIndex,
}) => {
	const [scrollTop, scrollTopSet] = useState(0);
	const [viewportHeight, viewportHeightSet] = useState(0);
	const [totalContentHeight, totalContentHeightSet] = useState(0);

	const containerRef = useRef<DOMElement>(null);
	const itemRefs = useRef<Map<number, DOMElement>>(new Map());

	useEffect(() => {
		if (selectedItemIndex == null || !containerRef.current) return;

		const vpHeight = measureElement(containerRef.current).height;
		if (vpHeight <= 0) return;

		viewportHeightSet(vpHeight);

		let offsetTop = 0;
		let selectedHeight = 0;
		let totalHeight = 0;

		for (let i = 0; i < items.length; i++) {
			const el = itemRefs.current.get(i);
			if (!el) continue;
			const { height } = measureElement(el);
			totalHeight += height;
			if (i < selectedItemIndex) {
				offsetTop += height;
			} else if (i === selectedItemIndex) {
				selectedHeight = height;
			}
		}

		totalContentHeightSet(totalHeight);

		scrollTopSet((prev) => {
			// Selected item is above the visible area — scroll up
			if (offsetTop < prev) return offsetTop;
			// Selected item is below the visible area — scroll down
			if (offsetTop + selectedHeight > prev + vpHeight) {
				return offsetTop + selectedHeight - vpHeight;
			}
			return prev;
		});
	}, [selectedItemIndex, items]);

	const needsScrollbar = totalContentHeight > viewportHeight && viewportHeight > 0; // prettier-ignore
	const scrollbar = useMemo(() => {
		if (!needsScrollbar) return null;

		let thumbSize = Math.round((viewportHeight / totalContentHeight) * viewportHeight); // prettier-ignore
		thumbSize = Math.max(1, thumbSize);

		const maxScrollTop = totalContentHeight - viewportHeight;
		const scrollRatio = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;
		const thumbPos = Math.round(scrollRatio * (viewportHeight - thumbSize));

		let bar = "";
		for (let i = 0; i < viewportHeight; i++) {
			if (i >= thumbPos && i < thumbPos + thumbSize) {
				bar += SCROLL_BAR_FILLED + "\n";
			} else {
				bar += SCROLL_BAR_EMPTY + "\n";
			}
		}

		return bar.trimEnd();
	}, [needsScrollbar, totalContentHeight, viewportHeight, scrollTop]);

	return (
		<Box height="100%" flexDirection="row" flexGrow={1}>
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
			{needsScrollbar && active && (
				<Box flexShrink={0} flexDirection="column">
					<Text color={theme.primary} dimColor>
						{scrollbar}
					</Text>
				</Box>
			)}
		</Box>
	);
};
