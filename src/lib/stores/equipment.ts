import { writable } from 'svelte/store';

export type Equipment = {
	id: string;
	name: string;
	type: 'axe' | 'pickaxe' | 'hoe'; // extensible for future tools
	icon: string;
	description: string;
	lore: string;
	level: number;
	equipped: boolean;
	stats: {
		speedBonus: number; // percentage bonus (e.g., 0.1 = 10%)
		gatherAmount: number; // bonus items per gather
		specialAbilities: string[];
	};
	requirements?: {
		minLevel?: number;
		requiredItems?: { itemId: string; count: number }[];
	};
};

export type EquipmentState = {
	equipment: Equipment[];
	equippedAxe: string | null;
};

const defaultEquipment: Equipment[] = [
	{
		id: 'iron-axe',
		name: 'Iron Axe',
		type: 'axe',
		icon: '🪓',
		description: 'A sturdy iron axe forged in the pocket universe foundries.',
		lore: `The Iron Axe is a reliable tool that every woodcutter starts with. Its balanced weight and sharp edge make it ideal for gathering wood from the Starter Tree. Though basic, it has served countless gatherers well.`,
		level: 1,
		equipped: true,
		stats: {
			speedBonus: 0,
			gatherAmount: 1,
			specialAbilities: []
		}
	},
	{
		id: 'steel-axe',
		name: 'Steel Axe',
		type: 'axe',
		icon: '⚒️',
		description: 'A reinforced steel axe with improved durability and speed.',
		lore: `Crafted from refined steel, this axe cuts through wood with greater efficiency. The LPU metallurgists have perfected the balance between weight and sharpness, allowing for faster gather speeds.`,
		level: 5,
		equipped: false,
		stats: {
			speedBonus: 0.15, // 15% faster
			gatherAmount: 1,
			specialAbilities: []
		},
		requirements: {
			minLevel: 5,
			requiredItems: [{ itemId: 'wood', count: 50 }]
		}
	},
	{
		id: 'obsidian-axe',
		name: 'Obsidian Axe',
		type: 'axe',
		icon: '🖤',
		description: 'A legendary axe carved from pocket universe obsidian.',
		lore: `Obsidian from LPU-1031 holds ancient power. This axe not only gathers wood faster but also allows access to the sacred groves where premium timber grows. Legends say it was used by the first settlers.`,
		level: 15,
		equipped: false,
		stats: {
			speedBonus: 0.35, // 35% faster
			gatherAmount: 2, // gathers 2 items per action
			specialAbilities: ['Unlock Sacred Groves', 'Double Yield']
		},
		requirements: {
			minLevel: 15,
			requiredItems: [
				{ itemId: 'wood', count: 200 },
				{ itemId: 'dead-wood', count: 100 }
			]
		}
	}
];

function createEquipmentStore() {
	const { subscribe, update } = writable<EquipmentState>({
		equipment: defaultEquipment,
		equippedAxe: 'iron-axe'
	});

	return {
		subscribe,
		equipItem: (equipmentId: string) => {
			update((state) => ({
				...state,
				equipment: state.equipment.map((item) => ({
					...item,
					equipped: item.id === equipmentId && item.type === 'axe'
				})),
				equippedAxe: equipmentId
			}));
		},
		unlockEquipment: (equipmentId: string) => {
			update((state) => ({
				...state,
				equipment: state.equipment.map((item) =>
					item.id === equipmentId ? { ...item, equipped: true } : item
				)
			}));
		},
		getEquippedAxe: (state: EquipmentState) => {
			return state.equipment.find((e) => e.id === state.equippedAxe && e.type === 'axe');
		},
		getEquippedAxeStats: (state: EquipmentState) => {
			const axe = state.equipment.find((e) => e.id === state.equippedAxe && e.type === 'axe');
			return axe?.stats || { speedBonus: 0, gatherAmount: 1, specialAbilities: [] };
		}
	};
}

export const equipment = createEquipmentStore();
