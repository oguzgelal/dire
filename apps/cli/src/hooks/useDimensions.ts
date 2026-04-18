import { useTerminalDimensions } from "@opentui/react"

export function useDimensions() {
	const { width, height } = useTerminalDimensions()
	return { width, height }
}
