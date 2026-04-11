import { create } from "zustand";
import { devtools, persist, type StorageValue } from "zustand/middleware";
import Conf from "conf";
import type {} from "@redux-devtools/extension"; // required for devtools typing

export type Panel = "channels" | "threads";

export type Channel = {
	name: string;
	unread: number;
};

export type Thread = {
	id: string;
	channel: string;
	author: string;
	preview: string;
	replies: number;
	time: string;
};

type NavigationState = {
	activePanel: Panel;
	channels: {
		index: number;
	};
	threads: {
		index: number;
	};
};

type Tab = {
	navigation: NavigationState;
	channels: Channel[];
	threads: Thread[];
};

type PersistedDireState = DireState;

const conf = new Conf<Record<string, StorageValue<PersistedDireState>>>({
	projectName: "dire",
});

interface DireState {
	tabs: Tab[];
	activeTabIndex: number;
}

interface DireStateActions {
	tabSet: (index: number) => void;
	onArrowDown: () => void;
	onArrowUp: () => void;
	onArrowLeft: () => void;
	onArrowRight: () => void;
	onEnter: () => void;
}

export const useDire = create<DireState & DireStateActions>()(
	devtools(
		persist(
			(set) => ({
				activeTabIndex: 0,
				tabs: [
					{
						navigation: {
							activePanel: "channels",
							channels: { index: 0 },
							threads: { index: 0 },
						},
						channels: [
							{ name: "general", unread: 3 },
							{ name: "random", unread: 0 },
							{ name: "engineering", unread: 12 },
							{ name: "design", unread: 1 },
							{ name: "product", unread: 0 },
							{ name: "announcements", unread: 0 },
							{ name: "test1", unread: 0 },
							{ name: "test2", unread: 0 },
							{ name: "test3", unread: 0 },
							{ name: "test4", unread: 0 },
							{ name: "test5", unread: 0 },
							{ name: "test6", unread: 0 },
							{ name: "test7", unread: 0 },
							{ name: "test8", unread: 0 },
							{ name: "test9", unread: 0 },
							{ name: "test10", unread: 0 },
							{ name: "test11", unread: 0 },
							{ name: "test12", unread: 0 },
							{ name: "test13", unread: 0 },
							{ name: "test14", unread: 0 },
							{ name: "test15", unread: 0 },
							{ name: "test16", unread: 0 },
							{ name: "test17", unread: 0 },
							{ name: "test18", unread: 0 },
							{ name: "test19", unread: 0 },
							{ name: "test20", unread: 0 },
							{ name: "test21", unread: 0 },
							{ name: "test22", unread: 0 },
							{ name: "test23", unread: 0 },
							{ name: "test24", unread: 0 },
							{ name: "test25", unread: 0 },
							{ name: "test26", unread: 0 },
							{ name: "test27", unread: 0 },
							{ name: "test28", unread: 0 },
							{ name: "test29", unread: 0 },
							{ name: "test30", unread: 0 },
							{ name: "test31", unread: 0 },
							{ name: "test32", unread: 0 },
							{ name: "test33", unread: 0 },
							{ name: "test34", unread: 0 },
							{ name: "test35", unread: 0 },
							{ name: "test36", unread: 0 },
							{ name: "test37", unread: 0 },
							{ name: "test38", unread: 0 },
							{ name: "test39", unread: 0 },
						],
						threads: [
							{
								id: "1",
								channel: "general",
								author: "Alice",
								preview: "Has anyone tried the new build system?",
								replies: 5,
								time: "10:32 AM",
							},
							{
								id: "2",
								channel: "general",
								author: "Eve",
								preview: "Lunch plans? Thinking sushi today",
								replies: 12,
								time: "9:12 AM",
							},
							{
								id: "3",
								channel: "random",
								author: "Grace",
								preview: "Check out this cool terminal art I found",
								replies: 4,
								time: "11:01 AM",
							},
							{
								id: "4",
								channel: "engineering",
								author: "Bob",
								preview:
									"PR #421 is ready for review — refactored the auth module",
								replies: 3,
								time: "10:15 AM",
							},
							{
								id: "5",
								channel: "engineering",
								author: "Carol",
								preview: "CI is failing on main, looking into it now",
								replies: 8,
								time: "9:48 AM",
							},
							{
								id: "6",
								channel: "engineering",
								author: "Hank",
								preview: "Should we bump Node to v22 this sprint?",
								replies: 6,
								time: "8:30 AM",
							},
							{
								id: "7",
								channel: "design",
								author: "Dave",
								preview: "New mockups for the dashboard are in Figma",
								replies: 2,
								time: "9:30 AM",
							},
							{
								id: "8",
								channel: "product",
								author: "Frank",
								preview: "Q2 roadmap draft is shared in Notion",
								replies: 1,
								time: "8:55 AM",
							},
							{
								id: "9",
								channel: "announcements",
								author: "Admin",
								preview: "Office closed next Monday for the holiday",
								replies: 0,
								time: "8:00 AM",
							},
						],
					},
				],
				tabSet: (index) => {
					set((state) => {
						if (index < 0 || index >= state.tabs.length) {
							return {};
						}
						return {
							activeTabIndex: index,
						};
					});
				},
				onArrowUp: () => {
					set((state) => {
						const tab = state.tabs[state.activeTabIndex];
						if (!tab) return {};
						const panel = tab.navigation.activePanel;
						const currentIndex = tab.navigation[panel].index;
						if (currentIndex <= 0) return {};
						const tabs = [...state.tabs];
						tabs[state.activeTabIndex] = {
							...tab,
							navigation: {
								...tab.navigation,
								[panel]: { index: currentIndex - 1 },
							},
						};
						return { tabs };
					});
				},
				onArrowDown: () => {
					set((state) => {
						const tab = state.tabs[state.activeTabIndex];
						if (!tab) return {};
						const panel = tab.navigation.activePanel;
						const list = panel === "channels" ? tab.channels : tab.threads;
						const currentIndex = tab.navigation[panel].index;
						if (currentIndex >= list.length - 1) return {};
						const tabs = [...state.tabs];
						tabs[state.activeTabIndex] = {
							...tab,
							navigation: {
								...tab.navigation,
								[panel]: { index: currentIndex + 1 },
							},
						};
						return { tabs };
					});
				},
				onArrowLeft: () => {
					set((state) => {
						const tab = state.tabs[state.activeTabIndex];
						if (!tab) return {};
						if (tab.navigation.activePanel === "channels") return {};
						const tabs = [...state.tabs];
						tabs[state.activeTabIndex] = {
							...tab,
							navigation: {
								...tab.navigation,
								activePanel: "channels",
							},
						};
						return { tabs };
					});
				},
				onArrowRight: () => {
					set((state) => {
						const tab = state.tabs[state.activeTabIndex];
						if (!tab) return {};
						if (tab.navigation.activePanel === "threads") return {};
						const tabs = [...state.tabs];
						tabs[state.activeTabIndex] = {
							...tab,
							navigation: {
								...tab.navigation,
								activePanel: "threads",
								threads: { index: 0 },
							},
						};
						return { tabs };
					});
				},
				onEnter: () => {
					set((state) => {
						const tab = state.tabs[state.activeTabIndex];
						if (!tab) return {};
						if (tab.navigation.activePanel !== "channels") return {};
						const tabs = [...state.tabs];
						tabs[state.activeTabIndex] = {
							...tab,
							navigation: {
								...tab.navigation,
								activePanel: "threads",
								threads: { index: 0 },
							},
						};
						return { tabs };
					});
				},
			}),
			{
				name: "dire-storage",
				// partialize: state => ({channels: state.channels}),
				storage: {
					getItem(name: string) {
						return (conf.get(name) as StorageValue<PersistedDireState>) ?? null;
					},
					setItem(name: string, value: StorageValue<PersistedDireState>) {
						conf.set(name, value);
					},
					removeItem(name: string) {
						conf.delete(name);
					},
				},
			}
		)
	)
);
