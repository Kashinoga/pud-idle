<script lang="ts">
	import { inventory, selectedItemId } from '$lib/stores/inventory';
	let { togglePanelWithItem }: { togglePanelWithItem: (itemId: string) => void } = $props();
</script>

<div class="view-app-container inventory-view">
	<div class="content-header">
		<h1>Inventory</h1>
		<p>Items gathered during your pocket universe exploration.</p>
	</div>

	<div class="inventory-grid">
		{#each $inventory.items as item (item.id)}
			<div
				class={`inventory-item glass-surface glass-radius glass-shadow-soft glass-shadow-accent--inventory ${$selectedItemId === item.id ? 'selected' : ''}`}
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
					{#if item.description}
						<div class="item-description">{item.description}</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	{#if $inventory.items.every((i) => i.count === 0)}
		<div class="empty-state glass-surface glass-radius">
			<p>Your inventory is empty. Start by gathering wood from the Woodcutting skill!</p>
		</div>
	{/if}
</div>

<style>
	.inventory-view {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: relative;
		background:
			radial-gradient(ellipse at 20% 30%, rgba(248, 113, 113, 0.28) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 70%, rgba(239, 68, 68, 0.22) 0%, transparent 55%),
			radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.16) 0%, transparent 60%),
			linear-gradient(135deg, rgba(248, 113, 113, 0.12) 0%, rgba(239, 68, 68, 0.1) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
        overflow: auto;
	}

	.inventory-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
		gap: var(--space-2xs);
	}

	.inventory-item {
		border: 2px solid var(--surface-border);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 0.75rem;
		transition: all 160ms ease;
		cursor: pointer;
		user-select: none;
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
		border-color: var(--primary);
	}

	.inventory-item.selected {
		border-color: var(--view-inventory);
		background: rgba(139, 92, 246, 0.50);
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

	.item-description {
		font-size: 0.75rem;
		color: var(--muted);
		line-height: 1.4;
		margin-top: 0.25rem;
	}

	.empty-state {
		border: 1px dashed var(--surface-border);
		padding: 2rem;
		text-align: center;
		color: var(--muted);
	}

	.empty-state p {
		margin: 0;
		line-height: 1.6;
	}
</style>
