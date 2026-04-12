import { theme } from "../common/theme.js"

type SectionLabelProps = {
	label: string
}

export function SectionLabel({ label }: SectionLabelProps) {
	return (
		<box alignItems="center" marginTop={-1} marginBottom={1}>
			<box>
				<text fg={theme.primary}>
					<strong>{label}</strong>
				</text>
			</box>
		</box>
	)
}
