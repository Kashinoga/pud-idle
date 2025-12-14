<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<ThemeToggle />

<section class="settings-section">
	<h2 class="section-title">Activity Legend</h2>
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

<style>
	.settings-section {
		margin-top: var(--space-sm);
		padding: var(--space-xs);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-sm);
		background: var(--surface);
	}

	.section-title {
		margin: 0 0 var(--space-xs) 0;
		font-size: 1rem;
		color: var(--muted-foreground);
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
		box-shadow: 0 2px 6px rgba(0,0,0,0.06);
	}

	.legend-label {
		font-size: 0.9rem;
		color: var(--foreground);
	}
</style>
