<script lang="ts">
	import { inventory } from '$lib/stores/inventory';
	import { equipment } from '$lib/stores/equipment';
	import { player } from '$lib/stores/player';
	import { activityLog } from '$lib/stores/activityLog';
	let { togglePanelWithItem }: { togglePanelWithItem: (itemId: string) => void } = $props();

	let regularProgress = $state(0);
	let deadProgress = $state(0);
	let kindlingProgress = $state(0);
	let isRegularActive = $state(false);
	let isDeadActive = $state(false);
	let isKindlingActive = $state(false);
	let regularAction = $state<'idle' | 'chopping'>('idle');
	let deadAction = $state<'idle' | 'chopping'>('idle');
	let kindlingAction = $state<'idle' | 'gathering'>('idle');
	let regularInterval: ReturnType<typeof setInterval> | null = null;
	let deadInterval: ReturnType<typeof setInterval> | null = null;
	let kindlingInterval: ReturnType<typeof setInterval> | null = null;

	let equippedAxe = $derived(
		$equipment.equipment.find((e) => e.id === $equipment.equippedAxe && e.type === 'axe')
	);

	const BASE_CHOP_DURATION = 1000; // 1 second in milliseconds

	$effect(() => {
		// Ensure equipment is loaded
		$equipment;
	});

	const getChopDuration = () => {
		const axeStats = $equipment.equipment.find(
			(e) => e.id === $equipment.equippedAxe && e.type === 'axe'
		)?.stats;
		const speedBonus = axeStats?.speedBonus || 0;
		return BASE_CHOP_DURATION / (1 + speedBonus);
	};

	const getGatherAmount = () => {
		const axeStats = $equipment.equipment.find(
			(e) => e.id === $equipment.equippedAxe && e.type === 'axe'
		)?.stats;
		return axeStats?.gatherAmount || 1;
	};

	const getDisplayTime = (durationMs: number): string => {
		return (durationMs / 1000).toFixed(1);
	};

	const chopWood = (woodType: 'wood' | 'dead-wood' | 'kindling') => {
		const isRegular = woodType === 'wood';
		const isDead = woodType === 'dead-wood';
		// Prevent chopping if any tree is already active
		if (isRegularActive || isDeadActive || isKindlingActive) return;

		if (isRegular) {
			isRegularActive = true;
			regularAction = 'chopping';
			regularProgress = 0;
		} else if (isDead) {
			isDeadActive = true;
			deadAction = 'chopping';
			deadProgress = 0;
		} else {
			isKindlingActive = true;
			kindlingAction = 'gathering';
			kindlingProgress = 0;
		}

		const chopDuration = getChopDuration();
		const gatherAmount = getGatherAmount();
		const startTime = Date.now();
		const interval = setInterval(() => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min((elapsed / chopDuration) * 100, 100);

			if (isRegular) {
				regularProgress = progress;
			} else if (isDead) {
				deadProgress = progress;
			} else {
				kindlingProgress = progress;
			}

			if (elapsed >= chopDuration) {
				clearInterval(interval);
				const xpGain = 10 * gatherAmount;
				inventory.addItem(woodType, gatherAmount);
				player.addExperience(xpGain);

				// Log activity event
				const woodNames = {
					'wood': 'Wood',
					'dead-wood': 'Dead Wood',
					'kindling': 'Kindling'
				};
				const woodIcons = {
					'wood': '🪵',
					'dead-wood': '💀',
					'kindling': '✨'
				};
				activityLog.addEvent(
					'gather',
					`Gathered ${gatherAmount}x ${woodNames[woodType]} (+${xpGain} XP)`,
					woodIcons[woodType],
					'var(--view-woodcutting)'
				);

				// Keep bar at 100% for a brief moment, then reset
				setTimeout(() => {
					if (isRegular) {
						isRegularActive = false;
						regularAction = 'idle';
						regularProgress = 0;
					} else if (isDead) {
						isDeadActive = false;
						deadAction = 'idle';
						deadProgress = 0;
					} else {
						isKindlingActive = false;
						kindlingAction = 'idle';
						kindlingProgress = 0;
					}
				}, 200);
			}
		}, 16); // ~60fps
	};
</script>

<div class="view-app-container woodcutting-view">
	<div class="content-header">
		<h1>Woodcutting</h1>
		<p>Chop trees in the pocket universe forest to gather wood.</p>
	</div>

	{#if equippedAxe}
		<div class="equipment-status glass-surface glass-radius glass-shadow-soft">
			<div class="status-header">
				<span class="status-value">{equippedAxe.icon} {equippedAxe.name}</span>
				<span class="status-label">⚙️ Equipment</span>
			</div>
			<div class="status-stats">
				{#if equippedAxe.stats.speedBonus >= 0}
					<div class="status-stat">
						<span class="stat-name">Gathering Speed Bonus</span>
						<span class="stat-number">+{Math.round(equippedAxe.stats.speedBonus * 100)}%</span>
					</div>
				{/if}
				{#if equippedAxe.stats.gatherAmount >= 0}
					<div class="status-stat">
						<span class="stat-name">Gathered Items Per Action</span>
						<span class="stat-number">×{equippedAxe.stats.gatherAmount}</span>
					</div>
				{/if}
			</div>
		</div>
	{/if}

	<div class="woodcutting-container">
		<!-- <div class="wood-stats">
			<div class="stat-card glass-surface glass-radius glass-shadow-soft">
				<div class="stat-label">Wood</div>
				<div class="stat-value">{$inventory.items.find((i) => i.id === 'wood')?.count ?? 0}</div>
			</div>
			<div class="stat-card glass-surface glass-radius glass-shadow-soft">
				<div class="stat-label">Dead Wood</div>
				<div class="stat-value">
					{$inventory.items.find((i) => i.id === 'dead-wood')?.count ?? 0}
				</div>
			</div>
			<div class="stat-card glass-surface glass-radius glass-shadow-soft">
				<div class="stat-label">Kindling</div>
				<div class="stat-value">
					{$inventory.items.find((i) => i.id === 'kindling')?.count ?? 0}
				</div>
			</div>
		</div> -->

		<div
			class="tree-section glass-surface glass-radius glass-shadow-soft glass-shadow-accent--woodcutting"
			role="button"
			tabindex="0"
			onclick={() => togglePanelWithItem('wood')}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					togglePanelWithItem('wood');
				}
			}}
		>
			<div class="tree-header">
				<span class="tree-icon">🪵</span>
				<h2>Starter Tree</h2>
				<div class="timer-badge">{getDisplayTime(getChopDuration())}s</div>
			</div>

			<button
				class="chop-button {regularAction === 'chopping' ? 'active' : ''}"
				onclick={(event) => {
					event.stopPropagation();
					chopWood('wood');
				}}
				disabled={isRegularActive || isDeadActive}
			>
				{#if isRegularActive}
					Chopping...
				{:else}
					Chop
				{/if}
			</button>

			<div class="progress-bar-container">
				<div class="progress-bar-background">
					<div class="progress-bar-fill" style="width: {regularProgress}%"></div>
					<div class="progress-text">{Math.round(regularProgress)}%</div>
				</div>
			</div>
		</div>

		<div
			class="tree-section glass-surface glass-radius glass-shadow-soft glass-shadow-accent--woodcutting"
			role="button"
			tabindex="0"
			onclick={() => togglePanelWithItem('dead-wood')}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					togglePanelWithItem('dead-wood');
				}
			}}
		>
			<div class="tree-header">
				<span class="tree-icon">💀</span>
				<h2>Fallen Tree</h2>
				<div class="timer-badge">{getDisplayTime(getChopDuration())}s</div>
			</div>

			<button
				class="chop-button {deadAction === 'chopping' ? 'active' : ''}"
				onclick={(event) => {
					event.stopPropagation();
					chopWood('dead-wood');
				}}
				disabled={isRegularActive || isDeadActive}
			>
				{#if isDeadActive}
					Chopping...
				{:else}
					Chop
				{/if}
			</button>

			<div class="progress-bar-container">
				<div class="progress-bar-background">
					<div class="progress-bar-fill" style="width: {deadProgress}%"></div>
					<div class="progress-text">{Math.round(deadProgress)}%</div>
				</div>
			</div>
		</div>

		<div
			class="tree-section glass-surface glass-radius glass-shadow-soft glass-shadow-accent--woodcutting"
			role="button"
			tabindex="0"
			onclick={() => togglePanelWithItem('kindling')}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					togglePanelWithItem('kindling');
				}
			}}
		>
			<div class="tree-header">
				<span class="tree-icon">✨</span>
				<h2>Brush</h2>
				<div class="timer-badge">{getDisplayTime(getChopDuration())}s</div>
			</div>

			<button
				class="chop-button {kindlingAction === 'gathering' ? 'active' : ''}"
				onclick={(event) => {
					event.stopPropagation();
					chopWood('kindling');
				}}
				disabled={isRegularActive || isDeadActive || isKindlingActive}
			>
				{#if isKindlingActive}
					Gathering...
				{:else}
					Gather
				{/if}
			</button>

			<div class="progress-bar-container">
				<div class="progress-bar-background">
					<div class="progress-bar-fill" style="width: {kindlingProgress}%"></div>
					<div class="progress-text">{Math.round(kindlingProgress)}%</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.woodcutting-view {
		--woodcutting-card-padding: var(--space-xs);
		--woodcutting-grid-gap: var(--space-2xs);

		display: flex;
		flex-direction: column;
		position: relative;
		gap: var(--space-xs);
		background:
			radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 70%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 50%, rgba(52, 211, 153, 0.15) 0%, transparent 60%),
			linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		overflow-y: auto;
	}

	.equipment-status {
		border: 1px solid var(--surface-border);
		padding: var(--woodcutting-card-padding);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(245, 158, 11, 0.06));
		border-radius: var(--radius-sm);
	}

	.status-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.status-label {
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--muted);
		letter-spacing: 0.08em;
		font-weight: 600;
	}

	.status-value {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--view-woodcutting);
	}

	.status-stats {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.status-stat {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.stat-name {
		font-size: 0.8rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-number {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--view-woodcutting);
	}

	.woodcutting-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-2xs);
	}

	@media (max-width: 768px) {
		.woodcutting-container {
			display: flex;
			flex-direction: column;
			gap: var(--space-2xs);
		}
	}

	.wood-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--woodcutting-grid-gap);
		grid-column: 1 / -1;
	}

	.stat-card {
		border: 1px solid var(--surface-border);
		padding: var(--woodcutting-card-padding);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.stat-label {
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--muted);
		letter-spacing: 0.08em;
	}

	.stat-value {
		font-size: 2rem;
		font-weight: 600;
		color: #22c55e;
	}

	.tree-section {
		border: 1px solid var(--surface-border);
		padding: var(--woodcutting-card-padding);
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		cursor: pointer;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			border-color 160ms ease;
	}

	.tree-section:focus-visible {
		outline: 2px solid var(--view-woodcutting);
		outline-offset: 4px;
	}

	.tree-section h2 {
		margin: 0;
		font-size: 1.3rem;
	}

	.tree-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.tree-icon {
		font-size: 2rem;
		line-height: 1;
	}

	.timer-badge {
		margin-left: auto;
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.15));
		border: 1px solid rgba(34, 197, 94, 0.3);
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		font-size: 0.9rem;
		font-weight: 600;
		color: #22c55e;
	}

	.chop-button {
		padding: 1rem 1.5rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: var(--radius-sm);
		background: linear-gradient(135deg, #22c55e, #10b981);
		color: #0b1220;
		border: none;
		box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
		cursor: pointer;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease,
			opacity 240ms ease,
			background 240ms ease,
			color 240ms ease;
	}

	.chop-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 15px 40px rgba(34, 197, 94, 0.4);
	}

	.chop-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.chop-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.6), rgba(16, 185, 129, 0.6));
		color: rgba(11, 18, 32, 0.7);
	}

	.chop-button.active {
		background: linear-gradient(135deg, #10b981, #22c55e);
	}

	.progress-bar-container {
		position: relative;
		display: flex;
		align-items: center;
	}

	.progress-bar-background {
		flex: 1;
		height: 28px;
		background: var(--surface-strong);
		border-radius: 999px;
		border: 1px solid var(--surface-border);
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.08);
		position: relative;
	}

	.progress-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, #22c55e, #10b981);
		border-radius: 999px;
		box-shadow: 0 0 12px rgba(34, 197, 94, 0.4);
		width: 0;
	}

	.progress-text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		font-weight: 600;
		font-size: 0.85rem;
		color: #0b1220;
		z-index: 1;
		pointer-events: none;
		text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
	}

	@media (max-width: 767px) {
		.woodcutting-view {
			--woodcutting-card-padding: 1rem;
			--woodcutting-grid-gap: 0.75rem;
			padding: var(--woodcutting-grid-gap);
		}

		.wood-stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
