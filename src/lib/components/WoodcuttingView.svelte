<script lang="ts">
	import { inventory } from '$lib/stores/inventory';

	let regularProgress = $state(0);
	let deadProgress = $state(0);
	let isRegularActive = $state(false);
	let isDeadActive = $state(false);
	let regularAction = $state<'idle' | 'chopping'>('idle');
	let deadAction = $state<'idle' | 'chopping'>('idle');
	let regularInterval: ReturnType<typeof setInterval> | null = null;
	let deadInterval: ReturnType<typeof setInterval> | null = null;

	const CHOP_DURATION = 1000; // 1 second in milliseconds

	const chopWood = (woodType: 'wood' | 'dead-wood') => {
		const isRegular = woodType === 'wood';
		// Prevent chopping if either tree is already active
		if (isRegularActive || isDeadActive) return;

		if (isRegular) {
			isRegularActive = true;
			regularAction = 'chopping';
			regularProgress = 0;
		} else {
			isDeadActive = true;
			deadAction = 'chopping';
			deadProgress = 0;
		}

		const startTime = Date.now();
		const interval = setInterval(() => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min((elapsed / CHOP_DURATION) * 100, 100);

			if (isRegular) {
				regularProgress = progress;
			} else {
				deadProgress = progress;
			}

			if (elapsed >= CHOP_DURATION) {
				clearInterval(interval);
				inventory.addItem(woodType, 1);
				// Keep bar at 100% for a brief moment, then reset
				setTimeout(() => {
					if (isRegular) {
						isRegularActive = false;
						regularAction = 'idle';
						regularProgress = 0;
					} else {
						isDeadActive = false;
						deadAction = 'idle';
						deadProgress = 0;
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

	<div class="woodcutting-container">
		<div class="wood-stats">
				<div class="stat-card glass-surface glass-radius glass-shadow-soft">
				<div class="stat-label">Wood</div>
				<div class="stat-value">{$inventory.items.find((i) => i.id === 'wood')?.count ?? 0}</div>
			</div>
			<div class="stat-card">
				<div class="stat-label">Dead Wood</div>
				<div class="stat-value">
					{$inventory.items.find((i) => i.id === 'dead-wood')?.count ?? 0}
				</div>
			</div>
		</div>

		<div class="tree-section glass-surface glass-radius glass-shadow-soft glass-shadow-accent--woodcutting">
			<div class="tree-header">
				<span class="tree-icon">🪵</span>
				<h2>Starter Tree</h2>
			</div>

			<button
				class="chop-button {regularAction === 'chopping' ? 'active' : ''}"
				onclick={() => chopWood('wood')}
				disabled={isRegularActive || isDeadActive}
			>
				{#if isRegularActive}
					Chopping...
				{:else}
					Gather
				{/if}
			</button>

			<div class="progress-bar-container">
				<div class="progress-bar-background">
					<div class="progress-bar-fill" style="width: {regularProgress}%"></div>
					<div class="progress-text">{Math.round(regularProgress)}%</div>
				</div>
			</div>
		</div>

		<div class="tree-section glass-surface glass-radius glass-shadow-soft glass-shadow-accent--woodcutting">
			<div class="tree-header">
				<span class="tree-icon">💀</span>
				<h2>Fallen Tree</h2>
			</div>

			<button
				class="chop-button {deadAction === 'chopping' ? 'active' : ''}"
				onclick={() => chopWood('dead-wood')}
				disabled={isRegularActive || isDeadActive}
			>
				{#if isDeadActive}
					Chopping...
				{:else}
					Gather
				{/if}
			</button>

			<div class="progress-bar-container">
				<div class="progress-bar-background">
					<div class="progress-bar-fill" style="width: {deadProgress}%"></div>
					<div class="progress-text">{Math.round(deadProgress)}%</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.woodcutting-view {
		--woodcutting-card-padding: 2rem;
		--woodcutting-grid-gap: 1.5rem;

		display: flex;
		flex-direction: column;
		position: relative;
		gap: var(--woodcutting-grid-gap);
		background: 
			radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 70%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 50%, rgba(52, 211, 153, 0.15) 0%, transparent 60%),
			linear-gradient(135deg, rgba(34, 197, 94, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%);
		border-radius: var(--radius-lg);
		padding: var(--woodcutting-grid-gap);
		overflow-y: auto;
	}

	.woodcutting-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--woodcutting-grid-gap);
		padding-bottom: var(--content-padding-bottom);
	}

	.wood-stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
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
			box-shadow 160ms ease;
	}

	.chop-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 15px 40px rgba(34, 197, 94, 0.4);
	}

	.chop-button:active:not(:disabled) {
		transform: translateY(0);
	}

	.chop-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
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

		.woodcutting-container {
			grid-template-columns: 1fr;
		}

		.wood-stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
