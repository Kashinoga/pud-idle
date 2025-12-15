<script lang="ts">
</script>

<div class="view-app-container sheltering-view">
	<div class="content-header card">
		<h1>Sheltering</h1>
		<p>Building shelter to protect yourself from the elements.</p>
	</div>
</div>

<style>
	.sheltering-view {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		background:
			radial-gradient(ellipse at 25% 20%, rgba(37, 99, 235, 0.18) 0%, transparent 55%),
			radial-gradient(ellipse at 75% 80%, rgba(14, 165, 233, 0.16) 0%, transparent 55%),
			linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(14, 165, 233, 0.07) 100%);
		border: 1px solid var(--surface-border);
		border-radius: var(--radius-lg);
		padding: var(--space-2xs);
		overflow: auto;
		scrollbar-width: none;
	}
</style>
