<script lang="ts">
	import { inventory, selectedItemId } from '$lib/stores/inventory';
	let { togglePanelWithItem }: { togglePanelWithItem: (itemId: string) => void } = $props();
</script>

<div class="view-app-container inventory-view">
	<div class="card">
		<div class="card-header">
			<div class="card-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					fill="var(--foreground)"
					viewBox="0 0 256 256"
					><path
						d="M168,40.58V32A24,24,0,0,0,144,8H112A24,24,0,0,0,88,32v8.58A56.09,56.09,0,0,0,40,96V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V96A56.09,56.09,0,0,0,168,40.58ZM112,24h32a8,8,0,0,1,8,8v8H104V32A8,8,0,0,1,112,24Zm56,136H88v-8a8,8,0,0,1,8-8h64a8,8,0,0,1,8,8ZM88,176h48v8a8,8,0,0,0,16,0v-8h16v40H88Zm112,40H184V152a24,24,0,0,0-24-24H96a24,24,0,0,0-24,24v64H56V96A40,40,0,0,1,96,56h64a40,40,0,0,1,40,40V216ZM152,88a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h32A8,8,0,0,1,152,88Z"
					></path></svg
				>
			</div>
			<h1>Inventory</h1>
		</div>
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
		background: rgba(139, 92, 246, 0.5);
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
