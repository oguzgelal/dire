import { useState } from "react";
import { useTheme } from "../common/theme.js";
import { Shortcut } from "./shortcut.js";
import { SELECTOR } from "../common/consts.js";

type OptionsDialogProps = {
	doClose: () => void;
	options?: {
		id: string;
		label: string;
	}[];
};

export function OptionsDialog({ doClose, options }: OptionsDialogProps) {
	const theme = useTheme();
	const [selectedIndex, selectedIndexSet] = useState(0);

	return (
		<box
			position="absolute"
			zIndex={10}
			width="100%"
			height="100%"
			backgroundColor={theme.bgOverlay}
			alignItems="center"
			justifyContent="center"
		>
			<box
				zIndex={20}
				width={40}
				height={12}
				backgroundColor={theme.bg}
				position="relative"
				padding={0}
				// border
				// borderStyle="rounded"
				// borderColor={theme.primary}
			>
				<box
					style={{ backgroundColor: theme.primary }}
					alignItems="center"
					flexDirection="row"
					paddingX={1}
				>
					<box flexGrow={1}>
						<text>Options</text>
					</box>
					<box>
						<Shortcut
							shortcut="esc"
							shortcutFg="white"
							description="close"
							descriptionFg="white"
						/>
					</box>
				</box>
				{/* body contents */}
				<box paddingX={1} flexGrow={1} marginTop={1}>
					{options?.map((option, optionIndex) => {
						const isSelected = optionIndex === selectedIndex;
						return (
							<text key={option.id} fg={isSelected ? theme.primary : theme.fg}>
								{`${SELECTOR} `}
								<strong>{option.label}</strong>
							</text>
						);
					})}
				</box>
			</box>
		</box>
	);
}
