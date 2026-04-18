import { COMPACT_BREAKPOINT } from "../common/consts.js"
import { useDimensions } from "./useDimensions.js"

export function useIsCompact() {
	const { width } = useDimensions()
	return width < COMPACT_BREAKPOINT
}
