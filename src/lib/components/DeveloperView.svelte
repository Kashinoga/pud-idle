<script lang="ts">
	import { player } from '$lib/stores/player';
	import { inventory } from '$lib/stores/inventory';

	let levelInput = $state($player.stats.level);
	let healthInput = $state($player.stats.health);
	let staminaInput = $state($player.stats.stamina);
	let totalXpInput = $state($player.totalExperienceGained);
	let experienceInput = $state($player.stats.experience);

	// Inventory item states
	let woodCount = $state($inventory.items.find((i) => i.id === 'wood')?.count || 0);
	let deadWoodCount = $state($inventory.items.find((i) => i.id === 'dead-wood')?.count || 0);
	let kindlingCount = $state($inventory.items.find((i) => i.id === 'kindling')?.count || 0);

	const handleLevelChange = (newLevel: number) => {
		levelInput = newLevel;
		player.setLevel(newLevel);
	};

	const handleHealthChange = (newHealth: number) => {
		healthInput = newHealth;
		player.setHealth(newHealth);
	};

	const handleStaminaChange = (newStamina: number) => {
		staminaInput = newStamina;
		player.setStamina(newStamina);
	};

	const handleTotalXpChange = (newXp: number) => {
		totalXpInput = newXp;
		player.setTotalXp(newXp);
	};

	const handleExperienceChange = (newExp: number) => {
		experienceInput = newExp;
		player.setExperience(newExp);
	};

	const resetPlayer = () => {
		if (confirm('Are you sure you want to reset the player to level 1?')) {
			player.setLevel(1);
			player.setExperience(0);
			player.setHealth(100);
			player.setStamina(100);
			player.setTotalXp(0);
			levelInput = 1;
			healthInput = 100;
			staminaInput = 100;
			totalXpInput = 0;
			experienceInput = 0;
		}
	};

	const levelUpTen = () => {
		const newLevel = Math.min($player.stats.level + 10, 100);
		handleLevelChange(newLevel);
	};

	const handleInventoryChange = (itemId: string, newCount: number) => {
		inventory.setItemCount(itemId, newCount);
	};
</script>

<div class="view-app-container developer-view">
	<div class="content-header">
		<h1>Developer Console</h1>
		<p>Adjust character stats for testing and development.</p>
	</div>

	<div class="developer-container">
		<!-- Level Section -->
		<div class="control-section glass-surface glass-radius glass-shadow-soft">
			<h2 class="section-title">Level & Experience</h2>

			<div class="control-group">
				<label for="level-input">
					<span class="label-text">Level</span>
					<span class="label-current">{levelInput}</span>
				</label>
				<input
					id="level-input"
					type="range"
					min="1"
					max="100"
					bind:value={levelInput}
					onchange={(e) => handleLevelChange(parseInt(e.currentTarget.value))}
					class="slider"
				/>
				<div class="input-row">
					<input
						type="number"
						min="1"
						max="100"
						bind:value={levelInput}
						onchange={(e) => handleLevelChange(parseInt(e.currentTarget.value))}
						class="number-input"
					/>
					<button class="quick-button" onclick={levelUpTen}>+10 Levels</button>
				</div>
			</div>

			<div class="control-group">
				<label for="exp-input">
					<span class="label-text">Current Experience</span>
					<span class="label-current"
						>{experienceInput} / {$player.stats.experienceToNextLevel}</span
					>
				</label>
				<input
					id="exp-input"
					type="range"
					min="0"
					max={$player.stats.experienceToNextLevel}
					bind:value={experienceInput}
					onchange={(e) => handleExperienceChange(parseInt(e.currentTarget.value))}
					class="slider"
				/>
				<input
					type="number"
					min="0"
					bind:value={experienceInput}
					onchange={(e) => handleExperienceChange(parseInt(e.currentTarget.value))}
					class="number-input"
				/>
			</div>

			<div class="control-group">
				<label for="total-xp-input">
					<span class="label-text">Total XP Gained</span>
					<span class="label-current">{totalXpInput}</span>
				</label>
				<input
					id="total-xp-input"
					type="number"
					min="0"
					bind:value={totalXpInput}
					onchange={(e) => handleTotalXpChange(parseInt(e.currentTarget.value))}
					class="number-input"
				/>
			</div>
		</div>

		<!-- Stats Section -->
		<div class="control-section glass-surface glass-radius glass-shadow-soft">
			<h2 class="section-title">Character Stats</h2>

			<div class="control-group">
				<label for="health-input">
					<span class="label-text">Health</span>
					<span class="label-current">{healthInput} / {$player.stats.maxHealth}</span>
				</label>
				<input
					id="health-input"
					type="range"
					min="0"
					max={$player.stats.maxHealth}
					bind:value={healthInput}
					onchange={(e) => handleHealthChange(parseInt(e.currentTarget.value))}
					class="slider"
				/>
				<div class="input-row">
					<input
						type="number"
						min="0"
						max={$player.stats.maxHealth}
						bind:value={healthInput}
						onchange={(e) => handleHealthChange(parseInt(e.currentTarget.value))}
						class="number-input"
					/>
					<button class="quick-button" onclick={() => handleHealthChange($player.stats.maxHealth)}>
						Full Health
					</button>
				</div>
			</div>

			<div class="control-group">
				<label for="stamina-input">
					<span class="label-text">Stamina</span>
					<span class="label-current">{staminaInput} / {$player.stats.maxStamina}</span>
				</label>
				<input
					id="stamina-input"
					type="range"
					min="0"
					max={$player.stats.maxStamina}
					bind:value={staminaInput}
					onchange={(e) => handleStaminaChange(parseInt(e.currentTarget.value))}
					class="slider"
				/>
				<div class="input-row">
					<input
						type="number"
						min="0"
						max={$player.stats.maxStamina}
						bind:value={staminaInput}
						onchange={(e) => handleStaminaChange(parseInt(e.currentTarget.value))}
						class="number-input"
					/>
					<button
						class="quick-button"
						onclick={() => handleStaminaChange($player.stats.maxStamina)}
					>
						Full Stamina
					</button>
				</div>
			</div>
		</div>

		<!-- Actions Section -->
		<div class="control-section glass-surface glass-radius glass-shadow-soft">
			<h2 class="section-title">Inventory</h2>

			<div class="control-group">
				<label for="wood-input">
					<span class="label-text">🪵 Wood</span>
					<span class="label-current">{woodCount}</span>
				</label>
				<input
					id="wood-input"
					type="range"
					min="0"
					max="1000"
					bind:value={woodCount}
					onchange={(e) => {
						const newCount = parseInt(e.currentTarget.value);
						woodCount = newCount;
						handleInventoryChange('wood', newCount);
					}}
					class="slider"
				/>
				<input
					type="number"
					min="0"
					bind:value={woodCount}
					onchange={(e) => {
						const newCount = parseInt(e.currentTarget.value) || 0;
						woodCount = newCount;
						handleInventoryChange('wood', newCount);
					}}
					class="number-input"
				/>
			</div>

			<div class="control-group">
				<label for="deadwood-input">
					<span class="label-text">💀 Dead Wood</span>
					<span class="label-current">{deadWoodCount}</span>
				</label>
				<input
					id="deadwood-input"
					type="range"
					min="0"
					max="1000"
					bind:value={deadWoodCount}
					onchange={(e) => {
						const newCount = parseInt(e.currentTarget.value);
						deadWoodCount = newCount;
						handleInventoryChange('dead-wood', newCount);
					}}
					class="slider"
				/>
				<input
					type="number"
					min="0"
					bind:value={deadWoodCount}
					onchange={(e) => {
						const newCount = parseInt(e.currentTarget.value) || 0;
						deadWoodCount = newCount;
						handleInventoryChange('dead-wood', newCount);
					}}
					class="number-input"
				/>
			</div>

			<div class="control-group">
				<label for="kindling-input">
					<span class="label-text">✨ Kindling</span>
					<span class="label-current">{kindlingCount}</span>
				</label>
				<input
					id="kindling-input"
					type="range"
					min="0"
					max="1000"
					bind:value={kindlingCount}
					onchange={(e) => {
						const newCount = parseInt(e.currentTarget.value);
						kindlingCount = newCount;
						handleInventoryChange('kindling', newCount);
					}}
					class="slider"
				/>
				<input
					type="number"
					min="0"
					bind:value={kindlingCount}
					onchange={(e) => {
						const newCount = parseInt(e.currentTarget.value) || 0;
						kindlingCount = newCount;
						handleInventoryChange('kindling', newCount);
					}}
					class="number-input"
				/>
			</div>
		</div>

		<!-- Actions Section -->
		<div class="control-section glass-surface glass-radius glass-shadow-soft">
			<h2 class="section-title">Actions</h2>
			<button class="danger-button" onclick={resetPlayer}>Reset to Level 1</button>
			<p class="help-text">
				Use this console to test character progression, equipment unlocks, and other level-dependent
				features.
			</p>
		</div>
	</div>
</div>

<style>
	.developer-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		position: relative;
		background:
			radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 50%, rgba(167, 139, 250, 0.15) 0%, transparent 60%),
			linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		overflow: auto;
	}

	.developer-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.developer-container {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: var(--space-2xs);
		}
	}

	.control-section {
		border: 1px solid var(--surface-border);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
	}

	.section-title {
		margin: 0 0 0.5rem 0;
		font-size: 1.1rem;
		font-weight: 600;
		color: #a78bfa;
	}

	.control-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
	}

	label {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 0.95rem;
		font-weight: 500;
	}

	.label-text {
		color: var(--foreground);
	}

	.label-current {
		color: #a78bfa;
		font-weight: 600;
		font-size: 0.9rem;
	}

	.slider {
		width: 100%;
		height: 6px;
		border-radius: 999px;
		background: var(--surface-strong);
		border: 1px solid var(--surface-border);
		outline: none;
		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: linear-gradient(135deg, #a78bfa, #8b5cf6);
		cursor: pointer;
		box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
		border: 2px solid var(--surface);
	}

	.slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: linear-gradient(135deg, #a78bfa, #8b5cf6);
		cursor: pointer;
		box-shadow: 0 0 8px rgba(168, 85, 247, 0.4);
		border: 2px solid var(--surface);
	}

	.input-row {
		display: flex;
		gap: var(--space-2xs);
	}

	.number-input {
		flex: 1;
		padding: 0.5rem 0.75rem;
		background: var(--surface);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		color: var(--foreground);
		font-size: 0.95rem;
		font-weight: 500;
		transition: border-color 160ms ease;
	}

	.number-input:focus {
		outline: none;
		border-color: #a78bfa;
		box-shadow: 0 0 8px rgba(168, 85, 247, 0.2);
	}

	.quick-button {
		padding: 0.5rem 1rem;
		background: linear-gradient(135deg, #a78bfa, #8b5cf6);
		color: #0b1220;
		border: none;
		border-radius: var(--radius-sm);
		font-weight: 600;
		font-size: 0.85rem;
		cursor: pointer;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
		white-space: nowrap;
	}

	.quick-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
	}

	.quick-button:active {
		transform: translateY(0);
	}

	.danger-button {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #ef4444, #dc2626);
		color: white;
		border: none;
		border-radius: var(--radius-sm);
		font-weight: 600;
		font-size: 0.95rem;
		cursor: pointer;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}

	.danger-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
	}

	.danger-button:active {
		transform: translateY(0);
	}

	.help-text {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.5;
	}

	@media (max-width: 767px) {
		.developer-view {
			padding: var(--space-2xs);
		}

		.control-section {
			padding: 1rem;
		}

		.input-row {
			flex-direction: column;
		}

		.quick-button {
			width: 100%;
		}
	}
</style>
