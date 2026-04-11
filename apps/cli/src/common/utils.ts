const formatter = new Intl.NumberFormat("en-US", {
	notation: "compact",
	compactDisplay: "short",
});

export function formatNumber(num?: number) {
	if (num === undefined) return "-";
	return formatter.format(num).toLowerCase();
}

export function randomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
