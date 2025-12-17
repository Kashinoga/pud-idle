<script lang="ts">
	import { player } from '$lib/stores/player';

	let expPercentage = $derived.by(() => {
		const { experience, experienceToNextLevel } = $player.stats;
		return (experience / experienceToNextLevel) * 100;
	});

	let nextLevelExp = $derived.by(() => {
		return $player.stats.experienceToNextLevel - $player.stats.experience;
	});
</script>

<div class="view-app-container player-view">
	<div class="card content-header">
		<h1>Ranger</h1>
		<p>View your character progression and stats.</p>
	</div>

	<div class="player-container">
		<!-- Level and XP Section -->
		<div class="level-card glass-surface glass-radius glass-shadow-soft">
			<div class="level-header">
				<div class="level-display">
					<div class="level-number">{$player.stats.level}</div>
					<div class="level-label">Level</div>
				</div>
				<div class="title-section">
					<div class="player-title">Adventurer</div>
					<div class="player-subtitle">Woodcutter</div>
				</div>
			</div>

			<div class="experience-section">
				<div class="exp-header">
					<span class="exp-label">Experience</span>
					<span class="exp-values"
						>{$player.stats.experience} / {$player.stats.experienceToNextLevel}</span
					>
				</div>
				<div class="exp-bar-container">
					<div class="exp-bar-background">
						<div class="exp-bar-fill" style="width: {expPercentage}%"></div>
					</div>
				</div>
				<div class="exp-info">
					<span class="exp-remaining">{nextLevelExp} XP to next level</span>
				</div>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="stats-grid">
			<div class="stat-panel glass-surface glass-radius glass-shadow-soft">
				<div class="stat-icon">❤️</div>
				<div class="stat-name">Health</div>
				<div class="stat-numbers">
					<span class="stat-current">{$player.stats.health}</span>
					<span class="stat-separator">/</span>
					<span class="stat-max">{$player.stats.maxHealth}</span>
				</div>
				<div class="stat-bar">
					<div
						class="stat-bar-fill health"
						style="width: {($player.stats.health / $player.stats.maxHealth) * 100}%"
					></div>
				</div>
			</div>

			<div class="stat-panel glass-surface glass-radius glass-shadow-soft">
				<div class="stat-icon">⚡</div>
				<div class="stat-name">Stamina</div>
				<div class="stat-numbers">
					<span class="stat-current">{$player.stats.stamina}</span>
					<span class="stat-separator">/</span>
					<span class="stat-max">{$player.stats.maxStamina}</span>
				</div>
				<div class="stat-bar">
					<div
						class="stat-bar-fill stamina"
						style="width: {($player.stats.stamina / $player.stats.maxStamina) * 100}%"
					></div>
				</div>
			</div>

			<div class="stat-panel glass-surface glass-radius glass-shadow-soft">
				<div class="stat-icon">📊</div>
				<div class="stat-name">Total XP Gained</div>
				<div class="stat-numbers">
					<span class="stat-current">{$player.totalExperienceGained}</span>
				</div>
				<div class="stat-bar transparent">
					<div class="stat-bar-fill"></div>
				</div>
			</div>
		</div>

		<!-- Skills Section -->
		<div class="skills-section">
			<h2 class="section-title">Skills</h2>
			<div class="skills-grid">
				<div class="skill-card glass-surface glass-radius glass-shadow-soft">
					<div class="skill-header">
						<span class="skill-icon">🪵</span>
						<span class="skill-name">Woodcutting</span>
					</div>
					<div class="skill-level">Level {$player.stats.level}</div>
					<p class="skill-description">Chop trees and gather wood to earn experience.</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.player-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		position: relative;
		background:
			radial-gradient(ellipse at 20% 30%, rgba(37, 99, 235, 0.25) 0%, transparent 50%),
			radial-gradient(ellipse at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
			radial-gradient(ellipse at 50% 50%, rgba(96, 165, 250, 0.15) 0%, transparent 60%),
			linear-gradient(135deg, rgba(37, 99, 235, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		overflow: auto;
	}

	.player-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.level-card {
		border: 1px solid var(--surface-border);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.level-header {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.level-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 1rem;
		background: linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(59, 130, 246, 0.15));
		border-radius: var(--radius-sm);
		min-width: 100px;
	}

	.level-number {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary);
	}

	.level-label {
		font-size: 0.8rem;
		text-transform: uppercase;
		color: var(--muted);
		letter-spacing: 0.05em;
	}

	.title-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.player-title {
		font-size: 1.4rem;
		font-weight: 700;
		color: var(--foreground);
	}

	.player-subtitle {
		font-size: 0.9rem;
		color: var(--muted);
	}

	.experience-section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.exp-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.exp-label {
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--muted);
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.exp-values {
		font-size: 0.9rem;
		color: var(--primary);
		font-weight: 600;
	}

	.exp-bar-container {
		position: relative;
	}

	.exp-bar-background {
		height: 24px;
		background: var(--surface-strong);
		border-radius: 999px;
		border: 1px solid var(--surface-border);
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(15, 23, 42, 0.08);
	}

	.exp-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--primary), #60a5fa);
		box-shadow: 0 0 12px rgba(37, 99, 235, 0.4);
		width: 0;
		transition: width 400ms ease;
	}

	.exp-info {
		display: flex;
		justify-content: flex-end;
	}

	.exp-remaining {
		font-size: 0.8rem;
		color: var(--muted);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--space-2xs);
	}

	.stat-panel {
		border: 1px solid var(--surface-border);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		text-align: center;
	}

	.stat-icon {
		font-size: 2rem;
		line-height: 1;
	}

	.stat-name {
		font-size: 0.85rem;
		text-transform: uppercase;
		color: var(--muted);
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	.stat-numbers {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.3rem;
		font-weight: 700;
	}

	.stat-current {
		color: var(--foreground);
	}

	.stat-separator {
		color: var(--muted);
		font-size: 1rem;
	}

	.stat-max {
		color: var(--muted);
	}

	.stat-bar {
		height: 8px;
		background: var(--surface-strong);
		border-radius: 999px;
		border: 1px solid var(--surface-border);
		overflow: hidden;
	}

	.stat-bar.transparent {
		opacity: 0.3;
	}

	.stat-bar-fill {
		height: 100%;
		border-radius: 999px;
	}

	.stat-bar-fill.health {
		background: linear-gradient(90deg, #22c55e, #10b981);
		box-shadow: 0 0 8px rgba(34, 197, 94, 0.3);
	}

	.stat-bar-fill.stamina {
		background: linear-gradient(90deg, #f59e0b, #f97316);
		box-shadow: 0 0 8px rgba(245, 158, 11, 0.3);
	}

	.skills-section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.section-title {
		margin: 0;
		font-size: 1.2rem;
		font-weight: 600;
		color: var(--primary);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--space-2xs);
	}

	.skill-card {
		border: 1px solid var(--surface-border);
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skill-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.skill-icon {
		font-size: 1.5rem;
		line-height: 1;
	}

	.skill-name {
		font-weight: 600;
		color: var(--foreground);
	}

	.skill-level {
		font-size: 0.9rem;
		color: var(--primary);
		font-weight: 600;
	}

	.skill-description {
		margin: 0;
		font-size: 0.85rem;
		color: var(--muted);
		line-height: 1.4;
	}

	@media (max-width: 767px) {
		.player-view {
			padding: var(--space-2xs);
		}

		.level-header {
			flex-direction: column;
			align-items: flex-start;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.skills-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
