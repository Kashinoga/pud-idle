<script lang="ts">
	import { inventory, selectedItemId } from '$lib/stores/inventory';
	let { togglePanelWithItem }: { togglePanelWithItem: (itemId: string) => void } = $props();</script>

<div class="view-app-container inventory-view">
	<div class="content-header">
		<h1>Inventory</h1>
		<p>Items gathered during your pocket universe exploration.</p>
	</div>

	<div class="inventory-grid">
		{#each $inventory.items as item (item.id)}
			<div 
				class={`inventory-item ${$selectedItemId === item.id ? 'selected' : ''}`}
				role="button"
				tabindex="0"
				onclick={() => togglePanelWithItem(item.id)}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						togglePanelWithItem(item.id);
					}
				}}
			>
				<div class="item-icon">{item.icon}</div>
				<div class="item-info">
					<div class="item-name">{item.name}</div>
					<div class="item-count">{item.count}</div>
				</div>
			</div>
		{/each}
	</div>

	{#if $inventory.items.every((i) => i.count === 0)}
		<div class="empty-state">
			<p>Your inventory is empty. Start by gathering wood from the Woodcutting skill!</p>
		</div>
	{/if}
</div>

<style>
	.inventory-view {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.inventory-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: 1rem;
	}

	.inventory-item {
		background: var(--surface);
		border-radius: var(--radius-lg);
		border: 2px solid var(--surface-border);
		box-shadow: var(--shadow-soft);
		backdrop-filter: blur(var(--blur));
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.75rem;
		transition: all 160ms ease;
		cursor: pointer;
		user-select: none;
	}

	.inventory-item:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-soft);
		border-color: var(--primary);
	}

	.inventory-item.selected {
		border-color: var(--view-inventory);
		background: var(--view-inventory-soft);
		box-shadow: 0 0 20px var(--view-inventory-glow);
	}

	.item-icon {
		font-size: 2.5rem;
		line-height: 1;
	}

	.item-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.item-name {
		font-weight: 600;
		font-size: 0.95rem;
		color: var(--foreground);
	}

	.item-count {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--primary);
	}

	.empty-state {
		background: var(--surface);
		border-radius: var(--radius-lg);
		border: 1px dashed var(--surface-border);
		box-shadow: var(--shadow-soft);
		backdrop-filter: blur(var(--blur));
		padding: 2rem;
		text-align: center;
		color: var(--muted);
	}

	.empty-state p {
		margin: 0;
		line-height: 1.6;
	}
</style>
