import { writable } from 'svelte/store';

export type InventoryItem = {
	id: string;
	name: string;
	count: number;
	icon: string; // emoji or icon name
	color?: string; // optional accent color
	description?: string; // short description
	lore?: string; // longer lore text
};

export type InventoryState = {
	items: InventoryItem[];
};

const defaultItems: InventoryItem[] = [
	{
		id: 'wood',
		name: 'Wood',
		count: 0,
		icon: '🪵',
		color: 'var(--view-woodcutting)',
		description: 'Timber from the pocket universe.',
		lore: `This wood comes from the native forests of LPU-1031. The trees here grow unusually fast due to the unique atmospheric conditions and daylight cycles. The wood is lightweight yet surprisingly durable, making it ideal for camp construction. Local wildlife seems to have coevolved with these trees—many species rely on them for shelter and food.`
	},
	{
		id: 'dead-wood',
		name: 'Dead Wood',
		count: 0,
		icon: '💀',
		color: 'var(--view-woodcutting)',
		description: 'Decayed timber scattered across the forest floor.',
		lore: `Dead wood on LPU-1031 tells the story of fallen giants. These logs break down slowly due to the planet's unique fungal ecosystem, creating shelter for countless organisms. While less structurally sound than fresh timber, dead wood is excellent for fuel and contains valuable composting material. Rangers often find rare minerals and fossils embedded within the ancient decomposing logs.`
	}
	// Future items will be added here
];

function createInventory() {
	const { subscribe, update } = writable<InventoryState>({ items: defaultItems });

	return {
		subscribe,
		addItem: (itemId: string, amount: number = 1) => {
			update((state) => {
				const item = state.items.find((i) => i.id === itemId);
				if (item) {
					item.count += amount;
				}
				return state;
			});
		},
		removeItem: (itemId: string, amount: number = 1) => {
			update((state) => {
				const item = state.items.find((i) => i.id === itemId);
				if (item) {
					item.count = Math.max(0, item.count - amount);
				}
				return state;
			});
		},
		setItemCount: (itemId: string, count: number) => {
			update((state) => {
				const item = state.items.find((i) => i.id === itemId);
				if (item) {
					item.count = Math.max(0, count);
				}
				return state;
			});
		},
		getItemCount: (itemId: string) => {
			let count = 0;
			subscribe((state) => {
				const item = state.items.find((i) => i.id === itemId);
				if (item) count = item.count;
			})();
			return count;
		}
	};
}

export const inventory = createInventory();

// Track the currently selected item for detail view
export const selectedItemId = writable<string | null>(null);

