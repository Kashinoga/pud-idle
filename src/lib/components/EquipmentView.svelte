<script lang="ts">
	import { equipment } from '$lib/stores/equipment';
	import { inventory } from '$lib/stores/inventory';
	import { player } from '$lib/stores/player';

	let { togglePanelWithItem }: { togglePanelWithItem: (itemId: string) => void } = $props();

	let equipmentState = $state<ReturnType<typeof equipment.subscribe> | null>(null);

	const checkRequirements = (equipmentId: string) => {
		const equip = $equipment.equipment.find((e) => e.id === equipmentId);
		if (!equip?.requirements) return true;

		if (equip.requirements.minLevel && equip.requirements.minLevel > $player.stats.level) {
			return false;
		}

		if (equip.requirements.requiredItems) {
			return equip.requirements.requiredItems.every((req) => {
				const inventoryItem = $inventory.items.find((i) => i.id === req.itemId);
				return (inventoryItem?.count || 0) >= req.count;
			});
		}

		return true;
	};

	const handleEquip = (equipmentId: string) => {
		if (!checkRequirements(equipmentId)) {
			return;
		}
		equipment.equipItem(equipmentId);
	};

	const axeEquipment = $equipment.equipment.filter((e) => e.type === 'axe');
	const equippedAxe = $equipment.equipment.find((e) => e.id === $equipment.equippedAxe);
</script>

<div class="view-app-container equipment-view">
	<div class="content-header">
		<h1>Equipment</h1>
		<p>Forge and equip tools to enhance your gathering abilities.</p>
	</div>

	<div class="equipment-container">
		<!-- Axes Section -->
		<div class="equipment-category">
			<h2 class="category-title">🪓 Axes</h2>
			<div class="equipment-grid">
				{#each axeEquipment as axe (axe.id)}
					{@const canUse = checkRequirements(axe.id)}
					{@const isEquipped = $equipment.equippedAxe === axe.id}
					<div
						class={`equipment-card glass-surface glass-radius glass-shadow-soft glass-shadow-accent--woodcutting ${isEquipped ? 'equipped' : ''} ${!canUse && !isEquipped ? 'locked' : ''}`}
						role="button"
						tabindex="0"
						onclick={() => handleEquip(axe.id)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								handleEquip(axe.id);
							}
						}}
					>
						<div class="equipment-header">
							<div class="equipment-icon">{axe.icon}</div>
							<div class="equipment-info">
								<h3>{axe.name}</h3>
								<p class="equipment-level">Level {axe.level}</p>
							</div>
							{#if isEquipped}
								<div class="equipped-badge">✓ Equipped</div>
							{/if}
						</div>

						<p class="equipment-description">{axe.description}</p>

						<div class="equipment-stats">
							{#if axe.stats.speedBonus > 0}
								<div class="stat">
									<span class="stat-label">Speed Boost</span>
									<span class="stat-value">+{Math.round(axe.stats.speedBonus * 100)}%</span>
								</div>
							{/if}
							{#if axe.stats.gatherAmount > 1}
								<div class="stat">
									<span class="stat-label">Per Gather</span>
									<span class="stat-value">×{axe.stats.gatherAmount}</span>
								</div>
							{/if}
							{#if axe.stats.specialAbilities.length > 0}
								<div class="stat full-width">
									<span class="stat-label">Abilities</span>
									<div class="abilities-list">
										{#each axe.stats.specialAbilities as ability}
											<span class="ability-tag">{ability}</span>
										{/each}
									</div>
								</div>
							{/if}
						</div>

						{#if axe.requirements && !isEquipped}
							<div class="equipment-requirements">
								{#if axe.requirements.minLevel}
									<div
										class="requirement {$player.stats.level >= axe.requirements.minLevel ? 'met' : 'unmet'}"
									>
										📊 Level {axe.requirements.minLevel}
									</div>
								{/if}
								{#if axe.requirements.requiredItems}
									{#each axe.requirements.requiredItems as req}
										{@const have = $inventory.items.find((i) => i.id === req.itemId)?.count || 0}
										<div class="requirement {have >= req.count ? 'met' : 'unmet'}">
											{have}/{req.count}
											{$inventory.items.find((i) => i.id === req.itemId)?.name || req.itemId}
										</div>
									{/each}
								{/if}
							</div>
						{/if}

						<p class="equipment-lore">{axe.lore}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.equipment-view {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		position: relative;
		background:
			radial-gradient(ellipse at 20% 30%, rgba(217, 119, 6, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 70%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 60%),
			linear-gradient(135deg, rgba(217, 119, 6, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%);
		border-radius: var(--radius-lg);
		padding: 1.25rem;
	}

	.equipment-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.equipment-category {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.category-title {
		font-size: 1.3rem;
		font-weight: 600;
		color: var(--view-woodcutting);
		margin: 0;
	}

	.equipment-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}

	.equipment-card {
		border: 2px solid var(--surface-border);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		transition:
			all 160ms ease,
			border-color 160ms ease,
			transform 160ms ease;
		cursor: pointer;
		user-select: none;
	}

	.equipment-card:hover:not(.locked) {
		transform: translateY(-2px);
		border-color: var(--view-woodcutting);
		box-shadow: 0 0 12px rgba(217, 119, 6, 0.25);
	}

	.equipment-card.equipped {
		border-color: var(--view-woodcutting);
		background: rgba(217, 119, 6, 0.15);
		box-shadow: 0 0 20px rgba(217, 119, 6, 0.3);
	}

	.equipment-card.locked {
		opacity: 0.6;
		cursor: not-allowed;
		border-color: var(--muted);
	}

	.equipment-card.locked:hover {
		transform: none;
		box-shadow: none;
	}

	.equipment-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		justify-content: space-between;
	}

	.equipment-icon {
		font-size: 2.5rem;
		line-height: 1;
	}

	.equipment-info {
		flex: 1;
	}

	.equipment-info h3 {
		margin: 0;
		font-size: 1.1rem;
		color: var(--foreground);
	}

	.equipment-level {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
	}

	.equipped-badge {
		background: linear-gradient(135deg, var(--view-woodcutting), #f59e0b);
		color: #0b1220;
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		font-size: 0.8rem;
		font-weight: 600;
	}

	.equipment-description {
		margin: 0;
		font-size: 0.95rem;
		color: var(--foreground);
		line-height: 1.4;
	}

	.equipment-stats {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.1);
		border-radius: var(--radius-sm);
	}

	.stat {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.9rem;
	}

	.stat.full-width {
		flex-direction: column;
		align-items: flex-start;
	}

	.stat-label {
		color: var(--muted);
		font-weight: 500;
	}

	.stat-value {
		color: var(--view-woodcutting);
		font-weight: 600;
	}

	.abilities-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.4rem;
	}

	.ability-tag {
		background: rgba(217, 119, 6, 0.2);
		border: 1px solid rgba(217, 119, 6, 0.4);
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		font-size: 0.8rem;
		color: var(--view-woodcutting);
	}

	.equipment-requirements {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		padding: 0.75rem;
		background: rgba(0, 0, 0, 0.08);
		border-radius: var(--radius-sm);
		border: 1px solid var(--surface-border);
	}

	.requirement {
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.requirement.met {
		color: #22c55e;
	}

	.requirement.unmet {
		color: var(--muted);
		opacity: 0.7;
	}

	.equipment-lore {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.5;
		font-style: italic;
	}

	@media (max-width: 767px) {
		.equipment-view {
			padding: var(--space-2xs);
		}

		.equipment-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
