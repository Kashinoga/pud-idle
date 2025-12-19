import { writable } from 'svelte/store';

export type ActivityEvent = {
	id: string;
	type: 'gather' | 'equip' | 'levelup' | 'achievement' | 'time' | 'campfire';
	message: string;
	icon: string;
	timestamp: number;
	color?: string;
	panelItemId?: string;
};

type ActivityLogState = {
	events: ActivityEvent[];
	maxEvents: number;
};

function createActivityLog() {
	const { subscribe, update } = writable<ActivityLogState>({
		events: [],
		maxEvents: 20 // Keep last 20 events
	});

	return {
		subscribe,
		addEvent: (
			type: ActivityEvent['type'],
			message: string,
			icon: string,
			color: string,
			panelItemId?: string
		) => {
			update((state) => {
				const defaultColors: Record<ActivityEvent['type'], string | undefined> = {
					gather: undefined,
					equip: undefined,
					levelup: '#7dd3fc', // aurora blue
					achievement: undefined,
					time: '#38bdf8',
					campfire: '#fb923c' // orange
				};
				const resolvedColor = color ?? defaultColors[type];
				const newEvent: ActivityEvent = {
					id: `${Date.now()}-${Math.random()}`,
					type,
					message,
					icon,
					timestamp: Date.now(),
					color: resolvedColor,
					panelItemId
				};

				const events = [newEvent, ...state.events].slice(0, state.maxEvents);
				return { ...state, events };
			});
		},
		clear: () => {
			update((state) => ({ ...state, events: [] }));
		}
	};
}

export const activityLog = createActivityLog();
