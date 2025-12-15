import { writable } from 'svelte/store';

export type ConnectionStatus = 'connected' | 'degraded' | 'disconnected';
export type DropPriority = 'Standard' | 'Priority';
export type BeaconStatus = 'armed' | 'engaged' | 'cooldown';

export type StarshipState = {
	name: string;
	connectionStatus: ConnectionStatus;
	lastMaintenanceHoursAgo: number;
    lastMessage: string;
	transit: {
		status: string;
		nextWindowMinutes: number;
		location: string;
	};
	supply: {
		nextDropMinutes: number;
		priority: DropPriority;
		payload: { label: string; count: number }[];
		lastManifestVersion: number;
	};
	emergency: {
		autoStabilization: boolean;
		beaconStatus: BeaconStatus;
		responseSeconds: number;
		lastTriggeredAt?: string | null;
	};
};

const defaultStarshipState: StarshipState = {
	name: 'IPR Courier – Vanta',
	connectionStatus: 'connected',
	lastMaintenanceHoursAgo: 12,
    lastMessage: 'Retrieving supplies...',
	transit: {
		status: 'In orbit',
		nextWindowMinutes: 42,
		location: 'Densette Gateway'
	},
	supply: {
		nextDropMinutes: 18,
		priority: 'Standard',
		payload: [
			{ label: 'Rations', count: 6 },
			{ label: 'Medkits', count: 2 },
			{ label: 'Toolkits', count: 1 }
		],
		lastManifestVersion: 1
	},
	emergency: {
		autoStabilization: true,
		beaconStatus: 'armed',
		responseSeconds: 5,
		lastTriggeredAt: null
	}
};

function createStarshipStore() {
	const { subscribe, update } = writable<StarshipState>(defaultStarshipState);

	return {
		subscribe,
		setConnectionStatus: (connectionStatus: ConnectionStatus) => {
			update((state) => ({ ...state, connectionStatus }));
		},
		setLastMaintenanceHoursAgo: (hoursAgo: number) => {
			update((state) => ({ ...state, lastMaintenanceHoursAgo: Math.max(0, hoursAgo) }));
		},
		setTransit: (transit: Partial<StarshipState['transit']>) => {
			update((state) => ({ ...state, transit: { ...state.transit, ...transit } }));
		},
		setSupply: (supply: Partial<StarshipState['supply']>) => {
			update((state) => ({ ...state, supply: { ...state.supply, ...supply } }));
		},
		requestPriorityDrop: () => {
			update((state) => ({
				...state,
				supply: {
					...state.supply,
					priority: 'Priority',
					nextDropMinutes: Math.max(5, state.supply.nextDropMinutes - 8)
				}
			}));
		},
		triggerBeacon: () => {
			update((state) => ({
				...state,
				emergency: {
					...state.emergency,
					beaconStatus: 'engaged',
					lastTriggeredAt: new Date().toISOString()
				}
			}));
		},
		resetBeacon: () => {
			update((state) => ({
				...state,
				emergency: { ...state.emergency, beaconStatus: 'armed' }
			}));
		}
	};
}

export const starship = createStarshipStore();
