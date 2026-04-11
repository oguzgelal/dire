import {create} from 'zustand';
import {devtools, persist, type StorageValue} from 'zustand/middleware';
import Conf from 'conf';
import type {} from '@redux-devtools/extension'; // required for devtools typing

export type Panel = 'channels' | 'threads';

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
	projectName: 'dire',
});

interface DireState {
	tabs: Tab[];
	activeTabIndex: number;
}

interface DireStateActions {
	tabSet: (index: number) => void;
}

export const useDire = create<DireState & DireStateActions>()(
	devtools(
		persist(
			set => ({
				activeTabIndex: 0,
				tabs: [
					{
						navigation: {
							activePanel: 'channels',
							channels: {index: 0},
							threads: {index: 0},
						},
						channels: [
							{name: 'general', unread: 3},
							{name: 'random', unread: 0},
							{name: 'engineering', unread: 12},
							{name: 'design', unread: 1},
							{name: 'product', unread: 0},
							{name: 'announcements', unread: 0},
						],
						threads: [
							{
								id: '1',
								channel: 'general',
								author: 'Alice',
								preview: 'Has anyone tried the new build system?',
								replies: 5,
								time: '10:32 AM',
							},
							{
								id: '2',
								channel: 'general',
								author: 'Eve',
								preview: 'Lunch plans? Thinking sushi today',
								replies: 12,
								time: '9:12 AM',
							},
							{
								id: '3',
								channel: 'random',
								author: 'Grace',
								preview: 'Check out this cool terminal art I found',
								replies: 4,
								time: '11:01 AM',
							},
							{
								id: '4',
								channel: 'engineering',
								author: 'Bob',
								preview:
									'PR #421 is ready for review — refactored the auth module',
								replies: 3,
								time: '10:15 AM',
							},
							{
								id: '5',
								channel: 'engineering',
								author: 'Carol',
								preview: 'CI is failing on main, looking into it now',
								replies: 8,
								time: '9:48 AM',
							},
							{
								id: '6',
								channel: 'engineering',
								author: 'Hank',
								preview: 'Should we bump Node to v22 this sprint?',
								replies: 6,
								time: '8:30 AM',
							},
							{
								id: '7',
								channel: 'design',
								author: 'Dave',
								preview: 'New mockups for the dashboard are in Figma',
								replies: 2,
								time: '9:30 AM',
							},
							{
								id: '8',
								channel: 'product',
								author: 'Frank',
								preview: 'Q2 roadmap draft is shared in Notion',
								replies: 1,
								time: '8:55 AM',
							},
							{
								id: '9',
								channel: 'announcements',
								author: 'Admin',
								preview: 'Office closed next Monday for the holiday',
								replies: 0,
								time: '8:00 AM',
							},
						],
					},
				],
				tabSet: index => {
					set(state => {
						if (index < 0 || index >= state.tabs.length) {
							return {};
						}
						return {
							activeTabIndex: index,
						};
					});
				},
			}),
			{
				name: 'dire-storage',
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
			},
		),
	),
);
