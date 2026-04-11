import { useDire, Panel } from "./store.js";

export function useTab() {
	return useDire((s) => s.tabs[s.activeTabIndex]);
}

export function useChannels() {
	return useDire((s) => s.tabs[s.activeTabIndex]?.channels) || [];
}

export function useThreads() {
	return useDire((s) => s.tabs[s.activeTabIndex]?.threads) || [];
}

export function useNavigation() {
	return useDire((s) => s.tabs[s.activeTabIndex]?.navigation);
}

export function useNavigationFor(panel: Panel) {
	return useDire((s) => s.tabs[s.activeTabIndex]?.navigation?.[panel]);
}
