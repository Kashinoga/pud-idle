<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<div class="view-app-container settings-view">
	<div class="content-header">
		<h1>Settings</h1>
		<p>Adjust your preferences and configurations below.</p>
	</div>

	<div class="settings-container">
		<div class="settings-grid">
			<section class="settings-section">
				<div class="section-header">
					<h2 class="section-title">Theme</h2>
					<p class="section-subtitle">Switch between light and dark. Applies across the app.</p>
				</div>
				<div class="section-body">
					<ThemeToggle />
				</div>
			</section>

			<section class="settings-section">
				<h2 class="section-title">Activity Legend</h2>
				<p class="section-subtitle">
					Legend for the different types of activities displayed in the timeline.
				</p>
				<div class="legend-grid">
					<div class="legend-item">
						<span class="legend-pill" style="--event-start:#22c55e; --event-end:#10b981;"></span>
						<span class="legend-label">Gather</span>
					</div>
					<div class="legend-item">
						<span class="legend-pill" style="--event-start:#8b5cf6; --event-end:#6366f1;"></span>
						<span class="legend-label">Equip</span>
					</div>
					<div class="legend-item">
						<span class="legend-pill" style="--event-start:#7dd3fc; --event-end:#60a5fa;"></span>
						<span class="legend-label">Level Up</span>
					</div>
					<div class="legend-item">
						<span class="legend-pill" style="--event-start:#f59e0b; --event-end:#f97316;"></span>
						<span class="legend-label">Achievement</span>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.settings-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
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

	.settings-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.settings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: var(--space-md);
	}

	.settings-section {
		padding: var(--space-sm);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		background: var(--surface);
	}

	.section-title {
		margin: 0 0 var(--space-xs) 0;
		font-size: 1rem;
		color: var(--muted-foreground);
	}

	.section-subtitle {
		margin: 0 0 var(--space-sm) 0 ;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-3xs);
	}

	.section-body {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-top: var(--space-xs);
	}

	.legend-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: var(--space-xs);
		align-items: center;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
	}

	.legend-pill {
		display: inline-block;
		width: 56px;
		height: 20px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--surface-border);
		background:
			linear-gradient(135deg, var(--event-start), var(--event-end)) padding-box,
			linear-gradient(90deg, var(--surface-border), var(--surface-border)) border-box;
		background-clip: padding-box, border-box;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
	}

	.legend-label {
		font-size: 0.9rem;
		color: var(--foreground);
	}
</style>
